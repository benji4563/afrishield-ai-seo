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

const post = getPost('how-to-check-if-chatgpt-recommends-your-business-in-africa')!;

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
  { id: 'one-question', label: 'Why one question proves nothing' },
  { id: 'clean-session', label: 'Set up a clean test session' },
  { id: 'location', label: 'Test from where your customers are' },
  { id: 'prompts', label: 'Ask the way African customers ask' },
  { id: 'record', label: 'Run the test and record a score' },
  { id: 'sources', label: 'Read the sources, not just the names' },
  { id: 'results', label: 'What your result means and what to fix' },
  { id: 'not-yet', label: 'When this test is not worth your time yet' },
];

const FAQ = [
  {
    q: 'How do I check if ChatGPT recommends my business?',
    a: 'Open ChatGPT logged out, or in an unpersonalized temporary chat, and ask the questions your customers would ask, naming your city and service. Ask each question three times, record which businesses are named and which sources are cited, and repeat the same set in Perplexity and Gemini. Your result is the share of answers that name you.',
  },
  {
    q: 'Why does ChatGPT give different answers each time I ask?',
    a: 'ChatGPT generates each answer fresh, and when it searches the web it may rewrite your question into different search queries and read different pages. The same question can therefore name a business on one run and leave it out on the next. That is why a single answer is not a reliable test.',
  },
  {
    q: 'Does ChatGPT know where I am when I ask for a local business?',
    a: 'Yes, approximately. OpenAI says ChatGPT may estimate your general location, such as your country or city, from your IP address and use it to find local results. A business owner testing from Lagos can therefore see different answers from a customer asking the same question in London or Abuja.',
  },
  {
    q: 'Should I test ChatGPT logged in or logged out?',
    a: 'Test logged out, or in a temporary chat set to Unpersonalized. OpenAI says web search is available without signing in, and that an unpersonalized temporary chat does not use memory or custom instructions. A logged-in account that knows you own the business can shape the answer in your favour.',
  },
  {
    q: 'Why does ChatGPT recommend a directory instead of my business?',
    a: 'ChatGPT builds its answer from the pages its search finds, and in many African markets directories and listicles fill much of page one. If a directory describes your category more clearly than your own site does, the assistant repeats the directory. Check the cited sources to see which pages it relied on.',
  },
  {
    q: 'How often should I check whether ChatGPT recommends my business?',
    a: 'Once a month is enough for most businesses. Run the same questions, from the same locations, on roughly the same day each month, so that a change in the result reflects a change in your sources rather than a change in the test. Check again after a large change such as a move or a new website.',
  },
];

