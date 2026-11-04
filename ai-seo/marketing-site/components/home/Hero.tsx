import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Bluf } from '@/components/ui/Bluf';

/** The engines our work targets. A statement of scope, not a ranking claim. */
const ENGINES = ['Google', 'ChatGPT', 'Perplexity', 'Gemini', 'Claude'];

function EngineCard({ className }: { className: string }) {
  return (
    <div
      className={`w-fit rounded-card border border-white/60 bg-white/75 px-5 py-4 shadow-sm backdrop-blur-md ${className}`}
    >
      <p className="font-mono text-label uppercase text-green-700">Optimised for search and AI answers</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {ENGINES.map((engine) => (
          <li
            key={engine}
            className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[13px] font-medium text-ink"
          >
            {engine}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section className="surface-light pb-[72px]">
      {/*
       * Daylight Lagos hero, 2026-11-04. A client called the site "dark", and
       * the side-by-side stock photo that replaced the dusk skyline read as
       * generic. This puts a bright Lagos waterfront skyline edge to edge, with
       * a cream wash on the left so the ink headline keeps full contrast and
       * the city stays clear on the right. Copy, buttons and the H1 are
       * unchanged from the original hero.
       */}
      <div className="relative isolate overflow-hidden pb-[56px] pt-[132px] lg:pb-[120px] lg:pt-[160px]">
        {/*
         * On large screens the photo fills only the right 62%, so the Civic
         * Centre tower lands beside the headline rather than behind it; a
         * full-width photo put the busiest part of the skyline under the H1.
         * Its left edge feathers into the cream page colour.
         */}
        <div className="absolute inset-y-0 right-0 -z-20 hidden w-[62%] lg:block">
          <Image
            src="/images/home-hero-lagos.webp"
            alt="The Lagos skyline in daylight across the lagoon, with the Civic Centre tower and a speedboat on the water."
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-[50%_40%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-bone to-transparent"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 hidden h-24 bg-gradient-to-t from-bone to-transparent lg:block"
        />

        <div className="container-page">
          <div className="container-inner">
            <div className="animate-rise-in max-w-[640px]">
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
              <p className="mt-7 max-w-[52ch] text-lead text-ink/75">
                We run the keyword research, the writing, and the technical work on a
                weekly schedule — and hand you a report that names every page, every
                keyword, and every position. AI does the volume; a person edits every
                word. No dashboard mysteries.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent-light">
                  Book a call
                </Button>
                <Button href="/how-it-works" variant="ghost-light" className="bg-white/70 backdrop-blur-sm">
                  See how it works
                </Button>
              </div>
              <p className="mt-7 font-mono text-label uppercase text-ink/55">
                No lock-in · Month to month · Keyword list shared before we write
              </p>
            </div>

            {/* Large screens: frosted card floating over the skyline. */}
            <EngineCard className="hidden lg:absolute lg:bottom-[56px] lg:right-[max(70px,calc((100vw-1264px)/2+70px))] lg:block" />

            {/*
             * Below lg the text spans the whole width, so a photo behind it
             * would have to be washed out to a ghost. Instead the skyline gets
             * its own full-bleed, full-colour band under the buttons. Same src
             * and sizes as the desktop image, so the browser fetches it once.
             */}
            <div className="relative -mx-[30px] mt-12 aspect-[4/3] md:-mx-[70px] lg:hidden">
              <Image
                src="/images/home-hero-lagos.webp"
                alt="The Lagos skyline in daylight across the lagoon, with the Civic Centre tower and a speedboat on the water."
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover object-[45%_40%]"
              />
            </div>
            <EngineCard className="mt-5 lg:hidden" />
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="container-inner">
          {/* GEO answer block — factual, entity-dense, in the server HTML. */}
          <Bluf className="max-w-[70ch]" tone="light">
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
