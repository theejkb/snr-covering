"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1240px] flex-col justify-center px-6 pt-[132px] pb-24 sm:px-10">
      <h1
        className="text-[clamp(32px,5vw,60px)] leading-[.9]"
        style={{ fontFamily: "var(--font-bebas)", fontStyle: "italic" }}
      >
        QUELQUE CHOSE A CASSÉ
      </h1>
      <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#a6abb2]">
        Une erreur est survenue lors du chargement de cette page. Vous pouvez réessayer, ou nous
        écrire directement à Covering.snr@gmail.com.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 w-max rounded-[2px] bg-[#f2f3f5] px-8 py-4 text-[13px] font-bold text-[#0a0a0b]"
      >
        RÉESSAYER
      </button>
    </div>
  );
}
