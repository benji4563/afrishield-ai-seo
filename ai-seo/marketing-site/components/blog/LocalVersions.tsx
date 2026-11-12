import Link from 'next/link';

/**
 * "Reading from Africa? Start with your market." box.
 *
 * Why it exists (Search Console, 12 Nov 2026): the generic global posts
 * (how-to-appear-on-google-maps, how-long-does-seo-take) take most of the
 * site's impressions at positions 60-70, almost all from the US, UK,
 * Australia and Canada, with 0 clicks. The African-qualified posts rank on
 * page 1 (Lagos Maps 7.5). This box sends the readers those generic pages do
 * get to the market page that matches them. Place it right after ShortAnswer
 * so it is seen before the scroll.
 */
export type LocalLink = { href: string; label: string; lang?: 'fr' };
export type LocalMarket = { market: string; lang?: 'fr'; links: LocalLink[] };

export function LocalVersions({ markets }: { markets: LocalMarket[] }) {
  return (
    <aside
      aria-labelledby="local-versions-heading"
      className="my-10 border border-ink/10 bg-white p-6 md:p-7"
    >
      <h2
        id="local-versions-heading"
        className="font-display text-xl font-bold text-ink"
      >
        Reading from Africa? Start with your market.
      </h2>
      <p className="mt-2 text-slate">
        This guide is general. These versions use local prices, local examples and the
        searches people actually make in each market.
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {markets.map((m) => (
          <li key={m.market}>
            <p
              lang={m.lang}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute"
            >
              {m.market}
            </p>
            <ul className="mt-1 space-y-1">
              {m.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    hrefLang={l.lang}
                    lang={l.lang}
                    className="font-semibold text-green-800 underline underline-offset-2 hover:text-green-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
