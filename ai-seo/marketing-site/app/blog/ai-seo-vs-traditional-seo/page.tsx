import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('ai-seo-vs-traditional-seo')!;

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
  { id: 'the-real-difference', label: 'The difference is not what you think' },
  { id: 'where-ai-wins', label: 'Where automation genuinely wins' },
  { id: 'where-ai-loses', label: 'Where it quietly loses' },
  { id: 'side-by-side', label: 'Side by side, task by task' },
  { id: 'penalty-question', label: 'The penalty question, answered properly' },
  { id: 'never-automate', label: 'Four jobs to never hand over unsupervised' },
  { id: 'answer-engines', label: 'What changes when the answer is generated' },
  { id: 'choosing', label: 'How to choose, in one paragraph' },
];

const FAQ = [
  {
    q: 'What is the difference between AI SEO and traditional SEO?',
    a: 'The goal is identical — pages that rank because they answer a question well. The difference is which parts a machine does. AI SEO automates the high-volume, low-judgement work: clustering keywords, summarising what ranks, drafting from an outline, checking schema across every route. Traditional SEO does those by hand, more slowly, and usually at less depth because there are only so many hours.',
  },
  {
    q: 'Does Google penalise AI-generated content?',
    a: 'Google penalises unhelpful content regardless of how it was made. Its published guidance is about whether content demonstrates real usefulness, not about which tool typed it. In practice the pages that get hurt are the ones published at volume with no editing and nothing original in them — which was also true before AI existed.',
  },
  {
    q: 'Is AI SEO cheaper?',
    a: 'Usually, for the same output volume, because fewer junior hours are consumed on repetitive work. It is not cheaper if you compare it to doing nothing, and it is not cheaper at the top end, where the expensive part is senior judgement that does not automate.',
  },
  {
    q: 'Can AI do technical SEO?',
    a: 'Very well, and this is arguably its strongest use. Checking canonicals, schema validity, metadata length, broken internal links, and sitemap accuracy across hundreds of routes is exactly the kind of exhaustive checking humans do badly and machines do perfectly.',
  },
  {
    q: 'Will AI SEO still work as search changes?',
    a: 'The mechanics will change and the underlying job will not. Whether the answer appears as a blue link, a map result, or a generated summary, something has to be the source. Being the clearest, most complete answer on a technically sound page is what makes you that source in every one of those formats.',
  },
  {
    q: 'Should I tell people my content was written with AI?',
    a: 'There is no search-related requirement to. The more useful question is whether you would be comfortable if a customer found out, and the answer depends entirely on whether a human took responsibility for what it says. If someone edited it and stands behind it, it is your content.',
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
          They are not two strategies. They are the same strategy with a different division
          of labour. Both aim at pages that rank because they answer a question properly.
          AI SEO hands the repetitive, exhaustive work — keyword clustering, competitive
          summarising, first drafts, technical validation across every route — to agents,
          and keeps strategy, editing, and judgement with a person. Choose based on one
          thing: whether a named human is accountable for every published sentence. Where
          that is true, the label does not matter. Where it is not, neither approach works.
        </ShortAnswer>

        <Scene>
          <p>
            Two logistics companies, same city, same size, both decided to take search
            seriously in January.
          </p>
          <p>
            The first hired a traditional agency. Twelve months, a monthly retainer, fourteen
            pages published. Every page was genuinely good. The technical audit happened once,
            in February, and was never repeated, so nobody noticed in August when a plugin
            update added a second H1 to every service page and quietly broke the canonical
            tags.
          </p>
          <p>
            The second used an AI-first provider. Sixty pages published, technical checks
            running weekly and catching that same plugin problem within days. Also: eleven of
            the sixty pages competed with each other for the same phrase, and four confidently
            stated a customs threshold that had changed the previous year, because nobody
            with domain knowledge had read them.
          </p>
          <p>
            Neither of these is an argument for the other. They are the same failure — nobody
            was doing the job the other approach happens to be good at.
          </p>
        </Scene>

        <h2 id="the-real-difference">The difference is not what you think</h2>

        <p>
          The way this comparison usually gets framed — machine content versus human content
          — is the wrong axis entirely. Search engines are not running a detector on
          authorship. They are assessing whether a page is a useful answer.
        </p>

        <p>
          The real difference is <strong>where the hours go</strong>. In a traditional
          engagement, a large share of the budget is consumed by work that is essential,
          repetitive, and requires no particular insight: pulling data, sorting it,
          summarising competitors, checking the same eleven technical properties on every
          page. That work has to happen. It is also the least valuable thing an experienced
          person can spend an afternoon doing.
        </p>

        <p>
          Move that to agents and the same budget buys more senior attention on the parts
          that need it. Move <em>everything</em> to agents and you get the second logistics
          company: enormous output, no judgement, four pages confidently wrong about customs.
        </p>

        <h2 id="where-ai-wins">Where automation genuinely wins</h2>

        <ul>
          <li>
            <strong>Exhaustiveness.</strong> A person auditing 400 routes will get bored around
            route 90 and start pattern-matching. A machine checks route 400 with the same
            attention as route 1. This is not a small advantage; it is the whole game in
            technical SEO.
          </li>
          <li>
            <strong>Scale of research.</strong> Reading and structurally summarising the top ten
            results for forty keywords is two days of human work and twenty minutes otherwise.
          </li>
          <li>
            <strong>Consistency over time.</strong> The checklist gets run identically in month
            nine and month one. Human quality drifts; automated checks do not.
          </li>
          <li>
            <strong>Monitoring.</strong> Daily position tracking with flagged anomalies, rather
            than noticing a drop when the monthly report is assembled three weeks later.
          </li>
          <li>
            <strong>Never forgetting.</strong> The keyword log, the internal link map, which page
            claimed which phrase in month four — machines simply do not lose this, and humans
            reliably do.
          </li>
        </ul>

        <h2 id="where-ai-loses">Where it quietly loses</h2>

        <p>
          The word doing the work in that heading is <em>quietly</em>. These failures do not
          announce themselves; they look like completed work.
        </p>

        <ul>
          <li>
            <strong>Knowing what is actually true.</strong> A model will state a tax threshold, a
            licensing requirement, or a customs rule with total confidence and no idea whether
            it changed last year. In regulated or local-specific content this is the single
            largest risk, and it is invisible unless someone who knows the domain reads the page.
          </li>
          <li>
            <strong>Knowing what to leave out.</strong> Judgement about which of forty possible
            angles is right for <em>this</em> business is not a volume problem, and volume is
            what automation is good at.
          </li>
          <li>
            <strong>Sounding like anyone.</strong> Unedited output has a texture — smooth,
            balanced, slightly weightless. It is not wrong. It is just recognisably nobody,
            and in a market where trust drives the sale, sounding like nobody is a cost.
          </li>
          <li>
            <strong>Local specificity.</strong> Ask for content about a Nigerian or Kenyan market
            and you will frequently get a Western template with the place name substituted in.
            It reads fine to someone who has never been. It reads instantly wrong to your
            actual customer.
          </li>
          <li>
            <strong>Saying no.</strong> Ask for thirty pages and you get thirty pages. Nothing in
            the process says &ldquo;eleven of these are the same page&rdquo;.
          </li>
        </ul>

        <h2 id="side-by-side">Side by side, task by task</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Traditional</th>
                <th>AI-assisted</th>
                <th>Who should win</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Keyword research</td>
                <td>Days, partial coverage</td>
                <td>Hours, exhaustive</td>
                <td>AI, human reviews the skip list</td>
              </tr>
              <tr>
                <td>Deciding what to skip</td>
                <td>Experience-led</td>
                <td>Over-inclusive</td>
                <td>Human, clearly</td>
              </tr>
              <tr>
                <td>Competitor analysis</td>
                <td>Deep on three pages</td>
                <td>Broad on thirty</td>
                <td>Both — breadth then depth</td>
              </tr>
              <tr>
                <td>First draft</td>
                <td>4–8 hours a page</td>
                <td>Minutes</td>
                <td>AI, always edited</td>
              </tr>
              <tr>
                <td>Factual accuracy</td>
                <td>Reliable if briefed</td>
                <td>Confidently unreliable</td>
                <td>Human, non-negotiable</td>
              </tr>
              <tr>
                <td>Voice and specificity</td>
                <td>Strong</td>
                <td>Weightless</td>
                <td>Human</td>
              </tr>
              <tr>
                <td>Technical audit</td>
                <td>Periodic, sampled</td>
                <td>Continuous, complete</td>
                <td>AI, decisively</td>
              </tr>
              <tr>
                <td>Schema and metadata</td>
                <td>Manual, error-prone</td>
                <td>Validated every build</td>
                <td>AI</td>
              </tr>
              <tr>
                <td>Position monitoring</td>
                <td>Monthly snapshot</td>
                <td>Daily with alerts</td>
                <td>AI</td>
              </tr>
              <tr>
                <td>Explaining a drop</td>
                <td>Contextual</td>
                <td>Correlation, not cause</td>
                <td>Human</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Read the last column downward and the answer stops being a choice. Roughly half the
          job should be automated and roughly half should not, and any provider selling you
          one hundred percent of either is optimising for their margin rather than your
          result.
        </p>

        <h2 id="penalty-question">The penalty question, answered properly</h2>

        <p>
          &ldquo;Will AI content get us penalised?&rdquo; comes up on every first call, and the
          honest answer is more useful than the reassuring one.
        </p>

        <p>
          Google&rsquo;s published position is about usefulness, not authorship. What gets
          demoted is content that exists to occupy a keyword rather than to answer a question
          — and that category is much older than AI. The mass-produced doorway pages of 2011
          were entirely human-written and got flattened anyway.
        </p>

        <p>What actually correlates with getting hurt:</p>

        <ul>
          <li>Publishing at a volume no human could have reviewed</li>
          <li>Pages with nothing on them that is not already on ten other pages</li>
          <li>No named author, no accountability, no contact route</li>
          <li>Factual errors that a domain expert would have caught in one read</li>
          <li>Multiple pages on the same site competing for one phrase</li>
        </ul>

        <p>
          Notice that all five are things a human editor prevents, and none of them are
          &ldquo;a machine helped write this&rdquo;. The safe version of AI SEO is not the one that
          hides the automation. It is the one where a person read every word and is willing
          to put their name on it.
        </p>

        <h2 id="never-automate">Four jobs to never hand over unsupervised</h2>

        <ol>
          <li>
            <strong>Anything with a number in it.</strong> Rates, thresholds, deadlines, prices,
            statutory limits. Every one gets verified against a primary source, or it gets
            written as a range with a date attached.
          </li>
          <li>
            <strong>Anything local.</strong> Neighbourhoods, regulations, market conventions,
            what things are actually called where you operate. This is where imported templates
            expose themselves fastest.
          </li>
          <li>
            <strong>Anything about your own capability.</strong> What you deliver, what you
            guarantee, what you charge. Nobody should be discovering their own service
            description in a published draft.
          </li>
          <li>
            <strong>Anything attributed to a person.</strong> Quotes, testimonials, case study
            detail. If it did not happen, it does not publish — and illustrative examples get
            labelled as illustrative.
          </li>
        </ol>

        <h2 id="answer-engines">What changes when the answer is generated</h2>

        <p>
          The version of this comparison written three years ago is missing the thing that
          now matters most: a growing share of searches never produce a click. The searcher
          asks, a generated summary answers, and the visit that used to be yours does not
          happen.
        </p>

        <p>
          It is tempting to read that as bad news for everything in this article. It is
          mostly a redistribution. A generated answer has to be built from sources, and being
          one of those sources is a job with recognisable rules:
        </p>

        <ul>
          <li>
            <strong>Answer the question directly, early, in one paragraph.</strong> The pages
            that get quoted are the ones where the answer is extractable without interpretation.
            Six hundred words of preamble before the point is now actively expensive.
          </li>
          <li>
            <strong>Be structurally legible.</strong> Clear headings that match real questions,
            valid structured data, tables where the content is genuinely tabular. This is
            machine-readability, and it has quietly become a content requirement rather than a
            technical one.
          </li>
          <li>
            <strong>Say something that is not on the other nine pages.</strong> A summary
            assembled from ten sources that all say the same thing will cite whichever it
            trusts most. A page carrying the one detail the others omit gets cited because it
            has to be.
          </li>
          <li>
            <strong>Be attributable.</strong> Named organisation, real contact route, verifiable
            claims. Anonymity was survivable when the goal was a blue link. It is a poor bet
            when a system is deciding who to quote.
          </li>
        </ul>

        <p>
          Read that list again and notice it is the same list as before, with the volume
          turned up. Direct answers, clean structure, something original, accountable
          authorship. The shift does not change the work — it removes the margin for doing
          the work badly and still getting traffic.
        </p>

        <p>
          Which cuts against the pure-automation approach specifically. When ten competitors
          publish smooth, comprehensive, indistinguishable pages, the differentiator is
          whichever one contains a thing a person actually knew.
        </p>

        <h2 id="choosing">How to choose, in one paragraph</h2>

        <p>
          Stop asking providers whether they use AI. Everyone does now, including the ones
          who say they do not. Ask instead: which parts does the machine do, which parts does
          a person do, and who reads every page before it publishes. A provider running this
          well will answer in about fifteen seconds, because they have had to decide it
          deliberately. A provider who is either hiding automation or hiding behind it will
          give you a paragraph about their process.
        </p>

        <p>
          Both logistics companies at the top of this piece fixed their year, incidentally.
          The first added continuous technical monitoring. The second added a human editor
          with actual industry knowledge and cut publishing from sixty pages to twenty. They
          arrived at nearly the same place from opposite directions, which is the most
          useful thing in this entire comparison.
        </p>
      </PostShell>
    </>
  );
}
