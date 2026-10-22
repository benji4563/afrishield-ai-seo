import type { Metadata } from 'next';
import { PostShell, ShortAnswer } from '@/components/blog/PostLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
} from '@/lib/structured-data';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('referencement-naturel-douala')!;

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.published,
    images: postOgImages(post),
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: postOgImages(post),
  },
};

const TOC = [
  { id: 'definition', label: 'Le référencement naturel à Douala' },
  { id: 'trois-vitrines', label: 'Google Maps, pages de quartier, réponses d’IA' },
  { id: 'bilingue', label: 'Français et anglais ne sont pas des doublons' },
  { id: 'fiche-google', label: 'Commencer par la fiche Google' },
  { id: 'pages-quartier', label: 'Une page par service et par quartier' },
  { id: 'delais', label: 'Combien de temps avant les résultats' },
  { id: 'prix', label: 'Combien coûte le référencement à Douala' },
  { id: 'pas-maintenant', label: 'Quand ce n’est pas la bonne dépense' },
  { id: 'demarrer', label: 'Par où commencer cette semaine' },
];

const FAQ = [
  {
    q: 'Qu’est-ce que le référencement naturel pour une entreprise de Douala ?',
    a: 'Le référencement naturel, ou SEO, est le travail qui permet à une entreprise d’apparaître gratuitement dans les résultats de Google quand un client cherche son service, par exemple « transitaire Douala » ou « clinique dentaire Bonapriso ». Pour une entreprise de Douala, il couvre trois choses : la fiche d’établissement sur Google Maps, des pages de site écrites pour chaque service et chaque quartier, et des informations assez claires pour être reprises par les assistants d’IA.',
  },
  {
    q: 'Combien de temps faut-il pour être visible sur Google à Douala ?',
    a: 'Une fiche d’établissement Google vérifiée peut apparaître sur Google Maps en quelques semaines ; Google indique que l’examen de validation prend jusqu’à cinq jours ouvrés. Les recherches de quartier progressent en général en deux à quatre mois, et les recherches à l’échelle de toute la ville en six à douze mois. Ce sont des fourchettes observées dans notre travail, pas des garanties.',
  },
  {
    q: 'Combien coûte le référencement naturel à Douala ?',
    a: 'Les tarifs publiés au Cameroun commencent autour de 70 000 FCFA par mois pour un forfait d’entrée de gamme, souvent avec un engagement de douze mois. Nos propres formules sont à 150, 400 ou 900 USD par mois, facturables en XAF, sans frais de mise en service et sans engagement de durée. Le bon budget est celui que l’entreprise peut tenir au moins six mois.',
  },
  {
    q: 'Faut-il un site en français et en anglais à Douala ?',
    a: 'Pour la plupart des entreprises qui vendent à d’autres entreprises, oui. À Douala, un même client peut chercher « transitaire Douala » et « clearing agent Douala » pour le même besoin. Une page française et une page anglaise écrites séparément couvrent les deux recherches ; une traduction automatique de la même page couvre rarement bien la seconde.',
  },
  {
    q: 'Peut-on payer Google pour être mieux classé sur Google Maps ?',
    a: 'Non. Google indique qu’il n’existe aucun moyen d’obtenir une meilleure place dans le classement local sur demande ou contre rémunération. Le classement local repose principalement sur la pertinence, la distance et la proéminence de l’établissement. Les annonces payantes existent, mais elles sont signalées comme sponsorisées et ne changent pas le classement naturel.',
  },
  {
    q: 'Une agence peut-elle garantir la première place sur Google à Douala ?',
    a: 'Non. Google écrit lui-même que personne ne peut garantir la première position dans ses résultats de recherche. Une agence sérieuse peut s’engager sur le travail livré, sur des indicateurs mesurables comme les impressions et les positions dans Google Search Console, et sur un rapport mensuel lisible, mais pas sur une place précise à une date précise.',
  },
];

