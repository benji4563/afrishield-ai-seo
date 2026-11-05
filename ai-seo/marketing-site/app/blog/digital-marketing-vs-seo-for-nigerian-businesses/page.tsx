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

const post = getPost('digital-marketing-vs-seo-for-nigerian-businesses')!;

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
  { id: 'part-of', label: 'SEO is part of digital marketing, not its rival' },
  { id: 'searching-scrolling', label: 'Searching versus scrolling' },
  { id: 'where-customers-are', label: 'Where Nigerian customers can be reached in 2026' },
  { id: 'channels-compared', label: 'Each channel compared for a Nigerian business' },
  { id: 'lead-with-seo', label: 'Which Nigerian businesses should lead with SEO' },
  { id: 'lead-with-social', label: 'When social media should come first' },
  { id: 'order', label: 'A sensible order for a small budget' },
  { id: 'not-seo', label: 'When SEO is the wrong thing to buy' },
];

const FAQ = [
  {
    q: 'What is the difference between digital marketing and SEO?',
    a: 'Digital marketing is every way a business reaches customers online: search, social media, paid ads, email, WhatsApp and content. SEO is one part of it, the work that earns unpaid visibility on Google when someone searches for what you sell. Comparing the two is comparing a whole toolbox with one tool in it.',
  },
  {
    q: 'Is SEO better than social media marketing for a Nigerian business?',
    a: 'Neither is better for every business; they reach people at different moments. SEO reaches people who are already searching for a product or service, so it suits clinics, schools, lawyers, logistics firms and other businesses people look for when they need them. Social media reaches people who are scrolling, so it suits fashion, food, beauty and events, where the customer often did not know they wanted it until they saw it.',
  },
  {
    q: 'Is SEO part of digital marketing?',
    a: 'Yes. SEO is one channel within digital marketing, alongside paid search, social media, email and messaging. A digital marketing agency may or may not do SEO itself, so ask who does the SEO work day to day before signing a full-service contract.',
  },
  {
    q: 'Should a small business in Nigeria start with SEO or social media?',
    a: 'Most Nigerian small businesses should start with the free foundations of both: a complete Google Business Profile and one social media account on the platform their customers actually use. After that, a business people search for should put its next naira into SEO, and a business people discover by browsing should put it into social content and ads.',
  },
  {
    q: 'How much does SEO cost in Nigeria compared with digital marketing?',
    a: 'Most Nigerian small and mid-sized businesses buying agency SEO pay about ₦300,000 to ₦700,000 a month in 2026. Social media and paid advertising have no single price, because the agency fee and the ad budget are separate: the fee pays for the work, and the ad spend stops buying visibility the day it stops.',
  },
  {
    q: 'Does social media help SEO in Nigeria?',
    a: 'Social media is not a dependable shortcut to Google rankings. Its value to SEO is indirect: people discover your content, some of them search for your business name later, and a few link to your pages. Run social media for its own sake, and treat any SEO benefit as a bonus.',
  },
];

