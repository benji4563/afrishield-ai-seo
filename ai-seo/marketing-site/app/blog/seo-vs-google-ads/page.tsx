import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('seo-vs-google-ads')!;

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
  { id: 'what-each-is', label: 'What SEO and Google Ads actually are' },
  { id: 'cost', label: 'What each actually costs' },
  { id: 'speed', label: 'How fast each one shows results' },
  { id: 'stop-paying', label: 'What happens the day you stop paying' },
  { id: 'compounding', label: 'Why one compounds and the other does not' },
  { id: 'side-by-side', label: 'SEO and Google Ads, side by side' },
  { id: 'best-fit', label: 'Which one fits your business first' },
  { id: 'run-together', label: 'Running both without wasting money' },
];

const FAQ = [
  {
    q: 'Is SEO better than Google Ads?',
    a: 'Neither is better in the abstract — they solve different problems. Google Ads is better when you need customers this month. SEO is better when you can wait three to six months for cheaper, compounding traffic. Most established small businesses eventually want both, run at different intensities depending on the season and the budget.',
  },
  {
    q: 'How much does Google Ads cost for a small business?',
    a: 'It depends entirely on the cost per click in your category, which can run from under a dollar to over twenty in competitive service categories like law or insurance. A workable starting test budget is a few hundred dollars a month, enough to gather a few weeks of click and conversion data before judging whether the category is affordable at all.',
  },
  {
    q: 'Can I run SEO and Google Ads at the same time?',
    a: 'Yes, and for most businesses with any real budget it is the sensible default rather than an either-or choice. Ads cover the months before SEO has traction; SEO reduces how much you need to spend on ads once it does. Running both from day one is common practice, not a sign of indecision.',
  },
  {
    q: 'Which is faster, SEO or Google Ads?',
    a: 'Google Ads, by a wide margin. A campaign can be live and producing clicks within hours of launch. SEO on a new or lightly-optimised site typically needs three to six months before rankings move enough to matter, longer in competitive categories. If the need is urgent, ads are the only one of the two that can meet it.',
  },
  {
    q: 'Does SEO or Google Ads have the better ROI?',
    a: 'SEO tends to win on a long enough timeline, because the cost per visit falls toward zero once a page ranks, while every Google Ads click keeps costing the same. The catch is the first several months, where SEO costs money and produces little, and a business that cannot survive that stretch never reaches the payoff.',
  },
  {
    q: 'Should a brand-new business start with SEO or Google Ads?',
    a: 'Usually Google Ads first, briefly, purely to learn what a customer is actually worth and which search terms convert — real numbers a founder can then hand to whoever builds the SEO plan. Starting SEO with guessed numbers wastes the first few months on the wrong pages.',
  },
];

