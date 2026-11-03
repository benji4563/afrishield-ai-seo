'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: { src: string; alt: string };
};

const INTERVAL_MS = 6000;

/**
 * A scroll-snap track, not a fade carousel, on purpose. Every slide sits in the
 * server HTML at full opacity side by side, so crawlers and AI assistants read
 * all five, and a visitor without JS can still swipe through them - the site
 * rule is that nothing ships invisible. JS only adds the timer and the dots.
 *
 * Autoplay stops for good once a visitor touches the controls, and pauses on
 * hover, keyboard focus, a hidden tab, or `prefers-reduced-motion`. The pause
 * button is required by WCAG 2.2.2 for anything that moves for over 5 seconds.
 */
export function FeaturedSlider({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }, []);

  // Keep the dots honest when the visitor swipes or scrolls by hand.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // A rotated phone or resized window changes the slide width; re-snap to the
  // current slide so the track never rests between two.
  useEffect(() => {
    const onResize = () => {
      const el = track.current;
      if (el) el.scrollTo({ left: active * el.clientWidth });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      goTo((active + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, hovered, active, slides.length, goTo]);

  return (
    <div
      className="mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured research, guides and the founder"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <article
            key={slide.href}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
            className="w-full shrink-0 snap-start"
          >
            <div className="grid items-center gap-8 overflow-hidden rounded-card border border-ink/10 bg-bone p-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10 md:p-5">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-ink/5">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="pb-4 md:pb-0 md:pr-6">
                <p className="eyebrow-light">{slide.eyebrow}</p>
                <h3 className="h3 mt-3">{slide.title}</h3>
                <p className="mt-3 text-small body-dim-light">{slide.body}</p>
                <Link
                  href={slide.href}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-green-700 hover:text-green-600"
                  tabIndex={i === active ? 0 : -1}
                >
                  {slide.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-ink/50"
        >
          {playing ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          )}
        </button>
        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.href}
              type="button"
              onClick={() => {
                setPlaying(false);
                goTo(i);
              }}
              aria-label={`Show slide ${i + 1}: ${slide.title}`}
              aria-current={i === active}
              className={cn(
                'h-2.5 rounded-full transition-all',
                i === active ? 'w-7 bg-green-600' : 'w-2.5 bg-ink/20 hover:bg-ink/40',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
