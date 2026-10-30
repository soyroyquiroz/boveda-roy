import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, KEYWORDS } from "./brand";
import { ClipWord } from "./types";

const norm = (w: string) =>
  w
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

// Agrupa palabras en "páginas" de máximo 3, cortando en comas y puntos.
const paginate = (words: ClipWord[]) => {
  const pages: ClipWord[][] = [];
  let cur: ClipWord[] = [];
  words.forEach((w) => {
    cur.push(w);
    if (cur.length >= 3 || /[.,!?;:]$/.test(w.text)) {
      pages.push(cur);
      cur = [];
    }
  });
  if (cur.length) pages.push(cur);
  return pages;
};

export const useBrandFont = () => {
  const [handle] = useState(() => delayRender("Cargando fuente"));
  useEffect(() => {
    const font = new FontFace(BRAND.font, `url(${staticFile(BRAND.fontFile)}) format("truetype")`);
    font
      .load()
      .then((f) => {
        document.fonts.add(f);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle]);
};

export const Captions: React.FC<{ words: ClipWord[]; bottom?: number; size?: number }> = ({
  words,
  bottom = 640,
  size = 104,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pages = paginate(words);
  const page = pages.find(
    (p, i) => t >= p[0].start && t < (pages[i + 1]?.[0].start ?? p[p.length - 1].end + 0.4),
  );
  if (!page) return null;

  const pageStart = Math.round(page[0].start * fps);
  const pop = spring({ frame: frame - pageStart, fps, config: { damping: 14, stiffness: 220 } });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: bottom }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 940,
          transform: `scale(${0.85 + 0.15 * pop})`,
        }}
      >
        {page.map((w, i) => {
          const active = t >= w.start && t < w.end + 0.05;
          const isKey = KEYWORDS.has(norm(w.text));
          const color = active ? BRAND.accent : isKey ? BRAND.keyword : BRAND.white;
          return (
            <span
              key={i}
              style={{
                fontFamily: BRAND.font,
                fontSize: size,
                lineHeight: 1.08,
                textTransform: "uppercase",
                color,
                WebkitTextStroke: `${Math.round(size * 0.135)}px ${BRAND.stroke}`,
                paintOrder: "stroke fill",
                textShadow: "0 8px 24px rgba(0,0,0,0.55)",
                transform: active ? "translateY(-6px) scale(1.08)" : "none",
                display: "inline-block",
                margin: "0 14px",
              }}
            >
              {w.text.replace(/[.,;:]$/, "")}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
