import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('google-business-profile-optimization')!;

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
  { id: 'what-it-is', label: 'What Google Business Profile optimization actually is' },
  { id: 'ranking-factors', label: 'The three factors that decide local ranking' },
  { id: 'categories-attributes', label: 'Getting the category and attributes right' },
  { id: 'photos-posts', label: 'Photos and Posts: the cadence that keeps a profile alive' },
  { id: 'reviews', label: 'Reviews: getting them, and answering every one' },
  { id: 'qa-messaging', label: 'Q&A and messaging, the section most businesses forget' },
  { id: 'setup-vs-optimization', label: 'Setup vs optimization, compared' },
  { id: 'what-fails', label: 'What does not work' },
  { id: 'monthly-check', label: 'The monthly check that actually catches decline' },
];

const MONTHLY_STEPS = [
  {
    name: 'Read the Insights tab',
    text: 'Note calls, direction requests, and website clicks for the past 30 days, and compare against the prior month rather than judging a single number in isolation.',
  },
  {
    name: 'Add at least four new photos',
    text: 'Real photos of the premises, product, or work completed that month — not a repost of the same three images from the profile launch.',
  },
  {
    name: 'Publish two to four Posts',
    text: 'Short updates covering offers, hours changes, or new stock, each with a photo and a clear call to action.',
  },
  {
    name: 'Clear the Q&A and review queues',
    text: 'Answer every unanswered question and every new review within a few days, in the business owner voice rather than a generic template.',
  },
  {
    name: 'Recheck category and attributes',
    text: 'Confirm the primary category still matches what the business mainly does, and that seasonal attributes reflect the current offering.',
  },
];

