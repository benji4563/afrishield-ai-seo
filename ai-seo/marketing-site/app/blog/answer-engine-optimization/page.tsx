import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('answer-engine-optimization')!;

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
    images: [`${SITE_URL}/images/blog-answer-engine-optimization.webp`],
  },
  twitter: { card: 'summary_large_image', title: post.title, description: post.description },
};

const TOC = [
  { id: 'what-changed', label: 'What actually changed' },
  { id: 'what-aeo-is', label: 'What answer engine optimization is' },
  { id: 'how-answers-chosen', label: 'How an AI decides who to quote' },
  { id: 'what-works', label: 'What actually moves the needle' },
  { id: 'seo-vs-aeo', label: 'SEO and AEO, side by side' },
  { id: 'what-fails', label: 'What does not work' },
  { id: 'african-angle', label: 'Why this matters more in African markets' },
  { id: 'check-yours', label: 'How to check if you are being quoted' },
];

const FAQ = [
  {
    q: 'What is answer engine optimization?',
    a: 'It is the work of getting your business named inside the answer an AI assistant gives, rather than only in the list of blue links a search engine returns. The tactics overlap heavily with SEO, but the target is different: you are optimising to be the sentence the model quotes, not the tenth result nobody scrolls to.',
  },
  {
    q: 'Is answer engine optimization different from SEO?',
    a: 'It is a layer on top of SEO, not a replacement. A page that is clear, well structured, and factually specific tends to do well in both. The difference is emphasis: AEO rewards direct answers, clean facts a machine can lift without guessing, and being the original source of a claim rather than the fortieth site to repeat it.',
  },
  {
    q: 'Do I need answer engine optimization if I already rank on Google?',
    a: 'Ranking on Google helps, because most AI answers still pull from pages that rank. But it is not automatic. Plenty of pages that rank on page one are never quoted, usually because the useful fact is buried three paragraphs down instead of stated plainly near the top. Ranking gets you considered; a clear answer gets you quoted.',
  },
  {
    q: 'How long does it take to show up in AI answers?',
    a: 'There is no fixed number, and anyone who gives you one is guessing. Models refresh their sources on different schedules, and some answer from live search while others answer from training data that is months old. In practice, pages that are clear and get cited elsewhere start appearing sooner. It is measured in weeks to months, not days.',
  },
  {
    q: 'Can I pay to appear in ChatGPT or Perplexity answers?',
    a: 'Not the way you buy a Google ad. The organic answer is chosen by the model from what it can find and trust. There are paid placements appearing around some AI products, but the answer itself is earned through being findable, clear, and corroborated. Anyone selling guaranteed placement inside the answer is selling something they cannot deliver.',
  },
  {
    q: 'How do I know if it is working?',
    a: 'Ask the assistants the questions your customers would ask, in the phrasing they would use, and see whether you are named and whether the detail is right. Do it monthly and write down what changes. It is a cruder measurement than a rank tracker, but it is the honest one, and it is the same check we run for clients.',
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
          Answer engine optimization is the work of getting your business named inside the
          answer an AI assistant gives — the paragraph ChatGPT, Claude, Perplexity, or
          Google&rsquo;s AI overview speaks back — rather than only in the list of links
          underneath. The tactics rhyme with SEO: be findable, be clear, be specific. The
          target is what differs. You are no longer trying to be the tenth blue link. You
          are trying to be the sentence the machine decides to quote. If nobody has written
          your core facts down plainly, in one place, a model has nothing to lift, and it
          quotes whoever did.
        </ShortAnswer>

        <EditorialImage
          src="/images/blog-answer-engine-optimization.webp"
          alt="Two marketers celebrating with raised fists in front of a screen showing a falling Google traffic graph — hype outpacing the results."
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Tunde sells solar inverters out of a small shop in Lagos and a warehouse nobody
            visits. For years his customers found him the ordinary way: they typed a phrase
            into Google, scrolled, and eventually landed on his site.
          </p>
          <p>
            Last month a customer told him something that stuck. She had not searched at
            all. She had asked an AI assistant which inverter suited a three-bedroom flat
            with an unreliable grid, and it had answered with three specific models and the
            reasons for each. Tunde stocks all three. It named the shop across the road.
          </p>
          <p>
            He was not outranked. He was left out of the sentence entirely — and the
            sentence was the whole conversation.
          </p>
        </Scene>

        <p>
          That is what this piece is about. Not a prediction that search is dying — it is
          not — but a plain account of a second surface that now sits in front of it, how
          businesses get named on it, and the specific, unglamorous work that makes the
          difference. As with everything else we write, where the honest answer is
          &ldquo;nobody knows yet,&rdquo; we say so instead of inventing a number.
        </p>

        <h2 id="what-changed">What actually changed</h2>

        <p>
          For twenty years the deal was stable: a search engine returned a page of links,
          and your job was to be high on that page. The reader did the rest — they clicked,
          they read, they decided.
        </p>

        <p>
          The new surface collapses those steps. A person asks a question in full sentences
          and gets an answer in full sentences, often with two or three businesses or
          sources named inside it. Many of them never click anything. The answer was
          enough. That is wonderful if you are named and quietly catastrophic if you are
          not, because there is no page two to be rescued from — there is one answer, and
          you are in it or you are not.
        </p>

        <p>
          None of this means the old work was wasted. The pages that get quoted are, almost
          always, pages that also rank. The surfaces share a spine. What has changed is that
          ranking is now the entry fee rather than the prize.
        </p>

        <h2 id="what-aeo-is">What answer engine optimization is</h2>

        <p>
          Stripped of the acronyms, answer engine optimization is making your business the
          easiest correct thing for a machine to say. Three plain properties do most of the
          work:
        </p>

        <ul>
          <li>
            <strong>Findable.</strong> The model, or the live search it leans on, can reach
            your page. It is indexed, it loads, and it is not hidden behind a script that
            only a human browser runs.
          </li>
          <li>
            <strong>Liftable.</strong> The useful fact is stated outright, in one place,
            in a sentence that survives being copied out of context. Not implied across
            four paragraphs. Stated.
          </li>
          <li>
            <strong>Trusted.</strong> Other sources corroborate you, and your own claims
            are specific enough to be checked. Vague pages read as filler to a machine the
            same way they do to a person.
          </li>
        </ul>

        <p>
          You will also hear <strong>generative engine optimization</strong> used for
          roughly the same idea. Treat them as the same job for now. The distinction people
          draw between them is finer than anything that changes what you actually do this
          month.
        </p>

        <h2 id="how-answers-chosen">How an AI decides who to quote</h2>

        <p>
          An AI names whoever states the answer most cleanly and is corroborated by other
          sources, because that is the safest thing to repeat. Under the hood it is doing one
          of two things, often both: answering from what it absorbed during training — a
          frozen snapshot, months old, past its training cutoff — or running a live search
          and grounding its reply in the top results it retrieves, a process called
          retrieval-augmented generation, or RAG.
        </p>

        <p>
          Either path rewards the same trait. A passage that is corroborated elsewhere and
          states its point without hedging is the low-risk thing to lift, and models are
          built to reach for the low-risk thing. This is also the mechanism behind{' '}
          <a href="/blog/ai-seo-vs-traditional-seo">the overlap between AI SEO and
          traditional SEO</a> — the same clean, well-sourced page tends to win on both.
        </p>

        <blockquote>
          A model is not deciding whether you are the best business. It is deciding whose
          words carry the least risk of being wrong. Clear, specific, and corroborated beats
          clever every time.
        </blockquote>

        <p>
          This is why a competitor with a worse product sometimes gets named ahead of you.
          They did not win on merit. They won because someone wrote their facts down in a
          form a machine could lift without guessing, and nobody did the same for you.
        </p>

        <h2 id="what-works">What actually moves the needle</h2>

        <p>
          The work is concrete and mostly boring, which is a good sign. The reliable moves,
          in rough order of return:
        </p>

        <ul>
          <li>
            <strong>Answer the question in the first two sentences.</strong> Every page that
            targets a real question should open by answering it, before the context and the
            story. This single habit does more for being quoted than any other.
          </li>
          <li>
            <strong>State facts as facts.</strong> Prices as ranges, hours, service areas,
            what you do and do not do, in plain sentences a machine can lift whole. Ambiguity
            is the enemy of being quoted.
          </li>
          <li>
            <strong>Add structured data that matches the page.</strong> Schema for your
            organisation, your services, and your FAQ tells a machine what the page is
            claiming, in a format built to be read without interpretation.
          </li>
          <li>
            <strong>Be the source, not the echo.</strong> Original specifics — your own
            numbers, your own comparisons, your own local knowledge — get cited. The
            fortieth rewrite of a generic definition does not.
          </li>
          <li>
            <strong>Get named elsewhere.</strong> Mentions on directories, local sites, and
            pages that already carry weight are the corroboration that moves you from
            &ldquo;a page that exists&rdquo; to &ldquo;a source worth trusting.&rdquo;
          </li>
        </ul>

        <h2 id="seo-vs-aeo">SEO and AEO, side by side</h2>

        <p>
          They are not rivals. They are the same discipline pointed at two surfaces. The
          emphasis is what shifts.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Classic SEO leans on</th>
                <th>Answer engine optimization adds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ranking a page in a list of links</td>
                <td>Being the source named inside a written answer</td>
              </tr>
              <tr>
                <td>Keywords matched to a query</td>
                <td>Questions answered in the phrasing people actually speak</td>
              </tr>
              <tr>
                <td>A click as the goal</td>
                <td>A correct mention, click or not</td>
              </tr>
              <tr>
                <td>Title tags and meta descriptions</td>
                <td>A direct answer near the top and facts stated plainly</td>
              </tr>
              <tr>
                <td>Backlinks as votes</td>
                <td>Corroboration a model can find and trust</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The useful thing about seeing them together is how much overlaps. Almost every
          move in the right-hand column also helps the left. You are not doing two jobs. You
          are doing one job with a second reader in mind — a reader who does not scroll, does
          not forgive vagueness, and quotes you verbatim or not at all.
        </p>

        <h2 id="what-fails">What does not work</h2>

        <p>
          The failure modes are the old ones wearing new clothes.
        </p>

        <ul>
          <li>
            <strong>Stuffing the page with &ldquo;AI&rdquo; and &ldquo;answer engine.&rdquo;</strong>
            Writing the phrase forty times does not make a machine trust you. It makes the
            page read as spam to the same systems you are trying to court.
          </li>
          <li>
            <strong>Thin pages built to occupy a term.</strong> A page with nothing specific
            to lift is invisible to an answer engine, because there is nothing to quote.
          </li>
          <li>
            <strong>Inventing facts to sound quotable.</strong> Specifics get checked against
            other sources. A claim that contradicts everything else reads as unreliable, and
            unreliable is exactly what a model is built to avoid.
          </li>
          <li>
            <strong>Chasing every model&rsquo;s rumoured trick.</strong> The systems change
            monthly and the rumours change weekly. Clear, specific, corroborated pages have
            worked across every version so far, because they are what the systems are trying
            to reward in the first place.
          </li>
        </ul>

        <h2 id="african-angle">Why this matters more in African markets</h2>

        <p>
          For African businesses this is an opening rather than a threat: AI assistants are
          weakest exactly where the web is thinnest, and African markets are often where it is
          thinnest of all. That is the opposite of the usual story about being behind.
        </p>

        <p>
          Ask one for a detailed
          recommendation in a large, well-documented market and it has a thousand corroborating
          sources to lean on. Ask it about a specific service in a specific African city and
          it often has very little — a few directory listings, a stray forum post, and not
          much else. The business that writes its facts down clearly, in that gap, becomes the
          source by default, because it is competing against near-silence rather than a
          thousand rivals.
        </p>

        <p>
          The catch is the same one that has always mattered here and gets skipped by
          providers working from Western templates: the page still has to load on a mid-range
          phone on a patchy connection. A rich, quotable page that takes nine seconds to
          become useful has, functionally, not been published — for a person or for the
          crawler reading on their behalf.
        </p>

        <h2 id="check-yours">How to check if you are being quoted</h2>

        <p>
          You do not need a tool for the first pass. You need the questions your customers
          would ask and a few minutes.
        </p>

        <ol>
          <li>
            Write down the ten questions a customer would ask before choosing you — in their
            words, not your product names.
          </li>
          <li>
            Ask them to ChatGPT, Claude, Perplexity, and Google&rsquo;s AI answers, one by
            one.
          </li>
          <li>
            Note three things each time: are you named, is the detail correct, and who is
            named instead of you.
          </li>
          <li>
            Repeat it monthly and keep the log. The movement over time is the signal — a
            single check is a snapshot, a run of them is a trend.
          </li>
        </ol>

        <p>
          It is a cruder measurement than a rank tracker, and it is the honest one. When a
          model gets a fact about you wrong, that is not a mystery to shrug at — it is a page
          that needs the correct fact stated plainly, and it is usually fixable in an
          afternoon.
        </p>

        <p>
          The work underneath all of this is not exotic. It is a clear answer near the top of
          every page, facts written as facts, structured data that agrees with them, and
          enough corroboration that a cautious machine is willing to repeat you. The same
          things that make a page good for a person are, almost exactly, the things that make
          it quotable by a machine — which is most of what{' '}
          <a href="/blog/what-ai-seo-actually-does">an AI SEO agency actually does all week</a>.
          That is the reassuring part: there is no separate dark art to learn — only the
          ordinary discipline, done for a second reader.
        </p>
      </PostShell>
    </>
  );
}
