import type { Metadata } from 'next';
import Link from 'next/link';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('small-business-seo')!;

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
  },
  twitter: { card: 'summary_large_image', title: post.title, description: post.description },
};

const TOC = [
  { id: 'what-it-means', label: 'What small business SEO actually means' },
  { id: 'why-different', label: 'Why it is not enterprise SEO with a smaller invoice' },
  { id: 'where-to-start', label: 'Where to start with a small budget' },
  { id: 'google-business-profile', label: 'The highest-leverage move most owners skip' },
  { id: 'content-that-works', label: 'The kind of content that actually earns rankings' },
  { id: 'technical-basics', label: 'The technical basics that are non-negotiable' },
  { id: 'ai-answers', label: 'Showing up when the answer comes from AI' },
  { id: 'diy-vs-hire', label: 'Doing it yourself versus hiring it out' },
  { id: 'what-to-avoid', label: 'What wastes a small business owner’s time' },
];

const FAQ = [
  {
    q: 'What is small business SEO?',
    a: 'It is ordinary search engine optimisation, applied under the real constraints a small business has — a limited budget, no in-house marketing team, and an owner who is also doing the selling. The fundamentals do not change: be findable, be clear, be trusted. What changes is the order of operations, because there is no room to do everything at once.',
  },
  {
    q: 'How much does small business SEO cost?',
    a: 'It varies more than most pricing pages admit, and we cover the actual ranges and what sits behind them in a separate piece on what SEO actually costs. As a rough anchor, a small, focused engagement for one local business typically runs far below what an enterprise retainer costs, because the scope — a handful of pages, one location, one clear service list — is smaller too.',
  },
  {
    q: 'Can a small business owner do their own SEO?',
    a: 'Yes, up to a point. Claiming a Google Business Profile, writing honest service pages, and fixing obvious technical problems are all things an owner can do in a weekend with no budget. Where it gets harder is sustained content, technical schema, and knowing which of a hundred possible fixes actually matter this month — that is usually where owners either stall or hire it out.',
  },
  {
    q: 'Is SEO worth it for a very small or local business?',
    a: 'For most businesses that depend on new customers finding them, yes — the alternative is being invisible on the one channel where people actively ask for what you sell. It is a poor fit for a business that is already fully booked through referrals with no ambition to grow, or one still figuring out what it sells. SEO compounds a working offer; it does not create one.',
  },
  {
    q: 'What is the fastest way to improve small business SEO?',
    a: 'Claim and complete the Google Business Profile properly — correct category, real hours, real photos, and a habit of replying to reviews. It is free, it is the single highest-leverage move for a locally findable business, and most owners either never claim it or abandon it after the first week. Nothing else on this page moves faster.',
  },
  {
    q: 'Do small businesses need SEO if they already get referrals?',
    a: 'Referrals are a real channel, not a reason to skip search. Most referred customers still check a business online before calling, and what they find there — or fail to find — either confirms the referral or quietly kills it. SEO in that case is less about generating new leads and more about not losing the ones already walking through the door.',
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
          Small business SEO is the version of search engine optimisation built around the
          constraints an independent business actually has — a small budget, no marketing
          department, and an owner who is also answering the phone. It uses the same
          fundamentals as SEO at any scale, but prioritises them differently: a handful of
          specific, well-answered pages beats a hundred thin ones, and a properly filled-out
          Google Business Profile usually outperforms an expensive website redesign nobody
          asked for.
        </ShortAnswer>

        <Scene>
          <p>
            Amara runs a small event-catering business out of a rented kitchen in Accra. For
            three years, every booking came from word of mouth and a WhatsApp group of past
            clients.
          </p>
          <p>
            When a quiet season hit, she paid a nephew studying computer science to build her
            a website. It looked sharp. It brought in one enquiry in six months, and that one
            was from a cousin checking it existed.
          </p>
          <p>
            The problem was never the design. The site answered no question anyone was
            actually searching for, was not claimed on Google Maps, and took eleven seconds
            to load on the phone most of her customers actually own.
          </p>
        </Scene>

        <p>
          That gap — a business that is real, capable, and completely invisible to the exact
          people searching for it — is what small business SEO is meant to close. Not with a
          bigger budget, because most small businesses do not have one, but with a shorter,
          better-ordered list of things that are worth doing first.
        </p>

        <h2 id="what-it-means">What small business SEO actually means</h2>

        <p>
          Strip away the marketing language and small business SEO means three things: your
          business shows up when someone searches for what you sell, the page they land on
          answers their question honestly, and enough of the internet corroborates that you
          are real and trustworthy. Nothing about that changes because the business is small.
          What changes is who has time to do it.
        </p>

        <p>
          A large company has a marketing team, a developer, and a content calendar. A small
          business usually has one person who also does the books, the deliveries, and the
          customer replies. Small business SEO is not a lighter version of the same
          discipline — it is the same discipline, resequenced so the highest-return work
          happens first and the rest waits.
        </p>

        <h2 id="why-different">Why it is not enterprise SEO with a smaller invoice</h2>

        <p>
          It is not the same job done cheaper — it is a different job in scale and in who
          does it. An enterprise site might have thousands of pages, a dozen stakeholders
          signing off on copy, and a content team publishing daily. A small business
          typically has ten to thirty pages that matter, one decision-maker, and no appetite
          for a content calendar that runs itself into the ground by March.
        </p>

        <p>
          That difference in scale is why a strategy borrowed from a big-brand playbook — a
          blog cadence of three posts a week, a backlink campaign, a full technical audit —
          usually fails a small business twice over. It costs more than the business can
          sustain, and it buries the two or three moves that would have actually mattered
          under a pile of work that does not.
        </p>

        <p>
          There is an upside hiding in the same size difference. A large competitor with a
          bigger budget almost never has a page that answers a specific local question in
          plain language — that kind of specificity is exactly what gets lost when marketing
          runs through several layers of sign-off. A small business that writes its own facts
          down clearly, in its own voice, is often the only one in its market that has, and
          that gap is the actual differentiation, not a logo or a slogan.
        </p>

        <h2 id="where-to-start">Where to start with a small budget</h2>

        <p>
          Sequence, not volume, is what separates small business SEO that works from small
          business SEO that quietly fails. A workable order looks like this:
        </p>

        <ol>
          <li>
            <strong>Claim and complete the Google Business Profile.</strong> Free, fast, and
            disproportionately valuable for anything with a physical location or a service
            area.
          </li>
          <li>
            <strong>Write one clear page per core service.</strong> Not a blog post about the
            industry — a page that states plainly what you do, for whom, and roughly what it
            costs.
          </li>
          <li>
            <strong>Fix the technical basics.</strong> The site loads fast on an ordinary
            phone, works without a fast connection, and has one obvious way to contact you.
          </li>
          <li>
            <strong>Then, and only then, add content.</strong> Answers to the specific
            questions customers actually ask, published on a pace you can sustain without
            burning out by the third month.
          </li>
        </ol>

        <p>
          Almost every small business that gives up on SEO did the steps in the wrong order —
          usually content first, technical basics never, and the Google Business Profile
          claimed once and forgotten.
        </p>

        <h2 id="google-business-profile">The highest-leverage move most owners skip</h2>

        <p>
          For a locally findable business, nothing on this list returns more for less effort
          than a properly maintained Google Business Profile. It is free, it appears in Maps
          and in &ldquo;near me&rdquo; searches, and it is increasingly the source an AI
          assistant reaches for when someone asks it to recommend a business nearby.
        </p>

        <p>
          The work is unglamorous and mostly ignored: the correct category, real operating
          hours kept current, photos that are actually of the business rather than stock
          images, and replies to reviews — good and bad — instead of silence. Owners who do
          this consistently for a few months routinely outperform competitors with a nicer
          website and no profile at all.
        </p>

        <h2 id="content-that-works">The kind of content that actually earns rankings</h2>

        <p>
          Content that earns rankings for a small business is narrow and specific: one page
          per service, stating the useful facts near the top, written in the words a
          customer would actually use. What does not work is the package small businesses are
          frequently sold instead — ten generic blog posts, &ldquo;5 Tips for Choosing a
          Plumber&rdquo; and the like, written for search volume nobody in the actual market
          is generating. It reads as content and does almost nothing, because it answers no
          question a real customer was asking with money in hand.
        </p>

        <p>
          The useful facts to state plainly are the same for almost any small business:
          price ranges, service area, and what is and is not included, near the top instead
          of buried under three paragraphs of introduction. Writing that well and keeping it
          current is exactly the kind of work a template or an automated draft can start, but
          should not finish unedited — the comparison in{' '}
          <Link href="/blog/ai-seo-vs-traditional-seo" className="underline underline-offset-4 hover:text-green-600">
            AI SEO vs traditional SEO
          </Link>{' '}
          covers where automation genuinely speeds this up and where it still needs a human
          reading the output before anything is published.
        </p>

        <h2 id="technical-basics">The technical basics that are non-negotiable</h2>

        <p>
          A handful of technical items are not optional, regardless of budget. The site loads
          in a few seconds on a mid-range phone on a patchy connection — not a fibre line in
          an office, the connection your actual customer has. It reads correctly on a small
          screen without pinching and zooming. It runs on HTTPS. And it carries basic
          structured data — a <code>LocalBusiness</code> schema at minimum — so search
          engines and AI systems alike can read what the business is and where it operates
          without guessing.
        </p>

        <p>
          None of this requires a large technical budget. It requires doing it once, correctly,
          before spending a cent on content that a slow or broken site will bury anyway. Most
          page builders and templates handle HTTPS and basic mobile layout by default now, so
          the actual audit for a small business is short: load the homepage and the busiest
          service page on an ordinary phone, on mobile data rather than office wifi, and time
          it honestly.
        </p>

        <h2 id="ai-answers">Showing up when the answer comes from AI</h2>

        <p>
          A small business now needs to be findable by a second kind of search: a person
          asking ChatGPT, Claude, or Perplexity for a recommendation and getting a paragraph
          back that names two or three businesses inside it, rather than a list of links.
          Small, specific businesses have an underrated advantage here, covered at length in{' '}
          <Link href="/blog/answer-engine-optimization" className="underline underline-offset-4 hover:text-green-600">
            our piece on answer engine optimization
          </Link>
          : the models are weakest exactly where the web is thinnest, and a small local
          market is often thin. A business that states its facts plainly becomes the default
          source, not because it out-marketed anyone, but because almost nobody else wrote
          the facts down at all.
        </p>

        <h2 id="diy-vs-hire">Doing it yourself versus hiring it out</h2>

        <p>
          Neither is automatically right. It depends on how much time the owner actually has,
          and what a lost month is worth to the business.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Doing it yourself</th>
                <th>Hiring it out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free, but competes with every other task the owner already does</td>
                <td>Costs money, but happens on a schedule regardless of a busy week</td>
              </tr>
              <tr>
                <td>Fine for the Google Business Profile and one or two service pages</td>
                <td>Better suited to ongoing content, technical schema, and tracking</td>
              </tr>
              <tr>
                <td>Risk of stalling after the first burst of enthusiasm</td>
                <td>Risk of paying for generic work nobody checks against the market</td>
              </tr>
              <tr>
                <td>No learning curve on what a provider is actually doing for the fee</td>
                <td>Worth reading{' '}
                  <Link href="/blog/what-ai-seo-actually-does" className="underline underline-offset-4 hover:text-green-600">
                    what an AI SEO agency actually does all day
                  </Link>{' '}
                  before signing anything
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          A reasonable middle path many small businesses land on: do the free, high-leverage
          items yourself in the first month — the Google Business Profile, the obvious
          technical fixes — then decide whether the remaining work is worth paying for, with{' '}
          <Link href="/blog/what-seo-actually-costs" className="underline underline-offset-4 hover:text-green-600">
            real numbers on what that costs
          </Link>{' '}
          rather than a guess.
        </p>

        <h2 id="what-to-avoid">What wastes a small business owner&rsquo;s time</h2>

        <p>
          The biggest waste is spending on SEO before there is a working offer to compound —
          if the business is already fully booked through referrals with no plan to grow, or
          the owner has not yet settled on what the business actually sells, SEO is not the
          next move. It amplifies an offer that already works; it does not invent one. Spend
          the money on figuring out the offer first. Past that, a shorter list of honest
          traps is worth naming.
        </p>

        <ul>
          <li>
            <strong>Guaranteed rankings.</strong> Nobody controls the algorithm well enough
            to promise a position. Anyone who does is selling confidence, not results.
          </li>
          <li>
            <strong>A large package of generic blog posts.</strong> Volume without specificity
            reads as filler to a person and to a search engine alike.
          </li>
          <li>
            <strong>Ignoring the Google Business Profile after claiming it once.</strong> An
            abandoned listing with old hours and no replies is worse than no listing, because
            it actively tells customers the business may not still be open.
          </li>
          <li>
            <strong>A full redesign before anything else.</strong> A new look does not fix an
            invisible site. Fix findability first; redesign later if it is still needed.
          </li>
        </ul>

        <p>
          None of this is complicated, and none of it requires an enterprise budget. It
          requires doing the few things that matter, in the right order, and being honest
          about which month is realistic for which result.
        </p>
      </PostShell>
    </>
  );
}
