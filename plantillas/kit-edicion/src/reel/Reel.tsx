import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "./brand";
import { Captions, useBrandFont } from "./Captions";
import { ReelProps } from "./types";
import { Footer, TopLabel } from "./Footer";

const { contrast, saturate, brightness, warmth } = BRAND.grade;
const GRADE = `contrast(${contrast}) saturate(${saturate}) brightness(${brightness}) sepia(${warmth})`;

// Cada tramo con voz se pone uno tras otro: así desaparecen los silencios.
const Cuts: React.FC<ReelProps> = ({ data }) => {
  const { fps } = useVideoConfig();
  let at = 0;
  return (
    <>
      {data.segments.map((s, i) => {
        const from = Math.round(s.from * fps);
        const to = Math.round(s.to * fps);
        const len = to - from;
        const seq = (
          <Sequence key={i} from={at} durationInFrames={len} premountFor={fps}>
            <OffthreadVideo
              src={staticFile(data.clip)}
              trimBefore={from}
              trimAfter={to}
              // micro fade de audio para que los cortes no "truenen"
              volume={(f) =>
                interpolate(f, [0, 2, len - 2, len], [0, 1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              }
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: GRADE }}
            />
          </Sequence>
        );
        at += len;
        return seq;
      })}
    </>
  );
};

const Hook: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 12 } });
  const out = interpolate(frame, [2.2 * fps, 2.6 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 300, opacity: out }}>
      <div
        style={{
          fontFamily: BRAND.font,
          fontSize: 92,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.05,
          color: BRAND.stroke,
          background: BRAND.accent,
          padding: "18px 34px",
          maxWidth: 900,
          transform: `translateY(${(1 - inn) * -60}px) rotate(-2deg)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Reel: React.FC<ReelProps> = (props) => {
  useBrandFont();
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Cuts {...props} />
      {/* viñeta: enfoca la mirada en el centro */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,${BRAND.vignette}) 100%)`,
        }}
      />
      <Captions words={props.data.words} />
      {props.hook ? (
        <Sequence durationInFrames={80}>
          <Hook text={props.hook} />
        </Sequence>
      ) : null}
      {/* la etiqueta entra cuando se va el gancho, para que no se encimen */}
      {props.label ? (
        <Sequence from={props.hook ? 78 : 0}>
          <TopLabel text={props.label} />
        </Sequence>
      ) : null}
      <Footer part={props.part} total={props.total} />
    </AbsoluteFill>
  );
};
