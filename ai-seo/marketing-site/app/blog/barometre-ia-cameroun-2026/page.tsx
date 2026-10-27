import Link from 'next/link';
import type { Metadata } from 'next';
import { PostShell, ShortAnswer, Scene } from '@/components/blog/PostLayout';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { StructuredData } from '@/components/seo/StructuredData';
import { blogPostingJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/structured-data';
import { getPost, postOgImages } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const post = getPost('barometre-ia-cameroun-2026')!;

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
    modifiedTime: post.modified,
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

// Dataset node in French, because the dataset itself is in French and an
// answer engine quoting it should quote the language it is published in.
const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Baromètre AfriShield de la visibilité IA des entreprises camerounaises 2026',
  description:
    'Audit de 30 grandes organisations camerounaises sur une grille publique de 8 critères et 100 points mesurant leur préparation technique à être lues et citées par les moteurs de réponse (ChatGPT, Gemini, Claude, Perplexity). Mesure du 18 octobre 2026.',
  inLanguage: 'fr',
  creator: { '@type': 'Organization', name: 'AfriShield AI', url: SITE_URL },
  spatialCoverage: { '@type': 'Country', name: 'Cameroun' },
  dateCreated: '2026-10-18',
  datePublished: post.published,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  distribution: [
    {
      '@type': 'DataDownload',
      name: 'Résultats complets (JSON)',
      encodingFormat: 'application/json',
      contentUrl: `${SITE_URL}/data/barometre-ia-cameroun-2026.json`,
    },
    {
      '@type': 'DataDownload',
      name: 'Résultats par organisation (CSV)',
      encodingFormat: 'text/csv',
      contentUrl: `${SITE_URL}/data/barometre-ia-cameroun-2026.csv`,
    },
  ],
  measurementTechnique:
    'Lecture des pages d’accueil, des fichiers robots.txt, llms.txt et sitemap en HTTPS, et vérification des articles Wikipédia via l’API MediaWiki',
  variableMeasured: [
    'Présence d’un fichier llms.txt servi en texte',
    'Présence de règles explicites pour les robots d’IA dans robots.txt',
    'Présence et longueur de la méta-description',
    'Présence d’un sitemap XML valide',
    'Accessibilité HTTPS de la page d’accueil',
    'Présence d’un article Wikipédia en français',
  ],
};

const TOC = [
  { id: 'answer', label: 'L’essentiel' },
  { id: 'zero', label: 'Le zéro qui résume tout' },
  { id: 'chiffres', label: 'Les chiffres clés' },
  { id: 'secteurs', label: 'Le secteur le plus technologique est le dernier' },
  { id: 'problemes', label: 'Six problèmes concrets' },
  { id: 'domaines', label: 'Trouver le bon domaine est déjà un problème' },
  { id: 'actions', label: 'Cinq actions pour ce trimestre' },
  { id: 'methode', label: 'Méthodologie et limites' },
  { id: 'citer', label: 'Citer cette étude' },
];

