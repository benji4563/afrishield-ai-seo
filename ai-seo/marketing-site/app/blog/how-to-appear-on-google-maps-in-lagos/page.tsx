import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
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

const post = getPost('how-to-appear-on-google-maps-in-lagos')!;

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
  { id: 'what-it-takes', label: 'What it takes in Lagos' },
  { id: 'lagos-address', label: 'Entering a Lagos address Google can find' },
  { id: 'verification', label: 'Verification: expect video' },
  { id: 'profile-type', label: 'Shop, plaza unit or home business' },
  { id: 'area-searches', label: 'Showing for Lekki, Ikeja or Yaba searches' },
  { id: 'reviews', label: 'Getting reviews from Lagos customers' },
  { id: 'what-fails', label: 'What gets a listing suspended or ignored' },
  { id: 'when-not-to-pay', label: 'When not to pay anyone for this' },
  { id: 'one-week-plan', label: 'A one-week plan' },
];

const FAQ = [
  {
    q: 'Is it free to put my business on Google Maps in Nigeria?',
    a: 'Yes. A Google Business Profile costs ₦0 to create, verify and keep, in Lagos and everywhere else in Nigeria. Google states that there is no way to request or pay for a better local ranking. Anyone charging a fee is charging for their own time to set the profile up, not for the listing itself.',
  },
  {
    q: 'How long does it take to appear on Google Maps in Lagos?',
    a: 'Usually about a week from start to finish. Creating the profile takes under an hour, and Google says its review of a verification takes up to five business days. Where a postcard is the method offered, Google says most codes arrive within 14 days, so that route takes longer.',
  },
  {
    q: 'My Lagos address has no street number. What do I enter on Google?',
    a: 'Enter as much of the official address as exists, then set the location by placing the pin on the map by hand. Google allows a business to pin its location directly when an address has no street number or the system cannot find it. Its guidelines also permit cross-streets and nearby landmarks in regions where the official street address does not pinpoint the business.',
  },
  {
    q: 'Can I be on Google Maps in Lagos if I work from home?',
    a: 'Yes, as a service-area business. A caterer, mobile mechanic or makeup artist who travels to customers creates one profile, hides the home address and sets the areas served, such as Surulere, Yaba and Ikeja. Google asks that the service area stay within roughly two hours of driving time from the base.',
  },
  {
    q: 'Can I add Lekki or Ikeja to my business name to rank there?',
    a: 'No. Google requires the profile name to match the real-world name on the signboard, and it lists location information and service keywords among the things a name must not include. A stuffed name can get the profile suspended. To show for an area search, the business needs to be in or near that area and have a matching category.',
  },
  {
    q: 'Why is my Lagos business not showing on Google Maps?',
    a: 'The most common causes are an unverified profile, a map pin placed on the wrong building, a primary category that does not match the search, or a suspension for breaking the naming or address rules. Check verification status first, then open the listing on a phone and confirm the pin sits on the actual entrance.',
  },
];

