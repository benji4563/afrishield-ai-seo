import { Shell } from '@/components/dashboard/Shell';
import { Notice, Section, SourceBar, Table, num } from '@/components/dashboard/ui';
import { isQualified, sourceLabel } from '@/lib/dashboard/hubspot';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { addMoney, crmSummary, formatMoney, type MoneyByCurrency } from '@/lib/dashboard/metrics';

export default async function Campaigns({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);
  const s = crm ? crmSummary(crm, period) : null;

  // GA4: sessions by UTM campaign (rows with a real campaign name).
  const ga4Campaigns = (ga4?.sources ?? []).filter((r) => r.sessionCampaignName && !['(not set)', '(direct)', '(organic)', '(referral)'].includes(String(r.sessionCampaignName)));

  // HubSpot first touch vs latest touch, kept separate.
  const firstTouch = new Map<string, { leads: number; qualified: number; won: number; revenue: MoneyByCurrency }>();
  for (const c of s?.leads ?? []) {
    const key = `${sourceLabel(c.originalSource)} · ${c.originalCampaign || c.originalSourceDetail || '(no campaign)'}`;
    const row = firstTouch.get(key) ?? { leads: 0, qualified: 0, won: 0, revenue: {} };
    row.leads += 1;
    if (isQualified(c)) row.qualified += 1;
    for (const d of s!.won.filter((d) => d.contactIds.includes(c.id))) {
      row.won += 1;
      addMoney(row.revenue, d.currency, d.amount);
    }
    firstTouch.set(key, row);
  }
  const latestTouch = new Map<string, number>();
  for (const c of s?.leads ?? []) {
    const key = c.latestSource ? sourceLabel(c.latestSource) : 'Unknown';
    latestTouch.set(key, (latestTouch.get(key) ?? 0) + 1);
  }

  return (
    <Shell title="Campaigns" intro="UTM campaigns from GA4 and campaign attribution from HubSpot. First touch and latest touch are reported separately; neither overwrites the other." period={period}>
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult]]} />
      <Notice>
        Tag every campaign link with utm_source, utm_medium and utm_campaign (for example utm_source=linkedin&amp;utm_medium=social&amp;utm_campaign=clinic-index-dec)
        so LinkedIn, Facebook, Instagram, TikTok, email, Reddit and partner traffic can be told apart. Untagged social traffic often lands in Referral or Direct.
      </Notice>

      <Section title="Campaign traffic (GA4)" note="Sessions carrying a utm_campaign tag.">
        <Table
          head={['Campaign', 'Source / medium', 'Visitors', 'Sessions', 'Form submissions']}
          rows={ga4Campaigns.map((r) => [
            String(r.sessionCampaignName),
            `${r.sessionSource} / ${r.sessionMedium}`,
            num(Number(r.activeUsers)),
            num(Number(r.sessions)),
            num(
              ga4?.eventsBySource
                .filter((e) => e.eventName === 'generate_lead' && e.sessionCampaignName === r.sessionCampaignName && e.sessionSource === r.sessionSource)
                .reduce((a, e) => a + Number(e.eventCount), 0) ?? 0,
            ),
          ])}
          empty={ga4 ? 'No UTM-tagged sessions in this period.' : 'Awaiting GA4 connection.'}
        />
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="First touch (HubSpot)" note="Original source and campaign of each new lead.">
          <Table
            head={['Source · campaign', 'Leads', 'Qualified', 'Won', 'Revenue']}
            rows={[...firstTouch.entries()].sort((a, b) => b[1].leads - a[1].leads).map(([key, r]) => [key, num(r.leads), num(r.qualified), num(r.won), formatMoney(r.revenue)])}
            empty={crm ? 'No leads in this period.' : 'HubSpot unavailable.'}
          />
        </Section>
        <Section title="Latest touch (HubSpot)" note="Most recent source of each new lead.">
          <Table head={['Latest source', 'Leads']} rows={[...latestTouch.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, num(v)])} empty={crm ? 'No leads in this period.' : 'HubSpot unavailable.'} />
        </Section>
      </div>
    </Shell>
  );
}
