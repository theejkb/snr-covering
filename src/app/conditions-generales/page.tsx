import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente des prestations de covering, PPF, kits déco et marquage de ${site.name}.`,
  alternates: { canonical: "/conditions-generales" },
};

/**
 * Aucun chiffre commercial n'est fixé ici (acompte, validité du devis, délai) :
 * ils varient d'un chantier à l'autre et sont portés par chaque devis. Ne pas
 * en ajouter sans l'accord de Clarisse, ce sont des engagements.
 */
const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;

const sections = [
  {
    heading: "1. Objet et champ d'application",
    body: (
      <>
        <p>
          Les présentes conditions générales de vente (CGV) s&apos;appliquent à toutes les
          prestations réalisées par {site.legal.director}, entrepreneur individuel exerçant sous le
          nom {site.name} (SIRET {site.legal.siret}), auprès de clients particuliers ou
          professionnels : covering automobile et moto, pose de films de protection (PPF),
          déchromage, kits déco, marquage publicitaire, vitrophanie, adhésifs et personnalisation
          de véhicules ou de surfaces.
        </p>
        <p>
          Elles sont communiquées avec chaque devis. Les conditions particulières figurant sur le
          devis accepté prévalent sur les présentes CGV.
        </p>
      </>
    ),
  },
  {
    heading: "2. Devis",
    body: (
      <>
        <p>
          Chaque prestation fait l&apos;objet d&apos;un devis gratuit et personnalisé, établi
          d&apos;après les informations, photos et, le cas échéant, l&apos;examen du véhicule ou du
          support. Le devis précise la nature des travaux, les matériaux, le prix, le délai
          d&apos;exécution, les modalités de paiement et sa durée de validité.
        </p>
        <p>
          Si l&apos;état réel du support diffère de ce qui a été décrit (rayures, retouches de
          peinture, corrosion, ancien film, etc.), un devis rectificatif peut être proposé avant
          tout travail supplémentaire. Aucun supplément n&apos;est facturé sans votre accord.
        </p>
      </>
    ),
  },
  {
    heading: "3. Commande",
    body: (
      <p>
        La commande est ferme dès réception du devis signé, ou accepté par écrit (email ou message),
        accompagné le cas échéant de l&apos;acompte qu&apos;il prévoit. Pour les créations sur
        mesure (kits déco, marquages, visuels), la production démarre après validation écrite du
        visuel par le client.
      </p>
    ),
  },
  {
    heading: "4. Prix et paiement",
    body: (
      <>
        <p>
          Les prix sont indiqués en euros. {site.legal.vatNote} : les montants s&apos;entendent
          donc nets, sans TVA.
        </p>
        <p>
          Les modalités de paiement (acompte, solde, moyens acceptés) figurent sur le devis. Sauf
          mention contraire, le solde est payable à la restitution du véhicule ou à la livraison.
          Les fournitures (films, kits, adhésifs) restent la propriété de {site.name} jusqu&apos;au
          paiement complet.
        </p>
        <p>
          <strong>Clients professionnels</strong> : tout retard de paiement entraîne de plein droit
          des pénalités au taux de trois fois le taux d&apos;intérêt légal, ainsi qu&apos;une
          indemnité forfaitaire de 40 € pour frais de recouvrement (articles L441-10 et D441-5 du
          Code de commerce). Aucun escompte n&apos;est accordé pour paiement anticipé.
        </p>
      </>
    ),
  },
  {
    heading: "5. Dépôt et restitution du véhicule",
    body: (
      <>
        <p>
          Le véhicule est déposé propre et vidé de ses objets de valeur, à la date convenue. Un état
          des lieux de la carrosserie est réalisé avec le client au dépôt, photos à l&apos;appui.
        </p>
        <p>
          Le délai d&apos;exécution est celui indiqué sur le devis. Pour un client particulier, à
          défaut de délai indiqué, la prestation est réalisée au plus tard 30 jours après la
          commande (article L216-1 du Code de la consommation). Le client est prévenu sans délai de
          tout retard, notamment en cas de rupture de matériaux chez le fournisseur.
        </p>
        <p>
          À la restitution, le client vérifie la prestation en présence de {site.name}. Les
          consignes d&apos;entretien du film lui sont alors remises.
        </p>
      </>
    ),
  },
  {
    heading: "6. Droit de rétractation",
    body: (
      <>
        <p>
          <strong>Contrat conclu à l&apos;atelier</strong> : le Code de la consommation ne prévoit
          pas de droit de rétractation.
        </p>
        <p>
          <strong>Contrat conclu à distance</strong> (devis accepté par email ou message, sans
          rencontre préalable) : le client particulier dispose de 14 jours à compter de
          l&apos;acceptation du devis pour se rétracter, sans motif (article L221-18). Il suffit
          d&apos;envoyer une déclaration claire à {mail}, par exemple :
        </p>
        <p className="border-l-2 border-line pl-4 italic">
          « Je vous notifie par la présente ma rétractation du contrat portant sur la prestation
          suivante : […], acceptée le […]. Nom, adresse, date. »
        </p>
        <p>
          Les sommes versées sont remboursées sous 14 jours. Le droit de rétractation ne
          s&apos;applique pas (article L221-28) :
        </p>
        <ul>
          <li>
            aux kits, marquages et adhésifs confectionnés selon les spécifications du client ou
            nettement personnalisés ;
          </li>
          <li>
            à une prestation pleinement exécutée avant la fin du délai, lorsque le client a demandé
            expressément qu&apos;elle commence et a renoncé à son droit de rétractation.
          </li>
        </ul>
        <p>
          Si le client demande que la prestation commence avant la fin du délai puis se rétracte,
          il règle le montant correspondant au travail déjà réalisé (article L221-25).
        </p>
      </>
    ),
  },
  {
    heading: "7. Garanties",
    body: (
      <>
        <p>
          Les films posés bénéficient de la garantie de leur fabricant ({site.filmBrands.join(", ")}
          ), dans les conditions et pour la durée fixées par celui-ci et précisées sur la facture.
          Cette garantie suppose le respect des consignes d&apos;entretien remises à la
          restitution.
        </p>
        <p>
          Elle s&apos;ajoute aux garanties légales dont bénéficie le client particulier, qui
          restent pleinement applicables : garantie légale de conformité (articles L217-3 et
          suivants du Code de la consommation) et garantie des vices cachés (articles 1641 et
          suivants du Code civil).
        </p>
        <p>
          Tout défaut de pose est à signaler à {mail}, photos à l&apos;appui. {site.name} examine le
          véhicule et reprend gratuitement la pose lorsque le défaut lui est imputable.
        </p>
      </>
    ),
  },
  {
    heading: "8. Responsabilité",
    body: (
      <>
        <p>Ne relèvent pas de la garantie ni de la responsabilité de {site.name} :</p>
        <ul>
          <li>
            l&apos;usure normale, les chocs, projections, accidents, actes de vandalisme ou
            mauvais entretien (lavage haute pression trop proche, produits abrasifs, etc.) ;
          </li>
          <li>
            les dommages causés à la peinture lors d&apos;une dépose de film lorsque cette peinture
            n&apos;est pas d&apos;origine, a été retouchée ou présentait un défaut d&apos;adhérence
            non décelable avant les travaux, sous réserve que le client en ait été informé ;
          </li>
          <li>
            les interventions réalisées par un tiers sur le film après la restitution.
          </li>
        </ul>
        <p>
          Ces exclusions ne limitent en rien la responsabilité de {site.name} pour une faute qui lui
          est imputable, ni les droits que le client particulier tient de la loi.
        </p>
      </>
    ),
  },
  {
    heading: "9. Photos des réalisations",
    body: (
      <p>
        Avec l&apos;accord du client, {site.name} peut photographier le véhicule terminé et publier
        ces photos sur son site et ses réseaux sociaux, plaque d&apos;immatriculation masquée. Le
        client peut refuser ou demander le retrait d&apos;une photo à tout moment en écrivant à{" "}
        {mail}.
      </p>
    ),
  },
  {
    heading: "10. Données personnelles",
    body: (
      <p>
        Les données du client sont traitées conformément à la{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    heading: "11. Réclamations",
    body: (
      <>
        <p>
          Toute réclamation est à adresser en priorité à {mail}. Une solution amiable est
          recherchée dans tous les cas.
        </p>
      </>
    ),
  },
  {
    heading: "12. Droit applicable",
    body: (
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige avec un client
        professionnel, le tribunal compétent est celui du ressort du siège de {site.name}. Le
        client particulier peut saisir, à son choix, la juridiction du lieu où il demeurait lors de
        la conclusion du contrat ou de la survenance du fait dommageable.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      path="/conditions-generales"
      sections={sections}
    />
  );
}
