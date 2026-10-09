import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  MapPinIcon,
  PhoneIcon,
  type Icon,
} from "../ui/icons";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { DevisForm } from "./DevisForm";

/**
 * Devis : structure de la maquette (l. 376-432).
 *
 * Les deux barres obliques du fond répondent à celles du hero, en miroir : à
 * gauche en haut de page, à droite en bas. C'est ce qui referme la composition.
 */
export function Devis() {
  return (
    <section
      id="devis"
      className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink-alt py-[100px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 right-[8%] w-[80px] bg-blue opacity-[.07]"
          style={{ transform: "skewX(-16deg)" }}
        />
        <div
          className="absolute inset-y-0 right-[3%] w-[44px] bg-pink opacity-[.08]"
          style={{ transform: "skewX(-16deg)" }}
        />
      </div>

      <Container className="relative z-[2] grid gap-[60px] lg:grid-cols-2">
        <div>
          <Eyebrow>PARLONS DE VOTRE VÉHICULE</Eyebrow>
          <h2 className="h-display mb-6 text-[clamp(40px,7vw,88px)] leading-[.85] lg:text-[clamp(40px,5.8vw,88px)]">
            DITES-NOUS
            <br />
            CE QUE VOUS VOULEZ
          </h2>
          <p className="mb-9 max-w-[420px] font-sans text-base leading-[1.7] text-muted">
            Quelques photos de votre véhicule et une description de votre idée suffisent. On vous
            répond{site.quoteDelay ? ` sous ${site.quoteDelay}` : ""}.
          </p>

          <ul className="flex flex-col gap-[18px]">
            <Contact
              icone={EnvelopeSimpleIcon}
              href={`mailto:${site.email}`}
              valeur={site.email}
              aide="Le plus simple pour joindre des photos"
            />
            <Contact
              icone={PhoneIcon}
              href={`tel:${site.phoneE164}`}
              valeur={site.phone}
              aide="Si vous préférez expliquer de vive voix"
            />
            <Contact
              icone={InstagramLogoIcon}
              href={site.instagramUrl}
              valeur={`@${site.instagram}`}
              aide="Les chantiers en cours, au jour le jour"
              externe
            />
            {site.address ? (
              <Contact
                icone={MapPinIcon}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
                )}`}
                valeur={`${site.address.street}, ${site.address.postalCode} ${site.address.city}`}
                aide="L'atelier, près de Grenoble"
                externe
              />
            ) : (
              <Contact
                icone={MapPinIcon}
                valeur={`${site.city} et alentours`}
                aide="Atelier sur rendez-vous"
              />
            )}
          </ul>
        </div>

        <div className="rounded-frame border border-line-card bg-ink p-9">
          <DevisForm />
        </div>
      </Container>
    </section>
  );
}

/**
 * Une ligne de contact : icône encadrée, valeur, et une ligne d'aide qui dit
 * quand utiliser ce canal : c'est elle qui lève l'hésitation entre les quatre.
 * La dernière ouvre l'adresse de l'atelier dans Google Maps.
 */
function Contact({
  icone: Icone,
  valeur,
  aide,
  href,
  externe = false,
}: {
  icone: Icon;
  valeur: string;
  aide: string;
  href?: string;
  externe?: boolean;
}) {
  const contenu = (
    <>
      <span
        className={`pastille flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line-field ${
          href ? "text-muted-2" : "text-dim"
        }`}
      >
        <Icone size={20} weight="regular" aria-hidden />
      </span>
      <span className="min-w-0">
        <span
          className={`block font-sans text-[15px] font-semibold ${href ? "text-soft" : "text-dim"}`}
        >
          {valeur}
        </span>
        <span className="block font-sans text-[12px] text-dim">{aide}</span>
      </span>
    </>
  );

  return (
    <li className="contact-row">
      {href ? (
        <a
          href={href}
          {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center gap-4"
        >
          {contenu}
        </a>
      ) : (
        <span className="flex items-center gap-4">{contenu}</span>
      )}
    </li>
  );
}
