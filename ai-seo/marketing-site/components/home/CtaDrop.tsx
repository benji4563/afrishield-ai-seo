import { Button } from '@/components/ui/Button';

export function CtaDrop({
  eyebrow = 'Get started',
  title = 'Find out what you are currently invisible for',
  body = 'A thirty-minute call. We look at what you rank for now, what your competitors hold, and whether this is worth your money yet. If it is not, we will say so.',
  ctaLabel = 'Book a call',
  ctaHref = '/contact',
  secondary = { label: 'See pricing', href: '/pricing' },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Second button; an http(s) href (e.g. WhatsApp) opens in a new tab. */
  secondary?: { label: string; href: string };
}) {
  const ctaTarget = ctaHref === '/ai-visibility-check' ? 'free_check' : 'consultation';
  const secondaryTarget = secondary.href === '/pricing' ? 'pricing' : 'other';
  return (
    /* Measured off AgentFlow: the closing CTA runs 140px vertical. */
    <section className="surface-dark border-t border-white/10 py-[110px] md:py-[140px]">
      <div className="container-page">
        <div className="container-inner text-center">
          <p className="eyebrow-dark">{eyebrow}</p>
          <h2 className="h2 mx-auto mt-6 max-w-[20ch]">{title}</h2>
          <p className="mx-auto mt-6 max-w-[56ch] text-lead body-dim">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={ctaHref} cta={{ location: 'final_cta', target: ctaTarget }}>
              {ctaLabel}
            </Button>
            <Button
              href={secondary.href}
              variant="ghost-dark"
              cta={{ location: 'final_cta', target: secondaryTarget }}
            >
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
