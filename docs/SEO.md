# SEO & présence dans les LLM : SNR Covering

Ce document sert de plan d'action. Il est classé par retour sur effort réel
pour un artisan local, pas par ordre de sophistication technique.

---

## Le point à comprendre d'abord : one-page = une seule URL

Google positionne des **URLs**, pas des sections. Avec une seule page :

- une seule adresse peut se classer, sur **une famille de requêtes principale**
  (« covering Grenoble », « covering voiture Grenoble ») ;
- les quatre autres familles : PPF, déchromage, stickers/lettrage, kit déco,
  se retrouvent en concurrence avec elle sur la même URL. Elles ressortiront
  beaucoup moins bien qu'avec une page dédiée par prestation ;
- un seul `<title>` et une seule meta description pour tout le site, alors que
  ce sont les deux éléments qui décident du taux de clic dans les résultats.

Depuis l'alignement sur la maquette, le site n'affiche plus que les cartes de
présentation des cinq prestations : le contenu long et les questions fréquentes
ont été retirés de la page. Le balisage `Service` reste émis pour les cinq, et
les anciennes URLs redirigent en 301 vers `/#prestations`.

Conséquence directe : **la page ne contient plus qu'environ 4 500 caractères de
texte**, contre 20 000 auparavant. C'est peu pour se positionner ailleurs que
sur le nom de l'entreprise et « covering Grenoble ». Le contenu n'est pas perdu,
il dort dans `src/content/prestations.ts`, mais il n'est plus lu par personne,
ni par un visiteur, ni par un moteur.

Le balisage `FAQPage` a été retiré : Google interdit de baliser un contenu que
le visiteur ne voit pas.

**Recommandation n°1, dès qu'il y a des photos et un peu de recul : rétablir les
cinq pages prestation.** Elles ne sont pas perdues, elles sont dans
`archive/multipage/`. Le contenu, lui, n'a jamais bougé : il vit dans
`src/content/prestations.ts` et alimente aujourd'hui la one-page. Remettre les
pages en service, c'est déplacer un dossier et retirer cinq redirections,
une demi-heure, sans réécriture.

En attendant, tout ce qui suit s'applique et compte davantage que le nombre de
pages.

---

## Priorité 1 : La fiche Google Business Profile

Pour « covering près de moi », « covering Grenoble », « déchromage Grenoble »,
ce qui remonte en premier n'est pas un site : c'est le **bloc de trois fiches
locales**, au-dessus des résultats classiques. Sans fiche, vous n'existez pas
sur ces requêtes, quelle que soit la qualité du site.

À faire, dans l'ordre :

1. Créer la fiche sur google.com/business, catégorie principale **« Atelier de
   personnalisation automobile »** (secondaires : « Carrosserie », etc.).
2. Cocher **« Je livre des biens et services à mes clients »** et déclarer la
   zone desservie plutôt qu'une adresse, tant que l'atelier n'accueille pas de
   public. C'est prévu pour, et cela évite d'exposer une adresse privée.
3. Renseigner exactement les mêmes nom, téléphone et site que sur le site.
4. Charger 15 à 20 photos réelles dès le départ, puis 2 à 3 par semaine.
   Les fiches actives sortent devant les fiches figées.
5. Activer la messagerie et les demandes de devis.

**Les avis sont le premier facteur de classement local.** Demandez-les
systématiquement en fin de chantier, avec le lien court de la fiche envoyé par
SMS pendant que le client est encore devant sa voiture. Dix avis récents et
détaillés valent mieux que trente avis de 2023. Répondez à chacun, y compris
les négatifs.

> ⚠️ N'ajoutez `aggregateRating` au balisage du site que quand les avis
> existent réellement et sont vérifiables. Un score inventé est une des rares
> choses que Google sanctionne directement.

---

## Priorité 2 : Les photos

C'est aujourd'hui ce qui manque le plus, et c'est décisif dans ce métier :
Google Images est un vrai canal d'acquisition sur « covering gris nardo »,
« déchromage Golf », « PPF Tesla ».

- Déposer les fichiers dans `public/realisations/`, nommés en clair :
  `audi-a4-covering-gris-nardo-01.jpg`, jamais `IMG_4821.jpg`.
