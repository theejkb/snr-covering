import Link from "next/link";
import { prestations } from "@/content/prestations";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center pt-[132px] pb-24">
      <p className="font-display text-[clamp(90px,18vw,220px)] leading-none text-line-strong italic">
        404
      </p>
      <h1 className="h-display mt-2 text-[clamp(32px,5vw,60px)] leading-[.9]">
        CETTE PAGE N&apos;EXISTE PAS
      </h1>
      <p className="mt-5 max-w-lg font-sans text-[15px] leading-relaxed text-muted">
        Le lien est peut-être ancien, ou l&apos;adresse comporte une coquille. Voilà où aller :
      </p>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {prestations.map((p) => (
          <li key={p.slug}>
            <Link
              href="/#prestations"
              className="font-sans text-sm text-dim transition-colors hover:text-bright"
            >
              {p.h1}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3.5">
        <ButtonLink href="/">RETOUR À L&apos;ACCUEIL</ButtonLink>
        <ButtonLink href="/#devis" variant="ghost">
          DEMANDER UN DEVIS
        </ButtonLink>
      </div>
    </Container>
  );
}
