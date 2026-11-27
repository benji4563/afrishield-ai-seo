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

const post = getPost('marketing-digital-clinique-cameroun')!;

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
  { id: 'regle', label: 'La règle camerounaise que les guides oublient' },
  { id: 'comparaison', label: 'Guides importés et réalité locale' },
  { id: 'fiche', label: 'La fiche Google de la clinique' },
  { id: 'whatsapp', label: 'WhatsApp, la vraie ligne de rendez-vous' },
  { id: 'avis', label: 'Les avis, sans briser le secret médical' },
  { id: 'site', label: 'Un site qui informe, une page par service' },
  { id: 'chatgpt', label: 'Être cité par ChatGPT' },
  { id: 'etapes', label: 'Dans quel ordre faire le travail' },
  { id: 'inutile', label: 'Ce qu’une clinique peut laisser de côté' },
];

const FAQ = [
  {
    q: 'Comment faire la promotion d’une clinique au Cameroun ?',
    a: 'En publiant des informations exactes et utiles plutôt qu’en faisant de la réclame : une fiche d’établissement Google complète, un numéro WhatsApp qui répond, un site avec une page par service, et des avis demandés à tous les patients. Le Code de déontologie des médecins du Cameroun interdit la publicité qui n’a pas un but exclusivement scientifique ou éducatif, ce qui exclut la plupart des méthodes promotionnelles conseillées par les guides étrangers.',
  },
  {
    q: 'Un médecin a-t-il le droit de faire de la publicité au Cameroun ?',
    a: 'Le décret n° 83-166 du 12 avril 1983 portant Code de déontologie des médecins interdit tout procédé direct ou indirect de publicité ou de réclame touchant à la médecine qui n’a pas exclusivement un but scientifique ou éducatif. Il limite aussi ce qu’un médecin peut indiquer dans un annuaire et sur la plaque de son cabinet. En cas de doute sur une action précise, l’Ordre National des Médecins du Cameroun est l’autorité à consulter.',
  },
  {
    q: 'Faut-il payer Google pour que sa clinique apparaisse en premier ?',
    a: 'Non. Google indique qu’il n’existe aucun moyen d’obtenir une meilleure place au classement local sur demande ou contre rémunération. Les résultats à proximité dépendent principalement de la pertinence, de la distance et de la popularité de l’établissement. La fiche d’établissement Google est gratuite.',
  },
  {
    q: 'Comment obtenir des avis Google pour une clinique sans enfreindre le secret médical ?',
    a: 'Envoyez à chaque patient, après sa consultation, un lien direct vers la fiche Google, sans mentionner le soin reçu. Dans les réponses publiques, remerciez sans jamais confirmer qu’une personne est patiente ni évoquer son état de santé, et proposez un échange privé en cas de plainte. Les règles de Google interdisent aussi d’offrir une contrepartie ou de ne solliciter que les patients satisfaits.',
  },
  {
    q: 'Comment faire recommander sa clinique par ChatGPT ?',
    a: 'Les assistants d’IA s’appuient sur des pages qu’ils peuvent lire. Une clinique dont le site décrit en texte ses services, son adresse, ses horaires et ses médecins, et dont le nom est écrit de la même façon sur la fiche Google et dans les annuaires, leur donne de quoi la citer. Aucune méthode ne garantit qu’un assistant recommandera un établissement donné.',
  },
  {
    q: 'WhatsApp, Facebook ou site web : par quoi une clinique doit-elle commencer ?',
    a: 'Par la fiche Google et le numéro WhatsApp, parce que ce sont eux que le patient voit et utilise en premier, et qu’ils ne coûtent rien. Le site vient ensuite, car c’est lui qui répond aux recherches précises et que les assistants d’IA lisent. La page Facebook complète, sans remplacer ni l’un ni l’autre.',
  },
];

