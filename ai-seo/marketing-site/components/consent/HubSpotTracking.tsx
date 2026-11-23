'use client';

import { useEffect } from 'react';
import { CONSENT_EVENT, readConsent, type Consent } from '@/lib/consent';

const SRC = 'https://js-eu1.hs-scripts.com/148875549.js'; // portal 148875549, EU1

/**
 * Loads the HubSpot tracking code only after marketing consent. Before
 * 2026-11 it loaded for everyone from <head>. Form leads do not depend on it:
 * /api/contact creates the contact server-side either way. Without consent,
 * HubSpot simply records the lead's source as "Offline".
 */
export function HubSpotTracking() {
  useEffect(() => {
    const load = (consent: Consent | null) => {
      if (!consent?.marketing || document.getElementById('hs-script-loader')) return;
      const script = document.createElement('script');
      script.id = 'hs-script-loader';
      script.async = true;
      script.defer = true;
      script.src = SRC;
      document.body.appendChild(script);
    };
    load(readConsent());
    const onChange = (event: Event) => {
      const consent = (event as CustomEvent<Consent>).detail;
      if (consent.marketing) load(consent);
      // Withdrawn after loading: stop tracking for the rest of this visit.
      else if (document.getElementById('hs-script-loader')) location.reload();
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  return null;
}
