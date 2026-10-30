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

const post = getPost('seo-company-accra-ghana')!;

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
  { id: 'good-looks-like', label: 'What a good SEO company in Accra looks like' },
  { id: 'cedi-prices', label: 'What Accra SEO companies charge, in cedis' },
  { id: 'vat-levies', label: 'VAT and levies on the invoice' },
  { id: 'directories', label: 'What the directory lists do and do not tell you' },
  { id: 'number-one', label: 'How to test a number-one claim' },
  { id: 'accra-details', label: 'Accra details a generic agency misses' },
  { id: 'shortlist', label: 'How to shortlist in an afternoon' },
  { id: 'dont-hire', label: 'When not to hire yet' },
  { id: 'before-signing', label: 'Questions to ask before signing' },
];

const FAQ = [
  {
    q: 'How much does an SEO company in Accra charge per month?',
    a: 'Ghanaian agencies publish SEO retainers from about GHS 1,500 to GHS 18,000 and above a month in 2026. Local SEO packages sit at the bottom of that range, standard retainers at roughly GHS 3,000 to GHS 7,500, and advanced or multi-location programmes above GHS 8,000. These are prices the agencies publish on their own sites, so treat them as a guide to compare quotes against, not as a quote.',
  },
  {
    q: 'Is VAT charged on SEO services in Ghana?',
    a: 'Yes, if the agency is VAT-registered. The Ghana Revenue Authority lists the rates after the reforms that took effect on 1 January 2026 as 15 percent VAT, 2.5 percent NHIL and 2.5 percent GETFund levy, with the 1 percent COVID levy abolished. That is about 20 percent in total, so ask whether a quoted price includes or excludes it before comparing two quotes.',
  },
  {
    q: 'Can an SEO company in Accra guarantee a first-page ranking on Google?',
    a: 'No. Google states that no one can guarantee a number one ranking on Google, and warns against SEOs who claim to. A credible company commits to the work it will deliver each month and the measures it will report, not to a position.',
  },
  {
    q: 'How long does SEO take to work for an Accra business?',
    a: 'One Accra agency states that most businesses see measurable movement in three to four months and significant improvement in six to nine months, with less competitive local terms sometimes moving in six to eight weeks. The early months are close to flat for almost everyone, so a contract that ends at month three pays for the slow part and leaves before the return.',
  },
  {
    q: 'Should I hire a freelancer or an SEO company in Accra?',
    a: 'A freelancer suits a single-location business with a narrow job, such as fixing a Google Business Profile and a handful of pages. A company suits several services, several branches or buyers abroad, because the work needs a writer, a technical person and someone reporting. Ask both the same questions: who does the work, what publishes each month and who owns the accounts.',
  },
  {
    q: 'Does an Accra business also need to appear in ChatGPT and other AI answers?',
    a: 'Increasingly, yes, particularly if buyers abroad research Ghanaian businesses before they travel or invest. Several Ghanaian agencies now sell AI-search work alongside SEO. The first step is to test whether AI assistants name your business at all, which takes about an hour and costs nothing.',
  },
];

