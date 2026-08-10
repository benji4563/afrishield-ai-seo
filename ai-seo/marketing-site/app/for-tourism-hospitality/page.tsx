import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Faq } from '@/components/ui/Faq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd, tourismHospitalityServiceJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Hospitality SEO services in Africa';
const DESCRIPTION =
  'SEO and AI-search visibility for African safari operators, lodges, hotels, and tour companies — built to move bookings off OTA commissions and onto direct channels.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/for-tourism-hospitality' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/for-tourism-hospitality`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const SEGMENTS = [
  {
    title: 'Safari operators and tour companies',
    body: 'You sell multi-day trips to buyers who plan from another continent. The fight is not for foot traffic — it is to be the operator an American or European traveler, or their AI assistant, finds first.',
    href: '/for-safari-operators',
    linkLabel: 'SEO for safari operators',
  },
  {
    title: 'Lodges, hotels, and guest houses',
    body: 'Every OTA booking costs 15–25% in commission, per industry reporting. The fight here is a direct-booking channel strong enough that the middleman becomes optional, not structural.',
    href: '/for-lodges-hotels',
    linkLabel: 'SEO for lodges and hotels',
  },
  {
    title: 'Any tourism business planning around AI search',
    body: 'Travelers increasingly ask ChatGPT, Perplexity, and Gemini where to stay and who to book with. Being named in that answer is a separate discipline — we run it as a named service.',
    href: '/geo-services',
    linkLabel: 'Generative engine optimization services',
  },
];

const PAINS = [
  {
    title: 'The OTA tax on every booking',
    body: 'FEDHASA, South Africa\u2019s hospitality association, reports platform commissions ranging from 10–25%, averaging 15% — and parity clauses that pressure properties not to sell cheaper on their own sites. A room not filled is a room lost; a room filled through an OTA is a room partly given away.',
  },
  {
    title: 'A website that generates no sales',
    body: '\u201CWhile we have a website, it has not generated any sales yet,\u201D one East African safari company wrote on Reddit. It is the most common sentence in the niche. A brochure site with no keyword map behind it is invisible, no matter how good the photography is.',
  },
  {
    title: 'International buyers you cannot reach',
    body: 'The travelers who pay $5,000 a head plan from New York, London, and Frankfurt — through Google, through AI assistants, through whoever ranks. Operators with a decade of five-star reviews still describe being unable to get in front of them.',
  },
  {
    title: 'Ads that burn cash and do not convert',
    body: '\u201CI have burned $5k and not yet broken even\u201D is a direct quote from a safari operator, and not an unusual one. Ads stop the moment you stop paying; organic visibility keeps producing after the work is done.',
  },
  {
    title: 'Seasonality that empties the calendar',
    body: 'Off-season drops of 70–80% are reported by operators across the niche. Counter-season content — aimed at the hemisphere currently in winter — is one of the few levers that actually moves this.',
  },
];

const WHAT_WE_DO = [
  'Keyword research against the searches international travelers and their AI assistants actually run',
  'Technical SEO — speed on mid-range phones and patchy connections, where many guests first see you',
  'A content engine publishing on a schedule, with a person editing every word',
  'GEO work: AI-crawler access, answer-first blocks, schema, and a monthly AI-citation benchmark',
  'Google Business Profile and local-signal work for map-pack visibility',
  'One-page monthly reporting in plain numbers — enquiries and bookings, not impressions',
];

const FAQ = [
  {
    q: 'What does a hospitality SEO agency in Africa actually do?',
    a: 'The useful version: research which searches lead to bookings, fix the technical problems that keep a tourism site from ranking, publish content that answers the questions travelers and AI assistants ask, and report monthly on enquiries and bookings rather than impressions. The useless version, which is more common, sells you a report full of brand impressions and a blog post a quarter.',
  },
  {
    q: 'How long does SEO take to bring bookings for a tourism business?',
    a: 'Early movement on specific phrases typically shows in six to twelve weeks; meaningful, compounding traffic usually takes six months or more. Anyone who quotes a firm number is guessing, because it depends on how thin your site is today and how established your competitors are.',
  },
  {
    q: 'Can SEO reduce what we pay OTAs like Booking.com?',
    a: 'It shifts the mix, not the relationship. Every booking that arrives through your own site instead of an OTA saves the 15–25% commission on that reservation. The goal is not to leave the platforms — it is to make them optional, so you keep the listings for reach while direct bookings recover margin.',
  },
  {
    q: 'Do travelers really use ChatGPT to plan trips to Africa?',
    a: 'Increasingly, yes — especially the high-spend international travelers who plan long-haul trips carefully. ChatGPT, Perplexity, Gemini, and Google\u2019s AI Overview now answer "where should I stay" and "which operator should I book" directly. Being named in those answers is the GEO half of what we run.',
  },
  {
    q: 'Qu\u2019est-ce qu\u2019une agence de r\u00e9f\u00e9rencement tourisme en Afrique ?',
    a: 'Une agence de r\u00e9f\u00e9rencement touristique aide les h\u00f4tels, lodges et voyagistes africains \u00e0 \u00eatre trouv\u00e9s sur Google et dans les r\u00e9ponses des assistants IA comme ChatGPT et Perplexity. AfriShield AI travaille en fran\u00e7ais et en anglais, y compris pour les entreprises touristiques du Cameroun et de l\u2019Afrique francophone — recherche de mots-cl\u00e9s, contenu, r\u00e9f\u00e9rencement technique et rapport mensuel en chiffres clairs.',
  },
];

export default function ForTourismHospitalityPage() {
  return (
    <>
      <StructuredData data={tourismHospitalityServiceJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'For tourism & hospitality', path: '/for-tourism-hospitality' },
        ])}
      />

      <PageHero
        eyebrow="Tourism & hospitality"
        title="Search visibility for the businesses that sell Africa to the world"
        blurb="Safari operators, lodges, hotels, and tour companies have the same problem in different clothes: the guest pays a middleman, or never finds you at all. Both are fixable."
      />

      <Section tone="dark">
        <Bluf tone="dark" className="max-w-[72ch]">
          AfriShield AI provides hospitality SEO services for African tourism businesses:
          safari operators, lodges, hotels, guest houses, and tour companies. The work covers
          keyword research, technical SEO, a scheduled content engine, and visibility inside AI
          answer engines such as ChatGPT, Claude, and Perplexity — reported monthly in plain
          numbers tied to enquiries and direct bookings.
        </Bluf>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Who this is for"
          tone="light"
          title="Two segments, one umbrella"
          blurb="The economics differ — an operator sells a $5,000 trip, a lodge sells a $300 night — so each gets its own page. The discipline underneath is the same."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {SEGMENTS.map((segment) => (
            <div key={segment.title} className="flex flex-col border border-ink/10 bg-white p-7">
              <h3 className="h3">{segment.title}</h3>
              <p className="mt-4 text-small body-dim-light">{segment.body}</p>
              <a
                href={segment.href}
                className="mt-6 inline-block font-mono text-label uppercase text-green-600 underline-offset-4 hover:text-green-500 hover:underline"
              >
                {segment.linkLabel} →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="The actual problems"
          tone="dark"
          title="What tourism owners say when the marketing is not working"
          blurb="These come from operators and association heads on the record — Reddit threads and trade press, not a persona workshop."
        />
        <ul className="mt-12 space-y-px bg-white/10">
          {PAINS.map((pain) => (
            <li key={pain.title} className="bg-ink p-7">
              <h3 className="font-display text-[17px] font-semibold text-white">{pain.title}</h3>
              <p className="mt-3 text-small body-dim">{pain.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="What we do about it"
          tone="light"
          title="The same three loops, pointed at tourism"
          blurb="Research, publish, track — with a GEO layer on top, because the international buyer increasingly plans inside an AI assistant. The full method is on the solutions page."
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {WHAT_WE_DO.map((item) => (
            <li key={item} className="border border-ink/10 bg-white p-5 text-small body-dim-light">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[72ch] text-small body-dim-light">
          Pricing is the same published tiers as every other engagement — nothing hidden
          behind a niche label. See <a href="/pricing" className="text-green-600 underline underline-offset-4 hover:text-green-500">the pricing page</a> for
          the three tiers, and <a href="/solutions" className="text-green-600 underline underline-offset-4 hover:text-green-500">the solutions page</a> for
          what runs inside each one.
        </p>
      </Section>

      <Section tone="light" className="border-t border-ink/10">
        <SectionHeader
          eyebrow="Questions"
          tone="light"
          title="What tourism businesses ask us"
        />
        <div className="mt-10">
          <Faq items={FAQ} tone="light" />
        </div>
      </Section>

      <CtaDrop
        title="See what the AI says about you first"
        body="Free AI-visibility check: we ask ChatGPT, Perplexity, and Gemini the questions your guests ask — where to stay, who to book with — and show you whether your business is named, and whose is. Then we talk."
        ctaLabel="Get the free check"
      />
    </>
  );
}
