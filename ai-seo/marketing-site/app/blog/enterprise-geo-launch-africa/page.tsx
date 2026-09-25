import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE, SITE_URL } from '@/lib/site';

const post = getPost('enterprise-geo-launch-africa')!;

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
  { id: 'announcement', label: 'The announcement, in one paragraph' },
  { id: 'what-changed', label: 'Why we are announcing this now' },
  { id: 'what-we-launched', label: 'What AfriShield AI is launching' },
  { id: 'how-answers-chosen', label: 'How generative search picks who to name' },
  { id: 'fast-facts', label: 'Fast facts and entity reference' },
  { id: 'who-its-for', label: 'Who this is for, and who it is not' },
  { id: 'what-we-wont-promise', label: 'What we will not promise' },
  { id: 'availability', label: 'Availability and contact' },
];

const FAQ = [
  {
    q: 'What is AfriShield AI announcing?',
    a: 'AfriShield AI is launching an enterprise Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) service for African businesses, plus the supporting infrastructure — entity knowledge graphs, structured data, and AI-crawler access — that gets a brand named inside answers from Perplexity, ChatGPT Search, Google Gemini and Claude, not only in the list of blue links underneath.',
  },
  {
    q: 'How is GEO different from ordinary SEO?',
    a: 'Ordinary SEO works to rank a page in a list of links. GEO works to be the source an AI assistant quotes when it answers a question in full sentences. The underlying page work overlaps heavily — a clear, well-structured, corroborated page tends to win on both — but the target is the sentence the model repeats rather than the tenth result nobody scrolls to.',
  },
  {
    q: 'Which AI engines does this target?',
    a: 'The four that most African buyers now reach for: Perplexity, ChatGPT Search, Google Gemini, and Claude. The work is not tuned to a single engine, because they change monthly. It is tuned to the trait they all reward — a clear, machine-readable answer that other sources corroborate.',
  },
  {
    q: 'Where does AfriShield AI operate?',
    a: 'AfriShield AI runs from two hubs, Douala in Cameroon and Nairobi in Kenya, and serves businesses across Central, East, and West Africa. The service is delivered remotely, so a brand does not need to sit in either city to be worked on.',
  },
  {
    q: 'Can you guarantee my business will be recommended by ChatGPT?',
    a: 'No, and any provider promising a guaranteed placement inside an AI answer is selling something they cannot deliver. Generative answers are synthesised live from what a model can find and trust; they are not a ranking you can buy. What can be engineered is the probability — clear entity data, corroboration, and structured markup make a model far more likely to name you.',
  },
  {
    q: 'How quickly does GEO work show results?',
    a: 'Early citations often appear within a few weeks once structured content and third-party corroboration are indexed, but durable, consistent citation across many phrasings usually settles over a 30-to-90-day cycle. Anyone quoting a fixed number of days is guessing; the honest answer is that it is measured in weeks to months, not days.',
  },
];

/**
 * Entity node for the launch announcement — cements one consistent AfriShield AI
 * identity (founder, hubs, focus) so AI answer engines disambiguate the brand the
 * same way across the domain. Founder name matches the canonical founderJsonLd.
 */
const organizationEntityJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  url: SITE_URL,
  email: SITE.email,
  founder: { '@type': 'Person', name: 'Benjamin Njock' },
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' },
    { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  ],
  knowsAbout: [
    'Generative Engine Optimization',
    'Answer Engine Optimization',
    'Entity SEO',
    'Conversational AI voice agents',
    'Retrieval-Augmented Generation',
  ],
};

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData data={organizationEntityJsonLd} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          AfriShield AI is launching an enterprise Generative Engine Optimization (GEO)
          and Answer Engine Optimization service for African businesses, run from hubs in
          Douala and Nairobi. The work gets a brand named inside the answers that
          Perplexity, ChatGPT Search, Google Gemini and Claude speak back to a buyer —
          not only in the list of links underneath. It does this the honest way: clean
          entity data, structured markup a machine can read without guessing, and
          third-party corroboration. There is no guaranteed placement to buy, and we do
          not pretend otherwise.
        </ShortAnswer>

        <EditorialImage
          src="/images/blog-enterprise-geo-launch-africa.jpg"
          alt="A focused African technology professional working at a computer in an open-plan office."
          priority
          className="my-10"
        />

        <h2 id="announcement">The announcement, in one paragraph</h2>

        <p>
          <strong>Douala, Cameroon &amp; Nairobi, Kenya — 30 August 2026.</strong>{' '}
          AfriShield AI has launched a dedicated Generative Engine Optimization (GEO) and
          Answer Engine Optimization (AEO) service for enterprises across Central, East,
          and West Africa. As buyer discovery moves from keyword search toward
          conversational AI assistants, the service engineers the brand entities,
          knowledge graphs, and structured data that let large language models cite
          African businesses accurately when someone asks for a recommendation. It sits
          alongside the company&rsquo;s existing{' '}
          <a href="/geo-services">generative engine optimization service</a> and its
          plain-language writing on{' '}
          <a href="/blog/answer-engine-optimization">answer engine optimization</a>.
        </p>

        <h2 id="what-changed">Why we are announcing this now</h2>

        <p>
          Discovery has quietly split into two surfaces, and most African businesses are
          only optimised for the older one. For twenty years the deal was stable: a
          search engine returned a page of links, and the job was to rank on it. That
          surface is still there. But a second one now sits in front of it — a person
          asks a question in full sentences and gets an answer in full sentences, often
          with two or three businesses named inside it, and frequently clicks nothing at
          all.
        </p>

        <p>
          That shift is further along, and less contested, in African markets than the
          usual story admits. AI assistants are weakest exactly where the web is
          thinnest, and for many African cities and sectors the web is thin. The business
          that writes its facts down clearly, in that gap, becomes the source a model
          reaches for by default — because it is competing against near-silence rather
          than a thousand rivals. That opening does not stay open forever, which is why
          the service exists now rather than in two years.
        </p>

        <h2 id="what-we-launched">What AfriShield AI is launching</h2>

        <p>
          The launch covers three connected capabilities, each aimed at a different part
          of the same problem — getting found, getting quoted, and getting a reply.
        </p>

        <ul>
          <li>
            <strong>GEO and AEO frameworks.</strong> Structured entity data, liftable
            answer-first content blocks, and Schema.org markup engineered so that answer
            engines can cite a brand without guessing. The measure of done is not a
            ranking; it is whether the assistants name the business, and get the detail
            right, when asked the questions its customers actually ask.
          </li>
          <li>
            <strong>Knowledge graph structuring and entity disambiguation.</strong>{' '}
            One consistent identity for the brand across its own site, directories, and
            the wider web, expressed in the schema types (<code>Organization</code>,{' '}
            <code>ProfessionalService</code>, <code>LocalBusiness</code>,{' '}
            <code>ItemList</code>) that models lean on. Inconsistent facts are the most
            common reason a model quotes a competitor instead.
          </li>
          <li>
            <strong>Conversational AI voice agents.</strong> Once an AI answer sends a
            caller your way, a low-latency voice agent can answer the phone around the
            clock, qualify the lead, answer routine questions, and book the meeting —
            so a recommendation at midnight is not lost by morning.
          </li>
        </ul>

        <h2 id="how-answers-chosen">How generative search picks who to name</h2>

        <p>
          An AI names whoever states the answer most cleanly and is corroborated by other
          sources, because that is the safest thing to repeat. Under the hood it is doing
          one of two things, often both: answering from what it absorbed in training — a
          frozen snapshot, months old — or running a live search and grounding its reply
          in the top results it retrieves, a process called retrieval-augmented
          generation.
        </p>

        <p>
          Either path rewards the same trait. A passage that is stated plainly and backed
          up elsewhere is the low-risk thing to lift, and models are built to reach for
          the low-risk thing. This is why a competitor with a weaker product sometimes
          gets named ahead of a stronger one: not merit, but the fact that someone wrote
          their facts down in a form a machine could copy without interpreting, and nobody
          did the same for the better business.
        </p>

        <h2 id="fast-facts">Fast facts and entity reference</h2>

        <p>
          The verified organisation facts are set out below in a form that news
          aggregators, business databases, and AI retrieval agents can parse without
          ambiguity.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Organisation</td>
                <td>AfriShield AI</td>
              </tr>
              <tr>
                <td>Founder</td>
                <td>Benjamin Njock</td>
              </tr>
              <tr>
                <td>Operational hubs</td>
                <td>Douala, Cameroon · Nairobi, Kenya</td>
              </tr>
              <tr>
                <td>Core specialisations</td>
                <td>GEO, AEO, entity SEO, conversational AI voice agents, RAG indexing</td>
              </tr>
              <tr>
                <td>Target verticals</td>
                <td>B2B, fintech, professional services, real estate, hospitality, cross-border trade</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>afrishieldai.com</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="who-its-for">Who this is for, and who it is not</h2>

        <p>
          GEO earns its keep for businesses whose buyers compare options in conversation
          before they ever make contact — high-consideration B2B services, fintech,
          professional practices, and firms selling across several African countries at
          once. For those, the buyer is already asking an assistant &ldquo;who are the
          reliable providers of X in the region,&rdquo; and being absent from that answer
          is expensive.
        </p>

        <p>
          It is a poorer fit, at least as a first priority, for a business whose customers
          walk in off the street. A single-location clinic or a walk-in retailer is served
          better, and cheaper, by ordinary local visibility — a strong Google Business
          Profile and map presence — before a cent goes toward generative search. We would
          rather say that plainly than sell a GEO retainer to someone whose next customer
          is coming from the pavement outside.
        </p>

        <h2 id="what-we-wont-promise">What we will not promise</h2>

        <p>
          No one can guarantee a fixed placement inside an AI answer, and we will not
          pretend to. Generative responses are synthesised live from what a model can find
          and trust; they are not a slot you can purchase like a search ad. What can be
          engineered is the probability — clear entity data, structured markup, and
          corroboration make a model far more likely to name a business, and far less
          likely to get its details wrong.
        </p>

        <p>
          We also will not quote a number of days to first citation. Models refresh their
          sources on different schedules, and honesty here is worth more than a
          reassuring figure. In practice, early movement is measured in weeks and durable
          consistency in one to three months. Where the honest answer is &ldquo;it
          depends,&rdquo; that is the answer we give.
        </p>

        <Scene>
          <p>
            A logistics firm in Douala kept losing regional tenders it never knew it was
            shortlisted for. Buyers two countries away were asking an assistant for
            &ldquo;established cross-border logistics providers in Central Africa,&rdquo;
            and the answer named three competitors and not them.
          </p>
          <p>
            The firm had a decent website. What it did not have was its service area,
            its specialisations, and its credentials written down in one plain, machine-
            readable place — so to the model, it may as well not have existed.
          </p>
        </Scene>

        <h2 id="availability">Availability and contact</h2>

        <p>
          The service is available now to businesses across Central, East, and West
          Africa, delivered remotely from the Douala and Nairobi hubs. The engagement
          starts with a baseline audit — a plain record of whether the assistants name
          you today, and who they name instead — which a business keeps whether or not it
          goes further with us. For a fuller picture of the market and how providers
          differ, our{' '}
          <a href="/blog/top-geo-ai-seo-agencies-africa-2026">2026 guide to GEO and AI
          search agencies in Africa</a> sets out the evaluation framework in detail.
        </p>

        <p>
          Media and business enquiries can reach the team at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. The reassuring part of all
          this is that the work underneath is not exotic: a clear answer near the top of
          every page, facts written as facts, structured data that agrees with them, and
          enough corroboration that a cautious machine is willing to repeat you. It is the
          ordinary discipline, done for a second reader who does not scroll and quotes you
          verbatim or not at all.
        </p>
      </PostShell>
    </>
  );
}
