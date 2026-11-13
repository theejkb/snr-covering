import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${site.name} collecte, utilise et protège vos données personnelles.`,
  alternates: { canonical: "/politique-de-confidentialite" },
};

/**
 * Doit rester fidèle au code : si un outil de mesure d'audience, un
 * prestataire d'envoi ou un champ du formulaire change, cette page change aussi.
 * Prestataires actuels : Vercel (hébergement), Resend (envoi du formulaire,
 * `src/app/actions/devis.ts`), Gmail (boîte de réception).
 */
const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections = [
  {
    heading: "Responsable du traitement",
    body: (
      <p>
        {site.legal.director}, entrepreneur individuel ({site.name}, SIRET {site.legal.siret}),
        joignable à {mail} ou au {site.phone}.
      </p>
    ),
  },
  {
    heading: "Données collectées",
    body: (
      <>
        <p>Via le formulaire de demande de devis :</p>
        <ul>
          <li>nom ;</li>
          <li>email ou numéro de téléphone ;</li>
          <li>véhicule concerné et prestations souhaitées ;</li>
          <li>message libre et, si vous en joignez, photos du véhicule.</li>
        </ul>
        <p>
          Pour les clients, s&apos;y ajoutent les informations nécessaires au devis, à la
          facturation et au suivi de la prestation.
        </p>
        <p>
          Évitez d&apos;indiquer dans le message des informations sans rapport avec votre demande.
          Une plaque d&apos;immatriculation visible sur une photo n&apos;est utilisée que pour
          identifier le véhicule.
        </p>
      </>
    ),
  },
  {
    heading: "Finalités et bases légales",
    body: (
      <ul>
        <li>
          <strong>Répondre à votre demande et établir un devis</strong> : mesures
          précontractuelles prises à votre demande (art. 6.1.b du RGPD).
        </li>
        <li>
          <strong>Réaliser et facturer la prestation</strong> : exécution du contrat (art. 6.1.b).
        </li>
        <li>
          <strong>Conserver les factures</strong> : obligation légale comptable (art. 6.1.c).
        </li>
        <li>
          <strong>Sécurité du site</strong> (journaux techniques, protection contre les envois
          automatisés) : intérêt légitime (art. 6.1.f).
        </li>
      </ul>
    ),
  },
  {
    heading: "Destinataires",
    body: (
      <>
        <p>
          Vos données sont lues uniquement par {site.name}. Elles ne sont ni vendues, ni louées, ni
          utilisées à des fins publicitaires.
        </p>
        <p>Elles transitent par des prestataires techniques, qui agissent sur instruction :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> : hébergement du site ;
          </li>
          <li>
            <strong>Resend</strong> : acheminement du formulaire jusqu&apos;à la boîte mail ;
          </li>
          <li>
            <strong>Google (Gmail)</strong> : messagerie de l&apos;entreprise.
          </li>
        </ul>
        <p>
          Ces prestataires sont situés aux États-Unis. Les transferts sont encadrés par le Data
          Privacy Framework UE–États-Unis et, à défaut, par les clauses contractuelles types de la
          Commission européenne.
        </p>
      </>
    ),
  },
  {
    heading: "Durées de conservation",
    body: (
      <ul>
        <li>Demande de devis sans suite : 3 ans après le dernier échange.</li>
        <li>Données clients : durée de la relation commerciale, puis 3 ans.</li>
        <li>Factures et pièces comptables : 10 ans (article L123-22 du Code de commerce).</li>
        <li>Journaux techniques de l&apos;hébergeur : quelques jours à quelques semaines.</li>
      </ul>
    ),
  },
  {
    heading: "Cookies et traceurs",
    body: (
      <>
        <p>
          Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de mesure d&apos;audience ni
          de publicité.
        </p>
        <p>
          Les polices sont hébergées sur le serveur du site, et les photos Instagram affichées sur
          la page sont copiées puis servies par ce même serveur : votre navigateur ne contacte ni
          Google ni Meta pendant la visite. Seul un clic sur un lien Instagram vous fait quitter le
          site, et la politique d&apos;Instagram s&apos;applique alors.
        </p>
      </>
    ),
  },
  {
    heading: "Vos droits",
    body: (
      <>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, de portabilité et d&apos;opposition sur vos données, ainsi que du droit de
          définir des directives sur leur sort après votre décès.
        </p>
        <p>
          Pour les exercer, écrivez à {mail}. Une réponse vous est apportée sous un mois. Une
          pièce d&apos;identité peut être demandée en cas de doute sur votre identité.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            cnil.fr/fr/plaintes
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Sécurité",
    body: (
      <p>
        Le site est servi exclusivement en HTTPS, et les échanges avec les prestataires sont
        chiffrés. Les photos jointes au formulaire ne sont pas stockées sur le site : elles sont
        transmises directement par email.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      path="/politique-de-confidentialite"
      sections={sections}
    />
  );
}
