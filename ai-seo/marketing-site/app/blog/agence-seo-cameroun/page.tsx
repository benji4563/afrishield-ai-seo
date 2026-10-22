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

const post = getPost('agence-seo-cameroun')!;

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
  { id: 'role', label: 'Ce qu’une agence SEO doit livrer' },
  { id: 'marche', label: 'Le marché des agences SEO au Cameroun' },
  { id: 'questions', label: 'Les sept questions à poser avant de signer' },
  { id: 'alertes', label: 'Les signaux d’alerte' },
  { id: 'acces', label: 'Qui possède la fiche Google et la Search Console' },
  { id: 'tests', label: 'Deux tests sur le site de l’agence elle-même' },
  { id: 'prix', label: 'Combien coûte une agence SEO au Cameroun' },
  { id: 'pas-agence', label: 'Quand il ne faut pas encore d’agence' },
  { id: 'methode', label: 'Choisir en cinq étapes' },
];

const FAQ = [
  {
    q: 'Comment choisir une agence SEO au Cameroun ?',
    a: 'Demandez à chaque agence des résultats vérifiables dans Google Search Console, la liste des modifications qu’elle apportera au site, et la façon dont elle mesure la réussite. Vérifiez que vous restez propriétaire de votre fiche Google et de votre Search Console. Écartez toute agence qui garantit une position, puisque Google écrit que personne ne peut garantir la première place.',
  },
  {
    q: 'Combien coûte une agence SEO au Cameroun ?',
    a: 'Les forfaits publiés par des agences camerounaises commencent autour de 70 000 FCFA par mois, souvent avec un engagement de douze mois. Sur la plateforme Sortlist, les budgets minimums affichés par les agences SEO du Cameroun allaient de 50 à 3 000 euros par projet en octobre 2026, avec 1 000 euros comme montant le plus fréquent. Le périmètre réel varie beaucoup d’une offre à l’autre.',
  },
  {
    q: 'Une agence SEO peut-elle garantir la première place sur Google ?',
    a: 'Non. Google écrit que personne ne peut garantir la première position dans ses résultats de recherche, et conseille de chercher un autre prestataire si un consultant promet de placer le site en tête. Une agence sérieuse s’engage sur le travail livré et sur des indicateurs mesurables, pas sur une place précise.',
  },
  {
    q: 'Faut-il donner à l’agence la propriété de sa fiche Google ?',
    a: 'Non. L’entreprise doit rester propriétaire principale de sa fiche d’établissement Google et ajouter l’agence comme administrateur. Selon Google, un administrateur peut gérer la fiche mais ne peut ni ajouter ou supprimer des utilisateurs, ni supprimer la fiche. La même logique vaut pour la Search Console, où l’agence peut recevoir un accès utilisateur.',
  },
  {
    q: 'Vaut-il mieux une agence locale ou un freelance au Cameroun ?',
    a: 'Un freelance coûte en général moins cher et convient à un site simple avec un seul service. Une agence apporte plus de capacité pour écrire du contenu en français et en anglais, suivre plusieurs pages et assurer la continuité si une personne part. Le critère décisif reste le même dans les deux cas : des résultats vérifiables et un accès qui reste à votre nom.',
  },
  {
    q: 'En combien de temps une agence SEO obtient-elle des résultats au Cameroun ?',
    a: 'Une fiche Google validée peut apparaître sur Google Maps en quelques semaines. Les recherches de quartier progressent en général en deux à quatre mois, et les recherches à l’échelle d’une ville en six à douze mois. Ce sont des fourchettes observées dans notre travail, pas des garanties, et une bonne agence donne les siennes par écrit avant de signer.',
  },
];

