import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-get-my-business-on-google')!;

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
  { id: 'what-it-means', label: 'What being on Google actually means' },
  { id: 'map-vs-search', label: 'Map pack vs organic search, compared' },
  { id: 'gbp-setup', label: 'Setting up your Google Business Profile' },
  { id: 'verification', label: 'Verifying the profile is really yours' },
  { id: 'website-basics', label: 'Getting your website crawled and indexed' },
  { id: 'structured-data', label: 'Structured data that agrees with the page' },
  { id: 'ai-visibility', label: 'Showing up in AI answers, not only search' },
  { id: 'what-fails', label: 'What does not work' },
  { id: 'how-long', label: 'How long it actually takes' },
];

const SETUP_STEPS = [
  {
    name: 'Add the business at business.google.com/add',
    text: 'Enter the business name exactly as it appears in the real world, without extra keywords added to it.',
  },
  {
    name: 'Choose the correct category',
    text: 'Pick the primary category that matches what the business actually does — it decides which features and search terms the profile is eligible for.',
  },
  {
    name: 'Complete hours, phone, website, and service area',
    text: 'Fill in every field completely rather than leaving defaults, and add real photos of the premises, product, or work.',
  },
  {
    name: 'Verify the profile',
    text: 'Complete whichever verification method Google offers for that listing — postcard, phone, email, or video — since an unverified profile will not appear in the map pack.',
  },
];

