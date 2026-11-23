/**
 * Reporting periods. Dates are calendar days in UTC (YYYY-MM-DD); GA4 reports
 * in the property's own time zone, so a day boundary can differ by a few hours
 * between GA4 and HubSpot. The UI says so where it matters.
 */

export type RangeKey = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'custom';

export type Period = {
  key: RangeKey;
  label: string;
  start: string; // inclusive, YYYY-MM-DD
  end: string; // inclusive, YYYY-MM-DD
  prevStart: string;
  prevEnd: string;
  days: number;
};

export const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7d', label: 'Last 7 days' },
  { key: '30d', label: 'Last 30 days' },
  { key: '90d', label: 'Last 90 days' },
];

const DAY = 86_400_000;
const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const parse = (value: string) => Date.parse(`${value}T00:00:00Z`);
const isDate = (value: unknown): value is string =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(parse(value));

export type SearchParams = Record<string, string | string[] | undefined>;

export function first(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export function resolvePeriod(params: SearchParams): Period {
  const today = parse(iso(Date.now()));
  const raw = first(params, 'range') as RangeKey | undefined;
  let key: RangeKey = raw && ['today', 'yesterday', '7d', '30d', '90d', 'custom'].includes(raw) ? raw : '30d';
  let startMs: number;
  let endMs = today;

  if (key === 'custom') {
    const from = first(params, 'from');
    const to = first(params, 'to');
    if (isDate(from) && isDate(to) && parse(from) <= parse(to) && parse(to) <= today) {
      startMs = parse(from);
      endMs = parse(to);
    } else {
      key = '30d';
      startMs = today - 29 * DAY;
    }
  } else if (key === 'today') startMs = today;
  else if (key === 'yesterday') {
    startMs = today - DAY;
    endMs = today - DAY;
  } else startMs = today - (Number(key.replace('d', '')) - 1) * DAY;

  const days = Math.round((endMs - startMs) / DAY) + 1;
  const prevEnd = startMs - DAY;
  const prevStart = prevEnd - (days - 1) * DAY;
  const label =
    key === 'custom' ? `${iso(startMs)} to ${iso(endMs)}` : RANGE_OPTIONS.find((o) => o.key === key)!.label;

  return { key, label, start: iso(startMs), end: iso(endMs), prevStart: iso(prevStart), prevEnd: iso(prevEnd), days };
}

/** True when an ISO timestamp falls inside [start, end] (whole days, UTC). */
export function inRange(timestamp: string | null | undefined, start: string, end: string): boolean {
  if (!timestamp) return false;
  const day = timestamp.slice(0, 10);
  return day >= start && day <= end;
}

/** Query string that keeps the current period (and any extra params). */
export function periodQuery(period: Period, extra: Record<string, string | undefined> = {}): string {
  const params = new URLSearchParams();
  params.set('range', period.key);
  if (period.key === 'custom') {
    params.set('from', period.start);
    params.set('to', period.end);
  }
  for (const [k, v] of Object.entries(extra)) if (v) params.set(k, v);
  return `?${params.toString()}`;
}
