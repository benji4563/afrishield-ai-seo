import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, servicesJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'AI SEO solutions: research to reporting';
const DESCRIPTION =
  'The three loops we run — keyword and SERP research, weekly publishing, and rank tracking in a one-page monthly report. What each one includes, in detail.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/solutions`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const PILLARS = [
  {
    eyebrow: 'Pillar one',
    title: 'Keyword and SERP intelligence',
    body: 'Most keyword exports are mostly junk. Career searches, competitor brand names, government lookups, people trying to log in to something. Our job is to throw those out loudly, so you can see what we threw and tell us if we were wrong.',
    image: '/images/pillar-research.jpg',
    imageAlt: 'An African analyst reviewing data on a laptop.',
    includes: [
      'Full keyword pull, clustered by commercial intent',
      'Explicit skip list — what we discarded and the reason',
      'One primary keyword assigned per page, logged and never reused',
      'Teardown of the pages currently ranking for each target',
      'A content plan sequenced by highest commercial intent first',
    ],
  },
  {
    eyebrow: 'Pillar two',
    title: 'The content engine',
    body: 'A post is not finished when the words are done. It is finished when the schema validates, the internal links point at pages that exist, the images have alt text that says something, and the keyword is logged so nobody targets it twice.',
    image: '/images/pillar-content.jpg',
    imageAlt: 'An African professional writing notes at a desk in an office.',
    includes: [
      'Research against the live top results before drafting',
      'Original prose — structural patterns borrowed, sentences never',
      'A direct answer block at the top for featured-snippet eligibility',
      'FAQ section drawn from real People Also Ask themes',
      'BlogPosting, FAQPage and BreadcrumbList schema on every post',
      'Internal links only to routes that already return 200',
    ],
  },
  {
    eyebrow: 'Pillar three',
    title: 'Tracking and reporting',
    body: 'One page a month. If a report needs a walkthrough call to be understood, it was written for the agency, not for you.',
    image: '/images/pillar-reporting.jpg',
    imageAlt: 'An African business team reviewing charts and reports together.',
    includes: [
      'Every claimed keyword, with last month and this month side by side',
      'Positions that fell, shown at the same size as the ones that rose',
      'What shipped, by URL',
      'What is queued for next month',
      'A plain sentence on whether the trend justifies the invoice',
    ],
  },
];

const TECHNICAL = [
  'Core Web Vitals and mobile weight budgets',
  'Canonical tags, one per route',
  'Sitemap that matches the routes that actually exist',
  'robots.txt allowing crawl, pointing at the sitemap',
  'Search Console and Bing Webmaster setup',
  'Organization and service schema sitewide',
  'Metadata written to the lengths search engines actually render',
  'Google Business Profile alignment for local queries',
];

export default function SolutionsPage() {
  return (
    <>
      <StructuredData data={servicesJsonLd} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ])}
      />

      <PageHero
        eyebrow="Solutions"
        title="Three loops, running every week you are with us"
        blurb="Search work is not a project that finishes. It is three jobs that have to keep happening. Here is exactly what sits inside each one."
      />

      <Section tone="dark">
        <Bluf tone="dark" className="max-w-[72ch]">
          AfriShield AI SEO runs three continuous services for African businesses: keyword
          and SERP intelligence, a content engine that publishes on a weekly schedule, and
          rank tracking reported monthly. Together they earn visibility in Google, Google
          Maps, and AI answer engines like ChatGPT, Claude, and Perplexity — with a person
          editing every published word.
        </Bluf>
      </Section>

      {PILLARS.map((pillar, i) => (
        <Section key={pillar.title} tone={i % 2 === 0 ? 'light' : 'dark'}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow={pillar.eyebrow}
                tone={i % 2 === 0 ? 'light' : 'dark'}
                title={pillar.title}
                blurb={pillar.body}
              />
              <div
                className={`mt-8 aspect-[1200/627] overflow-hidden border ${
                  i % 2 === 0 ? 'border-ink/10' : 'border-white/10'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  width={1200}
                  height={627}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <ul className={i % 2 === 0 ? 'space-y-px bg-ink/10' : 'space-y-px bg-white/10'}>
              {pillar.includes.map((item) => (
                <li
                  key={item}
                  className={`flex gap-4 p-5 text-small ${
                    i % 2 === 0 ? 'bg-bone body-dim-light' : 'bg-ink body-dim'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-1.5 w-1.5 shrink-0 ${
                      i % 2 === 0 ? 'bg-green-600' : 'bg-green-300'
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
          eyebrow="Underneath all three"
          tone="light"
          title="The technical work that makes the rest of it count"
          blurb="None of this is interesting and all of it is load-bearing. It is included at every tier, because a great post on a broken site is a great post nobody reads."
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNICAL.map((item) => (
            <li key={item} className="border border-ink/10 bg-white p-5 text-small body-dim-light">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CtaDrop
        title="Want the keyword map before you commit?"
        body="We will run the research and walk you through what we would target and what we would skip. If the answer is that search is not your best channel right now, that is what the call will say."
      />
    </>
  );
}
