import localFont from "next/font/local";

/**
 * Polices auto-hébergées (fichiers issus de @fontsource, copiés dans src/fonts).
 * La maquette les chargeait depuis Google Fonts : c'était plus lent et cela
 * transférait l'IP des visiteurs à Google, ce que la CNIL a déjà sanctionné.
 */
export const bebas = localFont({
  src: [{ path: "../fonts/bebas-neue-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-bebas",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
  fallback: ["Impact", "Haettenschweiler", "sans-serif"],
});

export const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/montserrat-latin-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
  // Volontairement pas préchargée : 7 graisses préchargées, c'est ~130 kB
  // devant le LCP. Seule Bebas : la police du titre principal, est préchargée.
  preload: false,
});
