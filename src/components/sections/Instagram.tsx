import Image from "next/image";
import { ArrowRightIcon, InstagramLogoIcon, PlayIcon } from "../ui/icons";
import { site } from "@/config/site";
import { getDernieresPublications } from "@/lib/instagram";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Instagram : structure de la maquette (l. 333-373), alimentée par les vraies
 * publications du compte.
 *
 * Composant serveur asynchrone : l'appel à l'API se fait au rendu, jamais dans
 * le navigateur. Le jeton reste donc sur le serveur, et le visiteur ne charge
 * aucun script tiers.
 *
 * Sans jeton configuré, `getDernieresPublications` renvoie un tableau vide et la
 * grille retombe sur ses emplacements réservés : la mise en page ne bouge pas,
 * seules les images manquent.
 */
export async function Instagram() {
  const publications = await getDernieresPublications(6);

  return (
    <section id="instagram" className="scroll-mt-20 border-t border-line py-[100px]">
      <Container>
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>EN DIRECT DE L&apos;ATELIER</Eyebrow>
            <h2 className="h-display text-[clamp(36px,6vw,72px)] leading-[.9]">
              ÇA SE PASSE SUR INSTAGRAM
            </h2>
          </div>

          {/* Bouton « nous suivre » en tête de section : à cet endroit il est vu
              par ceux qui font défiler sans s'arrêter sur la grille. */}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2.5 rounded-btn bg-bright px-6 py-3.5 font-sans text-[13px] font-bold tracking-[.04em] text-ink"
          >
            <InstagramLogoIcon size={18} weight="regular" aria-hidden />
            NOUS SUIVRE
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {publications.length > 0
            ? publications.map((p) => (
                <li
                  key={p.id}
                  className="gal-item overflow-hidden rounded-card border border-line-card"
                >
                  <a
                    href={p.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-square"
                  >
                    <Image
                      src={p.image}
                      alt={p.legende}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    {p.estVideo && (
                      <span
                        aria-hidden
                        className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-bright"
                      >
                        <PlayIcon size={14} weight="fill" />
                      </span>
                    )}
                  </a>
                </li>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-card border border-line-card bg-card"
                >
                  <span className="absolute inset-0 flex items-center justify-center px-2 text-center font-sans text-[11px] tracking-[.14em] text-dim uppercase">
                    Post {i + 1}
                  </span>
                </li>
              ))}

          <li className="col-span-2">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between rounded-card border border-line-card bg-card p-7 md:aspect-[2/1]"
            >
              <p className="font-sans text-sm leading-[1.7] text-muted-2">
                Chantiers en cours, avant/après, coulisses de la pose. Tout est publié au fil de
                l&apos;eau.
              </p>
              <span className="mt-6 flex items-center gap-3">
                <span className="pastille flex h-[38px] w-[38px] items-center justify-center rounded-card border border-line-field text-muted-2">
                  <InstagramLogoIcon size={20} weight="regular" aria-hidden />
                </span>
                <span className="font-display text-[30px] text-bright italic">
                  @{site.instagram}
                </span>
                <ArrowRightIcon
                  size={20}
                  weight="bold"
                  aria-hidden
                  className="text-muted-2 transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
                />
              </span>
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
}
