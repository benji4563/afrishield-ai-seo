import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Button } from '@/components/ui/Button';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbJsonLd, howToJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'The AI-Visibility Checklist — test your own business in 15 minutes';
const DESCRIPTION =
  'A free DIY checklist: the exact prompts to paste into ChatGPT, Perplexity, and Gemini, how to score the answers, and the five technical checks that decide whether AI engines can find, read, and cite your business.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/resources/ai-visibility-checklist' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/resources/ai-visibility-checklist`,
    type: 'article',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const ENGINE_TESTS = [
  {
    engine: 'ChatGPT',
    url: 'chatgpt.com',
    tourism: 'Plan a 7-day safari in Tanzania for under $4,000 per person. Which operators should I book with, and why?',
    services: 'Recommend a good accountant in Nairobi for a small import business. Who would you shortlist?',
  },
  {
    engine: 'Perplexity',
    url: 'perplexity.ai',
    tourism: 'What are the best-reviewed lodges near [your park or city], and roughly what do they cost per night?',
    services: 'Which accounting firms in [your city] handle tax and payroll for small businesses, and what are they known for?',
  },
  {
    engine: 'Gemini',
    url: 'gemini.google.com',
    tourism: 'I am planning a honeymoon safari in [your country]. Which companies do you recommend, and what makes them good?',
    services: 'I need a reliable [your service] firm in [your city]. Who do people recommend, and what do reviews say about them?',
  },
];

const SCORING = [
  {
    score: 'Cited by name',
    meaning:
      'The engine names your business, with roughly correct details. This is the win — a buyer asking this question hears about you.',
  },
  {
    score: 'Mentioned generically',
    meaning:
      'The engine describes your category or location without naming you — “there are several lodges near the park”. You exist, but the recommendation goes to whoever it can name.',
  },
  {
    score: 'Invisible',
    meaning:
      'Your competitors get named and you do not appear at all. Every buyer who asks this question is routed past you.',
  },
];

const TECHNICAL_CHECKS = [
  {
    title: '1. Can AI crawlers actually reach your site?',
    whatToDo:
      'Open yourdomain.com/robots.txt in a browser. Look for lines naming GPTBot (ChatGPT), ClaudeBot, PerplexityBot, or Google-Extended, and for any broad “User-agent: * / Disallow: /” rule. Also check whether your security plugin or CDN has a “block bots” setting switched on.',
    pass: 'No rule blocks the AI crawlers. They can fetch your pages, which means the engines can read you.',
    fail: 'A Disallow rule or bot-blocker turns the AI crawlers away. The engines literally cannot read your site — everything else on this checklist is theoretical until this is fixed. Removing the blocking line is usually a five-minute job.',
  },
  {
    title: '2. Does your homepage answer real questions in plain text?',
    whatToDo:
      'Right-click your homepage and choose “View page source”. Search the raw HTML for the sentence that says what you are, where you are, and what you cost — “a 12-room lodge 4 km from the eastern gate, from $280 a night including game drives”. This is the answer-first block an AI can quote.',
    pass: 'A plain, factual sentence exists in the raw HTML near the top of the page — not behind JavaScript, not inside an image.',
    fail: 'The page is photography, sliders, and adjectives. “Nestled in untamed wilderness” tells a machine nothing; every lodge in Africa is apparently nestled somewhere. An engine with nothing quotable quotes someone else.',
  },
  {
    title: '3. Is structured data present?',
    whatToDo:
      'Paste your homepage URL into validator.schema.org or Google’s Rich Results Test. You are looking for markup that states your name, business type, location, and contact details in the format machines read natively.',
    pass: 'The validator finds Organization, LocalBusiness, Hotel, or Service markup with real values — name, address, type — that match what the visible page says.',
    fail: 'Nothing found, or markup that contradicts the page. No schema means the engine guesses; contradictory schema teaches it your facts are unreliable, which is worse.',
  },
  {
    title: '4. Is your Google Business Profile complete?',
    whatToDo:
      'Search your business name on Google and open your profile. Check the category, hours, phone, website link, photos, and description. If you have never claimed the profile, that is the answer.',
    pass: 'Claimed and complete: correct primary category, current hours, real photos, a description that says what you do in plain words.',
    fail: 'Unclaimed, half-empty, or inconsistent with your website. AI engines cross-check businesses against sources like this; a missing or contradictory profile makes you hard to verify, and unverifiable businesses do not get recommended.',
  },
  {
    title: '5. Are there reviews an AI can read?',
    whatToDo:
      'Check Google, TripAdvisor, and — for safari operators — SafariBookings. Count recent, detailed reviews that mention what you offer and where you are. Note whether you reply to them.',
    pass: 'A steady stream of detailed reviews on at least one major platform, with responses from you. This is third-party text confirming you exist, where you are, and what dealing with you is like.',
    fail: 'No reviews, or a handful from years ago. To an engine, a business with no independent mentions is a rumour — it has nothing to cite except your own claims.',
  },
];

const HOWTO_STEPS = [
  {
    name: 'Run the three-engine test',
    text: 'Paste a buyer-style prompt into ChatGPT, Perplexity, and Gemini — for example “Plan a 7-day safari in Tanzania under $4,000” or “Recommend a good accountant in Nairobi” — and record whether your business is cited by name, mentioned generically, or invisible.',
  },
  {
    name: 'Check AI-crawler access',
    text: 'Open yourdomain.com/robots.txt and confirm no rule blocks GPTBot, ClaudeBot, PerplexityBot, or Google-Extended, and that no security plugin or CDN blocks bots.',
  },
  {
    name: 'Check for a plain-text answer block',
    text: 'View the homepage source and confirm a factual sentence stating what the business is, where it is, and what it costs appears in the raw HTML.',
  },
  {
    name: 'Check structured data',
    text: 'Run the homepage through validator.schema.org or Google’s Rich Results Test and confirm Organization, LocalBusiness, Hotel, or Service markup with values matching the visible page.',
  },
  {
    name: 'Check the Google Business Profile',
    text: 'Confirm the profile is claimed and complete: correct category, current hours, photos, plain-word description, consistent with the website.',
  },
  {
    name: 'Check reviews',
    text: 'Confirm recent, detailed reviews exist on at least one major platform — Google, TripAdvisor, or SafariBookings — with owner responses.',
  },
];

export default function AIVisibilityChecklistPage() {
  return (
    <>
      <StructuredData data={howToJsonLd(HOWTO_STEPS, 'How to test your business’s AI visibility in 15 minutes')} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'AI-visibility checklist', path: '/resources/ai-visibility-checklist' },
        ])}
      />

      <PageHero
        eyebrow="Free checklist"
        title="Test your own AI visibility in 15 minutes"
        blurb="The exact prompts to paste into ChatGPT, Perplexity, and Gemini, how to score what comes back, and the five technical checks that decide whether AI engines can find, read, and cite your business."
      />

      <Section tone="light">
        <Bluf tone="light" className="max-w-[72ch]">
          AI visibility comes down to two questions: do the engines name you when a buyer
          asks, and can they read you well enough to try. Run three buyer-style prompts in
          ChatGPT, Perplexity, and Gemini and score each answer — cited by name, mentioned
          generically, or invisible. Then check five things: AI-crawler access in robots.txt,
          a plain-text answer block on your homepage, structured data, a complete Google
          Business Profile, and reviews a machine can read. Fails are fixable, and most are
          quick.
        </Bluf>

        <div className="post-body mt-12 max-w-[72ch]">
          <p>
            This is written for a lodge or safari operator, but every check works for any
            service business — swap the example prompts and the mechanics are identical. You
            need nothing installed and nothing paid for: three browser tabs and about fifteen
            minutes.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Part 1"
          tone="dark"
          title="The three-engine test"
          blurb="Ask the engines the questions your buyers ask — not your business name. A buyer does not know you yet; they ask for a plan, a recommendation, a shortlist. Paste each prompt below, replacing the brackets with your details."
        />

        <div className="mt-12 space-y-px bg-white/10">
          {ENGINE_TESTS.map((test) => (
            <div key={test.engine} className="bg-ink p-7">
              <h3 className="font-display text-[17px] font-semibold text-white">
                {test.engine} <span className="font-mono text-label uppercase text-white/40">— {test.url}</span>
              </h3>
              <p className="mt-4 font-mono text-label uppercase text-white/40">
                If you run a lodge or safari operation
              </p>
              <p className="mt-2 border border-white/15 bg-white/[0.03] p-4 font-mono text-small text-green-300">
                {test.tourism}
              </p>
              <p className="mt-4 font-mono text-label uppercase text-white/40">
                If you run a professional-services firm
              </p>
              <p className="mt-2 border border-white/15 bg-white/[0.03] p-4 font-mono text-small text-green-300">
                {test.services}
              </p>
            </div>
          ))}
        </div>

        <div className="post-body mt-10 max-w-[72ch] text-white">
          <p className="!text-white/60">
            One more prompt worth running in each engine: <strong className="!text-white">“What do you know about [your business name]?”</strong>{' '}
            If the answer is wrong, thin, or nothing, the engine has no reliable file on you —
            which is what Part 2 fixes.
          </p>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Scoring"
          tone="light"
          title="How to read the answers"
          blurb="Nine answers in total — three prompts across three engines. Score each one against the same three levels, and write down who gets named when you do not."
        />
        <ul className="mt-12 space-y-px bg-ink/10">
          {SCORING.map((level) => (
            <li key={level.score} className="bg-white p-7">
              <h3 className="font-display text-[17px] font-semibold text-ink">{level.score}</h3>
              <p className="mt-3 text-small body-dim-light">{level.meaning}</p>
            </li>
          ))}
        </ul>
        <div className="post-body mt-10 max-w-[72ch]">
          <p>
            The competitor names you collect are as valuable as your own score. Whoever is
            being cited has done something right — usually one of the five checks below —
            and their name appearing in your category’s answers is the gap, made visible.
          </p>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader
          eyebrow="Part 2"
          tone="dark"
          title="Five technical checks, in plain language"
          blurb="An engine can only recommend a business it can reach, read, and verify. These five checks cover each step. For every one: what to do, what a pass looks like, and what a fail means."
        />
        <div className="mt-12 space-y-px bg-white/10">
          {TECHNICAL_CHECKS.map((check) => (
            <div key={check.title} className="bg-ink p-7">
              <h3 className="font-display text-[17px] font-semibold text-white">{check.title}</h3>
              <p className="mt-4 font-mono text-label uppercase text-white/40">What to do</p>
              <p className="mt-2 text-small body-dim">{check.whatToDo}</p>
              <p className="mt-4 font-mono text-label uppercase text-green-300">A pass looks like</p>
              <p className="mt-2 text-small body-dim">{check.pass}</p>
              <p className="mt-4 font-mono text-label uppercase text-white/40">A fail means</p>
              <p className="mt-2 text-small body-dim">{check.fail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <div className="post-body max-w-[72ch]">
          <h2>What to do with your score</h2>
          <p>
            If you passed most checks but the engines still do not name you, the gap is usually
            content: nothing on your site answers the specific questions buyers ask, so the
            engines quote whoever does. If you failed the technical checks, fix those first —
            they are prerequisites, and most take less time than the test itself.
          </p>
          <p>
            Re-run the three-engine test monthly, same prompts, and track the trend. Assistants
            drift from day to day; the monthly direction is the signal.
          </p>
        </div>
      </Section>

      {/* Closing CTA — mirrors CtaDrop's measured layout, but the free check
          lives on its own page rather than /contact. */}
      <section className="surface-dark border-t border-white/10 py-[110px] md:py-[140px]">
        <div className="container-page">
          <div className="container-inner text-center">
            <p className="eyebrow-dark">Done by hand, or done for you</p>
            <h2 className="h2 mx-auto mt-6 max-w-[22ch]">
              Want us to run the full test for you?
            </h2>
            <p className="mx-auto mt-6 max-w-[56ch] text-lead body-dim">
              We query the engines the way your buyers would, screenshot every answer, and
              send you a one-page result within 48 hours — your score, who got named instead,
              and the gaps that explain it. Free, no lock-in.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/ai-visibility-check">Get the free AI-visibility check</Button>
              <Button href="/contact" variant="ghost-dark">
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
