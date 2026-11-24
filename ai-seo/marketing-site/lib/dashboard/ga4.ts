import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { cachedSource, type SourceResult } from './source';

/**
 * GA4 Data API, read-only, with a Google service account (Viewer on the
 * property). No Google SDK: a signed JWT is exchanged for an access token.
 *
 * Env (server only):
 *   GA4_PROPERTY_ID            numeric property id, e.g. 565522788
 *   GA4_SERVICE_ACCOUNT_KEY    the key JSON, base64-encoded (Vercel)
 *   GA4_SERVICE_ACCOUNT_FILE   path to the key JSON (local development only)
 */

export type ServiceAccount = { client_email: string; private_key: string };

/** Also used by Search Console (gsc.ts): one service account for both APIs. */
export function serviceAccount(): ServiceAccount | null {
  try {
    const encoded = process.env.GA4_SERVICE_ACCOUNT_KEY;
    const raw = encoded
      ? Buffer.from(encoded, 'base64').toString('utf8')
      : process.env.GA4_SERVICE_ACCOUNT_FILE
        ? readFileSync(process.env.GA4_SERVICE_ACCOUNT_FILE, 'utf8')
        : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ServiceAccount;
    return parsed.client_email && parsed.private_key ? parsed : null;
  } catch {
    return null;
  }
}

export function ga4Configured(): boolean {
  return Boolean(process.env.GA4_PROPERTY_ID && serviceAccount());
}

const tokens = new Map<string, { value: string; expiresAt: number }>();
const ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

export async function accessToken(account: ServiceAccount, scope = ANALYTICS_SCOPE): Promise<string> {
  const token = tokens.get(scope);
  if (token && token.expiresAt > Date.now() + 60_000) return token.value;
  const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: account.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(account.private_key, 'base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
    cache: 'no-store',
  });
  const body = (await response.json()) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!body.access_token) throw new Error(`Google sign-in failed: ${body.error_description ?? response.status}`);
  tokens.set(scope, { value: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 });
  return body.access_token;
}

type ReportRequest = {
  dateRanges: { startDate: string; endDate: string }[];
  dimensions?: { name: string }[];
  metrics: { name: string }[];
  dimensionFilter?: unknown;
  orderBys?: unknown[];
  limit?: number;
};

type ApiReport = {
  dimensionHeaders?: { name: string }[];
  metricHeaders?: { name: string }[];
  rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
};

export type Row = Record<string, string | number>;

function toRows(report: ApiReport): Row[] {
  const dims = report.dimensionHeaders?.map((h) => h.name) ?? [];
  const mets = report.metricHeaders?.map((h) => h.name) ?? [];
  return (report.rows ?? []).map((row) => {
    const out: Row = {};
    dims.forEach((name, i) => (out[name] = row.dimensionValues[i]?.value ?? ''));
    mets.forEach((name, i) => (out[name] = Number(row.metricValues[i]?.value ?? 0)));
    return out;
  });
}

async function batch(requests: ReportRequest[]): Promise<Row[][]> {
  const account = serviceAccount();
  const property = process.env.GA4_PROPERTY_ID;
  if (!account || !property) throw new Error('GA4 is not configured');
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:batchRunReports`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken(account)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests }),
    cache: 'no-store',
  });
  const body = (await response.json()) as { reports?: ApiReport[]; error?: { message?: string } };
  if (!response.ok || !body.reports) throw new Error(`GA4 API ${response.status}: ${body.error?.message ?? 'no reports'}`);
  return body.reports.map(toRows);
}

const m = (...names: string[]) => names.map((name) => ({ name }));
const SITE_EVENTS = ['generate_lead', 'cta_click', 'whatsapp_click'];
const siteEventFilter = {
  filter: { fieldName: 'eventName', inListFilter: { values: SITE_EVENTS } },
};

export type Ga4Bundle = {
  totals: Row;
  previousTotals: Row;
  daily: Row[];
  channels: Row[];
  sources: Row[];
  landingPages: Row[];
  pages: Row[];
  events: Row[];
  eventsByPage: Row[];
  eventsBySource: Row[];
};

const CORE = m('activeUsers', 'sessions', 'screenPageViews', 'engagedSessions', 'newUsers');

async function fetchBundle(start: string, end: string, prevStart: string, prevEnd: string): Promise<Ga4Bundle> {
  const range = [{ startDate: start, endDate: end }];
  const [daily, channels, sources, landingPages, pages] = await batch([
    { dateRanges: range, dimensions: m('date'), metrics: CORE, orderBys: [{ dimension: { dimensionName: 'date' } }], limit: 400 },
    { dateRanges: range, dimensions: m('sessionDefaultChannelGroup'), metrics: m('activeUsers', 'sessions', 'engagedSessions'), limit: 50 },
    {
      dateRanges: range,
      dimensions: m('sessionSource', 'sessionMedium', 'sessionCampaignName'),
      metrics: m('activeUsers', 'sessions', 'engagedSessions'),
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 200,
    },
    {
      dateRanges: range,
      dimensions: m('landingPage'),
      metrics: m('sessions', 'engagedSessions', 'activeUsers'),
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 200,
    },
    {
      dateRanges: range,
      dimensions: m('pagePath'),
      metrics: m('screenPageViews', 'activeUsers', 'userEngagementDuration'),
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 250,
    },
  ]);
  const [totals, previousTotals, events, eventsByPage, eventsBySource] = await batch([
    { dateRanges: range, metrics: CORE },
    { dateRanges: [{ startDate: prevStart, endDate: prevEnd }], metrics: CORE },
    { dateRanges: range, dimensions: m('eventName'), metrics: m('eventCount'), limit: 100 },
    { dateRanges: range, dimensions: m('pagePath', 'eventName'), metrics: m('eventCount'), dimensionFilter: siteEventFilter, limit: 500 },
    {
      dateRanges: range,
      dimensions: m('sessionDefaultChannelGroup', 'sessionSource', 'sessionMedium', 'sessionCampaignName', 'eventName'),
      metrics: m('eventCount'),
      dimensionFilter: siteEventFilter,
      limit: 500,
    },
  ]);
  return {
    totals: totals[0] ?? {},
    previousTotals: previousTotals[0] ?? {},
    daily,
    channels,
    sources,
    landingPages,
    pages,
    events,
    eventsByPage,
    eventsBySource,
  };
}

const cachedBundle = cachedSource('ga4', ['bundle-v1'], fetchBundle);

export async function getGa4(start: string, end: string, prevStart: string, prevEnd: string): Promise<SourceResult<Ga4Bundle>> {
  if (!ga4Configured()) {
    return { status: 'not_configured', reason: 'GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY are not set on the server.' };
  }
  return cachedBundle(start, end, prevStart, prevEnd);
}

/** Sum of one site event (e.g. generate_lead) from the events list. */
export function eventTotal(bundle: Ga4Bundle, name: string): number {
  return bundle.events.filter((row) => row.eventName === name).reduce((sum, row) => sum + Number(row.eventCount), 0);
}
