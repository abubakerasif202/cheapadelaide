# Google Cloud SEO Data Pipeline — Setup & Operations

Architecture: **Google Search Console API → Google Cloud (BigQuery) → SQL
reports.** No third-party Search Console connectors, no "GSC Wizard," no
ChatGPT plugins — this is first-party Google infrastructure end to end.

```
Search Console (official API)
        │
        ▼
scripts/seo/collect.ts  (Node/TypeScript, run locally or scheduled)
        │
        ▼
BigQuery  hf-search-console-ab-2026.seo_monitoring.search_console_daily
        │
        ▼
scripts/seo/sql/reports.sql  (top queries, top pages, CTR, cannibalisation, ...)
```

## 1. What already exists (audited, not assumed)

Running `gcloud auth list` / `gcloud config list` / `gcloud projects list`
found an existing project already scoped to this business — **do not create a
new project.**

| Item | Value |
|---|---|
| Project ID | `hf-search-console-ab-2026` |
| Project number | `161826315730` |
| Region used for BigQuery | `australia-southeast1` |
| Active gcloud account | `abubakerasif202@gmail.com` |
| Also credentialed | `Admin@hfremovalsadelaide.com.au`, `abubakarasif2002@gmail.com` |
| Billing | **NOT enabled** on this project (see §6 — this is the one real blocker) |

APIs already enabled on the project (checked with `gcloud services list
--enabled` before touching anything): `bigquery.googleapis.com`,
`searchconsole.googleapis.com`, plus several BigQuery sub-APIs, IAM/logging
basics. No new APIs needed to be enabled for this pipeline.

## 2. What this task created

- **Service account:** `seo-monitor@hf-search-console-ab-2026.iam.gserviceaccount.com`
  — created with `gcloud iam service-accounts create`. No key file was downloaded
  or committed anywhere.
- **IAM roles granted** (least privilege, not Owner/Editor):
  - `roles/bigquery.dataEditor` — write access to datasets/tables only
  - `roles/bigquery.jobUser` — permission to run load/query jobs
- **BigQuery dataset:** `seo_monitoring` in `australia-southeast1`
- **BigQuery table:** `search_console_daily` — partitioned by `date` (DAY),
  clustered by `page, query`. Schema:

  | field | type | notes |
  |---|---|---|
  | `date` | DATE | required, partition key |
  | `query` | STRING | nullable — some rows have no query dimension |
  | `page` | STRING | nullable |
  | `country` | STRING | ISO-3 lowercase (Search Console format, e.g. `aus`) |
  | `device` | STRING | `DESKTOP` / `MOBILE` / `TABLET` |
  | `clicks` | INTEGER | |
  | `impressions` | INTEGER | |
  | `ctr` | FLOAT | as returned by the API (0–1, not a percentage) |
  | `position` | FLOAT | average position for that row's dimension combo |
  | `site_url` | STRING | which Search Console property this came from |
  | `row_key` | STRING | required — sha256 of the row's identifying fields, for future de-duplication tooling |
  | `loaded_at` | TIMESTAMP | required — when the collector wrote this row |

- **Collector scripts** under `scripts/seo/` (TypeScript, run via `tsx` — no
  compiled build step needed):
  - `collect.ts` — one day
  - `backfill.ts` — a date range
  - `inspect.ts` — read-only URL Inspection lookup
  - `lib/searchConsole.ts`, `lib/bigquery.ts`, `lib/config.ts`

**This entire pipeline was end-to-end tested against the real project** — a
synthetic day of data was written, verified with a live BigQuery `SELECT`,
re-run to confirm idempotency (2 rows in, run twice, still 2 rows), then the
test partition was cleared out. No test data remains in the table.

## 3. IMPORTANT: IAM access ≠ Search Console access

Granting a service account (or your own Google account) IAM roles on the
**Google Cloud project** does **not** give it any access to **Search Console
data**. Those are two separate permission systems:

- **Google Cloud IAM** controls who can use BigQuery, Cloud Run, etc. — set
  via `gcloud`/the Cloud Console.
- **Search Console property permissions** control who/what can *read the
  site's search data* — set inside [Search Console itself](https://search.google.com/search-console),
  under **Settings → Users and permissions**.

**You (the owner) must manually add the collector's identity as a Search
Console user before `collect.ts` can read any data.** There is no API or
`gcloud` command that grants this — it has to be done in the Search Console
UI by someone who already has Owner access on the property.

