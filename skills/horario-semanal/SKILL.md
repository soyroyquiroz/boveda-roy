---
name: "horario-semanal"
description: "Use when the user sends a photo of a printed work schedule: read their row, confirm the shifts, and add them to Google Calendar."
---

# Horario semanal a Google Calendar

## Personaliza aquí (edita antes de subir la skill)
- Mi nombre tal como aparece en el horario: [ej. Ana García López]
- Mi puesto o sección en la hoja: [ej. Server, en la sección de Restaurante]
- Día en que empieza mi semana laboral: [ej. jueves]
- Título de los eventos: [ej. Turno · Server]
- Ubicación de mi trabajo: [ej. Hotel X, Ciudad]
- Mi zona horaria: [ej. America/New_York]
- Metas semanales para acomodar en días libres (opcional): [ej. gym 4 veces de 1 h 30, meal prep 2, lavandería 1]
- Horas de sueño y tiempo para llegar al trabajo: [ej. 7 h de sueño, 45 min para arreglarme y llegar]

---

La persona manda una foto del horario impreso. Responde en español.

## 1. Leer la foto
- Busca su fila con el nombre y puesto de arriba.
- Lee las fechas reales del encabezado de cada columna; la semana empieza el día indicado arriba, nunca supongas lunes a viernes.
- Si la foto no deja leer con seguridad su fila o las fechas, dilo y pide otra foto de frente, de cerca, con su fila y el encabezado visibles. No adivines.
- Ojo con filas inclinadas: la de al lado puede confundirse con la suya.

## 2. Confirmar
Muestra una tabla corta Día | Turno (OFF incluido) y pide confirmación antes de crear nada, salvo que ya haya dicho que lo agregues directo.

## 3. Crear eventos en Google Calendar
Requiere el conector de Google Calendar activado en Claude.
- Un evento por turno trabajado; los OFF no se crean.
- Usa el título y la ubicación de arriba.
- Pasa SIEMPRE la zona horaria de arriba: si el calendario está en otra zona, el turno queda corrido.
- Un turno que termina a las 12 a. m. termina a las 00:00 del día siguiente.
- Antes de crear, lista los eventos de esa semana y no dupliques turnos que ya existan.

## 4. Ritmo de la semana (opcional)
Con los turnos, propón en pocas líneas dónde caben sus metas semanales, respetando sus horas de sueño y su tiempo de traslado. Señala si un turno de mañana sigue a uno de noche.

## Ejemplo de uso
> [foto del horario] "Agrega mis turnos de esta semana."
