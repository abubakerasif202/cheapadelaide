# Google Cloud SEO Data Pipeline — Setup & Operations

**Primary architecture:**

```
Google Search
     │
     ▼
Search Console — official Bulk Data Export (Google-managed, daily)
     │
     ▼
BigQuery  hf-search-console-ab-2026.searchconsole.*   (Google creates these tables)
     │
     ▼
scripts/seo/sql/reports.sql — PRIMARY section
```

**Secondary / backfill architecture** (kept, not removed — see §5):

```
Search Console — official API (searchanalytics.query)
     │
     ▼
scripts/seo/collect.ts / backfill.ts   (manual, run on demand)
     │
     ▼
BigQuery  hf-search-console-ab-2026.seo_monitoring.search_console_daily  (LEGACY table)
     │
     ▼
scripts/seo/sql/reports.sql — LEGACY section
```

No GSC Wizard. No ChatGPT Search Console plugin. No third-party connector.
Every step above is Google's own infrastructure, activated and operated
through Search Console's own settings and this business's own Google Cloud
project.

## 1. Why native export replaced the custom collector as primary

The previous version of this pipeline used a custom TypeScript collector
calling the Search Console API on a schedule. Google's **Bulk Data Export**
does the same job natively — Google writes the data into BigQuery itself,
daily, with no code to run, no Cloud Run job to maintain, no service-account
credentials to rotate, and no failure mode where a scheduled job silently
stops running. For an ongoing production pipeline this is simpler, cheaper to
operate, and has one less thing that can break. The custom collector remains
for the three things native export genuinely cannot do (§5).

## 2. What already exists (audited, not assumed)

Running `gcloud auth list` / `gcloud config list` / `gcloud projects list`
found an existing project already scoped to this business — **do not create a
new project.**

| Item | Value |
|---|---|
| Project ID | `hf-search-console-ab-2026` |
| Project number | `161826315730` |
| Region used for BigQuery (legacy table) | `australia-southeast1` |
| Active gcloud account | `abubakerasif202@gmail.com` |
| Also credentialed | `Admin@hfremovalsadelaide.com.au`, `abubakarasif2002@gmail.com` |
| Billing | **NOT enabled** — native export requires this, see §4 |

APIs already enabled on the project (checked with `gcloud services list
--enabled` before touching anything, both times this pipeline was built):
`bigquery.googleapis.com`, `bigquerystorage.googleapis.com`,
`searchconsole.googleapis.com`, plus several other BigQuery sub-APIs and
IAM/logging basics. These are exactly what native export needs — no new APIs
required.

## 3. IAM for Google's native export identity

Per Google's own current documentation (verified live via
`support.google.com/webmasters/answer/12917675`, not from memory), Search
Console's Bulk Data Export runs as a fixed system identity and needs exactly
two IAM roles on the destination project:

- **Service account:** `search-console-data-export@system.gserviceaccount.com`
  — this is Google's own identity, not one this project created.
- **Roles required:** `roles/bigquery.jobUser` and `roles/bigquery.dataEditor`
  — nothing broader.

**Already granted** as part of this task:

```bash
gcloud projects add-iam-policy-binding hf-search-console-ab-2026 \
  --member="serviceAccount:search-console-data-export@system.gserviceaccount.com" \
  --role="roles/bigquery.jobUser"

gcloud projects add-iam-policy-binding hf-search-console-ab-2026 \
  --member="serviceAccount:search-console-data-export@system.gserviceaccount.com" \
  --role="roles/bigquery.dataEditor"
```

Both bindings succeeded without billing being enabled — IAM grants aren't
gated by billing, only the export's actual data writes are (§4).

**This alone is not enough.** As with the legacy collector, **Cloud IAM
access ≠ Search Console access.** You still must activate the export from
inside Search Console itself (§6) — no `gcloud` command does that part.

## 4. Billing — required for native export, unlike the legacy collector

Google's documentation states plainly: *"You must set up a Google Cloud
project with billing and enable BigQuery."* This is a **hard requirement**
for Bulk Data Export — there is no sandbox/no-billing path the way the legacy
collector's load-job workaround found for itself.

Current status: **billing is not linked** to `hf-search-console-ab-2026`.

**Owner action required** — link the existing open billing account already on
this Google login (found via `gcloud billing accounts list`, not created for
this task):

```bash
gcloud billing projects link hf-search-console-ab-2026 \
  --billing-account=011B17-693F64-529C29   # "My Billing Account 2"
```

Or in Console: **hf-search-console-ab-2026 → Billing → Link a billing account.**

**On cost:** BigQuery has an always-free monthly tier (1 TB queried, 10 GB
active storage). A single small site's daily Search Console export is
extremely unlikely to exceed that in query volume, and storage for a few
years of daily rows for one property is measured in low hundreds of MB, not
GB. That said, **this is not a guarantee of $0** — actual cost depends on how
much ad-hoc querying happens against the data (e.g. if a BI tool re-scans the
full table repeatedly instead of using date filters). Set the budget alert in
§10 so any real cost is visible immediately rather than assumed away.