const STEPS = [
  {
    name: 'Revendiquer et compléter la fiche d’établissement Google',
    text: 'Revendiquez la fiche de la clinique ou créez-la sur un compte Google que la clinique contrôle, validez-la, puis remplissez la catégorie, l’adresse avec le repère sur la bonne entrée, les horaires réels, le numéro WhatsApp et des photos de l’accueil.',
  },
  {
    name: 'Faire du numéro WhatsApp une vraie ligne de rendez-vous',
    text: 'Un compte WhatsApp Business au nom de la clinique, tenu par l’accueil aux heures d’ouverture, avec un message d’absence qui donne les horaires et le numéro des urgences.',
  },
  {
    name: 'Aligner le nom, l’adresse et le téléphone partout',
    text: 'Écrivez-les exactement de la même façon sur la fiche Google, le site, la page Facebook et chaque annuaire où la clinique apparaît.',
  },
  {
    name: 'Demander un avis à chaque patient',
    text: 'Un lien direct vers la fiche, envoyé par WhatsApp après la consultation, à tous les patients, sans contrepartie et sans mentionner le soin reçu.',
  },
  {
    name: 'Publier une page par service sur le site',
    text: 'Médecine générale, pédiatrie, gynécologie, laboratoire, imagerie : une page chacune, avec ce que comprend le service, les jours de consultation et la façon de prendre rendez-vous.',
  },
  {
    name: 'Faire relire les contenus au regard de la déontologie',
    text: 'Chaque page doit informer, pas vanter. En cas de doute, l’Ordre de la profession concernée tranche.',
  },
  {
    name: 'Vérifier tous les mois ce que répondent Google et ChatGPT',
    text: 'Cherchez « clinique » suivi de votre quartier sur Google, posez la même question à ChatGPT, et notez qui est cité. À l’accueil, notez aussi comment chaque nouveau patient a connu la clinique : fiche Google, WhatsApp, bouche-à-oreille ou site.',
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
        data={howToJsonLd(STEPS, 'Mettre en place le marketing digital d’une clinique au Cameroun')}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Le marketing digital pour une clinique au Cameroun consiste surtout à{' '}
          <strong>publier des informations exactes là où les patients cherchent</strong> : une
          fiche d’établissement Google complète, un numéro WhatsApp qui répond, des avis demandés à
          chaque patient et un site avec une page par service. Ce n’est pas de la publicité au sens
          des guides français ou marocains, car le{' '}
          <strong>Code de déontologie des médecins du Cameroun</strong> (décret n° 83-166 du 12
          avril 1983) interdit la publicité et la réclame qui n’ont pas un but exclusivement
          scientifique ou éducatif. À Douala comme à Yaoundé, informer clairement est à la fois la
          méthode autorisée et celle qui fonctionne sur Google et dans les assistants d’IA.
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
              Le docteur Estelle dirige une clinique de quartier à Bonamoussadi : deux médecins
              généralistes, une sage-femme, un petit laboratoire, une salle d’attente qui ne
              désemplit pas le lundi matin.
            </p>
            <p>
              Un commercial lui propose un « pack croissance » : campagnes payantes par
              pathologie, publications quotidiennes sur Instagram, un concours avec une
              consultation offerte au gagnant. Le devis est en FCFA, la brochure, elle, vient
              visiblement d’ailleurs.
            </p>
            <p>
              Le même soir, une patiente lui dit qu’elle a failli aller ailleurs : en cherchant
              « clinique Bonamoussadi » sur son téléphone, elle est tombée sur un numéro qui ne
              répondait pas. C’était l’ancien numéro de la clinique, encore affiché sur une fiche
              Google que personne n’a jamais revendiquée.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide s’adresse aux promoteurs et aux médecins-chefs de cliniques privées, de
          cabinets de groupe et de centres médicaux à Douala et à Yaoundé. Il explique ce que la
          déontologie camerounaise permet, pourquoi la plupart des conseils importés ne
          s’appliquent pas, et dans quel ordre faire le travail qui amène réellement des patients.
          Pour un cabinet d’optique, voyez aussi{' '}
          <a href="/blog/visibilite-google-opticien-douala">
            notre guide de la visibilité Google d’un opticien à Douala
          </a>
          .
        </p>

        <h2 id="regle">La règle camerounaise que les guides de marketing médical oublient</h2>

        <p>
          Au Cameroun, un médecin ne peut pas faire de publicité commerciale pour sa pratique : le
          décret n° 83-166 du 12 avril 1983 portant Code de déontologie des médecins interdit
          « tout procédé direct ou indirect de publicité ou de réclame » touchant à la médecine
          qui n’a pas exclusivement un but scientifique ou éducatif. Le texte, publié par l’Ordre
          National des Médecins du Cameroun, encadre aussi ce qu’un médecin peut indiquer dans un
          annuaire : ce qui facilite ses relations avec les patients, ses titres et
          qualifications reconnus, ses distinctions scientifiques.
        </p>

        <p>
          Le texte fixe aussi ce qui peut figurer à la porte du cabinet (noms, titres,
          qualifications, jours et heures de consultation, étage) et précise que la plaque ne doit
          pas dépasser 25 cm sur 30. Le rédacteur de 1983 n’avait pas prévu Instagram, mais
          l’esprit du texte se transpose sans effort : informer, oui ; vanter, non.
        </p>

        <p>
          Sur la recherche « marketing digital pour clinique au Cameroun », la première page
          consultée le 27 novembre 2026 montrait des pages d’agences, un plan de communication
          d’étudiant sur Scribd, un guide écrit pour les cliniques du Maroc, une agence lyonnaise
          et un article camerounais sur les avis patients. Aucune ne mentionnait ce décret. Ce
          guide n’est pas un avis juridique : pour une action précise, l’Ordre de votre profession
          reste l’autorité. Les chirurgiens-dentistes et les opticiens ont leurs propres ordres et
          leurs propres règles.
        </p>

        <h2 id="comparaison">Ce que conseillent les guides importés, et ce qui s’applique ici</h2>

        <p>
          La plupart des méthodes recommandées par les guides français et marocains de marketing
          médical sont soit interdites, soit inutiles pour une clinique camerounaise, et les
          méthodes qui restent sont gratuites ou presque. Le tableau suivant reprend les conseils
          les plus fréquents de la première page et leur équivalent local.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Conseil des guides importés</th>
                <th>Pour une clinique à Douala ou Yaoundé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Campagnes publicitaires par pathologie</td>
                <td>
                  À exclure pour une pratique médicale : c’est exactement la réclame que vise le
                  décret
                </td>
              </tr>
              <tr>
                <td>Système de prise de rendez-vous en ligne</td>
                <td>
                  Le patient écrit sur WhatsApp ; un numéro qui répond vaut mieux qu’un module de
                  réservation que personne n’ouvre
                </td>
              </tr>
              <tr>
                <td>Témoignages et études de cas de patients</td>
                <td>
                  Risqué au regard du secret médical ; préférez les avis Google laissés librement
                  par les patients
                </td>
              </tr>
              <tr>
                <td>Fiche Google optimisée</td>
                <td>Indispensable, gratuite, et d’abord une affaire d’exactitude</td>
              </tr>
              <tr>
                <td>Contenus éducatifs écrits ou relus par des médecins</td>
                <td>
                  Autorisés et utiles : c’est le seul « but éducatif » que le texte reconnaît
                  expressément
                </td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Il y a une ironie commerciale à cela : le pack le plus cher est souvent le moins
          compatible avec le Code. Le docteur Estelle peut ranger la brochure ; elle n’en aura pas
          besoin.
        </p>

        <h2 id="fiche">La fiche Google de la clinique, la première vitrine</h2>

        <p>
          La fiche d’établissement Google est le premier outil de marketing d’une clinique, parce
          que c’est elle que le patient voit quand il cherche « clinique » suivi de son quartier,
          et parce que Google classe les résultats à proximité principalement selon la pertinence,
          la distance et la popularité. Google précise que des informations complètes et
          détaillées l’aident à afficher la fiche lors des recherches pertinentes.
        </p>

        <ul>
          <li>
            <strong>La catégorie.</strong> Celle qui décrit l’établissement, par exemple clinique
            médicale, pédiatre ou cabinet dentaire. Un médecin qui exerce seul dans la clinique
            peut avoir sa propre fiche, plutôt que de tout regrouper sur celle de l’établissement.
          </li>
          <li>
            <strong>L’adresse et le repère.</strong> À Douala comme à Yaoundé, beaucoup d’adresses
            se donnent par repère : « après la pharmacie », « face à l’école ». Écrivez-le dans la
            description et déplacez le repère de la carte sur l’entrée réelle.
          </li>
          <li>
            <strong>Les horaires.</strong> Ceux de la consultation et, s’il existe, ceux de la
            garde. Une clinique affichée ouverte un dimanche soir et fermée en réalité perd plus
            qu’un patient.
          </li>
          <li>
            <strong>Le téléphone.</strong> Le numéro +237 qui sert aussi au WhatsApp de l’accueil.
          </li>
          <li>
            <strong>Les photos.</strong> La façade vue de la rue, l’entrée, l’accueil, la salle
            d’attente. Jamais un patient identifiable.
          </li>
        </ul>

        <p>
          La distance, elle, ne se travaille pas. Une clinique de Bastos ne sortira pas en premier
          pour une mère de Biyem-Assi qui cherche « pédiatre près de moi » à 22 heures, et c’est
          normal. La pertinence et la popularité, en revanche, dépendent de la clinique. La
          création pas à pas de la fiche est détaillée dans{' '}
          <a href="/blog/creer-sa-fiche-etablissement-google-au-cameroun">
            notre guide pour créer sa fiche d’établissement Google au Cameroun
          </a>
          .
        </p>

        <h2 id="whatsapp">WhatsApp, la vraie ligne de rendez-vous des cliniques camerounaises</h2>

        <p>
          Pour une clinique à Douala ou à Yaoundé, le numéro WhatsApp affiché sur la fiche Google
          fait office de système de réservation, et sa réactivité compte davantage qu’un module de
          rendez-vous en ligne. Le patient qui a trouvé la clinique sur Google ne remplit pas de
          formulaire : il écrit « bonjour, le pédiatre consulte aujourd’hui ? » et attend une
          réponse.
        </p>

        <ul>
          <li>
            <strong>Un compte WhatsApp Business au nom de la clinique,</strong> pas le téléphone
            personnel du promoteur, qui part en vacances avec lui.
          </li>
          <li>
            <strong>Une personne responsable aux heures d’ouverture,</strong> à l’accueil, avec
            des réponses types pour les questions qui reviennent : jours de consultation des
            spécialistes, examens disponibles au laboratoire, documents à apporter.
          </li>
          <li>
            <strong>Un message d’absence utile,</strong> qui donne les horaires et le numéro à
            appeler en cas d’urgence, au lieu d’un silence que le patient interprète comme une
            clinique fermée.
          </li>
        </ul>

        <p>
          Aucune information médicale ne se donne par WhatsApp à quelqu’un dont on n’est pas sûr
          de l’identité. Le canal sert à prendre rendez-vous, pas à rendre des résultats
          d’analyses à un numéro inconnu.
        </p>

        <h2 id="avis">Les avis Google, sans briser le secret médical</h2>

        <p>
          Une clinique doit demander des avis à tous ses patients, parce que Google indique que
          plus un établissement obtient d’avis et de notes positives, plus il grimpe dans le
          classement local, et elle doit y répondre sans jamais révéler qu’une personne est
          patiente. Le secret médical s’applique aussi aux réponses publiques.
        </p>

        <ul>
          <li>
            <strong>Demandez après la consultation,</strong> par WhatsApp, avec un lien direct vers
            la fiche et sans mentionner le soin reçu. Pas en salle d’attente, pas juste après une
            mauvaise nouvelle.
          </li>
          <li>
            <strong>Demandez à tout le monde.</strong> Les règles de Google interdisent aux
            établissements de solliciter des avis positifs de façon sélective, de décourager les
            avis négatifs et d’offrir une contrepartie. Une consultation offerte contre cinq
            étoiles est interdite deux fois : par Google et par l’esprit du Code.
          </li>
          <li>
            <strong>Répondez sans confirmer.</strong> « Merci pour votre message, nous aimerions en
            parler avec vous : appelez l’accueil au numéro de la fiche. » Jamais de diagnostic,
            de traitement ni de date de visite dans une réponse publique.
          </li>
        </ul>

        <p>
          La régularité compte plus que le volume. Quelques avis par semaine pendant un an
          ressemblent à une clinique qui soigne ; quarante avis la même semaine, puis plus rien,
          ressemblent à un cousin très motivé.
        </p>

        <h2 id="site">Un site qui informe, avec une page par service</h2>

        <p>
          Le site d’une clinique doit d’abord informer, avec une page par service, parce que c’est
          la page, pas la fiche, qui répond aux recherches précises comme « gynécologue Akwa » ou
          « laboratoire d’analyses Essos », et parce qu’un contenu qui informe reste dans le cadre
          que le Code reconnaît. Une page qui explique n’est pas une réclame ; une page qui promet
          « les meilleurs soins de Douala » s’en approche dangereusement.
        </p>

        <ul>
          <li>
            <strong>Une page par service :</strong> médecine générale, pédiatrie, gynécologie,
            laboratoire, imagerie, selon ce que la clinique propose réellement.
          </li>
          <li>
            <strong>Sur chaque page :</strong> ce que comprend le service, qui le réalise (titres
            et qualifications reconnus, comme le permet le texte), les jours de consultation, le
            quartier, le numéro WhatsApp.
          </li>
          <li>
            <strong>Une page de questions fréquentes</strong> reprenant les vraies questions posées
            à l’accueil : faut-il être à jeun pour une prise de sang, la clinique accepte-t-elle
            les assurances, que faut-il apporter pour une première consultation.
          </li>
          <li>
            <strong>Les tarifs, avec prudence.</strong> Une fourchette en FCFA pour une
            consultation ou un examen aide le patient à décider ; vérifiez auprès de votre Ordre
            que l’affichage ne pose pas de difficulté avant de la publier.
          </li>
        </ul>

        <p>
          Le site doit se lire sans JavaScript et sans image : le nom de la clinique, l’adresse et
          les services écrits dans le texte de la page, pas dans une affiche scannée. Un site dont
          tout le contenu est une image de la plaquette imprimée ressemble beaucoup à une plaque
          de 25 cm sur 30, en plus lent à charger.
        </p>

        <h2 id="chatgpt">Être cité par ChatGPT quand un patient demande une clinique</h2>

        <p>
          ChatGPT et les autres assistants d’IA citent une clinique quand ils trouvent sur le web
          des pages qui la décrivent clairement et de façon concordante : son nom, sa ville, son
          quartier, ses services, ses médecins. Une clinique qui n’existe qu’à travers une page
          Facebook et une fiche Google incomplète ne leur laisse rien à reprendre, et l’assistant
          cite alors un hôpital public ou une grande structure privée.
        </p>

        <ul>
          <li>
            <strong>Le même nom partout.</strong> « Clinique X », « Centre médical X » et « CM X
            Bonamoussadi » peuvent être lus comme trois établissements différents.
          </li>
          <li>
            <strong>Des phrases que l’assistant peut reprendre.</strong> La page de questions
            fréquentes, écrite simplement, est souvent ce qu’un assistant lit le plus volontiers.
          </li>
          <li>
            <strong>Des pages lisibles par les robots.</strong> Un site en texte, rapide, sans
            contenu caché derrière des menus qui ne s’ouvrent qu’au clic.
          </li>
        </ul>

        <p>
          Personne ne peut garantir qu’un assistant recommandera une clinique donnée. Pour savoir
          ce qu’il répond aujourd’hui sur la vôtre, demandez notre{' '}
          <Link href="/ai-visibility-check">vérification gratuite de visibilité dans l’IA</Link>,
          qui interroge ChatGPT, Perplexity et Gemini et vous envoie les captures d’écran. Nos
          études sur ce que les assistants répondent à propos des entreprises africaines sont
          regroupées sur la page <Link href="/research">AfriShield Research</Link>, dont le{' '}
          <a href="/blog/barometre-ia-cameroun-2026">Baromètre IA Cameroun 2026</a>.
        </p>

        <h2 id="etapes">Dans quel ordre faire le travail</h2>

        <p>
          Une clinique camerounaise met en place son marketing digital dans cet ordre : la fiche
          Google, puis WhatsApp, puis les avis, puis le site, parce que chaque étape renvoie vers
          la précédente. Une belle page de service qui affiche un numéro WhatsApp que personne ne
          lit perd le patient au dernier moment.
        </p>

        <ol>
          {STEPS.map((step) => (
            <li key={step.name}>
              <strong>{step.name}.</strong> {step.text}
            </li>
          ))}
        </ol>

        <p>
          Les trois premières étapes tiennent en une semaine et ne coûtent rien d’autre que du
          temps. Les avis prennent des mois, par nature. Les pages du site prennent quelques jours
          à écrire et plusieurs semaines à être prises en compte. Pour confier tout ou partie de
          ce travail, notre <Link href="/ai-seo/douala">service de référencement à Douala</Link>{' '}
          et notre <Link href="/ai-seo/yaounde">service à Yaoundé</Link> le couvrent ; la{' '}
          <Link href="/pricing">page des tarifs</Link> présente les formules. Pour savoir quand une
          agence de marketing digital complète se justifie, voyez{' '}
          <a href="/blog/agence-marketing-digital-douala">
            notre guide de l’agence marketing digital à Douala
          </a>
          .
        </p>

        <h2 id="inutile">Ce qu’une clinique au Cameroun peut laisser de côté</h2>

        <p>
          Une clinique au Cameroun peut laisser de côté les publications quotidiennes sur les
          réseaux sociaux, les concours, les campagnes publicitaires et les applications mobiles,
          parce que soit le Code les exclut, soit le patient ne les utilise pas pour choisir où se
          soigner. Une page Facebook tenue à jour, avec les horaires et le numéro, suffit.
        </p>

        <p>
          Ce travail ne sert pas non plus à grand-chose pour une clinique déjà saturée, qui refuse
          des patients chaque semaine, ou pour un centre qui reçoit l’essentiel de sa patientèle
          par conventions d’entreprise. Mieux vaut alors investir dans l’accueil. Et il n’est pas
          nécessaire de payer qui que ce soit pour les trois premières étapes : nous venons de les
          décrire gratuitement, ce que notre service commercial a accueilli avec un calme
          admirable.
        </p>

        <p>
          Le docteur Estelle a revendiqué la fiche de la clinique, remplacé l’ancien numéro par
          celui du WhatsApp de l’accueil, posé le repère sur la bonne entrée et ajouté des photos
          de la façade. L’accueil envoie désormais le lien de la fiche après chaque consultation.
          Le site a maintenant une page par service et une page de questions fréquentes. La
          brochure du « pack croissance » sert de sous-main.
        </p>
      </PostShell>
    </>
  );
}
