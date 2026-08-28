import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-rank-on-chatgpt')!;

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
  { id: 'no-ranking', label: 'There is no ranking algorithm to climb' },
  { id: 'how-it-works', label: 'How ChatGPT actually decides who to name' },
  { id: 'the-steps', label: 'The concrete steps, in order' },
  { id: 'crawler-access', label: 'Making sure the crawlers can reach you' },
  { id: 'structured-data', label: 'The structured data that actually helps' },
  { id: 'content-shape', label: 'Writing pages in a shape a model can lift' },
  { id: 'mistakes', label: 'The mistakes that waste the effort' },
  { id: 'measuring', label: 'How to tell whether it is working' },
];

const RANK_STEPS = [
  {
    name: 'Confirm crawlers can reach the page',
    text: 'Check robots.txt allows the relevant crawlers (GPTBot, OAI-SearchBot, and Bingbot, since ChatGPT browsing runs largely on Bing) and that Google Search Console and Bing Webmaster Tools both show the page as indexed.',
  },
  {
    name: 'State the answer in the first two sentences',
    text: 'Open the relevant page with the direct answer to the question a customer would type, before any framing or backstory, so there is a plain sentence for a model to lift whole.',
  },
  {
    name: 'Add structured data that matches the page',
    text: 'Mark up the organisation, the service, and any FAQ content with schema.org JSON-LD so the claims on the page are machine-readable, not only human-readable.',
  },
  {
    name: 'Get named on other credible pages',
    text: 'Pursue mentions on directories, local press, and partner sites, since a claim repeated nowhere else is harder for a cautious model to trust and repeat.',
  },
  {
    name: 'Keep the facts current',
    text: 'Update prices, hours, and service details as soon as they change, since a stale fact contradicted elsewhere reads as unreliable to the same systems it is trying to court.',
  },
];

