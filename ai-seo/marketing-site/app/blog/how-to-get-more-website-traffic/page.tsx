import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-get-more-website-traffic')!;

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
  { id: 'ranking-isnt-traffic', label: 'Why a higher ranking does not always mean more traffic' },
  { id: 'five-channels', label: 'The five channels, and which ones you actually control' },
  { id: 'organic-search', label: 'Organic search, the slow compounding channel' },
  { id: 'ai-answers', label: 'AI-answer traffic, the channel with no rank tracker yet' },
  { id: 'referral-links', label: 'Referral traffic, earned by being worth linking to' },
  { id: 'local-channel', label: 'Local search, for a business with a physical footprint' },
  { id: 'email-repeat', label: 'Email and repeat visits, the channel most businesses skip' },
  { id: 'what-fails', label: 'What does not reliably grow traffic' },
  { id: 'measuring', label: 'How to tell which channel is actually working' },
];

const FAQ = [
  {
    q: 'How long does it take to get more website traffic?',
    a: 'Referral and direct traffic can move within days of a new link or a fixed profile, because those channels do not depend on a search engine re-crawling and re-evaluating a page. Organic search traffic is slower and more typically shows meaningful movement over eight to twelve weeks, and sometimes longer for a competitive term. Anyone promising a fixed number of days for organic growth is guessing.',
  },
  {
    q: 'Does posting on social media increase website traffic?',
    a: 'It can, but usually as a small, short-lived spike rather than a compounding source, because most social platforms limit how far a post with an outbound link travels compared with one that keeps people on the platform. Social is more reliable as a way to build the audience that later searches for a brand by name than as a direct traffic pipe on its own.',
  },
  {
    q: 'Is paid traffic worth it for a small business?',
    a: 'It depends on the margin per sale and how quickly the business needs visitors while organic and referral channels are still being built. Paid traffic stops the moment spend stops, so it works best as a bridge alongside slower channels, not as a permanent substitute for them. A business with thin margins per sale should be cautious about relying on it long term.',
  },
  {
    q: 'Why did my website traffic drop suddenly?',
    a: 'Sudden drops usually trace to one of a few causes: a Google algorithm update that reshuffled rankings, a broken page or redirect after a site change, a lost or expired backlink from a source that sent real referral traffic, or a seasonal dip in the underlying search demand itself. Checking analytics by channel, not just the total number, usually shows which one moved.',
  },
  {
    q: 'Does website speed affect traffic?',
    a: 'Indirectly, yes. Speed itself is a minor, direct ranking factor, but its larger effect is on the traffic a business already has: a slow page loses visitors before they see anything, which shows up as a high bounce rate and, over time, as a page search engines trust less because visitors keep leaving it fast.',
  },
  {
    q: 'How much website traffic does a small business actually need?',
    a: 'Less than most owners assume, because the number that matters is qualified visitors who convert, not raw volume. A local service business converting five percent of one hundred well-targeted monthly visitors into enquiries is doing better than a business getting ten times the traffic from an unrelated audience that never buys anything.',
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
              name: 'Split analytics by channel, not just total visits',
              text: 'Open the site analytics tool and view traffic broken down by source — organic search, direct, referral, and email — instead of the single headline total.',
            },
            {
              name: 'Tag every outbound link and email campaign',
              text: 'Add simple UTM parameters to links shared in email, directories, and partner sites so referral traffic can be traced back to its actual source.',
            },
            {
              name: 'Check AI-answer mentions manually each month',
              text: 'Ask ChatGPT, Claude, and Perplexity the questions a customer would ask, and note whether the business is named, since this traffic rarely shows up as a labelled channel yet.',
            },
            {
              name: 'Compare movement, not snapshots',
              text: 'Record the channel split monthly rather than checking once, since a single reading cannot show whether a channel is growing, flat, or quietly dying.',
            },
          ],
          'How to build a simple traffic-by-channel check',
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
          A website gets more traffic by working several channels at once rather than leaning on
          a higher Google ranking alone — organic search, mentions inside AI-assistant answers,
          referral links from other sites, local and Maps visibility, and repeat visits driven by
          email or brand recall. A page can rank higher without traffic actually rising, if the
          channels feeding it stay narrow. The reliable approach treats traffic as five separate
          pipes to fill and measures which pipe is genuinely carrying visitors, rather than
          assuming rank alone will do the work.
        </ShortAnswer>

        <Scene>
          <p>
            Chidinma runs an online fabric and tailoring-supply shop out of a rented unit in a
            market complex. Eight months into a content push, her main product page finally hit
            position one for the term she cared about most. She checked the ranking every few
            days, the way people check a football score.
          </p>
          <p>
            The traffic barely moved. Orders through the website stayed flat while her Instagram
            DMs, oddly, kept filling up with the same questions the ranking page was supposed to
            already answer.
          </p>
          <p>
            Nothing was wrong with the page. It was answering one narrow question for one narrow
            channel, and everything else — the AI assistant a customer had asked for fabric
            suppliers, the tailor who linked to her from a WhatsApp group, the shopper who typed
            her business name directly because a friend mentioned it — was arriving through pipes
            she had never once looked at.
          </p>
        </Scene>

        <p>
          This piece is about those pipes. Not a promise that more content automatically means
          more visitors — it does not, on its own — but a plain account of where website traffic
          actually comes from, which sources a small business genuinely controls, and how to tell
          whether the work being done is moving any of them at all.
        </p>

        <h2 id="ranking-isnt-traffic">Why a higher ranking does not always mean more traffic</h2>

        <p>
          A ranking measures position on one search engine, for one keyword, on one day — traffic
          measures how many actual people arrived, from every source, over time, and the two can
          move in completely different directions. A page can climb from position eight to
          position two and see almost no lift, because the keyword it targets has small monthly
          search volume, because the featured snippet above it is already answering the question
          for free, or because the visitors who do click are searching with intent that has
          nothing to do with what the business sells.
        </p>

        <p>
          Rank trackers make this worse by being the easiest number to stare at. It updates daily,
          it feels like progress, and it says nothing about whether a single extra customer
          walked through the door. Treat a ranking as a leading indicator worth watching, not the
          scoreboard itself — the scoreboard is the visitor count, split by where each visitor
          came from, which is exactly what a rank tracker does not show.
        </p>

        <h2 id="five-channels">The five channels, and which ones you actually control</h2>

        <p>
          Nearly all meaningful website traffic arrives through five channels — organic search,
          AI-answer mentions, referral links, local or Maps visibility, and direct or repeat
          visits — and a business controls the first four directly through its own work, while the
          fifth is earned slowly as a byproduct of doing the other four well and not annoying
          anyone along the way.
        </p>

        <p>
          The mistake worth naming here is treating this list as a menu to pick from. It is closer
          to a diet: a business that only ever works organic search is not choosing efficiency, it
          is choosing to be one algorithm update away from a bad month, the same way a shop that
          only ever advertises on one street corner is one road closure away from silence.
        </p>

        <h2 id="organic-search">Organic search, the slow compounding channel</h2>

        <p>
          Organic search sends visitors who typed a question into Google and clicked a result that
          answered it, and it is the channel that compounds best over time because a page, once it
          ranks, keeps earning visits without repeated spend. Getting it moving is mostly the
          fundamentals — matching content to real search intent, a clean technical setup, and
          pages that load fast on the mid-range phones most African visitors actually carry.
        </p>

        <p>
          The step usually skipped is knowing which questions to target in the first place, which
          is a separate exercise from writing the page —{' '}
          <a href="/blog/how-to-do-keyword-research">a method for finding those questions without
          an agency budget</a> is worth reading before the next page gets written, rather than
          guessing at what people search and hoping the guess was close. Once a topic is chosen,{' '}
          <a href="/blog/how-to-improve-google-ranking">the checklist for moving that page up the
          rankings</a> covers the on-page and technical work in the order that actually matters.
        </p>

        <h2 id="ai-answers">AI-answer traffic, the channel with no rank tracker yet</h2>

        <p>
          AI-answer traffic arrives when ChatGPT, Claude, Perplexity, or Google&rsquo;s AI
          overview names a business directly inside its response, sometimes with a click and
          often, honestly, with none at all — the visitor gets the answer and never opens a
          browser tab. That last part unsettles a lot of business owners, and it should not stop
          the work; a mention with no click still shapes a decision, the same way a billboard
          does.
        </p>

        <p>
          The mechanics are covered in full elsewhere —{' '}
          <a href="/blog/answer-engine-optimization">how answer engine optimization actually
          works, and why the same clean writing that helps organic search helps here too</a> — but
          the short version for traffic purposes is this: it is the one channel on this list with
          no dashboard number to check yet, so it has to be tracked by hand, by asking the
          assistants the questions a customer would ask and noting whether the business shows up.
        </p>

        <h2 id="referral-links">Referral traffic, earned by being worth linking to</h2>

        <p>
          Referral traffic comes from a visitor clicking a link on someone else&rsquo;s site,
          directory listing, or forum post, and it earns two things at once — an immediate visitor
          and a signal that helps organic search trust the page more over time. It rewards being
          specific rather than generic, since nobody links to the fortieth rewrite of a definition
          that already exists forty times.
        </p>

        <p>
          The realistic way to build it, for most small businesses, is unglamorous and slow: get
          listed correctly in the directories and associations relevant to the industry, write the
          one genuinely original piece of data or comparison nobody else has published, and answer
          questions in the communities — WhatsApp groups, forums, local business associations —
          where the actual customers already gather. A press mention is nice when it happens; it
          is not a strategy anyone can schedule.
        </p>

        <h2 id="local-channel">Local search, for a business with a physical footprint</h2>

        <p>
          Local search traffic comes from the Google Business Profile and Maps listing rather than
          the website itself, and it matters for traffic totals because a healthy local profile
          sends browsing visitors to the website to check hours, services, or photos before they
          ever call. A business with a shopfront, service area, or walk-in customers is leaving an
          entire channel unworked if that profile sits half filled in.
        </p>

        <p>
          This channel has its own detailed playbook, from claiming and verifying the listing to
          the review habits that build trust —{' '}
          <a href="/blog/local-seo-for-small-business">the full local SEO checklist</a> covers it
          end to end, and it is worth treating as a parallel project rather than an afterthought
          bolted onto the website work.
        </p>

        <h2 id="email-repeat">Email and repeat visits, the channel most businesses skip</h2>

        <p>
          Email and direct or repeat visits come from people who already know the business, and
          this is the channel with the highest conversion rate of the five, because trust is
          already built before the visit happens — it is also the one most small businesses build
          no habit around at all, collecting addresses and then never emailing them again.
        </p>

        <p>
          A simple monthly note — a new product, a seasonal offer, an answer to a question
          customers keep asking — keeps a business front of mind without needing to win a search
          engine&rsquo;s attention at all. It is the one channel immune to an algorithm update,
          which on a bad month for the other four is worth more than it sounds.
        </p>

        <h2 id="what-fails">What does not reliably grow traffic</h2>

        <p>
          Buying followers, joining every link exchange a stranger emails about, and publishing
          thin pages purely to occupy a keyword all fail for the same underlying reason — none of
          them create a genuine reason for a person or a machine to send a real visitor, so any
          bump they produce is either fake or gone within a month.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Speed to first movement</th>
                <th>Compounds without repeat spend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Organic search</td>
                <td>Weeks to months</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>AI-answer mentions</td>
                <td>Weeks to months, no fixed timeline yet</td>
                <td>Yes, once cited</td>
              </tr>
              <tr>
                <td>Referral links</td>
                <td>Days once a link is live</td>
                <td>Partly — a link can expire or be removed</td>
              </tr>
              <tr>
                <td>Local and Maps</td>
                <td>Days to weeks</td>
                <td>Yes, with upkeep</td>
              </tr>
              <tr>
                <td>Email and direct</td>
                <td>Immediate, on send</td>
                <td>No — requires the next email</td>
              </tr>
              <tr>
                <td>Paid traffic</td>
                <td>Immediate, on spend</td>
                <td>No — stops when spend stops</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Paid traffic belongs on that table for honesty&rsquo;s sake, not as a recommendation: it
          is the fastest way to put a number in the traffic column and the fastest way to watch
          that number vanish the day the budget does. It is a reasonable bridge while the slower
          channels are being built, and a poor long-term substitute for building them at all.
        </p>

        <h2 id="measuring">How to tell which channel is actually working</h2>

        <p>
          Split the traffic total by source inside the analytics tool already installed, rather
          than watching the single combined number, because the combined figure hides a channel
          that is quietly dying behind one that is quietly growing. Most free analytics tools do
          this by default under a channel or source report; the habit that is missing is not the
          data, it is the ten minutes a month spent looking at it split apart.
        </p>

        <ol>
          <li>
            Open the site analytics tool and view traffic broken down by source — organic search,
            direct, referral, and email — instead of the single headline total.
          </li>
          <li>
            Add simple UTM parameters to links shared in email, directories, and partner sites so
            referral traffic can be traced back to its actual source.
          </li>
          <li>
            Ask ChatGPT, Claude, and Perplexity the questions a customer would ask, and note
            whether the business is named, since this traffic rarely shows up as a labelled
            channel yet.
          </li>
          <li>
            Record the channel split monthly rather than checking once, since a single reading
            cannot show whether a channel is growing, flat, or quietly dying.
          </li>
        </ol>

        <p>
          None of this requires a paid dashboard or an analyst on staff. It requires treating
          traffic as five separate, checkable pipes instead of one mysterious total that either
          rises or does not — and, most months, at least one of the five will need attention long
          before the ranking number does.
        </p>
      </PostShell>
    </>
  );
}
