import { Button } from '@/components/ui/Button';
import { SignalNode } from '@/components/signature/SignalNode';
import { Bluf } from '@/components/ui/Bluf';

export function Hero() {
  return (
    /* Measured off AgentFlow: 152px top / 80px bottom on the hero block. */
    <section className="surface-dark pb-[80px] pt-[152px]">
      <div className="container-page">
        <div className="container-inner">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
            <div className="animate-rise-in">
              <p className="eyebrow-dark">AI SEO · Built for African markets</p>
              <h1 className="h1 mt-6 max-w-[15ch]">
                Everything your customers search. Answered by your site.
              </h1>
              <p className="mt-7 max-w-[52ch] text-lead body-dim">
                We run the keyword research, the writing, and the technical work on a
                weekly schedule — and hand you a report that names every page, every
                keyword, and every position. AI does the volume; a person edits every
                word. No dashboard mysteries.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact">Book a call</Button>
                <Button href="/how-it-works" variant="ghost-dark">
                  See how it works
                </Button>
              </div>
              <p className="mt-7 font-mono text-label uppercase text-white/35">
                No lock-in · Month to month · Keyword list shared before we write
              </p>
            </div>

            <div className="relative">
              <SignalNode className="w-full" />
            </div>
          </div>

          {/* GEO answer block — factual, entity-dense, in the server HTML. */}
          <Bluf className="mt-14 max-w-[70ch]" tone="dark">
            AfriShield AI provides AI SEO and local search optimisation for businesses
            across West, Central, East, and Southern Africa. We handle keyword research,
            content, technical SEO, and visibility in AI answer engines — ChatGPT, Claude,
            Perplexity, and Google — for small businesses, e-commerce brands, and
            professional firms, from USD 150 a month, reported monthly in plain numbers.
          </Bluf>
        </div>
      </div>
    </section>
  );
}
