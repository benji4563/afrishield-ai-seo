import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
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
  { id: 'what-it-is', label: 'What small business SEO actually is' },
  { id: 'why-different', label: 'Why it is not scaled-down enterprise SEO' },
  { id: 'where-to-start', label: 'Where to start with a small or zero budget' },
  { id: 'gbp-local', label: 'Google Business Profile and local signals' },
  { id: 'content-that-works', label: 'Content that actually works' },
  { id: 'technical-basics', label: 'Technical basics that matter' },
  { id: 'ai-visibility', label: 'Being visible to AI answers, not just Google' },
  { id: 'hire-or-diy', label: 'When to do it yourself, and when to hire it out' },
  { id: 'how-long', label: 'How long it takes to show results' },
];

const FAQ = [
  {
    q: 'What is small business SEO?',
    a: 'It is the practice of making a small, resource-constrained business easy for a search engine, and increasingly an AI assistant, to find, trust, and recommend. The mechanics overlap with any SEO — search intent, technical basics, content — but the method has to fit an owner-run budget rather than an enterprise one.',
  },
  {
    q: 'How much does small business SEO cost?',
    a: 'Doing it yourself costs time, not money, and can genuinely work for a five-to-twenty-page site. Hiring it out typically starts in the low hundreds of dollars a month for a small operation and rises with the number of pages, cities, and posts published. There is a longer, more honest breakdown of the numbers in what SEO actually costs.',
  },
  {
    q: 'Can I do SEO myself for my small business?',
    a: 'Yes, for the first stage. A complete Google Business Profile, accurate service pages, and a small run of question-answering content are all within reach of one owner with a few hours a week and no specialist tools. Where it gets harder is consistency over months and technical issues that need someone who has seen them before.',
  },
  {
    q: 'How long does small business SEO take to work?',
    a: 'Early movement, such as appearing in the map pack or ranking for a specific local phrase, tends to show in six to twelve weeks. Meaningful, compounding traffic usually takes six months or more, because a new or thin site has to be crawled, trusted, and compared against competitors who have been indexed for years already.',
  },
  {
    q: 'Is SEO worth it for a small business?',
    a: 'For a business with a settled product or service and repeat local demand, yes, because the traffic it earns keeps arriving without a fresh ad spend every day. For a business that is still finding its offer, the honest answer is to wait — SEO rewards a settled thing to describe, not a moving target.',
  },
  {
    q: 'What is the difference between SEO and Google Ads for a small business?',
    a: 'Ads buy attention for as long as you keep paying; SEO earns a position that keeps producing after the work is done, but takes longer to start and never guarantees a spot. Most small businesses that can afford both run ads for the immediate gap and SEO for the compounding position underneath it.',
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
          Small business SEO is the practice of making a small, resource-constrained business
          easy for a search engine, and increasingly an AI assistant such as ChatGPT, Claude,
          or Google&rsquo;s AI Overview, to find, trust, and recommend — using the time and
          budget an owner-run business actually has, not an enterprise media budget. In
          practice it means a complete Google Business Profile, a handful of accurate service
          and city pages, and content that answers the exact questions customers already ask
          in person. Most of it costs time rather than money, at least at the start.
        </ShortAnswer>

        <Scene>
          <p>
            Kwabena runs a small print shop in Accra — business cards, banners, wedding
            invitations, the odd t-shirt run. For years his customers found him the way
            everyone in that trade does: word of mouth, a signboard, and a phone number passed
            between market stalls.
          </p>
          <p>
            He built a website two years ago because a customer told him to. It sat there,
            unchanged, with a stock photo of a printing press that was not his and a phone
            number that was two digits wrong. It ranked for nothing, because there was nothing
            on it worth ranking.
          </p>
          <p>
            Fixing it took an afternoon, not an agency retainer: a real photo, the correct
            number, one page per product line, and a Google Business Profile filled in
            properly for the first time. Three months later, a search for wedding invitation
            printing in his neighbourhood put him on the map, literally.
          </p>
        </Scene>

        <p>
          That is most of what this piece is about. Small business SEO is not a smaller
          version of what a large company does. It is a different job, sized to what one
          owner or a two-person team can actually sustain, and most of the highest-return
          moves in it cost nothing but attention.
        </p>

        <h2 id="what-it-is">What small business SEO actually is</h2>

        <p>
          Small business SEO is the practice of making a small, resource-constrained business
          easy for a search engine, and increasingly an AI assistant, to find, trust, and
          recommend, using tools and time an SMB actually has. It borrows every principle from
          SEO generally — relevance, technical soundness, credible content — and applies them
          at a scale one person can maintain without a content team or a specialist budget.
        </p>

        <p>
          The goal is narrower than it sounds. A small business rarely needs to rank for a
          broad national term. It needs to be the answer for a handful of specific, local, or
          niche searches that its actual customers type, which is a smaller and far more
          winnable target than most owners assume.
        </p>

        <h2 id="why-different">Why it is not scaled-down enterprise SEO</h2>

        <p>
          Small business SEO is not enterprise SEO with a smaller budget attached to it; it
          runs on entirely different constraints. An enterprise site has a content team, a
          developer on call, and thousands of pages competing nationally. A small business has
          one owner&rsquo;s spare hours, a handful of pages, and a defined local or niche
          market it already understands better than any outside agency does.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Enterprise SEO leans on</th>
                <th>Small business SEO leans on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A dedicated content and technical team</td>
                <td>One owner, or a single hired hand, working a few hours a week</td>
              </tr>
              <tr>
                <td>Thousands of pages competing nationally</td>
                <td>A handful of pages, deep on one product or service and one area</td>
              </tr>
              <tr>
                <td>Broad, high-volume head terms</td>
                <td>Specific, local, lower-volume phrases with real buying intent</td>
              </tr>
              <tr>
                <td>Backlink campaigns and digital PR</td>
                <td>Directory listings, local mentions, and a Google Business Profile</td>
              </tr>
              <tr>
                <td>Months of content already indexed and trusted</td>
                <td>A newer, thinner site that has to earn trust from close to zero</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The practical upshot is that copying an enterprise SEO checklist wastes a small
          business&rsquo;s scarcest resource, which is not money but attention. The list below
          is the one that actually fits the constraints.
        </p>

        <h2 id="where-to-start">Where to start with a small or zero budget</h2>

        <p>
          Start with the three moves that cost time rather than money: a complete Google
          Business Profile, a website that states the services and the city plainly, and five
          to ten pages answering the exact questions customers already ask in person or on the
          phone. Nothing past that matters until those three are actually done, not merely
          started.
        </p>

        <ul>
          <li>
            <strong>Claim and complete the Google Business Profile.</strong> Category, hours,
            service area, photos, and a description in plain language — most local businesses
            leave this half-filled and wonder why they are invisible on the map.
          </li>
          <li>
            <strong>Write down what you actually do.</strong> One page per real service, in
            the words a customer would use, not internal jargon. A print shop writes
            &ldquo;wedding invitation printing,&rdquo; not &ldquo;bespoke stationery
            solutions.&rdquo;
          </li>
          <li>
            <strong>Fix the obvious.</strong> A working phone number, a real photo, a page that
            loads quickly on a mid-range phone. None of this is glamorous, and all of it is
            what most small business sites get wrong first.
          </li>
        </ul>

        <p>
          The full sequence a paid engagement follows, from audit through ongoing publishing,
          is laid out in more detail on{' '}
          <a href="/how-it-works">how an AI SEO engagement runs</a> — worth a look even if you
          are doing the early steps yourself, because it shows what comes after the basics.
        </p>

        <h2 id="gbp-local">Google Business Profile and local signals</h2>

        <p>
          A complete, regularly updated Google Business Profile is the single highest-return
          move available to a small business, because it decides whether the business appears
          in the map pack before a visitor ever reaches the website at all. For a shop, a
          clinic, a workshop, or anything with a physical location or a defined service area,
          this is the first battle, not a secondary one.
        </p>

        <p>
          The signals that move it are ordinary and checkable: a category that matches what
          the business actually does, hours that are correct including holidays, photos that
          are real, and reviews that are responded to, good or bad. A profile last touched two
          years ago reads as abandoned to both the algorithm and the customer scrolling past
          it.
        </p>

        {/* Cluster sibling: Google Business Profile optimisation — queued, link here on publish */}

        <h2 id="content-that-works">Content that actually works</h2>

        <p>
          The content that works for a small business is narrow and specific: one page per
          real service, one page per real city or neighbourhood served, each answering a
          question a genuine customer has actually asked, not a broad guide written to rank
          for a broad term nobody with buying intent is searching. Specificity is the entire
          advantage a small business has over a national competitor, and most small business
          content throws it away by trying to sound bigger than it is.
        </p>

        <p>
          A useful test before publishing anything: would a real customer, mid-conversation,
          ask this exact question? If the answer is no, the page is being written for a
          keyword tool, not a person, and it will read that way to both.
        </p>

        <h2 id="technical-basics">Technical basics that matter</h2>

        <p>
          Three technical basics matter for a small business site, and almost nothing past
          them does: the page loads quickly on a mid-range phone on an ordinary connection,
          every page has one clear heading and a working sitemap, and nothing important
          depends on JavaScript a crawler cannot reliably execute. A five-to-twenty-page site
          does not need the technical apparatus a publisher with ten thousand pages needs, and
          building it anyway is money and attention spent on a problem the business does not
          have.
        </p>

        <ul>
          <li>
            <strong>Structured data that matches the page.</strong> Organisation and, where it
            fits, LocalBusiness schema tells a search engine or an AI assistant what the
            business is and where it operates, in a format that does not need interpreting.
          </li>
          <li>
            <strong>One canonical page per service.</strong> Duplicate or near-identical pages
            competing for the same phrase confuse a search engine about which one to trust, and
            a small site cannot afford that kind of self-inflicted dilution.
          </li>
          <li>
            <strong>A real mobile check, not a preview.</strong> Load the actual site on an
            actual mid-range phone on mobile data at least once a month — a desktop preview at
            full broadband speed hides exactly the problems that cost a small business its
            visitors.
          </li>
        </ul>

        <p>
          Where this bites hardest in African markets specifically is page weight. A site
          built and tested on fibre in an agency office can be functionally broken for a
          customer on a mid-range Android phone and a patchy connection — and a page that
          takes nine seconds to become usable has, in effect, not been published for either
          the person or the crawler reading on their behalf.
        </p>

        <h2 id="ai-visibility">Being visible to AI answers, not just Google</h2>

        <p>
          Small business SEO now includes a second target: being named inside the answer an
          assistant such as ChatGPT, Claude, Perplexity, or Google&rsquo;s AI Overview gives,
          which rewards the same clear, specific writing that ranks on Google but adds a
          premium on being the original, checkable source rather than the fortieth summary of
          a generic definition. A customer who asks ChatGPT or Google&rsquo;s AI Overview which
          print shop handles wedding invitations locally gets a named answer, not a list of
          links to scroll — and a small, thinly documented market is often where an assistant
          has the least to work with, which cuts in the small business&rsquo;s favour rather
          than against it.
        </p>

        <p>
          The mechanics of that are covered in full in{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a>, but the
          short version for a small business is the same short version as everything else in
          this piece: state the facts plainly, in one place, and be the business that actually
          wrote them down first.
        </p>

        <h2 id="hire-or-diy">When to do it yourself, and when to hire it out</h2>

        <p>
          A small business with one owner, a handful of services, and a few hours a week can do
          the Google Business Profile, the on-page basics, and a slow trickle of content alone,
          and should. Hiring an agency before the offer is settled and there is a clear list of
          services to write about is usually money spent describing something that has not
          stabilised yet. That is the honest, against-interest part of this piece: if the
          business itself is still changing shape month to month, SEO work done now will need
          redoing later, and the sequencing is wrong.
        </p>

        <p>
          Hiring makes more sense once the offer is settled, the owner&rsquo;s time is the
          actual bottleneck, or the business needs to compete against competitors who are
          already being written about consistently. What an agency or an AI SEO team actually
          spends its week doing, in unglamorous detail, is covered in{' '}
          <a href="/blog/what-ai-seo-actually-does">
            what an AI SEO agency actually does all day
          </a>
          , and the real numbers behind what it costs at different scales are in{' '}
          <a href="/blog/what-seo-actually-costs">what SEO actually costs</a>.
        </p>

        <h2 id="how-long">How long it takes to show results</h2>

        <p>
          Small business SEO typically shows early movement, such as appearing in the map
          pack or ranking for a specific local phrase, within six to twelve weeks, with
          meaningful compounding results after six months or more. That range is not a
          guarantee, and anyone who quotes a firm number is guessing, because it depends on
          how thin the site was to start, how competitive the local market is, and how
          consistently the work continues after the first burst of it.
        </p>

        <p>
          The honest measure of progress is not a rank tracker alone. It is whether the phone
          rings from people who say they found the business searching, whether the Google
          Business Profile shows more views month over month, and whether the assistants a
          customer might ask now name the business correctly. Track those three, monthly, and
          the trend tells the real story a single snapshot cannot.
        </p>

        <p>
          None of this is exotic. It is a complete profile, a handful of honest pages, a site
          that loads on a cheap phone, and enough consistency to let a search engine or an AI
          assistant learn to trust what is written — which is the same short list whether the
          business sells wedding invitations in Accra or anything else, anywhere.
        </p>
      </PostShell>
    </>
  );
}
