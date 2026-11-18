import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, ORGANIZATION_ID } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'AfriShield Research: AI visibility in Africa, measured';
const DESCRIPTION =
  'Original studies of how African businesses appear in Google and AI answers. Methods and limits published, datasets open under CC BY 4.0. One new study a month.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/research' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/research`,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/*
 * THE RESEARCH HUB (added 2026-11-18).
 *
 * Studies stay at their /blog/... URLs. This page links to them and never
 * replaces them: moving a study would cost the links and impressions it has
 * already earned.
 *
 * ADDING A STUDY: append to STUDIES (newest first) when the study page, its
 * dataset in /public/data and its methodology are all live. Every number in
 * `finding` must be copied from the published study, never rounded up. Then
 * move the release out of UPCOMING. One release a month, never two — see the
 * afrishield-geo-plan skill for the calendar.
 *
 * MARKET GUIDES are kept apart on purpose: a guide that compares providers,
 * AfriShield among them, is not independent research and must not be presented
 * as such.
 */

type Study = {
  slug: string;
  series: string;
  title: string;
  lang: 'EN' | 'FR';
  date: string;
  sample: string;
  finding: string;
  datasets: { label: string; href: string }[];
};

const STUDIES: Study[] = [
  {
    slug: 'africa-safari-hotel-ai-visibility-index-2026',
    series: 'Africa AI Visibility Index · Hospitality',
    title: 'Africa Safari & Hotel AI Visibility Index, pilot edition',
    lang: 'EN',
    date: '17 November 2026',
    sample: '7 safari operators and hotels in Tanzania, Kenya, Uganda and South Africa, audited 14 September to 14 October 2026. Anonymised.',
    finding:
      'Five of seven rank first on Google for their own name, and five of seven reach page one for none of the trips or rooms they sell. Mean overall GEO score: 45 out of 100.',
    datasets: [
      { label: 'Dataset (JSON)', href: '/data/africa-hospitality-ai-visibility-index-2026-11.json' },
    ],
  },
  {
    slug: 'barometre-ia-cameroun-2026',
    series: 'Africa AI Visibility Index · Baromètre pays',
    title: 'Baromètre IA Cameroun 2026',
    lang: 'FR',
    date: '19 octobre 2026',
    sample: '30 grandes organisations camerounaises (banque, télécoms, énergie, universités, médias), mesurées les 18 et 19 octobre 2026.',
    finding:
      'Aucune des 26 organisations dotées d’un site fonctionnel ne publie de fichier llms.txt ni ne nomme un robot d’IA. Score moyen : 46,3 sur 100.',
    datasets: [
      { label: 'Données (JSON)', href: '/data/barometre-ia-cameroun-2026.json' },
      { label: 'Données (CSV)', href: '/data/barometre-ia-cameroun-2026.csv' },
    ],
  },
  {
    slug: 'ai-search-visibility-study-october-2026',
    series: 'Five-city study · Wave 2',
    title: 'The first crack in the aggregator wall',
    lang: 'EN',
    date: '19 October 2026',
    sample: 'The same 9 searches in Nairobi, Lagos, Accra, Johannesburg and Arusha, re-run on 17 October 2026.',
    finding:
      'A locally owned operator in Arusha took position one from a directory. In hospitality, businesses’ own sites rose from 23% to 28% of page one.',
    datasets: [
      { label: 'Wave 2 (JSON)', href: '/data/ai-visibility-study-2026-10.json' },
      { label: 'Wave 1 (JSON)', href: '/data/ai-visibility-study-2026-08.json' },
    ],
  },
  {
    slug: 'ai-search-visibility-study',
    series: 'Five-city study · Wave 1',
    title: 'Who AI recommends when someone searches for an African business',
    lang: 'EN',
    date: '28 August 2026',
    sample: '9 searches for "best {service} in {city}" across five African cities.',
    finding:
      'A business’s own website was 23% of page one in travel and hospitality, against 68% in professional services. Google served an AI element on all 9 searches.',
    datasets: [{ label: 'Dataset (JSON)', href: '/data/ai-visibility-study-2026-08.json' }],
  },
];

const UPCOMING = [
  {
    month: 'December 2026',
    title: 'Clinic AI Visibility Index, Cameroon',
    body: 'Opticians in Douala and Yaoundé: which practices ChatGPT and Google Maps actually recommend, and which they only know by name.',
  },
  {
    month: 'January 2027',
    title: 'Baromètre IA Nigeria',
    body: 'Thirty of Nigeria’s largest organisations, measured on the same eight-point grid as the Cameroon edition, so the two can be compared directly.',
  },
];

const PRINCIPLES = [
  {
    title: 'One study a month, never two',
    body: 'A new release in the first week of each month. Between releases we publish nothing under the research name. Fewer studies, each one worth citing.',
  },
  {
    title: 'Method and limits on the page',
    body: 'Every study states its sample, its dates, how it was measured and what it cannot tell you. A pilot is called a pilot.',
  },
  {
    title: 'Open data',
    body: 'Datasets are published under CC BY 4.0. Reuse them, check them, and tell us if we got something wrong.',
  },
  {
    title: 'Every organisation measured gets its result',
    body: 'Each organisation in a study receives its own one-page scorecard, with the corrections that would move its score. Measurement without a copy to the measured is just a league table.',
  },
];

const researchJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ResearchProject',
      '@id': `${SITE_URL}/research#project`,
      name: 'AfriShield Research — Africa AI Visibility Index',
      url: `${SITE_URL}/research`,
      description:
        'A recurring programme of original studies measuring how African businesses and organisations appear in Google search results and in answers from AI assistants such as ChatGPT, Perplexity and Gemini.',
      parentOrganization: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Place', name: 'Africa' },
    },
    {
      '@type': 'DataCatalog',
      '@id': `${SITE_URL}/research#catalog`,
      name: 'AfriShield Research datasets',
      url: `${SITE_URL}/research`,
      publisher: { '@id': ORGANIZATION_ID },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      dataset: STUDIES.map((study) => ({
        '@type': 'Dataset',
        name: study.title,
        url: `${SITE_URL}/blog/${study.slug}`,
        inLanguage: study.lang === 'FR' ? 'fr' : 'en',
        description: study.finding,
        creator: { '@id': ORGANIZATION_ID },
        license: 'https://creativecommons.org/licenses/by/4.0/',
        isAccessibleForFree: true,
        distribution: study.datasets.map((data) => ({
          '@type': 'DataDownload',
          name: data.label,
          contentUrl: `${SITE_URL}${data.href}`,
          encodingFormat: data.href.endsWith('.csv') ? 'text/csv' : 'application/json',
        })),
      })),
    },
  ],
};