const HOWTO_STEPS = [
  {
    name: 'Fund Google Ads for immediate demand',
    text: 'Set a modest test budget on the two or three search terms closest to a ready-to-buy customer, and let it run for at least three weeks before judging cost per lead — early data on a new account is noisy.',
  },
  {
    name: 'Mine the ads data for the SEO plan',
    text: 'Pull the search terms report monthly and hand the phrases that actually convert, not just the ones with the most clicks, to whoever is building or writing the SEO content — this is real customer language, not a guess.',
  },
  {
    name: 'Publish SEO content against the proven terms',
    text: 'Prioritise pages for the search terms Ads already proved convert, so the slow-building organic traffic arrives already aimed at demand you have confirmed exists, instead of a keyword that only looked promising in a spreadsheet.',
  },
  {
    name: 'Shift ad spend down as rankings take over',
    text: 'Each quarter, check which ad terms now have a ranking organic page nearby them, and trim the ad budget on those specific terms first — not the whole account at once — while keeping ads live on terms SEO has not reached yet.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={howToJsonLd(HOWTO_STEPS, 'How to run SEO and Google Ads together without wasting money')}
      />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          SEO and Google Ads are not really two options competing for the same job. Google Ads
          buys placement at the top of the results page for as long as you keep paying,
          typically producing clicks within hours of launch. SEO earns placement through pages
          Google&rsquo;s systems judge relevant and trustworthy enough to rank on their own,
          usually taking three to six months to show real movement, and it keeps producing
          traffic after you stop spending. Most small businesses do best funding Google Ads
          first for immediate leads while SEO compounds in the background, then shifting
          budget toward SEO once it is carrying its own weight.
        </ShortAnswer>

        <Scene>
          <p>
            Kwame builds bespoke hardwood furniture out of a workshop on the edge of Kumasi.
            Two festive seasons ago he spent close to three months&rsquo; rent on a two-week
            Google Ads campaign, built by a cousin&rsquo;s friend who &ldquo;understood
            computers.&rdquo;
          </p>
          <p>
            It worked, almost too well. The phone rang for twelve straight days, and he sold
            out a run of dining sets he had not expected to move until the new year.
          </p>
          <p>
            Then the fortnight ended, the budget hit zero, and the phone went quiet again, as
            abruptly as if someone had thrown a switch. Someone had. He had simply not
            realised the switch was the entire campaign.
          </p>
        </Scene>

        <p>
          That switch is the whole subject of this piece — not which channel is
          &ldquo;better&rdquo; in the abstract, since both plainly work, but which one to fund
          first, what each one actually costs once the arithmetic is done honestly, and why a
          channel that only produces while you are paying it is not automatically the wrong
          choice. This is not an argument to abandon Google Ads; plenty of businesses run both
          for years. It is the honest comparison for deciding where the next dollar goes.
        </p>

        <h2 id="what-each-is">What SEO and Google Ads actually are</h2>

        <p>
          Google Ads buys a placement at the top of the results page for as long as the
          budget lasts. SEO earns a placement by being the page Google&rsquo;s algorithm
          judges most relevant and trustworthy for a search, a position that does not
          disappear the moment spending stops.
        </p>

        <p>
          Both are aimed at the same results page, and to a searcher the top ad and the top
          organic result often look nearly identical — a small &ldquo;Sponsored&rdquo; label
          is usually the only tell. Underneath, the mechanics could not be more different. One
          is a placement you rent by the click. The other is a placement you build, page by
          page, and then keep by staying correct and current.
        </p>

        <p>
          Each channel also depends on a different set of inputs to actually work, and
          knowing which inputs you already have shortens the decision considerably:
        </p>

        <ul>
          <li>
            <strong>Google Ads needs:</strong> a landing page built to convert a click into an
            enquiry, working conversion tracking so spend can be judged honestly, and someone
            checking the account regularly — an unattended campaign drifts toward wasted
            spend within weeks, not months.
          </li>
          <li>
            <strong>SEO needs:</strong> a technically sound site Google can crawl without
            friction, content written to answer real questions plainly, and consistency —
            citations, reviews, and mentions elsewhere — that corroborates what the site
            claims about itself.
          </li>
        </ul>

        <h2 id="cost">What each actually costs</h2>

        <p>
          Google Ads costs whatever the auction sets for your category, paid per click,
          starting the moment the campaign goes live and stopping the moment it does not. SEO
          costs a broadly similar monthly figure for the work — research, technical fixes,
          writing — but the cost is detached from clicks entirely, so a page that ranks and
          sends a thousand visits a month costs the same to have written as one that sends
          fifty.
        </p>

        <p>
          Cost per click in Google Ads varies enormously by category — under a dollar for a
          quiet niche, well into double digits for law, insurance, or anything else where a
          single customer is worth a great deal. A useful gut check before committing a real
          budget: run a small test, a few hundred dollars over a few weeks, and find out what
          a click actually costs in your category before assuming either number from a blog
          post applies to you. We have written more fully about{' '}
          <a href="/blog/what-seo-actually-costs">what SEO itself actually costs</a>, ranges
          included, for the other half of that comparison.
        </p>

        <p>
          Neither number is the full cost, either. Google Ads carries a soft cost most
          budgets never line-item: someone needs to watch the account, prune wasted spend,
          and refresh ad copy that has gone stale, or the published cost per click quietly
          drifts upward while nobody notices. SEO carries the mirror version — pages need
          revisiting as facts change, competitors publish, and Google&rsquo;s own results
          shift underneath a ranking that once looked settled. Budgeting only the media spend
          and skipping the maintenance is the most common way both channels end up costing
          more than either quote suggested.
        </p>

        <h2 id="speed">How fast each one shows results</h2>

        <p>
          Google Ads produces clicks within hours of a campaign going live, because the
          auction runs continuously and a funded bid is eligible to show immediately. SEO
          moves on a much slower clock — Google has to crawl a new or changed page, decide
          where it belongs relative to everything else already ranking for that phrase, and
          that process typically takes three to six months to show meaningful movement on
          competitive terms.
        </p>

        <p>
          The gap is the entire reason the &ldquo;which is better&rdquo; framing misleads more
          than it helps. Comparing them on speed alone is comparing a kettle to a slow cooker
          and declaring the kettle the superior appliance — true for tea, useless for the
          stew you actually wanted for dinner. We go into the honest month-by-month version of
          the SEO timeline in{' '}
          <a href="/blog/how-long-does-seo-take">how long SEO actually takes</a>, including
          why month three is where most people wrongly conclude it is not working.
        </p>

        <h2 id="stop-paying">What happens the day you stop paying</h2>

        <p>
          Google Ads traffic stops within hours of the budget running out, because there is no
          placement to hold once the bid is withdrawn. SEO traffic does not stop the day you
          stop paying for the work — the pages that already rank keep ranking, sometimes for
          years, though they will drift and lose ground over time without any maintenance at
          all.
        </p>

        <p>
          Kwame&rsquo;s festive campaign is the clean version of the first half of that
          sentence. The blog post his workshop published the following year about
          termite-resistant hardwood joinery is the clean version of the second — it still
          sends two or three enquiries a month, unattended, eighteen months after anyone last
          touched it. Nobody is paying an auction for those clicks. Nobody has to.
        </p>

        <h2 id="compounding">Why one compounds and the other does not</h2>

        <p>
          SEO compounds because each new page that ranks keeps producing traffic alongside
          every page published before it, while the marginal cost of that traffic falls
          toward zero once a page is established. Google Ads does not compound in the same
          way — the hundredth click still costs roughly what the first one did, so spend and
          output stay proportional to each other indefinitely rather than growing apart.
        </p>

        <p>
          This is the part worth being honest about, since AfriShield sells the compounding
          half of this comparison and has every incentive to oversell it: compounding requires
          consistent publishing over months, and a business that starts fifteen pages and
          maintains none of them gets a small, decaying asset rather than a growing one. SEO
          is not compounding by nature. It is compounding when it is kept up, which is a less
          catchy sentence and a considerably more accurate one.
        </p>

        <h2 id="side-by-side">SEO and Google Ads, side by side</h2>

        <p>
          Side by side, Google Ads wins on speed, precision, and immediate control; SEO wins
          on cost efficiency and durability once it is established. Neither column wins
          outright, which is the whole reason this is a funding-order question rather than a
          pick-one question.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Google Ads</th>
                <th>SEO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Traffic starts within hours</td>
                <td>Traffic typically takes 3–6 months to show real movement</td>
              </tr>
              <tr>
                <td>Cost scales with every click, forever</td>
                <td>Cost is mostly upfront; marginal traffic gets cheaper over time</td>
              </tr>
              <tr>
                <td>Stops the moment the budget stops</td>
                <td>Persists after spending stops, though it drifts without upkeep</td>
              </tr>
              <tr>
                <td>Precise, immediate targeting and testing</td>
                <td>Slower to test; results reflect months-old decisions</td>
              </tr>
              <tr>
                <td>Rented placement — Google&rsquo;s shelf, not yours</td>
                <td>An asset the business keeps, in some form, indefinitely</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="best-fit">Which one fits your business first</h2>

        <p>
          The honest starting rule is need, not preference: fund Google Ads first if customers
          are needed within the next eight weeks, and fund SEO first if the business can absorb
          several flat months while the compounding builds. Most small businesses discover they
          need both, at different intensities, once they say the actual deadline out loud
          instead of guessing at it.
        </p>

        <p>
          It is also fair to say when neither is the right next purchase. If the website
          cannot take a booking or an enquiry cleanly, fixing that comes before funding either
          channel — traffic to a broken form is an expensive way to learn nothing. And if
          almost nobody searches for what the business sells, because the need is discovered
          through a driveway sign or a referral rather than a search bar, both channels are
          solving a problem this business does not actually have.{' '}
          <a href="/blog/is-seo-worth-it">Whether SEO is worth it at all</a> is worth reading
          before either budget is set, because the honest answer is sometimes not yet, and
          sometimes not this business.
        </p>

        <h2 id="run-together">Running both without wasting money</h2>

        <p>
          Running both well means treating Google Ads as a source of proof for SEO, not a
          separate department that never talks to it — the search terms report from a live ad
          account is the closest thing to free market research most small businesses will ever
          have.
        </p>

        <ol>
          <li>
            Fund a modest, three-week Google Ads test on the two or three terms closest to a
            ready buyer, and resist judging it before day twenty-one.
          </li>
          <li>
            Pull the search terms report monthly and hand the phrases that convert — not just
            the ones with the most clicks — to whoever is writing the SEO content.
          </li>
          <li>
            Publish SEO pages against those proven terms first, so slow-building organic
            traffic arrives already aimed at demand that has been confirmed, not guessed at.
          </li>
          <li>
            Each quarter, trim ad spend on the specific terms an organic page has started
            ranking for, term by term, rather than cutting the whole account at once.
          </li>
        </ol>

        <p>
          This is also, roughly, how a comparison between{' '}
          <a href="/blog/ai-seo-vs-traditional-seo">AI-assisted SEO and traditional SEO</a>{' '}
          tends to resolve once the hype clears — not a winner-take-all argument, but two
          tools handed to the person who knows which job actually needs which one this month.
          Kwame still runs a short Google Ads burst before the festive season. He just no
          longer treats the day it ends as the day the business goes quiet, because by the
          third year, it was not the only thing making the phone ring.
        </p>
      </PostShell>
    </>
  );
}
