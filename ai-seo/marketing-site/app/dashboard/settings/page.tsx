import { Shell } from '@/components/dashboard/Shell';
import { Section, SourceStatus, Table } from '@/components/dashboard/ui';
import { requireSession } from '@/lib/dashboard/auth';
import { ga4Configured, getGa4 } from '@/lib/dashboard/ga4';
import { gscConfigured } from '@/lib/dashboard/gsc';
import { getCrm, hubspotConfigured } from '@/lib/dashboard/hubspot';
import { DEFINITIONS } from '@/lib/dashboard/metrics';
import { resolvePeriod } from '@/lib/dashboard/period';
import { storeConfigured } from '@/lib/dashboard/store';

export default async function Settings() {
  await requireSession();
  const period = resolvePeriod({});
  const [ga4, crm] = await Promise.all([getGa4(period.start, period.end, period.prevStart, period.prevEnd), getCrm()]);
  const yes = (v: boolean) => (v ? 'Configured' : 'Missing');

  return (
    <Shell title="Settings" intro="Data sources, access and definitions. Secrets live only in Vercel environment variables and never reach the browser.">
      <Section title="Data sources">
        <div className="space-y-2">
          <SourceStatus name="GA4 (property 565522788)" result={ga4} />
          <br />
          <SourceStatus name="HubSpot (portal 148875549)" result={crm} />
        </div>
        <div className="mt-4">
          <Table
            head={['Source', 'Role', 'Server setting', 'Status']}
            rows={[
              ['GA4 Data API', 'Traffic, pages, events', 'GA4_PROPERTY_ID, GA4_SERVICE_ACCOUNT_KEY', yes(ga4Configured())],
              ['Search Console API', 'Google clicks, impressions, positions, queries', 'GA4_SERVICE_ACCOUNT_KEY (same account, added as a user on the property); optional GSC_SITE_URL', yes(gscConfigured())],
              ['HubSpot CRM API', 'Contacts, deals, pipeline (read-only)', 'HUBSPOT_TOKEN', yes(hubspotConfigured())],
              ['Supabase', 'Recommendation statuses', 'SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY', yes(storeConfigured())],
              ['Vercel Analytics', 'Site monitoring (stays in Vercel)', '—', 'Not imported'],
              ['WhatsApp', 'Confirmed conversations', '—', 'Not connected'],
              ['Zapier', 'Approved automations', '—', 'None configured'],
            ]}
          />
        </div>
        <p className="mt-3 text-small text-slate">Data is cached for 15 minutes per source. &quot;Refresh data&quot; on any report page fetches fresh data immediately.</p>
      </Section>

      <Section title="Access">
        <ul className="list-disc space-y-1 pl-5 text-small">
          <li>One owner password, stored only as a scrypt hash in DASHBOARD_PASSWORD_HASH. Sessions last 8 hours in a secure, HTTP-only cookie.</li>
          <li>Change the password: run <code>node scripts/dashboard-password.mjs</code>, replace DASHBOARD_PASSWORD_HASH in Vercel, redeploy.</li>
          <li>Sign everyone out: replace DASHBOARD_SESSION_SECRET in Vercel and redeploy.</li>
          <li>Five wrong passwords lock the login for 15 minutes from that address.</li>
        </ul>
      </Section>

      <Section title="Definitions">
        <dl className="grid gap-3 text-small md:grid-cols-2">
          {Object.entries(DEFINITIONS).map(([key, text]) => (
            <div key={key}>
              <dt className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}</dt>
              <dd className="text-slate">{text}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </Shell>
  );
}
