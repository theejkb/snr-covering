import type { Metadata } from "next";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

const blocks = [
  {
    heading: "Éditeur du site",
    lines: [
      `${site.legalName}`,
      `Forme juridique : ${site.legal.status}`,
      `SIRET : ${site.legal.siret}`,
      `Responsable de la publication : ${site.legal.director}`,
      `Email : ${site.email}`,
      `Téléphone : ${site.phone}`,
      site.legal.vatNote,
    ],
  },
  {
    heading: "Hébergement",
    lines: [site.legal.host],
  },
  {
    heading: "Données personnelles",
    lines: [
      "Les informations transmises via le formulaire de devis (nom, email, téléphone, description du projet) servent uniquement à répondre à votre demande. Elles ne sont ni revendues, ni transmises à des tiers à des fins commerciales.",
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, écrivez à " +
        site.email +
        ".",
    ],
  },
  {
    heading: "Cookies",
    lines: [
      "Ce site ne dépose aucun cookie de mesure d'audience ni de publicité. Les polices de caractères sont hébergées sur le serveur du site : aucune requête n'est envoyée à un service tiers lors de votre visite.",
    ],
  },
  {
    heading: "Propriété intellectuelle",
    lines: [
      `L'ensemble des contenus de ce site (textes, photographies de réalisations, logo et identité visuelle) est la propriété de ${site.legalName}. Toute reproduction sans autorisation est interdite.`,
    ],
  },
];

export default function Page() {
  // L'avertissement disparaît de lui-même une fois les valeurs renseignées.
  const incomplet = blocks.some((b) => b.lines.some((l) => l.includes("TODO_")));

  return (
    <Container className="pt-[132px] pb-24">
      <h1 className="h-display text-[clamp(40px,6vw,72px)] leading-[.9]">MENTIONS LÉGALES</h1>

      {incomplet && (
        <p className="mt-8 rounded-card border border-pink/40 bg-pink/5 p-5 font-sans text-sm leading-relaxed text-muted">
          ⚠️ Page à compléter avant mise en ligne : les valeurs marquées TODO se trouvent dans{" "}
          <code className="text-blue">src/config/site.ts</code>. Les mentions d&apos;identité et
          d&apos;hébergement sont obligatoires (article 6 de la LCEN).
        </p>
      )}

      <div className="mt-12 max-w-2xl">
        {blocks.map((b) => (
          <section key={b.heading} className="mb-10">
            <h2 className="h-display mb-4 text-[clamp(24px,3vw,34px)] leading-none">
              {b.heading.toUpperCase()}
            </h2>
            {b.lines.map((line) => (
              <p key={line} className="mb-2 font-sans text-[15px] leading-[1.8] text-muted">
                {line}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Container>
  );
}
