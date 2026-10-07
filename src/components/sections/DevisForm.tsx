"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRightIcon, CheckIcon } from "../ui/icons";
import { CATEGORIES } from "@/content/categories";
import { envoyerDevis, type DevisState } from "@/app/actions/devis";

const initial: DevisState = { status: "idle" };

/** Style commun des champs : repris de la maquette (l. 417-425). */
const champ =
  "w-full rounded-field border border-line-field bg-transparent px-[15px] py-[13px] font-sans text-base text-white placeholder:text-dim sm:text-sm";

/**
 * Formulaire de devis : apparence de la maquette (l. 406-429).
 *
 * Trois champs, des pastilles de service à sélection multiple, un message.
 * Ce que la maquette n'avait pas et qui reste ici : la validation côté serveur,
 * l'envoi réel, le honeypot et la case de consentement : sans quoi le
 * formulaire ne serait qu'un décor, et le site pas conforme au RGPD.
 */
export function DevisForm() {
  const [state, action] = useActionState(envoyerDevis, initial);
  const [services, setServices] = useState<string[]>([]);

  const bascule = (s: string) =>
    setServices((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]));

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[380px] flex-col items-center justify-center text-center"
      >
        <span
          aria-hidden
          className="mb-[22px] flex h-16 w-16 items-center justify-center rounded-full bg-bright text-ink"
        >
          <CheckIcon size={30} weight="bold" />
        </span>
        <p className="font-display text-[38px] leading-[.95] italic">C&apos;EST NOTÉ</p>
        <p className="mt-3 max-w-[300px] font-sans text-sm leading-[1.7] text-muted-2">
          On regarde votre projet et on vous recontacte sous 48 h. Si vous avez des
          photos du véhicule, répondez simplement à notre email : c&apos;est ce qui nous permet
          d&apos;être précis du premier coup.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-3.5">
      <div className="mb-1">
        <p className="font-display text-2xl text-bright italic">VOTRE DEVIS EN 2 MINUTES</p>
        <p className="mt-1 font-sans text-[12px] text-dim">
          Cinq champs, pas de compte à créer.
        </p>
      </div>

      <Champ name="nom" label="Votre nom" errors={state.fieldErrors?.nom} autoComplete="name" />
      <Champ
        name="contact"
        label="Email ou téléphone"
        errors={state.fieldErrors?.contact}
        autoComplete="email"
      />
      <Champ
        name="vehicule"
        label="Votre véhicule (marque, modèle)"
        errors={state.fieldErrors?.vehicule}
      />

      <fieldset className="my-0.5">
        <legend className="mb-2 font-sans text-[12px] text-dim">
          Ce qui vous intéresse : plusieurs choix possibles, ou aucun si vous hésitez
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((s) => {
            const actif = services.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => bascule(s)}
                aria-pressed={actif}
                className={`filter-tab rounded-pill px-3.5 py-2 font-sans text-[11px] font-semibold ${
                  actif
                    ? "border border-soft bg-soft text-ink"
                    : "border border-line-field text-muted-2 hover:text-bright"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {/* Les pastilles sont des boutons : ce sont ces champs cachés qui
            transportent la sélection jusqu'à la Server Action. */}
        {services.map((s) => (
          <input key={s} type="hidden" name="services" value={s} />
        ))}
      </fieldset>

      <div>
        <label className="sr-only" htmlFor="message">
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          placeholder="Ce que vous avez en tête : une couleur, une finition, une photo qui vous plaît. Même vague, ça nous suffit pour chiffrer."
          className={`${champ} min-h-[100px] resize-none`}
        />
        <Erreur id="message-error" errors={state.fieldErrors?.message} />
      </div>

      {/* Honeypot : masqué aux humains, aux lecteurs d'écran et au focus */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="societe">Société</label>
        <input id="societe" name="societe" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-field border border-pink/50 bg-pink/10 px-4 py-3 font-sans text-sm text-bright"
        >
          {state.message}
        </p>
      )}

      <Submit />

      <div className="flex items-start gap-2.5">
        <input
          id="consentement"
          name="consentement"
          type="checkbox"
          required
          aria-describedby={state.fieldErrors?.consentement ? "consentement-error" : undefined}
          className="case-consentement mt-px h-6 w-6 shrink-0 cursor-pointer"
        />
        <label
          htmlFor="consentement"
          className="cursor-pointer font-sans text-[11px] leading-relaxed text-dim"
        >
          J&apos;accepte que mes coordonnées soient utilisées pour répondre à ma demande. Elles ne
          servent à rien d&apos;autre et ne sont transmises à personne.
        </label>
      </div>
      <Erreur id="consentement-error" errors={state.fieldErrors?.consentement} />

      <p className="text-center font-sans text-[11px] text-dim">
        Réponse sous 48 h · Devis gratuit · Aucun engagement
      </p>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary mt-1 flex items-center justify-center gap-2 rounded-field bg-bright p-4 font-sans text-[13px] font-bold tracking-[.04em] text-ink italic disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        "ENVOI EN COURS…"
      ) : (
        <>
          RECEVOIR MON DEVIS
          <ArrowRightIcon className="fleche" size={16} weight="bold" aria-hidden />
        </>
      )}
    </button>
  );
}

function Erreur({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="font-sans text-xs text-pink">
      {errors[0]}
    </p>
  );
}

/**
 * La maquette n'affiche pas de libellé au-dessus des champs, seulement un
 * placeholder. Le libellé existe donc, mais pour les lecteurs d'écran :
 * un placeholder seul ne nomme pas un champ.
 */
function Champ({
  name,
  label,
  errors,
  ...rest
}: {
  name: string;
  label: string;
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={label}
        aria-describedby={errors?.length ? errorId : undefined}
        aria-invalid={errors?.length ? true : undefined}
        className={champ}
        {...rest}
      />
      <Erreur id={errorId} errors={errors} />
    </div>
  );
}
