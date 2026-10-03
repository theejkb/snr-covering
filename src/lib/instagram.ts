import { env } from "./env";

/**
 * Récupération des dernières publications Instagram.
 *
 * Il n'existe aucun moyen légal de lire un compte Instagram sans jeton :
 * l'endpoint public renvoie une erreur 400 depuis qu'Instagram l'a fermé, et le
 * scraping viole les conditions d'utilisation. L'API Basic Display, elle, a été
 * arrêtée en décembre 2024.
 *
 * Le seul chemin officiel restant est l'API Instagram avec connexion Instagram,
 * qui demande trois choses, toutes gratuites :
 *   1. un compte Instagram professionnel (Business ou Créateur) ;
 *   2. une application créée sur developers.facebook.com ;
 *   3. un jeton d'accès longue durée, valable 60 jours et renouvelable.
 *
 * Tant que `INSTAGRAM_ACCESS_TOKEN` est absent, la fonction renvoie un tableau
 * vide et la section retombe sur ses emplacements réservés. Aucune erreur, rien
 * de cassé : le site fonctionne, il affiche simplement moins.
 */

export type Publication = {
  id: string;
  permalink: string;
  /** URL de l'image à afficher. Pour une vidéo, c'est la vignette. */
  image: string;
  /** Légende nettoyée, utilisée comme texte alternatif. */
  legende: string;
  estVideo: boolean;
};

type ReponseApi = {
  data?: Array<{
    id: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
  }>;
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

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
  url.searchParams.set("limit", String(limite));
  url.searchParams.set("access_token", env.INSTAGRAM_ACCESS_TOKEN);

  try {
    // Revalidation horaire : le compte publie quelques fois par semaine, et une
    // page reconstruite à chaque visite coûterait plus que ça ne rapporte.
    const reponse = await fetch(url, { next: { revalidate: 3600 } });
    const json: ReponseApi = await reponse.json();

    if (json.error) {
      // Cas le plus fréquent : jeton expiré au bout de 60 jours.
      console.error("[instagram]", json.error.message);
      return [];
    }

    return (json.data ?? [])
      .map((post, i) => {
        const image = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
        if (!image) return null;
        return {
          id: post.id,
          permalink: post.permalink,
          image,
          legende: texteAlternatif(post.caption, i),
          estVideo: post.media_type === "VIDEO",
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
