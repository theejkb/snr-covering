/**
 * Les icônes du site, importées une par une depuis leur fichier.
 *
 * Pourquoi ne pas écrire `from "@phosphor-icons/react/ssr"` directement : ce
 * point d'entrée est un index de 188 ko qui réexporte les 9 000 icônes du
 * catalogue. `optimizePackageImports` sait le découper pour le paquet racine,
 * pas pour ce sous-chemin. Mesuré : +70 ko de JS gzip sur la page.
 *
 * En pointant chaque fichier, on n'embarque que ce qu'on affiche. Ce module
 * regroupe les chemins pour qu'ils ne se dispersent pas dans les composants.
 *
 * Convention : `weight="regular"` partout, `bold` uniquement pour les flèches
 * et les puces, où le trait fin se perd à petite taille.
 */
export type { Icon } from "@phosphor-icons/react/dist/lib/types";

export { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
export { ArrowsLeftRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowsLeftRight";
export { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
export { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
export { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr/InstagramLogo";
export { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
export { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
export { PlayIcon } from "@phosphor-icons/react/dist/ssr/Play";
export { StarIcon } from "@phosphor-icons/react/dist/ssr/Star";
