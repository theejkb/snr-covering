import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name} : éditeur, hébergeur, propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
};

const adresse = site.address
  ? `${site.address.street}, ${site.address.postalCode} ${site.address.city}`
  : site.city;

const sections = [
  {
    heading: "Éditeur du site",
    body: (
      <>
        <p>
          Le site <strong>{site.url.replace(/^https?:\/\//, "")}</strong> est édité par{" "}
          <strong>{site.legal.director}</strong>, entrepreneur individuel exerçant sous le nom
          commercial <strong>{site.name}</strong>.
        </p>
        <ul>
          <li>Forme juridique : {site.legal.status}</li>
          <li>SIRET : {site.legal.siret}</li>
          <li>Code APE : {site.legal.naf}</li>
          <li>Adresse : {adresse}</li>
          <li>
            Email : <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            Téléphone : <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
          </li>
          {site.legal.vatNote && <li>{site.legal.vatNote}</li>}
        </ul>
        <p>Responsable de la publication : {site.legal.director}.</p>
      </>
    ),
  },
  {
    heading: "Activité",
    body: (
      <>
        <p>{site.name} propose des prestations de :</p>
        <ul>
          <li>covering automobile et moto ;</li>
          <li>pose de films de protection de carrosserie (PPF) ;</li>
          <li>kits déco et personnalisation ;</li>
          <li>marquage publicitaire ;</li>
          <li>vitrophanie et adhésifs ;</li>
          <li>personnalisation de véhicules et de surfaces.</li>
        </ul>
        <p>
          Les conditions applicables à ces prestations sont détaillées dans les{" "}
          <Link href="/conditions-generales">conditions générales de vente</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "Hébergement",
    body: <p>{site.legal.host}</p>,
  },
  {
    heading: "Propriété intellectuelle",
    body: (
      <>
        <p>
          L&apos;ensemble des éléments présents sur ce site (textes, photographies, visuels, logos,
          créations graphiques et contenus) est protégé par le droit de la propriété
          intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification ou utilisation, totale ou partielle,
          sans autorisation préalable de {site.name} est interdite et constitue une contrefaçon
          (articles L335-2 et suivants du Code de la propriété intellectuelle).
        </p>
        <p>
          Les marques de films citées ({site.filmBrands.join(", ")}) appartiennent à leurs
          titulaires respectifs.
        </p>
      </>
    ),
  },
  {
    heading: "Données personnelles",
    body: (
      <>
        <p>
          Les informations personnelles collectées via le site (formulaire de devis, demandes de
          contact) sont utilisées uniquement dans le cadre de la relation commerciale et du
          traitement des demandes.
        </p>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez de droits
          d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos données.
          Pour les exercer : <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Le détail figure dans la{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        Ce site ne dépose aucun cookie, ni de mesure d&apos;audience ni de publicité. Aucun bandeau
        de consentement n&apos;est donc nécessaire.
      </p>
    ),
  },
  {
    heading: "Liens externes",
    body: (
      <p>
        Le site contient des liens vers des services tiers (Instagram notamment). {site.name}{" "}
        n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur
        contenu.
      </p>
    ),
  },
];

export default function Page() {
  return <LegalPage title="Mentions légales" path="/mentions-legales" sections={sections} />;
}
