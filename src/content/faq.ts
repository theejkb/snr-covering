import { z } from "zod";
import { site } from "@/config/site";

/**
 * Questions fréquentes affichées sur la page, et balisées en `FAQPage`.
 *
 * Chaque réponse doit se comprendre seule, sortie de la page : c'est le
 * passage qu'un moteur génératif extrait et cite. D'où la répétition
 * volontaire du nom de l'atelier et du lieu quand c'est naturel.
 *
 * Prix, délais et durées de vie confirmés par Clarisse le 5 novembre 2026.
 * Ce sont des fourchettes « à partir de » : à mettre à jour ici si les tarifs
 * changent, la page, le JSON-LD et /llms.txt suivent.
 */
const faqSchema = z.array(
  z.object({
    question: z.string().min(10),
    answer: z.string().min(40),
  }),
);

export type Question = z.infer<typeof faqSchema>[number];

const ville = site.address?.city ?? site.city;

const data: Question[] = [
  {
    question: `Combien coûte un covering voiture à ${site.city} ?`,
    answer: `Chez ${site.name}, près de ${site.city}, comptez à partir de 2 000 à 2 500 € pour le covering complet d'une citadine, et de 2 800 à 3 500 € pour un SUV ou une berline. Un toit noir seul démarre entre 250 et 400 €, un covering moto complet entre 900 et 1 500 €. Le prix final dépend de la surface, du film choisi et des démontages. Le devis est gratuit.`,
  },
  {
    question: "Combien coûtent le PPF, le déchromage et le lettrage ?",
    answer:
      "Film de protection PPF sur la face avant (capot, pare-chocs, ailes, rétroviseurs) : à partir de 1 300 à 2 000 €. Déchromage des entourages de vitres : à partir de 200 à 350 €. Lettrage d'utilitaire (nom et téléphone sur les portes) : dès 300 €. Kits déco et stickers sur devis, création graphique comprise.",
  },
  {
    question: "Combien de temps dure la pose d'un covering ?",
    answer:
      "Comptez 5 jours ou plus d'atelier pour un covering complet, démontage et remontage compris. Un toit, un déchromage ou un lettrage demandent beaucoup moins de temps. Selon la prestation, le véhicule reste de 1 à 7 jours à l'atelier, et le délai est fixé dès le devis.",
  },
  {
    question: "Le covering abîme-t-il la peinture ?",
    answer:
      "Non, sur une peinture d'origine saine et bien accrochée. Le film se retire à chaud et ne laisse pas de résidu. En revanche, sur une peinture déjà refaite ou qui s'écaille, le retrait peut emporter des éclats. C'est pourquoi on contrôle l'état de la carrosserie avant de poser.",
  },
  {
    question: "Faut-il déclarer un changement de couleur sur la carte grise ?",
    answer:
      "Oui. Un changement de couleur visible doit être déclaré pour mettre à jour la carte grise. La démarche se fait en ligne sur le site de l'ANTS et reste simple, mais elle est obligatoire.",
  },
  {
    question: "Combien de temps tient un covering ?",
    answer: `De 5 à 7 ans d'après les fabricants des films posés (${site.filmBrands.join(", ")}), selon l'exposition. Ce qui l'use le plus vite : le lavage haute pression rapproché et le soleil permanent. Après la pose, il faut attendre un mois avant de passer au Kärcher.`,
  },
  {
    question: "Peut-on couvrir une seule partie du véhicule ?",
    answer:
      "Tout à fait, et c'est même très courant : toit noir, capot contrasté, bas de caisse, rétroviseurs. Le rendu est net à condition de respecter les lignes naturelles de la carrosserie.",
  },
  {
    question: "Faites-vous le covering moto ?",
    answer: `Oui : réservoir, carénages, garde-boue, en covering intégral ou en kit déco dessiné sur mesure. La moto est déposée à l'atelier de ${ville}, près de ${site.city}.`,
  },
  {
    question: "Le film PPF est-il vraiment invisible ?",
    answer:
      "Sur une peinture en bon état et avec une pose soignée, oui : les bords sont dissimulés dans les jeux de carrosserie et le film épouse la teinte. On peut deviner la limite en s'approchant à quelques centimètres, pas au-delà.",
  },
  {
    question: "Où se trouve l'atelier ?",
    answer: site.address
      ? `${site.name} est installé ${site.address.street}, ${site.address.postalCode} ${site.address.city}, à quelques minutes de ${site.city}. L'atelier reçoit uniquement sur rendez-vous. Interventions sur site possibles en ${site.department} et partout en France.`
      : `${site.name} est installé près de ${site.city}. L'atelier reçoit uniquement sur rendez-vous. Interventions sur site possibles en ${site.department} et partout en France.`,
  },
];

export const faq: Question[] = faqSchema.parse(data);
