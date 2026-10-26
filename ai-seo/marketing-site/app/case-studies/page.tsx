import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Case studies: what we built, and what it did';
const DESCRIPTION =
  'Four engagements across Cameroon — an eye clinic in Douala, an optician in Yaoundé, a reinsurance network, and an accounting firm. What shipped, what we decided, and where the numbers are.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/case-studies`,
    type: 'article',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/*
 * CLIENT NAMING: Jackson Eye Clinic, Niss Optique Médical and Tataachi Network
 * are cleared by Ben to be named here (2026-10-26). Do not add a fifth client
 * without the same explicit clearance.
 *
 * RESULTS: every `results` array below is intentionally empty. Per the folder
 * CLAUDE.md, client traffic, ranking and lead figures are read-only reference
 * material and must be cleared for public use — in writing, by the client —
 * before they appear on this page. A case with an empty `results` array simply
 * renders no results block, so nothing half-finished can leak to production.
 *
 * TO ADD NUMBERS: put them in `results` as short factual strings, e.g.
 *   results: ['42 pages indexed by 2026-11-30', 'Position 4 for "opticien yaoundé"']
 * Never estimate, never round up, and date every figure.
 */

type CaseStudy = {
  client: string;
  what: string;
  where: string;
  site?: string;
  live: string;
  scope: string;
  shipped: string[];
  results: string[];
};

const CASES: CaseStudy[] = [
  {
    client: 'Jackson Eye Clinic',
    what: 'Optometrist-led eye clinic, founded 2020',
    where: 'Kotto-Bonamoussadi, Douala',
    site: 'jacksoneyeclinic.com',
    live: 'Live and open to Google since 8 October 2026',
    scope: 'Bilingual site build, technical SEO, GEO, and an ongoing blog',
    shipped: [
      'Bilingual site, French and English, with a separate indexable URL per language',
      '32 URLs in the sitemap, every one returning 200',
      'JSON-LD structured data describing the clinic, its hours and its services',
      'Service pages for eye examinations, glasses, prices, location and FAQs',
      'A patient-facing journal publishing on a running cadence',
      'Prices stated on the page — 2,000 FCFA for an eye test — rather than hidden behind a call',
    ],
    results: [],
  },
  {
    client: 'Niss Optique Médical',
    what: 'ONOC-licensed optical practice',
    where: 'Mvog-Ada, Yaoundé',
    site: 'nissoptiquemedical.com',
    live: 'Live and open to Google since 13 October 2026',
    scope: 'Bilingual site build, SEO, GEO, and a citation and NAP programme',
    shipped: [
      'Bilingual site, French and English, 18 URLs in the sitemap',
      'JSON-LD structured data, including the practice’s ONOC accreditation',
      'A blog answering the questions patients actually ask about price and repairs',
      'Citations audited and corrected across twelve directories, including the ONOC register',
      'One canonical name, address and phone number enforced across every listing',
    ],
    results: [],
  },
  {
    client: 'Tataachi Network',
    what: 'Insurance and reinsurance network across 40+ African markets',
    where: 'Douala, operating continent-wide',
    site: 'tataachi.com',
    live: 'Audit delivered; remediation in progress',
    scope: 'Full scored audit — technical, on-page, off-page, GEO and trust',
    shipped: [
      'Scored audit across five pillars, benchmarked against real competitors',
      'Conflicting addresses and three different phone numbers identified across the site',
      'A page titled for one subject while describing another, found and flagged',
      'Thirteen broken links found, including an admin URL exposed in the public footer',
      'A regulatory wording risk identified in how the business described itself',
    ],
    results: [],
  },
  {
    client: 'NJ’s Accounting & Tax Services',
    what: 'Accounting and tax practice',
    where: 'United States',
    live: 'Built from empty repository to live site in a single working day',
    scope: 'Site build, schema, one city page, one researched pillar post',
    shipped: [
      'Next.js App Router site, seven routes, custom-domain HTTPS',
      'Organization, ProfessionalService, Service and FAQPage schema across the site',
      'A researched pillar post with BlogPosting, FAQPage and BreadcrumbList markup',
      'One city landing page with genuinely local content, not a find-and-replace',
      'Dynamic sitemap, robots.txt pointing at it, Search Console verified',
    ],
    results: [],
  },
];

