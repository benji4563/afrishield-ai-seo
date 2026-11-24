import { accessToken, serviceAccount } from './ga4';
import { cachedSource, type SourceResult } from './source';

/**
 * Google Search Console, read-only, with the same service account as GA4.
 * The account must be added as a user on the Search Console property
 * (Settings → Users and permissions → Add user, "Full", so the URL Inspection API works too).
 *
 * Env (server only):
 *   GSC_SITE_URL   optional; e.g. "sc-domain:afrishieldai.com". When unset, the
 *                  first property the service account can see for
 *                  afrishieldai.com is used (domain property preferred).
 * Uses GA4_SERVICE_ACCOUNT_KEY / GA4_SERVICE_ACCOUNT_FILE for credentials.
 *
 * Search Console data lags by about two to three days, so the most recent
 * days of any period are always incomplete.
 */

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const API = 'https://searchconsole.googleapis.com/webmasters/v3';
const DOMAIN = 'afrishieldai.com';

export type GscRow = { key: string; clicks: number; impressions: number; ctr: number; position: number };
export type GscCompared = GscRow & { prevClicks: number; prevImpressions: number; prevPosition: number | null };

export type GscBundle = {
  siteUrl: string;
  totals: Omit<GscRow, 'key'>;
  prevTotals: Omit<GscRow, 'key'>;
  daily: GscRow[];
  queries: GscCompared[];
  pages: GscCompared[];
};

export function gscConfigured(): boolean {
  return Boolean(serviceAccount());
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const account = serviceAccount();
  if (!account) throw new Error('Search Console is not configured (no service account key)');
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken(account, SCOPE)}`, 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const body = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) throw new Error(`Search Console API ${response.status}: ${body.error?.message ?? 'request failed'}`);
  return body;
}

async function siteUrl(): Promise<string> {
  if (process.env.GSC_SITE_URL) return process.env.GSC_SITE_URL;
  const { siteEntry = [] } = await call<{ siteEntry?: { siteUrl: string; permissionLevel: string }[] }>('/sites');
  const ours = siteEntry.filter((s) => s.siteUrl.includes(DOMAIN) && s.permissionLevel !== 'siteUnverifiedUser');
  const pick = ours.find((s) => s.siteUrl.startsWith('sc-domain:')) ?? ours[0];
  if (!pick) {
    throw new Error(
      `The service account ${serviceAccount()?.client_email} has not been added to the ${DOMAIN} Search Console property yet`,
    );
  }
  return pick.siteUrl;
}

type ApiRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function query(site: string, start: string, end: string, dimension?: string, rowLimit = 250): Promise<GscRow[]> {
  const { rows = [] } = await call<{ rows?: ApiRow[] }>(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify({ startDate: start, endDate: end, dimensions: dimension ? [dimension] : [], rowLimit, dataState: 'all' }),
  });
  return rows.map((r) => ({ key: r.keys?.[0] ?? '', clicks: r.clicks, impressions: r.impressions, ctr: r.ctr * 100, position: r.position }));
}

const ZERO = { clicks: 0, impressions: 0, ctr: 0, position: 0 };

function compare(current: GscRow[], previous: GscRow[]): GscCompared[] {
  const prev = new Map(previous.map((r) => [r.key, r]));
  return current.map((r) => {
    const p = prev.get(r.key);
    return { ...r, prevClicks: p?.clicks ?? 0, prevImpressions: p?.impressions ?? 0, prevPosition: p?.position ?? null };
  });
}

const load = cachedSource('gsc', ['bundle-v1'], async (start: string, end: string, prevStart: string, prevEnd: string): Promise<GscBundle> => {
  const site = await siteUrl();
  const [totals, prevTotals, daily, queries, prevQueries, pages, prevPages] = await Promise.all([
    query(site, start, end),
    query(site, prevStart, prevEnd),
    query(site, start, end, 'date', 500),
    query(site, start, end, 'query'),
    query(site, prevStart, prevEnd, 'query'),
    query(site, start, end, 'page'),
    query(site, prevStart, prevEnd, 'page'),
  ]);
  const strip = (r?: GscRow) => (r ? { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position } : ZERO);
  return {
    siteUrl: site,
    totals: strip(totals[0]),
    prevTotals: strip(prevTotals[0]),
    daily: daily.sort((a, b) => a.key.localeCompare(b.key)),
    queries: compare(queries, prevQueries),
    pages: compare(pages, prevPages),
  };
});

export function getGsc(start: string, end: string, prevStart: string, prevEnd: string): Promise<SourceResult<GscBundle>> {
  if (!gscConfigured()) return Promise.resolve({ status: 'not_configured', reason: 'No Google service account key set' });
  return load(start, end, prevStart, prevEnd);
}
