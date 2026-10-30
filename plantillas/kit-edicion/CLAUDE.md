# Kit de edición de reels — instrucciones para Claude

Proyecto Remotion que convierte un video hablado a cámara en un reel vertical 1080×1920: corta silencios y muletillas, pone subtítulos palabra por palabra, color y gancho.

## Flujo para hacer un reel
1. El clip va en `public/clips/<nombre>.<ext>` (nombre corto, sin espacios).
2. `source .venv/bin/activate && python3 scripts/analyze.py <nombre> [idioma]` → crea `public/data/<nombre>.json`.
3. Revisa el texto impreso: corrige palabras mal transcritas en el JSON (o agrega una regla a `FIX`). Si un tramo es ruido o una idea cortada, quítalo de `segments` y sus palabras de `words` (recalcula los tiempos de `words` si quitas un tramo de en medio).
4. Pon `dataFile: "data/<nombre>.json"` y el `hook` en `src/Root.tsx`, o pásalos con `--props`.
5. Revisa un frame: `npx remotion still Reel out/check.png --frame=60`.
6. Exporta: `npx remotion render Reel out/<nombre>.mp4`.

## Reglas
- Nunca cortes una idea a la mitad: cada tramo debe cerrar una frase completa.
- Antes de exportar, mira al menos un frame para comprobar que los subtítulos no tapan la cara.
- La identidad visual vive en `src/reel/brand.ts`; no pongas colores sueltos en los componentes.
- No subas clips, audios ni `public/data/*.json` a GitHub (ya están en `.gitignore`).
