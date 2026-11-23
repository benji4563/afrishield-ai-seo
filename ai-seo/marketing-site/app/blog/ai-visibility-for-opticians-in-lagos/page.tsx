import Link from 'next/link';
import type { Metadata } from 'next';
import { PostShell, ShortAnswer } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('ai-visibility-for-opticians-in-lagos')!;

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
  { id: 'serp', label: 'What a Lagos patient sees today' },
  { id: 'ranking', label: 'How Google ranks an optician in Lagos' },
  { id: 'profile', label: 'The Google Business Profile, field by field' },
  { id: 'hefamaa', label: 'Show the HEFAMAA and ODORBN registrations' },
  { id: 'instagram', label: 'Why Instagram is not enough for AI' },
  { id: 'pages', label: 'Service pages with naira prices' },
  { id: 'reviews', label: 'Reviews from every patient' },
  { id: 'douala', label: 'How Lagos differs from Douala' },
  { id: 'order', label: 'The order of work' },
  { id: 'skip', label: 'When this work is not worth it' },
];

const FAQ = [
  {
    q: 'How can an optician in Lagos get recommended by ChatGPT?',
    a: 'ChatGPT and similar assistants recommend businesses they can read about in plain text on the web. An optical centre in Lagos improves its chances by publishing its address, area, services, opening hours and naira prices on its own website, and by using the same name and phone number on Google, Instagram and directories. No method guarantees a recommendation.',
  },
  {
    q: 'Does an eye clinic or optical centre in Lagos need HEFAMAA registration?',
    a: 'Yes. HEFAMAA, the Lagos State Health Facility Monitoring and Accreditation Agency, states that no person may run a health facility in Lagos State on premises not registered with it, and it lists Eye Clinic or Optical Centre as a registration category. Stating the registration on the website gives patients a fact they can check.',
  },
  {
    q: 'How can a patient check that an optician in Nigeria is licensed?',
    a: 'Optometrists and dispensing opticians in Nigeria are registered by the Optometrists and Dispensing Opticians Registration Board of Nigeria, known as ODORBN, which issues registration certificates and runs a process for reporting concerns about a practitioner. In Lagos the premises must also be registered with HEFAMAA. A patient can ask the clinic for both certificates.',
  },
  {
    q: 'Is an Instagram page enough for an eye clinic in Lagos?',
    a: 'Instagram helps patients who already follow the clinic, but it is a weak source for search engines and AI assistants, which rely on text they can fetch and read. Prices and services written inside images or captions are hard for them to use. A short website with one page per service fills that gap.',
  },
  {
    q: 'Why does my optical centre not appear for optician near me in Lekki?',
    a: 'Google ranks local results on relevance, distance and prominence, and distance depends on where the person searching is standing. A clinic in Ikeja is far from a patient in Lekki, so it rarely appears for that patient however good its profile is. A clinic can only control relevance and prominence, through a complete profile, service pages and reviews.',
  },
  {
    q: 'Should an optician in Lagos publish prices in naira?',
    a: 'Publishing a starting price in naira for an eye test, single-vision lenses or frames helps patients compare without calling, and gives AI assistants a concrete figure to quote. Where the price depends on the prescription, say so and give the lowest realistic starting point. Prices belong on the website, written as text.',
  },
];