const STEPS = [
  {
    name: 'Revendiquer et valider la fiche d’établissement Google',
    text: 'Créez ou revendiquez la fiche, choisissez la catégorie exacte, placez le repère au bon endroit et lancez la validation. Google indique que l’examen prend jusqu’à cinq jours ouvrés.',
  },
  {
    name: 'Vérifier que le site répond correctement',
    text: 'Ouvrez le site depuis un téléphone sur données mobiles, avec et sans www. Corrigez le certificat HTTPS et les pages qui ne chargent pas avant d’écrire quoi que ce soit.',
  },
  {
    name: 'Connecter Google Search Console',
    text: 'Ajoutez le site à Google Search Console pour enregistrer dès le premier jour les impressions et les positions, pays par pays et requête par requête.',
  },
  {
    name: 'Lister dix recherches réelles, en français et en anglais',
    text: 'Notez les mots que vos clients utilisent vraiment au téléphone et sur WhatsApp, avec le service et le quartier, dans les deux langues.',
  },
  {
    name: 'Écrire une première page service et quartier',
    text: 'Choisissez le service le plus rentable et le quartier où se trouvent vos clients, et écrivez une page qui répond aux questions concrètes : prix indicatifs, délais, adresse, horaires, contact.',
  },
  {
    name: 'Demander un avis à chaque client satisfait',
    text: 'Envoyez le lien d’avis Google à chaque client, sans filtrer selon la note attendue, et répondez à chaque avis reçu.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />
      <StructuredData
        data={howToJsonLd(STEPS, 'Démarrer le référencement naturel d’une entreprise à Douala')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Le <strong>référencement naturel à Douala</strong> consiste à faire apparaître une
          entreprise gratuitement dans Google quand un client cherche son service, en français
          ou en anglais. Il repose sur trois éléments : une fiche d’établissement Google validée,
          qui peut apparaître sur Google Maps en quelques semaines ; une page de site par
          service et par quartier, comme Akwa, Bonanjo ou Bonabéri, qui progresse en général en
          deux à quatre mois ; et des informations assez claires pour être reprises par les
          assistants d’IA. La concurrence optimisée est encore rare à Douala, ce qui rend le
          travail plus rapide qu’à Lagos ou Nairobi. Personne ne peut garantir une première
          place, et Google le dit lui-même.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <div className="my-10 border-y border-ink/10 py-8">
          <div className="space-y-5 text-lead text-slate">
            <p>
              Armel dirige une société de transit à Bonanjo. Ses clients le trouvent par le
              bouche-à-oreille, au port, et par un groupe WhatsApp qui compte plus de membres
              que de dossiers. Un jour, un importateur de Garoua lui dit l’avoir cherché sur
              Google avant de l’appeler. Il n’avait rien trouvé, et avait appelé quelqu’un
              d’autre d’abord.
            </p>
            <p>
              Armel tape alors « transitaire Douala » sur son téléphone. Il voit des annuaires,
              deux concurrents, et un site qui ne s’ouvre pas. Il tape « clearing agent
              Douala ». Autres résultats, autres concurrents. Sa société n’apparaît dans aucune
              des deux listes, alors qu’elle dédouane des conteneurs depuis onze ans.
            </p>
            <p>
              Rien n’allait mal dans son entreprise. Simplement, Google ne savait pas
              qu’elle existait, et personne ne le lui avait encore dit.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide explique, pour une entreprise de Douala, ce que recouvre le référencement
          naturel, dans quel ordre le faire, combien de temps il faut, ce qu’il coûte, et quand
          il vaut mieux attendre. Il complète notre{' '}
          <a href="/blog/barometre-ia-cameroun-2026">
            baromètre de la visibilité IA des entreprises camerounaises
          </a>
          , qui mesure le même problème chez les trente plus grandes organisations du pays.
        </p>

        <h2 id="definition">Ce que recouvre le référencement naturel à Douala</h2>

        <p>
          Le référencement naturel à Douala est l’ensemble du travail qui permet à une
          entreprise d’apparaître, sans payer de publicité, quand un client de la ville cherche
          son service sur Google ou le demande à un assistant d’IA. Il se distingue du
          référencement payant, où l’on achète un emplacement marqué « sponsorisé » qui
          disparaît le jour où le budget s’arrête.
        </p>

        <p>
          Les pages qui se classent aujourd’hui sur cette recherche sont presque toutes des
          pages de vente d’agences : audit, mots-clés, netlinking, devis sous 24 heures. Elles
          décrivent ce que l’agence fait, rarement ce que l’entreprise doit faire elle-même, ni
          dans quel ordre. C’est l’objet de ce guide. Le jargon reste en option ; nous avons
          vérifié, aucun client n’a jamais demandé plus de netlinking par son nom.
        </p>

        <h2 id="trois-vitrines">
          Les trois vitrines : Google Maps, pages de quartier et réponses d’IA
        </h2>

        <p>
          Une entreprise de Douala est trouvée par trois canaux distincts : la fiche
          d’établissement sur Google Maps, les pages de son site dans les résultats classiques,
          et les réponses des assistants d’IA comme ChatGPT, Gemini ou Perplexity. Chacun obéit
          à ses propres règles et avance à sa propre vitesse.
        </p>

        <ul>
          <li>
            <strong>Google Maps.</strong> Google indique que le classement local repose
            principalement sur trois critères : la pertinence de la fiche par rapport à la
            recherche, la distance entre l’établissement et la personne qui cherche, et la
            proéminence, c’est-à-dire la notoriété de l’établissement. C’est la vitrine la plus
            rapide à mettre en place.
          </li>
          <li>
            <strong>Les pages du site.</strong> Elles captent les recherches qui nomment un
            service et un lieu, comme « cabinet comptable Akwa » ou « location voiture
            Bonapriso ». C’est là que se joue l’essentiel du travail.
          </li>
          <li>
            <strong>Les réponses d’IA.</strong> Un assistant ne peut citer que ce qu’il peut
            lire. Dans notre baromètre d’octobre 2026, aucune des 26 grandes organisations
            camerounaises au site fonctionnel ne publiait de fichier <code>llms.txt</code>, et
            aucune ne nommait un robot d’IA dans son <code>robots.txt</code>. Le terrain est
            presque vide, ce qui est une mauvaise nouvelle pour les grandes entreprises et une
            bonne nouvelle pour une PME qui s’y met maintenant.
          </li>
        </ul>

        <p>
          Les mécanismes propres aux assistants d’IA sont détaillés dans notre guide{' '}
          <a href="/blog/how-to-rank-on-chatgpt">pour être recommandé par ChatGPT</a>, en
          anglais.
        </p>

        <h2 id="bilingue">Le français et l’anglais ne sont pas des doublons</h2>

        <p>
          À Douala, le français et l’anglais correspondent à des recherches différentes, et une
          entreprise qui n’écrit que dans une langue renonce à une partie de ses clients. Un
          même importateur peut chercher « transitaire Douala » un jour et « clearing agent
          Douala » le lendemain, et Google peut lui montrer deux listes différentes.
        </p>

        <p>
          La solution n’est pas de traduire chaque page mot à mot avec un outil automatique. Les
          clients anglophones de Buea ou de Limbe n’utilisent pas toujours les mêmes termes que
          la traduction, et une page traduite à la machine se lit comme telle. Il vaut mieux
          écrire une page française et une page anglaise pour les services les plus rentables,
          chacune avec le vocabulaire réel de ses clients, et les relier entre elles. Deux pages
          bien écrites valent mieux que dix pages approximatives dans chaque langue.
        </p>

        <h2 id="fiche-google">Commencer par la fiche d’établissement Google</h2>

        <p>
          La première étape du référencement naturel à Douala est de revendiquer et de valider
          la fiche d’établissement Google, parce que c’est la vitrine la plus rapide et la seule
          qui apparaît directement sur la carte. Google indique que l’examen de validation prend
          jusqu’à cinq jours ouvrés, et propose selon les cas une validation par téléphone ou
          SMS, par e-mail, par appel vidéo en direct ou par courrier.
        </p>

        <p>
          Trois détails comptent plus que les autres à Douala. Le repère doit être placé au bon
          endroit, pas au carrefour le plus connu du quartier. La catégorie doit être la plus
          précise possible : « transitaire » plutôt que « entreprise ». Et le numéro affiché doit
          être celui qui répond, idéalement le même que le WhatsApp professionnel. Google
          précise aussi qu’il n’existe aucun moyen d’obtenir une meilleure place dans le
          classement local contre rémunération, ce qui fait gagner du temps face à certains
          démarcheurs.
        </p>

        <p>
          La méthode complète, étape par étape, est dans notre guide{' '}
          <a href="/blog/google-business-profile-optimization">
            d’optimisation de la fiche d’établissement Google
          </a>
          , en anglais.
        </p>

        <h2 id="pages-quartier">Écrire une page par service et par quartier</h2>

        <p>
          Après la fiche Google, le levier le plus efficace à Douala est d’écrire une vraie page
          pour chaque service rentable, dans le quartier où se trouvent les clients de ce
          service. Une page « dédouanement de véhicules à Bonabéri » répond à une question
          précise ; une page « nos services » ne répond à aucune.
        </p>

        <p>
          Une vraie page n’est pas la même page dont on change le nom du quartier. Google traite
          ces pages copiées comme des pages satellites, et elles finissent par nuire au site
          entier. Chaque page doit contenir ce qui est propre au lieu : l’adresse ou la zone
          desservie, les délais réels, les questions que posent les clients de ce secteur, une
          photo du lieu, et un moyen de contact direct.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Type de recherche</th>
                <th>Exemple</th>
                <th>Premiers mouvements</th>
                <th>Ce qui décide</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Maps, à proximité</td>
                <td>pharmacie de garde, cherchée depuis Akwa</td>
                <td>Quelques semaines après validation</td>
                <td>Validation, repère exact, catégorie, avis</td>
              </tr>
              <tr>
                <td>Service et quartier</td>
                <td>cabinet comptable Bonanjo</td>
                <td>Deux à quatre mois</td>
                <td>Une page écrite pour ce service et ce lieu</td>
              </tr>
              <tr>
                <td>Service et ville</td>
                <td>transitaire Douala, clearing agent Douala</td>
                <td>Six à douze mois</td>
                <td>Profondeur du contenu, liens, avis, les deux langues</td>
              </tr>
              <tr>
                <td>Requête nationale</td>
                <td>meilleur cabinet comptable du Cameroun</td>
                <td>Douze mois ou plus</td>
                <td>
                  L’autorité, surtout. Et la patience de regarder les annuaires passer devant
                  vous un moment, ce qui ne figure sur aucune facture mais devrait.
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="delais">Combien de temps avant les premiers résultats</h2>

        <p>
          À Douala, une fiche Google validée peut apparaître sur la carte en quelques semaines,
          une page service et quartier progresse en général en deux à quatre mois, et une
          recherche à l’échelle de la ville en six à douze mois. Ces fourchettes viennent de
          notre travail et des sites que nous auditons, pas d’une étude publiée, et elles
          supposent un travail régulier dès le premier mois.
        </p>

        <p>
          Douala va en général plus vite que Lagos ou Nairobi pour une raison simple : la concurrence
          optimisée y est rare. Sur 90 jours, entre le 24 juin et le 21 septembre 2026, notre
          propre site apparaissait en position moyenne 3,7 pour les internautes du Cameroun,
          contre 74,1 pour ceux du Royaume-Uni. L’échantillon camerounais était minuscule, une
          poignée d’impressions, donc il indique une direction plutôt qu’une ampleur. Mais la
          direction est nette. Le calendrier détaillé, mois par mois, est dans notre guide{' '}
          <a href="/blog/how-long-does-seo-take">sur la durée du référencement</a>, en anglais.
        </p>

        <h2 id="prix">Combien coûte le référencement naturel à Douala</h2>

        <p>
          Les tarifs de référencement naturel publiés au Cameroun commencent autour de 70 000
          FCFA par mois pour un forfait d’entrée de gamme. Une agence camerounaise affiche par
          exemple un forfait standard à 70 000 FCFA par mois et un forfait pro à 100 000 FCFA par
          mois, tous deux avec un engagement de douze mois et un nombre limité de pages et de
          mots-clés suivis.
        </p>

        <p>
          Nos propres formules sont à 150, 400 ou 900 USD par mois, facturables en XAF, sans
          frais de mise en service, sans engagement de durée et avec un préavis de trente jours.
          Le détail de ce que couvre chaque niveau est sur la <a href="/pricing">page des
          tarifs</a>. Quel que soit le prestataire, trois questions départagent les offres : qui
          écrit le contenu, dans quelles langues, et quel rapport vous recevez chaque mois. Une
          promesse de première page en trente jours n’est pas une quatrième question. La grille
          complète pour comparer les prestataires est dans notre guide{' '}
          <a href="/blog/agence-seo-cameroun">pour choisir une agence SEO au Cameroun</a>. Google
          écrit que personne ne peut garantir la première position ; l’agence qui la promet
          dispose apparemment d’autres informations.
        </p>

        <h2 id="pas-maintenant">Quand le référencement n’est pas la bonne dépense</h2>

        <p>
          Le référencement naturel n’est pas la bonne dépense pour une entreprise de Douala qui
          a besoin de clients dans le mois, qui ne peut pas financer six mois de travail, ou qui
          s’apprête à changer de nom, d’adresse ou de site.
        </p>

        <p>
          Si le loyer dépend des appels de ce mois-ci, la publicité payante, la recommandation et
          un catalogue WhatsApp bien tenu feront plus, dans le même délai, que n’importe quel
          contrat de référencement. Si un déménagement d’Akwa vers Bonapriso est prévu le
          trimestre prochain, faites-le d’abord : le travail ne doit pas servir à classer une
          adresse que l’entreprise va quitter. Et si le site ne s’ouvre pas correctement, la
          priorité est de le réparer. Dans notre baromètre, cinq des six adresses de domaine que
          nous pensions correctes se sont révélées fausses ou mortes. Nous sommes une agence qui
          recommande par écrit à certains lecteurs de ne pas encore embaucher d’agence. Notre
          service commercial a été prévenu et le prend avec courage.
        </p>

        <p>
          Pour les entreprises prêtes à tenir six mois et qui veulent être accompagnées, notre{' '}
          <a href="/ai-seo/douala">service de référencement à Douala</a> est construit sur
          l’approche de ce guide : fiche Google, pages service et quartier, les deux langues, et
          la visibilité dans les réponses d’IA.
        </p>

        <h2 id="demarrer">Par où commencer cette semaine</h2>

        <p>
          Une entreprise de Douala peut lancer son référencement naturel en une semaine avec six
          actions, dans cet ordre : valider la fiche Google, vérifier que le site répond,
          connecter Search Console, lister ses vraies recherches dans les deux langues, écrire
          une première page service et quartier, et demander des avis.
        </p>

        <ol>
          <li>
            <strong>Revendiquer et valider la fiche d’établissement Google.</strong> Catégorie
            exacte, repère au bon endroit, numéro qui répond. Jusqu’à cinq jours ouvrés
            d’examen, selon Google.
          </li>
          <li>
            <strong>Vérifier que le site répond correctement.</strong> Sur un téléphone, en
            données mobiles, avec et sans <code>www</code>. Un certificat HTTPS invalide fait
            fuir les visiteurs et les robots.
          </li>
          <li>
            <strong>Connecter Google Search Console.</strong> C’est l’outil gratuit qui montre,
            requête par requête, si le travail avance avant même que le téléphone sonne.
          </li>
          <li>
            <strong>Lister dix recherches réelles, en français et en anglais.</strong> Les mots
            que les clients utilisent au téléphone, pas ceux de la plaquette.
          </li>
          <li>
            <strong>Écrire une première page service et quartier.</strong> Le service le plus
            rentable, le quartier où sont les clients, avec prix indicatifs, délais et contact.
          </li>
          <li>
            <strong>Demander un avis à chaque client satisfait.</strong> Le même lien Google à
            tout le monde, sans trier selon la note attendue, et une réponse à chaque avis.
          </li>
        </ol>

        <p>
          Armel a commencé par la fiche Google, puis une page en français sur le dédouanement
          de véhicules et une page en anglais sur le même service. Il ne sera pas premier sur
          « transitaire Douala » le mois prochain. Mais l’importateur de Garoua qui cherche
          aujourd’hui un dédouanement de véhicules à Bonabéri le trouvera, et c’était
          exactement ce client-là qu’il avait perdu.
        </p>
      </PostShell>
    </>
  );
}
