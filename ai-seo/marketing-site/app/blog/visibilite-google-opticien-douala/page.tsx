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

const post = getPost('visibilite-google-opticien-douala')!;

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
  { id: 'annuaires', label: 'Pourquoi les listes passent avant le cabinet' },
  { id: 'criteres', label: 'Ce que Google regarde pour un opticien' },
  { id: 'fiche', label: 'La fiche Google d’un cabinet d’optique' },
  { id: 'avis', label: 'Les avis, sans les filtrer' },
  { id: 'pages', label: 'Une page par service sur le site' },
  { id: 'chatgpt', label: 'Ce que ChatGPT doit pouvoir lire' },
  { id: 'ordre', label: 'L’inscription à l’Ordre, un signal à montrer' },
  { id: 'etapes', label: 'Dans quel ordre tout corriger' },
  { id: 'inutile', label: 'Quand ce travail ne sert à rien' },
];

const FAQ = [
  {
    q: 'Comment un opticien à Douala peut-il être plus visible sur Google ?',
    a: 'Il doit d’abord posséder et valider sa fiche d’établissement Google, avec la catégorie Opticien, l’adresse exacte, les horaires réels et des photos de la vitrine. Il doit ensuite recevoir des avis réguliers de ses patients et publier sur son site une page par service. Google classe les résultats locaux selon la pertinence, la distance et la notoriété.',
  },
  {
    q: 'Pourquoi les annuaires apparaissent-ils avant mon cabinet d’optique sur Google ?',
    a: 'Parce qu’ils publient des pages que Google peut lire et relier à la recherche, alors que beaucoup de cabinets n’ont ni site, ni page par service, ni fiche complète. Une liste d’opticiens ou un annuaire répond à la question posée ; une fiche vide ne répond à rien. Le cabinet repasse devant quand sa fiche et son site décrivent précisément ce qu’il fait et où.',
  },
  {
    q: 'Faut-il payer Google pour apparaître en premier sur Google Maps ?',
    a: 'Non. Google indique qu’il n’existe aucun moyen d’obtenir une meilleure place dans le classement local sur demande ou contre rémunération. La fiche d’établissement est gratuite. Les annonces payantes existent, mais elles sont affichées comme annonces et ne changent pas le classement local lui-même.',
  },
  {
    q: 'Comment obtenir plus d’avis Google pour un cabinet d’optique ?',
    a: 'Demandez un avis à chaque patient au moment où il récupère ses lunettes, avec un lien direct vers votre fiche envoyé par WhatsApp. Demandez-le à tous les patients, pas seulement aux plus satisfaits, car les règles de Google interdisent de trier les clients selon leur note. Répondez ensuite à chaque avis, positif ou négatif.',
  },
  {
    q: 'Comment faire recommander mon cabinet d’optique par ChatGPT ?',
    a: 'Les assistants d’IA construisent leurs réponses à partir de pages qu’ils peuvent lire. Un cabinet qui publie son adresse, ses services, ses horaires et ses tarifs indicatifs sur son propre site, et dont le nom revient de façon identique sur sa fiche Google et dans les annuaires, a plus de chances d’être cité. Aucune méthode ne garantit une recommandation.',
  },
  {
    q: 'Un opticien doit-il afficher son inscription à l’Ordre sur Internet ?',
    a: 'C’est conseillé. L’Ordre National des Opticiens du Cameroun publie un annuaire des opticiens inscrits au tableau, par région. Indiquer sur son site et dans la description de sa fiche que le cabinet est inscrit à l’Ordre donne au patient une information vérifiable et le distingue des établissements qui ne le sont pas.',
  },
];

