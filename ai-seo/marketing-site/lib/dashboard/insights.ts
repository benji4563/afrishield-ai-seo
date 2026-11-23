import type { Ga4Bundle } from './ga4';
import { sourceLabel, type CrmBundle } from './hubspot';
import { inRange, type Period } from './period';
import { crmSummary, formatMoney, revenueBy } from './metrics';

/**
 * Evidence-based recommendation engine. Deterministic rules over the real
 * numbers: no AI provider, no estimates. Every rule has a minimum sample size;
 * below it the category reports "not enough data" with the threshold, instead
 * of a conclusion. Nothing here acts on its own: the owner sets the status.
 */

export type Category = 'Acquisition' | 'Content' | 'Conversion' | 'Sales' | 'Revenue';
export const CATEGORIES: Category[] = ['Acquisition', 'Content', 'Conversion', 'Sales', 'Revenue'];

export type Recommendation = {
  id: string;
  title: string;
  category: Category;
  observation: string;
  evidence: string[];
  implication: string;
  action: string;
  priority: 'High' | 'Medium' | 'Low';
  measurement: string;
  why: string;
  generatedAt: string;
};

export type InsightResult = {
  recommendations: Recommendation[];
  notEnoughData: { category: Category; note: string }[];
};

const NON_CONTENT = ['/contact', '/ai-visibility-check', '/thank-you', '/dashboard', '/review'];
const DAY = 86_400_000;

