import Link from 'next/link';
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

const post = getPost('why-is-my-business-not-showing-on-google-maps-nigeria')!;

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
  { id: 'one-search', label: 'The one search that sorts the problem' },
  { id: 'nothing-appears', label: 'Nothing appears for your name' },
  { id: 'suspended', label: 'If the profile is suspended' },
  { id: 'not-ranking', label: 'Found by name, missing for service searches' },
  { id: 'wrong-place', label: 'Wrong pin or two listings' },
  { id: 'edits', label: 'Edits, re-verification and waiting' },
  { id: 'when-not-to-pay', label: 'When not to pay anyone for this' },
  { id: 'twenty-minutes', label: 'A 20-minute diagnostic' },
];

const FAQ = [
  {
    q: 'Why is my business not showing on Google Maps in Nigeria?',
    a: 'The usual causes are a missing profile, a profile that was never verified, a suspended profile, a profile that is live but ranks below nearer competitors, or a map pin on the wrong spot. Search the exact business name on Google Maps first. If nothing appears, check verification and suspension status. If the name appears, the problem is ranking or the pin.',
  },
  {
    q: 'Why does my business show when I search its name but not when I search for my service?',
    a: 'Because the profile exists but is not winning the ranking. Google says local results are mainly based on relevance, distance and prominence. A profile with the wrong primary category, incomplete details, few reviews or a location far from the searcher will appear for its own name and still lose to closer, better-matched businesses on service searches.',
  },
  {
    q: 'Does having a website put my business on Google Maps?',
    a: 'No. A website appears in Google Search results, but Google Maps shows Business Profiles. Google states that to show a business on Search, Maps and other Google services it must be added or claimed and then verified. A business with a website and no verified profile can be missing from Maps entirely.',
  },
  {
    q: 'My Google Business Profile was suspended. Should I create a new one?',
    a: 'No. Google says explicitly not to create a new Business Profile for the same business. Fix the cause of the suspension, such as a keyword-stuffed name or an ineligible address, then submit one appeal through the Business Profile appeals tool with evidence such as a business registration or a utility bill that matches the profile name and address.',
  },
  {
    q: 'My business disappeared from Google Maps after I changed its name or address. Why?',
    a: 'Google reviews profile edits before they go live. It also says that changing a business name after verification can require verification again, and that moving to a new address after verification requires verifying again. Until that is completed, the profile may not show as before. Make one change at a time and check the status in the profile.',
  },
  {
    q: 'Can I pay Google to show my business higher on Maps?',
    a: 'No. Google states that there is no way to request or pay for a better local ranking. A Business Profile costs nothing to create or verify. Ranking improves through a verified profile, a precise category, complete information, genuine reviews and a wider web presence that links to the business.',
  },
];

