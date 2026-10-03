import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Sans ça, importer une seule icône de Phosphor embarque son catalogue
   * entier dans le bundle client. Next réécrit les imports en chemins directs.
   */
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "@phosphor-icons/react/ssr"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Les images Instagram sont servies depuis le CDN de Meta, dont le
     * sous-domaine change selon la région. Sans cette autorisation explicite,
     * `next/image` refuse de les charger : c'est voulu, cela évite qu'un site
     * serve des images arbitraires via son propre optimiseur.
     */
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Même interrupteur que `site.indexable` : couvre aussi les images
          // et les fichiers que la balise meta n'atteint pas.
          ...(process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
  /**
   * Site en une seule page : les anciennes URLs (pages prestation, réalisations,
   * contact) renvoient vers l'ancre correspondante de l'accueil. À conserver si
   * ces pages sont un jour rétablies — il suffira de retirer les lignes
   * concernées.
   */
  async redirects() {
    return [
      { source: "/covering", destination: "/#prestations", permanent: true },
      { source: "/covering-voiture-grenoble", destination: "/#prestations", permanent: true },
      { source: "/ppf", destination: "/#prestations", permanent: true },
      {
        source: "/ppf-protection-carrosserie-grenoble",
        destination: "/#prestations",
        permanent: true,
      },
      { source: "/kit-deco-personnalise", destination: "/#prestations", permanent: true },
      { source: "/stickers-lettrage-vehicule", destination: "/#prestations", permanent: true },
      { source: "/dechromage-grenoble", destination: "/#prestations", permanent: true },
      { source: "/realisations", destination: "/#realisations", permanent: true },
      { source: "/realisations/:slug", destination: "/#realisations", permanent: true },
      { source: "/contact", destination: "/#devis", permanent: true },
    ];
  },
};

export default nextConfig;
