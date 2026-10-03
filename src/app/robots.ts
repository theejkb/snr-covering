import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Tout est autorisé, y compris les robots des moteurs génératifs.
 *
 * C'est une décision, pas un oubli : pour un artisan local, être cité dans une
 * réponse ChatGPT, Perplexity ou Google AI Overviews est un canal d'acquisition.
 * Les agents sont listés explicitement pour que l'intention soit lisible, et
 * pour qu'on sache quoi retirer si l'avis change.
 *
 * - GPTBot / OAI-SearchBot / ChatGPT-User : OpenAI (entraînement, index, visites)
 * - PerplexityBot / Perplexity-User : Perplexity
 * - ClaudeBot / Claude-User / Claude-SearchBot : Anthropic
 * - Google-Extended : Gemini et les AI Overviews (distinct de Googlebot)
 * - Applebot-Extended : Apple Intelligence
 */
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  // Avant le lancement : rien n'est exploré. Voir `site.indexable`.
  if (!site.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
