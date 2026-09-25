import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('is-seo-worth-it')!;

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
  { id: 'what-worth-it-means', label: 'What worth it actually means before you spend anything' },
  { id: 'what-you-get', label: 'What SEO actually returns' },
  { id: 'what-it-costs', label: 'What it costs, so the return math means something' },
  { id: 'how-long', label: 'Why the payoff takes months, not weeks' },
  { id: 'when-worth-it', label: 'When SEO is worth it' },
  { id: 'when-not', label: 'When it is not worth it' },
  { id: 'seo-vs-ads', label: 'SEO versus paid ads, side by side' },
  { id: 'how-to-check', label: 'How to tell whether it is working for you' },
  { id: 'african-angle', label: 'Why the math tilts differently in African markets' },
];

const CHECK_STEPS = [
  {
    name: 'Record a baseline before you start',
    text: 'Write down current organic sessions, rankings for the handful of keywords that actually bring buyers, and how many leads or sales you can already trace to search, so later months have something honest to compare against.',
  },
  {
    name: 'Track rankings monthly for money keywords, not vanity ones',
    text: 'Follow the small set of terms a paying customer would actually type, not a broad keyword the business happens to rank for but that nobody buys anything from.',
  },
  {
    name: 'Tag and trace leads back to organic search',
    text: 'Add a source field to your enquiry form or ask new customers how they found you, so a lead can be attributed to organic traffic instead of guessed at.',
  },
  {
    name: 'Compare the traced return against the cost, quarterly',
    text: 'Every three months, set what SEO earned in traceable leads or sales against what it cost that quarter, and decide from that number rather than from how the traffic chart looks.',
  },
];

