import { Section, SectionHeader } from '@/components/ui/Section';

/**
 * AgentFlow uses this slot for an enterprise-security block. Security is not
 * this service's trust problem — overpromising is. So the slot carries the
 * claims discipline instead.
 */
const CLAIMS = [
  {
    title: 'No guaranteed rankings',
    body: 'Nobody controls Google. Anyone selling you position one is selling you a number they cannot deliver, and you will pay for it either way.',
  },
  {
    title: 'No traffic without a timeline',
    body: 'New pages typically take weeks to settle and months to compete. We will tell you which months look flat before you sign, not after.',
  },
  {
    title: 'No borrowed prose',
    body: 'We read what ranks to learn the shape of a good answer. We never reproduce it. Every sentence on your site is written for your site.',
  },
];

export function HonestClaims() {
  return (
    <Section tone="light">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <SectionHeader
          eyebrow="Honest claims"
          tone="light"
          title="Three things we will never say to you"
          blurb="The fastest way to lose a client is to promise something search cannot deliver. So here are the promises we have ruled out, on the record."
        />

        <ul className="space-y-px border border-ink/10 bg-ink/10">
          {CLAIMS.map((claim) => (
            <li key={claim.title} className="bg-white p-7">
              <h3 className="h3">{claim.title}</h3>
              <p className="mt-3 text-small body-dim-light">{claim.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
