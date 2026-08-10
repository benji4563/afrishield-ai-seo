import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Faq } from '@/components/ui/Faq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd, safariOperatorsServiceJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'SEO for safari operators';
const DESCRIPTION =
  'SEO for safari operators and African tour companies — built to reach the international buyers who plan on Google and inside AI assistants, without burning cash on ads.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/for-safari-operators' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/for-safari-operators`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const PAINS = [
  {
    title: 'The international buyers you never reach',
    body: '\u201CI see boutique agents in the USA sell $5,000-per-person safaris, and I have not once caught such clients,\u201D one East African operator wrote. Another, with a five-star TripAdvisor rating held for over a decade: \u201CYet it\u2019s so difficult to find business.\u201D The product is not the problem. Being found by the person who plans the trip is.',
  },
  {
    title: 'Ads that burn cash without converting',
    body: 'Operators describe burning $5,000 on Google Ads without breaking even — clicks, sometimes calls, almost no booked tours. Ads rent attention by the day. The day the budget stops, the phone stops.',
  },
  {
    title: 'Locked out of the agent referral club',
    body: 'The established route to international clients runs through overseas agents who already have their contacts and do not want to change them. FAM trips and trade shows are expensive lottery tickets — operators report coming home from WTM London with nothing meaningful. Owning the direct channel bypasses the club entirely.',
  },
  {
    title: 'A website that has not generated any sales',
    body: 'A common confession, almost verbatim, from an East African safari company: \u201CWhile we have a website, it has not generated any sales yet.\u201D Many have also tried raw AI-generated articles and acquired no clients — because volume without research is just faster invisible content.',
  },
];

const HOW = [
  {
    title: 'Keywords from the buyer\u2019s side of the table',
    body: 'We research what the international planner actually searches — park-level, route-level, and experience-level queries the big aggregators ignore — and assign one primary keyword per page, logged so nothing is ever targeted twice.',
  },
  {
    title: 'GEO: get named by the AI doing the planning',
    body: 'A growing share of high-intent safari planning happens inside ChatGPT, Perplexity, and Gemini. AI-crawler access, answer-first content blocks, and structured data make your company citable in those answers. We benchmark monthly which assistants name you and which name your competitors.',
  },
  {
    title: 'A content engine with an editor',
    body: 'A weekly publishing schedule of SERP-researched, original prose — not raw AI output. Every post is edited by a person before it ships, because the failed experiment most operators have already run is unedited machine content.',
  },
  {
    title: 'Reporting tied to enquiries',
    body: 'One page a month: what shipped, what moved, how many enquiries came from search. No impressions, no engagement rate, no numbers that cannot be checked against your own inbox.',
  },
];

const FAQ = [
  {
    q: 'How do I get international clients for my safari company?',
    a: 'Reach them where they plan: Google searches and AI assistants. That means pages built around the specific queries international travelers run — parks, routes, seasons, trip lengths — plus the technical and structured-data work that lets ChatGPT and Perplexity cite your company by name. It compounds slowly, but unlike ads it does not stop when you stop paying.',
  },
  {
    q: 'Is Google Ads worth it for a safari operator?',
    a: 'Ads can fill an immediate gap if your landing pages convert, but operators routinely report thousands spent without a booked tour — the click is easy, the conversion is not. SEO and AI-answer visibility build a position that keeps producing after the work is done. Most operators who can afford both run ads for the short term and organic for the compounding channel underneath.',
  },
  {
    q: 'Why does my safari website get no enquiries?',
    a: 'Usually one of three reasons: it targets no real keywords, so nobody finds it; it is too slow or broken on a phone, so visitors leave; or it gives a visitor no reason to trust an unknown operator with a $5,000 deposit — no reviews surfaced, no clear itineraries, no proof. Each is diagnosable, and none is fixed by publishing more generic blog posts.',
  },
  {
    q: 'How can a small safari operator compete with the big companies?',
    a: 'By not fighting them on the head terms. The large players hold "African safari"; they do not hold the thousands of specific queries — a particular park, a particular route, a particular kind of traveler. Niche long-tail plus AI-answer visibility is where a small operator wins, because specificity is exactly what a small operator has more of.',
  },
  {
    q: 'Comment am\u00e9liorer le SEO d\u2019une agence de voyage au Cameroun ?',
    a: 'Commencez par les fondations : un site rapide sur mobile, une fiche Google Business Profile compl\u00e8te, et des pages qui r\u00e9pondent aux questions que posent r\u00e9ellement les voyageurs internationaux. AfriShield AI accompagne les voyagistes et tours op\u00e9rateurs du Cameroun et de l\u2019Afrique francophone — recherche de mots-cl\u00e9s, contenu r\u00e9gulier, donn\u00e9es structur\u00e9es, et visibilit\u00e9 dans les r\u00e9ponses des assistants IA comme ChatGPT. Devis clair, sans promesse de classement garanti.',
  },
];

export default function ForSafariOperatorsPage() {
  return (
    <>
      <StructuredData data={safariOperatorsServiceJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'For tourism & hospitality', path: '/for-tourism-hospitality' },
          { name: 'For safari operators', path: '/for-safari-operators' },
        ])}
      />

      <PageHero
        eyebrow="For safari operators"
        title="The best safari in the park, that nobody abroad can find"
        blurb="You run the trips. The problem is the buyer plans from another continent, through a search engine or an AI assistant — and right now, neither one knows you exist."
      />

      <Section tone="dark">
        <Bluf tone="dark" className="max-w-[72ch]">
          SEO for safari operators is search and AI-answer visibility built for companies
          selling multi-day tours to international buyers. AfriShield AI runs keyword research,
          technical fixes, and a scheduled content engine aimed at the queries travelers and
          their AI assistants use to plan a safari — so bookings arrive directly instead of
          through ads or middlemen.
        </Bluf>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="The situation"
          tone="light"
          title="Four problems, one root cause"
          blurb="Everything below traces back to the same thing: the operator does not own a channel that reaches the buyer. Each pain is quoted from operators on the record."
        />
        <ul className="mt-12 space-y-px bg-ink/10">
          {PAINS.map((pain) => (
            <li key={pain.title} className="bg-white p-7">
              <h3 className="font-display text-[17px] font-semibold text-ink">{pain.title}</h3>
              <p className="mt-3 text-small body-dim-light">{pain.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="The work"
          tone="dark"
          title="What SEO for a safari operator actually involves"
          blurb="Not magic and not mystery — four workstreams, run every month, reported in numbers you can check against your own booking inbox."
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
          This sits inside the same published tiers as every other engagement —{' '}
          <a href="/pricing" className="text-green-300 underline underline-offset-4 hover:text-green-200">see pricing</a>.
          The GEO workstream is described in full on{' '}
          <a href="/geo-services" className="text-green-300 underline underline-offset-4 hover:text-green-200">the GEO services page</a>, and
          the lodges-and-hotels version of this offer is on{' '}
          <a href="/for-lodges-hotels" className="text-green-300 underline underline-offset-4 hover:text-green-200">the lodges page</a>.
        </p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Questions"
          tone="light"
          title="What safari operators ask us"
        />
        <div className="mt-10">
          <Faq items={FAQ} tone="light" />
        </div>
      </Section>

      <CtaDrop
        title="Ask the AI where to go on safari. Are you in the answer?"
        body="Free AI-visibility check: we ask ChatGPT, Perplexity, and Gemini the questions your buyers ask — which operator, which park, which itinerary — and show you who gets named. If it is not you, that is the gap we close."
        ctaLabel="Get the free check"
      />
    </>
  );
}
