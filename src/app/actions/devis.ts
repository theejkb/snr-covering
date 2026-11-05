"use server";

import { Resend } from "resend";
import { env } from "@/lib/env";
import { devisSchema } from "@/lib/devis-schema";
import { PHOTOS_MAX, PHOTOS_TOTAL_MAX, PHOTO_TYPES } from "@/lib/photos";

export type DevisState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function envoyerDevis(_prev: DevisState, formData: FormData): Promise<DevisState> {
  // `services` arrive une fois par pastille cochée : `Object.fromEntries` ne
  // garderait que la dernière. D'où le `getAll` explicite.
  const parsed = devisSchema.safeParse({
    ...Object.fromEntries(formData),
    services: formData.getAll("services"),
  });

  if (!parsed.success) {
    const tree = parsed.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
      const key = String(issue.path[0] ?? "form");
      (acc[key] ??= []).push(issue.message);
      return acc;
    }, {});
    return { status: "error", message: "Quelques champs sont à corriger.", fieldErrors: tree };
  }

  // Honeypot : on répond comme si tout s'était bien passé, sans rien envoyer.
  // Un champ fichier vide envoie quand même un File de 0 octet : on l'écarte.
  const photos = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const totalPhotos = photos.reduce((t, f) => t + f.size, 0);

  if (
    photos.length > PHOTOS_MAX ||
    totalPhotos > PHOTOS_TOTAL_MAX ||
    photos.some((f) => !PHOTO_TYPES.includes(f.type))
  ) {
    return {
      status: "error",
      message: `Les photos ne passent pas : ${PHOTOS_MAX} au maximum, en JPEG, PNG, WebP ou HEIC.`,
      fieldErrors: { photos: ["Retirez une photo ou choisissez un autre format."] },
    };
  }

  if (parsed.data.societe) {
    return { status: "success", message: "Message envoyé." };
  }

  if (!env.RESEND_API_KEY) {
    return {
      status: "error",
      message:
        "L'envoi n'est pas encore configuré : ajoutez RESEND_API_KEY dans .env.local. En attendant, écrivez directement à Covering.snr@gmail.com.",
    };
  }

  const d = parsed.data;
  const services = d.services.length ? d.services.join(", ") : "Non précisé";

  const lignes = [
    `Nom : ${d.nom}`,
    `Contact : ${d.contact}`,
    d.vehicule ? `Véhicule : ${d.vehicule}` : null,
    `Prestations : ${services}`,
    photos.length ? `Photos jointes : ${photos.length}` : null,
    "",
    d.message,
  ].filter(Boolean) as string[];

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `SNR Covering <${env.CONTACT_FROM_EMAIL}>`,
      to: [env.CONTACT_TO_EMAIL],
      // `replyTo` seulement si le contact est un email : un numéro de téléphone
      // dans cet en-tête rendrait la réponse impossible.
      ...(d.contact.includes("@") ? { replyTo: d.contact } : {}),
      subject: `Demande de devis · ${services} · ${d.nom}`,
      text: lignes.join("\n"),
      ...(photos.length
        ? {
            attachments: await Promise.all(
              photos.map(async (f, i) => ({
                filename: f.name || `photo-${i + 1}.jpg`,
                content: Buffer.from(await f.arrayBuffer()),
              })),
            ),
          }
        : {}),
    });

    if (error) {
      console.error("[devis] Resend:", error);
      return {
        status: "error",
        message: "L'envoi a échoué. Réessayez, ou écrivez à Covering.snr@gmail.com.",
      };
    }

    return { status: "success", message: "Message envoyé." };
  } catch (err) {
    console.error("[devis]", err);
    return {
      status: "error",
      message: "L'envoi a échoué. Réessayez, ou écrivez à Covering.snr@gmail.com.",
    };
  }
}
