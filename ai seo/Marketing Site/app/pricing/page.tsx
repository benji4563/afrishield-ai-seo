import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/ui/Faq';
import { Bluf } from '@/components/ui/Bluf';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';
import { cn } from '@/lib/utils';

const TITLE = 'Pricing: real numbers, no lock-in';
const DESCRIPTION =
  'AI SEO from $150 a month across African markets. What each tier includes, what it does not, and an honest note on who should not buy the top tier yet.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/pricing`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const TIERS = [
  {
    name: 'Foundation',
    price: '$150',
    cadence: 'per month',
    forWho: 'One location, one core service, starting from roughly zero.',
    includes: [
      'Technical audit and fixes',
      'Full keyword map with skip list',
      'Two published pages a month',
      'Schema on every route',
      'Search Console setup',
      'Monthly one-page report',
    ],
    excludes: ['Local landing pages', 'Quarterly strategy sessions'],
    featured: false,
  },
  {
    name: 'Engine',
    price: '$400',
    cadence: 'per month',
    forWho: 'Multiple services or cities, competing against businesses that already invest in search.',
    includes: [
      'Everything in Foundation',
      'Four published pages a month',
      'Up to two local landing pages a quarter',
      'Competitor position tracking',
      'Internal link architecture maintained',
      'Monthly call to walk the report',
    ],
    excludes: ['Weekly publishing cadence'],
    featured: true,
  },
  {
    name: 'Operation',
    price: '$900',
    cadence: 'per month',
    forWho: 'Businesses treating search as a primary acquisition channel with a real target attached.',
    includes: [
      'Everything in Engine',
      'Weekly publishing',
      'Local pages on demand',
      'Quarterly strategy review',
      'Conversion tracking wired to the report',
      'Direct line to the person doing the work',
    ],
    excludes: [],
    featured: false,
  },
];

const PRICING_FAQ = [
  {
    q: 'Why is this cheaper than the agency quotes we have had?',
    a: 'Because agents do the repetitive volume — clustering, first drafts, schema checks, daily position monitoring — that would otherwise be billed as junior hours. A human still sets strategy and edits every published word. You are paying for judgement and output, not for a floor of analysts.',
  },
  {
    q: 'Is there a minimum term?',
    a: 'No. It is month to month and you can stop with thirty days notice. We would rather you leave in month four than sit trapped in a twelve-month contract resenting the invoice.',
  },
  {
    q: 'What is not included at any tier?',
    a: 'Paid ads management, link buying, social media, and a full website rebuild. If your site itself is the problem, we will tell you on the first call rather than publishing good content onto a broken foundation.',
  },
  {
    q: 'Who should not buy the top tier?',
    a: 'Anyone who has not yet published consistently for three months. Operation only earns its price when there is an existing base of pages to compound on. Start at Foundation, prove the loop works, then move up.',
  },
  {
    q: 'How much does AI SEO cost in Lagos, Accra or Nairobi?',
    a: 'The same three tiers apply across every African market: Foundation at USD 150 a month, Engine at USD 400, and Operation at USD 900. Prices are set in USD for consistency, but we invoice in NGN, GHS, KES, ZAR or XAF at the prevailing rate — just ask on the call.',
  },
  {
    q: 'What if it is not working after three months?',
    a: 'We will say so in the report before you have to ask, and we will tell you whether the honest fix is more time, a different channel, or a different provider.',
  },
];

export default function PricingPage() {
  return (
    <>
      <StructuredData data={faqPageJsonLd(PRICING_FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />

      <PageHero
        eyebrow="Pricing"
        title="Real numbers, printed where you can read them"
        blurb="Three tiers, month to month, thirty days notice. No setup fee, no minimum term, and no tier where the price is 'contact us'."
      />

      <Section tone="light">
        <Bluf tone="light" className="mb-12 max-w-[70ch]">
          AfriShield AI SEO costs USD 150, 400, or 900 per month across every African
          market — Foundation, Engine, and Operation. Every tier includes the technical
          work, keyword research, published content, schema markup, and monthly reporting.
          Month to month, thirty days notice, no setup fee. Invoiced in local currency on
          request.
        </Bluf>
        <div className="grid gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                'flex flex-col border p-8',
                tier.featured ? 'border-green-600 bg-white' : 'border-ink/10 bg-white',
              )}
            >
              {tier.featured ? (
                <p className="mb-5 inline-block self-start bg-green-600 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                  Most chosen
                </p>
              ) : null}
              <h2 className="h3">{tier.name}</h2>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-[40px] font-bold leading-none">{tier.price}</span>
                <span className="font-mono text-label uppercase text-mute">{tier.cadence}</span>
              </p>
              <p className="mt-5 text-small body-dim-light">{tier.forWho}</p>

              <ul className="mt-7 space-y-2.5 border-t border-ink/10 pt-7">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-small">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-600" />
                    {item}
                  </li>
                ))}
                {tier.excludes.map((item) => (
                  <li key={item} className="flex gap-3 text-small text-mute line-through">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-mute" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button href="/contact" variant={tier.featured ? 'accent-light' : 'ghost-light'}>
                  Book a call
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-prose text-center text-small body-dim-light">
          Every tier includes the technical work. There is no version of this service where
          we publish content onto a site we have not fixed first.
        </p>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="Pricing questions"
            tone="dark"
            title="Including the ones that cost us money to answer honestly"
          />
          <Faq items={PRICING_FAQ} tone="dark" />
        </div>
      </Section>

      <CtaDrop
        title="Not sure which tier fits?"
        body="Tell us what you sell and where you sell it. Most first calls end with us recommending the tier below the one people expected to buy."
      />
    </>
  );
}
