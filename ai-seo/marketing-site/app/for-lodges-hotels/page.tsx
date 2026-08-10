import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Faq } from '@/components/ui/Faq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd, lodgesHotelsServiceJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'SEO for lodges and hotels in Africa';
const DESCRIPTION =
  'SEO for lodges, hotels, and guest houses in Africa — direct-booking visibility that cuts the 15–25% OTA commission, plus AI search optimization so ChatGPT and Perplexity name your property.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/for-lodges-hotels' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/for-lodges-hotels`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const ECONOMICS = [
  {
    title: 'The commission line you already know',
    body: 'FEDHASA reports platform commissions of 10–25%, averaging 15%, with parity clauses pressuring properties not to undercut the platforms on their own sites. City Lodge\u2019s finance director has pointed out the commission is charged on the VAT-inclusive price — an even higher effective rate. A property doing 30 OTA bookings a month at $300 a night hands over $1,350–$2,250. Every month.',
  },
  {
    title: 'The direct channel that does not exist yet',
    body: 'Most lodge and hotel sites are brochures: photography, a rates page, a booking form that fires an email into an inbox someone checks twice a week. Nothing on the site targets a real search, so the only travelers who arrive are the ones the OTAs send — at 15–25% each.',
  },
  {
    title: 'Seasonality',
    body: 'Off-season drops of 70–80% are reported across the niche, and discounting barely moves them. The counter-lever is content aimed at the hemisphere currently in winter — the European planner booking an East African trip in January reads what was published in September.',
  },
];

const HOW = [
  {
    title: 'Direct-booking keyword work',
    body: 'We target the searches that end in a direct reservation — property type plus place, experience plus season, the long-tail queries the OTAs do not bother with because they already rank for the head terms.',
  },
  {
    title: 'AI search optimization for hotels',
    body: 'When a traveler asks ChatGPT or Perplexity where to stay near a specific park, the assistant names a short list. Crawler access, answer-first content, and consistent structured data decide whether your property is on it. We benchmark this monthly.',
  },
  {
    title: 'Google Business Profile and map-pack visibility',
    body: 'For guest houses and city hotels especially, the map pack is the front desk. A complete profile, real photos, and answered reviews decide the shortlist before a traveler ever sees a website.',
  },
  {
    title: 'A site that converts the visit',
    body: 'Fast on a mid-range phone, clear rates, one obvious booking action per page. Visibility without conversion just means more people leaving — the two layers are fixed together or not at all.',
  },
];

const FAQ = [
  {
    q: 'How much commission do hotels pay Booking.com and other OTAs?',
    a: 'FEDHASA, South Africa\u2019s hospitality association, reports commissions ranging from 10–25%, averaging 15%, and notes that parity clauses have pressured properties not to sell cheaper on their own sites. The exact rate depends on your agreement, but the arithmetic is the same everywhere: every booking that moves from OTA to direct returns that percentage to your margin.',
  },
  {
    q: 'How can my lodge get more direct bookings?',
    a: 'Three things in order: a site that ranks for the searches travelers actually run, a booking path that works on a phone in under a minute, and presence in the AI answers travelers increasingly plan with. None of them requires leaving the OTAs — the goal is to make the platforms optional rather than structural.',
  },
  {
    q: 'Does SEO work for a seasonal property?',
    a: 'It is one of the few levers that addresses seasonality directly. Content aimed at counter-season source markets — published months ahead of the booking window — puts your property in front of the Northern-hemisphere planner while your local market is quiet. Discounting fills a room at a loss; a counter-season pipeline fills it at rate.',
  },
  {
    q: 'What is AI search optimization for hotels?',
    a: 'The work that decides whether ChatGPT, Perplexity, Gemini, or Google\u2019s AI Overview names your property when a traveler asks where to stay. It covers letting AI crawlers read your site, answer-first content blocks, structured data that states what and where you are, and consistent listings across the web. It is the GEO layer of what we run — described in full on the GEO services page.',
  },
  {
    q: 'Comment choisir une agence SEO pour un h\u00f4tel \u00e0 Douala ?',
    a: 'Exigez trois choses : des prix publi\u00e9s, un rapport mensuel li\u00e9 aux r\u00e9servations et non aux impressions, et la propri\u00e9t\u00e9 totale de votre site et de vos comptes. AfriShield AI travaille avec les h\u00f4tels de Douala et du Cameroun en fran\u00e7ais et en anglais — r\u00e9f\u00e9rencement Google, fiche Google Business Profile, et visibilit\u00e9 dans les r\u00e9ponses des assistants IA. Aucune promesse de premi\u00e8re place garantie : ceux qui la font vendent du vent.',
  },
  {
    q: 'Comment am\u00e9liorer le r\u00e9f\u00e9rencement d\u2019un h\u00f4tel au Cameroun ?',
    a: 'Les priorit\u00e9s sont les m\u00eames qu\u2019ailleurs : un site rapide sur t\u00e9l\u00e9phone mobile, une fiche Google Business Profile compl\u00e8te avec de vraies photos, des pages qui ciblent les recherches r\u00e9elles des voyageurs, et des donn\u00e9es structur\u00e9es qui d\u00e9crivent clairement l\u2019\u00e9tablissement. Ensuite, un contenu r\u00e9gulier qui r\u00e9pond aux questions des clients — et une pr\u00e9sence dans les r\u00e9ponses de ChatGPT et Perplexity, de plus en plus utilis\u00e9s pour pr\u00e9parer les voyages.',
  },
];

export default function ForLodgesHotelsPage() {
  return (
    <>
      <StructuredData data={lodgesHotelsServiceJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'For tourism & hospitality', path: '/for-tourism-hospitality' },
          { name: 'For lodges & hotels', path: '/for-lodges-hotels' },
        ])}
      />

      <PageHero
        eyebrow="For lodges & hotels"
        title="Every OTA booking costs you 15–25%. Direct bookings cost you nothing."
        blurb="The platforms earned their place — they filled rooms. But a property whose only channel charges commission on every night has a margin problem, not a marketing one. This is how the direct channel gets built."
      />

      <Section tone="dark">
        <Bluf tone="dark" className="max-w-[72ch]">
          SEO for lodges and hotels means owning the searches that lead to a direct booking,
          instead of paying 15–25% commission per OTA reservation. AfriShield AI builds
          direct-booking visibility for African lodges, hotels, and guest houses through
          technical SEO, a scheduled content engine, Google Business Profile work, and
          placement inside AI answers from ChatGPT and Perplexity.
        </Bluf>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="The economics"
          tone="light"
          title="Why the commission line keeps growing"
          blurb="None of this is a secret inside the industry — association heads and finance directors say it on the record. The only question is whether the direct channel gets built."
        />
        <ul className="mt-12 space-y-px bg-ink/10">
          {ECONOMICS.map((item) => (
            <li key={item.title} className="bg-white p-7">
              <h3 className="font-display text-[17px] font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-small body-dim-light">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="The work"
          tone="dark"
          title="What building the direct channel involves"
          blurb="Four workstreams, run monthly, reported against the only number that matters: bookings that arrived without a commission attached."
        />
        <div className="mt-12 grid gap-px bg-white/10 lg:grid-cols-2">
          {HOW.map((item) => (
            <div key={item.title} className="bg-ink p-7">
              <h3 className="font-display text-[17px] font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-small body-dim">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[72ch] text-small body-dim">
          The pricing anchor is your own commission statement: a property paying $1,350–$2,250
          a month to OTAs recovers the fee if a fraction of those bookings move direct. The
          tiers themselves are the published ones —{' '}
          <a href="/pricing" className="text-green-300 underline underline-offset-4 hover:text-green-200">see pricing</a>.
          The deeper playbook is in our post on{' '}
          <a href="/blog/how-to-reduce-ota-commission" className="text-green-300 underline underline-offset-4 hover:text-green-200">how to reduce OTA commission</a>,
          and the AI-visibility layer is on{' '}
          <a href="/geo-services" className="text-green-300 underline underline-offset-4 hover:text-green-200">the GEO services page</a>.
        </p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Questions"
          tone="light"
          title="What lodge and hotel owners ask us"
        />
        <div className="mt-10">
          <Faq items={FAQ} tone="light" />
        </div>
      </Section>

      <CtaDrop
        title="Ask the AI where to stay near you. Who does it name?"
        body="Free AI-visibility check: we ask ChatGPT, Perplexity, and Gemini the questions your future guests ask — where to stay, which lodge, which hotel in which city — and show you the answer they give today."
        ctaLabel="Get the free check"
      />
    </>
  );
}