- Ajouter l'entrée dans `src/content/realisations.ts` (un exemple complet est en
  commentaire dans le fichier). Le `alt` est validé à 20 caractères minimum :
  « Audi A4 Avant covering complet gris nardo satiné, vue trois quarts avant »,
  pas « réalisation 3 ». C'est ce texte qui fait remonter l'image.
- Systématiser les paires **avant / après** : le comparateur existe déjà, il
  attend simplement des fichiers.
- Le format et le redimensionnement sont automatiques (`next/image`, AVIF et
  WebP) : rien à faire de ce côté.

Objectif réaliste : 3 photos par chantier, 2 chantiers par semaine.

---

## Priorité 3 : Cohérence de l'entité (socle du SEO local *et* des LLM)

Google comme les modèles de langage construisent une **entité** « SNR Covering »
à partir de recoupements. Chaque incohérence affaiblit l'entité.

- Nom, téléphone et adresse (le fameux NAP) **strictement identiques** partout :
  site, fiche Google, Instagram, PagesJaunes, annuaires auto locaux, factures.
  « SNR Covering » et « SNR-Covering 38 » sont deux entreprises différentes pour
  un moteur.
- Renseigner `sameAs` dans `src/config/site.ts` avec tous les profils publics au
  fur et à mesure : Instagram (déjà là), fiche Google, Facebook, TikTok.
- Compléter les mentions légales (SIRET, forme juridique, responsable). C'est
  une obligation légale (art. 6 LCEN), et un signal de sérieux exploité par les
  moteurs. Les valeurs sont dans `src/config/site.ts`, marquées `TODO_`.

---

## Priorité 4 : Ce qui manque au contenu

Le contenu actuel est bon : dense, spécifique, écrit par quelqu'un qui connaît
le métier. Trois manques concrets, par ordre d'impact :

1. **Les prix.** « Prix covering voiture » est la requête la plus tapée du
   secteur, et c'est la première chose qu'un LLM cherche à restituer. Ne pas
   afficher de fourchette, c'est laisser la réponse aux concurrents. Une
   fourchette honnête suffit : « covering complet, à partir de X € selon le
   véhicule et la finition ; toit seul : à partir de Y € ». Ajoutez la variable
   qui fait bouger le prix (surface, état de la peinture, démontages).
2. **Les durées d'immobilisation.** `duration` est à `null` pour les cinq
   prestations. « Combien de temps sans ma voiture » est la deuxième question
   de tout client. Une fourchette réelle vaut mieux que le silence.
3. **Les preuves.** Marques de films posées (déjà là : 3M, Avery, Hexis),
   formations ou certifications de pose, garantie appliquée. C'est ce que Google
   appelle E-E-A-T, et ce sur quoi les LLM s'appuient pour décider s'ils vous
   citent.

---

## Priorité 5 : Être cité par les LLM (ChatGPT, Perplexity, Gemini, AI Overviews)

### Ce qui est déjà en place

| Levier | État |
|---|---|
| `robots.txt` autorisant explicitement GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended | ✅ |
| `/llms.txt` au format llmstxt.org (titre, résumé, sections de **liens**), **généré** depuis le contenu réel donc toujours à jour | ✅ |
| Contenu lisible **sans JavaScript** (tout est prérendu en statique) | ✅ |
| JSON-LD en `@graph` de 8 nœuds liés par `@id` : `AutoBodyShop` (avec `hasOfferCatalog`, `knowsAbout`, `areaServed` typé ville/département), `WebSite`, `WebPage`, 5 × `Service` | ✅ |
| FAQ rédigée en questions/réponses autonomes | ✅ |
| Lighthouse mobile : SEO 100, accessibilité 100, bonnes pratiques 100, agentic browsing 100 | ✅ |

Le `@graph` n'est pas de la coquetterie : les nœuds se référencent par `@id`
(`Service.provider` → `AutoBodyShop`, `FAQPage.mainEntityOfPage` → `WebPage`),
ce qui donne aux moteurs une entité unique et cohérente au lieu de sept objets
sans lien entre eux.

Un champ reste vide et attend une décision : **`priceRange`** dans
`src/config/site.ts`. Google l'affiche dans les résultats locaux. Tant qu'il
est à `null`, il n'est pas émis du tout : plutôt que d'annoncer une fourchette
au hasard.

