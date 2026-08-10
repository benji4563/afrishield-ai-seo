import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Faq } from '@/components/ui/Faq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, faqPageJsonLd, geoServicesJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Generative engine optimization services';
const DESCRIPTION =
  'Generative engine optimization (GEO) services for African businesses — AI-crawler access, answer-first content, structured data, and a monthly benchmark of what ChatGPT, Claude, Perplexity, and Gemini say about you.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/geo-services' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/geo-services`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const PILLARS = [
  {
    eyebrow: 'Part one',
    title: 'AI-crawler allowlist',
    body: 'Most sites block AI crawlers by accident — an inherited robots.txt, a security plugin, a CDN default. The first job is an audit of which crawlers (OpenAI, Anthropic, Perplexity, Google) can actually read the site, then an explicit allowlist so they can. A page the crawler cannot reach is a citation that never happens.',
    includes: [
      'Audit of robots.txt, headers, and CDN rules against known AI crawlers',
      'Explicit allow rules for the crawlers that feed answer engines',
      'Verification that SSR content renders without JavaScript execution',
    ],
  },
  {
    eyebrow: 'Part two',
    title: 'BLUF answer blocks',
    body: 'AI assistants lift sentences, not pages. Every important page gets a bottom-line-up-front answer block — 40 to 70 words, factual, entity-dense, written to be quoted verbatim. It reads like good plain writing to a person and like a citation target to a machine.',
    includes: [
      'A quotable answer block at the top of every key page',
      'Plain factual sentences an assistant can lift without editing',
      'Entity-dense naming: who, what, where, in the first sentence',
    ],
  },
  {
    eyebrow: 'Part three',
    title: 'The schema engine',
    body: 'Structured data is how you tell a machine what the business is without asking it to guess. Organization, Service, FAQPage, BreadcrumbList, and BlogPosting markup, generated from the same source of truth as the visible page, validated before anything ships.',
    includes: [
      'Organization, Service, FAQ, Breadcrumb, and BlogPosting JSON-LD',
      'Generated from the page data, so markup and copy never drift',
      'Validated as part of every publish, not once at launch',
    ],
  },
  {
    eyebrow: 'Part four',
    title: 'Ask-AI buttons',
    body: 'Each key page carries prompts that let a visitor hand the page to ChatGPT, Claude, Perplexity, or Gemini in one click. Every use seeds your brand into an AI session with the page as context — the visitor\u2019s own assistant does the summarising.',
    includes: [
      'One-click "ask the AI about this page" prompts on key pages',
      'Prefilled questions that frame your offer correctly',
      'Works for the skeptical buyer who trusts the assistant over the vendor',
    ],
  },
  {
    eyebrow: 'Part five',
    title: 'Monthly AI-citation benchmark',
    body: 'Once a month we run the fixed panel of questions your buyers ask — where to stay, who to book, which provider in which city — across ChatGPT, Claude, Perplexity, and Gemini, and record who gets named. The trend over months is the GEO equivalent of a rank tracker, and it goes in the same one-page report.',
    includes: [
      'A fixed question panel per client, run across the major assistants',
      'Named / not named / named-with-errors recorded per engine',
      'Month-over-month trend in the plain-numbers monthly report',
    ],
  },
];

const FAQ = [
  {
    q: 'What are generative engine optimization services?',
    a: 'The work that makes a business citable inside AI-generated answers. It covers technical access for AI crawlers, answer-first content written to be quoted, structured data that describes the business to machines, consistent entity signals across the web, and measurement of which assistants name the business. It sits alongside SEO, not instead of it — the same clarity that ranks on Google is what gets quoted by an assistant.',
  },
  {
    q: 'How is GEO different from traditional SEO?',
    a: 'SEO earns a position on a results page; GEO earns a mention inside the answer itself. A traveler asking ChatGPT where to stay near a specific park does not get ten blue links — they get two or three names and a paragraph. The mechanics overlap with good SEO (clear writing, sound technicals, credible sources) but add a premium on being the original, checkable source rather than a summary of someone else.',
  },
  {
    q: 'Can anyone guarantee ChatGPT will recommend my business?',
    a: 'No, and anyone who guarantees it is selling something that does not exist. No provider controls what an assistant says — the same discipline applies as with rankings. What can be done is everything that makes a citation likely: crawler access, quotable answers, clean structured data, consistent identity across the web. Then it is measured, monthly, so you can see the trend yourself.',
  },
  {
    q: 'How do you measure whether GEO is working?',
    a: 'With a fixed panel of buyer questions run monthly across ChatGPT, Claude, Perplexity, and Gemini. For each question and each engine we record whether your business is named, named with errors, or absent — and whose name appears instead. The month-over-month trend is the honest measure, reported alongside your search positions in the same one-page report.',
  },
  {
    q: 'Is this relevant outside tourism and hospitality?',
    a: 'Yes. The same five-part service applies to any business whose buyers research before they buy — professional services, e-commerce, B2B. Tourism is where we lead because trip planning has moved into AI assistants fastest, and because we found no niche-specialized GEO provider operating in African markets when we checked.',
  },
];

export default function GeoServicesPage() {
  return (
    <>
      <StructuredData data={geoServicesJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'GEO services', path: '/geo-services' },
        ])}
      />

      <PageHero
        eyebrow="GEO services"
        title="Being ranked is no longer the whole job. Being named is."
        blurb="ChatGPT, Claude, Perplexity, and Gemini now answer the questions your buyers used to type into Google. Generative engine optimization is the discipline of being inside that answer."
      />

      <Section tone="dark">
        <Bluf tone="dark" className="max-w-[72ch]">
          Generative engine optimization services make a business citable inside AI answers —
          ChatGPT, Claude, Perplexity, Gemini, and Google&rsquo;s AI Overview. AfriShield
          AI&rsquo;s GEO work covers AI-crawler access, answer-first content blocks, structured
          data, entity consistency across the web, and a monthly benchmark of which assistants
          name the business and which do not.
        </Bluf>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Why now"
          tone="light"
          title="The top of the funnel moved"
          blurb="A traveler planning a safari, a founder looking for an accountant, a buyer comparing providers — an increasing share of them ask an assistant first and visit a website second. When we checked the African market, we found no niche-specialized GEO provider operating in it. That gap is the opportunity, for you and for us."
        />
      </Section>

      {PILLARS.map((pillar, i) => (
        <Section key={pillar.title} tone={i % 2 === 0 ? 'dark' : 'light'}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <SectionHeader
              eyebrow={pillar.eyebrow}
              tone={i % 2 === 0 ? 'dark' : 'light'}
              title={pillar.title}
              blurb={pillar.body}
            />
            <ul className={i % 2 === 0 ? 'space-y-px bg-white/10' : 'space-y-px bg-ink/10'}>
              {pillar.includes.map((item) => (
                <li
                  key={item}
                  className={`flex gap-4 p-5 text-small ${
                    i % 2 === 0 ? 'bg-ink body-dim' : 'bg-bone body-dim-light'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-1.5 w-1.5 shrink-0 ${
                      i % 2 === 0 ? 'bg-green-300' : 'bg-green-600'
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tone="light">
        <SectionHeader
          eyebrow="Where it runs"
          tone="light"
          title="GEO is a layer on every engagement, and a service on its own"
          blurb="The crawler audit, answer blocks, and schema ship inside every tier — see pricing. The full five-part service, including the monthly AI-citation benchmark, is scoped per business. Either way, the deliverable you can check first is free: the AI-visibility check below."
        />
        <p className="mt-10 max-w-[72ch] text-small body-dim-light">
          For the tourism niche specifically, see{' '}
          <a href="/for-tourism-hospitality" className="text-green-600 underline underline-offset-4 hover:text-green-500">hospitality SEO services</a>,{' '}
          <a href="/for-safari-operators" className="text-green-600 underline underline-offset-4 hover:text-green-500">SEO for safari operators</a>, and{' '}
          <a href="/for-lodges-hotels" className="text-green-600 underline underline-offset-4 hover:text-green-500">SEO for lodges and hotels</a>.
          The background reading is our post on{' '}
          <a href="/blog/answer-engine-optimization" className="text-green-600 underline underline-offset-4 hover:text-green-500">answer engine optimization</a>.
        </p>
      </Section>

      <Section tone="light" className="border-t border-ink/10">
        <SectionHeader
          eyebrow="Questions"
          tone="light"
          title="What people ask about GEO"
        />
        <div className="mt-10">
          <Faq items={FAQ} tone="light" />
        </div>
      </Section>

      <CtaDrop
        title="See what the AI says about you — before your competitors do"
        body="Free AI-visibility check: we ask ChatGPT, Perplexity, and Gemini the questions your buyers ask and show you the answers, verbatim. Whether you hire us or not, you keep the baseline."
        ctaLabel="Get the free check"
      />
    </>
  );
}
