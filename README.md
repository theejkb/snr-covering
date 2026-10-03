# SNR Covering : site Next.js

Intégration de la maquette `SNR_Covering_dc.html` en site de production.

> **Le site reproduit la maquette, section pour section.** L'ordre est celui de
> `SNR Covering.dc.html` : hero, bandeau défilant, prestations, réalisations,
> avant/après, méthode, atelier, Instagram, devis. Rien n'a été ajouté. Seules
> les mentions légales restent une page à part, parce qu'elles doivent être
> atteignables depuis n'importe où.
>
> Les anciennes pages prestation attendent dans `archive/multipage/` : pour les
> rétablir, remettre les dossiers dans `src/app/` et retirer les redirections
> correspondantes de `next.config.ts`. Le contenu long de chaque prestation
> (sections, FAQ, « pour qui ») dort intact dans `src/content/prestations.ts`,
> la one-page n'en utilise que le titre et l'accroche.
>
> Les conséquences SEO de ce choix, et le plan d'action qui va avec, sont dans
> **[`docs/SEO.md`](docs/SEO.md)**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Rien d'autre à configurer pour démarrer : les polices sont dans le dépôt, les
logos aussi, le contenu est en TypeScript. Le seul service externe est l'envoi
d'email du formulaire, et son absence est gérée proprement (voir plus bas).

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Sert le build |
| `npm run typecheck` | `tsc --noEmit` |

---

## À faire avant la mise en ligne

Tout est regroupé dans **`src/config/site.ts`**, avec des `TODO` explicites.

1. **`url`** : le domaine réel. Il alimente les canonicals, le sitemap et robots.txt. À mettre aussi dans `.env.local` (`NEXT_PUBLIC_SITE_URL`).
2. **`legal`** : SIRET, forme juridique, responsable de publication, hébergeur. Obligatoire (article 6 de la LCEN). La page mentions légales affiche un bandeau d'avertissement tant que les `TODO` sont là.
3. **`stats`** : les chiffres du hero. La maquette contenait des variables vides. Une entrée à `value: null` disparaît proprement plutôt que d'afficher un chiffre inventé. Actuellement affichés : « 100% sur-mesure » et « 5 prestations ». Garantie films et véhicules traités sont masqués.
4. **`quoteDelay`** : « 48 h » est un engagement commercial affiché à cinq endroits. Le mettre à `null` retire la mention partout d'un coup.
5. **`address`** : à renseigner seulement si l'atelier accueille du public. Laissé à `null`, le balisage `AutoBodyShop` s'appuie sur `areaServed` seul, ce qui reste valide pour Google. Une adresse inventée serait pire que pas d'adresse.
6. **`openingHours`** : vide par défaut, donc rien n'est publié.

### Le formulaire de devis

Il passe par une Server Action avec validation Zod côté serveur et honeypot
anti-spam. L'envoi utilise [Resend](https://resend.com) (gratuit jusqu'à 3 000
mails/mois).

```bash
# .env.local
RESEND_API_KEY=re_xxxxx
CONTACT_FROM_EMAIL=devis@snrcovering.fr   # domaine vérifié chez Resend
CONTACT_TO_EMAIL=Covering.snr@gmail.com
```

Sans clé, le formulaire n'échoue pas silencieusement : il affiche un message
explicite invitant à écrire directement. Pas de `mailto:` : trop de visiteurs
mobiles n'ont pas d'application mail configurée et le message se perd.

### La section Instagram

Elle affiche les **vraies publications** du compte, récupérées côté serveur et
rafraîchies toutes les heures. Le visiteur ne charge aucun script tiers et
aucun cookie n'est déposé.

Tant que `INSTAGRAM_ACCESS_TOKEN` est vide, la grille garde ses six emplacements
réservés : la mise en page est identique, seules les images manquent. Le bouton
« Nous suivre » fonctionne dans tous les cas.

Pour obtenir le jeton (gratuit, environ 15 minutes) :

