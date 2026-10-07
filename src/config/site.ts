/**
 * Point unique de vérité pour tout ce qui est propre à l'entreprise.
 *
 * ⚠️ Les entrées marquées TODO sont des ENGAGEMENTS COMMERCIAUX ou des
 * mentions légales obligatoires. Elles sont volontairement laissées vides ou
 * marquées : ne les laisse pas en l'état en production.
 */

export const site = {
  name: "SNR Covering",
  legalName: "SNR Covering",
  // TODO : remplacer par le domaine réel avant mise en ligne
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.snrcovering.fr",
  /**
   * Indexation par les moteurs. Désactivée tant que le site n'est pas lancé :
   * robots.txt bloque tout, chaque page porte `noindex` (balise et en-tête
   * X-Robots-Tag). Pour ouvrir : NEXT_PUBLIC_SITE_INDEXABLE=true sur Vercel,
   * puis redéployer.
   */
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  description:
    "Atelier de covering à Grenoble : covering total ou partiel, film de protection PPF, déchromage, stickers, kit déco et marquage publicitaire.",
  city: "Grenoble",
  department: "Isère",
  /**
   * Communes desservies. « Isère » n'y figure pas : c'est le département,
   * porté par `department` et balisé en `AdministrativeArea`. Le typer en
   * `City` dans le JSON-LD était une erreur factuelle.
   */
  areaServed: ["Grenoble", "Sassenage", "Échirolles", "Saint-Martin-d'Hères", "Voiron", "Vizille"],
  email: "Covering.snr@gmail.com",
  phone: "07 82 75 83 16",
  phoneE164: "+33782758316",
  instagram: "snrcovering",
  instagramUrl: "https://www.instagram.com/snrcovering/",

  /**
   * Adresse physique. Laisser `null` si l'atelier n'accueille pas de public :
   * le balisage bascule alors sur `areaServed` seul, ce qui reste valide pour
   * Google. Ne jamais inventer une adresse pour "faire du local".
   */
  address: {
    street: "2 chemin du Bac",
    postalCode: "38360",
    city: "Sassenage",
    // Coordonnées GPS : à renseigner avec la position exacte de l'atelier
    // (clic droit sur Google Maps). Sans elles, le balisage omet `geo`.
    lat: null,
    lng: null,
  } as null | {
    street: string;
    postalCode: string;
    city: string;
    lat: number | null;
    lng: number | null;
  },

  /** TODO : horaires réels, ou laisser vide pour ne rien afficher */
  openingHours: [] as { days: string[]; opens: string; closes: string }[],

  /** TODO : mentions légales obligatoires (art. 6 LCEN) */
  legal: {
    siret: "TODO_SIRET",
    status: "TODO_FORME_JURIDIQUE", // ex. « Entreprise individuelle »
    director: "TODO_NOM_DU_RESPONSABLE",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
    vatNote: "TVA non applicable, art. 293 B du CGI", // à retirer si assujetti
  },

  /**
   * Chiffres affichés dans le hero. La garantie films a été retirée à la
   * demande de Clarisse : elle figure sur la facture, pas sur le site.
   *
   * ⚠️ « 48 h » est un ENGAGEMENT COMMERCIAL. Mettre une valeur à `null`
   * retire proprement la statistique de la grille.
   */
  stats: [
    { value: "100", label: "Sur-mesure", suffix: "%" },
    { value: "6", label: "Prestations" },
    { value: "48 h", label: "Devis envoyé" },
  ] as { value: string | null; label: string; suffix?: string }[],

  /**
   * TODO : délai de réponse annoncé. C'est un engagement, ne l'affiche que
   * s'il est tenable. Mettre `null` retire la mention de tout le site.
   */
  quoteDelay: "48 h" as string | null,

  /**
   * TODO : fourchette de prix, au format Schema.org, "€", "€€", "€€€"
   * ou "50 € - 3000 €". Google l'affiche dans les résultats locaux et c'est
   * l'information que les moteurs génératifs cherchent en premier.
   * Laisser `null` tant qu'elle n'est pas décidée : le champ n'est alors pas
   * émis du tout, plutôt qu'annoncé au hasard.
   */
  priceRange: null as string | null,

  /** Marques de films posées. Retirer celles qui ne sont pas utilisées. */
  filmBrands: ["3M", "Avery Dennison", "Hexis"],
} as const;

export type Site = typeof site;
