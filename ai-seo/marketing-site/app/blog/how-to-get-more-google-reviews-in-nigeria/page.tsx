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

const post = getPost('how-to-get-more-google-reviews-in-nigeria')!;

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
  { id: 'what-works', label: 'What actually gets reviews in Nigeria' },
  { id: 'review-link', label: 'Creating the review link and QR code' },
  { id: 'whatsapp-ask', label: 'Asking on WhatsApp, at the right moment' },
  { id: 'why-they-do-not-post', label: 'Why customers agree and never post' },
  { id: 'by-business-type', label: 'Where to ask, by type of business' },
  { id: 'what-google-forbids', label: 'What Google forbids, and the penalty' },
  { id: 'replying', label: 'Replying, and reviews that disappear' },
  { id: 'when-not-to-pay', label: 'When not to pay anyone for this' },
  { id: 'thirty-day-plan', label: 'A 30-day review routine' },
];

const FAQ = [
  {
    q: 'How do I get my Google review link in Nigeria?',
    a: 'Open your Google Business Profile, select Read reviews, then Get more reviews, and copy the link. The same screen offers a QR code, which Google says can currently only be generated from a computer browser, not a phone. The link works the same in Nigeria as anywhere else and costs nothing.',
  },
  {
    q: 'Can I give customers a discount for leaving a Google review?',
    a: 'No. Google prohibits offering incentives such as payment, discounts, or free goods and services in exchange for posting a review, changing one, or removing a negative one. Reviews collected that way are treated as fake engagement and removed, and the business profile itself can be restricted.',
  },
  {
    q: 'Does a customer need a Gmail account to leave a Google review?',
    a: 'A customer needs a Google Account, but not a Gmail address. Google says a Google Account can be created with any existing email address. Most customers with an Android phone already have a Google Account signed in, even if they never use the email attached to it.',
  },
  {
    q: 'Why are my Google reviews disappearing?',
    a: 'Google removes reviews that break its content policies and uses automated spam detection that, by its own account, can remove some legitimate reviews too. A sudden burst of reviews, reviews from staff or relatives, or reviews prompted by an incentive are common triggers. Google states that reviews removed for policy violations are not reinstated.',
  },
  {
    q: 'How many Google reviews does a Nigerian business need?',
    a: 'Google publishes no target number. It says more reviews and positive ratings can help local ranking, so the practical benchmark is the businesses that appear above you for your main search in your own area. A steady flow of recent reviews matters more than a large total collected years ago.',
  },
  {
    q: 'Can I delete a bad Google review of my business?',
    a: 'No. A business cannot delete a customer review. It can report a review that breaks Google policy, such as spam, offensive content or a review from someone who was never a customer, and Google decides whether to remove it. For a genuine complaint, a calm public reply is the right response.',
  },
];