const TEST_STEPS = [
  {
    name: 'Write ten customer questions',
    text: 'Write ten questions a customer would ask an AI assistant about your service, naming your city or neighbourhood, and mix category, problem, comparison and brand questions.',
  },
  {
    name: 'Open a clean session',
    text: 'Use ChatGPT logged out, or a temporary chat set to Unpersonalized, and make sure Search is used so the answer draws on the current web.',
  },
  {
    name: 'Ask each question three times',
    text: 'Ask every question three times in separate sessions, and save the full answer and the sources cited each time.',
  },
  {
    name: 'Score the answers',
    text: 'For every answer, record whether your business is named, its position in the list, whether its details are correct, and which competitors and directories appear.',
  },
  {
    name: 'Repeat in other assistants',
    text: 'Run the same questions in Perplexity and Gemini, and check whether Google shows an AI Overview for your main search.',
  },
  {
    name: 'Repeat monthly',
    text: 'Run the same test on roughly the same day each month, change one thing at a time on your site and listings, and compare your share of answers.',
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
        data={howToJsonLd(TEST_STEPS, 'How to check if ChatGPT recommends your business in Africa')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          To check if ChatGPT recommends your business in Africa, ask it the questions your
          customers ask, naming your city, in a clean session: logged out, or in a temporary chat
          set to Unpersonalized, with web search on. Ask each question three times, because answers
          change between runs, and record who is named and which sources are cited. Repeat the
          test in Perplexity and Gemini. The share of answers that name you is your result. For a
          business in Lagos, Nairobi, Accra or Douala, also test the way customers in other cities
          and abroad would ask.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Ifeoma runs a physiotherapy clinic in Lekki, Lagos. On a quiet Tuesday she opened
            ChatGPT on her phone and typed &ldquo;best physiotherapy clinic in Lekki&rdquo;. Her
            clinic came up first. She took a screenshot and sent it to the family WhatsApp group,
            where it collected eleven thumbs-up and one uncle asking whether ChatGPT was a new
            bank.
          </p>
          <p>
            A week later a patient mentioned she had found the clinic through a friend, not
            through ChatGPT. Ifeoma asked her niece to try the same question. The niece, on her own
            phone, got three clinics. None of them was Ifeoma&rsquo;s.
          </p>
          <p>
            Nothing was broken. Ifeoma had asked once, logged in to an account that had spent
            months helping her write clinic newsletters. The assistant knew exactly whose clinic
            she might be hoping to see. Her customers&rsquo; phones did not.
          </p>
        </Scene>

        <p>
          We have written about what makes a business worth recommending in{' '}
          <a href="/blog/how-to-rank-on-chatgpt">how to rank on ChatGPT</a>. This guide covers the
          step before that: finding out, accurately, whether the assistant names you today. It is
          written for businesses in Nigeria, Kenya, Ghana, Cameroon and South Africa, where the
          usual advice of &ldquo;just ask ChatGPT&rdquo; misses how location, language and a
          crowded field of directories change the answer.
        </p>

        <h2 id="one-question">Why one question proves nothing</h2>

        <p>
          One answer from ChatGPT does not tell you whether it recommends your business, because
          the same question can produce a different list on the next run. ChatGPT writes each
          answer fresh. When it searches the web, OpenAI says it typically rewrites your question
          into one or more targeted search queries, reviews the results, and may send further
          queries before answering. Different queries find different pages, and different pages
          name different businesses.
        </p>

        <p>
          Personalisation adds a second layer. OpenAI says that if memory is enabled, ChatGPT may
          use saved memories when rewriting a search query. An owner who has spent months
          discussing her own clinic with the assistant is the least reliable tester that clinic
          has. Checking whether ChatGPT recommends you from your own account is like asking your
          mother whether your cooking is good. The answer is warm, consistent and of limited
          commercial use.
        </p>

        <h2 id="clean-session">Set up a clean test session</h2>

        <p>
          A clean test session is ChatGPT used logged out, or in a temporary chat set to
          Unpersonalized, with web search switched on. OpenAI says web search is available to
          people who are not signed in, and that an unpersonalized temporary chat does not use
          memory, custom instructions or plugins. Either option removes most of what the assistant
          knows about you.
        </p>

        <p>
          To start a temporary chat, open a new chat, select <strong>Temporary</strong>, and choose
          Unpersonalized before you send the first message; the choice cannot be changed once the
          conversation starts. ChatGPT may search the web on its own when a question needs current
          information, and you can force it by selecting <strong>Search</strong> from the tools
          menu. Use search for this test. A recommendation question answered from the model&rsquo;s
          training data alone tells you about the internet of a year or two ago, which is a fine
          thing to know and the wrong thing to measure.
        </p>

        <p>
          Then turn off anything that pretends you are elsewhere. A VPN changes the location
          ChatGPT infers, which leads to the next point.
        </p>

        <h2 id="location">Test from where your customers are</h2>

        <p>
          ChatGPT uses your approximate location to answer local questions, so a test run from
          your office only shows what customers near your office see. OpenAI says ChatGPT may
          estimate your general location, such as your country, state or city, from your IP
          address, and may rewrite a question such as &ldquo;good restaurants near me&rdquo; into a
          search for that area. Device location sharing is optional and off by default.
        </p>

        <p>
          For an African business this matters more than the usual guides admit, because many
          customers are not where the business is. A Lagos clinic is searched for from Abuja and
          Port Harcourt. A Nairobi safari operator is searched for from Munich and Mumbai. A Douala
          law firm is searched for by Cameroonians in Paris and Montreal, in French. Three
          practical adjustments cover most of it:
        </p>

        <ul>
          <li>
            <strong>Always name the place in the question.</strong> &ldquo;Best physiotherapy
            clinic in Lekki&rdquo; tests the same thing from any location. &ldquo;Best
            physiotherapy clinic near me&rdquo; tests only where you happen to be standing.
          </li>
          <li>
            <strong>Ask someone in a key customer city to run a few questions.</strong> A relative
            in London or a supplier in Accra running five questions once a month is a better
            diaspora test than any tool that guesses.
          </li>
          <li>
            <strong>Test in the language customers use.</strong> For Cameroon, ask in French:
            &ldquo;meilleur cabinet d&rsquo;avocats à Douala&rdquo; can return a different list
            from the English version. We cover the French-language side in{' '}
            <a href="/blog/referencement-naturel-douala">notre guide du référencement à Douala</a>.
          </li>
        </ul>

        <h2 id="prompts">Ask the way African customers ask</h2>

        <p>
          The questions in your test should be the questions customers actually ask, naming the
          neighbourhood, the service, the price range and the urgency. Owners tend to test with
          their business name. Customers rarely know it yet; they ask for a category in a place.
          A useful test mixes four kinds of question:
        </p>

        <ul>
          <li>
            <strong>Category:</strong> &ldquo;Best dental clinic in Westlands, Nairobi for a family
            with young children.&rdquo;
          </li>
          <li>
            <strong>Problem:</strong> &ldquo;Who can fix a leaking roof in East Legon this
            week?&rdquo;
          </li>
          <li>
            <strong>Comparison:</strong> &ldquo;Alternatives to [your best-known competitor] for
            company registration in Abuja.&rdquo;
          </li>
          <li>
            <strong>Brand:</strong> &ldquo;Is [your business name] in Lekki reliable?&rdquo; This
            one tests accuracy, not discovery.
          </li>
        </ul>

        <p>
          Use local detail where customers would. Nigerians ask about prices in naira, Kenyans in
          shillings, and a question that mentions a budget gets a different answer from one that
          does not. Avoid testing with &ldquo;best business in Africa&rdquo;; nobody searches for
          a plumber at continental scale, however ambitious the plumber.
        </p>

        <h2 id="record">Run the test and record a score</h2>

        <p>
          Run each question three times in separate clean sessions, then record your score as the
          share of answers that name your business. Ten questions asked three times gives thirty
          answers. Being named in twelve of thirty is a very different position from being named
          in two, and both are more useful than a single screenshot.
        </p>

        <ol>
          <li>
            <strong>Write ten customer questions</strong> across the four kinds above, each naming
            a place.
          </li>
          <li>
            <strong>Open a clean session</strong>: logged out, or temporary and Unpersonalized,
            with Search on.
          </li>
          <li>
            <strong>Ask each question three times</strong> in separate sessions, and save each
            full answer and its sources.
          </li>
          <li>
            <strong>Score the answers</strong>: named or not, position, details correct or wrong,
            and who else appeared.
          </li>
          <li>
            <strong>Repeat in Perplexity and Gemini</strong>, and note whether Google shows an AI
            Overview for your main search.
          </li>
          <li>
            <strong>Repeat monthly</strong>, on roughly the same day, changing one thing at a time.
          </li>
        </ol>

        <p>
          A spreadsheet with one row per answer is enough. The columns that matter are the
          question, the assistant, the run number, whether you were named, your position, whether
          your details were correct, the competitors named, and the sources cited. There are paid
          dashboards that will report an AI visibility score to two decimal places. Thirty honest
          rows in a spreadsheet will tell you more about a single business in Accra.
        </p>

        <h2 id="sources">Read the sources, not just the names</h2>

        <p>
          The sources ChatGPT cites tell you why it named the businesses it named, and they are the
          most useful part of the test. OpenAI says responses that use web search may include
          citations, and that selecting <strong>Sources</strong> shows the cited pages and other
          relevant links. Open them. Each one is a page the assistant read before deciding.
        </p>

        <p>
          In African markets those pages are often directories, listicles and aggregators rather
          than businesses&rsquo; own sites. In our{' '}
          <a href="/blog/ai-search-visibility-study">
            study of nine searches in five African cities
          </a>
          , a business&rsquo;s own website was 23 percent of page-one organic results in travel
          and hospitality, against 68 percent in professional services, and Google served an
          AI-generated answer on all nine searches. Our{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">October re-run</a> found the
          hospitality share had risen to 28 percent. If the assistant keeps citing the same two
          directories, getting listed accurately on those two directories is the most direct fix
          available to you.
        </p>

        <p>
          Check the dates as well. OpenAI itself warns that search results and citations can be
          incomplete, outdated or incorrect. An assistant quoting your old address is usually
          quoting an old page somewhere, and the page is what needs correcting.
        </p>

        <h2 id="results">What your result means and what to fix</h2>

        <p>
          Every test result falls into one of three outcomes, absent, named with wrong details, or
          named accurately, and each one points to a different fix. Being absent is the normal
          starting point for a small African business, not a verdict on its quality. The table
          below maps each outcome to its usual cause and its first fix.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>What the test shows</th>
                <th>The usual cause</th>
                <th>The first fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Never named, directories named instead</td>
                <td>The assistant finds no clear page about your service in your city</td>
                <td>
                  One page per service and location, plus accurate listings on the directories it
                  cites
                </td>
              </tr>
              <tr>
                <td>Never named, competitors named</td>
                <td>Competitors have more reviews and more outside mentions</td>
                <td>Detailed reviews and a complete Google Business Profile</td>
              </tr>
              <tr>
                <td>Named, with wrong address, phone or prices</td>
                <td>An outdated page or listing the assistant is reading</td>
                <td>Correct the source it cites, then your other listings</td>
              </tr>
              <tr>
                <td>Named only from your own account</td>
                <td>Personalisation, not visibility</td>
                <td>Re-test in a clean session before celebrating in any group chat</td>
              </tr>
              <tr>
                <td>Named accurately in most answers</td>
                <td>Your sources are clear and consistent</td>
                <td>Keep reviews coming and re-test monthly</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          For a business that is absent, the work starts with the basics in{' '}
          <a href="/blog/how-to-appear-on-google-maps-in-lagos">
            how to appear on Google Maps in Lagos
          </a>{' '}
          and{' '}
          <a href="/blog/how-to-get-more-google-reviews-in-nigeria">
            how to get more Google reviews in Nigeria
          </a>
          , which apply well beyond Lagos. Also confirm your site lets the assistants in: OpenAI
          says sites that are opted out of its OAI-SearchBot crawler will not be shown in ChatGPT
          search answers. If you would rather start from a baseline someone else has run, our{' '}
          <a href="/ai-visibility-check">AI visibility check</a> runs a version of this test for
          your business, and our <a href="/geo-services">GEO services</a> page sets out the work
          that follows it. City-specific detail is on{' '}
          <Link href="/ai-seo/lagos">AI SEO in Lagos</Link>,{' '}
          <Link href="/ai-seo/nairobi">Nairobi</Link>,{' '}
          <Link href="/ai-seo/accra">Accra</Link> and{' '}
          <Link href="/ai-seo/douala">Douala</Link>.
        </p>

        <h2 id="not-yet">When this test is not worth your time yet</h2>

        <p>
          The test is not worth running monthly yet if your business has no website, no Google
          Business Profile and fewer than a handful of reviews, because the result will be
          &ldquo;absent&rdquo; every time and the fixes are already obvious. Run it once to have a
          baseline, then spend the hour on the profile and the reviews instead.
        </p>

        <p>
          It is also not worth much if almost all your customers come through referrals and
          WhatsApp, and you have more work than you can take. An AI assistant is one more front
          door; it is not compulsory to paint every door at once. We sell AI visibility work, so
          this section is against our interest, and we would add one further honest note: when we
          ran our own check in August, AfriShield was named in none of the four African regions we
          tested. We run the same test on ourselves every month now, from a clean session, with no
          screenshots sent anywhere until the number moves.
        </p>

        <p>
          Ifeoma ran the full test in September: ten questions, three runs each, from her niece&rsquo;s
          phone. Her clinic was named in four answers out of thirty, and two of those listed an old
          phone number from a directory she had forgotten existed. She fixed the directory, asked
          recent patients for reviews that named the treatment and the neighbourhood, and put the
          next test in her calendar. The screenshot stays off the family group until the number is
          worth a thumbs-up from the uncle.
        </p>
      </PostShell>
    </>
  );
}
