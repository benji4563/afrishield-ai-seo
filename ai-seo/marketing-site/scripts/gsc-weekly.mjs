#!/usr/bin/env node
/**
 * Weekly Google Search Console check for afrishieldai.com (read-only).
 *
 *   node scripts/gsc-weekly.mjs --key <service-account.json> --out <folder> [--days 7]
 *
 * Writes <folder>/gsc-weekly-<date>.md and prints the same report. It compares
 * the last N complete days with the N days before (Search Console lags ~3
 * days), flags queries and pages that moved, lists page-two queries, and runs
 * the URL Inspection API on every sitemap URL changed in the last 14 days, so
 * a page that never got indexed is caught within a week.
 *
 * The key is the dashboard's Google service account, which must be a user
 * ("Full") on the Search Console property. Never commit the key or the output:
 * this repo is public and the reports contain search queries.
 * Exit codes: 0 report written, 2 not connected / auth problem.
 */
import { createSign } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, i, all) => (value.startsWith('--') ? [...pairs, [value.slice(2), all[i + 1]]] : pairs), []),
);
const KEY = args.key ?? process.env.GA4_SERVICE_ACCOUNT_FILE;
const OUT = args.out;
const DAYS = Number(args.days ?? 7);
const SITE = 'https://afrishieldai.com';
if (!KEY || !OUT) {
  console.error('Usage: node scripts/gsc-weekly.mjs --key <service-account.json> --out <folder> [--days 7]');
  process.exit(1);
}

const account = JSON.parse(readFileSync(KEY, 'utf8'));
const DAY = 86_400_000;
const iso = (ms) => new Date(ms).toISOString().slice(0, 10);
const today = Date.parse(`${iso(Date.now())}T00:00:00Z`);
const end = today - 3 * DAY;
const range = { start: iso(end - (DAYS - 1) * DAY), end: iso(end) };
const prev = { start: iso(end - (2 * DAYS - 1) * DAY), end: iso(end - DAYS * DAY) };