const FAQ = [
  {
    q: 'How do I rank on ChatGPT?',
    a: 'There is no ranking position to climb, since ChatGPT does not return a numbered list of results. What actually helps is making a page crawlable, stating the relevant facts plainly near the top, adding structured data that matches those facts, and getting the business named on other credible pages so a model has more than one source to trust. Do all four consistently and a model has something worth repeating.',
  },
  {
    q: 'Does ChatGPT use Google rankings to decide what to say?',
    a: 'Not directly. ChatGPT most often searches through Bing rather than Google when it browses live, and it also draws on what it absorbed during training, a separate process from either search engine. A page that ranks well on Google is more likely to be well structured and indexed generally, which helps, but a high Google position is not itself the signal ChatGPT is reading.',
  },
  {
    q: 'Can you pay to rank on ChatGPT?',
    a: 'No, not the organic answer itself. There is no advertising product that buys a mention inside a ChatGPT response the way a search ad buys a slot on Google. Anyone selling a guaranteed position inside the answer is selling something that does not exist in the way they are describing it.',
  },
  {
    q: 'How long does it take to rank on ChatGPT?',
    a: 'There is no fixed timeline, and it depends on how much already exists about the business elsewhere. A business with an established web presence can start appearing within weeks of making the fixes described here. A business starting from close to nothing needs months of consistent, corroborated content before a model has enough to trust.',
  },
  {
    q: 'Why does ChatGPT name a competitor with a worse product?',
    a: 'Usually because the competitor described their business in a form a model could lift without guessing, and the business asking the question did not. A model repeats whoever stated the clearest, most corroborated answer, not whoever runs the better business — merit is not the input it is weighing.',
  },
  {
    q: 'Is ranking on ChatGPT the same as SEO?',
    a: 'It overlaps heavily but is not identical. Ordinary SEO work — a fast, indexed, well-structured site — is close to a prerequisite. What ChatGPT adds is a stronger reward for a direct, quotable answer and outside corroboration than the ranking signals a search engine weighs on its own, such as backlink volume.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(RANK_STEPS, 'How to get named in ChatGPT answers')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          There is no ChatGPT ranking algorithm to climb — nothing assigns your business
          position one, two, or three the way Google assigns a rank to a search result. What
          determines whether ChatGPT names you is whether the model, searching live or
          recalling what it absorbed during training, finds your business described clearly,
          specifically, and corroborated elsewhere. In practice, ranking on ChatGPT means
          making that description exist: a crawlable page, an answer stated plainly near the
          top, structured data that matches it, and enough outside mentions that the model
          treats you as safe to repeat. Do that consistently and you get named — nothing about
          it resembles buying an ad or paying for placement.
        </ShortAnswer>

        <Scene>
          <p>
            Amara restores and sells handmade furniture from a workshop in Accra, and for three
            years her Google ranking has crept up to a steady third place for &ldquo;furniture
            maker accra&rdquo; — high enough that new customers find her most weeks.
          </p>
          <p>
            Then a repeat customer mentioned she had not searched at all. She had asked ChatGPT
            to recommend a furniture maker in Accra who could restore an old teak dining set,
            and it named two other workshops. Neither ranks above Amara&rsquo;s on Google. Both
            had, somewhere on the web, said in plain sentences exactly what they restore and
            how.
          </p>
          <p>
            Her Google ranking had not moved an inch. She had simply never been asked the
            question in a form a language model could answer with her name attached to it.
          </p>
        </Scene>

        <p>
          That gap between the two is what this piece untangles: why the word
          &ldquo;ranking&rdquo; does not really describe what is happening on ChatGPT, and the
          concrete, checkable work that gets a business named instead. As with everything else
          we write, where the honest answer is that nobody has a guaranteed number, we say so
          rather than inventing one.
        </p>

        <h2 id="no-ranking">There is no ranking algorithm to climb</h2>

        <p>
          ChatGPT does not return a list of ten results with a position attached to each one,
          so there is nothing with a rank to move up in the first place. The phrase &ldquo;rank
          on ChatGPT&rdquo; is a habit borrowed from twenty years of Google, applied to a
          system that does not work that way — which has not stopped an entire cottage
          industry of &ldquo;guaranteed number one on ChatGPT&rdquo; pitches from appearing,
          position implied and invoice attached.
        </p>

        <p>
          What actually exists is a single generated answer, assembled fresh each time, that
          either names your business or does not. The mechanics of why a model chooses one
          business over another — training cutoffs, live retrieval, and what counts as a
          trustworthy source — are covered in full in{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a>; the short
          version here is enough to act on.
        </p>

        <h2 id="how-it-works">How ChatGPT actually decides who to name</h2>

        <p>
          ChatGPT names a business by one of two routes, often both at once: recalling
          something it read during training, or running a live web search and grounding its
          answer in what that search returns. That live search most often runs through Bing
          rather than Google, since Bing is the search layer ChatGPT leans on when it browses
          — a small irony, given how much of the &ldquo;ranking&rdquo; framing gets imported
          straight from Google habits.
        </p>

        <p>
          Either route rewards the same trait: a passage that is stated plainly and
          corroborated by other sources is the low-risk thing to repeat, and a model is built
          to reach for the low-risk thing. A business that states its facts nowhere, or states
          them only in a form buried three paragraphs deep, gives the model nothing safe to
          lift, regardless of how good the business actually is.
        </p>

        <h2 id="the-steps">The concrete steps, in order</h2>

        <p>
          Five things move this reliably, and the order matters, because each step depends on
          the one before it being in place already.
        </p>

        <ol>
          {RANK_STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          None of the five is exotic. Together they are most of what{' '}
          <a href="/blog/how-to-get-hotel-cited-by-chatgpt">
            getting a hotel cited by ChatGPT
          </a>{' '}
          comes down to in that specific vertical — the same five steps, aimed at a different
          business.
        </p>

        <h2 id="crawler-access">Making sure the crawlers can reach you</h2>

        <p>
          A page that a crawler cannot reach cannot be quoted, no matter how well it is
          written, so this is the step everything else depends on. Check that robots.txt is
          not accidentally blocking GPTBot, OAI-SearchBot, or Bingbot — a default left over
          from a site built to keep out scrapers, back when that seemed like a reasonable
          instinct.
        </p>

        <p>
          Confirm the page is actually indexed, not just technically crawlable: Google Search
          Console and Bing Webmaster Tools both report this directly, and it is worth checking
          both, not only the one you already have open. A site that renders its content only
          after a script runs in the browser is a common, quiet cause of failure here — some
          crawlers execute JavaScript, some do not, and betting the business on the ones that
          do is not a bet worth making.
        </p>

        <h2 id="structured-data">The structured data that actually helps</h2>

        <p>
          Structured data helps because it states a page&rsquo;s claims in a format built to
          be read without interpretation, rather than left for a model to infer from prose.
          Three schema.org types cover most of what a small business needs: Organization or
          LocalBusiness for the core identity, Service for what is actually offered, and
          FAQPage for the questions customers ask most.
        </p>

        <p>
          A fuller walk-through of what schema markup is and which types are worth the effort
          lives in{' '}
          <a href="/blog/what-is-schema-markup">
            what schema markup actually is
          </a>
          . The version relevant here is short: schema does not make a false claim more
          believable, it only makes a true one easier for a machine to lift correctly.
        </p>

        <h2 id="content-shape">Writing pages in a shape a model can lift</h2>

        <p>
          A page gets lifted when its answer sits in the first two sentences, stated as a
          fact rather than implied through a story. Prices as ranges, hours as hours, service
          areas named outright — not &ldquo;contact us to find out,&rdquo; which reads to a
          model as nothing to quote at all.
        </p>

        <p>
          Specificity matters more than length here. A page that names the exact towns served,
          the exact materials worked with, or the exact turnaround time beats a longer page
          that stays comfortably vague, because vague is exactly the quality a model is built
          to distrust and skip past.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What &ldquo;rank #1&rdquo; means on Google</th>
                <th>What people mean by &ldquo;rank on ChatGPT&rdquo;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A fixed position in a list of ten links</td>
                <td>Being the business named in one answer, with no position attached</td>
              </tr>
              <tr>
                <td>Roughly the same position for every searcher</td>
                <td>An answer that can vary between sessions, phrasings, and users</td>
              </tr>
              <tr>
                <td>Tracked with a rank tracker, screenshotted for the monthly report</td>
                <td>Checked by asking the assistant yourself and writing down what it says</td>
              </tr>
              <tr>
                <td>Improved by matching a keyword and building authority over months</td>
                <td>Improved by being clearly stated, corroborated, and kept current</td>
              </tr>
              <tr>
                <td>A page keeps its rank even on a day nobody visits it</td>
                <td>A business can be named today and left out tomorrow by a fresher source</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="mistakes">The mistakes that waste the effort</h2>

        <p>
          The most common mistake is treating one good answer as proof of a permanent rank.
          A favourable reply in a single chat session gets screenshotted, forwarded around the
          office, and treated as settled — when the same question, asked five minutes later
          in slightly different words, can easily leave the business out entirely. There is no
          rank being defended, so there is nothing that stays won.
        </p>

        <ul>
          <li>
            <strong>Stuffing pages with the phrase &ldquo;ChatGPT ranking.&rdquo;</strong>{' '}
            Writing it repeatedly does not make a machine trust the page — it reads as spam to
            the same systems being courted.
          </li>
          <li>
            <strong>Treating a single good session as the finish line.</strong> Answers vary
            by session and phrasing; one favourable reply is a data point, not a result.
          </li>
          <li>
            <strong>Inventing facts to sound quotable.</strong> Claims get checked against
            other sources, and a claim that contradicts everything else reads as unreliable —
            exactly what a model is built to avoid repeating.
          </li>
          <li>
            <strong>Skipping corroboration.</strong> A fact stated only on the business&rsquo;s
            own homepage, nowhere else, is the hardest kind of fact for a cautious model to
            trust.
          </li>
        </ul>

        <p>
          If a business has next to nothing written about it anywhere outside its own
          homepage, none of the five steps above will work quickly, however well they are
          executed — there is simply not enough for a model to corroborate against yet, and
          building that outside presence honestly takes months, not the one afternoon the
          fixes themselves take to make.
        </p>

        <h2 id="measuring">How to tell whether it is working</h2>

        <p>
          Since there is no rank to check, the only honest measurement is asking the assistant
          directly and logging what it says over time — the same monthly log-it method
          described earlier for checking AI-answer visibility generally, with one addition
          specific to the ranking question: ask the same thing several times, in different
          phrasings, in the same sitting, before drawing a conclusion from any one answer.
        </p>

        <p>
          A business that gets named in three phrasings out of five is in a genuinely different
          position than one that gets named once out of five, even though a single screenshot
          from either would look identical. Track the ratio, not the anecdote, and the picture
          gets a great deal less confusing. For a business that wants this run as an ongoing
          discipline rather than a once-off fix, that is the job our{' '}
          <a href="/geo-services">generative engine optimization service</a> does every month.
        </p>
      </PostShell>
    </>
  );
}
