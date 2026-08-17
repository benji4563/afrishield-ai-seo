import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('local-seo-for-small-business')!;

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
  { id: 'what-local-seo-is', label: 'What local SEO actually is' },
  { id: 'how-different', label: 'How local SEO differs from general SEO' },
  { id: 'ranking-factors', label: 'What actually moves local rankings' },
  { id: 'nap-consistency', label: 'NAP consistency, the boring foundation' },
  { id: 'citations', label: 'Citations and directories worth the time' },
  { id: 'reviews', label: 'Reviews: how many, how fast, how honest' },
  { id: 'local-content', label: 'Local content that actually helps' },
  { id: 'check-progress', label: 'How to tell if it is working' },
];

const FAQ = [
  {
    q: 'What is local SEO for a small business?',
    a: 'It is the set of steps that make a business findable when someone nearby searches for what it sells — an accurate Google Business Profile, consistent name, address, and phone details across the web, a steady flow of reviews, and pages written for near-me searches. The goal is appearing in the map pack and being named in local AI answers, not just ranking a website nationally.',
  },
  {
    q: 'How much does local SEO cost for a small business?',
    a: 'A small business can do the core work for free — claiming and completing a Google Business Profile, fixing citation mismatches, and asking customers for reviews cost time, not money. Paying for it typically runs from roughly a hundred to a few hundred dollars a month for ongoing management, more if it includes content and multiple locations. Anyone quoting a guaranteed top-three spot is quoting fiction.',
  },
  {
    q: 'How long does local SEO take to work?',
    a: 'Google Business Profile changes can shift the map pack within a few weeks, since Google already trusts the listing and is mostly reacting to new signals. Citation and review work takes longer to compound, typically two to four months before it shows clearly in rankings. A brand-new business with no history takes longer still, closer to the general SEO timeline of three to six months.',
  },
  {
    q: 'Do I need a physical address for local SEO to work?',
    a: 'You need a real, verifiable location Google can confirm, but it does not have to be a shopfront customers walk into. Service-area businesses — plumbers, cleaners, mobile mechanics — can hide their exact address on the profile and still rank, as long as the area served is set honestly and the business can prove the address on verification. A P.O. box or a fabricated address gets a listing suspended.',
  },
  {
    q: 'Can a small business owner do local SEO without hiring anyone?',
    a: 'Most of it, yes. Claiming and completing a Google Business Profile, fixing citations, and asking for reviews are all things an owner can do in a few focused afternoons with no special tools. Where it gets harder to do alone is the ongoing maintenance across dozens of listings and the local content writing, which is usually where owners either run out of time or hire it out.',
  },
  {
    q: 'What is the difference between local SEO and Google Business Profile optimization?',
    a: 'Google Business Profile optimization is one piece of local SEO, not the whole of it. Local SEO also covers citation consistency across other directories, review generation across platforms, local link building, and content built around specific service areas. A well-optimised profile with no citations or reviews behind it will still underperform a mediocre profile backed by a consistent, corroborated presence everywhere else.',
  },
];

