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

const post = getPost('creer-sa-fiche-etablissement-google-au-cameroun')!;

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: 'article',
    locale: 'fr_FR',
    publishedTime: post.published,
    images: postOgImages(post),
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    images: postOgImages(post),
  },
};

const TOC = [
  { id: 'lieu-ou-fiche', label: 'Un lieu sur la carte ou une fiche à vous' },
  { id: 'compte', label: 'Quel compte Google doit posséder la fiche' },
  { id: 'chercher', label: 'Chercher d’abord, puis revendiquer' },
  { id: 'creer', label: 'Créer la fiche, étape par étape' },
  { id: 'adresse', label: 'Une adresse camerounaise sans numéro de rue' },
  { id: 'bilingue', label: 'Le nom, le bilinguisme et le téléphone' },
  { id: 'validation', label: 'La validation : à quoi s’attendre' },
  { id: 'payer', label: 'Quand ne payer personne pour cela' },
  { id: 'liste', label: 'La liste complète' },
];

const FAQ = [
  {
    q: 'Comment créer sa fiche d’établissement Google au Cameroun ?',
    a: 'Cherchez d’abord votre entreprise sur Google Maps. Si une fiche existe déjà, revendiquez-la. Sinon, allez sur business.google.com/add, saisissez le nom de l’enseigne, la catégorie et l’adresse ou la zone desservie, puis suivez la méthode de validation que Google propose. La fiche apparaît sur la carte une fois validée.',
  },
  {
    q: 'La fiche d’établissement Google est-elle gratuite ?',
    a: 'Oui. Google indique qu’un établissement peut être ajouté ou revendiqué sans frais, donc la fiche coûte 0 FCFA au Cameroun. Une personne qui facture la création facture son propre temps, pas un service de Google. Google précise aussi qu’aucun paiement ne permet d’être mieux classé sur la carte.',
  },
  {
    q: 'Comment mettre mon entreprise sur Google Maps si mon adresse n’a pas de numéro de rue ?',
    a: 'Google indique que si une adresse ne contient pas de numéro de rue, ou si le système ne parvient pas à la localiser, vous pouvez placer un repère à l’emplacement de l’établissement sur la carte. Écrivez le quartier et la rue aussi précisément que possible, ajoutez un point de repère seulement s’il est nécessaire pour trouver l’entrée, puis déplacez le repère sur la porte.',
  },
  {
    q: 'Quelqu’un a déjà créé la fiche de mon entreprise. Comment la récupérer ?',
    a: 'Allez sur business.google.com/add, saisissez le nom et l’adresse, puis sélectionnez votre établissement. Si Google indique qu’un autre utilisateur gère peut-être la fiche, sélectionnez Demander l’accès et remplissez le formulaire. Le propriétaire actuel dispose de trois jours pour répondre ; sans réponse, Google peut vous proposer de revendiquer la fiche, mais cette option n’est pas toujours disponible.',
  },
  {
    q: 'Combien de temps faut-il pour que ma fiche Google soit validée ?',
    a: 'La création prend moins d’une heure. Google indique que l’examen de la validation prend jusqu’à cinq jours ouvrés, et parfois davantage dans de rares cas. Si la carte postale est la méthode proposée, Google précise que les codes arrivent généralement sous 14 jours et expirent au bout de 30 jours.',
  },
  {
    q: 'Google My Business et fiche d’établissement Google, est-ce la même chose ?',
    a: 'Oui. Fiche d’établissement Google est le nom actuel de ce qui s’appelait Google My Business. Le service, le formulaire de création et les règles de validation sont les mêmes ; seul le nom a changé. Les conseils et tutoriels qui parlent de Google My Business restent donc valables.',
  },
];

