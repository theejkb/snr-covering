import Image from "next/image";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Présentation de Clarisse, texte fourni par elle. Section ajoutée après la
 * maquette : pour un atelier tenu par une seule personne, montrer qui pose
 * rassure plus qu'un « nous » anonyme.
 *
 * Même vocabulaire que l'Atelier, en miroir : texte à gauche, photo à droite,
 * pour que les deux sections qui se suivent ne se répètent pas.
 */
export function Portrait() {
  return (
    <section id="clarisse" className="scroll-mt-20 border-t border-line bg-ink-alt py-[110px]">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Eyebrow>QUI SE CACHE DERRIÈRE {site.name.toUpperCase()} ?</Eyebrow>
          <h2 className="h-display mb-[22px] text-[clamp(40px,6vw,72px)] leading-[.9]">
            MOI, C&apos;EST
            <br />
            CLARISSE
          </h2>
          <div className="flex max-w-[560px] flex-col gap-5 font-sans text-base leading-[1.85] text-muted">
            <p>
              23 ans, passionnée depuis toujours par l&apos;univers du sport mécanique et tout ce
              qui touche aux véhicules. Aujourd&apos;hui, j&apos;ai décidé de faire de cette
              passion mon métier à travers {site.name}.
            </p>
            <p>
              De la création graphique à la pose, j&apos;aime travailler sur des projets très
              différents et surtout donner vie aux idées de mes clients. Covering, kit déco 100 %
              personnalisé, stickers, marquage publicitaire, personnalisation de véhicules :{" "}
              <strong className="font-semibold text-bright">
                chaque projet est l&apos;occasion de créer quelque chose d&apos;unique.
              </strong>
            </p>
            <p>
              Je travaille aussi bien sur des petits projets que sur des réalisations plus
              ambitieuses, en atelier ou directement en déplacement. Mon objectif est simple :{" "}
              <strong className="font-semibold text-bright">
                proposer un travail soigné, créatif et personnalisé, tout en gardant la passion au
                centre de chaque projet.
              </strong>
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-frame border border-line-frame bg-card">
          <Image
            src="/images/realisations/atelier-snr-covering-pose.jpg"
            alt="Clarisse en pleine pose sur une berline noire, à l'atelier"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[45%_50%]"
          />
        </div>
      </Container>
    </section>
  );
}
