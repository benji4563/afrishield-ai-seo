import { Shell } from '@/components/dashboard/Shell';
import { BarList, Kpi, KpiGrid, LineChart, Notice, Section, SourceBar, Table, num } from '@/components/dashboard/ui';
import { requireSession } from '@/lib/dashboard/auth';
import { getGsc, type GscCompared } from '@/lib/dashboard/gsc';
import type { PageProps } from '@/lib/dashboard/load';
import { resolvePeriod } from '@/lib/dashboard/period';

const path = (url: string) => url.replace(/^https?:\/\/[^/]+/, '') || '/';
const pos = (value: number | null) => (value == null ? '—' : value.toFixed(1));
const pct = (value: number) => `${value.toFixed(1)}%`;

/** Positive = moved up (a lower position number is better). */
const gain = (r: GscCompared) => (r.prevPosition == null ? null : r.prevPosition - r.position);
const gainLabel = (r: GscCompared) => {
  const g = gain(r);
  return g == null ? 'new' : `${g > 0 ? '▲' : g < 0 ? '▼' : ''}${Math.abs(g).toFixed(1)}`;
};

export default async function Search({ searchParams }: PageProps) {
  await requireSession();
  const period = resolvePeriod(await searchParams);
  const result = await getGsc(period.start, period.end, period.prevStart, period.prevEnd);
  const gsc = result.status === 'ok' ? result.data : null;
  const t = gsc?.totals;
  const p = gsc?.prevTotals;
  const missing = gsc ? undefined : 'Search Console not connected';

  const pageOne = gsc?.queries.filter((q) => q.position <= 10.5) ?? [];
  const prevPageOne = gsc?.queries.filter((q) => q.prevPosition != null && q.prevPosition <= 10.5).length ?? 0;
  const movers = (gsc?.queries ?? []).filter((q) => q.impressions >= 5 && gain(q) != null && Math.abs(gain(q)!) >= 3);
  const risers = [...movers].filter((q) => gain(q)! > 0).sort((a, b) => gain(b)! - gain(a)!).slice(0, 10);
  const fallers = [...movers].filter((q) => gain(q)! < 0).sort((a, b) => gain(a)! - gain(b)!).slice(0, 10);
  // Page two: enough impressions to matter, close enough to page one to push.
  const strikingDistance = (gsc?.queries ?? [])
    .filter((q) => q.position > 10.5 && q.position <= 20 && q.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  const qRow = (q: GscCompared) => [q.key, num(q.clicks), num(q.impressions), pct(q.ctr), pos(q.position), gainLabel(q)];
  const qHead = ['Query', 'Clicks', 'Impressions', 'CTR', 'Avg position', 'Change in position'];

  return (
    <Shell title="Search Console" intro="How afrishieldai.com shows up in Google search: clicks, impressions, positions and the queries behind them." period={period}>
      <SourceBar sources={[['Search Console', result]]} />
      {!gsc && (
        <Notice tone="warn">
          Search Console needs the dashboard&apos;s Google service account added as a user on the afrishieldai.com property
          (Search Console → Settings → Users and permissions → Add user, permission &quot;Full&quot;).
        </Notice>
      )}
      {gsc && <Notice>Google publishes Search Console data two to three days late, so the last days of the period are incomplete. Property: {gsc.siteUrl}</Notice>}

      <Section title="Google search">
        <KpiGrid>
          <Kpi label="Clicks" value={t?.clicks ?? null} previous={p?.clicks ?? null} definition="Clicks from Google search results to the site." source="GSC" unavailable={missing} />
          <Kpi label="Impressions" value={t?.impressions ?? null} previous={p?.impressions ?? null} definition="Times a page of the site appeared in Google results. Not a goal on its own: the GEO plan expects this to fall as generic posts stop ranking." source="GSC" unavailable={missing} />
          <Kpi label="CTR" value={t ? pct(t.ctr) : null} definition="Clicks ÷ impressions, site-wide." source="GSC" unavailable={missing} />
          <Kpi label="Queries on page one" value={gsc ? pageOne.length : null} previous={gsc ? prevPageOne : null} definition="Queries whose average position is 10 or better in this period. The GEO plan target is 10 to 15 keywords on page one." source="GSC" unavailable={missing} />
        </KpiGrid>
        {gsc && gsc.daily.length > 0 && (
          <div className="mt-5">
            <LineChart
              labels={gsc.daily.map((r) => `${r.key.slice(8, 10)}/${r.key.slice(5, 7)}`)}
              series={[{ name: 'Clicks', values: gsc.daily.map((r) => r.clicks), color: '#1D8A5C' }]}
            />
          </div>
        )}
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Moving up" note="Queries with 5+ impressions that gained 3 or more positions against the previous period.">
          <Table head={['Query', 'Position', 'Change']} rows={risers.map((q) => [q.key, pos(q.position), gainLabel(q)])} empty="No query moved up 3+ positions." />
        </Section>
        <Section title="Moving down" note="Queries with 5+ impressions that lost 3 or more positions.">
          <Table head={['Query', 'Position', 'Change']} rows={fallers.map((q) => [q.key, pos(q.position), gainLabel(q)])} empty="No query lost 3+ positions." />
        </Section>
      </div>

      <Section title="Striking distance" note="Positions 11 to 20 with 10+ impressions: on page two, close enough that an internal link or a better section can push them to page one.">
        <Table head={qHead} rows={strikingDistance.map(qRow)} empty={gsc ? 'No query on page two with 10+ impressions.' : 'Awaiting Search Console.'} />
      </Section>

      <Section title="Top queries">
        <Table head={qHead} rows={(gsc?.queries ?? []).slice(0, 40).map(qRow)} empty={gsc ? 'No search queries in this period.' : 'Awaiting Search Console.'} />
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Top pages by clicks">
          <BarList rows={(gsc?.pages ?? []).filter((r) => r.clicks > 0).slice(0, 15).map((r) => ({ label: path(r.key), value: r.clicks, hint: 'clicks' }))} />
        </Section>
        <Section title="Pages seen but not clicked" note="20+ impressions and no click. The title or description may not match the query.">
          <BarList rows={(gsc?.pages ?? []).filter((r) => r.impressions >= 20 && r.clicks === 0).slice(0, 15).map((r) => ({ label: path(r.key), value: r.impressions, hint: 'impressions' }))} />
        </Section>
      </div>
    </Shell>
  );
}