const ORDER_STEPS = [
  {
    name: 'Complete your Google Business Profile',
    text: 'Fill in every field, add real photos, choose the right category and ask customers for reviews. It is free and it is the first thing a nearby searcher sees.',
  },
  {
    name: 'Make the website work on a phone',
    text: 'Check that the site loads on a mid-range Android phone on mobile data, and that a WhatsApp button and phone number are visible without scrolling.',
  },
  {
    name: 'Choose one social platform and keep it active',
    text: 'Pick the platform your customers actually use, not the one that is most fashionable, and post on it consistently rather than spreading thin across four.',
  },
  {
    name: 'Write pages for the questions buyers search',
    text: 'Publish service pages and answers to the questions customers ask before buying, with your city and naira prices where you can state them honestly.',
  },
  {
    name: 'Add paid ads only once you can count enquiries',
    text: 'Start paid search or social ads after you can count where enquiries come from, including WhatsApp, so every naira of ad spend can be judged against results.',
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
        data={howToJsonLd(ORDER_STEPS, 'How a Nigerian small business can order its marketing channels')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          <strong>Digital marketing vs SEO for Nigerian businesses</strong> is not a real choice,
          because SEO is one part of digital marketing. Digital marketing covers every online
          channel: Google search, social media, paid ads, email and WhatsApp. SEO is the part that
          earns unpaid visibility on Google when someone searches for what you sell. A Nigerian
          business that people search for, such as a clinic, school or logistics firm, should
          lead with SEO. A business people discover while scrolling, such as fashion or food,
          should lead with social media, and keep a Google Business Profile either way.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Ngozi bakes celebration cakes in Yaba. Business is good on weekends and quiet in the
            week, so she asked two agencies how to fill the quiet days.
          </p>
          <p>
            The first sent a &ldquo;360-degree digital marketing&rdquo; proposal: twenty
            Instagram posts a month, a TikTok account, a monthly ad budget and the word synergy
            twice on the first page, which is once more than any cake needs. The second sent an
            SEO proposal: fix the website, complete the Google profile, write pages for
            &ldquo;birthday cake delivery in Lagos&rdquo; and wait about six months.
          </p>
          <p>
            Both were confident. Both cost money. Neither said why its answer was right for a
            cake business in Yaba rather than for a business in general.
          </p>
        </Scene>

        <p>
          This guide answers the question Ngozi actually had. It explains what each channel does,
          shows where Nigerian customers can be reached according to the platforms&rsquo; own
          advertising data, and sets out which kind of business should lead with which channel.
          The naira cost of SEO is covered in full in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            our guide to what SEO costs in Nigeria
          </a>
          , and the paid-search side in <a href="/blog/seo-vs-google-ads">SEO vs Google Ads</a>,
          so neither is repeated at length here.
        </p>

        <h2 id="part-of">SEO is part of digital marketing, not its rival</h2>

        <p>
          SEO is one channel inside digital marketing, so the useful question is not which of
          the two to buy but which digital channel to put first for your business. Digital
          marketing is the whole toolbox: search engine optimisation, paid search, paid social,
          organic social media, email, WhatsApp, content and the analytics that tie them
          together.
        </p>

        <p>
          The confusion comes from how agencies label themselves. In Nigeria, &ldquo;digital
          marketing agency&rdquo; usually means a firm whose main work is social media content and
          paid social ads, with SEO listed as one service among many. An &ldquo;SEO
          agency&rdquo; usually does search work only. Asking which is better is a bit like
          asking whether Balogun Market is better than the tomato stall inside it. The market
          has more things; the stall may have the one thing you came for.
        </p>

        <h2 id="searching-scrolling">Searching versus scrolling</h2>

        <p>
          The real difference between SEO and most other digital marketing is the moment it
          reaches the customer: SEO reaches people who are searching for something, while social
          media and display ads reach people who are scrolling and did not ask. That single
          difference decides more than any budget does.
        </p>

        <p>
          Someone who types &ldquo;pharmacy open now Ikeja&rdquo; or &ldquo;haulage company
          Apapa&rdquo; into Google already wants to buy. The work is to be the answer they find.
          Someone watching TikTok on a Sunday evening did not ask to see a cake, but a good video
          can make them want one by Tuesday. One channel catches demand that exists; the other
          creates demand that did not. A business that sells something people actively look for
          is wasting money if nobody can find it on Google. A business that sells something
          people buy on impulse is wasting money if it only waits to be found.
        </p>

        <h2 id="where-customers-are">Where Nigerian customers can be reached in 2026</h2>

        <p>
          Nigeria had 109 million internet users at the end of 2025, 45.5 percent of the
          population, and the largest advertising audiences among them were on TikTok, Facebook
          and YouTube, according to the DataReportal Digital 2026 Nigeria report. The figures
          below come from each platform&rsquo;s own advertising tools as reported there.
          DataReportal warns that ad reach is not the same as active users, so read them as the
          size of the room, not a headcount.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Ad reach in Nigeria, late 2025</th>
                <th>What it tells a business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TikTok</td>
                <td>47.8 million adults aged 18 and above, 38.2% of all adults</td>
                <td>
                  The largest paid audience. Its adult ad audience is 68.1% male, which matters
                  if you sell to women.
                </td>
              </tr>
              <tr>
                <td>Facebook</td>
                <td>38.0 million, 34.9% of internet users</td>
                <td>Still a broad, mixed audience, and the base of Meta&rsquo;s ad system.</td>
              </tr>
              <tr>
                <td>YouTube</td>
                <td>30.5 million, 28.1% of internet users</td>
                <td>Useful for explaining products that need showing, not telling.</td>
              </tr>
              <tr>
                <td>Instagram</td>
                <td>10.0 million, 9.2% of internet users</td>
                <td>
                  Smaller than many Lagos brands assume: about a quarter of Facebook&rsquo;s
                  reach.
                </td>
              </tr>
              <tr>
                <td>LinkedIn</td>
                <td>10.4% of adults aged 18 and above</td>
                <td>The business-to-business room. Small, but the right one for selling to firms.</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Two things stand out. First, Instagram reaches far fewer Nigerians than its place in
          agency proposals suggests, so a business that runs only on Instagram is talking to a
          small, specific slice of the market. Second, no platform reaches everyone. Even
          TikTok&rsquo;s ad reach equals only 44.0 percent of Nigeria&rsquo;s internet users,
          and the rest still search Google when they need a dentist. Search does not appear in the table because it
          is not an audience you rent. It is a habit almost every internet user shares, at the
          moment they need something.
        </p>

        <h2 id="channels-compared">Each channel compared for a Nigerian business</h2>

        <p>
          Each digital marketing channel differs in how fast it works, whether results last after
          spending stops, and which Nigerian businesses it suits. The table sets them side by
          side.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Reaches people who are</th>
                <th>Speed</th>
                <th>When spending stops</th>
                <th>Suits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SEO</td>
                <td>Searching on Google</td>
                <td>Slow: months, not weeks</td>
                <td>Rankings fade slowly rather than vanish</td>
                <td>Clinics, schools, professional services, logistics, property, B2B</td>
              </tr>
              <tr>
                <td>Google Business Profile</td>
                <td>Searching nearby, often on Maps</td>
                <td>Weeks</td>
                <td>Free to keep, but reviews need to keep coming</td>
                <td>Any business with a location or service area</td>
              </tr>
              <tr>
                <td>Google Ads</td>
                <td>Searching on Google</td>
                <td>Days</td>
                <td>Visibility stops the same day</td>
                <td>Urgent services and testing which searches convert</td>
              </tr>
              <tr>
                <td>Paid social: TikTok, Facebook, Instagram</td>
                <td>Scrolling</td>
                <td>Days</td>
                <td>Visibility stops the same day</td>
                <td>Fashion, food, beauty, events, launches</td>
              </tr>
              <tr>
                <td>Organic social media</td>
                <td>Following you, or shown your post</td>
                <td>Weeks to months</td>
                <td>Followers stay; reach drops when posting stops</td>
                <td>
                  Visual products. Free, apart from the hours, the data bundle and the ring light.
                </td>
              </tr>
              <tr>
                <td>WhatsApp and email</td>
                <td>Already your customers</td>
                <td>Immediate</td>
                <td>The list stays yours</td>
                <td>Repeat business of every kind</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The last row is the one most proposals leave out. For many Nigerian businesses,
          WhatsApp is where the sale actually happens, whichever channel brought the customer. A
          plan that measures website forms and ignores WhatsApp enquiries will report that
          nothing works, while the phone in the shop keeps buzzing.
        </p>

        <h2 id="lead-with-seo">Which Nigerian businesses should lead with SEO</h2>

        <p>
          A Nigerian business should lead with SEO when its customers search for it by service
          and place at the moment they need it, and when it can wait several months for results.
          Clinics, dentists, schools, law firms, accountants, logistics companies, property
          developers and business-to-business suppliers usually fit.
        </p>

        <p>
          Nobody discovers their need for a haulage company on TikTok. They need one on a
          Wednesday, search for it, and call one of the first few names they find. For these
          businesses, social media is a supporting act and SEO is the main one, because the
          customer&rsquo;s decision starts with a search. The honest timeline is set out in{' '}
          <a href="/blog/how-long-does-seo-take-in-nigeria">how long SEO takes in Nigeria</a>,
          and for a business with a physical location, most of the early gain comes from the map
          results described in{' '}
          <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
            how to get more Google reviews in Nigeria
          </a>
          . If you are choosing someone to do the work, the checks in{' '}
          <a href="/blog/best-seo-agency-in-nigeria">how to find the best SEO agency in Nigeria</a>{' '}
          apply whichever label the agency uses.
        </p>

        <h2 id="lead-with-social">When social media should come first</h2>

        <p>
          Social media should come first for a Nigerian business whose product sells on sight,
          whose customers buy on impulse, or which is launching something nobody yet knows to
          search for. Fashion, food, beauty, events and new consumer products usually fit.
        </p>

        <p>
          Nobody searches for a cake design they have not seen yet. A thirty-second video of it
          being cut can sell three by the weekend. These businesses still need a Google Business
          Profile, because the customer who saw the video will often search the name before
          ordering, and a business that cannot be found at that moment loses a sale it already
          won. But the main budget belongs where the customer first meets the product. Choose the
          platform from the table above, not from habit: a business selling mainly to women
          should note how male-heavy some ad audiences are before committing its budget.
        </p>

        <h2 id="order">A sensible order for a small budget</h2>

        <p>
          With a small budget, a Nigerian business should complete its free Google Business
          Profile first, make its website work on a phone, keep one social platform active,
          then put its next money into SEO or ads depending on whether customers search or
          scroll. The order matters more than the amount.
        </p>

        <ol>
          <li>
            <strong>Complete your Google Business Profile.</strong> Every field, real photos, the
            right category, and a steady flow of reviews. It is free. If the profile does not
            appear at all, start with{' '}
            <a href="/blog/why-is-my-business-not-showing-on-google-maps-nigeria">
              why a business is not showing on Google Maps in Nigeria
            </a>
            .
          </li>
          <li>
            <strong>Make the website work on a phone.</strong> It should load on a mid-range
            Android phone on mobile data, with WhatsApp and a phone number visible without
            scrolling.
          </li>
          <li>
            <strong>Choose one social platform and keep it alive.</strong> One account that
            posts every week beats four accounts that last posted at Christmas.
          </li>
          <li>
            <strong>Write pages for the questions buyers search.</strong> Service pages and
            answers to pre-purchase questions, with your city and honest naira prices.
          </li>
          <li>
            <strong>Add paid ads once you can count enquiries.</strong> Including WhatsApp. Ads
            without measurement are a donation to the platform with extra steps.
          </li>
        </ol>

        <p>
          This is roughly the order we follow on the{' '}
          <Link href="/ai-seo/lagos">AI SEO in Lagos</Link> and{' '}
          <Link href="/ai-seo/abuja">AI SEO in Abuja</Link> engagements, and the monthly prices
          are on the <Link href="/pricing">pricing page</Link>.
        </p>

        <h2 id="not-seo">When SEO is the wrong thing to buy</h2>

        <p>
          SEO is the wrong thing for a Nigerian business to buy when it needs customers within
          weeks, when its customers do not search for what it sells, or when it cannot keep
          paying for at least six months.
        </p>

        <ul>
          <li>
            <strong>You need sales this month.</strong> SEO will not deliver them. Paid search or
            paid social will, at a price, for as long as you pay.
          </li>
          <li>
            <strong>Nobody searches for your product yet.</strong> A new snack brand, an unusual
            gadget or a pop-up event has little search demand to capture. Build awareness first;
            the searches follow.
          </li>
          <li>
            <strong>You can only afford three months.</strong> The early months of SEO are the
            slow ones. Stopping at month three pays for the foundation and leaves before the
            return.
          </li>
          <li>
            <strong>Your Google Business Profile is not done.</strong> A free, complete profile
            often does more for a single-location business than its first month of paid SEO.
          </li>
        </ul>

        <p>
          We sell SEO, so this section is a little like a baker recommending the bread from the
          shop next door. It is still true, and a client who bought the wrong channel does not
          stay a client for long.
        </p>

        <p>
          Ngozi, for the record, did neither proposal in full. She completed her Google
          profile, kept TikTok because that is where her cakes sell, and asked the SEO agency for
          one page only: &ldquo;birthday cake delivery in Lagos&rdquo;, the search her
          weekday customers make. The twenty Instagram posts a month went back to the first
          agency, unbaked.
        </p>
      </PostShell>
    </>
  );
}