const STEPS = [
  {
    name: 'Écrire le besoin en une page',
    text: 'Notez les trois services les plus rentables, les villes ou quartiers visés, les langues nécessaires et le budget mensuel que l’entreprise peut tenir au moins six mois.',
  },
  {
    name: 'Demander trois propositions comparables',
    text: 'Envoyez la même page à trois prestataires et demandez pour chacun le périmètre mensuel, le livrable écrit, la durée d’engagement et le préavis.',
  },
  {
    name: 'Poser les sept questions de Google',
    text: 'Demandez des exemples et des références, le respect des Essentiels de la recherche Google, les résultats attendus et leur délai, la mesure de la réussite, l’expérience du secteur, l’ancienneté, et la liste des modifications prévues.',
  },
  {
    name: 'Vérifier les accès avant de signer',
    text: 'Faites écrire dans le contrat que l’entreprise reste propriétaire principale de la fiche Google et propriétaire de la Search Console, l’agence recevant un accès administrateur ou utilisateur.',
  },
  {
    name: 'Fixer le rapport mensuel',
    text: 'Convenez d’un rapport court qui montre les impressions, les clics et les positions dans Search Console, les actions de la fiche Google, et le travail livré dans le mois.',
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
      <StructuredData data={howToJsonLd(STEPS, 'Choisir une agence SEO au Cameroun')} />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Pour choisir une <strong>agence SEO au Cameroun</strong>, comparez trois
          propositions sur des critères vérifiables : des résultats visibles dans Google Search
          Console, la liste écrite des modifications prévues, un rapport mensuel lisible, et la
          capacité d’écrire en français et en anglais. Restez propriétaire de votre fiche
          Google et de votre Search Console, et donnez seulement un accès administrateur à
          l’agence. Écartez toute agence qui garantit une position : Google écrit lui-même
          que personne ne peut garantir la première place. Les forfaits publiés au Cameroun
          commencent autour de 70 000 FCFA par mois.
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
              Mireille dirige une clinique dentaire à Bastos, à Yaoundé. Elle a reçu trois
              devis de référencement la même semaine. Le premier promettait « la première page
              de Google en trente jours ». Le deuxième tenait en une ligne et un montant. Le
              troisième demandait, pour commencer, les identifiants du compte Google de la
              clinique.
            </p>
            <p>
              Elle n’avait aucun moyen de savoir lequel était sérieux. Les trois agences
              avaient un beau site, des logos de clients et un numéro WhatsApp. Aucune ne lui
              avait dit ce qu’elle recevrait à la fin du premier mois.
            </p>
            <p>
              Elle n’avait pas un problème de budget. Elle avait un problème de grille de
              lecture.
            </p>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
            Cas illustratif composite — ni un client, ni un témoignage
          </p>
        </div>

        <p>
          Ce guide donne cette grille de lecture, pour une entreprise de Douala, de Yaoundé ou
          d’ailleurs au Cameroun qui veut confier son référencement à un prestataire. Il ne
          réexplique pas le référencement lui-même : notre{' '}
          <a href="/blog/referencement-naturel-douala">
            guide du référencement naturel à Douala
          </a>{' '}
          couvre la fiche Google, les pages de quartier et les délais. Ici, la question est
          plus étroite : à qui confier ce travail, et comment le vérifier.
        </p>

        <p>
          Précision utile avant de commencer : nous sommes nous-mêmes une agence SEO basée à
          Douala. Nous avons donc appliqué chaque critère de ce guide à notre propre offre
          avant de le publier. L’exercice a été instructif, et légèrement moins confortable
          que prévu.
        </p>

        <h2 id="role">Ce qu’une agence SEO au Cameroun doit livrer concrètement</h2>

        <p>
          Une agence SEO au Cameroun doit livrer quatre choses mesurables : un site que Google
          peut lire sans erreur, une fiche d’établissement Google tenue à jour, des pages
          écrites pour les recherches réelles des clients, et un rapport mensuel qui montre ce
          qui a changé. Tout le reste est de la méthode, pas du livrable.
        </p>

        <p>
          Les pages qui se classent aujourd’hui sur « agence SEO Cameroun » sont presque toutes
          des pages de vente : audit, optimisation technique, mots-clés, contenus, suivi.
          L’énumération est juste, et elle est la même partout. Ce qu’elle ne dit pas, c’est ce
          que le client tient entre les mains à la fin du mois. Une bonne proposition le dit :
          tant de pages écrites, telle correction technique, tant de publications sur la fiche
          Google, et un rapport à telle date.
        </p>

        <h2 id="marche">Le marché des agences SEO au Cameroun en 2026</h2>

        <p>
          Le marché camerounais du référencement est jeune, fait de petites équipes et concentré
          à Douala et à Yaoundé, avec quelques prestataires à Bamenda et à Buea.
          Le 22 octobre 2026, la plateforme Sortlist recensait 25 agences SEO au Cameroun, en
          majorité des équipes de un à dix employés.
        </p>

        <p>
          Deux traits ressortent de cette liste. D’abord, la plupart de ces agences font aussi
          de la création de site, de la publicité et de la gestion des réseaux sociaux : le
          référencement est souvent une ligne parmi d’autres, pas un métier à part entière.
          Ensuite, beaucoup affichent un nombre d’avis vérifiés très faible, parfois zéro. Ce
          n’est pas un défaut en soi, le marché est jeune. Mais cela signifie que l’avis client
          ne suffit pas pour trier, et que les preuves doivent venir d’ailleurs.
        </p>

        <p>
          Pour une comparaison des prestataires spécialisés dans la visibilité au sein des
          réponses d’IA à l’échelle du continent, voir notre{' '}
          <a href="/blog/top-geo-ai-seo-agencies-africa-2026">
            panorama des agences GEO et de recherche IA en Afrique
          </a>
          , en anglais.
        </p>

        <h2 id="questions">Les sept questions à poser avant de signer</h2>

        <p>
          Google publie lui-même la liste des questions à poser à un prestataire de
          référencement avant de l’engager, dans sa documentation Search Central. Elles sont au
          nombre de sept, et chacune appelle une réponse vérifiable.
        </p>

        <ol>
          <li>
            <strong>Pouvez-vous montrer des réalisations et des références clients ?</strong>{' '}
            Demandez une capture de Google Search Console avant et après, pas un logo.
          </li>
          <li>
            <strong>Suivez-vous les Essentiels de la recherche Google ?</strong> La réponse
            attendue est oui, avec un exemple de ce que l’agence refuse de faire.
          </li>
          <li>
            <strong>Quels résultats attendez-vous, et sous quel délai ?</strong> Une fourchette
            écrite, par type de recherche.
          </li>
          <li>
            <strong>Comment mesurez-vous la réussite ?</strong> Impressions, clics et positions
            dans Search Console, appels et itinéraires depuis la fiche Google, demandes reçues.
          </li>
          <li>
            <strong>Quelle est votre expérience dans mon secteur ?</strong> Une clinique, un
            transitaire et un hôtel ne se référencent pas de la même façon.
          </li>
          <li>
            <strong>Depuis combien de temps exercez-vous ?</strong> Une agence récente n’est pas
            disqualifiée, mais elle doit compenser par des preuves plus précises.
          </li>
          <li>
            <strong>Me ferez-vous part de toutes les modifications apportées au site ?</strong>{' '}
            La seule réponse acceptable est oui, par écrit, chaque mois.
          </li>
        </ol>

        <p>
          Une agence qui répond à ces sept questions sans détour a déjà passé l’essentiel de
          l’examen. Une agence qui répond « c’est confidentiel » à plus d’une d’entre elles a
          également passé l’examen, mais dans l’autre sens.
        </p>

        <h2 id="alertes">Les signaux d’alerte à reconnaître</h2>

        <p>
          Le premier signal d’alerte est une promesse de position. Google écrit que personne ne
          peut garantir la première position dans ses résultats, et que si un consultant
          garantit de placer votre site en tête, il faut trouver quelqu’un d’autre.
        </p>

        <ul>
          <li>
            <strong>Une « relation privilégiée » avec Google.</strong> Google met en garde
            contre les prestataires qui l’annoncent, ou qui vendent une indexation
            prioritaire. Aucune des deux n’existe. Une agence qui promet la première page en
            trente jours a peut-être un accord avec Google ; Google, lui, n’a pas été prévenu.
          </li>
          <li>
            <strong>Les échanges ou achats de liens en masse.</strong> Google conseille
            d’éviter les prestataires qui vantent ces systèmes. Le risque retombe sur votre
            site, pas sur celui de l’agence.
          </li>
          <li>
            <strong>Un lien obligatoire vers l’agence sur votre site.</strong> Google écrit que
            vous ne devriez jamais avoir à en inclure un.
          </li>
          <li>
            <strong>Le démarchage par e-mail non sollicité.</strong> Google recommande de se
            méfier des prestataires qui vous contactent par e-mail sans y avoir été invités.
          </li>
          <li>
            <strong>Le secret sur les méthodes.</strong> Google conseille la prudence face à un
            prestataire qui se retranche derrière la confidentialité pour ne pas expliquer ce
            qu’il fait.
          </li>
          <li>
            <strong>Une demande de mot de passe du compte Google principal.</strong> Ce n’est
            jamais nécessaire, comme le montre la section suivante.
          </li>
        </ul>

        <h2 id="acces">Qui doit posséder la fiche Google et la Search Console</h2>

        <p>
          L’entreprise doit rester propriétaire de sa fiche d’établissement Google et de sa
          Search Console, et l’agence doit recevoir un accès délégué. C’est le point le plus
          souvent négligé au Cameroun, et le plus coûteux à rattraper quand une collaboration
          se termine mal.
        </p>

        <p>
          Sur une fiche d’établissement, Google distingue trois rôles. Le propriétaire
          principal est unique. Les propriétaires ont un contrôle total, y compris celui de
          supprimer la fiche. Les administrateurs peuvent gérer presque tout, mais Google
          précise qu’ils ne peuvent ni ajouter ou supprimer des utilisateurs, ni supprimer la
          fiche. C’est exactement le rôle qui convient à une agence. Dans la Search Console, la
          logique est la même : seuls les propriétaires peuvent accorder des autorisations, et
          l’agence peut travailler avec un accès utilisateur complet.
        </p>

        <p>
          Confier sa fiche Google à une agence, c’est comme confier sa voiture à un garagiste :
          on lui donne les clés, pas la carte grise. La méthode détaillée pour tenir la fiche
          est dans notre guide{' '}
          <a href="/blog/google-business-profile-optimization">
            d’optimisation de la fiche d’établissement Google
          </a>
          , en anglais.
        </p>

        <h2 id="tests">Deux tests à faire sur le site de l’agence elle-même</h2>

        <p>
          Le moyen le plus rapide de juger une agence SEO est d’appliquer ses promesses à son
          propre site : trouve-t-on l’agence sur Google pour son métier et sa ville, et son site
          est-il lisible par les assistants d’IA ? Les deux vérifications prennent dix minutes
          et ne coûtent rien.
        </p>

        <p>
          <strong>Premier test : la recherche.</strong> Tapez le service de l’agence et sa
          ville, en français puis en anglais, depuis un téléphone. Si l’agence n’apparaît ni
          sur la carte ni dans les résultats, demandez-lui pourquoi. Il peut y avoir une bonne
          raison, comme une création récente. Le cordonnier mal chaussé reste une excuse
          charmante ; ce n’est pas un argument commercial.
        </p>

        <p>
          <strong>Second test : les robots d’IA.</strong> Ajoutez <code>/robots.txt</code> puis{' '}
          <code>/llms.txt</code> à l’adresse du site de l’agence. Dans notre{' '}
          <a href="/blog/barometre-ia-cameroun-2026">
            baromètre de la visibilité IA des entreprises camerounaises
          </a>
          , aucune des 26 grandes organisations au site fonctionnel ne publiait de fichier{' '}
          <code>llms.txt</code>, et aucune ne nommait un robot d’IA dans son{' '}
          <code>robots.txt</code>. Une agence qui vend de la visibilité dans les réponses d’IA
          devrait au minimum avoir fait ce travail chez elle. Ce que ce travail recouvre est
          expliqué dans{' '}
          <a href="/blog/what-ai-seo-actually-does">
            ce que fait réellement une agence SEO IA
          </a>
          , en anglais.
        </p>

        <h2 id="prix">Combien coûte une agence SEO au Cameroun</h2>

        <p>
          Les forfaits de référencement publiés par des agences camerounaises commencent
          autour de 70 000 FCFA par mois, souvent avec un engagement de douze mois. Sur
          Sortlist, le 22 octobre 2026, les budgets minimums affichés par les agences SEO du
          Cameroun allaient de 50 à 3 000 euros, et 1 000 euros était le montant le plus
          fréquent.
        </p>

        <p>
          Ces chiffres se comparent mal entre eux, parce qu’ils ne couvrent pas la même chose.
          Un forfait mensuel peut inclure deux pages ou dix, une langue ou deux, un rapport de
          trois indicateurs ou de quarante pages de captures d’écran. Ce dernier n’est d’ailleurs
          pas un rapport, c’est une pénitence. Le bon réflexe est de ramener chaque offre au
          même périmètre avant de regarder le prix.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Convient à</th>
                <th>Point fort</th>
                <th>Point à vérifier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Freelance local</td>
                <td>Site simple, un service, une ville</td>
                <td>Coût plus bas, interlocuteur unique</td>
                <td>Continuité si la personne part ; capacité en anglais</td>
              </tr>
              <tr>
                <td>Agence locale généraliste</td>
                <td>Entreprise qui veut site, publicité et SEO ensemble</td>
                <td>Un seul prestataire pour tout le numérique</td>
                <td>Part réelle du budget consacrée au référencement</td>
              </tr>
              <tr>
                <td>Agence spécialisée SEO et IA</td>
                <td>Plusieurs services, deux langues, visibilité dans l’IA</td>
                <td>Contenu, fiche Google et réponses d’IA suivis ensemble</td>
                <td>Résultats vérifiables dans Search Console</td>
              </tr>
              <tr>
                <td>Agence étrangère</td>
                <td>Groupe régional avec budget important</td>
                <td>Méthodes et outils éprouvés</td>
                <td>Connaissance du marché, des quartiers et du français local</td>
              </tr>
              <tr>
                <td>Équipe interne</td>
                <td>Entreprise qui publie déjà chaque semaine</td>
                <td>Connaissance intime des clients</td>
                <td>Temps disponible, une fois les urgences du jour passées</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Nos propres formules sont à 150, 400 ou 900 USD par mois, facturables en XAF, sans
          frais de mise en service, sans engagement de durée et avec un préavis de trente
          jours. Le détail est sur la <a href="/pricing">page des tarifs</a>.
        </p>

        <h2 id="pas-agence">Quand il ne faut pas encore d’agence SEO</h2>

        <p>
          Une entreprise camerounaise n’a pas encore besoin d’une agence SEO si elle n’a pas de
          fiche Google validée, si son site ne s’ouvre pas correctement, ou si elle ne peut pas
          financer au moins six mois de travail.
        </p>

        <p>
          Les deux premiers points se règlent sans prestataire, en quelques jours, et notre
          guide Douala donne la marche à suivre. Le troisième est une question de calendrier :
          un référencement arrêté au troisième mois a coûté trois mois et n’a presque rien
          rapporté. Dans ce cas, la recommandation, un catalogue WhatsApp bien tenu et un peu
          de publicité ciblée feront davantage. Et une entreprise qui change de nom ou
          d’adresse le trimestre prochain doit d’abord changer, puis référencer la nouvelle
          adresse.
        </p>

        <p>
          Nous écrivons ce paragraphe en sachant qu’il éloigne quelques clients potentiels. Ce
          sont surtout ceux qui nous auraient quittés au quatrième mois, et nous préférons les
          rencontrer plus tard, prêts.
        </p>

        <h2 id="methode">Choisir une agence SEO au Cameroun en cinq étapes</h2>

        <p>
          Une entreprise peut choisir son agence SEO en deux semaines avec cinq étapes : écrire
          son besoin en une page, demander trois propositions comparables, poser les sept
          questions de Google, verrouiller les accès dans le contrat, et fixer le format du
          rapport mensuel.
        </p>

        <ol>
          <li>
            <strong>Écrire le besoin en une page.</strong> Les trois services les plus
            rentables, les villes ou quartiers visés, les langues, et le budget tenable six
            mois.
          </li>
          <li>
            <strong>Demander trois propositions comparables.</strong> La même page envoyée à
            trois prestataires, avec périmètre mensuel, livrable écrit, engagement et préavis.
          </li>
          <li>
            <strong>Poser les sept questions de Google.</strong> Et noter les réponses par
            écrit, pour les relire au sixième mois.
          </li>
          <li>
            <strong>Verrouiller les accès dans le contrat.</strong> L’entreprise reste
            propriétaire principale de la fiche Google et propriétaire de la Search Console.
          </li>
          <li>
            <strong>Fixer le rapport mensuel.</strong> Impressions, clics et positions dans
            Search Console, actions de la fiche Google, travail livré. Une page suffit.
          </li>
        </ol>

        <p>
          Pour les entreprises de Douala qui veulent être accompagnées sur cette base, notre{' '}
          <a href="/ai-seo/douala">service de référencement à Douala</a> applique ces critères
          à lui-même : propriété des accès au nom du client, rapport d’une page, et ni
          garantie de position ni engagement de durée.
        </p>

        <p>
          Mireille a renvoyé la même page à ses trois agences. La première a maintenu sa
          promesse de trente jours. La troisième a accepté un accès administrateur à la place
          des identifiants. La deuxième a répondu aux sept questions et joint, sans qu’on le
          lui demande, une capture de sa propre Search Console. Mireille a signé avec la
          deuxième.
        </p>
      </PostShell>
    </>
  );
}
