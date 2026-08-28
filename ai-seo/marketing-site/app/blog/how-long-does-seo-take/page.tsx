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

const post = getPost('how-long-does-seo-take')!;

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
  { id: 'what-to-expect', label: 'The honest, no-caveat range' },
  { id: 'stages-explained', label: 'Indexed, ranked, and trafficked are not the same thing' },
  { id: 'what-decides-speed', label: 'What actually decides how fast' },
  { id: 'month-by-month', label: 'A realistic month-by-month timeline' },
  { id: 'competitive-keywords', label: 'Why competitive keywords take longer' },
  { id: 'what-speeds-it-up', label: 'What genuinely speeds it up' },
  { id: 'what-does-not', label: 'What does not, no matter what you are told' },
  { id: 'when-not-to-wait', label: 'When SEO is the wrong tool for this month' },
  { id: 'check-progress', label: 'How to check progress without fooling yourself' },
];

const FAQ = [
  {
    q: 'How long does SEO take to show results?',
    a: 'Most small business websites see the first measurable ranking movement within three to six months of consistent work, and organic traffic that shows up as real enquiries within six to twelve months. Low-competition, long-tail phrases can move faster; contested commercial terms in a crowded city usually take longer.',
  },
  {
    q: 'Why does SEO take so long compared to paid ads?',
    a: 'Paid ads buy a position the moment the campaign goes live. SEO earns a position by building signals a search engine has to observe over time — a site being indexed, crawled repeatedly, compared against competitors, and gradually trusted. There is no invoice that skips that observation period.',
  },
  {
    q: 'Can SEO work faster than three months?',
    a: 'Occasionally, for a brand-new keyword with almost no existing competition, or for a business fixing a glaring technical problem that was actively blocking indexing. Those are exceptions, not a plan. Budgeting on the fast case and getting the normal case is how businesses conclude, wrongly, that SEO does not work.',
  },
  {
    q: 'Does SEO take longer for a brand-new website?',
    a: 'Yes, usually. A domain with no publishing history and no existing links is starting from zero trust, not neutral trust, so add one to three months to every stage compared with a site that has been live and reasonably maintained for a couple of years.',
  },
  {
    q: 'How long until SEO increases my website traffic?',
    a: 'Traffic typically follows rankings by four to eight weeks, since a keyword has to hold a position long enough for search volume to accumulate against it. The month-by-month breakdown above is the honest version of this; anyone quoting a fixed week count is guessing.',
  },
  {
    q: 'Is three months enough time to judge whether SEO is working?',
    a: 'It is enough time to judge whether the foundational work happened — indexing, technical fixes, the first batch of content. It is not enough time to judge return on investment. Month three is a checkpoint for effort, not a verdict on results.',
  },
];

