import { z } from "zod";
import { CATEGORIES } from "./categories";

/**
 * Les tuiles de la galerie : vrais chantiers de l'atelier, photos envoyées
 * par Clarisse le 3 septembre 2026, exportées en 2000 px de grand côté.
 *
 * Les fichiers sont dans /public/images/realisations, pas /public/realisations :
 * la redirection `/realisations/:slug` de next.config.ts passe avant les
 * fichiers statiques et renverrait chaque photo vers l'accueil.
 *
 * Deux ou trois chantiers par prestation, jamais deux fois le même véhicule.
 * La ZX-6R n'y est pas : elle occupe déjà le Hero et l'avant/après.
 *
 * Ducati, MLS et hydrocureur viennent du second envoi d'octobre 2026, reçu
 * en basse définition : tuiles étroites seulement, tant que les originaux ne
 * remplacent pas ces fichiers sous le même nom.
 *
 * `span: 2` occupe deux colonnes. Avec sept tuiles dont une large, la grille
 * de 4 colonnes forme deux lignes pleines. En ajouter : garder un total de
 * colonnes multiple de 4.
 *
 * Les photos sont surtout en portrait alors que les tuiles sont plutôt
 * larges : `object-cover` recadre au centre, ce qui garde le véhicule.
 */
const tuileSchema = z.object({
  title: z.string().min(1),
  cat: z.enum(CATEGORIES),
  /** Libellé affiché à la place de la catégorie, quand il est plus précis */
  label: z.string().optional(),
  span: z.union([z.literal(1), z.literal(2)]),
  photo: z.object({
    src: z.string().startsWith("/images/realisations/"),
    /** Véhicule, prestation, finition : pas « photo 3 » */
    alt: z.string().min(20, "alt trop court pour être utile"),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    /** `object-position` CSS, quand le centre de la photo coupe le véhicule */
    position: z.string().optional(),
  }),
});

export type Tuile = z.infer<typeof tuileSchema>;

const data: Tuile[] = [
  {
    title: "Itasha Genshin Impact",
    cat: "Covering",
    label: "Covering imprimé",
    span: 2,
    photo: {
      src: "/images/realisations/toyota-yaris-kit-deco-genshin-impact.jpg",
      alt: "Pose d'un covering imprimé Genshin Impact sur une Toyota Yaris blanche, en cours à l'atelier",
      width: 1500,
      height: 2000,
    },
  },
  {
    title: "Ducati SuperSport",
    cat: "Kit déco",
    span: 1,
    photo: {
      src: "/images/realisations/ducati-supersport-kit-deco-blanc-rouge.jpg",
      alt: "Ducati SuperSport en kit déco blanc et rouge, coulures rouges et logo diable, vue de profil",
      width: 360,
      height: 480,
      position: "50% 62%",
    },
  },
  {
    title: "MT-07 caméléon",
    cat: "Covering",
    span: 1,
    photo: {
      src: "/images/realisations/yamaha-mt07-covering-reservoir-cameleon.jpg",
      alt: "Yamaha MT-07, réservoir en film caméléon violet et vert avec logo blanc",
      width: 1500,
      height: 2000,
    },
  },
  {
    title: "Utilitaire MLS",
    cat: "Marquage",
    label: "Marquage publicitaire",
    span: 1,
    photo: {
      src: "/images/realisations/utilitaire-marquage-logo-mls.jpg",
      alt: "Portière d'un camion gris anthracite marquée du blason MLS en blanc",
      width: 360,
      height: 624,
      position: "50% 76%",
    },
  },
  {
    title: "Impreza bicolore",
    cat: "Covering",
    span: 1,
    photo: {
      src: "/images/realisations/subaru-impreza-covering-bicolore-violet.jpg",
      alt: "Subaru Impreza break en covering bicolore violet et argent, jantes rouges, à l'atelier",
      width: 1500,
      height: 2000,
    },
  },
  {
    title: "Supermotard noir mat",
    cat: "Kit déco",
    span: 1,
    photo: {
      src: "/images/realisations/supermotard-covering-noir-mat.jpg",
      alt: "Moto supermotard habillée d'un kit déco noir mat, garée devant une façade",
      width: 1138,
      height: 2000,
    },
  },
  {
    title: "Hydrocureur",
    cat: "Marquage",
    label: "Marquage publicitaire",
    span: 1,
    photo: {
      src: "/images/realisations/hydrocureur-marquage-publicitaire.jpg",
      alt: "Citerne d'hydrocureur blanche marquée « Assainissement & Maintenance », à l'atelier",
      width: 360,
      height: 480,
    },
  },
];

export const galerie: Tuile[] = z.array(tuileSchema).parse(data);

