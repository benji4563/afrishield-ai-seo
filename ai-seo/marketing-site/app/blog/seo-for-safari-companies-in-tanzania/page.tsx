import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('seo-for-safari-companies-in-tanzania')!;

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
    images: postOgImages(post),
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: postOgImages(post),
  },
};

const TOC = [
  { id: 'audits', label: 'What our Tanzanian audits found' },
  { id: 'searches', label: 'Which searches a Tanzanian operator can win' },
  { id: 'arusha-moshi', label: 'Arusha and Moshi are different businesses' },
  { id: 'licence', label: 'Put the TALA licence on the website' },
  { id: 'pages', label: 'One page per trip, priced in USD' },
  { id: 'hotels', label: 'Give the lodges and camps their own pages' },
  { id: 'order', label: 'The order of work' },
  { id: 'compare', label: 'What usually gets done, and what works' },
  { id: 'not-yet', label: 'When not to pay for SEO' },
];

const FAQ = [
  {
    q: 'How do safari companies in Tanzania rank on Google?',
    a: 'Most rank only for their own name. In three AfriShield audits of Tanzanian operators in Arusha and Moshi, carried out between September and October 2026, all three held position one for their own name and none reached page one for any of the 20 commercial searches checked. Ranking for what you sell starts with one page per trip, published prices and specific search phrases.',
  },
  {
    q: 'How much does SEO cost for a safari company in Tanzania?',
    a: 'Prices on page one of Google for this topic start at about USD 300 a month from one Arusha agency, checked on 24 November 2026. AfriShield prices its plans at USD 150, 400 or 900 a month across African markets. Ask any provider which searches they will target and how they will report on them before comparing prices.',
  },
  {
    q: 'Should a Tanzanian tour operator show its TALA licence on its website?',
    a: 'Yes. The Tourism Agents (Registration and Licensing) Regulations 2015 already require the licence to be displayed at the business premises and a copy to be shown on each tour vehicle. Stating the licence class and number on the website gives travellers, directories and AI assistants the same proof online, and it costs nothing.',
  },
  {
    q: 'Can a local Arusha operator outrank SafariBookings and TripAdvisor?',
    a: 'For some searches, yes. In AfriShield’s October 2026 re-run of nine hospitality searches, a locally owned Arusha operator took position one for best safari operator in Arusha from the directory that held it in August. Broad searches such as Tanzania safari tours remain held by directories and international brands.',
  },
  {
    q: 'How long does SEO take for a safari website in Tanzania?',
    a: 'Expect several months before specific trip pages reach page one, and longer for competitive phrases. New pages need to be crawled, indexed and linked before they can rank, and results vary by search. Any provider promising page one in a fixed number of weeks is guessing.',
  },
  {
    q: 'Do AI assistants like ChatGPT recommend Tanzanian safari operators?',
    a: 'Rarely, in AfriShield’s sample. For the three Tanzanian operators where assistant answers were sampled, none was named in reply to a question that did not already contain its name. Assistants named booking platforms, travel media and a few other operators, so the same factual pages that help Google also decide AI visibility.',
  },
];

