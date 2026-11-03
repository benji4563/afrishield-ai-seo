'use client';

import { useEffect, useRef } from 'react';
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
 * page load event. Any deferred loader fetches it *after* that event has
 * fired, so the listener never runs: the script arrives, `window.CLUTCHCO` is
 * defined, and the container stays 0x0 forever. Their copy-paste snippet gives
 * you a silently empty footer here - no error, no warning, nothing in the
 * console. `Init()` has to be called by hand once the script is in.
 *
 * **Why the script is injected here instead of through `next/script`.** It was
 * written that way first, with `strategy="lazyOnload"` and an `onReady` hook.
 * It worked in dev and injected *nothing* in the production build on Next
 * 16.3.8: the div hydrated (React fiber present on it), `requestIdleCallback`
 * fired normally, and still no script tag and no `data-nscript` marker
 * anywhere on the page. Rather than keep guessing at that scheduler, this
 * appends the tag itself from an effect - which also runs after hydration, so
 * nothing is blocked, and is one less moving part between us and a badge that
 * fails invisibly when it breaks.
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
const SRC = 'https://widget.clutch.co/static/js/widget.js';

export function ClutchWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init() paints every .clutch-widget on the page, so calling it when ours
    // already holds an iframe would stack a second copy. That is the guard
    // that makes this safe to re-run on a remount.
    const paint = () => {
      if (container.current?.querySelector('iframe')) return;
      window.CLUTCHCO?.Init();
    };

    // Already loaded by an earlier mount: just repaint.
    if (window.CLUTCHCO) {
      paint();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', paint);
    return () => script?.removeEventListener('load', paint);
  }, []);

  return (
    <div
      ref={container}
      className="clutch-widget rounded-lg bg-white px-3 py-2"
      data-url="https://widget.clutch.co"
      data-widget-type="1"
      data-height="40"
      data-nofollow="true"
      data-clutchcompany-id={SITE.clutchCompanyId}
    />
  );
}
