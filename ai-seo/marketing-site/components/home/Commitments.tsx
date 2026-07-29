'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';

/**
 * AgentFlow puts testimonials + counting stat cards in this slot. We have no
 * real client quotes yet, and inventing them is an explicit anti-pattern, so
 * this block carries service commitments instead — every figure below is a
 * fact about how we work, not a claimed client outcome.
 */

const STATS = [
  { value: 30, suffix: ' days', label: 'To your first report' },
  { value: 1, suffix: ' page', label: 'That report, in full' },
  { value: 100, suffix: '%', label: 'Of pages carry schema' },
  { value: 0, suffix: '', label: 'Long-term contracts' },
];

const COMMITMENTS = [
  {
    title: 'You see the keyword list first',
    body: 'Before anything is written, you get the map and a veto. If a cluster is wrong for your business, it comes out.',
  },
  {
    title: 'Losses go in the report',
    body: 'When a position slips, it appears in the same report as the wins, at the same size. A report that only carries good news is not a report.',
  },
  {
    title: 'Every page is yours to keep',
    body: 'The content, the schema, the keyword log — all of it lives in your repository and your domain. Leaving does not cost you the work.',
  },
  {
    title: 'We say when it is not working',
    body: 'If three months in the numbers do not justify the invoice, you will hear it from us before you have to ask.',
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  /*
   * Seeded with the real value, never 0, and deliberately never rewound
   * outside the animation loop itself. The first rAF tick sets it to ~0 and
   * counts up from there, so the animation still reads correctly — but if rAF
   * never fires (no JS, failed hydration, a tab that stays backgrounded), the
   * number that stays on screen is the true one. A stat block stuck on
   * "0 days to your first report" would be a false claim, and no entry
   * animation is worth that.
   */
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out so the number settles rather than slams
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="font-display text-[44px] font-bold leading-none text-green-300">
      {display}
      {suffix}
    </span>
  );
}

export function Commitments() {
  return (
    <Section tone="dark">
      <SectionHeader
        eyebrow="Commitments"
        tone="dark"
        title="What we will put in writing"
        blurb="We have no client quotes to show you yet, and we are not going to invent any. These are the terms instead — the things you can hold us to from day one."
      />

      {/* No entry fade: it renders opacity:0 into the server HTML, which would
          ship these commitments invisible to anything not running our JS. */}
      <dl className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-ink px-7 py-9">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 font-mono text-label uppercase text-white/40">{stat.label}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {COMMITMENTS.map((item) => (
          <article key={item.title} className="card-dark">
            <h3 className="h3">{item.title}</h3>
            <p className="mt-4 text-small body-dim">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