const WEEK_PLAN = [
  {
    name: 'Day 1: search for an existing listing',
    text: 'Search Google Maps for the business name and the area. If a listing already exists, claim it rather than creating a second one, because duplicate profiles for one location break Google guidelines.',
  },
  {
    name: 'Day 1: create the profile with the real name and category',
    text: 'Use the exact name on the signboard and choose the single most specific primary category that describes what the business is.',
  },
  {
    name: 'Day 1: enter the address and place the pin by hand',
    text: 'Enter the official address with the shop or suite number on the second line, then adjust the pin so it sits on the actual entrance of the building.',
  },
  {
    name: 'Day 2: record the verification video on site',
    text: 'Record one continuous video of at least 30 seconds through the profile, showing the street and nearby landmarks, the signboard, and proof of management such as unlocking the shop.',
  },
  {
    name: 'Days 2 to 7: complete the profile while Google reviews',
    text: 'Add opening hours, a phone number that is answered, services, and photos of the entrance and interior. Do not change the name, address or category during the review.',
  },
  {
    name: 'From day 7: ask every customer for a review',
    text: 'Create the review link in the profile and send it by WhatsApp to each customer when the job is done, then reply to every review that arrives.',
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
        data={howToJsonLd(WEEK_PLAN, 'How to get a Lagos business onto Google Maps in one week')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To appear on Google Maps in Lagos, a business needs{' '}
          <strong>a free Google Business Profile that is verified</strong>, with the map pin
          placed on the actual building and a primary category that matches what customers
          search for. The profile costs ₦0. In Lagos the two steps that usually go wrong are
          the address, because many locations are described by landmark rather than street
          number, and verification, which Google now recommends doing by video. Once verified,
          Google ranks the listing on relevance, distance and prominence, so a business
          shows mainly for searches in or near its own area, such as Surulere, Ikeja or Lekki.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Kemi runs a small bakery in Surulere, a few turnings off Adeniran Ogunsanya
            Street. Her address, as customers know it, is &ldquo;opposite the filling station,
            after the second bus stop, the blue gate.&rdquo; Every dispatch rider in Lagos can
            find it, usually on the third phone call.
          </p>
          <p>
            Google could not. When she typed the address into the business profile form, it
            highlighted most of it in red. When she finally got a listing up, the pin sat in
            the middle of the road two streets away, and a customer left a one-star review
            for a bakery she had never managed to reach.
          </p>
          <p>
            Nothing was wrong with the bakery. The form simply assumed an address system
            that this part of Surulere was never issued.
          </p>
        </Scene>

        <p>
          We have already written the general guide to{' '}
          <a href="/blog/how-to-appear-on-google-maps">
            how Google Maps ranking works and the three factors behind it
          </a>
          . This is the Lagos version: the same rules, applied to a city of landmark
          addresses, shared plazas, home-run businesses and customers who search by district.
        </p>

        {/*
          Cluster N (Nigeria local / GBP) back-fill: when these queue rows publish, add
          in-body links from this post to them —
            row 34 /blog/how-to-get-more-google-reviews-in-nigeria (from #reviews)
            row 42 /blog/why-is-my-business-not-showing-on-google-maps-nigeria (from #what-fails)
        */}

        <h2 id="what-it-takes">What it takes to appear on Google Maps in Lagos</h2>

        <p>
          A Lagos business appears on Google Maps once four things are true: it has a Google
          Business Profile, the profile is verified, the map pin sits on the actual building,
          and the primary category matches what customers type. None of the four costs money.
          The profile is free, verification is free, and Google states plainly that there is
          no way to request or pay for a better local ranking.
        </p>

        <p>
          After that, Google decides who shows first using three factors it publishes:
          relevance, which is how well the profile matches the search; distance, which is how
          far the business is from the person searching; and prominence, which is how
          well-known the business is, including how many reviews it has and how many websites
          link to it. A verified profile with complete information is, in Google&rsquo;s
          words, more likely to show up in local results. Everything below is about getting
          those basics right in Lagos conditions.
        </p>

        <h2 id="lagos-address">Entering a Lagos address Google can find</h2>

        <p>
          Enter the official street address where one exists, put the shop or suite number on
          the second address line, and where Google cannot find the address, place the pin on
          the map by hand. Google allows exactly this: if an address has no street number, or
          the system cannot locate it, the business can pin its location directly on the map.
        </p>

        <p>
          Google&rsquo;s guidelines say cross-streets and nearby landmarks belong in an
          address only in regions where the official street address does not accurately
          pinpoint the business. That sentence was presumably written with somewhere else in
          mind, but it describes a good deal of Lagos. The form was designed by people who
          have never been told to turn left at the suya spot. In practice:
        </p>

        <ul>
          <li>
            <strong>Use the numbered address if the building has one.</strong> Street number,
            street name, area, Lagos. Add a landmark only if the number alone will not get a
            stranger to the door.
          </li>
          <li>
            <strong>In a plaza or shared building, add the unit.</strong> Dozens of
            businesses can share one address in Computer Village or along Allen Avenue. The
            shop number, floor or suite on the second line is what separates one listing from
            the next.
          </li>
          <li>
            <strong>Check the pin on a phone, zoomed in.</strong> Open the listing in the
            Maps app and confirm the pin sits on the actual entrance, not the middle of the
            road or the compound next door. If it is off, choose to adjust the pin and move
            the map until it is right.
          </li>
          <li>
            <strong>Write the address the same way everywhere.</strong> Website footer,
            Instagram bio, invoices, directory listings. Mismatched versions weaken the
            signal each mention is supposed to build, which{' '}
            <a href="/blog/local-seo-for-small-business">
              the local SEO checklist covers under name, address and phone consistency
            </a>
            .
          </li>
        </ul>

        <h2 id="verification">Verification in Lagos: expect video</h2>

        <p>
          Google chooses the verification method for each profile, the method cannot be
          changed, and where video is offered Google recommends using it. The other methods
          are a phone call or text, email, a live video call, and a postcard, but Google
          notes that the postcard is not available for all businesses.
        </p>

        <p>
          A verification video has rules, and they are strict. According to Google, it must
          be one unedited, continuous recording of at least 30 seconds, captured live on a
          mobile device through the Business Profile itself. A video recorded earlier and
          uploaded later is not accepted. For a business with a shopfront, it has to show
          three things:
        </p>

        <ol>
          <li>
            <strong>The location.</strong> Street signs, building numbers, neighbouring
            businesses or familiar places around the shop, so Google can match the spot to
            the pin.
          </li>
          <li>
            <strong>That the business exists.</strong> The shopfront and a permanent
            signboard carrying the same name as the profile.
          </li>
          <li>
            <strong>That you manage it.</strong> Something only staff can do: unlocking the
            door, opening the till, walking into the storeroom.
          </li>
        </ol>

        <p>
          Two Lagos-specific cautions. First, because the video is captured live, record it
          where the mobile signal holds; one bar of data halfway through a continuous take
          means starting again. Second, Google says the video must not include other
          people&rsquo;s faces, which on a busy street is easier at seven in the morning
          than at noon. After submission, Google says its review takes up to five business
          days. If a postcard is the method offered instead, most codes arrive within 14
          days and expire after 30, and editing the name, address or category while waiting
          cancels the code.
        </p>

        <h2 id="profile-type">Shop, plaza unit or home business: which profile to create</h2>

        <p>
          A business with permanent signage that receives customers at its premises lists its
          address, while a business that travels to customers or runs from home hides the
          address and sets a service area instead. Google allows one profile per business
          location, and the type you pick decides both what customers see and what the
          verification video must show.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Your situation</th>
                <th>How to list it</th>
                <th>What verification needs</th>
                <th>The usual mistake</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Own shopfront with a signboard</td>
                <td>Show the address, pin on the entrance</td>
                <td>Street, signboard, unlocking or operating the shop</td>
                <td>Pin left wherever Google first dropped it</td>
              </tr>
              <tr>
                <td>Unit inside a plaza or market complex</td>
                <td>Show the address with shop number and floor on line two</td>
                <td>The plaza from outside, then the walk to your own sign</td>
                <td>Sharing one generic plaza address with forty neighbours</td>
              </tr>
              <tr>
                <td>Home-based or mobile: caterer, makeup artist, mechanic who travels</td>
                <td>Hide the address, set a service area by district</td>
                <td>Neighbourhood landmarks, tools or branded items, a document in the business name</td>
                <td>Publishing a home address to look like a shop</td>
              </tr>
              <tr>
                <td>Virtual office or rented mailing address</td>
                <td>Not eligible for a profile at that address</td>
                <td>Not applicable</td>
                <td>
                  Listing it anyway. This works until it does not, which is the standard
                  warranty on shortcuts.
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Two details from Google&rsquo;s guidelines matter here. A business with no
          permanent on-site signage should be listed as a service-area business rather than a
          shopfront. And an office in a co-working space qualifies only if it has clear
          signage and is staffed by the business&rsquo;s own team during its stated hours. A
          service area should not extend much beyond two hours of driving from the base,
          which in Lagos traffic is a more modest radius than it sounds.
        </p>

        <h2 id="area-searches">Showing up for Lekki, Ikeja or Yaba searches</h2>

        <p>
          A profile shows for an area search when the business is physically in or near that
          area and its category and services match the query, because distance is one of the
          three factors Google ranks local results on. A tailor in Ikeja will not reliably
          show for &ldquo;tailor in Lekki,&rdquo; and no profile setting changes that.
        </p>

        <p>
          This matters more in Lagos than in most cities. In our experience Lagos customers
          search by district far more than by city name, because a trip from Ikoyi to Ikeja
          can swallow an afternoon and nobody wants a physiotherapist on the other side of
          Third Mainland Bridge. So the realistic goal is to be the obvious result in your
          own district first. What helps:
        </p>

        <ul>
          <li>
            <strong>A precise primary category.</strong> &ldquo;Bakery&rdquo; rather than
            &ldquo;Food service,&rdquo; &ldquo;Phone repair service&rdquo; rather than
            &ldquo;Electronics store.&rdquo; Google asks for the fewest, most specific
            categories that describe what the business is.
          </li>
          <li>
            <strong>Services and a description written plainly.</strong> List what you
            actually do and the districts you actually serve. That is information for
            customers, and it is allowed.
          </li>
          <li>
            <strong>A website page for your district.</strong> Prominence draws on the wider
            web, so a page that says what you do in Surulere, with the same address and
            phone number, supports the profile. This is the part of the job our{' '}
            <a href="/ai-seo/lagos">Lagos SEO service</a> spends most of its time on.
          </li>
          <li>
            <strong>A real second location, if you want a second area.</strong> One profile
            per staffed location. A branch in Lekki earns a Lekki listing; the word
            &ldquo;Lekki&rdquo; typed into the business name does not.
          </li>
        </ul>

        <h2 id="reviews">Getting reviews from Lagos customers</h2>

        <p>
          Ask every customer for a Google review at the moment the job is finished, and send
          the review link by WhatsApp, because that is where the conversation with a Lagos
          customer is already happening. Google confirms that more reviews and positive
          ratings can help a business&rsquo;s local ranking, and it lets a business create a
          review link or QR code from the profile to share with customers.
        </p>

        <p>
          Two rules keep this honest. Send the link to every customer, not only the ones who
          seemed pleased. A request that depends on the rating is review gating, and a
          profile with nothing but five-star reviews convinces nobody anyway. And never
          offer anything in return. Google strictly prohibits incentives
          such as free or discounted goods in exchange for posting, changing or removing a
          review. Then reply to the reviews, briefly and politely, including the bad ones.
          The ongoing routine of photos, posts and replies is covered in{' '}
          <a href="/blog/google-business-profile-optimization">
            our guide to Google Business Profile optimization
          </a>
          .
        </p>

        <h2 id="what-fails">What gets a Lagos listing suspended or ignored</h2>

        <p>
          Four mistakes most often sink a Lagos listing: keywords or area names added to the
          business name, a virtual office used as the address, duplicate profiles for one
          location, and a pin placed in the wrong spot. The first three break Google&rsquo;s
          guidelines and can lead to suspension; the fourth simply sends customers elsewhere.
        </p>

        <ul>
          <li>
            <strong>A stuffed name.</strong> &ldquo;Kemi&rsquo;s Bakery&rdquo; is a name.
            &ldquo;Kemi&rsquo;s Bakery Best Cakes Surulere Lagos Birthday Wedding&rdquo; is a
            keyword list. Google says the name must match the one on the signboard and must
            not include service or location information.
          </li>
          <li>
            <strong>An address the business does not operate from.</strong> Rented mailing
            addresses and virtual offices are not eligible.
          </li>
          <li>
            <strong>A second profile for the same place.</strong> Often created by accident
            when a previous staff member or web designer made the first one. Claim the
            original instead of starting again.
          </li>
          <li>
            <strong>Unreachable contact details.</strong> Google asks for a phone number
            under the direct control of the business. A number that rings out teaches
            customers to pick the next result.
          </li>
        </ul>

        <h2 id="when-not-to-pay">When not to pay anyone for this</h2>

        <p>
          A single-location Lagos business does not need to pay anyone to appear on Google
          Maps, because the profile costs ₦0 and the setup is an afternoon of work plus a
          short video. We sell this kind of work and are telling you most of it is free;
          nobody has ever accused us of being good at sales.
        </p>

        <p>
          Paying starts to make sense in three situations. The listing has been suspended and
          needs to be reinstated properly. There are several branches, each needing its own
          profile, page and review routine. Or the category is crowded, such as dentists on
          Victoria Island or estate agents in Lekki, where every competitor is already
          verified and the difference is made by the website, the reviews and the content
          around the profile. That is ongoing work, and{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>{' '}
          sets out what it should cost in naira. Our own plans start at USD 150 a month,
          about ₦205,000 at the end-of-September rate used in that guide, and the detail is
          on the <a href="/pricing">pricing page</a>.
        </p>

        <p>
          It is also fair to say that Maps is not for everyone. A business that sells
          nationwide by delivery and takes its orders through Instagram has customers who do
          not search by location at all. A listing will do no harm, but it is not where that
          business grows.
        </p>

        <h2 id="one-week-plan">A one-week plan for a Lagos business</h2>

        <p>
          A Lagos business can go from invisible to verified on Google Maps in about a week,
          and most of that week is waiting for Google to review the verification. The work
          itself fits into two short sessions.
        </p>

        <ol>
          <li>
            <strong>Day 1: search for an existing listing.</strong> Look for the business
            name on Google Maps. If a listing exists, claim it rather than creating another.
          </li>
          <li>
            <strong>Day 1: create the profile.</strong> The exact name on the signboard, and
            the single most specific primary category.
          </li>
          <li>
            <strong>Day 1: enter the address and place the pin by hand.</strong> Shop or
            suite number on line two, pin on the entrance.
          </li>
          <li>
            <strong>Day 2: record the verification video on site.</strong> One continuous
            take of at least 30 seconds: the street, the signboard, then proof you run the
            place.
          </li>
          <li>
            <strong>Days 2 to 7: complete the profile.</strong> Hours, a phone number that
            is answered, services, photos of the entrance and interior. Leave the name,
            address and category alone while Google reviews.
          </li>
          <li>
            <strong>From day 7: ask every customer for a review.</strong> Create the review
            link, send it by WhatsApp, and reply to what comes in.
          </li>
        </ol>

        <p>
          Kemi moved her pin onto the blue gate, recorded the video before the street woke
          up, and was verified four days later. Her listing now shows the right building, and
          the one-star review has company. Last week a new dispatch rider found the bakery
          on the first attempt, without calling. She says she almost missed the phone
          ringing.
        </p>
      </PostShell>
    </>
  );
}