1. Passer **@snrcovering en compte professionnel** dans l'application Instagram
   (Paramètres > Type de compte > Basculer vers un compte professionnel).
   C'est la condition d'accès à l'API, sans elle rien n'est possible.
2. Créer une application sur [developers.facebook.com](https://developers.facebook.com),
   y ajouter le produit **Instagram** et connecter le compte.
3. Générer un **jeton d'accès longue durée** avec la permission
   `instagram_business_basic`, puis le coller dans `.env.local`.

Le jeton expire au bout de **60 jours**. Passé ce délai, la section repasse
silencieusement sur ses emplacements réservés et l'erreur est écrite dans les
logs du serveur. Prévoir un rappel de renouvellement.

Pourquoi ce détour : Instagram a fermé son accès public (toute requête non
authentifiée renvoie une erreur 400) et arrêté l'API Basic Display en décembre
2024. Le scraping, lui, viole les conditions d'utilisation. C'est le seul chemin
officiel restant.

### Les photos

C'est ce qui manque le plus. Tant qu'il n'y a pas de photos, les emplacements
affichent « Photo à venir » avec la place déjà réservée : ajouter les images ne
provoquera aucun décalage de mise en page.

1. Déposer les fichiers dans `public/realisations/`, nommés en slug lisible
   (`audi-a4-covering-gris-nardo-01.jpg`, pas `IMG_4821.jpg`).
2. Ajouter une entrée dans `src/content/realisations.ts` : un exemple complet
   est en commentaire dans le fichier.

L'entrée apparaît alors automatiquement sur l'accueil, dans `/realisations`,
dans le sitemap, et génère sa propre page `/realisations/[slug]`.

Le champ `alt` est validé : il doit faire au moins 20 caractères. Ce n'est pas
du zèle : c'est ce qui fait remonter les photos dans Google Images, canal réel
d'acquisition pour ce métier. Écrire « Audi A4 Avant covering complet gris
nardo satiné, vue trois quarts avant », pas « réalisation 3 ».

---

## Ce qui a changé par rapport à la maquette

La structure et la composition sont celles de la maquette. Ce qui suit est la
liste **complète** des écarts, tous délibérés.

| Maquette | Ici | Pourquoi |
|---|---|---|
| Aucune media query, design figé à 1240 px | Identique au-dessus de 1024 px, replié en dessous | La maquette déborderait sur un téléphone ; elle ne dit rien du mobile |
| `.reveal { opacity: 0 }` en CSS | Contenu visible par défaut, masqué par script avant peinture | Sans JavaScript, la maquette affichait une page vide |
| Titres de cartes et d'étapes en `<div>` | `<h3>` | Hiérarchie de titres exploitable |
| Google Fonts par CDN | `next/font/local`, fichiers dans le dépôt | Performance, et pas de transfert d'IP vers Google |
| Archivo Black chargée | Retirée | Déclarée, jamais utilisée |
| Formulaire décoratif, sans envoi ni validation | Mêmes champs, mais envoi Resend, validation serveur, honeypot | Sinon le formulaire ne sert à rien |
| Pas de consentement RGPD | Case ajoutée sous le bouton | Obligation légale |
| Pas de mentions légales | Lien ajouté au pied de page | Article 6 LCEN |
| Comparateur sans accès clavier | `<input type="range">` transparent superposé | Inutilisable au clavier sinon ; aucun effet visuel |
| Styles inline partout | Tokens `@theme` dans `globals.css` | Une seule source de vérité pour les couleurs et le motion |
| Pas de focus visible | `:focus-visible` sur toute la page | Navigation clavier |
| Glyphes Unicode (`✉ ☎ ◎ ⌖ ✦ ⇄ ✓ ★`) | Icônes Phosphor, importées une par une | Les glyphes changent de dessin selon la police système ; certains ne s'affichent pas du tout sur Android |
| Textes de présentation | Textes réécrits pour la demande de devis | Voir plus bas |
| Six emplacements photo figés | Les vraies publications du compte, via l'API officielle | Une section qui montre le travail réel vaut mieux qu'une grille vide |
| Tirets cadratins dans les textes | Deux-points, virgules ou parenthèses | Choix éditorial : ce signe est banni du site |

**Le tiret cadratin est proscrit partout**, dans les textes comme dans les
commentaires de code. Si vous ajoutez du contenu, utilisez deux-points,
virgule, parenthèses ou point selon le sens.

**Quatre gris ont été remontés d'un cran**, tous sous le seuil de contraste
AA dans la maquette : les numéros des cartes (2,75:1) et des étapes (2,81:1),
la note « Films premium » (3,85:1), les mentions du formulaire (2,88:1) et le
copyright (1,85:1 : illisible). L'écart de teinte est d'un cran de gris ; sans
lui, l'accessibilité tombe de 100 à 96.

Le `<title>` et la meta description de la maquette étaient bons : conservés tels
quels.

---

## Architecture

```
src/
  app/
    page.tsx                    la page : toutes les sections
    mentions-legales/           seule autre page (obligation légale)
    actions/devis.ts            Server Action du formulaire
    sitemap.ts  robots.ts  llms.txt/  opengraph-image.tsx
    not-found.tsx  error.tsx
  components/
    ui/                         primitives (Logo, Container, Photo…)
    sections/                   les 9 blocs de la maquette, dans l'ordre
  content/                      contenu typé, validé par Zod
                                  prestations.ts  les 5 cartes (+ contenu long en réserve)
                                  galerie.ts      les 8 tuiles de réalisations
  config/site.ts                coordonnées et TODO
  lib/                          fonts, env, schémas JSON-LD
  fonts/                        woff2 auto-hébergés
archive/multipage/              les pages dédiées, en attente
docs/SEO.md                     plan d'action référencement et LLM
```

**Server Components par défaut.** Cinq composants seulement sont clients : le
header (menu mobile), la grille de réalisations (filtres), le comparateur
avant/après, le formulaire, et le déclencheur d'animations. Aucune page ni
aucun layout n'est client.

**Le contenu est du TypeScript validé par Zod**, pas un CMS. Le volume ne le
justifie pas, et une erreur de saisie casse le build plutôt que la production.

**Cache Components (`use cache`) n'est pas activé.** Toutes les routes sont
prérendues en statique au build : il n'y a rien à mettre en cache à
l'exécution. L'activer ajouterait de la complexité sans bénéfice ici.

---

## Mesures

Build vérifié sur Next.js 16.3 / React 19.2 / TypeScript 7 :

- 8 routes, toutes prérendues en statique, build sans erreur ni warning
- Un seul `h1`, 7 `h2` : le plan de titres de la maquette, à l'identique
- Canonical absolue, sitemap, `robots.txt` et `/llms.txt` en place
- **~4 500 caractères** de texte lisibles **sans JavaScript** (mesuré sur le
  build de production, balises retirées)
- HTML : 27 kB gzip
- JS de la page : **190 kB gzip**, dont 180 kB de socle React, soit **10 kB de
  code applicatif**, icônes comprises. Vérifié en comparant avec
  `/mentions-legales`, qui ne charge aucun composant client.

Ce dernier chiffre mérite une précision honnête : il correspond au socle
React 19 + App Router, pas au code du site (aucune dépendance applicative n'est
embarquée côté client : ni Zod, ni Resend, vérifié dans les chunks). C'est
au-dessus des 100 kB que j'avais posés comme objectif dans le prompt. Le
réduire vraiment supposerait de sortir de React, ce qui n'est pas la bonne
décision ici. Les autres leviers de LCP : polices auto-hébergées, une seule
police préchargée, images dimensionnées, zéro script tiers, tout en statique,
sont en place.

**Lighthouse mobile, build de production : 100 / 100 / 100 / 100**
(accessibilité, bonnes pratiques, SEO, agentic browsing) : 57 audits passés,
aucun échec.

## Corrections apportées à la livraison initiale

- **Page blanche après navigation interne.** L'observateur d'intersection ne
  voyait que les `.reveal` du premier rendu ; en navigation client, ceux de la
  page suivante restaient à `opacity: 0`, page vide, définitivement. Le
  mécanisme a depuis été aligné sur la maquette : seul le hero s'anime, au
  chargement, et l'observateur a été supprimé. Le problème ne peut plus se poser.
- **Erreur d'hydratation sur `<html>`** : le script inline ajoute `js-reveal`
  avant l'hydratation, ce que React signalait comme une incohérence.
  `suppressHydrationWarning` rend l'intention explicite. Console propre.
- **Titres collés au paragraphe suivant.** `.h-display { margin: 0 }` était hors
  calque CSS : il battait tous les utilitaires de marge de Tailwind, qui vivent
  dans `@layer utilities`. Déplacé dans `@layer components`.
- **Contenu 80 px trop étroit sur grand écran.** `Container` limitait à 1240 px
  padding compris ; dans la maquette la gouttière de 40 px est portée par la
  section et le bloc fait 1240 px pleins. Corrigé à `max-w-[1320px]`.
- **Zod embarqué dans le navigateur, 74 kB gzip.** Deux composants clients
  importaient une constante depuis un module de contenu qui valide ses données
  avec Zod ; l'import tirait toute la bibliothèque. La constante vit maintenant
  dans `src/content/categories.ts`, qui n'importe rien, et les données validées
  descendent en props depuis le serveur. Le JS de la page est repassé de 254 à
  190 kB.
- **Honeypot inopérant.** `societe` était validé à `max(0)` : un robot déclenchait
  une erreur de formulaire au lieu du faux succès prévu, et la branche anti-robot
  de la Server Action était morte. Pire, un gestionnaire de mots de passe
  remplissant le champ invisible bloquait un visiteur réel sans message
  corrigeable. La validation est maintenant permissive, le tri se fait dans
  l'action.
- **Texte blanc sur fond blanc sur tous les boutons pleins.** Les règles de base
  de `globals.css` n'étaient pas dans un calque. En CSS, une règle sans calque
  bat une règle calquée quelle que soit la spécificité : donc
  `a { color: inherit }` écrasait `text-ink` sur chaque `<a>`, y compris les
  boutons `bg-bright`. Contraste mesuré : **1:1**. Les règles de base sont
  passées dans `@layer base` ; contraste désormais **17,8:1**.
- **JSON-LD** : `<` échappé en séquence Unicode, par principe.
- **Bandeau des mentions légales** : n'apparaît plus que si des `TODO_` restent.

## Les textes, et pourquoi ils disent ça

Chaque bloc répond à une objection précise, dans l'ordre où elle se pose.

| Où | Ce qui est dit | L'objection levée |
|---|---|---|
| Sous-titre du hero | « sans toucher à la peinture d'origine […] retirables le jour où vous changez d'avis » | « Et si je regrette ? Et à la revente ? » |
| Sous les boutons du hero | « Gratuit, sans engagement, réponse sous 48 h. Trois photos suffisent. » | « Ça m'engage à quoi, et combien de temps ça va me prendre ? » |
| Cartes prestation | Bénéfice concret plutôt que description technique : « les gravillons s'arrêtent sur le film, pas sur votre peinture » | « Concrètement, ça m'apporte quoi ? » |
| Carte d'appel | « Vous hésitez entre deux finitions ? » | L'hésitation est nommée au lieu d'être ignorée |
| Atelier | « Un seul véhicule à la fois » · « on vous le dit avant de prendre votre argent » | « Vais-je être un numéro ? Vont-ils accepter n'importe quoi pour facturer ? » |
| Méthode | « Vous savez quand vous récupérez votre véhicule dès le devis, pas la veille » | « Combien de temps sans voiture ? » |
| En-tête du formulaire | « Cinq champs, pas de compte à créer, pas de rappel commercial » | « Je vais me faire harceler au téléphone » |
| Légende des pastilles | « ou aucun si vous hésitez » | Ne pas bloquer celui qui ne sait pas encore |
| Bouton | « RECEVOIR MON DEVIS » | Formulé du point de vue du visiteur, pas du vendeur |
| Écran de confirmation | Demande les photos en réponse à l'email | Récupère l'information manquante au moment où l'intention est la plus forte |

Les lignes d'aide sous chaque moyen de contact (« le plus simple pour joindre des
photos », « si vous préférez expliquer de vive voix ») servent la même idée :
quatre canaux côte à côte, c'est un choix de plus à faire ; les qualifier
supprime l'hésitation.

