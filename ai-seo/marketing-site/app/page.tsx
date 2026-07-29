import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { Challenge } from '@/components/home/Challenge';
import { Solutions } from '@/components/home/Solutions';
import { Capabilities } from '@/components/home/Capabilities';
import { WhoWeServe } from '@/components/home/WhoWeServe';
import { Process } from '@/components/home/Process';
import { Commitments } from '@/components/home/Commitments';
import { HonestClaims } from '@/components/home/HonestClaims';
import { AskAiSection } from '@/components/home/AskAiSection';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import { HomeFaq, HOME_FAQ } from '@/components/home/HomeFaq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { StructuredData } from '@/components/seo/StructuredData';
import { faqPageJsonLd, professionalServiceJsonLd } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/site';

const TITLE = 'AI SEO services for African businesses';
const DESCRIPTION =
  'Keyword research, weekly publishing, and technical SEO on a schedule — with a one-page report naming every keyword and position. Month to month, no lock-in.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={professionalServiceJsonLd} />
      <StructuredData data={faqPageJsonLd(HOME_FAQ)} />

      {/* Section order and dark/light alternation mirror AgentFlow's measured
          topology — see docs/research/AGENTFLOW-CLONE-SPEC.md. */}
      <Hero />
      <TrustStrip />
      <Challenge />
      <Solutions />
      <Capabilities />
      <WhoWeServe />
      <Process />
      <Commitments />
      <HonestClaims />
      <AskAiSection />
      <BlogTeaser />
      <HomeFaq />
      <CtaDrop />
    </>
  );
}
