import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-reduce-ota-commission')!;

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
  { id: 'the-arithmetic', label: 'First, do the arithmetic' },
  { id: 'why-otas-win', label: 'Why the OTAs keep winning the booking' },
  { id: 'direct-bookable', label: 'Make direct booking actually bookable' },
  { id: 'own-the-searches', label: 'Own the searches that end in a reservation' },
  { id: 'ai-answers', label: 'Get named in the AI answer' },
  { id: 'past-guests', label: 'Past guests are the cheapest channel you own' },
  { id: 'off-season', label: 'Use the off-season to build, not to discount' },
  { id: 'measure', label: 'How to measure whether it is working' },
];

const FAQ = [
  {
    q: 'How much commission does Booking.com charge hotels?',
    a: 'Rates vary by agreement and market, but FEDHASA — the South African hospitality association — reports platform commissions ranging from 10 to 25 percent, averaging 15. The same reporting notes that commission is typically calculated on the VAT-inclusive price, which raises the effective rate further. Check your own statement; the number there is the one that matters.',
  },
  {
    q: 'Can a hotel just leave the OTAs entirely?',
    a: 'Usually not, and it is rarely the right goal. OTAs fill rooms that would otherwise stay empty, and a room not filled is revenue gone permanently. The workable goal is to change the mix: keep the platforms for reach while building a direct channel that handles a growing share of bookings at zero commission. Dependence is the problem, not the listing.',
  },
  {
    q: 'What is rate parity and why does it matter?',
    a: 'Rate parity is a contract clause that stops a property from advertising a lower price on its own website than on the platform. It is why "book direct and save" is harder than it sounds — the saving usually has to come as added value (breakfast, an airport transfer, flexible cancellation) rather than a lower sticker price. Regulators in several markets have challenged these clauses, but treat them as in force unless your own agreement says otherwise.',
  },
  {
    q: 'How long does it take to shift bookings from OTA to direct?',
    a: 'The website fixes work in weeks. The visibility that fills them takes months — early ranking movement in six to twelve weeks, meaningful direct-booking volume in six months or more of consistent publishing and profile work. Past-guest email and WhatsApp rebooking can produce direct reservations almost immediately, because those guests already trust you.',
  },
  {
    q: 'Does this work for a small lodge or guest house, or only big hotels?',
    a: 'It works better for small properties, if anything. A big hotel chain competes on head terms against the OTAs themselves. A small lodge competes on specific searches — the park, the route, the experience — where the platforms are thin and a well-built page can genuinely rank. The arithmetic also bites harder: 20 percent of a small property\u2019s month is the difference between profit and payroll anxiety.',
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
          Reducing OTA commission means moving part of your bookings from platforms that
          charge 10–25 percent per reservation to channels you own: a website that ranks for
          the searches travelers actually run, a booking path that works on a phone, presence
          in the AI assistants travelers now plan with, and direct rebooking of past guests.
          You do not leave Booking.com or Expedia — you make them optional. The playbook
          below is the order that works: fix the booking path, win the specific searches, get
          cited by AI assistants, then work your past-guest list.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            A lodge owner outside Hoedspruit does the month-end arithmetic the way lodge
            owners do everywhere: occupancy first, then the line underneath it. This month
            the second line is bigger than the first one deserves. Thirty-one bookings came
            through the platforms. At the commission on her agreement, that is roughly a
            bakkie-load of money — a real vehicle, with tyres — handed over for the privilege
            of being found.
          </p>
          <p>
            She does not hate the platforms. They fill beds in the quiet months, and a bed
            not filled is money gone for good. What bothers her is that she has no second
            line of her own. Her website is a brochure her cousin built in 2019. Every guest
            arrived through a middleman. Every single one.
          </p>
          <p>
            The fix took a season, not a week. But the first direct booking that arrived with
            no commission attached to it got a screenshot and a place in the family WhatsApp
            group, which is where all proper African business milestones are recorded.
          </p>
        </Scene>

        <p>
          That arithmetic is the entire case for this piece. OTA commission is not a
          marketing problem you argue about — it is a cost line you can measure to the rand.
          FEDHASA, South Africa&rsquo;s hospitality association, reports platform commissions
          ranging from 10 to 25 percent, averaging 15. What follows is the playbook for
          shrinking that line, in the order that actually works.
        </p>

        <h2 id="the-arithmetic">First, do the arithmetic</h2>

        <p>
          Take your last full month: count the OTA bookings, multiply by the average nightly
          rate and nights, then by your commission rate. A property doing 30 OTA bookings a
          month at a $300 average hands the platforms $1,350 to $2,250 every month. That
          number is the budget for everything below — any direct-booking work that costs less
          than the commission it recovers is self-funding, and most owners have never written
          the number down.
        </p>

        <p>
          One detail from the trade press is worth knowing before you negotiate anything:
          City Lodge&rsquo;s finance director has pointed out publicly that commission is
          charged on the VAT-inclusive price, so the effective rate is higher than the one in
          the contract. Read your own statement with that in mind. The number you find is not
          an argument for rage-quitting the platforms — an empty room earns nothing, as the
          association people keep saying — it is an argument for building a channel that does
          not charge you.
        </p>

        <h2 id="why-otas-win">Why the OTAs keep winning the booking</h2>

        <p>
          OTAs win for three boring reasons, and none of them is that travelers love paying
          more. They rank for the searches, because they have spent two decades and a small
          nation&rsquo;s GDP doing it. Their booking path works flawlessly on any phone. And
          they carry thousands of reviews, which is the trust layer an unknown property
          cannot fake.
        </p>

        <p>
          Rate parity clauses close the last escape hatch: most agreements stop you from
          advertising a lower price on your own site. FEDHASA has said publicly that these
          clauses placed undue pressure on accommodation providers precisely because the
          commissions were so much higher. So the direct channel cannot win on sticker price.
          It has to win on being findable at all — which is the part the platforms have not
          actually locked down.
        </p>

        <h2 id="direct-bookable">Make direct booking actually bookable</h2>

        <p>
          The first job is making it possible for a convinced visitor to give you money in
          under two minutes on a mid-range phone. This is the unglamorous step, and it is
          where most direct-booking efforts quietly die: the strategy is fine, the booking
          form emails an inbox somebody checks on Tuesdays.
        </p>

        <ul>
          <li>
            <strong>One obvious booking action per page.</strong> Not four competing buttons.
            A traveler on one bar of signal should never have to think about which one is
            real.
          </li>
          <li>
            <strong>Real rates, visible.</strong> &ldquo;Enquire for rates&rdquo; is a polite
            way of saying &ldquo;book on the OTA instead,&rdquo; because the OTA shows a
            number and you showed a chore.
          </li>
          <li>
            <strong>A page that loads on a mid-range Android on patchy data.</strong> Test it
            on an actual phone, not a desktop preview. A nine-second page has, in effect, not
            been published.
          </li>
          <li>
            <strong>A reason to book direct that survives parity.</strong> You cannot
            undercut on price, so add value: breakfast, the airport transfer, flexible
            cancellation, first choice of rooms. Put it next to the booking button.
          </li>
        </ul>

        <h2 id="own-the-searches">Own the searches that end in a reservation</h2>

        <p>
          The OTAs rank for the head terms — &ldquo;hotels in Cape Town,&rdquo; &ldquo;Serengeti
          lodge&rdquo; — and you will not take those from them. What they do not rank for is
          the long tail: the specific park gate, the specific route, the specific kind of
          traveler, the specific month. Those searches are fewer, and they convert better,
          because the person running them has already decided to come.
        </p>

        <p>
          Owning them is ordinary SEO work done consistently: one page per real search,
          written to answer the question a traveler actually asks, on a technically sound
          site, published on a schedule rather than in a burst. Six to twelve weeks for early
          movement, six months for compounding volume. It is slow the way rent is slow —
          right up until it is the thing paying you.
        </p>

        <p>
          The full version of what an engagement like this includes — research, the content
          engine, the reporting — is on{' '}
          <a href="/solutions">the solutions page</a>, and the lodge-specific offer is on{' '}
          <a href="/for-lodges-hotels">SEO for lodges and hotels</a>.
        </p>

        <h2 id="ai-answers">Get named in the AI answer</h2>

        <p>
          A growing share of travelers now plan by asking ChatGPT, Perplexity, or Gemini
          where to stay — and the assistant answers with two or three names, not ten blue
          links. That answer is the new front desk, and the OTAs&rsquo; grip on it is much
          weaker than their grip on Google. A property with clear, structured, checkable
          information can be named there before it outranks anyone.
        </p>

        <p>
          The mechanics — letting AI crawlers read your site, answer-first content blocks,
          structured data that says what and where you are — are covered in{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">
            how to get your hotel cited by ChatGPT
          </a>{' '}
          and on <a href="/geo-services">the GEO services page</a>. The short version: the
          assistant does not care about your sunset photography. It has never seen a sunset.
          It cares that your page states, plainly and consistently, what you are, where you
          are, and what a night costs.
        </p>

        <h2 id="past-guests">Past guests are the cheapest channel you own</h2>

        <p>
          Every guest who has stayed with you is a future direct booking, because the trust
          problem is already solved — they know the rooms are real. A quarterly email or a
          WhatsApp note to past guests, with a returning-guest rate or an added extra, costs
          almost nothing and converts at rates a cold channel cannot touch.
        </p>

        <p>
          Most properties have this list already, sitting in a spreadsheet or a booking
          system, untouched. It is the only marketing asset on this list you fully own, and
          typically the least used. Start there while the SEO work compounds.
        </p>

        <h2 id="off-season">Use the off-season to build, not to discount</h2>

        <p>
          Operators report off-season drops of 70 to 80 percent, and the standard response —
          discounting — fills the odd room at a loss while teaching guests to wait for the
          sale. The better use of the quiet months is publishing: content aimed at the
          hemisphere currently in winter, so the European planner booking a January trip
          finds pages you wrote in September.
        </p>

        <p>
          This is counter-intuitive only because content pays late. The lodge that publishes
          through the low season is the one the high-season planner finds. The one that
          discounts is renting its own rooms back at a worse price.
        </p>

        <h2 id="measure">How to measure whether it is working</h2>

        <p>
          Three numbers, monthly, no dashboard required: direct bookings as a share of total
          bookings, enquiries that arrived through your own site, and what the AI assistants
          say when asked where to stay near you. If the first one is climbing, the commission
          line is shrinking by exactly that much — the one metric in marketing that
          reconciles with your bank statement.
        </p>

        <p>
          What not to measure: impressions, reach, and anything with the word
          &ldquo;engagement&rdquo; in it. A report full of those is a report written for the
          agency&rsquo;s renewal, not your occupancy. If you want the work run for you with
          the numbers kept honest, the tiers are published on{' '}
          <a href="/pricing">the pricing page</a> and the starting point is a{' '}
          <a href="/contact">free AI-visibility check</a> — what the assistants say about your
          property today, before anyone invoices anyone.
        </p>
      </PostShell>
    </>
  );
}