const STEPS = [
  {
    name: 'Check that every advertised web address works',
    text: 'Open the link on your TATO listing, directory profiles, Google Business Profile and email signature. Fix any that do not load your own site.',
  },
  {
    name: 'State the TALA licence on the website',
    text: 'Add the licence class and number, the registered office address and TATO membership, if any, to the About page and the footer.',
  },
  {
    name: 'Publish one page per trip with a USD price',
    text: 'Give every itinerary its own page naming the parks, the number of days, the start point, the season and a per-person price in USD.',
  },
  {
    name: 'Give every lodge and camp you own its own page',
    text: 'Write one page per property with its location, room types, rates and how to book directly.',
  },
  {
    name: 'Write a short llms.txt by hand and open the site to AI crawlers',
    text: 'Describe who you are, where you operate, what you sell and how to book, and check that robots.txt and the firewall do not refuse the pages it lists.',
  },
  {
    name: 'Test the searches a stranger would make',
    text: 'Each month, search Google and ask ChatGPT for the trips you sell without using your company name, and record who is named.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />
      <StructuredData
        data={howToJsonLd(STEPS, 'SEO for a safari company in Tanzania: the order of work')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          SEO for safari companies in Tanzania means being found by travellers who do not yet know
          your name. In our audits of three operators in Arusha and Moshi, <strong>all three ranked
          first on Google for their own name and none reached page one for any of the 20 commercial
          searches we checked</strong>. The work that changes this is specific: one page per
          itinerary with a USD price, your TALA licence stated on the site, pages for the lodges you
          own, and targeting phrases such as a park, a duration and a start point rather than
          &ldquo;Tanzania safari&rdquo;.
        </ShortAnswer>

        <EditorialImage src={post.image!.src} alt={post.image!.alt} priority className="my-10" />

        <Scene>
          <p>
            An operator in Arusha has eleven Land Cruisers, washed every morning whether or not
            anyone is coming, and a website with a gallery of all eleven. The website has a page
            called &ldquo;Tours&rdquo;. On it, every trip is a photograph and a button that says
            &ldquo;Enquire&rdquo;.
          </p>
          <p>
            A couple in Lyon search for a six-day Serengeti and Ngorongoro safari from Arusha. Google
            shows them a booking directory, a Reddit thread and an international tour brand. The
            operator&rsquo;s gallery is excellent. Nobody sees it.
          </p>
          <p>
            Nothing is broken. There is simply no page on the site that answers the question the
            couple typed.
          </p>
        </Scene>

        <h2 id="audits">What our Tanzanian audits found</h2>

        <p>
          Our three Tanzanian audits found the same pattern every time: first for the company name,
          absent for the trips. Two operators were in Arusha and one in Moshi, audited between 14
          September and 14 October 2026, and all three appear anonymised in our{' '}
          <a href="/blog/africa-safari-hotel-ai-visibility-index-2026">Safari &amp; Hotel AI
          Visibility Index</a>, with the dataset published.
        </p>

        <ul>
          <li>
            <strong>Arusha operator A</strong> scored 73 out of 100, the highest in the index. It
            publishes a priced five-day Serengeti trip and a priced six-day Machame climb, and reached
            the top 30 for neither. On two of its seven searches a Reddit thread was among the
            results above it.
          </li>
          <li>
            <strong>Arusha operator B</strong> scored 60. Its best commercial result was position 44,
            on page five, where nobody goes except people writing audits.
          </li>
          <li>
            <strong>The Moshi operator</strong> has more than 2,500 TripAdvisor reviews at 4.9 and the
            strongest off-page score in the index, 74. It reached page one for none of its eight
            commercial searches, and the hotels and camps it owns have no page on its main site.
          </li>
        </ul>

        <p>
          A high technical score did not rescue operator A, and a famous reputation did not rescue
          the Moshi operator. What all three lacked was pages that match what a traveller types.
          That is a content problem, which is good news, because content is the one part of SEO an
          operator controls completely.
        </p>

        <h2 id="searches">Which searches a Tanzanian operator can win</h2>

        <p>
          A Tanzanian operator can win specific searches that name a park, a duration, a route or a
          start point, and should stop chasing &ldquo;Tanzania safari&rdquo; on its own. Page one for
          the broad phrases is held by booking directories, forums and international brands with
          years of links behind them. You will not out-shout them on their phrase. You can be the
          only page that answers a narrower one.
        </p>

        <p>
          Narrow searches are not small searches. A traveller who types &ldquo;6 day Machame route
          price&rdquo; or &ldquo;Ndutu calving safari from Arusha in February&rdquo; has done the
          research already and is choosing a company. That is the buyer every operator wants, and the
          directories rarely have a page written for exactly that trip.
        </p>

        <p>
          There is also proof it can be done here. When we re-ran nine hospitality searches across
          five African cities on 17 October 2026, a locally owned Arusha operator had taken position
          one for &ldquo;best safari operator in Arusha&rdquo; from the directory that held it in
          August. Our{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">October visibility study</a> sets
          out what that operator did. It was one search in five. It was also the first crack in a wall
          that had looked solid.
        </p>

        <p>
          Phrases worth building pages around, for a northern-circuit operator:
        </p>

        <ul>
          <li>Park plus duration: &ldquo;3 day Tarangire and Ngorongoro safari&rdquo;.</li>
          <li>Route plus price: &ldquo;Lemosho route 8 days cost&rdquo;.</li>
          <li>Season plus place: &ldquo;Great Migration safari in July&rdquo;, &ldquo;Ndutu calving season&rdquo;.</li>
          <li>Start point: &ldquo;safari from Arusha&rdquo;, &ldquo;day trip from Moshi&rdquo;, &ldquo;Zanzibar and Serengeti combined&rdquo;.</li>
          <li>Traveller type: &ldquo;family safari Tanzania with teenagers&rdquo;, &ldquo;private Kilimanjaro climb for two&rdquo;.</li>
        </ul>

        <h2 id="arusha-moshi">Arusha and Moshi are different businesses</h2>

        <p>
          Arusha and Moshi operators should target different searches, because they sell different
          trips to different travellers. Arusha is the gateway to the northern circuit: Tarangire,
          Lake Manyara, the Ngorongoro Conservation Area and the Serengeti. Moshi sits at the foot of
          Kilimanjaro and its operators live mostly on climbs, with a safari added after the summit.
          Kilimanjaro International Airport lies between the two towns, so both claim the same
          arriving traveller.
        </p>

        <p>
          For an Arusha operator, the pages that matter are safari itineraries by park and duration,
          and the start point should be stated in the text: pickup in Arusha town, at the airport, or
          at a lodge in Usa River. For a Moshi operator, the pages that matter are one page per
          Kilimanjaro route, each with the number of days, the acclimatisation profile, the park fees
          included or not, and the price.
        </p>

        <p>
          Our Moshi audit shows the cost of skipping this. An operator with thousands of reviews and
          real authority still did not reach page one for climb searches, because its route
          information was not laid out as pages a search engine could match to a question. Its
          reputation lived on TripAdvisor. Its facts lived nowhere in particular.
        </p>

        <h2 id="licence">Put the TALA licence on the website</h2>

        <p>
          A Tanzanian operator should state its TALA licence class and number on its website,
          because the law already requires that proof everywhere else. Under the Tourism Act (Cap.
          65), the{' '}
          <a href="https://procedures.tiseza.go.tz/media/Tourism-Agents-Registration-and-Licensing-Regulations-2015-1.pdf">
            Tourism Agents (Registration and Licensing) Regulations 2015
          </a>{' '}
          require the licence to be displayed in the business premises, a copy to be displayed on
          each tour vehicle, and the operator&rsquo;s name written on both sides of the vehicle. They
          also require a registered office address.
        </p>

        <p>
          So the licence is on the office wall and on every Land Cruiser door, and absent from the
          one place a traveller in Lyon can actually see. Travellers ask about it, too: Tanzania safari
          groups on Facebook and the Kilimanjaro community on Reddit both carry threads asking how to
          check that an operator is licensed, and the
          Ministry of Natural Resources and Tourism keeps a tour-operator register on its website
          with a field for the licence number.
        </p>

        <p>
          Put three facts on the About page and in the footer: the licence class and number, the
          registered office address, and membership of the Tanzania Association of Tour Operators
          (TATO), founded in 1983, if you hold it. An assistant deciding whether to name you looks for
          facts it can verify. A licence number is the most verifiable fact a Tanzanian operator has,
          and it is currently painted on a vehicle.
        </p>

        <h2 id="pages">One page per trip, priced in USD</h2>

        <p>
          Every itinerary needs its own page with the parks, the days, the start point, the season and
          a per-person price in USD, written in text. A single &ldquo;Tours&rdquo; page with thumbnail
          cards gives Google one page to rank for everything, which in practice means nothing.
        </p>

        <p>
          Price is the field operators most often hold back, for understandable reasons: group size,
          season and lodge choice all move it. Publish a &ldquo;from&rdquo; price anyway, with the
          assumptions beside it: two people sharing, mid-range lodges, park fees included. A traveller
          asking an assistant what a five-day Serengeti safari costs can only be given numbers that
          somebody published. If yours are not published, a competitor&rsquo;s will be quoted
          instead.
        </p>

        <p>
          Our earlier guide on{' '}
          <a href="/blog/how-to-get-a-safari-company-recommended-by-ai">getting a safari company
          recommended by AI</a> covers the itinerary page in detail, including the structured data to
          label it. It was written for Kenyan operators, but the page anatomy is the same on the
          Tanzanian side of the border. Only the licence changes.
        </p>

        <h2 id="hotels">Give the lodges and camps their own pages</h2>

        <p>
          An operator that owns lodges or camps should give each property its own page on the main
          site, with location, room types, rates and a direct booking route. The Moshi operator in our
          index owns hotels and camps, and none of them appeared in any hotel or lodge answer we
          sampled. A property without a page cannot be the answer to a question about where to stay.
        </p>

        <p>
          This matters twice in northern Tanzania, where a traveller often books the safari first and
          the beds second. If the operator&rsquo;s own camp has no page, the traveller finds it on a
          booking platform instead, and the operator pays{' '}
          <a href="/blog/how-to-reduce-ota-commission">commission to an OTA</a> on a guest it was
          already driving around. Our guide to{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">getting a hotel cited by ChatGPT</a>{' '}
          covers what each property page should contain.
        </p>

        <h2 id="order">The order of work</h2>

        <p>
          The order of work for a Tanzanian safari company is: fix broken addresses, state the
          licence, build trip pages, build property pages, open the site to AI crawlers, then test.
          Most operators start with a redesign, which is the most expensive way to postpone all six.
        </p>

        <ol>
          <li>
            <strong>Check every advertised web address.</strong> One business in the seven we indexed
            printed an address on its association listing that was not registered at all.
          </li>
          <li>
            <strong>State the TALA licence</strong>, the registered office and any TATO membership on
            the About page and in the footer.
          </li>
          <li>
            <strong>Publish one page per trip</strong> with parks, days, start point, season and a USD
            &ldquo;from&rdquo; price.
          </li>
          <li>
            <strong>Give every lodge and camp you own a page</strong> with rates and direct booking.
          </li>
          <li>
            <strong>Write a short <code>llms.txt</code> by hand</strong> and check that your server
            does not refuse AI crawlers the pages it lists. The Moshi operator&rsquo;s file pointed at
            pages its own server turned away.
          </li>
          <li>
            <strong>Test what a stranger sees.</strong> Search Google and ask ChatGPT for the trips
            you sell, without your company name. Our{' '}
            <a href="/ai-visibility-check">free AI visibility check</a> does this for you.
          </li>
        </ol>

        <p>
          None of the three Tanzanian operators we audited needed a new website to do this. That is
          the core of the work we do{' '}
          <a href="/for-safari-operators">for safari operators</a>, and of the{' '}
          <a href="/research">AfriShield Research</a> index that will measure, edition by edition,
          whether it is working across the region.
        </p>

        <h2 id="compare">What usually gets done, and what works</h2>

        <p>
          The work that moves a Tanzanian safari site is mostly writing, not design or advertising.
          The table below sets the usual spending against what the audits point to.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What operators usually do</th>
                <th>What the audits point to instead</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Redesign the website</td>
                <td>Add pages to the existing site</td>
                <td>All three Tanzanian sites were readable; they lacked pages, not polish</td>
              </tr>
              <tr>
                <td>Target &ldquo;Tanzania safari tours&rdquo;</td>
                <td>Target park, duration, route and start point</td>
                <td>Broad phrases are held by directories and international brands</td>
              </tr>
              <tr>
                <td>One &ldquo;Tours&rdquo; page with cards</td>
                <td>One page per itinerary with a USD price</td>
                <td>A search engine matches questions to pages, not to galleries</td>
              </tr>
              <tr>
                <td>Collect more TripAdvisor reviews</td>
                <td>Keep collecting, and publish the facts on your own domain</td>
                <td>2,500+ reviews did not put the Moshi operator on page one</td>
              </tr>
              <tr>
                <td>Licence on the office wall only</td>
                <td>Licence class and number on the website too</td>
                <td>It is the most checkable fact a Tanzanian operator owns</td>
              </tr>
              <tr>
                <td>Plugin-generated <code>llms.txt</code></td>
                <td>A hand-written one, a page long</td>
                <td>Operator A&rsquo;s plugin file was 34 words and one link</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="not-yet">When not to pay for SEO</h2>

        <p>
          A Tanzanian operator that sells almost entirely through foreign agents and tour brands does
          not need SEO yet and should not pay for it. A ground handler whose clients are travel
          companies in Europe or North America is found through trade fairs, contracts and
          referrals, not through a traveller&rsquo;s search.
        </p>

        <p>
          The same applies if the office cannot answer enquiries quickly. SEO sends strangers with
          questions, usually on WhatsApp and usually at hours that suit Lyon rather than Arusha. If a
          message waits two days for a reply, the traveller has booked elsewhere and the visibility
          was paid for twice.
        </p>

        <p>
          It is worth doing when you want direct bookings, when you pay commission on guests who
          already knew your name, or when your gallery deserves an audience. The eleven Land
          Cruisers, after all, have been ready for some time.
        </p>
      </PostShell>
    </>
  );
}
