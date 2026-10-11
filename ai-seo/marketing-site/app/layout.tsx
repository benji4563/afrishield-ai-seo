import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { VoiceCallButton } from '@/components/layout/VoiceCallButton';
import { StructuredData } from '@/components/seo/StructuredData';
import { organizationJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';
import { DEFAULT_OG_IMAGE } from '@/lib/posts';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AI SEO services for African businesses | AfriShield AI',
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  // Feed autodiscovery is NOT declared here. Next merges metadata one key deep,
  // so a child route's `alternates` replaces this object wholesale — and all 41
  // pages set their own `alternates.canonical`, which silently dropped the feed
  // link from every page. It is rendered as a real <link> in the layout body
  // instead, where nothing can override it.
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE_URL,
    title: 'AI SEO services for African businesses',
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO services for African businesses',
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        {/*
          Feed autodiscovery. React hoists this into <head> on every page, which
          is the point: the metadata API could not carry it, because each route
          overrides `alternates` with its own canonical. Readers and AI crawlers
          both look for this tag, and the geo-optimizer audit flags its absence.
        */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} — Blog`}
          href={`${SITE_URL}/rss.xml`}
        />
        <StructuredData data={organizationJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-green-300 focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <VoiceCallButton />
      </body>
    </html>
  );
}
