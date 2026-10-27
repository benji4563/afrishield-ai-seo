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

const post = getPost('seo-agency-nairobi-cost')!;

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
  { id: 'kes-prices', label: 'SEO agency prices in Nairobi, in shillings' },
  { id: 'why-so-wide', label: 'Why quotes run from KES 8,000 to KES 325,000' },
  { id: 'compare-quotes', label: 'How to compare two Nairobi quotes' },
  { id: 'vat-and-dollars', label: 'VAT and dollar quotes on the invoice' },
  { id: 'sector-district', label: 'What pushes a Nairobi quote up' },
  { id: 'cheap-packages', label: 'What a KES 15,000 package buys' },
  { id: 'dont-hire', label: 'When not to hire an agency yet' },
  { id: 'before-signing', label: 'Questions to ask before signing' },
];

const FAQ = [
  {
    q: 'How much does an SEO agency in Nairobi cost per month?',
    a: 'Most Nairobi SEO agencies charge between KES 40,000 and KES 250,000 a month in 2026, roughly $310 to $1,900 at about KSh 130 to the dollar. A review of 56 published Kenyan SEO packages by SEO Kenya Limited found an average of KSh 82,570 a month. Packages below KES 30,000 exist, and international agencies serving Nairobi quote from about $2,500 a month.',
  },
  {
    q: 'What does a basic SEO package cost in Kenya?',
    a: 'A basic SEO package in Kenya averaged KSh 41,000 a month in SEO Kenya Limited’s January 2025 review, with published prices ranging from KSh 11,250 to KSh 77,700. Basic packages usually cover an audit and on-page fixes for a small number of pages. Many do not include monthly content or link building, so check the deliverables line by line.',
  },
  {
    q: 'Is VAT charged on SEO services in Kenya?',
    a: 'Yes, if the agency is VAT-registered. The Kenya Revenue Authority applies a general VAT rate of 16 percent to taxable services, so a KES 100,000 retainer from a registered agency is invoiced at KES 116,000. Ask whether a quoted price includes or excludes VAT before comparing it with another.',
  },
  {
    q: 'Can a Nairobi SEO agency guarantee first page on Google?',
    a: 'No. Google states that no one can guarantee a number one ranking on Google, and advises finding someone else if a provider guarantees first place. A credible agency commits to the work it will deliver and the measures it will report, not to a specific position.',
  },
  {
    q: 'Should I pay a Nairobi SEO agency in shillings or dollars?',
    a: 'Shillings, where possible. The shilling has traded close to KSh 129 to KSh 130 against the dollar since August 2024, so a dollar quote is predictable today, but the contract should still name the exchange-rate source and a review date. A shilling price removes the question entirely.',
  },
  {
    q: 'Is SEO cheaper than Google Ads for a Nairobi business?',
    a: 'Not in the first few months. Google Ads produces clicks from the first day and stops when the budget stops, while SEO costs a similar monthly amount for several months before it produces much. Over a year or more, SEO usually becomes the cheaper channel because it keeps working without a per-click charge.',
  },
];

