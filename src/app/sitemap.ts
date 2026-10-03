import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Site en une seule page : une seule URL à déclarer.
 *
 * - Les ancres (`/#covering-…`) n'y figurent pas : Google ne les traite pas
 *   comme des adresses distinctes.
 * - `/mentions-legales` non plus : la page est en `noindex`, l'inscrire au
 *   sitemap enverrait deux consignes contradictoires. Elle reste atteignable
 *   par le lien du pied de page, ce qui suffit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", site.url).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
