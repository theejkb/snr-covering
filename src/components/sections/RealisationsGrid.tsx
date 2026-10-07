"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/content/categories";
import type { Tuile } from "@/content/galerie";

/**
 * Galerie filtrable : maquette l. 191-220.
 *
 * Chaque tuile est faite de trois couches superposées, comme dans la maquette :
 * la photo au fond, la légende, puis un dégradé qui assombrit le bas pour que
 * le texte reste lisible. Le motif rayé reste sous la photo : il s'affiche le
 * temps du chargement.
 *
 * Seules les catégories qui ont au moins une tuile ont leur filtre : un bouton
 * qui vide la grille donnerait l'impression d'un site inachevé.
 *
 * Sur desktop, la grille fait 4 colonnes de 200 px de haut et deux tuiles en
 * occupent deux. En dessous de `lg`, elle se replie et les tuiles reprennent un
 * format 4/3 : la maquette, elle, ne prévoit rien sous 1240 px.
 *
 * Les tuiles arrivent en props depuis le serveur plutôt que d'être importées
 * ici : le module qui les décrit les valide avec Zod, et l'importer depuis un
 * composant client embarquerait Zod dans le navigateur : 74 ko gzip pour huit
 * lignes de données.
 */
export function RealisationsGrid({
  tuiles,
  children,
}: {
  tuiles: Tuile[];
  children: React.ReactNode;
}) {
  const [actif, setActif] = useState<string>("Tout");

  /** « Tout » d'abord, puis les catégories dans l'ordre de la maquette. */
  const filtres = useMemo(
    () => ["Tout", ...CATEGORIES.filter((c) => tuiles.some((t) => t.cat === c))],
    [tuiles],
  );

  const visibles = useMemo(
    () => (actif === "Tout" ? tuiles : tuiles.filter((g) => g.cat === actif)),
    [actif, tuiles],
  );

  return (
    <>
      {/* Le titre arrive du serveur en `children` : dans la maquette il partage
          la même ligne que les filtres, alignés en bas. */}
      <div className="mb-[34px] flex flex-wrap items-end justify-between gap-5">
        {children}

        <div role="group" aria-label="Filtrer les réalisations" className="flex flex-wrap gap-2">
          {filtres.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActif(f)}
              aria-pressed={actif === f}
              className={`filter-tab rounded-pill px-4 py-2.5 font-sans text-[11px] font-semibold tracking-[.04em] ${
                actif === f
                  ? "border border-pink bg-bright text-ink"
                  : "border border-line-field text-muted-2 hover:text-bright"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-4 lg:auto-rows-[200px]">
        {visibles.map((g) => (
          <li
            key={g.title}
            className={`gal-item relative overflow-hidden rounded-card border border-line-card max-lg:aspect-[4/3] ${
              g.span === 2 ? "col-span-2" : ""
            }`}
          >
            <div aria-hidden className="stripe-gallery absolute inset-0" />
            <Image
              src={g.photo.src}
              alt={g.photo.alt}
              fill
              sizes={
                g.span === 2
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 768px) 25vw, 50vw"
              }
              className="object-cover"
              style={{ objectPosition: g.photo.position }}
            />
            <div
              aria-hidden
              className="voile absolute inset-0 z-[1] opacity-100"
              style={{ background: "linear-gradient(180deg,transparent 45%,rgba(10,10,11,.7))" }}
            />
            <div className="legende absolute bottom-3.5 left-4 z-[2]">
              <p className="font-sans text-[10px] font-bold tracking-[.12em] text-muted-2 uppercase">
                {g.label ?? g.cat}
              </p>
              <h3 className="font-display text-[22px] leading-none text-bright italic">{g.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
