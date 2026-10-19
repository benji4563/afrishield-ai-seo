export type PostMeta = {
  slug: string;
  title: string;
  /** Short label used on cards — the H1 in full is `title`. */
  cardTitle: string;
  /** ≤44 chars: the SERP <title> (brand suffix keeps it under 60). H1 stays `title`. */
  metaTitle: string;
  /** 50–160 chars: the meta description, the card blurb and the feed summary. */
  description: string;
  /**
   * 40–70 words of plain fact, shown under the H1 in place of `description`.
   * It is the first paragraph an answer engine reads after the heading, and a
   * meta-description-length sentence is too short to be lifted as a definition.
   * Optional: a post without one falls back to `description`.
   */
  lede?: string;
  /**
   * **The language the post is written in.** Omitted means English.
   *
   * This is not decoration. The root layout hardcodes `<html lang="en">`, so a
   * French post with no `lang` ships declared as English - wrong for a reader
   * using a screen reader, wrong for Google, and wrong for the AI engines this
   * site is optimised for. `PostShell` reads this onto the `<article>` element
   * and formats the date with it; `blogPostingJsonLd` emits it as
   * `inLanguage`.
   *
   * Francophone Cameroon is the priority market per the content queue's
   * 2026-09-24 geographic pivot - the site's best position (3.7) and one of
   * its two clicks - so French posts are written in French, never translated
   * from an English draft. See content-queue.md rows 36, 37 and 47.
   */
  lang?: 'en' | 'fr';
  category: string;
  published: string;
  modified?: string;
  readingMinutes: number;
  primaryKeyword: string;
  /**
   * Card + social image for the post. Lives here (not in a separate hardcoded
   * map) so a post and its image never drift out of sync. Every post SHOULD
   * declare one; a post left without an image renders a clean placeholder
   * rather than a broken `<img>`. Files live in `public/images/` and are
   * sourced via `scripts/pull-pexels.mjs`.
   */
  image?: { src: string; alt: string };
  /**
   * The LinkedIn copy posted to the AfriShield AI company page (id
   * `146729948`) when this post went live. Stored here so there is a record of
   * what actually went out, and so the feed can carry it later as
   * `<content:encoded>`.
   *
   * Constraints, learned on the NJ pipeline: max 3,000 characters, and **no
   * unescaped parentheses** — LinkedIn's Little Text Format treats `(` and `)`
   * as reserved. Writing around them is cleaner than escaping them. This is a
   * template literal, so escape any backtick or `${`.
   */
  linkedin?: string;
};

/** Default social share image used when a page/post has none of its own. */
export const DEFAULT_OG_IMAGE = '/images/home-band.jpg';

/** OG/Twitter image list for a post — its own image, or the site default. */
export function postOgImages(post: PostMeta) {
  return [{ url: post.image?.src ?? DEFAULT_OG_IMAGE }];
}