const FAQ = [
  {
    q: 'What is Google Business Profile optimization?',
    a: 'It is the ongoing work of improving a Google Business Profile after it has already been created and verified — choosing the right category and attributes, adding photos and Posts on a regular cadence, answering every review and question, and checking Insights monthly. It is different from setup, which is the one-time act of claiming and verifying the listing.',
  },
  {
    q: 'How often should I update my Google Business Profile?',
    a: 'Weekly is realistic for most small businesses: a new photo or a short Post most weeks, with reviews and questions answered within a few days of arriving rather than left to accumulate. A profile touched only at setup and never again reads as inactive to both the algorithm and the customer scrolling past it.',
  },
  {
    q: 'Do Google Business Profile Posts actually help ranking?',
    a: 'Posts are a weaker ranking signal than category, reviews, or proximity, but they are one of the few activity signals a business fully controls, and they keep the profile looking current to a customer deciding between two similar listings. Treat them as a supporting habit, not the main lever.',
  },
  {
    q: 'How many photos should a Google Business Profile have?',
    a: 'There is no fixed number that guarantees ranking, but profiles with more recent, real photos consistently outperform profiles with a handful of images from launch day. A realistic target is four to eight new photos a month, covering the premises, the work, and the people doing it.',
  },
  {
    q: 'Does responding to reviews affect Google Business Profile ranking?',
    a: 'Responding to reviews feeds the prominence signal Google uses to judge how well-established and trusted a business is, and it is also the most visible piece of ongoing activity a prospective customer sees before they call. A profile with unanswered one-star reviews sitting for months reads as neglected either way.',
  },
  {
    q: 'How long does Google Business Profile optimization take to show results?',
    a: 'Category and attribute fixes can shift local pack position within one to two weeks. Photo, Post, and review habits move more slowly and compound — most businesses notice a measurable difference in calls and direction requests after six to eight consistent weeks, not after a single afternoon of edits.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(MONTHLY_STEPS, 'A monthly Google Business Profile optimization check')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Google Business Profile optimization is the ongoing work of improving a profile that is
          already claimed and verified — choosing the correct category and attributes, adding
          real photos and short Posts on a weekly cadence, answering every review and question,
          and checking Insights monthly to see what is actually moving. It is not the same job as
          setup, which happens once. A verified profile that nobody touches again will slowly lose
          ground to a competitor&rsquo;s profile that gets a new photo every week, even if both
          were completed to the same standard on day one.
        </ShortAnswer>

        <Scene>
          <p>
            Kwame repairs phones from a two-metre counter inside a bigger electronics market in
            Accra. He set up his Google Business Profile eighteen months ago, the way most people
            do it once and never touch it again: category &ldquo;Electronics store,&rdquo; five
            photos from launch week, hours entered and never revisited.
          </p>
          <p>
            The profile ranked fine for a while, because the market was not crowded. Then two
            more repair counters opened in the same building, both with newer listings and a
            steady trickle of fresh photos and Posts. Kwame&rsquo;s profile did not get worse. It
            simply stood still while two others kept moving, which in a ranked list amounts to
            the same thing.
          </p>
          <p>
            He changed the category to &ldquo;Mobile phone repair shop&rdquo; instead of the
            generic one, started posting a photo of a finished repair most weeks, and began
            answering reviews the same day instead of the same season. Calls from the map pack
            picked back up within two months. Nothing about the shop itself had changed — only
            the profile had started acting like a business that was still open.
          </p>
        </Scene>

        <p>
          That is the gap this piece covers. Setting up a Google Business Profile is a one-time
          task most guides already explain well. Keeping it winning is a different, ongoing job,
          and it is the part that quietly decides whether a complete profile from eighteen months
          ago still outranks a newer, more active one today.
        </p>

        <h2 id="what-it-is">What Google Business Profile optimization actually is</h2>

        <p>
          Google Business Profile optimization is the ongoing work of improving an
          already-created, already-verified profile so it keeps winning the local pack, rather
          than the one-time act of creating it. Setup answers the question &ldquo;does this
          business exist on Google Maps at all?&rdquo; Optimization answers a harder, recurring
          question: &ldquo;out of every business that already exists on Maps nearby, why should
          this one be shown first, today?&rdquo;
        </p>

        <p>
          The distinction matters because most advice, and most agencies selling a flat one-time
          fee, stop at setup. A profile is not a plaque you hang once. It behaves more like a
          shopfront window — dressed well on opening day, then either kept fresh or allowed to
          fade, and Google can tell the difference between the two from the outside.
        </p>

        {/* Cluster sibling: local seo for small business (queued) — link here on publish */}

        <h2 id="ranking-factors">The three factors that decide local ranking</h2>

        <p>
          Google ranks a profile in the local pack on three factors — relevance, distance, and
          prominence — and optimization work only meaningfully moves two of them. Distance is
          fixed by the searcher&rsquo;s location and cannot be gamed; relevance and prominence are
          where the actual work happens.
        </p>

        <ul>
          <li>
            <strong>Relevance.</strong> How well the profile matches what the searcher typed,
            decided mostly by the category, the business description, and the attributes checked.
            A mismatched category quietly caps relevance no matter how good everything else is.
          </li>
          <li>
            <strong>Distance.</strong> Proximity between the searcher and the listed location or
            service area. This one is not optimizable in the usual sense — a business cannot edit
            its way closer to a customer.
          </li>
          <li>
            <strong>Prominence.</strong> How well-known and trusted the business appears, drawn
            from review volume, review score, response rate, citations elsewhere on the web, and
            general activity on the profile itself.
          </li>
        </ul>

        <p>
          Almost everything covered below is an attempt to move relevance or prominence, because
          distance is the one lever nobody gets to touch.
        </p>

        <h2 id="categories-attributes">Getting the category and attributes right</h2>

        <p>
          The primary category decides which searches and features a profile is even eligible
          for, and it is worth revisiting even on a profile that already ranks. A category that
          is close but not exact — &ldquo;Electronics store&rdquo; for a business that only
          repairs phones, &ldquo;Restaurant&rdquo; for a business that is really a bakery — quietly
          shrinks the pool of searches the profile can appear in, and Google will not correct it
          for you.
        </p>

        <p>
          Some owners reach for the grandest-sounding category available, the same instinct that
          makes a two-person operation put &ldquo;Corporation&rdquo; in its business name. Google
          does not reward ambition here. It rewards precision, and a precise, slightly humbler
          category tends to outrank a grand, vague one for the searches that actually convert.
        </p>

        <p>
          Secondary categories and attributes are the finer dial: &ldquo;wheelchair accessible
          entrance,&rdquo; &ldquo;identifies as women-owned,&rdquo; &ldquo;free Wi-Fi,&rdquo;
          whatever genuinely applies. Each checked attribute is a small extra way to match a
          searcher&rsquo;s filter, and each one left unchecked because it was never revisited is
          a small missed match.
        </p>

        <h2 id="photos-posts">Photos and Posts: the cadence that keeps a profile alive</h2>

        <p>
          A profile that has not added a new photo or Post in months reads as inactive to Google
          and to the customer scrolling past it, so photos and Posts are the cheapest, most
          controllable activity signal a business has. Neither is a large ranking factor on its
          own; together, sustained over weeks, they are the difference between a profile that
          looks maintained and one that looks abandoned.
        </p>

        <p>
          A remarkable number of otherwise complete profiles are still showing a &ldquo;Grand
          Opening&rdquo; photo set from an event that happened several years and at least one
          paint job ago. Real, recent photos of the premises, the product, and the people doing
          the work outperform stock imagery every time, because a stock photo could belong to any
          business on the continent and a real one unmistakably belongs to this one.
        </p>

        <p>
          Posts function less like a ranking lever and more like a small, free advertisement
          that sits directly on the listing: an offer, a new arrival, a holiday-hours change, each
          with a photo and a clear next step. A weekly habit of four to eight photos and two to
          four Posts a month is realistic for a small business and is already more than most
          competitors manage.
        </p>

        <h2 id="reviews">Reviews: getting them, and answering every one</h2>

        <p>
          Reviews feed the prominence signal Google uses to judge how well-established and
          trusted a business is, and answering every one, good or bad, is the single most visible
          piece of ongoing activity a prospective customer sees before they ever call. Volume and
          score matter, but recency and response rate carry more of the weight than most owners
          assume.
        </p>

        <p>
          Asking happy customers directly, right after a good experience, is the most reliable way
          to build volume — a simple link sent by WhatsApp works better than any review-gating
          gimmick. What a business cannot do is buy reviews or filter out the bad ones before
          asking; Google actively looks for unnatural review patterns, and getting caught costs
          more trust than a few honest one-star reviews ever will.
        </p>

        <p>
          Answering a one-star review about parking the business does not control still matters,
          even though the business can do nothing about the parking itself. A calm, specific reply
          is read by every future customer who scrolls past it, not just the one who left it.
        </p>

        <h2 id="qa-messaging">Q&amp;A and messaging, the section most businesses forget</h2>

        <p>
          The Questions and Answers section sits directly under the contact buttons on a profile,
          and an unanswered question left for a stranger to answer wrong is a lost sale sitting in
          plain sight. Anyone can post a question, and anyone can post an answer — including a
          competitor, a bored stranger, or nobody at all, which leaves the question sitting
          unanswered for months.
        </p>

        <p>
          The fix is small and mechanical: seed the two or three questions customers actually ask
          before booking, answer them from the business account, and check the section along with
          reviews on the same weekly pass. Messaging, where Google enables it for the category,
          works the same way — a fast, real reply is worth more to both the customer and the
          prominence signal than an autoresponder that never resolves anything.
        </p>

        <h2 id="setup-vs-optimization">Setup vs optimization, compared</h2>

        <p>
          Seeing the two side by side makes clear why a complete profile can still lose ground:
          setup is finished once, and optimization is never finished at all.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Setting up a profile (one-time)</th>
                <th>Optimizing a profile (ongoing)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Claim and verify the listing</td>
                <td>Weekly photos and Posts, indefinitely</td>
              </tr>
              <tr>
                <td>Category chosen once, at setup</td>
                <td>Category and attributes rechecked quarterly</td>
              </tr>
              <tr>
                <td>Five to ten launch photos uploaded</td>
                <td>New photos added most months, keeping the profile current</td>
              </tr>
              <tr>
                <td>Hours and contact details entered</td>
                <td>Hours corrected the same day for holidays and closures</td>
              </tr>
              <tr>
                <td>Reviews arrive passively, answered occasionally</td>
                <td>Every review answered within days, good or bad</td>
              </tr>
              <tr>
                <td>Fastest lever: completing verification</td>
                <td>Fastest lever: staying visibly active every week</td>
              </tr>
            </tbody>
          </table>
        </figure>

        {/* Cluster sibling: how to appear on google maps (queued) — link here on publish */}

        <p>
          The full mechanics of the setup half — claiming, verifying, and the three separate
          surfaces a business earns on Google — are covered in{' '}
          <a href="/blog/how-to-get-my-business-on-google">how to get your business on Google</a>.
          This piece picks up exactly where that one leaves off.
        </p>

        <h2 id="what-fails">What does not work</h2>

        <p>
          The failure modes here are old habits dressed up as effort — activity that looks like
          optimization but does not move ranking or trust, and in a few cases actively damages
          both.
        </p>

        <ul>
          <li>
            <strong>Keyword-stuffing the business name.</strong> Appending &ldquo;24/7 Emergency
            Best Cheap&rdquo; to a business name violates Google&rsquo;s guidelines and risks
            suspension, not a ranking boost.
          </li>
          <li>
            <strong>Buying reviews, or gating them to hide the negative ones.</strong> Google
            actively detects unnatural review patterns, and the downside of getting caught is
            worse than a slightly lower average score.
          </li>
          <li>
            <strong>Posting once and disappearing for a year.</strong> A burst of activity at
            setup followed by silence reads as abandonment eventually, the same as never posting
            at all — consistency beats intensity.
          </li>
          <li>
            <strong>Chasing a &ldquo;guaranteed #1 map pack ranking&rdquo; retainer.</strong> Any
            agency selling a guaranteed position is selling the same thing as a guaranteed
            forecast for next Tuesday&rsquo;s weather — confident, specific, and not actually
            theirs to promise.
          </li>
        </ul>

        <p>
          The honest exception is worth stating plainly: a business that already ranks first for
          its main terms in a small town with little competition gets genuinely diminishing
          returns from more optimization. Past a certain point, the arithmetic favors spending
          that afternoon on the website or on{' '}
          <a href="/blog/answer-engine-optimization">being named in an AI assistant&rsquo;s answer</a>{' '}
          instead of squeezing a local pack position that is already secure.
        </p>

        <h2 id="monthly-check">The monthly check that actually catches decline</h2>

        <p>
          Checking whether a Google Business Profile is actually working takes a fixed monthly
          routine, not a tool subscription. The five steps below take under an hour and catch
          decline early, before a competitor&rsquo;s steadier activity quietly overtakes a profile
          that used to rank first.
        </p>

        <ol>
          <li>
            Read the Insights tab and note calls, direction requests, and website clicks for the
            past 30 days, compared against the prior month rather than judged alone.
          </li>
          <li>
            Add at least four new photos of the premises, the product, or work completed that
            month.
          </li>
          <li>
            Publish two to four Posts covering offers, hours changes, or new stock, each with a
            photo and a clear next step.
          </li>
          <li>
            Clear the Q&amp;A and review queues, answering everything new within a few days, in
            the owner&rsquo;s own voice.
          </li>
          <li>
            Recheck the category and attributes against what the business actually does today,
            not what it did at setup.
          </li>
        </ol>

        <p>
          Structured data on the actual website — matching name, address, and phone number
          exactly — removes ambiguity for whatever reads the page next, covered in more depth in{' '}
          <a href="/blog/what-is-schema-markup">what schema markup actually is</a>. None of this
          replaces the small business SEO groundwork underneath it, laid out in{' '}
          <a href="/blog/small-business-seo">small business SEO without the agency budget</a>,
          but a profile that is optimized every month, not just set up once, is usually the
          fastest single lever a local business has for showing up first — before the website
          ranks, before the AI assistant learns the name, and often before the competitor across
          the road remembers their login password.
        </p>
      </PostShell>
    </>
  );
}
