"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowsLeftRightIcon } from "../ui/icons";
import { Container } from "../ui/Container";

/** Bornes de la maquette : la poignée ne colle jamais tout à fait aux bords. */
const MIN = 2;
const MAX = 98;

/**
 * Comparateur avant / après : maquette l. 223-241, section autonome.
 *
 * La mécanique est celle de la maquette : deux couches superposées, celle du
 * dessus découpée par un `clip-path` piloté au pointeur. Ce n'est pas un
 * glissement d'images côte à côte : la couche APRÈS reste entière dessous.
 *
 * Les deux photos sont la même Kawasaki ZX-6R, avant et après covering, prises
 * à deux endroits différents : recadrées en 16/9 pour que la moto occupe la
 * même place dans les deux, mais le fond change d'un côté à l'autre.
 *
 * Un `<input type="range">` transparent est superposé : il n'existe pas dans la
 * maquette, mais sans lui le comparateur est inutilisable au clavier. Il ne
 * change rien au rendu.
 */
export function AvantApres() {
  const [pos, setPos] = useState(52);
  const pisteRef = useRef<HTMLDivElement>(null);
  const glisseRef = useRef(false);

  const positionner = useCallback((clientX: number) => {
    const piste = pisteRef.current;
    if (!piste) return;
    const { left, width } = piste.getBoundingClientRect();
    const pct = ((clientX - left) / width) * 100;
    setPos(Math.max(MIN, Math.min(MAX, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (glisseRef.current) positionner(e.clientX);
    };
    const onUp = () => {
      glisseRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [positionner]);

  return (
    <section className="scroll-mt-20 py-[100px]">
      <Container>
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-display text-[clamp(38px,6vw,72px)] leading-none">AVANT · APRÈS</h2>
          <p className="font-sans text-sm text-dim">
            Glissez le curseur : une Kawasaki ZX-6R passée du vert d&apos;origine au gris satiné
          </p>
        </div>

        <div
          ref={pisteRef}
          onPointerDown={(e) => {
            glisseRef.current = true;
            positionner(e.clientX);
          }}
          className="relative aspect-[16/9] cursor-ew-resize overflow-hidden rounded-frame border border-line-card select-none"
        >
          {/* Couche APRÈS : toujours entière, sous la suivante */}
          <div className="stripe-after absolute inset-0 flex items-end justify-end p-6">
            <Image
              src="/images/realisations/kawasaki-zx6r-apres-gris-satine.jpg"
              alt="Kawasaki ZX-6R après covering intégral gris satiné"
              fill
              sizes="(min-width: 1240px) 1180px, 100vw"
              className="object-cover"
            />
            <span className="relative rounded-btn bg-ink/60 px-3.5 py-2 font-sans text-[11px] font-bold tracking-[.14em] text-blue">
              APRÈS · GRIS SATINÉ
            </span>
          </div>

          {/* Couche AVANT : découpée par la position du curseur */}
          <div
            className="stripe-before absolute inset-0 flex items-end p-6"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src="/images/realisations/kawasaki-zx6r-avant-vert-origine.jpg"
              alt="Kawasaki ZX-6R avant covering, livrée verte d'origine"
              fill
              sizes="(min-width: 1240px) 1180px, 100vw"
              className="object-cover"
            />
            <span className="relative rounded-btn bg-ink/60 px-3.5 py-2 font-sans text-[11px] font-bold tracking-[.14em] text-soft-3">
              AVANT · VERT D&apos;ORIGINE
            </span>
          </div>

          {/* Poignée */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-[3px] bg-bright"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <span className="absolute top-1/2 left-1/2 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-ink text-white shadow-[0_6px_20px_rgb(0_0_0/.5)]">
              <ArrowsLeftRightIcon size={20} weight="bold" aria-hidden />
            </span>
          </div>

          {/* Accès clavier : invisible, superposé à toute la piste */}
          <label className="sr-only" htmlFor="avant-apres">
            Position du comparateur avant / après
          </label>
          <input
            id="avant-apres"
            type="range"
            min={MIN}
            max={MAX}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </Container>
    </section>
  );
}
