import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "./ui/Container";

/**
 * Gabarit commun aux pages légales : mentions légales, confidentialité, CGV.
 */

export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/conditions-generales", label: "CGV" },
];

export function LegalPage({
  title,
  path,
  sections,
}: {
  title: string;
  path: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <Container className="pt-[132px] pb-24">
      <h1 className="h-display text-[clamp(40px,6vw,72px)] leading-[.9]">{title.toUpperCase()}</h1>
      <p className="mt-4 font-sans text-xs tracking-[.05em] text-dim uppercase">
        Dernière mise à jour : {site.legal.updatedAt}
      </p>

      <div className="legal mt-12 max-w-2xl font-sans text-[15px] leading-[1.8] text-muted">
        {sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="h-display mb-4 text-[clamp(24px,3vw,34px)] leading-none text-bright">
              {s.heading.toUpperCase()}
            </h2>
            {s.body}
          </section>
        ))}
      </div>

      <nav aria-label="Pages légales" className="mt-6 max-w-2xl border-t border-line pt-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-xs font-semibold text-dim italic">
          {legalLinks
            .filter((l) => l.href !== path)
            .map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </Container>
  );
}
