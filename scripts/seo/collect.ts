#!/usr/bin/env node
/**
 * Collects one day of Search Console performance data and upserts it into
 * BigQuery. Safe to re-run for the same date (see lib/bigquery.ts upsertDay).
 *
 * Usage:
 *   npm run seo:collect -- --date 2026-09-25
 *   npm run seo:collect            # defaults to the last complete date (2 days ago)
 */
import { loadConfig, lastCompleteDate } from "./lib/config";
import { fetchDayRows } from "./lib/searchConsole";
import { upsertDay } from "./lib/bigquery";

function parseArgs(): { date: string } {
  const args = process.argv.slice(2);
  const idx = args.indexOf("--date");
  const date = idx >= 0 ? args[idx + 1] : lastCompleteDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid --date "${date}". Expected YYYY-MM-DD.`);
  }
  return { date };
}

async function main() {
  const { date } = parseArgs();
  const config = loadConfig();

  console.log(`[seo:collect] site=${config.siteUrl} date=${date} project=${config.projectId}`);

  const rows = await fetchDayRows(config.siteUrl, date);
  console.log(`[seo:collect] fetched ${rows.length} rows from Search Console`);

  const { inserted } = await upsertDay(config, config.siteUrl, date, rows);
  console.log(`[seo:collect] upserted ${inserted} rows into ${config.dataset}.${config.table}`);
}

main().catch((err) => {
  console.error(`[seo:collect] FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
