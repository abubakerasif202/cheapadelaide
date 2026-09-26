-- SEO reporting queries for Cheap Adelaide Removalist
--
-- PRIMARY architecture (§ PRIMARY below): Search Console's official Bulk
-- Data Export → BigQuery. Google creates and writes these tables itself once
-- the owner activates the export in Search Console — see
-- GOOGLE_CLOUD_SEO_SETUP.md § "Native Bulk Data Export" for activation
-- steps. Until that export has been running long enough to have real data,
-- the queries below are SYNTAX-CHECKED ONLY, not verified against live
-- rows — see the note at the top of each query.
--
-- LEGACY architecture (§ LEGACY below): the custom collector in
-- scripts/seo/collect.ts, writing to our own seo_monitoring.search_console_daily
-- table. Kept only for pre-export historical backfill, URL Inspection, and
-- manual diagnostics — not the ongoing production source. See
-- GOOGLE_CLOUD_SEO_SETUP.md for why.
--
-- Replace `hf-search-console-ab-2026.searchconsole` below with your actual
-- project + dataset name if you chose something other than the default
-- `searchconsole` when activating the export (the dataset name always
-- starts with "searchconsole" even if customized — see setup doc).

-- =====================================================================
-- PRIMARY: queries against Google's native Bulk Data Export tables
-- =====================================================================
--
-- IMPORTANT — position is ZERO-BASED in the native schema.
-- Google's documented formula for a human-readable (1-based) average
-- position is:
--     SUM(sum_position) / SUM(impressions) + 1        -- url-level table
--     SUM(sum_top_position) / SUM(impressions) + 1     -- site-level table
-- This is DIFFERENT from the legacy custom table below, where `position`
-- came directly from the Search Console API already 1-based (no +1 needed).
-- Do not mix the two formulas across tables.
--
-- STATUS: not yet verified against live data — the native export has not
-- been activated yet (requires owner action, see GOOGLE_CLOUD_SEO_SETUP.md).
-- Each query below was syntax-checked against the documented schema only.

-- 1. TOP QUERIES (last 28 days) — url-level table gives page+query together
SELECT
  query,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND is_anonymized_query = FALSE
GROUP BY query
ORDER BY clicks DESC, impressions DESC
LIMIT 50;

-- 2. TOP LANDING PAGES (last 28 days)
SELECT
  url,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
GROUP BY url
ORDER BY clicks DESC, impressions DESC
LIMIT 50;

-- 3. LOW-CTR OPPORTUNITIES (last 28 days)
-- No arbitrary CTR threshold — returns raw numbers grouped by url+query so
-- a human decides what "meaningful impressions, weak CTR" means here.
SELECT
  url,
  query,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND is_anonymized_query = FALSE
GROUP BY url, query
HAVING SUM(impressions) >= 10 -- floor only to cut pure noise, not a "meaningful" cutoff
ORDER BY impressions DESC, ctr ASC
LIMIT 100;

-- 4. RANKING MOVERS — this period vs the prior equivalent period
WITH recent AS (
  SELECT query,
    SUM(clicks) AS clicks,
    SUM(impressions) AS impressions,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
  FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND is_anonymized_query = FALSE
  GROUP BY query
),
previous AS (
  SELECT query,
    SUM(clicks) AS clicks,
    SUM(impressions) AS impressions,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
  FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY)
    AND data_date < DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND is_anonymized_query = FALSE
  GROUP BY query
)
SELECT
  COALESCE(recent.query, previous.query) AS query,
  previous.avg_position AS prior_position,
  recent.avg_position AS current_position,
  (previous.avg_position - recent.avg_position) AS position_improvement, -- positive = moved up
  previous.clicks AS prior_clicks,
  recent.clicks AS current_clicks,
  (recent.clicks - previous.clicks) AS click_change
FROM recent
FULL OUTER JOIN previous USING (query)
WHERE previous.impressions >= 5 OR recent.impressions >= 5
ORDER BY ABS(COALESCE(position_improvement, 0)) DESC
LIMIT 50;

-- 5. CANNIBALISATION CANDIDATES (last 28 days)
-- Candidate list, not a verdict — check intent, position and click share
-- before concluding it's a real overlap (see SEO_MONITORING_PLAN.md §6).
SELECT
  query,
  COUNT(DISTINCT url) AS distinct_pages,
  SUM(impressions) AS total_impressions,
  SUM(clicks) AS total_clicks,
  ARRAY_AGG(STRUCT(url, page_impressions, page_clicks, page_avg_position) ORDER BY page_impressions DESC) AS pages
