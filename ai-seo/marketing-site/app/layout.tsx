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
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE_URL,
    title: 'AI SEO services for African businesses',
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO services for African businesses',
    description: SITE.description,
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
