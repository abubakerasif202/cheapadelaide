-- SEO reporting queries for Cheap Adelaide Removalist
-- Table: `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
-- Run these in the BigQuery console, `bq query`, or any BI tool pointed at the dataset.
-- Replace the project/dataset/table if you've configured different values in .env.

-- =====================================================================
-- 1. TOP QUERIES (last 28 days)
-- =====================================================================
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

-- =====================================================================
-- 2. TOP LANDING PAGES (last 28 days)
-- =====================================================================
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

-- =====================================================================
-- 3. LOW-CTR OPPORTUNITIES (last 28 days)
-- No arbitrary CTR threshold — returns raw numbers grouped by page+query
-- so a human decides what "meaningful impressions, weak CTR" means here.
-- Sort by impressions descending and eyeball the ctr column yourself.
-- =====================================================================
SELECT
  page,
  query,
  SUM(clicks) AS clicks,
  SUM(impressions) AS impressions,
  SAFE_DIVIDE(SUM(clicks), SUM(impressions)) AS ctr,
  SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND page IS NOT NULL AND query IS NOT NULL
GROUP BY page, query
HAVING SUM(impressions) >= 10 -- floor only to cut pure noise (1-2 impressions), not a "meaningful" cutoff
ORDER BY impressions DESC, ctr ASC
LIMIT 100;

-- =====================================================================
-- 4. RANKING MOVERS — this period vs the prior equivalent period
-- Compares the last 28 days against the 28 days before that, per query.
-- =====================================================================
WITH recent AS (
  SELECT query,
    SUM(clicks) AS clicks,
    SUM(impressions) AS impressions,
    SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
  FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND query IS NOT NULL
  GROUP BY query
),
previous AS (
  SELECT query,
    SUM(clicks) AS clicks,
    SUM(impressions) AS impressions,
    SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS avg_position
  FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY)
    AND date < DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND query IS NOT NULL
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
WHERE previous.impressions >= 5 OR recent.impressions >= 5 -- drop pure noise on both sides
ORDER BY ABS(COALESCE(position_improvement, 0)) DESC
LIMIT 50;

-- =====================================================================
-- 5. CANNIBALISATION CANDIDATES (last 28 days)
-- Queries where MORE THAN ONE of our own pages receives material
-- impressions. Read this as a candidate list, not a verdict — check
-- intent, position and click share before concluding it's a real
-- overlap (see SEO_MONITORING_PLAN.md section 6).
-- =====================================================================
SELECT
  query,
  COUNT(DISTINCT page) AS distinct_pages,
  SUM(impressions) AS total_impressions,
  SUM(clicks) AS total_clicks,
  ARRAY_AGG(STRUCT(page, page_impressions, page_clicks, page_avg_position) ORDER BY page_impressions DESC) AS pages
FROM (
  SELECT
    query,
    page,
    SUM(impressions) AS page_impressions,
    SUM(clicks) AS page_clicks,
    SAFE_DIVIDE(SUM(position * impressions), SUM(impressions)) AS page_avg_position
  FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND query IS NOT NULL AND page IS NOT NULL
  GROUP BY query, page
)
GROUP BY query
HAVING distinct_pages > 1 AND total_impressions >= 20 -- both pages need to clear real volume, not 1-impression flukes
ORDER BY total_impressions DESC
LIMIT 50;

-- =====================================================================
-- 6. NEW QUERIES — appeared in the last 28 days, absent from the 28
-- days before that.
-- =====================================================================
WITH recent_queries AS (
  SELECT DISTINCT query
  FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND query IS NOT NULL
),
previous_queries AS (
  SELECT DISTINCT query
  FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 56 DAY)
    AND date < DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
    AND query IS NOT NULL
)
SELECT
  r.query,
  SUM(s.clicks) AS clicks,
  SUM(s.impressions) AS impressions
FROM recent_queries r
LEFT JOIN previous_queries p USING (query)
JOIN `hf-search-console-ab-2026.seo_monitoring.search_console_daily` s
  ON s.query = r.query AND s.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
WHERE p.query IS NULL
GROUP BY r.query
ORDER BY impressions DESC
LIMIT 50;

-- =====================================================================
-- 7. REGIONAL SEO — the six /service-areas pages (last 28 days)
-- =====================================================================
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

-- =====================================================================
-- 8. QUERY GROUPS — theme buckets, not a page-generation trigger.
-- Extend the CASE branches as real query patterns emerge; do not create
-- a new landing page just because a bucket has volume (see
-- SEO_MONITORING_PLAN.md section 9).
-- =====================================================================
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
FROM `hf-search-console-ab-2026.seo_monitoring.search_console_daily`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY)
  AND query IS NOT NULL
GROUP BY query_group
ORDER BY impressions DESC;
