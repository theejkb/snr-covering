import type { Metadata } from "next";
import Link from "next/link";
import { realisations } from "@/content/realisations";
import { prestations } from "@/content/prestations";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RealisationsGrid } from "@/components/sections/RealisationsGrid";
import { Devis } from "@/components/sections/Devis";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: `Réalisations covering à ${site.city} — ${site.name}` },
  description:
    "Covering, PPF, déchromage et kits déco réalisés dans notre atelier de Grenoble. Photos de chantiers, films utilisés et finitions.",
  alternates: { canonical: "/realisations" },
};

export default function Page() {
  const filters = prestations.map((p) => ({ slug: p.slug, label: p.cardTitle[0] }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
        ])}
      />

      <header className="border-b border-line pt-[132px] pb-14">
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
                Réalisations
              </li>
            </ol>
          </nav>
          <Eyebrow>NOS RÉALISATIONS</Eyebrow>
          <h1 className="h-display text-[clamp(44px,7.5vw,96px)] leading-[.88]">
            RÉALISATIONS COVERING À {site.city.toUpperCase()}
          </h1>
          <p className="mt-7 max-w-2xl font-sans text-[16.5px] leading-[1.8] text-muted">
            Chaque chantier est photographié à la sortie de l&apos;atelier : véhicule, prestation,
            film utilisé et finition.
          </p>
        </Container>
      </header>

      <Container className="py-16">
        <RealisationsGrid realisations={realisations} filters={filters} />
      </Container>

      <Devis heading="VOTRE VÉHICULE ENSUITE ?" />
    </>
  );
}
