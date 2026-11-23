import { inRange, type Period } from './period';
import { isQualified, isUnworked, sourceLabel, type Contact, type CrmBundle, type Deal } from './hubspot';

/**
 * Definitions used across the dashboard. Each KPI card links its definition,
 * so visitors, sessions, contacts, leads, deals and clients never get mixed.
 */
export const DEFINITIONS = {
  visitors: 'GA4 active users: distinct browsers that had an engaged session or first visit. One person on two devices counts twice.',
  sessions: 'GA4 sessions: visits. One visitor can have several.',
  pageViews: 'GA4 screen/page views.',
  engagedSessions: 'GA4 engaged sessions: lasted 10+ seconds, had 2+ page views, or fired a key event.',
  newUsers: 'GA4 new users: first visit in the period.',
  leads: 'HubSpot contacts created in the period, excluding review-form submissions. Includes contacts added by hand or by API.',
  auditSubmissions: 'HubSpot contacts created in the period from the AI visibility check form (read from the Source line the site writes).',
  otherEnquiries: 'HubSpot contacts created in the period from the contact form.',
  formSubmissionsGa4: 'GA4 generate_lead events: fired only after the lead was saved. Can differ from HubSpot when consent, ad blockers or test leads apply.',
  ctaClicks: 'GA4 cta_click events. A click is never counted as a lead.',
  whatsappClicks: 'GA4 whatsapp_click events: a tap on a WhatsApp link to AfriShield. Not a conversation.',
  whatsappEnquiries: 'Confirmed WhatsApp enquiries need a WhatsApp integration or a logged HubSpot activity. Not connected.',
  consultations: 'Deals currently at or past the "Appointment Scheduled" stage, created in the period.',
  qualified: 'Contacts with lifecycle stage Sales Qualified Lead or later, or lead status Connected / Open deal. Set in HubSpot.',
  proposals: 'Deals currently at or past "Contract Sent", including closed ones, created in the period.',
  openOpportunities: 'Deals not closed, regardless of creation date.',
  closedWon: 'Deals closed won with a close date in the period.',
  closedLost: 'Deals closed lost with a close date in the period.',
  revenue: 'Sum of closed-won deal amounts with a close date in the period, per currency. Never converted or mixed.',
} as const;

/** HubSpot default pipeline stage ids → reporting categories. */
export const STAGE_CATEGORY: Record<string, string> = {
  appointmentscheduled: 'Consultation scheduled',
  qualifiedtobuy: 'Qualified',
  presentationscheduled: 'Consultation held',
  decisionmakerboughtin: 'Negotiation',
  contractsent: 'Proposal sent',
  closedwon: 'Closed won',
  closedlost: 'Closed lost',
};

export function leadContacts(crm: CrmBundle, start: string, end: string): Contact[] {
  return crm.contacts.filter((c) => c.form !== 'Review form' && inRange(c.createdAt, start, end));
}

function stageOrder(crm: CrmBundle, stageId: string): number {
  return crm.stages.find((s) => s.id === stageId)?.order ?? -1;
}

function atOrPast(crm: CrmBundle, deal: Deal, stageId: string): boolean {
  if (deal.isWon) return true;
  if (deal.stage === 'closedlost') return false;
  return stageOrder(crm, deal.stage) >= stageOrder(crm, stageId);
}

export type MoneyByCurrency = Record<string, number>;

export function addMoney(target: MoneyByCurrency, currency: string, amount: number | null) {
  if (amount == null) return;
  target[currency] = (target[currency] ?? 0) + amount;
}

export function formatMoney(money: MoneyByCurrency): string {
  const entries = Object.entries(money);
  if (!entries.length) return '—';
  return entries
    .map(([currency, amount]) =>
      currency === 'XAF'
        ? `${Math.round(amount).toLocaleString('en-US')} FCFA`
        : new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount),
    )
    .join(' + ');
}

