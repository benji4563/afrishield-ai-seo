import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('ai-search-visibility-study')!;

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.published,
    modifiedTime: post.modified,
    images: postOgImages(post),
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: postOgImages(post),
  },
};

// Dataset schema — this page publishes original data, so say so in a format a
// machine can lift. Points at the raw JSON in /public/data.
const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Who AI recommends when someone searches for an African business (2026)',
  description:
    'Page-one ownership of Google search and AI answers for "best {service} in {city}" across five African cities, classified by whether the business’s own website, an aggregator/OTA, media, or UGC was surfaced.',
  creator: { '@type': 'Organization', name: 'AfriShield AI', url: SITE_URL },
  dateCreated: '2026-08-28',
  datePublished: post.published,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/ai-visibility-study-2026-08.json`,
    },
  ],
  measurementTechnique: 'Google desktop SERP + AI Overview presence via the DataForSEO SERP API',
  variableMeasured: [
    'Own-website share of page-one organic results',
    'Aggregator share of page-one organic results',
    'Presence of a Google AI answer element',
  ],
};

const TOC = [
  { id: 'answer', label: 'The short version' },
  { id: 'what-we-did', label: 'What we actually did' },
  { id: 'headline', label: 'The headline: it depends what you sell' },
  { id: 'travel', label: 'Travel: you are inside Booking, not on the marquee' },
  { id: 'services', label: 'Professional services: you can still own your name' },
  { id: 'ai-layer', label: 'The AI layer is already the default' },
  { id: 'what-to-do', label: 'What this means for your business' },
  { id: 'method', label: 'Method, sample, and the honest limits' },
];

const FAQ = [
  {
    q: 'When someone searches for a business in an African city, does a local business get named?',
    a: 'It depends on the sector. In our 2026 sample of nine searches across five African cities, travel and hospitality results were dominated by aggregators: a business’s own website was only about 23% of page-one organic results, and in every hotel or safari search the number-one organic result was an aggregator such as TripAdvisor or Booking.com. In professional services (accounting firms), the opposite held — local firms’ own websites were about 68% of page one.',
  },
  {
    q: 'How often does Google show an AI answer for these searches?',
    a: 'On every single query we ran. All nine searches returned at least one Google AI element — an AI Overview and/or AI-generated People-Also-Ask answers. The AI answer layer is not a future scenario for African markets; it is already the default surface.',
  },
  {
    q: 'Why does it matter if aggregators dominate the results?',
    a: 'Because AI assistants and AI Overviews summarise whatever the web says most consistently. If the only pages describing a lodge are Booking.com and TripAdvisor listings, the AI learns the lodge as a line item inside an aggregator, not as a business with its own identity — so it rarely names the lodge directly or links to its own site.',
  },
  {
    q: 'What can a business do about it?',
    a: 'Publish the facts about the business plainly on its own site, add structured data, keep one consistent identity across every listing, and make the site easy for AI crawlers to read. That is the work of answer engine optimization and GEO — covered in our related guides — and it is what moves a business from "listed inside an aggregator" to "named in the answer".',
  },
  {
    q: 'Is this a rigorous academic study?',
    a: 'No, and we would rather say so. It is a transparent pilot of nine real searches, with the raw data published for anyone to check or reproduce. The pattern was consistent enough to report, but the sample is small and limited to desktop, English-language searches with country-level geolocation.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={datasetJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          We ran nine real searches — &ldquo;best {`{service}`} in {`{city}`}&rdquo; — across
          Nairobi, Lagos, Accra, Johannesburg and Arusha, and looked at who Google and its AI
          answers actually named. In travel and hospitality, a business&rsquo;s own website was
          just <strong>23% of page-one organic results</strong>; the other three-quarters were
          online travel agencies, directories, and travel media, and in <strong>every</strong>{' '}
          hotel or safari search the top result was an aggregator, never the business itself. In
          professional services the picture flipped — local accounting firms&rsquo; own sites were{' '}
          <strong>68% of page one</strong>. And on <strong>all nine</strong> searches, Google
          served an AI-generated answer. The raw data is published below.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Picture a lodge owner outside Arusha, doing the thing every business owner eventually
            does at 11pm: typing their own line of work into a search box to see what the internet
            thinks of them. &ldquo;Best safari operator in Arusha.&rdquo;
          </p>
          <p>
            Up comes a tidy answer. Three operators in a map box, then a wall of results — and
            almost all of them belong to somebody else: a review site, a booking platform, a
            &ldquo;top 20 operators&rdquo; listicle written by a company on a different continent.
            Their own website, the one they paid for, is somewhere down the page, wedged between
            two aggregators like the one guest who showed up to the party without an invitation.
          </p>
          <p>
            We wondered how common that actually is. So instead of guessing, we measured it — in
            five cities, across two very different kinds of business. The answer turned out to
            depend enormously on what you sell.
          </p>
        </Scene>

        <h2 id="what-we-did">What we actually did</h2>

        <p>
          We took one plain, high-intent search — <em>best {`{service}`} in {`{city}`}</em> — and
          ran it for two categories across five African cities: <strong>boutique hotels and
          safari operators</strong> (travel and hospitality) and <strong>accounting firms</strong>{' '}
          (professional services), in Nairobi, Lagos, Accra, Johannesburg and Arusha. For each of
          the nine searches we recorded every result on page one and classified it: the
          business&rsquo;s <strong>own website</strong>, an <strong>aggregator</strong> (an OTA,
          directory, or marketplace like Booking.com, TripAdvisor, or Clutch), <strong>media</strong>{' '}
          (a listicle or blog), or <strong>UGC</strong> (Reddit, Instagram, YouTube). We also noted
          Google&rsquo;s own surfaces — the hotel panel, the local map pack, and any AI answer.
        </p>

        <p>
          It is a pilot, not a doctorate. But the pattern was consistent enough to be worth
          writing down, and the whole dataset is{' '}
          <a href="/data/ai-visibility-study-2026-08.json">published as raw JSON</a> so anyone can
          check our arithmetic.
        </p>

        <h2 id="headline">The headline: it depends what you sell</h2>

        <p>
          The single clearest finding is that &ldquo;does the AI name a local business?&rdquo; has
          no universal answer — it splits sharply by sector.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Searches</th>
                <th>Own website&rsquo;s share of page one</th>
                <th>What owned the rest</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Travel &amp; hospitality (hotels, safari)</td>
                <td>5</td>
                <td><strong>23%</strong> (11 of 48 results)</td>
                <td>OTAs, directories, travel media, Google&rsquo;s hotel panel</td>
              </tr>
              <tr>
                <td>Professional services (accounting)</td>
                <td>4</td>
                <td><strong>68%</strong> (25 of 37 results)</td>
                <td>A few directories and &ldquo;Big 4&rdquo; multinationals</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Same country, same search box, same AI — wildly different odds of a local business being
          the thing that gets named, depending only on the trade it is in.
        </p>

        <h2 id="travel">Travel: you are inside Booking, not on the marquee</h2>

        <p>
          For hotels and safari operators, page one belonged to the aggregators. Across the five
          travel searches, the number-one organic result was <strong>always</strong> a review site,
          an OTA, or a directory — TripAdvisor, Booking.com, Trip.com, Airbnb, or a
          &ldquo;boutique hotels&rdquo; aggregator — and never the business&rsquo;s own site. Above
          all of that, Google usually stacked its own hotel-booking panel.
        </p>

        <p>
          The businesses were not absent, exactly. They were present the way a bottle of hot sauce
          is present in a supermarket: on a shelf, in someone else&rsquo;s aisle, under someone
          else&rsquo;s branding. When the AI Overview summarises &ldquo;best boutique hotel in
          Lagos,&rdquo; it is reading Booking and TripAdvisor — so it learns the hotel as an entry
          in their inventory, not as a business with its own voice. That is exactly the mechanism
          behind{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">getting a hotel cited by ChatGPT</a>{' '}
          and the wider problem of{' '}
          <a href="/blog/how-to-reduce-ota-commission">reducing OTA commission</a> — the same
          aggregators that take a cut of the booking also take the citation.
        </p>

        <h2 id="services">Professional services: you can still own your name</h2>

        <p>
          Accounting told the opposite story. Across the four cities, roughly two-thirds of page-one
          results were local firms&rsquo; <em>own</em> websites — Elixir Audits in Accra, MGK
          Consulting and Hamo &amp; Associates in Nairobi, SIAO in Lagos, MMS Group and RAiN in
          Johannesburg. The map pack was full of real local firms, not platforms. The aggregators
          that did appear were the professional-services kind (Clutch, national directories, a
          regulator&rsquo;s list) and the global &ldquo;Big 4,&rdquo; not a booking platform sitting
          between the firm and its customer.
        </p>

        <p>
          The lesson is not &ldquo;accountants have it easy.&rdquo; It is that in a sector without a
          dominant middleman, a clear, well-built own-site can genuinely win the page — which is a
          preview of what travel businesses can claw back if they do the work, and what{' '}
          <a href="/blog/small-business-seo">small business SEO</a> is really for.
        </p>

        <h2 id="ai-layer">The AI layer is already the default</h2>

        <p>
          One number applied to every search regardless of sector: <strong>9 out of 9</strong>.
          Every query we ran returned at least one Google AI element — an AI Overview, or
          AI-written answers inside the People-Also-Ask box. Not the ones we cherry-picked. All of
          them.
        </p>

        <p>
          So the common objection — &ldquo;AI search is a Silicon Valley thing, it hasn&rsquo;t
          reached my market yet&rdquo; — did not survive contact with the data. In Accra, Lagos,
          Nairobi and Johannesburg, Google is already answering these questions with AI before the
          human scrolls to a single blue link. The only open question is whether the answer will
          have heard of your business. That is the whole premise of{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a> and{' '}
          <a href="/blog/how-to-rank-on-chatgpt">ranking on ChatGPT</a>.
        </p>

        <h2 id="what-to-do">What this means for your business</h2>

        <p>
          If you are in travel or hospitality, the takeaway is uncomfortable but useful: winning
          the AI answer is not the same job as being on the OTAs, and doing the first does not
          happen automatically from the second. The moves that shift it are unglamorous and mostly
          free — state your facts plainly on your own site, add structured data, keep one
          consistent name, address and phone everywhere, and let the AI crawlers read you. That is
          precisely the{' '}
          <a href="/geo-services">GEO work</a> this whole site is about.
        </p>

        <p>
          If you are in a professional service, you are starting from a stronger position — but
          &ldquo;on page one&rdquo; and &ldquo;named in the AI answer&rdquo; are still two different
          things, and the second is won by being the clearest, most quotable source on the specific
          question a customer asks.
        </p>

        <h2 id="method">Method, sample, and the honest limits</h2>

        <p>
          We collected the data on 28 August 2026 using the Google desktop SERP (including AI
          Overview presence) via the DataForSEO SERP API, one canonical phrasing per search, with
          country-level geolocation and English language. Each page-one organic result was
          hand-classified into own-site, aggregator, media, or UGC.
        </p>

        <p>
          The limits, stated plainly so nobody has to guess: it is nine searches, not nine hundred.
          It is desktop and English only. Google&rsquo;s AI Overview text is served asynchronously,
          so we recorded whether an AI answer <em>appeared</em> rather than parsing every word it
          cited. And search results move, which is exactly why this page carries a date and will be
          re-run — the{' '}
          <a href="/data/ai-visibility-study-2026-08.json">raw dataset</a> is there so the next
          version can be compared against this one honestly.
        </p>
      </PostShell>
    </>
  );
}
