import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "btn-primary inline-flex items-center justify-center gap-2 rounded-btn font-sans text-[13px] tracking-[.04em]";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "ghost" }) {
  const styles =
    variant === "primary"
      ? "bg-bright px-8 py-4 font-bold italic text-ink"
      : "border border-line-strong px-7 py-4 font-semibold text-soft";
  return <Link className={`${base} ${styles} ${className}`} {...props} />;
}
