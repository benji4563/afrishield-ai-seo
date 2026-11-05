import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';
import { GOOGLE_PROFILE_URL, REVIEW_TOTALS, TESTIMONIALS } from '@/lib/testimonials';

const TITLE = 'Contact AfriShield AI: free visibility review';
const DESCRIPTION =
  'Send your name and WhatsApp number. A person replies within one working day with what you rank for now, what your competitors hold, and whether search is worth your money yet.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const EXPECTATIONS = [
  'What you currently rank for on Google and in AI answers. Often the answer is "almost nothing", and that is fine.',
  'What your three closest competitors hold that you do not.',
  'Which tier fits, usually the one below what people expect.',
  'If search is not your best channel this quarter, we say so.',
];

const WHATSAPP_TEXT =
  'Hello AfriShield, I found you on afrishieldai.com and I would like a free visibility review for my business.';

// A real Google review, quoted verbatim from lib/testimonials.ts.
const PROOF = TESTIMONIALS.find((t) => t.name === 'Eyang Romeo') ?? TESTIMONIALS[0];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1.1 2.8c.1.2 1.9 2.9 4.5 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

/**
 * Contact page, rebuilt 2026-11-05 for conversion. On a phone the form used to
 * start 1.5 screens down, below a paragraph, four bullets and three contact
 * lines; now the order is headline, form, WhatsApp, proof, then the detail.
 * Light surface to match the homepage.
 */
export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <section className="surface-light pb-[96px] pt-[112px] md:pt-[140px]">
        <div className="container-page">
          <div className="container-inner">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start lg:gap-16">
              {/* Headline: first on every screen size. */}
              <div className="lg:col-start-1 lg:row-start-1">
                <p className="eyebrow-light">Free visibility review</p>
                <h1 className="h1 mt-5 max-w-[16ch]">Find out who Google and ChatGPT send your customers to</h1>
                <p className="mt-5 max-w-[48ch] text-lead body-dim-light">
                  Leave your name and WhatsApp number. A person replies within one working
                  day. You keep the findings, whether or not you hire us.
                </p>
              </div>

              {/* Form: second on phones, right-hand column on desktop. */}
              <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
                <div className="border border-ink/10 bg-white p-6 shadow-sm md:p-8">
                  <ContactForm />
                </div>

                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-14 w-full items-center justify-center gap-3 bg-[#25D366] px-6 font-mono text-label uppercase text-white transition-colors hover:bg-[#1ebe5a]"
                >
                  <WhatsAppIcon />
                  Or message us on WhatsApp
                </a>
              </div>

              {/* Proof and detail: after the form on phones, under the headline on desktop. */}
              <div className="lg:col-start-1 lg:row-start-2">
                <figure className="border-l-4 border-green-600 bg-white p-6">
                  <a
                    href={GOOGLE_PROFILE_URL}
                    target="_blank"
                    rel="noopener"
                    className="font-mono text-label uppercase text-green-700 hover:underline"
                  >
                    <span aria-hidden="true">★</span> {REVIEW_TOTALS.google.rating} on Google from{' '}
                    {REVIEW_TOTALS.google.count} reviews
                  </a>
                  <blockquote className="mt-3 text-body text-ink">“{PROOF.quote}”</blockquote>
                  <figcaption className="mt-3 text-small body-dim-light">
                    {PROOF.name}, Google review
                    {PROOF.translated ? ' (translated from French by Google)' : ''}
                  </figcaption>
                </figure>

                <p className="mt-10 eyebrow-light">What the review covers</p>
                <ul className="mt-4 space-y-3">
                  {EXPECTATIONS.map((item) => (
                    <li key={item} className="flex gap-4 text-small body-dim-light">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-start-1 lg:row-start-3">
                <p className="eyebrow-light">Other ways to reach us</p>
                <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-small body-dim-light">Email</dt>
                    <dd>
                      <a href={`mailto:${SITE.email}`} className="font-display text-[17px] font-semibold text-green-700 hover:underline">
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                  {SITE.phone ? (
                    <div>
                      <dt className="text-small body-dim-light">Call or WhatsApp, Cameroon</dt>
                      <dd>
                        <a href={SITE.phoneHref} className="font-display text-[17px] font-semibold text-green-700 hover:underline">
                          {SITE.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {SITE.aiCallLine ? (
                    <div className="sm:col-span-2">
                      <dt className="text-small body-dim-light">
                        AI phone line, answered 24/7 in English or French
                      </dt>
                      <dd>
                        <a href={SITE.aiCallLineHref} className="font-display text-[17px] font-semibold text-green-700 hover:underline">
                          {SITE.aiCallLine}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
