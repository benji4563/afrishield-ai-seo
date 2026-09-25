import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/ui/Faq';
import { Bluf } from '@/components/ui/Bluf';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd, cityServiceJsonLd } from '@/lib/structured-data';
import { CITIES, getCity } from '@/lib/cities';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/ai-seo/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${SITE_URL}/ai-seo/${city.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const others = CITIES.filter((entry) => entry.slug !== city.slug);

  return (
    <>
      <StructuredData data={cityServiceJsonLd(city)} />
      <StructuredData data={faqPageJsonLd(city.faq)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'AI SEO by city', path: '/ai-seo' },
          { name: city.name, path: `/ai-seo/${city.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${city.name}, ${city.country}`}
        title={city.title}
        blurb={city.heroBlurb}
      />

      <Section tone="light">
        <Bluf tone="light" className="mb-10 max-w-[70ch]">
          {city.bluf}
        </Bluf>

        {/* CTA within reach of the hero — the board's 2026-08-04 rule. */}
        <div className="mb-14 flex flex-wrap gap-3">
          <Button href="/contact" variant="accent-light">
            Book a call
          </Button>
          <Button href="/pricing" variant="ghost-light">
            See pricing
          </Button>
        </div>

        <SectionHeader
          eyebrow="The market"
          tone="light"
          title={`What selling in ${city.name} actually looks like`}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="max-w-prose space-y-6 text-lead body-dim-light">
            <p>{city.marketReality}</p>
            <p>{city.searchBehaviour}</p>
          </div>
          <div className="border-l-2 border-green-600 pl-6">
            <p className="eyebrow-light">Areas we cover</p>
            <ul className="mt-5 space-y-2.5">
              {city.districts.map((district) => (
                <li key={district} className="flex gap-3 text-small body-dim-light">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-600" />
                  {district}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Who this fits"
          tone="dark"
          title={`The ${city.name} businesses this works best for`}
          blurb="Not every business needs this, and we would rather tell you before you buy than after."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {city.sectors.map((sector) => (
            <li key={sector} className="border border-white/10 p-6 text-small body-dim">
              {sector}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-prose text-lead body-dim">{city.competitiveNote}</p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="What you get"
          tone="light"
          title="The same three services, pointed at this market"
        />
        <div className="mt-8 max-w-prose space-y-6 text-lead body-dim-light">
          <p>
            The work itself is the{' '}
            <a href="/solutions">same three continuous services we run everywhere</a> — keyword and
            SERP intelligence, a content engine that publishes on a schedule, and reporting you can
            check. What changes per market is the keyword map and the local signals: a{' '}
            {city.name} keyword set, Google Business Profile work tied to the areas above, and
            content written for how buyers here actually search.
          </p>
          <p>
            Half of it is not about Google at all. Getting named inside ChatGPT, Perplexity and
            Google AI answers is its own discipline —{' '}
            <a href="/geo-services">generative engine optimisation</a> — and we benchmark it
            monthly rather than asserting it. If you want to see the method before you buy, the{' '}
            <a href="/how-it-works">first ninety days are written out step by step</a>, and the{' '}
            <a href="/pricing">three tiers are priced in public</a> with no
            &ldquo;contact us&rdquo; tier.
          </p>
          <p>
            Worth reading first if you are deciding:{' '}
            <a href="/blog/what-seo-actually-costs">what SEO actually costs</a>,{' '}
            <a href="/blog/how-long-does-seo-take">how long it takes</a>, and{' '}
            <a href="/blog/is-seo-worth-it">whether it is worth it at your size</a>.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow={`${city.name} questions`}
            tone="dark"
            title="The ones worth asking before you spend anything"
          />
          <Faq items={city.faq} tone="dark" />
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow="Other markets" tone="light" title="We work in these cities too" />
        <ul className="mt-8 flex flex-wrap gap-3">
          {others.map((entry) => (
            <li key={entry.slug}>
              <a
                href={`/ai-seo/${entry.slug}`}
                className="inline-block border border-ink/20 px-4 py-2 text-small hover:border-ink/50"
              >
                AI SEO in {entry.name}, {entry.country}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <CtaDrop
        title={`Find out what you are invisible for in ${city.name}`}
        body={`A thirty-minute call. We look at what you rank for now in ${city.name}, what your competitors hold, and whether this is worth your money yet. If it is not, we will say so.`}
      />
    </>
  );
}
