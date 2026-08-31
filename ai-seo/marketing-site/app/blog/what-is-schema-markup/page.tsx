import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('what-is-schema-markup')!;

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
  { id: 'what-schema-is', label: 'What schema markup actually is' },
  { id: 'why-it-matters', label: 'Why it matters for Google and AI answers' },
  { id: 'how-it-works', label: 'How schema markup actually works' },
  { id: 'types-that-matter', label: 'The types worth using for a small business' },
  { id: 'schema-vs-copy', label: 'Schema markup next to ordinary page copy' },
  { id: 'how-to-add', label: 'How to add schema to your site' },
  { id: 'what-fails', label: 'What does not work' },
  { id: 'check-yours', label: 'How to check it is actually working' },
];

const ADD_SCHEMA_STEPS = [
  {
    name: 'Decide which type matches the page',
    text: 'Organization for the homepage, LocalBusiness for a contact or location page, FAQPage for an FAQ section, Product or Service for a listing.',
  },
  {
    name: 'Generate the JSON-LD',
    text: 'Use your CMS built-in schema support, an SEO plugin, or a free generator, filling in only facts that are true and already visible on that page.',
  },
  {
    name: 'Add the code to the page',
    text: 'Paste the generated block into the page head, either directly or through whichever custom-code field your CMS or plugin provides.',
  },
  {
    name: 'Test it, then wait for a recrawl',
    text: 'Run the page through a validator before considering it done, then check back after Google has recrawled the page, usually within a few weeks.',
  },
];

