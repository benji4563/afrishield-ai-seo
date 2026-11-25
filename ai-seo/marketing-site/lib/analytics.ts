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

function push(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackLead(form: LeadForm): void {
  push({ event: 'generate_lead', form_name: form });
}

/**
 * A click on a call to action. Never a lead: `generate_lead` alone counts a
 * conversion. `cta_location` is where the click happened (hero, audit_section,
 * services_section, final_cta, navigation); `cta_target` is where it leads
 * (free_check, consultation, pricing, a service page).
 */
export function trackCta(location: string, target: string): void {
  push({ event: 'cta_click', cta_location: location, cta_target: target });
}

/** A click that opens WhatsApp, wherever the link sits. */
export function trackWhatsApp(location: string): void {
  push({ event: 'whatsapp_click', cta_location: location });
}
