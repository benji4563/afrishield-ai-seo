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

const post = getPost('best-seo-agency-in-nigeria')!;

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
  { id: 'no-single-best', label: 'Why there is no single best SEO agency in Nigeria' },
  { id: 'first-page', label: 'What the first page of results actually shows' },
  { id: 'directories', label: 'How Clutch orders its Nigerian list' },
  { id: 'which-kind', label: 'Which kind of agency suits which business' },
  { id: 'location', label: 'Lagos, Abuja and the rest of the country' },
  { id: 'five-checks', label: 'Five checks that work in Nigeria' },
  { id: 'dont-hire', label: 'When not to hire an agency yet' },
  { id: 'before-signing', label: 'Questions to ask before signing' },
];

const FAQ = [
  {
    q: 'Which is the best SEO agency in Nigeria?',
    a: 'No single agency is best for every Nigerian business, and no independent body ranks them. The best agency for you is the one whose past work matches your type of business, whose own site ranks for the service it sells, and who promises work rather than a position. A bank, a Lekki property developer and a clinic in Wuse need three different agencies.',
  },
  {
    q: 'How much does an SEO agency in Nigeria charge?',
    a: 'Most Nigerian small and mid-sized businesses buying real agency SEO pay between about ₦300,000 and ₦700,000 a month in 2026, with freelancers quoting from about ₦50,000 and competitive sectors starting near ₦1,000,000. Enterprise-focused agencies set higher minimums; Clutch lists one Lagos agency at a minimum project size of $10,000 or more.',
  },
  {
    q: 'Are Clutch rankings of Nigerian SEO companies reliable?',
    a: 'They are useful as a starting list, but the default order is not a pure quality ranking. Clutch states that sponsored providers appear first, then verified providers, then everyone else by Clutch Rank. Most Nigerian firms on its SEO list also carry only a handful of reviews, so read the reviews themselves rather than the position.',
  },
  {
    q: 'Can an SEO agency in Nigeria guarantee first-page rankings?',
    a: 'No. Google states that no one can guarantee a number one ranking on Google, and advises business owners to find someone else if an SEO guarantees first place. A credible agency commits to the work it will do each month and the measures it will report.',
  },
  {
    q: 'How do I check that a Nigerian SEO agency is a registered business?',
    a: 'Search its name on the Corporate Affairs Commission public search at icrp.cac.gov.ng. The CAC company search lets anyone verify a business’s registration status. If the name on the invoice and the registered name do not match, ask why before paying.',
  },
  {
    q: 'Should a Nigerian business hire a local SEO agency or a foreign one?',
    a: 'A local agency usually suits a business whose customers are in Nigeria, because it understands local search habits, naira budgets and WhatsApp as an enquiry channel. A foreign agency can suit an exporter or a business selling abroad, but it will usually quote in dollars, so the naira cost moves with the exchange rate.',
  },
];

