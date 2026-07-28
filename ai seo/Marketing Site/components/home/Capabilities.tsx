import { Section, SectionHeader } from '@/components/ui/Section';

/** Time-driven marquee, two rows in opposing directions — AgentFlow's model. */
const ROW_ONE = [
  'Keyword clustering',
  'Intent mapping',
  'Competitor SERP teardown',
  'Title & meta writing',
  'Internal link planning',
  'Schema markup',
  'Featured-snippet targeting',
];

const ROW_TWO = [
  'Core Web Vitals',
  'Sitemap & robots',
  'Search Console setup',
  'Local landing pages',
  'Google Business Profile',
  'Rank tracking',
  'Monthly reporting',
];

const CAPABILITIES = [
  {
    title: 'Written for the question, not the algorithm',
    body: 'Every post answers something a real person typed. We read what already ranks, then cover the parts it skips — usually the price, and usually when you do not need this yet.',
  },
  {
    title: 'Technically correct by default',
    body: 'Schema on every page, one canonical per route, a sitemap that matches reality, and metadata that fits inside the character limits Google actually renders.',
  },
  {
    title: 'Built for how Africa searches',
    body: 'Mobile-first weight budgets, local phrasing over imported templates, and location pages written with real neighbourhoods instead of a find-and-replace on the city name.',
  },
];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x overflow-hidden pause-on-hover">
      <ul
        className={`flex w-max gap-3 ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}
        aria-hidden="true"
      >
        {[...items, ...items].map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="whitespace-nowrap border border-ink/10 bg-white px-5 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-slate"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Capabilities"
        tone="light"
        align="center"
        title="The whole job, not the interesting third of it"
        blurb="Search work is roughly thirty separate tasks. Most of them are unglamorous and all of them matter. Here is the list, in full."
      />

      <div className="mt-14 space-y-3">
        <MarqueeRow items={ROW_ONE} />
        <MarqueeRow items={ROW_TWO} reverse />
        {/* The marquee is decorative motion; the same list is available to
            assistive tech as static text. */}
        <p className="sr-only">
          Capabilities: {[...ROW_ONE, ...ROW_TWO].join(', ')}.
        </p>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {CAPABILITIES.map((item) => (
          <article key={item.title} className="card-light">
            <h3 className="h3">{item.title}</h3>
            <p className="mt-4 text-small body-dim-light">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
