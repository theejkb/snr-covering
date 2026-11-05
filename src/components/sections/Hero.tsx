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
          {/*
            Le H1 porte la requête cible, avec le style de l'eyebrow de la
            maquette. Le grand titre display n'est qu'un slogan : il passe en
            <p>, Google lit d'abord « covering voiture & moto à Grenoble ».
          */}
          <div className="reveal in mb-[26px] inline-flex items-center gap-3">
            <Mark />
            <h1 className="font-sans text-[10px] font-bold tracking-[.12em] whitespace-nowrap text-muted-2 italic sm:text-[11px] sm:tracking-[.22em]">
              COVERING VOITURE &amp; MOTO À {site.city.toUpperCase()}
            </h1>
          </div>

          {/*
            La maquette écrit `clamp(64px, 8.4vw, 132px)` pour « VOTRE VOITURE, ».
            « CHANGEZ DE COULEUR, » est plus long encore : réduit pour tenir sur
            une ligne dans la colonne du desktop. Sur mobile, indexé sur la
            largeur d'écran (11vw) pour occuper la ligne sans déborder.
          */}
          <p className="h-display text-[clamp(36px,11vw,64px)] leading-[.8] lg:text-[clamp(36px,5.2vw,84px)]">
            <span className="reveal in block">CHANGEZ DE COULEUR,</span>
            <span className="reveal in block" style={{ animationDelay: ".1s" }}>
              PAS DE <span className="text-dim-2">VÉHICULE</span>
            </span>
          </p>

          <p
            className="reveal in mt-8 mb-[34px] max-w-[460px] font-sans text-[16.5px] leading-[1.75] text-muted"
            style={{ animationDelay: ".2s", textWrap: "pretty" }}
          >
            Covering voiture, moto et utilitaire, posé à la main dans notre atelier de{" "}
            {site.address?.city ?? site.city}, près de {site.city}. Votre peinture d&apos;origine
            reste intacte dessous.
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
            {site.quoteDelay ? `, réponse sous ${site.quoteDelay}` : ""}. Quelques photos suffisent.
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
            className={`reveal in mt-16 grid grid-cols-2 border-t border-line ${
              stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
            }`}
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
