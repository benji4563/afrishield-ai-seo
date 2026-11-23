/**
 * GTM dataLayer events. The site only pushes events; GTM (container
 * GTM-WJN8ML48, loaded in app/layout.tsx) decides what to send to GA4, so the
 * site never calls gtag directly.
 *
 * `generate_lead` is GA4's recommended event name for a lead. It is pushed only
 * after /api/contact has confirmed the lead was saved, so a failed submission is
 * never counted. No personal data goes in: no name, email or phone, only which
 * form produced the lead. In GTM, a Custom Event trigger on `generate_lead`
 * fires a GA4 Event tag with the same name and a `form_name` parameter.
 */

type DataLayerEvent = { event: string } & Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export type LeadForm = 'contact' | 'ai_visibility_check';

export function trackLead(form: LeadForm): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'generate_lead', form_name: form });
}