const SHORTLIST_STEPS = [
  {
    name: 'Write down the job before you search',
    text: 'Decide whether you need local visibility in one city, national rankings for an online shop, or content that wins business-to-business leads. Each is a different specialist, and the word best only means something once the job is named.',
  },
  {
    name: 'Run the search from your own city and phone',
    text: 'Search for the service you need from the city where your customers are, on a phone. Note which agencies appear for the service they sell and which only appear in lists about themselves.',
  },
  {
    name: 'Read the directory past the sponsored rows',
    text: 'On Clutch, sponsored providers appear first by default. Scroll past them, open the reviews of each firm you are considering and note how many reviews it has and how recent they are.',
  },
  {
    name: 'Check the registration on the CAC public search',
    text: 'Search each agency on the Corporate Affairs Commission public search and confirm the registered name matches the name on the proposal and the invoice.',
  },
  {
    name: 'Ask for two named references and a sample report',
    text: 'Ask for two clients you can contact and one real monthly report with client details removed. An agency that has done the work can send both within a day.',
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
        data={howToJsonLd(SHORTLIST_STEPS, 'How to shortlist an SEO agency in Nigeria')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          There is no single <strong>best SEO agency in Nigeria</strong>. The best one for your
          business is the agency whose past work matches your kind of business, whose own site
          ranks for the service it sells, whose registration you can confirm on the Corporate
          Affairs Commission search, and who promises work rather than a ranking. Most Nigerian
          small businesses buying real agency SEO pay about{' '}
          <strong>₦300,000 to ₦700,000 a month</strong> in 2026. Google states that no one can
          guarantee a number one ranking, so a guarantee is a reason to keep looking.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Tunde runs a logistics company in Ikeja. His trucks are good, his drivers are
            better, and his website has not brought in a customer since it was built. So he
            searched &ldquo;best SEO agency in Nigeria&rdquo; and set aside the afternoon to
            choose one.
          </p>
          <p>
            The first page gave him ten results. Six were agencies describing themselves as
            the best, the number one or the leading SEO company in Nigeria. Two were lists of
            the best agencies, each written by an agency on the list. Two were directories.
          </p>
          <p>
            By the end of the afternoon Tunde knew that Nigeria has an unusual number of
            number ones. He did not know which one to call.
          </p>
        </Scene>

        <p>
          This guide is for Tunde, and for anyone else who has had that afternoon. It does not
          crown a winner, because nobody independent has done the measuring. It shows what the
          results page is made of, which kind of agency suits which kind of Nigerian business,
          and five checks that sort the good from the merely confident. The naira prices are
          set out in full in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>
          , so this page only summarises them.
        </p>

        <h2 id="no-single-best">Why there is no single best SEO agency in Nigeria</h2>

        <p>
          There is no single best SEO agency in Nigeria because no independent body measures
          agency results, and because a bank, an online shop and a clinic need different
          kinds of SEO work. Every &ldquo;best&rdquo; list on the first page was published by
          a company that sells SEO or sells listings.
        </p>

        <p>
          That is not a scandal; it is how the market works everywhere. It does mean the
          useful question is not &ldquo;who is best?&rdquo; but &ldquo;who is best at the job
          I have?&rdquo;. A Lekki real-estate developer competing for &ldquo;3 bedroom flat
          in Lekki&rdquo; needs content and links. A dental clinic in Wuse needs its Google
          Business Profile, reviews and one consistent address. A fintech selling across
          Africa needs technical work and content in several markets. One agency can be
          excellent at the first and ordinary at the third, and its homepage will still say
          it is the best at all of them.
        </p>

        <h2 id="first-page">What the first page of results actually shows</h2>

        <p>
          The first page for &ldquo;best SEO agency in Nigeria&rdquo; is made of agency
          homepages that call themselves the best, lists written by agencies that appear on
          those lists, and directories. We ran the search from a Nigerian location on 4
          November 2026 and sorted the top ten results by what kind of page each one was.
          Results differ by device and city, so treat this as a snapshot rather than a
          permanent order.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Type of result</th>
                <th>How many of the top 10</th>
                <th>What it claims</th>
                <th>What it can tell you</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Agency homepage or service page</td>
                <td>6</td>
                <td>
                  Best, number one, leading or top-notch SEO company in Nigeria or Lagos. One
                  offers guaranteed rankings or free work.
                </td>
                <td>
                  That the agency ranks for this search, which is real evidence of one
                  skill. The adjective is not evidence of anything.
                </td>
              </tr>
              <tr>
                <td>&ldquo;Best agencies&rdquo; list</td>
                <td>2</td>
                <td>
                  A ranked list of Nigerian agencies. One author places their own firm first;
                  the other places themselves third and says so openly.
                </td>
                <td>
                  Useful names and, in the better one, honest limits for each firm. Read the
                  author line before the list.
                </td>
              </tr>
              <tr>
                <td>Directory (Clutch, The Manifest)</td>
                <td>2</td>
                <td>Top or recommended SEO companies in Nigeria</td>
                <td>
                  Who has a profile, plus client reviews where they exist. Both snippets name
                  the same firms in the same order.
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The better of the two lists is worth reading in full, precisely because its author
          discloses their own place on it and marks where each firm is the wrong choice. That
          is the standard to hold every comparison to, including{' '}
          <a href="/blog/top-geo-ai-seo-agencies-africa-2026">
            our own guide to GEO and AI search agencies in Africa
          </a>
          . For the record, AfriShield does not appear on this first page at all, which we
          mention before anyone else gets the pleasure.
        </p>

        <h2 id="directories">How Clutch orders its Nigerian list</h2>

        <p>
          Clutch orders its directories with sponsored providers first, then verified
          providers, then everyone else by its own Clutch Rank score, so the top of a page is
          partly a paid position. Clutch states this on its methodology page, and says that
          sponsorship changes the default position without changing a firm&rsquo;s underlying
          score.
        </p>

        <p>
          Its Nigerian SEO directory listed 374 companies when we checked on 4 November 2026.
          Among the Nigerian firms on that page that showed a review count, 27 of 28 had five
          reviews or fewer, and one had 22. A five-star average built on one review is the
          opinion of one client, which is worth exactly one client&rsquo;s opinion. None of
          this makes the directory useless. It makes it a list of names to check, not a
          verdict, and the checks below are things a directory cannot do for you.
        </p>

        <h2 id="which-kind">Which kind of agency suits which business</h2>

        <p>
          The right kind of SEO agency in Nigeria depends on the size of your business and
          where your customers are: a freelancer for one location, a specialist SEO agency for
          a growing business, and a full-service agency for a large brand with several
          channels. The naira figures below are the ranges set out in our{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">Nigerian SEO cost guide</a>, drawn
          from what Nigerian providers publish.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Kind of provider</th>
                <th>Suits</th>
                <th>Typical monthly cost</th>
                <th>Watch for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Freelancer</td>
                <td>One shop, clinic or office in one city</td>
                <td>About ₦50,000 to ₦250,000</td>
                <td>
                  Below about ₦150,000 there are rarely enough hours to fix the site and
                  publish anything.
                </td>
              </tr>
              <tr>
                <td>Specialist SEO agency</td>
                <td>Growing SMEs, online shops, startups</td>
                <td>About ₦300,000 to ₦700,000</td>
                <td>Ask how many pages publish each month, not how many keywords are tracked.</td>
              </tr>
              <tr>
                <td>Full-service digital agency</td>
                <td>Large brands, banks, regulated sectors</td>
                <td>₦1,000,000 and above; some set project minimums in dollars</td>
                <td>SEO is one service among many, so ask who does it day to day.</td>
              </tr>
              <tr>
                <td>Foreign agency</td>
                <td>Exporters and businesses selling abroad</td>
                <td>Usually quoted in dollars</td>
                <td>The naira cost moves with the exchange rate, every month.</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          One line from Google&rsquo;s own guidance on hiring an SEO is worth borrowing here:
          a good SEO should be interested in you and should ask what makes your business
          unique and how your customers find you. An agency that quotes before asking a single
          question about your customers is quoting for a business it has imagined.
        </p>

        <h2 id="location">Lagos, Abuja and the rest of the country</h2>

        <p>
          Most Nigerian SEO agencies are based in Lagos, but an agency does not need to be in
          your city to rank you there; it needs to understand that city&rsquo;s search
          habits. On the Clutch Nigeria list, the large majority of firms give Lagos addresses,
          with smaller numbers in Abuja, Port Harcourt, Ibadan, Uyo and Warri.
        </p>

        <p>
          Local knowledge matters most for map results. Someone searching from Lekki and
          someone searching from Ikeja see different Google Maps results for the same words,
          because distance is one of the three factors Google uses for local ranking. An
          agency working on a Lagos business should be able to explain that without notes;
          the detail is in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            how to appear on Google Maps in Lagos
          </a>
          . If your business does not appear on Maps at all, start with{' '}
          <a href="/blog/why-is-my-business-not-showing-on-google-maps-nigeria">
            the diagnosis by symptom
          </a>{' '}
          before paying anyone. Our own approach for each city is on the{' '}
          <Link href="/ai-seo/lagos">AI SEO in Lagos</Link> and{' '}
          <Link href="/ai-seo/abuja">AI SEO in Abuja</Link> pages.
        </p>

        <h2 id="five-checks">Five checks that work in Nigeria</h2>

        <p>
          You can shortlist SEO agencies in Nigeria with five checks that need no meeting:
          name the job, search from your own city, read the directory past the sponsored rows,
          confirm the registration with the Corporate Affairs Commission, and ask for
          references and a sample report. Run them in the same order for every agency so the
          comparison is fair.
        </p>

        <ol>
          <li>
            <strong>Name the job first.</strong> Local visibility, national e-commerce or
            business-to-business content. Write it down before you search, or every pitch will
            fit.
          </li>
          <li>
            <strong>Search from your own city, on a phone.</strong> An agency that ranks for
            the service it sells has done at least one version of the job. One that appears
            only in lists about itself is asking you to take the rest on faith.
          </li>
          <li>
            <strong>Read past the sponsored rows.</strong> Open the reviews, check how many
            there are and how recent they are, and ignore the position.
          </li>
          <li>
            <strong>Check the registration.</strong> Search the agency on the Corporate
            Affairs Commission public search at icrp.cac.gov.ng. The CAC says the search lets
            anyone verify a company&rsquo;s registration status. It takes two minutes and
            catches more than you would hope.
          </li>
          <li>
            <strong>Ask for two references and a sample report.</strong> Named clients you can
            call, and one real monthly report with the client details removed.
          </li>
        </ol>

        <p>
          Then apply the guarantee test. Google&rsquo;s guidance is plain: no one can
          guarantee a number one ranking on Google, and anyone who claims a special
          relationship with Google deserves caution. An offer of guaranteed rankings or free
          work is a promise about something nobody outside Google controls. The same checks,
          applied to a neighbouring market with cedi prices and a tax line, are in{' '}
          <a href="/blog/seo-company-accra-ghana">how to choose an SEO company in Accra</a>.
        </p>

        <h2 id="dont-hire">When not to hire an agency yet</h2>

        <p>
          A Nigerian business should not hire an SEO agency yet if it needs customers within
          two months, if its customers do not search for what it sells, or if a properly
          completed Google Business Profile would solve most of the problem for free.
        </p>

        <ul>
          <li>
            <strong>You need customers in weeks.</strong> That is a paid-search job, and the
            trade-offs are in <a href="/blog/seo-vs-google-ads">SEO vs Google Ads</a>. If your
            customers find you by scrolling rather than searching, read{' '}
            <a href="/blog/digital-marketing-vs-seo-for-nigerian-businesses">
              digital marketing vs SEO for Nigerian businesses
            </a>{' '}
            first.
          </li>
          <li>
            <strong>You cannot commit past month four.</strong> The early months are close to
            flat for almost everyone, as{' '}
            <a href="/blog/how-long-does-seo-take-in-nigeria">
              how long SEO takes in Nigeria
            </a>{' '}
            explains. Stopping at month three pays for the slow part and leaves before the
            return.
          </li>
          <li>
            <strong>A free profile would do.</strong> A single-location salon, pharmacy or
            clinic often gets most of the benefit from a complete Google Business Profile and
            steady reviews. The method is in{' '}
            <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
              how to get more Google reviews in Nigeria
            </a>
            .
          </li>
        </ul>

        <p>
          We sell SEO in Lagos and Abuja, so this section costs us money. It is still the right
          advice, and a client who started too early does not stay a client for long. Our
          prices, if you want to compare them with the ranges above, are on the{' '}
          <Link href="/pricing">pricing page</Link>.
        </p>

        <h2 id="before-signing">Questions to ask before signing</h2>

        <p>
          Before signing with an SEO agency in Nigeria, ask what publishes each month, who does
          the work, who owns your Google accounts, how WhatsApp enquiries are counted, which
          exchange rate applies to any dollar price, and what you keep if you leave.
        </p>

        <ol>
          <li>What experience do you have in my industry, and in my city?</li>
          <li>How many pages publish each month, and who writes them?</li>
          <li>
            Will our Google Business Profile and Search Console stay owned by us, with you
            added as a manager? The correct answer is yes. Google also advises giving an SEO
            only read access to Search Console during an audit.
          </li>
          <li>
            How will WhatsApp and phone enquiries be counted? If only website forms are
            measured, most Nigerian results will be invisible.
          </li>
          <li>
            Is the price in naira? If it is in dollars, which rate applies, and when is it
            reviewed?
          </li>
          <li>
            When we stop, what do we keep, and is there a lock-in of twelve months or more?
            The correct answers are everything, and no.
          </li>
        </ol>

        <p>
          Tunde ran his shortlist through the five checks. One agency did not rank for its
          own service, one had a registered name that matched nothing on its proposal, and one
          named the writer for his pages, quoted in naira and sent a sample report before he
          had finished his tea. He signed that one for three months with a review at the end.
          It was not the best SEO agency in Nigeria. It was the best one for a logistics
          company in Ikeja, which was the only title he needed.
        </p>

        <p>
          For what a monthly fee buys page by page, <a href="/case-studies">our case
          studies</a> itemise what shipped on four engagements.
        </p>
      </PostShell>
    </>
  );
}
