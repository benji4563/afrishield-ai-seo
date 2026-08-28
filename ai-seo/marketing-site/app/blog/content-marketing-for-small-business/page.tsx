import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('content-marketing-for-small-business')!;

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
  { id: 'what-it-is', label: 'What content marketing actually is' },
  { id: 'vs-advertising', label: 'How content marketing differs from advertising' },
  { id: 'what-to-write', label: 'What is actually worth writing, in order' },
  { id: 'how-much', label: 'How much content a small business actually needs' },
  { id: 'compare', label: 'Content marketing and paid ads, side by side' },
  { id: 'distribution', label: 'Where the content needs to live beyond the blog' },
  { id: 'what-fails', label: 'What does not work' },
  { id: 'measuring', label: 'How to tell whether any of it is working' },
  { id: 'start', label: 'A five-step way to start this month' },
];

const START_STEPS = [
  {
    name: 'List the ten questions customers ask before buying',
    text: 'List the ten questions customers ask before buying, in their own words, not internal product names.',
  },
  {
    name: 'Write a plain answer to three of them',
    text: 'Write a plain answer to the three most common ones, stating the answer in the first two sentences before any story or context.',
  },
  {
    name: 'Publish one page a week',
    text: 'Publish one page a week rather than five at once, so the schedule survives the month it becomes inconvenient.',
  },
  {
    name: 'Put the link everywhere a customer already looks',
    text: 'Add each new page as a Google Business Profile post and share it wherever customers already follow the business, not only on the website.',
  },
  {
    name: 'Read the results back after a month',
    text: 'After a month, note which page a customer mentions unprompted and which one ranks for its target phrase, then drop or rewrite whichever earns neither.',
  },
];

