import type { Metadata } from "next";
import { site } from "@/config/site";
import { prestations } from "@/content/prestations";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Prestations } from "@/components/sections/Prestations";
import { RealisationsSection } from "@/components/sections/RealisationsSection";
import { AvantApres } from "@/components/sections/AvantApres";
import { Methode } from "@/components/sections/Methode";
import { Atelier } from "@/components/sections/Atelier";
import { Instagram } from "@/components/sections/Instagram";
import { Faq } from "@/components/sections/Faq";
import { Devis } from "@/components/sections/Devis";
import { faq } from "@/content/faq";
import {
  JsonLd,
  businessSchema,
  websiteSchema,
  webPageSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";

// Title et description réécrits sur la requête cible, voir docs/COPYWRITING-SEO.md.
// Déclarés ici en constantes pour être réutilisés tels quels dans le JSON-LD,
// une page qui se décrit différemment selon l'endroit brouille les moteurs.
const TITLE = `Covering ${site.city} · voiture, moto, PPF | ${site.name}`;
const DESCRIPTION = `Atelier de covering aux portes de ${site.city} : covering voiture et moto, film PPF, déchromage, kit déco, marquage utilitaire. Devis gratuit${
  site.quoteDelay ? ` sous ${site.quoteDelay}` : ""
}.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * L'ordre des sections suit la maquette `SNR Covering.dc.html` : hero, bandeau,
 * prestations, réalisations, avant/après, méthode, atelier (qui présente aussi
 * Clarisse), Instagram, questions fréquentes, devis.
 *
 * `FAQPage` n'est émis que parce que les questions sont affichées dans la
 * section `Faq` : Google interdit de baliser un contenu invisible.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema(),
          websiteSchema(),
          webPageSchema({ name: TITLE, description: DESCRIPTION }),
          ...prestations.map(serviceSchema),
          faqSchema(faq),
        ]}
      />
      <Hero />
      <Marquee />
      <Prestations />
      <RealisationsSection />
      <AvantApres />
      <Methode />
      <Atelier />
      <Instagram />
      <Faq />
      <Devis />
    </>
  );
}