const HOWTO_STEPS = [
  {
    name: 'Track your local pack ranking',
    text: 'Search your two or three most valuable local terms from a phone with location on, in an incognito or private window, and note whether your business appears in the map pack of three results.',
  },
  {
    name: 'Log new reviews weekly',
    text: 'Count new reviews added since the last check, on Google and on the two or three other platforms your customers actually use, and note the average rating movement.',
  },
  {
    name: 'Check Google Business Profile performance',
    text: 'In the Business Profile performance report, note calls, direction requests, and website clicks for the month, and compare the total against the prior month rather than a single day.',
  },
  {
    name: 'Ask an AI assistant a near-me question',
    text: 'Ask ChatGPT, Claude, or Perplexity a question a real nearby customer would ask, and note whether your business is named and whether the details given about it are correct.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={howToJsonLd(HOWTO_STEPS, 'How to check if your local SEO is working')}
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
          Local SEO for small business is the concrete work that gets you found when someone
          nearby searches for what you sell: an accurate, fully completed Google Business
          Profile, the exact same name, address, and phone number everywhere your business is
          listed, a steady flow of real reviews, and pages built for near-me searches. It
          differs from general SEO in what counts as ranking well — proximity to the searcher
          and prominence in local listings matter as much as the words on your page. None of
          it is exotic. Most of it is unglamorous maintenance, done correctly and kept correct.
        </ShortAnswer>

        <Scene>
          <p>
            Fatima runs an auto-repair garage off Thika Road in Nairobi. For eleven years the
            work found her the old way — a regular customer, a referral, someone who saw the
            sign from the road and remembered it next time a car made a bad noise.
          </p>
          <p>
            Then a customer stranded two streets away searched &ldquo;auto repair near
            me&rdquo; on her phone. Three garages came up in the map pack. Fatima&rsquo;s,
            objectively the closest, was not one of them. Her Google Business Profile still
            listed the old cross street, had four photos from 2019, and had not answered a
            review in over a year.
          </p>
          <p>
            She was not beaten on price or trust. She was invisible to the one system that
            decided who got considered before the decision was even close.
          </p>
        </Scene>

        <p>
          That gap is the whole subject of this piece: what local SEO actually is for a small
          business, the handful of inputs that genuinely move it, and the specific,
          checkable work — not a monthly retainer pitch — that closes it. Where a claim is
          measured rather than certain, we say so instead of promising a number nobody can
          promise honestly.
        </p>

        <h2 id="what-local-seo-is">What local SEO actually is</h2>

        <p>
          Local SEO is the practice of making a business appear when people nearby search for
          what it offers — in the Google Maps pack of three results shown above organic
          listings, in local organic search, and increasingly by name in AI assistant answers
          to a near-me question. It sits alongside general SEO rather than replacing it; a
          site still needs to load fast and answer questions clearly. What local SEO adds is a
          location layer general SEO does not touch at all.
        </p>

        <p>
          For a shop, clinic, restaurant, or trade business with customers who choose based on
          who is closest and trusted, this layer is usually worth more attention than anything
          else on the SEO list — more than blog volume, more than backlinks from sites nobody
          local reads.
        </p>

        <h2 id="how-different">How local SEO differs from general SEO</h2>

        <p>
          Local SEO differs from general SEO in the extra inputs it depends on: a verified
          location, distance from the person searching, and prominence built from citations
          and reviews — inputs a purely online or national business never has to satisfy at
          all. General SEO rewards the best page on a topic anywhere on the internet; local
          SEO rewards the best-matched, closest, most trusted business for that exact search
          and that exact place.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>General SEO leans on</th>
                <th>Local SEO adds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Content quality and topical depth</td>
                <td>A verified, correctly categorised Google Business Profile</td>
              </tr>
              <tr>
                <td>Backlinks from relevant sites, anywhere</td>
                <td>Citations from local and industry directories in the same city</td>
              </tr>
              <tr>
                <td>Site speed and technical health</td>
                <td>Proximity between the business and the person searching</td>
              </tr>
              <tr>
                <td>Domain authority built over years</td>
                <td>
                  Review volume and recency — the fastest-moving prominence signal a small
                  business controls
                </td>
              </tr>
              <tr>
                <td>Ranking for a keyword anywhere it is searched</td>
                <td>Ranking for the same keyword differently in every neighbourhood searched</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          It also means the same keyword ranks differently depending on where the search
          happens, which is the part businesses with more than one branch trip over first. A
          plumber with locations in two suburbs is not competing for one ranking — each branch
          is judged on its own distance and prominence, so a strong profile at one address does
          nothing for the map pack near the other. Multi-location businesses that treat this as
          one SEO project instead of several usually find only the original location shows up.
        </p>

        <p>
          It is also honest to say when this layer does not apply. A fully remote consultancy,
          a software product with no service area, or an e-commerce brand that ships anywhere
          gets close to nothing from local SEO — there is no place for Google to anchor
          proximity to, and chasing a map-pack ranking for a business with no map presence is
          effort spent on a signal that cannot fire.
        </p>

        <h2 id="ranking-factors">What actually moves local rankings</h2>

        <p>
          Google names three factors it uses to rank local results: relevance, whether the
          listing matches what was searched; distance, how close the business is to the
          searcher or the searched location; and prominence, how well-known and well-reviewed
          the business is. Of the three, prominence is the one small businesses most often
          leave untouched, treating it as a mystery when it is mostly reviews, citations, and
          being mentioned on other sites that already carry weight.
        </p>

        <ul>
          <li>
            <strong>Relevance.</strong> The business category, the services listed, and the
            words used in the profile description need to match how customers actually
            search, not the internal jargon a business uses about itself.
          </li>
          <li>
            <strong>Distance.</strong> Nothing to optimise here directly — a business cannot
            move — but it explains why a competitor three streets closer can outrank a better
            business, and why service-area settings need to reflect where work is actually
            done.
          </li>
          <li>
            <strong>Prominence.</strong> Reviews, citations, backlinks, and general
            offline reputation Google can detect online. This is the factor most within a
            small business&rsquo;s control, and the one most often ignored in favour of
            fiddling with the profile description for the fifth time.
          </li>
        </ul>

        <h2 id="nap-consistency">NAP consistency, the boring foundation</h2>

        <p>
          NAP consistency means the exact same business name, address, and phone number
          appear everywhere the business is listed online, because a mismatch — a suite
          number here, a dropped &ldquo;Ltd&rdquo; there, an old phone number still live on
          one directory — tells Google it may be looking at two different businesses, and it
          quietly trusts neither version.
        </p>

        <p>
          The fix is unglamorous and mostly a spreadsheet exercise: list every place the
          business is listed — Google, Facebook, Apple Maps, industry directories, the
          chamber of commerce site nobody remembers joining — and make every field match,
          character for character. It is the least interesting hour of local SEO and, for
          most small businesses that have moved address or changed a phone number once in the
          last five years, the highest-leverage one.
        </p>

        <h2 id="citations">Citations and directories worth the time</h2>

        <p>
          A citation is any online mention of a business&rsquo;s name, address, and phone
          number, and the ones worth building are the handful of directories customers and
          Google&rsquo;s own systems actually check — the major data aggregators, the
          relevant industry directory, the local chamber listing — not the fifty low-quality
          sites a cheap reseller floods a business with in a week and calls a citation
          campaign.
        </p>

        <p>
          The full profile work — categories, attributes, photo cadence, Posts — is its own
          project, and it is covered in depth in{' '}
          <a href="/blog/google-business-profile-optimization">
            our guide to Google Business Profile optimization
          </a>
          . Treat this section as the map of everywhere else the same details need to agree
          with it.
        </p>

        <p>
          A handful of data aggregators feed dozens of smaller directories automatically, so
          fixing a wrong address at the source can quietly correct twenty listings a business
          never manually touched. It is worth the half day to find where a business is
          aggregated from before manually chasing every directory one at a time — the fastest
          fix is rarely the most visible one.
        </p>

        <h2 id="reviews">Reviews: how many, how fast, how honest</h2>

        <p>
          Reviews affect local rankings directly through prominence and indirectly through
          click-through rate, and what actually moves the needle is a steady trickle of
          recent, specific reviews rather than a one-time burst of twenty followed by silence
          for a year — the same pattern that made Fatima&rsquo;s garage look abandoned even
          while the workshop behind it was busy every day.
        </p>

        <p>
          The mechanics that work are simple and slightly tedious: ask at the moment a
          customer is satisfied, not by email three weeks later when the memory has faded;
          make the ask a direct link, not a search-and-find-us request; and respond to every
          review, good or bad, because an unanswered bad review reads worse than the review
          itself.
        </p>

        <p>
          A bad review is not a crisis to delete or argue with — most platforms will not
          remove a genuine one anyway. A short, specific, non-defensive reply that
          acknowledges the complaint and states what changed does more for a prospective
          customer reading it later than the original review does damage. Prospective
          customers read the reply as much as the complaint; a business that answers well
          in public reads as more trustworthy than one with only five-star silence.
        </p>

        <h2 id="local-content">Local content that actually helps</h2>

        <p>
          Local content that helps is built around a specific place and a specific service —
          a page for each service area genuinely served, a case study naming a real
          neighbourhood, an answer to a question local customers actually ask — not a city
          name pasted into an otherwise generic template and republished five times for five
          suburbs.
        </p>

        <p>
          The tell for the templated version is that it reads the same with the city name
          removed. Written properly, a page about serving a specific area should say something
          that would be false if applied to a different one — a landmark, a common local
          problem, a detail that only makes sense there. That specificity is also what makes
          the page worth an AI assistant lifting, the same underlying discipline covered in{' '}
          <a href="/blog/how-to-get-my-business-on-google">
            how a business gets found on Google, Maps, and AI answers together
          </a>
          .
        </p>

        <p>
          For Fatima&rsquo;s garage, that meant a page for Thika Road breakdowns specifically
          — what a callout there actually costs, how long it takes given the traffic at
          different hours, and which common faults show up most on that stretch of road —
          instead of one generic &ldquo;auto repair Nairobi&rdquo; page trying to rank for a
          city of five million people. Narrower, and truer, beats broad and vague almost every
          time this gets tested.
        </p>

        <h2 id="check-progress">How to tell if it is working</h2>

        <p>
          You can tell local SEO is working by tracking three numbers monthly: your local pack
          ranking for two or three core searches, the volume and recency of new reviews, and
          whether your Google Business Profile actions — calls, direction requests, website
          clicks — trend upward against the prior month rather than a single good day.
        </p>

        <ol>
          <li>
            Search your two or three most valuable local terms from a phone with location on,
            in an incognito or private window, and note whether the business appears in the
            map pack.
          </li>
          <li>
            Count new reviews added since the last check, across Google and the other
            platforms customers actually use, and note the rating movement.
          </li>
          <li>
            Open the Business Profile performance report and compare monthly calls, direction
            requests, and website clicks against the prior month.
          </li>
          <li>
            Ask an AI assistant a near-me question a real customer would ask, and note whether
            the business is named and whether the details are correct.
          </li>
        </ol>

        <p>
          It is a cruder measurement than a professional rank tracker, and it is a check any
          owner can run in fifteen minutes without buying anything. For a broader look at what
          the surrounding SEO work involves once the local layer is in place, see{' '}
          <a href="/blog/small-business-seo">what small business SEO covers beyond location</a>
          . The pattern underneath all of it is the same one this whole site keeps returning
          to: a clear, correct, checkable fact, stated once and kept consistent everywhere, is
          worth more than any amount of clever.
        </p>
      </PostShell>
    </>
  );
}