async function token() {
  const b64 = (v) => Buffer.from(JSON.stringify(v)).toString('base64url');
  // Take the time from Google, not the local clock: this machine's clock has
  // been seen hours off, and Google rejects a JWT outside its own timeframe.
  const head = await fetch('https://oauth2.googleapis.com/token', { method: 'HEAD' }).catch(() => null);
  const now = Math.floor((Date.parse(head?.headers.get('date') ?? '') || Date.now()) / 1000);
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: account.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(account.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  const body = await res.json();
  if (!body.access_token) throw new Error(`Google sign-in failed: ${body.error_description ?? res.status}`);
  return body.access_token;
}

const bearer = await token();
async function api(url, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json.error?.message ?? 'request failed'}`);
  return json;
}

const { siteEntry = [] } = await api('https://searchconsole.googleapis.com/webmasters/v3/sites');
const ours = siteEntry.filter((s) => s.siteUrl.includes('afrishieldai.com') && s.permissionLevel !== 'siteUnverifiedUser');
const property = (ours.find((s) => s.siteUrl.startsWith('sc-domain:')) ?? ours[0])?.siteUrl;
if (!property) {
  console.error(`NOT CONNECTED: ${account.client_email} is not a user on the afrishieldai.com Search Console property.`);
  process.exit(2);
}

const query = async (r, dimension, rowLimit = 500) =>
  (
    await api(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
      startDate: r.start,
      endDate: r.end,
      dimensions: dimension ? [dimension] : [],
      rowLimit,
      dataState: 'all',
    })
  ).rows ?? [];

const [tot, prevTot, q, prevQ, pg, prevPg] = await Promise.all([
  query(range),
  query(prev),
  query(range, 'query'),
  query(prev, 'query'),
  query(range, 'page'),
  query(prev, 'page'),
]);

const t = tot[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
const p = prevTot[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
const delta = (a, b) => (b ? `${a - b >= 0 ? '+' : ''}${Math.round(((a - b) / b) * 100)}%` : a ? 'new' : '0');
const join2 = (cur, before) => {
  const m = new Map(before.map((r) => [r.keys[0], r]));
  return cur.map((r) => ({ key: r.keys[0], ...r, prev: m.get(r.keys[0]) ?? null }));
};
const queries = join2(q, prevQ);
const pages = join2(pg, prevPg);
const path = (u) => u.replace(/^https?:\/\/[^/]+/, '') || '/';
const f1 = (n) => n.toFixed(1);

const moved = queries.filter((r) => r.prev && r.impressions >= 5 && Math.abs(r.prev.position - r.position) >= 3);
const up = moved.filter((r) => r.prev.position > r.position).sort((a, b) => b.prev.position - b.position - (a.prev.position - a.position));
const down = moved.filter((r) => r.prev.position < r.position).sort((a, b) => b.position - b.prev.position - (a.position - a.prev.position));
const newQueries = queries.filter((r) => !r.prev && r.impressions >= 5).sort((a, b) => b.impressions - a.impressions);
const pageOne = queries.filter((r) => r.position <= 10.5);
const striking = queries.filter((r) => r.position > 10.5 && r.position <= 20 && r.impressions >= 5).sort((a, b) => b.impressions - a.impressions);
const pageMoves = pages.filter((r) => r.prev && Math.abs(r.clicks - r.prev.clicks) >= 3).sort((a, b) => Math.abs(b.clicks - b.prev.clicks) - Math.abs(a.clicks - a.prev.clicks));

// Index check: every sitemap URL whose lastmod falls in the last 14 days.
const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const recent = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lastmod]) => Date.parse(lastmod) >= today - 14 * DAY)
  .map(([, loc]) => loc);
const inspections = [];
for (const url of recent.slice(0, 40)) {
  try {
    const { inspectionResult } = await api('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { inspectionUrl: url, siteUrl: property });
    const s = inspectionResult?.indexStatusResult ?? {};
    inspections.push({ url, verdict: s.verdict ?? '?', coverage: s.coverageState ?? '?', crawled: s.lastCrawlTime?.slice(0, 10) ?? 'never' });
  } catch (e) {
    inspections.push({ url, verdict: 'ERROR', coverage: String(e.message).slice(0, 80), crawled: '' });
  }
}
const notIndexed = inspections.filter((i) => i.verdict !== 'PASS');

const table = (head, rows) => (rows.length ? [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n') : '_None._');
const report = `# Search Console weekly check, ${iso(today)}

Property ${property}. Period ${range.start} to ${range.end} (${DAYS} complete days) vs ${prev.start} to ${prev.end}. Search Console lags about three days.

## Totals

| | This period | Previous | Change |
|---|---|---|---|
| Clicks | ${t.clicks} | ${p.clicks} | ${delta(t.clicks, p.clicks)} |
| Impressions | ${t.impressions} | ${p.impressions} | ${delta(t.impressions, p.impressions)} |
| CTR | ${f1(t.ctr * 100)}% | ${f1(p.ctr * 100)}% | |
| Avg position | ${f1(t.position)} | ${f1(p.position)} | |
| Queries on page one | ${pageOne.length} | ${queries.filter((r) => r.prev && r.prev.position <= 10.5).length} | |

## Needs attention

- Pages from the last 14 days not indexed: **${notIndexed.length}** of ${inspections.length} checked.
- Queries that fell 3+ positions: **${down.length}**.
- Page-two queries (11 to 20) with 5+ impressions: **${striking.length}**.

## Index check (sitemap URLs changed in the last 14 days)

${table(['URL', 'Verdict', 'Coverage', 'Last crawl'], inspections.map((i) => [path(i.url), i.verdict, i.coverage, i.crawled]))}

## Queries moving up (3+ positions, 5+ impressions)

${table(['Query', 'Before', 'Now', 'Clicks', 'Impressions'], up.slice(0, 15).map((r) => [r.key, f1(r.prev.position), f1(r.position), r.clicks, r.impressions]))}

## Queries moving down

${table(['Query', 'Before', 'Now', 'Clicks', 'Impressions'], down.slice(0, 15).map((r) => [r.key, f1(r.prev.position), f1(r.position), r.clicks, r.impressions]))}

## New queries (5+ impressions, absent last period)

${table(['Query', 'Position', 'Impressions', 'Clicks'], newQueries.slice(0, 15).map((r) => [r.key, f1(r.position), r.impressions, r.clicks]))}

## Striking distance (positions 11 to 20)

${table(['Query', 'Position', 'Impressions', 'Clicks'], striking.slice(0, 15).map((r) => [r.key, f1(r.position), r.impressions, r.clicks]))}

## Pages whose clicks changed by 3+

${table(['Page', 'Clicks before', 'Clicks now', 'Impressions'], pageMoves.slice(0, 15).map((r) => [path(r.key), r.prev.clicks, r.clicks, r.impressions]))}

## Top 20 pages by clicks

${table(['Page', 'Clicks', 'Impressions', 'CTR', 'Position'], pages.slice(0, 20).map((r) => [path(r.key), r.clicks, r.impressions, `${f1(r.ctr * 100)}%`, f1(r.position)]))}
`;

mkdirSync(OUT, { recursive: true });
const file = join(OUT, `gsc-weekly-${iso(today)}.md`);
writeFileSync(file, report);
console.log(report);
console.log(`\nWritten: ${file}`);
