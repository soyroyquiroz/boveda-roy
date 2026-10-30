// TU IDENTIDAD VISUAL: cambia aquí y se actualizan todos tus reels.
export const BRAND = {
  handle: "@tu_usuario",
  name: "TU NOMBRE",
  avatar: "", // opcional: pon una foto en public/brand/avatar.png y escribe "brand/avatar.png"
  font: "Anton",
  fontFile: "fonts/Anton.ttf",
  white: "#FFFFFF",
  accent: "#FFD400", // color de la palabra que se está diciendo
  keyword: "#FF3B30", // color de tus palabras clave
  stroke: "#000000",
  // Corrección de color. 1 = sin cambio.
  grade: {
    contrast: 1.12,
    saturate: 1.18,
    brightness: 1,
    warmth: 0.05, // 0 = neutro, más = más cálido
  },
  vignette: 0.35,
};

// Palabras que se pintan con el color "keyword" (en minúsculas, sin acentos).
// Pon las de tu tema: marcas, platillos, jugadores, lo que sea.
export const KEYWORDS = new Set(["ejemplo", "importante"]);
