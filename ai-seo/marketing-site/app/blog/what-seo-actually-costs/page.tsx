import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('what-seo-actually-costs')!;

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
  { id: 'the-ranges', label: 'The ranges, without the throat-clearing' },
  { id: 'what-you-buy', label: 'What each price band actually buys' },
  { id: 'what-moves-it', label: 'What moves your number up or down' },
  { id: 'the-arithmetic', label: 'The arithmetic nobody shows you' },
  { id: 'cheap-seo', label: 'Why the $150 option is expensive' },
  { id: 'models', label: 'Retainer, project, or hourly' },
  { id: 'local', label: 'Currency, terms, and hiring abroad' },
  { id: 'dont-buy', label: 'When you should not buy this at all' },
  { id: 'questions', label: 'Five questions before you sign anything' },
];

const FAQ = [
  {
    q: 'How much does SEO cost for a small business?',
    a: 'Most small businesses land between $500 and $2,000 a month. Below roughly $500 there is rarely enough time in the budget to do the technical work and publish consistently, so something gets skipped. Above $2,000 you are usually paying for competitive markets, multiple locations, or a faster publishing cadence.',
  },
  {
    q: 'Is SEO cheaper than Google Ads?',
    a: 'Not at first, and that is the point people miss. Ads cost more per month indefinitely but produce traffic on day one. SEO costs a similar amount for the first few months and produces very little, then keeps producing after you stop paying. The honest framing is that ads are rent and SEO is a mortgage.',
  },
  {
    q: 'How long before SEO pays for itself?',
    a: 'For most service businesses with a decent transaction value, somewhere between month five and month nine. That assumes consistent publishing from month one. If publishing stops in month three — which is the most common failure — it never pays back, because the compounding never starts.',
  },
  {
    q: 'Why do SEO quotes vary so wildly for the same work?',
    a: 'Because “SEO” is not a defined deliverable. One quote covers a technical audit, four pages a month, and reporting. Another covers a monthly rank report and nothing else. Both are honestly described as SEO. Ask what publishes each month and the range collapses fast.',
  },
  {
    q: 'Should I pay for SEO monthly or as a one-off project?',
    a: 'A one-off project makes sense for a technical fix or a site migration, which genuinely have end dates. Content and ranking work do not — a single burst of pages will drift without maintenance. Pay per project for the things that finish, monthly for the things that do not.',
  },
  {
    q: 'What is the cheapest SEO that is still worth doing?',
    a: 'A one-time technical audit and fix, plus a keyword map you keep. That gets you a site that can rank and a plan you can execute yourself. It is a few thousand dollars once, and for a business with someone willing to write, it is often the better buy than a small retainer.',
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

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Most small businesses pay between <strong>$500 and $2,000 a month</strong> for SEO.
          Published industry pricing surveys for 2026 put the broad market at roughly
          $500–$3,000 a month, with local-focused work averaging around $1,500 and agency
          retainers averaging closer to $3,000. Freelancers sit lower, near $1,300.
          Enterprise work runs $10,000 and up. The number that matters more than any of
          these is the one nobody prints: you will pay for roughly four to six months before
          the return starts, and that gap is the actual cost.
        </ShortAnswer>

        <Scene>
          <p>
            Kofi owns two dental clinics. He collected four quotes for the same brief, sent
            in the same email, on the same day.
          </p>
          <p>
            They came back at $180 a month, $900 a month, $2,400 a month, and one that
            declined to give a number until after a discovery call. He assumed three of them
            were wrong.
          </p>
          <p>
            All four were quoting honestly. They were also quoting four completely different
            jobs, none of which had been specified — because his brief said “we need SEO”,
            which is roughly as precise as telling a builder you need construction.
          </p>
        </Scene>

        <p>
          This is the piece almost nobody writes, because printing real numbers means
          occasionally talking yourself out of a sale. Here they are anyway, with the
          uncomfortable arithmetic left in.
        </p>

        <h2 id="the-ranges">The ranges, without the throat-clearing</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Monthly spend</th>
                <th>Who this is</th>
                <th>Realistic scope</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under $300</td>
                <td>Almost nobody, honestly</td>
                <td>A rank report and light edits. Not enough hours to fix and publish both.</td>
              </tr>
              <tr>
                <td>$400–$800</td>
                <td>Single location, one core service</td>
                <td>Technical foundation, keyword map, two pages a month, reporting</td>
              </tr>
              <tr>
                <td>$900–$2,000</td>
                <td>Multiple services or locations</td>
                <td>The above, four pages a month, local pages, competitor tracking</td>
              </tr>
              <tr>
                <td>$2,000–$5,000</td>
                <td>Search is a primary acquisition channel</td>
                <td>Weekly publishing, conversion tracking, quarterly strategy</td>
              </tr>
              <tr>
                <td>$10,000+</td>
                <td>Enterprise, or genuinely brutal verticals</td>
                <td>A team, technical SEO engineering, digital PR</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Prices are in USD because that is how the market quotes, including in markets that
          invoice in naira, cedis, shillings or rand. If someone quotes you local currency
          at a suspiciously round number, ask what exchange rate they used and when they
          last updated it.
        </p>

        <h2 id="what-you-buy">What each price band actually buys</h2>

        <p>
          The reason quotes vary by a factor of ten is that they are pricing different
          amounts of human attention, and attention is the entire input.
        </p>

        <p>
          Roughly speaking, a properly-run month for a small business contains: two to four
          researched pages, a technical pass over the site, position monitoring, and a
          report someone actually read before sending. That is somewhere between fifteen and
          thirty hours depending on how competitive the market is and how broken the site
          was to begin with.
        </p>

        <p>
          At $180 a month, nobody is spending fifteen hours. What you are buying at that
          price is an automated rank-tracking email and, if you are lucky, someone
          occasionally changing a meta description. It is not a scam. It is just priced
          correctly for what it is, which is not very much.
        </p>

        <h2 id="what-moves-it">What moves your number up or down</h2>

        <p>
          Two businesses of identical size get quoted $600 and $2,400 for what sounds like
          the same work. Usually four things explain the gap, and you can estimate your own
          position on each before anyone quotes you.
        </p>

        <ul>
          <li>
            <strong>How competitive your phrases are.</strong> &ldquo;Emergency plumber&rdquo; in a
            capital city is contested by businesses spending five figures a month. &ldquo;Industrial
            valve recalibration&rdquo; is contested by four companies, two of whom have not updated
            their site since 2019. The second is enormously cheaper to win.
          </li>
          <li>
            <strong>How broken your site is.</strong> A clean, fast site on a modern framework
            needs a week of technical work. A ten-year-old build with three plugins fighting over
            the same meta tags needs a month, and that month is billed before a word publishes.
          </li>
          <li>
            <strong>How many things you sell, in how many places.</strong> Every additional service
            and every additional location is another page that needs its own keyword, its own
            research, and its own maintenance. Cost scales with surface area, not with revenue.
          </li>
          <li>
            <strong>Whether anyone on your side can write.</strong> If someone in the business can
            produce a rough, factually correct draft, the provider is editing rather than
            researching from zero — and that genuinely reduces the bill.
          </li>
        </ul>

        <p>
          Notice that only one of those four is about your budget. The other three are facts
          about your situation that exist before you talk to anybody, which is why sensible
          providers ask about them on the first call rather than leading with a price sheet.
        </p>

        <h2 id="the-arithmetic">The arithmetic nobody shows you</h2>

        <p>
          Here is the calculation that should decide this, and it takes ninety seconds.
        </p>

        <ol>
          <li>What is a new customer worth to you over their lifetime? Not the first invoice — the whole relationship.</li>
          <li>Divide your proposed monthly spend by that number.</li>
          <li>That is how many customers a month this has to produce to break even.</li>
        </ol>

        <p>
          Kofi&rsquo;s clinics: an average patient is worth about $600 over a few years. At the
          $900 quote, SEO needs to produce <strong>1.5 new patients a month</strong> to break
          even. Not fifteen. One and a half.
        </p>

        <p>
          That is a very different conversation from &ldquo;is $900 a lot of money&rdquo;. For a
          business where a customer is worth $40, the same $900 needs twenty-three new
          customers a month, and the answer is probably no — or at least, not yet, and not
          at that spend.
        </p>

        <p>
          Now the part that gets left out. Add the ramp. Months one through three produce
          close to nothing regardless of who you hire, because new pages take time to be
          crawled, understood, and trusted. So your real question is not &ldquo;can I afford $900 a
          month&rdquo;. It is:
        </p>

        <blockquote>
          Can I afford to spend roughly $3,600 over four months, see almost nothing, and not
          panic in month three?
        </blockquote>

        <p>
          Month three is where most SEO engagements die. Not because the work failed, but
          because the flat months arrived exactly on schedule and nobody had warned anyone
          they were coming.
        </p>

        <h2 id="cheap-seo">Why the $150 option is expensive</h2>

        <p>
          Cheap SEO is rarely a smaller version of good SEO. It is usually a different
          activity that shares a name, and it tends to produce one of three outcomes.
        </p>

        <ul>
          <li>
            <strong>Nothing happens.</strong> The best case. You spend $1,800 over a year and
            end up where you started, minus $1,800.
          </li>
          <li>
            <strong>Volume without judgement.</strong> Forty thin pages appear, targeting
            phrases nobody searches, several of them competing with each other. Cleaning this
            up costs more than the original engagement.
          </li>
          <li>
            <strong>Borrowed links.</strong> Positions improve for a while and then fall off a
            cliff. Recovery, where possible, takes months.
          </li>
        </ul>

        <p>
          The general rule: if the price is well below what fifteen hours of skilled work
          costs in your market, ask specifically what is being automated and who is checking
          the output. There are good answers to that question. There is also no answer, which
          is itself an answer.
        </p>

        <h2 id="models">Retainer, project, or hourly</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Typical range</th>
                <th>Right when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly retainer</td>
                <td>$400–$5,000/mo</td>
                <td>Ongoing content and ranking work, which has no end date</td>
              </tr>
              <tr>
                <td>One-off project</td>
                <td>$1,500–$10,000</td>
                <td>Technical audit, site migration, a rebuild — things that finish</td>
              </tr>
              <tr>
                <td>Hourly consulting</td>
                <td>$75–$300/hr</td>
                <td>You have a capable team and need direction, not delivery</td>
              </tr>
              <tr>
                <td>Performance-based</td>
                <td>Varies wildly</td>
                <td>Almost never — see below</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Performance-based pricing sounds like the buyer-friendly option and usually is not.
          It pushes the provider toward whatever moves the agreed metric fastest, which is
          rarely what grows your business. Pay for rankings and you will get rankings for
          phrases nobody valuable searches. The metric will be met. You will not be busier.
        </p>

        <h2 id="local">Currency, terms, and hiring abroad</h2>

        <p>
          Three practical points that get skipped in every pricing guide written for a
          North American audience, and which matter a great deal if you are invoicing in
          naira, cedis, shillings or rand.
        </p>

        <p>
          <strong>Fixing the rate matters more than fixing the price.</strong> A USD retainer
          that felt comfortable in January can be materially more expensive by August without
          anybody changing the contract. Either agree a local-currency figure that is reviewed
          on a stated schedule, or agree the exchange rate source in writing. Do not leave it
          to be discovered on an invoice.
        </p>

        <p>
          <strong>The cheaper international quote often is not.</strong> An overseas agency
          quoting below the local market usually achieves it by running the same template
          across every client. You can tell within one call: ask them to name a regulatory or
          market detail specific to where you operate. If the answer is generic, your content
          will be too — and content that reads as imported does not convert, however well it
          ranks.
        </p>

        <p>
          <strong>Watch the payment terms, not just the number.</strong> Quarterly-in-advance
          at a small discount is a worse deal than monthly-in-arrears at full price if there is
          any chance you will want to stop in month three. The discount is being sold to you
          in exchange for your exit.
        </p>

        <h2 id="dont-buy">When you should not buy this at all</h2>

        <p>Genuinely, do not spend money on SEO this quarter if:</p>

        <ul>
          <li>
            <strong>Your website cannot take a booking or an enquiry properly.</strong> Fix the
            conversion path first. Traffic to a broken form is expensive nothing.
          </li>
          <li>
            <strong>Nobody searches for what you sell.</strong> Some businesses are genuinely
            demand-generation businesses. If the search volume is not there, no amount of
            optimisation invents it.
          </li>
          <li>
            <strong>You need customers within eight weeks.</strong> That is an ads problem, or a
            phone problem. SEO cannot help you at that timescale and anyone who says otherwise
            is taking your money.
          </li>
          <li>
            <strong>You cannot commit past month four.</strong> Stopping at month three is
            strictly worse than never starting, because you paid for all of the cost and none
            of the return.
          </li>
        </ul>

        <h2 id="questions">Five questions before you sign anything</h2>

        <ol>
          <li>How many pages publish each month, and who writes them?</li>
          <li>Is the technical audit included, or extra?</li>
          <li>What is the minimum term, and what does the exit look like?</li>
          <li>When we stop, what do we keep? (Correct answer: everything.)</li>
          <li>Which month do you expect to look flat, and what will you tell me when it does?</li>
        </ol>

        <p>
          That last question is the one that separates providers. Anyone who has run this
          work honestly will answer it immediately and specifically. Anyone who has not will
          tell you their process is different.
        </p>

        <p>
          Kofi took the $900 quote, on a month-to-month arrangement, after doing the
          1.5-patients arithmetic on the back of an appointment card. That is the right way
          to make this decision — not by asking whether SEO is expensive, but by working out
          exactly how little it has to do to be worth it.
        </p>
      </PostShell>
    </>
  );
}
