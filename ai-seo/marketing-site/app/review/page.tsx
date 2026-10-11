import type { Metadata } from 'next';
import { ReviewForm } from '@/components/contact/ReviewForm';
import { SITE, SITE_URL } from '@/lib/site';

const TITLE = 'Leave AfriShield AI a review';
const DESCRIPTION =
  'Worked with us? Two minutes of your honest read helps the next business decide. Google review or straight to us — either is fine.';

/**
 * /review — the shareable "please review us" page.
 *
 * This is a utility page meant to be sent by link (email signature, invoice
 * footer, WhatsApp), not found in search, so it is noindexed. Google's review
 * link is the primary action because GBP reviews are the ones that produce stars
 * in search and Maps; the on-site form is the fallback for anyone who would
 * rather not use Google, and it is promoted to primary automatically while
 * SITE.googleReviewUrl is unset.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/review' },
  robots: { index: false, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/review`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function ReviewPage() {
  const googleUrl = SITE.googleReviewUrl;
  const hasGoogle = googleUrl.length > 0;

  return (
    <section className="surface-dark pb-[110px] pt-[140px]">
      <div className="container-page">
        <div className="container-inner">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow-dark">Review</p>
              <h1 className="h1 mt-6 max-w-[16ch]">Tell people how it actually went</h1>
              <p className="mt-7 max-w-[46ch] text-lead body-dim">
                If we have worked together, your honest read is worth more to the next
                business than anything we could write about ourselves. Good or bad.
              </p>

              {hasGoogle ? (
                <div className="mt-10">
                  <p className="eyebrow-dark">The one that counts most</p>
                  <p className="mt-5 max-w-[46ch] text-body body-dim">
                    A Google review shows up next to our name in search and on Maps, where
                    people are actually looking. It takes about two minutes and you need a
                    Google account.
                  </p>
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-10 items-center justify-center bg-green-300 px-6 font-mono text-label uppercase text-ink transition-colors hover:bg-green-200"
                  >
                    Write a Google review
                  </a>
                </div>
              ) : null}

              <div className="mt-10">
                <p className="eyebrow-dark">What makes one useful</p>
                <ul className="mt-5 space-y-3">
                  {[
                    'What you were stuck on before — "nobody could find us" is a real answer.',
                    'What we actually did, in your words, not ours.',
                    'What moved, with a number if you have one.',
                    'Anything we got wrong. We would rather read it than not know it.',
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-body body-dim">
                      <span aria-hidden className="mt-[0.45rem] h-1 w-4 shrink-0 bg-green-300" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-10 max-w-[46ch] text-small text-white/40">
                We will always ask before quoting you on the site, and we will take it
                down the day you ask. Prefer to just say it to a person?{' '}
                <a href={`mailto:${SITE.email}`} className="text-white/70 underline">
                  {SITE.email}
                </a>{' '}
                or{' '}
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 underline"
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-8">
              <p className="eyebrow-dark">
                {hasGoogle ? 'Or send it straight to us' : 'Send it straight to us'}
              </p>
              <p className="mt-4 text-body body-dim">
                {hasGoogle
                  ? 'No Google account needed. This comes to us directly.'
                  : 'This comes to us directly. Our Google profile is being set up — once it is live, this page will offer that too.'}
              </p>
              <div className="mt-8">
                <ReviewForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
