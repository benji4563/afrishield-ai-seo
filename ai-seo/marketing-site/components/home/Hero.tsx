import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Bluf } from '@/components/ui/Bluf';

export function Hero() {
  return (
    <section className="surface-light pb-[72px]">
      {/*
       * Light hero since 2026-11-04. A client review on a directory called the
       * site "dark", and the old dusk-skyline hero plus the dark strip under it
       * made the entire first screen near-black. Copy, buttons and the H1 are
       * unchanged; only the surface and the photo moved. The photo sits in its
       * own column rather than behind the text, so no overlay is needed for
       * contrast and the headline stays the first thing read.
       */}
      <div className="container-page pt-[132px] md:pt-[150px]">
        <div className="container-inner">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="animate-rise-in">
              <p className="eyebrow-light">AI SEO · Built for African markets</p>
              {/*
               * The brand name is load-bearing here, not decorative. Google
               * resolves "AfriShield AI" to afrishield.org - a different company
               * - partly because this page's primary heading never said the
               * name. Keep "AfriShield AI" as the subject of this sentence.
               */}
              <h1 className="h1 mt-6 max-w-[19ch]">
                AfriShield AI makes your site the answer your customers search for.
              </h1>
              <p className="mt-7 max-w-[52ch] text-lead body-dim-light">
                We run the keyword research, the writing, and the technical work on a
                weekly schedule — and hand you a report that names every page, every
                keyword, and every position. AI does the volume; a person edits every
                word. No dashboard mysteries.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent-light">
                  Book a call
                </Button>
                <Button href="/how-it-works" variant="ghost-light">
                  See how it works
                </Button>
              </div>
              <p className="mt-7 font-mono text-label uppercase text-ink/50">
                No lock-in · Month to month · Keyword list shared before we write
              </p>
            </div>

            <div className="relative aspect-[1200/627] overflow-hidden rounded-card border border-ink/10">
              <Image
                src="/images/home-band.jpg"
                alt="Two professional women collaborating with laptops in Lagos, Nigeria."
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* GEO answer block — factual, entity-dense, in the server HTML. */}
          <Bluf className="mt-14 max-w-[70ch]" tone="light">
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
