import { env } from "./env";

/**
 * Récupération des dernières publications Instagram.
 *
 * Il n'existe aucun moyen légal de lire un compte Instagram sans jeton :
 * l'endpoint public renvoie une erreur 400 depuis qu'Instagram l'a fermé, et le
 * scraping viole les conditions d'utilisation. L'API Basic Display, elle, a été
 * arrêtée en décembre 2024.
 *
 * Deux chemins officiels, choisis selon les variables présentes :
 *   - avec `INSTAGRAM_USER_ID` : API Graph via Facebook, jeton d'un utilisateur
 *     système Meta Business, qui n'expire pas (mode retenu, voir README) ;
 *   - sans : API Instagram avec connexion Instagram, jeton de 60 jours à
 *     renouveler à la main.
 *
 * Tant que `INSTAGRAM_ACCESS_TOKEN` est absent, la fonction renvoie un tableau
 * vide et la section retombe sur ses emplacements réservés. Aucune erreur, rien
 * de cassé : le site fonctionne, il affiche simplement moins.
 */

export type Publication = {
  id: string;
  permalink: string;
  /** URL de la photo. Pour un carrousel, sa première photo. */
  image: string;
  /** Légende nettoyée, utilisée comme texte alternatif. */
  legende: string;
};

type Media = {
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
};

type ReponseApi = {
  data?: Array<
    Media & {
      id: string;
      caption?: string;
      permalink: string;
      children?: { data: Media[] };
    }
  >;
  error?: { message: string; type: string; code: number };
};

/**
 * Un texte alternatif utile pour un lecteur d'écran : la première phrase de la
 * légende, sans les mots-dièse qui la rendent illisible à l'oral.
 */
function texteAlternatif(caption: string | undefined, index: number): string {
  const secours = `Publication Instagram ${index + 1} de SNR Covering`;
  if (!caption) return secours;
  const sansHashtags = caption.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
  if (!sansHashtags) return secours;
  const phrase = sansHashtags.split(/[.!?\n]/)[0].trim();
  return phrase.length > 110 ? `${phrase.slice(0, 107)}...` : phrase;
}

export async function getDernieresPublications(limite = 6): Promise<Publication[]> {
  if (!env.INSTAGRAM_ACCESS_TOKEN) return [];

  const url = new URL(
    env.INSTAGRAM_USER_ID
      ? `https://graph.facebook.com/${env.INSTAGRAM_USER_ID}/media`
      : "https://graph.instagram.com/me/media",
  );
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,children{media_type,media_url}",
  );
  // Les vidéos sont écartées après coup : on en demande plus pour garder
  // `limite` photos même quand le compte publie surtout des reels.
  url.searchParams.set("limit", String(limite * 4));
  url.searchParams.set("access_token", env.INSTAGRAM_ACCESS_TOKEN);

  try {
    // Revalidation horaire : le compte publie quelques fois par semaine, et une
    // page reconstruite à chaque visite coûterait plus que ça ne rapporte.
    const reponse = await fetch(url, { next: { revalidate: 3600 } });
    const json: ReponseApi = await reponse.json();

    if (json.error) {
      // Cas le plus fréquent : jeton expiré (mode 60 jours) ou accès retiré
      // à l'utilisateur système.
      console.error("[instagram]", json.error.message);
      return [];
    }

    return (json.data ?? [])
      .map((post, i) => {
        // Photos uniquement : les vidéos et reels sont ignorés. Pour un
        // carrousel, `media_url` est celui du premier élément, qui peut être
        // une vidéo : on cherche donc sa première photo.
        const image =
          post.media_type === "IMAGE"
            ? post.media_url
            : post.media_type === "CAROUSEL_ALBUM"
              ? post.children?.data.find((c) => c.media_type === "IMAGE")?.media_url
              : undefined;
        if (!image) return null;
        return {
          id: post.id,
          permalink: post.permalink,
          image,
          legende: texteAlternatif(post.caption, i),
        };
      })
      .filter((p): p is Publication => p !== null)
      .slice(0, limite);
  } catch (err) {
    // Instagram indisponible ne doit jamais empêcher la page de s'afficher.
    console.error("[instagram]", err);
    return [];
  }
}
