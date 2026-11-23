import { Shell } from '@/components/dashboard/Shell';
import { Kpi, KpiGrid, Notice, Section, SourceBar, Table, fmtDate, num } from '@/components/dashboard/ui';
import { dealUrl } from '@/lib/dashboard/hubspot';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { STAGE_CATEGORY, addMoney, crmSummary, formatMoney, staleDeals, type MoneyByCurrency } from '@/lib/dashboard/metrics';

export default async function Pipeline({ searchParams }: PageProps) {
  const { period, crm, crmResult } = await loadDashboard(searchParams);
  const s = crm ? crmSummary(crm, period) : null;
  const unavailable = crm ? undefined : 'HubSpot unavailable';

  const byStage = (crm?.stages ?? [])
    .sort((a, b) => a.order - b.order)
    .map((stage) => {
      const deals = crm!.deals.filter((d) => d.stage === stage.id);
      const value: MoneyByCurrency = {};
      deals.forEach((d) => addMoney(value, d.currency, d.amount));
      return { stage, deals, value };
    });
  const lostValue: MoneyByCurrency = {};
  s?.lost.forEach((d) => addMoney(lostValue, d.currency, d.amount));
  const stale = s ? staleDeals(s.open) : [];

  return (
    <Shell title="Sales pipeline" intro="HubSpot's own pipeline and stages, unchanged. Reporting categories are shown next to each stage." period={period}>
      <SourceBar sources={[['HubSpot', crmResult]]} />
      {crm && !crm.dealsAvailable && (
        <Notice tone="warn">
          The HubSpot token on the server cannot read deals or pipelines yet, so this page cannot show real pipeline figures. Add the scopes
          crm.objects.deals.read and crm.schemas.deals.read to the HubSpot private app.
        </Notice>
      )}
      {crm && crm.dealsAvailable && crm.deals.length === 0 && (
        <Notice tone="warn">
          HubSpot has no deals yet. Create a deal in HubSpot when a lead books a consultation, and move it through the stages; this page fills itself.
          Nothing is invented to fill it.
        </Notice>
      )}
      <KpiGrid>
        <Kpi label="Open deals" value={s?.open.length ?? null} definition="Deals not closed, any creation date." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Open pipeline value" value={s ? formatMoney(s.openValue) : null} definition="Sum of open deal amounts, per currency. Not revenue." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Won value (period)" value={s ? formatMoney(s.revenue) : null} definition="Closed-won amounts with a close date in the period." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Lost value (period)" value={s ? formatMoney(lostValue) : null} definition="Closed-lost amounts with a close date in the period." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Need follow-up" value={crm ? stale.length : null} definition="Open deals with no update for 14+ days." source="HubSpot" unavailable={unavailable} />
      </KpiGrid>

      <Section title="Deals by stage" note="Average time in stage needs HubSpot stage-history data, which is not reliable on this portal yet, so it is not shown.">
        <Table
          head={['HubSpot stage', 'Reporting category', 'Deals', 'Value', 'Win probability']}
          rows={byStage.map(({ stage, deals, value }) => [
            stage.label,
            STAGE_CATEGORY[stage.id] ?? 'Unmapped',
            num(deals.length),
            formatMoney(value),
            stage.probability == null ? '—' : `${Math.round(stage.probability * 100)}%`,
          ])}
          empty="No pipeline found."
        />
      </Section>

      <Section title="Open deals">
        <Table
          head={['Deal', 'Stage', 'Amount', 'Created', 'Expected close', 'Last update']}
          rows={(s?.open ?? []).map((d) => [
            <a key={d.id} href={dealUrl(d.id)} target="_blank" rel="noopener noreferrer" className="font-medium text-green-700 hover:underline">
              {d.name}
            </a>,
            d.stageLabel,
            formatMoney(d.amount == null ? {} : { [d.currency]: d.amount }),
            fmtDate(d.createdAt),
            fmtDate(d.closeDate),
            fmtDate(d.lastModified),
          ])}
          empty="No open deals."
        />
      </Section>
    </Shell>
  );
}