const ROUTINE = [
  {
    name: 'Day 1: create the review link and QR code',
    text: 'In the Business Profile, open Read reviews, then Get more reviews. Copy the link, and download the QR code from a computer browser.',
  },
  {
    name: 'Day 1: write one WhatsApp message and save it',
    text: 'Write a short message that thanks the customer by name, asks for an honest review and includes the link. Save it as a quick reply in WhatsApp Business so every staff member sends the same text.',
  },
  {
    name: 'Day 2: put the QR code where customers wait',
    text: 'Print the QR code on receipts, at the counter and on delivery packaging, with one line asking for an honest review. Do not ask customers to post it before they leave.',
  },
  {
    name: 'Days 2 to 30: ask every customer when the job is done',
    text: 'Send the saved message to every customer at the moment the service is complete, whatever their experience was. Do not choose who to ask based on how pleased they seemed.',
  },
  {
    name: 'Every week: reply to every new review',
    text: 'Reply briefly and specifically to each review, positive or negative, without sharing any private details about the customer.',
  },
  {
    name: 'Day 30: compare against the businesses above you',
    text: 'Search your main service and area on Google Maps, note the review counts and dates of the businesses ranked above you, and set the next month of asking against that benchmark.',
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
        data={howToJsonLd(ROUTINE, 'A 30-day Google review routine for a Nigerian business')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To get more Google reviews in Nigeria, <strong>send every customer your Google
          review link on WhatsApp at the moment the job is finished</strong>, put the review
          QR code on receipts and at the counter, and reply to every review that arrives. The
          link and QR code are free from your Google Business Profile. Customers need a Google
          Account, not necessarily Gmail, to post. Google forbids paying for reviews, offering
          discounts in exchange, asking only happy customers, and setting staff review
          quotas, and it can block a profile from receiving new reviews when it catches any of
          these.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Chioma runs a hair salon in Wuse 2, Abuja. Her chairs are full most Saturdays, her
            regulars have been coming for years, and her Google profile has four reviews, two
            of them from 2023.
          </p>
          <p>
            It is not for lack of asking. Over one month she counted forty customers who said,
            warmly and sincerely, &ldquo;I will do it later.&rdquo; Two of them did. The salon
            across the road, which she is fairly sure opened after hers, has ninety-one
            reviews and sits above her every time someone searches for a salon in Wuse.
          </p>
          <p>
            Nothing was wrong with the salon. The asking was the problem: a verbal request, at
            the till, to customers who would have had to search for the business, find the
            right listing and remember to do it after the generator noise and the traffic home.
          </p>
        </Scene>

        <p>
          Reviews already appear as one item on{' '}
          <a href="/blog/google-business-profile-optimization">
            our Google Business Profile optimization checklist
          </a>{' '}
          and in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            our guide to appearing on Google Maps in Lagos
          </a>
          . This post is the whole routine for a Nigerian business: the link, the message,
          the timing, the rules Google enforces, and what happens to profiles that try to
          shortcut it.
        </p>

        <h2 id="what-works">What actually gets Google reviews in Nigeria</h2>

        <p>
          What gets Google reviews in Nigeria is a direct review link sent on WhatsApp at the
          moment the customer is satisfied, repeated for every customer, every week. Google
          confirms that more reviews and positive ratings can help a business&rsquo;s local
          ranking, and reviews also sit beside the profile in Maps and Search, where a
          customer comparing two businesses reads them before choosing.
        </p>

        <p>
          Three things decide whether a request turns into a review. The first is effort: a
          link that opens the review box directly gets used, while &ldquo;search for us on
          Google&rdquo; does not. The second is timing: the request lands best within the hour
          the service ends, while the customer still remembers it. The third is consistency:
          asking every customer, rather than in occasional bursts, produces the steady stream
          of recent reviews that both Google and customers read as a sign of a business that
          is open and busy. None of these require software, a budget or the cousin who knows
          computers.
        </p>

        <h2 id="review-link">Creating your Google review link and QR code</h2>

        <p>
          Your review link and QR code are created inside your Google Business Profile: open
          the profile, select Read reviews, then Get more reviews, and copy the link. The link
          opens the review box for your business directly, so the customer does not have to
          search for you. Your profile must be verified first; if it is not, start with{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">the Maps setup guide</a>.
        </p>

        <ul>
          <li>
            <strong>Make the QR code on a computer.</strong> Google says the reviews QR code
            can currently only be generated from a computer browser, not a phone. Right-click
            it and save the image.
          </li>
          <li>
            <strong>Test the link on a phone.</strong> Open it on an Android phone with mobile
            data, not office Wi-Fi, and confirm it lands on your business and not a
            similarly named one.
          </li>
          <li>
            <strong>Put it everywhere a customer already looks.</strong> Google itself
            suggests receipts, thank-you messages, the end of a chat conversation and a
            printed QR code in the shop.
          </li>
        </ul>

        <h2 id="whatsapp-ask">Asking on WhatsApp, at the right moment</h2>

        <p>
          The most effective request is a short WhatsApp message with the review link, sent to
          each customer by name as soon as the service is complete. Google lists WhatsApp as
          one of the channels a business can use to share its review link, and for most
          Nigerian businesses it is where the customer conversation already lives. WhatsApp
          is, for practical purposes, the real CRM of Nigerian small business; it simply has
          never been introduced to Google.
        </p>

        <p>A message that works is short, personal and neutral about the rating:</p>

        <blockquote>
          <p>
            Good evening Mrs Bello, thank you for coming in today. If you have a minute, we
            would value an honest review on Google. It helps other people in Wuse find us:
            [your review link]
          </p>
        </blockquote>

        <p>
          Save it as a quick reply in WhatsApp Business so every member of staff sends the
          same words. Then adjust only the timing to fit the business. A salon or barber sends
          it when the customer leaves. A mechanic sends it when the car is collected, not when
          it is dropped off. A caterer sends it the morning after the event, once the guests
          have gone and the host can think again. A clinic sends it after the visit, never in
          the waiting room. Send it once, and follow up at most once a few days later.
        </p>

        <h2 id="why-they-do-not-post">Why Nigerian customers agree and never post</h2>

        <p>
          Customers who promise a review and never post are usually stopped by friction, not
          unwillingness: they cannot find the business, are not signed into a Google Account,
          or are wary of posting under their own name. Each of those has a fix.
        </p>

        <ul>
          <li>
            <strong>&ldquo;I could not find you.&rdquo;</strong> Solved by the direct link.
            Never ask a customer to search, because a search may show a competitor with a
            similar name first.
          </li>
          <li>
            <strong>&ldquo;I do not have Gmail.&rdquo;</strong> Google says a reviewer must be
            signed into a Google Account but can create one with any existing email address.
            In practice, most Android phones already have a Google Account signed in, which
            is worth telling the customer, briefly.
          </li>
          <li>
            <strong>&ldquo;Everyone will see my name.&rdquo;</strong> True, and worth being
            honest about. Google does not allow anonymous reviews; the name on the
            reviewer&rsquo;s Google profile appears with the review. Some customers,
            particularly at clinics and law offices, will decline for that reason, and that
            is their choice to make.
          </li>
          <li>
            <strong>&ldquo;Later.&rdquo;</strong> The most common one. A link they can tap
            while still on the bus home turns later into now more often than a verbal request
            at the counter ever will.
          </li>
        </ul>

        <h2 id="by-business-type">Where to ask, by type of Nigerian business</h2>

        <p>
          The right place to ask depends on where the business last talks to the customer: on
          WhatsApp for service businesses, on the receipt or package for retail and delivery,
          and at checkout or follow-up for hotels and clinics. The table below sets out the
          usual best moment for common Nigerian business types.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Best moment to ask</th>
                <th>Best channel</th>
                <th>The usual mistake</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Salon, barber, spa</td>
                <td>As the customer leaves</td>
                <td>WhatsApp message, QR code at the mirror</td>
                <td>Asking verbally and trusting memory</td>
              </tr>
              <tr>
                <td>Mechanic, generator or AC repair</td>
                <td>When the job is collected or confirmed working</td>
                <td>WhatsApp message with the invoice</td>
                <td>Asking before the customer has tested the repair</td>
              </tr>
              <tr>
                <td>Restaurant, bakery, food vendor</td>
                <td>With the receipt or delivery</td>
                <td>QR code on receipts and packaging</td>
                <td>Asking diners to post at the table before they leave</td>
              </tr>
              <tr>
                <td>Clinic, pharmacy, law office</td>
                <td>After the visit, never during it</td>
                <td>A follow-up message, sent once</td>
                <td>Confirming private details when replying to a review</td>
              </tr>
              <tr>
                <td>Hotel, shortlet, guest house</td>
                <td>At checkout or the day after</td>
                <td>WhatsApp or email follow-up, QR at reception</td>
                <td>
                  Leaving it to the booking platform, which collects the review for its own
                  site and not for your Google profile. The platforms are generous like that.
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="what-google-forbids">What Google forbids, and what happens to profiles that break it</h2>

        <p>
          Google forbids offering any incentive for a review, asking only satisfied customers,
          discouraging negative reviews, pressuring customers to review on the premises, and
          posting reviews from staff, relatives or anyone else with a conflict of interest. Its
          policy allows a business to ask for reviews, provided it does not offer anything in
          return or try to influence the rating or the content.
        </p>

        <p>The specific rules in Google&rsquo;s Maps content policy:</p>

        <ul>
          <li>
            <strong>No incentives.</strong> No payment, discount, free item or service in
            exchange for posting a review, changing one, or removing a negative one. A
            &ldquo;10 percent off your next visit for a review&rdquo; sign is a breach.
          </li>
          <li>
            <strong>No review gating.</strong> A business must not selectively ask positive
            customers, or discourage negative reviews. Sending the link only to customers who
            answered &ldquo;yes&rdquo; to &ldquo;were you happy?&rdquo; is exactly this.
          </li>
          <li>
            <strong>No staff quotas.</strong> Google names merchants requesting that staff
            collect a certain number of reviews, or reviews that mention a staff member, as
            prohibited.
          </li>
          <li>
            <strong>No pressure on the premises.</strong> A business should not require or
            pressure customers to rate it while they are still there, or tell them what to
            write.
          </li>
          <li>
            <strong>No reviews from insiders.</strong> Current or former employees, family
            members and contractors have a conflict of interest, and Google lists their
            reviews as rating manipulation.
          </li>
        </ul>

        <p>
          Bought reviews are the shortcut that tempts most, and the consequences are
          specific. Google says that when it finds a business has violated its fake
          engagement policy, it removes the reviews and may restrict the profile: blocking new
          reviews for a set period, unpublishing existing reviews for a set period, or showing
          a warning on the profile telling customers that fake reviews were removed. Google
          notifies the owner by email and allows an appeal. Five hundred glowing reviews in a
          week from accounts that have never reviewed anything else are not subtle, however
          reasonable the vendor&rsquo;s price per review sounded.
        </p>

        <h2 id="replying">Replying to reviews, and why some disappear</h2>

        <p>
          Reply to every review, briefly and specifically, and never share private details
          about the customer; Google says replies are public, must follow its policies, and
          should be short, conversational and not promotional. Only a verified profile can
          reply. For a negative review, Google advises acknowledging the complaint, explaining
          honestly what the business can and cannot do, apologising where it is due, and
          inviting the customer to resolve the matter by phone or email.
        </p>

        <p>
          For clinics, pharmacies and law offices, that privacy rule matters most. A reply
          that confirms a reviewer was a patient, or mentions their treatment, can do more
          harm than the review. &ldquo;We are sorry to hear this, please call the clinic so we
          can look into it&rdquo; is enough.
        </p>

        <p>
          Some reviews will vanish, and not always fairly. Google says it uses automated spam
          detection and that some legitimate reviews may be removed inadvertently, and it does
          not reinstate reviews removed for policy violations. The pattern most likely to
          trigger the filter is the one businesses create when they ask in bursts: thirty
          reviews in two days, then nothing for a month. Steady asking is safer as well as
          more effective. A business cannot delete a genuine bad review either; it can only
          report one that breaks policy and reply to the rest.
        </p>

        <h2 id="when-not-to-pay">When not to pay anyone for reviews</h2>

        <p>
          A Nigerian business does not need to pay anyone to get more Google reviews, because
          the link is free, the message takes five minutes to write, and the routine is a
          habit rather than a service. We are an SEO agency explaining that this part of the
          job costs ₦0; our finance team has asked us to stop writing these sections.
        </p>

        <p>
          Two kinds of offer should be refused outright. Anyone selling reviews, at any price,
          is selling the restrictions described above. And any &ldquo;reputation&rdquo; tool
          that asks customers to rate the business first and only sends the happy ones to
          Google is selling review gating with a dashboard.
        </p>

        <p>
          Paying for help makes sense once reviews are no longer the gap: several branches
          that each need a profile and a routine, a crowded category where every competitor
          already has hundreds of reviews and the difference is the website and content around
          the profile, or a profile that has been restricted and needs a careful appeal. That
          is the work our <a href="/ai-seo/lagos">Lagos SEO service</a> and{' '}
          <a href="/ai-seo/abuja">Abuja SEO service</a> do. Our plans start at USD 150 a
          month, about ₦205,000 at the end-of-September rate used in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>
          , and the detail is on the <a href="/pricing">pricing page</a>. Reviews are also
          one part of the wider{' '}
          <a href="/blog/local-seo-for-small-business">local SEO checklist</a>, not the whole
          of it.
        </p>

        <h2 id="thirty-day-plan">A 30-day Google review routine</h2>

        <p>
          A Nigerian business can set up a review routine in one afternoon and run it in a
          few minutes a day; the results come from repeating it for every customer, not from
          the setup.
        </p>

        <ol>
          <li>
            <strong>Day 1: create the review link and QR code.</strong> Read reviews, then
            Get more reviews. Download the QR code from a computer.
          </li>
          <li>
            <strong>Day 1: write one WhatsApp message and save it.</strong> Thank the
            customer by name, ask for an honest review, include the link. Save it as a quick
            reply.
          </li>
          <li>
            <strong>Day 2: put the QR code where customers wait.</strong> Receipts, the
            counter, delivery packaging. Ask for an honest review, never for five stars.
          </li>
          <li>
            <strong>Days 2 to 30: ask every customer when the job is done.</strong> Every
            customer, whatever their experience, with one follow-up at most.
          </li>
          <li>
            <strong>Every week: reply to every new review.</strong> Short, specific, nothing
            private.
          </li>
          <li>
            <strong>Day 30: compare against the businesses above you.</strong> Search your
            service and area on Google Maps and note the review counts and dates of the
            profiles ranked higher.
          </li>
        </ol>

        <p>
          Chioma saved the message, printed the QR code onto a card at each mirror, and sent
          the link to every customer as they walked out, including the one who complained
          about the wait, and answered the three-star review that wait produced. Plenty of
          customers still say they will do it later. The difference is that the link is now
          sitting in their WhatsApp when later finally arrives.
        </p>
      </PostShell>
    </>
  );
}
