import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Bluf } from '@/components/ui/Bluf';

export function Hero() {
  return (
    <section className="surface-dark pb-[80px]">
      {/*
       * Panoramic hero: the Nairobi skyline at dusk runs edge to edge behind the
       * headline. The photo is confined to this band so it stays wide rather than
       * tall, and two gradients keep the copy readable — a wash under the text
       * column, and a fade into the page colour so the block below meets it
       * without a seam.
       */}
      <div className="relative isolate overflow-hidden pb-[120px] pt-[152px]">
        <Image
          src="/images/home-hero-nairobi.webp"
          alt="The Nairobi skyline at dusk, with office towers lit against a deep blue sky."
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-bottom"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/65 md:via-ink/85 md:to-ink/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent"
        />

        <div className="container-page">
          <div className="container-inner">
            <div className="animate-rise-in max-w-[640px]">
              <p className="eyebrow-dark">AI SEO · Built for African markets</p>
              <h1 className="h1 mt-6 max-w-[15ch]">
                Everything your customers search. Answered by your site.
              </h1>
              <p className="mt-7 max-w-[52ch] text-lead text-white/85">
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
              <p className="mt-7 font-mono text-label uppercase text-white/55">
                No lock-in · Month to month · Keyword list shared before we write
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="container-inner">
          {/* GEO answer block — factual, entity-dense, in the server HTML. */}
          <Bluf className="max-w-[70ch]" tone="dark">
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
