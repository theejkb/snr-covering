# Copywriting SEO / GEO : proposition pour la one-page

Proposition de textes, section par section, à valider avant intégration.
Rien n'est encore modifié dans le code.

Complète `docs/SEO.md` (la technique est déjà solide : JSON-LD, llms.txt,
robots, Lighthouse 100). Le point faible est ailleurs : **le texte visible**.
Le H1 ne contient aucun mot-clé, la plupart des H2 sont génériques (« Comment ça
se passe », « Dites-nous ce que vous voulez ») et la page ne fait qu'environ
4 500 caractères.

---

## 1. Le terrain : ce que montre Google sur « covering Grenoble »

Relevé du 5 novembre 2026, SERP observée :

| Concurrent | Ce qu'il fait bien |
|---|---|
| Sprinteo (annuaire) | Title « Prix, Devis Gratuit 48h », grille de prix affichée |
| Pole Cover | **Également à Sassenage**, covering + PPF + marquage |
| We Stick (Échirolles) | Une page par prestation : covering, marquage, flocage |
| Davincy, Sepia, Adzif | Angle marquage publicitaire, « depuis 10 ans » |
| Glastint, LDA, Teinte Protect | Angle PPF, marques de film nommées (XPEL…) |

Trois constats :

1. **Les prix sont partout.** Les concurrents affichent des fourchettes
   (covering complet de 1 500 à 3 500 €, partiel dès 250-450 €, lettrage dès
   150-300 €). Une page sans prix perd la requête « prix covering Grenoble » et
   les réponses des IA, qui restituent un chiffre.
2. **Pole Cover est à Sassenage, dans le même atelier partagé** (confirmé par
   Clarisse). Même adresse, même requête « covering Sassenage » : il faut un
   angle à vous, et un nom d'entreprise bien distinct sur Google Maps.
3. **Personne ne porte vraiment l'angle moto, la création graphique et
   l'itasha.** Vos réalisations (ZX-6R, Ducati, MT-07, Yaris Genshin Impact)
   sont exactement là. C'est le créneau où une one-page peut gagner.

> Pas d'accès à un outil de volumes ici. Les priorités ci-dessous viennent de
> la SERP et de la logique du secteur. À confirmer dans Google Search Console
> trois à quatre semaines après la mise en ligne (requêtes réelles affichées).

---

## 2. Carte des mots-clés

Une seule URL : on vise **un** mot-clé principal, et on sème les autres dans
les H2, H3, paragraphes et FAQ.

| Rôle | Requêtes | Où les placer |
|---|---|---|
| **Principal** | covering Grenoble, covering voiture Grenoble | title, H1, 1er paragraphe, meta |
| Secondaires forts | covering moto Grenoble, film PPF Grenoble, marquage véhicule Grenoble | H2 prestations, H3 cartes, FAQ |
| Niche (concurrence faible) | kit déco moto Isère, déchromage Grenoble, covering itasha, toit noir covering | H3 cartes, légendes réalisations, FAQ |
| Locales | covering Sassenage, Voiron, Échirolles, Isère (38) | bloc « zone d'intervention », footer, alt |
| Intention prix / délai | prix covering voiture Grenoble, combien de temps dure un covering | FAQ |
| Synonymes à placer une fois chacun | wrapping, film adhésif, flocage, covering intégral / semi-covering, vinyle | paragraphes |

Règle : chaque requête apparaît **là où elle répond à une question**, jamais en
liste ou en répétition. Google pénalise le bourrage, et les IA ne citent pas
un texte creux.

---

## 3. Title et meta description

**Title** (53 car.)

- Avant : `Covering auto à Grenoble · SNR Covering | PPF, déchromage, déco` (63, tronqué sur mobile)
- Après : `Covering Grenoble · voiture, moto, PPF | SNR Covering`

**Meta description** (155 car.)

- Après : `Atelier de covering aux portes de Grenoble : covering voiture et moto, film PPF, déchromage, kit déco, marquage utilitaire. Devis gratuit sous 48 h.`

À reporter tel quel dans `page.tsx` (TITLE / DESCRIPTION), `layout.tsx` et
`site.description`, pour que le JSON-LD dise la même chose.

---

## 4. Hero

### H1 : le changement le plus important de la page

Aujourd'hui le H1 est « Votre véhicule, une autre couleur » : zéro mot-clé.
**Choix validé par Clarisse** (5 nov. 2026) :