function StudyCard({ study }: { study: Study }) {
  return (
    <article className="flex flex-col border border-ink/10 bg-white p-7" lang={study.lang === 'FR' ? 'fr' : 'en'}>
      <p className="font-mono text-label uppercase text-green-700">
        {study.series} · {study.lang}
      </p>
      <h3 className="h3 mt-3">
        <Link href={`/blog/${study.slug}`} className="hover:text-green-700">
          {study.title}
        </Link>
      </h3>
      <p className="mt-2 font-mono text-label uppercase text-ink/40">{study.date}</p>
      <p className="mt-5 text-body text-ink">{study.finding}</p>
      <p className="mt-4 text-small body-dim-light">
        <span className="font-semibold">{study.lang === 'FR' ? 'Échantillon.' : 'Sample.'}</span>{' '}
        {study.sample}
      </p>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-small">
        <Link href={`/blog/${study.slug}`} className="font-semibold text-green-700 underline">
          {study.lang === 'FR' ? 'Lire l’étude et la méthode' : 'Read the study and method'}
        </Link>
        {study.datasets.map((data) => (
          <a key={data.href} href={data.href} className="text-green-700 underline">
            {data.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function ResearchPage() {
  const latest = STUDIES[0];
  return (
    <>
      <StructuredData data={researchJsonLd} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Research', path: '/research' },
        ])}
      />

      <PageHero
        eyebrow="AfriShield Research"
        title="How African businesses appear in AI answers, measured"
        blurb="Original studies of who Google and AI assistants show, recommend and cite when someone searches for an African business. Methods published, limits stated, data open."
      />

      <Section tone="light">
        <Bluf tone="light">
          AfriShield Research publishes the Africa AI Visibility Index, a series of original
          studies measuring how African businesses and organisations appear in Google results and
          in answers from ChatGPT, Perplexity and Gemini. Since August 2026 it has measured 30
          Cameroonian organisations, 7 hospitality businesses in four countries and 9 searches in
          five cities. Datasets are open under CC BY 4.0, and a new study is released each month.
        </Bluf>

        <div className="mt-12 border-l-4 border-green-600 pl-6">
          <p className="eyebrow-light">Latest finding · {latest.date}</p>
          <p className="h3 mt-3 max-w-[48ch]">{latest.finding}</p>
          <p className="mt-3 text-small body-dim-light">
            From the{' '}
            <Link href={`/blog/${latest.slug}`} className="text-green-700 underline">
              {latest.title}
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section tone="light" className="pt-0">
        <SectionHeader
          eyebrow="Studies"
          tone="light"
          title="Every study, newest first"
          blurb="Each one links to its full method, its limits and its raw data."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {STUDIES.map((study) => (
            <StudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="How we work"
          tone="dark"
          title="The rules every study follows"
          blurb="Research is only worth citing if its method holds up. These are the commitments behind every release."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((item) => (
            <article key={item.title} className="card-dark">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-4 text-small body-dim">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Coming next"
          tone="light"
          title="The next two releases"
          blurb="Planned, not promised: a study ships when its data is complete and checked."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {UPCOMING.map((item) => (
            <article key={item.title} className="border border-ink/10 bg-white p-7">
              <p className="font-mono text-label uppercase text-green-700">{item.month}</p>
              <h3 className="h3 mt-3">{item.title}</h3>
              <p className="mt-4 text-small body-dim-light">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-light">How to cite</p>
            <h2 className="h2 mt-5">Use the data, credit the source</h2>
            <p className="mt-6 text-body body-dim-light">
              All AfriShield Research datasets are published under the{' '}
              <a href="https://creativecommons.org/licenses/by/4.0/" className="text-green-700 underline">
                Creative Commons Attribution 4.0
              </a>{' '}
              licence. You may reuse, quote and republish them, including commercially, as long as
              you name the source.
            </p>
            <p className="mt-5 border border-ink/10 bg-white p-5 font-mono text-small text-ink">
              AfriShield Research (2026). <em>[Study title]</em>. Africa AI Visibility Index.
              AfriShield AI. https://afrishieldai.com/research
            </p>
          </div>
          <div>
            <p className="eyebrow-light">For journalists and researchers</p>
            <h2 className="h2 mt-5">Ask for a cut of the data</h2>
            <p className="mt-6 text-body body-dim-light">
              We can share the underlying figures ahead of a release, run the same grid on a
              market or sector you are covering, or walk through the method. Every organisation
              we measure can also ask for its own result and challenge it; we check, and correct
              what is wrong.
            </p>
            <p className="mt-5 text-body body-dim-light">
              Write to <a href="mailto:benji@afrishieldai.com" className="text-green-700 underline">benji@afrishieldai.com</a>.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="light" className="pt-0">
        <div className="border-t border-ink/10 pt-10">
          <p className="eyebrow-light">Market guide, not independent research</p>
          <h2 className="h3 mt-4">
            <Link href="/blog/top-geo-ai-seo-agencies-africa-2026" className="hover:text-green-700">
              Top GEO and AI search agencies in Africa (2026)
            </Link>
          </h2>
          <p className="mt-4 max-w-[70ch] text-small body-dim-light">
            A guide to evaluating Generative Engine Optimisation providers serving African
            businesses, with a provider matrix. AfriShield AI is one of the providers compared, so
            we list it here separately from the studies above, which measure organisations we have
            no stake in.
          </p>
        </div>
      </Section>

      <CtaDrop
        eyebrow="Your own score"
        title="Find out how your business scores"
        body="The same checks our studies run, applied to your website: what Google and AI assistants can read, what they cite instead, and what to fix first. A thirty-minute call, and we will tell you if it is not worth doing yet."
      />
    </>
  );
}
