import Link from 'next/link';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

/**
 * What happens after a visitor asks for the free check. Homepage only: the
 * retainer timeline in components/home/Process.tsx stays on /how-it-works,
 * where it also feeds the HowTo schema.
 */
const STEPS = [
  {
    name: 'Request your free AI visibility check',
    text: 'A two-minute form: your name, email, business, website and what you sell. No card, no call needed.',
  },
  {
    name: 'Receive your visibility findings',
    text: 'Within 48 hours you get a one-page report: what the AI assistants said, who they named instead, and the gaps behind it.',
  },
  {
    name: 'Review the recommended improvements',
    text: 'Read it on your own, or take a free thirty-minute call to go through it. If the work is not worth your money yet, we say so.',
  },
  {
    name: 'Choose what to do next',
    text: 'Pick an optimisation or automation service, month to month, or keep the report and act on it yourself. It is yours either way.',
  },
];

export function HomeSteps() {
  return (
    <Section tone="light" id="how-the-check-works">
      <SectionHeader
        eyebrow="How it works"
        tone="light"
        title="From free check to results, in four steps"
        blurb="Predictable from the first click. Here is exactly what happens after you ask for your check."
      />

      <ol className="mt-14 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.name} className="bg-bone p-8">
            <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-green-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="h3 mt-4">{step.name}</h3>
            <p className="mt-4 text-small body-dim-light">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          href="/ai-visibility-check"
          variant="accent-light"
          className="h-12 px-7 text-[14px]"
          cta={{ location: 'how_it_works', target: 'free_check' }}
        >
          Start with step one
        </Button>
        <Link
          href="/how-it-works"
          className="font-mono text-label uppercase text-ink/60 underline-offset-4 hover:underline"
          data-cta-location="how_it_works"
          data-cta-target="how_it_works"
        >
          What the paid service looks like, month by month →
        </Link>
      </div>
    </Section>
  );
}
