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
- **Técnicas explicadas**: por qué cada campo del formulario cambia el resultado
  (asignar rol, dar contexto, especificar formato, poner restricciones, few-shot, iterar).

## Stack

React 19, Vite, lucide-react. Sin backend ni dependencias externas de datos: todo el
cálculo del radar y la generación del prompt ocurre en el cliente.
