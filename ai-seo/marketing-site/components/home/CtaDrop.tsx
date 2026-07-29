import { Button } from '@/components/ui/Button';

export function CtaDrop({
  eyebrow = 'Get started',
  title = 'Find out what you are currently invisible for',
  body = 'A thirty-minute call. We look at what you rank for now, what your competitors hold, and whether this is worth your money yet. If it is not, we will say so.',
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    /* Measured off AgentFlow: the closing CTA runs 140px vertical. */
    <section className="surface-dark border-t border-white/10 py-[110px] md:py-[140px]">
      <div className="container-page">
        <div className="container-inner text-center">
          <p className="eyebrow-dark">{eyebrow}</p>
          <h2 className="h2 mx-auto mt-6 max-w-[20ch]">{title}</h2>
          <p className="mx-auto mt-6 max-w-[56ch] text-lead body-dim">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Book a call</Button>
            <Button href="/pricing" variant="ghost-dark">
              See pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