export const POSTS: PostMeta[] = [
  {
    slug: 'barometre-ia-cameroun-2026',
    title:
      'Baromètre IA Cameroun 2026 : aucune grande entreprise n\u2019est prête pour les moteurs de réponse',
    cardTitle: 'Baromètre IA Cameroun 2026',
    metaTitle: 'Baromètre IA Cameroun 2026',
    description:
      'Baromètre 2026 : sur 30 grandes organisations camerounaises, aucune ne publie de llms.txt et aucune ne nomme un robot d\u2019IA. Score moyen : 46,3 sur 100.',
    lede:
      'Nous avons audité 30 des plus grandes organisations camerounaises sur une grille publique de 8 critères et 100 points. Aucune des 26 au site fonctionnel ne publie de fichier llms.txt, et aucune ne nomme un seul robot d\u2019IA dans son robots.txt. Le score moyen de préparation à l\u2019IA est de 46,3 sur 100, et quatre organisations n\u2019ont aucun site accessible.',
    lang: 'fr',
    category: 'Étude originale',
    published: '2026-10-19',
    modified: '2026-10-19',
    readingMinutes: 11,
    primaryKeyword: 'visibilité IA entreprises camerounaises',
    image: {
      src: '/images/blog-barometre-ia-cameroun-2026.webp',
      alt: 'Vue aérienne de Douala au coucher du soleil, avec le tissu urbain et le port.',
    },
    linkedin: `Nous avons vérifié les sites de 30 des plus grandes organisations du Cameroun, une par une.

Nous cherchions huit choses qu'un robot d'IA regarde avant de citer une entreprise. Banques, télécoms, énergie, universités, médias.

Deux des huit cases sont restées vides. Pas majoritairement vides. Vides.

Zéro sur 26 sites fonctionnels publient un fichier llms.txt — le document qui présente une entreprise aux modèles d'IA.

Zéro nomment un seul robot d'IA dans leur robots.txt. Nous avons cherché GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended. Aucune occurrence. Sur aucun site.

Lisez ce second zéro dans les deux sens. Personne n'interdit l'accès aux robots d'IA : le terrain est libre. Et personne ne les guide : le terrain est vide.

Ces deux critères valent 25 points sur 100 dans notre grille. Moins d'une demi-journée de travail. C'est pourquoi le meilleur score du pays plafonne à 75 sur 100.

Trois autres chiffres :

Score moyen de préparation à l'IA : 46,3 sur 100.

4 organisations sur 30 n'ont aucun site accessible.

Les télécoms et l'énergie — les secteurs les plus capitalisés et les plus techniques du pays — sont les derniers, à 36 sur 100.

Et un détail qui nous a arrêtés net. En vérifiant les domaines, cinq des six adresses que nous pensions correctes se sont révélées fausses ou mortes. ccabank.cm n'existe pas. lessabc.com non plus. camrail.net sert un certificat auto-signé.

Si une équipe qui cherche volontairement, avec des outils et du temps, se trompe cinq fois sur six, un robot d'IA n'a aucune chance de faire mieux.

L'étude complète, la grille des 8 critères et les données brutes en JSON et CSV, sous licence libre :

https://afrishieldai.com/blog/barometre-ia-cameroun-2026

Prochaine édition : octobre 2027, même protocole. Si une seule organisation camerounaise publie un llms.txt d'ici là, elle aura douze mois d'avance sur les vingt-neuf autres.

#Cameroun #IA #SEO #Douala #Yaoundé #TransformationDigitale`,
  },
  {
    slug: 'ai-search-visibility-study-october-2026',
    title:
      'The first crack in the aggregator wall: our AI visibility study, seven weeks on',
    cardTitle: 'The first crack in the aggregator wall',
    metaTitle: 'A Local Operator Beat the Directories',
    description:
      'We re-ran nine searches in five African cities. One locally-owned operator took position one from the directories — the first crack in the aggregator wall.',
    lede:
      'In August, an aggregator held the number-one organic result in every hotel and safari search we ran across five African cities. Re-running the same nine searches on 17 October 2026, one did not: a locally-owned operator in Arusha took the top spot. Businesses\u2019 own sites rose from 23% to 28% of page one in hospitality. Both datasets are published.',
    category: 'Original research',
    published: '2026-10-19',
    modified: '2026-10-19',
    readingMinutes: 9,
    primaryKeyword: 'ai search visibility africa study 2026',
    image: {
      src: '/images/blog-ai-search-visibility-study-october-2026.webp',
      alt: 'A smiling safari guide seated on an open safari vehicle with a giraffe behind him.',
    },
    linkedin: `In August we ran nine searches across five African cities and found something bleak.

In every single hotel and safari search, the number one organic result belonged to an aggregator. TripAdvisor. Booking. A "top 20 operators" listicle written on another continent. Never the business itself.

We said we would re-run it rather than let that harden into a talking point. So we did, seven weeks later, same nine searches.

This time one of them broke.

A locally-owned operator in Arusha, Tanzania, took position one — displacing the directory that held that spot in August.

So we went and read their site, because "a local business won" is only interesting if you can say how.

An FAQ on the homepage answering seven real questions. A section headed "Your Tanzanian safari in numbers" with actual figures on it. Organization and Article schema. A Trustpilot profile they point at themselves.

And two things almost nobody does. A real llms.txt file. And a robots.txt that names GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot explicitly.

Now the honest part, because you will not get it anywhere else. This does not prove causation. Google has never said it reads llms.txt, and we have no evidence that file moved a Google ranking. It is a correlation with a sample size of one.

Here is what makes it worth your time anyway.

The same week, we audited 30 of Cameroon's largest organisations. Not one publishes an llms.txt. Not one names a single AI crawler.

The two things the operator who beat the directories did are the two things an entire national economy has not done.

Both studies, with the raw data published for anyone to check:

https://afrishieldai.com/blog/ai-search-visibility-study-october-2026

#SEO #Africa #Tanzania #AISearch #Hospitality`,
  },
  {
    slug: 'how-long-does-seo-take-in-nigeria',
    title: 'How long does SEO take in Nigeria? The three clocks, month by month',
    cardTitle: 'How long SEO takes in Nigeria, honestly',
    metaTitle: 'How Long Does SEO Take in Nigeria?',
    description:
      'How long SEO takes in Nigeria: weeks for Google Maps, three to six months for area searches, six to twelve for city-wide terms, and how to check progress.',
    lede:
      'SEO in Nigeria usually takes three to six months to move area-level searches such as a service plus Lekki or Wuse, and six to twelve months or longer for city-wide and national terms. A verified Google Business Profile can appear on Maps within weeks. This guide covers the month-by-month timeline, what slows Nigerian sites down, the naira budget for the wait, and monthly progress checks.',
    category: 'Fundamentals',
    published: '2026-10-16',
    modified: '2026-10-16',
    readingMinutes: 10,
    primaryKeyword: 'how long does seo take in nigeria',
    image: {
      src: '/images/blog-how-long-does-seo-take-in-nigeria.webp',
      alt: 'Two smiling women sit at a round table with a laptop in a bright Lagos cafe.',
    },
    linkedin: `Month two of SEO. You search your own business on Google. Nothing.

You try your phone instead of the laptop. Then your spouse's phone, in case yours is hiding you from yourself. Still nothing.

Every Nigerian business owner who has paid for SEO knows this ritual. In our experience, it is the most common reason good SEO gets cancelled in month three.

Here is the thing nobody explains on the sales call. SEO in Nigeria does not run on one clock. It runs on three, like a Lagos bus park: the danfo, the BRT and the long-distance bus all leave from the same place, at very different times.

The danfo is Google Maps. A verified Business Profile can start showing for nearby searches within weeks, and Google says verification takes up to five business days.

The BRT is the area search. Physiotherapy Yaba. Dentist in Wuse 2. These usually move in three to six months, because fewer competitors bothered to write a page for them.

The long-distance bus is the city-wide term. Physiotherapy clinic Lagos. Six to twelve months, often longer in crowded categories like fintech, real estate and law.

Most owners stand at the long-distance bay on day 30, watching the danfo leave without them.

We have the receipts on this ourselves. Over 90 days, our own site averaged position 61.9 on Google, mostly for searchers in the UK. For the handful of searchers in Ghana and Cameroon, it sat at 7.0 and 3.7. Aimed at the whole world, a young site waits. Aimed at a market with thin competition, it moves. We would love to tell you we planned that.

The full Nigerian timeline, with what slows it down, a naira budget for the wait and a month-by-month progress check:

https://afrishieldai.com/blog/how-long-does-seo-take-in-nigeria

#Nigeria #SEO #LocalSEO #SmallBusiness #Lagos

Check the right bay this month. The danfo may already have left with your first customer on it.`,
  },
  {
    slug: 'how-to-get-more-google-reviews-in-nigeria',
    title: 'How to get more Google reviews in Nigeria: the link, the WhatsApp message and the rules',
    cardTitle: 'How to get more Google reviews in Nigeria',
    metaTitle: 'How to Get More Google Reviews in Nigeria',
    description:
      'How Nigerian businesses get more Google reviews: the free review link, a WhatsApp request at the right moment, and the rules that get profiles restricted.',
    lede:
      'A Nigerian business gets more Google reviews by sending every customer its free Google review link on WhatsApp when the service is finished, printing the review QR code on receipts and at the counter, and replying to every review. This guide covers the link, the message, timing by business type, and the Google rules on incentives, gating and fake reviews.',
    category: 'Local visibility',
    published: '2026-10-14',
    modified: '2026-10-14',
    readingMinutes: 10,
    primaryKeyword: 'how to get more google reviews in nigeria',
    image: {
      src: '/images/blog-how-to-get-more-google-reviews-in-nigeria.webp',
      alt: 'A smiling shopkeeper in a red T-shirt leans on a wooden counter in front of shelves of toiletries and household goods.',
    },
    linkedin: `"I will do it later."

Every Nigerian business owner who has ever asked a happy customer for a Google review has heard this sentence. Warmly. Sincerely. Forty times a month.

Later, it turns out, is a place. Nobody has ever come back from it with a review.

Think of a review request like asking a guest to drop something at your house on their way home. If you give them directions, they will mean to. If you put the thing in their hand at the gate, it actually arrives.

The review link is the thing in their hand. A few points that make the difference:

1. Your Google Business Profile has a free review link and QR code under Read reviews, then Get more reviews. It opens the review box directly, so nobody has to search for you and land on a competitor.
2. Send it on WhatsApp, by name, the moment the job is done. Google itself lists WhatsApp as a channel for this.
3. Ask every customer, not only the smiling ones. Asking only happy customers is review gating, and Google prohibits it.
4. No discounts, no free items, no staff quotas. Google can block a profile from receiving new reviews, unpublish the existing ones, or show customers a warning that fake reviews were removed.

All of it costs ₦0. We are an SEO agency writing a full guide to something free, which our finance team has noted with some concern.

The full routine, with timing by business type and a 30-day plan:

https://afrishieldai.com/blog/how-to-get-more-google-reviews-in-nigeria

#Nigeria #GoogleReviews #LocalSEO #SmallBusiness #WhatsAppBusiness

Send the link today. Later will still be there, but at least this time your customers will have something to do when they get to it.`,
  },
  {
    slug: 'how-to-appear-on-google-maps-in-lagos',
    title: 'How to appear on Google Maps in Lagos: the address, the pin and the video',
    cardTitle: 'How to appear on Google Maps in Lagos',
    metaTitle: 'How to Appear on Google Maps in Lagos',
    description:
      'How a Lagos business gets on Google Maps: a free verified profile, a pin on the right building, video verification, and showing up for area searches.',
    lede:
      'A Lagos business appears on Google Maps by creating a free Google Business Profile, verifying it, placing the map pin on the actual building and choosing a category that matches what customers search for. This guide covers landmark addresses, plaza units, home-based businesses, video verification, district-level searches and reviews, using the rules Google publishes.',
    category: 'Local visibility',
    published: '2026-10-12',
    modified: '2026-10-12',
    readingMinutes: 10,
    primaryKeyword: 'how to appear on google maps in lagos',
    image: {
      src: '/images/blog-how-to-appear-on-google-maps-in-lagos.webp',
      alt: 'A busy Nigerian street lined with small shops and signboards, with yellow keke tricycles queued along the road.',
    },
    linkedin: `"Opposite the filling station, after the second bus stop, the blue gate."

Every dispatch rider in Lagos can work with that address. Google cannot.

That is the real reason so many good Lagos businesses are missing from Google Maps, or sitting on it with the pin in the middle of the road two streets away. Nothing is wrong with the business. The form just expects a street number that half the city was never issued.

Think of Google as a new rider on his first day. He does not know the filling station. He has never seen the blue gate. He only arrives if you drop the pin for him and prove the place exists.

So the fix is unglamorous:

1. Enter whatever official address exists, shop number on line two, then move the pin onto your actual entrance by hand. Google allows this.
2. Expect to verify by video. One continuous take, at least 30 seconds, recorded live: the street, your signboard, you unlocking the door.
3. Use the name on your signboard. Adding "Best Cakes Lekki Ikeja Lagos" to it is how listings get suspended.
4. You show up near where you are. An Ikeja shop does not rank in Lekki, whatever the person selling the package says.

The whole thing costs ₦0. We run an SEO agency and have just explained that the first step is free and takes an afternoon, which tells you everything about our commercial instincts.

The full Lagos walkthrough, plazas and home businesses included:

https://afrishieldai.com/blog/how-to-appear-on-google-maps-in-lagos

#Lagos #GoogleMaps #LocalSEO #NigerianBusiness #SmallBusiness

Do it this week and the next rider may find you without calling. You might even miss the calls.`,
  },
  {
    slug: 'how-much-does-seo-cost-in-nigeria',
    title: 'How much does SEO cost in Nigeria? Real naira prices for 2026',
    cardTitle: 'How much SEO costs in Nigeria, in naira',
    metaTitle: 'How Much Does SEO Cost in Nigeria? (2026)',
    description:
      'Real 2026 SEO prices in Nigeria, in naira: what freelancers, Lagos and Abuja agencies and foreign firms charge, and what each price band buys.',
    lede:
      'SEO in Nigeria costs most small and mid-sized businesses between ₦200,000 and ₦1,500,000 a month in 2026. This guide sets out what freelancers, Lagos and Abuja agencies and foreign firms charge in naira, what each price band buys, the exchange-rate clause to insist on, and when not to pay at all.',
    category: 'Money',
    published: '2026-09-30',
    modified: '2026-09-30',
    readingMinutes: 10,
    primaryKeyword: 'how much does seo cost in nigeria',
  },
  {
    slug: 'top-geo-ai-seo-agencies-africa-2026',
    title:
      'The 2026 guide to Generative Engine Optimization (GEO) and AI search agencies in Africa',
    cardTitle: 'Top GEO & AI search agencies in Africa (2026)',
    metaTitle: 'Top GEO Agencies in Africa (2026)',
    description:
      'The leading Generative Engine Optimization agencies serving African businesses in 2026: how to evaluate them, a provider matrix, and when GEO beats local SEO.',
    lede:
      'Generative Engine Optimization agencies in Africa help businesses win brand citations inside AI engines such as Perplexity, ChatGPT Search, Google Gemini and Claude. This guide compares the providers serving Central and East Africa in 2026, sets out the framework used to evaluate them, and explains when GEO is a better investment than local SEO.',
    category: 'Comparison',
    published: '2026-08-30',
    modified: '2026-08-30',
    readingMinutes: 9,
    primaryKeyword: 'generative engine optimization agencies africa',
    image: {
      src: '/images/blog-top-geo-ai-seo-agencies-africa-2026.jpg',
      alt: 'Two African business professionals comparing options on a laptop across a table in a meeting.',
    },
  },
  {
    slug: 'enterprise-geo-launch-africa',
    title:
      'AfriShield AI launches enterprise Generative Engine Optimization across Africa',
    cardTitle: 'AfriShield AI launches enterprise GEO in Africa',
    metaTitle: 'Enterprise GEO Launches in Africa',
    description:
      'AfriShield AI is launching an enterprise GEO and Answer Engine Optimization service across Central, East and West Africa, to get brands named inside AI answers.',
    lede:
      'AfriShield AI is launching an enterprise Generative Engine Optimization and Answer Engine Optimization service for African businesses, run from hubs in Douala and Nairobi. The work gets a brand named inside the answers given by Perplexity, ChatGPT Search, Google Gemini and Claude, using clean entity data, structured markup and third-party corroboration. No placement is guaranteed.',
    category: 'Announcements',
    published: '2026-08-30',
    modified: '2026-08-30',
    readingMinutes: 7,
    primaryKeyword: 'enterprise generative engine optimization africa',
    image: {
      src: '/images/blog-enterprise-geo-launch-africa.jpg',
      alt: 'A focused African technology professional working at a computer in an open-plan office.',
    },
  },
  {
    slug: 'ai-search-visibility-study',
    title:
      'Who does AI recommend when someone searches for an African business? A 5-city study',
    cardTitle: 'Who AI recommends in African cities (a study)',
    metaTitle: 'Who AI names when Africa searches',
    description:
      'Nine real searches in five African cities: a business’s own site was 23% of page one in travel and 68% in professional services. The raw data is published.',
    lede:
      'We ran nine real searches across Nairobi, Lagos, Accra, Johannesburg and Arusha. In travel and hospitality, a business’s own website was 23% of page-one organic results; in professional services, local firms’ own sites were 68%. Google served an AI-generated answer on all nine searches. The raw data is published in this study.',
    category: 'Original research',
    published: '2026-08-28',
    modified: '2026-10-19',
    readingMinutes: 8,
    primaryKeyword: 'ai search visibility for african businesses',
    image: {
      src: '/images/blog-ai-search-visibility-study.webp',
      alt: 'An African business owner smiling at a laptop while checking search results in an office.',
    },
  },
  {
    slug: 'content-marketing-for-small-business',
    title: 'Content marketing for small business: what actually earns attention (and what wastes it)',
    cardTitle: 'Content marketing for small business, honestly',
    metaTitle: 'Content Marketing For Small Business',
    description:
      'What content marketing actually means for a small business, the content worth the time, how often to publish, and how to tell whether any of it is working.',
    lede:
      'Content marketing for a small business means publishing the guides, comparisons, pricing pages and answers a future customer searches for before buying. This guide covers which content is worth the time, how often to publish on a schedule the business can sustain, and how to tell whether any of it is working.',
    category: 'Content strategy',
    published: '2026-08-23',
    readingMinutes: 10,
    primaryKeyword: 'content marketing for small business',
    image: {
      src: '/images/blog-content-marketing-for-small-business.webp',
      alt: 'A small-business owner writing content on a laptop, a notebook and coffee beside them.',
    },
  },
  {
    slug: 'how-to-get-more-website-traffic',
    title: 'How to get more website traffic: the channels that actually move the number',
    cardTitle: 'How to get more website traffic, honestly',
    metaTitle: 'How To Get More Website Traffic',
    description:
      'Why a higher Google ranking does not always mean more visitors, the five traffic channels a small business controls, and how to tell which one is working.',
    lede:
      'A website gets more traffic by working several channels at once: organic search, mentions in AI-assistant answers, referral links from other sites, local and Maps visibility, and repeat visits from email or brand recall. This guide explains why a higher ranking alone does not always raise traffic, and how to measure which channel is carrying visitors.',
    category: 'Traffic growth',
    published: '2026-08-22',
    readingMinutes: 10,
    primaryKeyword: 'how to get more website traffic',
    image: {
      src: '/images/blog-how-to-get-more-website-traffic.webp',
      alt: 'A business owner reviewing website traffic and analytics charts on a laptop and tablet.',
    },
  },
  {
    slug: 'how-to-appear-on-google-maps',
    title: 'How to appear on Google Maps: the ranking factors that actually decide it',
    cardTitle: 'How to appear on Google Maps, explained',
    metaTitle: 'How To Appear On Google Maps',
    description:
      'Why a business does not show on Google Maps, the three ranking factors Google uses, and the profile fixes that move a listing into the map pack.',
    lede:
      'A business appears on Google Maps by having a verified Google Business Profile whose category, location and reviews match the search. Google ranks listings on relevance, distance and prominence. This guide covers why a business is missing from the map, usually an unverified profile, the wrong primary category or too few reviews, and the fixes for each.',
    category: 'Local visibility',
    published: '2026-08-21',
    readingMinutes: 10,
    primaryKeyword: 'how to appear on google maps',
    image: {
      src: '/images/blog-how-to-appear-on-google-maps.webp',
      alt: 'A smiling shop owner in an apron at his storefront, holding a crate of fresh produce.',
    },
  },
  {
    slug: 'how-to-improve-google-ranking',
    title: 'How to improve your Google ranking: the checklist that actually works',
    cardTitle: 'How to improve Google ranking, the plain checklist',
    metaTitle: 'How To Improve Your Google Ranking',
    description:
      'The technical fixes, on-page basics, content and trust signals that move a Google ranking, in the order that matters, and how long each takes to show.',
    lede:
      'Improving a Google ranking means working through four layers in order: technical health, on-page fundamentals, content depth, and trust signals such as reviews, links and mentions. This guide explains what to fix in each layer, how long each one realistically takes to show, and why starting with backlinks on a slow site is the most common reason ranking work stalls.',
    category: 'Fundamentals',
    published: '2026-08-20',
    readingMinutes: 11,
    primaryKeyword: 'how to improve google ranking',
    image: {
      src: '/images/blog-how-to-improve-google-ranking.webp',
      alt: 'A focused entrepreneur working intently at a laptop by an office window.',
    },
  },
  {
    slug: 'how-to-do-keyword-research',
    title: 'How to do keyword research: a method that works without an agency budget',
    cardTitle: 'How to do keyword research, the real method',
    metaTitle: 'How To Do Keyword Research, Explained',
    description:
      'How to find the words customers use before they buy, without a paid tool: where to look, how to read low African search volumes, and a five-step process.',
    lede:
      'Keyword research is finding the exact words and phrases customers type or say before they buy, then sorting them by relevance, competition and closeness to a decision. This guide shows where to look without a paid tool, how to read low African search volumes, how to match intent, and a five-step process that takes one afternoon.',
    category: 'Research',
    published: '2026-08-19',
    readingMinutes: 10,
    primaryKeyword: 'how to do keyword research',
    image: {
      src: '/images/blog-how-to-do-keyword-research.webp',
      alt: 'A young entrepreneur jotting research notes in a notebook beside a laptop.',
    },
  },
  {
    slug: 'seo-vs-google-ads',
    title: 'SEO vs Google Ads: which one should a small business fund first?',
    cardTitle: 'SEO vs Google Ads, the honest breakdown',
    metaTitle: 'SEO vs Google Ads: The Honest Breakdown',
    description:
      'Google Ads buys clicks the day you launch; SEO earns them after months of work. The comparison on cost, speed and durability, and which to fund first.',
    lede:
      'Google Ads buys placement at the top of the results page for as long as you keep paying, and usually produces clicks within hours. SEO earns placement through pages Google judges relevant and trustworthy, usually takes three to six months to show movement, and keeps producing traffic after spending stops. This guide compares cost, speed and durability, and which to fund first.',
    category: 'Comparison',
    published: '2026-08-18',
    readingMinutes: 10,
    primaryKeyword: 'seo vs google ads',
    image: {
      src: '/images/blog-seo-vs-google-ads.webp',
      alt: 'Two colleagues comparing performance charts and figures across a desk.',
    },
  },
  {
    slug: 'local-seo-for-small-business',
    title: 'Local SEO for small business: the checklist that actually moves rankings',
    cardTitle: 'Local SEO for small business, the real checklist',
    metaTitle: 'Local SEO For Small Business, Explained',
    description:
      'What local SEO is, how it differs from general SEO, and the mostly free work that moves the map pack: Google Business Profile, NAP, citations and reviews.',
    lede:
      'Local SEO for a small business is the work that gets it found when someone nearby searches for what it sells: a complete Google Business Profile, the same name, address and phone number on every listing, a steady flow of real reviews, and pages built for near-me searches. This guide explains how it differs from general SEO and what to do first.',
    category: 'Local visibility',
    published: '2026-08-17',
    readingMinutes: 10,
    primaryKeyword: 'local seo for small business',
    image: {
      src: '/images/blog-local-seo-for-small-business.webp',
      alt: 'A smiling café owner in an apron standing in her shop.',
    },
  },
  {
    slug: 'how-long-does-seo-take',
    title: 'How long does SEO take? The realistic timeline, month by month',
    cardTitle: 'How long does SEO take? A realistic timeline',
    metaTitle: 'How Long Does SEO Take? A Realistic Timeline',
    description:
      'Most small business sites see ranking movement in three to six months and real traffic in six to twelve. The month-by-month timeline and what speeds it up.',
    lede:
      'Most small business websites see the first measurable ranking movement within three to six months of consistent SEO work, and organic traffic that produces enquiries within six to twelve months. This guide gives the month-by-month timeline, what speeds it up, what does not, and why competitive keywords and brand-new sites take longer.',
    category: 'Fundamentals',
    published: '2026-08-14',
    readingMinutes: 10,
    primaryKeyword: 'how long does seo take',
    image: {
      src: '/images/blog-how-long-does-seo-take.webp',
      alt: 'A business owner pausing in thought at a laptop, coffee in hand, waiting on results.',
    },
  },
  {
    slug: 'is-seo-worth-it',
    title: 'Is SEO worth it? The honest answer, with the math that backs it up',
    cardTitle: 'Is SEO worth it? An honest answer',
    metaTitle: 'Is SEO Worth It? The Honest Answer',
    description:
      'SEO is worth it for most small businesses, but not on every timeline or budget. The real return, what it costs, and the honest case for skipping it.',
    lede:
      'SEO is worth it for most small businesses that plan to still be trading in a year, because the visitors it earns keep arriving after the work is paid for. It is not worth it for a business that needs revenue this month or cannot fund three to six quiet months first. This guide covers the return, the cost and when to skip it.',
    category: 'Money',
    published: '2026-08-13',
    readingMinutes: 10,
    primaryKeyword: 'is seo worth it',
    image: {
      src: '/images/blog-is-seo-worth-it.webp',
      alt: 'A business owner counting cash over financial statements and a notebook.',
    },
  },
  {
    slug: 'how-to-rank-on-chatgpt',
    title:
      'How to rank on ChatGPT: the actual work, since there is no ranking algorithm to game',
    cardTitle: 'How to rank on ChatGPT, without the ranking',
    metaTitle: 'How to rank on ChatGPT, explained',
    description:
      'There is no ChatGPT ranking algorithm to climb. Here is the concrete, checkable work that actually gets a business named in a ChatGPT answer instead.',
    lede:
      'There is no ChatGPT ranking algorithm to climb, and nothing assigns a business position one, two or three. What decides whether ChatGPT names a business is whether the model finds it described clearly, specifically and corroborated elsewhere. This guide covers the work that achieves that: a crawlable page, a plain answer near the top, matching structured data and outside mentions.',
    category: 'AI answers',
    published: '2026-08-12',
    readingMinutes: 10,
    primaryKeyword: 'how to rank on chatgpt',
    image: {
      src: '/images/blog-how-to-rank-on-chatgpt.webp',
      alt: 'A professional checking his phone the way customers now ask an AI assistant a question.',
    },
  },
  {
    slug: 'google-business-profile-optimization',
    title: 'Google Business Profile optimization: the work that happens after setup',
    cardTitle: 'Google Business Profile optimization, done right',
    metaTitle: 'Google Business Profile Optimization',
    description:
      'The category and attribute choices, photo and Posts cadence, and review habits that move a Google Business Profile once it is already set up.',
    lede:
      'Google Business Profile optimization is the ongoing work of improving a profile that is already claimed and verified: choosing the correct category and attributes, adding real photos and short Posts every week, answering every review and question, and checking Insights monthly. This guide covers each of those and explains how optimization differs from the one-time job of setup.',
    category: 'Local visibility',
    published: '2026-08-11',
    readingMinutes: 10,
    primaryKeyword: 'google business profile optimization',
    image: {
      src: '/images/blog-google-business-profile-optimization.webp',
      alt: 'A shop owner turning the sign to Open at the door of his store.',
    },
  },
  {
    slug: 'how-to-get-hotel-cited-by-chatgpt',
    title: 'How to get your hotel cited by ChatGPT (and the other assistants travelers now ask)',
    cardTitle: 'How to get your hotel cited by ChatGPT',
    metaTitle: 'Get your hotel cited by ChatGPT',
    description:
      'What gets a hotel named in ChatGPT, Perplexity and Gemini answers: crawler access, answer-first content, structured data and one consistent identity.',
    lede:
      'Getting a hotel cited by ChatGPT means making the property the easiest correct answer for an AI assistant to give. That takes five things: letting AI crawlers read the site, a plain answer at the top of each key page, structured data stating what and where the property is, identical details across every listing, and a monthly check of what the assistants say.',
    category: 'AI answers',
    published: '2026-08-10',
    readingMinutes: 10,
    primaryKeyword: 'how to get hotel cited by chatgpt',
    image: {
      src: '/images/blog-how-to-get-hotel-cited-by-chatgpt.webp',
      alt: 'A luxury safari lodge surfacing inside an AI assistant’s answer to the query “best luxury lodges near Arusha.”',
    },
  },
  {
    slug: 'how-to-reduce-ota-commission',
    title: 'How to reduce OTA commission: the direct-booking playbook for lodges and hotels',
    cardTitle: 'How to reduce OTA commission',
    metaTitle: 'How to reduce OTA commission',
    description:
      'OTA commissions run 10–25% of every booking. A practical playbook for African lodges and hotels to move reservations onto direct channels.',
    lede:
      'Reducing OTA commission means moving part of a property’s bookings from platforms that charge 10–25 percent per reservation to channels it owns. This playbook for African lodges and hotels sets out the order that works: fix the booking path, win the specific searches travelers run, get cited by AI assistants, then rebook past guests directly.',
    category: 'Direct bookings',
    published: '2026-08-10',
    readingMinutes: 11,
    primaryKeyword: 'how to reduce ota commission',
    image: {
      src: '/images/blog-how-to-reduce-ota-commission.webp',
      alt: 'A Tanzanian safari operator checking a booking calendar on a tablet, Mount Meru framed in the window behind him.',
    },
  },
  {
    slug: 'what-is-schema-markup',
    title:
      'What is schema markup? The structured data explainer for a small business site',
    cardTitle: 'What is schema markup, explained plainly',
    metaTitle: 'What is schema markup? A plain answer',
    description:
      'What schema markup is, the schema.org types worth using on a small business site, and the limits of what a few lines of JSON-LD can do.',
    lede:
      'Schema markup is structured code, usually written in JSON-LD, added to a web page so a search engine or AI assistant can read what the page is about instead of guessing from the visible text. This guide explains how it works, which schema.org types are worth using on a small business site, and what it cannot do.',
    category: 'Technical SEO',
    published: '2026-08-10',
    readingMinutes: 9,
    primaryKeyword: 'what is schema markup',
    image: {
      src: '/images/blog-what-is-schema-markup.webp',
      alt: 'A nyama choma food-stall owner on her phone — the hours, menu and reviews that schema markup turns into facts a machine can read.',
    },
  },
  {
    slug: 'how-to-get-my-business-on-google',
    title:
      'How to get your business on Google: search, Maps, and being the answer an AI names',
    cardTitle: 'How to get your business on Google',
    metaTitle: 'Get your business on Google, step by step',
    description:
      'The three separate ways a business shows up on Google — Maps, organic search, and AI answers — and the concrete, mostly-free steps for each, cheapest first.',
    lede:
      'Getting a business onto Google is three separate jobs: claiming and verifying a Google Business Profile so it appears in Maps and the local pack, getting the website crawled and indexed so it appears in search results, and writing pages clearly enough for an AI assistant to quote. This guide covers the steps for each, cheapest first.',
    category: 'Local visibility',
    published: '2026-08-10',
    readingMinutes: 10,
    primaryKeyword: 'how to get my business on google',
    image: {
      src: '/images/blog-how-to-get-my-business-on-google.webp',
      alt: 'A phone-repair shop owner holding up his phone showing his Google Business Profile and a Google Maps pin.',
    },
  },
  {
    slug: 'small-business-seo',
    title: 'Small business SEO: what actually matters when you do not have an agency budget',
    cardTitle: 'Small business SEO, without the agency budget',
    metaTitle: 'Small business SEO, explained',
    description:
      'What small business SEO is, why it is not scaled-down enterprise SEO, and the mostly free moves that matter before you consider hiring anyone.',
    lede:
      'Small business SEO is the practice of making a small, owner-run business easy for a search engine or an AI assistant to find, trust and recommend, using the time and budget it actually has. In practice that means a complete Google Business Profile, a handful of accurate service and city pages, and content that answers the questions customers already ask.',
    category: 'Fundamentals',
    published: '2026-08-05',
    readingMinutes: 10,
    primaryKeyword: 'small business seo',
    image: {
      src: '/images/blog-small-business-seo.webp',
      alt: 'A small-business owner looking anxiously at a laptop showing a falling website-traffic graph.',
    },
  },
  {
    slug: 'answer-engine-optimization',
    title: 'Answer engine optimization: getting your business quoted by the AI, not just ranked by Google',
    cardTitle: 'Answer engine optimization, without the hype',
    metaTitle: 'Answer engine optimization explained',
    description:
      'What it takes to be named inside an AI assistant’s answer — not just listed underneath it — and why the gap is wider, and more winnable, in African markets.',
    lede:
      'Answer engine optimization is the work of getting a business named inside the answer an AI assistant gives, from ChatGPT, Claude, Perplexity or Google’s AI overview, and not only in the list of links underneath. This guide explains how the tactics relate to SEO, what a model needs in order to quote a business, and why the gap is more winnable in African markets.',
    category: 'AI answers',
    published: '2026-07-29',
    readingMinutes: 9,
    primaryKeyword: 'answer engine optimization',
    image: {
      src: '/images/blog-answer-engine-optimization.webp',
      alt: 'Two marketers celebrating in front of a screen showing a falling Google traffic graph — hype outpacing the results.',
    },
  },
  {
    slug: 'what-ai-seo-actually-does',
    title: 'What an AI SEO agency actually does all day (and what it definitely does not)',
    cardTitle: 'What an AI SEO agency actually does all day',
    metaTitle: 'What an AI SEO agency does all day',
    description:
      'A plain, slightly unflattering tour of the work behind an AI SEO retainer — the clustering, the writing, the schema, and the parts nobody photographs.',
    lede:
      'An AI SEO agency spends most of its week on three things: deciding what to target, writing pages that answer those questions better than the current top results, and checking the technical setup that lets search engines understand them. Agents handle keyword clustering, research drafts and schema validation. A human decides what to skip, edits every published word and signs the report.',
    category: 'The work',
    published: '2026-07-24',
    readingMinutes: 9,
    primaryKeyword: 'ai seo agency for small business',
    image: {
      src: '/images/blog-what-ai-seo-actually-does.jpg',
      alt: 'An African professional focused on work at a laptop in an office.',
    },
  },
  {
    slug: 'what-seo-actually-costs',
    title: 'What SEO actually costs, with the awkward numbers left in',
    cardTitle: 'What SEO actually costs, awkward numbers included',
    metaTitle: 'What SEO actually costs, explained',
    description:
      'Real ranges, what sits behind each one, and the four months of paying before earning that nobody puts on the pricing page.',
    lede:
      'Most small businesses pay between $500 and $2,000 a month for SEO. Published industry pricing surveys for 2026 put the broad market at roughly $500 to $3,000 a month, with freelancers lower and enterprise work at $10,000 and up. This guide explains what sits behind each range and the four to six months of paying before the return starts.',
    category: 'Money',
    published: '2026-07-24',
    readingMinutes: 10,
    primaryKeyword: 'how much does seo cost',
    image: {
      src: '/images/blog-what-seo-actually-costs.jpg',
      alt: 'An African small-business owner managing money and a phone at a market stall.',
    },
  },
  {
    slug: 'ai-seo-vs-traditional-seo',
    title: 'AI SEO vs traditional SEO: a fair fight, refereed badly',
    cardTitle: 'AI SEO vs traditional SEO: a fair fight',
    metaTitle: 'AI SEO vs traditional SEO: a fair fight',
    description:
      'Where automation genuinely wins, where it quietly loses, and the specific jobs you should never hand to a machine without a human reading the output.',
    lede:
      'AI SEO and traditional SEO are the same strategy with a different division of labour. Both aim at pages that rank because they answer a question properly. AI SEO hands repetitive work such as keyword clustering, competitive summaries, first drafts and technical validation to agents, and keeps strategy, editing and judgement with a person. This guide covers where automation wins and where it loses.',
    category: 'Comparison',
    published: '2026-07-24',
    readingMinutes: 9,
    primaryKeyword: 'ai seo vs traditional seo',
    image: {
      src: '/images/blog-ai-seo-vs-traditional-seo.jpg',
      alt: 'An African team working at computers in a technology office.',
    },
  },
];

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function otherPosts(slug: string) {
  return POSTS.filter((post) => post.slug !== slug);
}
