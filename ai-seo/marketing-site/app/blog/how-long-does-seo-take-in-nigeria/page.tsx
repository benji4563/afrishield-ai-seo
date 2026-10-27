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

const post = getPost('how-long-does-seo-take-in-nigeria')!;

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
  { id: 'the-range', label: 'How long SEO takes in Nigeria' },
  { id: 'three-clocks', label: 'Maps, area searches and city-wide terms' },
  { id: 'month-by-month', label: 'A month-by-month timeline' },
  { id: 'what-slows-it', label: 'What slows SEO down in Nigeria' },
  { id: 'what-speeds-it', label: 'What genuinely speeds it up' },
  { id: 'our-own-numbers', label: 'Our own site, as an honest example' },
  { id: 'budget-the-wait', label: 'Budgeting for the wait, in naira' },
  { id: 'when-not-to-start', label: 'When SEO is the wrong choice this quarter' },
  { id: 'check-progress', label: 'How to check progress each month' },
];

const FAQ = [
  {
    q: 'How long does SEO take to work in Nigeria?',
    a: 'For most Nigerian small businesses, a verified Google Business Profile can start appearing on Google Maps within a few weeks, area-level searches such as a service plus Lekki or Wuse usually move within three to six months, and city-wide or national terms take six to twelve months or longer. These are working ranges, not promises; competition in your category decides where you land.',
  },
  {
    q: 'Can SEO work in one month in Nigeria?',
    a: 'Rarely, and only for very low-competition searches or for a Google Maps listing that has just been verified. Google says crawling a new or changed page can take a few days to a few weeks, so even a perfect page may not be indexed within the first month. Anyone promising page one in 30 days for a competitive Lagos term is promising something Google itself says nobody can guarantee.',
  },
  {
    q: 'Is SEO faster in Nigeria than in the UK or US?',
    a: 'For many local searches it can be, because fewer Nigerian businesses in a given area have a well-built website and an active Google Business Profile. That advantage disappears in crowded categories such as fintech, real estate and law in Lagos, where well-funded competitors already invest in search. The market is not faster everywhere; it is uneven.',
  },
  {
    q: 'How long does it take to get on Google Maps in Nigeria?',
    a: 'Creating a Google Business Profile takes an afternoon. Google says verification reviews take up to five business days, and occasionally longer, and most Nigerian businesses are asked to verify by video. Once verified, the listing can appear for nearby searches quickly, but climbing above established competitors depends on reviews, relevance and distance.',
  },
  {
    q: 'How many months should I pay for SEO before judging it?',
    a: 'Six months is a fair minimum for a Nigerian business starting from a new or neglected website, provided work was published consistently from the first month. Before that point, judge progress by impressions and ranking movement in Google Search Console rather than by enquiries. If impressions are flat after four months of real work, ask hard questions.',
  },
  {
    q: 'Does a .ng domain make SEO faster in Nigeria?',
    a: 'Google describes country-code domains such as .ng as a strong signal that a site is aimed at that country, which can help it appear for Nigerian searches, but it does not make rankings arrive faster on its own. A .com site can still target Nigeria through Nigerian content, a Nigerian address and phone number, and a verified Google Business Profile. Changing an established domain usually costs more time than it saves.',
  },
];

