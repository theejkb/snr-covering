import { z } from "zod";
import { prestations } from "./prestations";

const slugs = prestations.map((p) => p.slug);

const realisationSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug en minuscules, tirets uniquement"),
  /** Ex. "Audi A4 Avant" */
  vehicle: z.string(),
  /** Ex. "Covering complet gris nardo satiné" */
  title: z.string(),
  prestationSlug: z.string().refine((s) => slugs.includes(s), "prestation inconnue"),
  /** Ex. "Gris nardo satiné" */
  finish: z.string(),
  film: z.string().nullable(),
  year: z.number().int().min(2020).max(2100),
  summary: z.string(),
  body: z.array(z.string()).min(1),
  /**
   * Chemins relatifs à /public, sous /images/ : un fichier sous /realisations/
   * serait capté par la redirection de next.config.ts. Nommer en slug lisible :
   * /images/realisations/audi-a4-covering-gris-nardo-01.jpg
   */
  photos: z
    .array(
      z.object({
        src: z.string().startsWith("/"),
        /** Marque, modèle, prestation, finition : pas "photo 3" */
        alt: z.string().min(20, "alt trop court pour être utile"),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
    )
    .min(1),
  before: z
    .object({ src: z.string().startsWith("/"), alt: z.string(), width: z.number(), height: z.number() })
    .nullable(),
  after: z
    .object({ src: z.string().startsWith("/"), alt: z.string(), width: z.number(), height: z.number() })
    .nullable(),
});

export type Realisation = z.infer<typeof realisationSchema>;

/**
 * ⚠️ VIDE : à remplir avec les vrais chantiers.
 *
 * Tant que ce tableau est vide, la galerie affiche des emplacements
 * « Photo à venir » (comme les image-slot de la maquette) plutôt que du
 * contenu inventé. Dès qu'une entrée est ajoutée ici, elle apparaît
 * automatiquement sur l'accueil, dans /realisations, dans le sitemap et
 * sur sa propre page /realisations/[slug].
 *
 * Exemple d'entrée :
 *
 * {
 *   slug: "audi-a4-avant-covering-gris-nardo",
 *   vehicle: "Audi A4 Avant B9",
 *   title: "Covering complet gris nardo satiné",
 *   prestationSlug: "covering-voiture-grenoble",
 *   finish: "Gris nardo satiné",
 *   film: "3M 2080",
 *   year: 2026,
 *   summary: "Covering total d'un break familial, avec déchromage des entourages de vitres.",
 *   body: ["Le client souhaitait…"],
 *   photos: [{
 *     src: "/images/realisations/audi-a4-covering-gris-nardo-01.jpg",
 *     alt: "Audi A4 Avant covering complet gris nardo satiné, vue trois quarts avant",
 *     width: 1600, height: 1067,
 *   }],
 *   before: null,
 *   after: null,
 * }
 */
const data: Realisation[] = [];

export const realisations: Realisation[] = z.array(realisationSchema).parse(data);

export function getRealisation(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug);
}

export function realisationsByPrestation(prestationSlug: string): Realisation[] {
  return realisations.filter((r) => r.prestationSlug === prestationSlug);
}
