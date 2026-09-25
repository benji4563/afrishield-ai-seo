import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Bluf } from '@/components/ui/Bluf';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, cityIndexJsonLd } from '@/lib/structured-data';
import { CITIES } from '@/lib/cities';
import { SITE_URL } from '@/lib/site';

const TITLE = 'AI SEO by city — where we work across Africa';
const DESCRIPTION =
  'AI SEO and generative engine optimisation in Lagos, Abuja, Accra, Nairobi, Johannesburg and Douala. What each market costs, how contested it is, and how buyers there actually search.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/ai-seo' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ai-seo`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function CityIndexPage() {
  return (
    <>
      <StructuredData data={cityIndexJsonLd} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'AI SEO by city', path: '/ai-seo' },
        ])}
      />

      <PageHero
        eyebrow="By city"
        title="Six markets, and they do not behave the same way"
        blurb="AI SEO and GEO across Lagos, Abuja, Accra, Nairobi, Johannesburg and Douala — with an honest note on how contested each one is."
      />

      <Section tone="light">
        <Bluf tone="light" className="mb-10 max-w-[70ch]">
          AfriShield AI runs AI SEO and generative engine optimisation in six African cities: Lagos
          and Abuja in Nigeria, Accra in Ghana, Nairobi in Kenya, Johannesburg in South Africa, and
          Douala in Cameroon. Pricing is the same USD 150, 400 or 900 a month in every market,
          invoiced in local currency on request. Competitive difficulty is not the same — Douala is
          the thinnest market, Johannesburg the hardest.
        </Bluf>

        <div className="mb-14 flex flex-wrap gap-3">
          <Button href="/contact" variant="accent-light">
            Book a call
          </Button>
          <Button href="/pricing" variant="ghost-light">
            See pricing
          </Button>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {CITIES.map((city) => (
            <li key={city.slug} className="border border-ink/10 bg-white p-8">
              <h2 className="h3">
                <a href={`/ai-seo/${city.slug}`}>
                  AI SEO in {city.name}
                </a>
              </h2>
              <p className="mt-2 font-mono text-label uppercase tracking-[0.1em] text-mute">
                {city.country} · invoiced in {city.currency}
              </p>
              <p className="mt-5 max-w-prose text-small body-dim-light">{city.competitiveNote}</p>
              <p className="mt-6">
                <a href={`/ai-seo/${city.slug}`} className="text-small font-semibold">
                  What we do in {city.name} &rarr;
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Why per-city pages"
          tone="dark"
          title="Because a swapped city name is not a local page"
        />
        <div className="mt-8 max-w-prose space-y-6 text-lead body-dim">
          <p>
            A buyer in Douala and a buyer in Johannesburg are not running the same search. One is
            working bilingually in a market where most competitors have no structured data at all;
            the other is in the most contested search market on the continent, comparing agencies
            that all already rank. Writing one page and swapping the city name serves neither, and
            search engines have been able to spot that pattern for years.
          </p>
          <p>
            So each page carries the real districts, the actual business mix, how buyers there
            search, and an honest read on how hard that market is. Where a market is a bad fit for
            your budget, the page says so. The{' '}
            <a href="/solutions">underlying service</a> and{' '}
            <a href="/pricing">the three prices</a> do not change by market — only the keyword map,
            the local signals, and how long it is likely to take.
          </p>
        </div>
      </Section>

      <CtaDrop />
    </>
  );
}