const DECISIONS = [
  {
    title: 'Roughly three in four keyword rows were thrown out',
    body: 'The raw export was full of career searches, software login queries, and government lookups that Google answers with a .gov result. Targeting those would have produced pages that rank for nothing anybody would buy.',
  },
  {
    title: 'City pages get new components, not a find-and-replace',
    body: 'Named neighbourhoods, local framing, and real regulatory notes. Thin location pages are detectable and they drag the rest of the site down with them.',
  },
  {
    title: 'Prices go on the page',
    body: 'Both clinics publish what an eye test costs. It loses the occasional lead who was only ever price-checking, and it wins the ones who were deciding between you and silence.',
  },
  {
    title: 'No invented people, ever',
    body: 'Where a blog post uses a character, it is framed as an illustrative composite and never as a testimonial. Invented client quotes are a reputation risk that pays for itself exactly once.',
  },
];

function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <article className="border border-ink/10 bg-white p-7">
      <h3 className="h3">{item.client}</h3>
      <p className="mt-2 text-small body-dim-light">
        {item.what} · {item.where}
      </p>
      <p className="mt-4 font-mono text-label uppercase text-green-700">{item.live}</p>
      {item.site ? (
        <p className="mt-1 font-mono text-label uppercase text-ink/40">{item.site}</p>
      ) : null}

      <p className="mt-6 text-small body-dim-light">
        <span className="font-semibold">Scope.</span> {item.scope}
      </p>

      <ul className="mt-5 space-y-2.5">
        {item.shipped.map((line) => (
          <li key={line} className="flex gap-3 text-small body-dim-light">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-600" />
            {line}
          </li>
        ))}
      </ul>

      {/* Renders only once the client has cleared figures for publication. */}
      {item.results.length > 0 ? (
        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="eyebrow-light">Results</p>
          <ul className="mt-3 space-y-2">
            {item.results.map((line) => (
              <li key={line} className="text-small body-dim-light">
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Case studies', path: '/case-studies' },
        ])}
      />

      <PageHero
        eyebrow="Case studies"
        title="Four engagements, and what actually shipped on each"
        blurb="Two clinics in Cameroon, a reinsurance network operating across the continent, and an accounting practice. Every line below is checkable — visit the sites, read the schema, count the pages in the sitemap."
      />

      <Section tone="light">
        <SectionHeader
          eyebrow="The work"
          tone="light"
          title="What was built"
          blurb="Itemised from what is live and public. Nothing here is an estimate."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CASES.map((item) => (
            <CaseCard key={item.client} item={item} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Judgement calls"
          tone="dark"
          title="The decisions that shaped these builds"
          blurb="These are the choices that separate a site that ranks from a site that merely exists. Each one cost something to make."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {DECISIONS.map((decision) => (
            <article key={decision.title} className="card-dark">
              <h3 className="h3">{decision.title}</h3>
              <p className="mt-4 text-small body-dim">{decision.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <div className="mx-auto max-w-prose">
          <p className="eyebrow-light">Why there are no traffic charts here</p>
          <h2 className="h2 mt-5">The results sections are empty, and that is deliberate</h2>
          <p className="mt-6 text-lead body-dim-light">
            A case study with real numbers is worth more than one without. We have not
            published them for two reasons, and both will still be true next month if we
            have not fixed them.
          </p>
          <p className="mt-5 text-body body-dim-light">
            First, client performance data belongs to the client. It gets published when
            they have cleared it for public use, in writing, and not before. Second, a site
            that launched in October does not yet have a fair sample. Reading three weeks of
            search data and calling it a result is how agencies end up quoting a spike that
            was one journalist and a slow news day.
          </p>
          <p className="mt-5 text-body body-dim-light">
            What you can check today is everything above: the sites are live, the pages are
            indexed, the schema is in the markup, the blogs are publishing. When there is a
            clean quarter and written approval, the numbers go here — the flat months
            included.
          </p>
        </div>
      </Section>

      <CtaDrop
        title="Want to see the audit before the pitch?"
        body="We will show you what your site currently ranks for and what your three closest competitors hold. You keep the findings either way."
      />
    </>
  );
}
