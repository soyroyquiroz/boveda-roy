# Cómo instalar una skill en Claude

Una skill es una receta guardada: le enseñas a Claude una tarea una vez y la hace igual cada vez que la pides.

## Si tienes Claude Pro (o un plan de pago)
1. Descarga el .zip de la skill desde la carpeta `descargas/` (abre el archivo y pulsa el botón de descarga). No lo descomprimas.
2. En Claude ve a **Ajustes → Capacidades** y activa **ejecución de código y creación de archivos**.
3. Baja a la sección **Skills**, pulsa **Upload skill** y sube el .zip.
4. Déjala activada. Escríbele a Claude el "ejemplo de uso" de esa skill.
5. La primera vez, la skill te pregunta tus datos (por ejemplo, tu nombre en el horario). Contéstalos una vez y listo.

## Si tienes Claude gratis
Las skills subidas solo funcionan en planes de pago, pero puedes usar la receta igual:
1. Abre el archivo `SKILL.md` de la skill en `skills/` y copia todo el texto.
2. En un chat nuevo de Claude pega el texto y escribe abajo: "Sigue estas instrucciones." Luego tu pedido.
3. Repite esto cada vez que abras un chat nuevo.

## Si algo falla
- ¿No ves la sección Skills? Primero activa la ejecución de código; sin eso no aparece.
- ¿`horario-semanal` no crea eventos? Activa el conector de Google Calendar en Claude.

Fuente: [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
