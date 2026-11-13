import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { legalLinks } from "@/components/LegalPage";

/**
 * L'accueil, plus les pages légales.
 *
 * - Les ancres (`/#covering-…`) n'y figurent pas : Google ne les traite pas
 *   comme des adresses distinctes.
 * - Les pages légales sont indexables : les laisser en `noindex` déclenchait
 *   l'alerte « Exclue par la balise noindex » dans la Search Console, sans rien
 *   apporter en échange. Elles rassurent aussi un client qui cherche le SIRET.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", site.url).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...legalLinks.map((l) => ({
      url: new URL(l.href, site.url).toString(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
