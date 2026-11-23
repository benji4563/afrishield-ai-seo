import { Shell } from '@/components/dashboard/Shell';
import { Kpi, KpiGrid, Notice, Section, SourceBar, Table, fmtDate, num } from '@/components/dashboard/ui';
import { dealUrl } from '@/lib/dashboard/hubspot';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { DEFINITIONS as D, addMoney, crmSummary, dealCampaign, dealSource, formatMoney, revenueBy, type MoneyByCurrency } from '@/lib/dashboard/metrics';

export default async function Revenue({ searchParams }: PageProps) {
  const { period, crm, crmResult } = await loadDashboard(searchParams);
  const s = crm ? crmSummary(crm, period) : null;
  const unavailable = crm ? undefined : 'HubSpot unavailable';

  // Revenue by month over all won deals (not just the period), per currency.
  const months = new Map<string, MoneyByCurrency>();
  crm?.deals
    .filter((d) => d.isWon && d.closeDate)
    .forEach((d) => {
      const key = d.closeDate!.slice(0, 7);
      const money = months.get(key) ?? {};
      addMoney(money, d.currency, d.amount);
      months.set(key, money);
    });
  const payingClients = new Set(crm?.deals.filter((d) => d.isWon).flatMap((d) => (d.contactIds.length ? d.contactIds : [d.id])) ?? []);
  const currencies = [...new Set(crm?.deals.map((d) => d.currency) ?? [])];

  return (
    <Shell title="Revenue" intro="Verified revenue comes only from closed-won HubSpot deals. Open pipeline is shown apart and is never counted as revenue." period={period}>
      <SourceBar sources={[['HubSpot', crmResult]]} />
      {crm && !crm.deals.some((d) => d.isWon) && (
        <Notice tone="warn">
          No closed-won deals in HubSpot yet, so verified revenue is empty. Paying clients are currently recorded only in the finance register; once they are
          entered as Closed Won deals (amount, currency, close date, service), this page reports them.
        </Notice>
      )}
      {currencies.length > 1 && (
        <Notice>Deals use {currencies.join(' and ')}. Amounts are shown per currency and never converted, so totals are not added across currencies.</Notice>
      )}

      <KpiGrid>
        <Kpi label="Recorded revenue (period)" value={s ? formatMoney(s.revenue) : null} definition={D.revenue} source="HubSpot" unavailable={unavailable} />
        <Kpi label="Paying clients (all time)" value={crm ? payingClients.size : null} definition="Distinct contacts linked to closed-won deals (a deal with no contact counts once)." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Won deals (period)" value={s?.won.length ?? null} definition={D.closedWon} source="HubSpot" unavailable={unavailable} />
        <Kpi label="Open pipeline value" value={s ? formatMoney(s.openValue) : null} definition="Open deal amounts. Opportunity value, not revenue." source="HubSpot" unavailable={unavailable} />
        <Kpi label="Forecast revenue" value={null} definition="A forecast needs reliable stage probabilities and history." source="—" unavailable="Not produced: too little deal history to forecast honestly" />
        <Kpi label="Won deals missing an amount" value={s?.missingAmount ?? null} definition="Closed-won deals in the period with no amount; excluded from revenue." source="HubSpot" unavailable={unavailable} />
      </KpiGrid>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Revenue by month" note="All closed-won deals, by close month.">
          <Table
            head={['Month', 'Revenue']}
            rows={[...months.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([month, money]) => [month, formatMoney(money)])}
            empty="No closed-won deals."
          />
        </Section>
        <Section title="Revenue by service" note="HubSpot deal type, in the period.">
          <Table head={['Service', 'Deals', 'Revenue']} rows={crm && s ? revenueBy(crm, s.won, (d) => d.service || 'Unspecified').map((g) => [g.name, num(g.deals), formatMoney(g.money)]) : []} empty="No won deals in this period." />
        </Section>
        <Section title="Revenue by acquisition source" note="First touch: original source of the contact linked to each deal.">
          <Table head={['Source', 'Deals', 'Revenue']} rows={crm && s ? revenueBy(crm, s.won, (d) => dealSource(crm, d)).map((g) => [g.name, num(g.deals), formatMoney(g.money)]) : []} empty="No won deals in this period." />
        </Section>
        <Section title="Revenue by campaign" note="Original campaign or source detail of the linked contact.">
          <Table head={['Campaign', 'Deals', 'Revenue']} rows={crm && s ? revenueBy(crm, s.won, (d) => dealCampaign(crm, d)).map((g) => [g.name, num(g.deals), formatMoney(g.money)]) : []} empty="No won deals in this period." />
        </Section>
      </div>

      <Section title="Won deals in the period">
        <Table
          head={['Deal', 'Service', 'Amount', 'Closed', 'Source']}
          rows={(s?.won ?? []).map((d) => [
            <a key={d.id} href={dealUrl(d.id)} target="_blank" rel="noopener noreferrer" className="font-medium text-green-700 hover:underline">
              {d.name}
            </a>,
            d.service || '—',
            d.amount == null ? 'Missing' : formatMoney({ [d.currency]: d.amount }),
            fmtDate(d.closeDate),
            crm ? dealSource(crm, d) : '—',
          ])}
          empty="No won deals in this period."
        />
      </Section>
    </Shell>
  );
}
