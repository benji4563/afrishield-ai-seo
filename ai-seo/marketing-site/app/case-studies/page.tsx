import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Case study: a site built in a day';
const DESCRIPTION =
  'What actually shipped on the NJ Accounting build — the stack, the schema, the keyword discipline — and why there are no traffic numbers on this page yet.';

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
 * TODO(ben): traffic, ranking and lead figures for NJ's are deliberately absent.
 * Per the folder CLAUDE.md, client metrics are read-only reference material and
 * must be cleared for public use before they appear here. Once cleared, add a
 * "Results" section below "What shipped" — do not edit the claims elsewhere on
 * this page to imply outcomes in the meantime.
 */

const SHIPPED = [
  'Next.js App Router site, seven routes, custom-domain HTTPS',
  'Organization, ProfessionalService, Service and FAQPage schema across the site',
  'A researched pillar blog post with BlogPosting, FAQPage and BreadcrumbList markup',
  'One city landing page with genuinely local content, not a find-and-replace',
  'Dynamic sitemap and a robots.txt pointing at it',
  'Search Console property verified and sitemap submitted',
  'A keyword log with one entry per targeted primary, no duplicates',
];

const DECISIONS = [
  {
    title: 'Roughly three in four keyword rows were thrown out',
    body: 'The raw export was full of career searches, software login queries, and government lookups that Google answers with a .gov result. Targeting those would have produced pages that rank for nothing anybody would buy.',
  },
  {
    title: 'The city page got three brand-new components',
    body: 'Named neighbourhoods, county framing, and local regulatory notes — not the home page with the city name swapped in. Thin location pages are detectable and they drag the rest of the site with them.',
  },
  {
    title: 'Tax specifics were hedged on purpose',
    body: 'Thresholds and local rates change. The page gives general guidance and says the exact figure gets confirmed on the call. A confidently stale number is worse than an honest deferral.',
  },
  {
    title: 'The blog post opens with a named character who does not exist',
    body: 'Clearly framed as an illustrative composite, never as a testimonial. Invented client quotes are a reputation risk that pays for itself exactly once.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Case study', path: '/case-studies' },
        ])}
      />

      <PageHero
        eyebrow="Case study"
        title="One accounting firm, one working day, git init to live"
        blurb="NJ's Accounting & Tax Services went from an empty repository to a deployed site on a custom domain with full schema markup inside a single working day. Here is what shipped and what we decided along the way."
      />

      <Section tone="light">
        <SectionHeader
          eyebrow="What shipped"
          tone="light"
          title="The build, itemised"
          blurb="Every line below is verifiable from the repository's own commit history. Nothing here is an estimate."
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {SHIPPED.map((item) => (
            <li
              key={item}
              className="flex gap-4 border border-ink/10 bg-white p-5 text-small body-dim-light"
            >
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-green-600" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Judgement calls"
          tone="dark"
          title="The four decisions that shaped the build"
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
          <p className="eyebrow-light">Why there are no numbers on this page</p>
          <h2 className="h2 mt-5">The results section is empty, and that is deliberate</h2>
          <p className="mt-6 text-lead body-dim-light">
            A case study with traffic charts is worth more to us than one without. We have
            not published them for two reasons, and both of them will still be true next
            month if we have not fixed them.
          </p>
          <p className="mt-5 text-body body-dim-light">
            First, client performance data belongs to the client. It gets published when
            they have cleared it for public use, in writing, and not before. Second, a site
            that launched recently does not yet have a fair sample. Reading three weeks of
            search data and calling it a result is how agencies end up quoting a spike that
            was one journalist and a slow news day.
          </p>
          <p className="mt-5 text-body body-dim-light">
            When there is a clean quarter and written approval, the numbers go here — the
            flat months included.
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
