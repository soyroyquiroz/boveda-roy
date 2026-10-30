export type ClipWord = { text: string; start: number; end: number };
export type ClipSegment = { from: number; to: number; text: string };
export type ClipData = {
  clip: string; // ruta dentro de public/, ej. "clips/mi-video.mov"
  sourceDuration: number;
  outputDuration: number;
  segments: ClipSegment[];
  words: ClipWord[];
};

export type ReelProps = {
  data: ClipData;
  hook?: string; // texto grande de los primeros segundos
  label?: string; // etiqueta chica arriba a la izquierda
  part?: number; // número de parte en una serie (ej. 3 → "03 / 08")
  total?: number;
};
