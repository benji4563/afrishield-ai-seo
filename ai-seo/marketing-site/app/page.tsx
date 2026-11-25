import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FeaturedBand } from '@/components/home/FeaturedBand';
import { Challenge } from '@/components/home/Challenge';
import { Solutions } from '@/components/home/Solutions';
import { Capabilities } from '@/components/home/Capabilities';
import { WhoWeServe } from '@/components/home/WhoWeServe';
import { Commitments } from '@/components/home/Commitments';
import { HonestClaims } from '@/components/home/HonestClaims';
import { AskAiSection } from '@/components/home/AskAiSection';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import { HomeFaq, HOME_FAQ } from '@/components/home/HomeFaq';
import { CtaDrop } from '@/components/home/CtaDrop';
import { AuditOffer } from '@/components/home/AuditOffer';
import { Services } from '@/components/home/Services';
import { ClientProof } from '@/components/home/ClientProof';
import { HomeSteps } from '@/components/home/HomeSteps';
import { StructuredData } from '@/components/seo/StructuredData';
import { faqPageJsonLd, professionalServiceJsonLd, websiteJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';

const FINAL_WHATSAPP = `${SITE.whatsapp}?text=${encodeURIComponent(
  'Hi AfriShield — I found you on afrishieldai.com and I would like to check my business visibility.',
)}`;
import { DEFAULT_OG_IMAGE } from '@/lib/posts';

// Brand first, on purpose. `title.template` in app/layout.tsx does NOT apply
// to this segment - Next templates child segments only - so the homepage
// renders whatever is set here verbatim, with no ` | AfriShield AI` suffix.
// Shipping the bare tagline is what left the brand name absent from the one
// page that should own it, while afrishield.org (an unrelated company) holds
// positions 1 and 2 for "AfriShield AI".
const TITLE = 'AfriShield AI — AI SEO services for African businesses';
// Shared with the Organization JSON-LD rather than written twice - see the note
// on SITE.description. Two strings for one entity is what the audit flagged.
const DESCRIPTION = SITE.description;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  // Next merges metadata one key deep, so this object REPLACES the layout's
  // openGraph rather than extending it. Every field the layout set has to be
  // repeated here or it vanishes from the homepage alone - `images` and
  // `siteName` were both lost that way, which is why shares rendered blank.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    siteName: SITE.name,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteJsonLd} />
      <StructuredData data={professionalServiceJsonLd} />
      <StructuredData data={faqPageJsonLd(HOME_FAQ)} />

      {/*
        Conversion order, 2026-11 (reports/homepage-conversion-audit-2026-11-23.md):
        offer first, then the problem, what we sell, proof, and what happens
        next. Nothing was deleted: Solutions and Capabilities moved below the
        proof, and the retainer timeline (Process) lives on /how-it-works.
      */}
      <Hero />
      <TrustStrip />
      <AuditOffer />
      <Challenge />
      <Services />
      <ClientProof />
      <Commitments />
      <FeaturedBand />
      <HomeSteps />
      <Solutions />
      <Capabilities />
      <WhoWeServe />
      <HonestClaims />
      <AskAiSection />
      <BlogTeaser />
      <HomeFaq />
      <CtaDrop
        eyebrow="Your next step"
        title="Ready to discover how customers and AI search engines see your business?"
        body="Find out where your business stands, identify your visibility gaps and discover the opportunities you can act on."
        ctaLabel="Check my business visibility"
        ctaHref="/ai-visibility-check"
        secondary={{ label: 'Chat on WhatsApp', href: FINAL_WHATSAPP }}
      />
    </>
  );
}