const STEPS = [
  {
    name: 'Claim and verify the Google Business Profile',
    text: 'Search for the clinic on Google Maps. Claim the listing if it exists, create it if not, on a Google account the clinic owns, and complete verification.',
  },
  {
    name: 'Choose the right category and complete every field',
    text: 'Use Optician, Optometrist or Eye care center as the primary category, depending on what the premises are registered as. Add the exact address and landmark, the hours displayed at the entrance, a +234 number that answers WhatsApp, and photos of the signboard, the entrance and the examination room.',
  },
  {
    name: 'Use one name, address and phone number everywhere',
    text: 'Write the clinic name, address and phone number the same way on Google, the website, the Instagram bio and every directory listing.',
  },
  {
    name: 'State the HEFAMAA and ODORBN registrations on the website',
    text: 'Add one sentence to the home page and the About page naming the HEFAMAA facility registration and the ODORBN registration of the optometrist or optician in charge.',
  },
  {
    name: 'Publish one page per service with a naira starting price',
    text: 'Eye test, glasses and lenses, contact lenses, children, repairs: one page each, in text, with what the service includes, how long it takes and a starting price in naira.',
  },
  {
    name: 'Ask every patient for a review at collection',
    text: 'Send the review link by WhatsApp when the patient collects their glasses. Ask every patient, offer nothing in exchange, and reply to every review without mentioning anyone’s eye condition.',
  },
  {
    name: 'Check Google and ChatGPT every month',
    text: 'Search for optician plus your area on Google, ask ChatGPT the same question, and note who is named and why.',
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
      <StructuredData
        data={howToJsonLd(STEPS, 'Improve the AI and Google visibility of an optician in Lagos')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          AI visibility for opticians in Lagos depends on what Google and assistants such as
          ChatGPT can read about the practice. An optical centre in Ikeja, Lekki or Surulere needs{' '}
          <strong>a verified Google Business Profile</strong> with the right category, real hours
          and photos, <strong>a website that states its services and naira prices in text</strong>,
          and a steady flow of patient reviews. Stating its HEFAMAA facility registration and
          the ODORBN registration of its optometrist gives patients and AI systems a fact they can
          check. An Instagram page alone is not enough.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <div className="my-10 border-y border-ink/10 py-8">
          <div className="space-y-5 text-lead text-slate">
            <p>
              Tolu runs an optical centre in Surulere. Two optometrists, an auto refractor, a
              slit lamp, a frame wall that took three years to stock, and an Instagram page with
              four thousand followers and a beautiful grid.
            </p>
            <p>
              A new patient tells her she nearly went elsewhere. She had asked ChatGPT for a good
              optician near Surulere. It named a large chain, an eye hospital on the Island and a
              clinic in Ikeja, then suggested she check that any clinic she chose was properly
              registered. Tolu is registered. Her certificates are framed behind the counter.
            </p>
            <p>
              The only place her prices exist is a carousel post from February, in a font that
              looks lovely and reads, to a machine, as a picture of a font.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Illustrative composite — not a client, not a testimonial
          </p>
        </div>

        <p>
          This guide is for owners of optical centres and eye clinics in Lagos, from Ikeja and
          Yaba on the Mainland to Lekki and Victoria Island. It covers what a patient sees when
          they search today, what Google and AI assistants need before they will name a
          practice, and the order in which to do the work. The general mechanics of the map pack
          are in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            our guide to appearing on Google Maps in Lagos
          </a>
          ; this post is the version written for a clinic.
        </p>

        <h2 id="serp">What a Lagos patient sees when searching for an optician today</h2>

        <p>
          A Lagos patient searching online for an optician today mostly sees clinics’ own pages,
          an Instagram profile and the HEFAMAA registration page, not guides. On 23 November 2026
          we read the first page of Google for “ai visibility for opticians in lagos” from
          Nigeria. It held two clinics’ own websites, one eye clinic’s Instagram profile, the
          HEFAMAA page describing how an Eye Clinic or Optical Centre is registered, a television
          news clip about optometrists and AI, an agency page selling AI visibility to Lagos B2B
          teams, an American article on AI in eye care and a guide to setting up an eye clinic.
        </p>

        <p>
          Two things stand out. The regulator’s page ranks next to the clinics, which tells you
          that registration is part of how this topic is understood. And nothing on the page
          explains to a clinic owner how to be found. The competition for a well-described
          optical centre is thin, and the window will not stay open for long.
        </p>

        <h2 id="ranking">How Google ranks an optician in Lagos</h2>

        <p>
          Google ranks local results on three factors it names itself: relevance, distance and
          prominence. Google also states that no one can pay to get a better local ranking. For a
          Lagos optical centre, relevance and prominence are work you can do; distance is
          geography.
        </p>

        <ul>
          <li>
            <strong>Distance.</strong> A patient in Lekki Phase 1 typing “optician near me” is
            shown practices near Lekki, not your excellent clinic in Ikeja. The Mainland and the
            Island behave like separate markets in local search, and the Third Mainland Bridge has
            no interest in your star rating.
          </li>
          <li>
            <strong>Relevance.</strong> Whether the profile and the website match the words the
            patient used: optician, eye test, glasses, contact lenses, children’s glasses. A
            category and a description do most of this; service pages do the rest.
          </li>
          <li>
            <strong>Prominence.</strong> How well known the practice is. Google says this draws on
            information from across the web, including links and the number of reviews and
            ratings.
          </li>
        </ul>

        <p>
          The practical consequence for a clinic with two branches, say Ikeja and Lekki, is two
          profiles, each verified at its own address, each with its own photos and reviews. One
          profile for both, pinned somewhere near the middle, competes properly in neither.
        </p>

        <h2 id="profile">The Google Business Profile for a Lagos optical centre, field by field</h2>

        <p>
          A Lagos optical centre’s profile ranks best when it is verified, in the right category
          and complete, because Google says complete and accurate information helps a business
          match more searches. Most of the fields take minutes.
        </p>

        <ul>
          <li>
            <strong>Category.</strong> Optician, Optometrist or Eye care center, matching what the
            premises do and what they are registered as. If an ophthalmologist consults in the
            same building, that doctor’s practice usually deserves its own profile.
          </li>
          <li>
            <strong>Name.</strong> The name on the signboard. Google’s guidelines do not allow
            extra keywords in the business name, so “Best Eye Clinic Lagos Ikeja Lekki” is not a
            name; it is a request to be suspended.
          </li>
          <li>
            <strong>Address and pin.</strong> Street, building, floor, then the pin moved by hand
            onto the entrance. If patients find you by a landmark, a filling station, a bank, a
            plaza, write it in the description.
          </li>
          <li>
            <strong>Hours.</strong> HEFAMAA requires business hours to be clearly displayed on the
            premises. Use exactly those hours on Google, and update them for public holidays.
          </li>
          <li>
            <strong>Phone.</strong> A +234 number that is answered and runs WhatsApp, since that
            is where Lagos patients book.
          </li>
          <li>
            <strong>Photos.</strong> The signboard from the road, the entrance, the frame wall and
            the examination room with its equipment. A patient choosing between two clinics wants
            to see the slit lamp, not the logo again.
          </li>
        </ul>

        <h2 id="hefamaa">Show the HEFAMAA and ODORBN registrations on the website</h2>

        <p>
          A Lagos optician should state its registrations on its website because both are checkable
          facts that patients and AI systems can use to tell a properly run clinic from the rest.
          HEFAMAA, established in March 2006, states that no one may run a health facility in
          Lagos State on premises not registered with it, and lists Eye Clinic or Optical Centre
          as a category, with an optometrist or optician of at least five years’ post-qualification
          experience as operating officer.
        </p>

        <p>
          The professionals themselves are registered nationally by the Optometrists and
          Dispensing Opticians Registration Board of Nigeria, ODORBN, which issues registration
          certificates and publishes a process for reporting concerns about a practitioner. That
          gives a Lagos clinic two separate proofs: the premises and the people.
        </p>

        <p>
          Write both on the home page and the About page, in one plain sentence each, as text.
          The framed certificates behind the counter are excellent news for anyone already standing
          at the counter. Everyone still deciding is reading your website.
        </p>

        <h2 id="instagram">Why Instagram is not enough for AI visibility</h2>

        <p>
          Instagram is not enough because AI assistants and search engines build answers from text
          they can fetch and read, and an Instagram grid gives them very little. Prices inside a
          designed image, services in a highlight reel and an address in a story that expired
          last Tuesday are, to a crawler, mostly blank.
        </p>

        <p>
          Keep the Instagram page; it does its job with the people who already follow you. Add a
          small website alongside it that a machine can read without logging in or running
          scripts: the clinic name, area, address, hours, services, prices and registrations,
          written as sentences. Link the website from the Instagram bio and the Google profile, and
          use the same name and phone number on all three. When those details disagree, an
          assistant may treat them as different businesses, or ignore them all.
        </p>

        <p>
          To see what an assistant says about your practice today, follow{' '}
          <a href="/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa">
            our method for checking whether ChatGPT recommends your business
          </a>
          , or request our{' '}
          <Link href="/ai-visibility-check">free AI visibility check</Link>, which asks ChatGPT,
          Perplexity and Gemini and sends you the screenshots.
        </p>

        <h2 id="pages">Service pages with naira prices</h2>

        <p>
          An optical centre in Lagos needs one page per service, with a starting price in naira,
          because the page answers specific searches such as “contact lenses Lekki” that a profile
          cannot. The profile says where you are. The page says what you do, for whom, and what it
          costs.
        </p>

        <ul>
          <li>
            <strong>Eye test.</strong> Who performs it, how long it takes, whether to book, and
            the price.
          </li>
          <li>
            <strong>Glasses and lenses.</strong> Single vision, varifocal, blue-light coatings if
            you offer them, with starting prices and the usual turnaround in working days.
          </li>
          <li>
            <strong>Contact lenses.</strong> Fitting, follow-up and supplies.
          </li>
          <li>
            <strong>Children’s eye care.</strong> Parents search for it specifically, often before
            the school term starts.
          </li>
          <li>
            <strong>Repairs and adjustments.</strong> An urgent search that brings in patients who
            come back for their next pair.
          </li>
        </ul>

        <p>
          Prices vary by prescription, so give a starting point and say what moves it up. A page
          that answers every question with “call for price” has not answered a question; it has
          scheduled a phone call the patient was trying to avoid. A starting price written in
          naira is also the kind of concrete detail an assistant can quote when someone asks how
          much an eye test costs in Surulere.
        </p>

        <h2 id="reviews">Reviews from every patient, without filtering</h2>

        <p>
          Reviews matter for a Lagos optician because Google names the number of reviews and
          ratings among the signals of prominence, and an optical centre has a built-in moment to
          ask: the patient comes back to collect the glasses. Send the review link by WhatsApp at
          that moment, while they are reading their phone screen sharply for the first time in
          months.
        </p>

        <p>
          Ask every patient, not only the delighted ones. Google’s review policy does not allow
          a business to filter customers by satisfaction before asking, or to offer anything in
          exchange for a review. Reply to every review, and never mention a patient’s eye
          condition in a public reply. The Nigerian specifics, including how to build the link,
          are in{' '}
          <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
            our guide to getting more Google reviews in Nigeria
          </a>
          .
        </p>

        <h2 id="douala">How Lagos differs from what we found for Douala opticians</h2>

        <p>
          Lagos differs from Douala in who sits on page one and in which registration patients can
          check. Our{' '}
          <a href="/blog/visibilite-google-opticien-douala">
            guide for opticians in Douala
          </a>
          , written in French, found directories and a PDF list of opticians ranking above the
          practices. In Lagos the clinics’ own websites and Instagram profiles already hold page
          one, so the gap is less about getting listed and more about being readable.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Lagos</th>
                <th>Douala</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Who holds page one</td>
                <td>Clinics’ own sites and Instagram, the HEFAMAA page</td>
                <td>Directories, a PDF list on Scribd, social profiles</td>
              </tr>
              <tr>
                <td>Premises registration</td>
                <td>HEFAMAA, Lagos State</td>
                <td>Not covered in our Douala guide</td>
              </tr>
              <tr>
                <td>Professional register</td>
                <td>ODORBN, national</td>
                <td>Ordre National des Opticiens du Cameroun</td>
              </tr>
              <tr>
                <td>Distance problem</td>
                <td>Mainland and Island act as separate markets</td>
                <td>Districts such as Akwa and Bonapriso, one city</td>
              </tr>
              <tr>
                <td>Price currency</td>
                <td>Naira</td>
                <td>CFA franc</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The work is the same in both cities: a complete profile, readable pages, honest reviews.
          What a Lagos clinic adds is the double proof, premises and practitioner, which few of its
          competitors bother to write down.
        </p>

        <h2 id="order">The order of work for a Lagos optical centre</h2>

        <p>
          A Lagos optical centre should fix its Google profile first, its registrations and
          service pages second and its reviews continuously, because each step relies on the one
          before. A well-written contact lens page that sends patients to an unverified profile
          with an old phone number loses them at the last step.
        </p>

        <ol>
          {STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          The first three steps take a week and cost nothing. Service pages take a few days to
          write and some weeks to be picked up. Reviews take months, by nature. If you would rather
          hand the work over, our <Link href="/ai-seo/lagos">Lagos AI SEO service</Link> covers it,
          the <Link href="/pricing">pricing page</Link> sets out the plans, and{' '}
          <Link href="/research">AfriShield Research</Link> publishes the data we gather on how
          African businesses appear in AI answers.
        </p>

        <h2 id="skip">When this work is not worth doing</h2>

        <p>
          This work is not worth doing for a practice that cannot take more patients, or whose
          patients all arrive another way. An optical counter inside a hospital, fed by the
          ophthalmologists upstairs, does not need to rank for “optician Lagos”. A clinic booked
          three weeks ahead does not either, unless it is opening a second branch.
        </p>

        <p>
          It is also not worth paying anyone for the first three steps: the profile is free,
          verification is free, and we have just explained both at length, which our sales team
          describes as a bold strategy. And if the premises are not yet registered with HEFAMAA,
          start there. Better visibility brings patients who will eventually ask.
        </p>

        <p>
          Tolu has since claimed her profile, moved the pin onto the gate, and added a page for
          each service with a starting price in naira. Her home page now says, in one sentence,
          that the centre is registered with HEFAMAA and that both optometrists are registered
          with ODORBN. The carousel from February is still on Instagram. It remains very pretty.
        </p>
      </PostShell>
    </>
  );
}
