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
// The daylight Lagos skyline from the homepage hero (2026-11-04), cropped to
// 1200x630 so WhatsApp, LinkedIn and Facebook previews match the site.
export const DEFAULT_OG_IMAGE = '/images/og-home-lagos.jpg';

/** OG/Twitter image list for a post — its own image, or the site default. */
export function postOgImages(post: PostMeta) {
  return [{ url: post.image?.src ?? DEFAULT_OG_IMAGE }];
}

export const POSTS: PostMeta[] = [
  {
    slug: 'marketing-digital-clinique-cameroun',
    title:
      'Marketing digital pour une clinique au Cameroun : ce que la déontologie permet, et ce qui amène des patients',
    cardTitle: 'Marketing digital d’une clinique au Cameroun',
    metaTitle: 'Marketing digital : clinique au Cameroun',
    description:
      'Marketing digital pour clinique au Cameroun : ce que le Code de déontologie interdit, et ce qui remplit l’agenda : fiche Google, WhatsApp, avis, site.',
    lede:
      'Le décret n° 83-166 du 12 avril 1983 portant Code de déontologie des médecins du Cameroun interdit la publicité et la réclame sans but exclusivement scientifique ou éducatif. Le marketing digital d’une clinique à Douala ou à Yaoundé repose donc sur l’information : une fiche Google complète, un numéro WhatsApp qui répond, des avis demandés à chaque patient et une page par service.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-11-27',
    modified: '2026-11-27',
    readingMinutes: 10,
    primaryKeyword: 'marketing digital pour clinique au cameroun',
    image: {
      src: '/images/blog-marketing-digital-clinique-cameroun.webp',
      alt: 'Un médecin en chemise blanche parle à un patient en chemise bleue assis de l’autre côté d’un bureau, le brassard d’un tensiomètre au bras, dans un cabinet de consultation lumineux.',
    },
    linkedin: `« Docteur, on vous propose un pack croissance : publicité par pathologie, concours sur Instagram, une consultation offerte au gagnant. »

Si vous dirigez une clinique à Douala ou à Yaoundé, vous avez déjà reçu cette brochure. Elle est en FCFA. Elle a visiblement été écrite pour un autre pays.

Petit détail : au Cameroun, le Code de déontologie des médecins, décret n° 83-166 du 12 avril 1983, interdit tout procédé de publicité ou de réclame sans but exclusivement scientifique ou éducatif. Il fixe même la taille de la plaque sur la porte : 25 cm sur 30.

Le texte date de 1983. Il n'avait pas prévu Instagram. Mais il se transpose très bien : informer, oui. Vanter, non.

Et bonne nouvelle, informer est justement ce qui marche sur Google et dans ChatGPT.

Pensez à Google comme à un patient qui ne franchit jamais la porte. Il ne voit ni votre laboratoire ni vos médecins. Il lit ce qui est écrit sur vous, et il croit ce qu'il lit.

Ce qu'il lui faut, dans l'ordre :

Une fiche Google revendiquée, avec le repère sur la bonne entrée, les vrais horaires et le bon numéro.
Un WhatsApp au nom de la clinique, tenu par l'accueil. C'est votre vrai système de rendez-vous.
Un avis demandé à chaque patient après la consultation. À tous, sans cadeau, et sans jamais confirmer en public qu'une personne est patiente.
Une page par service sur votre site, qui explique au lieu de promettre.

Google l'écrit lui-même : aucun paiement ne fait monter dans le classement local.

Nous vendons de la visibilité, et nous venons d'expliquer comment faire les trois premières étapes gratuitement. Notre service commercial reste très digne.

Le guide complet, en français :

https://afrishieldai.com/blog/marketing-digital-clinique-cameroun

#Cameroun #Douala #Yaoundé #SantéPrivée #MarketingMédical

Gardez la brochure du pack croissance. Elle fait un excellent sous-main.`,
  },
  {
    slug: 'hotel-marketing-in-arusha',
    title: 'Hotel Marketing in Arusha: Getting Found on Google and AI',
    cardTitle: 'Hotel marketing in Arusha',
    metaTitle: 'Hotel Marketing in Arusha: Google and AI',
    description:
      'Hotel marketing in Arusha: what four live hotel searches show, why booking platforms win the broad ones, and how a lodge wins the narrow ones.',
    lede:
      'Four Arusha hotel searches were checked on 26 November 2026. The broad search returned one hotel website in ten results; a narrow search for lodges in Usa River returned four. This guide covers the three Arusha hotel markets, the role of safari operators in choosing first-night beds, what OTA commission pays for, and what AI assistants need before they name a hotel.',
    category: 'Local visibility',
    published: '2026-11-26',
    modified: '2026-11-26',
    readingMinutes: 10,
    primaryKeyword: 'hotel marketing in arusha',
    image: {
      src: '/images/blog-hotel-marketing-in-arusha.webp',
      alt: 'A man in khaki clothes stands outside a raised tented lodge room with a green corrugated roof, yellow flowers and forested hills behind, near Arusha, Tanzania.',
    },
    linkedin: `Every Arusha hotelier knows this booking. It arrives at eleven at night, through a platform, from a guest whose first WhatsApp message says: we found you on your Instagram, loved the verandas.

They did find you. Then they searched your name and clicked the first result. It was not your website.

Lovely verandas. Somebody else's commission.

On 26 November we ran four Arusha hotel searches and counted whose pages came back.

Best hotel in Arusha: one hotel website in ten results.
Hotel near Kilimanjaro airport: one.
Where to stay in Arusha before a safari: six of the ten were written by safari operators.
Lodge in Usa River Arusha: four lodges' own sites. The narrower the search, the more room for the property.

Think of the market in town. The stall with no sign still sells to its regulars. Everyone else buys from whoever wrote the price on a board.

The board, for a hotel or lodge:

Driving times to the airport, to town and to the park gate, written in text.
One page per room type, with a from-price in USD.
A page for safari operators: transfer times, late check-in, parking for the vehicle, a trade contact. On a safari package, they choose the bed.
A Google Business Profile with every field filled in.

We are a company that spent a Thursday counting search results so a hotel would not have to. Not our most glamorous Thursday.

The full guide, with the order of work:

https://afrishieldai.com/blog/hotel-marketing-in-arusha

#Arusha #Tanzania #HotelMarketing #DirectBookings #Hospitality

Keep the verandas. Just make sure the next guest who searches for them lands on your own page.`,
  },
  {
    slug: 'seo-for-safari-companies-in-tanzania',
    title: 'SEO for Safari Companies in Tanzania: What Our Arusha and Moshi Audits Found',
    cardTitle: 'SEO for safari companies in Tanzania',
    metaTitle: 'SEO for Safari Companies in Tanzania',
    description:
      'SEO for safari companies in Tanzania: why Arusha and Moshi operators rank for their name but not their trips, and the order of work that fixes it.',
    lede:
      'Three Tanzanian safari operators in Arusha and Moshi were audited between September and October 2026. All three ranked first on Google for their own name, and none reached page one for any of 20 commercial searches. This guide sets out which searches a Tanzanian operator can win, why the TALA licence belongs on the website, and the order of work.',
    category: 'Local visibility',
    published: '2026-11-24',
    modified: '2026-11-24',
    readingMinutes: 9,
    primaryKeyword: 'seo for safari companies in tanzania',
    image: {
      src: '/images/blog-seo-for-safari-companies-in-tanzania.webp',
      alt: 'Safari vehicles parked under a cloudy sky outside the green entrance gate of the Ngorongoro Conservation Area in Tanzania, with drivers and visitors standing nearby.',
    },
    linkedin: `Every Tanzanian safari operator has done this search. Your own company name, typed into Google, just to check.

Position one. The logo, the reviews, the map pin. Lovely. Somewhere in Arusha, a Land Cruiser gets washed in celebration.

Now search for what you actually sell, the way a stranger would. A six day Serengeti and Ngorongoro safari from Arusha. An eight day Lemosho climb, with a price.

We audited three operators in Arusha and Moshi this autumn. All three were first for their own name. Across 20 searches for the trips they sell, none of them reached page one. One operator with more than 2,500 TripAdvisor reviews did not appear once.

Think of your website as a shop with a beautiful window and no shelves. People who already know you walk in and ask. People walking past see the window, and nothing they can pick up.

The shelves are pages:

One page per itinerary, naming the parks, the days, the start point and a price in USD.
Your TALA licence number on the website. The regulations already put it on your office wall and on every vehicle. The one place a traveller abroad can see is the one place it is missing.
A page for every lodge and camp you own, so you stop paying commission on guests you are already driving around.
Specific searches, not Tanzania safari on its own. The directories own that phrase. Nobody owns your eight day Lemosho page yet.

We are an AI visibility company writing a 2,000 word article to tell people to write more pages. We are aware.

The full guide, with the order of work:

https://afrishieldai.com/blog/seo-for-safari-companies-in-tanzania

#Tanzania #SafariMarketing #Arusha #TourOperators #SEO

Keep washing the Land Cruisers. Just give the website something to show them off with.`,
  },
  {
    slug: 'ai-visibility-for-opticians-in-lagos',
    title:
      'AI Visibility for Opticians in Lagos: Getting Recommended by Google Maps and ChatGPT',
    cardTitle: 'AI visibility for opticians in Lagos',
    metaTitle: 'AI Visibility for Opticians in Lagos',
    description:
      'AI visibility for opticians in Lagos: the Google profile, HEFAMAA and ODORBN proof, and naira-priced service pages ChatGPT needs to name a clinic.',
    lede:
      'An optical centre in Lagos is recommended by Google and AI assistants when its Google Business Profile is verified and complete, its website states services and naira prices in text, and patients leave reviews steadily. Google ranks local results on relevance, distance and prominence. This guide covers what Lagos patients see today, the HEFAMAA and ODORBN registrations worth stating, and the order of work.',
    category: 'Local visibility',
    published: '2026-11-23',
    modified: '2026-11-23',
    readingMinutes: 9,
    primaryKeyword: 'ai visibility for opticians in lagos',
    image: {
      src: '/images/blog-ai-visibility-for-opticians-in-lagos.webp',
      alt: 'A smiling man in a beige sweater wears an optometrist’s trial frame while a clinician adjusts it from behind, with a slit lamp in the background of a bright examination room.',
    },
    linkedin: `"Do you have a website?"
"We have Instagram."

If you run an eye clinic in Lagos, you have had this conversation. Possibly with yourself.

Here is what happens next. A new patient in Surulere asks ChatGPT for a good optician nearby. It names a chain, a hospital on the Island and a clinic in Ikeja. Then it helpfully suggests checking that the clinic is properly registered.

Your certificates are framed behind the counter. Your prices live in a lovely carousel from February. To a machine, that carousel is a picture of a font.

Think of an AI assistant as a patient who will never walk into reception. It cannot see the slit lamp or the frame wall. It reads what is written about you, and it believes what it reads.

So write it down:

A verified Google Business Profile in the right category, with the same hours HEFAMAA already makes you display at the entrance.
One page per service on your own website, in text, with a starting price in naira.
One sentence saying the premises are registered with HEFAMAA and your optometrists with ODORBN. Two checkable proofs most competitors never mention.
A review request to every patient when they collect their glasses. Every patient, nothing in exchange.

On 23 November we read page one of Google for this topic from Nigeria. Clinics, an Instagram profile, the HEFAMAA registration page. Not one guide written for the clinic owner. That gap will not last.

We sell this work, and we have just explained the first three steps for free. Our sales team calls it a bold strategy. Quietly.

The full guide:

https://afrishieldai.com/blog/ai-visibility-for-opticians-in-lagos

#Lagos #Optometry #EyeCare #GoogleMaps #AIVisibility

Keep the Instagram. Just give it a website to point at.`,
  },
  {
    slug: 'visibilite-ia-coworking-yaounde',
    title:
      'Visibilité IA pour un espace de coworking à Yaoundé : être trouvé sur Google Maps et recommandé par ChatGPT',
    cardTitle: 'Visibilité IA d’un coworking à Yaoundé',
    metaTitle: 'Visibilité IA d’un coworking à Yaoundé',
    description:
      'Visibilité IA pour un espace de coworking à Yaoundé : la fiche Google, les prix publiés et les pages que ChatGPT doit lire pour recommander un espace.',
    lede:
      'Un espace de coworking à Yaoundé est recommandé par Google et par les assistants d’IA quand sa fiche d’établissement est validée et complète et que son site publie en texte ses formules et ses prix en FCFA. Google classe les résultats locaux selon la pertinence, la distance et la popularité. Ce guide explique ce que chaque type de client cherche, et dans quel ordre faire le travail.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-11-20',
    modified: '2026-11-20',
    readingMinutes: 9,
    primaryKeyword: 'visibilité ia pour espace de coworking à yaoundé',
    image: {
      src: '/images/blog-visibilite-ia-coworking-yaounde.webp',
      alt: 'Une jeune femme assise devant un ordinateur portable sur une petite table ronde, un collègue penché à côté d’elle, dans un espace de travail lumineux avec un comptoir de café en arrière-plan.',
    },
    linkedin: `« C'est combien la journée ? »

Si vous gérez un espace de coworking à Yaoundé, vous recevez ce message sur WhatsApp plusieurs fois par semaine. Et vous savez qu'il y en a d'autres qui ne vous arrivent jamais.

Parce que la personne qui l'aurait envoyé a d'abord tapé « coworking Bastos » sur Google, puis posé la question à ChatGPT depuis son hôtel. Elle a trouvé un réseau international, un annuaire mondial, et la page Facebook d'un voisin.

Nous avons regardé la première page de Google pour « espace de coworking Yaoundé » ce 20 novembre. Deux résultats sur dix affichaient un prix dans l'extrait. Les autres promettaient surtout des tarifs « abordables et flexibles ».

Google, c'est un client qui ne peut pas passer à l'accueil. Il ne voit ni votre groupe électrogène ni votre salle de réunion. Il lit ce qui est écrit sur vous, et il croit ce qu'il lit. ChatGPT aussi.

Ce qu'il leur faut :

Une fiche Google validée, avec le repère sur la bonne porte, les vrais horaires, l'attribut Wi-Fi et des photos des bureaux un jour de semaine.
Vos prix en FCFA écrits sur votre site, à l'heure, à la journée, au mois. Pas dans la fiche : Google y interdit les prix.
Une page de questions fréquentes : débit, électricité de secours, week-end, facture au nom de l'entreprise.
Un avis demandé à chaque membre après sa première semaine. À tous, sans cadeau, sans tri.

Google l'écrit lui-même : aucun paiement ne fait monter dans le classement local.

Nous vendons de la visibilité, et nous venons d'expliquer gratuitement comment faire les deux premières étapes. Notre service commercial a pris la nouvelle avec beaucoup de dignité.

Le guide complet, en français :

https://afrishieldai.com/blog/visibilite-ia-coworking-yaounde

#Yaoundé #Cameroun #Coworking #GoogleMaps #VisibilitéIA

Et la prochaine fois qu'on vous demandera « c'est combien la journée ? », la réponse sera déjà écrite sur le site.`,
  },
  {
    slug: 'visibilite-google-opticien-douala',
    title:
      'Visibilité Google pour un opticien à Douala : passer devant les annuaires, puis être cité par l’IA',
    cardTitle: 'Visibilité Google d’un opticien à Douala',
    metaTitle: 'Visibilité Google d’un opticien à Douala',
    description:
      'Visibilité Google pour un opticien à Douala : pourquoi les annuaires passent devant le cabinet, et ce que Google et ChatGPT demandent, dans l’ordre.',
    lede:
      'Un cabinet d’optique à Douala apparaît sur Google quand sa fiche d’établissement est validée et complète, qu’il reçoit des avis réguliers et que son site décrit chaque service. Google classe les résultats locaux selon la pertinence, la distance et la notoriété. Ce guide explique pourquoi les listes et les annuaires passent souvent devant les cabinets, et dans quel ordre corriger la situation.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-11-18',
    modified: '2026-11-18',
    readingMinutes: 9,
    primaryKeyword: 'visibilité google pour opticien à douala',
    image: {
      src: '/images/blog-visibilite-google-opticien-douala.webp',
      alt: 'Des montures de lunettes exposées sur un présentoir mural à l’entrée d’un magasin d’optique, le reste de la boutique flou en arrière-plan.',
    },
    linkedin: `« Bonjour, vous êtes bien l'opticien de Bonapriso ? »
« Non madame, ici c'est une quincaillerie. Le numéro a changé de propriétaire en 2021. »

Si votre cabinet d'optique apparaît dans un annuaire en ligne avec un ancien numéro, quelqu'un vient peut-être d'avoir cette conversation. Sans vous.

Cherchez « opticien Douala » sur Google. En haut, souvent : une liste d'opticiens en PDF, des annuaires, puis quelques cabinets. Pas forcément le vôtre, même avec le meilleur équipement du quartier.

Google ressemble à un patient qui ne peut pas entrer dans la boutique. Il ne voit ni votre salle d'examen ni votre mur de montures. Il lit ce qui est écrit sur vous, et il croit ce qu'il lit.

Ce qu'il lui faut, dans l'ordre :

Une fiche Google revendiquée et validée, dans la catégorie Opticien, avec le repère posé sur votre porte et les horaires que vous tenez vraiment.
Des avis demandés à chaque patient au retrait des lunettes, par WhatsApp. À tous, pas seulement aux plus contents : Google interdit de trier.
Une page par service sur votre site : examen de vue, verres progressifs, lentilles, lunettes pour enfants.
Votre inscription à l'Ordre National des Opticiens du Cameroun, écrite noir sur blanc. Le patient peut la vérifier, et c'est une phrase qu'un assistant d'IA peut reprendre.

Google l'écrit lui-même : aucun paiement ne fait monter dans le classement local.

Nous vendons du référencement, et une bonne moitié de ce guide se fait gratuitement en une semaine. Nous avons vérifié deux fois. C'était toujours gratuit.

Le guide complet, en français :

https://afrishieldai.com/blog/visibilite-google-opticien-douala

#Cameroun #Douala #Opticien #SantéVisuelle #GoogleMaps

Et pensez à mettre à jour ce numéro. La quincaillerie commence à connaître vos patients.`,
  },
  {
    slug: 'africa-safari-hotel-ai-visibility-index-2026',
    title:
      'Africa Safari & Hotel AI Visibility Index 2026: seven audits, four countries',
    cardTitle: 'Safari & Hotel AI Visibility Index 2026',
    metaTitle: 'Safari & Hotel AI Visibility Index 2026',
    description:
      'We audited 7 safari operators and hotels in 4 African countries. Five rank first for their own name. Five reach page one for nothing they sell.',
    lede:
      'Seven safari operators and hotels in Tanzania, Kenya, Uganda and South Africa were audited between 14 September and 14 October 2026. Five rank first on Google for their own name, and five reach page one for none of the trips or rooms they sell. The mean overall GEO score was 45 out of 100. Four publish an llms.txt file, and none of the four describes the business.',
    category: 'Original research',
    published: '2026-11-17',
    modified: '2026-11-17',
    readingMinutes: 10,
    primaryKeyword: 'safari and hotel ai visibility index africa',
    image: {
      src: '/images/blog-africa-safari-hotel-ai-visibility-index-2026.webp',
      alt: 'A safari vehicle drives towards the camera along a dusty track through dry Tanzanian savannah, acacia trees on either side.',
    },
    linkedin: `Search for your own safari company on Google. There you are, position one. Lovely.

Now ask an assistant for a five day Serengeti safari with a good local operator, and do not mention your name.

That second search is the one a new customer makes. We ran both kinds across seven safari operators and hotels in Tanzania, Kenya, Uganda and South Africa.

Five of the seven rank first for their own name.
Five of the seven reach page one for none of the trips or rooms they actually sell.
The operator with more than 2,500 TripAdvisor reviews reached page one for zero of eight commercial searches.
Four publish an llms.txt file for AI assistants. One of them is 34 words long and none of the four says who the business is.

It is a bit like having the best table in the restaurant and no sign on the street. The regulars are very happy. Nobody else knows there is a restaurant.

We should admit that seven businesses is a pilot and not a census. We called it an Index anyway, because Pilot Spreadsheet did not have the same ring.

The anonymised dataset is public, and the scores are exact.

https://afrishieldai.com/blog/africa-safari-hotel-ai-visibility-index-2026

#SafariMarketing #HotelMarketing #GEO #AfricaTourism #AISearch

If you run a lodge and you are position one for your own name, congratulations. The regulars found the table.`,
  },
  {
    slug: 'creer-sa-fiche-etablissement-google-au-cameroun',
    title:
      'Créer sa fiche d’établissement Google au Cameroun : revendiquer, créer et valider',
    cardTitle: 'Créer sa fiche Google au Cameroun',
    metaTitle: 'Fiche d’établissement Google au Cameroun',
    description:
      'Créer sa fiche d’établissement Google au Cameroun pour 0 FCFA : revendiquer ou créer la fiche, adresse sans numéro de rue, nom bilingue et validation.',
    lede:
      'Une entreprise camerounaise apparaît sur Google Maps quand elle possède une fiche d’établissement Google validée. Ce guide explique quel compte doit en être propriétaire, comment revendiquer une fiche créée par quelqu’un d’autre, comment saisir une adresse sans numéro de rue, pourquoi le nom doit tenir dans une seule langue, et ce que la validation demande, selon les règles publiées par Google.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-11-16',
    modified: '2026-11-16',
    readingMinutes: 9,
    primaryKeyword: 'créer sa fiche d’établissement google au cameroun',
    image: {
      src: '/images/blog-creer-sa-fiche-etablissement-google-au-cameroun.webp',
      alt: 'Un homme vu de dos roule à moto dans une rue de Douala, avec des sacs et un bidon accrochés de chaque côté.',
    },
    linkedin: `« Madame, je suis devant la pharmacie. Mais quelle pharmacie ? »

Si vous avez déjà guidé un moto-taxi au téléphone jusqu'à votre boutique, carrefour par carrefour, vous connaissez ce moment.

Vous ouvrez Google Maps pour lui envoyer la position. Votre boutique y est. Plus ou moins.
Ajoutée il y a deux ans par quelqu'un que vous ne connaissez pas, avec le repère de l'autre côté du carrefour et des horaires que vous n'avez jamais tenus.

Vous pouvez la voir. Vous ne pouvez rien y changer.

Une fiche Google que vous ne possédez pas, c'est un titre foncier rangé chez un cousin. Tout le monde sait à qui appartient le terrain. Personne n'a le papier.

Récupérer le papier est gratuit, et tient en un après-midi :

Cherchez d'abord la boutique sur Maps. Si la fiche existe, revendiquez-la au lieu d'en créer une deuxième. Google veut une seule fiche par établissement.
Si quelqu'un d'autre l'a validée, utilisez Demander l'accès. Le propriétaire actuel a trois jours pour répondre.
Pas de numéro de rue ? Google permet de placer le repère directement sur la carte. Posez-le sur la porte, pas sur le carrefour.
Le nom tient dans une seule langue. Google interdit de répéter le même nom en français et en anglais, même si l'enseigne le fait.
L'examen de validation prend jusqu'à cinq jours ouvrés, et c'est Google qui choisit la méthode.

Coût : 0 FCFA. Google l'écrit noir sur blanc. Si un démarcheur vous propose de « vous inscrire sur Google » contre paiement, il vous vend un formulaire gratuit.

Nous vendons du référencement, et nous venons de publier un guide complet pour se passer de nous à cette étape. Notre service commercial a été prévenu. Il fait bonne figure.

Le guide complet, en français, avec les règles d'adresse camerounaises :

https://afrishieldai.com/blog/creer-sa-fiche-etablissement-google-au-cameroun

#Cameroun #Douala #GoogleMaps #PME #RéférencementLocal

La prochaine fois, le moto-taxi saura de quelle pharmacie il s'agit.`,
  },
  {
    slug: 'how-to-put-your-business-on-google-maps-in-nigeria',
    title:
      'How to put your business on Google Maps in Nigeria: claim, create and verify it',
    cardTitle: 'How to put your business on Google Maps in Nigeria',
    metaTitle: 'Put Your Business on Google Maps: Nigeria',
    description:
      'How to put your business on Google Maps in Nigeria for ₦0: claim or create the profile, pin an address with no street number, and get verified.',
    lede:
      'A Nigerian business gets onto Google Maps by owning a verified Google Business Profile. This guide covers which Google account should own it, how to claim a listing someone else added, how to request access from a current owner, how to enter an address with no street number, what verification involves and how long it takes, using the rules Google publishes.',
    category: 'Local visibility',
    published: '2026-11-13',
    modified: '2026-11-13',
    readingMinutes: 9,
    primaryKeyword: 'how to put your business on google maps in nigeria',
    image: {
      src: '/images/blog-how-to-put-your-business-on-google-maps-in-nigeria.webp',
      alt: 'A man in a blue kaftan and embroidered cap sits outside a building looking at his phone, beside a To Let sign offering one and two rooms.',
    },
    linkedin: `A customer asks for your Google Maps location so her driver can pick up an order.

You search. You are there. Sort of.
Pinned on the wrong side of the road, with opening hours you have never kept, added two years ago by somebody you have never met.

You can see it. You cannot change any of it.

A Google Maps listing you do not own is like a shop key held by a cousin who moved to Abuja. Everyone agrees it belongs to you. Nobody can open the door.

Getting the key back is free, and most of it fits in an afternoon:

Search Maps first. If the listing exists, claim it instead of creating a second one. Google wants one profile per business.
If someone else verified it, use Request access. Google gives the current owner 3 days to respond.
No street number? Google lets you pin the location directly on the map. Put the pin on the entrance, not the road.
Use a Google account the business controls, then add a second owner or manager so the profile never lives in one phone again.
Verification reviews take up to 5 business days, and Google decides which method you get.

It costs ₦0. Google says so in writing. If someone on WhatsApp offers to register you on Google for a fee, they are selling a free form with a delivery charge.

We sell SEO, and we have just published a full guide on skipping us for this step. Our accountant has been told and is being very brave about it.

The full step by step guide, with the Nigerian address rules:

https://afrishieldai.com/blog/how-to-put-your-business-on-google-maps-in-nigeria

#GoogleMaps #Nigeria #SmallBusiness #LocalSEO #GoogleBusinessProfile

Get the key back from your cousin. He has had it long enough.`,
  },
  {
    slug: 'seo-company-in-kenya',
    title:
      'SEO company in Kenya: how to verify one before you sign, in six checks',
    cardTitle: 'How to verify an SEO company in Kenya',
    metaTitle: 'SEO Company in Kenya: How to Verify One',
    description:
      'How to verify an SEO company in Kenya before paying: BRS and KRA PIN checks, ODPC registration, results you can test, and accounts to keep in your name.',
    lede:
      'An SEO company in Kenya can be checked in an afternoon, mostly for free. This guide covers who holds page one for the term, what the Clutch Kenya list does and does not show, how to confirm registration through BRS on eCitizen, how to check a KRA PIN on iTax, when ODPC registration applies, and which accounts must stay in your name.',
    category: 'Guide',
    published: '2026-11-12',
    modified: '2026-11-12',
    readingMinutes: 9,
    primaryKeyword: 'seo company in kenya',
    image: {
      src: '/images/blog-seo-company-in-kenya.webp',
      alt: 'A young man in a dark blazer reads through a stack of papers at a white table, pen in hand, with a glass water bottle in front of him.',
    },
    linkedin: `The contract says one company name.
The invoice says another.
The bank account says a third.

Every Kenyan business owner who has hired a supplier in a hurry knows this moment. It usually arrives when the accountant asks a polite question at year end.

Hiring an SEO company in Kenya without checking it is like buying a used car for its paint job. Nobody sensible skips the logbook.

The logbook checks for an SEO company are short, and most of them are free:

Run a BRS official search on eCitizen. For a limited company, the CR12 confirms it exists and lists the directors.
Check the KRA PIN on the free iTax PIN Checker. The name should match the invoice and the status should be active.
Ask about ODPC registration. The exemption only applies below KES 5 million turnover AND under 10 employees, and direct marketing must register regardless of size.
Ask for two Kenyan client sites and run their searches yourself, on your own phone.
Put in the contract that your domain, analytics and Google Business Profile stay in your name.

One more thing we found: on the Clutch list of SEO companies in Kenya, six of the first ten positions were sponsored entries for firms serving Kenya, not based in it. Clutch says so openly. It is still worth knowing before you call it a ranking.

In the interest of fairness, we are an SEO company too, so we have just published a checklist for vetting us. Our sales team described this as a bold strategy. Our sales team is also us.

The full guide, with a table of all six checks:

https://afrishieldai.com/blog/seo-company-in-kenya

#Kenya #Nairobi #SEO #SME #DueDiligence

Check the logbook before the paint. The paint can wait.`,
  },
  {
    slug: 'marketing-agencies-in-nairobi',
    title:
      'Marketing agencies in Nairobi: the seven types, and which one your business actually needs',
    cardTitle: 'Marketing agencies in Nairobi, sorted by type',
    metaTitle: 'Marketing Agencies in Nairobi: 7 Types',
    description:
      'Marketing agencies in Nairobi sorted into seven types, what each one does, which Kenyan businesses need which, and how to shortlist one.',
    lede:
      'Marketing agencies in Nairobi range from full-service firms running radio and outdoor campaigns to small studios that only post on social media. This guide sorts them into seven types, shows which job each type does, sets out where Kenyan customers can be reached in 2026, and explains how to shortlist an agency and which accounts must stay in your name.',
    category: 'Comparison',
    published: '2026-11-09',
    modified: '2026-11-09',
    readingMinutes: 9,
    primaryKeyword: 'marketing agencies in nairobi',
    image: {
      src: '/images/blog-marketing-agencies-in-nairobi.webp',
      alt: 'A woman in an orange suit writes on a whiteboard covered in charts and sticky notes while four colleagues watch from a meeting table with laptops and glasses of water.',
    },
    linkedin: `Three marketing agencies pitch a physiotherapy clinic in Kilimani.

The first proposes a weekend activation at a Westlands mall. Tents, branding, a DJ.
The second proposes twenty Instagram posts a month and two influencers.
The third proposes all of that, plus radio, plus a jingle.

Nobody asks the only question that matters: how do your patients find you now?

Most of them type "physiotherapist near me" into Google.

Choosing a marketing agency by the label is like choosing a doctor because the sign says "Medical". A surgeon, a dentist and a physiotherapist all qualify. Your back only needs one of them.

Marketing agencies in Nairobi come in roughly seven types: full-service, digital, paid media, social and content, SEO and GEO, branding, and PR or events. Same title, very different jobs.

The question that sorts them: do your customers search for you, or discover you while scrolling? Clinics, law firms, schools and safari operators are searched for. Fashion, food and events are discovered.

Some Kenyan numbers from DataReportal's Digital 2026 report, based on each platform's own ad tools:

TikTok ad reach equals 78.5 percent of internet users.
Facebook reaches 17.0 million.
LinkedIn has 6.30 million members.
Instagram reaches 3.95 million, fewer than LinkedIn.

And whichever agency you hire, the pages, ad accounts, domain and Google Business Profile stay in your name. The agency gets access, not ownership.

In fairness, we are one of the seven types: search and AI visibility only. We do not post on Instagram, shoot video or write jingles, and we wrote that into the article before anyone could ask. Our marketing department reviewed it and said it was very honest. Our marketing department is also us.

The full guide, with a table of all seven types and a six-step shortlist:

https://afrishieldai.com/blog/marketing-agencies-in-nairobi

#Nairobi #Kenya #Marketing #SME #SEO

The DJ was very good, by all accounts. The patients still arrived through Google.`,
  },
  {
    slug: 'agence-marketing-digital-douala',
    title:
      'Agence marketing digital à Douala : agence complète ou spécialiste, et comment vérifier l’offre',
    cardTitle: 'Agence marketing digital à Douala, le guide',
    metaTitle: 'Agence marketing digital à Douala',
    description:
      'Agence marketing digital à Douala : quand prendre une agence complète, quand un spécialiste SEO suffit, quels comptes garder et quoi payer.',
    lede:
      'Une agence de marketing digital gère plusieurs canaux à la fois : site, réseaux sociaux, publicité Facebook et Google, contenu. Ce guide explique quand une entreprise de Douala a besoin d’une agence complète et quand un spécialiste du référencement suffit, quels comptes doivent rester à son nom, et pourquoi honoraires et budget publicitaire doivent être séparés.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-11-06',
    modified: '2026-11-06',
    readingMinutes: 9,
    primaryKeyword: 'agence marketing digital douala',
    image: {
      src: '/images/blog-agence-marketing-digital-douala.webp',
      alt: 'Quatre femmes dans un bureau, trois debout et souriantes autour d’une collègue assise devant un ordinateur portable, avec des étagères de livres en arrière-plan.',
    },
    linkedin: `Vingt publications par mois. Des milliers de vues. Des centaines de « j'aime ».

Et quand on tape « meubles Douala » sur Google, le showroom n'apparaît nulle part.

Si vous dirigez une entreprise à Douala, ce rapport mensuel vous dit peut-être quelque chose.

Choisir entre une agence de marketing digital complète et un spécialiste, c'est comme choisir entre un médecin généraliste et un dentiste. Le généraliste voit tout le corps. Pour une rage de dents, on va quand même chez le dentiste.

La question qui tranche : vos clients vous cherchent-ils, ou vous découvrent-ils ?

Une clinique, un transitaire, un cabinet comptable sont cherchés sur Google. Commencez par le référencement et la fiche Google.

Une pâtisserie, une marque de mode, un événement sont découverts dans le fil. Commencez par les réseaux sociaux et la publicité.

Un repère chiffré, tiré du rapport Digital 2026 de DataReportal, d'après les outils publicitaires des plateformes fin 2025 : au Cameroun, la publicité Facebook atteint 5,90 millions de personnes. Instagram, 611 000. Environ un dixième.

Et dans tous les cas, la page Facebook, le compte publicitaire, le nom de domaine et la fiche Google restent au nom de l'entreprise. L'agence reçoit un accès partenaire, pas la propriété. Les honoraires et le budget publicitaire sont deux lignes séparées sur la facture.

Précision honnête : nous sommes un spécialiste du référencement, pas une agence complète. Nous ne gérons pas vos publications Instagram, et nous l'avons écrit dans l'article avant que quiconque ne le demande. Il paraît que c'est une forme de publicité.

Le guide complet, en français : le tableau « quelle entreprise a besoin de quoi », les comptes à garder, les six questions à poser avant de signer.

https://afrishieldai.com/blog/agence-marketing-digital-douala

#Douala #Cameroun #MarketingDigital #PME #SEO

Les « j'aime » font plaisir. Les appels paient le loyer.`,
  },
  {
    slug: 'digital-marketing-vs-seo-for-nigerian-businesses',
    title: 'Digital marketing vs SEO for Nigerian businesses: which channel does which job',
    cardTitle: 'Digital marketing vs SEO for Nigerian businesses',
    metaTitle: 'Digital Marketing vs SEO in Nigeria',
    description:
      'Digital marketing vs SEO for Nigerian businesses: SEO is one channel inside digital marketing. Which channel suits which business, and in what order.',
    lede:
      'SEO is one channel within digital marketing, so the real choice for a Nigerian business is which digital channel to put first. This guide compares SEO, Google Ads, paid and organic social media, and WhatsApp, shows each platform’s 2026 advertising reach in Nigeria, and sets out which kinds of business should lead with search and which with social media.',
    category: 'Money',
    published: '2026-11-05',
    modified: '2026-11-05',
    readingMinutes: 9,
    primaryKeyword: 'digital marketing vs seo for nigerian businesses',
    image: {
      src: '/images/blog-digital-marketing-vs-seo-for-nigerian-businesses.webp',
      alt: 'A man in a suit on a phone call leans over his desk and laptop, with a written plan for the day on the whiteboard behind him.',
    },
    linkedin: `Every Nigerian business owner has received this proposal. "360-degree digital marketing." Twenty Instagram posts a month. The word synergy, twice, on page one.

Then a second agency sends an SEO proposal and the question begins: digital marketing or SEO?

It is the wrong question. SEO is part of digital marketing. Asking which is better is like asking whether Balogun Market is better than the tomato stall inside it. The market has more things. The stall may have the one thing you came for.

The question that actually decides it: do your customers search for you, or do they scroll past you?

A clinic, school, law firm or haulage company is searched for. Nobody discovers they need a haulage company on TikTok. They need one on a Wednesday and they Google it. Lead with SEO.

A cake shop, a fashion label or an event is discovered. Nobody searches for a cake design they have not seen yet. Lead with social media.

Some numbers worth knowing, from DataReportal's Digital 2026 Nigeria report, based on each platform's own ad tools:

TikTok ad reach: 47.8 million adults.
Facebook: 38.0 million.
YouTube: 30.5 million.
Instagram: 10.0 million, about a quarter of Facebook.

So if your entire plan is Instagram, you are talking to a smaller room than you think.

Whichever you lead with, complete your Google Business Profile. It is free, and the person who saw your TikTok will search your name before ordering.

We sell SEO, so telling some of you to start with TikTok is a little like a baker recommending the bread from the shop next door. It is still the right advice.

The full guide, with a channel-by-channel table and a sensible order for a small budget:

https://afrishieldai.com/blog/digital-marketing-vs-seo-for-nigerian-businesses

#Nigeria #DigitalMarketing #SEO #SmallBusiness #Lagos

The twenty Instagram posts can wait. The synergy can wait longer.`,
  },
  {
    slug: 'best-seo-agency-in-nigeria',
    title: 'The best SEO agency in Nigeria: how to judge the claim, and who suits which business',
    cardTitle: 'How to find the best SEO agency in Nigeria',
    metaTitle: 'Best SEO Agency in Nigeria: How to Judge',
    description:
      'Best SEO agency in Nigeria? The top 10 results hold six self-declared number ones, two self-ranked lists and two directories. How to judge them.',
    lede:
      'There is no independent ranking of SEO agencies in Nigeria, so the best agency is the one whose past work matches your business, whose own site ranks for what it sells and whose registration you can confirm with the Corporate Affairs Commission. This guide sorts the first page of results by type, explains how directory order works and sets out five checks.',
    category: 'Money',
    published: '2026-11-04',
    modified: '2026-11-04',
    readingMinutes: 9,
    primaryKeyword: 'best seo agency in nigeria',
    image: {
      src: '/images/blog-best-seo-agency-in-nigeria.webp',
      alt: 'Three colleagues in a Lagos office looking at a laptop together while one points at the screen.',
    },
    linkedin: `Search "best SEO agency in Nigeria" and count the number ones. We got to six before page one ran out.

Nigeria has many fine things in great supply. Number one SEO agencies may now lead the table.

We sorted the top 10 results from a Nigerian location on 4 November:

6 were agencies calling themselves the best, the number one or the leading SEO company in Nigeria.
2 were "best agencies" lists, each written by an agency on the list.
2 were directories, and Clutch says its default order puts sponsored firms first.

Choosing an agency by its own adjective is like choosing a restaurant because the signboard says best food in Lagos. Every signboard says that. Look at who is eating there.

What actually separates them, in four checks:

1. Search the service the agency sells, from your own city, on a phone. Does its own site appear?
2. Look it up on the Corporate Affairs Commission public search. Two minutes, and the registered name should match the invoice.
3. Read the directory reviews, not the position. On Clutch's Nigeria list, 27 of 28 firms showing a review count had five or fewer.
4. Ask whether rankings are guaranteed. Google says no one can guarantee a number one ranking. The correct answer is no.

In the interest of fairness, AfriShield does not appear on that first page at all. We noticed. Our sales team noticed louder.

The full guide, with which kind of agency suits which Nigerian business and the naira ranges:

https://afrishieldai.com/blog/best-seo-agency-in-nigeria

#Nigeria #SEO #Lagos #SmallBusiness #DigitalMarketing

Six number ones, and one of them might even be the right one for you. Check who is eating there.`,
  },
  {
    slug: 'why-is-my-business-not-showing-on-google-maps-nigeria',
    title: 'Why is my business not showing on Google Maps in Nigeria? A diagnosis by symptom',
    cardTitle: 'Why your business is not on Google Maps',
    metaTitle: 'Business Not Showing on Google Maps: Nigeria',
    description:
      'Business not showing on Google Maps in Nigeria? Diagnose it by symptom: missing, unverified, suspended, not ranking or wrong pin, and fix each one.',
    lede:
      'A business is not showing on Google Maps in Nigeria because its Business Profile is missing, unverified, suspended, ranking below nearer competitors or pinned in the wrong place. This guide sorts the problem by symptom, starting with one search for the exact business name, and sets out the fix for each case using the rules Google publishes.',
    category: 'Local visibility',
    published: '2026-11-02',
    modified: '2026-11-02',
    readingMinutes: 9,
    primaryKeyword: 'why is my business not showing on google maps nigeria',
    image: {
      src: '/images/blog-why-is-my-business-not-showing-on-google-maps-nigeria.webp',
      alt: 'A crowded street market in Lagos, Nigeria, with yellow tricycles, vendors under umbrellas and shop signboards.',
    },
    linkedin: `Search your own business name on Google Maps. Go on. We will wait.

If you found a florist two streets over, a dry cleaner and a tailor in another city, but not you, you are in good company. It is almost never the work that is wrong.

Think of an unverified Google profile as a shop with a signboard and no key. The sign is up. Nobody can walk in. Google says a profile must be verified before it shows on Search and Maps, and a website does not count as verification.

Where that one search leaves you decides the fix:

1. Nothing found: the profile is missing, unverified or suspended. If suspended, appeal. Do not start a new profile, Google says so in writing.
2. Found by name only: the profile is live and losing on category, reviews or distance.
3. Wrong place: move the pin by hand and claim the duplicate instead of making a third.

Google also says there is no way to pay for a better local ranking. We sell SEO and are telling you that most of this is a free twenty minute checklist, so please do not mention it to our sales team.

The full diagnosis, step by step:

https://afrishieldai.com/blog/why-is-my-business-not-showing-on-google-maps-nigeria

#GoogleMaps #LocalSEO #Nigeria #SmallBusiness #GoogleBusinessProfile

Go and search. The florist is lovely, but she is not who your customers came for.`,
  },
  {
    slug: 'seo-company-accra-ghana',
    title: 'How to choose an SEO company in Accra, Ghana: cedi prices and four checks',
    cardTitle: 'How to choose an SEO company in Accra',
    metaTitle: 'SEO Company in Accra, Ghana: How to Choose',
    description:
      'How to choose an SEO company in Accra, Ghana: the cedi prices agencies publish, the 20% VAT and levy line, and four checks you can run in an afternoon.',
    lede:
      'The right SEO company in Accra, Ghana publishes its price in cedis, names the people who write and fix, gives you ownership of your Google accounts and promises work rather than a ranking. Ghanaian agencies publish retainers from about GHS 1,500 to GHS 18,000 and above a month in 2026, with VAT and levies of about 20 percent added where the company is registered.',
    category: 'Money',
    published: '2026-10-30',
    modified: '2026-10-30',
    readingMinutes: 9,
    primaryKeyword: 'seo company accra ghana',
    image: {
      src: '/images/blog-seo-company-accra-ghana.webp',
      alt: 'People walking together along a busy street in Accra, Ghana, with market stalls and buildings behind them.',
    },
    linkedin: `You type "SEO company Accra" into Google and every result is number one.

This is statistically remarkable. It is also how a lot of Accra business owners start their search, and how a lot of them end up choosing on confidence instead of evidence.

Hiring an SEO company because it says it is number one is like hiring a mechanic whose own car is up on bricks. Sure, the sign is nice. Now look at the car.

Here is what actually separates the companies:

Ghanaian agencies publish retainers from about GHS 1,500 to GHS 18,000 and above a month. The gap is scope, not size. A GHS 1,500 retainer that also promises four articles, technical work and reporting deserves a question.

A VAT-registered company adds 15 percent VAT, 2.5 percent NHIL and 2.5 percent GETFund levy. That is about 20 percent. A GHS 5,000 quote lands closer to GHS 6,000 on the invoice.

A directory list of nine Ghanaian SEO companies had reviews on three of them. Six had none. A profile is not a result.

So run four checks. Search for the thing the company says it is best at. Convert the quote to cedis with tax. Divide the fee by the pages it publishes. Ask for two named references and a sample report.

We sell SEO in Accra ourselves, so every check on that list applies to us as well, and we would rather you ran them.

The full guide, with the price table, the tax line, and when an Accra business should not hire anyone yet:

https://afrishieldai.com/blog/seo-company-accra-ghana

#Accra #Ghana #SEO #SmallBusiness #DigitalMarketing

Check the car before you admire the sign.`,
  },
  {
    slug: 'how-to-check-if-chatgpt-recommends-your-business-in-africa',
    title:
      'How to check if ChatGPT recommends your business in Africa: a clean, repeatable test',
    cardTitle: 'How to check if ChatGPT recommends your business',
    metaTitle: 'Does ChatGPT Recommend Your Business?',
    description:
      'A repeatable test for African businesses: clean sessions, location, local-language prompts, three runs per question, and what each result means.',
    lede:
      'To check whether ChatGPT recommends a business in Africa, ask it the questions customers ask, naming the city, in a clean session that is logged out or unpersonalized, with web search on. Ask each question three times, record who is named and which sources are cited, and repeat in Perplexity and Gemini. The share of answers naming the business is the result.',
    category: 'AI answers',
    published: '2026-10-29',
    modified: '2026-10-29',
    readingMinutes: 9,
    primaryKeyword: 'how to check if chatgpt recommends your business in africa',
    image: {
      src: '/images/blog-how-to-check-if-chatgpt-recommends-your-business-in-africa.webp',
      alt: 'A woman in a white shirt and glasses reads her phone beside a tall office window overlooking a red and orange building.',
    },
    linkedin: `You asked ChatGPT for the best clinic in your area. It named yours first. You screenshotted it and sent it to the family WhatsApp group.

Eleven thumbs-up. One uncle asking whether ChatGPT is a new bank.

Then your niece asked the same question on her phone and got three other clinics.

Nothing was broken. You asked once, logged in, to an assistant that has spent months helping you write your clinic newsletter. It knew whose clinic you were hoping to see.

Checking whether ChatGPT recommends you from your own account is like asking your mother whether your cooking is good. Warm, consistent, and of limited commercial use.

A test that actually tells you something:

Use ChatGPT logged out, or a temporary chat set to Unpersonalized, with Search on.

Name the place in every question. "Near me" only tests where you are standing. ChatGPT estimates your location from your IP address.

Ask each question three times. The same question can name you on one run and skip you on the next.

Open the sources. If it keeps citing the same two directories, your listing on those two directories is the fix.

Your score is the share of answers that name you. Four out of thirty is a real number. One screenshot is not.

For balance: when we ran this on ourselves in August, AfriShield was named in none of the four African regions we tested. We now run it every month, from a clean session.

The full test, with the ten-question method and what each result means:

https://afrishieldai.com/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa

#AISearch #ChatGPT #SmallBusiness #Nigeria #Kenya

Keep the screenshot. Just send it to the family group after the third run.`,
  },
  {
    slug: 'how-to-get-a-safari-company-recommended-by-ai',
    title: 'How to get a safari company recommended by AI: a guide for Kenyan operators',
    cardTitle: 'How to get a safari company recommended by AI',
    metaTitle: 'Get Your Safari Company Recommended by AI',
    description:
      'How Kenyan safari operators get named by ChatGPT, Perplexity and Gemini: licences, itinerary pages, detailed reviews, crawler access and monthly tests.',
    lede:
      'A safari company gets recommended by AI assistants when it is the easiest operator to verify. For a Kenyan operator that means publishing its TRA licence and KATO membership, giving each itinerary its own page with parks, days and an itemised price, collecting detailed reviews, allowing AI search crawlers, and testing the assistants monthly. This guide covers each step.',
    category: 'AI answers',
    published: '2026-10-26',
    modified: '2026-10-26',
    readingMinutes: 9,
    primaryKeyword: 'how to get a safari company recommended by ai',
    image: {
      src: '/images/blog-how-to-get-a-safari-company-recommended-by-ai.webp',
      alt: 'A lioness stands in the long grass of the Maasai Mara beside an open safari vehicle, its driver smiling behind the wheel.',
    },
    linkedin: `A family in Munich asks ChatGPT for a reliable safari company for the Maasai Mara.

It names three. One of them is not a company at all. It is a "top 15 operators" list written on another continent.

Meanwhile the homepage of a perfectly good operator in Karen describes its trips as "unforgettable" four times, and never once says which parks, how many days, or that the company is licensed.

An AI assistant choosing a safari company works like a friend vouching for a mechanic. The friend does not care how shiny the sign is. They want to see the licence on the wall, hear from people who had good work done, and read a price list that makes sense.

What that means for a Kenyan operator:

Publish your TRA licence number, KATO listing and your guides' KPSGA levels as plain sentences, not footer logos.

Give every itinerary its own page: parks, days, season and an itemised price.

Ask guests for reviews that name the park, the guide and the trip length. That is what an assistant can repeat.

Read your robots.txt. OpenAI says sites that block OAI-SearchBot are not shown in ChatGPT search answers.

In fairness to everyone, when we checked our own AI visibility in August, AfriShield came up in none of the four African regions we tested. We are working through the same list.

The full guide, including a ten-question monthly test you can run for free:

https://afrishieldai.com/blog/how-to-get-a-safari-company-recommended-by-ai

#Kenya #Safari #TourOperators #AISearch #TravelMarketing

Keep one "unforgettable" if you must. Just put the licence number next to it.`,
  },
  {
    slug: 'seo-agency-nairobi-cost',
    title: 'How much does an SEO agency in Nairobi cost? Real KES prices for 2026',
    cardTitle: 'What an SEO agency in Nairobi costs, in KES',
    metaTitle: 'SEO Agency Nairobi Cost: KES Prices (2026)',
    description:
      'What Nairobi SEO agencies charge in 2026, in shillings: published package prices, what each band buys, the 16% VAT line and how to compare quotes.',
    lede:
      'An SEO agency in Nairobi typically costs between KES 40,000 and KES 250,000 a month in 2026, and a review of 56 published Kenyan packages found an average of KSh 82,570. This guide sets out the shilling price bands, what each one buys, how VAT changes a quote, how to compare two quotes by what they publish, and when not to hire yet.',
    category: 'Money',
    published: '2026-10-23',
    modified: '2026-10-23',
    readingMinutes: 9,
    primaryKeyword: 'seo agency nairobi cost',
    image: {
      src: '/images/blog-seo-agency-nairobi-cost.webp',
      alt: 'The Nairobi city skyline seen across Uhuru Park under a cloudy sky, with office towers behind the trees.',
    },
    linkedin: `Three SEO quotes land in the same Nairobi inbox.

The first promises 30 keywords for KES 12,000 a month.
The second promises four articles a month for KES 95,000.
The third arrives from abroad, priced in dollars, with a slide about the Nairobi skyline. Just in case.

If you run a business in Westlands, Kilimani or off Mombasa Road, you have probably received at least one of these.

Comparing SEO packages by keyword count is like comparing restaurants by the length of the menu. A long menu tells you what the kitchen is willing to write down. It does not tell you what comes out of it.

What actually separates Nairobi quotes:

Published Kenyan packages run from about KES 8,000 to well past KES 250,000 a month. One review of 56 of them put the average at KSh 82,570.

Divide each monthly fee by the number of pages it actually publishes. One package offers eight blog posts for KES 25,000, which leaves about KES 3,100 per post before anything else is paid for.

Ask whether the price includes 16 percent VAT. Two quotes KES 10,000 apart can be level once one of them adds it.

And walk away from guaranteed rankings. Google says plainly that no one can guarantee a number one position.

We sell SEO in Nairobi ourselves, so we put our own prices through the same division before publishing. They survived. The spreadsheet looked at us for a while first.

The full guide, in shillings: the price bands, what each one buys, the VAT line, and when a Nairobi business should not hire an agency yet.

https://afrishieldai.com/blog/seo-agency-nairobi-cost

#Nairobi #Kenya #SEO #SmallBusiness #DigitalMarketing

Frame the skyline slide if you like. Then ask how many pages it publishes.`,
  },
  {
    slug: 'agence-seo-cameroun',
    title:
      'Agence SEO au Cameroun : comment choisir, quoi exiger et ce que cela coûte vraiment',
    cardTitle: 'Agence SEO au Cameroun, comment choisir',
    metaTitle: 'Agence SEO au Cameroun : comment choisir',
    description:
      'Choisir une agence SEO au Cameroun : les 7 questions de Google, les signaux d’alerte, qui garde la fiche Google, et les prix réels en FCFA.',
    lede:
      'Une agence SEO au Cameroun se choisit sur des preuves vérifiables : des résultats visibles dans Google Search Console, la liste écrite des modifications prévues, un rapport mensuel lisible et un accès délégué qui laisse l’entreprise propriétaire de sa fiche Google. Google écrit que personne ne peut garantir la première position, et les forfaits publiés au Cameroun commencent autour de 70 000 FCFA par mois.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-10-22',
    modified: '2026-10-22',
    readingMinutes: 10,
    primaryKeyword: 'agence seo cameroun',
    image: {
      src: '/images/blog-agence-seo-cameroun.webp',
      alt: 'Deux professionnels en chemise et cravate discutent devant leurs ordinateurs portables, à une table de réunion.',
    },
    linkedin: `Trois devis de référencement arrivent la même semaine.

Le premier promet la première page de Google en trente jours.
Le deuxième tient en une ligne et un montant.
Le troisième commence par vous demander le mot de passe du compte Google de l'entreprise.

Si vous dirigez une PME à Douala ou à Yaoundé, vous avez probablement déjà reçu au moins l'un des trois.

Choisir une agence SEO, c'est un peu comme choisir un garagiste. On lui confie les clés de la voiture. On ne lui confie jamais la carte grise.

Sur Google, la carte grise, c'est la propriété de votre fiche d'établissement et de votre Search Console. Google prévoit pour cela un rôle d'administrateur : l'agence gère la fiche, mais ne peut ni supprimer d'utilisateurs, ni supprimer la fiche. Vous restez propriétaire.

Trois autres points qui départagent les offres au Cameroun :

Une promesse de position est un signal d'alerte, pas un argument. Google écrit lui-même que personne ne peut garantir la première place.

Google publie sept questions à poser à un prestataire avant de signer. Résultats attendus et délai, mesure de la réussite, liste des modifications apportées au site. Une agence sérieuse y répond par écrit.

Testez le site de l'agence elle-même. Tapez son métier et sa ville sur Google, en français puis en anglais. Puis ajoutez /llms.txt à son adresse.

Nous sommes nous-mêmes une agence SEO basée à Douala. Nous avons donc appliqué chaque critère du guide à notre propre offre avant de le publier. Nous avons survécu, mais le passage sur les études de cas nous a demandé un peu plus de courage que prévu.

Le guide complet, en français : le marché camerounais en 2026, les sept questions, les signaux d'alerte, les prix réels et quand il vaut mieux ne pas encore prendre d'agence.

https://afrishieldai.com/blog/agence-seo-cameroun

#Cameroun #SEO #Douala #Yaoundé #PME

Donnez les clés. Gardez la carte grise.`,
  },
  {
    slug: 'referencement-naturel-douala',
    title:
      'Référencement naturel à Douala : le guide pour être trouvé sur Google, en français et en anglais',
    cardTitle: 'Référencement naturel à Douala, le guide',
    metaTitle: 'Référencement naturel à Douala : le guide',
    description:
      'Référencement naturel à Douala : fiche Google, pages par quartier, français et anglais, délais réels, prix en FCFA, et quand il vaut mieux attendre.',
    lede:
      'Le référencement naturel à Douala fait apparaître une entreprise gratuitement dans Google quand un client cherche son service, en français ou en anglais. Une fiche Google validée peut apparaître sur la carte en quelques semaines, une page par service et par quartier progresse en général en deux à quatre mois, et une recherche à l’échelle de la ville en six à douze mois.',
    lang: 'fr',
    category: 'Référencement local',
    published: '2026-10-19',
    modified: '2026-10-19',
    readingMinutes: 10,
    primaryKeyword: 'référencement naturel douala',
    image: {
      src: '/images/blog-referencement-naturel-douala.webp',
      alt: 'Des motos et un tricycle jaune circulent devant la mairie de Douala 5e, sous un ciel dégagé.',
    },
    linkedin: `Vous tapez votre métier et « Douala » sur Google. Vous voyez un annuaire, deux concurrents, et un site qui ne s'ouvre pas.

Vous retapez en anglais. Autres résultats. Toujours pas vous.

Pourtant votre entreprise existe depuis des années, avec une enseigne que tout le quartier connaît.

Le problème n'est pas l'entreprise. C'est que sur Google, l'enseigne n'a jamais été posée.

Le référencement naturel, c'est exactement ça : poser l'enseigne là où les clients cherchent maintenant. À Douala, il y a trois endroits où la poser.

La fiche Google Maps. La plus rapide. Google indique que la validation prend jusqu'à cinq jours ouvrés, et qu'aucun paiement ne permet d'être mieux classé sur la carte.

Une vraie page par service et par quartier. « Cabinet comptable Bonanjo » se gagne en général en quelques mois. « Cabinet comptable Douala » demande plutôt six à douze mois.

Les deux langues. « Transitaire Douala » et « clearing agent Douala » ne donnent pas les mêmes résultats. Une seule langue, c'est la moitié de la rue.

Et un détail qui change tout : la concurrence optimisée est encore rare ici. Dans notre baromètre d'octobre, aucune des 26 grandes organisations camerounaises au site fonctionnel ne publiait de fichier llms.txt.

Pour être honnêtes, notre propre site, vu depuis le Royaume-Uni, se classait en moyenne autour de la 74e position sur 90 jours. Vu depuis le Cameroun, autour de la 4e. Nous aimerions dire que c'était prévu.

Le guide complet, en français : par où commencer, combien de temps, combien ça coûte, et quand il vaut mieux ne pas encore dépenser.

https://afrishieldai.com/blog/referencement-naturel-douala

#Douala #Cameroun #SEO #RéférencementLocal #PME

Votre quartier connaît déjà votre enseigne. Il reste à la montrer à Google.`,
  },
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
