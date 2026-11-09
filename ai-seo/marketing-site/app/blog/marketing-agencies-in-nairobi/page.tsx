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

const post = getPost('marketing-agencies-in-nairobi')!;

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
  { id: 'one-label', label: 'One label, many different businesses' },
  { id: 'seven-types', label: 'The seven types of marketing agency in Nairobi' },
  { id: 'search-or-scroll', label: 'Start from how your customers find you' },
  { id: 'kenya-reach', label: 'Where Kenyan customers can be reached in 2026' },
  { id: 'full-service', label: 'When a full-service agency is worth it' },
  { id: 'specialist', label: 'When a specialist beats a full-service agency' },
  { id: 'shortlist', label: 'How to shortlist Nairobi agencies' },
  { id: 'your-name', label: 'What must stay in your name' },
  { id: 'not-us', label: 'When we are the wrong agency' },
];

const FAQ = [
  {
    q: 'What types of marketing agencies are there in Nairobi?',
    a: 'Nairobi marketing agencies fall into roughly seven types: full-service or integrated agencies, digital marketing agencies, performance and paid-media agencies, social media and content studios, SEO and GEO specialists, branding and creative studios, and PR, experiential and events agencies. Many firms list services from several types, so ask which one the agency actually earns most of its revenue from.',
  },
  {
    q: 'What is the difference between a full-service agency and a digital marketing agency in Kenya?',
    a: 'A full-service agency in Kenya usually runs both offline and online work: brand, media buying, radio and outdoor, activations and digital. A digital marketing agency works online only, typically social media, paid social and Google ads, websites and sometimes SEO. A business that never runs radio, billboards or roadshows rarely needs the full-service layer.',
  },
  {
    q: 'How much do marketing agencies in Nairobi charge?',
    a: 'There is no single price, because agencies charge for very different work. On the Sortlist Nairobi directory in November 2026, listed minimum budgets ran from about 200 euros to 3,000 euros per project. SEO retainers in Nairobi typically run from KES 40,000 to KES 250,000 a month, and any advertising budget is paid on top of the agency fee, with 16 percent VAT if the agency is VAT-registered.',
  },
  {
    q: 'How do I choose a marketing agency in Nairobi?',
    a: 'Decide the job first: being found on Google, being discovered on social media, or launching a brand. Then shortlist agencies whose main service matches that job, ask for two Kenyan clients you can call, and check who will do the work day to day. Confirm in writing that your ad accounts, pages, domain and Google Business Profile stay in your name.',
  },
  {
    q: 'Which social media platform reaches the most people in Kenya?',
    a: 'TikTok had the largest advertising audience in Kenya at the end of 2025, equal to 78.5 percent of internet users according to the DataReportal Digital 2026 Kenya report. Facebook reached 17.0 million people, YouTube 12.1 million, LinkedIn 6.30 million members and Instagram 3.95 million. Ad reach is not the same as active users, so treat these as audience sizes, not headcounts.',
  },
  {
    q: 'Should the agency own my Facebook page and ad account?',
    a: 'No. Your Facebook page, Meta ad account, Google Ads account, website domain, analytics and Google Business Profile should be registered to your business, with the agency given partner or user access. If the relationship ends, you remove their access and keep everything, including the advertising history.',
  },
];

