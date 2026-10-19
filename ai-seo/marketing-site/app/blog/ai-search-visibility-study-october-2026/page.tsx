import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('ai-search-visibility-study-october-2026')!;

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

// Wave 2 of a repeating study, so the Dataset node lists BOTH waves as
// distributions. An answer engine comparing the two should not have to guess
// that they belong to the same series.
const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Who AI recommends when someone searches for an African business — wave 2 (October 2026)',
  description:
    'Page-one ownership of Google search results for "best {service} in {city}" across five African cities, classified by whether the business’s own website, an aggregator/OTA, media, or UGC was surfaced. Wave 2 of a repeating study, compared against the August 2026 baseline.',
  creator: { '@type': 'Organization', name: 'AfriShield AI', url: SITE_URL },
  dateCreated: '2026-10-17',
  datePublished: post.published,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  distribution: [
    {
      '@type': 'DataDownload',
      name: 'Wave 2 — October 2026',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/ai-visibility-study-2026-10.json`,
    },
    {
      '@type': 'DataDownload',
      name: 'Wave 1 — August 2026',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/ai-visibility-study-2026-08.json`,
    },
  ],
  measurementTechnique: 'Google organic SERP retrieved via the Firecrawl search API with country-level location targeting',
  variableMeasured: [
    'Own-website share of page-one organic results',
    'Aggregator share of page-one organic results',
    'Whether the first organic result belongs to an aggregator',
  ],
};

const TOC = [
  { id: 'answer', label: 'The short version' },
  { id: 'crack', label: 'The crack: one operator took position one' },
  { id: 'what-they-did', label: 'What that operator actually did' },
  { id: 'unchanged', label: 'What did not budge' },
  { id: 'numbers', label: 'All the numbers, both waves' },
  { id: 'cannot-measure', label: 'What we could not measure this time' },
  { id: 'what-to-do', label: 'What to take from this' },
  { id: 'method', label: 'Method and limits' },
];

