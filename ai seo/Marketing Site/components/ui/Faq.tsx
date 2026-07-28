'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/** INTERACTION MODEL: click-driven accordion, one panel open at a time. */
export function Faq({
  items,
  tone = 'light',
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
  tone?: 'light' | 'dark';
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === 'dark';

  return (
    <ul className={cn('border-t', dark ? 'border-white/10' : 'border-ink/10')}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className={cn('border-b', dark ? 'border-white/10' : 'border-ink/10')}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-8 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-[17px] font-semibold leading-snug',
                    dark ? 'text-white' : 'text-ink',
                  )}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 shrink-0 font-mono text-[18px] leading-none transition-transform duration-200',
                    isOpen && 'rotate-45',
                    dark ? 'text-green-300' : 'text-green-600',
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              hidden={!isOpen}
              className={cn('max-w-prose pb-7 text-small', dark ? 'body-dim' : 'body-dim-light')}
            >
              {item.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
