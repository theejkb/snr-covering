import { z } from "zod";

/**
 * Variables d'environnement validées au démarrage : on échoue au build plutôt
 * qu'en production. RESEND_API_KEY est optionnelle : sans elle, le formulaire
 * affiche une erreur explicite au lieu de faire semblant d'envoyer.
 */
const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_FROM_EMAIL: z.string().email().default("onboarding@resend.dev"),
  CONTACT_TO_EMAIL: z.string().email().default("Covering.snr@gmail.com"),
  /**
   * Jeton de l'API Instagram. Optionnel : sans lui, la section Instagram
   * affiche ses emplacements réservés au lieu des vraies publications.
   * Voir `src/lib/instagram.ts` pour la marche à suivre.
   */
  INSTAGRAM_ACCESS_TOKEN: z.string().min(1).optional(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || undefined,
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || undefined,
});

if (!parsed.success) {
  throw new Error(
    `Variables d'environnement invalides :\n${JSON.stringify(z.treeifyError(parsed.error), null, 2)}`,
  );
}

export const env = parsed.data;
