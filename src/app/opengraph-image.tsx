import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "SNR Covering, atelier de covering à Grenoble";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image de partage générée à la volée : c'est ce qui s'affiche quand un lien
 * est envoyé sur Instagram ou WhatsApp, canal principal de ce métier.
 * Reprend le badge incliné et la double barre bleu/rose.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0a0b",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-10%",
            left: "6%",
            width: "70px",
            height: "130%",
            background: "#4ab7e8",
            opacity: 0.1,
            transform: "skewX(-12deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "-10%",
            left: "11%",
            width: "30px",
            height: "130%",
            background: "#ff3d7f",
            opacity: 0.12,
            transform: "skewX(-12deg)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "34px" }}>
          <div style={{ display: "flex", width: "16px", height: "44px", background: "#4ab7e8", transform: "skewX(-16deg)" }} />
          <div style={{ display: "flex", width: "16px", height: "44px", background: "#ff3d7f", transform: "skewX(-16deg)" }} />
          <div
            style={{
              display: "flex",
              color: "#9aa0a6",
              fontSize: "22px",
              letterSpacing: "6px",
              fontWeight: 700,
              marginLeft: "10px",
            }}
          >
            ATELIER DE COVERING · {site.city.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", color: "#f2f3f5", fontSize: "104px", fontWeight: 800, lineHeight: 1 }}>
          SNR COVERING
        </div>
        <div style={{ display: "flex", color: "#6b7075", fontSize: "44px", marginTop: "18px" }}>
          Covering · PPF · Déchromage · Déco sur-mesure
        </div>
      </div>
    ),
    size,
  );
}
