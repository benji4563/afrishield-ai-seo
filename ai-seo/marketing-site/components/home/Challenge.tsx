import { Section, SectionHeader } from '@/components/ui/Section';

/**
 * The problem from the owner's side. No statistics on purpose: a figure here
 * would need a source the visitor can check, and the point stands without one.
 */
const PROBLEMS = [
  {
    title: 'They ask an assistant before they ask a friend',
    body: 'Customers now type their question into Google, ChatGPT or Gemini to find a clinic, compare hotels or check who is good. The shortlist forms before anyone visits your website.',
  },
  {
    title: 'The answer names somebody',
    body: 'If your business is hard to find, hard to understand or hard to trust online, the answer names a competitor instead. That enquiry goes to them, and you never see it.',
  },
  {
    title: 'Your best services stay invisible',
    body: 'Often the business is listed but the services that pay the bills are not. Weak or missing pages, an incomplete Google profile and no reviews quietly cost credibility.',
  },
];

export function Challenge() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="The problem"
        tone="light"
        title="Your customers are searching differently. Can they still find you?"
        blurb="People use search engines and AI assistants to discover businesses, compare providers and decide who to trust. A business that is difficult to discover, understand or trust online loses those customers to the ones that are not."
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