const FAQ = [
  {
    q: 'How do I get my business on Google for free?',
    a: 'Create and verify a Google Business Profile at business.google.com, which costs nothing. Add the category, hours, phone number, website, and photos, then complete whichever verification method Google offers — postcard, phone, email, or video, depending on the business type. Getting the actual website indexed by Google Search is also free; it takes patience rather than a fee.',
  },
  {
    q: 'How long does it take for a new business to show up on Google?',
    a: 'A Google Business Profile can appear in the map pack within days of verification, sometimes sooner for an established address. Organic ranking for a new website is slower and usually takes several weeks to a few months, because Google has to crawl, index, and build enough trust in a new domain before ranking it competitively.',
  },
  {
    q: 'Do I need a website to be on Google?',
    a: 'Not to appear in Google Maps and the local pack — a complete Google Business Profile can do that alone. A website is required to show up in ordinary organic search results and to be the kind of clear, specific page an AI assistant can quote. A business with only a profile and no site is visible, but shallow.',
  },
  {
    q: 'How do I verify my Google Business Profile?',
    a: 'Google chooses the verification method based on the business category and address history, and offers whichever it judges fastest and most reliable for that listing — a postcard mailed to the address, an automated phone call, an email, or a short video walkthrough of the premises for a business without a public storefront. Follow the option Google presents; requesting a different one is rarely possible.',
  },
  {
    q: 'Why is my business not showing up on Google search?',
    a: 'The most common causes are an unverified or incomplete profile, a website that has never actually been indexed, thin or duplicate content that gives Google nothing distinct to rank, or a page that fails to load properly on a phone. Search Console, checked against the exact domain, will usually name the specific problem rather than leaving it a mystery.',
  },
  {
    q: 'What is the difference between showing up in Google Search and Google Maps?',
    a: 'Google Maps and the local pack draw mainly from the Google Business Profile — category, location, hours, reviews — and favour proximity to the searcher. Organic Google Search results draw from the actual website and reward content depth and relevance. A business can rank well in one and be nearly invisible in the other, which is why both need separate attention.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={howToJsonLd(SETUP_STEPS, 'Setting up a Google Business Profile')}
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
          Getting a business onto Google is three separate jobs, not one: claiming and verifying
          a Google Business Profile so it appears in Maps and the local pack, getting the actual
          website crawled and indexed so it appears in ordinary search results, and writing the
          page clearly enough that an AI assistant can quote it directly. Most advice online
          covers only the first job. The profile is free and can go live within days of
          verification; the website side takes longer, because indexing and trust build over
          weeks, not a single afternoon.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Zanele does bridal makeup from a converted spare room in her house in Johannesburg,
            and for three years found every client through Instagram tags and a WhatsApp group
            chat that outgrew itself twice over.
          </p>
          <p>
            A cousin told her to just put the business on Google, which she did, technically —
            she dropped a pin on Google Maps under the business name and never touched it again.
            It sat there with no hours, no photos, and a category of &ldquo;Beauty salon&rdquo;
            that undersold what she actually does, which is the same energy as being told to eat
            healthier: technically actionable, practically useless without a next step.
          </p>
          <p>
            When she finally filled the profile in properly, and chose the video-verification
            option since there was no storefront to post a card to, bookings from search
            overtook bookings from Instagram inside two months. She had not been outranked by a
            better makeup artist. She was simply the only one of the four in her suburb who had
            bothered to answer Google&rsquo;s actual questions.
          </p>
        </Scene>

        <p>
          That is the shape of this piece. Not one Google to satisfy, but three separate
          surfaces a business has to earn, roughly in the order that returns the most for the
          least effort.
        </p>

        <h2 id="what-it-means">What being on Google actually means</h2>

        <p>
          Being on Google is not one achievement unlocked once; it is three distinct surfaces,
          each with its own mechanics, its own inputs, and its own timeline. The map pack and
          Google Maps run mostly on the Google Business Profile. Organic search results run on
          the actual website — its pages, its content, its technical health. AI answers, inside
          ChatGPT, Gemini, or Google&rsquo;s AI Overview, run on both of those plus whatever else
          corroborates the same facts elsewhere.
        </p>

        <p>
          Anyone offering to &ldquo;get you on Google&rdquo; without saying which of the three
          they mean is selling a slogan, not a plan. The three surfaces do not move together,
          and a business can rank well on one while being nearly invisible on another —
          Zanele&rsquo;s profile went live within a week; her website, built later, took two
          months to show up for anything at all.
        </p>

        <h2 id="map-vs-search">Map pack vs organic search, compared</h2>

        <p>
          The map pack and organic search results are ranked by different signals and answer
          different questions, so treating them as one job is the single most common way a
          business under-invests in half of what actually matters.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Google Maps and the local pack</th>
                <th>Organic Google Search results</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Draws mainly from the Google Business Profile</td>
                <td>Draws mainly from the actual website</td>
              </tr>
              <tr>
                <td>Ranking favours proximity to the searcher</td>
                <td>Ranking favours relevance and depth of the page</td>
              </tr>
              <tr>
                <td>Fastest lever: a complete, verified profile</td>
                <td>Fastest lever: getting indexed and answering the exact question</td>
              </tr>
              <tr>
                <td>Visible on its own, no website required</td>
                <td>Requires a website; this surface is entirely its job</td>
              </tr>
              <tr>
                <td>Immediate and a little exposed — a pin, a rating, reviews to answer</td>
                <td>Slow and slightly thankless, like planting a tree</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          For the ranking mechanics behind that Maps pin — why one business sits in the top
          three and another does not —{' '}
          <a href="/blog/how-to-appear-on-google-maps">the deeper walkthrough on appearing on
          Google Maps</a> covers relevance, distance, and prominence in full.
        </p>

        <p>
          The practical read is that a business without a website can still be found on Maps,
          and a business with a beautiful website and no verified profile can still be invisible
          to anyone searching nearby. Neither substitutes for the other.
        </p>

        <h2 id="gbp-setup">Setting up your Google Business Profile</h2>

        <p>
          Setting up a Google Business Profile starts at business.google.com/add, and the entire
          process costs nothing. The details that decide whether it works are ordinary and
          checkable, not clever.
        </p>

        <ul>
          <li>
            <strong>Business name, exactly as it appears in the real world.</strong> Adding
            extra keywords to the name field — &ldquo;Best Cheap Plumber Near Me&rdquo; instead
            of the plumbing business&rsquo;s actual name — violates Google&rsquo;s guidelines and
            risks suspension rather than extra visibility.
          </li>
          <li>
            <strong>The correct category.</strong> The primary category decides which features
            and search terms the profile is even eligible to appear for, so a category that is
            close but wrong quietly caps how far the listing can go.
          </li>
          <li>
            <strong>Hours, phone number, website, and service area, filled in completely.</strong>{' '}
            A profile last touched at setup and never again reads as abandoned to the algorithm
            and to the customer scrolling past it.
          </li>
          <li>
            <strong>Real photos.</strong> The premises, the product, the actual person doing the
            work — not a stock image that could belong to any business on the continent.
          </li>
        </ul>

        <p>
          A profile does not stay finished after this. The ongoing habits that keep it winning —
          category upkeep, photo and Posts cadence, and answering every review — are covered in{' '}
          <a href="/blog/google-business-profile-optimization">
            Google Business Profile optimization
          </a>
          .
        </p>

        <h2 id="verification">Verifying the profile is really yours</h2>

        <p>
          Google verifies a profile using one of four methods, and it decides which one to offer
          based on the business category and its address history, not on preference. In an age
          of same-day delivery, Google Business Profile verification still occasionally arrives
          by postcard, which remains the one analogue plot twist nobody predicted in this
          business.
        </p>

        <ul>
          <li>
            <strong>Postcard by mail.</strong> A code is posted to the business address and
            entered once it arrives, usually within five to fourteen days.
          </li>
          <li>
            <strong>Phone or text.</strong> An automated call or message delivers a code
            instantly, where Google offers it.
          </li>
          <li>
            <strong>Email.</strong> Offered for some account types, fastest when available.
          </li>
          <li>
            <strong>Video verification.</strong> A short recorded walkthrough of the premises,
            stock, or work in progress — the usual route for a home-based or service-area
            business with no public storefront to post a card to.
          </li>
        </ul>

        <p>
          Skipping verification, or leaving it half-finished, is the single biggest reason a
          profile that looks complete never actually appears in the map pack.
        </p>

        <h2 id="website-basics">Getting your website crawled and indexed</h2>

        <p>
          Getting a website indexed by Google starts with submitting it, not waiting for Google
          to stumble onto it eventually. A free Search Console account, an XML sitemap, and a
          request to index the homepage will usually get a new site crawled within days rather
          than however long it might otherwise take.
        </p>

        <p>
          Past that first crawl, three ordinary things decide whether a page stays indexed and
          starts ranking: it is not accidentally blocked by robots.txt, it says something
          specific enough to be worth indexing rather than repeating a competitor&rsquo;s page
          word for word, and it loads properly on a mid-range Android phone on an average mobile
          connection — a real and common failure point across African markets that a desktop
          preview on office fibre will never reveal. This sits inside the wider{' '}
          <a href="/blog/small-business-seo">small business SEO</a> checklist, which covers the
          rest of the site beyond the homepage.
        </p>

        <h2 id="structured-data">Structured data that agrees with the page</h2>

        <p>
          Structured data will not get an unindexed page ranked, but it removes ambiguity for
          whatever does read the page next — a search engine or an AI assistant deciding whether
          to trust it. Organisation or LocalBusiness schema states the business name, address,
          phone number, and hours in a format that does not need interpreting, and the detail
          that trips up more sites than it should is consistency: the name, address, and phone
          number in the schema, on the page, and on the Google Business Profile need to match
          exactly, because a mismatch reads as two different businesses rather than one confident
          one.
        </p>

        {/* Cluster sibling: what is schema markup (queued) — link here on publish */}

        <h2 id="ai-visibility">Showing up in AI answers, not only search</h2>

        <p>
          An AI assistant names a business the same way it answers any other question: by
          finding a page that states the relevant fact plainly and confirming it against other
          sources it trusts. A verified Google Business Profile and an indexed website are the
          floor for this, not the ceiling — the assistant still has to find a sentence worth
          quoting, and a profile alone rarely contains one.
        </p>

        <p>
          The full mechanics of that second surface, including why it often favours a smaller,
          thinly documented market over a saturated one, are covered in{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a>. The short
          version here is the same short version as everything else in this piece: write the
          fact down plainly, in one place, and be the business that did it first.
        </p>

        <h2 id="what-fails">What does not work</h2>

        <p>
          The most common way a business fails at this is stuffing keywords into the profile
          name or letting a completed profile sit untouched for years — both read as
          manipulation or abandonment to Google, and both are avoidable in an afternoon.
        </p>

        <ul>
          <li>
            <strong>Stuffing the business name with keywords.</strong> Naming a plumbing
            business &ldquo;Best Cheap Plumber Near Me 24/7 Emergency&rdquo; does not fool
            Google. It mostly just embarrasses the plumbing business, and it is grounds for
            suspension.
          </li>
          <li>
            <strong>Creating duplicate listings for one location.</strong> A second profile,
            made by accident or by an old employee years ago, splits reviews and confuses both
            Google and the customer.
          </li>
          <li>
            <strong>Buying or soliciting fake reviews.</strong> Google actively detects unusual
            review patterns, and the downside of getting caught is worse than the upside of a
            slightly higher star rating.
          </li>
          <li>
            <strong>Setting it up once and never returning.</strong> Hours change, photos age,
            and a profile untouched for two years reads as a business that might no longer exist.
          </li>
        </ul>

        <p>
          One honest exception is worth stating plainly: a business with no physical premises
          and no defined local service area — a purely national online shop shipping anywhere —
          is not a good fit for a Google Business Profile at all. Registering one with a fake or
          borrowed address risks suspension of the listing entirely. The right move there is to
          skip Maps and put the same effort into the website and the AI-answer work instead,
          rather than forcing a local tool onto a business that is not local.
        </p>

        <h2 id="how-long">How long it actually takes</h2>

        <p>
          A verified Google Business Profile can appear in the map pack within days of
          completing verification, sometimes inside a week for an address with an existing
          history. The website side of this moves on a slower clock: initial indexing takes days
          to weeks, and organic ranking that a business can actually feel — calls, visits, form
          fills arriving because someone searched — usually takes six weeks to a few months, and
          longer in a competitive city. Anyone quoting a firm number for the second half is
          guessing.
        </p>

        <p>
          None of this is exotic. It is a profile filled in completely and verified properly, a
          website that is actually submitted rather than left to be discovered, facts stated
          plainly enough for a machine to lift, and enough patience to let both surfaces build
          trust on their own separate schedules — the same short list whether the business is a
          bridal makeup studio in Johannesburg or anything else, anywhere.
        </p>
      </PostShell>
    </>
  );
}
