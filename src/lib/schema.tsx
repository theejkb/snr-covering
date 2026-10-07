import { site } from "@/config/site";
import { prestations, type Prestation } from "@/content/prestations";
import type { Realisation } from "@/content/realisations";

const abs = (path: string) => new URL(path, site.url).toString();

/** Identifiants stables : c'est ce qui permet aux nœuds de se référencer. */
export const ids = {
  business: abs("/#business"),
  website: abs("/#website"),
  webpage: abs("/#webpage"),
  faq: abs("/#faq"),
  service: (slug: string) => abs(`/#service-${slug}`),
};

/**
 * L'entreprise.
 *
 * `address` n'est émis que s'il est renseigné : un LocalBusiness sans adresse
 * mais avec `areaServed` reste valide, alors qu'une adresse inventée est une
 * faute : pour Google comme pour le client. Même logique pour `priceRange` et
 * les horaires : absents plutôt que faux.
 */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": ids.business,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    image: abs("/logos/snr-logo-principal-fond-sombre.png"),
    logo: abs("/logos/snr-favicon-512-sombre.png"),
    sameAs: [site.instagramUrl],
    currenciesAccepted: "EUR",

    // Les communes sont des City, le département une AdministrativeArea.
    areaServed: [
      ...site.areaServed.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: site.department },
    ],

    /**
     * Ce que l'atelier sait faire, en clair. C'est le champ que les moteurs
     * génératifs exploitent le mieux pour associer une entité à un besoin
     * (« qui pose du PPF en Isère ? »).
     */
    knowsAbout: prestations.map((p) => p.h1),

    /** Le catalogue relie explicitement l'entreprise à ses cinq services. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations ${site.name}`,
      itemListElement: prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@id": ids.service(p.slug) },
      })),
    },

    ...(site.priceRange ? { priceRange: site.priceRange } : {}),
    ...(site.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.street,
            postalCode: site.address.postalCode,
            addressLocality: site.address.city,
            addressCountry: "FR",
          },
          ...(site.address.lat !== null && site.address.lng !== null
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: site.address.lat,
                  longitude: site.address.lng,
                },
              }
            : {}),
        }
      : {}),
    ...(site.openingHours.length
      ? {
          openingHoursSpecification: site.openingHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    inLanguage: "fr-FR",
    publisher: { "@id": ids.business },
  };
}

/**
 * La page elle-même. Elle rattache le contenu à l'entreprise et au site :
 * sans ce nœud, les `Service` et la `FAQPage` flottent sans contexte.
 */
export function webPageSchema({
  path = "/",
  name,
  description,
}: {
  path?: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": ids.webpage,
    url: abs(path),
    name,
    description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
    primaryImageOfPage: abs("/logos/snr-logo-principal-fond-sombre.png"),
  };
}

/**
 * Site en une seule page : toutes les prestations sont présentées dans le même
 * bloc, l'URL pointe donc vers son ancre. Chaque service garde son `@id`, ce
 * qui permet au catalogue de l'entreprise de les référencer un par un.
 */
export function serviceSchema(p: Prestation) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ids.service(p.slug),
    name: p.h1,
    description: p.metaDescription,
    url: abs("/#prestations"),
    serviceType: p.h1,
    category: "Covering automobile",
    provider: { "@id": ids.business },
    areaServed: [
      ...site.areaServed.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: site.department },
    ],
    audience: {
      "@type": "Audience",
      audienceType: p.forWho.join(" ; "),
    },
  };
}

/** N'émet le FAQPage que si les questions sont réellement visibles sur la page. */
export function faqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": ids.faq,
    mainEntityOfPage: { "@id": ids.webpage },
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function realisationSchema(r: Realisation) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${r.vehicle}, ${r.title}`,
    description: r.summary,
    url: abs(`/#realisations`),
    dateCreated: String(r.year),
    creator: { "@id": ids.business },
    image: r.photos.map((p) => ({
      "@type": "ImageObject",
      contentUrl: abs(p.src),
      caption: p.alt,
      width: p.width,
      height: p.height,
    })),
  };
}

/**
 * Injecte le JSON-LD côté serveur, dans le HTML initial.
 *
 * Plusieurs nœuds sont fusionnés en un seul `@graph` : c'est la forme
 * canonique, elle déclare `@context` une seule fois et rend les renvois entre
 * `@id` explicites pour les analyseurs. Passer un objet seul reste possible,
 * les pages archivées l'utilisent telles quelles.
 *
 * `<` est échappé en séquence Unicode : sans cela, un contenu comportant
 * `</script>` refermerait la balise et le reste passerait pour du HTML. Les
 * données sont statiques aujourd'hui, mais l'échappement protège la suite.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const nodes = Array.isArray(data) ? data : [data];
  const payload =
    nodes.length === 1
      ? nodes[0]
      : {
          "@context": "https://schema.org",
          "@graph": nodes.map(({ ...node }) => {
            delete (node as Record<string, unknown>)["@context"];
            return node;
          }),
        };

  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
