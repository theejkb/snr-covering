/**
 * Les six familles de prestation, isolées dans leur propre module.
 *
 * Pourquoi ce fichier existe : cette liste est lue par le formulaire, qui est
 * un composant client. Tant qu'elle vivait dans `galerie.ts` : lequel valide
 * ses données avec Zod : importer la constante tirait Zod dans le bundle du
 * navigateur. Mesuré : 74 ko gzip pour cinq chaînes de caractères.
 *
 * Ce module ne doit donc jamais rien importer.
 */
export const CATEGORIES = [
  "Covering",
  "PPF",
  "Kit déco",
  "Stickers",
  "Marquage",
  "Déchromage",
] as const;

export type Categorie = (typeof CATEGORIES)[number];
