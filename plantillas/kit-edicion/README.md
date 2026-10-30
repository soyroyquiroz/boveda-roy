# Kit de edición de reels

Grabas un video hablándole a la cámara y el kit te devuelve un reel vertical listo para subir:

- **Sin silencios ni muletillas:** quita los "eh", "este" y las pausas largas.
- **Subtítulos grandes**, palabra por palabra, con la palabra que dices resaltada.
- **Corrección de color** y viñeta para que se vea más pro.
- **Gancho** de texto en los primeros segundos y tu nombre abajo.

Funciona en Mac. Con Claude Code es mucho más fácil: le dices qué quieres y él corre todo.

## Instálalo (una sola vez, ~20 minutos)

1. Descarga la bóveda: https://github.com/soyroyquiroz/boveda-roy/archive/refs/heads/main.zip y descomprímela en Descargas.
1. Instala **Node** desde https://nodejs.org (versión LTS) y **Homebrew** desde https://brew.sh
2. Abre la app **Terminal** y pega, una por una:
   ```
   brew install ffmpeg python
   cd ~/Downloads/boveda-roy-main/plantillas/kit-edicion
   npm install
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Abre `src/reel/brand.ts` y pon tu nombre, tu @ y tus colores.

## Haz un reel

1. Copia tu video a `public/clips/` y ponle un nombre corto sin espacios, por ejemplo `mi-clip.mov`.
2. En Terminal (dentro de la carpeta del kit):
   ```
   source .venv/bin/activate
   python3 scripts/analyze.py mi-clip
   ```
   La primera vez descarga el modelo que entiende tu voz (~1.6 GB), así que tarda.
3. Revisa el texto que imprime. Si una palabra salió mal, corrígela en `public/data/mi-clip.json`.
4. Previsualiza con `npm run dev`. Se abre una página donde ves el reel y puedes cambiar el gancho.
5. Exporta con `npm run render`. Tu video queda en `out/reel.mp4`.

## Con Claude Code

Abre la carpeta del kit en Claude Code y escribe, por ejemplo:

> "Hazme un reel de public/clips/mi-clip.mov con el gancho 'Lo que nadie te dice de X'."

Claude lee `CLAUDE.md`, corre los pasos y te avisa cuando esté listo.

## Personaliza

| Quiero cambiar | Dónde |
| --- | --- |
| Nombre, @, colores, look del color | `src/reel/brand.ts` |
| Palabras que se pintan de otro color | `KEYWORDS` en `src/reel/brand.ts` |
| Muletillas que se borran | `FILLERS` en `scripts/analyze.py` |
| Palabras que siempre salen mal escritas | `FIX` en `scripts/analyze.py` |
| Idioma | `python3 scripts/analyze.py mi-clip en` |

Hecho con [Remotion](https://www.remotion.dev). Uso personal y equipos chicos gratis; empresas grandes necesitan licencia ([términos](https://www.remotion.dev/license)). Fuente Anton con licencia SIL OFL.
