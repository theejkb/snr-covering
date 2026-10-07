import type { Metadata, Viewport } from "next";
import { bebas, montserrat } from "@/lib/fonts";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Covering auto à Grenoble · SNR Covering | PPF, déchromage, déco",
    template: `%s | ${site.name}`,
  },
  description:
    "Atelier de covering à Grenoble : covering total ou partiel, film de protection PPF, déchromage, stickers, kit déco et marquage publicitaire. Devis gratuit.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  // Pas de canonical par défaut : chaque page déclare la sienne, pour éviter
  // qu'une 404 hérite du canonical de l'accueil.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: "Covering auto à Grenoble · SNR Covering",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [{ url: "/logos/snr-favicon-512-sombre.png", type: "image/png", sizes: "512x512" }],
    apple: "/logos/snr-favicon-512-sombre.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `suppressHydrationWarning` : le script inline ci-dessous pose `js-reveal`
  // sur <html> avant l'hydratation. Le className client diffère donc du HTML
  // serveur : c'est voulu, React ne doit pas le traiter comme une erreur.
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${bebas.variable} ${montserrat.variable}`}
    >
      <head>
        {/*
          Posé AVANT la peinture. Comme dans la maquette, seuls les éléments du
          hero portent `reveal in` : l'animation joue une fois au chargement,
          il n'y a rien à observer au défilement.

          Si le JavaScript ne s'exécute pas, la classe n'est jamais posée et
          toute la page reste visible : c'est le comportement voulu, et c'est
          l'inverse de la maquette, qui affichait une page vide sans JS.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("js-reveal")}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-ink text-bright antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-btn focus:bg-bright focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:text-ink"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