const FAQ = [
  {
    q: 'What is schema markup in simple terms?',
    a: 'It is a small block of code, written in a shared vocabulary called schema.org, that states the facts on a page — name, price, hours, rating — so a search engine or an AI assistant reads them as data instead of guessing at them from sentences.',
  },
  {
    q: 'Does schema markup improve search rankings?',
    a: 'Google has not confirmed it as a direct ranking factor. What it does is earn eligibility for richer results — stars, prices, FAQ dropdowns — and give a machine a cleaner fact to trust, both of which tend to improve how a listing performs even without moving its position.',
  },
  {
    q: 'Do I need a developer to add schema markup?',
    a: 'Usually not. Most CMS platforms generate the common types automatically, and popular SEO plugins add a form that writes the code for you. A developer becomes useful for custom types or a hand-built site with no plugin layer.',
  },
  {
    q: 'What is the difference between schema markup and structured data?',
    a: 'Structured data is the general term for any machine-readable data on a page. Schema markup is the specific version of it written using the schema.org vocabulary, which is the version search engines and AI assistants actually expect. In practice the two terms get used interchangeably.',
  },
  {
    q: 'Will schema markup guarantee a star rating in search results?',
    a: 'No. Correct markup makes a page eligible for a rich result; Google still decides case by case whether to display one. Valid code is necessary and not sufficient, which is why nobody honest sells it as a guarantee.',
  },
  {
    q: 'How do I check if my schema markup is working?',
    a: 'Run the page through Google&rsquo;s Rich Results Test for an immediate check, then watch the Enhancements report in Search Console over the following weeks as Google recrawls and evaluates the page.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={howToJsonLd(ADD_SCHEMA_STEPS, 'How to add schema markup to a page')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Schema markup is structured code — usually written in a format called JSON-LD — that
          you add to a web page so a search engine or an AI assistant can read exactly what the
          page is about instead of guessing from the visible text. A paragraph tells a person
          you are open until nine on Saturdays; schema markup states the same fact in a field a
          machine already knows how to parse, which is why Google can turn it into a star
          rating or a set of hours shown right in the results, and why an AI answer can quote
          the fact without getting it wrong.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Achieng runs a nyama choma restaurant in Nairobi with genuinely excellent reviews —
            four and a half stars across dozens of them, earned the hard way over three years of
            Friday-night queues. None of it showed up in Google search. Her listing sat next to
            two competitors displaying stars and price ranges right under their names, while
            hers showed a plain blue link and nothing else.
          </p>
          <p>
            Her web developer had built a handsome site with a photo gallery, a menu page, and a
            contact form — and nothing in the code told Google those reviews existed anywhere but
            inside a scrolling widget built to look good, not to be read by a machine. The
            developer had, in his defence, been very clear the site would look excellent on
            Instagram, which it did, and does, and was never actually the problem.
          </p>
          <p>
            Adding a dozen lines of structured code — the reviews she already had, stated once in
            a format Google could parse — put the stars under her listing within three weeks.
            Nothing about the restaurant changed. Only whether the fact reached the reader before
            they had to click to find it.
          </p>
        </Scene>

        <p>
          That is the whole subject in miniature. Schema markup is not a trick and not a ranking
          shortcut — it is the unglamorous work of writing down facts you already have, in a
          format a machine can trust, so nothing you have earned gets lost in translation.
        </p>

        <h2 id="what-schema-is">What schema markup actually is</h2>

        <p>
          Schema markup is structured code, based on a shared vocabulary called schema.org, that
          labels the parts of a page — its name, its price, its hours, its rating — so a machine
          reads them as data instead of guessing at them from sentences.
        </p>

        <p>
          The format Google recommends, and the one worth using almost everywhere, is called
          JSON-LD — a short block of the site&rsquo;s own facts, written once, sitting quietly in
          the page code where a visitor never sees it and a machine reads it in full. Two older
          formats, microdata and RDFa, do the same job woven directly into the visible HTML; they
          still work, but JSON-LD is easier to write, easier to check, and does not risk breaking
          your page layout if someone edits it later.
        </p>

        <p>
          None of this is new. Schema.org has existed since 2011, built jointly by Google, Bing,
          Yahoo, and Yandex specifically so a site would not have to guess which search engine
          wanted which format. What changed recently is the audience: AI assistants now read the
          same structured facts to decide what to quote, which means the boring plumbing work you
          were told to do for search engines is doing double duty for a second one.
        </p>

        <h2 id="why-it-matters">Why it matters for Google and AI answers</h2>

        <p>
          Schema markup matters because it removes the guesswork a search engine or an AI model
          would otherwise have to do, and guesswork is exactly what both are built to avoid. A
          page that states its price, hours, and rating in structured fields is a safer thing to
          trust and display than a page that only implies them somewhere in a paragraph.
        </p>

        <p>
          On Google, that trust shows up as rich results — the star rating under a listing, the
          price range, the expandable question under an FAQ entry. None of it is guaranteed by
          adding the code, and the section on what does not work says more about that, but none
          of it is possible without the code either. There is also a small cottage industry
          selling schema markup as the switch that vaults a page to page one; it does not do
          that, and anyone pricing it by the kilobyte is selling code, not rankings.
        </p>

        <p>
          On the newer surface, the same structured facts feed{' '}
          <a href="/blog/answer-engine-optimization">the same retrieval process that decides
          who an AI assistant quotes</a> — a model reaching for a clean, labelled fact is doing
          the machine-readable equivalent of what a person does when they trust the business with
          the fully filled-in profile over the one with three blank fields. Marking up your
          organisation, your services, and your FAQ tells the model plainly what you are
          claiming, instead of leaving it to infer a fact from prose and hope it inferred
          correctly.
        </p>

        <h2 id="how-it-works">How schema markup actually works</h2>

        <p>
          Schema markup works by pairing a schema.org type — Organization, LocalBusiness,
          Product, FAQPage, and several hundred more — with the specific properties that type
          defines, then embedding that pairing in the page as a block of JSON-LD, usually placed
          in the page head. A LocalBusiness type expects properties like name, address,
          telephone, and openingHours; a Product type expects price, availability, and brand. You
          do not invent the fields. You fill in the ones schema.org has already agreed on with
          every major search engine, which is the entire point — a shared vocabulary nobody has
          to negotiate site by site.
        </p>

        <p>
          The vocabulary itself reads like it was named by a committee that enjoyed nesting
          things inside other things — an AggregateRating lives inside a Review, which can live
          inside a LocalBusiness, which can list an OpeningHoursSpecification as one of its
          properties — and the first real example you look at resembles a small database more
          than a sentence. That is accurate. It is a small database, written for a machine, that
          happens to live inside a web page built for a person.
        </p>

        <p>
          The practical part is simpler than the vocabulary suggests. Most content management
          systems either generate the common types automatically or offer a plugin that does, and
          once written, the block needs no further attention from a visitor — it never renders on
          the page, never affects your design, and only ever gets read by the crawlers and
          assistants it was written for.
        </p>

        <h2 id="types-that-matter">The types worth using for a small business</h2>

        <p>
          A small business site gets nearly all of the available benefit from five schema types,
          and can safely ignore the several hundred others schema.org defines for cases it will
          never hit.
        </p>

        <ul>
          <li>
            <strong>Organization or LocalBusiness.</strong> Name, address, phone number, and
            hours — the same facts a Google Business Profile asks for, stated again in code so
            the website agrees with the profile instead of quietly contradicting it.
          </li>
          <li>
            <strong>FAQPage.</strong> Question-and-answer pairs, matched to the FAQ actually
            visible on the page, eligible for their own expandable result and a clean fact for an
            AI assistant to lift.
          </li>
          <li>
            <strong>Review and AggregateRating.</strong> A summary of real reviews you already
            have, structured so a star rating can display next to the listing — never invented,
            and never for reviews that do not exist.
          </li>
          <li>
            <strong>Product or Service.</strong> Price, availability, and what exactly is being
            offered, stated as data instead of implied by a paragraph.
          </li>
          <li>
            <strong>BreadcrumbList.</strong> The page&rsquo;s place in the site, so a search
            result can show the folder path instead of a raw URL — a small thing that quietly
            makes a listing look more trustworthy.
          </li>
        </ul>

        {/* Cluster B sibling "how to rank on chatgpt" is still queued in content-queue.md;
            link to it from here once it is published — the natural next read after this section. */}

        <h2 id="schema-vs-copy">Schema markup next to ordinary page copy</h2>

        <p>
          Schema markup and page copy are not competing with each other. They are the same facts
          written twice — once for a person, once for a machine — and a page that only does one
          of the two is leaving something on the table.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Ordinary page copy does</th>
                <th>Schema markup adds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tells a reader your hours in a sentence</td>
                <td>Gives a machine your hours as a structured, day-by-day field</td>
              </tr>
              <tr>
                <td>Mentions a price somewhere in a paragraph</td>
                <td>States price, currency, and availability as one labelled fact</td>
              </tr>
              <tr>
                <td>Describes reviews in a testimonials section</td>
                <td>Summarises them as a rating and count eligible for stars</td>
              </tr>
              <tr>
                <td>Lists FAQ answers for a visitor to scroll to</td>
                <td>Marks the same answers as retrievable question-and-answer pairs</td>
              </tr>
              <tr>
                <td>Persuades a person to trust you</td>
                <td>Tells a search engine or AI model what to trust without guessing</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The overlap with{' '}
          <a href="/blog/ai-seo-vs-traditional-seo">everything else that falls under technical
          SEO</a> is not an accident — schema markup is one line item in the same discipline, not
          a separate specialty with its own rules.
        </p>

        <h2 id="how-to-add">How to add schema to your site</h2>

        <p>
          Adding schema markup takes four steps, and on most sites none of them require touching
          the design.
        </p>

        <ol>
          <li>
            Decide which type matches the page — Organization for the homepage, LocalBusiness for
            a contact or location page, FAQPage for an FAQ section, Product or Service for a
            listing.
          </li>
          <li>
            Generate the JSON-LD with your CMS&rsquo;s built-in schema support, a plugin (most
            WordPress SEO plugins include one), or a free generator, filling in only facts that
            are true and already visible on that page.
          </li>
          <li>
            Paste the generated block into the page&rsquo;s head, either directly or through
            whichever custom-code field your CMS or plugin provides.
          </li>
          <li>
            Test it before calling it done, then check back once Google has recrawled the page,
            usually within a few weeks.
          </li>
        </ol>

        <h2 id="what-fails">What does not work</h2>

        <p>
          The most common mistake is marking up a fact that is not true or not actually visible
          on the page — a five-star AggregateRating with no real reviews behind it, hours that do
          not match what is posted on the door — and Google&rsquo;s own guidelines treat that as
          a violation that can cost you the rich result entirely, not just fail to earn one.
        </p>

        <ul>
          <li>
            <strong>Inventing reviews.</strong> A fabricated five-star rating is the schema
            equivalent of a shop sign advertising a sale that ended in March — it gets noticed,
            and not kindly.
          </li>
          <li>
            <strong>Marking up content that is not on the page.</strong> Schema describes what a
            visitor can already see. Structured data for a product nobody can find on the actual
            page reads as manipulation, not enthusiasm.
          </li>
          <li>
            <strong>Adding every type schema.org offers.</strong> More markup is not
            automatically better. Conflicting or irrelevant types make a page harder to trust,
            not easier.
          </li>
          <li>
            <strong>Expecting markup alone to move rankings.</strong> Schema is not a confirmed
            ranking factor on its own. It earns eligibility for a richer display and clearer
            machine understanding, not a guaranteed position.
          </li>
        </ul>

        <p>
          If a page has nothing worth saying, structured data will not rescue it. It makes a good
          page easier to trust, and it makes a thin page easier to catch.
        </p>

        <h2 id="check-yours">How to check it is actually working</h2>

        <p>
          You check whether schema markup is working with two free tools, not a guess and a few
          weeks of waiting.
        </p>

        <ul>
          <li>
            <strong>Google&rsquo;s Rich Results Test.</strong> Paste in the page URL or the code
            itself; it reports which rich result types are eligible and flags any error or
            warning immediately.
          </li>
          <li>
            <strong>Search Console&rsquo;s Enhancements report.</strong> Once Google has
            recrawled the page, this shows how many pages are valid and which have warnings or
            errors, sitewide rather than one page at a time.
          </li>
          <li>
            <strong>The search result itself, eventually.</strong> Valid markup does not
            guarantee a rich result will display — Google decides that separately — so the final
            check is watching the actual listing over a few weeks, not just the validator.
          </li>
        </ul>

        <p>
          None of this is exotic work. It is a handful of facts, written once in a format a
          machine can trust, sitting behind a page that a person still has to make worth visiting
          in the first place — which is most of what{' '}
          <a href="/blog/what-ai-seo-actually-does">an AI SEO agency actually does all week</a>,
          alongside the writing, the clustering, and the parts that never show up in a
          screenshot.
        </p>
      </PostShell>
    </>
  );
}
