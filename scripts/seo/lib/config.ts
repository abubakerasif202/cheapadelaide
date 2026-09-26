/**
 * Shared config for the SEO collector. Reads everything from environment
 * variables — never hardcode project IDs, site URLs, or credentials here.
 */

export interface SeoConfig {
  projectId: string;
  dataset: string;
  table: string;
  siteUrl: string;
  location: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill it in.`
    );
  }
  return value;
}

export function loadConfig(): SeoConfig {
  return {
    projectId: requireEnv("GOOGLE_CLOUD_PROJECT_ID"),
    dataset: process.env.BIGQUERY_DATASET || "seo_monitoring",
    table: process.env.BIGQUERY_TABLE || "search_console_daily",
    siteUrl: requireEnv("SEARCH_CONSOLE_SITE_URL"),
    location: process.env.BIGQUERY_LOCATION || "australia-southeast1",
  };
}

/** Formats a Date as YYYY-MM-DD without any timezone conversion surprises. */
export function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** The most recent date Search Console data is reliably complete for (2 days ago, UTC). */
export function lastCompleteDate(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 2);
  return toDateString(d);
}