const SHORTLIST_STEPS = [
  {
    name: 'Search for what the company says it is best at',
    text: 'Search Google for the service the company claims to be best at, from an Accra location. If its own site does not appear, treat the claim as marketing and not as evidence.',
  },
  {
    name: 'Convert each quote to cedis with VAT and levies',
    text: 'Restate every quote as a monthly cedi figure. Add VAT and the NHIL and GETFund levies, about 20 percent in total, where the company is VAT-registered, and convert any dollar quote at the prevailing rate.',
  },
  {
    name: 'Count what publishes and divide',
    text: 'Write down how many new or rewritten pages each quote publishes per month and divide the fee by that number. A figure far below what a writer charges for one researched page means something else in the package is not being done.',
  },
  {
    name: 'Ask for two named references and a sample report',
    text: 'Ask for two clients you can contact by name and one real monthly report with the client details removed. A company that has done the work can produce both within a day.',
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
        data={howToJsonLd(SHORTLIST_STEPS, 'How to shortlist an SEO company in Accra')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          The right <strong>SEO company in Accra, Ghana</strong> is one that publishes its
          price in cedis, names the people who write and fix, gives you ownership of your
          Google accounts and promises work rather than a ranking. Ghanaian agencies publish
          retainers from about <strong>GHS 1,500 to GHS 18,000 and above a month</strong> in
          2026, and a VAT-registered company adds VAT and levies of about 20 percent on top.
          Google states that no one can guarantee a number one ranking, so a guarantee is a
          reason to keep looking.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Ama runs a dental clinic in East Legon. Most of her patients arrive by referral,
            and she would like some of the next ones to arrive by Google. So she typed
            &ldquo;SEO company Accra Ghana&rdquo; into her phone and pressed search.
          </p>
          <p>
            The results were agencies, and several of them were, by their own account, number
            one. This is mathematically impressive. Below them sat a directory with nine
            names, a star rating beside three of them and a blank beside the rest.
          </p>
          <p>
            Ama did not need a list of companies. She needed a way to tell the good one from
            the confident one, and nobody had put that on a page.
          </p>
        </Scene>

        <p>
          This guide is that page. We have already covered the money side in dollars, in{' '}
          <a href="/blog/what-seo-actually-costs">our general guide to what SEO costs</a>,
          and in{' '}
          <a href="/blog/seo-agency-nairobi-cost">shillings for Nairobi</a>. This is the
          Ghanaian version: the cedi prices agencies publish, the tax line most quotes leave
          out, and a short way to choose between companies that all sound the same.
        </p>

        <h2 id="good-looks-like">What a good SEO company in Accra looks like</h2>

        <p>
          A good SEO company in Accra can show its own rankings, name the person doing each
          part of the work, and let you own every account it touches. Those three things are
          checkable in an afternoon, which is more than can be said for &ldquo;award-winning&rdquo;.
        </p>

        <ul>
          <li>
            <strong>It ranks for something it sells.</strong> A company that cannot get its
            own site in front of anyone is asking you to trust it with yours.
          </li>
          <li>
            <strong>It names the team.</strong> One Ghanaian agency&rsquo;s own advice is to ask
            who fills the strategist, technical, writer, link-building and reporting roles
            on your account. If the answer is vague, that is information.
          </li>
          <li>
            <strong>It hands you the keys.</strong> Your Google Business Profile, Search
            Console and analytics should belong to you, with the company added as a manager.
          </li>
          <li>
            <strong>It promises work, not positions.</strong> Google&rsquo;s guidance on
            hiring an SEO is direct: no one can guarantee a number one ranking on Google, and
            it advises caution with anyone who claims a special relationship with Google.
          </li>
        </ul>

        <h2 id="cedi-prices">What Accra SEO companies charge, in cedis</h2>

        <p>
          SEO companies in Accra publish retainers from about GHS 1,500 to GHS 18,000 and
          above a month, and the price follows scope and competition rather than company
          size. The figures below come from pricing pages that Ghanaian agencies published in
          2026, so they show what is advertised, not what any one company will quote you.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Monthly spend</th>
                <th>Published as</th>
                <th>Who it suits</th>
                <th>What it realistically buys</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GHS 1,500–3,500</td>
                <td>Basic or local SEO</td>
                <td>One shop, clinic or office; small service providers</td>
                <td>
                  Google Business Profile management and on-page fixes, with little room for
                  monthly content. Cheap retainers are priced per keyword, and a tracked
                  keyword is not a ranked one.
                </td>
              </tr>
              <tr>
                <td>GHS 3,000–7,500</td>
                <td>Standard or growth SEO</td>
                <td>Established SMEs, B2B firms, regional online shops</td>
                <td>
                  Technical fixes, a keyword map, several researched pages a month, local
                  SEO and monthly reporting
                </td>
              </tr>
              <tr>
                <td>GHS 8,000–18,000+</td>
                <td>Advanced or enterprise SEO</td>
                <td>Multi-location companies, developers, competitive e-commerce</td>
                <td>
                  Several services or branches, a larger content programme, link building
                  and competitor tracking
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Two published figures help with the arithmetic. One Accra agency lists content at
          GHS 300 to GHS 900 per article and one-off audits at GHS 1,000 to GHS 3,000.
          Four researched articles at those rates already cost GHS 1,200 to GHS 3,600, which
          is why a GHS 1,500 retainer that also promises technical work, reporting and four
          articles needs a question or two. Our own tiers start at USD 150 a month and are
          invoiced in cedis at the prevailing rate; the details are on our{' '}
          <a href="/pricing">pricing page</a>, so you know where we sit in this article.
        </p>

        <h2 id="vat-levies">VAT and levies on the invoice</h2>

        <p>
          A VAT-registered SEO company in Accra adds 15 percent VAT, a 2.5 percent National
          Health Insurance Levy and a 2.5 percent GETFund levy to its price, about 20 percent
          in total. The Ghana Revenue Authority lists those rates as applying after the
          reforms effective 1 January 2026, and records that the 1 percent COVID levy has been
          abolished.
        </p>

        <p>
          The practical effect is that a GHS 5,000 quote from a registered company is closer
          to GHS 6,000 on the invoice. Two quotes that look GHS 1,000 apart can be level once
          one adds the tax and the other does not. Ask each company the same plain question:
          is this price before or after VAT and levies? Dollar quotes need a second
          question, which is which exchange-rate source the invoice will use and when it is
          reviewed.
        </p>

        <h2 id="directories">What the directory lists do and do not tell you</h2>

        <p>
          A directory list of Ghanaian SEO companies shows who has filled in a profile, not
          who produces results. The October 2026 Manifest list of local SEO companies in
          Ghana names nine, of which six carry no reviews and three carry one each. Five of
          the nine describe themselves as web design, e-commerce, branding or digital
          strategy firms, with SEO as one line on the menu.
        </p>

        <p>
          That is not a criticism of those firms; a web designer who also does SEO is a
          perfectly reasonable thing to be. It is a reason to read a directory as a
          starting list. A profile badge is a participation certificate with better
          typography. The checks that matter, below, are ones a directory cannot do for you.
        </p>

        <h2 id="number-one">How to test a number-one claim</h2>

        <p>
          Test a number-one claim by searching for the service the company says it is best at
          and seeing whether its own site appears. Among the first eight results for this
          very query, at least two agencies describe themselves as number one, which cannot
          all be true at once.
        </p>

        <p>
          Run the search from a phone in Accra, because that is where your customers are.
          Then search the agency&rsquo;s own claim in a second form, such as &ldquo;SEO
          services East Legon&rdquo; or &ldquo;Google Business Profile Accra&rdquo;. A company
          that ranks for its own neighbourhood and service has done at least one version of
          the job. A company that does not may still be good, but it has asked you to take
          that on faith. Our guide to{' '}
          <a href="/blog/top-geo-ai-seo-agencies-africa-2026">the GEO and AI search agencies
          operating in Africa</a> applies the same test across the continent.
        </p>

        <h2 id="accra-details">Accra details a generic agency misses</h2>

        <p>
          Accra needs three things a generic agency often misses: an address that matches
          everywhere including the GhanaPostGPS code, WhatsApp counted as a real enquiry
          channel, and a plan for buyers who search from abroad.
        </p>

        <ul>
          <li>
            <strong>The address.</strong> GhanaPostGPS divides Ghana into 5-metre squares and
            gives each a digital address, in a format such as GA-543-0125. A landmark
            description such as &ldquo;next to the blue kiosk&rdquo; is charming and
            unsearchable. Your Google Business Profile, your website and your listings should
            give the same street description, with the digital address added, so that Google
            sees one business and not three. The mechanics are in{' '}
            <a href="/blog/google-business-profile-optimization">
              Google Business Profile optimization
            </a>
            .
          </li>
          <li>
            <strong>WhatsApp.</strong> For most Accra businesses the enquiry arrives as a
            WhatsApp message, not a form submission. If the reporting counts only forms, most
            of the results will be invisible, and a good month will look like a quiet one.
          </li>
          <li>
            <strong>Buyers abroad.</strong> Returnees and the diaspora research Ghanaian
            businesses from the UK, the US and Canada, on desktop and months ahead, and
            increasingly by asking an AI assistant. That is closer to an AI-visibility job
            than a neighbourhood one. The first step is{' '}
            <a href="/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa">
              checking whether ChatGPT recommends your business
            </a>
            , which takes about an hour.
          </li>
        </ul>

        <p>
          Our <Link href="/ai-seo/accra">AI SEO service in Accra</Link> page sets out how this
          works across Osu, East Legon, Cantonments, Airport Residential and Tema.
        </p>

        <h2 id="shortlist">How to shortlist in an afternoon</h2>

        <p>
          You can shortlist SEO companies in Accra in an afternoon with four checks, none of
          which needs a meeting. Do them for every company you are considering, in the same
          order, so that the comparison is fair.
        </p>

        <ol>
          <li>
            <strong>Search for what it claims to be best at.</strong> Does its own site
            appear, from an Accra location, for the service it sells?
          </li>
          <li>
            <strong>Convert to cedis with VAT and levies.</strong> About 20 percent on top
            where the company is registered.
          </li>
          <li>
            <strong>Count what publishes and divide.</strong> New or rewritten pages per
            month, not keywords tracked. The answer is roughly what each page costs you.
          </li>
          <li>
            <strong>Ask for two named references and a sample report.</strong> A company that
            has done the work can produce both in a day.
          </li>
        </ol>

        <p>
          The same reasoning, applied to a different market, is worked through in{' '}
          <a href="/blog/how-much-does-seo-cost-in-nigeria">what SEO costs in Nigeria</a>,
          where the naira makes the exchange-rate question much louder.
        </p>

        <h2 id="dont-hire">When not to hire yet</h2>

        <p>
          An Accra business should not hire an SEO company this quarter if it needs
          customers within two months, if its buyers do not search for what it sells, or if a
          properly completed Google Business Profile would solve most of the problem for
          free.
        </p>

        <ul>
          <li>
            <strong>You need customers in weeks.</strong> That is a paid-search job. The
            trade-offs are in <a href="/blog/seo-vs-google-ads">SEO vs Google Ads</a>.
          </li>
          <li>
            <strong>Your buyers do not search.</strong> If your customers arrive by referral
            and WhatsApp group, an agency cannot create demand that is not typed into Google.
          </li>
          <li>
            <strong>A free profile would do.</strong> A single-location salon, clinic or shop
            often gets most of the benefit from a complete Google Business Profile, steady
            reviews and one consistent address. That is a weekend of work, set out in{' '}
            <a href="/blog/local-seo-for-small-business">the local SEO checklist</a>.
          </li>
          <li>
            <strong>You cannot commit past month four.</strong> The early months are close to
            flat, as{' '}
            <a href="/blog/how-long-does-seo-take">how long SEO realistically takes</a>{' '}
            explains. Stopping at month three means paying for the ramp and leaving before the
            return.
          </li>
        </ul>

        <p>
          We sell SEO in Accra, so this section is against our interest. It is still the
          right advice, and a client who started too early is not a client for long.
        </p>

        <h2 id="before-signing">Questions to ask before signing</h2>

        <p>
          Before signing with an SEO company in Accra, ask what publishes each month, whether
          VAT and levies are included, who owns the Google accounts, how WhatsApp and phone
          enquiries are counted, and what you keep if you leave.
        </p>

        <ol>
          <li>How many pages publish each month, and who writes them?</li>
          <li>Is the price before or after VAT, NHIL and GETFund levy?</li>
          <li>
            Are our Google Business Profile and Search Console owned by us, with the company
            added as a manager? The correct answer is yes.
          </li>
          <li>
            How will WhatsApp calls and messages be counted? If only website forms are
            measured, most Accra results will be invisible.
          </li>
          <li>What results do you expect, by when, and how will you measure them?</li>
          <li>
            When we stop, what do we keep, and is there a lock-in of twelve months or more?
            The correct answers are everything, and no.
          </li>
        </ol>

        <p>
          Ama ran her shortlist through the four checks. One company did not appear for its
          own claim, one quoted a price that left out VAT and the levies, and one named the
          person who would write her pages and sent a sample report the same afternoon. She
          signed that one month to month, and kept the number-one brochure for the
          paperwork shelf.
        </p>

        <p>
          For what a monthly fee buys page by page, <a href="/case-studies">our case
          studies</a> itemise what shipped on four engagements.
        </p>
      </PostShell>
    </>
  );
}
