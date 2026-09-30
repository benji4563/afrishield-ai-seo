import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('how-much-does-seo-cost-in-nigeria')!;

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
  { id: 'naira-ranges', label: 'SEO prices in Nigeria, in naira' },
  { id: 'who-charges-what', label: 'Freelancer, agency, or in-house hire' },
  { id: 'lagos-vs-rest', label: 'Does SEO cost more in Lagos?' },
  { id: 'what-drives-price', label: 'What pushes a Nigerian quote up or down' },
  { id: 'exchange-rate', label: 'The exchange-rate clause' },
  { id: 'break-even', label: 'Working out what you can afford' },
  { id: 'cheap-seo', label: 'What ₦50,000-a-month SEO buys' },
  { id: 'dont-pay', label: 'When not to pay for SEO yet' },
  { id: 'before-signing', label: 'Questions to ask before signing' },
];

const FAQ = [
  {
    q: 'How much does SEO cost per month in Nigeria?',
    a: 'Most Nigerian small and mid-sized businesses paying for real SEO spend between ₦200,000 and ₦1,500,000 a month in 2026, roughly $150 to $1,100 at about ₦1,370 to the dollar. A single-location business in Lagos or Abuja with monthly content usually lands between ₦300,000 and ₦700,000. Competitive sectors such as fintech, e-commerce and Lekki real estate start near ₦1,000,000.',
  },
  {
    q: 'How much do SEO freelancers charge in Nigeria?',
    a: 'Nigerian SEO freelancers commonly quote between ₦50,000 and ₦250,000 a month, and some charge per task instead. At the lower end the work is usually a report, some directory links and light on-page edits. A skilled freelancer who also writes researched content will sit near the top of that range or above it.',
  },
  {
    q: 'Is SEO cheaper than Google Ads in Nigeria?',
    a: 'Not in the first few months. Google Ads buys clicks from the first day and stops the moment the budget stops, while SEO costs a similar amount for three to six months before it produces much. After that, SEO keeps producing without a per-click charge, which is why it usually becomes the cheaper channel over a year or more.',
  },
  {
    q: 'Should a Nigerian business pay for SEO in naira or dollars?',
    a: 'Pay in naira where you can, or agree the exchange-rate source and review date in writing if the price is set in dollars. A dollar retainer that looks affordable today can cost far more in naira within a year if the rate moves. The contract should say which rate applies and when it is checked.',
  },
  {
    q: 'How much does a one-off SEO audit cost in Nigeria?',
    a: 'A one-off technical SEO audit from a Nigerian agency typically costs between ₦250,000 and ₦500,000, depending on the size of the site. It should end with a prioritised list of fixes you keep, not just a score. For a small business with someone willing to write, an audit plus a keyword map can be a better first purchase than a retainer.',
  },
  {
    q: 'How long before SEO pays for itself for a Nigerian business?',
    a: 'For most service businesses with a decent customer value, somewhere between month five and month nine, provided publishing is consistent from month one. Area-level searches in Lagos, such as a service plus Lekki or Ikeja, tend to move sooner than city-wide head terms. If the work stops in month three, it rarely pays back at all.',
  },
];

