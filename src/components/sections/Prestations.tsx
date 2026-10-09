import Link from "next/link";
import { ArrowRightIcon } from "../ui/icons";
import { prestations } from "@/content/prestations";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Grille des six prestations + la carte d'appel : maquette l. 139-188.
 *
 * Les cartes de prestation ne sont pas cliquables, comme dans la maquette :
 * il n'y a nulle part où aller en une page. Seule la dernière, la carte claire,
 * est un lien vers le formulaire. Avec six prestations, elle prend toute la
 * largeur de la dernière ligne au lieu d'y rester seule dans un coin.
 */
export function Prestations() {
  return (
    <section id="prestations" className="scroll-mt-20 py-[110px]">
      <Container>
        <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>NOS SERVICES</Eyebrow>
            <h2 className="h-display text-[clamp(26px,7vw,80px)] leading-[.9]">
              PRESTATIONS COVERING &amp; PPF
            </h2>
          </div>
          <p className="max-w-[320px] font-sans text-sm leading-[1.6] text-dim md:text-right">
            Six prestations, toutes réversibles : votre peinture d&apos;origine reste intacte
            dessous.
          </p>
        </div>

        <ul className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {prestations.map((p) => (
            <li key={p.slug}>
              <article className="presta-card relative flex h-full flex-col overflow-hidden rounded-card border border-line-card bg-card px-[30px] py-[34px]">
                {/* L'inclinaison est portée par `.accent` en CSS, pas en style
                    inline : c'est ce qui permet au survol de l'animer. */}
                <span
                  aria-hidden
                  className={`accent absolute top-6 right-[26px] h-1.5 w-[22px] ${
                    p.accent === "blue" ? "bg-blue" : "bg-pink"
                  }`}
                />
                {/* Numéro décoratif : `aria-hidden`, l'ordre est déjà porté par
                    la liste. La maquette écrit #565b61 (2,75:1) ; remonté d'un
                    cran à #7d8288 pour atteindre le seuil AA. C'est le seul
                    écart de teinte de cette section. */}
                <span aria-hidden className="font-display text-base tracking-[.1em] text-dim">
                  {p.number}
                </span>
                <h3 className="mt-2 mb-3.5 font-display text-[38px] leading-[.95] italic">
                  {p.cardTitle[0]}
                  {p.cardTitle[1] ? (
                    <>
                      <br />
                      {p.cardTitle[1]}
                    </>
                  ) : null}
                </h3>
                <p className="font-sans text-sm leading-[1.75] text-muted-2">{p.cardExcerpt}</p>
              </article>
            </li>
          ))}

          <li className="sm:col-span-2 lg:col-span-3">
            <Link
              href="#devis"
              className="presta-card group flex h-full flex-col justify-between rounded-card bg-bright px-[30px] py-[34px] text-ink"
            >
              <p className="font-sans text-base leading-[1.5] font-bold italic">
                Vous hésitez entre deux finitions ?<br />
                Envoyez quelques photos, on vous dit ce qui rend le mieux sur votre modèle.
              </p>
              <span className="mt-6 inline-flex items-center gap-2.5 font-display text-[32px] italic">
                PARLONS-EN
                <ArrowRightIcon
                  size={24}
                  weight="bold"
                  aria-hidden
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
                />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