## 5. What the legacy custom collector is for now

**Not deleted.** `seo_monitoring.search_console_daily` and
`scripts/seo/collect.ts` / `backfill.ts` / `inspect.ts` remain in the repo,
clearly re-labeled in their own doc comments. Ongoing role:

| Script | New role |
|---|---|
| `collect.ts` | Manual/diagnostic — pull a specific day on demand, not a scheduled job |
| `backfill.ts` | **Primary remaining use**: native export does not retroactively backfill history from before it was activated. Use this to pull that gap once, via the Search Console API directly. |
| `inspect.ts` | Unchanged — URL Inspection has no bulk-export equivalent at all, so this stays a standalone diagnostic tool regardless of which pipeline is primary. |

**Do not run both pipelines as parallel ongoing sources for the same dates.**
Once native export is live, treat it as the source of truth going forward;
only reach for the legacy table for dates before the export started, or to
spot-check the native export against an independent source if something
looks wrong.

The legacy table's `defaultTableExpirationMs` was set to 60 days
automatically when it was created without billing (BigQuery sandbox
behavior). If you want the legacy backfill data to persist alongside the new
native tables for later comparison, either link billing (§4 — which also
removes this expiration) or copy the backfilled rows into a table without
partition expiration before the 60-day window closes.

## 6. Owner action: activate the native export

This is a Search Console UI action — no API or `gcloud` command does this
part. Exact steps, verified against Google's current help documentation:

1. **Google Cloud Console** → confirm you're on `hf-search-console-ab-2026` →
   confirm billing is linked (§4) → confirm BigQuery API is enabled (already
   done, §2) → confirm the two IAM bindings from §3 are present (already
   done).
