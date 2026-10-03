import { SnrWordmark } from "./SnrWordmark";

/**
 * Badge signature : lettrage sur pavé clair + bloc COVERING + double barre
 * bleu/rose, l'ensemble incliné à -12deg. Élément mémorable de l'identité.
 */
export function Logo({ size = 21 }: { size?: number }) {
  return (
    <span
      className="flex w-max items-stretch border-2 border-bright"
      style={{ transform: "skewX(-12deg)", ["--logo-h" as string]: `${size}px` }}
    >
      <span className="flex items-center bg-bright px-2 pt-[7px] pb-[6px] sm:px-3">
        {/*
          Hauteur réduite de 20 % sous `sm`. Le badge mesurait 243 px de large :
          sur un écran de 320 px, il chassait le bouton de devis et le menu hors
          de l'écran. La largeur suit la hauteur (`w-auto`), donc réduire l'une
          réduit vraiment la place occupée : contrairement à un `scale`, qui ne
          change que le rendu et laisse le débordement intact.
        */}
        <SnrWordmark
          className="block h-[calc(var(--logo-h)*0.8)] w-auto text-ink sm:h-[var(--logo-h)]"
          style={{ transform: "skewX(12deg)" }}
        />
      </span>
      <span className="flex items-center gap-[9px] px-2 pt-[7px] pb-[6px] sm:px-3">
        {/* Le mot disparaît sous 420 px : c'est lui qui coûte le plus de
            largeur, et le pavé SNR suffit à identifier la marque. */}
        <span className="hidden pl-[.22em] font-sans text-[10px] font-extrabold tracking-[.22em] text-bright min-[420px]:inline">
          COVERING
        </span>
        <Mark vertical />
      </span>
    </span>
  );
}

/** La double barre bleu/rose, déclinée partout dans la maquette. */
export function Mark({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <span aria-hidden className="flex flex-col gap-[2px]">
        <span className="h-[4px] w-[18px] bg-blue" />
        <span className="h-[4px] w-[18px] bg-pink" />
      </span>
    );
  }
  return (
    <span aria-hidden className="inline-flex items-center gap-[5px] align-middle">
      <span className="block h-[26px] w-[9px] bg-blue" style={{ transform: "skewX(-16deg)" }} />
      <span className="block h-[26px] w-[9px] bg-pink" style={{ transform: "skewX(-16deg)" }} />
    </span>
  );
}
