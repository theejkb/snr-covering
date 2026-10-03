import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prestations, getPrestation } from "@/content/prestations";
import { realisationsByPrestation } from "@/content/realisations";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Devis } from "@/components/sections/Devis";
import { RealisationsGrid } from "@/components/sections/RealisationsGrid";
import {
  JsonLd,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return prestations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrestation(slug);
  if (!p) return {};

  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `/${p.slug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPrestation(slug);
  if (!p) notFound();

  const related = realisationsByPrestation(p.slug);
  const others = prestations.filter((x) => x.slug !== p.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(p),
          faqSchema(p.faq),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: p.h1, path: `/${p.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="border-b border-line pt-[132px] pb-16">
          <Container>
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] tracking-[.12em] text-dim uppercase">
                <li>
                  <Link href="/" className="transition-colors hover:text-bright">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-muted-2">
                  {p.h1}
                </li>
              </ol>
            </nav>

            <Eyebrow>{p.eyebrow.toUpperCase()}</Eyebrow>
            <h1 className="h-display max-w-4xl text-[clamp(44px,7.5vw,96px)] leading-[.88]">
              {p.h1.toUpperCase()}
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-[16.5px] leading-[1.8] text-muted">
              {p.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <ButtonLink href="/contact">DEMANDER UN DEVIS →</ButtonLink>
              <ButtonLink href="/realisations" variant="ghost">
                VOIR LES RÉALISATIONS
              </ButtonLink>
            </div>
          </Container>
        </header>

        <Container className="py-20">
          <div className="grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
            <div>
              {p.sections.map((s) => (
                <section key={s.heading} className="reveal mb-14 last:mb-0">
                  <h2 className="h-display mb-5 text-[clamp(30px,4vw,44px)] leading-[.95]">
                    {s.heading.toUpperCase()}
                  </h2>
                  {s.paragraphs.map((text, i) => (
                    <p
                      key={i}
                      className="mb-4 font-sans text-[15.5px] leading-[1.85] text-muted last:mb-0"
                    >
                      {text}
                    </p>
                  ))}
                </section>
              ))}

              <section className="mt-16">
                <h2 className="h-display mb-6 text-[clamp(30px,4vw,44px)] leading-[.95]">
                  QUESTIONS FRÉQUENTES
                </h2>
                <dl>
                  {p.faq.map((f) => (
                    <div key={f.question} className="border-t border-line py-6">
                      <dt className="font-sans text-base font-bold text-bright">{f.question}</dt>
                      <dd className="mt-3 font-sans text-[15px] leading-[1.8] text-muted-2">
                        {f.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card border border-line-card bg-card p-7">
                <h2 className="font-sans text-[11px] font-bold tracking-[.16em] text-muted-2 uppercase">
                  Pour qui
                </h2>
                <ul className="mt-4 space-y-3">
                  {p.forWho.map((f) => (
                    <li key={f} className="flex gap-3 font-sans text-[13.5px] leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-3 shrink-0 bg-blue"
                        style={{ transform: "skewX(-16deg)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.duration && (
                  <p className="mt-6 border-t border-line pt-5 font-sans text-[13px] text-dim">
                    Durée indicative : {p.duration}
                  </p>
                )}
              </div>

              <nav aria-label="Autres prestations" className="mt-6">
                <h2 className="font-sans text-[11px] font-bold tracking-[.16em] text-muted-2 uppercase">
                  Autres prestations
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/${o.slug}`}
                        className="font-sans text-[13.5px] text-dim transition-colors hover:text-bright"
                      >
                        {o.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </Container>

        {related.length > 0 && (
          <section className="border-t border-line bg-ink-alt py-20">
            <Container>
              <h2 className="h-display mb-8 text-[clamp(32px,5vw,56px)] leading-[.9]">
                RÉALISATIONS — {p.cardTitle[0]}
              </h2>
              <RealisationsGrid realisations={related} filters={[]} limit={3} />
            </Container>
          </section>
        )}
      </article>

      <Devis heading={`UN PROJET ${p.cardTitle[0]} ?`} />

      <p className="sr-only">
        {p.h1} — {site.name}, {site.city}.
      </p>
    </>
  );
}
