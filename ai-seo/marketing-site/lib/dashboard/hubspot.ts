import { cachedSource, type SourceResult } from './source';

/**
 * HubSpot CRM, read-only, with the site's existing private-app token
 * (HUBSPOT_TOKEN, scopes: contacts and deals read). The dashboard never writes
 * to HubSpot: HubSpot stays the system of record for contacts and deals.
 *
 * Personal data is kept to what the reports need: name and company for the
 * lead list, never email or phone. Contacts open in HubSpot for anything more.
 */

const API = 'https://api.hubapi.com';
const PORTAL = '148875549';
const UI = 'https://app-eu1.hubspot.com';

export const contactUrl = (id: string) => `${UI}/contacts/${PORTAL}/record/0-1/${id}`;
export const dealUrl = (id: string) => `${UI}/contacts/${PORTAL}/record/0-3/${id}`;

export type Contact = {
  id: string;
  name: string;
  company: string;
  createdAt: string;
  originalSource: string; // HubSpot hs_analytics_source, e.g. ORGANIC_SEARCH
  originalSourceDetail: string; // hs_analytics_source_data_1
  originalCampaign: string; // hs_analytics_source_data_2
  latestSource: string;
  firstPage: string; // hs_analytics_first_url path
  lifecycleStage: string;
  leadStatus: string;
  lastContacted: string | null;
  lastActivity: string | null;
  deals: number;
  form: string; // which site form, read from the Source line the site writes
  serviceInterest: string;
};

export type Deal = {
  id: string;
  name: string;
  amount: number | null;
  currency: string;
  stage: string;
  stageLabel: string;
  pipeline: string;
  isClosed: boolean;
  isWon: boolean;
  createdAt: string;
  closeDate: string | null;
  enteredStageAt: string | null;
  lastModified: string | null;
  service: string;
  contactIds: string[];
};

export type Stage = { id: string; label: string; order: number; isClosed: boolean; probability: number | null };

export type CrmBundle = { contacts: Contact[]; deals: Deal[]; stages: Stage[] };

const CONTACT_PROPS = [
  'firstname',
  'lastname',
  'company',
  'createdate',
  'hs_analytics_source',
  'hs_analytics_source_data_1',
  'hs_analytics_source_data_2',
  'hs_latest_source',
  'hs_analytics_first_url',
  'lifecyclestage',
  'hs_lead_status',
  'notes_last_contacted',
  'hs_last_sales_activity_timestamp',
  'num_associated_deals',
  'message',
];

const DEAL_PROPS = [
  'dealname',
  'amount',
  'deal_currency_code',
  'dealstage',
  'pipeline',
  'createdate',
  'closedate',
  'hs_is_closed',
  'hs_is_closed_won',
  'hs_lastmodifieddate',
  'hs_date_entered_closedwon',
  'dealtype',
  'description',
];

