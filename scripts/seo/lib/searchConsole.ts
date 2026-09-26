import { google, searchconsole_v1 } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

/**
 * Authenticates using Application Default Credentials — either:
 *  - GOOGLE_APPLICATION_CREDENTIALS pointing at a service account key (CI/scheduled), or
 *  - `gcloud auth application-default login --scopes=...` for local/interactive use.
 * Never hardcode credentials here.
 */
function getClient(): searchconsole_v1.Searchconsole {
  const auth = new GoogleAuth({ scopes: SCOPES });
  return google.searchconsole({ version: "v1", auth });
}

export interface SearchConsoleRow {
  date: string;
  query: string | null;
  page: string | null;
  country: string | null;
  device: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

const ROW_LIMIT = 25000; // Search Console API max rowLimit per request

/**
 * Pulls one full day of query x page x country x device data for `siteUrl`.
 * Paginates via startRow until a page returns fewer than ROW_LIMIT rows.
 */
export async function fetchDayRows(
  siteUrl: string,
  date: string
): Promise<SearchConsoleRow[]> {
  const client = getClient();
  const rows: SearchConsoleRow[] = [];
  let startRow = 0;

  for (;;) {
    const res = await client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: date,
        endDate: date,
        dimensions: ["query", "page", "country", "device"],
        rowLimit: ROW_LIMIT,
        startRow,
        dataState: "final",
      },
    });

    const page = res.data.rows ?? [];
    for (const r of page) {
      const [query, pageUrl, country, device] = r.keys ?? [];
      rows.push({
        date,
        query: query ?? null,
        page: pageUrl ?? null,
        country: country ?? null,
        device: device ?? null,
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      });
    }

    if (page.length < ROW_LIMIT) break;
    startRow += ROW_LIMIT;
  }

  return rows;
}

/** Lists the Search Console properties the authenticated identity can see — never guess a property. */
export async function listSites(): Promise<string[]> {
  const client = getClient();
  const res = await client.sites.list();
  return (res.data.siteEntry ?? []).map((s) => s.siteUrl ?? "").filter(Boolean);
}
