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

const post = getPost('how-to-do-keyword-research')!;

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
  { id: 'what-it-is', label: 'What keyword research actually is' },
  { id: 'where-to-look', label: 'Where to find real keyword ideas' },
  { id: 'reading-volume', label: 'How to read search volume and competition' },
  { id: 'search-intent', label: 'Matching keywords to search intent' },
  { id: 'prioritizing', label: 'Prioritizing which keywords to target' },
  { id: 'five-step-process', label: 'A five-step process for one afternoon' },
  { id: 'clustering', label: 'Turning a list into a content plan' },
  { id: 'mistakes', label: 'The mistakes that waste the research' },
];

const HOWTO_STEPS = [
  {
    name: 'List what customers actually ask you',
    text: 'Write down the exact questions customers ask before buying, in their own words, from memory, WhatsApp threads, and reviews — not the words you would use to describe your own business.',
  },
  {
    name: 'Expand each seed with autocomplete and People Also Ask',
    text: 'Type each phrase into Google, note every autocomplete suggestion, and open the People Also Ask box for related questions worth adding to the list.',
  },
  {
    name: 'Check what already ranks for each phrase',
    text: 'Search the phrase and read the top three results to see what kind of page currently wins — a blog post, a product page, a directory listing — and whether you could realistically compete.',
  },
  {
    name: 'Sort by relevance, competition, and buying stage',
    text: 'Score each keyword on how closely it matches what you sell, how weak the current top results are, and how close the searcher is to a decision, then keep only the keywords that score well on all three.',
  },
  {
    name: 'Group survivors into one page per cluster',
    text: 'Group the remaining keywords by shared intent so each cluster becomes one page that answers the question thoroughly, instead of a separate thin page for every near-duplicate phrase.',
  },
];

