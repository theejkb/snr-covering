import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

/**
 * Pied de page : maquette l. 435-449.
 *
 * Une seule ligne : logo, liens, copyright. Les libellés sont en casse mixte,
 * contrairement à la navigation du haut qui est en capitales : c'est le
 * contraste voulu par la maquette.
 *
 * « Mentions légales » ne figure pas dans la maquette. Le lien est ajouté :
 * l'identité de l'éditeur et l'hébergeur sont obligatoires (article 6 LCEN).
 */
const liens = [
  { href: "/#prestations", label: "Prestations" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#devis", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep py-11">
      <Container className="flex flex-wrap items-center justify-between gap-5">
        <Link href="/" aria-label={`${site.name}, accueil`}>
          <Logo size={18} />
        </Link>

        <nav aria-label="Pied de page">
          <ul className="flex flex-wrap items-center gap-x-[26px] font-sans text-xs font-semibold text-dim italic">
            {liens.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link block py-2">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link block py-2"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>

        {/* La maquette écrit #3a3d42 : 1,85:1 sur ce fond, illisible. Remonté à
            #7d8288 (5,3:1). C'est le seul écart de couleur assumé, et il porte
            sur la ligne la moins regardée de la page. */}
        <p className="font-sans text-[11px] tracking-[.05em] text-dim uppercase">
          © {new Date().getFullYear()} {site.name} · {site.city}
        </p>
      </Container>
    </footer>
  );
}
