'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * "Ask an AI about us" — the GEO conversion bridge.
 *
 * Four buttons deep-link the visitor into ChatGPT, Claude, Perplexity, or
 * Gemini with a pre-filled prompt asking the engine to summarise the business
 * and surface contact info. This is the visitor-facing payoff of the GEO work:
 * because the site is AI-crawlable with BLUF answer blocks, the engines can
 * answer well.
 *
 * Progressive enhancement: each is a real <a> that opens the engine with the
 * prompt in the query string (works with JS off). onClick also copies the
 * prompt to the clipboard, so engines without a reliable prefill param (Gemini)
 * are covered — the visitor just pastes.
 */

const DEFAULT_PROMPT =
  'Summarise AfriShield AI (afrishieldai.com): their AI SEO services for African businesses, the three pricing tiers, and how to contact them.';

type Engine = { name: string; build: (encodedPrompt: string) => string; prefill: boolean };

const ENGINES: Engine[] = [
  { name: 'ChatGPT', build: (p) => `https://chatgpt.com/?q=${p}`, prefill: true },
  { name: 'Claude', build: (p) => `https://claude.ai/new?q=${p}`, prefill: true },
  { name: 'Perplexity', build: (p) => `https://www.perplexity.ai/search?q=${p}`, prefill: true },
  // Gemini has no reliable public prefill param — clipboard + open app covers it.
  { name: 'Gemini', build: () => 'https://gemini.google.com/app', prefill: false },
];

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 3l1.6 4.8L18 9l-4.4 1.2L12 15l-1.6-4.8L6 9l4.4-1.2L12 3z"
        fill="currentColor"
      />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" fill="currentColor" />
    </svg>
  );
}

export function AskAi({
  tone = 'dark',
  prompt = DEFAULT_PROMPT,
  heading = 'Ask an AI about us',
  blurb = 'Skip the sales page. Ask your assistant of choice to summarise what we do, what it costs, and how to reach us — it will read this site and answer.',
}: {
  tone?: 'dark' | 'light';
  prompt?: string;
  heading?: string;
  blurb?: string;
}) {
  const dark = tone === 'dark';
  const [copied, setCopied] = useState<string | null>(null);
  const encoded = encodeURIComponent(prompt);

  const onPick = (name: string) => {
    // Best-effort copy so engines without a prefill param are still easy.
    try {
      void navigator.clipboard?.writeText(prompt);
      setCopied(name);
      window.setTimeout(() => setCopied((c) => (c === name ? null : c)), 2600);
    } catch {
      /* clipboard blocked — the query-string prefill still works */
    }
  };

  return (
    <div
      className={cn(
        'border p-7 md:p-9',
        dark ? 'border-white/10 bg-white/[0.02]' : 'border-ink/10 bg-white',
      )}
    >
      <p className={dark ? 'eyebrow-dark' : 'eyebrow-light'}>Answer engines</p>
      <h2 className="h3 mt-4">{heading}</h2>
      <p className={cn('mt-3 max-w-[52ch] text-small', dark ? 'body-dim' : 'body-dim-light')}>
        {blurb}
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {ENGINES.map((engine) => (
          <a
            key={engine.name}
            href={engine.build(encoded)}
            target="_blank"
            rel="noreferrer"
            onClick={() => onPick(engine.name)}
            className={cn(
              'group inline-flex h-10 items-center gap-2 px-4 font-mono text-label uppercase transition-colors',
              dark
                ? 'border border-white/20 text-white hover:border-green-300 hover:text-green-300'
                : 'border border-ink/20 text-ink hover:border-green-600 hover:text-green-600',
            )}
          >
            <span className={dark ? 'text-green-300' : 'text-green-600'}>
              <SparkIcon />
            </span>
            {engine.name}
          </a>
        ))}
      </div>

      <p
        aria-live="polite"
        className={cn(
          'mt-4 h-4 font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity',
          copied ? 'opacity-100' : 'opacity-0',
          dark ? 'text-green-300' : 'text-green-600',
        )}
      >
        {copied ? `Prompt copied — paste it in ${copied} if the box is empty` : ' '}
      </p>
    </div>
  );
}