const STEPS = [
  {
    name: 'Choisir le compte Google qui possédera la fiche',
    text: 'Utilisez un compte que l’entreprise contrôle, pas celui d’un neveu, d’un graphiste ou d’un employé qui peut partir. Notez quel compte est utilisé et gardez le mot de passe chez le dirigeant.',
  },
  {
    name: 'Chercher l’entreprise sur Google Maps',
    text: 'Tapez le nom et la ville. Si une fiche existe, sélectionnez Revendiquer cet établissement. Si Google indique qu’un autre utilisateur la gère, sélectionnez Demander l’accès au lieu d’en créer une deuxième.',
  },
  {
    name: 'Créer la fiche sur business.google.com/add',
    text: 'Saisissez le nom exact de l’enseigne, une seule langue, choisissez la catégorie la plus précise et indiquez si les clients viennent sur place.',
  },
  {
    name: 'Saisir l’adresse ou la zone desservie, puis placer le repère',
    text: 'Quartier et rue sur la première ligne, étage ou bureau sur la seconde, un point de repère seulement s’il est indispensable. Déplacez ensuite le repère à la main sur l’entrée.',
  },
  {
    name: 'Valider avec la méthode proposée par Google',
    text: 'Google choisit les méthodes disponibles. Suivez celle qui s’affiche, puis ne modifiez ni le nom, ni l’adresse, ni la catégorie avant la fin de l’examen.',
  },
  {
    name: 'Ajouter un second propriétaire ou un administrateur',
    text: 'Invitez une deuxième personne de confiance, sur son propre compte Google, pour que la fiche ne dépende jamais d’un seul téléphone.',
  },
  {
    name: 'Compléter la fiche et demander des avis',
    text: 'Ajoutez les horaires réellement tenus, des photos de l’enseigne et de l’entrée, puis demandez un avis Google à chaque client.',
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
        data={howToJsonLd(STEPS, 'Créer sa fiche d’établissement Google au Cameroun')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Pour créer sa fiche d’établissement Google au Cameroun, cherchez d’abord l’entreprise sur
          Google Maps et <strong>revendiquez la fiche si elle existe déjà</strong>. Sinon, créez-la
          gratuitement sur business.google.com/add avec le nom de l’enseigne, la catégorie la plus
          précise et l’adresse ou la zone desservie, puis{' '}
          <strong>suivez la méthode de validation proposée par Google</strong>. La fiche apparaît
          sur Google Maps une fois validée. Elle coûte 0 FCFA. Si l’adresse n’a pas de numéro de
          rue, comme souvent à Douala et à Yaoundé, Google permet de placer un repère directement
          sur la carte.
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
              Clarisse tient une boutique de pièces détachées à Ndokoti. Un garagiste de
              Bonamoussadi lui commande des plaquettes de frein et envoie un moto-taxi les chercher.
              Vingt minutes plus tard, le chauffeur appelle : « Madame, je suis devant la pharmacie,
              mais quelle pharmacie ? »
            </p>
            <p>
              Elle cherche sa boutique sur Google Maps pour lui envoyer la position. La boutique y
              est, en quelque sorte. Quelqu’un l’a ajoutée il y a deux ans, avec un nom mal écrit,
              un repère posé de l’autre côté du carrefour et des horaires qu’elle n’a jamais
              tenus. Elle peut la voir. Elle ne peut rien y changer.
            </p>
            <p>
              La semaine suivante, un démarcheur lui propose sur WhatsApp de « l’inscrire sur
              Google » contre paiement. Le formulaire auquel il vend l’accès est gratuit.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide couvre la création elle-même : décider à qui appartient la fiche, la revendiquer
          ou la créer, saisir une adresse camerounaise que Google comprend, et passer la
          validation. Pour la place de la fiche dans une stratégie plus large, lisez{' '}
          <a href="/blog/referencement-naturel-douala">
            notre guide du référencement naturel à Douala
          </a>
          . Pour confier ce travail à un prestataire, lisez d’abord{' '}
          <a href="/blog/agence-seo-cameroun">
            notre guide pour choisir une agence SEO au Cameroun
          </a>
          . Les étapes ci-dessous valent de Douala à Garoua.
        </p>

        <h2 id="lieu-ou-fiche">Un lieu sur la carte ou une fiche qui vous appartient</h2>

        <p>
          Mettre son entreprise sur Google correctement signifie posséder une fiche
          d’établissement validée, et non simplement apparaître comme un lieu sur la carte.
          N’importe quel utilisateur de Google Maps peut ajouter un lieu manquant, mais la personne
          qui l’ajoute ne le gère pas. Google indique que c’est la validation qui fait de vous le
          propriétaire de la fiche et vous permet de modifier le nom, les horaires et de répondre
          aux clients.
        </p>

        <p>
          C’est la situation de Clarisse, et elle est fréquente. Un client, un livreur ou un
          cousin plein de bonne volonté ajoute la boutique, et l’entreprise existe désormais sur
          Maps avec des informations que personne dans l’entreprise n’a choisies. La solution
          n’est pas de l’ajouter une deuxième fois. C’est de revendiquer la fiche qui existe déjà.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Votre situation</th>
                <th>Ce qu’il faut faire</th>
                <th>Ce que vous obtenez</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aucune fiche n’existe</td>
                <td>Créer une fiche sur business.google.com/add</td>
                <td>Une nouvelle fiche à vous, visible après validation</td>
              </tr>
              <tr>
                <td>Une fiche existe, personne ne l’a revendiquée</td>
                <td>Sélectionner Revendiquer cet établissement</td>
                <td>La fiche existante, désormais gérée par vous</td>
              </tr>
              <tr>
                <td>Une fiche existe, quelqu’un d’autre l’a validée</td>
                <td>Sélectionner Demander l’accès</td>
                <td>La propriété, si le propriétaire accepte ou ne répond pas</td>
              </tr>
              <tr>
                <td>Vous voulez seulement signaler qu’un lieu existe</td>
                <td>Ajouter un lieu manquant dans Google Maps</td>
                <td>
                  Un lieu public que vous ne gérez pas, ce qui convient à un rond-point et pas à
                  une entreprise
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h2 id="compte">Quel compte Google doit posséder la fiche</h2>

        <p>
          La fiche doit appartenir à un compte Google que l’entreprise contrôle elle-même, parce
          que celui qui possède le compte possède la fiche. Google indique qu’un compte Google est
          nécessaire et qu’il peut utiliser une adresse Gmail ou n’importe quelle autre adresse
          e-mail. La question n’est donc pas de savoir si cela fonctionne, mais à qui appartient
          le compte.
        </p>

        <p>
          Le problème de création le plus courant que nous rencontrons n’a rien de technique. Un
          neveu, un graphiste ou un ancien employé a créé la fiche sur son propre compte, puis a
          changé de téléphone, déménagé à Yaoundé ou cessé de répondre. Une fiche créée sur le
          Gmail de quelqu’un d’autre ressemble à un titre foncier rangé chez un cousin : tout le
          monde sait à qui appartient le terrain, mais personne n’a le papier.
        </p>

        <ul>
          <li>
            <strong>Utilisez un compte auquel le dirigeant se connecte.</strong> Un Gmail dédié à
            l’entreprise convient très bien. Le mot de passe et le numéro de récupération restent
            chez le dirigeant.
          </li>
          <li>
            <strong>Ajoutez un second propriétaire ou un administrateur.</strong> Une fiche peut
            avoir plusieurs propriétaires mais un seul propriétaire principal. Un administrateur
            gère presque tout, mais ne peut ni ajouter ou supprimer des utilisateurs, ni supprimer
            la fiche. Chaque personne invitée utilise son propre compte Google.
          </li>
          <li>
            <strong>Donnez à une agence un accès administrateur, pas la propriété.</strong> Toute
            personne qui vous aide sur la fiche, nous compris, peut faire le travail avec ce rôle.
            La propriété reste à l’entreprise.
          </li>
        </ul>

        <h2 id="chercher">Chercher d’abord, puis revendiquer ou demander l’accès</h2>

        <p>
          Avant de créer quoi que ce soit, cherchez le nom de l’entreprise et la ville sur Google
          Maps, parce qu’une fiche existe peut-être déjà et que Google exige une seule fiche par
          établissement. Une deuxième fiche ne remplace pas la première ; elle donne à Google deux
          versions de la même boutique, et Google indique que les informations risquent alors de
          ne pas s’afficher correctement.
        </p>

        <ul>
          <li>
            <strong>Si la fiche existe et n’est pas revendiquée :</strong> sélectionnez{' '}
            <em>Revendiquer cet établissement</em>, puis <em>Gérer</em>. Vous reprenez la fiche
            existante au lieu d’en lancer une concurrente.
          </li>
          <li>
            <strong>Si quelqu’un d’autre l’a déjà validée :</strong> allez sur
            business.google.com/add, saisissez le nom et l’adresse, puis choisissez
            l’établissement. Quand Google indique qu’un autre utilisateur gère peut-être la fiche,
            sélectionnez <em>Demander l’accès</em> et remplissez le formulaire.
          </li>
          <li>
            <strong>Ce qui se passe ensuite :</strong> Google prévient le propriétaire actuel par
            e-mail, et il dispose de trois jours pour répondre. S’il accepte, vous gérez la fiche.
            S’il ne répond pas, vous pourrez peut-être la revendiquer depuis l’e-mail de
            confirmation, mais Google précise que cette option n’est pas toujours disponible. S’il
            refuse, vous pouvez encore suggérer des modifications ou faire appel.
          </li>
        </ul>

        <p>
          Pour une entreprise qui intervient chez ses clients sans boutique ni bureau, Google traite
          le transfert de propriété par son assistance, et non par ce formulaire.
        </p>

        <h2 id="creer">Créer la fiche, étape par étape</h2>

        <p>
          Une nouvelle fiche se crée sur business.google.com/add en saisissant le nom de
          l’établissement, en choisissant une catégorie, en indiquant si les clients viennent sur
          place et en ajoutant les coordonnées avant la validation. Cela prend moins d’une heure
          sur un téléphone, dont l’essentiel passé à choisir la catégorie.
        </p>

        <ol>
          <li>
            <strong>Le nom.</strong> Celui de l’enseigne et des factures, rien de plus. Les
            consignes de Google interdisent d’ajouter un slogan, des services, un lieu ou des mots
            clés au nom. « Pièces Auto Clarisse » est un nom. « Pièces Auto Clarisse Meilleur Prix
            Ndokoti Douala Livraison Rapide » est une suspension qui attend son heure.
          </li>
          <li>
            <strong>La catégorie principale.</strong> Google demande de décrire ce que
            l’établissement est, plutôt que ce qu’il offre, et de choisir le moins de catégories
            possible. Un magasin de pièces automobiles n’est pas un garage, même s’il dépanne un
            client de temps en temps.
          </li>
          <li>
            <strong>Le lieu.</strong> Indiquez si les clients viennent chez vous. Si oui, saisissez
            l’adresse. Si c’est vous qui vous déplacez, comme un plombier, un traiteur ou une
            coiffeuse à domicile, l’adresse est masquée et vous indiquez une zone desservie.
          </li>
          <li>
            <strong>Les coordonnées.</strong> Un numéro qui répond pendant les horaires indiqués, et
            un site web si vous en avez un.
          </li>
          <li>
            <strong>La validation.</strong> Google affiche ensuite les méthodes disponibles pour
            cette fiche, détaillées plus bas.
          </li>
        </ol>

        <h2 id="adresse">Une adresse camerounaise sans numéro de rue</h2>

        <p>
          Une entreprise dont l’adresse n’a pas de numéro de rue peut quand même créer sa fiche,
          car Google indique que si l’adresse ne contient pas de numéro ou si le système ne la
          trouve pas, on peut placer un repère à l’emplacement de l’établissement sur la carte.
          C’est le cas d’une grande partie des boutiques, cabinets et ateliers de Douala et de
          Yaoundé, et c’est l’étape qui se passe le plus souvent mal sans que personne ne s’en
          aperçoive.
        </p>

        <p>
          Au Cameroun, une adresse se donne volontiers par repères : « face station Total », «
          derrière la pharmacie du carrefour », « deuxième portail après la boulangerie ». Google
          a prévu ce cas, avec une limite précise. Ses consignes disent de n’inclure des
          intersections et des points de repère que là où l’adresse officielle ne permet pas de
          déterminer la position exacte de l’établissement. Autrement dit, le repère sert à
          trouver la porte, pas à décorer l’adresse.
        </p>

        <ul>
          <li>
            <strong>Écrivez l’adresse telle qu’elle existe.</strong> Ville, quartier, rue si elle a
            un nom, et le point de repère seulement s’il est indispensable. Étage, bâtiment ou
            numéro de bureau vont sur la deuxième ligne. Google refuse les boîtes postales et
            interdit les mots clés dans les lignes d’adresse.
          </li>
          <li>
            <strong>Déplacez ensuite le repère à la main.</strong> Zoomez sur le téléphone et posez
            le repère sur l’entrée, pas sur le carrefour le plus connu du quartier et pas sur la
            concession voisine. C’est ce repère que le moto-taxi suivra.
          </li>
          <li>
            <strong>Pas de bureau virtuel.</strong> Google n’accepte pas une adresse de
            domiciliation où l’entreprise ne travaille pas. Un espace de coworking n’est accepté
            que s’il est clairement signalé, que vous y recevez des clients et que votre personnel
            y est présent pendant les horaires d’ouverture.
          </li>
          <li>
            <strong>Gardez une enseigne fixe.</strong> Google exige que les entreprises qui
            affichent leur adresse aient une enseigne permanente portant leur nom. Elle sert aussi
            pendant la validation, qui demande souvent de la montrer.
          </li>
          <li>
            <strong>Les entreprises qui se déplacent masquent leur adresse.</strong> Elles indiquent
            les quartiers et villes desservis, et Google demande de limiter la zone à deux heures de
            trajet depuis l’établissement. Un plombier de Douala qui déclare Garoua dans sa zone
            desservie fait preuve d’optimisme, et Google ne partage pas cet optimisme.
          </li>
        </ul>

        <h2 id="bilingue">Le nom, le bilinguisme et le téléphone</h2>

        <p>
          Au Cameroun, le nom de la fiche doit être écrit dans une seule langue, car les consignes
          de Google interdisent de répéter le même nom d’établissement en plusieurs langues, même
          s’il apparaît ainsi sur l’enseigne. Dans un pays officiellement bilingue, cette règle
          surprend beaucoup d’entreprises.
        </p>

        <ul>
          <li>
            <strong>Un nom, une langue.</strong> « Clinique du Littoral / Littoral Clinic » n’est
            pas accepté. Choisissez la forme que vos clients emploient le plus. La description et
            les publications peuvent ensuite parler aux deux publics, et le site peut avoir des
            pages en français et en anglais.
          </li>
          <li>
            <strong>Pas de SARL ou de SA sans justificatif.</strong> Google n’accepte une forme
            juridique dans le nom que si elle figure systématiquement sur l’enseigne, les cartes de
            visite ou les factures.
          </li>
          <li>
            <strong>Un numéro qui décroche.</strong> Google demande un numéro contrôlé directement
            par l’établissement, de préférence local, et rappelle que les serveurs vocaux
            automatiques ne reçoivent pas le code de validation par appel. Le plus simple est
            d’indiquer le numéro au format +237 qui sert aussi au WhatsApp professionnel, et de
            l’écrire de la même façon sur la fiche, le site et les factures.
          </li>
        </ul>

        <h2 id="validation">La validation : à quoi s’attendre</h2>

        <p>
          La validation est l’étape qui fait apparaître la fiche et vous en rend propriétaire, et
          ce sont les systèmes de Google qui choisissent les méthodes proposées ; elles ne peuvent
          pas être modifiées. Selon le type d’établissement, la région ou les horaires, Google
          peut proposer le téléphone ou le SMS, l’e-mail, l’appel vidéo en direct, la carte
          postale ou un enregistrement vidéo, et demande parfois plusieurs méthodes.
        </p>

        <p>Quatre règles tirées de l’aide de Google font gagner le plus de temps :</p>

        <ul>
          <li>
            <strong>Prenez la vidéo si elle est proposée.</strong> Google la recommande quand
            l’établissement y est éligible.
          </li>
          <li>
            <strong>L’appel vidéo en direct se prépare.</strong> Il se fait sur place, avec un
            appareil compatible, pendant les horaires d’ouverture. Google conseille d’être prêt à
            montrer l’enseigne et la rue, les produits ou le matériel, et une preuve que vous gérez
            l’établissement, par exemple ouvrir la porte avec vos clés ou accéder à la caisse.
          </li>
          <li>
            <strong>Comptez jusqu’à cinq jours ouvrés.</strong> C’est le délai d’examen indiqué par
            Google, plus long dans de rares cas. Une validation instantanée est possible quand le
            site web de l’entreprise est déjà validé dans la Google Search Console.
          </li>
          <li>
            <strong>Ne touchez à rien pendant l’attente.</strong> Si la méthode est la carte
            postale, les codes arrivent généralement sous 14 jours et expirent au bout de 30.
            Modifier le nom, l’adresse ou la catégorie rend le code inutilisable, et demander un
            nouveau code annule le premier. Google rappelle aussi qu’il ne vous demandera jamais
            ce code : quiconque le réclame au téléphone n’appelle pas de la part de Google.
          </li>
        </ul>

        <p>
          Une fois la fiche validée, complétez-la : horaires réellement tenus, description de
          l’activité, photos de l’enseigne, de l’entrée et de l’intérieur. Demandez ensuite un
          avis à chaque client, pas seulement aux clients satisfaits, puisque les règles de Google
          interdisent de filtrer selon la note. Les habitudes hebdomadaires qui suivent, photos,
          réponses et publications, sont détaillées dans{' '}
          <a href="/blog/google-business-profile-optimization">
            notre guide d’optimisation de la fiche d’établissement
          </a>
          , en anglais.
        </p>

        <h2 id="payer">Quand ne payer personne pour cela</h2>

        <p>
          Une entreprise camerounaise qui n’a qu’un seul établissement n’a besoin de payer
          personne pour créer sa fiche Google, parce que Google indique qu’un établissement peut
          être ajouté ou revendiqué sans frais et que le travail tient en un après-midi. Une
          « inscription sur Google » vendue par un démarcheur reste le même formulaire gratuit.
        </p>

        <p>
          Nous vendons du référencement, et nous venons de consacrer un article entier à expliquer
          comment se passer de nous pour la première étape. Notre service commercial a été
          prévenu. Il fait bonne figure.
        </p>

        <p>
          Se faire aider commence à avoir du sens plus tard : quand tous les concurrents d’une
          catégorie sont déjà validés et bien notés, quand plusieurs agences ou succursales ont
          chacune besoin de leur fiche et de leurs avis, ou quand ce sont le site et les pages
          autour de la fiche qui décident qui apparaît en premier. C’est un travail suivi. Notre{' '}
          <Link href="/ai-seo/douala">service de référencement à Douala</Link> le couvre, la{' '}
          <Link href="/pricing">page des tarifs</Link> présente les formules, et{' '}
          <a href="/blog/agence-seo-cameroun">notre guide des agences SEO au Cameroun</a> donne
          les prix du marché en FCFA pour comparer n’importe quel devis, le nôtre compris.
        </p>

        <p>
          La fiche n’est pas non plus utile à toutes les entreprises. Une vendeuse qui expédie
          dans tout le pays et prend toutes ses commandes sur Instagram a des clients qui ne
          cherchent pas par quartier, et une fiche parfaite n’y changera rien. Pour savoir si les
          assistants d’IA citent déjà des entreprises de votre secteur au Cameroun, notre{' '}
          <a href="/blog/barometre-ia-cameroun-2026">Baromètre IA Cameroun 2026</a> donne un
          premier repère.
        </p>

        <h2 id="liste">La liste complète</h2>

        <p>
          Une entreprise camerounaise crée sa fiche d’établissement Google en sept étapes, dans cet
          ordre, du choix du compte propriétaire à la première demande d’avis.
        </p>

        <ol>
          {STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          Clarisse a revendiqué la fiche que quelqu’un d’autre avait créée, corrigé le nom, posé le
          repère sur sa porte plutôt que sur le carrefour et ajusté les horaires. Elle l’a validée
          depuis la boutique et a nommé sa fille administratrice, sur son propre compte, pour que
          la fiche ne vive plus dans un seul téléphone. Le moto-taxi suivant est arrivé du premier
          coup. Le démarcheur a depuis proposé « d’améliorer » la fiche, toujours contre paiement,
          ce que Clarisse considère comme de la persévérance.
        </p>
      </PostShell>
    </>
  );
}
