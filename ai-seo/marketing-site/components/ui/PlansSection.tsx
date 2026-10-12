import { Section, SectionHeader } from '@/components/ui/Section';
import { OFFER_TIERS } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

/**
 * The three plans as a comparison table, built from `OFFER_TIERS` so the table,
 * the pricing cards and the Offer JSON-LD cannot drift apart. Used on every
 * money page: a buyer comparing plans, and an answer engine lifting a price,
 * both read a table more reliably than three cards.
 */
export function PlansSection({
  tone = 'light',
  showLink = true,
  className,
}: {
  tone?: 'dark' | 'light';
  showLink?: boolean;
  className?: string;
}) {
  const dark = tone === 'dark';
  const rule = dark ? 'border-white/10' : 'border-ink/10';
  return (
    <Section tone={tone} className={className}>
      <SectionHeader
        eyebrow="Plans compared"
        tone={tone}
        title="Three plans, the same price in every market"
        blurb="Foundation costs $150 a month, Engine $400 and Operation $900. Each one is month to month, with no setup fee."
      />
      <figure className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-small">
          <thead>
            <tr className={cn('border-b font-mono text-label uppercase tracking-[0.1em]', rule)}>
              <th scope="col" className="py-3 pr-6 font-normal">
                Plan
              </th>
              <th scope="col" className="py-3 pr-6 font-normal">
                Price in USD
              </th>
              <th scope="col" className="py-3 font-normal">
                What it covers
              </th>
            </tr>
          </thead>
          <tbody>
            {OFFER_TIERS.map((tier) => (
              <tr key={tier.name} className={cn('border-b align-top', rule)}>
                <th scope="row" className="py-4 pr-6 font-semibold">
                  {tier.name}
                </th>
                <td className="whitespace-nowrap py-4 pr-6">{`$${tier.price} a month`}</td>
                <td className={cn('py-4', dark ? 'body-dim' : 'body-dim-light')}>
                  {tier.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
      {showLink ? (
        <p className="mt-8 text-small">
          <a href="/pricing" className="font-semibold">
            See what each plan includes and leaves out &rarr;
          </a>
        </p>
      ) : null}
    </Section>
  );
}
