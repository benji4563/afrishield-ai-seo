import Link from 'next/link';
import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-get-a-safari-company-recommended-by-ai')!;

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
  { id: 'how-ai-chooses', label: 'How an AI assistant chooses a safari company' },
  { id: 'credentials', label: 'Publish the credentials a traveller would check' },
  { id: 'itineraries', label: 'Turn every itinerary into a quotable page' },
  { id: 'third-party', label: 'Be named where the assistant looks' },
  { id: 'crawlers-schema', label: 'Let the crawlers in and label the trip' },
  { id: 'arusha', label: 'What the operator who beat the directories did' },
  { id: 'test-panel', label: 'How to test whether AI recommends you' },
  { id: 'not-yet', label: 'When this is not worth doing yet' },
];

const FAQ = [
  {
    q: 'Can a safari company pay ChatGPT to recommend it?',
    a: 'There is no published way to pay for a place inside an AI assistant’s answer. OpenAI says ChatGPT search surfaces sites its OAI-SearchBot crawler can reach, and ads, where they run, are a separate placement. A safari company earns a recommendation by being easy to read and easy to verify across the web.',
  },
  {
    q: 'How do I check if ChatGPT recommends my safari company?',
    a: 'Ask ChatGPT, Perplexity and Gemini the questions your travellers ask, such as the best family safari operator for the Maasai Mara or a licensed Kenyan operator for a seven-day trip. Record which companies are named and whether your details are correct. Repeat the same questions every month so the results are comparable.',
  },
  {
    q: 'Does a TRA licence help a safari company get recommended by AI?',
    a: 'There is no evidence that an AI assistant ranks operators by licence status. A licence number published on your site is still useful, because travellers ask assistants which operators are licensed and the Tourism Regulatory Authority advises them to check. A fact the assistant can verify is a fact it can repeat.',
  },
  {
    q: 'Do Tripadvisor and SafariBookings reviews affect AI recommendations?',
    a: 'They are among the sources AI assistants read when they answer safari questions, so they shape what is said about an operator. Recent, detailed reviews that name parks, guides and trip lengths give an assistant specific material to repeat. A profile with a handful of old reviews gives it very little.',
  },
  {
    q: 'What structured data should a safari itinerary page use?',
    a: 'Schema.org defines a TouristTrip type for a created itinerary of visits to places of interest, with an itinerary property that takes a list of places. A safari operator can mark up each itinerary page with TouristTrip, name the parks and lodges in order, and link the trip to the company as its provider.',
  },
  {
    q: 'How long does it take before AI assistants start naming my safari company?',
    a: 'There is no fixed timeline. OpenAI says changes to robots.txt take about 24 hours to reach its search systems, but being named in answers depends on reviews, directory listings and mentions that build over months. Treat it as a monthly measurement rather than a launch date.',
  },
];