const FAQ = [
  {
    q: 'What is keyword research, in one sentence?',
    a: 'It is the process of finding the exact words and phrases potential customers type or speak before they buy, and sorting them by how much realistic traffic and business each one is worth pursuing.',
  },
  {
    q: 'What is the best free tool for keyword research?',
    a: 'Google itself, used deliberately: autocomplete, the People Also Ask box, and the related searches at the bottom of the results page cost nothing and surface real phrasing. Google Search Console adds queries your own site already gets found for, which is the most accurate data you will ever see for free.',
  },
  {
    q: 'How many keywords should one page target?',
    a: 'One primary keyword and its close variants, not a list. A page trying to rank for ten unrelated phrases usually ranks for none of them well, because it cannot answer any single question as thoroughly as a page built around one.',
  },
  {
    q: 'Is keyword research still relevant now that people ask AI assistants instead of searching?',
    a: 'More relevant, not less. An AI assistant still needs a page that states the answer plainly to quote from, and finding the exact phrasing customers use is what makes a page answer the right question instead of a nearby one.',
  },
  {
    q: 'How often should keyword research be redone?',
    a: 'Every two to three months for an active content plan, and immediately after a service or product change. Search behaviour shifts slowly for most small businesses, so a full research pass is rarely needed more often than that.',
  },
  {
    q: 'Is keyword research the same thing as SEO?',
    a: 'No — it is the first input into SEO, not the whole discipline. Keyword research tells you what to write about; the rest of SEO is writing it well, structuring the page, and earning the trust signals that get it found.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={howToJsonLd(HOWTO_STEPS, 'How to do keyword research in one afternoon')}
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
          Keyword research is finding the exact words and phrases your customers type or say
          before they buy, then sorting them by relevance, competition, and how close the
          searcher is to a decision. In practice: list the questions customers actually ask,
          expand each one with Google autocomplete and the People Also Ask box, check what
          already ranks for it, and keep only the phrases that match what you sell and that
          you could realistically outrank the current top results for. It takes one afternoon
          and no paid subscription to do a usable first pass.
        </ShortAnswer>

        <Scene>
          <p>
            Fatima runs a small catering business out of a rented kitchen in Nairobi. For two
            years her website carried one page, titled exactly the way she would describe the
            business to another caterer: &ldquo;premium bespoke culinary solutions.&rdquo;
            Nobody searched that. Nobody says that.
          </p>
          <p>
            Her cousin, who &ldquo;knows computers,&rdquo; had built the site and picked the
            wording. It looked sharp. It ranked for nothing, because it answered a question
            nobody was asking.
          </p>
          <p>
            When she finally wrote down what customers actually said on the phone —
            &ldquo;caterer for a small wedding in Nairobi,&rdquo; &ldquo;how much does a
            caterer cost for 50 guests&rdquo; — and built pages around those exact phrases,
            the site started showing up within weeks. The business had not changed. The words
            describing it had.
          </p>
        </Scene>

        <p>
          That gap between how a business describes itself and how a customer actually
          searches is the entire problem keyword research solves. Everything below is the
          concrete version of closing it, without assuming a budget for a paid keyword tool.
        </p>

        <h2 id="what-it-is">What keyword research actually is</h2>

        <p>
          Keyword research is the process of finding the exact words and phrases your
          customers type or say before they buy, and sorting them by how much traffic and
          business each one is realistically worth chasing. It is not a list of clever
          synonyms for your own product name — it is a record of someone else&rsquo;s
          vocabulary, gathered on purpose instead of guessed at.
        </p>

        <p>
          The output is not a spreadsheet you admire once. It is the input to every page
          title, heading, and opening sentence you write afterward. Skip it, and you are
          writing to please yourself; do it properly, and you are writing to answer a question
          someone is actually asking.
        </p>

        <h2 id="where-to-look">Where to find real keyword ideas</h2>

        <p>
          Four free sources cover most of what a paid tool would show you: Google&rsquo;s
          autocomplete, the People Also Ask box, your own Search Console data, and the exact
          phrasing customers already use in reviews, DMs, and WhatsApp threads.
        </p>

        <p>
          Type a seed phrase into Google and read the autocomplete suggestions — that is
          Google showing you, unprompted, what real people finish that sentence with. Open the
          People Also Ask box on the results page and keep expanding it; each question you
          click reveals more. Then check Search Console, if the site has any history at all —
          it shows the exact queries the site already gets impressions for, which is the most
          honest data available, free or paid.
        </p>

        <p>
          Paid tools add estimated search volume, difficulty scores, and bulk export, which
          saves time once a content plan is running at real scale. They also come with
          dashboards colourful enough to make a modest local business look like it is
          launching a rocket, which is marketing for the tool, not evidence you need it yet.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Cost</th>
                <th>What it is good for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google autocomplete + People Also Ask</td>
                <td>Free</td>
                <td>Real phrasing, unlimited seed keywords, no account needed</td>
              </tr>
              <tr>
                <td>Google Search Console</td>
                <td>Free</td>
                <td>Exact queries your own site already gets found for</td>
              </tr>
              <tr>
                <td>Paid keyword tool (Ahrefs, Semrush, etc.)</td>
                <td>$50–200+/month</td>
                <td>Estimated volume, difficulty scores, bulk export at scale</td>
              </tr>
              <tr>
                <td>An agency doing it for you</td>
                <td>Built into a retainer</td>
                <td>All of the above, prioritised and turned into a content calendar</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="reading-volume">How to read search volume and competition</h2>

        <p>
          Search volume tells you how often a phrase is searched in a given month and market,
          and for most African cities that number is honestly low — often single digits to a
          few dozen — because the tools sample a whole country, not a city, and a single
          African market rarely produces the volumes a US-centric example would.
        </p>

        <p>
          Do not discard a keyword just because the number is small. A phrase searched fifteen
          times a month by people actively choosing a caterer in Nairobi is worth more than a
          phrase searched fifteen thousand times a month by people in a country you do not
          serve. Competition matters more than volume at this scale: check who already ranks,
          and be honest about whether a small business site could realistically outrank them
          within a year.
        </p>

        <p>
          It also helps to know why the number is small in the first place, rather than
          assuming the tool is simply wrong. Keyword-volume tools sample the clickstream and
          panel data available to them, and that data is thinner across most African markets
          than it is across the US or UK — fewer connected devices reporting in, more search
          happening through voice and WhatsApp shares that never register as a typed query.
          The number you see is a floor, not a ceiling. Treat it as a rough sort order between
          your own candidate keywords, not as a forecast of how much traffic any one of them
          will bring.
        </p>

        <h2 id="search-intent">Matching keywords to search intent</h2>

        <p>
          Search intent is the reason behind the search — informational, commercial, or
          navigational — and a keyword is only worth targeting once you know which one it is,
          because the wrong page for the intent will not rank no matter how well it is
          written.
        </p>

        <p>
          &ldquo;What does a caterer do&rdquo; is informational — the searcher wants an
          explanation, and a service page trying to sell them something too early reads as
          pushy and underperforms. &ldquo;Caterer for a wedding in Nairobi&rdquo; is
          commercial — the searcher is comparing options, and this is exactly where a clear
          service page belongs. &ldquo;Fatima&rsquo;s Kitchen Nairobi&rdquo; is navigational —
          the searcher already knows the business and wants its site or its number, and the
          only job that page has is to load fast and be found; writing a persuasive pitch for
          someone who already decided is wasted effort. Confusing the categories is the single
          most common reason a page that looks fine still does not rank: it answers the wrong
          kind of question for the intent behind the search.
        </p>

        <h2 id="prioritizing">Prioritizing which keywords to actually target</h2>

        <p>
          A keyword is worth prioritizing when it scores well on three things at once:
          relevance to what you actually sell, low competition from sites you could
          realistically outrank, and a searcher who is close to a decision.
        </p>

        <p>
          Score a shortlist against those three, drop anything that scores poorly on two or
          more, and target what is left first. This is also where the honest limit sits: if
          your business is one clear service in one town with a handful of regular customers,
          you likely need three well-chosen keywords, not thirty. A fourteen-day keyword
          research sprint for a business that size would be solving a problem you do not have
          yet.
        </p>

        <h2 id="five-step-process">A five-step process you can run in an afternoon</h2>

        <p>
          Keyword research for a small business site fits into five steps that take an
          afternoon, not a subscription.
        </p>

        <ol>
          {HOWTO_STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          None of this requires software beyond a browser and a spreadsheet. It requires the
          patience to write down what customers actually say instead of what sounds
          professional in a pitch deck — a discipline that, notably, no tool sells you,
          because there is nothing to charge for.
        </p>

        <h2 id="clustering">Turning a list into a content plan</h2>

        <p>
          A keyword list becomes a content plan once you group related phrases under one
          target page instead of writing a separate thin page for every variant. &ldquo;Caterer
          for a small wedding,&rdquo; &ldquo;wedding catering cost,&rdquo; and &ldquo;how many
          caterers do I need for 50 guests&rdquo; are one cluster with one strong page, not
          three weak ones competing with each other.
        </p>

        <p>
          The same discipline that shapes a good <a href="/blog/small-business-seo">general
          small business SEO plan</a> applies here: one keyword answered thoroughly beats five
          answered thinly. If part of the cluster is local — &ldquo;caterer near me,&rdquo;
          &ldquo;caterer in [city]&rdquo; — that work folds into the same{' '}
          <a href="/blog/local-seo-for-small-business">local SEO checklist</a> rather than a
          separate research pass.
        </p>

        <p>
          At a slightly larger scale, this grouping becomes a small topical map: one core page
          that owns the money keyword — the service itself — surrounded by a handful of outer
          pages that answer the supporting questions (cost, timeline, comparisons, how-to
          content like this one) and link back to the core page. A site with one page and no
          supporting content reads to both a person and a crawler as thin coverage of the
          topic, even if that one page is well written. A handful of pages that visibly cover
          the whole question reads as a business that actually knows the subject.
        </p>

        <h2 id="mistakes">The mistakes that waste the research</h2>

        <p>
          The research gets wasted in three predictable ways: chasing volume over intent,
          doing it once and never again, and building a page for every keyword instead of a
          cluster.
        </p>

        <p>
          Chasing volume means picking the biggest number on the list regardless of who is
          searching it or why — usually a keyword too broad and too contested to ever rank
          for. Doing it once means the list quietly rots as customers&rsquo; language shifts,
          new competitors appear, and an old assumption about what people search stays baked
          into every new page. And splitting one cluster into ten near-identical pages, an old
          habit from an era when more pages seemed like more visibility, mostly just competes
          against yourself. It is also, worth noting, the exact tactic anyone promising
          &ldquo;guaranteed page one rankings&rdquo; tends to lean on — volume of pages
          standing in for quality of any one of them.
        </p>

        <p>
          Keyword research is also not a decision layer on its own. It tells you what to write
          about; deciding whether to <a href="/blog/seo-vs-google-ads">fund that work through
          SEO or pay for clicks with Google Ads</a> is a separate call, and whether the phrase
          worth chasing is what a human types or{' '}
          <a href="/blog/how-to-rank-on-chatgpt">what a person now asks an AI assistant
          instead</a> is another layer entirely — the underlying discipline of finding real
          customer language is the same one feeding both.
        </p>

        <p>
          None of this is exotic. It is a list, honestly gathered, sorted by three plain
          criteria, and revisited before it goes stale — the same unglamorous groundwork every
          page on this site was built on.
        </p>
      </PostShell>
    </>
  );
}
