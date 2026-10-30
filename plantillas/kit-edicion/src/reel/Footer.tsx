import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "./brand";

const pad = (n: number) => String(n).padStart(2, "0");
const shadow = "0 2px 12px rgba(0,0,0,0.75)";

// Etiqueta chica arriba a la izquierda: dice de qué va el video.
export const TopLabel: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ padding: "230px 70px 0", opacity: o }}>
      <div
        style={{
          fontFamily: BRAND.font,
          fontSize: 44,
          letterSpacing: 3,
          color: BRAND.white,
          textShadow: shadow,
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Pie fijo: foto (opcional) + NOMBRE · @usuario + contador de serie.
export const Footer: React.FC<{ part?: number; total?: number }> = ({ part, total }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 70px 330px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      {BRAND.avatar ? (
        <Img
          src={staticFile(BRAND.avatar)}
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "50% 15%",
            border: `4px solid ${BRAND.accent}`,
          }}
        />
      ) : null}
      <div
        style={{
          flex: 1,
          fontFamily: BRAND.font,
          fontSize: 34,
          letterSpacing: 2,
          color: "rgba(255,255,255,0.92)",
          textShadow: shadow,
        }}
      >
        {BRAND.name} · {BRAND.handle}
      </div>
      {part && total ? (
        <div style={{ fontFamily: BRAND.font, fontSize: 34, letterSpacing: 2, color: BRAND.white, textShadow: shadow }}>
          {pad(part)} / {pad(total)}
        </div>
      ) : null}
    </div>
  </AbsoluteFill>
);
