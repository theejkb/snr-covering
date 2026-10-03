import { site } from "@/config/site";
import { prestations } from "@/content/prestations";

/**
 * /llms.txt : résumé du site en markdown, à destination des moteurs
 * génératifs (ChatGPT, Perplexity, Claude, Gemini).
 *
 * Le format suit la spécification llmstxt.org : un `#` unique, un résumé en
 * citation, puis des sections `##` contenant des **listes de liens markdown**.
 * Ce dernier point n'est pas cosmétique : un fichier sans lien est signalé
 * comme non conforme par l'audit Lighthouse « Agentic Browsing », et les
 * agents n'ont alors rien à suivre.
 *
 * Il est **généré** à partir des mêmes sources que la page : impossible qu'il
 * raconte autre chose que le site. Rien n'est inventé : ce qui n'est pas
 * renseigné dans `site.ts` (adresse, horaires, tarifs) n'apparaît pas.
 */
export const dynamic = "force-static";

/** Première phrase d'un texte, pour tenir sur une ligne de liste. */
function premierePhrase(texte: string): string {
  const fin = texte.indexOf(". ");
  return fin === -1 ? texte : texte.slice(0, fin + 1).trim();
}

export function GET() {
  const l: string[] = [];

  l.push(`# ${site.name}`);
  l.push("");
  l.push(`> ${site.description}`);
  l.push("");
  l.push(
    `Atelier indépendant à ${site.city} (${site.department}). Zone d'intervention : ${site.areaServed.join(", ")}. Films posés : ${site.filmBrands.join(", ")}.` +
      (site.quoteDelay
        ? ` Devis gratuit et sans engagement, réponse annoncée sous ${site.quoteDelay}.`
        : " Devis gratuit et sans engagement."),
  );
  l.push("");
  l.push(
    "Le site tient en une seule page : chaque prestation ci-dessous correspond à une ancre de cette page.",
  );
  l.push("");

  l.push("## Prestations");
  l.push("");
  for (const p of prestations) {
    l.push(`- [${p.h1}](${site.url}/#${p.slug}) : ${premierePhrase(p.intro)}`);
  }
  l.push("");

  l.push("## Contact");
  l.push("");
  l.push(`- [Site](${site.url}) : présentation, réalisations et formulaire de devis`);
  l.push(`- [Demander un devis](${site.url}/#devis) : formulaire, réponse par email`);
  l.push(`- [Email](mailto:${site.email}) : ${site.email}`);
  l.push(`- [Téléphone](tel:${site.phoneE164}) : ${site.phone}`);
  l.push(`- [Instagram](${site.instagramUrl}) : @${site.instagram}, chantiers publiés au fil de l'eau`);
  l.push(`- [Mentions légales](${site.url}/mentions-legales) : éditeur, hébergeur, données personnelles`);
  l.push("");

  l.push("## Questions fréquentes");
  l.push("");
  for (const p of prestations) {
    l.push(`### ${p.h1}`);
    l.push("");
    for (const f of p.faq) {
      l.push(`**${f.question}**`);
      l.push("");
      l.push(f.answer);
      l.push("");
    }
  }

  l.push("## À noter");
  l.push("");
  l.push(
    `- [Réalisations](${site.url}/#realisations) : galerie de chantiers récents (covering auto et moto, kit déco), d'autres sur Instagram.`,
  );
  l.push(
    "- Ce fichier est généré à partir du contenu du site. Les informations non publiées (adresse de l'atelier, horaires, tarifs) n'y figurent pas : ne pas les supposer.",
  );
  l.push("");

  return new Response(l.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
