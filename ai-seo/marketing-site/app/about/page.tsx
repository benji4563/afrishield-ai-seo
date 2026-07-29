import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Bluf } from '@/components/ui/Bluf';
import { Button } from '@/components/ui/Button';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { FounderPortrait } from '@/components/about/FounderPortrait';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { aboutPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Our story: reliable AI for African SMBs';
const DESCRIPTION =
  'Founded by Benjamin Njock — an 18-year insurance executive and co-founder of Tataachi Network Insurance and Optimere. His story, and why AfriShield AI exists.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: 'profile',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const BELIEFS = [
  {
    title: 'Trust is earned in the fine print',
    body: 'Insurance taught him that people forgive a lot, but never a promise that quietly did not hold. Everything here is built so the promise holds.',
  },
  {
    title: 'The client is the point, not the tool',
    body: 'AI is a means. The end is a business owner in Douala or Accra who can finally be found by the customers already looking for them.',
  },
  {
    title: 'Reliable beats impressive',
    body: 'A tool that works quietly every week is worth more than a clever one that dazzles once and drifts. Africa has seen enough of the second kind.',
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData data={aboutPageJsonLd()} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Our story', path: '/about' },
        ])}
      />

      {/* Hero */}
      <section className="surface-dark pb-[70px] pt-[140px]">
        <div className="container-page">
          <div className="container-inner">
            <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="eyebrow-dark">Our story</p>
                <h1 className="h1 mt-6 max-w-[18ch]">
                  He spent eighteen years learning who to trust. Then he built this.
                </h1>
                <p className="mt-7 max-w-[52ch] text-lead body-dim">
                  AfriShield AI was founded by Benjamin Njock — an insurance executive who
                  spent his career turning caution into confidence for African businesses,
                  and decided AI deserved the same treatment.
                </p>
              </div>
              <div className="mx-auto w-full max-w-[360px]">
                <FounderPortrait />
              </div>
            </div>

            <Bluf className="mt-14 max-w-[72ch]" tone="dark">
              Benjamin Njock is the founder of AfriShield AI. An insurance executive with
              over 18 years of corporate experience, he co-founded Tataachi Network
              Insurance and Optimere — two companies operating across more than 40 African
              countries. He built AfriShield AI to make AI a reliable, everyday tool for
              African small and mid-sized businesses.
            </Bluf>
          </div>
        </div>
      </section>

      {/* The story */}
      <Section tone="light">
        <div className="mx-auto max-w-prose">
          <p className="eyebrow-light">The long way here</p>

          <h2 className="h2 mt-5">Eighteen years reading the small print</h2>
          <p className="mt-6 text-body body-dim-light">
            Benjamin did not come to technology through code. He came to it through
            claims, policies, and the particular kind of trust that insurance runs on.
            For eighteen years his job was to stand between a business and its worst day —
            to price risk honestly, and to make sure that when something went wrong, the
            promise on the paper actually held.
          </p>
          <p className="mt-5 text-body body-dim-light">
            That work leaves a mark on how a person thinks. You stop being impressed by
            what a thing claims and start asking what happens when it is tested. You learn
            that clients do not remember the brochure; they remember whether you were there
            when it mattered. And you learn, in a market as varied as Africa&rsquo;s, that
            trust is not a slogan you print — it is something you rebuild with every single
            interaction.
          </p>

          <h2 className="h2 mt-14">Two companies, more than forty countries</h2>
          <p className="mt-6 text-body body-dim-light">
            That instinct turned into building. Benjamin co-founded{' '}
            <strong>Tataachi Network Insurance</strong> and <strong>Optimere</strong> —
            two companies that today network across more than 40 countries on the
            continent. Running businesses at that spread teaches you something no single
            market can: how differently trust is earned in Lagos versus Nairobi versus
            Douala, and how badly imported, one-size-fits-all solutions fail the moment
            they cross a border they were never designed for.
          </p>
          <p className="mt-5 text-body body-dim-light">
            He kept meeting the same business owner in every country. Competent. Serious.
            Quietly excellent at what they did. And almost completely invisible the moment
            a customer went looking for them online.
          </p>
        </div>

        <EditorialImage
          src="/images/about-context.jpg"
          alt="An African business owner working at a laptop in an office."
          className="mx-auto mt-12 max-w-[760px] border border-ink/10"
        />

        <div className="mx-auto mt-12 max-w-prose">
          <h2 className="h2">The gap he could not unsee</h2>
          <p className="mt-6 text-body body-dim-light">
            Around the same time, AI arrived in the way it always does — loudly. Everyone
            had a tool. Few had a result. Benjamin watched African businesses get sold the
            same expensive dazzle he had spent a career teaching people to distrust:
            confident promises, no accountability, and a quiet disappearance the moment
            anyone asked what it had actually done.
          </p>
          <p className="mt-5 text-body body-dim-light">
            It struck him as a familiar problem wearing new clothes. The issue was never
            whether AI was powerful. It plainly was. The issue was whether anyone would
            make it <em>reliable</em> — accountable, edited by a human, reported in numbers
            a business owner could check — instead of just impressive. That is an insurance
            problem, really. It is about the gap between what is promised and what holds.
          </p>

          <h2 className="h2 mt-14">Why AfriShield AI exists</h2>
          <p className="mt-6 text-body body-dim-light">
            So he built the thing he wished those business owners had been offered: AI put
            to a single, unglamorous job — getting an African business found by the
            customers already searching for it — and wrapped in the discipline of a
            profession that does not get to hide behind jargon.
          </p>
          <p className="mt-5 text-body body-dim-light">
            That is why AfriShield shows you the keyword list before writing a word, why
            the monthly report carries the losses at the same size as the wins, and why a
            person edits everything an agent drafts. It is client orientation borrowed
            straight from insurance: the tool is never the point. The business owner on the
            other side of it is.
          </p>
          <blockquote className="mt-8">
            &ldquo;I spent eighteen years making sure a promise held when it was tested. AI
            in African business deserves exactly that standard — nothing less, and no
            hiding behind how clever it sounds.&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* Beliefs */}
      <Section tone="dark">
        <SectionHeader
          eyebrow="What we carry forward"
          tone="dark"
          title="Three things that came from the first career"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BELIEFS.map((belief) => (
            <article key={belief.title} className="card-dark">
              <h3 className="h3">{belief.title}</h3>
              <p className="mt-4 text-small body-dim">{belief.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/how-it-works">See how the work runs</Button>
        </div>
      </Section>

      <CtaDrop
        eyebrow="Work with us"
        title="Let us make you findable"
        body="Book a call. We will show you what your business is currently invisible for, and whether search is worth your money yet. If it is not, we will say so — the same way Benjamin would."
      />
    </>
  );
}
