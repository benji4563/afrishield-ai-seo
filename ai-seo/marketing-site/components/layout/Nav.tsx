'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SignalNodeMark } from '@/components/signature/SignalNode';
import { NAV_LINKS, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Measured off AgentFlow: fixed, 68px, z-10, transparent at scroll 0.
 * Solid + hairline past the threshold.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-white/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="container-page">
        <div className="flex h-[68px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-green-300">
            <SignalNodeMark className="h-6 w-6" />
            <span className="font-display text-[15px] font-bold tracking-tight text-white">
              {SITE.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-label uppercase text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            {SITE.phone ? (
              <a
                href={SITE.phoneHref}
                className="font-mono text-label uppercase text-white/60 transition-colors hover:text-white"
              >
                {SITE.phone}
              </a>
            ) : null}
            <Button href="/contact">Book a call</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center border border-white/20 lg:hidden"
          >
            <span className="relative block h-[10px] w-4">
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-white transition-transform duration-200',
                  open ? 'top-[5px] rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-4 bg-white transition-transform duration-200',
                  open ? 'top-[5px] -rotate-45' : 'top-[10px]',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-ink lg:hidden">
          <div className="container-page py-6">
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-label uppercase text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-7 space-y-4">
              {SITE.phone ? (
                <a
                  href={SITE.phoneHref}
                  onClick={() => setOpen(false)}
                  className="block font-mono text-label uppercase text-white/70"
                >
                  Call: {SITE.phone}
                </a>
              ) : null}
              <Button href="/contact">Book a call</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
