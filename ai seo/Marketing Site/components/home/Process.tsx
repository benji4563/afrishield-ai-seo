import { Section, SectionHeader } from '@/components/ui/Section';

/**
 * Numbered markers are used here because this genuinely is a sequence — the
 * order is the information. They are not used anywhere else on the site.
 */
export const PROCESS_STEPS = [
  {
    name: 'Week 1 — The audit nobody enjoys',
    text: 'We crawl what you have, pull what you already rank for, and read your three closest competitors line by line. You get a list of what is broken, ordered by what it costs you.',
  },
  {
    name: 'Week 2 — The keyword map',
    text: 'Every phrase worth targeting, clustered by intent, with the noise thrown out and marked as thrown out. You approve this before a single word gets written.',
  },
  {
    name: 'Weeks 3–4 — Foundation and first pages',
    text: 'Technical fixes land, schema goes on every route, the sitemap starts telling the truth, and the first two pages publish against their claimed keywords.',
  },
  {
    name: 'Month 2 onward — The loop',
    text: 'Publish, track, report, adjust. Same rhythm every week. The first report arrives at day thirty and every thirty days after that.',
  },
];

export function Process() {
  return (
    <Section tone="light" id="process">
      <SectionHeader
        eyebrow="Process"
        tone="light"
        title="What the first month actually looks like"
        blurb="No black box, no discovery phase that quietly eats a quarter. Here is the order things happen in, and what you hold at the end of each stage."
      />

      <ol className="mt-14 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-2">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.name} className="bg-bone p-8 md:p-10">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-green-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="h3 mt-4">{step.name}</h3>
            <p className="mt-4 text-small body-dim-light">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
