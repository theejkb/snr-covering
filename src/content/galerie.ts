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
 * `span: 2` occupe deux colonnes. Avec six tuiles dont deux larges, en 1ʳᵉ et
 * 5ᵉ position, la grille de 4 colonnes forme deux lignes pleines.
 *
 * Les photos sont surtout en portrait alors que les tuiles sont plutôt
 * larges : `object-cover` recadre au centre, ce qui garde le véhicule.
 */
const tuileSchema = z.object({
  title: z.string().min(1),
  cat: z.enum(CATEGORIES),
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
    title: "Kawasaki ZX-6R gris satiné",
    cat: "Covering",
    span: 2,
    photo: {
      src: "/images/realisations/kawasaki-zx6r-covering-gris-satine.jpg",
      alt: "Kawasaki Ninja ZX-6R en covering intégral gris satiné, vue de profil",
      width: 1500,
      height: 2000,
      position: "50% 56%",
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
    title: "Supermotard noir mat",
    cat: "Covering",
    span: 1,
    photo: {
      src: "/images/realisations/supermotard-covering-noir-mat.jpg",
      alt: "Moto supermotard en covering intégral noir mat, garée devant une façade",
      width: 1138,
      height: 2000,
    },
  },
  {
    title: "Itasha Genshin Impact",
    cat: "Déco",
    span: 2,
    photo: {
      src: "/images/realisations/toyota-yaris-kit-deco-genshin-impact.jpg",
      alt: "Pose d'un kit déco intégral Genshin Impact sur une Toyota Yaris blanche, en cours à l'atelier",
      width: 1500,
      height: 2000,
    },
  },
  {
    title: "Film chrome vert",
    cat: "Covering",
    span: 1,
    photo: {
      src: "/images/realisations/pose-film-chrome-vert-garde-boue.jpg",
      alt: "Garde-boue en cours de covering avec un film chrome vert émeraude",
      width: 2000,
      height: 1500,
    },
  },
];

export const galerie: Tuile[] = z.array(tuileSchema).parse(data);

