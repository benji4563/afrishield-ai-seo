import type { Metadata } from 'next';

/**
 * Internal dashboard. Never indexed, and GA4 is told not to count these pages:
 * `ga-disable-<measurement id>` is Google's documented opt-out, set before
 * GTM's async gtag configuration runs, so internal use never shows up as
 * website traffic. Vercel Analytics and the site chrome are switched off by
 * <PublicOnly> in the root layout.
 */
export const metadata: Metadata = {
  title: { absolute: 'AfriShield AI — Dashboard' },
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        id="ga-optout-dashboard"
        dangerouslySetInnerHTML={{ __html: "window['ga-disable-G-2SJ6KTDWMS']=true;" }}
      />
      <div className="min-h-screen bg-bone text-ink">{children}</div>
    </>
  );
}