const SHORTLIST_STEPS = [
  {
    name: 'Name the job before you name the agency',
    text: 'Write one sentence on what the agency must achieve: more enquiries from Google, more sales from social media, a brand launch, or an event. That sentence decides which type of agency to look for.',
  },
  {
    name: 'Shortlist three agencies whose main service matches the job',
    text: 'Use directories such as Sortlist and Clutch, Google search and referrals, and keep only agencies whose case studies show the job you named, not just a long services menu.',
  },
  {
    name: 'Ask for two Kenyan clients you can call',
    text: 'Call them and ask what changed in their business, how reporting works, and who at the agency actually does the work each week.',
  },
  {
    name: 'Ask who does the specialist work',
    text: 'Ask whether SEO, video, paid ads or web development is done in-house or subcontracted, and by whom. A subcontracted service is not wrong, but you should know.',
  },
  {
    name: 'Get the fee and the ad budget as separate lines',
    text: 'Ask for the agency fee, the advertising budget and VAT as three separate lines, so you can see what the agency earns and what goes to Meta, TikTok or Google.',
  },
  {
    name: 'Confirm ownership in writing before signing',
    text: 'Agree in the contract that pages, ad accounts, domain, website, analytics and Google Business Profile belong to your business and that the agency works through partner access.',
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
        data={howToJsonLd(SHORTLIST_STEPS, 'How to shortlist a marketing agency in Nairobi')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          <strong>Marketing agencies in Nairobi</strong> come in seven main types: full-service
          agencies, digital marketing agencies, performance and paid-media agencies, social media
          and content studios, SEO and GEO specialists, branding studios, and PR or events
          agencies. They do different jobs, so a Kenyan business should choose by the job it
          needs done. If customers search for you on Google, hire an SEO specialist. If they
          discover you while scrolling, hire a social media or paid-media agency. Only a business
          running several channels at once, including radio, outdoor or events, needs a
          full-service agency.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Wanjiru runs a physiotherapy clinic in Kilimani. She wanted more new patients, so she
            searched for marketing agencies in Nairobi and invited three to pitch.
          </p>
          <p>
            The first, an events agency, proposed a weekend activation at a Westlands mall with
            branded tents and a DJ. The second, a social media studio, proposed twenty Instagram
            posts a month and two influencers. The third, a full-service agency, proposed all of
            the above, plus a radio slot and a jingle, which is a lot of music for a clinic whose
            patients mostly arrive with a sore back.
          </p>
          <p>
            All three were good at what they did. None of them asked how her patients currently
            found her. Most of them, it turned out, typed &ldquo;physiotherapist near me&rdquo;
            into Google.
          </p>
        </Scene>

        <p>
          This guide sorts Nairobi&rsquo;s marketing agencies by type, shows which job each type
          does, and gives a short way to match one to your business. Prices are covered in detail
          in{' '}
          <a href="/blog/seo-agency-nairobi-cost">what an SEO agency in Nairobi costs, in KES</a>
          , so they are only summarised here.
        </p>

        <h2 id="one-label">One label, many different businesses</h2>

        <p>
          &ldquo;Marketing agency&rdquo; in Nairobi covers firms that do completely different
          work, from radio and billboard campaigns to TikTok videos to Google rankings, so the
          label alone tells a buyer very little. Two agencies with the same title can share no
          services at all.
        </p>

        <p>
          You can see it on any directory. The Sortlist page for Nairobi marketing agencies, read
          in November 2026, lists an experiential and events agency, a PR firm, a video and
          content studio, a performance-marketing shop and several general digital agencies side
          by side, with listed minimum budgets from about 200 euros to 3,000 euros. Every one of
          them is a marketing agency in Nairobi. Very few of them would be a sensible choice for
          the same client. Most also list ten or more services each, because a services page,
          unlike a team, costs nothing to extend.
        </p>

        <h2 id="seven-types">The seven types of marketing agency in Nairobi</h2>

        <p>
          Nairobi&rsquo;s marketing agencies sort into seven practical types, each built around a
          different job. The table sets out what each one actually delivers and which businesses
          it usually suits.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Core work</th>
                <th>What you receive</th>
                <th>Usually suits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full-service or integrated</td>
                <td>Brand, media buying, radio, TV, outdoor, activations and digital together</td>
                <td>Campaigns across several channels, one account team</td>
                <td>Larger brands running national or multi-channel campaigns</td>
              </tr>
              <tr>
                <td>Digital marketing</td>
                <td>Social media, paid social, Google Ads, websites, sometimes SEO</td>
                <td>Monthly content, ad management and reports</td>
                <td>SMEs that market online only</td>
              </tr>
              <tr>
                <td>Performance and paid media</td>
                <td>Ad campaigns on Meta, TikTok and Google, judged on leads or sales</td>
                <td>Campaign set-up, testing, cost per enquiry reporting</td>
                <td>Businesses that can measure enquiries and want them quickly</td>
              </tr>
              <tr>
                <td>Social media and content</td>
                <td>Posts, short video, photography, influencers, community management</td>
                <td>A content calendar and a steady feed</td>
                <td>Fashion, food, beauty, hospitality and events</td>
              </tr>
              <tr>
                <td>SEO and GEO specialist</td>
                <td>Google rankings, Google Business Profile, visibility in AI answers</td>
                <td>Pages, technical fixes, reviews work, ranking reports</td>
                <td>Clinics, law firms, schools, B2B suppliers, safari operators</td>
              </tr>
              <tr>
                <td>Branding and creative</td>
                <td>Logo, identity, packaging, campaign concepts</td>
                <td>A brand system and design files</td>
                <td>New businesses and rebrands</td>
              </tr>
              <tr>
                <td>PR, experiential and events</td>
                <td>Media relations, launches, activations, roadshows</td>
                <td>Coverage, events and footfall</td>
                <td>Launches, consumer brands, reputation work</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The boundaries are not rigid. A good digital agency may run decent ads, and some
          full-service agencies have a strong digital team. The useful question is which of
          these rows the agency would put itself in if it could choose only one, because that is
          the work its best people do.
        </p>

        <h2 id="search-or-scroll">Start from how your customers find you</h2>

        <p>
          The right type of agency depends on how your customers find businesses like yours:
          if they search for you on Google, you need search work; if they discover you while
          scrolling, you need social media or paid ads. That one fact rules out most of the table
          above.
        </p>

        <p>
          A patient with a sore back, a company looking for a clearing and forwarding agent at
          Embakasi, or a family comparing schools in Karen will search. They need the business to
          appear when they type the service and the area. A new restaurant, a fashion label or a
          concert has to be put in front of people who were not looking for it. One kind of
          marketing catches demand that already exists; the other creates it. The same logic,
          worked through for another market, is in{' '}
          <a href="/blog/digital-marketing-vs-seo-for-nigerian-businesses">
            digital marketing vs SEO for Nigerian businesses
          </a>
          , and it transfers to Nairobi without much editing.
        </p>

        <h2 id="kenya-reach">Where Kenyan customers can be reached in 2026</h2>

        <p>
          Kenya had 23.4 million internet users at the end of 2025, 40.5 percent of the
          population, and the largest advertising audiences were on TikTok and Facebook,
          according to the DataReportal Digital 2026 Kenya report. The figures below come from
          each platform&rsquo;s own advertising tools as reported there. DataReportal stresses
          that ad reach is not the same as monthly active users, so read them as the size of
          the room.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Ad reach in Kenya, late 2025</th>
                <th>What it tells a business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TikTok</td>
                <td>56.1% of adults; equal to 78.5% of internet users</td>
                <td>The largest paid audience. Its adult ad audience is 64.5% male.</td>
              </tr>
              <tr>
                <td>Facebook</td>
                <td>17.0 million; 51.2% of adults</td>
                <td>Still the broadest mixed audience, and the base of Meta advertising.</td>
              </tr>
              <tr>
                <td>YouTube</td>
                <td>12.1 million</td>
                <td>Useful where a product needs showing rather than describing.</td>
              </tr>
              <tr>
                <td>LinkedIn</td>
                <td>6.30 million members; 19.2% of adults</td>
                <td>Larger than Instagram in Kenya. The room for selling to companies.</td>
              </tr>
              <tr>
                <td>Instagram</td>
                <td>3.95 million</td>
                <td>Under a quarter of Facebook&rsquo;s reach, whatever the pitch deck says.</td>
              </tr>
              <tr>
                <td>X</td>
                <td>2.09 million</td>
                <td>Small, and its adult ad audience is 76.0% male.</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Two findings matter for choosing an agency. First, an agency whose whole plan is
          Instagram is working in one of the smaller rooms in Kenya. Second, LinkedIn reaches
          more Kenyans than Instagram does, which makes it a serious channel for business-to-business
          firms in Upper Hill and Westlands, and one that consumer-focused social media studios
          rarely lead with. Search is not in the table because it is not an audience you rent. It
          is what people do at the moment they need something.
        </p>

        <h2 id="full-service">When a full-service agency is worth it</h2>

        <p>
          A full-service agency is worth it when a Kenyan business runs several channels at once,
          such as radio, outdoor, activations and digital, and needs one team to keep the message
          consistent across all of them. National brands, product launches and companies with a
          marketing department to brief the agency usually fit.
        </p>

        <p>
          The trade-off is depth. A full-service agency covers many disciplines with one team,
          and the specialist services on its list are sometimes subcontracted or handled by one
          person among other duties. That is acceptable when coordination is the main value. It
          is expensive when a business only ever uses one channel, because it pays for a
          coordination layer with nothing to coordinate. Ask who does the SEO, the video and the
          ad buying, and whether those people are on the agency&rsquo;s payroll.
        </p>

        <h2 id="specialist">When a specialist beats a full-service agency</h2>

        <p>
          A specialist agency beats a full-service one when a business has one main job, such as
          ranking on Google, running profitable ads or producing video, and needs that job done
          well rather than many jobs done adequately. Most Nairobi SMEs are in this position.
        </p>

        <p>
          Wanjiru&rsquo;s clinic is the typical case. Her patients search, so the work that
          matters is a complete{' '}
          <a href="/blog/google-business-profile-optimization">Google Business Profile</a>,
          service pages for each treatment, reviews from real patients and, increasingly, being
          named when someone asks an AI assistant for a physiotherapist in Kilimani. A safari
          operator in Karen has the same profile with higher stakes: travellers search and ask
          AI tools long before they book, which is why{' '}
          <a href="/blog/how-to-get-a-safari-company-recommended-by-ai">
            getting a safari company recommended by AI
          </a>{' '}
          is now part of the job. A social media studio can make these businesses look good. It
          cannot, by posting more, make them appear when someone searches.
        </p>

        <h2 id="shortlist">How to shortlist Nairobi agencies</h2>

        <p>
          To shortlist a marketing agency in Nairobi, name the job first, keep three agencies
          whose main service matches it, call two of their Kenyan clients, and confirm in writing
          who does the work and who owns the accounts.
        </p>

        <ol>
          <li>
            <strong>Name the job before you name the agency.</strong> One sentence: more
            enquiries from Google, more sales from social media, a brand launch, or an event.
          </li>
          <li>
            <strong>Shortlist three agencies whose main service matches.</strong> Directories such
            as Sortlist and Clutch, Google and referrals all work. Keep the ones whose case studies
            show your job, not just a long menu.
          </li>
          <li>
            <strong>Call two Kenyan clients.</strong> Ask what changed in the business, how
            reporting works and who does the work each week.
          </li>
          <li>
            <strong>Ask who does the specialist work.</strong> In-house or subcontracted, and by
            whom. Subcontracting is not wrong; not knowing about it is.
          </li>
          <li>
            <strong>Get the fee and the ad budget on separate lines.</strong> Fee, advertising
            budget and 16 percent VAT, each shown separately.
          </li>
          <li>
            <strong>Confirm ownership in writing.</strong> Covered in the next section.
          </li>
        </ol>

        <p>
          One shortcut is worth adding for any agency that sells search work: search for the
          service it sells, in Nairobi, and see whether it appears. An SEO agency that cannot be
          found for SEO is at least consistent. For visibility in AI answers, the free checks in{' '}
          <a href="/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa">
            how to check if ChatGPT recommends your business
          </a>{' '}
          work on agencies as well as on your own business.
        </p>

        <h2 id="your-name">What must stay in your name</h2>

        <p>
          Every account an agency uses for your marketing should be registered to your business,
          with the agency given partner or user access: the Facebook and Instagram pages, the
          Meta ad account, TikTok and Google Ads accounts, the website domain and hosting,
          analytics, and the Google Business Profile.
        </p>

        <p>
          This matters most when the relationship ends, which, sooner or later, most agency
          relationships do. A business that owns its accounts removes the
          agency&rsquo;s access and carries on with its pages, followers, reviews and advertising
          history intact. A business whose page was created on an agency employee&rsquo;s profile
          can spend months recovering it. The same goes for money: the advertising budget should
          be visible as its own line, ideally paid straight to the platform from your own card or
          account, so the agency&rsquo;s fee and the ad spend never blur together.
        </p>

        <h2 id="not-us">When we are the wrong agency</h2>

        <p>
          AfriShield AI is an SEO and GEO specialist, so we are the wrong agency for a Nairobi
          business whose customers discover it by scrolling, or which needs a brand identity,
          an event or a radio campaign.
        </p>

        <ul>
          <li>
            <strong>You sell on sight.</strong> A fashion label or a new restaurant should start
            with a social media or content studio. We would only slow you down.
          </li>
          <li>
            <strong>You need customers this month.</strong> A performance agency running paid ads
            will get you enquiries faster than any search work, for as long as the budget runs.
          </li>
          <li>
            <strong>You are launching a brand.</strong> A branding studio, then a PR or events
            agency, will do more for a launch than rankings for a name nobody searches yet.
          </li>
          <li>
            <strong>You want everything under one roof.</strong> We do not run Instagram, shoot
            video or book radio, and we say so before the first invoice rather than after it.
          </li>
        </ul>

        <p>
          Recommending other kinds of agency is an odd use of our own blog, a little like a
          dentist handing out the physiotherapist&rsquo;s number. It is still the right number for
          a back problem. If your customers do search, the{' '}
          <Link href="/ai-seo/nairobi">AI SEO in Nairobi</Link> page sets out what we do there,
          and the monthly prices are on the <Link href="/pricing">pricing page</Link>.
        </p>

        <p>
          Wanjiru, for the record, kept the events agency&rsquo;s number for a future open day,
          declined the jingle, and hired a search specialist to make the clinic appear for
          &ldquo;physiotherapist in Kilimani&rdquo;. The DJ, presumably, found other work.
        </p>
      </PostShell>
    </>
  );
}
