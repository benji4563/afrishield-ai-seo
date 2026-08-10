import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('what-ai-seo-actually-does')!;

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
  { id: 'the-honest-version', label: 'The honest version of the job' },
  { id: 'monday', label: 'Monday: the keyword massacre' },
  { id: 'midweek', label: 'Midweek: writing against what already ranks' },
  { id: 'friday', label: 'Friday: the unglamorous checklist' },
  { id: 'machine-and-human', label: 'What the machine does, what the human does' },
  { id: 'not-do', label: 'What we do not do at all' },
  { id: 'the-report', label: 'What the monthly report should contain' },
  { id: 'where-money-goes', label: 'Where the money actually goes' },
  { id: 'audit-yours', label: 'How to tell if yours is doing the work' },
];

const FAQ = [
  {
    q: 'What does an AI SEO agency actually do differently?',
    a: 'The difference is where the hours go, not what gets produced. Clustering thousands of keyword rows, drafting against a researched outline, and checking schema on every route are jobs that used to consume junior analyst time. Agents do those at volume. The strategy, the editing, and the judgement about what to skip stay with a person, because those are the parts that go wrong quietly.',
  },
  {
    q: 'Is AI SEO just mass-produced content?',
    a: 'It can be, and that version fails. Search engines are unusually good at spotting pages that exist to occupy a keyword rather than to answer a question. What works is using automation for the research and the checking, then having a human write and edit something a real reader would finish.',
  },
  {
    q: 'How many pages a month should a small business publish?',
    a: 'Two to four is enough for most service businesses, provided each one targets a keyword nobody else on the site has claimed and answers the question completely. Twenty thin pages lose to four good ones, and they cost more to clean up later.',
  },
  {
    q: 'Do I need to approve every piece of content?',
    a: 'You should approve the keyword map before anything is written, because that is where the expensive mistakes live. Approving individual drafts is optional and most clients stop after the first month once the voice is settled.',
  },
  {
    q: 'How do I know the work is actually happening?',
    a: 'Ask for the keyword log and the list of URLs published this month. Both are one-line answers if the work is real. If the answer involves scheduling a call to walk you through a dashboard, that is worth noticing.',
  },
  {
    q: 'Can a small business do this in-house instead?',
    a: 'Yes, and some should. If you have someone who can spend six focused hours a week on it indefinitely, in-house is cheaper and often better because they know the business. The reason most businesses outsource is not skill — it is that the six hours are always the first thing to get eaten.',
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
          An AI SEO agency spends most of its week on three things — deciding what to
          target, writing pages that answer those questions better than the current top
          results, and checking the technical plumbing that lets search engines understand
          them. Agents handle the volume: clustering keywords, drafting from research,
          validating schema. A human decides what to skip, edits every published word, and
          signs the report. If nobody on your account can name the keyword each page is
          claiming, that is not AI SEO. That is invoicing.
        </ShortAnswer>

        <Scene>
          <p>
            Adaeze runs a three-person conveyancing practice. She had a website built in
            2022 by a cousin who was, and remains, very good at graphic design. It is a
            handsome site. It has never once appeared for the phrase “property lawyer”
            followed by the name of her city.
          </p>
          <p>
            In 2024 she hired an agency. They sent a monthly PDF with a chart that went up.
            When she asked which page had improved, they sent a longer PDF. After eleven
            months she cancelled, and when she asked what she was left with, the answer was
            the eleven PDFs.
          </p>
          <p>
            The thing that annoys her, two years later, is not the money. It is that she
            still cannot say what those eleven months were spent doing.
          </p>
        </Scene>

        <p>
          That is the question this piece answers. Not what SEO is — there are ten thousand
          posts about that, and most of them were written by people being paid by the word
          to avoid answering. This is what the week actually contains, hour by hour,
          including the parts nobody puts in a case study because they photograph badly.
        </p>

        <h2 id="the-honest-version">The honest version of the job</h2>

        <p>
          Search work is roughly thirty separate tasks wearing one trench coat. About four
          of them are interesting. The other twenty-six are the reason it works.
        </p>

        <p>
          The interesting four are the ones agencies lead with: strategy, positioning,
          content angles, competitive analysis. Genuinely important, genuinely enjoyable,
          and collectively about a day a month. The remaining twenty-six are things like
          checking that your canonical tags do not contradict each other, noticing that a
          plugin update quietly added a second H1 to every service page, and confirming
          that the sitemap still lists routes that exist.
        </p>

        <p>
          Nobody has ever won an award for fixing a sitemap. It is also the single most
          common reason a site with good content ranks for nothing.
        </p>

        <h2 id="monday">Monday: the keyword massacre</h2>

        <p>
          Every engagement starts with a keyword export, and every keyword export is mostly
          garbage. This is not a criticism of the tools. It is what happens when you ask a
          machine for every phrase containing a word.
        </p>

        <p>
          Pull the data for an accounting firm and you get, in no particular order: people
          searching for accounting degree salaries, people trying to log in to accounting
          software, people looking up a government tax portal, three competitor brand names,
          somebody researching a video game with “tycoon” in the title, and — buried in
          there — about forty phrases belonging to people who want to hire an accountant
          this month.
        </p>

        <p>
          Roughly three rows in four never earn a page. The job is to throw them out
          <strong> loudly</strong>, in a document the client can read, with the reason
          attached. Not because clients enjoy reading skip lists, but because the alternative
          is an agency quietly targeting “accounting degree salary” for six months and
          reporting the traffic as a win.
        </p>

        <p>What survives gets sorted by what the searcher actually wants:</p>

        <ul>
          <li>
            <strong>Hire someone now.</strong> The phrases that convert. Expensive,
            competitive, worth every hour.
          </li>
          <li>
            <strong>What does this cost.</strong> The anxiety searches. Almost nobody
            answers them properly, which makes them the easiest genuine win available.
          </li>
          <li>
            <strong>I am in trouble.</strong> Behind on filings, missed a deadline, got a
            letter. High intent, low competition, and the pages nobody writes because they
            are uncomfortable.
          </li>
          <li>
            <strong>Explain this to me.</strong> Low commercial value individually, but they
            build the topical weight that makes the first three rank at all.
          </li>
        </ul>

        <p>
          One primary keyword gets assigned per page and logged. It never gets used twice.
          The most common self-inflicted wound in SEO is three pages on one site quietly
          competing against each other for the same phrase, and it happens because nobody
          kept a list.
        </p>

        <h2 id="midweek">Midweek: writing against what already ranks</h2>

        <p>
          Here is the part people find deflating: before writing anything, you read the
          competition. All of it. The current top results for the target phrase, start to
          finish, with a notebook.
        </p>

        <p>You are not reading for prose. You are reading for shape:</p>

        <ul>
          <li>What format is winning — a list, a decision framework, a walkthrough?</li>
          <li>How long are they, roughly?</li>
          <li>What does every single one of them cover?</li>
          <li>
            What does <strong>none</strong> of them cover?
          </li>
        </ul>

        <p>
          That last question is the whole job. In nearly every commercial search, the top
          results share the same blind spot, and it is almost always one of three things:
          the actual price, the situation where you should not buy this yet, or the real
          arithmetic behind a claim everyone else hand-waves.
        </p>

        <p>
          They skip those because they are uncomfortable to write. Which is exactly why
          covering them works.
        </p>

        <blockquote>
          Structural patterns get borrowed. Sentences never do. Reading what ranks teaches
          you the shape of a good answer; copying it teaches Google that you are a
          duplicate.
        </blockquote>

        <p>
          Then it gets written — a direct answer at the top for anyone who wants the
          conclusion and not the essay, the sections that match what winning pages cover,
          the section nobody else has, and a genuine FAQ drawn from the questions people
          actually ask rather than six rephrasings of the title.
        </p>

        <h2 id="friday">Friday: the unglamorous checklist</h2>

        <p>
          A page is not finished when the words are done. It is finished when all of this
          is true:
        </p>

        <ul>
          <li>The title fits inside what search engines actually render, with the keyword near the front</li>
          <li>The meta description says something specific rather than restating the title</li>
          <li>There is exactly one canonical tag and it points at the right URL</li>
          <li>Structured data is present, valid, and matches what is visibly on the page</li>
          <li>Internal links point at routes that return 200 — no aspirational links to pages that do not exist yet</li>
          <li>Images have alt text that describes something, not “image1”</li>
          <li>The page is in the sitemap</li>
          <li>The keyword is logged as claimed</li>
          <li>It loads acceptably on a mid-range Android phone on a patchy connection</li>
        </ul>

        <p>
          That last one gets skipped constantly by agencies working from Western templates,
          and it matters enormously in markets where most traffic arrives on a mid-tier
          handset. A page that takes nine seconds to become useful has, functionally, not
          been published.
        </p>

        <h2 id="machine-and-human">What the machine does, what the human does</h2>

        <p>
          “AI SEO” is a phrase doing a lot of work in a lot of marketing, so here is the
          actual division of labour:
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Agents handle</th>
                <th>A person handles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clustering thousands of keyword rows by intent</td>
                <td>Deciding which clusters are wrong for this business</td>
              </tr>
              <tr>
                <td>Pulling and summarising what currently ranks</td>
                <td>Spotting the gap worth writing into</td>
              </tr>
              <tr>
                <td>Drafting against an approved outline</td>
                <td>Editing every sentence that publishes</td>
              </tr>
              <tr>
                <td>Validating schema and metadata on every route</td>
                <td>Deciding what the schema should claim</td>
              </tr>
              <tr>
                <td>Watching positions daily and flagging movement</td>
                <td>Explaining what the movement means and what to do</td>
              </tr>
              <tr>
                <td>Assembling the monthly report</td>
                <td>Signing it, including the parts that went backwards</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The pattern is consistent: machines are excellent at volume and consistency, and
          reliably confident when they are wrong. Every place where being confidently wrong
          is expensive, a person stays in the loop.
        </p>

        <h2 id="not-do">What we do not do at all</h2>

        <p>
          A shorter list, and more useful than most of what is above.
        </p>

        <ul>
          <li>
            <strong>We do not buy links.</strong> It works until it does not, and the
            recovery costs more than the gains.
          </li>
          <li>
            <strong>We do not publish thin location pages.</strong> A page that is your home
            page with the city name swapped is detectable, and it drags down the pages
            around it.
          </li>
          <li>
            <strong>We do not guarantee positions.</strong> Nobody controls the ranking. Anyone
            promising position one is quoting a number they cannot deliver.
          </li>
          <li>
            <strong>We do not write testimonials.</strong> Illustrative composites get labelled
            as composites. Invented client quotes pay off exactly once.
          </li>
          <li>
            <strong>We do not report only good news.</strong> A report where nothing ever falls
            is not a report. It is a newsletter.
          </li>
        </ul>

        <h2 id="the-report">What the monthly report should contain</h2>

        <p>
          Reporting is where the whole arrangement is won or lost, and it is the part most
          providers treat as an afterthought. A useful report fits on one page and contains
          exactly five things.
        </p>

        <ol>
          <li>
            <strong>Every keyword you have claimed, with last month beside this month.</strong>
            Not a selection. Not the top ten. All of them, so the ones that went nowhere are as
            visible as the ones that moved.
          </li>
          <li>
            <strong>What published, by URL.</strong> Not &ldquo;four pieces of content&rdquo; — four
            links you can open.
          </li>
          <li>
            <strong>What fell, and the current theory why.</strong> A theory is allowed to be
            wrong. Its absence is not.
          </li>
          <li>
            <strong>What is queued for next month.</strong> So you can object before the work
            happens rather than after.
          </li>
          <li>
            <strong>One plain sentence on whether the trend justifies the invoice.</strong> This
            is the line that costs providers money to write honestly, which is exactly why it
            belongs there.
          </li>
        </ol>

        <p>
          If a report needs a walkthrough call before it makes sense, it was written to be
          presented rather than read. Those are different documents with different purposes,
          and only one of them is for you.
        </p>

        <h2 id="where-money-goes">Where the money actually goes</h2>

        <p>
          For a typical small-business month at the $600–$1,200 mark, the hours split roughly
          like this. Percentages move with how broken the site was, but the shape holds.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>Share of the month</th>
                <th>Mostly done by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Writing and editing pages</td>
                <td>~40%</td>
                <td>Agent drafts, human edits</td>
              </tr>
              <tr>
                <td>Research before writing</td>
                <td>~20%</td>
                <td>Agent, human picks the angle</td>
              </tr>
              <tr>
                <td>Technical checks and fixes</td>
                <td>~20%</td>
                <td>Agent, human triages</td>
              </tr>
              <tr>
                <td>Monitoring and diagnosis</td>
                <td>~10%</td>
                <td>Agent watches, human explains</td>
              </tr>
              <tr>
                <td>Reporting and correspondence</td>
                <td>~10%</td>
                <td>Human</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The useful thing about seeing it laid out is noticing what is missing: there is no
          line for meetings, and no line for account management as a separate discipline. In
          an engagement this size, the person doing the work should also be the person you
          email. Every layer between those two roles is a layer you are paying for.
        </p>

        <h2 id="audit-yours">How to tell if yours is doing the work</h2>

        <p>
          Five questions. Ask your current provider, or ask us. Each should get a direct
          answer inside a minute, and the ones that do not are the interesting ones.
        </p>

        <ol>
          <li>Which keyword is each page on my site targeting? (Expect a list.)</li>
          <li>What did you deliberately choose not to target, and why? (Expect a skip list. Its absence is the answer.)</li>
          <li>Which URLs published last month? (Expect URLs, not a count.)</li>
          <li>Which positions fell last month? (If the answer is “none”, nobody is looking.)</li>
          <li>If we stopped tomorrow, what do we keep? (Should be everything.)</li>
        </ol>

        <p>
          Adaeze, from the top of this piece, could not answer any of the five after eleven
          months. That is not because her agency were crooks. It is because nothing in the
          arrangement ever required anyone to write the answers down.
        </p>

        <p>
          The work itself is not glamorous and it is not mysterious. It is a keyword list,
          a publishing rhythm, a checklist run properly every week, and a report that
          includes the bad news. Everything else is packaging.
        </p>
      </PostShell>
    </>
  );
}