const FAQ = [
  {
    q: 'Combien d’entreprises camerounaises publient un fichier llms.txt ?',
    a: 'Aucune. Sur les 30 grandes organisations camerounaises auditées en octobre 2026, les 26 dont le site fonctionne ne publient pas de fichier llms.txt. Ce fichier est le guide de lecture destiné aux modèles d’IA : il est totalement absent du paysage camerounais.',
  },
  {
    q: 'Les grandes entreprises camerounaises bloquent-elles les robots d’IA ?',
    a: 'Non, et c’est le point important : aucune ne les bloque, mais aucune ne les guide non plus. Pas une seule mention de GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot ou Google-Extended dans l’ensemble des fichiers robots.txt analysés. Zéro politique, ni autorisation, ni refus. La porte est grande ouverte et personne ne tient le seuil.',
  },
  {
    q: 'Quel est le score moyen de préparation à l’IA des entreprises camerounaises ?',
    a: 'Le score moyen est de 46,3 sur 100, pour une médiane de 45, sur une grille publique de 8 critères vérifiables. Une seule organisation dépasse 70 : SOCAPALM, à 75 sur 100. Comme personne ne publie de llms.txt ni de règle pour les robots d’IA, le score plafonne mécaniquement à 75 — ces deux critères représentent 25 points que personne ne va chercher aujourd’hui.',
  },
  {
    q: 'Quel secteur camerounais est le moins préparé aux moteurs de réponse ?',
    a: 'Les télécoms, l’énergie et le transport, avec 36,0 sur 100 de moyenne — derrière la banque et la finance à 50,0 et la distribution, l’agro-industrie, l’éducation et les médias à 53,0. C’est le résultat le plus contre-intuitif de cette édition : les secteurs les plus capitalisés et les plus technologiques du pays sont les derniers. Quatre des dix organisations de ce groupe n’ont aucun site fonctionnel.',
  },
  {
    q: 'Ce baromètre mesure-t-il si une IA cite réellement mon entreprise ?',
    a: 'Non, et il faut le dire clairement. Il mesure la préparation technique d’un site à être lu par les robots d’IA : accès, structure, fichiers de référence, identité. Il ne mesure pas si ChatGPT ou Perplexity cite effectivement une organisation donnée, ce qui varie selon la question posée et selon l’utilisateur. Aucune agence ne peut garantir qu’un moteur citera une entreprise.',
  },
  {
    q: 'La méthode est-elle reproductible par un tiers ?',
    a: 'Oui. La grille des 8 critères, la composition de l’échantillon, le protocole de mesure et les résultats par organisation sont publiés en JSON et en CSV sur cette page, sous licence CC BY 4.0. Toutes les vérifications portent sur des informations publiques : page d’accueil, robots.txt, llms.txt, sitemap et Wikipédia.',
  },
];

