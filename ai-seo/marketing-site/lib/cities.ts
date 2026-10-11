/**
 * City landing-page data — the commercial layer of the topical map.
 *
 * Why this file exists: `SERVED_CITIES` in `structured-data.ts` has asserted
 * areaServed for these cities since launch, but no page ever backed the claim.
 * Google Search Console (90 days to 2026-09-21) showed the consequence: 667
 * impressions at an average position of 61.9, almost all of it on generic
 * global informational queries from Sweden, the Netherlands and the US, and
 * almost nothing on African commercial intent.
 *
 * Each entry carries genuinely distinct local detail — real districts, the
 * actual business mix, how buyers in that market search. Koray's multi-location
 * rule: a page whose only local content is a swapped city name is duplicate
 * dilution, not a local page. No street address or phone is asserted per city;
 * we never fabricate NAP.
 */

export type City = {
  slug: string;
  /** City name as a buyer types it. */
  name: string;
  country: string;
  /** Currency we invoice in for this market, for the pricing FAQ answer. */
  currency: string;
  /** Used in the <title>; kept short enough to survive truncation. */
  metaTitle: string;
  metaDescription: string;
  /** H1. */
  title: string;
  heroBlurb: string;
  /** 40–70 words, entity-dense, liftable by an answer engine. */
  bluf: string;
  /** Named business districts — the local-proof signal. */
  districts: string[];
  /** What the economy here actually runs on. */
  marketReality: string;
  /** How buyers in this market search, specifically. */
  searchBehaviour: string;
  /** The sectors we are a genuine fit for here. */
  sectors: string[];
  /** Honest note on competitive difficulty in this market. */
  competitiveNote: string;
  faq: { q: string; a: string }[];
};

