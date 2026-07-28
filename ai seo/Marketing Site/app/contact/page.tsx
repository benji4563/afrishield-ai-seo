import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { AskAi } from '@/components/ui/AskAi';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';

const TITLE = 'Book a call about AI SEO for your business';
const DESCRIPTION =
  'Thirty minutes. We look at what you rank for now, what your competitors hold, and whether search is worth your money yet. You keep the findings either way.';

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
  'We look at what you currently rank for — often the answer is "almost nothing", and that is fine.',
  'We look at what your three closest competitors hold that you do not.',
  'We tell you which tier fits, which is usually the one below what people expect.',
  'If search is not your best channel this quarter, we say that and the call ends early.',
];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <section className="surface-dark pb-[110px] pt-[140px]">
        <div className="container-page">
          <div className="container-inner">
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow-dark">Contact</p>
                <h1 className="h1 mt-6 max-w-[14ch]">Tell us what you sell</h1>
                <p className="mt-7 max-w-[46ch] text-lead body-dim">
                  One reply from a person, within a working day. No sequence, no
                  newsletter, no calendar link that opens onto three qualification forms.
                </p>

                <p className="mt-10 eyebrow-dark">What the call covers</p>
                <ul className="mt-5 space-y-3">
                  {EXPECTATIONS.map((item) => (
                    <li key={item} className="flex gap-4 text-small body-dim">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-300" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-10 font-mono text-label uppercase text-white/40">
                  Or just email us
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 inline-block font-display text-[19px] font-semibold text-green-300 hover:text-green-200"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="space-y-5">
                <div className="border border-white/10 bg-white/[0.02] p-7 md:p-9">
                  <ContactForm />
                </div>
                <AskAi
                  tone="dark"
                  heading="Prefer to ask an AI first?"
                  blurb="Have ChatGPT, Claude, Perplexity, or Gemini read this site and tell you what we do, what it costs, and how to reach us."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
