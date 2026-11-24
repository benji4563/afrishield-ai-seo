import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('africa-safari-hotel-ai-visibility-index-2026')!;

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

// Pilot edition of a repeating index. Businesses are anonymised in the dataset
// because each audit was prepared for the business itself, not for publication.
const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Africa Safari & Hotel AI Visibility Index — pilot edition (November 2026)',
  description:
    'Search and AI-visibility scores for seven safari operators and hotels in Tanzania, Kenya, Uganda and South Africa, audited individually between 14 September and 14 October 2026: four pillar scores, own-name ranking, commercial searches on page one, and llms.txt status. Businesses are anonymised.',
  creator: { '@type': 'Organization', name: 'AfriShield AI', url: SITE_URL },
  dateCreated: '2026-10-14',
  datePublished: post.published,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  spatialCoverage: ['Tanzania', 'Kenya', 'Uganda', 'South Africa'],
  distribution: [
    {
      '@type': 'DataDownload',
      name: 'Pilot edition — November 2026',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/africa-hospitality-ai-visibility-index-2026-11.json`,
    },
  ],
  measurementTechnique:
    'Individual website audits: served HTML, response headers, robots.txt, sitemaps, JSON-LD and llms.txt inspected per site; live Google searches for brand and commercial phrases; AI assistant answers sampled for three of the seven businesses',
  variableMeasured: [
    'Overall GEO score (0-100)',
    'Technical SEO, On-Page SEO, Off-Page SEO and GEO / AI Readiness scores (0-100)',
    'Google position for the business’s own name',
    'Commercial searches where the business reaches page one',
    'Whether an llms.txt file is published and whether it describes the business',
  ],
};

const TOC = [
  { id: 'answer', label: 'The short version' },
  { id: 'who', label: 'Who we audited' },
  { id: 'name-only', label: 'Found by name, missing by need' },
  { id: 'reviews', label: 'Reviews did not buy visibility' },
  { id: 'llms', label: 'The llms.txt finding' },
  { id: 'numbers', label: 'All seven, side by side' },
  { id: 'what-to-do', label: 'What an operator should do first' },
  { id: 'not-yet', label: 'When this is not your problem' },
  { id: 'method', label: 'Method and limits' },
];

const FAQ = [
  {
    q: 'Do AI assistants recommend African safari operators by name?',
    a: 'Rarely, in our sample. For the three Tanzanian operators where we sampled assistant answers directly, none was named in reply to a question that did not already contain its name. One operator was named in 2 of 9 answers, and both were the question that asked about it directly. The assistants named booking platforms, travel media and a small set of other operators instead.',
  },
  {
    q: 'Why does a safari company rank for its own name but not for the trips it sells?',
    a: 'Because a brand search has almost no competition and a commercial search has a great deal. Five of the seven businesses we audited held position one on Google for their own name, and five of the seven had no commercial search on page one at all. Page one for phrases like Tanzania safari tours is held by booking directories, forums and international tour brands.',
  },
  {
    q: 'Does a high TripAdvisor rating help a lodge or operator appear in AI answers?',
    a: 'Not by itself, on this evidence. The operator with the strongest reputation in our sample, with more than 2,500 TripAdvisor reviews, reached page one for none of the eight commercial searches we checked. Reviews build trust once a traveller has found you. They do not make your own website the page a search engine or an assistant chooses to quote.',
  },
  {
    q: 'Is publishing an llms.txt file enough to be cited by ChatGPT?',
    a: 'No. Four of the seven businesses publish an llms.txt file and none of the four describes the business adequately. One is a plugin default of 34 words, one is a 44 KB automatic export, one lists pages the server then refuses to AI crawlers, and one belongs to a hotel group and does not name the hotel. A file that exists is not the same as a file that says who you are.',
  },
  {
    q: 'What is the average GEO score for safari operators and hotels in this index?',
    a: 'The mean overall GEO score across the seven businesses was 45 out of 100 and the median was 41. Scores ranged from 9, for an operator whose advertised website does not exist, to 73, for an Arusha operator whose site is technically easy for AI crawlers to read. A technically readable site still reached page one for none of its seven commercial searches.',
  },
  {
    q: 'How many businesses are in the index, and is it representative?',
    a: 'Seven: three in Tanzania, two in Kenya, one in Uganda and one in South Africa, audited between 14 September and 14 October 2026. It is a pilot, not a census, and the businesses were not chosen at random. We publish the anonymised dataset so the figures can be checked, and we describe them as what we found in seven audits rather than as a market average.',
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
          We audited seven safari operators and hotels in Tanzania, Kenya, Uganda and South Africa
          between 14 September and 14 October 2026. <strong>Five of the seven rank first on Google
          for their own name. Five of the seven reach page one for none of the trips or rooms
          they actually sell.</strong> The average overall GEO score was <strong>45 out of
          100</strong>. Four publish an <code>llms.txt</code> file for AI assistants, and not one
          of the four describes the business properly. Where we sampled AI answers directly, no
          operator was named unless the question already contained its name. The anonymised
          dataset is published below.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            A reservations manager in Arusha opens the laptop in the morning and searches for the
            company. There it is, position one, with the logo, the reviews and the map pin.
            Reassuring. The website works.
          </p>
          <p>
            Then a traveller in Hamburg, who has never heard of the company, asks an assistant for
            a five-day Serengeti safari with a good local operator. The traveller gets three names
            and a booking platform. The company is not one of the three.
          </p>
          <p>
            Both searches happened on the same morning. Only one of them was ever going to bring
            new business.
          </p>
        </Scene>

        <h2 id="who">Who we audited</h2>

        <p>
          The index covers seven hospitality businesses in four countries: three operators in
          northern Tanzania (two in Arusha, one in Moshi), two in Nairobi, one historic hotel in
          Kampala and one four-star hotel in Cape Town. Each was audited individually, on its own
          live website, between 14 September and 14 October 2026.
        </p>

        <p>
          Every business received its own scored report. We have anonymised them here, because a
          report written for an owner is not the same thing as a league table written for the
          public, and nobody agreed to be in a league table. The figures are exact. The names are
          left out.
        </p>

        <p>
          This is the hospitality counterpart to the{' '}
          <a href="/blog/barometre-ia-cameroun-2026">Baromètre we ran on 30 Cameroonian
          organisations</a>, and a closer look at the pattern our{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">five-city search study</a> found
          from the outside: in hotel and safari searches, the business itself is rarely the page
          that gets shown.
        </p>

        <h2 id="name-only">Found by name, missing by need</h2>

        <p>
          Five of the seven businesses rank first on Google for their own name, and five of the
          seven have no commercial search on page one at all. Those are mostly the same
          businesses. Being found by people who already know you is close to universal. Being
          found by people who need what you sell is the exception.
        </p>

        <p>
          The details are worth a moment. One Arusha operator sells a five-day Serengeti trip
          with a published price and a six-day Machame climb with a published price. It reached
          the top 30 for neither. On two of its seven searches a Reddit thread was among the
          winners, which is a humbling thing to lose to when you own the vehicles.
        </p>

        <p>
          The other Arusha operator had one commercial result we could find at all. It was in
          position 44, on page five, where the only regular visitors are SEO consultants taking
          screenshots.
        </p>

        <p>
          The two businesses that fell outside the pattern are instructive in opposite
          directions. A Nairobi operator ranked second for its own name, behind a booking
          directory&rsquo;s profile of that same operator. And a second Nairobi operator had no
          result of its own of any kind, because the web address printed on its trade-association
          listing is not registered. Every traveller who clicks through to check the company is
          real lands on an error page.
        </p>

        <p>
          Only the two hotels reached page one for anything beyond their names: the Kampala hotel
          once, in position eight, and the Cape Town hotel twice. On most of the remaining hotel
          searches the winning pages were booking platforms selling those same hotels&rsquo; rooms. The{' '}
          <a href="/blog/how-to-reduce-ota-commission">commission on those bookings</a> is the
          price of not owning the result.
        </p>

        <h2 id="reviews">Reviews did not buy visibility</h2>

        <p>
          The strongest reputation in the sample produced the same commercial visibility as the
          weakest: none. The Moshi operator has more than 2,500 TripAdvisor reviews at 4.9, sits
          in the national operators&rsquo; association, and scored 74 out of 100 for off-page
          authority, the highest single pillar score in the index. Websites it owns appeared on
          page one for none of the eight commercial searches we checked.
        </p>

        <p>
          The same operator owns hotels and camps. None of them has a page on its main website,
          and none appeared in any hotel or lodge answer we sampled. Owning the beds and renting
          the visibility is an expensive way round.
        </p>

        <p>
          When we asked assistants directly, that operator was named in 2 of 9 answers. Both were
          the question that asked about it by name. For the questions a new customer would ask —
          best Kilimanjaro operator, what a climb costs — the assistants named other companies.
          A second operator was named in 0 of 2 buyer questions, and a third was cited by neither
          ChatGPT nor Perplexity.
        </p>

        <p>
          The point is not that reviews are worthless. They close the sale once somebody has
          found you. They simply live on someone else&rsquo;s domain, and the page that gets
          quoted is the page that holds the facts. Our guide to{' '}
          <a href="/blog/how-to-get-a-safari-company-recommended-by-ai">getting a safari company
          recommended by AI</a> covers how to bring those facts home.
        </p>

        <h2 id="llms">The llms.txt finding</h2>

        <p>
          Four of the seven businesses publish an <code>llms.txt</code> file, and none of the
          four uses it to say who they are. That is a more interesting result than the one we
          found in Cameroon, where none of 26 working sites had the file at all. In East African
          tourism the file has arrived. It arrived by plugin.
        </p>

        <ul>
          <li>
            One is the default output of an SEO plugin: <strong>34 words and a single
            link</strong>, to the sitemap.
          </li>
          <li>
            One is a <strong>44 KB automatic export</strong> that describes a Nairobi tour
            company, in full, as &ldquo;African Safaris&rdquo;.
          </li>
          <li>
            One is served correctly, but <strong>the pages it lists were refused to AI
            crawlers</strong>. The assistant is handed a table of contents and then turned away
            at the door.
          </li>
          <li>
            One belongs to a hotel group and <strong>does not name the hotel</strong> we audited.
          </li>
        </ul>

        <p>
          An <code>llms.txt</code> is a plain-text introduction: who you are, where you operate,
          what you sell, what it costs, how to book. Written by hand it takes an afternoon.
          Generated by a plugin it takes no time and says nothing, which is a fair trade as far
          as it goes. We should add the usual caution: no assistant has promised to read the
          file, and it has never been shown to move a Google ranking. It is cheap, it is
          sensible, and four out of four businesses got it wrong.
        </p>

        <h2 id="numbers">All seven, side by side</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Overall GEO</th>
                <th>Own name</th>
                <th>Commercial searches on page one</th>
                <th>llms.txt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Safari operator, Arusha (A)</td>
                <td><strong>73</strong></td>
                <td>#1</td>
                <td>0 of 7</td>
                <td>Plugin default, 34 words</td>
              </tr>
              <tr>
                <td>Safari operator, Arusha (B)</td>
                <td><strong>60</strong></td>
                <td>#1</td>
                <td>0 of 5 (best: #44)</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Kilimanjaro and safari operator, Moshi</td>
                <td><strong>53</strong></td>
                <td>#1</td>
                <td>0 of 8</td>
                <td>Published, pages blocked to AI crawlers</td>
              </tr>
              <tr>
                <td>Tour operator, Nairobi</td>
                <td><strong>41</strong></td>
                <td>#2, behind a directory</td>
                <td>0 of 2</td>
                <td>44 KB automatic export</td>
              </tr>
              <tr>
                <td>Four-star hotel, Cape Town</td>
                <td><strong>41</strong></td>
                <td>#1</td>
                <td>2 of 5 (best: #3)</td>
                <td>Group file, hotel not named</td>
              </tr>
              <tr>
                <td>City-centre hotel, Kampala</td>
                <td><strong>39</strong></td>
                <td>#1</td>
                <td>1 of 6 (#8)</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Safari operator, Nairobi (no working website)</td>
                <td><strong>9</strong></td>
                <td>Directories only</td>
                <td>0 of 3</td>
                <td>No website</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Across the seven, the mean overall GEO score was <strong>45 out of 100</strong> and the
          median <strong>41</strong>. By pillar, the averages were 39 for Technical SEO, 38 for
          On-Page, 45 for Off-Page and 39 for GEO and AI readiness. Off-page is the strongest
          pillar, which fits everything above: these businesses are better known than they are
          findable.
        </p>

        <p>
          Note the top row. A score of 73 means the site is easy for an AI crawler to read. It
          does not mean anybody has given the crawler a reason to choose it. Readable and
          recommended are two different jobs, and most of the industry is still selling the
          first one as if it were the second.
        </p>

        <h2 id="what-to-do">What an operator should do first</h2>

        <p>
          Publish your prices and itineraries on your own domain before doing anything else. In
          one Nairobi search we checked, all ten competing results showed a price. The operator
          we audited showed none, for a tour featured on its own homepage. An assistant asked
          what a half-day park tour costs can only quote the pages that say.
        </p>

        <ol>
          <li>
            <strong>Make sure the address you advertise works.</strong> Check the link on your
            association listing, your directory profiles and your email signature. One business
            in seven failed this.
          </li>
          <li>
            <strong>State the facts in the page and in structured data</strong>: business type,
            address, phone, price range, ratings. The Kampala hotel&rsquo;s structured data
            described it as an organisation with a logo and three social links, and nothing else. See{' '}
            <a href="/blog/how-to-get-hotel-cited-by-chatgpt">how to get a hotel cited by
            ChatGPT</a>.
          </li>
          <li>
            <strong>Give every product its own page</strong>, including the lodges and camps you
            own. A property with no page cannot be the answer to a question about where to stay.
          </li>
          <li>
            <strong>Write the <code>llms.txt</code> by hand</strong>, and check your server is
            not refusing AI crawlers the pages it lists.
          </li>
          <li>
            <strong>Then test it the way a stranger would</strong>: ask the assistants for what
            you sell, without your name in the question. Our{' '}
            <a href="/ai-visibility-check">free AI-visibility check</a> runs that test for you.
          </li>
        </ol>

        <p>
          That list is the core of the work we do{' '}
          <a href="/for-safari-operators">for safari operators</a> and{' '}
          <a href="/for-lodges-hotels">for lodges and hotels</a>, and none of the seven
          businesses needed a new website to do it. Operators in Kenya can start from the{' '}
          <a href="/ai-seo/nairobi">Nairobi page</a>; operators in Arusha and Moshi, from our guide
          to <a href="/blog/seo-for-safari-companies-in-tanzania">SEO for safari companies in
          Tanzania</a>.
        </p>

        <h2 id="not-yet">When this is not your problem</h2>

        <p>
          If nearly all your bookings come through agents, repeat guests and overseas tour
          brands, AI visibility is not your first problem and you should not pay anybody to fix
          it yet. A ground handler who sells only to the trade has no need to be named to the
          traveller in Hamburg. The agent already knows where to find you.
        </p>

        <p>
          The same goes for a business with no capacity to take more direct enquiries. Visibility
          sends strangers to your inbox. If nobody answers within a day, you have paid to
          disappoint people faster.
        </p>

        <p>
          It becomes your problem when you want direct bookings, when you are paying commission
          on guests who would have found you anyway, or when the answer a traveller receives
          names three of your competitors and you would like to be the fourth.
        </p>

        <h2 id="method">Method and limits</h2>

        <p>
          Each business was audited individually on its live website, and the scores describe the
          audit date only. Technical and On-Page scores were calculated check by check from
          served HTML, response headers, <code>robots.txt</code>, sitemaps and structured data.
          Off-Page is an estimate from public listings, without a backlink database.
        </p>

        <p>
          Rankings come from live Google searches for each business&rsquo;s name and for the
          commercial phrases that describe what it sells. Search depth varied by audit, from the
          top 10 to the top 50, so &ldquo;page one&rdquo; here means the top ten organic results.
          Results vary by location and by day.
        </p>

        <p>
          AI answers were sampled directly for three of the seven businesses, all in Tanzania.
          For the other four, AI readiness was judged from the files the site publishes. We have
          kept those two kinds of evidence apart in the text above, and you should too.
        </p>

        <p>
          Seven businesses is a pilot. They were not chosen at random, and four countries do not
          make a continent, whatever our title is implying. The anonymised dataset is here:{' '}
          <a href="/data/africa-hospitality-ai-visibility-index-2026-11.json">
            Africa Safari &amp; Hotel AI Visibility Index, pilot edition (JSON)
          </a>
          . The next edition will use one fixed set of traveller questions, put to the same
          assistants for every business, so the results can be compared directly from one
          quarter to the next.
        </p>
      </PostShell>
    </>
  );
}