const STEPS = [
  {
    name: 'Revendiquer ou créer la fiche d’établissement Google',
    text: 'Cherchez le cabinet sur Google Maps. Revendiquez la fiche si elle existe, créez-la sinon, sur un compte Google que le cabinet contrôle, puis validez-la.',
  },
  {
    name: 'Choisir la catégorie Opticien et compléter la fiche',
    text: 'Catégorie principale Opticien, adresse avec le repère posé sur la porte, horaires réellement tenus, numéro WhatsApp au format +237 et photos de la vitrine, de l’enseigne et de la salle d’examen.',
  },
  {
    name: 'Aligner le nom, l’adresse et le téléphone partout',
    text: 'Écrivez le nom, l’adresse et le téléphone exactement de la même façon sur la fiche, le site, la page Facebook et chaque annuaire où le cabinet apparaît.',
  },
  {
    name: 'Demander un avis à chaque patient',
    text: 'Envoyez le lien de la fiche par WhatsApp quand le patient récupère ses lunettes, à tous les patients, et répondez à chaque avis.',
  },
  {
    name: 'Publier une page par service',
    text: 'Examen de la vue, verres progressifs, lentilles, lunettes pour enfants, réparation : une page chacune, avec ce que comprend le service, sa durée et un tarif indicatif si le cabinet en pratique un.',
  },
  {
    name: 'Montrer l’inscription à l’Ordre',
    text: 'Indiquez sur le site et dans la description de la fiche que le cabinet est inscrit au tableau de l’Ordre National des Opticiens du Cameroun.',
  },
  {
    name: 'Vérifier ce que répondent Google et ChatGPT',
    text: 'Tous les mois, cherchez « opticien » suivi de votre quartier sur Google, et posez la même question à ChatGPT. Notez qui est cité, et pourquoi.',
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
        data={howToJsonLd(STEPS, 'Améliorer la visibilité Google d’un opticien à Douala')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          La visibilité Google pour un opticien à Douala dépend de trois choses que Google cite
          lui-même : <strong>la pertinence, la distance et la notoriété</strong>. Concrètement, le
          cabinet doit posséder une fiche d’établissement Google validée, dans la catégorie
          Opticien, avec l’adresse exacte, les horaires réels et des photos de la vitrine. Il doit
          ensuite <strong>recevoir des avis de ses patients chaque semaine</strong> et publier sur
          son site une page par service. Sans cela, ce sont le registre de l’Ordre, des listes en
          PDF et les annuaires qui apparaissent à sa place quand un patient cherche un opticien à
          Douala.
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
              Brigitte dirige un cabinet d’optique à Bonapriso depuis neuf ans. Elle a un
              optométriste, une salle d’examen bien équipée, un mur de montures et une clientèle
              fidèle qui la recommande à ses collègues de bureau.
            </p>
            <p>
              Un samedi, sa nièce lui montre ce que donne la recherche « opticien Bonapriso » sur
              son téléphone. En haut, une liste d’opticiens en PDF, puis un annuaire en ligne avec
              un numéro qui n’est plus le sien depuis 2021, puis deux concurrents. Le cabinet de
              Brigitte apparaît sur la carte, à peu près à sa place, sans photo, avec trois avis et
              les horaires des fêtes de fin d’année d’il y a deux ans.
            </p>
            <p>
              Sa nièce pose ensuite la même question à ChatGPT. La réponse cite une chaîne
              d’optique et conseille de « vérifier l’inscription à l’Ordre ». Brigitte est
              inscrite. Internet n’est pas au courant.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide s’adresse aux propriétaires de cabinets d’optique à Douala, d’Akwa à
          Bonamoussadi. Il explique pourquoi les listes et les annuaires passent devant le cabinet,
          ce que Google et les assistants d’IA ont besoin de trouver pour le recommander, et dans
          quel ordre corriger. La création de la fiche elle-même est détaillée dans{' '}
          <a href="/blog/creer-sa-fiche-etablissement-google-au-cameroun">
            notre guide pour créer sa fiche d’établissement Google au Cameroun
          </a>
          ; la stratégie d’ensemble, tous secteurs confondus, dans{' '}
          <a href="/blog/referencement-naturel-douala">
            notre guide du référencement naturel à Douala
          </a>
          .
        </p>

        <h2 id="annuaires">Pourquoi le registre et les annuaires passent avant le cabinet</h2>

        <p>
          Les listes et les annuaires passent devant beaucoup de cabinets d’optique à Douala parce
          qu’ils publient des pages que Google peut lire et rattacher à la recherche, alors que le
          cabinet n’en publie aucune. Quand un patient tape « opticien Douala », Google cherche
          des pages qui parlent d’opticiens à Douala. Une liste d’opticiens autorisés, même
          ancienne et téléchargée en PDF, en parle. Une fiche sans description, sans photo et sans
          site n’en parle presque pas.
        </p>

        <p>
          Sur la recherche « visibilité google opticien douala » elle-même, la première page
          observée en novembre 2026 montrait des cabinets et des chaînes, une liste d’opticiens
          sur Scribd, des annuaires et des profils de réseaux sociaux. Aucun article n’expliquait
          aux opticiens comment remonter. C’est un marché où le cabinet qui décrit correctement ce
          qu’il fait a peu de concurrence sérieuse, ce qui est rare et ne durera pas.
        </p>

        <p>
          Le problème n’est donc pas que Google préfère les annuaires. C’est que l’annuaire a
          fait ses devoirs et pas le cabinet. L’annuaire n’a pourtant jamais réglé une monture de
          sa vie.
        </p>

        <h2 id="criteres">Ce que Google regarde pour classer un opticien à Douala</h2>

        <p>
          Google indique que les résultats locaux sont principalement basés sur trois critères :
          la pertinence, la distance et la notoriété. Il précise aussi qu’il n’existe aucun moyen
          d’obtenir une meilleure place dans le classement local sur demande ou contre
          rémunération. Pour un cabinet d’optique, chacun de ces critères se traduit en travail
          concret.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Critère de Google</th>
                <th>Ce qu’il veut dire pour un opticien</th>
                <th>Ce que le cabinet contrôle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pertinence</td>
                <td>La fiche correspond-elle à « opticien », « lunettes », « examen de vue » ?</td>
                <td>Catégorie Opticien, description, services, pages du site</td>
              </tr>
              <tr>
                <td>Distance</td>
                <td>Le cabinet est-il proche du patient qui cherche ?</td>
                <td>Une adresse exacte et un repère posé sur la bonne porte, rien de plus</td>
              </tr>
              <tr>
                <td>Notoriété</td>
                <td>Le cabinet est-il connu, cité, recommandé ?</td>
                <td>Nombre et régularité des avis, sites qui renvoient vers le cabinet</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          La distance ne se négocie pas : un cabinet d’Akwa ne sortira pas en premier pour un
          patient de Logbessou qui cherche « opticien près de moi ». La pertinence et la notoriété,
          en revanche, se travaillent, et Google le dit lui-même : la notoriété s’appuie notamment
          sur le nombre de sites qui renvoient vers l’établissement et sur le nombre d’avis reçus.
        </p>

        <h2 id="fiche">La fiche Google d’un cabinet d’optique, champ par champ</h2>

        <p>
          Une fiche d’opticien qui se classe bien est validée, rangée dans la catégorie Opticien
          et complète, car Google indique que les établissements qui fournissent des informations
          complètes et exactes ont plus de chances d’apparaître dans les résultats à proximité. Une
          fiche ajoutée un jour par un patient, jamais revendiquée, ne remplit aucune de ces
          conditions.
        </p>

        <ul>
          <li>
            <strong>La catégorie principale.</strong> Opticien. Si un ophtalmologue consulte dans
            les mêmes locaux, c’est en général à lui d’avoir sa propre fiche, dans sa propre
            catégorie, plutôt que de tout mélanger sur celle du magasin.
          </li>
          <li>
            <strong>Le nom.</strong> Celui de l’enseigne, sans « meilleur opticien de Douala » ni
            liste de marques de montures. Les consignes de Google interdisent d’ajouter des mots
            clés au nom de l’établissement.
          </li>
          <li>
            <strong>L’adresse et le repère.</strong> Quartier, rue, étage, puis le repère déplacé à
            la main sur l’entrée. Beaucoup de cabinets sont au premier étage d’un immeuble ; dites
            lequel, et par quelle porte on y monte.
          </li>
          <li>
            <strong>Les horaires.</strong> Ceux que vous tenez réellement, avec les horaires
            exceptionnels des jours fériés. Un patient qui trouve la grille fermée un samedi
            affiché ouvert ne laisse pas d’avis aimable.
          </li>
          <li>
            <strong>Le téléphone.</strong> Le numéro +237 qui sert aussi au WhatsApp du cabinet,
            puisque c’est par là que la plupart des patients prennent rendez-vous.
          </li>
          <li>
            <strong>Les photos.</strong> L’enseigne vue de la rue, l’entrée, le mur de montures, la
            salle d’examen. Le patient veut savoir s’il trouvera la porte et si le cabinet a l’air
            sérieux.
          </li>
          <li>
            <strong>La description.</strong> Ce que fait le cabinet, en phrases simples : examen de
            la vue, verres simples et progressifs, lentilles, lunettes pour enfants, réparation.
          </li>
        </ul>

        <h2 id="avis">Les avis : réguliers, à tous les patients, sans les filtrer</h2>

        <p>
          Les avis comptent pour un opticien parce que Google indique que plus un établissement
          reçoit d’avis et de notes positives, plus il grimpe dans le classement local. Un cabinet
          d’optique a un avantage que peu de commerces ont : chaque patient revient au moins une
          fois, pour récupérer ses lunettes, et c’est le meilleur moment pour demander.
        </p>

        <ul>
          <li>
            <strong>Demandez au retrait des lunettes.</strong> Le patient voit net, il est content,
            il a son téléphone à la main pour essayer ses nouveaux verres sur l’écran.
          </li>
          <li>
            <strong>Envoyez le lien par WhatsApp.</strong> Un lien direct vers la fiche, dans la
            même conversation que la confirmation de commande. Une carte avec un QR code sur le
            comptoir complète, sans remplacer.
          </li>
          <li>
            <strong>Demandez à tout le monde.</strong> Les règles de Google interdisent de trier
            les clients selon leur satisfaction avant de leur proposer de laisser un avis, et
            interdisent aussi d’offrir une contrepartie. Pas de réduction contre cinq étoiles.
          </li>
          <li>
            <strong>Répondez à chaque avis.</strong> Google indique que répondre montre que vous
            accordez de l’importance aux commentaires. Pour un avis négatif sur un délai de
            livraison de verres, une réponse calme et factuelle rassure davantage le lecteur
            suivant que le silence. Ne mentionnez jamais l’état de santé d’un patient dans une
            réponse publique.
          </li>
        </ul>

        <p>
          La régularité compte plus qu’une vague. Vingt avis arrivés la même semaine, puis plus
          rien pendant un an, ressemblent à une campagne ; deux avis par semaine pendant un an
          ressemblent à un cabinet qui travaille.
        </p>

        <h2 id="pages">Une page par service sur le site du cabinet</h2>

        <p>
          Un opticien à Douala a besoin d’un site avec une page par service, parce que c’est la
          page, et pas la fiche, qui répond aux recherches précises comme « verres progressifs
          Douala » ou « lunettes enfant Douala ». La fiche Google dit où se trouve le cabinet. La
          page dit ce qu’il fait, comment, et pour qui.
        </p>

        <p>Les pages qui servent le plus à un cabinet d’optique :</p>

        <ul>
          <li>
            <strong>Examen de la vue.</strong> Qui le réalise, combien de temps il dure, s’il faut
            prendre rendez-vous, ce que le patient doit apporter.
          </li>
          <li>
            <strong>Verres progressifs.</strong> Pour qui, le temps d’adaptation, la fourchette de
            prix si vous en pratiquez une.
          </li>
          <li>
            <strong>Lentilles de contact.</strong> Adaptation, suivi, entretien.
          </li>
          <li>
            <strong>Lunettes pour enfants.</strong> Les parents cherchent spécifiquement, et peu de
            cabinets ont une page sur le sujet.
          </li>
          <li>
            <strong>Réparation et ajustement.</strong> Une recherche fréquente et urgente, qui
            amène des patients qui reviendront pour la paire suivante.
          </li>
        </ul>

        <p>
          Sur chaque page, mettez l’adresse, le quartier, les horaires et le bouton WhatsApp. Si
          vous pratiquez des tarifs indicatifs en FCFA, publiez-les : un patient qui compare trois
          cabinets depuis son téléphone appelle d’abord celui qui a répondu à sa question avant
          qu’il la pose. Si vos prix dépendent de l’ordonnance, dites-le et donnez un point de
          départ. Une page qui dit « contactez-nous pour un devis » à chaque ligne est une page
          qui n’aime pas qu’on la lise.
        </p>

        <h2 id="chatgpt">Ce que ChatGPT a besoin de lire pour recommander un opticien</h2>

        <p>
          ChatGPT et les autres assistants d’IA recommandent un opticien quand ils trouvent sur le
          web des pages qui le décrivent clairement : son nom, sa ville, son quartier, ses
          services et des informations concordantes d’une source à l’autre. Un cabinet qui
          n’existe que sur une fiche Google incomplète et une page Facebook laisse l’assistant
          sans matière, et l’assistant cite alors une chaîne ou renvoie vers l’Ordre.
        </p>

        <ul>
          <li>
            <strong>Un site qui se lit sans JavaScript.</strong> Le nom du cabinet, l’adresse et
            les services doivent apparaître dans le texte de la page, pas seulement dans une image
            ou une vidéo.
          </li>
          <li>
            <strong>Le même nom partout.</strong> Si le cabinet s’appelle d’une façon sur Google,
            d’une autre sur Facebook et d’une troisième dans l’annuaire, l’assistant peut croire
            qu’il s’agit de trois établissements, ou d’aucun.
          </li>
          <li>
            <strong>Des réponses aux questions des patients.</strong> Une courte page de questions
            fréquentes, avec les vraies questions posées au comptoir, donne à l’assistant des
            phrases qu’il peut reprendre.
          </li>
        </ul>

        <p>
          Personne ne peut garantir qu’un assistant d’IA recommandera un cabinet donné. Pour
          savoir où vous en êtes aujourd’hui, posez la question vous-même, comme le montre{' '}
          <a href="/blog/how-to-check-if-chatgpt-recommends-your-business-in-africa">
            notre méthode pour vérifier si ChatGPT recommande votre entreprise
          </a>
          , en anglais, ou demandez notre{' '}
          <Link href="/ai-visibility-check">vérification gratuite de visibilité dans l’IA</Link>
          , qui interroge ChatGPT, Perplexity et Gemini et vous envoie les captures d’écran.
        </p>

        <h2 id="ordre">L’inscription à l’Ordre, un signal à montrer</h2>

        <p>
          Un opticien inscrit à l’Ordre a intérêt à le dire en ligne, parce que l’Ordre National
          des Opticiens du Cameroun publie un annuaire des opticiens inscrits au tableau, par
          région, et que c’est une information que le patient peut vérifier. L’Ordre est placé
          sous la tutelle du ministère de la Santé publique, et la question de l’exercice illégal
          de la profession revient régulièrement dans la presse camerounaise.
        </p>

        <p>
          Pour un patient qui hésite entre deux cabinets, l’inscription est un argument simple et
          concret. Mentionnez-la sur la page d’accueil du site, sur la page À propos, et en une
          phrase dans la description de la fiche Google. Vérifiez au passage que le nom du cabinet
          dans l’annuaire de l’Ordre est écrit comme sur votre enseigne. C’est la seule liste qui
          passe avant vous sur Google et dont vous pouvez être fier d’apparaître.
        </p>

        <h2 id="etapes">Dans quel ordre tout corriger</h2>

        <p>
          Un cabinet d’optique à Douala corrige sa visibilité dans cet ordre : la fiche d’abord,
          les avis ensuite, le site après, parce que chaque étape s’appuie sur la précédente. Une
          page de service bien écrite qui renvoie vers une fiche non validée, avec un ancien numéro,
          perd le patient au dernier moment.
        </p>

        <ol>
          {STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          Les deux premières étapes tiennent en une semaine et ne coûtent rien. Les avis prennent
          des mois, par nature. Les pages du site prennent quelques jours à écrire et plusieurs
          semaines à être prises en compte. Pour confier tout ou partie de ce travail, notre{' '}
          <Link href="/ai-seo/douala">service de référencement à Douala</Link> le couvre, et la{' '}
          <Link href="/pricing">page des tarifs</Link> présente les formules.
        </p>

        <h2 id="inutile">Quand ce travail ne sert à rien</h2>

        <p>
          Ce travail ne sert à rien pour un cabinet qui ne peut pas accueillir plus de patients,
          ou dont tous les patients arrivent par une autre voie. Un cabinet d’optique installé dans
          une clinique, qui reçoit les patients envoyés par l’ophtalmologue de l’étage, n’a pas
          besoin d’être premier sur « opticien Douala ». Un cabinet complet trois semaines à
          l’avance non plus, sauf s’il compte s’agrandir.
        </p>

        <p>
          Il ne sert à rien non plus de payer quelqu’un pour les deux premières étapes. La fiche
          est gratuite, la validation aussi, et nous l’avons expliqué en détail ailleurs, ce qui
          n’est pas notre meilleure idée commerciale de l’année. Enfin, si le cabinet n’est pas
          encore inscrit à l’Ordre, c’est par là qu’il faut commencer : une meilleure visibilité
          amène des patients qui finiront par vérifier.
        </p>

        <p>
          Pour une clinique ou un centre médical, les règles de déontologie changent la donne :
          nous les détaillons dans{' '}
          <a href="/blog/marketing-digital-clinique-cameroun">
            notre guide du marketing digital pour une clinique au Cameroun
          </a>
          .
        </p>

        <p>
          Pour comparer avec les autres secteurs, notre{' '}
          <a href="/blog/barometre-ia-cameroun-2026">Baromètre IA Cameroun 2026</a> montre ce que
          les assistants d’IA répondent aujourd’hui sur les entreprises camerounaises.
        </p>

        <p>
          Brigitte a revendiqué sa fiche, remplacé les horaires des fêtes, posé le repère sur la
          porte de l’immeuble et ajouté six photos. Elle envoie maintenant le lien de la fiche par
          WhatsApp à chaque patient qui récupère ses lunettes, et son site a cinq pages de service
          au lieu d’une page d’accueil. Elle a aussi écrit, en une phrase, qu’elle est inscrite à
          l’Ordre. Sa nièce vérifie le classement tous les samedis, ce que Brigitte n’a jamais
          demandé.
        </p>
      </PostShell>
    </>
  );
}
