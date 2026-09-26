import { BigQuery } from "@google-cloud/bigquery";
import { createHash } from "node:crypto";
import { writeFile, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { SearchConsoleRow } from "./searchConsole";
import type { SeoConfig } from "./config";

/**
 * Deterministic row key so re-collecting the same day is idempotent
 * (each row can be de-duplicated downstream if ever needed), not additive.
 */
export function rowKey(siteUrl: string, r: SearchConsoleRow): string {
  const raw = [siteUrl, r.date, r.query ?? "", r.page ?? "", r.country ?? "", r.device ?? ""].join("|");
  return createHash("sha256").update(raw).digest("hex");
}

/**
 * Idempotency strategy: BigQuery DML (DELETE/MERGE) requires a billing
 * account and is rejected outright in the free "sandbox" tier — see
 * GOOGLE_CLOUD_SEO_SETUP.md. Load jobs are NOT restricted the same way, so
 * instead of DELETE+INSERT we run a load job with WRITE_TRUNCATE against the
 * date partition decorator (`table$YYYYMMDD`). That atomically replaces only
 * that day's partition — re-running the same date twice still yields exactly
 * one copy of the data, with zero DML and zero billing requirement.
 */
export async function upsertDay(
  config: SeoConfig,
  siteUrl: string,
  date: string,
  rows: SearchConsoleRow[]
): Promise<{ inserted: number }> {
  const bq = new BigQuery({ projectId: config.projectId });
  const partitionSuffix = date.replaceAll("-", ""); // YYYY-MM-DD -> YYYYMMDD
  const table = bq.dataset(config.dataset).table(`${config.table}$${partitionSuffix}`);

  const loadedAt = new Date().toISOString();
  const payload = rows.map((r) => ({
    date: r.date,
    query: r.query,
    page: r.page,
    country: r.country,
    device: r.device,
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
    site_url: siteUrl,
    row_key: rowKey(siteUrl, r),
    loaded_at: loadedAt,
  }));

  // A partition load still needs at least a zero-row file to truncate the
  // partition when a day genuinely has no data (e.g. no impressions).
  const ndjson = payload.length > 0 ? payload.map((row) => JSON.stringify(row)).join("\n") + "\n" : "";
  const tmpFile = join(tmpdir(), `seo-collect-${config.table}-${partitionSuffix}-${Date.now()}.ndjson`);
  await writeFile(tmpFile, ndjson);

  try {
    const [job] = await table.load(tmpFile, {
      sourceFormat: "NEWLINE_DELIMITED_JSON",
      writeDisposition: "WRITE_TRUNCATE",
    });
    const errors = job.status?.errors;
    if (errors && errors.length > 0) {
      throw new Error(`BigQuery load job errors: ${JSON.stringify(errors)}`);
    }
  } finally {
    await unlink(tmpFile).catch(() => {});
  }

  return { inserted: payload.length };
}
