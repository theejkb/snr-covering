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
import { Devis } from "@/components/sections/Devis";
import {
  JsonLd,
  businessSchema,
  websiteSchema,
  webPageSchema,
  serviceSchema,
} from "@/lib/schema";

// Title et description repris de la maquette : ils étaient déjà bien écrits.
// Déclarés ici en constantes pour être réutilisés tels quels dans le JSON-LD,
// une page qui se décrit différemment selon l'endroit brouille les moteurs.
const TITLE = "Covering auto à Grenoble · SNR Covering | PPF, déchromage, déco";
const DESCRIPTION = `Atelier de covering à Grenoble : covering total ou partiel, film de protection PPF, déchromage, stickers, kit déco et marquage publicitaire. Devis gratuit${
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
 * Clarisse), Instagram, devis.
 *
 * Pas de `FAQPage` dans le balisage : les questions ne sont plus affichées sur
 * la page, et Google interdit de baliser un contenu que le visiteur ne voit pas.
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
      <Devis />
    </>
  );
}
