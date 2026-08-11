import type { Metadata } from 'next';
import { AIVisibilityCheckForm } from '@/components/contact/AIVisibilityCheckForm';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';

const TITLE = 'Free AI-visibility check — what do ChatGPT, Perplexity and Gemini say about you?';
const DESCRIPTION =
  'We ask ChatGPT, Perplexity and Gemini the questions your buyers ask, screenshot the answers, and send you a one-page result within 48 hours. Free, no lock-in.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/ai-visibility-check' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ai-visibility-check`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const WHAT_YOU_GET = [
  'We query ChatGPT, Perplexity, and Gemini the way a real buyer would — “plan a 7-day safari in Tanzania under $4,000”, “recommend a good accountant in Nairobi” — using the questions your customers actually ask.',
  'We screenshot every answer, so you see exactly what a potential customer sees: who gets named, who gets mentioned in passing, and who is invisible.',
  'You get a one-page result within 48 hours: your score on each engine, which competitors were named instead, and the two or three gaps that explain it.',
];

const FAQ = [
  {
    q: 'Is the AI-visibility check really free?',
    a: 'Yes. We run the queries, take the screenshots, and send you the one-page result within 48 hours. There is no card, no trial that converts, and no obligation — the result is yours whether or not we ever work together.',
  },
  {
    q: 'What exactly do you test?',
    a: 'We ask ChatGPT, Perplexity, and Gemini the questions your buyers ask — where to book a safari, which lodge near a given park, which accountant in a given city — and record whether your business is cited by name, mentioned generically, or absent entirely, plus which competitors get named instead.',
  },
  {
    q: 'Why does AI visibility matter for my business?',
    a: 'A growing share of travelers and clients now plan inside AI assistants instead of scrolling ten search results. An assistant can only recommend businesses it can read and verify — if your site blocks AI crawlers or says nothing plainly, the assistant recommends whoever it can read instead.',
  },
  {
    q: 'What happens after I get the result?',
    a: 'Nothing, unless you want it to. The result includes the specific gaps we found, so you can fix them yourself — our free AI-visibility checklist walks through the same checks. If you would rather have us run the fix, that is a separate conversation.',
  },
];

export default function AIVisibilityCheckPage() {
  return (
    <>
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Free AI-visibility check', path: '/ai-visibility-check' },
        ])}
      />

      <section className="surface-dark pb-[110px] pt-[140px]">
        <div className="container-page">
          <div className="container-inner">
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow-dark">Free AI-visibility check</p>
                <h1 className="h1 mt-6 max-w-[16ch]">What does AI say about your business?</h1>
                <p className="mt-7 max-w-[46ch] text-lead body-dim">
                  Travelers and clients no longer scroll ten blue links — they ask ChatGPT,
                  Perplexity, or Gemini where to book, and act on the answer. An AI engine can
                  only recommend a business it can read. We run the test on yours and show you
                  the answer your buyers are getting.
                </p>

                <p className="mt-10 eyebrow-dark">What you get</p>
                <ul className="mt-5 space-y-3">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex gap-4 text-small body-dim">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-300" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-10 font-mono text-label uppercase text-white/40">
                  Prefer to talk it through?
                </p>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-display text-[19px] font-semibold text-green-300 hover:text-green-200"
                >
                  Message us on WhatsApp
                </a>
                <p className="mt-3 max-w-[46ch] text-small body-dim">
                  Or test your own business first with the free{' '}
                  <a
                    href="/resources/ai-visibility-checklist"
                    className="text-green-300 underline underline-offset-4 hover:text-green-200"
                  >
                    AI-visibility checklist
                  </a>{' '}
                  — the same checks, in DIY form.
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-7 md:p-9">
                <AIVisibilityCheckForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-light section">
        <div className="container-page">
          <div className="container-inner">
            <p className="eyebrow-light">Questions</p>
            <h2 className="h2 mt-5 max-w-[20ch]">What people ask before they send the form</h2>
            <dl className="mt-12 grid gap-px bg-ink/10 lg:grid-cols-2">
              {FAQ.map((item) => (
                <div key={item.q} className="bg-white p-7">
                  <dt className="font-display text-[17px] font-semibold text-ink">{item.q}</dt>
                  <dd className="mt-3 text-small body-dim-light">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