```
COVERING VOITURE & MOTO À GRENOBLE   <- <h1>, à la place de l'eyebrow actuel (même style)

CHANGEZ DE COULEUR,                  <- <p>, grand titre display (même style qu'aujourd'hui)
PAS DE
VÉHICULE                             (3e ligne en gris, comme « COULEUR » aujourd'hui)
```

Le design ne bouge pas : seules les balises et les textes changent.

### Paragraphe d'accroche

- Avant : « Changez la couleur de votre véhicule sans toucher à la peinture
  d'origine. Films posés à la main dans notre atelier près de Grenoble, et
  retirables le jour où vous changez d'avis. »
- Après :

> Covering intégral ou partiel pour voiture, moto et utilitaire : changez de
> couleur sans toucher à la peinture d'origine. Films 3M, Avery Dennison et
> Hexis posés à la main dans notre atelier de Sassenage, aux portes de
> Grenoble, et retirables le jour où vous changez d'avis.

Gain : covering intégral/partiel, moto, utilitaire, Sassenage, Grenoble, et les
marques (signal E-E-A-T) dans les 50 premiers mots.

---

## 5. Bandeau défilant (Marquee)

Texte lu par Google. Remplacer les anglicismes par les requêtes réelles :

`COVERING INTÉGRAL · COVERING MOTO · FILM PPF · DÉCHROMAGE · KIT DÉCO · STICKERS & LETTRAGE · MARQUAGE UTILITAIRE`

---

## 6. Prestations

**Eyebrow** : `NOS SERVICES À GRENOBLE ET EN ISÈRE`
**H2** : `COVERING, PPF & MARQUAGE` (au lieu de « Prestations covering & PPF »,
qui ne répond à aucune requête)

**Texte d'intro** :

> Six prestations, toutes réversibles : votre peinture d'origine reste intacte
> dessous. Voitures, motos, utilitaires et flottes d'entreprise.

### Cartes (H3 + extrait)

**01. COVERING TOTAL & PARTIEL** (au lieu de « Semi & Full »)

> Covering intégral ou semi-covering (toit noir, capot, rétros, bas de caisse) :
> mat, satiné, brillant ou texturé, votre voiture ou votre moto change de
> couleur en quelques jours. Le film se retire, la teinte d'origine réapparaît,
> et votre valeur de revente avec.

**02. FILM PPF / PROTECTION CARROSSERIE**

> Film de protection transparent contre les gravillons, les rayures et les
> insectes, sur la face avant ou la carrosserie complète. Invisible,
> auto-cicatrisant, garanti par le fabricant. Utile sur les routes de montagne
> autour de Grenoble.

**03. KIT DÉCO VOITURE & MOTO**

> Une création unique, dessinée selon vos envies : couleurs, motifs, logos,
> numéros, jusqu'à l'itasha complet. Le kit déco est conçu sur mesure pour
> votre carénage ou votre carrosserie, création graphique comprise.

**04. STICKERS & LETTRAGE**

> Stickers 100 % personnalisés : logo, texte, numéro de course, plaque de
> course ou design complet. Découpés ou imprimés, chacun est réalisé sur mesure
> pour son support.

**05. MARQUAGE PUBLICITAIRE**

> Marquage de véhicule utilitaire, flocage de flotte d'entreprise, vitrines et
> enseignes : vos véhicules deviennent un support de communication qui roule
> dans toute l'agglomération grenobloise. Logo, coordonnées, slogan, visuels.

**06. DÉCHROMAGE**

> Les entourages de vitres chromés sont ce qui date le plus un véhicule. On les
> passe en noir mat ou brillant (chrome delete), calandre et logos compris, et
> on peut revenir en arrière.

Penser à aligner `serviceSchema` : ajouter `alternateName` par service
(`["wrapping", "covering intégral", "semi-covering"]`, `["chrome delete"]`,
`["flocage véhicule"]`…). Les IA s'en servent pour relier les synonymes.

---

## 7. Réalisations

- Eyebrow `NOS RÉALISATIONS`, H2 `RÉALISATIONS À GRENOBLE` : déjà bien, on garde.
- **Légendes et alt** : ajouter le lieu et la prestation, une fois par photo,
  sans forcer. Exemples :
  - « Yamaha MT-07, réservoir en film caméléon violet et vert, **kit déco moto
    posé à Sassenage** »
  - « Subaru Impreza en **covering bicolore** violet et argent, à l'atelier
    **près de Grenoble** »
  - « Camion d'hydrocureur, **marquage publicitaire utilitaire** “Assainissement
    & Maintenance” »
