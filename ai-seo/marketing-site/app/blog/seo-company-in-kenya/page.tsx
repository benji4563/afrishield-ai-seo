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

const post = getPost('seo-company-in-kenya')!;

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
  { id: 'page-one', label: 'Who holds page one for an SEO company in Kenya' },
  { id: 'directories', label: 'What the Clutch Kenya list does and does not tell you' },
  { id: 'brs', label: 'Check the company is registered with BRS' },
  { id: 'kra-pin', label: 'Check the KRA PIN before the first invoice' },
  { id: 'odpc', label: 'Ask about data protection registration' },
  { id: 'proof', label: 'Ask for results you can check yourself' },
  { id: 'how-to-verify', label: 'How to verify an SEO company in Kenya, step by step' },
  { id: 'your-name', label: 'What must stay in your name' },
  { id: 'dont-hire', label: 'When not to hire an SEO company yet' },
];

const FAQ = [
  {
    q: 'Which is the best SEO company in Kenya?',
    a: 'There is no independent ranking that names one best SEO company in Kenya. Directory lists such as Clutch weigh verified reviews and also sell placements, and agency websites that call themselves the best are describing themselves. The best company for a given business is one that is legally registered, can show Kenyan results you can check, and suits your sector and budget.',
  },
  {
    q: 'How do I check if an SEO company is registered in Kenya?',
    a: 'Run an official search through the Business Registration Service on eCitizen. For a limited company the search is a CR12, which confirms the company exists and lists its directors. A small fee is charged on eCitizen, and the name on the search should match the name on the contract and the invoice.',
  },
  {
    q: 'How do I verify a KRA PIN for a supplier?',
    a: 'Use the free PIN Checker on the KRA iTax portal. It needs no login: you enter the PIN and answer a simple arithmetic question, and it shows the taxpayer name and whether the PIN is active, dormant or cancelled. The name shown should match the company that will invoice you.',
  },
  {
    q: 'Does an SEO company in Kenya need to register with the ODPC?',
    a: 'Often, yes. The Office of the Data Protection Commissioner exempts a data processor from mandatory registration only if its annual turnover is below KES 5 million and it has fewer than 10 employees, and it lists direct marketing among the sectors that must register regardless of size. An agency that handles your customer data, form leads or SMS and email lists should be able to tell you its position.',
  },
  {
    q: 'How much does an SEO company in Kenya charge?',
    a: 'SEO retainers in Nairobi typically run from about KES 40,000 to KES 250,000 a month, with cheaper packages below that range and large programmes above it. A VAT-registered agency adds 16 percent VAT. Compare what each quote contains, not only the monthly figure.',
  },
  {
    q: 'Can an SEO company in Kenya guarantee first-page rankings?',
    a: 'No honest SEO company can guarantee a first-page position, because Google decides rankings and changes its systems often. A company can commit to specific work, a reporting schedule and the keywords it will track. A written ranking guarantee is a reason to ask more questions, not a reason to sign.',
  },
];

