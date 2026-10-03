"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./ui/Logo";

// Site en une seule page : toute la navigation est en ancres. Les href
// commencent par « / » pour rester valides depuis /mentions-legales.
const links = [
  { href: "/#prestations", label: "Prestations" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#atelier", label: "Atelier" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Seuil de la maquette : le fond n'apparaît qu'après 40 px de défilement.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[70px] border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-ink/[.82] backdrop-blur-[14px]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-10">
        <Link href="/" aria-label="SNR Covering, accueil" className="flex items-center">
          <Logo size={19} />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-[34px] font-sans text-[12.5px] font-semibold italic tracking-[.05em] text-soft-2 lg:flex"
        >
          {/* `py-2` : la zone cliquable passe de 19 px à 35 px de haut, au-dessus
              du minimum de 24 px du critère WCAG 2.5.8. Le rendu ne bouge pas. */}
          {links.map((l) => (
            <Link key={l.href} className="nav-link py-2" href={l.href}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/#devis"
            className="btn-primary rounded-btn bg-bright px-5 py-2.5 font-bold text-ink not-italic"
          >
            DEVIS
          </Link>
        </nav>

        {/* Sous `lg`, le seul appel à l'action était enfermé dans le menu :
            il fallait deux gestes pour demander un devis. Ce bouton compact
            reste visible en permanence, à côté du menu. */}
        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/#devis"
            onClick={() => setOpen(false)}
            className="btn-primary rounded-btn bg-bright px-3 py-2.5 font-sans text-[12px] font-bold tracking-[.04em] text-ink sm:px-4"
          >
            DEVIS
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-[2px] w-6 bg-bright transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-bright transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-bright transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-ink/98 backdrop-blur-[14px] lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line px-6 py-5 font-sans text-sm font-semibold italic tracking-[.06em] text-soft-2"
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link
            href="/#devis"
            onClick={() => setOpen(false)}
            className="m-6 rounded-btn bg-bright py-4 text-center font-sans text-[13px] font-bold text-ink"
          >
            DEMANDER UN DEVIS
          </Link>
        </nav>
      </div>
    </header>
  );
}
