import { ArrowRightIcon } from "../ui/icons";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ButtonLink } from "../ui/Button";

/**
 * Les quatre étapes de la maquette (l. 256-299). Le devis est envoyé après le
 * passage à l'atelier, une fois le film choisi : c'est l'étape 02 qui porte
 * les deux délais, l'étape 01 n'en a pas.
 */
const etapes = [
  {
    n: "01",
    titre: "ON EN PARLE",
    texte: "Vous envoyez quelques photos du véhicule et votre idée. On vous conseille.",
    delais: [] as string[],
    accent: "blue" as const,
  },
  {
    n: "02",
    titre: "ON CHOISIT LE FILM",
    texte:
      "Rendez-vous à l'atelier : on compare teintes et finitions, échantillons en main, sur votre véhicule. Puis vous recevez un devis clair.",
    delais: [
      "1 H SUR PLACE",
      site.quoteDelay ? `DEVIS SOUS ${site.quoteDelay.toUpperCase()}` : "DEVIS GRATUIT",
    ],
    accent: "pink" as const,
  },
  {
    n: "03",
    titre: "ON POSE",
    texte: "Le véhicule reste à l'atelier, préparation, démontage, pose au millimètre, remontage.",
    delais: ["1 À 5 JOURS SELON LA PRESTATION"],
    accent: "blue" as const,
  },
  {
    n: "04",
    titre: "VOUS REPARTEZ",
    texte: "On fait le tour du véhicule ensemble et on vous donne les bons gestes d'entretien.",
    delais: ["1 MOIS SANS LAVAGE AU KARCHER"],
    accent: "pink" as const,
  },
];

/**
 * Déroulé du projet : maquette l. 244-303.
 *
 * Deux colonnes asymétriques : la gauche reste fixe pendant qu'on parcourt les
 * étapes à droite. Ce n'est ni une frise horizontale, ni une grille de cartes,
 * les étapes sont empilées, séparées par un filet, le numéro dans une colonne
 * de 76 px.
 */
export function Methode() {
  return (
    <section id="methode" className="scroll-mt-20 border-y border-line bg-ink-alt py-[100px]">
      <Container className="grid items-start gap-[60px] lg:grid-cols-[.85fr_1.15fr]">
        <div className="lg:sticky lg:top-[110px]">
          <Eyebrow>DÉROULÉ DU PROJET</Eyebrow>
          <h2 className="h-display mb-5 text-[clamp(38px,6vw,74px)] leading-[.9]">
            COMMENT
            <br />
            ÇA SE PASSE
          </h2>
          <p className="mb-[26px] max-w-[340px] font-sans text-[15px] leading-[1.75] text-dim">
            Quatre étapes, des délais annoncés à l&apos;avance. Vous savez quand vous récupérez
            votre véhicule dès le devis, pas la veille.
          </p>
          <ButtonLink href="#devis">
            COMMENCER PAR L&apos;ÉTAPE 1
            <ArrowRightIcon className="fleche" size={16} weight="bold" aria-hidden />
          </ButtonLink>
        </div>

        <ol>
          {etapes.map((e) => (
            <li
              key={e.n}
              className="grid grid-cols-[56px_1fr] items-start gap-[22px] border-t border-line py-[30px] sm:grid-cols-[76px_1fr]"
            >
              {/* Décoratif : la numérotation est déjà portée par le <ol>.
                  #565b61 dans la maquette (2,81:1) ; un cran plus clair suffit
                  à passer le seuil de 3:1 des grands textes. */}
              <span aria-hidden className="font-display text-[46px] leading-[.9] text-dim-2 italic">
                {e.n}
              </span>
              <div>
                <h3 className="font-display text-[28px] leading-[.95] text-bright italic sm:text-[34px]">
                  {e.titre}
                </h3>
                <p className="mt-2.5 max-w-[520px] font-sans text-[14.5px] leading-[1.75] text-muted-2">
                  {e.texte}
                </p>
                {e.delais.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
                    {e.delais.map((d) => (
                      <p key={d} className="inline-flex items-center gap-[9px]">
                        <span
                          aria-hidden
                          className={`h-[3px] w-[18px] shrink-0 ${
                            e.accent === "blue" ? "bg-blue" : "bg-pink"
                          }`}
                          style={{ transform: "skewX(-16deg)" }}
                        />
                        <span className="font-sans text-[11px] font-bold tracking-[.14em] text-soft-2">
                          {d}
                        </span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}

          {/* `text-dim` et non `text-dim-2` : la maquette écrit #6b7075, qui
              donne 3,85:1 sur ce fond : sous le seuil AA de 4,5. Un cran plus
              clair suffit, l'écart ne se voit pas. */}
          <li className="border-t border-line pt-[26px] font-sans text-[13px] leading-[1.7] text-dim">
            Films premium {site.filmBrands.join(", ")}, avec garantie fabricant et pose réversible sans
            abîmer la peinture d&apos;origine.
          </li>
        </ol>
      </Container>
    </section>
  );
}
