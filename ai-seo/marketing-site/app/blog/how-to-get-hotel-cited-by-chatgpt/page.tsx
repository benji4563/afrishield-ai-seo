import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-to-get-hotel-cited-by-chatgpt')!;

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
  { id: 'how-ai-picks', label: 'How an assistant decides which hotels to name' },
  { id: 'crawler-access', label: 'Let the AI crawlers in' },
  { id: 'answer-blocks', label: 'Write answers, not brochures' },
  { id: 'structured-data', label: 'Structured data: tell the machine what you are' },
  { id: 'entity-consistency', label: 'One consistent identity across the web' },
  { id: 'benchmark', label: 'Ask the AI about yourself, every month' },
  { id: 'cant-control', label: 'What you cannot control' },
];

const FAQ = [
  {
    q: 'Can a hotel pay to be recommended by ChatGPT?',
    a: 'No. There is no ad product that buys a citation inside an AI answer, and anyone selling guaranteed placement is selling something that does not exist. What you can do is make your property easy for the assistant to read, understand, and verify — crawler access, quotable content, structured data, consistent listings — which is what the work in this piece covers.',
  },
  {
    q: 'How do I check what ChatGPT says about my hotel right now?',
    a: 'Ask it the questions your guests ask: where to stay near your park or district, which hotel in your city for a given budget, which lodge for a given experience. Run the same questions in Perplexity and Gemini. Record who gets named, and whether the details are right. That panel of questions, re-run monthly, is the measurement the whole strategy hangs on.',
  },
  {
    q: 'Does my hotel need to rank on Google first to be cited by AI?',
    a: 'It helps, because assistants lean on the same web evidence Google does, but it is not a strict prerequisite. Some engines retrieve pages in real time and will cite a clear, well-structured page that has not ranked yet. The reliable path is still to do both, since the clarity that ranks is the same clarity that gets quoted.',
  },
  {
    q: 'How long does it take for a hotel to start being cited?',
    a: 'There is no honest fixed answer. Technical access and structured data take effect as soon as the crawlers revisit, which can be days to weeks. Being named consistently in answers tends to track your wider web presence — listings, reviews, mentions — which compounds over months. Anyone quoting a firm number is guessing.',
  },
  {
    q: 'Is this only relevant for hotels, or any tourism business?',
    a: 'Any tourism business whose customers plan before they buy — safari operators, tour companies, guest houses, attractions. The mechanics are identical; only the questions in the panel change. The operator version of the same problem is covered on our page about SEO for safari operators.',
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
          Getting your hotel cited by ChatGPT means making your property the easiest correct
          answer for an AI assistant to give: let the AI crawlers read your site, put a
          plain 40-to-70-word answer at the top of each key page, add structured data that
          states what and where you are, keep your name and details identical across every
          listing on the web, and re-check monthly what the assistants actually say. There is
          no paid shortcut and no guarantee — only a property that is easy to read, easy to
          verify, and consistently described everywhere it appears.
        </ShortAnswer>

        <Scene>
          <p>
            A couple in Frankfurt is planning a honeymoon. They do not open a browser tab
            with ten results. They open ChatGPT and type: where should we stay for three
            nights near the Serengeti, mid-range, good for first-timers?
          </p>
          <p>
            The assistant thinks for a moment and names three properties, with a sentence
            about each. Two of them are competent, unremarkable places whose websites happen
            to say plainly what they are, where they are, and what a night costs.
          </p>
          <p>
            Thirty kilometres from the park gate sits a lodge with better reviews than all
            three. It is not mentioned. Its website is a slideshow of sunset photography, a
            rates page that says &ldquo;contact us,&rdquo; and a robots file that turned away
            every crawler except Google&rsquo;s. The assistant has never seen a sunset. It
            has also never seen the lodge.
          </p>
        </Scene>

        <p>
          This is the quiet shift in how travel gets planned, and it favours whoever writes
          things down clearly. The good news for African properties: the field is thin. Most
          of your competitors have not done any of what follows, which means the bar, for
          now, is refreshingly low.
        </p>

        <h2 id="how-ai-picks">How an assistant decides which hotels to name</h2>

        <p>
          An AI assistant names the businesses it can read, understand, and cross-check — not
          the ones with the biggest marketing budgets. When a traveler asks where to stay,
          the model draws on what it has absorbed from the web and, increasingly, on pages it
          retrieves in real time. The businesses that surface share three traits: their
          information is stated plainly in text a machine can parse, it is consistent
          everywhere it appears, and third parties — listings, reviews, directories — say the
          same thing.
        </p>

        <p>
          Notice what is absent from that list: superlatives. Stuffing &ldquo;best luxury
          lodge&rdquo; into your homepage is the modern version of naming your business AAA
          Lodge to top the phone book, and it works about as well. The assistant is not
          persuaded by adjectives. It is persuaded by facts it can verify in more than one
          place.
        </p>

        <h2 id="crawler-access">Let the AI crawlers in</h2>

        <p>
          The first check is embarrassingly basic: can the AI crawlers actually read your
          site? Many hotels block them without knowing — a robots.txt inherited from an old
          template, a security plugin with a default &ldquo;block bots&rdquo; setting, a CDN
          rule nobody reviewed. If the crawler that feeds ChatGPT or Perplexity cannot fetch
          your pages, everything after this section is theoretical.
        </p>

        <p>
          The second half of access is rendering. If your rates, your location, and your room
          types only appear after JavaScript runs, a crawler that does not execute JavaScript
          sees an empty page. Your key facts should be in the plain HTML of the page — which
          is also, not coincidentally, what makes a site fast on a guest&rsquo;s mid-range
          phone on lodge Wi-Fi that is technically present.
        </p>

        <h2 id="answer-blocks">Write answers, not brochures</h2>

        <p>
          Every key page should open with the answer a traveler — or their assistant — came
          for, in 40 to 70 plain words: what the property is, where it is, what it offers,
          what it costs. This is the block an assistant can lift and quote without editing,
          which is exactly what a citation is.
        </p>

        <p>
          Brochure copy does the opposite. &ldquo;Nestled in the heart of untamed
          wilderness&rdquo; tells a machine nothing — every lodge in Africa is apparently
          nestled somewhere, often several ecosystems at once. &ldquo;A 12-room lodge 4 km
          from the eastern gate, from $280 a night including game drives&rdquo; is a sentence
          an assistant can use. Write the second kind. The person reading it prefers it too.
        </p>

        <h2 id="structured-data">Structured data: tell the machine what you are</h2>

        <p>
          Structured data — schema markup in the page&rsquo;s code — states the facts about
          your property in the exact format machines read natively: name, type, location,
          price range, amenities. It removes the guesswork. A page that says &ldquo;we are a
          hotel, in this city, at these coordinates&rdquo; in structured data is a page an
          assistant can cite with confidence instead of hedging.
        </p>

        <p>
          The discipline that matters is consistency: the markup must match the visible page,
          and both must match what the rest of the web says about you. Schema that disagrees
          with your own site is worse than none, because it teaches every machine reading it
          that your facts are unreliable.
        </p>

        <h2 id="entity-consistency">One consistent identity across the web</h2>

        <p>
          An assistant trusts a business more when independent sources agree about it. Your
          name, address, phone number, and description should be identical on your website,
          your Google Business Profile, your OTA listings, SafariBookings or TripAdvisor, and
          every directory you appear in. &ldquo;Mara View Lodge,&rdquo; &ldquo;Mara View
          Lodge &amp; Camp,&rdquo; and &ldquo;Maraview Lodge&rdquo; look like three
          businesses to a machine counting sources.
        </p>

        <p>
          Reviews matter here beyond their usual job: they are third-party text confirming
          you exist, where you are, and what staying with you is like. A property with fifty
          detailed reviews on two platforms is a property an assistant can describe without
          inventing anything. A property with none is a rumour.
        </p>

        <h2 id="benchmark">Ask the AI about yourself, every month</h2>

        <p>
          Measurement is a fixed panel of questions, re-run monthly across the assistants
          your guests use: where to stay near your park, which hotel in your city at your
          price point, which property for the experience you sell. For each question, record
          whether you are named, named with errors, or absent — and whose name appears
          instead.
        </p>

        <p>
          This is the GEO equivalent of a rank tracker, and it is the only honest way to know
          whether the work is landing. One request, though: resist checking daily and
          adjusting weekly. Assistants drift; the monthly trend is signal, the daily wobble
          is weather.
        </p>

        <h2 id="cant-control">What you cannot control</h2>

        <p>
          Nobody controls what an AI assistant says, including the companies that built them
          on any given Tuesday. There is no submission form, no paid placement, no guarantee.
          Anyone selling &ldquo;guaranteed ChatGPT recommendations&rdquo; has located a gap
          in the market for confidence tricks and filled it promptly.
        </p>

        <p>
          What you control is everything that makes a citation likely: access, clarity,
          structure, consistency. Do those four and measure monthly, and you are ahead of
          nearly every property on the continent — for now. The window where this is a quiet
          advantage rather than table stakes will not stay open forever.
        </p>

        <p>
          This is the work we run as a named service — crawler audit, answer blocks, the
          schema engine, and the monthly citation benchmark — described in full on{' '}
          <a href="/geo-services">the GEO services page</a>, with the hotel-specific offer on{' '}
          <a href="/for-lodges-hotels">SEO for lodges and hotels</a> and the background in{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a>. The
          starting point costs nothing: a{' '}
          <a href="/contact">free AI-visibility check</a> that shows you what the assistants
          say about your property today.
        </p>
      </PostShell>
    </>
  );
}