export default function Post() {
  return (
    <>
      <StructuredData data={blogPostingJsonLd(post)} />
      <StructuredData data={datasetJsonLd} />
      <StructuredData data={faqPageJsonLd(FAQ)} />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.cardTitle, path: `/blog/${post.slug}` },
        ])}
      />

      <PostShell post={post} toc={TOC} faq={FAQ}>
        <ShortAnswer>
          Nous avons appliqué une grille publique de 8 critères vérifiables à{' '}
          <strong>30 des plus grandes organisations camerounaises</strong>, pour savoir si elles
          sont prêtes à être lues, comprises et citées par ChatGPT, Gemini, Claude et Perplexity.
          Résultat : <strong>aucune</strong> ne publie de fichier <code>llms.txt</code>, et{' '}
          <strong>aucune</strong> ne s&rsquo;adresse explicitement aux robots d&rsquo;IA dans son{' '}
          <code>robots.txt</code>. Zéro sur 26 sites fonctionnels, pour les deux critères. Le score
          moyen de préparation est de <strong>46,3 sur 100</strong>. Quatre organisations sur trente
          n&rsquo;ont aucun site accessible. Les données complètes sont publiées en bas de page.
        </ShortAnswer>

        <EditorialImage
          src={post.image!.src}
          alt={post.image!.alt}
          priority
          className="my-10"
        />

        <Scene>
          <p>
            Posez une question simple à ChatGPT : &laquo;&nbsp;quelle est la meilleure banque pour
            une PME à Douala&nbsp;?&nbsp;&raquo; Le modèle va répondre. Il répond toujours. La
            vraie question est de savoir <em>d&rsquo;où</em> vient sa réponse — et si
            l&rsquo;entreprise concernée a eu le moindre mot à dire sur la façon dont elle y est
            décrite.
          </p>
          <p>
            Pour le savoir, il faut arrêter de spéculer et aller lire les sites. Nous avons donc
            pris les trente plus grandes organisations du pays — télécoms, banques, énergie,
            transport, agro-industrie, universités, médias — et vérifié, une par une, huit choses
            qu&rsquo;un robot d&rsquo;IA regarde avant de citer qui que ce soit.
          </p>
          <p>
            Deux des huit cases sont restées vides partout. Pas majoritairement vides. Vides.
          </p>
        </Scene>

        <h2 id="zero">Le zéro qui résume tout</h2>

        <p>
          Sur les 26 organisations dont le site fonctionne :
        </p>

        <ul>
          <li>
            <strong>0 publient un fichier <code>llms.txt</code>.</strong> C&rsquo;est le fichier
            qui présente une entreprise aux modèles d&rsquo;IA — qui elle est, ce qu&rsquo;elle
            fait, où, et quelles pages lire en priorité. Personne ne l&rsquo;a écrit.
          </li>
          <li>
            <strong>0 nomment un seul robot d&rsquo;IA</strong> dans leur <code>robots.txt</code>.
            Nous avons cherché <code>GPTBot</code>, <code>OAI-SearchBot</code>,{' '}
            <code>ChatGPT-User</code>, <code>PerplexityBot</code>, <code>ClaudeBot</code>,{' '}
            <code>Claude-SearchBot</code>, <code>Google-Extended</code>, <code>CCBot</code> et une
            douzaine d&rsquo;autres. Aucune occurrence, sur aucun site.
          </li>
        </ul>

        <p>
          Il faut bien lire ce second point, parce qu&rsquo;il se lit dans les deux sens. Aucune
          organisation camerounaise n&rsquo;<em>interdit</em> l&rsquo;accès aux robots
          d&rsquo;IA — le terrain est entièrement libre. Et aucune ne les <em>guide</em> — le
          terrain est entièrement vide.
        </p>

        <p>
          Ces deux critères valent <strong>25 des 100 points</strong> de la grille. C&rsquo;est
          pourquoi le meilleur score du pays plafonne à 75 sur 100 : SOCAPALM fait pratiquement
          tout le reste correctement et bute sur le plafond. Vingt-cinq points, moins d&rsquo;une
          demi-journée de travail, et personne au Cameroun ne les prend.
        </p>

        <p>
          Pour mesurer ce que cela représente, un point de comparaison de la même semaine. Dans une{' '}
          <a href="/blog/ai-search-visibility-study-october-2026">
            étude distincte que nous avons menée sur cinq villes africaines
          </a>
          , un seul opérateur local a réussi à prendre la première position de Google à un
          annuaire : Safari Soles Tours, à Arusha, en Tanzanie. Cet opérateur publie un{' '}
          <code>llms.txt</code> et nomme explicitement <code>GPTBot</code>,{' '}
          <code>OAI-SearchBot</code>, <code>PerplexityBot</code> et <code>ClaudeBot</code>. Nous ne
          prétendons pas que c&rsquo;est la cause de son classement — Google n&rsquo;a jamais dit
          lire le <code>llms.txt</code>. Mais la seule entreprise africaine de notre échantillon à
          avoir battu les plateformes est aussi la seule à avoir considéré les machines comme un
          public. Au Cameroun, sur trente organisations, personne.
        </p>

        <h2 id="chiffres">Les chiffres clés</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Indicateur</th>
                <th>Résultat</th>
                <th>Base</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fichier <code>llms.txt</code> publié</td>
                <td><strong>0 %</strong></td>
                <td>0 / 26 sites fonctionnels</td>
              </tr>
              <tr>
                <td>Règles explicites pour les robots d&rsquo;IA</td>
                <td><strong>0 %</strong></td>
                <td>0 / 26 sites fonctionnels</td>
              </tr>
              <tr>
                <td>Balise <code>&lt;title&gt;</code> présente</td>
                <td>84,6 %</td>
                <td>22 / 26</td>
              </tr>
              <tr>
                <td><code>robots.txt</code> présent</td>
                <td>57,7 %</td>
                <td>15 / 26</td>
              </tr>
              <tr>
                <td>Sitemap XML disponible</td>
                <td>50,0 %</td>
                <td>13 / 26</td>
              </tr>
              <tr>
                <td>Méta-description présente</td>
                <td>42,3 %</td>
                <td>11 / 26</td>
              </tr>
              <tr>
                <td>Méta-description de longueur optimale (120 à 160)</td>
                <td>7,7 %</td>
                <td>2 / 26</td>
              </tr>
              <tr>
                <td>Article Wikipédia en français</td>
                <td>90,0 %</td>
                <td>27 / 30 organisations</td>
              </tr>
              <tr>
                <td>Site fonctionnel et lisible par un robot</td>
                <td>86,7 %</td>
                <td>26 / 30 organisations</td>
              </tr>
              <tr>
                <td><strong>Score moyen de préparation à l&rsquo;IA</strong></td>
                <td><strong>46,3 / 100</strong></td>
                <td>médiane 45 · maximum 75</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Répartition : <strong>4</strong> organisations entre 70 et 100 (bien préparées),{' '}
          <strong>10</strong> entre 50 et 69 (les bases y sont), <strong>16</strong> en dessous de
          50 (en retard). Plus de la moitié de l&rsquo;échantillon est sous la moyenne de passage.
        </p>

        <p>
          Les quatre mieux préparées, puisqu&rsquo;elles méritent d&rsquo;être nommées :{' '}
          <strong>SOCAPALM</strong> (75/100), puis <strong>CRTV</strong>,{' '}
          <strong>Ecobank Cameroun</strong> et <strong>Orange Cameroun</strong> à 70/100. Aucune
          n&rsquo;a franchi le plafond des 75, pour la raison expliquée plus haut.
        </p>

        <h2 id="secteurs">Le secteur le plus technologique est le dernier</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Secteur</th>
                <th>Score moyen</th>
                <th>Sites non fonctionnels</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Distribution, agro, éducation &amp; médias</td>
                <td><strong>53,0</strong></td>
                <td>0 / 10</td>
              </tr>
              <tr>
                <td>Banque, finance &amp; assurance</td>
                <td><strong>50,0</strong></td>
                <td>0 / 10</td>
              </tr>
              <tr>
                <td>Télécoms, énergie &amp; transport</td>
                <td><strong>36,0</strong></td>
                <td><strong>4 / 10</strong></td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Voilà le résultat le plus contre-intuitif de cette édition. Les télécoms et
          l&rsquo;énergie — les secteurs les plus capitalisés, les plus techniques, ceux qui
          vendent précisément de la connectivité — sont les moins bien préparés du pays, de dix-sept
          points.
        </p>

        <p>
          Et la totalité des défaillances se concentre là.{' '}
          <strong>Quatre des dix plus grandes organisations camerounaises des télécoms, de
          l&rsquo;énergie et du transport n&rsquo;ont aucun site web accessible</strong> au moment
          de la mesure :
        </p>

        <ul>
          <li>
            <strong>Nexttel</strong> — le domaine officiel ne résout plus du tout. Deux résolveurs
            DNS indépendants renvoient une erreur, les 18 et 19 octobre 2026. Le troisième
            opérateur mobile du pays n&rsquo;a pas d&rsquo;adresse sur le web.
          </li>
          <li>
            <strong>Camwater</strong> et <strong>Camair-Co</strong> — chaîne de certification TLS
            incomplète. Le certificat ne peut pas être validé, donc la connexion est refusée.
          </li>
          <li>
            <strong>SONARA</strong> — le serveur interrompt le handshake TLS.
          </li>
        </ul>

        <p>
          Nous nommons ces quatre-là, et pas les scores faibles du reste du classement, parce
          qu&rsquo;il s&rsquo;agit d&rsquo;une catégorie de fait différente : un site qui ne charge
          pas se vérifie en un clic par n&rsquo;importe qui, alors qu&rsquo;un score composite
          reste notre lecture. Et parce que c&rsquo;est, de loin, le point le plus utile à
          corriger. Pour un moteur de réponse, ces organisations n&rsquo;ont plus de source
          officielle du tout : il ne reste que ce que les autres écrivent sur elles.
        </p>

        <h2 id="problemes">Six problèmes concrets</h2>

        <p>
          <strong>01 — Des certificats TLS qui bloquent tout le monde.</strong> Un robot
          d&rsquo;IA rencontre exactement le même mur qu&rsquo;un navigateur. Il n&rsquo;insiste
          pas, et il n&rsquo;envoie pas de courriel pour signaler le problème.
        </p>

        <p>
          <strong>02 — Le domaine principal qui ne répond pas, seul le <code>www</code>{' '}
          fonctionne.</strong> Six organisations sont dans ce cas. Chez Orange Cameroun, le
          certificat servi sur <code>orange.cm</code> ne couvre pas ce nom : seul{' '}
          <code>www.orange.cm</code> répond. Un lien vers la version sans <code>www</code> mène à
          une erreur de sécurité — et c&rsquo;est le genre de lien que les gens écrivent de
          mémoire.
        </p>

        <p>
          <strong>03 — Un <code>robots.txt</code> renvoyé en 403.</strong> Le serveur de MTN
          Cameroon refuse l&rsquo;accès à son propre <code>robots.txt</code>. Du point de vue
          d&rsquo;un robot, il n&rsquo;y a donc aucune politique sur ce site : non pas une
          politique permissive, mais pas de politique du tout.
        </p>

        <p>
          <strong>04 — Des pages d&rsquo;accueil sans titre ni description.</strong> Quatre sites
          fonctionnels n&rsquo;exposent aucune balise <code>&lt;title&gt;</code> exploitable, et
          quinze n&rsquo;ont pas de méta-description. Deux seulement ont une description de
          longueur correcte. Dans tous les autres cas, c&rsquo;est le moteur qui rédige la
          présentation de l&rsquo;entreprise à sa place, à partir de ce qu&rsquo;il trouve.
        </p>

        <p>
          <strong>05 — Des <code>llms.txt</code> qui n&rsquo;en sont pas.</strong> Sur plusieurs
          sites récents construits en JavaScript, l&rsquo;adresse <code>/llms.txt</code> ne renvoie
          pas une erreur mais la page d&rsquo;accueil complète en HTML — CRTV en est
          l&rsquo;exemple type. Un contrôle naïf conclurait que le fichier existe. Il
          n&rsquo;existe pas : notre grille vérifie le type de contenu réellement servi, et c&rsquo;est
          pour cela que le zéro est un vrai zéro.
        </p>

        <p>
          <strong>06 — Un atout Wikipédia massivement inexploité.</strong> 27 organisations sur 30
          disposent d&rsquo;un article Wikipédia en français — l&rsquo;une des sources les plus
          utilisées par les IA pour identifier une entreprise. C&rsquo;est le meilleur score de
          toute la grille. Aucune ne relie cette identité à son propre site par un{' '}
          <code>llms.txt</code>. L&rsquo;actif existe, le lien manque.
        </p>

        <h2 id="domaines">Trouver le bon domaine est déjà un problème</h2>

        <p>
          Nous avons découvert celui-ci par accident, et c&rsquo;est peut-être le plus révélateur.
        </p>

        <p>
          Au premier passage, six organisations n&rsquo;ont pas pu être mesurées pour une raison
          technique de notre côté. En reprenant la mesure depuis une connexion normale,{' '}
          <strong>cinq des six adresses que nous avions retenues se sont révélées fausses ou
          mortes</strong> :
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Organisation</th>
                <th>Domaine attendu</th>
                <th>Domaine réel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Camrail</td>
                <td><code>camrail.net</code> — apex sans enregistrement, <code>www</code> sert un certificat auto-signé</td>
                <td><code>camrail.cm</code></td>
              </tr>
              <tr>
                <td>CCA Bank</td>
                <td><code>ccabank.cm</code> — inexistant</td>
                <td><code>cca-bank.com</code></td>
              </tr>
              <tr>
                <td>Express Union</td>
                <td><code>expressunion.cm</code> — <code>www</code> renvoie en boucle vers l&rsquo;apex</td>
                <td><code>expressunion.net</code></td>
              </tr>
              <tr>
                <td>SABC</td>
                <td><code>lessabc.com</code> — inexistant</td>
                <td><code>boissonsducameroun.com</code></td>
              </tr>
              <tr>
                <td>Cimencam</td>
                <td><code>cimencam.cm</code> — inexistant</td>
                <td><code>cimencam.com</code></td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Nous aurions pu enterrer cette correction dans une note de bas de page. Elle mérite mieux,
          parce qu&rsquo;elle est le problème du baromètre en miniature : si une équipe qui
          cherche volontairement le site officiel d&rsquo;une grande entreprise camerounaise, avec
          des outils et du temps, se trompe cinq fois sur six,{' '}
          <strong>un robot d&rsquo;IA n&rsquo;a aucune chance de faire mieux.</strong> Il prendra
          le domaine qui ressemble le plus au nom, et ce domaine sera parfois un parking ou un
          vieux site abandonné.
        </p>

        <p>
          Une identité en ligne claire et cohérente n&rsquo;est pas un détail de confort. C&rsquo;est
          la condition pour qu&rsquo;une machine puisse vous citer sans se tromper — exactement ce
          que fait le travail de{' '}
          <a href="/blog/answer-engine-optimization">référencement pour moteurs de réponse</a>.
        </p>

        <h2 id="actions">Cinq actions pour ce trimestre</h2>

        <figure>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Action</th>
                <th>Délai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01</td>
                <td>
                  <strong>Vérifier l&rsquo;accès des robots.</strong> Testez votre site depuis
                  l&rsquo;extérieur de votre réseau, corrigez la chaîne de certification TLS, et
                  assurez-vous que l&rsquo;apex et le <code>www</code> répondent tous les deux.
                </td>
                <td>1 jour</td>
              </tr>
              <tr>
                <td>02</td>
                <td>
                  <strong>Écrire une règle IA explicite.</strong> Dans <code>robots.txt</code>,
                  autorisez nommément <code>OAI-SearchBot</code>, <code>PerplexityBot</code> et{' '}
                  <code>Claude-SearchBot</code>, et décidez en connaissance de cause pour{' '}
                  <code>GPTBot</code> et <code>Google-Extended</code>.
                </td>
                <td>1 heure</td>
              </tr>
              <tr>
                <td>03</td>
                <td>
                  <strong>Publier un <code>llms.txt</code>.</strong> Présentez
                  l&rsquo;entreprise, ses activités, ses implantations et ses pages clés en
                  quelques lignes claires, dans un vrai fichier texte à la racine.
                </td>
                <td>2 heures</td>
              </tr>
              <tr>
                <td>04</td>
                <td>
                  <strong>Soigner titres et descriptions.</strong> Un <code>&lt;title&gt;</code>{' '}
                  qui dit qui, quoi et où ; une méta-description de 120 à 160 caractères sur chaque
                  page importante.
                </td>
                <td>1 à 3 jours</td>
              </tr>
              <tr>
                <td>05</td>
                <td>
                  <strong>Structurer et sourcer le contenu.</strong> Réponses directes, chiffres,
                  FAQ, données structurées Schema.org, et des informations cohérentes entre le
                  site, Google et Wikipédia.
                </td>
                <td>En continu</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Les actions 02 et 03 valent 25 points sur 100, coûtent moins d&rsquo;une demi-journée, et
          aucune organisation de cet échantillon ne les a faites. C&rsquo;est le rapport
          effort/avance le plus favorable que nous ayons mesuré sur ce marché. Il ne restera pas
          ouvert indéfiniment.
        </p>

        <p>
          Pour une PME de Douala qui part de zéro, l&rsquo;ordre de travail complet, de la fiche
          Google aux pages par quartier dans les deux langues, est détaillé dans notre{' '}
          <a href="/blog/referencement-naturel-douala">guide du référencement naturel à Douala</a>.
        </p>

        <h2 id="methode">Méthodologie et limites</h2>

        <p>
          Échantillon de 30 organisations parmi les plus importantes du Cameroun, dix par secteur.
          Toutes les vérifications portent sur des informations publiques, lues le{' '}
          <strong>18 octobre 2026</strong> et complétées le 19 octobre pour les six organisations
          décrites plus haut : page d&rsquo;accueil, fichiers <code>robots.txt</code>,{' '}
          <code>llms.txt</code> et sitemap, et présence d&rsquo;un article sur Wikipédia en
          français.
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Critère</th>
                <th>Points</th>
                <th>Ce qui est vérifié</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Site fonctionnel</td>
                <td>20</td>
                <td>Page d&rsquo;accueil accessible en HTTPS, hors maintenance</td>
              </tr>
              <tr>
                <td><code>robots.txt</code></td>
                <td>10</td>
                <td>Fichier présent à la racine, servi en texte</td>
              </tr>
              <tr>
                <td>Sitemap XML</td>
                <td>15</td>
                <td>Plan de site valide, déclaré dans <code>robots.txt</code> ou aux adresses standard</td>
              </tr>
              <tr>
                <td>Méta-description</td>
                <td>10 + 5</td>
                <td>Présente ; bonus si 120 à 160 caractères</td>
              </tr>
              <tr>
                <td>Règles robots IA</td>
                <td>10</td>
                <td>Au moins un robot d&rsquo;IA nommé explicitement</td>
              </tr>
              <tr>
                <td><code>llms.txt</code></td>
                <td>15</td>
                <td>Vrai fichier texte, pas une page HTML de secours</td>
              </tr>
              <tr>
                <td>Wikipédia FR</td>
                <td>15</td>
                <td>Article consacré à l&rsquo;organisation</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <p>
          Chaque domaine est sollicité en HTTPS, d&rsquo;abord sur l&rsquo;apex puis sur le
          sous-domaine <code>www</code> en cas d&rsquo;échec, avec trois tentatives espacées. Le
          critère Wikipédia est vérifié via l&rsquo;API MediaWiki : comme cette API limite le
          débit, une réponse vide n&rsquo;est jamais interprétée comme une absence
          d&rsquo;article — chaque résultat positif correspond à une page effectivement renvoyée.
        </p>

        <p>
          <strong>Les limites, dites franchement.</strong> Ce baromètre mesure la préparation
          technique des sites à être lus par des robots d&rsquo;IA. Il ne mesure{' '}
          <em>pas</em> si une IA donnée cite effectivement une organisation, ce qui varie selon la
          question posée et selon l&rsquo;utilisateur. Aucune agence ne peut garantir qu&rsquo;un
          moteur citera une entreprise — y compris nous. La méta-description est relevée sur la
          page d&rsquo;accueil uniquement : un site rendu intégralement côté client peut
          l&rsquo;injecter plus tard, ce qui reste un problème pour les robots, mais pour une
          raison technique différente. Enfin, un échantillon de trente organisations décrit les
          grandes entreprises du pays, pas les PME.
        </p>

        <p>
          Les résultats par organisation sont publiés dans les données brutes, sous licence CC BY
          4.0 :{' '}
          <a href="/data/barometre-ia-cameroun-2026.json">résultats complets en JSON</a> et{' '}
          <a href="/data/barometre-ia-cameroun-2026.csv">tableau par organisation en CSV</a>. La
          grille, l&rsquo;échantillon et les corrections de domaines y figurent aussi, pour que
          la méthode soit reproductible par un tiers.
        </p>

        <h2 id="citer">Citer cette étude</h2>

        <p>
          Les chiffres de ce baromètre peuvent être repris librement, à condition de citer la
          source et d&rsquo;inclure un lien vers cette page.
        </p>

        <blockquote>
          <p>
            Selon le Baromètre AfriShield 2026 de la visibilité IA des entreprises camerounaises,
            aucune des 26 grandes organisations camerounaises au site fonctionnel ne publie de
            fichier <code>llms.txt</code>, et aucune ne définit de règle explicite pour les robots
            d&rsquo;IA. Score moyen de préparation à l&rsquo;IA : 46,3 sur 100.
          </p>
        </blockquote>

        <p>
          <strong>Prochaine édition : octobre 2027</strong>, avec le même protocole et le même
          échantillon, pour mesurer l&rsquo;évolution. Si une seule organisation camerounaise
          publie un <code>llms.txt</code> d&rsquo;ici là, elle aura douze mois d&rsquo;avance sur
          les vingt-neuf autres — et nous le dirons.
        </p>

        <p>
          Pour les entreprises de Douala qui veulent corriger ces points chez elles, notre{' '}
          <Link href="/ai-seo/douala">offre de référencement IA à Douala</Link> applique le même
          protocole que celui de ce baromètre.
        </p>
      </PostShell>
    </>
  );
}