- Avant/après : « Kawasaki ZX-6R passée du vert d'origine au gris satiné » →
  ajouter « **covering moto intégral** » dans la phrase.

---

## 8. Méthode

**H2** : `COMMENT SE PASSE UN COVERING` (au lieu de « Comment ça se passe »).
C'est la question que les gens tapent, mot pour mot.

**Intro** :

> Quatre étapes, des délais annoncés à l'avance : de 1 à 5 jours d'atelier
> selon la prestation. Vous savez quand vous récupérez votre véhicule dès le
> devis, pas la veille.

Le délai remonte dans l'intro : c'est la phrase qu'une IA citera à « combien
de temps dure un covering ».

---

## 9. Atelier / Clarisse

C'est votre meilleur atout E-E-A-T et votre différence avec Pole Cover. On
garde le ton, on ajoute les faits.

- **Eyebrow** : `VOTRE POSEUSE DE COVERING À SASSENAGE`
- **H2** : `MOI, C'EST CLARISSE` (on garde : marque personnelle)
- **2e paragraphe**, version proposée :

> Je travaille dans un grand atelier à Sassenage, à quelques minutes de
> Grenoble, partagé avec trois autres poseurs professionnels. Du simple sticker
> au covering complet, sur voitures, motos, utilitaires et deux-roues, en
> atelier ou directement sur site : Grenoble, Voiron, Échirolles,
> Saint-Martin-d'Hères, Vizille et partout en France.

Faits confirmés par Clarisse, à intégrer :

> Depuis 2024, plus de 50 véhicules habillés, voitures, motos et utilitaires.
> Je dessine moi-même chaque création, kit déco, itasha ou logo, de la maquette
> à la pose.

Pas de mention de formation (choix de Clarisse). La création graphique faite
main est **l'angle qui la distingue de Pole Cover** dans le même atelier : à
répéter dans la carte « Kit déco », la FAQ et la fiche Google.

---

## 10. Nouvelle section : FAQ visible (le plus gros levier GEO)

Les réponses existent déjà dans `prestations.ts`. Les réafficher en accordéons
(`<details>`, zéro JS) avant le formulaire, et réémettre `FAQPage`.

**H2** : `QUESTIONS FRÉQUENTES SUR LE COVERING`

Chaque réponse se comprend seule (c'est ce qu'une IA extrait) et nomme le lieu
quand c'est naturel.

1. **Combien coûte un covering voiture à Grenoble ?**
   > Chez SNR Covering, près de Grenoble, comptez à partir de 2 000 à 2 500 €
   > pour le covering complet d'une citadine et de 2 800 à 3 500 € pour un SUV
   > ou une berline. Un toit noir seul démarre entre 250 et 400 €, un covering
   > moto complet entre 900 et 1 500 €. Le prix final dépend de la surface, du
   > film choisi et des démontages. Le devis est gratuit.
1b. **Combien coûtent le PPF, le déchromage et le lettrage ?**
   > Film PPF sur la face avant (capot, pare-chocs, ailes, rétroviseurs) : à
   > partir de 1 300 à 2 000 €. Déchromage des entourages de vitres : à partir
   > de 200 à 350 €. Lettrage d'utilitaire (nom et téléphone sur les portes) :
   > dès 300 €. Kits déco et stickers sur devis, création graphique comprise.
2. **Combien de temps dure la pose d'un covering ?**
   > Comptez 5 jours ou plus d'atelier pour un covering complet, démontage et
   > remontage compris. Un toit, un déchromage ou un lettrage demandent beaucoup
   > moins. Le délai est fixé dès le devis.
3. **Le covering abîme-t-il la peinture ?** (réponse existante)
4. **Faut-il déclarer un changement de couleur sur la carte grise ?** (réponse existante)
5. **Combien de temps tient un covering ?**
   > De 5 à 7 ans d'après les fabricants des films posés (3M, Avery Dennison,
   > Hexis), selon l'exposition. Ce qui l'use le plus vite : le lavage haute
   > pression rapproché et le soleil permanent. Après la pose : un mois sans
   > Kärcher.
