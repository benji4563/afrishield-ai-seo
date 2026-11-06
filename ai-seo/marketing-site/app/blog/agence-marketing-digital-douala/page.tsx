import Link from 'next/link';
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

const post = getPost('agence-marketing-digital-douala')!;

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
  { id: 'perimetre', label: 'Ce que fait une agence de marketing digital' },
  { id: 'complete-ou-specialiste', label: 'Agence complète ou spécialiste' },
  { id: 'canaux', label: 'Où sont les clients au Cameroun en 2026' },
  { id: 'quel-besoin', label: 'Quelle entreprise a besoin de quoi' },
  { id: 'acces', label: 'Les comptes qui restent à votre nom' },
  { id: 'budget', label: 'Honoraires et budget publicitaire' },
  { id: 'questions', label: 'Six questions à poser avant de signer' },
  { id: 'pas-agence', label: 'Quand il ne faut pas d’agence' },
  { id: 'methode', label: 'Choisir en cinq étapes' },
];

const FAQ = [
  {
    q: 'Que fait une agence de marketing digital à Douala ?',
    a: 'Une agence de marketing digital gère plusieurs canaux à la fois : le site internet, les réseaux sociaux, la publicité sur Facebook, Instagram et Google, le contenu, et parfois le référencement et WhatsApp Business. Elle convient à une entreprise qui veut un seul prestataire pour toute sa présence en ligne. Le périmètre varie beaucoup d’une agence à l’autre, d’où l’importance d’une liste écrite des livrables.',
  },
  {
    q: 'Faut-il une agence de marketing digital ou une agence SEO à Douala ?',
    a: 'Cela dépend de la façon dont vos clients vous trouvent. Si vos clients vous cherchent sur Google, comme pour une clinique, un cabinet ou un transitaire, un spécialiste du référencement est prioritaire. Si vos clients vous découvrent en faisant défiler leur fil, comme pour la mode, la restauration ou un événement, une agence orientée réseaux sociaux et publicité convient mieux.',
  },
  {
    q: 'Combien coûte une agence de marketing digital à Douala ?',
    a: 'Sur la page Sortlist des agences de marketing à Douala, consultée le 6 novembre 2026, les budgets minimums affichés allaient de 500 à 3 000 euros, et 1 000 euros était le montant le plus fréquent. Plusieurs agences indiquaient un budget sur demande. Le budget publicitaire versé à Meta ou à Google s’ajoute aux honoraires de l’agence.',
  },
  {
    q: 'Qui doit être propriétaire de la page Facebook et du compte publicitaire ?',
    a: 'L’entreprise. Elle doit garder le contrôle total de son portefeuille business Meta et ajouter l’agence comme partenaire. Selon Meta, un partenaire qui reçoit le contrôle total d’un actif peut tout gérer, mais ne peut pas partager cet actif avec une autre entreprise, ce que seule l’organisation propriétaire peut faire.',
  },
  {
    q: 'Une agence de marketing digital peut-elle garantir des résultats ?',
    a: 'Elle peut s’engager sur des livrables et sur des indicateurs mesurables, pas sur un chiffre de ventes ni sur une position. Google écrit que personne ne peut garantir la première place dans ses résultats. Une proposition sérieuse précise ce qui sera livré chaque mois et comment le résultat sera mesuré.',
  },
  {
    q: 'Quels réseaux sociaux utiliser pour une entreprise au Cameroun ?',
    a: 'Facebook reste le plus large : selon le rapport Digital 2026 de DataReportal, sa portée publicitaire au Cameroun était de 5,90 millions de personnes fin 2025. LinkedIn affichait 1,60 million de membres inscrits, utile pour les services aux entreprises, et Instagram 611 000 utilisateurs. Le bon choix dépend de la clientèle visée, pas de la mode du moment.',
  },
];

