import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Process, PROCESS_STEPS } from '@/components/home/Process';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'How it works: your first 90 days';
const DESCRIPTION =
  'The audit, the keyword map you approve, the technical foundation, and the weekly publishing loop — with what you hold in your hands at the end of each stage.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/how-it-works`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const DELIVERABLES = [
  { when: 'End of week 1', what: 'Technical audit — every issue, ranked by what it costs you' },
  { when: 'End of week 2', what: 'Keyword map and skip list, for your approval' },
  { when: 'End of week 4', what: 'Foundation shipped, first two pages live' },
  { when: 'Day 30', what: 'First monthly report' },
  { when: 'Every week after', what: 'One or more pages published against a claimed keyword' },
  { when: 'Every 30 days', what: 'The report again — same shape, so months compare cleanly' },
];

const HONEST_TIMELINE = [
  {
    month: 'Month 1',
    reality: 'Almost nothing moves. Pages are new and search engines are still deciding what they are. This is the month people quit.',
  },
  {
    month: 'Month 2',
    reality: 'Long-tail phrases start appearing somewhere on pages two to five. Not traffic yet — evidence that the pages exist and are understood.',
  },
  {
    month: 'Month 3',
    reality: 'The first pages settle into positions worth having. Usually the low-competition, high-intent ones. This is the earliest a fair judgement is possible.',
  },
  {
    month: 'Months 4–6',
    reality: 'Compounding starts. Older posts strengthen while new ones publish, and internal links begin doing real work.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData data={howToJsonLd(PROCESS_STEPS)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'How it works', path: '/how-it-works' },
        ])}
      />

      <PageHero
        eyebrow="How it works"
        title="No discovery phase that quietly eats a quarter"
        blurb="Four stages, each with something you can hold at the end of it. If a week passes and you cannot name what arrived, something has gone wrong and we would rather you tell us."
      />

      <Process />

      <Section tone="dark">
        <SectionHeader
          eyebrow="Deliverables"
          tone="dark"
          title="What lands, and when"
          blurb="Printed here so you can hold us to the dates rather than take them on trust."
        />
        <ul className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {DELIVERABLES.map((item) => (
            <li key={item.when} className="bg-ink p-7">
              <p className="font-mono text-label uppercase text-green-300">{item.when}</p>
              <p className="mt-3 text-small body-dim">{item.what}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="The honest timeline"
          tone="light"
          title="Including the month where it looks like nothing is happening"
          blurb="Every agency knows month one is flat. Most of them let you find out on your own. Here it is in advance, so you can decide now whether you can sit through it."
        />
        <ol className="mt-12 space-y-px bg-ink/10">
          {HONEST_TIMELINE.map((row) => (
            <li key={row.month} className="grid gap-3 bg-bone p-7 sm:grid-cols-[140px_1fr] sm:gap-8">
              <p className="font-mono text-label uppercase text-green-600">{row.month}</p>
              <p className="text-small body-dim-light">{row.reality}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-prose text-small body-dim-light">
          These are the patterns we plan around, not a forecast for your site. Competition,
          domain history, and how broken things are at the start all move the dates. What
          does not change is that month one looks flat — for everyone.
        </p>
      </Section>

      <CtaDrop
        title="Start with the audit"
        body="Thirty minutes, no obligation, and you keep the findings whether or not you work with us."
      />
    </>
  );
}