export const CITIES: City[] = [
  {
    slug: 'lagos',
    name: 'Lagos',
    country: 'Nigeria',
    currency: 'NGN',
    metaTitle: 'AI SEO Agency in Lagos, Nigeria',
    metaDescription:
      'AI SEO and GEO for Lagos businesses — Victoria Island, Lekki, Ikeja and Yaba. Get found on Google, Google Maps, and inside ChatGPT and Perplexity answers. From $150/month, invoiced in NGN.',
    title: 'AI SEO in Lagos, for businesses that need the phone to ring',
    heroBlurb:
      'Search visibility for Lagos businesses across Victoria Island, Lekki, Ikeja and Yaba — run by agents, edited by people, reported in numbers you can check.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Lagos, Nigeria — covering Victoria Island, Ikoyi, Lekki, Ikeja and Yaba. The service includes technical fixes, a Lagos-specific keyword map, published content, Google Business Profile work, and visibility inside ChatGPT, Perplexity and Google AI answers. Pricing starts at USD 150 per month, invoiced in NGN.',
    districts: [
      'Victoria Island and Ikoyi',
      'Lekki Phase 1 and the Lekki–Epe corridor',
      'Ikeja and Computer Village',
      'Yaba',
      'Surulere',
      'Apapa',
    ],
    marketReality:
      'Lagos is the densest commercial market in West Africa and the centre of Nigerian fintech, which means two things for search. First, the buyer you want is almost certainly on a phone, on mobile data they are conscious of spending, so a heavy site loses them before it loads. Second, the competition for a term like “SEO agency Lagos” is not a global publisher — it is a handful of local agencies, most of them running WordPress builds with thin service pages. That is a beatable field, which is not something you can say about most search markets.',
    searchBehaviour:
      'Lagos buyers search by area, not by city — “accountant in Lekki” far more than “accountant in Lagos” — because a forty-minute go-slow between Ikoyi and Ikeja makes proximity a real purchase criterion. Google Maps carries a disproportionate share of the intent, and WhatsApp is usually the contact route a lead actually takes, not a contact form. We build for all three.',
    sectors: [
      'Fintech and financial services',
      'Professional practices — law, accounting, consulting',
      'Real estate and property management',
      'Healthcare and specialist clinics',
      'B2B services and logistics',
    ],
    competitiveNote:
      'Lagos is the most contested market on this list, but contested by local agencies rather than international ones. Expect three to six months before a competitive commercial term moves, and faster movement on area-level and long-tail terms.',
    faq: [
      {
        q: 'How much does SEO cost in Lagos?',
        a: 'The same three tiers apply in Lagos as everywhere else we work: USD 150, 400 or 900 a month. We invoice in NGN at the prevailing rate if you prefer. There is no setup fee and no minimum term — thirty days notice and you can stop.',
      },
      {
        q: 'Do you work with businesses outside Lagos Island?',
        a: 'Yes. Mainland businesses in Ikeja, Yaba, Surulere and Ojota are often better opportunities than Island ones, because the search competition is thinner while the commercial intent is the same. Where you sit only matters to us for the local pages and the Google Business Profile work.',
      },
      {
        q: 'How long before a Lagos business sees results?',
        a: 'Area-level and long-tail terms usually move first, within roughly six to twelve weeks. A head commercial term like “SEO agency Lagos” takes longer — plan on three to six months. Anyone promising page one in a month in this market is guessing or lying.',
      },
      {
        q: 'Can you get my Lagos business recommended by ChatGPT?',
        a: 'We can materially improve the odds, and we measure it monthly rather than asserting it. AI engines synthesise answers from what they can retrieve and corroborate, so the work is structured data, answer-first content, and third-party corroboration. No agency can guarantee a fixed placement in a generated answer, because there is no ranking slot to buy.',
      },
    ],
  },
  {
    slug: 'abuja',
    name: 'Abuja',
    country: 'Nigeria',
    currency: 'NGN',
    metaTitle: 'AI SEO Agency in Abuja, Nigeria',
    metaDescription:
      'AI SEO and GEO for Abuja businesses — Maitama, Wuse II, Garki and the Central Business District. Built for professional practices, contractors and NGOs. From $150/month, invoiced in NGN.',
    title: 'AI SEO in Abuja, built for a professional-services capital',
    heroBlurb:
      'Search visibility for Abuja firms across Maitama, Wuse II, Garki and the CBD — the practices, contractors and organisations that win work on credibility.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Abuja, Nigeria — covering Maitama, Asokoro, Wuse II, Garki, Gwarinpa and the Central Business District. The work suits professional practices, government contractors and non-profits: technical fixes, an Abuja-specific keyword map, published content, and visibility inside ChatGPT, Perplexity and Google AI answers. From USD 150 per month.',
    districts: [
      'Maitama and Asokoro',
      'Wuse II',
      'Garki and the Central Business District',
      'Jabi',
      'Gwarinpa',
    ],
    marketReality:
      'Abuja is a capital rather than a commercial port, and its economy shows it: government contracting, professional practices, non-profits and international organisations, plus the hospitality and real estate that serve them. That changes the SEO job. Buyers here are frequently doing due diligence on a firm before a meeting rather than shopping on price, so the pages that earn the work are the ones that survive scrutiny — real credentials, plain answers, no stock-photo bluster.',
    searchBehaviour:
      'Abuja search skews toward qualification rather than discovery. People search a firm by name after being referred, compare two or three shortlisted providers, and increasingly ask an AI assistant to summarise who a company is before making contact. That makes being legible to an answer engine unusually valuable in this market — if ChatGPT cannot describe your firm accurately, you lose the comparison before you knew it was happening.',
    sectors: [
      'Law firms and chambers',
      'Accounting and audit practices',
      'Construction and government contractors',
      'NGOs and development organisations',
      'Hospitality and serviced apartments',
    ],
    competitiveNote:
      'Abuja is meaningfully less contested than Lagos for commercial terms. A well-structured site with genuine local content can move faster here than the Lagos equivalent, often inside three months on mid-tail terms.',
    faq: [
      {
        q: 'How much does SEO cost in Abuja?',
        a: 'USD 150, 400 or 900 a month, the same three tiers we run everywhere, invoiced in NGN on request. Month to month, thirty days notice, no setup fee.',
      },
      {
        q: 'Do you work with law firms and professional practices?',
        a: 'Yes, and they are among the better fits for this service. Practices win on credibility rather than price, which suits content that answers a prospect honestly instead of overselling. We do not do anything that would breach professional advertising rules — if your regulator restricts claims, we work inside that.',
      },
      {
        q: 'Is Abuja easier to rank in than Lagos?',
        a: 'Generally yes. There is less competition for commercial search terms in Abuja, so the same work tends to show results sooner. That is a real advantage and we would rather say it plainly than pretend every market is equally hard.',
      },
      {
        q: 'Can you help an NGO or development organisation?',
        a: 'Yes. The usual goal there is not leads but being findable and accurately described — by donors, partners, journalists and increasingly by AI assistants summarising the sector. That is mostly structured data, clear answer-first content, and consistency across the places that describe you.',
      },
    ],
  },
  {
    slug: 'accra',
    name: 'Accra',
    country: 'Ghana',
    currency: 'GHS',
    metaTitle: 'AI SEO Agency in Accra, Ghana',
    metaDescription:
      'AI SEO and GEO for Accra businesses — Osu, East Legon, Airport Residential, Cantonments and Tema. Get found on Google, Maps and in AI answers. From $150/month, invoiced in GHS.',
    title: 'AI SEO in Accra, for businesses selling to Ghana and the diaspora',
    heroBlurb:
      'Search visibility for Accra businesses across Osu, East Legon, Airport Residential and Tema — including the diaspora traffic most Ghanaian sites never capture.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Accra, Ghana — covering Osu, East Legon, Airport Residential, Cantonments, Labone, Spintex and Tema. The service covers technical fixes, an Accra-specific keyword map, published content, Google Business Profile work, and visibility inside ChatGPT, Perplexity and Google AI answers. From USD 150 per month, invoiced in GHS.',
    districts: [
      'Osu and Labone',
      'East Legon',
      'Airport Residential and Cantonments',
      'Spintex',
      'Tema',
    ],
    marketReality:
      'Accra has two demand streams most local sites only serve one of. There is the domestic market — fintech riding mobile money, professional services, retail, education — and there is a substantial diaspora and returnee market researching Ghanaian businesses from the UK, the US and Canada before they travel or invest. Those two audiences search in noticeably different ways, and a site built only for the first quietly loses the second, which is usually the higher-value one.',
    searchBehaviour:
      'Domestic Accra search is mobile-first and Maps-heavy, with WhatsApp as the default contact route. Diaspora search happens on desktop, months ahead of a trip or a transaction, in longer and more comparative queries — and it is exactly the kind of research that now runs through an AI assistant instead of ten browser tabs. Being citable matters more here than in most markets.',
    sectors: [
      'Tourism, hospitality and short-stay rentals',
      'Fintech and mobile money services',
      'Real estate and diaspora property',
      'Professional and financial services',
      'Education and training',
    ],
    competitiveNote:
      'Accra is moderately competitive — thinner than Lagos and Johannesburg, denser than Douala. Diaspora-intent terms are the least contested and often the most commercially valuable, which is where we would usually start.',
    faq: [
      {
        q: 'How much does SEO cost in Accra?',
        a: 'USD 150, 400 or 900 a month across the three tiers, invoiced in GHS at the prevailing rate if you ask. No setup fee, no minimum term, thirty days notice.',
      },
      {
        q: 'Can you help us reach the Ghanaian diaspora?',
        a: 'Yes, and it is usually the most under-served opportunity on a Ghanaian site. Diaspora buyers research earlier, compare harder, and increasingly start inside an AI assistant rather than a search results page. That needs content that answers a distance-researcher honestly — logistics, payment, what happens if plans change — not just a services list.',
      },
      {
        q: 'Do you work with businesses in Tema as well as Accra?',
        a: 'Yes. Tema has a genuinely distinct commercial profile — port, industry, logistics — and it usually deserves its own page and its own keyword set rather than being folded into Accra.',
      },
      {
        q: 'Will this help us show up in ChatGPT and Google AI answers?',
        a: 'That is half of what we do. We structure the data and the content so answer engines can retrieve and corroborate what your business is, then benchmark monthly whether the engines actually name you. We report the benchmark either way, including when it says no.',
      },
    ],
  },
  {
    slug: 'nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    currency: 'KES',
    metaTitle: 'AI SEO Agency in Nairobi, Kenya',
    metaDescription:
      'AI SEO and GEO for Nairobi businesses — Westlands, Upper Hill, Kilimani, Karen and Gigiri. Built for safari operators, SaaS and professional firms. From $150/month, invoiced in KES.',
    title: 'AI SEO in Nairobi, for the businesses buyers compare before they call',
    heroBlurb:
      'Search visibility for Nairobi businesses across Westlands, Upper Hill, Kilimani and Karen — including the safari and travel operators losing bookings to OTAs.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Nairobi, Kenya — covering Westlands, Upper Hill, Kilimani, Karen, Gigiri and the CBD. The service covers technical fixes, a Nairobi-specific keyword map, published content, Google Business Profile work, and visibility inside ChatGPT, Perplexity and Google AI answers. From USD 150 per month, invoiced in KES.',
    districts: [
      'Westlands',
      'Upper Hill',
      'Kilimani',
      'Karen',
      'Gigiri',
      'The CBD and Industrial Area',
    ],
    marketReality:
      'Nairobi is the most digitally mature market in East Africa, with a real startup and SaaS sector, a large international-organisation presence around Gigiri, and a tourism industry that acts as the gateway to the Maasai Mara. Mobile money is assumed rather than exceptional, so friction in the payment step is not the problem it is elsewhere. The problem for most Nairobi businesses is upstream: the buyer never reached the site, because an OTA, an aggregator or a directory took the search first.',
    searchBehaviour:
      'Nairobi search splits sharply by sector. Local services behave like local services — Maps, proximity, reviews. Travel and safari behave nothing like that: the buyer is in Germany or the US, researching six months out, comparing operators, and increasingly asking an assistant to recommend one. Winning that second category is an AI-visibility problem far more than a ranking problem, and it is where the money is.',
    sectors: [
      'Safari operators and tour companies',
      'Lodges, camps and boutique hotels',
      'B2B SaaS and technology firms',
      'Professional and financial services',
      'NGOs and international organisations',
    ],
    competitiveNote:
      'Nairobi has the strongest local SEO agency field in East Africa, so head commercial terms are genuinely contested. Travel and safari intent, by contrast, is contested mostly by OTAs — which are beatable on specificity and on AI citation in a way they are not on raw domain strength.',
    faq: [
      {
        q: 'How much does SEO cost in Nairobi?',
        a: 'USD 150, 400 or 900 a month, invoiced in KES if you prefer. Month to month with thirty days notice, no setup fee, no minimum term.',
      },
      {
        q: 'Can you help a safari operator get direct bookings instead of OTA bookings?',
        a: 'That is one of the clearest wins available in this market. The work is being findable and citable at the research stage — months before the booking — so the traveller arrives at your site rather than meeting you as a commission line on someone else. We cannot make OTAs disappear, but we can stop them being the only place you exist.',
      },
      {
        q: 'Do you work with lodges and camps outside Nairobi?',
        a: 'Yes. Most of our hospitality work is for properties outside the city that sell through Nairobi. The camp or lodge usually needs its own location content and its own AI-visibility benchmark rather than being treated as an extension of the city page.',
      },
      {
        q: 'How long does SEO take in the Kenyan market?',
        a: 'Mid-tail and area terms typically move in six to twelve weeks. Head commercial terms in Nairobi take longer, three to six months, because the local agency field here is genuinely competent. Travel-intent terms can move faster because the competition is aggregators rather than optimised operator sites.',
      },
    ],
  },
  {
    slug: 'johannesburg',
    name: 'Johannesburg',
    country: 'South Africa',
    currency: 'ZAR',
    metaTitle: 'AI SEO Agency in Johannesburg, South Africa',
    metaDescription:
      'AI SEO and GEO for Johannesburg businesses — Sandton, Rosebank, Braamfontein and Midrand. The most competitive search market in Africa, handled honestly. From $150/month, invoiced in ZAR.',
    title: 'AI SEO in Johannesburg, where the search market is already grown up',
    heroBlurb:
      'Search visibility for Johannesburg businesses across Sandton, Rosebank, Braamfontein and Midrand — in the most competitive search market on the continent.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Johannesburg, South Africa — covering Sandton, Rosebank, Braamfontein, Midrand and Randburg. The service covers technical fixes, a Johannesburg-specific keyword map, published content, Google Business Profile work, and visibility inside ChatGPT, Perplexity and Google AI answers. From USD 150 per month, invoiced in ZAR.',
    districts: ['Sandton', 'Rosebank', 'Braamfontein', 'Midrand', 'Randburg'],
    marketReality:
      'Johannesburg is the most mature digital market in Africa and we should be honest about what that means: the SEO here is already good. Sandton in particular is served by established agencies with real budgets, and the cost per click on commercial terms reflects it. A cheap content programme aimed at head terms in this market will lose. What still works is specificity — the narrow commercial terms the big agencies deprioritise, and AI-answer visibility, where almost nobody in this market has done the structural work yet.',
    searchBehaviour:
      'Johannesburg buyers behave much like buyers in a European market: desktop and mobile both matter, comparison shopping is normal, reviews carry real weight, and the SERP is crowded with ads above the fold. The genuinely new behaviour is the same here as everywhere — buyers asking an assistant to shortlist before they search — but the local field has been slower to build for it than it has been to build for classic SEO.',
    sectors: [
      'Financial and professional services',
      'B2B technology and SaaS',
      'Specialist healthcare',
      'Logistics and industrial services',
      'Franchise and multi-location retail',
    ],
    competitiveNote:
      'This is the hardest market we work in, and the one where we are most likely to tell you to start at Foundation and prove the loop before spending more. If your budget is small and your terms are head commercial terms in Sandton, we will say so on the first call rather than take the money.',
    faq: [
      {
        q: 'How much does SEO cost in Johannesburg?',
        a: 'USD 150, 400 or 900 a month, invoiced in ZAR on request. That is below most Johannesburg agency retainers, which is possible because agents do the repetitive volume — not because anything is skipped.',
      },
      {
        q: 'Is Johannesburg harder to rank in than the rest of Africa?',
        a: 'Yes, clearly. It has the most established agency field, the highest commercial competition, and the most sophisticated buyers on the continent. We would rather set that expectation up front than discover it together in month four.',
      },
      {
        q: 'What is the realistic opportunity here then?',
        a: 'Two things. Narrow commercial terms the larger agencies deprioritise because the volume looks small, and AI-answer visibility, where very few South African sites have done the structured-data and answer-first work yet. The second is a genuine early-mover window and it will not stay open.',
      },
      {
        q: 'Do you work across South Africa or only Johannesburg?',
        a: 'We work nationally, but each metro deserves its own content rather than a page with the city name swapped out. Cape Town and Durban buyers search differently from Johannesburg buyers, and a page pretending otherwise ranks for none of them.',
      },
    ],
  },
  {
    slug: 'douala',
    name: 'Douala',
    country: 'Cameroon',
    currency: 'XAF',
    metaTitle: 'AI SEO Agency in Douala, Cameroon',
    metaDescription:
      'AI SEO and GEO for Douala businesses — Akwa, Bonanjo, Bonapriso and Bonabéri. Bilingual French and English search, in Central Africa’s least contested market. From $150/month, invoiced in XAF.',
    title: 'AI SEO in Douala, where almost nobody has done this work yet',
    heroBlurb:
      'Search visibility for Douala businesses across Akwa, Bonanjo, Bonapriso and Bonabéri — bilingual, and in the least contested market we operate in.',
    bluf: 'AfriShield AI provides AI SEO and generative engine optimisation for businesses in Douala, Cameroon — covering Akwa, Bonanjo, Bonapriso, Deido and Bonabéri. The service covers technical fixes, a bilingual French and English keyword map, published content, Google Business Profile work, and visibility inside ChatGPT, Perplexity and Google AI answers. From USD 150 per month, invoiced in XAF.',
    districts: ['Akwa', 'Bonanjo', 'Bonapriso', 'Deido', 'Bonabéri'],
    marketReality:
      'Douala is Cameroon’s economic capital and runs the largest port in Central Africa, serving Chad and the Central African Republic inland as well as Cameroon itself. It is also the least search-saturated market on this list by a wide margin. Most competitors here have no meaningful search presence at all — no structured data, no local pages, frequently no mobile-usable site. That makes it the cheapest place on the continent to become the obvious answer, and the window is open now in a way it is already closing in Lagos and Nairobi.',
    searchBehaviour:
      'Douala search is bilingual and that detail decides outcomes. A buyer may search “transitaire Douala” and “clearing agent Douala” for the same need, and a site that only covers one language gives away half the market. French-language commercial terms are especially thin on competition. This is also a market where AI assistants are increasingly the research step, because the conventional search results for many Cameroonian commercial queries are genuinely poor — which means an assistant has very little good material to cite, and whoever supplies it wins.',
    sectors: [
      'Freight forwarding, clearing and logistics',
      'Import, export and trading',
      'Professional and financial services',
      'Hospitality and business travel',
      'Construction and industrial suppliers',
    ],
    competitiveNote:
      'This is the least contested market we work in and the one where results typically arrive fastest — often inside six to ten weeks on commercial terms, because there is so little optimised competition to displace.',
    faq: [
      {
        q: 'Combien coûte le référencement à Douala ?',
        a: 'Les trois formules sont à USD 150, 400 ou 900 par mois, facturées en XAF si vous le souhaitez. Sans frais de mise en service, sans engagement de durée, avec un préavis de trente jours. Nous travaillons en français et en anglais.',
      },
      {
        q: 'Do you work in French as well as English?',
        a: 'Yes, and in this market it is not optional. Douala buyers search in both languages, often for the same thing, and covering only English concedes the larger half of the market. We build the keyword map bilingually rather than translating an English one after the fact.',
      },
      {
        q: 'Why is Douala easier than Lagos or Johannesburg?',
        a: 'Because very few competitors here have done any structural search work. Many Cameroonian commercial queries return results with no structured data, no direct answers and poor mobile pages. Displacing that is far less work than displacing an optimised competitor, which is why we usually expect faster movement here.',
      },
      {
        q: 'Can you help a freight or clearing business at the Port of Douala?',
        a: 'Yes, and it is one of the better fits here. Freight buyers research specific, high-intent terms — clearing agent, transit times, customs procedure — and almost nobody has written honest, well-structured content answering them. That is exactly the gap an answer engine needs filled, and it converts because the intent is commercial.',
      },
    ],
  },
];

export const getCity = (slug: string) => CITIES.find((city) => city.slug === slug);
