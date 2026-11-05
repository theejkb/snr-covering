/**
 * Limites des photos jointes au devis, partagées entre le formulaire et la
 * Server Action.
 *
 * Le plafond qui compte est celui de Vercel : 4,5 Mo par requête, non
 * configurable. Une photo de téléphone pèse 3 à 5 Mo : le formulaire les
 * réduit donc avant l'envoi (1 600 px, JPEG), ce qui les ramène autour de
 * 300 Ko et laisse passer les cinq.
 */
export const PHOTOS_MAX = 5;

/** Total des photos d'une demande, marge comprise sous les 4,5 Mo de Vercel. */
export const PHOTOS_TOTAL_MAX = 4 * 1024 * 1024;

/** Plus grand côté après réduction : assez pour juger l'état d'une carrosserie. */
export const PHOTO_COTE_MAX = 1600;

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
