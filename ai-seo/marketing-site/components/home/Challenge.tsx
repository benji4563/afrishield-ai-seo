import { Section, SectionHeader } from '@/components/ui/Section';

const PROBLEMS = [
  {
    title: 'The agency retainer that bought silence',
    body: 'Twelve months, a monthly invoice, and a dashboard nobody could read. When you asked which page moved, the answer was a screenshot of a line going up and to the right with no axis labels.',
  },
  {
    title: 'The website nobody searches for',
    body: 'It looks fine. It loads fast. It has never appeared for a single phrase a customer would actually type, because nobody ever wrote down what those phrases were.',
  },
  {
    title: 'The content that stopped in March',
    body: 'Three posts in January, two in February, one in March, then nothing. Not because it was not working — because writing is the first thing to fall off a busy desk.',
  },
];

export function Challenge() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="The problem"
        tone="light"
        title="SEO does not usually fail. It usually just stops."
        blurb="Almost every business we talk to has already paid for search once. The work rarely failed on strategy — it failed because nobody owned it week to week, and nobody could tell what had actually shipped."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((problem, i) => (
          <article key={problem.title} className="card-light flex flex-col">
            <span className="font-mono text-label uppercase text-green-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="h3 mt-5">{problem.title}</h3>
            <p className="mt-4 text-small body-dim-light">{problem.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
