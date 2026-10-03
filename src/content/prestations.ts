import { z } from "zod";

const sectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()).min(1),
});

const prestationSchema = z.object({
  slug: z.string(),
  number: z.string(),
  /** Titre affiché sur la carte de l'accueil, en deux lignes */
  cardTitle: z.tuple([z.string(), z.string().optional()]),
  cardExcerpt: z.string(),
  accent: z.enum(["blue", "pink"]),
  /** h1 de la page dédiée : contient la requête cible */
  h1: z.string(),
  metaTitle: z.string().max(65),
  metaDescription: z.string().max(160),
  eyebrow: z.string(),
  intro: z.string(),
  sections: z.array(sectionSchema).min(2),
  forWho: z.array(z.string()).min(2),
  /** null tant que le délai réel n'est pas confirmé */
  duration: z.string().nullable(),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })).min(2),
});

export type Prestation = z.infer<typeof prestationSchema>;

const data: Prestation[] = [
  {
    slug: "covering-voiture-grenoble",
    number: "01",
    cardTitle: ["COVERING", "SEMI & FULL"],
    cardExcerpt:
      "Mat, satiné, brillant ou brossé : votre voiture change de couleur en quelques jours. Le film se retire, la teinte d'origine réapparaît, et votre valeur de revente avec.",
    accent: "blue",
    h1: "Covering voiture à Grenoble",
    metaTitle: "Covering voiture à Grenoble · SNR Covering",
    metaDescription:
      "Covering total ou partiel à Grenoble : films mats, brillants, satinés ou brossés, posés à la main. Réversible, sans abîmer la peinture. Devis gratuit.",
    eyebrow: "Prestation 01",
    intro:
      "Le covering consiste à recouvrir la carrosserie d'un film adhésif de couleur. Votre voiture change d'apparence sans passer par la peinture, et l'opération reste réversible : le film se retire, la teinte d'origine réapparaît.",
    sections: [
      {
        heading: "Covering total ou partiel, que choisir",
        paragraphs: [
          "Le covering total recouvre l'intégralité des surfaces peintes. C'est le choix quand vous voulez changer complètement l'identité du véhicule, ou quand la peinture d'origine commence à fatiguer sans justifier une réfection complète.",
          "Le covering partiel se concentre sur quelques éléments : toit, capot, rétroviseurs, bas de caisse, ailes. Il coûte nettement moins cher, se pose plus vite, et suffit souvent à transformer la silhouette d'une voiture. C'est aussi une bonne façon de tester une teinte avant de s'engager sur un total.",
        ],
      },
      {
        heading: "Les finitions disponibles",
        paragraphs: [
          "Le mat absorbe la lumière et durcit les lignes du véhicule. Il demande un peu plus d'attention à l'entretien : les traces de doigts et les projections se voient davantage que sur un brillant.",
          "Le satiné se situe entre les deux. C'est la finition la plus polyvalente, celle qui pardonne le mieux les défauts d'entretien tout en gardant un rendu contemporain.",
          "Le brillant imite la peinture et se nettoie comme elle. Le brossé, le carbone et les teintes caméléon relèvent d'une démarche plus affirmée, généralement réservée à des éléments partiels.",
        ],
      },
      {
        heading: "L'état de la peinture compte",
        paragraphs: [
          "Un film adhésif épouse la surface : il ne comble pas les défauts, il les souligne. Une carrosserie grêlée, écaillée ou couverte de rayures profondes doit être préparée avant la pose, sinon le relief transparaît.",
          "La peinture doit également être saine et bien accrochée. Sur une peinture qui farine ou qui a déjà été refaite sans préparation sérieuse, le retrait du film peut emporter des éclats. On vérifie systématiquement l'état de la carrosserie avant de s'engager, et on vous le dit franchement si le support ne s'y prête pas.",
        ],
      },
      {
        heading: "Entretien et durée de vie",
        paragraphs: [
          "Un film posé dans les règles se lave comme une peinture, à la main de préférence. Le rouleau des stations de lavage automatique attaque les bords et finit par décoller les recouvrements.",
          "Évitez les nettoyeurs haute pression à faible distance, surtout sur les arêtes et les bords de film. Les fientes d'oiseaux et les résidus d'insectes se retirent rapidement : leur acidité marque un film mat plus vite qu'une peinture.",
        ],
      },
    ],
    forWho: [
      "Changer de couleur sans repeindre, et pouvoir revenir en arrière",
      "Protéger la peinture d'origine d'un véhicule que vous comptez revendre",
      "Masquer une peinture fatiguée sans engager une réfection complète",
      "Personnaliser un véhicule de société tout en gardant sa valeur de revente",
    ],
    duration: null,
    faq: [
      {
        question: "Le covering abîme-t-il la peinture ?",
        answer:
          "Non, sur une peinture d'origine saine et bien accrochée. Le film se retire à chaud et ne laisse pas de résidu. En revanche, sur une peinture déjà refaite ou qui s'écaille, le retrait peut emporter des éclats. C'est pourquoi on contrôle l'état de la carrosserie avant de poser.",
      },
      {
        question: "Faut-il déclarer un changement de couleur ?",
        answer:
          "Oui. Un changement de couleur visible doit être déclaré pour mettre à jour la carte grise. La démarche se fait en ligne sur le site de l'ANTS et reste simple, mais elle est obligatoire.",
      },
      {
        question: "Peut-on couvrir une seule partie du véhicule ?",
        answer:
          "Tout à fait, et c'est même très courant : toit noir, capot contrasté, bas de caisse, rétroviseurs. Le rendu est net à condition de respecter les lignes naturelles de la carrosserie.",
      },
    ],
  },
  {
    slug: "ppf-protection-carrosserie-grenoble",
    number: "02",
    cardTitle: ["PPF", "PROTECTION"],
    cardExcerpt:
      "Les gravillons d'autoroute s'arrêtent sur le film, pas sur votre peinture. Invisible, auto-cicatrisant, garanti par le fabricant.",
    accent: "pink",
    h1: "Film de protection PPF à Grenoble",
    metaTitle: "PPF à Grenoble, protection carrosserie | SNR Covering",
    metaDescription:
      "Pose de film de protection PPF à Grenoble : protection transparente contre les gravillons et les micro-rayures. Invisible et auto-cicatrisant.",
    eyebrow: "Prestation 02",
    intro:
      "Le PPF, ou Paint Protection Film, est un film polyuréthane transparent appliqué sur la peinture. Il encaisse les gravillons, les micro-rayures et les projections à la place de la carrosserie, sans modifier l'aspect du véhicule.",
    sections: [
      {
        heading: "Ce que le PPF encaisse réellement",
        paragraphs: [
          "L'épaisseur du film absorbe l'impact des gravillons projetés sur autoroute, cause la plus fréquente des éclats de peinture sur les faces avant, les bas de caisse et les arrières de passage de roue.",
          "Les micro-rayures de lavage disparaissent d'elles-mêmes : la couche supérieure du film est auto-cicatrisante et se referme sous l'effet de la chaleur, au soleil ou avec un peu d'eau chaude.",
          "Ce que le PPF ne fait pas : il n'arrête pas un choc de parking ni une rayure profonde faite à la clé. C'est une protection contre l'usure du quotidien, pas un blindage.",
        ],
      },
      {
        heading: "Protection intégrale ou zones exposées",
        paragraphs: [
          "La pose intégrale couvre toutes les surfaces peintes. C'est le choix des véhicules neufs ou récents que l'on veut conserver dans un état irréprochable, notamment en vue d'une revente.",
          "La pose sur zones exposées se concentre là où les impacts arrivent : pare-chocs avant, capot, ailes avant, rétroviseurs, montants de pare-brise, seuils de porte. Elle couvre l'essentiel du risque pour une fraction du budget.",
          "Les deux approches se combinent avec un covering : on peut protéger la face avant en PPF et couvrir le reste en film de couleur.",
        ],
      },
      {
        heading: "Une pose qui se voit, ou pas",
        paragraphs: [
          "La qualité d'une pose PPF se juge aux bords. Un film bien posé se glisse sous les joints et les optiques, ou s'arrête sur une ligne de carrosserie où le raccord devient invisible.",
          "Un film coupé à la lame directement sur le véhicule laisse une marque dans le vernis. La découpe se fait au plotter, d'après le gabarit du modèle, ou à la main hors du véhicule.",
        ],
      },
    ],
    forWho: [
      "Véhicule neuf ou récent que vous voulez garder impeccable",
      "Beaucoup d'autoroute et de routes gravillonnées",
      "Peinture fragile : noir brillant, blanc nacré, teintes mates d'origine",
      "Véhicule de collection ou de valeur destiné à être conservé",
    ],
    duration: null,
    faq: [
      {
        question: "Le PPF jaunit-il avec le temps ?",
        answer:
          "Les films actuels intègrent un traitement anti-UV qui évite le jaunissement sur leur durée de garantie. Les films premium des grandes marques tiennent plusieurs années sans virer, ce qui n'était pas le cas des premières générations.",
      },
      {
        question: "Peut-on poser du PPF sur un covering ?",
        answer:
          "Ce n'est pas la bonne approche : deux films superposés se décollent l'un l'autre. En revanche, on peut traiter des zones différentes du même véhicule : PPF sur la face avant, covering ailleurs.",
      },
      {
        question: "Le film est-il vraiment invisible ?",
        answer:
          "Sur une peinture en bon état et avec une pose soignée, oui : les bords sont dissimulés dans les jeux de carrosserie et le film épouse la teinte. On peut deviner la limite en s'approchant à quelques centimètres, pas au-delà.",
      },
    ],
  },
  {
    slug: "kit-deco-personnalise",
    number: "03",
    cardTitle: ["KIT DÉCO", "PERSO"],
    cardExcerpt:
      "Bandes racing, numéros, logos de sponsors. On vous montre le rendu sur votre modèle avant de découper quoi que ce soit.",
    accent: "blue",
    h1: "Kit déco personnalisé pour véhicule",
    metaTitle: "Kit déco personnalisé véhicule · SNR Covering Grenoble",
    metaDescription:
      "Création et pose de kits déco sur-mesure à Grenoble : bandes racing, motifs, numéros, logos de sponsors. Conception avec vous, pose à l'atelier.",
    eyebrow: "Prestation 03",
    intro:
      "Un kit déco, c'est un habillage graphique dessiné pour un véhicule précis. On part de votre idée, on la met en forme sur le gabarit de votre modèle, et on pose une fois le visuel validé.",
    sections: [
      {
        heading: "De l'idée au gabarit",
        paragraphs: [
          "Tout commence par ce que vous avez en tête : une référence, un croquis, une photo d'un véhicule qui vous plaît, ou juste une direction. On travaille ensuite sur le gabarit du modèle pour que le dessin suive vraiment les volumes de la carrosserie.",
          "Vous validez une simulation avant que quoi que ce soit ne soit découpé. C'est l'étape qui évite les mauvaises surprises : un motif qui fonctionne à plat ne fonctionne pas forcément sur une aile bombée.",
        ],
      },
      {
        heading: "Ce qu'on pose le plus souvent",
        paragraphs: [
          "Les bandes racing, du simple double liseré capot-toit-coffre aux compositions plus travaillées qui suivent les lignes de caisse.",
          "Les numéros de course et les blocs de sponsors pour les véhicules qui roulent en circuit ou en compétition amateur, avec les contraintes de lisibilité et de placement que cela implique.",
          "Les habillages d'utilitaires professionnels : logo, coordonnées, mentions de métier. Un fourgon bien habillé travaille pour vous à chaque déplacement, à condition que l'information reste lisible à distance et en mouvement.",
        ],
      },
      {
        heading: "Voitures, utilitaires et deux-roues",
        paragraphs: [
          "Les deux-roues demandent un travail différent : beaucoup de petites surfaces, des courbes serrées, des carénages souvent démontés pour poser proprement. Le résultat vaut le détour, mais le temps de pose n'a rien à voir avec une portière plate.",
          "Sur utilitaire, la surface est généreuse et régulière, ce qui autorise des visuels de grande taille. C'est le support où un kit déco a le meilleur rapport impact/budget.",
        ],
      },
    ],
    forWho: [
      "Véhicule de compétition ou de piste amateur",
      "Utilitaire ou flotte professionnelle à habiller",
      "Projet personnel avec un dessin précis en tête",
      "Deux-roues : moto, scooter, quad",
    ],
    duration: null,
    faq: [
      {
        question: "Faut-il fournir les fichiers du logo ?",
        answer:
          "C'est l'idéal : un fichier vectoriel donne une découpe nette à n'importe quelle taille. À partir d'une image basse résolution, il faut d'abord la redessiner. C'est faisable, cela demande simplement du temps.",
      },
      {
        question: "Un kit déco s'enlève-t-il facilement ?",
        answer:
          "Oui, comme tout film adhésif : retrait à chaud, sans résidu sur une peinture saine. C'est ce qui rend la formule intéressante pour un véhicule de société qu'on remet en configuration neutre avant revente.",
      },
      {
        question: "Peut-on ajouter une déco sur un covering existant ?",
        answer:
          "Oui, à condition que le covering soit récent et bien posé. Le film de déco adhère sur le film de couleur sans difficulté particulière.",
      },
    ],
  },
  {
    slug: "stickers-lettrage-vehicule",
    number: "04",
    cardTitle: ["STICKERS", undefined],
    cardExcerpt:
      "Votre fourgon travaille pour vous à chaque déplacement. Logo, coordonnées, numéro de course : découpe et pose au millimètre, à l'unité comme en série.",
    accent: "pink",
    h1: "Stickers et lettrage véhicule à Grenoble",
    metaTitle: "Stickers et lettrage véhicule · SNR Covering Grenoble",
    metaDescription:
      "Découpe et pose de stickers et lettrage adhésif à Grenoble : logos, textes, numéros. À l'unité ou en série, pour véhicules et vitrines.",
    eyebrow: "Prestation 04",
    intro:
      "Un sticker bien découpé et bien posé, c'est ce qui sépare un marquage propre d'un autocollant qui gondole. On travaille la découpe au plotter et la pose à la main, à l'unité comme en série.",
    sections: [
      {
        heading: "Découpe vectorielle ou impression",
        paragraphs: [
          "La découpe se fait dans un film de couleur unie : le résultat est un adhésif sans fond, qui laisse voir la carrosserie autour des lettres. C'est la solution la plus nette pour un logo simple, un texte ou un numéro.",
          "L'impression devient nécessaire dès que le visuel comporte des dégradés, des photos ou trop de couleurs. Le fichier est alors imprimé puis laminé pour résister aux UV et aux frottements.",
        ],
      },
      {
        heading: "Les supports possibles",
        paragraphs: [
          "Carrosserie, vitrage, casque, coffre de moto, vitrine de commerce, panneaux : le film adhésif se pose sur toute surface lisse et propre.",
          "Le vitrage demande une attention particulière : un adhésif posé côté extérieur s'use plus vite qu'un adhésif posé côté intérieur, mais reste lisible dans le bon sens sans film spécifique. On choisit selon ce que vous cherchez à obtenir.",
        ],
      },
      {
        heading: "La pose fait la différence",
        paragraphs: [
          "Un sticker se pose sans bulle avec de la méthode : surface dégraissée, alignement au ruban de masquage, pose humide ou à sec selon la taille, marouflage progressif du centre vers les bords.",
          "Les petites séries pour un club ou une entreprise se posent dans la foulée, avec un gabarit d'alignement pour que tous les véhicules soient identiques.",
        ],
      },
    ],
    forWho: [
      "Marquage d'un véhicule professionnel : logo et coordonnées",
      "Numéro de course ou identification de club",
      "Personnalisation ponctuelle : casque, moto, vitre",
      "Petite série identique pour une flotte ou une association",
    ],
    duration: null,
    faq: [
      {
        question: "Combien de temps tient un sticker ?",
        answer:
          "Un film de qualité, posé sur une surface bien préparée, tient plusieurs années en extérieur. Ce qui l'use le plus vite : le lavage haute pression rapproché et l'exposition permanente au soleil sans lamination.",
      },
      {
        question: "Peut-on retirer un sticker sans marquer la peinture ?",
        answer:
          "Oui, avec de la chaleur et du temps. Le point de vigilance concerne les adhésifs très anciens, dont la colle a durci : le retrait est alors plus long et demande un nettoyage à l'éliminateur de colle.",
      },
      {
        question: "Peut-on faire un sticker à partir d'une simple photo ?",
        answer:
          "Pour une découpe, il faut un tracé vectoriel : on redessine le motif à partir de votre image. Pour une impression, une image en bonne résolution suffit.",
      },
    ],
  },
  {
    slug: "dechromage-grenoble",
    number: "05",
    cardTitle: ["DÉCHROMAGE", undefined],
    cardExcerpt:
      "Les entourages de vitres chromés sont ce qui date le plus une voiture. On les passe en noir mat ou brillant, et on peut revenir en arrière.",
    accent: "blue",
    h1: "Déchromage à Grenoble",
    metaTitle: "Déchromage à Grenoble · SNR Covering",
    metaDescription:
      "Déchromage de véhicule à Grenoble : calandre, entourages de vitres, baguettes et logos passés en noir mat ou brillant. Réversible, sans peinture.",
    eyebrow: "Prestation 05",
    intro:
      "Le déchromage supprime les éléments brillants d'un véhicule en les recouvrant d'un film noir. La silhouette se durcit, les volumes se lisent différemment, et l'opération reste réversible puisqu'on ne peint rien.",
    sections: [
      {
        heading: "Ce qu'on traite",
        paragraphs: [
          "Les entourages de vitres et les baguettes de custode, qui sont souvent la première chose qui date une voiture. C'est le déchromage le plus demandé et le plus spectaculaire par rapport au temps passé.",
          "La calandre et ses inserts, les logos de marque, les poignées, les coques de rétroviseurs, les sorties d'échappement factices. Chaque élément peut être traité séparément selon le rendu recherché.",
        ],
      },
      {
        heading: "Film ou peinture",
        paragraphs: [
          "Le film est réversible : on retire, le chrome d'origine réapparaît. C'est un vrai argument sur un véhicule en LOA, en location longue durée, ou destiné à être revendu à un acheteur qui n'a pas les mêmes goûts.",
          "La peinture donne un résultat plus durable sur les pièces très exposées, mais elle est définitive et suppose un démontage plus poussé. Sur la plupart des véhicules, le film couvre le besoin.",
        ],
      },
      {
        heading: "Mat ou brillant",
        paragraphs: [
          "Le noir brillant conserve un effet de profondeur et reste proche de l'esprit des finitions d'usine haut de gamme. Il se salit moins visiblement.",
          "Le noir mat assèche complètement les reflets et donne un rendu plus radical. Sur les entourages de vitres, il souligne fortement la ligne de toit.",
        ],
      },
    ],
    forWho: [
      "Véhicule dont les chromes ternissent ou piquent",
      "Envie d'un rendu plus sobre sans repeindre",
      "Véhicule en LOA ou LLD : rendu modifiable, retour à l'origine possible",
      "Complément naturel d'un covering ou d'une pose de jantes",
    ],
    duration: null,
    faq: [
      {
        question: "Le déchromage passe-t-il au contrôle technique ?",
        answer:
          "Oui pour les éléments décoratifs : entourages, baguettes, logos, calandre. En revanche, tout ce qui touche à l'éclairage et à la signalisation doit rester conforme : on ne couvre ni les optiques ni les feux.",
      },
      {
        question: "Peut-on revenir en arrière ?",
        answer:
          "C'est tout l'intérêt du film. Le retrait se fait à chaud, sans altérer le chrome d'origine dessous, à condition que celui-ci soit encore sain au moment de la pose.",
      },
      {
        question: "Que faire si les chromes sont déjà piqués ?",
        answer:
          "Un chrome qui cloque ou qui se décolle ne constitue pas un bon support : le film reproduit le relief. On évalue l'état pièce par pièce et on vous dit ce qui peut être couvert tel quel et ce qui demande une préparation.",
      },
    ],
  },
];

export const prestations: Prestation[] = z.array(prestationSchema).parse(data);

export function getPrestation(slug: string): Prestation | undefined {
  return prestations.find((p) => p.slug === slug);
}
