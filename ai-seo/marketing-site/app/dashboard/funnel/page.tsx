import { Shell } from '@/components/dashboard/Shell';
import { Section, SourceBar, num } from '@/components/dashboard/ui';
import { eventTotal } from '@/lib/dashboard/ga4';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { crmSummary, formatPct, pct } from '@/lib/dashboard/metrics';

type Stage = { name: string; value: number | null; unit: string; source: string; note: string };

export default async function Funnel({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);
  const s = crm ? crmSummary(crm, period) : null;
  const ctaClicks = ga4 ? eventTotal(ga4, 'cta_click') : null;

  const stages: Stage[] = [
    { name: 'Website visitors', value: ga4 ? Number(ga4.totals.activeUsers ?? 0) : null, unit: 'visitors', source: 'GA4', note: 'Active users.' },
    { name: 'Engaged visits', value: ga4 ? Number(ga4.totals.engagedSessions ?? 0) : null, unit: 'sessions', source: 'GA4', note: 'Engaged sessions (a different unit from visitors).' },
    {
      name: 'Audit or enquiry CTA clicks',
      value: ctaClicks,
      unit: 'clicks',
      source: 'GA4',
      note: ctaClicks === 0 ? 'cta_click starts counting when the new homepage launches (from 25 Nov 2026).' : 'cta_click events.',
    },
    { name: 'Successful form submissions', value: s ? s.leads.length : null, unit: 'leads', source: 'HubSpot', note: 'Contacts created in the period (not review forms). WhatsApp chats are not counted: no integration.' },
    { name: 'Qualified leads', value: s ? s.qualified.length : null, unit: 'contacts', source: 'HubSpot', note: 'Lifecycle SQL or later, or lead status Connected / Open deal.' },
    { name: 'Consultation or sales conversation', value: s ? s.consultations.length : null, unit: 'deals', source: 'HubSpot', note: 'Deals at or past Appointment Scheduled.' },
    { name: 'Proposal sent', value: s ? s.proposals.length : null, unit: 'deals', source: 'HubSpot', note: 'Deals at or past Contract Sent.' },
    { name: 'Closed-won client', value: s ? s.won.length : null, unit: 'deals', source: 'HubSpot', note: 'Closed won in the period.' },
  ];
  const max = Math.max(1, ...stages.map((st) => st.value ?? 0));

  return (
    <Shell title="Conversion funnel" intro="From first visit to paying client. Each stage names its source; a stage that cannot be measured says so." period={period}>
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult]]} />
      <Section
        title="Customer journey"
        note="Stages 1–3 are website behaviour (GA4); stages 4–8 are CRM records (HubSpot). Rates between a GA4 stage and a HubSpot stage compare different systems and are indicative."
      >
        <ol className="space-y-3">
          {stages.map((stage, i) => {
            const prev = i > 0 ? stages[i - 1].value : null;
            const rate = stage.value != null && prev != null ? pct(stage.value, prev) : null;
            return (
              <li key={stage.name}>
                {i > 0 && (
                  <p className="mb-1 pl-1 text-[12px] text-mute">
                    ↓ {rate == null ? 'rate unavailable' : `${formatPct(rate)} of previous stage`}
                    {i === 3 ? ' (crosses from GA4 to HubSpot)' : ''}
                  </p>
                )}
                <div className="rounded-card border border-ink/10 p-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {i + 1}. {stage.name}
                    </p>
                    <p className="font-display text-xl font-semibold tabular-nums">
                      {stage.value == null ? <span className="text-small font-normal text-mute">Unavailable</span> : num(stage.value)}
                      <span className="ml-1 text-small font-normal text-mute">{stage.value == null ? '' : stage.unit}</span>
                    </p>
                  </div>
                  <div className="mt-2 h-3 rounded bg-bone">
                    <div className="h-3 rounded bg-green-500" style={{ width: `${((stage.value ?? 0) / max) * 100}%`, minWidth: stage.value ? 4 : 0 }} />
                  </div>
                  <p className="mt-1.5 text-[12px] text-slate">
                    <span className="font-mono uppercase text-mute">{stage.source}</span> · {stage.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>
    </Shell>
  );
}