**Aucun chiffre n'a été inventé.** Les seules affirmations commerciales sont
celles de la maquette : « 3 ans de garantie », « 5★ », « 48 h », affichées sur
votre décision, et centralisées dans `src/config/site.ts`.

## Interactions

Tout est en CSS, sans bibliothèque d'animation : `transform` et `opacity`
uniquement, donc composé par le GPU.

- Boutons : la flèche avance de 3 px au survol, le bouton s'enfonce au clic
  (`scale(.985)`) : sans ce retour, un clic sur mobile ne se voit pas.
- Cartes prestation : l'accent coloré s'allonge depuis son coin.
- Tuiles de galerie : la légende monte de 4 px, le voile s'assombrit pour garder
  le texte lisible.
- Lignes de contact : l'icône prend la couleur d'accent et se décale vers le
  texte.
- Filtres et pastilles : léger soulèvement au survol, enfoncement au clic.

Tout est neutralisé sous `prefers-reduced-motion`.

## Responsive : mesuré, pas supposé

Vérifié au navigateur sur 12 largeurs, de **320 px à 1440 px** : aucun
débordement horizontal, aucune cible tactile sous 24 px (critère WCAG 2.5.8).
Ce qui a dû être corrigé pour y arriver :

- **Le badge du logo faisait 243 px de large.** Sur un écran de 320 px il
  chassait le menu hors de l'écran. Sa hauteur est réduite de 20 % sous `sm`
  (la largeur suit, contrairement à un `scale` qui ne change que le rendu), et
  le mot « COVERING » disparaît sous 420 px. Le pavé SNR et la double barre
  restent : la marque est toujours identifiable.
