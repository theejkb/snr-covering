import { z } from "zod";
import { CATEGORIES } from "@/content/categories";

/**
 * Le formulaire suit la maquette : un seul champ de contact, des services
 * choisis par pastilles. La validation, elle, reste sérieuse : la maquette
 * n'en avait aucune.
 */

/** Email valide OU numéro plausible : la maquette demande « Email ou téléphone ». */
const contactSchema = z
  .string()
  .trim()
  .min(5, "Laissez un email ou un numéro pour qu'on puisse répondre.")
  .max(120)
  .refine(
    (v) => z.string().email().safeParse(v).success || /^[0-9+\s.()-]{9,}$/.test(v),
    "Indiquez un email valide ou un numéro de téléphone.",
  );

export const devisSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  contact: contactSchema,
  vehicule: z.string().trim().max(120).optional(),
  /**
   * Les pastilles de service. Le champ est envoyé une fois par pastille
   * sélectionnée, d'où le tableau ; aucune sélection reste valide, comme dans
   * la maquette où rien n'est obligatoire.
   */
  services: z.array(z.enum(CATEGORIES)).max(CATEGORIES.length).default([]),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots.").max(3000),
  consentement: z.literal("on", { message: "Le consentement est nécessaire pour vous répondre." }),
  /**
   * Honeypot : rempli uniquement par les robots.
   * Volontairement permissif : le rejet se fait dans la Server Action, qui
   * répond « envoyé » sans rien envoyer. Le valider strictement renverrait une
   * erreur sur un champ invisible, impossible à corriger pour un visiteur dont
   * le gestionnaire de mots de passe l'aurait rempli.
   */
  societe: z.string().max(200).optional(),
});

export type DevisInput = z.infer<typeof devisSchema>;
