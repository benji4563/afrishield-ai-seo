import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ClickTracker } from '@/components/analytics/ClickTracker';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { VoiceCallButton } from '@/components/layout/VoiceCallButton';
import { PublicOnly } from '@/components/layout/PublicOnly';
import { CookieBanner } from '@/components/consent/CookieBanner';
import { HubSpotTracking } from '@/components/consent/HubSpotTracking';
import { CONSENT_DEFAULT_SCRIPT } from '@/lib/consent';
import { StructuredData } from '@/components/seo/StructuredData';
import { organizationJsonLd } from '@/lib/structured-data';
import { SITE, SITE_URL } from '@/lib/site';
import { DEFAULT_OG_IMAGE } from '@/lib/posts';

/**
 * Google Tag Manager container. Installed once, here, so it covers every route.
 * It loads a single time per visit and keeps running across client-side
 * navigation; page views on those navigations come from a History Change
 * trigger inside GTM, not from code here. GA4 and every event are configured in
 * the GTM workspace, so no GA4 tag is loaded directly by the site. Public by
 * design: the ID ships in every page's HTML.
 */
const GTM_ID = 'GTM-WJN8ML48';

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
      <head>
        {/*
          Consent Mode v2 defaults, before GTM: analytics and ad storage are
          denied until the visitor accepts in <CookieBanner>; a saved choice is
          re-applied here on every page load. See lib/consent.ts.
        */}
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        {/* Google Tag Manager — official snippet, as high in <head> as possible. */}
        <script
          id="gtm-head"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — immediately after the opening <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
        <PublicOnly>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-green-300 focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-ink"
          >
            Skip to content
          </a>
          <Nav />
        </PublicOnly>
        <main id="main">{children}</main>
        <PublicOnly>
          <Footer />
          <WhatsAppFloat />
          <VoiceCallButton />
        </PublicOnly>
        {/*
          Visitor analytics. Until 2026-11-09 the site loaded no analytics at all
          (confirmed with REA), so Vercel's dashboard showed zero rows even with
          Web Analytics switched on. The script posts to /_vercel/insights on our
          own domain and sets no cookies.
        */}
        <PublicOnly>
          <Analytics />
          {/* CTA and WhatsApp click events for GTM (see lib/analytics.ts). */}
          <ClickTracker />
          {/* HubSpot tracking (portal 148875549, EU1), loaded only after marketing consent. */}
          <HubSpotTracking />
          <CookieBanner />
        </PublicOnly>
      </body>
    </html>
  );
}
