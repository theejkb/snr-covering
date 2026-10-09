import Image from "next/image";
import { StarIcon } from "../ui/icons";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

/** Les trois encarts de la maquette (l. 324-326). */
const encarts = [
  { valeur: "100%", libelle: "SUR-MESURE" },
  { valeur: "PRO", libelle: "FILMS PREMIUM" },
  { valeur: "5", etoile: true, libelle: "FINITIONS SOIGNÉES" },
];

/**
 * Clarisse et son atelier, en une seule section : maquette l. 306-330 pour la
 * mise en page, textes fournis par Clarisse (sa présentation et « où me
 * retrouver »), resserrés pour tenir dans une colonne.
 *
 * Photo à gauche, texte à droite. Le badge blanc déborde volontairement du
 * cadre en bas à droite : c'est la signature visuelle de la section, avec son
 * ombre portée. La photo est en portrait : recadrée dans le cadre, elle garde
 * Clarisse et la roue.
 */
export function Atelier() {
  const ville = site.address?.city ?? site.city;

  return (
    <section id="atelier" className="scroll-mt-20 py-[110px]">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="stripe-atelier relative aspect-[4/5] overflow-hidden rounded-frame border border-line-frame">
            <Image
              src="/images/realisations/atelier-snr-covering-pose.jpg"
              alt="Clarisse en pleine pose sur une berline noire, à l'atelier de Sassenage"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[45%_50%]"
            />
          </div>

          <div className="absolute -right-4 -bottom-6 rounded-badge bg-bright px-[26px] py-5 text-ink shadow-[0_20px_40px_rgb(0_0_0/.4)]">
            <p className="font-display text-[38px] leading-[.9] italic">{ville.toUpperCase()}</p>
            <p className="font-sans text-[11px] font-semibold tracking-[.08em]">
              &amp; PARTOUT EN FRANCE
            </p>
          </div>
        </div>

        <div>
          <Eyebrow>QUI SE CACHE DERRIÈRE {site.name.toUpperCase()} ?</Eyebrow>
          <h2 className="h-display mb-[22px] text-[clamp(40px,6vw,72px)] leading-[.9]">
            MOI, C&apos;EST CLARISSE
          </h2>
          <div className="mb-[30px] flex flex-col gap-5 font-sans text-base leading-[1.85] text-muted">
            <p>
              23 ans, passionnée depuis toujours par l&apos;univers du sport mécanique et tout ce
              qui touche aux véhicules. J&apos;ai fait de cette passion mon métier : de la création
              graphique à la pose, j&apos;aime donner vie aux idées de mes clients. Covering, kit
              déco, stickers, marquage publicitaire,{" "}
              <strong className="font-semibold text-bright">
                chaque projet est l&apos;occasion de créer quelque chose d&apos;unique.
              </strong>
            </p>
            <p>
              Je travaille dans un grand atelier à {ville}, près de {site.city}, partagé avec trois
              autres poseurs professionnels : plusieurs savoir-faire réunis au même endroit, et la
              possibilité de collaborer sur certains projets. Du simple sticker au covering
              complet, sur voitures, utilitaires et deux-roues, en atelier ou directement sur site,
              partout en France.
            </p>
            <p className="font-semibold text-bright">
              Mon objectif : un travail soigné, créatif et personnalisé, avec un résultat propre et
              professionnel.
            </p>
          </div>

          <ul className="flex flex-wrap gap-3.5">
            {encarts.map((e) => (
              <li
                key={e.libelle}
                className="min-w-[130px] flex-1 rounded-card border border-line-card p-5"
              >
                <p className="flex items-center gap-1 font-display text-[34px] leading-none text-bright">
                  {e.valeur}
                  {e.etoile && <StarIcon size={26} weight="fill" aria-hidden />}
                </p>
                <p className="font-sans text-[11px] font-medium tracking-[.08em] text-dim">
                  {e.libelle}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
