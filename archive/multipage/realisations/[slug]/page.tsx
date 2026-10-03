import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { realisations, getRealisation } from "@/content/realisations";
import { getPrestation } from "@/content/prestations";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AvantApres } from "@/components/sections/AvantApres";
import { Devis } from "@/components/sections/Devis";
import { JsonLd, realisationSchema, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getRealisation(slug);
  if (!r) return {};

  return {
    title: `${r.vehicle} — ${r.title}`,
    description: r.summary,
    alternates: { canonical: `/realisations/${r.slug}` },
    openGraph: {
      title: `${r.vehicle} — ${r.title}`,
      description: r.summary,
      url: `/realisations/${r.slug}`,
      type: "article",
      images: r.photos.slice(0, 1).map((p) => ({ url: p.src, width: p.width, height: p.height })),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRealisation(slug);
  if (!r) notFound();

  const prestation = getPrestation(r.prestationSlug);

  return (
    <>
      <JsonLd
        data={[
          realisationSchema(r),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
            { name: `${r.vehicle} — ${r.title}`, path: `/realisations/${r.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="border-b border-line pt-[132px] pb-12">
          <Container>
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] tracking-[.12em] text-dim uppercase">
                <li>
                  <Link href="/" className="transition-colors hover:text-bright">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/realisations" className="transition-colors hover:text-bright">
                    Réalisations
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-muted-2">
                  {r.vehicle}
                </li>
              </ol>
            </nav>

            <Eyebrow>{r.year}</Eyebrow>
            <h1 className="h-display text-[clamp(40px,6.5vw,84px)] leading-[.88]">
              {r.vehicle.toUpperCase()}
            </h1>
            <p className="mt-4 font-display text-[clamp(24px,3vw,38px)] leading-none text-dim-2 italic">
              {r.title}
            </p>

            <dl className="mt-9 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-sans text-[11px] tracking-[.14em] text-dim uppercase">Finition</dt>
                <dd className="mt-1 font-sans text-[15px] text-bright">{r.finish}</dd>
              </div>
              {r.film && (
                <div>
                  <dt className="font-sans text-[11px] tracking-[.14em] text-dim uppercase">Film</dt>
                  <dd className="mt-1 font-sans text-[15px] text-bright">{r.film}</dd>
                </div>
              )}
              {prestation && (
                <div>
                  <dt className="font-sans text-[11px] tracking-[.14em] text-dim uppercase">
                    Prestation
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={`/${prestation.slug}`}
                      className="font-sans text-[15px] text-blue hover:underline"
                    >
                      {prestation.h1}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </Container>
        </header>

        <Container className="py-16">
          <div className="mb-12 max-w-2xl">
            {r.body.map((text, i) => (
              <p key={i} className="mb-4 font-sans text-[15.5px] leading-[1.85] text-muted">
                {text}
              </p>
            ))}
          </div>

          {(r.before || r.after) && (
            <div className="mb-12">
              <h2 className="h-display mb-5 text-[clamp(28px,4vw,44px)] leading-[.95]">
                AVANT · APRÈS
              </h2>
              <AvantApres before={r.before} after={r.after} />
            </div>
          )}

          <h2 className="sr-only">Photos</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {r.photos.map((p) => (
              <li key={p.src} className="overflow-hidden rounded-card border border-line-card">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      </article>

      <Devis heading="LE MÊME POUR VOUS ?" />
    </>
  );
}