const STEPS = [
  {
    name: 'Décider si l’entreprise est cherchée ou découverte',
    text: 'Listez les cinq dernières demandes de clients et notez comment chacun vous a trouvé : recherche Google, réseaux sociaux, bouche-à-oreille ou WhatsApp.',
  },
  {
    name: 'Écrire le besoin en une page',
    text: 'Indiquez les canaux à gérer, les livrables attendus chaque mois, les langues, et deux montants séparés : les honoraires de l’agence et le budget publicitaire.',
  },
  {
    name: 'Demander trois propositions comparables',
    text: 'Envoyez la même page à une agence complète, à un spécialiste du référencement et à un troisième prestataire, et comparez les livrables avant les prix.',
  },
  {
    name: 'Verrouiller les accès dans le contrat',
    text: 'Faites écrire que le portefeuille business Meta, le compte Google Ads, le nom de domaine, la fiche Google et la Search Console restent au nom de l’entreprise.',
  },
  {
    name: 'Fixer le rapport mensuel',
    text: 'Convenez d’un rapport d’une page : demandes reçues, coût par demande pour la publicité, clics et impressions dans Search Console, et travail livré.',
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
        data={howToJsonLd(STEPS, 'Choisir une agence de marketing digital à Douala')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Une <strong>agence de marketing digital à Douala</strong> gère plusieurs canaux à la
          fois : site, réseaux sociaux, publicité Facebook et Google, contenu. Elle convient à
          une entreprise que ses clients découvrent en faisant défiler leur fil. Si vos clients
          vous cherchent sur Google, un spécialiste du référencement passe en premier. Dans les
          deux cas, gardez à votre nom la page Facebook, le compte publicitaire, le nom de
          domaine et la fiche Google, et séparez les honoraires de l’agence du budget
          publicitaire.
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
              Hervé tient un showroom de meubles à Bonapriso. Depuis un an, il paie une agence
              de Douala pour vingt publications par mois sur Facebook et Instagram, avec un peu
              de publicité. Le rapport mensuel est soigné : des milliers de vues, des centaines
              de mentions « j’aime ».
            </p>
            <p>
              Un soir, il tape « meubles Douala » sur son téléphone. Son showroom n’apparaît ni
              sur la carte ni dans les résultats. Le lendemain, il demande à l’agence qui gère
              sa fiche Google. Personne. Il demande ensuite à qui appartient la page Facebook.
              Silence plus long.
            </p>
            <p>
              Hervé n’avait pas une mauvaise agence. Il avait une agence qui faisait bien un
              métier dont il n’avait besoin qu’à moitié.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide aide une entreprise de Douala à choisir entre une agence de marketing
          digital complète et un spécialiste, puis à vérifier l’offre retenue. Il ne refait
          pas le travail de nos autres guides : le{' '}
          <a href="/blog/agence-seo-cameroun">guide pour choisir une agence SEO au Cameroun</a>{' '}
          détaille les questions à poser à un référenceur, et le{' '}
          <a href="/blog/referencement-naturel-douala">
            guide du référencement naturel à Douala
          </a>{' '}
          explique la fiche Google et les pages de quartier. Ici, la question vient avant :
          quel type de prestataire, pour quel type d’entreprise.
        </p>

        <h2 id="perimetre">Ce que fait une agence de marketing digital à Douala</h2>

        <p>
          Une agence de marketing digital gère l’ensemble de la présence en ligne d’une
          entreprise : le site internet, les pages Facebook, Instagram et LinkedIn, les
          campagnes publicitaires sur Meta et Google, la création graphique et vidéo, et
          souvent WhatsApp Business et le référencement. C’est un prestataire unique pour
          plusieurs canaux.
        </p>

        <p>
          Les pages qui se classent sur « agence marketing digital Douala » le confirment :
          presque toutes listent la même gamme de services, du site vitrine à la publicité en
          passant par la formation. Sur la page Sortlist des agences de marketing à Douala,
          consultée le 6 novembre 2026, la majorité des agences affichées comptaient de un à
          dix employés. Une petite équipe qui couvre dix métiers en couvre forcément certains
          plus profondément que d’autres. Ce n’est pas un reproche, c’est de l’arithmétique.
        </p>

        <p>
          Une proposition qui promet une stratégie « à 360 degrés » sans lister ce qui sera
          livré chaque mois fait surtout tourner le client sur lui-même. Le bon réflexe est de
          demander, canal par canal, ce que l’agence produit, à quelle fréquence, et comment
          elle le mesure.
        </p>

        <h2 id="complete-ou-specialiste">
          Agence complète ou spécialiste : la question qui tranche
        </h2>

        <p>
          La question qui tranche est simple : vos clients vous cherchent-ils, ou vous
          découvrent-ils ? Une entreprise cherchée a d’abord besoin d’être trouvée sur Google ;
          une entreprise découverte a d’abord besoin d’être vue dans le fil des réseaux
          sociaux.
        </p>

        <p>
          Personne ne découvre sur Instagram qu’il a besoin d’un transitaire, d’un cabinet
          comptable ou d’un dentiste. Le besoin naît d’abord, puis la personne tape sa
          recherche sur Google. À l’inverse, personne ne cherche sur Google une robe qu’il n’a
          pas encore vue. La même logique, appliquée au marché nigérian avec des chiffres par
          plateforme, est développée dans notre comparatif{' '}
          <a href="/blog/digital-marketing-vs-seo-for-nigerian-businesses">
            marketing digital ou SEO pour les entreprises nigérianes
          </a>
          , en anglais.
        </p>

        <p>
          Beaucoup d’entreprises de Douala sont les deux à la fois, et c’est là qu’une agence
          complète a du sens. Mais il faut alors vérifier que le référencement y est un vrai
          métier, et pas une ligne ajoutée en bas de la plaquette.
        </p>

        <h2 id="canaux">Où sont les clients au Cameroun en 2026</h2>

        <p>
          Facebook reste de loin le plus grand canal publicitaire au Cameroun : selon le
          rapport Digital 2026 de DataReportal, fondé sur les outils publicitaires de Meta, sa
          portée était de 5,90 millions de personnes fin 2025, soit 19,6 % de la population.
          Le pays comptait alors 12,6 millions d’internautes, soit 41,9 % de la population.
        </p>

        <ul>
          <li>
            <strong>Facebook :</strong> 5,90 millions de personnes atteignables par la
            publicité.
          </li>
          <li>
            <strong>LinkedIn :</strong> 1,60 million de membres. DataReportal précise que
            LinkedIn compte les membres inscrits, pas les utilisateurs actifs chaque mois, ce
            qui gonfle la comparaison.
          </li>
          <li>
            <strong>Messenger :</strong> 631 000 personnes.
          </li>
          <li>
            <strong>Instagram :</strong> 611 000 personnes, soit environ un dixième de
            Facebook.
          </li>
          <li>
            <strong>X :</strong> 185 000 personnes.
          </li>
        </ul>

        <p>
          Ces chiffres datent d’octobre 2025 et proviennent des plateformes elles-mêmes, qui
          les révisent souvent. Ils suffisent pourtant à une conclusion pratique : une
          stratégie construite uniquement sur Instagram parle à une salle beaucoup plus petite
          qu’elle ne le croit. Et la personne qui a vu votre publicité Facebook tapera souvent
          votre nom sur Google avant de vous appeler, ce qui ramène à la fiche Google.
        </p>

        <h2 id="quel-besoin">Quelle entreprise de Douala a besoin de quoi</h2>

        <p>
          Une entreprise que l’on cherche doit commencer par le référencement et la fiche
          Google ; une entreprise que l’on découvre doit commencer par les réseaux sociaux et
          la publicité ; une entreprise qui vit des deux peut prendre une agence complète, à
          condition d’en vérifier chaque canal.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Type d’entreprise</th>
                <th>Comment le client la trouve</th>
                <th>Prestataire prioritaire</th>
                <th>Point à vérifier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clinique, cabinet, transitaire, école</td>
                <td>Recherche Google, souvent sur téléphone</td>
                <td>Spécialiste du référencement</td>
                <td>Fiche Google et pages par service</td>
              </tr>
              <tr>
                <td>Mode, pâtisserie, cosmétique, événementiel</td>
                <td>Fil Facebook, Instagram ou TikTok</td>
                <td>Agence réseaux sociaux et publicité</td>
                <td>Coût par demande, pas nombre de vues</td>
              </tr>
              <tr>
                <td>Restaurant, hôtel, showroom</td>
                <td>Les deux, puis Google Maps</td>
                <td>Agence complète avec un vrai pôle SEO</td>
                <td>Qui gère la fiche Google, nommément</td>
              </tr>
              <tr>
                <td>Services aux entreprises, B2B</td>
                <td>Recherche Google et LinkedIn</td>
                <td>Spécialiste SEO, plus LinkedIn en interne</td>
                <td>Contenu en français et en anglais</td>
              </tr>
              <tr>
                <td>Lancement d’une nouvelle marque</td>
                <td>Publicité, puis recherche du nom</td>
                <td>Agence complète, pour un temps limité</td>
                <td>Durée d’engagement et préavis</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="acces">Les comptes qui doivent rester au nom de l’entreprise</h2>

        <p>
          Cinq comptes doivent rester au nom de l’entreprise, quelle que soit l’agence : le
          portefeuille business Meta qui contient la page Facebook et le compte publicitaire,
          le compte Google Ads, le nom de domaine du site, la fiche d’établissement Google et la
          Search Console. L’agence reçoit un accès délégué, jamais la propriété.
        </p>

        <p>
          Meta prévoit exactement ce cas. Une personne qui a le contrôle total du portefeuille
          business peut ajouter l’agence comme partenaire, avec un contrôle total ou un accès
          partiel à chaque actif. Meta précise qu’un partenaire en contrôle total peut tout
          gérer, mais ne peut pas partager l’actif avec une autre entreprise : seule
          l’organisation propriétaire le peut. Côté Google Ads, seul un accès administrateur
          permet d’accorder ou de retirer des accès au compte, et ce niveau doit rester entre
          les mains de l’entreprise.
        </p>

        <p>
          Le nom de domaine est le plus souvent oublié. Un domaine enregistré au nom d’un
          prestataire parti depuis est un héritage que personne ne réclame, jusqu’au jour où il
          expire avec le site dessus. La méthode pour tenir la fiche Google est dans notre guide{' '}
          <a href="/blog/google-business-profile-optimization">
            d’optimisation de la fiche d’établissement Google
          </a>
          , en anglais.
        </p>

        <h2 id="budget">Honoraires et budget publicitaire : deux lignes séparées</h2>

        <p>
          Une offre de marketing digital doit séparer deux montants : les honoraires de
          l’agence, qui paient son travail, et le budget publicitaire, qui est versé à Meta ou à
          Google pour diffuser les annonces. Quand les deux sont fondus dans un seul forfait,
          personne ne peut savoir combien a réellement été dépensé en publicité.
        </p>

        <p>
          Sur la page Sortlist des agences de marketing à Douala, consultée le 6 novembre
          2026, les budgets minimums affichés allaient de 500 à 3 000 euros, 1 000 euros étant
          le montant le plus fréquent, et plusieurs agences indiquaient un budget sur demande.
          Ces montants ne précisent pas ce qu’ils couvrent, et c’est justement la question à
          poser. Pour le référencement seul, les forfaits publiés par des agences camerounaises
          sont détaillés dans notre guide sur les agences SEO.
        </p>

        <p>
          Un rapport qui compte les mentions « j’aime » est une bonne nouvelle pour le moral,
          rarement pour la caisse. Le chiffre utile est le coût par demande : budget
          publicitaire divisé par le nombre d’appels, de messages WhatsApp ou de formulaires
          reçus grâce aux annonces.
        </p>

        <h2 id="questions">Six questions à poser à une agence de Douala avant de signer</h2>

        <p>
          Six questions suffisent à départager la plupart des agences de marketing digital à
          Douala, et chacune appelle une réponse écrite et vérifiable.
        </p>

        <ol>
          <li>
            <strong>Que livrez-vous chaque mois, canal par canal ?</strong> Un nombre de
            publications, de campagnes, de pages ou de vidéos, pas une intention.
          </li>
          <li>
            <strong>Qui, dans l’équipe, fait le référencement ?</strong> Un nom et un exemple de
            travail, sinon le SEO est une ligne de plaquette.
          </li>
          <li>
            <strong>Le compte publicitaire et la page restent-ils à notre nom ?</strong> La
            seule réponse acceptable est oui, avec un accès partenaire pour l’agence.
          </li>
          <li>
            <strong>Comment séparez-vous honoraires et budget publicitaire ?</strong> Deux
            lignes sur la facture, et l’accès aux factures de Meta ou de Google.
          </li>
          <li>
            <strong>Quel indicateur mesure la réussite ?</strong> Demandes reçues et coût par
            demande, plutôt que vues et abonnés.
          </li>
          <li>
            <strong>Quelle est la durée d’engagement et le préavis ?</strong> Et que
            récupérons-nous, fichiers sources compris, si nous partons.
          </li>
        </ol>

        <p>
          Une dernière vérification ne coûte rien : tapez le métier de l’agence et sa ville sur
          Google, puis regardez sa propre page Facebook. Une agence qui vend de la visibilité
          devrait en avoir un peu chez elle. Pour la visibilité dans les réponses d’IA, notre{' '}
          <a href="/blog/barometre-ia-cameroun-2026">
            baromètre IA des entreprises camerounaises
          </a>{' '}
          montre à quel point le terrain est encore vierge au Cameroun.
        </p>

        <p>
          Précision honnête : AfriShield figure sur cette même page Sortlist, et nous sommes un
          spécialiste du référencement et de la visibilité dans l’IA, pas une agence complète.
          Nous ne gérons pas vos publications Instagram, et nous l’écrivons ici avant que vous
          ne nous le demandiez.
        </p>

        <h2 id="pas-agence">Quand il ne faut pas encore d’agence de marketing digital</h2>

        <p>
          Une entreprise de Douala n’a pas encore besoin d’une agence de marketing digital si
          elle ne peut pas financer à la fois les honoraires et un budget publicitaire pendant
          au moins trois mois, ou si elle ne sait pas encore répondre aux demandes qu’elle
          reçoit déjà.
        </p>

        <p>
          Une campagne qui génère cinquante messages WhatsApp auxquels personne ne répond avant
          le lendemain a payé pour décevoir cinquante clients. Dans ce cas, le premier
          investissement est un catalogue WhatsApp Business tenu à jour, une fiche Google
          complète et quelqu’un chargé de répondre vite. Ces trois chantiers se font sans
          agence, en quelques jours, et rendent chaque franc de publicité plus utile ensuite.
        </p>

        <h2 id="methode">Choisir une agence de marketing digital à Douala en cinq étapes</h2>

        <p>
          Une entreprise peut choisir son prestataire en deux semaines avec cinq étapes :
          savoir si elle est cherchée ou découverte, écrire son besoin en une page, demander
          trois propositions comparables, verrouiller les accès dans le contrat, et fixer le
          rapport mensuel.
        </p>

        <ol>
          <li>
            <strong>Décider si l’entreprise est cherchée ou découverte.</strong> Notez comment
            les cinq derniers clients vous ont trouvé.
          </li>
          <li>
            <strong>Écrire le besoin en une page.</strong> Canaux, livrables mensuels, langues,
            et deux montants séparés : honoraires et budget publicitaire.
          </li>
          <li>
            <strong>Demander trois propositions comparables.</strong> Une agence complète, un
            spécialiste du référencement et un troisième prestataire, sur la même page.
          </li>
          <li>
            <strong>Verrouiller les accès dans le contrat.</strong> Portefeuille Meta, Google
            Ads, nom de domaine, fiche Google et Search Console au nom de l’entreprise.
          </li>
          <li>
            <strong>Fixer le rapport mensuel.</strong> Demandes reçues, coût par demande,
            Search Console et travail livré, sur une page.
          </li>
        </ol>

        <p>
          Pour la partie recherche, notre{' '}
          <Link href="/ai-seo/douala">service de référencement à Douala</Link> travaille avec
          les accès au nom du client, un rapport d’une page et sans engagement de durée. Il peut
          aussi s’ajouter à l’agence qui gère déjà vos réseaux sociaux, sans la remplacer. Les
          formules sont sur la <a href="/pricing">page des tarifs</a>.
        </p>

        <p>
          Hervé a gardé son agence pour les réseaux sociaux. Il a récupéré la page Facebook à
          son nom, ajouté l’agence comme partenaire, et confié sa fiche Google à quelqu’un dont
          c’est le métier. Le rapport mensuel compte toujours les mentions « j’aime ». Il compte
          aussi, désormais, les appels.
        </p>
      </PostShell>
    </>
  );
}