const FAQ = [
  {
    q: 'Is SEO worth it for a small business?',
    a: 'For most small businesses that plan to still be trading in a year, yes — it returns visitors who keep arriving without an ongoing per-click charge, and the page built today keeps earning long after the work is finished. It is a weaker fit for a business that needs revenue this month or cannot fund three to six quiet months first.',
  },
  {
    q: 'Is SEO still worth it now that people ask AI assistants instead of searching?',
    a: 'Yes, and increasingly for a second reason: the same clear, well-structured pages that rank on Google are also the pages ChatGPT, Perplexity, and Google AI Overviews tend to quote. SEO and answer engine optimization share most of the same underlying work, so the rise of AI answers has not made the investment less worthwhile — it has added a second surface the same effort pays into.',
  },
  {
    q: 'How long before SEO is worth it financially?',
    a: 'Most small businesses see the first measurable movement at three to four months, and for a service business with a decent transaction value the cost is typically paid back somewhere between month five and month nine, assuming consistent publishing from month one. Anyone promising a return inside the first month is describing paid advertising, not SEO.',
  },
  {
    q: 'Is SEO worth it compared to paid ads?',
    a: 'They are not really competing for the same job. Paid ads buy visibility for as long as the budget runs and stop the day it does; SEO builds a page that keeps ranking after the active work slows down. A business with cash to spend today and no patience should lean on ads; a business that can wait a few months usually gets more total value from splitting the budget toward SEO over time.',
  },
  {
    q: 'Can SEO fail even if I do everything right?',
    a: 'Yes, in a narrow set of cases: a product with almost nobody searching for it, a market a competitor already dominates with a budget you cannot match, or a business that will close or pivot before the months required to see results have passed. Good execution raises the odds; it does not remove the cases where the underlying math was against the business from the start.',
  },
  {
    q: 'Is SEO worth it on a very small budget?',
    a: 'Often yes, because a large share of what moves a small local business — claiming and completing a Google Business Profile, fixing basic technical issues, writing a handful of clear pages that answer real customer questions — costs time rather than money. A small budget narrows how fast the work gets done, not whether it is worth doing at all.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(CHECK_STEPS, 'How to tell whether SEO is worth it for your business')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          SEO is worth it for most small businesses that plan to still be trading in a year,
          because the visitors it earns keep arriving after you stop paying for the work,
          unlike an ad, which stops the moment the budget does. It is not worth it if you need
          revenue this month, if the business cannot fund three to six quiet months before the
          first real movement, or if you are chasing a product almost nobody is searching for.
          The honest test is not whether SEO works, but whether you have the runway to reach
          the part where it pays for itself.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Adaeze runs a small catering business out of a rented kitchen in Accra. Two months
            into paying a freelancer for SEO work, she nearly cancelled. Traffic had barely
            moved, the invoice had not, and a friend running Facebook ads was already booking
            events off it.
          </p>
          <p>
            She kept the freelancer on, mostly out of stubbornness. By month five, three of her
            past six enquiries had come from a Google search for &ldquo;wedding caterer
            Accra,&rdquo; a phrase her site did not even rank for when she started. Her friend
            was still paying for every single one of his bookings, one click at a time. Adaeze
            was not.
          </p>
          <p>
            Neither of them was wrong about their own channel. They were answering different
            questions &mdash; hers was whether she could survive five quiet months, and it took
            five months to find out.
          </p>
        </Scene>

        <p>
          That is the actual question underneath &ldquo;is SEO worth it,&rdquo; and it rarely
          gets asked honestly. Most answers to it are sales pitches in one direction or bitter
          war stories in the other. This one tries to show the arithmetic plainly enough that
          you can run it against your own business, not ours.
        </p>

        <h2 id="what-worth-it-means">What worth it actually means before you spend anything</h2>

        <p>
          Worth it means the return, measured honestly, outweighs the cost, measured honestly
          &mdash; and most answers to this question only measure one side of that sentence.
        </p>

        <p>
          The cost side is usually stated as a monthly invoice, which is fair. The return side
          gets fuzzier fast, because a rising traffic chart is not the same thing as revenue,
          and a rising ranking is not the same thing as a rising bank balance. A chart that goes
          up and to the right proves that a chart exists; it does not, by itself, prove anyone
          bought anything. The only version of &ldquo;worth it&rdquo; that means something ties
          the cost to leads or sales you can actually trace back to organic search, which is a
          narrower and more useful question than &ldquo;did the numbers go up.&rdquo;
        </p>

        <h2 id="what-you-get">What SEO actually returns</h2>

        <p>
          SEO returns visitors who were already looking for what you sell, arriving without a
          per-click charge attached, on a page that keeps ranking &mdash; and keeps earning
          &mdash; long after the work that built it is finished.
        </p>

        <p>
          That last part is the whole case. An advertising click is rented for the length of one
          visit. A ranking page is closer to owned: the article you publish this quarter can
          still be sending enquiries in two years with no further spend, occasionally with more
          traffic than it had on day one, because it accumulates links, mentions, and trust the
          way a paid placement never gets the chance to. This is also, increasingly, the same
          asset that gets a business named inside an AI assistant&rsquo;s answer rather than
          only listed under it &mdash; the mechanics behind that overlap are covered in{' '}
          <a href="/blog/ai-seo-vs-traditional-seo">AI SEO versus traditional SEO</a>, and the
          short version is that the return on one effort increasingly pays into both surfaces at
          once.
        </p>

        <h2 id="what-it-costs">What it costs, so the return math means something</h2>

        <p>
          A serious small-business SEO effort runs from a few hundred to a couple of thousand
          dollars a month, and the full breakdown of what sits inside that number &mdash;
          research, technical fixes, writing, and reporting &mdash; lives in{' '}
          <a href="/blog/what-seo-actually-costs">what SEO actually costs</a>, which is worth
          reading before either side of this decision gets made. Our own tiers are laid out
          plainly on the <a href="/pricing">pricing page</a> for the same reason: a return you
          cannot weigh against a real number is not a return, it is a hope.
        </p>

        <p>
          Anyone quoting a number that lands suspiciously close to a round figure, with no
          explanation of what it buys, is quoting a price they picked to sound reasonable, not
          one derived from the work in front of them.
        </p>

        <h2 id="how-long">Why the payoff takes months, not weeks</h2>

        <p>
          The payoff takes months because a search engine or an AI assistant has to find a page,
          crawl it, weigh it against competing pages, and gradually extend it trust, and that
          sequence rarely finishes in under three months even when the work itself is finished
          in three days.
        </p>

        <p>
          A rough shape most small businesses see: little visible movement in the first eight to
          twelve weeks while pages get indexed and evaluated, the first meaningful rankings
          appearing between months three and four, and, for a service business with a decent
          transaction value, the cost typically paid back somewhere between month five and month
          nine &mdash; the fuller breakdown of that math lives in{' '}
          <a href="/blog/what-seo-actually-costs">what SEO actually costs</a>. None of that is a
          guarantee &mdash; it is the median shape, and a genuinely crowded market or a site
          starting from serious technical problems can push every one of those numbers later.
        </p>

        <h2 id="when-worth-it">When SEO is worth it</h2>

        <p>
          SEO is worth it when the business will still exist in six months, sells something
          people actually search for, and can fund the work without that funding starving
          something more urgent in the meantime.
        </p>

        <ul>
          <li>
            <strong>You are not closing or pivoting within the year.</strong> The payoff arrives
            on a timeline measured in months, so the business has to be around to collect it.
          </li>
          <li>
            <strong>Customers search before they buy.</strong> Local services, considered
            purchases, and anything with a &ldquo;best X near me&rdquo; equivalent all have
            real search demand behind them.
          </li>
          <li>
            <strong>You can fund three to six quiet months.</strong> Not indefinitely &mdash;
            just long enough to reach the part of the curve where it starts paying for itself.
          </li>
          <li>
            <strong>You want an asset, not just a burst of attention.</strong> A page that keeps
            earning without further spend is a different kind of return than a campaign that
            ends when the budget does.
          </li>
        </ul>

        <h2 id="when-not">When it is not worth it</h2>

        <p>
          SEO is a poor fit for a business that needs revenue in the next thirty days, a product
          almost nobody is typing into a search bar in the first place, or a business closing or
          changing direction within the year &mdash; the months required to see it work will
          outlast the business itself.
        </p>

        <p>
          It is also a poor fit, at least for now, for a business that cannot survive a quiet
          stretch without the SEO budget starving something more urgent, like payroll or stock.
          There is a version of this industry that will tell every prospect SEO is right for
          them, because every prospect is a sale. We would rather tell you honestly that some of
          the time it is not, and that the free AI-visibility check we run before any engagement
          exists partly to catch that case before an invoice does.
        </p>

        <h2 id="seo-vs-ads">SEO versus paid ads, side by side</h2>

        <p>
          Neither wins outright; they are the same budget solving two different problems &mdash;
          one rents attention for as long as it is paid for, the other builds a page that keeps
          working after the spending slows down.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Paid ads</th>
                <th>SEO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Traffic arrives within hours of launch</td>
                <td>Traffic arrives after weeks to months of groundwork</td>
              </tr>
              <tr>
                <td>Every visitor is paid for individually</td>
                <td>A ranking page keeps sending visitors at no extra cost</td>
              </tr>
              <tr>
                <td>Traffic stops the day the budget stops</td>
                <td>Traffic tends to persist, sometimes for years, after work slows</td>
              </tr>
              <tr>
                <td>Cost scales roughly with volume &mdash; more clicks, more spend</td>
                <td>Cost is mostly upfront; volume can grow without a matching cost rise</td>
              </tr>
              <tr>
                <td>Best for urgent, short-term, or seasonal demand</td>
                <td>Best for durable demand you can afford to wait several months for</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Money spent on ads that never converts is gone the instant the campaign ends &mdash;
          no residual page, no lingering ranking, nothing left to show for it but the report. A
          reasonable small-business answer, once there is enough budget for both, is ads for the
          demand that cannot wait and SEO for the demand that compounds; the businesses we see
          get the most value tend to run both rather than treating the choice as permanent.
        </p>

        <h2 id="how-to-check">How to tell whether it is working for you</h2>

        <p>
          You tell by tracking three numbers before you start and again every month after
          &mdash; organic sessions, rankings for the keywords that actually bring buyers, and
          leads or sales you can trace back to organic traffic &mdash; not by staring at a
          dashboard and hoping the green arrows mean something on their own.
        </p>

        <ol>
          {CHECK_STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          It is a small amount of admin, mostly a spreadsheet nobody enjoys updating, and it is
          the only way to answer &ldquo;was it worth it&rdquo; with a number instead of a
          feeling six months from now.
        </p>

        <h2 id="african-angle">Why the math tilts differently in African markets</h2>

        <p>
          In many African markets the return-on-investment case for SEO is stronger than global
          averages suggest, because paid ad costs are climbing fast while organic competition
          for a large share of commercial local terms is still thin.
        </p>

        <p>
          A well-written page targeting &ldquo;plumber Nairobi&rdquo; or &ldquo;wedding caterer
          Accra&rdquo; is often competing against a handful of thin directory listings rather
          than a dozen polished competitor sites, which is a different contest entirely from the
          same search in a saturated Western market. The same gap that makes African businesses
          an easy source for an AI assistant to quote, covered in{' '}
          <a href="/blog/small-business-seo">small business SEO without the agency budget</a>,
          shows up again here: less competition for the same effort means the runway to a
          positive return is often shorter, not longer, than the averages you will find quoted
          elsewhere.
        </p>

        <p>
          The one variable that does not bend in your favour is patience. The months required
          for a search engine or an assistant to trust a new page are the same everywhere,
          regardless of how thin the competition is standing beside it &mdash; a business still
          has to be able to wait for it.
        </p>
      </PostShell>
    </>
  );
}