- **Liens du pied de page : 16 px de haut.** Sous le minimum de 24 px. Passés en
  `block py-2` : la zone cliquable grandit, le texte ne bouge pas.
- **Lignes de contact : 24 px.** Toute la ligne est désormais cliquable (44 px).
- **Champs du formulaire en 14 px.** Sous 16 px, iOS zoome automatiquement à la
  prise de focus et décale la page. Passés à 16 px sur mobile, 14 px dès `sm`.
- **Case de consentement de 16 px** → 24 px.
- **Aucun appel à l'action visible sur mobile** : il fallait ouvrir le menu pour
  trouver « Devis ». Un bouton compact est maintenant toujours visible dans
  l'en-tête.
- Marges latérales de `Container` alignées sur celles de l'en-tête.

**Lighthouse mobile, build de production : 100 / 100 / 100 / 100**
(accessibilité, bonnes pratiques, SEO, agentic browsing) : 58 audits passés,
aucun échec. LCP 90 ms, CLS 0,00 en local.

## Reste à vérifier après déploiement

- [ ] Lighthouse mobile
- [ ] JSON-LD dans le test des résultats enrichis de Google
- [ ] Formulaire de bout en bout, mail bien reçu
- [ ] Fiche Google Business Profile créée et alimentée : pour « covering près de moi », c'est elle qui remonte, pas le site
- [ ] Le reste du plan : [`docs/SEO.md`](docs/SEO.md)