FROM (
  SELECT
    query,
    url,
    SUM(impressions) AS page_impressions,
    SUM(clicks) AS page_clicks,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS page_avg_position
  FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND is_anonymized_query = FALSE
  GROUP BY query, url
)
GROUP BY query
HAVING distinct_pages > 1 AND total_impressions >= 20
ORDER BY total_impressions DESC
LIMIT 50;

-- 6. NEW QUERIES — appeared in the last 28 days, absent from the 28 days before
WITH recent_queries AS (
  SELECT DISTINCT query
  FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND is_anonymized_query = FALSE
),
previous_queries AS (
  SELECT DISTINCT query
  FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY)
    AND data_date < DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND is_anonymized_query = FALSE
)
SELECT
  r.query,
  SUM(s.clicks) AS clicks,
  SUM(s.impressions) AS impressions
FROM recent_queries r
LEFT JOIN previous_queries p USING (query)
JOIN `hf-search-console-ab-2026.searchconsole.searchdata_url_impression` s
  ON s.query = r.query AND s.data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
WHERE p.query IS NULL
GROUP BY r.query
ORDER BY impressions DESC
LIMIT 50;

-- 7. REGIONAL SEO — the six /service-areas pages (last 28 days)
SELECT
  url,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1 AS avg_position
FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND url LIKE '%/service-areas/%'
GROUP BY url
ORDER BY impressions DESC;

-- 8. QUERY GROUPS — theme buckets, not a page-generation trigger.
-- Extend the CASE branches as real query patterns emerge; do not create a
-- new landing page just because a bucket has volume (see
-- SEO_MONITORING_PLAN.md §9).
SELECT
  CASE
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bcheap\b.*adelaide|adelaide.*\bcheap\b') THEN 'cheap removalists adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\baffordable\b.*adelaide|adelaide.*\baffordable\b') THEN 'affordable removalists adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bhouse\b.*remov') THEN 'house removalists adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bapartment\b.*remov') THEN 'apartment removalists adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\boffice\b.*remov') THEN 'office removalists adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bfurniture\b.*remov') THEN 'furniture removals adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bcost\b|\bprice\b|\bquote\b') AND REGEXP_CONTAINS(LOWER(query), r'adelaide|remov') THEN 'moving costs adelaide'
    WHEN REGEXP_CONTAINS(LOWER(query), r'\bremovalist') AND REGEXP_CONTAINS(LOWER(query), r'adelaide') THEN 'removalists adelaide (general)'
    ELSE 'other'
  END AS query_group,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr
FROM `hf-search-console-ab-2026.searchconsole.searchdata_url_impression`
WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND is_anonymized_query = FALSE
GROUP BY query_group
ORDER BY impressions DESC;

-- 9. EXPORT HEALTH — confirm the native export is actually landing data.
-- Query Google's own ExportLog table; only successful exports appear here.
SELECT data_date, publish_time
FROM `hf-search-console-ab-2026.searchconsole.ExportLog`
ORDER BY data_date DESC
LIMIT 14;


-- =====================================================================
-- LEGACY / BACKFILL: queries against our custom collector's table
-- =====================================================================
-- Table: `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
-- Populated by scripts/seo/collect.ts and scripts/seo/backfill.ts (the
-- Search Console API directly, not the bulk export). Use this ONLY for:
--   - dates before the native export was activated
--   - cross-checking/validating the native export once it's live
--   - manual diagnostics when the native export is delayed or failing
-- Do not run both this and the PRIMARY queries as parallel ongoing sources
-- for the same date range — pick native export data wherever it exists for
-- that date, and only fall back to this table for the gap before it started.
--
-- NOTE — `position` here is already 1-based (as returned directly by the
-- Search Console API's searchanalytics.query), UNLIKE the native tables'
-- zero-based sum_position/sum_top_position above. Do not add +1 here.

-- LEGACY 1. TOP QUERIES (last 28 days)
SELECT
  query,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND query IS NOT NULL
GROUP BY query
ORDER BY clicks DESC, impressions DESC
LIMIT 50;

-- LEGACY 2. TOP LANDING PAGES (last 28 days)
SELECT
  page,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND page IS NOT NULL
GROUP BY page
ORDER BY clicks DESC, impressions DESC
LIMIT 50;

-- LEGACY 3. REGIONAL SEO — for pre-export historical comparison only
SELECT
  page,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND page LIKE '%/service-areas/%'
GROUP BY page
ORDER BY impressions DESC;