const FAQ = [
  {
    q: 'Can an African business outrank Booking.com and TripAdvisor on Google?',
    a: 'Yes, though it is still the exception. In our October 2026 re-run of nine searches across five African cities, one locally-owned operator — Safari Soles Tours in Arusha, Tanzania — held the number-one organic position for "best safari operator in Arusha", displacing the directory that held that spot in August. In the other four hospitality searches, an aggregator was still number one. So it is possible, and it happened once out of five.',
  },
  {
    q: 'Did the aggregators lose ground between August and October 2026?',
    a: 'A little. Across five hospitality searches, businesses’ own websites rose from 23% of page-one organic results to 28%, and the share of searches where an aggregator held position one fell from 100% to 80%. Those are small movements over seven weeks on a nine-search sample, so we report them as a direction to watch rather than a trend.',
  },
  {
    q: 'Is a professional services firm still more likely to own its own search result than a hotel?',
    a: 'Yes, by roughly double. In October, accounting firms’ own websites were 62% of page-one organic results, against 28% for hotels and safari operators. The gap narrowed from 45 percentage points in August to 34, but the structural finding held: the sector you are in still predicts your odds more than anything you do.',
  },
  {
    q: 'Does publishing an llms.txt file make you rank higher on Google?',
    a: 'No. Google has not said it reads llms.txt, and we have no evidence it affects Google rankings. We mention it because the one operator that beat the directories in our sample also publishes one and names the AI crawlers explicitly in its robots.txt — the same posture, not a proven cause. Treat it as a signal about how that business thinks, not a ranking trick.',
  },
  {
    q: 'Why could you not report AI Overview presence in this wave?',
    a: 'Because we had to change instrument. Wave 1 used the DataForSEO SERP API, which captured AI Overview presence on all nine searches. That account has no balance and our sanctioned replacement had insufficient credit, so wave 2 ran on Firecrawl, which returns organic results but not SERP features. Share-of-page-one figures are comparable between the waves; the AI Overview metric is simply dark for October, and we would rather say so than quietly drop the row.',
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
          In August we ran nine searches across five African cities and found that in{' '}
          <strong>every single</strong> hotel or safari search, the number-one organic result
          belonged to an aggregator — never to the business itself. We re-ran the same nine
          searches seven weeks later. This time one did not: a locally-owned operator in{' '}
          <strong>Arusha took position one</strong>, displacing the directory that held it in
          August. Across hospitality, businesses&rsquo; own sites rose from{' '}
          <strong>23% to 28%</strong> of page one. Professional services slipped from 68% to 62%,
          so the gap between the two sectors narrowed from 45 points to 34. Both datasets are
          published below.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Seven weeks ago we wrote about a lodge owner outside Arusha typing their own trade into
            a search box at 11pm and finding everybody except themselves. Review sites, booking
            platforms, a &ldquo;top 20 operators&rdquo; listicle written on another continent.
          </p>
          <p>
            We said we would re-run the searches rather than let the finding calcify into a
            talking point. So we did, on 17 October, with the same nine queries in the same five
            cities.
          </p>
          <p>
            Most of it came back the same, which is its own kind of answer. One thing did not.
          </p>
        </Scene>

        <h2 id="crack">The crack: one operator took position one</h2>

        <p>
          In August, the number-one organic result for{' '}
          <em>best safari operator in Arusha</em> was <strong>yourafricansafari.com</strong> — a
          directory. In October, it was <strong>safarisolestours.com</strong>: Safari Soles Tours,
          a locally-owned operator in Arusha itself.
        </p>

        <p>
          That is one search out of five. It is not a revolution and we are not going to dress it
          up as one. But it is the first time in this study that a local African business has held
          the top organic spot in a hospitality search, and it is worth more than the five
          percentage points of aggregate movement that came with it, because it demonstrates the
          thing the August data could only imply: <strong>the wall is not structural.</strong>{' '}
          Somebody climbed it.
        </p>

        <h2 id="what-they-did">What that operator actually did</h2>

        <p>
          We went and read their site, because &ldquo;a local business won&rdquo; is only
          interesting if you can say how. Here is what is on it, all of it visible to anyone:
        </p>

        <ul>
          <li>
            A title tag that says who, what and where —{' '}
            <em>Safari Soles Tours | Tanzania Safaris &amp; Tours</em> — and a meta description of
            a sensible length underneath it.
          </li>
          <li>
            An <strong>FAQ block on the homepage</strong> answering seven real questions: what is
            included, how booking works, whether you need insurance, how safe it is.
          </li>
          <li>
            A section headed <strong>&ldquo;Your Tanzanian safari in numbers&rdquo;</strong> —
            summit success rate, over 100 sample itineraries, guaranteed departures, review
            ratios. Figures, stated plainly, on the page.
          </li>
          <li>
            <code>Organization</code>, <code>Person</code> and <code>Article</code> structured data
            in the page source.
          </li>
          <li>
            Third-party corroboration they point at themselves, including a Trustpilot profile, and
            a flat statement of identity: &ldquo;100% locally owned, middle-men free&hellip; a
            trusted licensed company.&rdquo;
          </li>
          <li>
            A real <code>llms.txt</code> at the root — served as <code>text/plain</code>, with
            sectioned links to their tours, Kilimanjaro pages and travel information.
          </li>
          <li>
            A <code>robots.txt</code> that names <code>GPTBot</code>, <code>ChatGPT-User</code>,{' '}
            <code>OAI-SearchBot</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code> and{' '}
            <code>Claude-SearchBot</code> explicitly.
          </li>
        </ul>

        <p>
          Now the caveat, and it matters more than the list. <strong>None of this proves
          causation.</strong> Google has never said it reads <code>llms.txt</code>, and we have no
          evidence that file moved a Google ranking. We cannot tell you Safari Soles took position
          one <em>because</em> of any single item above, and anyone who tells you otherwise is
          selling something.
        </p>

        <p>
          What we can tell you is narrower and, we think, more useful: the one business in our
          sample that beat the directories is also the one that treated machine readers as an
          audience. Same posture, not a proven mechanism. A correlation with a sample size of one.
        </p>

        <p>
          It is also the mirror image of what we found the same week in Cameroon. In a separate
          study of 30 of that country&rsquo;s largest organisations —{' '}
          <a href="/blog/barometre-ia-cameroun-2026">published here in French</a> — not one of the
          26 with a working website publishes an <code>llms.txt</code>, and not one names a single
          AI crawler. Those are the two things the Arusha operator did. Across an entire national
          economy, nobody had done either.
        </p>

        <h2 id="unchanged">What did not budge</h2>

        <p>
          <strong>TripAdvisor still owns the hotel searches.</strong> It was the number-one organic
          result in all four city-hotel queries — Nairobi, Lagos, Accra and Johannesburg. The
          Arusha crack was in safari, not in hotels, and that distinction is probably the whole
          story: a safari is a bespoke trip people research, a hotel room is inventory people
          compare.
        </p>

        <p>
          <strong>The sector still predicts more than the effort.</strong> Accounting firms&rsquo;
          own sites were 62% of page one; hotels and safari operators managed 28%. A professional
          services firm remains roughly twice as likely to own its own result as a hospitality
          business, in the same country, on the same day.
        </p>

        <p>
          <strong>Lagos and Accra hotels are still the worst in the sample.</strong> One own-site
          result in ten, each. In Accra, positions 1, 2, 7, 9 and 10 were all aggregators, and
          position 8 was an Instagram profile. If you run a hotel in either city, your website is
          not competing for page one right now; it is competing for position 8 against somebody
          else&rsquo;s social account.
        </p>

        <h2 id="numbers">All the numbers, both waves</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>August 2026</th>
                <th>October 2026</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hospitality — own-site share of page one</td>
                <td>23% (11 of 48)</td>
                <td><strong>28%</strong> (14 of 50)</td>
                <td>+5 pp</td>
              </tr>
              <tr>
                <td>Professional services — own-site share</td>
                <td>68% (25 of 37)</td>
                <td><strong>62%</strong> (25 of 40)</td>
                <td>&minus;6 pp</td>
              </tr>
              <tr>
                <td>All nine searches — own-site share</td>
                <td>42% (36 of 85)</td>
                <td><strong>43%</strong> (39 of 90)</td>
                <td>+1 pp</td>
              </tr>
              <tr>
                <td>Hospitality searches where an aggregator held position one</td>
                <td>100% (5 of 5)</td>
                <td><strong>80%</strong> (4 of 5)</td>
                <td>&minus;20 pp</td>
              </tr>
              <tr>
                <td>Gap between the two sectors</td>
                <td>45 pp</td>
                <td><strong>34 pp</strong></td>
                <td>narrowed 11 pp</td>
              </tr>
              <tr>
                <td>Searches returning a Google AI element</td>
                <td>100% (9 of 9)</td>
                <td>not measurable</td>
                <td>see below</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Two waves is two data points. The convergence between the sectors is the interesting
          line in that table and also the one we are least willing to call a trend — ask us again
          in wave 3.
        </p>

        <h2 id="cannot-measure">What we could not measure this time</h2>

        <p>
          The instrument changed between waves, and that costs us a row.
        </p>

        <p>
          Wave 1 ran on the DataForSEO SERP API, which reports whether Google served an AI
          Overview. That account has no balance, our sanctioned replacement had insufficient
          credit, and so wave 2 ran on Firecrawl — which returns organic results reliably but does
          not return SERP features.
        </p>

        <p>
          So: the share-of-page-one figures above are comparable across both waves, because they
          are counted the same way from the same kind of result list.{' '}
          <strong>AI Overview presence is not measurable in October.</strong> In August it was 9
          out of 9. We are not going to carry that number forward as though we re-measured it, and
          we are not going to delete the row and hope nobody notices. It is dark, and restoring an
          instrument that captures it is the first job before wave 3.
        </p>

        <p>
          One more honest wrinkle: wave 1 returned 9 to 10 organic results per query and wave 2
          returned 10 uniformly. Percentages compare cleanly. Raw counts do not.
        </p>

        <h2 id="what-to-do">What to take from this</h2>

        <p>
          If you run a hospitality business, the useful news is that the top spot in a safari
          search was winnable by a locally-owned operator with a well-built site, in the same
          month that four of five such searches still went to a platform. That is not a promise.
          It is an existence proof, which is more than we had in August.
        </p>

        <p>
          The things the winner had in place are the same unglamorous list we keep publishing:
          state your facts on your own site, answer real questions in plain language, put numbers
          on the page, add structured data, keep one consistent identity, and let the crawlers
          read you. That is{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a> and{' '}
          <a href="/geo-services">GEO work</a>, and none of it requires a platform&rsquo;s
          permission.
        </p>

        <p>
          If you are in professional services, you are still starting from double the odds — and
          still drifted backwards six points this wave while nobody was watching. Page one is not
          a possession. For the specifics by sector, our guides on{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">getting a hotel cited by ChatGPT</a>,{' '}
          <a href="/blog/how-to-reduce-ota-commission">reducing OTA commission</a> and{' '}
          <a href="/blog/small-business-seo">small business SEO</a> go further than this study
          does.
        </p>

        <h2 id="method">Method and limits</h2>

        <p>
          We collected wave 2 on 17 October 2026: nine searches of the form{' '}
          <em>best {`{service}`} in {`{city}`}, {`{country}`}</em> — boutique hotels and safari
          operators, plus accounting firms — in Nairobi, Lagos, Accra, Johannesburg and Arusha,
          retrieved through the Firecrawl search API with country-level location targeting. Every
          page-one organic result was hand-classified as the business&rsquo;s own website, an
          aggregator, media, or user-generated content, on the same rules as wave 1.
        </p>

        <p>
          The limits, stated plainly. It is nine searches, not nine hundred. Desktop, English,
          country-level geolocation. The instrument changed between waves, which is disclosed in
          the dataset itself and costs us the AI Overview row. Search results move, which is the
          entire reason this page carries a date and a wave number.
        </p>

        <p>
          Both datasets are published for anyone to check or reproduce:{' '}
          <a href="/data/ai-visibility-study-2026-10.json">wave 2 (October 2026)</a> and{' '}
          <a href="/data/ai-visibility-study-2026-08.json">wave 1 (August 2026)</a>. The original
          write-up is{' '}
          <a href="/blog/ai-search-visibility-study">here</a>. Wave 3 runs in roughly seven weeks,
          same nine queries.
        </p>

        <p>
          If you quote these figures, please cite them as: <em>AfriShield AI, &ldquo;Who does AI
          recommend when someone searches for an African business?&rdquo;, wave 2, October
          2026</em>, with a link to this page.
        </p>
      </PostShell>
    </>
  );
}
