# Fragua de Prompts

Constructor interactivo de prompts (React + Vite). Rellenas los campos y ves en tiempo real
el prompt generado y un radar de completitud que te dice qué le falta.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en dist/
```

## Qué incluye

- **Constructor de prompts** con 6 campos (rol, tarea, contexto, formato, restricciones,
  ejemplos) que genera el prompt final al vuelo, con botón de copiar.
- **Radar de completitud** en SVG puro, sin librerías de gráficos: cada eje se recalcula
  según lo que has rellenado.
- **6 plantillas de partida** (revisión de código, artículo de blog, análisis de datos,
  correo profesional, resumen de texto) para no empezar de cero.
- **Pruébalo de verdad**: copia el prompt y abre una conversación nueva en Claude, ChatGPT
  o Gemini para pegarlo y ver la respuesta real.
- **Enlace para compartir**: el estado del formulario se codifica en la URL, así que puedes
  mandarle a alguien el prompt exacto que has construido.
- **Guardado automático** en `localStorage`: si recargas la página, no pierdes lo que
  llevabas escrito.
- **Estimación de tokens** aproximada junto al prompt generado.
- **Técnicas explicadas**: por qué cada campo del formulario cambia el resultado
  (asignar rol, dar contexto, especificar formato, poner restricciones, few-shot, iterar).

## Stack

React 19, Vite, lucide-react. Sin backend: todo el cálculo del radar, el guardado y la
generación del prompt ocurre en el cliente. Nunca se piden ni se guardan claves de API;
"pruébalo de verdad" simplemente copia el texto y abre la web oficial de cada proveedor.