const CHECK_STEPS = [
  {
    name: 'Record a baseline before day one',
    text: 'Write down current rankings for your target keywords, current organic traffic, and current enquiry volume before any work starts. Without a baseline, month three feels like guessing because it is.',
  },
  {
    name: 'Track weekly, judge monthly',
    text: 'Rankings move up and down by a few positions constantly — that is normal noise, not signal. Check weekly if you like, but only draw conclusions from the month-over-month direction.',
  },
  {
    name: 'Watch impressions before clicks',
    text: 'In Google Search Console, impressions for target phrases usually rise before clicks do, and clicks rise before conversions do. An early lift in impressions with flat clicks is progress, not failure.',
  },
  {
    name: 'Compare month over month, never week over week',
    text: 'A single bad week means nothing on its own. A downward trend across three consecutive months is a real signal worth investigating.',
  },
  {
    name: 'Give it the honest floor before judging return',
    text: 'Three months tells you whether the work happened. Six tells you whether it is heading anywhere. Twelve is the fair point to judge return on investment.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(CHECK_STEPS, 'How to check SEO progress without fooling yourself')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Most small business websites see the first measurable ranking movement within three
          to six months of consistent SEO work, and organic traffic that shows up as real
          enquiries within six to twelve months. That range assumes ongoing effort — technical
          fixes, new content on a schedule, and basic authority building — not a one-time
          project. Competitive keywords in crowded markets take longer, and a brand-new site
          with no history takes longer than an established one. There is no accelerant that
          collapses this into weeks; anyone selling one is selling something else.
        </ShortAnswer>

        <Scene>
          <p>
            Ngozi opened a small physiotherapy clinic in Abuja and hired someone to fix the
            website in January. By February she was checking her phone eleven times a day,
            typing the clinic&rsquo;s name and then, worse, the actual keyword she wanted —
            &ldquo;physiotherapist abuja&rdquo; — watching the position number refuse to move.
          </p>
          <p>
            It did not move in February. It barely moved in March. In April, a handful of
            phrases she had never targeted on purpose started pulling in appointment
            bookings — searches like &ldquo;best physio for lower back pain abuja,&rdquo; the
            kind nobody sets out to rank for directly, they just start appearing once enough
            honest content exists around them.
          </p>
          <p>
            By June the clinic&rsquo;s phone was ringing from Google, not only from the
            community WhatsApp group referrals that had carried the business for two years.
            Nothing about the first five months looked like progress from the inside. All of
            it was.
          </p>
        </Scene>

        <p>
          That gap — between work happening and work showing — is where most small businesses
          quit or get sold something that promises to close it. Neither is necessary. The
          timeline is knowable, even if the exact week is not, and knowing it in advance is
          most of what keeps a business from panicking in month three.
        </p>

        <h2 id="what-to-expect">The honest, no-caveat range</h2>

        <p>
          Three to six months for the first measurable ranking movement, six to twelve months
          for organic traffic that a business can feel in its enquiry numbers — that is the
          range that holds across most small business sites, most industries, and most
          reasonably competitive cities.
        </p>

        <p>
          It is a range, not a date, because the two ends of it are doing different jobs. The
          three-month mark is about search engines finishing their first real evaluation of a
          site — has it been indexed, crawled repeatedly, compared against what already ranks.
          The twelve-month mark is about compounding: content built in month two is still
          earning trust in month ten, and a site with a year of steady publishing behind it
          looks nothing like the same site on day one, even if no single post did the work
          alone.
        </p>

        <h2 id="stages-explained">Indexed, ranked, and trafficked are not the same thing</h2>

        <p>
          SEO produces three separate milestones on three separate timelines, and conflating
          them is the single most common reason a business decides, wrongly, that nothing is
          happening. A page can be indexed within days, ranked within weeks to months, and
          still send zero meaningful traffic for another few months after that.
        </p>

        <p>
          <strong>Indexed</strong> means Google has found the page and added it to its index —
          usually days, sometimes hours, for a healthy site. <strong>Ranked</strong> means the
          page holds a position for a specific search term — anywhere from a few weeks for an
          obscure phrase to most of a year for a contested one. <strong>Trafficked</strong>{' '}
          means people are actually clicking through in numbers that matter, which needs the
          ranking to be good enough, and to hold, long enough for search volume to accumulate
          against it. A page can ace the first two stages and still look like a failure to
          someone only watching the third.
        </p>

        <h2 id="what-decides-speed">What actually decides how fast</h2>

        <p>
          Five factors decide whether a business sees results in three months or twelve, and
          none of them is luck. <strong>Domain history</strong> — a site with two years of
          reasonable maintenance behind it starts from more trust than one registered last
          week. <strong>Competition level</strong> — five other businesses fighting for the
          same term in the same city slows everyone down. <strong>Publishing cadence</strong> —
          one post a month compounds; one post and then silence does not. <strong>Technical
          health</strong> — a site that loads slowly on a mid-range phone with patchy signal
          is fighting itself before it fights anyone else. <strong>Existing authority</strong> —
          mentions on directories, local press, and other sites that already carry weight are
          the corroboration a search engine leans on to trust a newcomer faster.
        </p>

        <p>
          None of these is exotic, and none of them can be substituted for by spending more
          money on the wrong lever. A business with a fast site, a sensible publishing rhythm,
          and a handful of honest mentions elsewhere will consistently outpace a rival that
          simply outspent it on ad-hoc content with no cadence behind it.
        </p>

        <h2 id="month-by-month">A realistic month-by-month timeline</h2>

        <p>
          The timeline breaks into five stages, running from technical foundation in month one
          to defensible authority after month twelve, and the table below lines up what is
          actually happening at each stage against what a business should not expect yet — so
          month four does not feel like a disappointment for arriving exactly on schedule.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Timeframe</th>
                <th>What is actually happening</th>
                <th>What you will not see yet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Month 1–2</td>
                <td>Technical fixes, schema markup, foundational pages and the first content</td>
                <td>Ranking movement worth reporting</td>
              </tr>
              <tr>
                <td>Month 3–4</td>
                <td>Low-competition, long-tail phrases begin appearing on page one</td>
                <td>Movement on the competitive terms that matter most</td>
              </tr>
              <tr>
                <td>Month 5–6</td>
                <td>Rankings stabilise, first real trickle of organic enquiries</td>
                <td>Traffic large enough to change a revenue conversation</td>
              </tr>
              <tr>
                <td>Month 7–12</td>
                <td>Traffic compounds, competitive terms start moving meaningfully</td>
                <td>Guaranteed page-one placement — that promise is never honest</td>
              </tr>
              <tr>
                <td>Month 12+</td>
                <td>Mature authority; rankings become defensible against new competitors</td>
                <td>The need to keep restarting from zero every time a rival shows up</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The pattern worth noticing is not any one row — it is that the curve is roughly
          logarithmic. Early months buy foundation, and foundation is invisible by design.
          What you are paying for at each stage is laid out in more detail in{' '}
          <a href="/blog/what-seo-actually-costs">what SEO actually costs</a>, including the
          months where the invoice arrives before the traffic does.
        </p>

        <h2 id="competitive-keywords">Why competitive keywords take longer</h2>

        <p>
          A competitive keyword takes longer because it already has ten or twenty businesses
          who have been publishing, earning links, and building trust for years, and a new
          entrant has to out-signal all of them, not just write a good page. &ldquo;Accountant
          near me&rdquo; in a capital city might have fifty firms competing for it; a specific
          niche phrase might have two. The gap between those two timelines can be a full year.
        </p>

        <p>
          This is also where the well-meaning owner does the most damage to their own
          timeline — by insisting on chasing the biggest, vaguest term in the industry because
          it sounds impressive, instead of the specific phrase their actual customer types
          into the box. The specific phrase converts faster and ranks faster, in that order,
          which is a better trade than it sounds.
        </p>

        <h2 id="what-speeds-it-up">What genuinely speeds it up</h2>

        <p>
          Four ordinary levers move the timeline for real: fixing technical problems in month
          one instead of month six, publishing on a consistent schedule instead of in bursts,
          earning real mentions from other sites, and targeting the specific phrase before the
          vague one. None of them is clever, which is exactly why they work reliably instead of
          occasionally.
        </p>

        <p>
          A slow load time or broken indexing actively holds back everything published on top
          of it, so fixing it early pays for itself many times over. A consistent cadence beats
          a burst-then-silence pattern because search engines reward predictability almost as
          much as quality. Real mentions from other sites — a local directory, a press feature,
          a partner linking back — are the trust shortcut a brand-new site cannot manufacture
          any other way. And the specific, less-contested phrase is most of what the concrete,
          mostly-free moves in{' '}
          <a href="/blog/small-business-seo">our small business SEO guide</a> come down to.
        </p>

        <p>
          None of these buy weeks off the three-month floor for the first movement — that
          floor is set by how search engines evaluate a site, not by effort — but stacked
          together they are the difference between hitting the six-to-twelve-month traffic
          range on schedule and drifting well past it.
        </p>

        <h2 id="what-does-not">What does not, no matter what you are told</h2>

        <p>
          Buying backlinks from a marketplace does not — search engines are specifically built
          to detect the pattern, and the correction, when it comes, erases months of honest
          work along with the shortcut. Publishing the same article rewritten across ten pages
          does not, and reads as filler to a machine the same way it does to a person.
          Stuffing a page with the keyword forty times does not; if anything it slows things
          down by making the page look like it is trying too hard, which is a fair
          description of what it is doing. And any package advertising &ldquo;expedited
          ranking&rdquo; or a guaranteed date is not selling a faster timeline — it is selling
          the same three-to-six-month wait with a more confident sales page in front of it.
        </p>

        <p>
          The pattern is consistent enough to be almost comforting: every proposed shortcut
          either does nothing, or actively adds a penalty phase to the honest timeline once it
          gets noticed. There is no version of this where skipping the wait is free.
        </p>

        <h2 id="when-not-to-wait">When SEO is the wrong tool for this month</h2>

        <p>
          If a business needs customers this month — rent is due, a slow season just started,
          a competitor opened across the street — SEO is not the tool, because nothing honest
          moves that fast. Paid search or social ads buy a position immediately, at a cost per
          lead that is knowable in advance, and that is the correct trade when the calendar is
          the constraint rather than the budget.
        </p>

        <p>
          SEO is the right tool for a business with a runway of at least six months and a
          plan to still be operating in eighteen. It is a compounding asset, not a faucet, and
          treating it like a faucet is how a genuinely good investment gets cancelled in month
          four for looking like a bad one. We have laid out the actual return-on-investment
          math, including the case for skipping it entirely, in{' '}
          <a href="/blog/is-seo-worth-it">is SEO worth it</a> — read that one first if the
          honest answer might be no.
        </p>

        <h2 id="check-progress">How to check progress without fooling yourself</h2>

        <p>
          Checking progress well means comparing month over month against a baseline recorded
          on day one, not refreshing rankings once a day — daily checks show only noise, since
          normal week-to-week movement looks identical to real progress until enough time has
          passed to tell the difference.
        </p>

        <ol>
          <li>
            Record a baseline — current rankings, current organic traffic, current enquiry
            volume — before any work starts. Without it, month three feels like guessing
            because it is.
          </li>
          <li>
            Track weekly if the habit helps, but only draw conclusions from the month-over-
            month direction. A single week moving the wrong way is noise, not a verdict.
          </li>
          <li>
            Watch impressions before clicks in Google Search Console. Impressions for target
            phrases typically rise before clicks do, and clicks rise before conversions do.
          </li>
          <li>
            Compare month over month, never week over week — a downward trend across three
            consecutive months is worth investigating; a single bad week is not.
          </li>
          <li>
            Give it the honest floor before judging return: three months tells you whether the
            work happened, six tells you whether it is heading anywhere, and twelve is the
            fair point to judge whether it paid for itself.
          </li>
        </ol>

        <p>
          None of this is a substitute for a written report a business can actually read.
          What it is meant to prevent is the far more common failure — cancelling honest work
          in month three for the crime of taking exactly as long as it was always going to
          take, and then paying for a &ldquo;faster&rdquo; version of the same wait somewhere
          else.
        </p>
      </PostShell>
    </>
  );
}
