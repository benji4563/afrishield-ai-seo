'use client';

import { useState } from 'react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

/**
 * INTERACTION MODEL: click-driven, matching AgentFlow's three tab buttons
 * (measured h=56px). Panel swaps with an opacity + translate transition.
 * Deliberately not scroll-driven — see docs/research/AGENTFLOW-CLONE-SPEC.md.
 */

type Panel = {
  key: string;
  tab: string;
  title: string;
  body: string;
  points: string[];
  artefact: React.ReactNode;
};

function KeywordArtefact() {
  const rows = [
    { cluster: 'A', keyword: 'accountant near me', action: 'Home + service page' },
    { cluster: 'D', keyword: 'how much does a bookkeeper cost', action: 'Pricing post' },
    { cluster: 'E', keyword: 'behind on my books', action: 'Empathy post' },
    { cluster: 'J', keyword: 'accounting degree salary', action: 'Skip — wrong audience' },
    { cluster: 'L', keyword: 'accounting software login', action: 'Skip — navigational' },
  ];

  return (
    <div className="font-mono text-[12px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 uppercase tracking-[0.1em] text-white/35">
        <span>Cluster</span>
        <span>Recommended action</span>
      </div>
      <ul>
        {rows.map((row) => {
          const skipped = row.action.startsWith('Skip');
          return (
            <li
              key={row.keyword}
              className="flex items-start justify-between gap-6 border-b border-white/[0.06] py-3.5"
            >
              <span className="flex items-baseline gap-3">
                <span
                  className={cn(
                    'w-4 shrink-0',
                    skipped ? 'text-white/25' : 'text-green-300',
                  )}
                >
                  {row.cluster}
                </span>
                <span className={skipped ? 'text-white/30 line-through' : 'text-white/80'}>
                  {row.keyword}
                </span>
              </span>
              <span className={cn('shrink-0 text-right', skipped ? 'text-white/25' : 'text-white/50')}>
                {row.action}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="pt-4 text-white/35">
        Roughly three in four exported rows never earn a page. Filtering them out is the job.
      </p>
    </div>
  );
}

function ContentArtefact() {
  const weeks = [
    { week: 'Week 1', item: 'Pillar post — highest commercial intent', state: 'Published' },
    { week: 'Week 2', item: 'Comparison post — “X vs Y”', state: 'Published' },
    { week: 'Week 3', item: 'Pricing transparency post', state: 'In review' },
    { week: 'Week 4', item: 'Local landing page', state: 'Drafting' },
  ];

  return (
    <ul className="space-y-3">
      {weeks.map((week, i) => (
        <li
          key={week.week}
          className="flex items-center gap-4 border border-white/10 bg-white/[0.03] px-5 py-4"
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/35">
            {week.week}
          </span>
          <span className="flex-1 text-small text-white/80">{week.item}</span>
          <span
            className={cn(
              'font-mono text-[11px] uppercase tracking-[0.1em]',
              i < 2 ? 'text-green-300' : 'text-white/40',
            )}
          >
            {week.state}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReportingArtefact() {
  const rows = [
    { page: '/services/bookkeeping', keyword: 'monthly bookkeeping service', from: 41, to: 12 },
    { page: '/blog/what-bookkeeping-costs', keyword: 'bookkeeping cost per month', from: 88, to: 19 },
    { page: '/locations/lagos', keyword: 'bookkeeper lagos', from: 0, to: 34 },
  ];

  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/35">
        Movement — last 30 days
      </p>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li key={row.page} className="border border-white/10 bg-white/[0.03] px-5 py-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[12px] text-white/80">{row.page}</span>
              <span className="font-mono text-[12px] text-green-300">
                {row.from === 0 ? 'new' : `#${row.from}`} → #{row.to}
              </span>
            </div>
            <p className="mt-1.5 text-small text-white/45">{row.keyword}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[12px] text-white/35">
        Illustrative layout — your report carries your own pages and positions.
      </p>
    </div>
  );
}

const PANELS: Panel[] = [
  {
    key: 'research',
    tab: 'Keyword & SERP intelligence',
    title: 'We decide what to target before anyone writes a word',
    body: 'Every engagement starts with a keyword map you get to read and argue with. We cluster by intent, throw out the noise, and assign one primary keyword per page — claimed once, never reused.',
    points: ['Intent clustering', 'Noise filtered out', 'One keyword, one page'],
    artefact: <KeywordArtefact />,
  },
  {
    key: 'content',
    tab: 'Content engine',
    title: 'Publishing that keeps its own calendar',
    body: 'Research the live results, write something better than what is ranking, add the schema, ship it, log the keyword. Same loop every week, whether or not anyone remembers to chase it.',
    points: ['Weekly cadence', 'Original prose only', 'Schema on every page'],
    artefact: <ContentArtefact />,
  },
  {
    key: 'reporting',
    tab: 'Tracking & reporting',
    title: 'A report you can check line by line',
    body: 'One page a month. Every keyword we claimed, where it sat last month, where it sits now, and what shipped. If a number moved the wrong way, it is in there too.',
    points: ['Named pages', 'Real positions', 'Losses included'],
    artefact: <ReportingArtefact />,
  },
];

export function Solutions() {
  const [active, setActive] = useState(0);
  const panel = PANELS[active];

  return (
    <Section tone="dark" id="solutions">
      <SectionHeader
        eyebrow="Solutions"
        tone="dark"
        title="Three jobs. Run continuously."
        blurb="Search work is not a project with an end date. These three loops run every week for as long as you are with us."
      />

      <div
        role="tablist"
        aria-label="Solutions"
        className="mt-12 flex flex-wrap gap-x-10 gap-y-2 border-b border-white/10"
      >
        {PANELS.map((item, i) => (
          <button
            key={item.key}
            role="tab"
            id={`tab-${item.key}`}
            aria-selected={i === active}
            aria-controls={`panel-${item.key}`}
            onClick={() => setActive(i)}
            className={cn(
              'relative -mb-px border-b-2 py-4 font-mono text-label uppercase transition-colors',
              i === active
                ? 'border-green-300 text-green-300'
                : 'border-transparent text-white/40 hover:text-white/70',
            )}
          >
            {item.tab}
          </button>
        ))}
      </div>

      {/* Two deliberate choices here.
          1. Keyed remount, not AnimatePresence: with an exit animation the
             outgoing panel resolved to opacity 0 and the incoming one never
             mounted, blanking the section entirely.
          2. No entry fade. An entry animation renders `opacity:0` into the
             server HTML, which on an SEO site means the panel's copy ships
             invisible to anything that does not run our JS. The content is
             worth more than the transition. */}
      <div
        key={panel.key}
        role="tabpanel"
        id={`panel-${panel.key}`}
        aria-labelledby={`tab-${panel.key}`}
        className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start"
      >
        <div>
          <h3 className="font-display text-[28px] font-bold leading-tight">{panel.title}</h3>
          <p className="mt-5 text-lead body-dim">{panel.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {panel.points.map((point) => (
              <li
                key={point}
                className="border border-green-300/30 bg-green-300/[0.06] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-green-200"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-white/10 bg-white/[0.02] p-7">{panel.artefact}</div>
      </div>
    </Section>
  );
}
