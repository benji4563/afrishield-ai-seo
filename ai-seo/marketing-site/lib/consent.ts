/**
 * Cookie consent: one first-party cookie, `afs_consent`, holding the visitor's
 * choice for 180 days, plus Google Consent Mode v2 signals for GTM.
 *
 * Categories:
 * - necessary (always on): the consent cookie itself, the dashboard session,
 *   and the affiliate referral cookie `afs_ref` (credits the partner who sent
 *   the visitor; set server-side before any banner can show).
 * - analytics: Google Analytics 4 through GTM (`analytics_storage`).
 * - marketing: the HubSpot tracking code (visit history linked to leads) and
 *   Google's advertising signals (`ad_storage`, `ad_user_data`,
 *   `ad_personalization`).
 *
 * Defaults are "denied" for analytics and marketing, set inline in
 * app/layout.tsx before GTM loads (CONSENT_DEFAULT_SCRIPT). Vercel Analytics is
 * cookieless and needs no consent.
 */

export const CONSENT_COOKIE = 'afs_consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_EVENT = 'afs-consent-change';
export const OPEN_SETTINGS_EVENT = 'afs-open-cookie-settings';

export type Consent = { v: number; analytics: boolean; marketing: boolean; at: string };

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function readConsent(): Consent | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`))?.[1];
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function gtagUpdate(consent: Consent) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  const gtag =
    w.gtag ??
    function gtag() {
      // gtag requires the `arguments` object itself, not an array copy.
      w.dataLayer!.push(arguments);
    };
  const ad = consent.marketing ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
  });
  w.dataLayer.push({ event: 'consent_update', analytics_consent: consent.analytics, marketing_consent: consent.marketing });
}

/** Deletes cookies whose name starts with one of the prefixes, on this host and the parent domain. */
function deleteCookies(prefixes: string[]) {
  const host = location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (!prefixes.some((p) => name.startsWith(p))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): Consent {
  const consent: Consent = { v: CONSENT_VERSION, analytics, marketing, at: new Date().toISOString() };
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 86400
  }; path=/; SameSite=Lax${secure}`;
  gtagUpdate(consent);
  // Withdrawing consent removes cookies already set under it.
  if (!analytics) deleteCookies(['_ga', '_gid']);
  if (!marketing) deleteCookies(['__hs', 'hubspotutk', 'messagesUtk']);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/**
 * Runs inline in <head> before GTM: sets the Consent Mode v2 defaults, then
 * applies a choice the visitor already saved, so tags never fire on a stale
 * state. Kept dependency-free and tiny.
 */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{var m=document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c.v===${CONSENT_VERSION}){var ad=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:ad,ad_user_data:ad,ad_personalization:ad});}}}catch(e){}`;