const BREAK_EVEN_STEPS = [
  {
    name: 'Put a naira value on one customer',
    text: 'Estimate what an average new customer is worth to the business over the whole relationship, in naira, not just the first invoice.',
  },
  {
    name: 'Divide the monthly quote by that value',
    text: 'Divide the proposed monthly SEO fee in naira by the customer value. The result is how many new customers a month the work must produce to break even.',
  },
  {
    name: 'Add the ramp months',
    text: 'Multiply the monthly fee by four. That is roughly what you will spend before SEO produces a meaningful return, and it is the number to budget for.',
  },
  {
    name: 'Stress-test the exchange rate',
    text: 'If the quote is in dollars, recalculate the naira fee at a rate 20 percent weaker than today and check that the arithmetic still works.',
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
          BREAK_EVEN_STEPS,
          'How to work out what SEO a Nigerian business can afford',
        )}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          In Nigeria, SEO for a small or mid-sized business typically costs{' '}
          <strong>between ₦200,000 and ₦1,500,000 a month</strong> in 2026 — roughly $150 to
          $1,100 at about ₦1,370 to the dollar. A single-location business in Lagos or Abuja
          buying real monthly content usually pays ₦300,000 to ₦700,000. Freelancers quote
          from about ₦50,000, but below roughly ₦150,000 there are rarely enough hours to fix
          the site and publish. A one-off technical audit costs ₦250,000 to ₦500,000.
          Competitive sectors — fintech, e-commerce, Lekki real estate — start near
          ₦1,000,000 a month.
        </ShortAnswer>

        <Scene>
          <p>
            Funmi runs a physiotherapy clinic in Yaba. Most of her patients arrive through
            referrals and WhatsApp, and she wanted more of them to arrive through Google
            instead. So she asked for quotes.
          </p>
          <p>
            She got three. A freelancer on Instagram offered &ldquo;full SEO&rdquo; for
            ₦45,000 a month. An agency in Lekki quoted ₦380,000. A UK firm quoted $1,200 a
            month, which was about ₦1.6 million that week and, as she pointed out, a
            different number every week after. Her nephew, who knows computers and built
            the clinic&rsquo;s current website, offered to do it for free. That website is
            part of why she was asking.
          </p>
          <p>
            None of the quotes was dishonest. They were pricing four very different jobs
            under one word, and nobody had told her which job she actually needed.
          </p>
        </Scene>

        <p>
          This is the Nigerian version of a question we have answered before in{' '}
          <a href="/blog/what-seo-actually-costs">our general guide to what SEO actually costs</a>,
          which works in dollars and global averages. Here the numbers are in naira, the
          examples are Nigerian, and the exchange rate gets the attention it deserves.
        </p>

        {/*
          Cluster N (Nigeria commercial) back-fill: when these queue rows publish, add
          in-body links from this post to them —
            row 35 /blog/how-long-does-seo-take-in-nigeria  (from #break-even, ramp months)
            row 33 /blog/how-to-appear-on-google-maps-in-lagos (from #dont-pay, GBP point)
            row 43 /blog/best-seo-agency-in-nigeria          (from #before-signing)
            row 44 /blog/digital-marketing-vs-seo-for-nigerian-businesses (from #dont-pay)
        */}

        <h2 id="naira-ranges">SEO prices in Nigeria, in naira</h2>

        <p>
          Nigerian SEO prices run from under ₦100,000 a month for basic freelance packages
          to more than ₦1,500,000 for national brands, and most small businesses buying real
          agency work pay ₦300,000 to ₦700,000 a month. The ranges below are drawn from what Nigerian agencies publish on their
          own pricing pages and from the quotes we see businesses bring to us. The dollar
          column uses roughly ₦1,370 to the dollar, the rate at the end of September 2026.
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
                <td>Under ₦100,000</td>
                <td>Under $75</td>
                <td>Freelancers, &ldquo;basic SEO&rdquo; packages</td>
                <td>
                  A report, some directory links, occasional title edits. The word
                  &ldquo;basic&rdquo; is doing heroic work here.
                </td>
              </tr>
              <tr>
                <td>₦100,000–₦300,000</td>
                <td>$75–$220</td>
                <td>Solo consultants, small agencies</td>
                <td>
                  Technical fixes, Google Business Profile work, one or two pages a month for
                  a low-competition single location
                </td>
              </tr>
              <tr>
                <td>₦300,000–₦700,000</td>
                <td>$220–$510</td>
                <td>Lagos and Abuja agencies</td>
                <td>
                  Keyword map, technical foundation, two to four pages a month, local pages,
                  monthly reporting
                </td>
              </tr>
              <tr>
                <td>₦700,000–₦1,500,000</td>
                <td>$510–$1,100</td>
                <td>Established Nigerian agencies</td>
                <td>
                  Several services or branches, four or more pages a month, link outreach,
                  competitor tracking
                </td>
              </tr>
              <tr>
                <td>₦1,500,000+</td>
                <td>$1,100+</td>
                <td>Top local agencies, foreign firms</td>
                <td>
                  Fintech, e-commerce or national brands: weekly publishing, digital PR, a
                  team rather than a person
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          One-off work is priced separately. A technical audit typically runs ₦250,000 to
          ₦500,000, and a full on-site optimisation project ₦750,000 to ₦1,400,000. Agency
          rate cards put a researched article at ₦100,000 to ₦250,000; cheaper writers
          exist, and the difference is usually research, not typing.
        </p>

        <h2 id="who-charges-what">Freelancer, agency, or in-house hire</h2>

        <p>
          Nigerian freelancers usually charge ₦50,000 to ₦250,000 a month, Nigerian agencies
          ₦250,000 to ₦1,500,000, and foreign agencies $1,000 or more — upwards of ₦1,370,000
          — billed in dollars, while an in-house hire costs a salary from roughly ₦220,000 a
          month before tools and writing. Each is the right choice for someone.
        </p>

        <ul>
          <li>
            <strong>A freelancer</strong> suits a business that mainly needs a clean site and
            a well-kept Google Business Profile, and that has someone in-house who can write.
            You are buying one person&rsquo;s hours, so ask exactly how many.
          </li>
          <li>
            <strong>A Nigerian agency</strong> suits a business that needs content published
            every month and cannot write it internally. The good ones know that a Lagos
            buyer searches &ldquo;physiotherapist in Surulere&rdquo; rather than
            &ldquo;physiotherapist in Lagos,&rdquo; and write for it.
          </li>
          <li>
            <strong>A foreign agency</strong> suits a Nigerian business selling abroad —
            exporters, diaspora-facing services, some fintechs. For a business whose
            customers are in Ikeja, it mostly means paying dollar rates for content that
            reads as if it were written for Manchester.
          </li>
          <li>
            <strong>An in-house hire</strong> suits a business with enough search work to
            fill a full-time role — usually several branches or an online store. Full-time
            SEO roles on Nigerian job boards are advertised from roughly ₦220,000 a month,
            and an experienced hire costs considerably more. Add paid tools, often priced in
            dollars, and someone to write, and one person in-house rarely comes in cheaper
            than a mid-range agency until the workload is genuinely full-time.
          </li>
        </ul>

        <h2 id="lagos-vs-rest">Does SEO cost more in Lagos?</h2>

        <p>
          SEO costs somewhat more in Lagos than elsewhere in Nigeria, not because agencies
          there charge higher hourly rates, but because Lagos search terms are more
          contested and take more work to win. A dental clinic on Victoria Island is
          competing with more well-built sites than a dental clinic in Enugu or Ibadan, so
          it needs more pages and more months to reach the same position.
        </p>

        <p>
          The useful detail is that Lagos buyers search by area. Because a trip from Ikoyi to
          Ikeja can swallow an afternoon, people type &ldquo;lawyer in Lekki&rdquo; or
          &ldquo;laptop repair Computer Village&rdquo; far more often than the city name alone.
          Area-level terms like these are much cheaper to win than a city-wide head term, so a
          Lagos business can often start in the ₦300,000 band by targeting its own district
          first. Our{' '}
          <a href="/ai-seo/lagos">Lagos SEO page</a> sets out how that works across Victoria
          Island, Lekki, Ikeja, Yaba and Surulere. Abuja is generally less contested for
          commercial terms, which is why{' '}
          <a href="/ai-seo/abuja">SEO in Abuja</a> often shows results sooner for the same
          spend.
        </p>

        <h2 id="what-drives-price">What pushes a Nigerian quote up or down</h2>

        <p>
          Five things decide where a Nigerian business lands within those bands: its sector,
          the state of its website, how many services and locations it sells, whether anyone
          in-house can write, and whether AI answers are in scope.
        </p>

        <ul>
          <li>
            <strong>Sector.</strong> Fintech, real estate, law, private healthcare and
            e-commerce are the crowded Nigerian search markets. Logistics firms in Apapa or a
            specialist supplier in Kano may be competing with three sites, one of which has
            not been updated since before the pandemic.
          </li>
          <li>
            <strong>The website.</strong> Many Nigerian business sites are WordPress builds
            with heavy themes on cheap shared hosting. A buyer on mobile data with one bar of
            signal will not wait for them, and neither will Google. Fixing that is billed
            before a single word publishes.
          </li>
          <li>
            <strong>Services and locations.</strong> A clinic with branches in Lekki, Ikeja
            and Abuja needs a page per branch and a Google Business Profile per branch. Cost
            scales with surface area, not revenue.
          </li>
          <li>
            <strong>Writing.</strong> If someone in the business can draft a factually
            correct page, the provider edits rather than researches from zero, and the bill
            drops.
          </li>
          <li>
            <strong>AI answers.</strong> Getting named inside ChatGPT, Perplexity or
            Google&rsquo;s AI overview for Nigerian queries is extra work on top of
            ranking — structured data, answer-first pages, corroboration elsewhere. It is
            cheaper in Nigeria than in most markets, because so few Nigerian businesses have
            done it yet.
          </li>
        </ul>

        <h2 id="exchange-rate">The exchange-rate clause</h2>

        <p>
          For any SEO quote priced in dollars, the exchange-rate clause matters more than the
          headline price, because the naira cost moves every time the rate does. When the
          naira was floated in 2023 it went from around ₦460 to the dollar to beyond ₦1,400
          within about a year. A $500 retainer that cost roughly ₦230,000 a month at the
          start of that period cost about ₦700,000 by the end of it, without anyone
          touching the contract.
        </p>

        <p>
          In fairness to the industry, the exchange rate is the only part of SEO that
          reliably moves every month. You still want it written down. Three habits protect
          you:
        </p>

        <ul>
          <li>
            <strong>Prefer a naira price</strong> with a stated review date, such as every
            six months.
          </li>
          <li>
            <strong>If the price is in dollars, name the rate source</strong> — the official
            rate on the invoice date, for example — so nobody is inventing one.
          </li>
          <li>
            <strong>Pay monthly in arrears</strong> rather than quarterly in advance. A small
            discount for paying ahead is not worth losing the option to stop.
          </li>
        </ul>

        <p>
          Our own tiers are set in dollars for consistency across six countries — USD 150,
          400 and 900 a month — and invoiced in naira at the prevailing rate: about
          ₦205,000, ₦548,000 and ₦1,233,000 at today&rsquo;s rate. That puts them in the
          middle of the Nigerian market, and the full detail is on our{' '}
          <a href="/pricing">pricing page</a>. We mention it here so you can weigh this whole
          article knowing where we sit in it.
        </p>

        <h2 id="break-even">Working out what you can afford</h2>

        <p>
          What a Nigerian business can afford for SEO comes down to one division: the monthly
          fee in naira divided by what a new customer is worth, which tells you how many new
          customers a month the work must produce to break even. It takes four steps and a
          calculator.
        </p>

        <ol>
          <li>
            <strong>Put a naira value on one customer</strong> over the whole relationship,
            not just the first invoice.
          </li>
          <li>
            <strong>Divide the monthly quote by that value.</strong> The answer is the number
            of new customers a month you need.
          </li>
          <li>
            <strong>Add the ramp.</strong> Multiply the monthly fee by four — that is roughly
            what you spend before the return arrives.
          </li>
          <li>
            <strong>Stress-test the rate.</strong> If the quote is in dollars, redo the sum at
            a rate 20 percent weaker than today.
          </li>
        </ol>

        <p>
          Funmi&rsquo;s clinic: a patient who completes a course of treatment is worth about
          ₦150,000. At the ₦380,000 Lekki quote, SEO needs to produce{' '}
          <strong>between two and three new patients a month</strong> to break even. That is
          a modest bar for a clinic in a busy mainland district. The
          harder question is the ramp: about ₦1,520,000 over four months before much happens.
          The first three months are close to flat for everyone, which is covered in more
          detail in{' '}
          <a href="/blog/how-long-does-seo-take">how long SEO realistically takes</a>.
        </p>

        <h2 id="cheap-seo">What ₦50,000-a-month SEO buys</h2>

        <p>
          At ₦50,000 a month, SEO usually buys an automated ranking report, a batch of
          low-quality backlinks, and occasional edits to page titles — not enough hours for
          technical fixes and new content. At that price nobody is spending the fifteen or so
          hours a month that real work takes, so something gets skipped, and it is usually
          the part that matters.
        </p>

        <p>
          The risk is not only wasted money. Cheap backlink packages can pull a site down
          when Google discounts them, and cleaning up forty thin pages costs more than the
          original engagement did. Six months at ₦50,000 is ₦300,000 spent to arrive back
          where you started, which is the most expensive way to stay still. Be especially
          wary of any offer that guarantees page one — nobody controls Google&rsquo;s
          results, and the people who promise otherwise have simply not been caught out yet
          this quarter.
        </p>

        <h2 id="dont-pay">When not to pay for SEO yet</h2>

        <p>
          A Nigerian business should not pay for SEO this quarter if it needs customers
          within eight weeks, if its customers do not search for what it sells, or if a free
          Google Business Profile would already solve most of the problem.
        </p>

        <ul>
          <li>
            <strong>You need customers in the next two months.</strong> That is a paid-ads
            problem, not an SEO one. The trade-offs are laid out in{' '}
            <a href="/blog/seo-vs-google-ads">SEO vs Google Ads for a small business</a>.
          </li>
          <li>
            <strong>Your customers do not search.</strong> Plenty of Nigerian businesses run
            on referrals, Instagram and WhatsApp broadcast lists — WhatsApp is often the real
            CRM. If nobody types what you sell into Google, optimising for Google invents no
            demand.
          </li>
          <li>
            <strong>A free profile would do it.</strong> A single-location shop, salon or
            clinic can often get most of the benefit from a properly completed Google
            Business Profile, reviews and consistent contact details. That is a weekend of
            work, and{' '}
            <a href="/blog/local-seo-for-small-business">the local SEO checklist</a> walks
            through it for nothing.
          </li>
          <li>
            <strong>Your website cannot take an enquiry.</strong> If the contact form is
            broken or the WhatsApp button goes nowhere, fix that first. Traffic to a dead end
            is expensive nothing.
          </li>
          <li>
            <strong>You cannot commit past month four.</strong> Stopping in month three is
            worse than never starting, because you paid all of the cost and received none of
            the return.
          </li>
        </ul>

        <h2 id="before-signing">Questions to ask before signing</h2>

        <p>
          Before signing with any SEO provider in Nigeria, ask five questions: what publishes
          each month, which exchange rate applies, who owns the domain and hosting, how
          WhatsApp and phone enquiries are tracked, and what you keep if you leave.
        </p>

        <ol>
          <li>
            How many pages publish each month, and who writes them?
          </li>
          <li>
            If the price is in dollars, which rate is used, and when is it reviewed?
          </li>
          <li>
            Is the domain registered in our name, and do we hold the hosting login? (It is
            surprisingly common in Nigeria for a provider to register a client&rsquo;s domain
            in its own name. The correct answer is yes, and yes.)
          </li>
          <li>
            How will enquiries that arrive by WhatsApp or phone be counted? If only
            contact-form leads are measured, most Nigerian results will be invisible.
          </li>
          <li>
            When we stop, what do we keep? The correct answer is everything.
          </li>
        </ol>

        <p>
          Funmi took the Lekki quote, month to month, with the rate question moot because it
          was in naira. She did the two-to-three-patients arithmetic on the back of an
          appointment card. That is the right way to make this decision: not by asking
          whether ₦380,000 is a lot of money, but by working out how little the work has to
          do to be worth it. Her nephew has been reassigned to the clinic&rsquo;s printer.
        </p>
      </PostShell>
    </>
  );
}
