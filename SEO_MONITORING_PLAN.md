# SEO Monitoring Plan — Cheap Adelaide Removalist

Status as of this plan: SEO architecture, local pages, schema, sitemap, robots,
internal linking, and technical/accessibility QA are complete and live
(production commit `d939b6a`, built on `2762b0f` / `62ba2fe`). This is the
handover from **building** to **measuring**. No further pages should be
created from speculation — only from evidence below.

## 0. Implementation platform: Google Cloud, first-party only

The data pipeline behind this plan is:

**Search Console (official API) → Google Cloud project `hf-search-console-ab-2026`
→ BigQuery dataset `seo_monitoring` → SQL reports.**

Full setup, credentials, and operating instructions live in
[`GOOGLE_CLOUD_SEO_SETUP.md`](./GOOGLE_CLOUD_SEO_SETUP.md) — read that before
running anything below. Reusable report queries live in
[`scripts/seo/sql/reports.sql`](./scripts/seo/sql/reports.sql).

This is explicitly **not** a GSC Wizard, ChatGPT Search Console plugin, or any
other third-party connector — every step uses Google's own APIs and Google
Cloud infrastructure that this business account already controls. Where a
metric below can be read directly in the Search Console UI, that's still the
fastest path for a quick check; BigQuery is for anything needing history
beyond what the UI shows, cross-dimension analysis (query × page × device ×
date), or the specific report queries in §14 below.

## 1. Google Search Console — what to watch

Check weekly for the first month, then fortnightly:

- **Total clicks / impressions / average CTR / average position** — Performance report, last 28 days, compare to previous period.
- **Indexed pages** — Pages report → confirm the count is tracking toward the ~37 URLs in `sitemap.xml`.
- **Excluded / not indexed** — read the *reason* for each excluded URL before acting; "Discovered, currently not indexed" on a brand-new page is normal for the first 1–2 weeks, not a problem.
- **Core Web Vitals report** — this is *field data* (real Chrome User Experience Report visitors), separate from any lab tool. Watch for URLs flagged "Poor" or "Needs improvement."
- **Sitemaps status** — confirm `sitemap.xml` shows "Success" and the discovered URL count matches (37 at time of writing: 11 static + 8 services + 12 guides + 6 areas).

## 2. Priority landing pages to track individually

Set these up as a saved/filtered comparison in Search Console (Pages filter):

- `/` (homepage)
- `/services`
- `/pricing`
- `/service-areas`
- All 6 region pages: `/service-areas/adelaide-cbd-inner-metro`, `/northern-suburbs-playford`, `/eastern-suburbs-foothills`, `/western-suburbs-coastal`, `/southern-suburbs-marion`, `/adelaide-hills-regional-sa`
- All 8 service pages under `/services/[slug]`
- The pillar guide: `/blog/cheap-removalists-adelaide-guide`, plus the other 11 guides as a secondary group

## 3. Query groups to watch (not pages to build around one query)

Group queries in the Performance report by intent, don't chase individual keywords:

- Core commercial: *removalists Adelaide, cheap removalists Adelaide, affordable removalists Adelaide*
- Service-specific: *house removalists Adelaide, apartment removalists Adelaide, office removalists Adelaide, furniture removals Adelaide*
- Cost/informational: *moving costs Adelaide, removalist quote Adelaide*
- Suburb/region: anything containing the six region names or their key hubs (Glenelg, Norwood, Elizabeth Vale, etc.)

A single query appearing once is not a signal. A *cluster* of related queries with real impression volume is.

## 4. Evaluation windows

### First 7 days after any deploy
- Sitemap discovered and "Success" in GSC
- New/changed URLs show as crawled (URL Inspection tool, one by one for the 6 region pages the first time)
- No unexpected `noindex` on any page (Page indexing report)
- No crawl errors in Page indexing → "Not found (404)" or "Server error (5xx)"
- No duplicate-canonical warnings
- **Do not judge rankings or traffic yet.**

### ~14–30 days
- Which pages are gaining impressions (Pages tab, sort by impressions, compare to prior period)
- Which queries Google is actually associating with each page (click into a page → Queries tab)
- Any unexpected overlap: two of our own pages ranking for the same commercial query (see §6)
- Pages with impressions but near-zero CTR (see §5)
- Pages with zero impressions after 30 days — note them, don't act yet

### ~30–60+ days — first real decisions
Only now, with real data, decide whether to:
- Improve a title/meta description (see §5)
- Strengthen a specific page's content because it's ranking but not converting on scroll
- Add internal links toward an under-linked but promising page
- Consolidate two pages that are confirmed to compete for the same query (see §6)
- Expand an existing page (e.g. add a query-driven FAQ) rather than create a new one
- Build a genuinely new page — only per the rule in §9

## 5. CTR opportunity method

