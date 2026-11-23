'use client';

import { useEffect } from 'react';
import { trackCta, trackWhatsApp } from '@/lib/analytics';

/**
 * One delegated click listener for the whole site, so buttons and links stay
 * server components and only carry data attributes:
 *
 * - any element with `data-cta-location` pushes `cta_click`
 *   (with `data-cta-target`);
 * - any link to wa.me pushes `whatsapp_click` instead, located by its
 *   `data-cta-location` or as `floating` (the sitewide button).
 *
 * It renders nothing and never sends personal data.
 */
export function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      if (!target?.closest) return;

      const whatsapp = target.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (whatsapp) {
        trackWhatsApp(whatsapp.dataset.ctaLocation ?? 'floating');
        return;
      }

      const cta = target.closest<HTMLElement>('[data-cta-location]');
      if (cta) trackCta(cta.dataset.ctaLocation ?? 'unknown', cta.dataset.ctaTarget ?? 'unknown');
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
