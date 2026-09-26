#!/usr/bin/env node
/**
 * Reports Google's indexing/crawl state for a single URL via the Search
 * Console URL Inspection API. Read-only — does not request indexing.
 *
 * Usage:
 *   npm run seo:inspect -- --url https://www.cheapadelaideremovalist.com.au/service-areas/adelaide-cbd-inner-metro
 */
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { loadConfig } from "./lib/config";

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

function parseArgs(): { url: string } {
  const args = process.argv.slice(2);
  const idx = args.indexOf("--url");
  const url = idx >= 0 ? args[idx + 1] : undefined;
  if (!url) {
    throw new Error("Usage: npm run seo:inspect -- --url <full-page-url>");
  }
  return { url };
}

async function main() {
  const { url } = parseArgs();
  const config = loadConfig();
  const auth = new GoogleAuth({ scopes: SCOPES });
  const client = google.searchconsole({ version: "v1", auth });

  const res = await client.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: url,
      siteUrl: config.siteUrl,
    },
  });

  const result = res.data.inspectionResult;
  const idx = result?.indexStatusResult;
  const robots = idx?.robotsTxtState;

  console.log(`[seo:inspect] url=${url}`);
  console.log(`  verdict:            ${idx?.verdict ?? "unknown"}`);
  console.log(`  coverage state:     ${idx?.coverageState ?? "unknown"}`);
  console.log(`  robots.txt state:   ${robots ?? "unknown"}`);
  console.log(`  indexing state:     ${idx?.indexingState ?? "unknown"}`);
  console.log(`  google canonical:   ${idx?.googleCanonical ?? "unknown"}`);
  console.log(`  user canonical:     ${idx?.userCanonical ?? "unknown"}`);
  console.log(`  crawled as:         ${idx?.crawledAs ?? "unknown"}`);
  console.log(`  last crawl time:    ${idx?.lastCrawlTime ?? "unknown"}`);
}

main().catch((err) => {
  console.error(`[seo:inspect] FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