Ce dernier point est le plus important et il est souvent mal compris : un modèle
ne cite pas une page, il cite un **passage qui se suffit à lui-même**. Une
réponse de FAQ compréhensible hors contexte est infiniment plus citable qu'un
paragraphe qui commence par « comme on l'a vu plus haut ». Le contenu actuel est
déjà écrit comme ça : c'est un vrai atout, gardez cette discipline.

### Ce qui reste à faire

1. **Remettre du contenu lisible sur la page.** C'est aujourd'hui le premier
   levier, loin devant les autres : 4 500 caractères ne suffisent pas. Les
   questions fréquentes des cinq prestations existent déjà, rédigées, dans
   `src/content/prestations.ts` : elles alimentent encore `/llms.txt` mais plus
   la page. Les réafficher (en accordéons, sous les cartes, ou en rétablissant
   les pages dédiées) rendrait au site l'essentiel de ce qu'il a perdu, et
   permettrait de réémettre le balisage `FAQPage`.
2. **Se faire mentionner ailleurs.** Les modèles s'appuient massivement sur des
   sources tierces : annuaires, avis Google, forums, groupes Facebook auto,
   Reddit, presse locale. Une mention sur un site de club auto de l'Isère pèse
   plus lourd, pour un LLM, que trois paragraphes d'auto-description.
3. **Vérifier ce qui est dit de vous.** Interrogez régulièrement ChatGPT et
   Perplexity : « meilleur atelier de covering à Grenoble », « où faire poser du
   PPF en Isère ». Si vous n'apparaissez pas, regardez qui apparaît et d'où
   vient la citation : c'est votre liste de cibles.

---

## Priorité 6 : Liens entrants, version réaliste

Pas d'achat de liens, pas d'annuaires douteux. Ce qui fonctionne pour un
artisan :

- partenaires directs : garages, carrossiers, préparateurs, concessions,
  loueurs, centres de contrôle technique : échange de recommandations ;
- clubs et associations auto de l'Isère, événements et rassemblements locaux ;
- fournisseurs de films (3M, Avery, Hexis) : certains publient un annuaire de
  poseurs, c'est un lien de qualité et gratuit ;
- presse et blogs locaux : un atelier qui ouvre ou une réalisation
  spectaculaire est un sujet.

Cinq à dix liens locaux réels valent mieux que cent liens d'annuaires.

---

## Suivi : à mettre en place le jour du déploiement

1. **Google Search Console** : valider le domaine, soumettre
   `https://<domaine>/sitemap.xml`, vérifier l'indexation sous 48 h.
2. **Test des résultats enrichis** de Google : coller l'URL, vérifier que
   `AutoBodyShop`, `Service` et `FAQPage` sont reconnus sans erreur.
3. **Lighthouse mobile** sur la page d'accueil (jamais mesuré : aucun navigateur
   n'était disponible au moment du développement initial).
4. **Formulaire de devis de bout en bout** : `RESEND_API_KEY` configurée,
   `CONTACT_FROM_EMAIL` sur un domaine vérifié chez Resend, et un mail de test
   réellement reçu.
5. `NEXT_PUBLIC_SITE_URL` renseignée avec le domaine final : sinon canonicals,
   sitemap et JSON-LD pointent tous vers `www.snrcovering.fr` par défaut.

---

## Ce que je ne recommande pas

- **Un blog**, tant que les photos et les prix manquent. Publier trois articles
  génériques rapporte moins que dix chantiers documentés en photos.
- **Des pages « covering + ville » dupliquées** (Échirolles, Voiron, Vizille…)
  avec le même texte et la ville remplacée. Google traite ça comme du contenu
  dupliqué depuis longtemps. Une page par ville n'a de sens qu'avec du contenu
  réellement différent : chantiers réalisés sur place, spécificités locales.
- **Un cookie banner**, tant qu'aucun tracker n'est posé. Le site n'en dépose
  aucun aujourd'hui, et c'est un avantage : sur la vitesse comme sur la
  conversion. Si une mesure d'audience devient nécessaire, prendre une solution
  sans cookie (Plausible, Vercel Analytics) plutôt que Google Analytics.