const COMPARE_STEPS = [
  {
    name: 'Convert every quote to shillings including VAT',
    text: 'Restate each quote as a monthly shilling figure with 16 percent VAT added where the agency is VAT-registered, and convert any dollar quote at the current Central Bank of Kenya rate.',
  },
  {
    name: 'Count what publishes each month',
    text: 'Write down how many new or rewritten pages each quote publishes per month. Ignore the number of keywords tracked; tracking is not the same as ranking.',
  },
  {
    name: 'Divide the fee by the pages',
    text: 'Divide each monthly fee by the number of pages it publishes. A figure far below what a competent writer charges for one researched page means something else in the package is not being done.',
  },
  {
    name: 'Check the one-off work separately',
    text: 'List the technical fixes, Google Business Profile work and tracking setup each quote includes in the first month, since these are the parts most often left out of cheaper packages.',
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
        data={howToJsonLd(COMPARE_STEPS, 'How to compare SEO agency quotes in Nairobi')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          An SEO agency in Nairobi typically costs{' '}
          <strong>between KES 40,000 and KES 250,000 a month</strong> in 2026 — roughly $310
          to $1,900 at about KSh 130 to the dollar. A review of 56 published Kenyan SEO
          packages found an average of KSh 82,570 a month, with basic packages averaging KSh
          41,000 and advanced ones KSh 85,300. Packages below KES 30,000 rarely include
          monthly content. International agencies serving Nairobi quote from about $2,500 a
          month. Add 16 percent VAT if the agency is VAT-registered.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Otieno runs a courier and logistics firm off Mombasa Road. Most of his contracts
            come from people who already know him, and he wanted the next ones to come from
            Google. So he asked three SEO agencies in Nairobi for a quote.
          </p>
          <p>
            The first offered &ldquo;full SEO, 30 keywords&rdquo; for KES 12,000 a month. A
            Westlands agency quoted KES 95,000 with four articles a month. A firm abroad
            quoted $2,000, which came to about KES 260,000 and arrived with a slide about
            Nairobi&rsquo;s skyline, in case he had not seen it.
          </p>
          <p>
            Each quote said &ldquo;SEO&rdquo; at the top. Underneath, they described three
            different jobs, and none of them said which job his business actually needed.
          </p>
        </Scene>

        <p>
          We have covered this question before in dollars, in{' '}
          <a href="/blog/what-seo-actually-costs">our general guide to what SEO costs</a>,
          and in naira, in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">
            what SEO costs in Nigeria
          </a>
          . This is the Kenyan version: shilling prices that Nairobi agencies actually
          publish, the VAT line most quotes leave out, and a way to compare two quotes that
          do not describe the same thing.
        </p>

        <h2 id="kes-prices">SEO agency prices in Nairobi, in shillings</h2>

        <p>
          Published SEO prices in Kenya run from about KES 8,000 a month for entry packages to
          more than KES 250,000 for enterprise programmes, and most Nairobi agencies selling
          monthly content price their core package between KES 40,000 and KES 150,000. The
          most useful single data point comes from SEO Kenya Limited, which reviewed 56
          published packages from 25 Kenyan providers on 13 January 2025.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Monthly spend</th>
                <th>Roughly in USD</th>
                <th>Who usually charges it</th>
                <th>What it realistically buys</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under KES 30,000</td>
                <td>Under $230</td>
                <td>Freelancers, entry packages</td>
                <td>
                  On-page edits, a Google Business Profile tidy-up, a report counting
                  keywords. Tracking a keyword is not ranking for it, in the same way that
                  owning a thermometer is not a fitness plan.
                </td>
              </tr>
              <tr>
                <td>KES 30,000–80,000</td>
                <td>$230–$615</td>
                <td>Small Nairobi agencies, basic tiers</td>
                <td>
                  An audit, technical fixes and on-page work on a limited set of pages; some
                  include a few articles a month
                </td>
              </tr>
              <tr>
                <td>KES 80,000–150,000</td>
                <td>$615–$1,150</td>
                <td>Established Nairobi agencies</td>
                <td>
                  Keyword map, technical work, about four researched articles a month, local
                  SEO, monthly reporting
                </td>
              </tr>
              <tr>
                <td>KES 150,000–250,000</td>
                <td>$1,150–$1,920</td>
                <td>Growth and advanced tiers</td>
                <td>
                  Several services or branches, four to six content pieces a month,
                  competitor monitoring, authority building
                </td>
              </tr>
              <tr>
                <td>KES 250,000+</td>
                <td>$1,920+</td>
                <td>Top local agencies, international firms</td>
                <td>
                  E-commerce, fintech or national brands: eight or more content pieces a
                  month, digital PR, a team rather than a person
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          The same review put the average basic package at KSh 41,000 a month (published
          prices from KSh 11,250 to KSh 77,700), the average advanced package at KSh 85,300,
          and the average premium package at KSh 180,000, with premium prices running past
          KSh 500,000. Across all 56 packages the average was KSh 82,570 a month. The dollar
          column above uses about KSh 130 to the dollar, close to where the shilling has
          traded since August 2024.
        </p>

        <h2 id="why-so-wide">Why quotes run from KES 8,000 to KES 325,000</h2>

        <p>
          Nairobi SEO quotes vary forty-fold because they are not pricing the same job: the
          cheapest packages price a number of keywords to track, while the expensive ones
          price hours of research, writing and technical work. The lowest published Kenyan
          package we found starts at KES 8,000 a month for ten keywords. At the other end, an
          international agency advertising to Nairobi B2B firms starts at $2,500 a month,
          about KES 325,000.
        </p>

        <p>
          Between those two sits the honest middle. One Kenyan agency&rsquo;s published
          entry tier costs KES 76,000 to KES 110,000 a month and lists an audit, keyword
          mapping, optimisation of up to 20 pages, Google Business Profile work and four
          blog posts a month. Another prices its packages purely by keyword count: KES
          45,000 for 10 to 20 keywords, KES 75,000 for 20 to 40, KES 150,000 for 80 or more.
          Neither is wrong. They are simply answering different questions, and only one of
          them tells you what you will be able to see on your site at the end of the month.
        </p>

        <h2 id="compare-quotes">How to compare two Nairobi quotes</h2>

        <p>
          To compare two Nairobi SEO quotes, convert both to a monthly shilling figure
          including VAT, count the pages each one publishes per month, and divide the fee by
          that number. It takes four steps and the back of an invoice.
        </p>

        <ol>
          <li>
            <strong>Convert to shillings with VAT.</strong> Add 16 percent where the agency
            is VAT-registered, and convert dollar quotes at the Central Bank of Kenya rate.
          </li>
          <li>
            <strong>Count what publishes.</strong> New or rewritten pages per month — not
            keywords tracked, not &ldquo;optimisations&rdquo;.
          </li>
          <li>
            <strong>Divide the fee by the pages.</strong> The answer is roughly what each
            published page costs you, with everything else in the package riding on it.
          </li>
          <li>
            <strong>List the first-month work separately.</strong> Technical fixes, Google
            Business Profile setup and call tracking are where cheap packages save money.
          </li>
        </ol>

        <p>
          The division is revealing. One published Kenyan package offers eight blog posts a
          month for KES 25,000, which leaves at most about KES 3,100 per post before any
          technical work, reporting or link building has been paid for. A researched page
          about a Nairobi service takes a writer most of a day. Something in that package
          is not happening, and it is usually the research. At the KES 76,000 tier with four
          posts, by contrast, there is room for the work the package describes.
        </p>

        <h2 id="vat-and-dollars">VAT and dollar quotes on the invoice</h2>

        <p>
          A Nairobi SEO quote should state whether it includes VAT, because a VAT-registered
          agency adds 16 percent to every invoice and that changes the comparison. The Kenya
          Revenue Authority applies 16 percent as the general rate on taxable services, so a
          KES 100,000 retainer becomes KES 116,000. Two quotes that look KES 10,000 apart can
          be level once one of them adds VAT and the other does not.
        </p>

        <p>
          Dollar quotes are less dangerous in Kenya than in some neighbouring markets. The
          shilling traded at KSh 129.94 to the dollar on 8 October 2026 and has stayed near
          KSh 129 for over two years. That stability is not a promise, so a dollar contract
          should still name the rate source and a review date. Our own tiers are set in
          dollars for consistency across six countries — USD 150, 400 and 900 a month — and
          invoiced in shillings at the prevailing rate: about KES 19,500, KES 52,000 and KES
          117,000 today. The details are on our <a href="/pricing">pricing page</a>; we
          mention it so you can read this article knowing exactly where we sit in it.
        </p>

        <h2 id="sector-district">What pushes a Nairobi quote up</h2>

        <p>
          Three things move a Nairobi business up the price bands: how contested its sector
          is, how many services and locations it sells, and whether its buyers are in Kenya
          or abroad. Nairobi has the strongest local SEO agency field in East Africa, so the
          agencies themselves are competing hard for terms like &ldquo;SEO agency
          Nairobi&rdquo;. That is a problem for agencies. For most other businesses the
          competition is lighter, and it is lightest at district level.
        </p>

        <ul>
          <li>
            <strong>District, not city.</strong> Buyers search for a lawyer in Upper Hill or
            a clinic in Kilimani far more precisely than they search for one &ldquo;in
            Nairobi&rdquo;. A business that targets its own district first — Westlands,
            Kilimani, Karen, the CBD — can often start in a lower band and still see
            movement.
          </li>
          <li>
            <strong>Branches and services.</strong> Each branch needs its own page and its
            own Google Business Profile. Cost follows surface area, not turnover. The
            profile work itself is covered in{' '}
            <a href="/blog/google-business-profile-optimization">
              Google Business Profile optimization
            </a>
            .
          </li>
          <li>
            <strong>Buyers abroad.</strong> A safari operator or Karen lodge is selling to
            someone in Germany or the United States who is comparing operators months ahead,
            often by asking an AI assistant. That is closer to an AI-visibility job than a
            local one, and it costs more because the competition is booking platforms, not
            the shop next door. The mechanics are in{' '}
            <a href="/blog/how-to-get-hotel-cited-by-chatgpt">
              how to get a hotel cited by ChatGPT
            </a>
            .
          </li>
        </ul>

        <p>
          Our <Link href="/ai-seo/nairobi">AI SEO service in Nairobi</Link> page sets out how this
          works across Westlands, Upper Hill, Kilimani, Karen and Gigiri, including for
          safari and travel operators.
        </p>

        <h2 id="cheap-packages">What a KES 15,000 package buys</h2>

        <p>
          A KES 15,000-a-month SEO package usually buys a keyword report, some on-page edits
          and a batch of directory or guest-post links — not the hours needed for technical
          fixes and properly researched content. That is not a moral failing by the agency.
          It is arithmetic: at that price nobody can spend the hours real work takes, so the
          parts you cannot see are the parts that get skipped.
        </p>

        <p>
          The risk goes beyond wasted money. Low-quality link packages can be discounted by
          Google, and thin articles written to a keyword count often have to be rewritten or
          removed later, which costs more than the original engagement. Be particularly
          careful with any package that lists &ldquo;guaranteed results&rdquo;. Google&rsquo;s
          own guidance on hiring an SEO is blunt: no one can guarantee a number one ranking
          on Google. The agencies that promise otherwise are optimistic about something,
          just not about your rankings.
        </p>

        <h2 id="dont-hire">When not to hire an agency yet</h2>

        <p>
          A Nairobi business should not hire an SEO agency this quarter if it needs customers
          within two months, if its buyers do not search for what it sells, or if a properly
          completed Google Business Profile would solve most of the problem for free.
        </p>

        <ul>
          <li>
            <strong>You need customers in weeks.</strong> That is a paid-search job. The
            trade-offs are in <a href="/blog/seo-vs-google-ads">SEO vs Google Ads</a>.
          </li>
          <li>
            <strong>Your buyers do not search.</strong> Plenty of Nairobi firms run on
            referrals and WhatsApp groups. If nobody types what you sell into Google, an
            agency cannot create the demand.
          </li>
          <li>
            <strong>A free profile would do.</strong> A single-location salon, clinic or
            shop often gets most of the benefit from a complete Google Business Profile,
            steady reviews and consistent contact details. That is a weekend of work, set out
            step by step in{' '}
            <a href="/blog/local-seo-for-small-business">the local SEO checklist</a>.
          </li>
          <li>
            <strong>You cannot commit past month four.</strong> The early months are close
            to flat for almost everyone, as{' '}
            <a href="/blog/how-long-does-seo-take">how long SEO realistically takes</a>{' '}
            explains. Stopping in month three means paying for the ramp and leaving before
            the return.
          </li>
        </ul>

        <p>
          We sell SEO in Nairobi, so this section is against our interest. It is still the
          right advice, and a client who started too early is not a client for long.
        </p>

        <h2 id="before-signing">Questions to ask before signing</h2>

        <p>
          Before signing with a Nairobi SEO agency, ask what publishes each month, whether the
          price includes VAT, who owns the Google accounts, how phone and WhatsApp enquiries
          are counted, and what you keep if you leave. Google&rsquo;s own hiring guide
          suggests similar questions, including what results to expect and in what
          timeframe, and whether the agency will share every change it makes to your site.
        </p>

        <ol>
          <li>How many pages publish each month, and who writes them?</li>
          <li>Is the price inclusive or exclusive of 16 percent VAT?</li>
          <li>
            Is our Google Business Profile and Search Console owned by us, with the agency
            added as a manager? The correct answer is yes.
          </li>
          <li>
            How will enquiries by phone and WhatsApp be counted? If only website forms are
            measured, most Nairobi results will be invisible.
          </li>
          <li>What results do you expect, by when, and how will you measure them?</li>
          <li>When we stop, what do we keep? The correct answer is everything.</li>
        </ol>

        <p>
          For a wider view of who does this work across the continent, see{' '}
          <a href="/blog/top-geo-ai-seo-agencies-africa-2026">
            the GEO and AI search agencies operating in Africa
          </a>
          .
        </p>

        <p>
          Otieno ran the three quotes through the division. The KES 12,000 offer published
          nothing he could point to. The $2,000 firm published four pages a month, at about
          KES 65,000 each. The Westlands agency came out at roughly KES 27,500 per published
          page including VAT, with the technical work included. He signed month to month and
          kept the skyline slide, because it was a genuinely good photograph.
        </p>

        <p>
          For what that monthly fee buys page by page, <a href="/case-studies">our case
          studies</a> itemise what shipped on four engagements.
        </p>
      </PostShell>
    </>
  );
}