6. **Peut-on couvrir une seule partie du véhicule ?** (réponse existante, toit noir, capot…)
7. **Faites-vous le covering moto ?**
   > Oui : réservoir, carénages, garde-boue, en covering intégral ou en kit
   > déco. Moto déposée à l'atelier de Sassenage, près de Grenoble.
8. **Le PPF est-il vraiment invisible ?** (réponse existante)
9. **Où se trouve l'atelier ?**
   > 2 chemin du Bac, 38360 Sassenage, à quelques minutes de Grenoble.
   > L'atelier reçoit uniquement sur rendez-vous. Interventions sur site
   > possibles en Isère et partout en France.

Effet attendu : environ +4 000 caractères de texte utile, éligibilité aux
extraits enrichis et aux réponses des IA (« combien coûte un covering à
Grenoble »).

---

## 11. Devis

- **Eyebrow** : `DEVIS COVERING GRATUIT`
- H2 `DITES-NOUS CE QUE VOUS VOULEZ` : on garde (appel à l'action).
- Intro :

> Quelques photos de votre véhicule et une description de votre idée
> suffisent. Devis gratuit et sans engagement, réponse sous 48 h, pour
> Grenoble, Sassenage, Voiron et toute l'Isère.

---

## 12. Footer

Une ligne NAP (nom, adresse, téléphone) identique au caractère près à la fiche
Google Business Profile :

`SNR Covering · Covering voiture et moto · 2 chemin du Bac, 38360 Sassenage (Grenoble) · 07 82 75 83 16`

---

## 13. GEO : être cité par ChatGPT, Perplexity, Gemini

Ce qui se règle dans le texte :

- **Une phrase d'entité**, répétée à l'identique (hero, llms.txt, JSON-LD
  `description`, Google Business Profile, Instagram bio) :
  > SNR Covering est un atelier de covering voiture et moto à Sassenage, près
  > de Grenoble (Isère), spécialisé en covering intégral, film PPF, déchromage,
  > kit déco et marquage publicitaire.
- **Les chiffres** : prix, délais, durée de vie. Une IA ne cite pas « sur
  devis ».
- **La FAQ visible** (section 10) : c'est le format qu'elles extraient.
- `llms.txt` se met à jour tout seul à partir des mêmes sources.

---

## 14. Hors page : ce qui pèse plus que tout le reste en local

Une one-page peut très bien se classer en local, parce que **le classement du
« pack local » (la carte Google) dépend surtout de la fiche Google Business
Profile**, pas du site :

1. Fiche GBP complète : catégorie principale « Service d'habillage de
   véhicules » (ou « Atelier de covering »), catégories secondaires, les six
   services, photos chaque semaine.
2. **Avis Google** : la fiche existe mais n'a **aucun avis**. C'est la
   priorité absolue. Recontacter les 50 à 100 clients déjà servis, puis en
   demander un à chaque client, et y répondre en citant la
   prestation (« merci pour ce covering gris nardo sur votre Golf »).
3. Lien de la fiche vers le site, NAP identique partout (Pages Jaunes,
   Instagram, Facebook).

Le reste (pages par prestation, liens entrants) est détaillé dans
`docs/SEO.md`.

---

## Réponses de Clarisse (5 nov. 2026)

| Sujet | Réponse |
|---|---|
| Prix | citadine 2 000–2 500 €, SUV 2 800–3 500 €, toit 250–400 €, moto 900–1 500 €, PPF face avant 1 300–2 000 €, déchromage 200–350 €, lettrage dès 300 € |
| Affichage prix | FAQ uniquement |
| Délai covering complet | 5 jours et plus |
| Durée de vie films | 5 à 7 ans |
| Garantie | inconnue : on écrit seulement « garantie fabricant » |
| Début d'activité | 2024 |
| Véhicules réalisés | 50 à 100 |
| Formation | ne pas afficher |
| Création graphique | entièrement faite par Clarisse |
| Accueil | sur rendez-vous uniquement |
| Pole Cover | même atelier partagé |
| Fiche Google | existe, 0 avis |
| H1 | « Covering voiture & moto à Grenoble » + slogan « Changez de couleur, pas de véhicule » |

### Incohérence à corriger à l'intégration

La méthode (`Methode.tsx`, étape 03) affiche « 1 À 5 JOURS SELON LA
PRESTATION ». Un covering complet prend 5 jours et plus : passer à « 1 À 7
JOURS SELON LA PRESTATION » (ou « DE QUELQUES HEURES À 1 SEMAINE ») ; à valider.
