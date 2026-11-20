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
    "SNR Covering est un atelier de covering voiture et moto à Sassenage, près de Grenoble (Isère), spécialisé en covering intégral, film PPF, déchromage, kit déco et marquage publicitaire.",
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
    // Épingle de la fiche Google Business Profile : le site et la fiche
    // doivent donner exactement la même position.
    lat: 45.2195856,
    lng: 5.6667398,
  } as null | {
    street: string;
    postalCode: string;
    city: string;
    lat: number | null;
    lng: number | null;
  },

  /**
   * Horaires de la fiche Google Business Profile, à garder identiques. L'accueil
   * reste sur rendez-vous : ce sont les heures où l'atelier est joignable.
   */
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ] as { days: string[]; opens: string; closes: string }[],

  /**
   * Mentions légales (art. 6 LCEN) et informations précontractuelles
   * (art. L111-1 et L616-1 du Code de la consommation).
   */
  legal: {
    siret: "130 935 927 00017",
    siren: "130 935 927",
    naf: "74.10Z",
    status: "Entreprise individuelle (EI)",
    /**
     * Prénom et nom de l'entrepreneur. Obligatoires pour une EI : la fiche
     * SIRENE est en diffusion restreinte, ils ne figurent donc nulle part
     * ailleurs.
     */
    director: "Clarisse SAUNIER",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis · vercel.com",
    vatNote: "TVA non applicable, art. 293 B du CGI", // à retirer si assujetti
    /** Date affichée en tête des pages légales. À changer à chaque révision. */
    updatedAt: "13 novembre 2026",
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
   * Fourchette de prix, au format Schema.org. Google l'affiche dans les
   * résultats locaux. Bornes tirées des tarifs de la FAQ (`src/content/faq.ts`) :
   * déchromage dès 200 €, covering SUV jusqu'à 3 500 €. À revoir avec eux.
   * `null` retire le champ du balisage.
   */
  priceRange: "200 € - 3500 €" as string | null,

  /** Marques de films posées. Retirer celles qui ne sont pas utilisées. */
  filmBrands: ["3M", "Avery Dennison", "Hexis"],
} as const;

export type Site = typeof site;
