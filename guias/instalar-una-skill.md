# Cómo instalar una skill en Claude

Una skill es una receta guardada: le enseñas a Claude una tarea una vez y la hace igual cada vez que la pides.

## Paso 1 · Descarga la carpeta
1. En este repo, entra a `skills/` y abre la skill que quieres (por ejemplo `volverme-experto`).
2. Descarga el repo completo: botón verde **Code** → **Download ZIP**, y descomprímelo.

## Paso 2 · Personalízala
1. Abre el archivo `SKILL.md` de esa skill con cualquier editor de texto (Notas o TextEdit sirven).
2. Llena el bloque **"Personaliza aquí"** con tus datos. Cambia solo lo que está entre corchetes `[ ]`.
3. Guarda el archivo.

## Paso 3 · Súbela a Claude
1. Comprime **solo la carpeta de la skill** (por ejemplo `volverme-experto`) en un .zip.
2. En Claude, entra a Ajustes y busca la sección de Skills (puede estar dentro de "Capacidades").
3. Sube el .zip y actívala.

## Paso 4 · Úsala
Escríbele a Claude algo como el "Ejemplo de uso" que viene al final de cada `SKILL.md`. Claude detecta solo cuándo usar la skill.

## Si algo falla
- ¿No encuentras la sección de Skills? Pregúntale a Claude: "¿dónde subo una skill en mi cuenta?". La ubicación cambia según el plan y la versión.
- ¿`horario-semanal` no crea eventos? Activa el conector de Google Calendar en Claude.
