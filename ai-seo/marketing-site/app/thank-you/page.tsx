import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Message received',
  description: 'Your message reached us. We reply within one working day.',
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  if (from === 'ai-visibility-check') {
    return (
      <section className="surface-dark flex min-h-[70vh] items-center pb-[110px] pt-[160px]">
        <div className="container-page">
          <div className="container-inner max-w-[62ch]">
            <p className="eyebrow-dark">Request received</p>
            <h1 className="h1 mt-6">The test is queued</h1>
            <p className="mt-7 text-lead body-dim">
              We will query ChatGPT, Perplexity, and Gemini the way your buyers would, and
              email the one-page result to you within 48 hours. It comes from {SITE.email},
              so if your inbox filters aggressively, that is the address to watch for.
            </p>
            <p className="mt-5 text-body body-dim">
              Rather not wait? The same checks exist in DIY form — the free AI-visibility
              checklist walks you through testing your own business in about 15 minutes,
              including the exact prompts to paste into each engine.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/resources/ai-visibility-checklist">Get the free checklist</Button>
              <Button href="/geo-services" variant="ghost-dark">
                How we close the gap
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="surface-dark flex min-h-[70vh] items-center pb-[110px] pt-[160px]">
      <div className="container-page">
        <div className="container-inner max-w-[62ch]">
          <p className="eyebrow-dark">Message received</p>
          <h1 className="h1 mt-6">That reached us</h1>
          <p className="mt-7 text-lead body-dim">
            You will get a reply from a person within one working day — usually sooner. It
            will come from {SITE.email}, so if your inbox is aggressive about filtering,
            that is where to look.
          </p>
          <p className="mt-5 text-body body-dim">
            In the meantime, the most useful thing to read before the call is what this
            actually costs and why the first month looks flat.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/blog/what-seo-actually-costs">Read the pricing piece</Button>
            <Button href="/how-it-works" variant="ghost-dark">
              See the timeline
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