const VERIFY_STEPS = [
  {
    name: 'Search the service the company sells',
    text: 'Search Google for the service and city the company claims to be good at, such as SEO company Nairobi, and note whether it appears in the organic results or only in the ads.',
  },
  {
    name: 'Run a BRS official search on eCitizen',
    text: 'Search the exact company name through the Business Registration Service. For a limited company, the CR12 confirms registration and lists the directors.',
  },
  {
    name: 'Check the KRA PIN on iTax',
    text: 'Enter the PIN from the quote into the free iTax PIN Checker and confirm the name matches and the status is active.',
  },
  {
    name: 'Ask about ODPC registration',
    text: 'Ask whether the company is registered with the Office of the Data Protection Commissioner, or why it is exempt, and check the date on any certificate it shows you.',
  },
  {
    name: 'Ask for two Kenyan results you can check',
    text: 'Ask for two Kenyan client websites and the searches they rank for, then run those searches yourself on your own phone.',
  },
  {
    name: 'Confirm ownership of every account in writing',
    text: 'Agree in the contract that the domain, website, hosting, analytics, Search Console and Google Business Profile belong to your business.',
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
      <StructuredData data={howToJsonLd(VERIFY_STEPS, 'How to verify an SEO company in Kenya')} />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To choose an <strong>SEO company in Kenya</strong>, verify it before you compare
          prices. Run a Business Registration Service search on eCitizen to confirm the company
          exists and see its directors, check its KRA PIN on the free iTax PIN Checker, and ask
          whether it is registered with the Office of the Data Protection Commissioner. Then ask
          for two Kenyan websites it has ranked and run those searches yourself. Finally, put in
          the contract that your domain, website, analytics and Google Business Profile stay in
          your name.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Achieng runs a hardware distributor in Industrial Area, Nairobi. She searched for an
            SEO company in Kenya, picked one near the top of a directory list, and paid three
            months upfront by bank transfer to the name on the invoice.
          </p>
          <p>
            Nine months later she wanted to move on. The domain was registered to the
            agency&rsquo;s director personally. The Google Business Profile had been set up on an
            agency email address. The company name on the invoice, she discovered when her
            accountant asked, did not match the name on the contract, which is the kind of
            discovery accountants enjoy far more than their clients do.
          </p>
          <p>
            None of this needed a lawyer to prevent. It needed about twenty minutes of checking,
            most of it free, before the first payment.
          </p>
        </Scene>

        <p>
          This guide is the twenty minutes. Prices are covered in{' '}
          <a href="/blog/seo-agency-nairobi-cost">what an SEO agency in Nairobi costs, in KES</a>,
          and the different kinds of agency are sorted in{' '}
          <a href="/blog/marketing-agencies-in-nairobi">marketing agencies in Nairobi, by type</a>
          . This post covers the step both of those assume you have already done: making sure the
          company is real, registered and able to show its work.
        </p>

        <h2 id="page-one">Who holds page one for an SEO company in Kenya</h2>

        <p>
          Page one for &ldquo;SEO company in Kenya&rdquo; is held mostly by small Kenyan agency
          websites, with two international directories, Clutch and DesignRush, in between. A
          search run on 12 November 2026 returned no large authority domains, no government pages
          and no news sites for the term.
        </p>

        <p>
          That tells a buyer two useful things. First, ranking for this term is achievable for a
          Kenyan agency, so an SEO company that says it is the best in Kenya but cannot be found
          for its own service has some explaining to do. Second, the agency sites on page one
          describe themselves. Testimonials on an agency&rsquo;s own homepage are chosen by the
          agency, which is why every agency homepage in the country appears to have only
          delighted clients. Treat page one as a list of candidates, not a verdict.
        </p>

        <h2 id="directories">What the Clutch Kenya list does and does not tell you</h2>

        <p>
          The Clutch list of SEO companies in Kenya is useful for finding candidates, but its top
          positions are not a ranking of Kenyan firms. When we read it on 12 November 2026 it
          listed 214 companies, and six of the first ten positions were sponsored entries for
          firms marked as serving Kenya rather than located in Kenya.
        </p>

        <p>
          Clutch is open about this. The page states that it may earn a fee for some placements
          and that its research team weighs verified reviews most heavily. Below the sponsored
          entries, the firms listed with Nairobi or Mombasa addresses were ordered largely by
          review count and rating, and the review counts were small: most had between one and
          fifteen reviews. A directory is a good place to build a shortlist of three. It is not
          a substitute for the checks below, and it cannot tell you whether a company is
          registered, tax-compliant or good at ranking a business like yours.
        </p>

        <h2 id="brs">Check the company is registered with BRS</h2>

        <p>
          Every SEO company you pay should appear in the records of the Business Registration
          Service, which you can search through eCitizen. For a limited company the official
          search is a CR12, which confirms the company exists and lists its directors.
        </p>

        <p>
          The search costs a small fee on eCitizen and takes minutes when the service is up. It
          answers three questions. Does the company legally exist? Do the names on the contract,
          the invoice and the bank account match the registered name? And who are the directors,
          in case you ever need to reach someone other than the account manager who stopped
          replying? A sole trader operating under a registered business name is not a problem in
          itself; plenty of good consultants work that way. The mismatch is the problem: a
          contract from one name, an invoice from another and a payment to a third.
        </p>

        <h2 id="kra-pin">Check the KRA PIN before the first invoice</h2>

        <p>
          Check the SEO company&rsquo;s KRA PIN on the free iTax PIN Checker before paying the
          first invoice. It needs no login, and it shows the taxpayer name and whether the PIN is
          active, dormant or cancelled.
        </p>

        <p>
          The name shown should match the company that will invoice you. If the agency charges
          VAT, which is 16 percent in Kenya, it should be VAT-registered, and a proper tax
          invoice matters to your own books. Your accountant will ask for one at year end whether
          or not anyone remembered to ask the agency. The same iTax page also has a checker for
          tax compliance certificates, which larger buyers often require from suppliers anyway.
        </p>

        <h2 id="odpc">Ask about data protection registration</h2>

        <p>
          Ask the SEO company whether it is registered with the Office of the Data Protection
          Commissioner, because an agency that handles your customer data is a data processor
          under the Data Protection Act, 2019. The ODPC exempts a processor from mandatory
          registration only if its annual turnover is below KES 5 million and it has fewer than
          10 employees.
        </p>

        <p>
          Both conditions must be met for the exemption, according to the ODPC&rsquo;s own
          guidance note. The same guidance lists direct marketing among the sectors that must
          register regardless of size, which matters if the agency will also run SMS or email
          campaigns for you. A registration certificate is valid for two years, so check the date
          on any certificate you are shown. A small consultant may genuinely be exempt, and
          saying so plainly is a fine answer. Not knowing what the question means is a less fine
          answer, given that SEO work routinely touches contact forms, lead lists and analytics.
        </p>

        <h2 id="proof">Ask for results you can check yourself</h2>

        <p>
          Ask any SEO company in Kenya for two Kenyan client websites and the searches they now
          rank for, then run those searches yourself on your own phone. A result you can
          reproduce is worth more than any screenshot in a proposal.
        </p>

        <p>
          Screenshots are easy to take from a logged-in browser, from a different country or
          from the one week a page ranked well. Your own search, on mobile data, in Nairobi,
          shows what a customer sees. Ask what the client&rsquo;s business looked like before,
          and ask to speak to one of them. For work on visibility in AI assistants rather than
          Google, the free checks in{' '}
          <a href="/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa">
            how to check if ChatGPT recommends your business
          </a>{' '}
          work just as well on an agency&rsquo;s clients as on your own business. Be wary of
          ranking guarantees. No company controls Google, and a promise of first place within
          thirty days usually means first place for a phrase nobody searches.
        </p>

        <h2 id="how-to-verify">How to verify an SEO company in Kenya, step by step</h2>

        <p>
          To verify an SEO company in Kenya, run six checks in order: search its own service,
          run a BRS search, check the KRA PIN, ask about ODPC registration, test two client
          results and agree account ownership in writing. Most of them cost nothing and the whole
          sequence fits in an afternoon.
        </p>

        <ol>
          <li>
            <strong>Search the service the company sells.</strong> Search &ldquo;SEO company
            Nairobi&rdquo; or the equivalent for its city and see whether it appears in the
            organic results, not only in the ads.
          </li>
          <li>
            <strong>Run a BRS official search on eCitizen.</strong> A CR12 for a limited company
            confirms it exists and lists the directors.
          </li>
          <li>
            <strong>Check the KRA PIN on iTax.</strong> The name should match and the status
            should be active.
          </li>
          <li>
            <strong>Ask about ODPC registration.</strong> Registered, or exempt and able to say
            why.
          </li>
          <li>
            <strong>Ask for two Kenyan results you can check.</strong> Run the searches yourself.
          </li>
          <li>
            <strong>Confirm ownership of every account in writing.</strong> Covered in the next
            section.
          </li>
        </ol>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Check</th>
                <th>Where</th>
                <th>Cost</th>
                <th>What a good answer looks like</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ranks for its own service</td>
                <td>Google, on your phone</td>
                <td>Free</td>
                <td>Appears in organic results for its own city and service</td>
              </tr>
              <tr>
                <td>Company registration</td>
                <td>BRS official search on eCitizen</td>
                <td>Small eCitizen fee</td>
                <td>Registered name matches contract, invoice and bank account</td>
              </tr>
              <tr>
                <td>Tax status</td>
                <td>iTax PIN Checker</td>
                <td>Free</td>
                <td>PIN active, name matches the invoicing company</td>
              </tr>
              <tr>
                <td>Data protection</td>
                <td>Ask; check the certificate date</td>
                <td>Free</td>
                <td>Registered with the ODPC, or a clear reason it is exempt</td>
              </tr>
              <tr>
                <td>Client results</td>
                <td>Two Kenyan client sites</td>
                <td>Free</td>
                <td>Rankings you can reproduce yourself, plus a client who answers the phone</td>
              </tr>
              <tr>
                <td>Account ownership</td>
                <td>The contract</td>
                <td>Free</td>
                <td>Every account registered to your business, agency given access only</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="your-name">What must stay in your name</h2>

        <p>
          Your domain, website and hosting, Google Analytics, Google Search Console and Google
          Business Profile should all be registered to your business, with the SEO company given
          user or manager access. That way you keep everything if the relationship ends.
        </p>

        <p>
          This is the check that would have saved Achieng the most time. A domain registered to
          an agency director personally can take weeks to transfer, and a Google Business Profile
          owned by an agency email address carries your reviews with it. A complete, owned{' '}
          <a href="/blog/google-business-profile-optimization">Google Business Profile</a> is
          often the most valuable thing an SEO company builds for a Kenyan business, which is
          exactly why it should not be in someone else&rsquo;s account. Ask for ownership before
          the work starts. Asking afterwards is possible, but it tends to arrive at the same time
          as the final invoice, and the two conversations do not improve each other.
        </p>

        <h2 id="dont-hire">When not to hire an SEO company yet</h2>

        <p>
          Do not hire an SEO company in Kenya yet if your business has no website you control, no
          Google Business Profile, or no budget to keep the work going for at least six months.
          SEO is slow, and stopping after three months usually wastes most of what was paid.
        </p>

        <ul>
          <li>
            <strong>You have no Google Business Profile.</strong> Create and verify it yourself
            first. It is free, and for a local business it is often worth more than the first
            months of any retainer.
          </li>
          <li>
            <strong>Your customers do not search.</strong> A fashion label or a new restaurant is
            usually better served by social media or paid ads, as{' '}
            <a href="/blog/marketing-agencies-in-nairobi">the Nairobi agency guide</a> explains.
          </li>
          <li>
            <strong>You need enquiries this month.</strong> Paid search gets you there faster, for
            as long as the budget runs.
          </li>
          <li>
            <strong>The budget covers three months only.</strong> Wait, save, and start when you
            can run six to twelve.
          </li>
        </ul>

        <p>
          We are an SEO company ourselves, so advising some readers not to hire one is not our
          most commercial paragraph. It is still accurate. If your customers do search and the
          checks above appeal to you, the{' '}
          <Link href="/ai-seo/nairobi">AI SEO in Nairobi</Link> page sets out what we do in Kenya,
          and the monthly prices are on the <Link href="/pricing">pricing page</Link>. Run the
          same six checks on us. It would be odd to publish them and then hope nobody did.
        </p>
      </PostShell>
    </>
  );
}
