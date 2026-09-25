import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-improve-google-ranking')!;

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
  { id: 'what-moves-it', label: 'What actually moves a Google ranking' },
  { id: 'technical-basics', label: 'Fix the technical basics first' },
  { id: 'on-page', label: 'Get the on-page fundamentals right' },
  { id: 'content-that-ranks', label: 'Write content built to rank' },
  { id: 'local-signals', label: 'Local signals, if you have a physical presence' },
  { id: 'links-and-trust', label: 'Earn links and third-party trust' },
  { id: 'what-fails', label: 'What used to work and now backfires' },
  { id: 'timeline', label: 'How long each change takes to show' },
  { id: 'tracking', label: 'How to tell if it is working' },
];

const FAQ = [
  {
    q: 'How can I improve my Google ranking for free?',
    a: 'Most of the highest-leverage work costs time, not money: fixing broken links and slow pages, writing a genuinely useful answer to the question your customer is asking, claiming and completing your Google Business Profile, and asking happy customers for a review. None of that requires a paid tool. Paid tools speed up research and tracking, but they do not replace the underlying work.',
  },
  {
    q: 'Why did my Google ranking suddenly drop?',
    a: 'The usual causes are a recent site change (a redesign, a migration, a broken redirect), a competitor publishing something stronger, or a Google algorithm update that reweighted a signal you were relying on. Check Google Search Console for crawl errors and manual actions first — that rules out the simplest explanations before you assume the worst.',
  },
  {
    q: 'Does having a mobile-friendly site affect ranking?',
    a: 'Yes. Google indexes and ranks primarily using the mobile version of a page, so a site that is slow, cramped, or broken on a phone is being judged on that broken experience even if the desktop version looks fine. On patchy African connections this matters more than the guidance usually admits.',
  },
  {
    q: 'How often does Google update rankings?',
    a: 'Positions can shift daily as Google recrawls and re-evaluates pages, but the changes that matter to a business are usually visible over weeks, not hours. Larger algorithm updates that reshuffle entire categories of sites happen several times a year and are announced; day-to-day wobble is normal and rarely worth reacting to.',
  },
  {
    q: 'Do backlinks still matter for ranking in 2026?',
    a: 'Yes, though their role has shifted from "count them" to "trust them." A handful of links from sites Google already trusts in your topic outweighs a pile of low-quality directory links. Backlinks now function more as corroboration — evidence that other credible sources vouch for you — than as raw votes.',
  },
  {
    q: 'Can I improve ranking without hiring an agency?',
    a: 'For a single local business with the time to spend a few focused hours a week, yes — the checklist in this post covers the same ground an agency would start with. What an agency mainly buys you is consistency over months and the research tooling to do it faster, not access to secret tactics.',
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
            { name: 'Confirm the page is indexable', text: 'Check Google Search Console to confirm the page is indexed and not blocked by robots.txt or a stray noindex tag.' },
            { name: 'Fix crawl errors', text: 'Resolve broken internal links, redirect chains, and 404s that waste crawl budget and strand ranking signal on dead pages.' },
            { name: 'Get Core Web Vitals into the green', text: 'Compress images, defer unused scripts, and cut render-blocking resources until loading, interactivity, and layout stability all pass.' },
            { name: 'Confirm mobile usability', text: 'Test the page on an actual mid-range phone, not just a browser resize, since Google ranks primarily on the mobile experience.' },
            { name: 'Submit an updated sitemap', text: 'Resubmit the XML sitemap in Search Console after fixes so Google recrawls the corrected pages sooner.' },
          ],
          'How to fix the technical basics before a Google ranking push',
        )}
      />
      <StructuredData
        data={howToJsonLd(
          [
            { name: 'Log target rankings weekly', text: 'Log the current position for your two or three real target phrases, once a week, on the same day.' },
            { name: 'Watch traffic and leads, not just position', text: 'Watch organic traffic and, more importantly, organic leads or sales, since a ranking that never moves a business result is not the point.' },
            { name: 'Check Search Console monthly', text: 'Check Search Console for new crawl errors or manual actions monthly, so a technical regression is caught early.' },
          ],
          'How to track whether Google ranking work is paying off',
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
          Improving a Google ranking means working through four layers in order:
          technical health (can the page be crawled, indexed, and loaded quickly), on-page
          fundamentals (does the page clearly answer the query), content depth (does it cover
          the topic better than what already ranks), and trust signals (do reviews, links,
          and mentions elsewhere corroborate it). Skipping straight to backlinks while the
          site is slow or the page never actually answers the question is the most common
          reason ranking work stalls.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Adaeze runs a small logistics brokerage out of a shared office in Lagos. For most
            of a year her site sat on page three for the one phrase that actually brought her
            clients — nobody scrolls that far, so it may as well not have existed.
          </p>
          <p>
            She had already done what most guides suggest first: she paid for two months of
            backlinks from a service that promised &ldquo;guaranteed page one.&rdquo; The
            links arrived. The ranking did not move a single place.
          </p>
          <p>
            What actually shifted it, three months later, was duller: a nine-second page load
            cut to under two, a page that finally stated her pricing and coverage area in the
            first paragraph instead of the fifth, and one detailed page about customs
            clearance that nothing else on the local web covered as thoroughly. The backlinks
            she had already bought did nothing until the page underneath them earned the
            right to rank.
          </p>
        </Scene>

        <p>
          That order — fix the foundation, then earn the credit — is the whole story of this
          post. None of the individual steps are exotic. What is missing, almost everywhere
          this topic gets written about, is the order they need to happen in and an honest
          account of how long each one takes.
        </p>

        <h2 id="what-moves-it">What actually moves a Google ranking</h2>

        <p>
          A ranking moves when a page becomes easier for Google to trust as the best answer
          to a specific query, and that trust is built from four layers stacked on top of
          each other. Get an earlier layer wrong and the later ones are wasted effort sitting
          on a shaky floor.
        </p>

        <ul>
          <li>
            <strong>Technical health.</strong> Can the page be crawled, indexed, and loaded
            quickly on an ordinary connection? If not, nothing below this matters — Google
            cannot rank a page it cannot properly read.
          </li>
          <li>
            <strong>On-page fundamentals.</strong> Does the page state, plainly and near the
            top, the exact thing the searcher came to find?
          </li>
          <li>
            <strong>Content depth.</strong> Does it cover the topic more completely and more
            specifically than the pages currently occupying the top results?
          </li>
          <li>
            <strong>Trust signals.</strong> Do reviews, mentions, and links from other
            credible sources corroborate that this page and this business are the real
            thing?
          </li>
        </ul>

        <p>
          Most ranking advice starts at the fourth layer because links and reviews are the
          most visible, most talked-about part of SEO. Working the list in order, from the
          bottom up, is what actually produces movement — and it is why{' '}
          <a href="/blog/how-to-do-keyword-research">choosing the right keyword in the first place</a>{' '}
          matters more than any single tactic below: a perfectly optimised page aimed at the
          wrong phrase never had a chance to begin with.
        </p>

        <h2 id="technical-basics">Fix the technical basics first</h2>

        <p>
          The technical basics are fixed by working through five checks, in this order, before
          spending any time on content or links.
        </p>

        <ol>
          <li>
            <strong>Confirm the page is indexable.</strong> Check Google Search Console to
            confirm the page is actually indexed and not silently blocked by robots.txt or a
            stray <code>noindex</code> tag left over from a staging build.
          </li>
          <li>
            <strong>Fix crawl errors.</strong> Broken internal links, redirect chains, and
            404s waste the limited attention Google gives a site and strand ranking signal on
            pages that no longer exist.
          </li>
          <li>
            <strong>Get Core Web Vitals into the green.</strong> Compress images, defer
            scripts that are not needed immediately, and remove anything render-blocking
            until loading speed, interactivity, and layout stability all pass.
          </li>
          <li>
            <strong>Test mobile usability on an actual phone.</strong> Not a resized browser
            window — a mid-range Android on an ordinary mobile connection, because that is
            the device Google is judging the page on and the device most African customers
            are using.
          </li>
          <li>
            <strong>Resubmit the sitemap.</strong> After the fixes are live, resubmit the XML
            sitemap in Search Console so Google recrawls the corrected pages sooner rather
            than waiting for its own schedule.
          </li>
        </ol>

        <p>
          A site that scores perfectly on every off-page tactic and still takes nine seconds
          to load on one bar of signal is, for a meaningful share of visitors, not really
          published — it is a page Google and the reader both give up on before it finishes
          arriving.
        </p>

        <h2 id="on-page">Get the on-page fundamentals right</h2>

        <p>
          The on-page fundamentals come down to one habit: answer the query in the first two
          sentences, in plain language, before any scene-setting. This is the single
          highest-return habit in the entire list, and the one most pages still get backwards
          by opening with a paragraph of throat-clearing about the industry before saying
          anything useful.
        </p>

        <ul>
          <li>
            <strong>One clear target per page.</strong> A page trying to rank for five loosely
            related phrases usually ranks well for none of them. Give each real query its own
            page.
          </li>
          <li>
            <strong>A title tag that matches intent.</strong> It should read like the answer
            to a search, not a slogan — &ldquo;Lagos logistics broker for customs clearance,&rdquo;
            not &ldquo;Your Trusted Partner in Excellence.&rdquo;
          </li>
          <li>
            <strong>Structured data that matches the page.</strong> Schema markup does not
            move rankings directly, but it tells Google unambiguously what the page is
            claiming — worth reading in full in{' '}
            <a href="/blog/what-is-schema-markup">what schema markup actually does</a>{' '}
            if this is new territory.
          </li>
          <li>
            <strong>Headings that a reader could scan alone.</strong> Someone skimming just
            the subheadings should be able to follow the page&rsquo;s argument without
            reading a single paragraph.
          </li>
        </ul>

        <h2 id="content-that-ranks">Write content built to rank</h2>

        <p>
          Content built to rank covers the topic more completely and more specifically than
          whatever currently holds the top spots, which is a research task before it is a
          writing task. Read the top three ranking pages, note what all of them cover, and
          note what none of them cover — that gap is the opening.
        </p>

        <p>
          Specificity is what separates a page that ranks from the fortieth rewrite of the
          same generic advice. Your own numbers, your own comparisons, and your own
          on-the-ground detail are far harder to out-rank than a polished restatement of
          things everyone already knows, mostly because nobody else can copy the part that
          is actually yours. A visible author, a real business address, and a track record
          a reader can verify all feed the same signal — Google increasingly checks whether
          the person or business behind a page is a credible source on the topic, not only
          whether the words on the page are correct.
        </p>

        <blockquote>
          Google is not scoring how confidently a page sounds. It is scoring how completely
          it answers the question compared with every other page trying to answer the same
          one — confidence with nothing underneath it is just a longer way of saying nothing.
        </blockquote>

        <p>
          Length is a symptom of thoroughness, not a target in itself. A 600-word page that
          fully answers a narrow question will out-rank a padded 2,000-word page that
          circles the answer without landing on it.
        </p>

        <h2 id="local-signals">Local signals, if you have a physical presence</h2>

        <p>
          Local signals decide whether a business with a physical location or service area
          shows up in the map pack, and they run on a mostly separate track from the rest of
          this list. A fully optimised website with a neglected Google Business Profile
          still loses local visibility to a mediocre website with a complete one.
        </p>

        <p>
          The concrete work is consistent business details everywhere they appear (name,
          address, phone number, matched exactly, not almost), a complete and regularly
          updated Google Business Profile, and a steady trickle of genuine customer reviews
          rather than a burst of ten in one week that reads as manufactured. The full
          checklist — citations, categories, photos, and the review-request habit that
          actually works — is covered in{' '}
          <a href="/blog/local-seo-for-small-business">the local SEO checklist</a>.
        </p>

        <h2 id="links-and-trust">Earn links and third-party trust</h2>

        <p>
          Trust is earned by other credible sources vouching for the page, and the operative
          word is credible — one link from a site Google already trusts in your topic area
          outweighs a hundred from directories built solely to sell links. Adaeze&rsquo;s
          purchased links, from earlier in this piece, sat on the page for months doing
          nothing, because a link is only as strong as the trust of the site giving it.
        </p>

        <p>
          The reliable ways to earn real ones: get listed on industry directories that
          actually vet entries, get mentioned by local press or trade publications covering
          a story you are genuinely part of, and publish something specific enough that other
          sites want to cite it rather than merely rewrite it. All three take longer than
          buying a package of a hundred links overnight, and all three are also the only kind
          that survives Google noticing the difference.
        </p>

        <h2 id="what-fails">What used to work and now backfires</h2>

        <p>
          Keyword stuffing, bought link packages, thin keyword-only pages, and duplicate
          location pages now hurt a ranking more than they help, and each one used to be
          standard practice before Google closed the loophole it exploited.
        </p>

        <ul>
          <li>
            <strong>Keyword stuffing.</strong> Repeating the target phrase unnaturally reads
            as spam to the same system it was meant to impress, and has for over a decade.
          </li>
          <li>
            <strong>Bought link packages.</strong> Cheap bulk links from low-quality sites are
            a known pattern Google discounts or penalises outright, not a shortcut it has
            simply not caught up to yet.
          </li>
          <li>
            <strong>Thin pages built purely to occupy a keyword.</strong> A page assembled to
            rank rather than to answer a real question has nothing underneath it once a
            visitor — or Google — looks closely.
          </li>
          <li>
            <strong>Duplicate location pages with only the city name swapped.</strong> Ten
            near-identical pages read as one thin page copied ten times, and tend to cannibalise
            each other&rsquo;s ranking rather than multiply it.
          </li>
        </ul>

        <p>
          None of these are secret anymore — anyone selling one as an edge is, at best, a
          decade behind the algorithm they are charging you to beat.
        </p>

        <h2 id="timeline">How long each change takes to show</h2>

        <p>
          Technical fixes can register within days; content and trust-building changes take
          months, and treating them as the same speed is where most frustration with SEO
          comes from. The table below is a rough guide, not a guarantee — nobody can promise
          you a date, and anyone who does is guessing on your behalf.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Quick, mechanical fixes</th>
                <th>Slow, compounding work</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fixing broken links and redirect chains</td>
                <td>Building topical content depth over months</td>
              </tr>
              <tr>
                <td>Compressing images for page speed</td>
                <td>Earning backlinks from credible sources</td>
              </tr>
              <tr>
                <td>Correcting a missing or duplicate title tag</td>
                <td>Growing a steady base of genuine reviews</td>
              </tr>
              <tr>
                <td>Resubmitting a corrected sitemap</td>
                <td>Building local citation consistency</td>
              </tr>
              <tr>
                <td>Fixing a mobile usability error</td>
                <td>Earning topical authority across a full site section</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          For a fuller month-by-month picture of what to expect across a whole campaign
          rather than one fix, see{' '}
          <a href="/blog/how-long-does-seo-take">how long SEO actually takes</a>.
        </p>

        <h2 id="tracking">How to tell if it is working</h2>

        <p>
          Track ranking progress by checking three things on a fixed schedule, not by
          refreshing a rank tracker every morning and reading meaning into ordinary daily
          noise.
        </p>

        <ol>
          <li>Log the current position for your two or three real target phrases, once a week, same day.</li>
          <li>Watch organic traffic and, more importantly, organic leads or sales — a ranking that does not eventually move a business result is not the point.</li>
          <li>Check Search Console for new crawl errors or manual actions monthly, so a technical regression is caught early rather than discovered three months later.</li>
        </ol>

        <p>
          A single week of movement, up or down, is close to meaningless. A trend held over
          six to eight weeks is the first result worth trusting, and one worth being honest
          about even when it is not going your way: if nothing has moved after several months
          of consistent work, the problem is usually the keyword choice or the underlying
          business offer, not a tweak still waiting to be found. Sometimes the correct answer
          is to redirect the effort rather than keep polishing a page that was never going to
          win that query.
        </p>

        <p>
          None of the work above requires a special relationship with Google or a tool nobody
          else has access to. It requires doing the four layers in order, being patient with
          the layers that are genuinely slow, and being suspicious of anyone offering to skip
          straight to the fourth one.
        </p>
      </PostShell>
    </>
  );
}
