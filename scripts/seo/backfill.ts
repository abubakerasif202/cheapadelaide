#!/usr/bin/env node
/**
 * Backfills a date range, one day at a time, reusing the same idempotent
 * upsert as collect.ts. Search Console typically retains ~16 months of data.
 *
 * Usage:
 *   npm run seo:backfill -- --start 2026-08-01 --end 2026-09-25
 */
import { loadConfig, toDateString } from "./lib/config";
import { fetchDayRows } from "./lib/searchConsole";
import { upsertDay } from "./lib/bigquery";

function parseArgs(): { start: string; end: string } {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const idx = args.indexOf(flag);
    return idx >= 0 ? args[idx + 1] : undefined;
  };
  const start = get("--start");
  const end = get("--end");
  if (!start || !end || !/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    throw new Error("Usage: npm run seo:backfill -- --start YYYY-MM-DD --end YYYY-MM-DD");
  }
  return { start, end };
}

function* eachDate(start: string, end: string): Generator<string> {
  const cur = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cur <= last) {
    yield toDateString(cur);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
}

async function main() {
  const { start, end } = parseArgs();
  const config = loadConfig();

  console.log(`[seo:backfill] site=${config.siteUrl} range=${start}..${end}`);

  let totalDays = 0;
  let totalRows = 0;
  const failures: string[] = [];

  for (const date of eachDate(start, end)) {
    try {
      const rows = await fetchDayRows(config.siteUrl, date);
      const { inserted } = await upsertDay(config, config.siteUrl, date, rows);
      console.log(`[seo:backfill] ${date}: ${inserted} rows`);
      totalDays += 1;
      totalRows += inserted;
    } catch (err) {
      console.error(`[seo:backfill] ${date} FAILED: ${err instanceof Error ? err.message : String(err)}`);
      failures.push(date);
    }
  }

  console.log(`[seo:backfill] done: ${totalDays} days, ${totalRows} rows, ${failures.length} failures`);
  if (failures.length > 0) {
    console.error(`[seo:backfill] failed dates: ${failures.join(", ")}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`[seo:backfill] FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
