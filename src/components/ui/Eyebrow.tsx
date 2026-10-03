import { Mark } from "./Logo";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <Mark />
      <span className="font-sans text-[11px] font-bold italic tracking-[.22em] text-muted-2 sm:text-xs sm:tracking-[.24em]">
        {children}
      </span>
    </div>
  );
}