async function hubspot<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) throw new Error('HUBSPOT_TOKEN is not set');
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HubSpot ${response.status} on ${path.split('?')[0]}: ${text.slice(0, 160)}`);
  }
  return (await response.json()) as T;
}

type SearchPage = { results: { id: string; properties: Record<string, string | null> }[]; paging?: { next?: { after: string } } };

/** Pages through a CRM search (100 per page, capped at 2,000 records). */
async function searchAll(object: 'contacts' | 'deals', properties: string[]) {
  const out: SearchPage['results'] = [];
  let after: string | undefined;
  do {
    const page = await hubspot<SearchPage>(`/crm/v3/objects/${object}/search`, {
      method: 'POST',
      body: JSON.stringify({
        limit: 100,
        after,
        properties,
        sorts: [{ propertyName: 'createdate', direction: 'DESCENDING' }],
      }),
    });
    out.push(...page.results);
    after = page.paging?.next?.after;
  } while (after && out.length < 2000);
  return out;
}

function pathOf(url: string | null): string {
  if (!url) return '';
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

/** The site writes "Source: /contact" (and tier/business type) into `message`. */
function readMessage(message: string | null) {
  const text = message ?? '';
  const source = text.match(/Source:\s*(\S+)/)?.[1] ?? '';
  const form = source.includes('ai-visibility-check')
    ? 'AI visibility check'
    : source.includes('review')
      ? 'Review form'
      : source
        ? 'Contact form'
        : 'Not a site form';
  const tier = text.match(/(?:Tier|Plan|Interest)[^:]*:\s*([^\n]+)/i)?.[1]?.trim() ?? '';
  const businessType = text.match(/Business type:\s*([^\n]+)/i)?.[1]?.trim() ?? '';
  return { form, serviceInterest: tier || businessType || '' };
}

async function fetchCrm(): Promise<CrmBundle> {
  const [contactRows, dealRows, pipelines] = await Promise.all([
    searchAll('contacts', CONTACT_PROPS),
    searchAll('deals', DEAL_PROPS),
    hubspot<{ results: { id: string; label: string; stages: { id: string; label: string; displayOrder: number; metadata: Record<string, string> }[] }[] }>(
      '/crm/v3/pipelines/deals',
    ),
  ]);

  const stages: Stage[] = pipelines.results.flatMap((pipeline) =>
    pipeline.stages.map((stage) => ({
      id: stage.id,
      label: pipelines.results.length > 1 ? `${pipeline.label}: ${stage.label}` : stage.label,
      order: stage.displayOrder,
      isClosed: stage.metadata?.isClosed === 'true',
      probability: stage.metadata?.probability ? Number(stage.metadata.probability) : null,
    })),
  );
  const stageLabel = new Map(stages.map((s) => [s.id, s.label]));

  // Deal → contact links, batched (only when deals exist).
  const dealContacts = new Map<string, string[]>();
  for (let i = 0; i < dealRows.length; i += 100) {
    const ids = dealRows.slice(i, i + 100).map((d) => ({ id: d.id }));
    const assoc = await hubspot<{ results: { from: { id: string }; to: { toObjectId: number | string }[] }[] }>(
      '/crm/v4/associations/deals/contacts/batch/read',
      { method: 'POST', body: JSON.stringify({ inputs: ids }) },
    );
    for (const row of assoc.results) dealContacts.set(row.from.id, row.to.map((t) => String(t.toObjectId)));
  }

  const contacts: Contact[] = contactRows.map(({ id, properties: p }) => {
    const { form, serviceInterest } = readMessage(p.message);
    return {
      id,
      name: [p.firstname, p.lastname].filter(Boolean).join(' ') || '(no name)',
      // Spam submissions sometimes paste a whole pitch into the company field.
      company: (p.company ?? '').length > 60 ? `${(p.company ?? '').slice(0, 57)}…` : (p.company ?? ''),
      createdAt: p.createdate ?? '',
      originalSource: p.hs_analytics_source ?? 'UNKNOWN',
      originalSourceDetail: p.hs_analytics_source_data_1 ?? '',
      originalCampaign: p.hs_analytics_source_data_2 ?? '',
      latestSource: p.hs_latest_source ?? '',
      firstPage: pathOf(p.hs_analytics_first_url),
      lifecycleStage: p.lifecyclestage ?? '',
      leadStatus: p.hs_lead_status ?? '',
      lastContacted: p.notes_last_contacted || null,
      lastActivity: p.hs_last_sales_activity_timestamp || null,
      deals: Number(p.num_associated_deals ?? 0),
      form,
      serviceInterest,
    };
  });

  const deals: Deal[] = dealRows.map(({ id, properties: p }) => ({
    id,
    name: p.dealname ?? '(unnamed deal)',
    amount: p.amount ? Number(p.amount) : null,
    currency: p.deal_currency_code || 'USD', // portal company currency when unset
    stage: p.dealstage ?? '',
    stageLabel: stageLabel.get(p.dealstage ?? '') ?? p.dealstage ?? '',
    pipeline: p.pipeline ?? '',
    isClosed: p.hs_is_closed === 'true',
    isWon: p.hs_is_closed_won === 'true',
    createdAt: p.createdate ?? '',
    closeDate: p.closedate || null,
    enteredStageAt: p.hs_date_entered_closedwon || null,
    lastModified: p.hs_lastmodifieddate || null,
    service: p.dealtype || '',
    contactIds: dealContacts.get(id) ?? [],
  }));

  return { contacts, deals, stages };
}

const cachedCrm = cachedSource('hubspot', ['crm-v1'], fetchCrm);

export function hubspotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_TOKEN);
}

export async function getCrm(): Promise<SourceResult<CrmBundle>> {
  if (!hubspotConfigured()) return { status: 'not_configured', reason: 'HUBSPOT_TOKEN is not set on the server.' };
  return cachedCrm();
}

/** HubSpot source codes → the dashboard's channel names. */
export const SOURCE_LABEL: Record<string, string> = {
  ORGANIC_SEARCH: 'Organic Search',
  PAID_SEARCH: 'Paid Search',
  EMAIL_MARKETING: 'Email',
  SOCIAL_MEDIA: 'Organic Social',
  PAID_SOCIAL: 'Paid Social',
  REFERRALS: 'Referral',
  OTHER_CAMPAIGNS: 'Other Campaigns',
  DIRECT_TRAFFIC: 'Direct',
  AI_REFERRALS: 'AI Referral',
  OFFLINE: 'Offline / API (no web visit recorded)',
  UNKNOWN: 'Unknown',
};

export const sourceLabel = (code: string) => SOURCE_LABEL[code] ?? (code || 'Unknown');

/**
 * Qualified = lifecycle stage of sales-qualified lead or later, or a lead
 * status that shows a real conversation (Connected, Open deal). This is the
 * dashboard's definition; HubSpot fields are set by the owner.
 */
export function isQualified(contact: Contact): boolean {
  return (
    ['salesqualifiedlead', 'opportunity', 'customer', 'evangelist'].includes(contact.lifecycleStage) ||
    ['CONNECTED', 'OPEN_DEAL'].includes(contact.leadStatus)
  );
}

/**
 * Awaiting first contact: lead status still empty or NEW (the site sets NEW on
 * every form lead), no logged contact or sales activity, and no deal.
 */
export function isUnworked(contact: Contact): boolean {
  return (
    (!contact.leadStatus || contact.leadStatus === 'NEW') &&
    !contact.lastContacted &&
    !contact.lastActivity &&
    contact.deals === 0
  );
}