export function generateInsights(period: Period, crm: CrmBundle | null, ga4: Ga4Bundle | null): InsightResult {
  const recs: Recommendation[] = [];
  const thin: InsightResult['notEnoughData'] = [];
  const today = new Date().toISOString().slice(0, 10);
  const add = (r: Omit<Recommendation, 'generatedAt'>) => recs.push({ ...r, generatedAt: today });
  const summary = crm ? crmSummary(crm, period) : null;

  // ── Acquisition ───────────────────────────────────────────────────────────
  if (summary) {
    const leads = summary.leads;
    const unattributed = leads.filter((c) => ['OFFLINE', 'UNKNOWN', ''].includes(c.originalSource));
    if (leads.length >= 3 && unattributed.length / leads.length >= 0.5) {
      add({
        id: 'acq-attribution-gap',
        title: 'Most leads have no traffic source in HubSpot',
        category: 'Acquisition',
        observation: `${unattributed.length} of ${leads.length} leads in ${period.label.toLowerCase()} show the source "Offline" or unknown.`,
        evidence: [
          `Leads in period: ${leads.length}`,
          `Without a web source: ${unattributed.length}`,
          'The site creates contacts through the HubSpot API, which records them as Offline unless the visitor\'s HubSpot cookie is passed along.',
        ],
        implication: 'You cannot yet tell which channel produces leads from CRM data, so channel decisions would be guesses.',
        action:
          'Send the hubspotutk cookie with each form lead (HubSpot Forms submission API or the contact\'s tracking cookie) so HubSpot ties the lead to its visit. The tracking code has been live since 23 Nov 2026, so new leads can be attributed.',
        priority: 'High',
        measurement: 'Share of new leads with a real original source (target: above 80%).',
        why: 'Fires when at least 3 leads exist and half or more have no web source.',
      });
    }

    const attributed = leads.filter((c) => !['OFFLINE', 'UNKNOWN', ''].includes(c.originalSource));
    if (attributed.length >= 5) {
      const counts = new Map<string, number>();
      attributed.forEach((c) => counts.set(c.originalSource, (counts.get(c.originalSource) ?? 0) + 1));
      const [topCode, topCount] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
      if (topCount / attributed.length >= 0.4) {
        add({
          id: `acq-top-channel-${topCode.toLowerCase()}`,
          title: `${sourceLabel(topCode)} brings the most attributable leads`,
          category: 'Acquisition',
          observation: `${topCount} of ${attributed.length} attributable leads came from ${sourceLabel(topCode)}.`,
          evidence: [...counts.entries()].map(([code, n]) => `${sourceLabel(code)}: ${n}`),
          implication: 'This channel is your most reliable lead source in the period.',
          action: `Keep publishing the content or campaigns behind ${sourceLabel(topCode)} leads, and check which pages they first landed on (Leads → first page).`,
          priority: 'Medium',
          measurement: 'Qualified leads from this channel next period vs this one.',
          why: 'Fires with at least 5 attributable leads when one channel has 40% or more of them.',
        });
      }
    } else {
      thin.push({ category: 'Acquisition', note: `Channel ranking needs at least 5 leads with a known source; this period has ${attributed.length}.` });
    }
  }

  if (ga4) {
    const leadsByChannel = new Map<string, number>();
    ga4.eventsBySource
      .filter((r) => r.eventName === 'generate_lead')
      .forEach((r) => leadsByChannel.set(String(r.sessionDefaultChannelGroup), (leadsByChannel.get(String(r.sessionDefaultChannelGroup)) ?? 0) + Number(r.eventCount)));
    for (const row of ga4.channels) {
      const sessions = Number(row.sessions);
      const channel = String(row.sessionDefaultChannelGroup);
      if (sessions >= 50 && !leadsByChannel.get(channel)) {
        add({
          id: `acq-traffic-no-leads-${channel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: `${channel} sends visits but no form leads`,
          category: 'Acquisition',
          observation: `${sessions} ${channel} sessions and 0 successful form submissions in the period.`,
          evidence: [`Sessions: ${sessions}`, `Engaged sessions: ${row.engagedSessions}`, 'generate_lead events: 0'],
          implication: 'Visitors from this channel are not finding a reason or a route to enquire.',
          action: `Check the landing pages ${channel} visitors arrive on (Acquisition → landing pages) and give each a clear free-check call to action.`,
          priority: 'Medium',
          measurement: `generate_lead events from ${channel} next period.`,
          why: 'Fires for a channel with 50+ sessions and no generate_lead event.',
        });
      }
    }
  }

  // ── Content ───────────────────────────────────────────────────────────────
  if (ga4) {
    const eventsOnPage = new Map<string, number>();
    ga4.eventsByPage.forEach((r) => eventsOnPage.set(String(r.pagePath), (eventsOnPage.get(String(r.pagePath)) ?? 0) + Number(r.eventCount)));
    const candidates = ga4.pages.filter(
      (p) => Number(p.screenPageViews) >= 100 && !NON_CONTENT.some((x) => String(p.pagePath).startsWith(x)) && !eventsOnPage.get(String(p.pagePath)),
    );
    for (const page of candidates.slice(0, 3)) {
      add({
        id: `content-no-action-${String(page.pagePath).replace(/[^a-z0-9]+/gi, '-').slice(0, 80)}`,
        title: `Traffic without action on ${page.pagePath}`,
        category: 'Content',
        observation: `${page.screenPageViews} views and no tracked call-to-action click or lead from this page.`,
        evidence: [`Views: ${page.screenPageViews}`, `Visitors: ${page.activeUsers}`, 'cta_click, whatsapp_click and generate_lead on this page: 0'],
        implication: 'The page attracts people but does not move them toward an enquiry.',
        action: 'Add a contextual free AI visibility check call to action and internal links to the matching service page.',
        priority: 'Medium',
        measurement: 'CTA clicks and leads from this page next period.',
        why: 'Fires for a content page with 100+ views and no tracked site event.',
      });
    }
    if (!candidates.length && !ga4.pages.some((p) => Number(p.screenPageViews) >= 100)) {
      thin.push({ category: 'Content', note: 'Page-level advice needs a page with at least 100 views in the period.' });
    }
  } else thin.push({ category: 'Content', note: 'Needs GA4 data.' });

  // ── Conversion ────────────────────────────────────────────────────────────
  if (ga4) {
    const auditViews = ga4.pages.filter((p) => String(p.pagePath).startsWith('/ai-visibility-check')).reduce((s, p) => s + Number(p.screenPageViews), 0);
    const auditLeads = ga4.eventsByPage
      .filter((r) => r.eventName === 'generate_lead' && String(r.pagePath).startsWith('/ai-visibility-check'))
      .reduce((s, r) => s + Number(r.eventCount), 0);
    if (auditViews >= 30) {
      const rate = (auditLeads / auditViews) * 100;
      if (rate < 3) {
        add({
          id: 'conv-audit-page-rate',
          title: 'The free check page converts few of its visitors',
          category: 'Conversion',
          observation: `${auditLeads} submissions from ${auditViews} views of /ai-visibility-check (${rate.toFixed(1)}%).`,
          evidence: [`Page views: ${auditViews}`, `Successful submissions (generate_lead): ${auditLeads}`],
          implication: 'People who want the free check are dropping off on the page itself.',
          action: 'Review the offer wording, the number of required fields and the mobile form experience; test one change at a time.',
          priority: 'High',
          measurement: 'Submission rate on /ai-visibility-check (views → generate_lead).',
          why: 'Fires with 30+ views of the page and a submission rate below 3%.',
        });
      }
    } else thin.push({ category: 'Conversion', note: `Audit-page advice needs 30+ views of /ai-visibility-check; this period has ${auditViews}.` });

    const clicks = ga4.events.filter((e) => e.eventName === 'cta_click').reduce((s, e) => s + Number(e.eventCount), 0);
    const leads = ga4.events.filter((e) => e.eventName === 'generate_lead').reduce((s, e) => s + Number(e.eventCount), 0);
    if (clicks >= 30 && leads / clicks < 0.1) {
      add({
        id: 'conv-cta-to-lead',
        title: 'Many CTA clicks, few completed forms',
        category: 'Conversion',
        observation: `${clicks} CTA clicks led to ${leads} successful submissions.`,
        evidence: [`cta_click: ${clicks}`, `generate_lead: ${leads}`],
        implication: 'Interest is there; the step after the click loses people.',
        action: 'Shorten the form, make the 48-hour promise visible next to the submit button, and check form errors on mobile.',
        priority: 'High',
        measurement: 'generate_lead ÷ cta_click.',
        why: 'Fires with 30+ CTA clicks and under 10% of them ending in a lead.',
      });
    }
  } else thin.push({ category: 'Conversion', note: 'Needs GA4 data.' });

  // ── Sales ─────────────────────────────────────────────────────────────────
  if (summary && crm) {
    const waiting = summary.unworked.filter((c) => Date.now() - Date.parse(c.createdAt) > DAY);
    if (waiting.length) {
      const oldest = Math.max(...waiting.map((c) => Math.floor((Date.now() - Date.parse(c.createdAt)) / DAY)));
      add({
        id: 'sales-unworked-leads',
        title: `${waiting.length} lead${waiting.length === 1 ? '' : 's'} with no recorded follow-up`,
        category: 'Sales',
        observation: `${waiting.length} contact${waiting.length === 1 ? ' has' : 's have'} lead status New or empty, no logged contact and no deal. Oldest: ${oldest} days.`,
        evidence: waiting.slice(0, 8).map((c) => `${c.name}${c.company ? ` (${c.company})` : ''}: created ${c.createdAt.slice(0, 10)}`),
        implication: 'Leads that wait cool off; the free check promises a reply within 48 hours.',
        action: 'Contact each one, log the call or email in HubSpot, and set the lead status (or mark spam/test leads as Unqualified).',
        priority: oldest > 2 ? 'High' : 'Medium',
        measurement: 'Number of leads awaiting first contact (target: 0 older than 48 hours).',
        why: 'Fires for any non-review lead older than one day with no status change, logged contact or deal.',
      });
    }
    const stalled = summary.open.filter((d) => d.lastModified && Date.now() - Date.parse(d.lastModified) > 14 * DAY);
    if (stalled.length) {
      add({
        id: 'sales-stalled-deals',
        title: `${stalled.length} open deal${stalled.length === 1 ? '' : 's'} untouched for 14+ days`,
        category: 'Sales',
        observation: 'These deals have had no update in two weeks.',
        evidence: stalled.slice(0, 8).map((d) => `${d.name}: ${d.stageLabel}, last update ${d.lastModified?.slice(0, 10)}`),
        implication: 'Stalled deals usually mean a missing next step.',
        action: 'Set a dated next step on each deal, or close it as lost with a reason.',
        priority: 'Medium',
        measurement: 'Open deals with no update in 14 days.',
        why: 'Fires for any open deal last modified more than 14 days ago.',
      });
    }
  }

  // ── Revenue ───────────────────────────────────────────────────────────────
  if (crm) {
    const allWon = crm.deals.filter((d) => d.isWon);
    if (!allWon.length) {
      add({
        id: 'rev-not-in-crm',
        title: 'Verified revenue is not recorded in HubSpot yet',
        category: 'Revenue',
        observation: 'HubSpot has no closed-won deals, so the dashboard cannot report revenue or revenue by source.',
        evidence: [`Deals in HubSpot: ${crm.deals.length}`, 'Paying clients are tracked outside the CRM (finance register).'],
        implication: 'Revenue, revenue by service and revenue by channel stay blank until deals exist.',
        action: 'Record each paying client as a Closed Won deal (amount, currency, close date, service, linked contact). Add XAF in HubSpot currency settings first.',
        priority: 'High',
        measurement: 'Closed-won deals in HubSpot vs clients in the finance register.',
        why: 'Fires while HubSpot has zero closed-won deals.',
      });
    } else {
      const won = allWon.filter((d) => inRange(d.closeDate, period.start, period.end) && d.amount != null);
      if (won.length >= 3) {
        const byService = revenueBy(crm, won, (d) => d.service || 'Unspecified service');
        const top = byService[0];
        add({
          id: `rev-top-service-${top.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: `${top.name} leads recorded revenue`,
          category: 'Revenue',
          observation: `${top.deals} of ${won.length} won deals in the period, worth ${formatMoney(top.money)}.`,
          evidence: byService.map((g) => `${g.name}: ${g.deals} deals, ${formatMoney(g.money)}`),
          implication: 'This service currently earns the most verified revenue.',
          action: 'Review whether more marketing effort should go to this service, and whether its pricing reflects demand.',
          priority: 'Low',
          measurement: 'Won revenue by service next period.',
          why: 'Fires with at least 3 won deals with amounts in the period.',
        });
      } else thin.push({ category: 'Revenue', note: `Revenue patterns need 3+ won deals with amounts in the period; this period has ${won.length}.` });
    }
  }

  return { recommendations: recs, notEnoughData: thin };
}
