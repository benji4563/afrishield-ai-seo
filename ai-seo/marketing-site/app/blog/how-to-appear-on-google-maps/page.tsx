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

const post = getPost('how-to-appear-on-google-maps')!;

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
  { id: 'why-not-showing', label: 'Why you might not be showing at all' },
  { id: 'three-factors', label: 'The three factors Google Maps actually uses' },
  { id: 'fundamentals', label: 'Get the profile fundamentals right first' },
  { id: 'categories-service-area', label: 'Category and service area, the choices that matter' },
  { id: 'reviews', label: 'Reviews, the signal Google trusts most' },
  { id: 'what-sabotages', label: 'What sabotages a Maps ranking' },
  { id: 'map-pack-vs-organic', label: 'Map pack visibility vs organic ranking' },
  { id: 'fix-steps', label: 'The fix, step by step' },
  { id: 'tracking', label: 'How to tell if it is working' },
];

const FAQ = [
  {
    q: 'Why is my business not showing on Google Maps?',
    a: 'The most common reasons are an unverified or incomplete Google Business Profile, a primary category that does not match what people search for, no reviews to establish trust, or a listing that is simply too far from the searcher for the query used. Google Maps cannot rank a profile it cannot fully read, so an incomplete listing is usually the first place to look.',
  },
  {
    q: 'How long does it take to rank on Google Maps?',
    a: 'A newly verified, well-completed profile can start appearing for some searches within days, but competing for the three-pack on a busy term typically takes eight to twelve weeks of consistent reviews, accurate category and service-area settings, and citation cleanup. Google appears to weigh a track record of engagement over time, not just what the profile says today.',
  },
  {
    q: 'Does paying for Google Ads help Maps ranking?',
    a: 'No. Google Ads can buy a paid placement that sits above or beside the organic map pack, but it does not influence where a business ranks in the free three-pack itself. The organic Maps result is earned through relevance, distance, and prominence, the same three factors regardless of ad spend.',
  },
  {
    q: 'Can I rank on Google Maps without a public business address?',
    a: 'Yes, if the business is a genuine service-area business — a plumber, a mobile mechanic, a cleaning company that travels to the customer. Google Business Profile supports hiding the address and defining a service area instead. What it does not support is listing a home address as if it were a public storefront when it is not, which risks suspension.',
  },
  {
    q: 'How many reviews do I need to show on Google Maps?',
    a: 'There is no published minimum, and any number quoted online is an estimate from watching results, not a Google rule. In practice, competing for a contested map pack usually needs a review count in the same range as the businesses already occupying it, with a rating that holds above roughly four stars and new reviews arriving on a steady drip rather than in one burst.',
  },
  {
    q: 'What is the Google Maps three-pack?',
    a: 'It is the block of three business listings, shown with a small map, that Google places above the ordinary organic results for a local search. It is the highest-visibility local real estate on the page, and appearing in it is what most business owners mean when they ask how to appear on Google Maps.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={howToJsonLd(
          [
            {
              name: 'Claim and verify the profile',
              text: 'Claim the Google Business Profile if nobody has, and complete Google verification by postcard, phone, email, or video, whichever option is offered.',
            },
            {
              name: 'Match the primary category to the exact service',
              text: 'Set the primary category to the most specific match for the core service, not the broadest one, and add secondary categories only for services genuinely offered.',
            },
            {
              name: 'Fix name, address, and phone everywhere',
              text: 'Make the business name, address, and phone number identical across the Google profile, the website footer, and every directory listing that already exists.',
            },
            {
              name: 'Build a steady stream of reviews',
              text: 'Ask every satisfied customer for a review at the moment satisfaction is highest, spread over weeks rather than requested all at once.',
            },
            {
              name: 'Add proof to the profile',
              text: 'Upload real photos of the premises, team, and work, and post a Google Post at least monthly so the profile shows recent activity.',
            },
            {
              name: 'Recheck rankings from several points on the map',
              text: 'Search the target term from a few different locations around the service area, since Google Maps results shift with the searcher’s position.',
            },
          ],
          'How to appear on Google Maps',
        )}
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
          A business appears on Google Maps by having a fully verified Google Business Profile
          whose category, location, and reviews match what a searcher typed and where they are
          standing. Google Maps ranks listings on three factors — relevance, distance, and
          prominence — and most businesses that are invisible on the map are missing one of
          them outright: an unverified profile, the wrong primary category, or too few reviews
          to be trusted over a competitor.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Adaeze runs a printing and branding shop off a busy road in a mid-sized African
            city. The shop has been there for six years, the work is good, and word of mouth
            has kept it alive. She only checked Google Maps after a regular customer mentioned,
            almost in passing, that she could not find the shop when she searched for it from
            her new office across town.
          </p>
          <p>
            Adaeze searched it herself. Two competitors she recognised showed up in the map
            block. Her shop appeared, eventually, on the third scroll of the list view — a
            profile she had claimed years earlier and never opened again, with one photo, a
            category that said &ldquo;Print shop&rdquo; instead of the more specific service she
            actually specialised in, and four reviews from 2022.
          </p>
          <p>
            Nothing about the business had gotten worse. The profile had simply stood still
            while the two shops around it kept feeding Google exactly what it wanted.
          </p>
        </Scene>

        <p>
          This is the ordinary story behind &ldquo;why can nobody find us on Google Maps.&rdquo;
          It is rarely a broken listing. It is usually a listing doing nowhere near the amount
          of work it could, sitting one tier behind competitors who treat their profile as
          something to maintain rather than something to set up once and forget.
        </p>

        <h2 id="why-not-showing">Why you might not be showing at all</h2>

        <p>
          A business is invisible on Google Maps for one of four reasons: an unverified profile,
          a primary category that does not match how people actually search, a location genuinely
          too far from the searcher for that particular query, or a near-identical competitor
          that has simply built more trust signals — mostly reviews — than the profile in
          question.
        </p>

        <p>
          It is worth separating two different complaints that get lumped together. &ldquo;We do
          not show up at all&rdquo; usually points to an unverified or suspended profile, or a
          business name and category combination Google cannot confidently match to the search.
          &ldquo;We show up, just not in the top three&rdquo; is a different, more common
          problem, and it is the one the rest of this piece is mostly about.
        </p>

        <h2 id="three-factors">The three factors Google Maps actually uses</h2>

        <p>
          Google has stated plainly that Maps ranks local results on relevance, distance, and
          prominence, and nearly every tactic worth doing traces back to moving one of those
          three. Nothing else on this list is a fourth secret factor — it is one of these three
          wearing a different name.
        </p>

        <ul>
          <li>
            <strong>Relevance.</strong> How well the profile matches what was searched. This is
            decided mostly by the primary category, the business description, and the services
            listed, not by cramming the keyword into the business name.
          </li>
          <li>
            <strong>Distance.</strong> How close the business is to the location implied by the
            search, whether that is the searcher&rsquo;s GPS position or a city name typed into
            the query. A business cannot out-write its way past geography, which is the one
            factor here that pure content work does not move.
          </li>
          <li>
            <strong>Prominence.</strong> How well known and trusted Google judges the business to
            be, drawn mostly from review count and rating, but also from citations across the
            web, general search-ranking authority, and how complete the profile is.
          </li>
        </ul>

        <p>
          Most of the practical advice in local SEO — reviews, categories, citations, photos —
          is an attempt to move prominence or relevance, since distance is fixed by where the
          business physically operates.
        </p>

        <h2 id="fundamentals">Get the profile fundamentals right first</h2>

        <p>
          Verification and completeness come before anything else, because an unverified or
          half-filled profile is not competing for relevance and prominence at all — it is
          often not eligible to compete. Claim the profile through Google Business Profile if
          nobody already has, and complete whichever verification method is offered: postcard,
          phone, email, or video, in that rough order of how often Google offers them.
        </p>

        <p>
          Once verified, fill in every field the interface offers, not only the required ones.
          Hours, an accurate service list, attributes (wheelchair access, whether a business is
          Black-owned or woman-led, payment methods accepted), and a written description all
          feed relevance. A profile with six fields filled in is reading, to Google, as a
          business that might not still be operating. A profile with everything filled in reads
          as one that is actively maintained — which, on Google Maps, is most of the job. This
          initial setup pass is distinct from{' '}
          <a href="/blog/google-business-profile-optimization">the ongoing optimization work a
          profile needs after it is already live</a>, covered separately.
        </p>

        <h2 id="categories-service-area">Category and service area, the choices that matter</h2>

        <p>
          The primary category is the single most influential field on the entire profile, more
          than the business name and more than any individual review. Google Business Profile
          lets a business pick one primary category and several secondary ones, and the primary
          category should be the most specific match available for the core service, not the
          broadest one that technically fits.
        </p>

        <p>
          &ldquo;Electrician&rdquo; is broad enough to compete against every electrician in the
          city. &ldquo;Emergency electrician&rdquo; is a smaller, more winnable pond, and it is
          also closer to what a customer with a tripped circuit at 11pm actually types. The same
          logic applies to service area: a business that travels to the customer should define
          that area honestly in the profile rather than leaving Google to guess from a single
          pinned address, and a business with a genuine walk-in storefront should keep the
          address visible rather than hiding it, since a hidden address on a real storefront
          reads as a red flag to Google&rsquo;s spam systems, not as privacy.
        </p>

        <h2 id="reviews">Reviews, the signal Google trusts most</h2>

        <p>
          Review count, rating, and how recently reviews arrived are the strongest prominence
          signal Google has, because they are the hardest signal for a business to fabricate at
          scale without eventually being caught. A profile with forty recent reviews at 4.6
          stars will usually outrank a technically better business sitting on six reviews from
          two years ago, and Google Maps users make the same judgement with their eyes before
          they even click through.
        </p>

        <p>
          The reliable way to build this is unglamorous: ask every satisfied customer, at the
          moment satisfaction is highest, with a direct link that takes three taps to complete.
          Spread the requests out over weeks. A sudden burst of forty reviews in one weekend
          looks, to Google&rsquo;s abuse detection, exactly like what it usually is elsewhere —
          a bought batch — even on the rare occasion it is genuine. Steady and boring beats fast
          and suspicious every time, and it is also the honest version of the advice, since there
          is no shortcut here that survives a review-quality check.
        </p>

        <h2 id="what-sabotages">What sabotages a Maps ranking</h2>

        <p>
          Keyword-stuffed business names, duplicate listings, a mismatched category, and
          inconsistent name-address-phone data actively push a Maps listing down rather than
          merely failing to help it, and most of them come from someone trying to game relevance
          instead of earning it.
        </p>

        <ul>
          <li>
            <strong>Keyword-stuffing the business name.</strong> Adding &ldquo;— Best Plumber
            Lagos&rdquo; to the official business name violates Google&rsquo;s guidelines
            outright and is one of the more common reasons a competitor&rsquo;s complaint gets a
            profile suspended.
          </li>
          <li>
            <strong>Duplicate listings.</strong> A second, forgotten profile from years ago
            splits reviews and confuses the relevance signal. It should be found and merged or
            removed, not left to compete against itself.
          </li>
          <li>
            <strong>A category that does not match reality.</strong> Choosing
            &ldquo;Restaurant&rdquo; because it is high-volume, when the business is actually a
            catering company, earns clicks that bounce immediately — and bounce rate is itself a
            signal.
          </li>
          <li>
            <strong>Inconsistent name, address, and phone data.</strong> A different phone
            number on the website footer than on the Google profile, or an old address still
            live on a directory, dilutes the trust signal every citation is supposed to build.
          </li>
        </ul>

        <h2 id="map-pack-vs-organic">Map pack visibility vs organic ranking</h2>

        <p>
          Map pack ranking and ordinary organic ranking are related but run on different
          signals, one weighted toward a single Google Business Profile and physical distance,
          the other toward a whole website&rsquo;s content and backlink history — worth seeing
          side by side once, so the difference stops costing a small business owner&rsquo;s time.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Ordinary organic ranking leans on</th>
                <th>Map pack ranking adds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Backlinks and content depth across the whole site</td>
                <td>One Google Business Profile as the primary asset</td>
              </tr>
              <tr>
                <td>Keyword matching on the page</td>
                <td>Category matching on the profile</td>
              </tr>
              <tr>
                <td>Any location, if the content is strong enough</td>
                <td>Physical or service-area distance to the searcher</td>
              </tr>
              <tr>
                <td>Domain authority built over years</td>
                <td>Review count and rating, which can shift in months</td>
              </tr>
              <tr>
                <td>Written trust signals — citations, mentions, press</td>
                <td>Photos, Posts, and Q&amp;A activity on the profile itself</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The reassuring part of this table is the last row. Map pack visibility can move faster
          than a full organic ranking climb, because a profile is a smaller, more controllable
          surface than an entire website&rsquo;s backlink history.
        </p>

        <h2 id="fix-steps">The fix, step by step</h2>

        <p>
          For a business starting from an unclaimed or neglected profile, this is the order that
          gives the fastest return for the least effort.
        </p>

        <ol>
          <li>
            Claim and verify the profile if it is not already, using whichever verification
            method Google offers.
          </li>
          <li>
            Set the primary category to the most specific honest match, and add secondary
            categories only for services genuinely offered.
          </li>
          <li>
            Audit the business name, address, and phone number against the website and every
            directory that already lists the business, and fix every mismatch found.
          </li>
          <li>
            Start a steady, spread-out review request habit rather than a one-time push.
          </li>
          <li>
            Upload real photos of the premises, team, and finished work, and post a Google Post
            at least once a month so the profile shows visible recent activity.
          </li>
          <li>
            Search the target term from a few different points around the service area — the
            result changes with the searcher&rsquo;s position, so one search from the office is
            not the full picture.
          </li>
        </ol>

        <p>
          None of these six steps requires a developer, an agency, or a monthly retainer. What
          they require is doing them in order and not stopping after step one, which is where
          most neglected profiles — including Adaeze&rsquo;s, before she fixed it — got stuck the
          first time around.
        </p>

        <h2 id="tracking">How to tell if it is working</h2>

        <p>
          Track the map pack position from several simulated locations around the service area,
          not from a single search at the office desk, because Google Maps results genuinely
          shift with where the search appears to originate. A business can rank first from one
          side of a city and not appear in the top three from the other side of the same city,
          and both readings are correct at once.
        </p>

        <p>
          A free, low-effort version of this is asking a few contacts in different parts of the
          service area to search the target term on their own phones and screenshot the result.
          It will not have the precision of a paid geo-grid rank tracker, but it catches the
          thing that matters most for a small operation: whether the fixes above are moving the
          needle at all, or whether something — a suspended profile, a duplicate listing, a
          category mismatch — is still quietly cancelling out the work.
        </p>

        <p>
          This sits inside the same broader work covered in{' '}
          <a href="/blog/local-seo-for-small-business">the local SEO checklist for small
          business</a>. Maps is one of three separate ways a business shows up on Google,
          alongside organic search and AI answers, which{' '}
          <a href="/blog/how-to-get-my-business-on-google">the fuller walkthrough on getting a
          business onto Google</a> covers end to end. None of it is exotic. It is the same short
          list of unglamorous fields, kept current, for longer than the competitor down the road
          is willing to bother.
        </p>
      </PostShell>
    </>
  );
}
