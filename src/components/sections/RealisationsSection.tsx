import { site } from "@/config/site";
import { galerie } from "@/content/galerie";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { RealisationsGrid } from "./RealisationsGrid";

/**
 * Réalisations : maquette l. 191-220.
 *
 * Le titre est passé en enfant à la grille : dans la maquette il partage sa
 * ligne avec les filtres, alignés en bas. Le comparateur avant/après est une
 * section à part (`AvantApres`), comme dans la maquette.
 */
export function RealisationsSection() {
  return (
    <section id="realisations" className="scroll-mt-20 border-y border-line bg-ink-alt py-[100px]">
      <Container>
        <RealisationsGrid tuiles={galerie}>
          <div>
            <Eyebrow>NOS RÉALISATIONS</Eyebrow>
            <h2 className="h-display text-[clamp(26px,7vw,80px)] leading-[.9]">
              RÉALISATIONS À {site.city.toUpperCase()}
            </h2>
          </div>
        </RealisationsGrid>
      </Container>
    </section>
  );
}