const CHECKS = [
  {
    name: 'Week 1: verify the Google Business Profile and Search Console',
    text: 'Verify the business profile, which Google says can take up to five business days, and add the website to Google Search Console so there is a record of impressions from day one.',
  },
  {
    name: 'Month 1: confirm the important pages are indexed',
    text: 'Use the URL Inspection tool in Search Console to check that the home page and main service pages are indexed. Request indexing once per page; repeating the request does not speed it up.',
  },
  {
    name: 'Month 2: look for Maps actions and area-level impressions',
    text: 'In the Business Profile performance view, look for calls, direction requests and website clicks. In Search Console, look for impressions on searches that name your service and your area.',
  },
  {
    name: 'Month 3 to 4: look for ranking movement, not enquiries',
    text: 'Track the average position for your area-level searches. Movement from page five to page two is real progress even before it produces a call.',
  },
  {
    name: 'Month 6: judge enquiries from search',
    text: 'By month six, area-level searches should be producing some calls, WhatsApp messages or form enquiries. Ask every new customer how they found you and record it.',
  },
  {
    name: 'Month 9 to 12: judge city-wide terms and payback',
    text: 'Check positions for the broader city or national searches, and compare the value of customers won from search against what the work has cost.',
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
        data={howToJsonLd(CHECKS, 'How to check SEO progress month by month for a Nigerian business')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          SEO in Nigeria usually takes <strong>three to six months to move area-level
          searches</strong>, such as a service plus Lekki, Ikeja or Wuse, and six to twelve
          months or longer for city-wide and national terms. A verified Google Business Profile
          is faster: it can start appearing on Google Maps within a few weeks, and Google says
          verification itself takes up to five business days. New websites, crowded Lagos
          categories such as fintech, real estate and law, and work that stops in month three
          all push the timeline out. No one can guarantee a ranking date, and Google says so
          itself.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Tolu runs a physiotherapy clinic in Yaba, Lagos. In March she paid an agency to
            &ldquo;do SEO&rdquo;. In April she searched for physiotherapy in Lagos and could
            not find herself. In May she searched again, on her husband&rsquo;s phone in case
            her own was hiding the results from her. In June she cancelled.
          </p>
          <p>
            What she did not see was that her clinic had started appearing for
            physiotherapy in Yaba in April, and for sports physiotherapy near Akoka in May. She
            was checking the hardest search in the city, the one twelve hospitals and two
            national chains were also chasing, and judging the whole project on it.
          </p>
          <p>
            Nothing was wrong with the clinic or, as it happens, with the work. The question
            she was asking, &ldquo;how long does SEO take&rdquo;, has three different answers
            in Nigeria, and nobody had told her which one applied to which search.
          </p>
        </Scene>

        <p>
          Our general guide to{' '}
          <a href="/blog/how-long-does-seo-take">how long SEO takes</a> gives the
          month-by-month picture for any small business. This post is the Nigerian cut: which
          searches move first here, what slows a Nigerian site down, how to budget the wait in
          naira, and how to tell by month four whether the money is working.
        </p>

        <h2 id="the-range">How long SEO takes in Nigeria</h2>

        <p>
          SEO in Nigeria takes three to six months to produce visible movement on area-level
          searches and six to twelve months or longer on city-wide and national terms, with a
          verified Google Maps listing able to appear within weeks. Those ranges are drawn from
          the work we do and the sites we audit, not from a published study, and they assume
          consistent work from the first month.
        </p>

        <p>
          The range is wide because Nigerian search is uneven. A plumber in Gwarinpa competes
          with a handful of listings, most of them without a website. A fintech in Lagos
          competes with companies that employ entire content teams. Both are &ldquo;doing SEO
          in Nigeria&rdquo;, and their timelines differ by a year. Google states plainly that
          no one can guarantee a number-one ranking, which is worth remembering the next time
          a proposal includes a date.
        </p>

        <h2 id="three-clocks">Maps, area searches and city-wide terms run on different clocks</h2>

        <p>
          Google Maps, area-level searches and city-wide searches move at different speeds,
          so a Nigerian business should judge each one on its own timeline rather than waiting
          for the hardest search to move. Google says local results are mainly based on
          relevance, distance and popularity, which is why a nearby, verified listing can
          appear long before the website ranks for anything broad.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Search type</th>
                <th>Example</th>
                <th>Usual first movement</th>
                <th>What decides it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Maps, nearby</td>
                <td>physiotherapy near me, searched in Yaba</td>
                <td>Weeks after verification</td>
                <td>Verification, correct pin, category, reviews</td>
              </tr>
              <tr>
                <td>Area-level search</td>
                <td>physiotherapy Yaba, dentist in Wuse 2</td>
                <td>Three to six months</td>
                <td>A page written for that area and service</td>
              </tr>
              <tr>
                <td>City-wide search</td>
                <td>physiotherapy clinic Lagos</td>
                <td>Six to twelve months or more</td>
                <td>Content depth, links from other sites, reviews</td>
              </tr>
              <tr>
                <td>National head term</td>
                <td>best physiotherapist in Nigeria</td>
                <td>Twelve months or more, if ever</td>
                <td>
                  Authority, mostly. Also the patience to watch directories outrank you for a
                  while, which is not on any invoice but should be.
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          If the Maps listing is not set up yet, that is the first job, and it is covered step
          by step in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            our guide to appearing on Google Maps in Lagos
          </a>
          .
        </p>

        <h2 id="month-by-month">A month-by-month SEO timeline for a Nigerian business</h2>

        <p>
          A typical Nigerian SEO project spends the first month on setup and fixes, sees Maps
          and indexing progress in months one and two, area-level ranking movement in months
          three to six, and city-wide movement from month six onward.
        </p>

        <ul>
          <li>
            <strong>Month 1: foundations.</strong> Business Profile verified, Search Console
            connected, broken pages fixed, slow pages lightened, the main service pages
            rewritten. Little visible change in rankings. Google says crawling can take a few
            days to a few weeks, so pages published this month may not even be indexed yet.
          </li>
          <li>
            <strong>Months 2 to 3: first signals.</strong> The Maps listing starts producing
            calls and direction requests. Search Console shows impressions on searches that
            name the service and the area. Positions are usually still on page two or worse.
          </li>
          <li>
            <strong>Months 3 to 6: area-level movement.</strong> Pages written for specific
            areas, such as Lekki, Ikeja, Surulere or Garki, start reaching page one. The first
            search enquiries arrive, often by WhatsApp rather than the contact form.
          </li>
          <li>
            <strong>Months 6 to 12: city-wide movement.</strong> Broader searches begin to
            move as the site builds reviews, content and links. Enquiries become steadier.
            This is roughly where, in our{' '}
            <a href="/blog/how-much-does-seo-cost-in-nigeria">
              guide to what SEO costs in Nigeria
            </a>
            , most service businesses reach payback.
          </li>
          <li>
            <strong>Month 12 onward: compounding.</strong> New pages rank faster because the
            site has a track record. Stopping here is the expensive mistake, because the work
            that took a year to build keeps paying only while it is maintained.
          </li>
        </ul>

        <h2 id="what-slows-it">What slows SEO down in Nigeria</h2>

        <p>
          The things that most often slow SEO down for Nigerian businesses are a brand-new
          domain, a slow site on cheap hosting, a crowded Lagos category, an unverified or
          misplaced Maps listing, and work that is published in bursts and then stops.
        </p>

        <ul>
          <li>
            <strong>A new domain.</strong> A site Google has never seen starts with no history.
            Expect the slower end of every range above.
          </li>
          <li>
            <strong>A heavy site.</strong> Many Nigerian customers browse on mid-range Android
            phones over mobile data. A home page that loads a slider, three fonts and a video
            background loses them before Google ever gets a chance to rank it. The slider, in
            our experience, has never once closed a sale.
          </li>
          <li>
            <strong>A crowded category.</strong> Lagos fintech, real estate, law, private
            schools and hospitals are contested by companies with real marketing budgets. Six
            to twelve months becomes twelve to eighteen.
          </li>
          <li>
            <strong>A listing in the wrong place.</strong> A Maps pin dropped two streets
            away, or a profile still waiting for video verification, holds back the fastest
            clock of the three.
          </li>
          <li>
            <strong>Stop-start work.</strong> Four posts in January and nothing until June
            reads, to Google and to customers, like a business that might have closed.
          </li>
        </ul>

        <h2 id="what-speeds-it">What genuinely speeds SEO up in Nigeria</h2>

        <p>
          What genuinely speeds SEO up in Nigeria is targeting area-level searches first,
          getting the Google Business Profile verified and reviewed early, and publishing on a
          steady schedule rather than in bursts.
        </p>

        <p>
          Start where competition is thinnest. A page for physiotherapy in Yaba can rank long
          before a page for physiotherapy in Lagos, and it brings customers who are close
          enough to actually come in. Reviews matter for the Maps clock, and{' '}
          <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
            the WhatsApp review routine
          </a>{' '}
          costs nothing. Keep pages light enough to load on mobile data. And request indexing
          for each important page once in Search Console; Google says requesting a recrawl
          repeatedly for the same page will not get it crawled any faster, however strongly
          the person pressing the button feels about it.
        </p>

        <h2 id="our-own-numbers">Our own site, as an honest example</h2>

        <p>
          Our own site shows both halves of the Nigerian timeline: over a 90-day window it ranked
          poorly on broad international searches and well on the few searches made from
          African markets. Between June 24 and September 21, 2026, Google Search Console
          recorded 667 impressions, two clicks and an average position of 61.9.
        </p>

        <p>
          That is not a figure an SEO agency normally publishes about itself. The detail
          inside it is the useful part. Searchers in the United Kingdom saw us at an average
          position of 74.1, while searchers in Ghana saw us at 7.0 and in Cameroon at 3.7. The
          African samples were tiny, a handful of impressions each, so they prove direction
          rather than scale. But the direction is the point of this whole post: aimed at a
          market where competition is thin, a young site can rank within months; aimed at the
          whole world, the same site waits.
        </p>

        <h2 id="budget-the-wait">Budgeting for the wait, in naira</h2>

        <p>
          A Nigerian business should budget for at least six months of SEO before judging the
          result, which at typical Lagos and Abuja agency rates of ₦300,000 to ₦700,000 a month
          means ₦1.8 million to ₦4.2 million before the work can fairly be called a success or
          a failure.
        </p>

        <p>
          If that total would strain the business, a smaller scope run for six months beats a
          larger one cancelled in month three. Money spent on three months of SEO and then
          stopped is mostly money spent on foundations nobody gets to use. The price bands, and
          what each one buys, are set out in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our breakdown of SEO prices in Nigeria
          </a>
          . Our own plans start at USD 150 a month, about ₦205,000 at the end-of-September
          rate, and the detail is on the <a href="/pricing">pricing page</a>.
        </p>

        <h2 id="when-not-to-start">When SEO is the wrong choice this quarter</h2>

        <p>
          SEO is the wrong choice for a Nigerian business that needs customers within the next
          month, cannot fund six months of work, or is about to change its name, location or
          website.
        </p>

        <p>
          If the rent depends on this month&rsquo;s enquiries, Google Ads, referrals and a
          well-run WhatsApp catalogue will do more than any SEO retainer can in the same
          window; the trade-off is set out in{' '}
          <a href="/blog/seo-vs-google-ads">our comparison of SEO and Google Ads</a>. If a
          rebrand or a move from Ikeja to Lekki is planned for next quarter, do it first and
          start SEO after, so the work is not spent ranking an address the business is about to
          leave. We are an agency recommending, in writing, that some readers should not hire
          an agency yet. Our sales team has been informed and is being brave about it.
        </p>

        <p>
          For businesses that can wait the six months and want help, our{' '}
          <Link href="/ai-seo/lagos">Lagos SEO service</Link> and{' '}
          <Link href="/ai-seo/abuja">Abuja SEO service</Link> are built around the area-first
          approach in this guide.
        </p>

        <h2 id="check-progress">How to check SEO progress each month</h2>

        <p>
          A Nigerian business can tell whether SEO is working long before enquiries arrive by
          checking a different signal at each stage: verification and indexing first, then
          impressions, then ranking movement, and only then enquiries.
        </p>

        <ol>
          <li>
            <strong>Week 1: verify the Business Profile and Search Console.</strong> Google
            says profile verification takes up to five business days. Search Console starts
            recording impressions from the day it is connected.
          </li>
          <li>
            <strong>Month 1: confirm the important pages are indexed.</strong> Use URL
            Inspection. Request indexing once per page.
          </li>
          <li>
            <strong>Month 2: look for Maps actions and area-level impressions.</strong> Calls,
            direction requests, and impressions on searches naming your service and area.
          </li>
          <li>
            <strong>Months 3 to 4: look for ranking movement, not enquiries.</strong> Page five
            to page two is progress, even before the phone rings.
          </li>
          <li>
            <strong>Month 6: judge enquiries from search.</strong> Ask every new customer how
            they found you, and write it down.
          </li>
          <li>
            <strong>Months 9 to 12: judge city-wide terms and payback.</strong> Compare the
            value of customers won from search against the total spent.
          </li>
        </ol>

        <p>
          Tolu restarted in September with a smaller scope: the Maps listing, a page for each
          of Yaba, Akoka and Surulere, and a monthly look at Search Console instead of a daily
          search on her husband&rsquo;s phone. The city-wide search still belongs to the
          hospitals. The clinic now owns its own neighbourhood, which, it turns out, is where
          most of her patients were coming from anyway.
        </p>
      </PostShell>
    </>
  );
}
