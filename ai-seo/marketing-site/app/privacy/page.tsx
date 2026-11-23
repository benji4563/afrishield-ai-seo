import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CookieSettingsLink } from '@/components/consent/CookieSettingsLink';
import { SITE } from '@/lib/site';

/**
 * Privacy and cookie policy. Facts only: every service and cookie listed here
 * is one the site actually uses (checked 2026-11-24). When a tracker is added
 * or removed, update the table in the same change.
 */
export const metadata: Metadata = {
  title: 'Privacy and cookie policy',
  description: 'What AfriShield AI collects on afrishieldai.com, why, where it is stored, which cookies we use, and how to change your choice.',
  alternates: { canonical: '/privacy' },
};

const COOKIES: { name: string; provider: string; purpose: string; category: string; duration: string }[] = [
  { name: 'afs_consent', provider: 'AfriShield AI', purpose: 'Remembers your cookie choice.', category: 'Necessary', duration: '180 days' },
  { name: 'afs_ref', provider: 'AfriShield AI', purpose: 'Credits the partner whose referral link you followed.', category: 'Necessary', duration: '90 days' },
  { name: '_ga, _ga_2SJ6KTDWMS', provider: 'Google Analytics', purpose: 'Counts visits and pages viewed, and how visitors arrive.', category: 'Analytics', duration: 'Up to 2 years' },
  { name: '__hstc, __hssc, __hssrc, hubspotutk', provider: 'HubSpot', purpose: 'Links your visits to an enquiry you send us, so we know how you found us.', category: 'Marketing', duration: 'Session to 6 months' },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy and cookie policy"
        blurb="What we collect on afrishieldai.com, why, where it is kept, and how to change your mind."
      />
      <section className="bg-bone py-section-sm">
        <div className="container-page">
          <div className="container-inner max-w-prose space-y-10 text-body text-ink [&_h2]:font-display [&_h2]:text-h3 [&_h2]:font-semibold [&_p]:mt-3 [&_li]:mt-1.5">
            <div>
              <h2>Who we are</h2>
              <p>
                {SITE.name} ({SITE.legalName}), based in Douala, Cameroon, runs this website. For anything about your data, write to{' '}
                <a className="underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2>What you send us</h2>
              <p>
                When you use a form on this site (contact, free AI visibility check, review), we receive what you type: your name, email, phone or
                WhatsApp number, company, website and message. We use it to answer you and to deliver what you asked for.
              </p>
              <ul className="list-disc pl-5">
                <li>It is stored in our CRM, HubSpot (EU data centre), with a backup copy in our database at Supabase (EU region).</li>
                <li>Calls to our AI phone line and website voice assistant are handled by Vapi and Twilio, which produce a call summary for us.</li>
                <li>We do not sell your data, and we do not add you to a mailing list without asking.</li>
              </ul>
            </div>

            <div id="cookies" className="scroll-mt-28">
              <h2>Cookies</h2>
              <p>
                Analytics and marketing cookies stay off until you accept them in the cookie banner. Necessary cookies keep the site working and do
                not track you across other sites. Our Vercel Analytics visitor count uses no cookies.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-small">
                  <thead>
                    <tr className="border-b border-ink/15 text-slate">
                      <th className="py-2 pr-3 font-medium">Cookie</th>
                      <th className="py-2 pr-3 font-medium">Set by</th>
                      <th className="py-2 pr-3 font-medium">Purpose</th>
                      <th className="py-2 pr-3 font-medium">Category</th>
                      <th className="py-2 font-medium">Lasts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((c) => (
                      <tr key={c.name} className="border-b border-ink/10 align-top">
                        <td className="py-2 pr-3 font-mono text-[12.5px]">{c.name}</td>
                        <td className="py-2 pr-3">{c.provider}</td>
                        <td className="py-2 pr-3">{c.purpose}</td>
                        <td className="py-2 pr-3">{c.category}</td>
                        <td className="py-2">{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                You can change your choice at any time: <CookieSettingsLink className="underline" />. Withdrawing consent deletes the analytics or
                marketing cookies already set.
              </p>
            </div>

            <div>
              <h2>Your choices</h2>
              <p>
                You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by writing to{' '}
                <a className="underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                . We keep enquiry details for as long as we are in contact or working together, and delete them on request.
              </p>
            </div>

            <p className="text-small text-slate">Last updated: 24 November 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}
