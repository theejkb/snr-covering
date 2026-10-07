import { site } from "@/config/site";

/** Les cinq libellés de la maquette, dans l'ordre, puis le marquage publicitaire. */
const labels = [
  "COVERING FULL",
  "PPF PROTECTION",
  "DÉCHROMAGE",
  "KIT DÉCO PERSO",
  "STICKERS",
  "MARQUAGE PUBLICITAIRE",
];

/**
 * Bande défilante, décorative : `aria-hidden`, arrêtée sous
 * `prefers-reduced-motion` (voir globals.css).
 *
 * La séquence est doublée : c'est ce qui rend la boucle invisible, l'animation
 * translatant la piste d'exactement -50 %. Les étoiles alternent bleu et rose
 * sur toute la longueur : d'où l'index global plutôt qu'un modulo par groupe.
 */
export function Marquee() {
  const sequence = [...labels, ...labels];

  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-ink-alt py-[18px]">
      <div className="marquee-track">
        <span className="flex shrink-0 items-center gap-[34px] pr-[34px] font-display text-[26px] tracking-[.06em] text-faint-2 italic">
          {sequence.map((label, i) => (
            <span key={`${label}-${i}`} className="flex shrink-0 items-center gap-[34px]">
              {label}
              {/* La barre de la marque plutôt qu'un caractère décoratif : même
                  rôle de séparateur, mais c'est un élément d'identité : et
                  20 barres CSS coûtent moins que 20 SVG dans une bande qui
                  défile en continu. */}
              <span
                aria-hidden
                className={`h-[10px] w-[16px] shrink-0 ${i % 2 === 0 ? "bg-blue" : "bg-pink"}`}
                style={{ transform: "skewX(-16deg)" }}
              />
            </span>
          ))}
        </span>
      </div>

      <span className="sr-only">
        Prestations : covering, PPF, déchromage, kit déco et stickers à {site.city}.
      </span>
    </div>
  );
}
