import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Ratio CSS réservé, pour zéro décalage même sans photo */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  className?: string;
};

/**
 * Affiche une vraie photo si elle est fournie, sinon un emplacement réservé
 * (équivalent des <image-slot> de la maquette). Dans les deux cas la place est
 * réservée : aucun décalage de mise en page quand les photos arriveront.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  ratio = "4/5",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  label = "Photo à venir",
  className = "",
}: Props) {
  if (src && alt && width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={priority}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center border border-dashed border-line-card bg-card ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="px-6 text-center font-sans text-[11px] tracking-[.14em] text-dim uppercase">
        {label}
      </span>
    </div>
  );
}
