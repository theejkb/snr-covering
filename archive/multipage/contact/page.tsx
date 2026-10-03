import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Devis } from "@/components/sections/Devis";
import { JsonLd, breadcrumbSchema, businessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: `Contact — devis covering à ${site.city} | ${site.name}` },
  description: `Demandez un devis gratuit pour un covering, un PPF ou un déchromage à ${site.city}. Réponse rapide, par email, téléphone ou Instagram.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          businessSchema(),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <header className="border-b border-line pt-[132px] pb-12">
        <Container>
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-[11px] tracking-[.12em] text-dim uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-bright">
                  Accueil
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-muted-2">
                Contact
              </li>
            </ol>
          </nav>
          <h1 className="h-display text-[clamp(44px,7.5vw,96px)] leading-[.88]">
            DEVIS COVERING À {site.city.toUpperCase()}
          </h1>
          <p className="mt-7 max-w-2xl font-sans text-[16.5px] leading-[1.8] text-muted">
            Quelques photos du véhicule et deux lignes sur ce que vous avez en tête suffisent pour
            démarrer. On intervient à {site.city} et dans toute l&apos;{site.department}.
          </p>
        </Container>
      </header>

      <Devis heading="PARLONS PROJET" />
    </>
  );
}