const FAQ = [
  {
    q: 'What is content marketing for a small business?',
    a: 'It is the practice of publishing useful pages and posts that answer real customer questions, instead of only running advertisements, so the business is already visible and trusted by the time a customer is ready to buy. It covers guides, comparisons, pricing pages, and FAQs published on a schedule the business can sustain.',
  },
  {
    q: 'How much does content marketing cost for a small business?',
    a: 'The main cost is time rather than a fee, since a small business can write its own pages once the customer questions are listed out. Budgets that pay someone else to do it typically run from a modest monthly retainer for a handful of pages a month up to a full content operation, but a business writing its own material can start for the cost of a few hours a week.',
  },
  {
    q: 'How often should a small business publish content?',
    a: 'One well-answered page a week, sustained for months, outperforms a burst of ten pages published in one week and then abandoned. Consistency matters more than volume, and a schedule the business can actually keep to is worth more than an ambitious one that stops in six weeks.',
  },
  {
    q: 'Is content marketing better than paid ads for a small business?',
    a: 'They solve different problems rather than competing directly. Paid ads produce visibility immediately and stop the moment the budget does; content marketing takes months to build but keeps earning traffic for years off the same page. Most small businesses benefit from running both, with ads covering the gap while content builds.',
  },
  {
    q: 'How long does content marketing take to work?',
    a: 'Most small business pages see the first search visibility in two to four months and meaningful traffic by six to nine months, in line with how long SEO generally takes to show results. Pages answering a narrow, specific question tend to show movement sooner than broad, general topics.',
  },
  {
    q: 'What should a small business write about first?',
    a: 'Start with the exact questions customers already ask by phone or in person before they buy — price, what is included, and how the business compares to the obvious alternative. Those pages tend to earn attention faster than general industry commentary because they match a search someone is already running.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(START_STEPS, 'A five-step way to start content marketing this month')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Content marketing for small business means publishing the guides, comparisons, pricing
          pages, and answers that a future customer searches for before they are ready to buy, so
          the business is already visible and trusted by the time that customer decides to spend
          money. Done properly it is not a blog kept for its own sake. It is a small set of pages
          built around the real questions customers ask, published on a schedule the business can
          actually sustain, and written to be found by a search engine and quoted by an AI
          assistant alike.
        </ShortAnswer>

        <Scene>
          <p>
            Grace runs a small catering business out of a rented kitchen in Accra. For three years
            the entire marketing plan lived on her phone: a WhatsApp status update before wedding
            season, and word of mouth from aunties who had already booked her.
          </p>
          <p>
            A competitor two suburbs over started publishing a short page every fortnight. How
            much a fifty-guest buffet actually costs. What to ask a caterer before booking. How
            far in advance to book for December. Nothing dressed up. Nothing that read like an
            advertisement.
          </p>
          <p>
            Six months later, Grace noticed the competitor&rsquo;s name kept turning up first
            whenever she searched the exact questions her own customers asked her on the phone.
            The competitor had not out-cooked her. They had simply written the answers down first.
          </p>
        </Scene>

        <p>
          This is the entire discipline behind the phrase &ldquo;content marketing,&rdquo; stripped
          of the agency slide decks. Not a mysterious growth channel, and not a synonym for
          posting on social media. Just the specific pages a business publishes to answer
          questions a customer would otherwise take to Google, a competitor, or an AI assistant.
        </p>

        <h2 id="what-it-is">What content marketing actually is</h2>

        <p>
          Content marketing is the practice of publishing genuinely useful information, rather
          than an advertisement, so a potential customer finds and trusts a business before they
          are asked to buy anything. The useful information can be a guide, a comparison, a plain
          pricing page, or an answer to a question the business already gets asked every week.
        </p>

        <p>
          It is the less glamorous cousin of running an advert. No jingle, no clever slogan, only
          the actual answer to &ldquo;how much does this cost&rdquo; written down before a
          competitor gets there first, which sounds obvious right up until you count how few
          businesses in any given town have actually done it.
        </p>

        <p>
          The pages do two jobs at once. A search engine indexes them and, over months, starts
          ranking them for the phrases customers type. An AI assistant reads them and, when it has
          nothing better, quotes them back to whoever asked. Both audiences reward the same
          habit: state the answer plainly, near the top, in a sentence that survives being lifted
          out of context.
        </p>

        <h2 id="vs-advertising">How content marketing differs from advertising</h2>

        <p>
          Content marketing earns attention by being useful before the sale; advertising buys
          attention regardless of whether the advert itself is useful, and the attention stops the
          moment the payment does.
        </p>

        <p>
          An advert is closer to a landlord relationship than most businesses admit. Miss a
          payment and the visibility disappears overnight, along with whatever goodwill the
          thirty-second copy managed to build. A page that answers a real question, once written
          and published, keeps working quietly in the background for as long as the question stays
          relevant &mdash; no renewal notice, no rising monthly bill.
        </p>

        <p>
          Neither replaces the other cleanly. Advertising is the faster lever when a business
          needs customers this month. Content is the slower one that keeps paying rent-free once
          it starts working. The honest comparison between the two runs further down this page.
        </p>

        <h2 id="what-to-write">What is actually worth writing, in order</h2>

        <p>
          The content that earns the most attention for the least effort is, in order, the
          questions customers already ask by phone, a plain comparison against the obvious
          alternative, and pricing written down honestly &mdash; well ahead of opinion pieces or
          general industry commentary that nobody is actually searching for.
        </p>

        <ul>
          <li>
            <strong>Direct-answer FAQ pages.</strong> The exact questions asked at the counter or
            over the phone, answered in writing, in the customer&rsquo;s own words rather than
            internal jargon.
          </li>
          <li>
            <strong>Honest pricing pages.</strong> Ranges rather than a &ldquo;contact us for a
            quote&rdquo; wall, which filters out nobody except the customers who were about to
            book anyway.
          </li>
          <li>
            <strong>Comparisons.</strong> This service against the obvious alternative, including
            the cases where the alternative genuinely wins.
          </li>
          <li>
            <strong>How-to guides.</strong> The process a customer has to understand before they
            can decide, written plainly enough that a first-timer can follow it.
          </li>
          <li>
            <strong>Local and seasonal pages.</strong> The version of the above tied to a specific
            town, season, or event, where a general competitor has not bothered to be specific.
          </li>
        </ul>

        <p>
          A short session of{' '}
          <a href="/blog/how-to-do-keyword-research">keyword research done without a paid tool</a>,
          even a manual one with a notebook and a search bar, tends to hand a business this exact
          list already sorted by what people actually type, rather than what the business assumes
          they type.
        </p>

        <p>
          This is deliberately scoped to written, on-site pages, which is where the search and
          AI-answer payoff is largest for a small business. Video and social posts have their own
          logic and their own audiences, and a business with the time for both should run them
          alongside this, not instead of it.
        </p>

        <h2 id="how-much">How much content a small business actually needs</h2>

        <p>
          A small business needs roughly a dozen strong pages, added steadily at one or two a
          month and sustained for a year &mdash; far less than a subscription-selling agency
          implies, and a pace that outperforms fifty rushed pages published in a three-month
          sprint and then abandoned.
        </p>

        <p>
          Ambitious content calendars have a way of piling up exactly like an inbox nobody has
          opened since a long weekend: impressive in volume, useless until someone actually goes
          through it one item at a time. A realistic cadence a business can sustain for a year
          beats an aggressive one it quietly stops keeping after six weeks.
        </p>

        <p>
          Not every business needs this at all, and it is worth saying so plainly. A stall with a
          fixed local queue and zero meaningful search volume for what it sells may get more from
          an afternoon spent on its Google Business Profile and asking happy customers for reviews
          than from writing a single page nobody will search for. Content marketing pays off
          fastest where a real, if small, volume of people are already typing the question into a
          search bar.
        </p>

        <h2 id="compare">Content marketing and paid ads, side by side</h2>

        <p>
          Content marketing and paid ads solve different problems, and the honest comparison is
          speed against durability rather than a verdict on which one is better outright.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Paid ads</th>
                <th>Content marketing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Visible the day the campaign launches</td>
                <td>Takes months to build, then keeps working</td>
              </tr>
              <tr>
                <td>Stops the moment the budget stops</td>
                <td>Keeps earning traffic for years off one page</td>
              </tr>
              <tr>
                <td>Rents a slot on someone else&rsquo;s platform</td>
                <td>Owns a page the business fully controls</td>
              </tr>
              <tr>
                <td>Cost scales with every click</td>
                <td>Cost is mostly the writing time, spent once</td>
              </tr>
              <tr>
                <td>Good for a launch, a sale, or a deadline</td>
                <td>Good for the question customers ask every week, indefinitely</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Most small businesses do better running both than choosing a side. Ads cover the months
          while content is still too young to rank; content quietly takes over the load once it
          does, which is roughly what{' '}
          <a href="/blog/seo-vs-google-ads">the fuller comparison between SEO and Google Ads</a>{' '}
          works out in more detail.
        </p>

        <h2 id="distribution">Where the content needs to live beyond the blog</h2>

        <p>
          A page that exists only on the business&rsquo;s own website reaches almost nobody until
          it ranks, so the same material needs repurposing onto Google Business Profile posts, a
          WhatsApp broadcast list, and at least one place a customer already checks daily.
        </p>

        <p>
          Writing the page is roughly a third of the job. The other two-thirds is a short summary
          posted the week it goes live to a{' '}
          <a href="/blog/google-business-profile-optimization">
            Google Business Profile kept actively optimized
          </a>
          , a link dropped into the channel customers already follow, and a mention the next time
          a customer asks the exact question the page now answers in writing. None of that
          requires a distribution budget, only the habit of doing it every time.
        </p>

        <h2 id="what-fails">What does not work</h2>

        <p>
          The failure modes are consistent across almost every small business that tries this and
          stalls: generic posts nobody searched for, a publishing calendar abandoned after six
          weeks, and content that reads as a sales pitch wearing a question mark.
        </p>

        <ul>
          <li>
            <strong>Generic topics with no search behind them.</strong> A page written because it
            felt like the kind of thing a business blog should cover, rather than because a
            customer was ever heard asking it.
          </li>
          <li>
            <strong>Filler that could describe any business anywhere.</strong> A paragraph of
            confident-sounding generalities, written to describe an entire industry and ending up
            describing no business in particular &mdash; the kind of copy a reader, and a search
            engine, learn to skim past within a sentence.
          </li>
          <li>
            <strong>A calendar with no owner.</strong> A plan that assumes &ldquo;someone&rdquo;
            will write the next page, which in a small business usually means nobody does, once
            the first quiet month arrives.
          </li>
          <li>
            <strong>Publishing and never linking back.</strong> Pages left to be found by search
            alone, with no mention in Google Business Profile, WhatsApp, or anywhere a current
            customer would actually see it.
          </li>
        </ul>

        <h2 id="measuring">How to tell whether any of it is working</h2>

        <p>
          The evidence that content marketing is working shows up as three specific signals: pages
          ranking for the exact phrases customers search, messages that quote a line from a post
          back to the business, and a falling share of customers asking a question the FAQ page
          already answers in writing.
        </p>

        <p>
          None of these show up in the first month, and anyone promising otherwise is selling
          something. The realistic timeline runs closer to what{' '}
          <a href="/blog/how-long-does-seo-take">a general SEO timeline looks like month by month</a>
          , since a content page has to be found, crawled, and trusted before it ranks at all.
        </p>

        <h2 id="start">A five-step way to start this month</h2>

        <p>
          Starting content marketing this month takes five concrete steps rather than a strategy
          document: list the questions customers already ask, answer three of them plainly, publish
          one a week, put the link everywhere a customer already looks, and read the results back
          after a month.
        </p>

        <ol>
          {START_STEPS.map((step) => (
            <li key={step.name}>{step.text}</li>
          ))}
        </ol>

        <p>
          Grace&rsquo;s competitor did not do anything mysterious to end up ahead of her in a
          search that used to be won by whoever answered the phone fastest. They wrote the answer
          down once, in one place, months before Grace did. That is the whole discipline behind
          content marketing for a small business &mdash; not cleverness, just answers, written
          down, before somebody else gets there first.
        </p>
      </PostShell>
    </>
  );
}
