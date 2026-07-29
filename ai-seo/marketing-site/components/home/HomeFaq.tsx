import { Section, SectionHeader } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';

export const HOME_FAQ = [
  {
    q: 'How long before this shows up in the numbers?',
    a: 'Technical fixes can move things within weeks. New content usually takes two to four months to settle into a stable position, and competitive commercial phrases take longer than that. If someone quotes you thirty days for a competitive term, ask what happens in month two when it has not happened.',
  },
  {
    q: 'What does "AI SEO" actually mean here?',
    a: 'It means agents do the repetitive parts — clustering thousands of keyword rows, drafting against a researched outline, checking schema and metadata on every route, watching positions daily. A human sets the strategy, edits every published word, and signs the report. The machine handles volume; the judgement stays human.',
  },
  {
    q: 'Do you write the content or do we?',
    a: 'We write it. You approve the keyword map before writing starts and you review each piece before it publishes. If you would rather write it yourselves, we will do research, briefs, and the technical side, and price accordingly.',
  },
  {
    q: 'Will AI-written content get us penalised?',
    a: 'Google penalises unhelpful content, not content written with assistance. The line that matters is whether a real person gets a real answer. Everything we publish is researched against live results, edited by a human, and written to cover the things the current top pages leave out.',
  },
  {
    q: 'What happens if we stop?',
    a: 'You keep everything — the pages, the schema, the keyword log, the repository. Rankings will drift over time without new work, the way they would with any agency, but nothing gets switched off or taken back.',
  },
  {
    q: 'Do you work outside Africa?',
    a: 'Yes. The service is built around African markets and mobile-first constraints, which is where we do our best work, but nothing about it stops at a border.',
  },
];

export function HomeFaq() {
  return (
    <Section tone="light" id="faq">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeader
          eyebrow="FAQ"
          tone="light"
          title="The questions that come up on every first call"
          blurb="Answered here so the call can be about your business instead."
        />
        <Faq items={HOME_FAQ} />
      </div>
    </Section>
  );
}