const DIAGNOSTIC = [
  {
    name: 'Search the exact business name on Google Maps on a phone',
    text: 'Type the name exactly as it appears on the signboard. Note whether the business appears, appears in the wrong place, or does not appear at all.',
  },
  {
    name: 'Open the Business Profile dashboard and read the status',
    text: 'Sign in with the Google account that created the profile. Look for a verification prompt or a suspension notice, and try each email address the business has used if the profile is not found.',
  },
  {
    name: 'Check the name, address and pin against the rules',
    text: 'The name must match the signboard with no services or locations added, the address must be a real operating location, and the pin must sit on the actual entrance.',
  },
  {
    name: 'Check the primary category and the basic details',
    text: 'Choose the most specific primary category for the main business, then confirm hours, a phone number that is answered and a description of what is offered.',
  },
  {
    name: 'Search for a service near the business and compare',
    text: 'Search the service with the area name, such as tailor in Wuse, and compare the profile with the top three results for category, reviews and photos.',
  },
  {
    name: 'Fix one thing at a time and record the date',
    text: 'Make a single change, note the date, and wait for Google to review it before changing anything else, because edits to name or address can trigger verification again.',
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
        data={howToJsonLd(
          DIAGNOSTIC,
          'How to find out why a Nigerian business is not showing on Google Maps',
        )}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          A business is not showing on Google Maps in Nigeria because its Business Profile is{' '}
          <strong>missing, unverified, suspended, ranking below nearer competitors, or pinned
          in the wrong place</strong>. The quickest way to tell which is to search for the exact
          business name on Google Maps. If nothing appears, check verification and suspension
          status. If the name appears but service searches do not show it, the profile is live
          but losing on relevance, distance or prominence, the three factors Google says
          local results are mainly based on. Google states that no payment can improve that
          ranking.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Hadiza is a tailor with a stall in Wuse Market, Abuja. Customers find her the
            way customers have always found her: a cousin sends a WhatsApp pin, a friend
            says &ldquo;ask for Hadiza, she is behind the pharmacy,&rdquo; and someone
            eventually arrives holding a phone at arm&rsquo;s length.
          </p>
          <p>
            One afternoon she typed her own shop name into Google Maps, expecting to see
            herself. She saw a florist two streets over, a dry cleaner, and a tailor in
            another city. The profile her nephew had created for her a year earlier was
            nowhere to be found, which was odd, because it had her name on it.
          </p>
          <p>
            Nothing was wrong with the tailoring. The profile had simply never finished
            becoming a profile.
          </p>
        </Scene>

        <p>
          This is the troubleshooting companion to our guides on{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            how to get a Nigerian business onto Google Maps in the first place
          </a>{' '}
          and on{' '}
          <a href="/blog/how-to-appear-on-google-maps">
            how Google Maps ranking works in general
          </a>
          . Those explain how to set a profile up. This one starts from the opposite
          position: the profile exists, or should, and Google is not showing it. The fix
          depends entirely on which of three situations you are in, so the first job is
          finding out.
        </p>

        <h2 id="one-search">The one search that sorts the problem</h2>

        <p>
          Search for the exact business name on Google Maps, on a phone, and the result puts
          the problem into one of three groups: nothing found, found for the name but not
          for the service, or found in the wrong place. Each group has a different cause and
          a different fix, which is why guessing at fixes before running this search wastes
          weeks.
        </p>

        <p>
          It takes under a minute, which is less time than most agencies take to schedule
          the introductory call. Use the name as it appears on the signboard, not the
          version in your Instagram bio. Then read the result against this table.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What you see</th>
                <th>What it usually means</th>
                <th>Where to look</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No result for the business name at all</td>
                <td>No profile, an unverified profile, or a suspended one</td>
                <td>Profile dashboard: verification prompt or suspension notice</td>
              </tr>
              <tr>
                <td>Appears for the name, not for &ldquo;tailor in Wuse&rdquo;</td>
                <td>Live profile that is losing the ranking</td>
                <td>Primary category, completeness, reviews, distance</td>
              </tr>
              <tr>
                <td>Appears, but the pin is on the wrong building or road</td>
                <td>Address or pin problem</td>
                <td>Address lines and the pin position</td>
              </tr>
              <tr>
                <td>Appears twice</td>
                <td>Duplicate profiles for one location</td>
                <td>Claim the original, do not start a third</td>
              </tr>
              <tr>
                <td>Appears with an old name or address</td>
                <td>An edit awaiting review, or re-verification pending</td>
                <td>Edit status and verification prompt</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="nothing-appears">When nothing appears for your business name</h2>

        <p>
          A business that does not appear for its own name has usually never been verified,
          has no profile at all, or has been suspended. Google states that to show a
          business on Search, Maps and its other services, the profile must be added or
          claimed and then verified. A website does not substitute for this, because Maps
          lists Business Profiles rather than web pages.
        </p>

        <ul>
          <li>
            <strong>No profile exists.</strong> Before creating one, search for an existing
            listing and claim it. Google&rsquo;s guidelines say there should be only one
            profile per business, so a second one creates the next problem.
          </li>
          <li>
            <strong>A profile exists but was never verified.</strong> This is the most common
            case in practice, and it is Hadiza&rsquo;s. Someone else, a nephew, a web
            designer or a former employee, creates the profile on their own Google account
            and the verification prompt goes to them. Find out which account created it,
            then finish verification from there or have ownership transferred to you.
          </li>
          <li>
            <strong>The profile is suspended.</strong> Covered in the next section, because
            the fix is specific and the wrong move is expensive.
          </li>
          <li>
            <strong>The business has no address to show.</strong> A home-based or mobile
            business should hide its address and set a service area, which is what
            Google&rsquo;s guidelines ask service-area businesses to do. A hidden street
            address is a setting, not a fault.
          </li>
        </ul>

        <p>
          If verification is the blocker, the video method and its rules are set out in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos#verification">
            the verification section of our Lagos guide
          </a>
          , and the same rules apply in Abuja, Port Harcourt or anywhere else in Nigeria.
        </p>

        <h2 id="suspended">If the profile is suspended: appeal, do not start again</h2>

        <p>
          A suspended profile is fixed by correcting what broke Google&rsquo;s guidelines and
          then submitting an appeal through Google&rsquo;s appeals tool, not by creating a
          new profile. Google&rsquo;s own instruction on the appeals page is explicit: do
          not create a new Business Profile for the same business.
        </p>

        <p>
          Creating a replacement after a suspension is the local-search equivalent of
          changing your name to avoid a parking ticket. It adds a duplicate to the original
          problem. The practical order is:
        </p>

        <ol>
          <li>
            <strong>Find the breach.</strong> The usual ones from Google&rsquo;s guidelines
            are a business name carrying taglines, services or location details; a virtual
            office or rented mailing address; more than one profile for a location; and a
            phone number the business does not control.
          </li>
          <li>
            <strong>Fix it first.</strong> Appeals can only be submitted once, according to
            Google, so the profile must already follow the guidelines when you send it.
          </li>
          <li>
            <strong>Gather evidence that matches the profile.</strong> Google lists official
            business registration, a business licence, tax certificates and business utility
            bills such as electricity, phone, water or internet. A CAC registration
            certificate is the obvious Nigerian example, where the business has one. The
            business name and address on each document should match the profile.
          </li>
          <li>
            <strong>Submit one appeal.</strong> Google emails the decision. If an appeal is
            denied, Google says an additional review can be requested with evidence that
            was not in the first appeal.
          </li>
        </ol>

        <p>
          Google also notes that an account can be restricted for policy violations, in
          which case the profiles it manages are suspended and new ones cannot be created or
          claimed. That is a separate appeal, made from the account&rsquo;s restrictions page
          first.
        </p>

        <h2 id="not-ranking">Found by name, but missing for service searches</h2>

        <p>
          A profile that appears for its own name but not for a service search is live and
          simply losing, because Google says local results are mainly based on relevance,
          distance and prominence. Nothing is broken, which also means nothing can be
          &ldquo;fixed&rdquo; in an afternoon.
        </p>

        <p>
          Each of the three factors has something you control and something you do not:
        </p>

        <ul>
          <li>
            <strong>Relevance, which you control.</strong> Google says complete and
            accurate information makes a profile more likely to appear. The primary category
            matters most here. Google asks for the fewest categories that describe the core
            business, as specific as possible, and to treat each as completing the sentence
            &ldquo;this business is a&hellip;&rdquo; rather than &ldquo;this business
            has a&hellip;&rdquo;. A tailor listed under &ldquo;Clothing store&rdquo; is
            competing for a different search.
          </li>
          <li>
            <strong>Distance, which you cannot control.</strong> Google ranks by how far each
            business is from the person searching. A shop in Wuse will not reliably beat a
            nearer shop for someone standing in Garki. The realistic goal is to be the
            obvious result in your own district first.
          </li>
          <li>
            <strong>Prominence, which you influence slowly.</strong> Google says this draws on
            how many websites link to the business and how many reviews it has, and that more
            reviews and positive ratings can help. Ask every customer, not only the happy
            ones, as{' '}
            <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
              our guide to getting more Google reviews in Nigeria
            </a>{' '}
            sets out.
          </li>
        </ul>

        <p>
          The weekly habits that keep a live profile competitive, photos, services, replies
          and posts, are covered in{' '}
          <a href="/blog/google-business-profile-optimization">
            our guide to Google Business Profile optimization
          </a>
          , and the wider web signals in{' '}
          <a href="/blog/local-seo-for-small-business">the local SEO checklist</a>. None of it
          is a switch. Expect weeks, and be suspicious of anyone who promises a date.
        </p>

        <h2 id="wrong-place">Wrong pin, wrong building or two listings</h2>

        <p>
          A pin on the wrong spot is fixed by moving it by hand, and a duplicate listing is
          fixed by claiming the original rather than creating another. Google allows a
          business to pin its location directly on the map when an address has no street
          number or the system cannot find it, which describes a large part of Nigeria.
        </p>

        <ul>
          <li>
            <strong>Check the pin on a phone, zoomed in.</strong> It should sit on the
            entrance, not in the road or the compound next door. A customer who follows a
            pin to the wrong gate does not blame the pin.
          </li>
          <li>
            <strong>Put the shop or suite number on address line two.</strong> Google lists
            suite numbers and floors as acceptable, and says cross-streets and landmarks
            belong only where the official address does not pinpoint the business.
          </li>
          <li>
            <strong>Find the duplicates and claim them.</strong> Old addresses, a listing
            built from an Instagram page and a profile made by a former designer are the
            usual sources. Google says one profile per business, since duplicates cause
            problems with how information displays on Maps and Search.
          </li>
          <li>
            <strong>Use the same name and phone number format everywhere.</strong> The
            signboard, Instagram, invoices and the profile should agree.
          </li>
        </ul>

        <h2 id="edits">Edits, re-verification and how long to wait</h2>

        <p>
          Google reviews profile edits before they go live, so a change is not instant, and
          changing a verified business name or moving to a new address can require
          verification again. This is the quiet cause of many &ldquo;it was fine last
          week&rdquo; cases: someone tidied the profile and unverified it in the process.
        </p>

        <p>
          The practical rules are short. Change one thing at a time. Write the date down.
          Do not change the name, address or category again while a previous change or a
          verification is pending, because stacking edits makes it impossible to tell which
          one caused a problem. And when the profile has an unfinished verification, finish
          that before anything else.
        </p>

        <h2 id="when-not-to-pay">When not to pay anyone for this</h2>

        <p>
          A single-location business does not need to pay anyone to diagnose most of this,
          because the search takes a minute, the profile and its verification cost nothing,
          and the fixes above are afternoon-sized. We sell SEO and are telling you that
          most of this problem is a free checklist, which is the sort of candour that does
          not usually survive a sales meeting.
        </p>

        <p>
          Paying starts to make sense in three situations: a suspension that one appeal has
          not resolved, several branches that each need their own profile and review
          routine, and a crowded category where every competitor is already verified and the
          difference is made by the website, the reviews and the pages around the profile.
          That is ongoing work. Our{' '}
          <Link href="/ai-seo/lagos">Lagos</Link> and{' '}
          <Link href="/ai-seo/abuja">Abuja</Link> services cover it, the{' '}
          <Link href="/pricing">pricing page</Link> sets out the plans, and{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>{' '}
          gives the market rates in naira so you can compare.
        </p>

        <p>
          Maps is also not where every business grows. A seller who ships nationwide and
          takes orders through Instagram has customers who do not search by location, and a
          perfect profile will not change that.
        </p>

        <h2 id="twenty-minutes">A 20-minute diagnostic</h2>

        <p>
          A Nigerian business can find out why it is not showing on Google Maps in about
          twenty minutes, by working through the same six checks in order and changing
          nothing until the cause is known.
        </p>

        <ol>
          <li>
            <strong>Search the exact business name on Google Maps on a phone.</strong> Note
            whether it appears, appears in the wrong place, or does not appear.
          </li>
          <li>
            <strong>Open the profile dashboard and read the status.</strong> Look for a
            verification prompt or a suspension notice, using the Google account that
            created the profile.
          </li>
          <li>
            <strong>Check the name, address and pin.</strong> Signboard name only, a real
            operating address, pin on the entrance.
          </li>
          <li>
            <strong>Check the primary category and the basics.</strong> The most specific
            category, hours, a phone number that is answered.
          </li>
          <li>
            <strong>Search the service with your area name and compare.</strong> Look at the
            top three results for category, reviews and photos.
          </li>
          <li>
            <strong>Fix one thing at a time and write down the date.</strong> Then wait for
            Google to review it before touching anything else.
          </li>
        </ol>

        <p>
          Hadiza&rsquo;s nephew found the Gmail account the profile had been created on, and
          the verification prompt had been sitting in it for a year. She verified it by video
          in the shop, moved the pin onto the right gate, and changed the category from
          &ldquo;Clothing store&rdquo; to &ldquo;Tailor.&rdquo; Last month a customer found
          her without a cousin. She says she still sends the WhatsApp pin out of habit, in
          case Google is only being polite.
        </p>
      </PostShell>
    </>
  );
}