export function crmSummary(crm: CrmBundle, period: Period) {
  const { start, end, prevStart, prevEnd } = period;
  const leads = leadContacts(crm, start, end);
  const prevLeads = leadContacts(crm, prevStart, prevEnd);
  const createdDeals = crm.deals.filter((d) => inRange(d.createdAt, start, end));
  const won = crm.deals.filter((d) => d.isWon && inRange(d.closeDate, start, end));
  const lost = crm.deals.filter((d) => d.isClosed && !d.isWon && inRange(d.closeDate, start, end));
  const open = crm.deals.filter((d) => !d.isClosed);

  const revenue: MoneyByCurrency = {};
  const missingAmount = won.filter((d) => d.amount == null).length;
  for (const deal of won) addMoney(revenue, deal.currency, deal.amount);
  const openValue: MoneyByCurrency = {};
  for (const deal of open) addMoney(openValue, deal.currency, deal.amount);

  return {
    leads,
    prevLeads,
    audit: leads.filter((c) => c.form === 'AI visibility check'),
    otherEnquiries: leads.filter((c) => c.form === 'Contact form'),
    qualified: leads.filter(isQualified),
    unworked: crm.contacts.filter((c) => c.form !== 'Review form' && isUnworked(c)),
    consultations: createdDeals.filter((d) => atOrPast(crm, d, 'appointmentscheduled')),
    proposals: createdDeals.filter((d) => atOrPast(crm, d, 'contractsent')),
    open,
    won,
    lost,
    revenue,
    openValue,
    missingAmount,
  };
}

/** Group closed-won revenue by a key, keeping currencies apart. */
export function revenueBy(crm: CrmBundle, won: Deal[], key: (deal: Deal) => string) {
  const groups = new Map<string, { money: MoneyByCurrency; deals: number }>();
  for (const deal of won) {
    const name = key(deal) || 'Unknown';
    const group = groups.get(name) ?? { money: {}, deals: 0 };
    addMoney(group.money, deal.currency, deal.amount);
    group.deals += 1;
    groups.set(name, group);
  }
  return [...groups.entries()].map(([name, value]) => ({ name, ...value })).sort((a, b) => b.deals - a.deals);
}

/** First-touch source of a deal = original source of its first linked contact. */
export function dealSource(crm: CrmBundle, deal: Deal): string {
  const contact = crm.contacts.find((c) => deal.contactIds.includes(c.id));
  return contact ? sourceLabel(contact.originalSource) : 'Unknown';
}

export function dealCampaign(crm: CrmBundle, deal: Deal): string {
  const contact = crm.contacts.find((c) => deal.contactIds.includes(c.id));
  return contact?.originalCampaign || contact?.originalSourceDetail || 'Unknown';
}

/** Open deals with no update for `days` days. */
export function staleDeals(open: Deal[], days = 14): Deal[] {
  const cutoff = Date.now() - days * 86_400_000;
  return open.filter((d) => d.lastModified && Date.parse(d.lastModified) < cutoff);
}

export const pct =(part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : null);

export function formatPct(value: number | null, digits = 1): string {
  return value == null ? '—' : `${value.toFixed(digits)}%`;
}

export function change(current: number, previous: number): number | null {
  if (!previous) return current ? null : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * GA4 channel groups ↔ HubSpot source codes, so one channel table can show
 * GA4 traffic next to CRM leads. The two systems classify independently, so
 * the match is approximate and labelled as such.
 */
export const GA4_CHANNEL_TO_HUBSPOT: Record<string, string[]> = {
  'Organic Search': ['ORGANIC_SEARCH'],
  Direct: ['DIRECT_TRAFFIC'],
  'Organic Social': ['SOCIAL_MEDIA'],
  'Paid Social': ['PAID_SOCIAL'],
  'Paid Search': ['PAID_SEARCH'],
  Referral: ['REFERRALS', 'AI_REFERRALS'],
  Email: ['EMAIL_MARKETING'],
  'Cross-network': ['OTHER_CAMPAIGNS'],
  Unassigned: ['OFFLINE', 'UNKNOWN'],
};
