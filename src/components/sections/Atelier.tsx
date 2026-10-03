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
 * L'atelier : maquette l. 306-330.
 *
 * Photo à gauche, texte à droite. Le badge blanc déborde volontairement du
 * cadre en bas à droite : c'est la signature visuelle de la section, avec son
 * ombre portée. La photo est en portrait : recadrée au centre dans le cadre
 * 4/3, elle garde la poseuse et la roue.
 */
export function Atelier() {
  return (
    <section id="atelier" className="scroll-mt-20 py-[110px]">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="stripe-atelier relative aspect-[4/3] overflow-hidden rounded-frame border border-line-frame">
            <Image
              src="/images/realisations/atelier-snr-covering-pose.jpg"
              alt="Pose de film sur une berline noire à l'atelier SNR Covering, roue avant démontée"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </div>

          <div className="absolute -right-4 -bottom-6 rounded-badge bg-bright px-[26px] py-5 text-ink shadow-[0_20px_40px_rgb(0_0_0/.4)]">
            <p className="font-display text-[38px] leading-[.9] italic">{site.city.toUpperCase()}</p>
            <p className="font-sans text-[11px] font-semibold tracking-[.08em]">&amp; ALENTOURS</p>
          </div>
        </div>

        <div>
          <Eyebrow>L&apos;ATELIER</Eyebrow>
          <h2 className="h-display mb-[22px] text-[clamp(40px,6vw,72px)] leading-[.9]">
            L&apos;ATELIER
            <br />
            DE {site.city.toUpperCase()}
          </h2>
          <p className="mb-5 font-sans text-base leading-[1.85] text-muted">
            {site.name} est un atelier indépendant installé à {site.city}. Un seul véhicule à la
            fois : celui qui est chez nous a toute la place, et personne ne pose dans la
            précipitation pour libérer le pont.
          </p>
          <p className="mb-[30px] font-sans text-base leading-[1.85] text-muted">
            Du simple sticker au covering complet, on travaille sur voitures, utilitaires et
            deux-roues, à {site.city} et dans toute l&apos;{site.department}. Si votre carrosserie
            ne se prête pas à la pose, on vous le dit avant de prendre votre argent.
          </p>

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
