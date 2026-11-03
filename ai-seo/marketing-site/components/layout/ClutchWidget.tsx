'use client';

import Script from 'next/script';
import { useCallback, useRef } from 'react';
import { SITE } from '@/lib/site';

declare global {
  interface Window {
    /** Injected by Clutch's widget.js. `Init` paints every `.clutch-widget`. */
    CLUTCHCO?: { Init: () => void; Destroy?: () => void };
  }
}

/**
 * Clutch review badge, profile live 2026-10-31.
 *
 * **Why this needs a component and an explicit Init call.** Clutch's embed is
 * a bare div plus their script, and the script auto-paints the div off the
 * page load event. `next/script` loads it *after* that event has fired, so the
 * listener never runs: the script arrives, `window.CLUTCHCO` is defined, and
 * the container stays 0x0 forever. Dropping in their copy-paste snippet gives
 * you a silently empty footer - verified in the browser before this was
 * written, which is the only reason it was caught.
 *
 * `onReady` rather than `onLoad`, because onLoad fires once per page load
 * while onReady fires on load *and* on every remount - that is what keeps the
 * badge painted across client-side navigations.
 *
 * The markup keeps Clutch's own data-* attribute names: the script reads them,
 * so they are their API and not ours to tidy. `data-nofollow="true"` is on
 * their instruction for a footer placement, and it is honoured - the rendered
 * iframe requests `...&rel_nofollow=true`. It matters because the footer is on
 * every page, and a followed link repeated site-wide is a site-wide vote for
 * clutch.co. The TechBehemoths badge beside it stays followed on purpose:
 * their verification check requires it.
 *
 * Two deviations from the snippet Clutch hands out, both measured:
 *
 * 1. **No `data-expandifr`.** It makes widget.js listen for an iframe-resizer
 *    message and set the height from it. On this fixed 40px badge the message
 *    reports 0 and the script collapses the iframe to `height: 0px` - present
 *    in the DOM, 185px wide, invisible. Without it the iframe keeps its own
 *    `height="40px"` and renders. The attribute is there for the tall review
 *    widgets that genuinely need to grow; this one does not.
 *
 * 2. **A white chip.** The badge paints dark text ("1 REVIEW", #17313b) and
 *    red stars on transparent. That is unreadable on this footer, which is the
 *    same reason the TechBehemoths badge next to it sits on a light chip.
 *
 * **What this is worth.** The stars, rating and review count all live inside a
 * cross-origin iframe, so none of that text is in our HTML. It is a trust mark
 * for a human deciding whether to send the form, and nothing more - no crawler
 * and no AI assistant can read a word of it. The machine-readable half of the
 * Clutch claim is the `sameAs` entry in `SITE.profiles`.
 *
 * When CSP headers land, widget.clutch.co needs allowing in both `script-src`
 * and `frame-src` or this goes back to rendering empty.
 */
export function ClutchWidget() {
  const container = useRef<HTMLDivElement>(null);

  const paint = useCallback(() => {
    // Init() paints every .clutch-widget on the page, so calling it when ours
    // already holds an iframe would stack a second copy.
    if (container.current?.querySelector('iframe')) return;
    window.CLUTCHCO?.Init();
  }, []);

  return (
    <>
      <div
        ref={container}
        className="clutch-widget rounded-lg bg-white px-3 py-2"
        data-url="https://widget.clutch.co"
        data-widget-type="1"
        data-height="40"
        data-nofollow="true"
        data-clutchcompany-id={SITE.clutchCompanyId}
      />
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="lazyOnload"
        onReady={paint}
      />
    </>
  );
}