2. Go to **[Search Console](https://search.google.com/search-console)** →
   select the `https://www.cheapadelaideremovalist.com.au/` property →
   **Settings → Bulk data export**.
3. **Cloud project ID:** `hf-search-console-ab-2026`
4. **Dataset name:** Google's default is `searchconsole`. You can customize
   it, but **the dataset name always starts with the string `searchconsole`**
   even when customized — don't fight this, just accept the default unless
   you have a specific reason not to (it keeps `reports.sql` matching the
   default without edits).
5. **Location:** choose an Australian BigQuery location if offered/supported
   for this dataset (e.g. `australia-southeast1`, matching the legacy table's
   region for consistency). **Google explicitly warns this cannot be easily
   changed later once exports have begun** — get it right the first time.
6. Save/confirm the export configuration.

## 7. What Google creates — do not create these tables yourself

Google creates and writes to these tables itself once the export is active.
Do not manually create a same-named dataset/table — let the export do it, so
the schema exactly matches what Google's writer expects.

| Table | Grain | Key fields |
|---|---|---|
| `searchdata_site_impression` | one row per property × query × country × search_type × device × date | `data_date`, `site_url`, `query`, `is_anonymized_query`, `country`, `search_type`, `device`, `impressions`, `clicks`, `sum_top_position` |
| `searchdata_url_impression` | as above, plus per-URL | all of the above, plus `url`, `is_anonymized_discover`, several `is_<search_appearance_type>` booleans, and `sum_position` (replaces `sum_top_position`) |
| `ExportLog` | one row per successful daily export | `agenda`, `namespace`, `data_date`, `epoch_version`, `publish_time` — **only successful exports appear here**; a missing date means that day's export failed, not that there was no data |

**Position is zero-based in these tables, and rows are not pre-aggregated.**
Google's documented formula for a human-readable (1-based) average position:

```
SUM(sum_position) / SUM(impressions) + 1        -- searchdata_url_impression
SUM(sum_top_position) / SUM(impressions) + 1     -- searchdata_site_impression
```

**Never `AVG()` a row-level position column directly** — the data isn't
compressed/pre-aggregated, so a naive `AVG(sum_position)` across rows with
different impression counts will be wrong. Always weight by impressions using
the `SUM(...)/SUM(impressions)` pattern above. This is already implemented
correctly in `scripts/seo/sql/reports.sql`'s PRIMARY section — the legacy
section uses a different formula (§ below) because the legacy table's
`position` field is already 1-based, not zero-based.

## 8. Timing

- **First export:** up to 48 hours after successful configuration (Google's
  documented figure — plan around this, don't assume same-day data).
- **Ongoing exports:** once per day, not necessarily at the same time across
  the two tables.
- **Retries:** transitory errors retry immediately; non-transitory errors
  wait until the next scheduled export and keep retrying for about a week.
- **No automatic historical backfill** — data from before the export was
  activated is not backfilled by Google. Use `scripts/seo/backfill.ts`
  against the Search Console API for that gap (§5).
- Check `ExportLog` (query 9 in `reports.sql`) to confirm exports are
  actually landing, rather than assuming silence means success.

## 9. Secrets

- No service account key was created or downloaded for either pipeline.
  Native export uses Google's own system identity with no key material on
  this side at all. The legacy collector uses your own `gcloud auth
  application-default login` session for local/manual runs.
- `.env.local` and all `.env*` files except `.env.example` are already
  gitignored (pre-existing repo convention). `.env.example` holds placeholders
  only.
- If any future automation genuinely needs a downloadable key, it must go
  through **Secret Manager**, never `.env`, Git, or a `NEXT_PUBLIC_` variable.
  The frontend never touches any of this — these are standalone Node scripts,
  entirely separate from the Next.js build.

## 10. Cost control checklist

- [ ] Link billing (§4) — required before native export can be activated at all.
- [ ] Set a budget alert once billing is linked: Console → **Billing →
      Budgets & alerts** → create a small alert (e.g. $5 AUD/month) on
      `hf-search-console-ab-2026`. (The `gcloud billing budgets create` CLI
      needs a JSON filter payload — the Console UI is the faster path for a
      one-off alert like this.)
- [x] Native export runs once/day by design — no scheduling decision to make
      or get wrong on this side.
- [x] No Cloud Run/Cloud Scheduler deployed or recommended as the ongoing
      pipeline — removed from this document (see §1). Don't stand up compute
      infrastructure to reproduce a feature Google already runs for free
      (beyond the storage/query cost) as part of the platform.
- [x] Both native tables are date-partitioned by Google — reporting queries
      that filter on a date range only scan the partitions they need.
- [ ] Once billing is enabled, decide a retention policy consciously (e.g.
      `bq update --time_partitioning_expiration`). For this business, keep
      history — 30/60/90-day comparisons, seasonality, and year-over-year
      trend analysis are exactly what a removalist business's SEO benefits
      from, and native export gives no reason to aggressively expire data the
      way the billing-less legacy table's default did.

## 11. Running the legacy collector (backfill / manual / diagnostic only)

```bash
# One-time: authenticate your own Google account for local use.
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly

# Copy the env template and fill in the two required values.
cp .env.example .env.local
#   GOOGLE_CLOUD_PROJECT_ID=hf-search-console-ab-2026
#   SEARCH_CONSOLE_SITE_URL=https://www.cheapadelaideremovalist.com.au/

# Backfill history from before native export was activated.
npm run seo:backfill -- --start 2026-08-01 --end 2026-09-25

# Pull one specific day manually (diagnostic/recovery only — not scheduled).
npm run seo:collect -- --date 2026-09-25

# Check indexing/crawl state for one URL (read-only, does not request indexing).
npm run seo:inspect -- --url https://www.cheapadelaideremovalist.com.au/service-areas/adelaide-cbd-inner-metro
```

`GOOGLE_CLOUD_PROJECT_ID` and `SEARCH_CONSOLE_SITE_URL` are required; the
script fails fast with a clear error naming the missing variable if either is
unset. You (or the identity you authenticate as) must be added as a Search
Console user on the property first — Cloud IAM access does not grant this
(§3 applies here too).

### Idempotency (legacy collector only — native export is Google's own concern)

BigQuery DML (`DELETE`/`MERGE`/`UPDATE`) is rejected outright on this project
without billing ("DML queries are not allowed in the free tier" — confirmed
by an actual failed request while building this). So `upsertDay()` in
`lib/bigquery.ts` instead runs a **load job** with `writeDisposition:
WRITE_TRUNCATE` targeted at the date's partition decorator
(`search_console_daily$20260925`), atomically replacing just that day's data.
Re-running the same `--date` twice produces exactly the same rows, not
duplicates — verified live (2 rows in, re-run, still exactly 2 rows).

## 12. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| No native export tables appear after 48+ hours | Export not actually activated, or billing wasn't linked when you tried | Re-check §4 and §6; the export setup screen in Search Console will show an error if billing/API prerequisites aren't met |
| A date is missing from `ExportLog` | That day's export failed (retries for ~1 week, then gives up) | Cross-check with `scripts/seo/collect.ts --date <that-date>` as a manual fallback for that one day |
| `403 ... Billing has not been enabled` from BigQuery | Billing genuinely isn't linked yet | Complete §4 — this blocks native export entirely, unlike the legacy collector |
| Legacy collector: `403 insufficientPermissions` / `ACCESS_TOKEN_SCOPE_INSUFFICIENT` | Your ADC session wasn't granted the `webmasters.readonly` scope | Re-run the `gcloud auth application-default login --scopes=...` command in §11 |
| Legacy collector: `403 ... does not have permission to access site` | The Google identity you're running as hasn't been added in Search Console → Users and permissions | This is a Search Console setting, not a Cloud IAM setting — see §3 |
| Legacy table appears empty after ~60 days | Sandbox auto-expiration (no billing) | Link billing (§4) before that window closes if you need the legacy backfill to persist |
| `Missing required environment variable` | `.env.local` not created/filled | `cp .env.example .env.local` and fill in the two required values |
