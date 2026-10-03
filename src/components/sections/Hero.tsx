import { ArrowRightIcon } from "../ui/icons";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { Mark, Logo } from "../ui/Logo";
import { ButtonLink } from "../ui/Button";
import { Photo } from "../ui/Photo";

/**
 * Hero : reproduction de la maquette (l. 72-127).
 *
 * C'est la seule section animée : `reveal in` est posé dans le markup, comme
 * dans la maquette, et l'animation joue une fois au chargement avec les délais
 * d'origine (0 · .1s · .2s · .25s · .3s · .4s). Voir `layout.tsx` pour le
 * script qui pose `js-reveal` avant la peinture.
 */
export function Hero() {
  const stats = site.stats.filter((s) => s.value !== null);

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      {/* Liserés de fond : décoratifs, purement CSS */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-10%] left-[8%] h-[130%] w-[60px] bg-blue opacity-[.07]"
          style={{ transform: "skewX(-12deg)" }}
        />
        <div
          className="absolute top-[-10%] left-[13%] h-[130%] w-[26px] bg-pink opacity-[.09]"
          style={{ transform: "skewX(-12deg)" }}
        />
      </div>

      <Container className="relative z-[2] grid min-h-[78vh] items-center gap-14 pt-[132px] lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="reveal in mb-[26px] inline-flex items-center gap-3">
            <Mark />
            <span className="font-sans text-[11px] font-bold tracking-[.22em] text-muted-2 italic">
              ATELIER DE COVERING · {site.city.toUpperCase()}
            </span>
          </div>

          {/*
            La maquette écrit `clamp(64px, 8.4vw, 132px)`. Le plancher est
            abaissé à 48px : au-dessus de 762px de large c'est `8.4vw` qui
            gouverne, donc le rendu est identique à la maquette sur tout le
            desktop ; en dessous, 64px feraient déborder « VOTRE VOITURE, ».
          */}
          <h1 className="h-display text-[clamp(48px,8.4vw,132px)] leading-[.8]">
            <span className="reveal in block">VOTRE VOITURE,</span>
            <span className="reveal in block" style={{ animationDelay: ".1s" }}>
              UNE AUTRE
            </span>
            <span className="reveal in block text-dim-2" style={{ animationDelay: ".1s" }}>
              COULEUR
            </span>
          </h1>

          <p
            className="reveal in mt-8 mb-[34px] max-w-[460px] font-sans text-[16.5px] leading-[1.75] text-muted"
            style={{ animationDelay: ".2s", textWrap: "pretty" }}
          >
            Changez la couleur de votre voiture sans toucher à la peinture d&apos;origine. Films
            posés à la main dans notre atelier de {site.city}, et retirables le jour où vous changez
            d&apos;avis.
          </p>

          <div
            className="reveal in flex flex-wrap items-center gap-3.5"
            style={{ animationDelay: ".3s" }}
          >
            <ButtonLink href="#devis">
              RECEVOIR MON DEVIS
              <ArrowRightIcon className="fleche" size={16} weight="bold" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#realisations" variant="ghost">
              VOIR NOS RÉALISATIONS
              <ArrowRightIcon className="fleche" size={16} weight="bold" aria-hidden />
            </ButtonLink>
          </div>

          {/* La question « ça m'engage à quoi ? » se pose juste après avoir vu
              le bouton. La réponse est donc juste en dessous. */}
          <p
            className="reveal in mt-4 font-sans text-[12.5px] text-dim"
            style={{ animationDelay: ".35s" }}
          >
            Gratuit, sans engagement
            {site.quoteDelay ? `, réponse sous ${site.quoteDelay}` : ""}. Trois photos suffisent.
          </p>
        </div>

        <div className="reveal in relative" style={{ animationDelay: ".25s" }}>
          <div
            aria-hidden
            className="absolute -top-3.5 -left-3.5 h-[70px] w-[70px] border-t-2 border-l-2 border-blue opacity-55"
          />
          <div
            aria-hidden
            className="absolute -right-3.5 -bottom-3.5 h-[70px] w-[70px] border-r-2 border-b-2 border-pink opacity-55"
          />
          <div className="relative aspect-[4/5] overflow-hidden border border-line-card bg-card">
            <Photo
              src="/images/realisations/kawasaki-zx6r-gris-satine-vertical.jpg"
              alt="Kawasaki Ninja ZX-6R en covering intégral gris satiné, garée devant un bardage"
              width={1141}
              height={2000}
              ratio="4/5"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="absolute bottom-6 -left-6 hidden sm:block">
            <span className="flex bg-ink">
              <Logo size={17} />
            </span>
          </div>
        </div>
      </Container>

      {/*
        `bg-ink` sur le bandeau de statistiques : les liserés décoratifs passent
        derrière et font tomber le contraste des libellés à 4,34:1, sous le
        seuil AA de 4,5. À 7 % d'opacité, les masquer ici ne se voit pas.
      */}
      {stats.length > 0 && (
        <Container className="relative z-[2] bg-ink">
          <dl
            className="reveal in mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4"
            style={{ animationDelay: ".4s" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-7 ${i > 0 ? "border-line md:border-l md:pl-[26px]" : ""}`}
              >
                <dd className="font-display text-[46px] leading-none text-bright">
                  {s.value}
                  {s.suffix ?? ""}
                </dd>
                <dt className="mt-1 font-sans text-[11px] font-medium tracking-[.12em] text-dim uppercase">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      )}
    </section>
  );
}
