import { Shell } from '@/components/dashboard/Shell';
import { BarList, Section, SourceBar, Table, num } from '@/components/dashboard/ui';
import { loadDashboard, type PageProps } from '@/lib/dashboard/load';
import { formatPct, pct } from '@/lib/dashboard/metrics';

const SERVICE_PATHS = ['/geo-services', '/solutions', '/ai-seo', '/pricing', '/how-it-works', '/for-'];

export default async function Website({ searchParams }: PageProps) {
  const { period, ga4, crm, ga4Result, crmResult } = await loadDashboard(searchParams);

  const evOn = (path: string, name: string) =>
    ga4?.eventsByPage.filter((r) => r.pagePath === path && r.eventName === name).reduce((a, r) => a + Number(r.eventCount), 0) ?? 0;

  // HubSpot leads by first page seen (needs the tracking code; older leads have none).
  const leadsByFirstPage = new Map<string, number>();
  crm?.contacts
    .filter((c) => c.firstPage && c.createdAt.slice(0, 10) >= period.start && c.createdAt.slice(0, 10) <= period.end)
    .forEach((c) => leadsByFirstPage.set(c.firstPage, (leadsByFirstPage.get(c.firstPage) ?? 0) + 1));

  const pages = (ga4?.pages ?? []).map((p) => {
    const path = String(p.pagePath);
    const forms = evOn(path, 'generate_lead');
    const views = Number(p.screenPageViews);
    return {
      path,
      views,
      visitors: Number(p.activeUsers),
      avgEngagement: Number(p.activeUsers) ? Number(p.userEngagementDuration) / Number(p.activeUsers) : 0,
      cta: evOn(path, 'cta_click') + evOn(path, 'whatsapp_click'),
      forms,
      leads: leadsByFirstPage.get(path) ?? 0,
      rate: pct(forms, Number(p.activeUsers)),
    };
  });

  const blog = pages.filter((p) => p.path.startsWith('/blog/'));
  const services = pages.filter((p) => SERVICE_PATHS.some((s) => p.path.startsWith(s)));
  const leaky = pages
    .filter((p) => p.views >= 20 && p.forms === 0 && p.cta === 0 && !['/contact', '/thank-you', '/ai-visibility-check'].some((x) => p.path.startsWith(x)))
    .slice(0, 8);

  const row = (p: (typeof pages)[number]) => [p.path, num(p.visitors), num(p.views), num(p.cta), num(p.forms), num(p.leads), formatPct(p.rate)];
  const head = ['Page', 'Visitors', 'Views', 'CTA + WhatsApp clicks', 'Audit / form submissions', 'HubSpot leads (first page)', 'Conversion rate'];
  const empty = ga4 ? 'No page views in this period.' : 'Awaiting GA4 connection.';

  return (
    <Shell title="Website performance" intro="Which pages attract visitors and which turn them into enquiries." period={period}>
      <SourceBar sources={[['GA4', ga4Result], ['HubSpot', crmResult]]} />

      <Section title="All pages" note="Conversion rate = form submissions on the page ÷ visitors to it. Submissions are GA4 generate_lead events, recorded on the form page.">
        <Table head={head} rows={pages.slice(0, 40).map(row)} empty={empty} />
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Pages with traffic but no action" note="20+ views, no CTA click, WhatsApp click or lead. Candidates for a clearer call to action.">
          <BarList rows={leaky.map((p) => ({ label: p.path, value: p.views, hint: 'views' }))} />
        </Section>
        <Section title="Pages producing submissions">
          <BarList rows={pages.filter((p) => p.forms > 0).sort((a, b) => b.forms - a.forms).slice(0, 10).map((p) => ({ label: p.path, value: p.forms }))} />
        </Section>
      </div>

      <Section title="Service pages">
        <Table head={head} rows={services.map(row)} empty={empty} />
      </Section>

      <Section title="Blog" note="Average engagement = engaged time per visitor.">
        <Table
          head={['Article', 'Visitors', 'Views', 'Avg engagement', 'CTA + WhatsApp clicks', 'Submissions']}
          rows={blog.slice(0, 30).map((p) => [p.path.replace('/blog/', ''), num(p.visitors), num(p.views), `${Math.round(p.avgEngagement)}s`, num(p.cta), num(p.forms)])}
          empty={empty}
        />
      </Section>
    </Shell>
  );
}