When a page has **meaningful impressions** and a **reasonable average position** (roughly top 15) but **CTR is clearly below what similar-position pages get**:

1. Read the actual title and meta description as Google is likely truncating/rendering them (use the URL Inspection tool's rendered view, not just the source).
2. Compare against the top 3–5 ranking competitors for that query — what do their titles promise that ours doesn't?
3. Check the query itself matches the page's actual intent — a low CTR can mean the *query* doesn't match the page, not that the *title* is bad.
4. If a change is warranted, edit **one page's** title/description, wait ~2–3 weeks, compare CTR for that page only.

Never keyword-stuff a title to chase CTR. Never change more than a few titles at once — it destroys the ability to attribute any CTR change to a specific edit.

> Query 3 in `scripts/seo/sql/reports.sql` ("Low-CTR opportunities") gives the raw page×query numbers to start from — it deliberately has no CTR threshold baked in, since "weak" only means something relative to that query's position.

## 6. Cannibalisation monitoring

If two of our own pages start appearing for the same important commercial query (visible via Search Console's per-query page breakdown):

- Compare intent: is one page genuinely a service page and the other a location or guide page? That's not cannibalisation, that's expected overlap.
- Compare position and clicks: is one page clearly dominant and the other an occasional fluke? Usually not a real problem.
- Only treat it as real cannibalisation if both pages are getting meaningful, sustained impressions for the *same* query with *similar* positions over multiple weeks.
- If confirmed: strengthen internal links toward the intended canonical page, and/or adjust the weaker page's focus — don't redirect or delete based on one week of data, and never on a whim.

> Query 5 in `scripts/seo/sql/reports.sql` ("Cannibalisation candidates") returns queries where more than one page clears 20+ combined impressions — a candidate list to review manually, not an automatic verdict.

## 7. Local SEO measurement (the six region pages)

Treat the current six-region architecture (`adelaide-cbd-inner-metro`, `northern-suburbs-playford`, `eastern-suburbs-foothills`, `western-suburbs-coastal`, `southern-suburbs-marion`, `adelaide-hills-regional-sa`) as the baseline — not a placeholder for more granular suburb pages.

Watch whether each region page starts earning impressions for:
- its own region name + "removalists"
- the specific suburb names listed in its `keyHubs`

**Do not create individual suburb pages** (e.g. a standalone Glenelg page) unless Search Console shows a specific suburb generating substantial, sustained query volume that the regional page isn't capturing — and even then, weigh that against the doorway-page risk this architecture was deliberately built to avoid.

> Query 7 in `scripts/seo/sql/reports.sql` ("Regional SEO") filters straight to the six `/service-areas/*` pages.

## 8. Google Business Profile consistency

Keep NAP (name, address, phone) and business hours **identical** across:
- the website (single source of truth: `src/config/business.ts`)
- Google Business Profile
- Search Console verified property
- any social profiles

This is a manual owner check — the codebase does not and should not auto-sync GBP. Do not change GBP listing information from this repo or based on assumptions; only the business owner should update GBP directly, using the same verified facts already in `business.ts`.

## 9. Content expansion rule — when a new page is actually justified

Add a new page only when at least one is true:
1. Search Console reveals a substantial, sustained query cluster with no existing page serving it.
2. Real customers repeatedly ask a question not answered anywhere on the site.
3. It documents a verified service not yet covered (confirm with the business first — never assume a new service exists).
4. An existing page structurally cannot satisfy the intent (e.g. a commercial service page can't also carry a long-form guide without hurting both).
5. Direct SERP/competitor research shows a concrete, specific gap — not "they have more pages than us."

**Never publish a page purely to increase page count.** Every page added this way should get logged with the trigger (one of the five above) and the Search Console evidence that justified it.

## 10. Core Web Vitals — measurement, not fabrication

The technical QA pass (see prior commits) verified the *implementation* is correct (preload mechanism, font strategy, no layout-shift risk, no unnecessary render-blocking scripts) but did **not** produce real LCP/INP/CLS numbers — there's no Lighthouse/CrUX tooling in this environment.

Going forward:
- **Field data (real visitors):** Google Search Console → Core Web Vitals report, and/or the CrUX report at PageSpeed Insights. This is what Google actually uses for ranking signals.
- **Lab data (simulated, single run):** PageSpeed Insights or Lighthouse. Useful for debugging *why* a metric is poor, not as a ranking proxy.

Always state which of the two you're looking at — they can disagree, and only field data reflects real users on real networks/devices.

## 11. First action after this deploys

**Open Google Search Console → Sitemaps, and confirm `sitemap.xml` shows "Success" with the current URL count (37).** Then use the URL Inspection tool on the 6 new region pages to request indexing if they haven't been crawled yet. Everything else in this plan depends on data that only starts accumulating once GSC has actually crawled these URLs — so this is the one action that unblocks the rest of the measurement plan.
