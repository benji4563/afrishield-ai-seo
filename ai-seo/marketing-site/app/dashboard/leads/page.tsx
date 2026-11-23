import Link from 'next/link';
import { Shell } from '@/components/dashboard/Shell';
import { Kpi, KpiGrid, Section, SourceBar, Table, fmtDate } from '@/components/dashboard/ui';
import { contactUrl, isQualified, isUnworked, sourceLabel, type Contact } from '@/lib/dashboard/hubspot';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { DEFINITIONS as D, GA4_CHANNEL_TO_HUBSPOT, leadContacts } from '@/lib/dashboard/metrics';
import { first, periodQuery } from '@/lib/dashboard/period';

const LIFECYCLE: Record<string, string> = {
  subscriber: 'Subscriber',
  lead: 'Lead',
  marketingqualifiedlead: 'MQL',
  salesqualifiedlead: 'SQL',
  opportunity: 'Opportunity',
  customer: 'Customer',
  evangelist: 'Evangelist',
  other: 'Other',
};

export default async function Leads({ searchParams }: PageProps) {
  const { period, crm, crmResult, ga4Result, params } = await loadDashboard(searchParams);
  const source = first(params, 'source');
  const status = first(params, 'status');
  const lifecycle = first(params, 'lifecycle');
  const form = first(params, 'form');

  const all = crm ? leadContacts(crm, period.start, period.end) : [];
  const codes = source ? (GA4_CHANNEL_TO_HUBSPOT[source] ?? [source]) : null;
  const leads = all.filter(
    (c) =>
      (!codes || codes.includes(c.originalSource)) &&
      (!status || (status === 'NONE' ? !c.leadStatus : c.leadStatus === status)) &&
      (!lifecycle || c.lifecycleStage === lifecycle) &&
      (!form || c.form === form),
  );
  const unworked = crm?.contacts.filter((c) => c.form !== 'Review form' && isUnworked(c)) ?? [];
  const followUp = crm?.contacts.filter((c) => c.form !== 'Review form' && !isUnworked(c) && c.deals === 0 && c.leadStatus !== 'UNQUALIFIED' && c.lifecycleStage !== 'customer') ?? [];

  const opts = (values: string[]) => [...new Set(values.filter(Boolean))].sort();
  const filterLink = (key: string, value: string | undefined, label: string) => {
    const current = { source, status, lifecycle, form, [key]: value };
    const active = (key === 'source' ? source : key === 'status' ? status : key === 'lifecycle' ? lifecycle : form) === value;
    return (
      <Link
        key={`${key}-${label}`}
        href={`/dashboard/leads${periodQuery(period, current as Record<string, string | undefined>)}`}
        className={`rounded-card border px-2 py-1 text-[12px] ${active ? 'border-green-600 bg-green-600 text-white' : 'border-ink/15 bg-white hover:border-green-500'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <Shell title="Leads" intro="HubSpot is the system of record. This view reports on leads; open a contact in HubSpot to work on it." period={period}>
      <SourceBar sources={[['HubSpot', crmResult], ['GA4', ga4Result]]} />
      <KpiGrid>
        <Kpi label="New leads" value={crm ? all.length : null} definition={D.leads} source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
        <Kpi label="Qualified leads" value={crm ? all.filter(isQualified).length : null} definition={D.qualified} source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
        <Kpi label="Awaiting first contact" value={crm ? unworked.length : null} definition="All time: lead status New or empty, no logged contact or activity, no deal." source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
        <Kpi label="Need follow-up" value={crm ? followUp.length : null} definition="All time: contacted at least once, no deal yet, not marked unqualified or customer." source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
        <Kpi label="With open opportunities" value={crm ? all.filter((c) => c.deals > 0).length : null} definition="New leads in the period that have at least one deal." source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
        <Kpi label="Converted (customers)" value={crm ? all.filter((c) => c.lifecycleStage === 'customer').length : null} definition="New leads in the period whose lifecycle stage is Customer." source="HubSpot" unavailable={crm ? undefined : 'HubSpot unavailable'} />
      </KpiGrid>

      <Section title="Filters" right={filterLink('source', undefined, 'Reset all')}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-24 text-small text-mute">Source</span>
            {filterLink('source', undefined, 'All')}
            {Object.keys(GA4_CHANNEL_TO_HUBSPOT).map((ch) => filterLink('source', ch, ch))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-24 text-small text-mute">Form</span>
            {filterLink('form', undefined, 'All')}
            {opts(all.map((c) => c.form)).map((f) => filterLink('form', f, f))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-24 text-small text-mute">Lead status</span>
            {filterLink('status', undefined, 'All')}
            {opts(all.map((c) => c.leadStatus)).map((st) => filterLink('status', st, st.replace(/_/g, ' ').toLowerCase()))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-24 text-small text-mute">Lifecycle</span>
            {filterLink('lifecycle', undefined, 'All')}
            {opts(all.map((c) => c.lifecycleStage)).map((l) => filterLink('lifecycle', l, LIFECYCLE[l] ?? l))}
          </div>
        </div>
      </Section>

      <Section title={`Leads (${leads.length})`} note="Name and company only; email and phone stay in HubSpot. Original source = first touch; latest source = most recent visit.">
        <LeadTable leads={leads} />
      </Section>

      {unworked.length > 0 && (
        <Section title="Awaiting first contact" note="All time, oldest first.">
          <LeadTable leads={[...unworked].sort((a, b) => a.createdAt.localeCompare(b.createdAt))} />
        </Section>
      )}
    </Shell>
  );
}

function LeadTable({ leads }: { leads: Contact[] }) {
  return (
    <Table
      head={['Lead', 'Created', 'Form', 'Interest', 'Original source', 'Latest source', 'First page', 'Lifecycle', 'Status', 'Deals']}
      rows={leads.map((c) => [
        <a key={c.id} href={contactUrl(c.id)} target="_blank" rel="noopener noreferrer" className="font-medium text-green-700 hover:underline">
          {c.name}
          {c.company && <span className="block text-[12px] font-normal text-slate">{c.company}</span>}
        </a>,
        fmtDate(c.createdAt),
        c.form,
        c.serviceInterest || '—',
        `${sourceLabel(c.originalSource)}${c.originalSourceDetail ? ` · ${c.originalSourceDetail}` : ''}`,
        c.latestSource ? sourceLabel(c.latestSource) : '—',
        c.firstPage || '—',
        LIFECYCLE[c.lifecycleStage] ?? (c.lifecycleStage || '—'),
        c.leadStatus ? c.leadStatus.replace(/_/g, ' ').toLowerCase() : '—',
        String(c.deals),
      ])}
      empty="No leads match."
    />
  );
}
