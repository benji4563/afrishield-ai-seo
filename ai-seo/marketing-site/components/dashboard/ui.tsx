import Link from 'next/link';
import type { SourceResult } from '@/lib/dashboard/source';
import { change } from '@/lib/dashboard/metrics';

const TZ = 'Africa/Douala';
export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { timeZone: TZ, day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { timeZone: TZ, day: '2-digit', month: 'short', year: 'numeric' }) : '—';
export const num = (value: number | null | undefined) => (value == null ? '—' : Math.round(value).toLocaleString('en-US'));

export function Section({ title, note, children, right }: { title: string; note?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="rounded-card border border-ink/10 bg-white p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {note && <p className="mt-0.5 text-small text-slate">{note}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

/** Freshness line for one source: fetched time, not configured, or error. */
export function SourceStatus({ name, result }: { name: string; result: SourceResult<unknown> }) {
  if (result.status === 'ok') {
    const warnings = (result.data as { warnings?: string[] } | null)?.warnings ?? [];
    return (
      <span className="inline-flex flex-col gap-0.5 text-small text-slate">
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${warnings.length ? 'bg-amber-500' : 'bg-green-500'}`} aria-hidden /> {name}: updated{' '}
          {fmtTime(result.fetchedAt)} (refreshes every 15 min)
        </span>
        {warnings.map((w) => (
          <span key={w} className="pl-3.5 text-amber-800">
            {w}
          </span>
        ))}
      </span>
    );
  }
  if (result.status === 'not_configured')
    return (
      <span className="inline-flex items-center gap-1.5 text-small text-amber-800">
        <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden /> {name}: awaiting credentials. {result.reason}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-small text-red-700">
      <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden /> {name}: sync failed at {fmtTime(result.fetchedAt)}. {result.reason}
    </span>
  );
}

export function SourceBar({ sources }: { sources: [string, SourceResult<unknown>][] }) {
  return (
    <div className="flex flex-col gap-1 rounded-card bg-white/60 px-3 py-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
      {sources.map(([name, result]) => (
        <SourceStatus key={name} name={name} result={result} />
      ))}
    </div>
  );
}

export function Kpi({
  label,
  value,
  previous,
  definition,
  source,
  unavailable,
  href,
}: {
  label: string;
  value: number | string | null;
  previous?: number | null;
  definition: string;
  source: string;
  unavailable?: string;
  href?: string;
}) {
  const delta = typeof value === 'number' && previous != null ? change(value, previous) : null;
  const body = (
    <div className="h-full rounded-card border border-ink/10 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-small font-medium text-slate">{label}</p>
        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{source}</span>
      </div>
      {unavailable ? (
        <p className="mt-2 text-small text-mute">{unavailable}</p>
      ) : (
        <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{typeof value === 'number' ? num(value) : (value ?? '—')}</p>
      )}
      {!unavailable && previous != null && (
        <p className={`mt-1 text-small ${delta == null ? 'text-mute' : delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-700' : 'text-mute'}`}>
          {delta == null ? 'new vs 0 before' : `${delta > 0 ? '+' : ''}${delta.toFixed(0)}%`} <span className="text-mute">(previous: {num(previous)})</span>
        </p>
      )}
      <details className="mt-2">
        <summary className="cursor-pointer text-[12px] text-mute">Definition</summary>
        <p className="mt-1 text-[12px] leading-snug text-slate">{definition}</p>
      </details>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-card bg-bone px-3 py-4 text-small text-slate">{children}</p>;
}

export function BarList({ rows, unit = '' }: { rows: { label: string; value: number; hint?: string }[]; unit?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return <Empty>No data in this period.</Empty>;
  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex justify-between gap-3 text-small">
            <span className="truncate" title={row.label}>
              {row.label}
              {row.hint && <span className="ml-2 text-mute">{row.hint}</span>}
            </span>
            <span className="shrink-0 tabular-nums">
              {num(row.value)}
              {unit}
            </span>
          </div>
          <div className="mt-1 h-2 rounded bg-bone">
            <div className="h-2 rounded bg-green-500" style={{ width: `${(row.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Daily line chart in plain SVG (no chart library on the bundle). */
export function LineChart({ series, labels }: { series: { name: string; values: number[]; color: string }[]; labels: string[] }) {
  const W = 720;
  const H = 200;
  const P = 28;
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const n = Math.max(1, labels.length - 1);
  const x = (i: number) => P + (i / n) * (W - 2 * P);
  const y = (v: number) => H - P - (v / max) * (H - 2 * P);
  if (!labels.length) return <Empty>No daily data in this period.</Empty>;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Daily ${series.map((s) => s.name).join(', ')}`}>
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={P} x2={W - P} y1={y(max * t)} y2={y(max * t)} stroke="#14140F" strokeOpacity="0.08" />
            <text x={4} y={y(max * t) + 4} fontSize="10" fill="#8B8A80">
              {Math.round(max * t)}
            </text>
          </g>
        ))}
        {series.map((s) => (
          <g key={s.name}>
            <polyline fill="none" stroke={s.color} strokeWidth="2.2" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
            {s.values.length <= 31 && s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2.6" fill={s.color} />)}
          </g>
        ))}
        <text x={P} y={H - 6} fontSize="10" fill="#8B8A80">
          {labels[0]}
        </text>
        <text x={W - P} y={H - 6} fontSize="10" fill="#8B8A80" textAnchor="end">
          {labels[labels.length - 1]}
        </text>
      </svg>
      <div className="mt-1 flex flex-wrap gap-4 text-small text-slate">
        {series.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-4 rounded" style={{ background: s.color }} /> {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Table({ head, rows, empty = 'No data in this period.' }: { head: string[]; rows: React.ReactNode[][]; empty?: string }) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  return (
    <div className="-mx-4 overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[560px] text-left text-small">
        <thead>
          <tr className="border-b border-ink/10 text-mute">
            {head.map((h, i) => (
              <th key={h} className={`px-3 py-2 font-medium ${i > 0 ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-ink/5 last:border-0">
              {row.map((cell, i) => (
                <td key={i} className={`px-3 py-2 align-top ${i > 0 ? 'text-right tabular-nums' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn'; children: React.ReactNode }) {
  return (
    <div className={`rounded-card border px-4 py-3 text-small ${tone === 'warn' ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-green-200 bg-green-50 text-green-900'}`}>
      {children}
    </div>
  );
}
