import Link from 'next/link';
import { Shell } from '@/components/dashboard/Shell';
import { Notice, Section, SourceBar, Table, num } from '@/components/dashboard/ui';
import { isQualified } from '@/lib/dashboard/hubspot';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { GA4_CHANNEL_TO_HUBSPOT, crmSummary, formatMoney, formatPct, pct, addMoney, type MoneyByCurrency } from '@/lib/dashboard/metrics';
import { periodQuery } from '@/lib/dashboard/period';

const CHANNELS = ['Organic Search', 'Direct', 'Organic Social', 'Paid Social', 'Paid Search', 'Referral', 'Email', 'Cross-network', 'Unassigned'];

export default async function Acquisition({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);
  const s = crm ? crmSummary(crm, period) : null;

  const ev = (channel: string, name: string) =>
    ga4?.eventsBySource.filter((r) => r.sessionDefaultChannelGroup === channel && r.eventName === name).reduce((a, r) => a + Number(r.eventCount), 0) ?? 0;

  const extraGa4 = ga4?.channels.map((c) => String(c.sessionDefaultChannelGroup)).filter((c) => !CHANNELS.includes(c)) ?? [];
  const rows = [...CHANNELS, ...extraGa4].map((channel) => {
    const g = ga4?.channels.find((c) => c.sessionDefaultChannelGroup === channel);
    const codes = GA4_CHANNEL_TO_HUBSPOT[channel] ?? [];
    const leads = s?.leads.filter((c) => codes.includes(c.originalSource)) ?? [];
    const won = s?.won.filter((d) => crm?.contacts.some((c) => d.contactIds.includes(c.id) && codes.includes(c.originalSource))) ?? [];
    const revenue: MoneyByCurrency = {};
    won.forEach((d) => addMoney(revenue, d.currency, d.amount));
    return {
      channel,
      sessions: Number(g?.sessions ?? 0),
      visitors: Number(g?.activeUsers ?? 0),
      engaged: Number(g?.engagedSessions ?? 0),
      cta: ev(channel, 'cta_click'),
      forms: ev(channel, 'generate_lead'),
      leads: leads.length,
      qualified: leads.filter(isQualified).length,
      won: won.length,
      revenue,
    };
  });
  // Rank by commercial outcome first, then volume.
  rows.sort((a, b) => b.won - a.won || b.qualified - a.qualified || b.leads - a.leads || b.forms - a.forms || b.sessions - a.sessions);
  const visible = rows.filter((r) => r.sessions || r.leads || r.won);

  const sources = ga4?.sources ?? [];
  const q = periodQuery(period);

  return (
    <Shell title="Acquisition" intro="Where visitors and potential clients come from, ranked by clients and qualified leads before traffic." period={period}>
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult]]} />
      <Notice>
        GA4 and HubSpot classify sources separately. GA4 counts sessions by channel; HubSpot stores each contact&apos;s original source (first touch) and
        latest source. Leads created through the site API before 23 Nov 2026 show &quot;Offline&quot; in HubSpot (listed under Unassigned). Matching a GA4 visit
        to a HubSpot contact is not possible person by person.
      </Notice>

      <Section title="Channel performance" note="Sessions, CTA clicks and form submissions from GA4; leads, qualified leads, clients and revenue from HubSpot (first touch).">
        <Table
          head={['Channel', 'Visitors', 'Sessions', 'Engaged', 'Audit CTA clicks', 'Form submissions', 'Leads', 'Qualified', 'Won', 'Verified revenue', 'Lead rate']}
          rows={visible.map((r) => [
            <Link key={r.channel} href={`/dashboard/leads${periodQuery(period, { source: r.channel })}`} className="font-medium text-green-700 hover:underline">
              {r.channel}
            </Link>,
            num(r.visitors),
            num(r.sessions),
            num(r.engaged),
            num(r.cta),
            num(r.forms),
            num(r.leads),
            num(r.qualified),
            num(r.won),
            formatMoney(r.revenue),
            formatPct(pct(r.forms, r.sessions)),
          ])}
          empty="No traffic or leads in this period."
        />
        <p className="mt-2 text-small text-mute">Lead rate = GA4 form submissions ÷ sessions. Audit CTA clicks start counting when the new homepage launches.</p>
      </Section>

      <Section title="Source, medium and campaign" note="GA4 session source. Campaign names come from UTM tags (utm_campaign); (not set) means no tag.">
        <Table
          head={['Source / medium', 'Campaign', 'Visitors', 'Sessions', 'Engaged', 'Form submissions']}
          rows={sources.slice(0, 40).map((r) => [
            `${r.sessionSource} / ${r.sessionMedium}`,
            String(r.sessionCampaignName),
            num(Number(r.activeUsers)),
            num(Number(r.sessions)),
            num(Number(r.engagedSessions)),
            num(
              ga4?.eventsBySource
                .filter((e) => e.eventName === 'generate_lead' && e.sessionSource === r.sessionSource && e.sessionMedium === r.sessionMedium && e.sessionCampaignName === r.sessionCampaignName)
                .reduce((a, e) => a + Number(e.eventCount), 0) ?? 0,
            ),
          ])}
          empty={ga4 ? 'No sessions in this period.' : 'Awaiting GA4 connection.'}
        />
      </Section>

      <Section title="Landing pages" note="First page of each session (GA4).">
        <Table
          head={['Landing page', 'Sessions', 'Engaged', 'Engagement rate']}
          rows={(ga4?.landingPages ?? []).slice(0, 25).map((r) => [
            String(r.landingPage) || '(not set)',
            num(Number(r.sessions)),
            num(Number(r.engagedSessions)),
            formatPct(pct(Number(r.engagedSessions), Number(r.sessions))),
          ])}
          empty={ga4 ? 'No sessions in this period.' : 'Awaiting GA4 connection.'}
        />
        <p className="mt-2 text-small text-mute">
          See <Link href={`/dashboard/website${q}`} className="underline">Website performance</Link> for submissions by page.
        </p>
      </Section>
    </Shell>
  );
}
