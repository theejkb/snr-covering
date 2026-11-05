import { Mark } from "./Logo";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <Mark />
      {/* Toujours sur une ligne : resserré sur mobile plutôt que replié. */}
      <span className="font-sans text-[10px] font-bold whitespace-nowrap italic tracking-[.12em] text-muted-2 sm:text-xs sm:tracking-[.24em]">
        {children}
      </span>
    </div>
  );
}
