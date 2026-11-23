'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RANGE_OPTIONS, type Period } from '@/lib/dashboard/period';

export function PeriodPicker({ period }: { period: Period }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [custom, setCustom] = useState(period.key === 'custom');
  const [from, setFrom] = useState(period.start);
  const [to, setTo] = useState(period.end);

  const go = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(search.toString());
    for (const [k, v] of Object.entries(updates)) (v ? params.set(k, v) : params.delete(k));
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="range">
        Date range
      </label>
      <select
        id="range"
        value={custom ? 'custom' : period.key}
        onChange={(e) => {
          if (e.target.value === 'custom') return setCustom(true);
          setCustom(false);
          go({ range: e.target.value, from: null, to: null });
        }}
        className="border border-ink/20 bg-white px-3 py-2 text-small"
      >
        {RANGE_OPTIONS.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
        <option value="custom">Custom range</option>
      </select>
      {custom && (
        <>
          <input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} className="border border-ink/20 bg-white px-2 py-1.5 text-small" aria-label="From" />
          <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className="border border-ink/20 bg-white px-2 py-1.5 text-small" aria-label="To" />
          <button onClick={() => go({ range: 'custom', from, to })} className="bg-ink px-3 py-2 text-small text-white">
            Apply
          </button>
        </>
      )}
      <span className="text-small text-mute">vs previous {period.days} day{period.days === 1 ? '' : 's'}</span>
    </div>
  );
}
