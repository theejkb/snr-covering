import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // 1320 = 1240 de contenu + 2 × 40 de gouttière. Dans la maquette, la gouttière
  // est portée par la section et le bloc intérieur fait 1240 px pleins : pas
  // 1240 padding compris. Avec `max-w-[1240px]`, tout le contenu se retrouvait
  // 80 px trop étroit sur grand écran.
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