const TEST_STEPS = [
  {
    name: 'Write ten traveller questions',
    text: 'Write ten questions a real traveller would ask an AI assistant about your trips, naming parks, trip lengths, budgets and traveller types, for example a seven-day Maasai Mara and Amboseli safari for a family with young children.',
  },
  {
    name: 'Ask three assistants',
    text: 'Ask each question in ChatGPT, Perplexity and Gemini in a fresh session, and save the full answer and the sources each assistant cites.',
  },
  {
    name: 'Record who is named',
    text: 'For every answer, record which operators are named, in what order, and whether any directory or listicle is cited instead of an operator.',
  },
  {
    name: 'Check your own details',
    text: 'Where your company is named, check that the parks, prices, licence and contact details the assistant states are correct, and note every error.',
  },
  {
    name: 'Repeat monthly',
    text: 'Run the same ten questions on the same day each month, change one thing at a time on your site and listings, and compare the results.',
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
        data={howToJsonLd(TEST_STEPS, 'How to test whether AI assistants recommend your safari company')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To get a safari company recommended by AI assistants such as ChatGPT, Perplexity
          and Gemini, make it the easiest operator to verify. For a Kenyan operator that means
          five things: publish your Tourism Regulatory Authority licence and KATO membership
          on your site, give every itinerary its own page with parks, days and an itemised
          price, collect detailed reviews on the platforms assistants read, allow AI search
          crawlers in <code>robots.txt</code>, and test what the assistants say every month.
          No one can buy or guarantee a recommendation.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Wanjiru runs a six-vehicle safari company from a small office in Karen, Nairobi.
            Her guides are certified, her drivers know the Mara by heart, and her reviews are
            good. Last month a family in Munich, planning a week in Kenya, asked ChatGPT for a
            reliable operator for the Maasai Mara and Amboseli.
          </p>
          <p>
            The assistant named three companies. None of them was hers. One of them was not a
            company at all, but a &ldquo;top 15 safari operators&rdquo; list written on another
            continent, by someone who had very possibly seen a lion only on a screensaver.
          </p>
          <p>
            Wanjiru&rsquo;s own homepage described her trips as &ldquo;unforgettable&rdquo; four
            times. It did not say which parks, how many days, what the price included, or that
            her company was licensed. The assistant had nothing on it to repeat.
          </p>
        </Scene>

        <p>
          We have written about the mechanics of AI visibility for accommodation in{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">
            how to get a hotel cited by ChatGPT
          </a>
          . A safari operator has a different problem. A hotel is a fixed place an assistant can
          look up. A safari is a multi-day product, sold months ahead, to someone abroad who is
          about to send a large deposit to a company they have never met. The assistant is not
          really being asked &ldquo;where&rdquo;. It is being asked &ldquo;who can I trust&rdquo;.
          This guide is about answering that question in a form a machine can read.
        </p>

        <h2 id="how-ai-chooses">How an AI assistant chooses a safari company</h2>

        <p>
          An AI assistant recommends the safari companies that its sources name most clearly and
          consistently, and that its own web search can confirm. For current, commercial
          questions, ChatGPT searches the web through its OAI-SearchBot crawler and search
          partners; OpenAI says that sites which block OAI-SearchBot will not be shown in ChatGPT
          search answers. What the assistant then says is assembled from the pages it finds:
          operator sites, review platforms, directories and articles.
        </p>

        <p>
          For safari questions, those sources are crowded. In our{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">
            October 2026 study of hospitality searches in five African cities
          </a>
          , aggregators held most of page one: businesses&rsquo; own sites made up 28 percent of
          the results, up from 23 percent in August. An assistant that reads those results reads
          the directories first. The operator&rsquo;s job is to give it something specific and
          checkable that the directory does not have.
        </p>

        <h2 id="credentials">Publish the credentials a traveller would check</h2>

        <p>
          A Kenyan safari company should publish its Tourism Regulatory Authority licence number,
          its KATO membership and its guides&rsquo; certification on its own site, in plain text.
          These are the facts a careful traveller is told to check, and the facts an assistant
          needs if it is going to call an operator reliable.
        </p>

        <p>
          The regulator spells them out. The Tourism Regulatory Authority licenses tour and
          safari operators under the Tourism Act, 2011, and licences are renewed every year. Its
          own guidance to travellers lists a current TRA licence as mandatory, membership of the
          Kenya Association of Tour Operators (KATO) as a voluntary trust signal, and the Kenya
          Professional Safari Guides Association&rsquo;s Bronze, Silver and Gold levels as the way
          to judge a guide. It also tells travellers to check the KATO members directory, because
          a company that is not listed there is not a current member, whatever its website says.
        </p>

        <p>
          Most operator sites bury these facts in a footer logo or leave them out entirely. Put
          them on an &ldquo;About&rdquo; or &ldquo;Licences&rdquo; page as sentences: the licence
          number and its year, the KATO listing with a link to it, and the guides by name and
          level. A logo is a picture. A sentence is something an assistant can quote. And the
          word &ldquo;unforgettable&rdquo;, however many times it appears, verifies nothing.
        </p>

        <h2 id="itineraries">Turn every itinerary into a quotable page</h2>

        <p>
          Every safari itinerary should have its own page that states the parks, the number of
          days, the lodges or camps, the season it suits, and what the price includes. Travellers
          ask assistants specific questions, such as a five-day Maasai Mara safari in July or a
          family trip to Amboseli and Tsavo, and an assistant can only match a specific page to
          a specific question.
        </p>

        <p>
          A single &ldquo;Kenya Safaris&rdquo; page with twelve trips in a carousel answers none
          of those questions well. Twelve pages, each one opening with a two-sentence summary of
          the trip, answer twelve. The summary should read like the answer to a question:
          &ldquo;A seven-day Kenya family safari covering the Maasai Mara and Amboseli, staying in
          tented camps, with a private vehicle and a Silver-level guide.&rdquo; Then the day-by-day
          detail, then an itemised price: park fees, accommodation, transport, meals and guide.
          The regulator itself tells travellers to expect an itemised quote, so publishing one is
          not giving away a secret. It is showing the assistant you already pass the test.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What the traveller asks the assistant</th>
                <th>What the assistant needs to find</th>
                <th>Where it should live</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Is this safari company licensed?</td>
                <td>A TRA licence number and a KATO listing it can confirm</td>
                <td>A licences page on your site, plus the KATO directory</td>
              </tr>
              <tr>
                <td>Best seven-day Mara and Amboseli trip for a family</td>
                <td>A page describing exactly that trip, with days and parks</td>
                <td>One itinerary page per trip, not a carousel</td>
              </tr>
              <tr>
                <td>What is included in the price?</td>
                <td>An itemised list: park fees, lodging, transport, meals, guide</td>
                <td>Each itinerary page, in text rather than a PDF</td>
              </tr>
              <tr>
                <td>Are their guides any good?</td>
                <td>Named guides with KPSGA levels, and reviews that mention them</td>
                <td>A guides page, Tripadvisor, SafariBookings, Google</td>
              </tr>
              <tr>
                <td>Who do other travellers recommend?</td>
                <td>Recent, detailed third-party reviews and mentions</td>
                <td>
                  Review platforms and travel articles, which you cannot write yourself, however
                  tempting the thought
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="third-party">Be named where the assistant looks</h2>

        <p>
          A safari company gets recommended by AI when sources other than its own website name it
          specifically, because assistants weigh what others say about an operator above what the
          operator says about itself. For Kenyan operators those sources are review platforms such
          as Tripadvisor and SafariBookings, the KATO directory, the company&rsquo;s Google
          Business Profile, and any travel articles that mention it by name.
        </p>

        <p>
          The useful review is not the five-star one-liner. It is the review that names the park,
          the guide, the length of the trip and what happened, because that is the material an
          assistant can repeat when it is asked something specific. Ask past guests for that kind
          of review after every trip, on the platform they already use. The approach to asking,
          and to never filtering who gets asked, is the same one we set out in{' '}
          <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
            our guide to getting more Google reviews
          </a>
          ; only the platforms change.
        </p>

        <p>
          Consistency matters as much as volume. The company name, Nairobi address, phone number
          and licence details should be identical on your site, your Google Business Profile, the
          KATO directory and every review platform. An assistant that finds two spellings and
          three phone numbers has to guess which is right, and it usually guesses the directory.
          This is the same problem that sends bookings to the platforms in the first place, which
          we cover in{' '}
          <a href="/blog/how-to-reduce-ota-commission">how to reduce OTA commission</a>.
        </p>

        <h2 id="crawlers-schema">Let the crawlers in and label the trip</h2>

        <p>
          A safari company&rsquo;s site must allow AI search crawlers in its{' '}
          <code>robots.txt</code>, or the assistants that rely on them cannot cite it. OpenAI
          documents OAI-SearchBot as the crawler that surfaces websites in ChatGPT&rsquo;s search
          features, separate from GPTBot, which collects training data, and says a robots.txt
          change takes about 24 hours to reach its search systems. An operator can allow one and
          block the other.
        </p>

        <p>
          Many tourism sites block these crawlers without meaning to, through a security plugin
          or a template someone installed years ago. Open <code>yoursite.com/robots.txt</code> and
          read it. If it says <code>Disallow: /</code> under a crawler you want, that is the
          cheapest fix in this article.
        </p>

        <p>
          Then label the trips. Schema.org defines a <code>TouristTrip</code> type for &ldquo;a
          created itinerary of visits to one or more places of interest&rdquo;, with an{' '}
          <code>itinerary</code> property that takes a list of places. Marking up each itinerary
          page with it, the parks in order and the company as provider, tells a machine reader in
          code what the page already says in words. If structured data is new to you,{' '}
          <a href="/blog/what-is-schema-markup">what schema markup is</a> covers the basics.
        </p>

        <h2 id="arusha">What the operator who beat the directories did</h2>

        <p>
          The one safari operator that beat the directories in our October 2026 re-run had a
          site built for machine readers: a homepage FAQ, plain figures about its trips,
          structured data, linked third-party reviews and explicit access for AI crawlers. It
          was a locally owned operator in Arusha, and it took the number-one organic result for
          &ldquo;best safari operator in Arusha&rdquo;, a position a directory had held in August.
        </p>

        <p>
          In detail, its homepage FAQ answered seven real questions, it linked to its own
          Trustpilot profile, it published an <code>llms.txt</code> file, and its{' '}
          <code>robots.txt</code> named the major AI crawlers explicitly. It was the first time
          in our study that a local African business held the top organic spot in a hospitality
          search. We were careful to say then, and repeat now, that this does not
          prove any one of those things caused the result. It is a sample of one. But the one
          operator that beat the directories was also the one that treated machine readers as an
          audience, and the list above is a reasonable description of what that looks like.
        </p>

        <h2 id="test-panel">How to test whether AI recommends you</h2>

        <p>
          To test whether AI assistants recommend your safari company, ask ChatGPT, Perplexity and
          Gemini the same ten traveller questions every month and record who they name. It takes
          about an hour, costs nothing, and is the only measurement that tells you whether
          anything in this article is working.
        </p>

        <ol>
          <li>
            <strong>Write ten traveller questions.</strong> Name parks, trip lengths, budgets and
            traveller types. &ldquo;Best safari company in Kenya&rdquo; is too vague to be useful.
          </li>
          <li>
            <strong>Ask three assistants.</strong> Use a fresh session for each, and save the
            answer and the sources cited.
          </li>
          <li>
            <strong>Record who is named.</strong> Note the order, and whether a directory or
            listicle is named instead of an operator.
          </li>
          <li>
            <strong>Check your own details.</strong> Where you appear, check the parks, prices,
            licence and contact details. Errors are worth fixing at the source they came from.
          </li>
          <li>
            <strong>Repeat monthly.</strong> Same questions, same day, one change at a time.
          </li>
        </ol>

        <p>
          If you would rather see a baseline before doing any of this, our{' '}
          <a href="/ai-visibility-check">AI visibility check</a> runs a version of the same
          panel. Our page on{' '}
          <a href="/for-safari-operators">AI search and SEO for safari operators</a> sets out the
          full service, and{' '}
          <Link href="/ai-seo/nairobi">AI SEO in Nairobi</Link> covers operators based in Karen,
          Westlands and the rest of the city. For the general version of this problem, see{' '}
          <a href="/blog/how-to-rank-on-chatgpt">how to rank on ChatGPT</a>.
        </p>

        <h2 id="not-yet">When this is not worth doing yet</h2>

        <p>
          AI visibility work is not worth paying for yet if a safari company does not have a
          current TRA licence, has fewer than a handful of genuine reviews, or sells mainly through
          a few agents who never send travellers to its website. In each case the assistant has
          nothing to verify, and no amount of markup will change that.
        </p>

        <p>
          Fix the licence first; it is a legal requirement before it is a marketing one. Then ask
          every guest from the last season for a detailed review. If most of your bookings come
          through two European agents who are happy with you, protecting that relationship is
          worth more this year than an AI citation. We sell this work in Nairobi, so this section
          is against our interest. Our tiers start at USD 150 a month, about KES 19,500, and we
          would still rather you spent the first month&rsquo;s budget on a licence renewal than on
          us. The cost bands for this kind of work in Kenya are in{' '}
          <a href="/blog/seo-agency-nairobi-cost">what an SEO agency in Nairobi costs</a>.
        </p>

        <p>
          Wanjiru made the changes over a quiet month in April: a licences page, nine itinerary
          pages with itemised prices, a <code>robots.txt</code> that let the crawlers in, and a
          polite request for detailed reviews after every trip. Nobody can promise her when an
          assistant will start naming her company. What changed is that the next time one is
          asked about a family trip to the Mara, it will find a licensed operator, a matching
          itinerary and a price it can check. She kept one &ldquo;unforgettable&rdquo; on the
          homepage, for sentimental reasons.
        </p>

        <p>
          The operator-and-property version of this work — both segments under one umbrella —
          is <a href="/for-tourism-hospitality">hospitality SEO across Africa</a>.
        </p>
      </PostShell>
    </>
  );
}
