import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

/**
 * The free AI-visibility check, explained. The first list is only what the
 * free check actually delivers (see app/ai-visibility-check/page.tsx); the
 * deeper technical findings belong to the paid audit and are labelled as such,
 * so the free offer never promises more than it sends.
 */
const FREE_CHECK = [
  'Whether ChatGPT, Gemini and Perplexity name your business when a customer asks for what you sell',
  'Which competitors they recommend instead',
  'The two or three gaps that best explain the result, and where to start',
];

const FULL_AUDIT = [
  'Whether Google can discover and index your website and every service page',
  'Whether AI crawlers can reach and read your site',
  'The technical and content weaknesses holding visibility back',
  'A prioritised plan, with your closest competitors read line by line',
];

export function AuditOffer() {
  return (
    <Section tone="dark" id="free-check">
      <SectionHeader
        eyebrow="Free AI visibility check"
        tone="dark"
        title="What does AI say about your business?"
        blurb="We ask ChatGPT, Gemini and Perplexity the questions your customers ask, and send you a one-page report of what comes back. Plain language, no jargon, and no obligation."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <article className="card-dark border-green-300/40">
          <p className="font-mono text-label uppercase text-green-300">The free check shows you</p>
          <ul className="mt-6 space-y-4">
            {FREE_CHECK.map((item) => (
              <li key={item} className="flex gap-3 text-body text-white/85">
                <span className="mt-[3px] text-green-300" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-label uppercase text-white/55">
            Free · One page · Within 48 hours
          </p>
        </article>

        <article className="card-dark">
          <p className="font-mono text-label uppercase text-white/55">A full paid audit goes further</p>
          <ul className="mt-6 space-y-4">
            {FULL_AUDIT.map((item) => (
              <li key={item} className="flex gap-3 text-body text-white/70">
                <span className="mt-[3px] text-white/40" aria-hidden="true">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small body-dim">
            The check tells you where you stand. The paid service is the work that
            changes it: the fixes, the pages and the monthly report. No check or
            service can guarantee that an AI assistant recommends you or that you
            reach a given ranking, and we will never claim one can.
          </p>
        </article>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          href="/ai-visibility-check"
          className="h-12 w-full px-4 text-[12.5px] sm:w-auto sm:px-7 sm:text-[14px]"
          cta={{ location: 'audit_section', target: 'free_check' }}
        >
          Get my free AI visibility check
        </Button>
        <p className="text-small body-dim">Takes about two minutes: your name, email, business name, website and business type.</p>
      </div>
    </Section>
  );
}