### For local/manual runs (recommended to start)
Add your own Google account (the one you'll run `gcloud auth
application-default login` as) as a **Full user** (read access is enough) on
the `https://www.cheapadelaideremovalist.com.au/` property in Search Console.

### For scheduled/automated runs (once you're ready to automate)
Add `seo-monitor@hf-search-console-ab-2026.iam.gserviceaccount.com` as a user
on the same property in Search Console, the same way.

## 4. Running the collector locally

```bash
# One-time: authenticate your own Google account for local use.
# This grants the collector's Application Default Credentials, scoped to
# BigQuery + Search Console read-only — nothing else.
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters.readonly

# Copy the env template and fill in the two required values.
cp .env.example .env.local
#   GOOGLE_CLOUD_PROJECT_ID=hf-search-console-ab-2026
#   SEARCH_CONSOLE_SITE_URL=https://www.cheapadelaideremovalist.com.au/
#   (the rest have sensible defaults already in .env.example)

# Collect the last complete day (Search Console data is usually 2-3 days
# behind real-time, so the collector defaults to "2 days ago").
npm run seo:collect

# Collect a specific day.
npm run seo:collect -- --date 2026-09-25

# Backfill a range (Search Console typically retains ~16 months).
npm run seo:backfill -- --start 2026-08-01 --end 2026-09-25

# Check indexing/crawl state for one URL (read-only, does not request indexing).
npm run seo:inspect -- --url https://www.cheapadelaideremovalist.com.au/service-areas/adelaide-cbd-inner-metro
```

`GOOGLE_CLOUD_PROJECT_ID` and `SEARCH_CONSOLE_SITE_URL` are required; the
script fails fast with a clear error naming the missing variable if either is
unset.

## 5. Idempotency — how re-running is made safe

BigQuery **DML** (`DELETE`, `MERGE`, `UPDATE`) is rejected outright on a
project without billing enabled ("DML queries are not allowed in the free
tier" — confirmed by an actual failed request during this setup). A naive
`DELETE WHERE date = ...` then `INSERT` approach would simply not work here.

Instead, `upsertDay()` in `lib/bigquery.ts` runs a **load job** with
`writeDisposition: WRITE_TRUNCATE` targeted at the date's **partition
decorator** (`search_console_daily$20260925`). Load jobs are not restricted
the same way DML is, and `WRITE_TRUNCATE` against a specific partition
atomically replaces only that day's data — nothing else in the table is
touched. Re-running the same `--date` twice produces exactly the same rows,
not duplicates. **This was verified live** (see §2).

## 6. The one real limitation: billing is not enabled

BigQuery's free "sandbox" mode (no billing account) is what makes everything
in this document work **today** — no cost, no owner action needed to try it.
It has two consequences worth knowing about:

1. **Tables auto-expire after 60 days** (`defaultTableExpirationMs` /
   `defaultPartitionExpirationMs` = 5,184,000,000 ms, applied automatically
   when the dataset was created without billing). For a monitoring pipeline
   meant to support month-over-month and longer comparisons, this is a real
   problem — data collected today will be gone in ~60 days unless billing is
   enabled before then.
2. **DML stays unavailable** — not a blocker for this collector (it's
   designed around load jobs specifically because of this), but it would
   block writing any BigQuery scheduled query, MERGE-based dedup job, or
   similar tooling you might want to add later.
3. **Cloud Run / Cloud Scheduler cannot be deployed** without billing — those
   products require an active billing account regardless of actual usage
   cost. The automation recipe in §7 is written and ready, but cannot be
   deployed until this is resolved.

**Owner action required:** link the existing open billing account
(`My Billing Account 2`, ID `011B17-693F64-529C29`, already on this Google
account — found via `gcloud billing accounts list`, not created for this
task) to `hf-search-console-ab-2026`:

```bash
gcloud billing projects link hf-search-console-ab-2026 \
  --billing-account=011B17-693F64-529C29
```

Expected cost for a business this size: effectively **$0/month** — BigQuery's
always-free tier (1 TB queried/month, 10 GB storage/month) comfortably covers
daily Search Console exports for one site. Set a budget alert anyway (§9)
so nothing surprises you.

## 7. Automation (ready to deploy once billing is enabled)

Recommended shape: **Cloud Scheduler → Cloud Run job**, not Cloud Functions —
the collector already runs as a small, self-contained Node script with no
HTTP server needed, and Cloud Run jobs (not services) are built for exactly
this "run to completion, on a schedule" pattern.

```bash
# 1. Build and deploy as a Cloud Run job (from the repo root).
gcloud run jobs deploy seo-collector \
  --source=. \
  --region=australia-southeast1 \
  --service-account=seo-monitor@hf-search-console-ab-2026.iam.gserviceaccount.com \
  --set-env-vars="GOOGLE_CLOUD_PROJECT_ID=hf-search-console-ab-2026,SEARCH_CONSOLE_SITE_URL=https://www.cheapadelaideremovalist.com.au/" \
  --command="npx" \
  --args="tsx,scripts/seo/collect.ts" \
  --max-retries=1 \
  --cpu=1 --memory=512Mi \
  --task-timeout=300

# 2. Schedule it daily, comfortably after Search Console data is likely final
# (mid-morning UTC covers the "2 days ago" default with margin).
gcloud scheduler jobs create http seo-collector-daily \
  --location=australia-southeast1 \
  --schedule="0 9 * * *" \
  --uri="https://australia-southeast1-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/hf-search-console-ab-2026/jobs/seo-collector:run" \
  --http-method=POST \
  --oauth-service-account-email=seo-monitor@hf-search-console-ab-2026.iam.gserviceaccount.com
```

You'll also need to grant the service account `roles/run.invoker` for the
Scheduler → Cloud Run call to work, and confirm the service account has been
added as a Search Console user (§3) *before* the first scheduled run — a
missing property permission fails loudly (403) rather than silently.

This was **not deployed** as part of this task — it requires billing (§6),
which is an owner decision, not something to enable unilaterally.

## 8. Secrets

- No service account key was created or downloaded. Local runs use your own
  `gcloud auth application-default login` session; the Cloud Run deployment
  in §7 uses the service account's *runtime identity* (no key file at all).
- If a deployment path genuinely needs a downloadable key (it shouldn't, per
  above), it must go through **Secret Manager**, never into `.env`, Git, or a
  `NEXT_PUBLIC_` variable. This app's frontend never touches any of this —
  the collector is a standalone Node script, entirely separate from the
  Next.js build.
- `.env.local` and all `.env*` files except `.env.example` are already
  gitignored (pre-existing repo convention).

## 9. Cost control checklist

- [ ] Set a budget alert once billing is linked: `gcloud billing budgets
      create --billing-account=011B17-693F64-529C29 --display-name="SEO
      monitoring" --budget-amount=5AUD` (adjust threshold rules in Console —
      the CLI budget API needs a JSON filter payload, easier to do this one
      step in the Console UI: **Billing → Budgets & alerts**).
- [x] One scheduled execution/day, not continuous — kept in the recipe above.
- [x] Cloud Run job resources kept minimal (`--cpu=1 --memory=512Mi`) — this
      script does nothing CPU/memory-intensive.
- [x] BigQuery table is partitioned by date — reporting queries that filter
      on a date range only scan the partitions they need, not the whole table.
- [ ] Once billing is enabled, decide a retention policy consciously (e.g.
      `bq update --time_partitioning_expiration` for e.g. 400 days) rather
      than leaving the default forever-retention that billing removes.

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `403 insufficientPermissions` / `ACCESS_TOKEN_SCOPE_INSUFFICIENT` calling Search Console | Your ADC session wasn't granted the `webmasters.readonly` scope | Re-run the `gcloud auth application-default login --scopes=...` command in §4 |
| `403 ... does not have permission to access site` | The Google identity you're running as hasn't been added in Search Console → Users and permissions | Complete §3 — this is a Search Console setting, not a Cloud IAM setting |
| `403 ... Billing has not been enabled` on any BigQuery call | You're on a code path that needs DML (this collector shouldn't hit this — see §5) or something outside this pipeline attempted DML | Confirm you're using `upsertDay()` as shipped; if extending the pipeline, prefer load jobs over DML until billing is linked |
| Table appears empty after ~60 days | Sandbox auto-expiration (§6) | Link billing before that window closes if you need longer retention |
| `Missing required environment variable` | `.env.local` not created/filled | `cp .env.example .env.local` and fill in the two required values |
