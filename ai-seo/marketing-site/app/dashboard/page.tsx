import { Shell } from '@/components/dashboard/Shell';
import { Kpi, KpiGrid, LineChart, Notice, Section, SourceBar } from '@/components/dashboard/ui';
import { eventTotal } from '@/lib/dashboard/ga4';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { DEFINITIONS as D, crmSummary, formatMoney, revenueBy, dealSource, dealCampaign } from '@/lib/dashboard/metrics';
import { periodQuery } from '@/lib/dashboard/period';

export default async function Overview({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);
  const t = ga4?.totals ?? {};
  const p = ga4?.previousTotals ?? {};
  const s = crm ? crmSummary(crm, period) : null;
  const noGa4 = ga4 ? undefined : 'Awaiting GA4 connection';
  const noCrm = crm ? undefined : 'HubSpot unavailable';
  const q = periodQuery(period);

  return (
    <Shell title="How is AfriShield AI performing?" intro={`${period.label} (${period.start} to ${period.end}).`} period={period}>
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult]]} />

      {ga4 && Number(t.sessions ?? 0) === 0 && (
        <Notice tone="warn">GA4 has no sessions in this period. Tracking went live on 23 Nov 2026; earlier visits were never collected and cannot be recovered.</Notice>
      )}

      <Section title="Website activity" note="GA4. Visitors, sessions and page views are different units; they are never added together.">
        <KpiGrid>
          <Kpi label="Visitors" value={Number(t.activeUsers ?? 0)} previous={ga4 ? Number(p.activeUsers ?? 0) : null} definition={D.visitors} source="GA4" unavailable={noGa4} />
          <Kpi label="Sessions" value={Number(t.sessions ?? 0)} previous={ga4 ? Number(p.sessions ?? 0) : null} definition={D.sessions} source="GA4" unavailable={noGa4} />
          <Kpi label="Page views" value={Number(t.screenPageViews ?? 0)} previous={ga4 ? Number(p.screenPageViews ?? 0) : null} definition={D.pageViews} source="GA4" unavailable={noGa4} />
          <Kpi label="Engaged sessions" value={Number(t.engagedSessions ?? 0)} previous={ga4 ? Number(p.engagedSessions ?? 0) : null} definition={D.engagedSessions} source="GA4" unavailable={noGa4} />
          <Kpi label="New users" value={Number(t.newUsers ?? 0)} previous={ga4 ? Number(p.newUsers ?? 0) : null} definition={D.newUsers} source="GA4" unavailable={noGa4} />
        </KpiGrid>
        {ga4 && ga4.daily.length > 0 && (
          <div className="mt-5">
            <LineChart
              labels={ga4.daily.map((r) => `${String(r.date).slice(6, 8)}/${String(r.date).slice(4, 6)}`)}
              series={[
                { name: 'Sessions', values: ga4.daily.map((r) => Number(r.sessions)), color: '#1D8A5C' },
                { name: 'Visitors', values: ga4.daily.map((r) => Number(r.activeUsers)), color: '#14140F' },
              ]}
            />
          </div>
        )}
      </Section>

      <Section title="Lead generation" note="Clicks (GA4) are interest; leads (HubSpot) are people who left their details. A click is never counted as a lead.">
        <KpiGrid>
          <Kpi label="New leads" value={s?.leads.length ?? null} previous={s?.prevLeads.length ?? null} definition={D.leads} source="HubSpot" unavailable={noCrm} href={`/dashboard/leads${q}`} />
          <Kpi label="Free check submissions" value={s?.audit.length ?? null} definition={D.auditSubmissions} source="HubSpot" unavailable={noCrm} />
          <Kpi label="Other enquiries" value={s?.otherEnquiries.length ?? null} definition={D.otherEnquiries} source="HubSpot" unavailable={noCrm} />
          <Kpi label="Successful form submissions" value={ga4 ? eventTotal(ga4, 'generate_lead') : null} definition={D.formSubmissionsGa4} source="GA4" unavailable={noGa4} />
          <Kpi label="WhatsApp clicks" value={ga4 ? eventTotal(ga4, 'whatsapp_click') : null} definition={D.whatsappClicks} source="GA4" unavailable={noGa4} />
          <Kpi label="Confirmed WhatsApp enquiries" value={null} definition={D.whatsappEnquiries} source="—" unavailable="Not measured: no WhatsApp integration connected" />
          <Kpi label="Booked consultations" value={s?.consultations.length ?? null} definition={D.consultations} source="HubSpot" unavailable={noCrm} />
        </KpiGrid>
      </Section>

      <Section title="Sales" note="HubSpot deals.">
        <KpiGrid>
          <Kpi label="Qualified leads" value={s?.qualified.length ?? null} definition={D.qualified} source="HubSpot" unavailable={noCrm} />
          <Kpi label="Proposals sent" value={s?.proposals.length ?? null} definition={D.proposals} source="HubSpot" unavailable={noCrm} />
          <Kpi label="Open opportunities" value={s?.open.length ?? null} definition={D.openOpportunities} source="HubSpot" unavailable={noCrm} href={`/dashboard/pipeline${q}`} />
          <Kpi label="Closed-won clients" value={s?.won.length ?? null} definition={D.closedWon} source="HubSpot" unavailable={noCrm} />
          <Kpi label="Closed-lost" value={s?.lost.length ?? null} definition={D.closedLost} source="HubSpot" unavailable={noCrm} />
        </KpiGrid>
        {crm && !crm.dealsAvailable && (
          <p className="mt-3 text-small text-amber-800">Deal figures are unavailable: the HubSpot token on the server cannot read deals yet.</p>
        )}
        {crm && crm.dealsAvailable && crm.deals.length === 0 && (
          <p className="mt-3 text-small text-mute">HubSpot has no deals yet, so sales and revenue figures are zero rather than missing.</p>
        )}
      </Section>

      <Section title="Revenue" note="Verified revenue only: closed-won HubSpot deals. Currencies are never mixed or converted.">
        <KpiGrid>
          <Kpi label="Verified revenue" value={s ? formatMoney(s.revenue) : null} definition={D.revenue} source="HubSpot" unavailable={noCrm} href={`/dashboard/revenue${q}`} />
          <Kpi label="Open pipeline value" value={s ? formatMoney(s.openValue) : null} definition="Sum of amounts on open deals. Not revenue." source="HubSpot" unavailable={noCrm} />
          <Kpi
            label="Top service by revenue"
            value={s && crm && s.won.length ? revenueBy(crm, s.won, (d) => d.service || 'Unspecified')[0].name : '—'}
            definition="Service (HubSpot deal type) with the most closed-won deals in the period."
            source="HubSpot"
            unavailable={noCrm}
          />
          <Kpi
            label="Top source by revenue"
            value={s && crm && s.won.length ? revenueBy(crm, s.won, (d) => dealSource(crm, d))[0].name : '—'}
            definition="Original source of the contact linked to each won deal (first touch)."
            source="HubSpot"
            unavailable={noCrm}
          />
          <Kpi
            label="Top campaign by revenue"
            value={s && crm && s.won.length ? revenueBy(crm, s.won, (d) => dealCampaign(crm, d))[0].name : '—'}
            definition="Original campaign or source detail of the contact linked to each won deal."
            source="HubSpot"
            unavailable={noCrm}
          />
          <Kpi
            label="Average deal value"
            value={s && s.won.length ? formatMoney(Object.fromEntries(Object.entries(s.revenue).map(([c, v]) => [c, v / s.won.filter((d) => d.currency === c && d.amount != null).length]))) : '—'}
            definition="Verified revenue ÷ won deals with an amount, per currency."
            source="HubSpot"
            unavailable={noCrm}
          />
        </KpiGrid>
        {s && s.missingAmount > 0 && <p className="mt-3 text-small text-amber-800">{s.missingAmount} won deal(s) have no amount and are excluded from revenue.</p>}
      </Section>
    </Shell>
  );
}
