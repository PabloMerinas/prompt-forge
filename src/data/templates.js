export const templates = [
  {
    id: 'code-review',
    name: 'Revisión de código',
    tags: ['Desarrollo', 'Calidad'],
    fields: {
      role: 'Actúa como un ingeniero de software senior especializado en revisión de código.',
      task: 'Revisa el siguiente fragmento de código y detecta errores, problemas de rendimiento y mejoras de legibilidad.',
      context: 'El código forma parte de un proyecto en producción, así que prioriza cambios seguros y de bajo riesgo.',
      format: 'Lista los hallazgos por severidad (crítico, importante, menor) con una breve explicación de cada uno.',
      constraints: 'No reescribas el código completo, solo señala los cambios necesarios.',
      examples: '',
    },
  },
  {
    id: 'blog-post',
    name: 'Artículo de blog',
    tags: ['Redacción', 'Marketing'],
    fields: {
      role: 'Actúa como redactor de contenido especializado en tono cercano y claro.',
      task: 'Escribe un artículo de blog sobre el tema que te indique, pensado para un público sin conocimientos técnicos.',
      context: 'El artículo se publicará en un blog personal, con un tono informal pero riguroso.',
      format: 'Estructura el texto con un título, una introducción breve, 3-4 secciones con subtítulos y un cierre.',
      constraints: 'Evita jerga técnica sin explicarla y mantén los párrafos cortos.',
      examples: '',
    },
  },
  {
    id: 'data-analysis',
    name: 'Análisis de datos',
    tags: ['Datos', 'Negocio'],
    fields: {
      role: 'Actúa como analista de datos con experiencia comunicando hallazgos a perfiles no técnicos.',
      task: 'Analiza el conjunto de datos que te proporcione y extrae las tendencias más relevantes.',
      context: 'El resultado se usará en una reunión con dirección, así que prioriza claridad sobre exhaustividad.',
      format: 'Resume los hallazgos en 3-5 puntos clave, cada uno con el dato que lo respalda.',
      constraints: 'No asumas causalidad donde solo hay correlación; señálalo explícitamente si aplica.',
      examples: '',
    },
  },
  {
    id: 'email',
    name: 'Correo profesional',
    tags: ['Comunicación', 'Trabajo'],
    fields: {
      role: 'Actúa como asistente de comunicación profesional.',
      task: 'Redacta un correo con el asunto y los puntos que te indique.',
      context: 'El destinatario es un cliente o colega con quien mantengo una relación profesional cordial.',
      format: 'Estructura el correo con saludo, cuerpo breve y cierre, sin exceder 150 palabras.',
      constraints: 'Tono formal pero no rígido; evita frases hechas vacías.',
      examples: '',
    },
  },
  {
    id: 'summary',
    name: 'Resumen de texto',
    tags: ['Síntesis', 'Estudio'],
    fields: {
      role: 'Actúa como editor especializado en síntesis de información.',
      task: 'Resume el texto que te proporcione conservando las ideas principales y el orden lógico.',
      context: 'El resumen se usará como material de estudio rápido antes de un examen o reunión.',
      format: 'Usa una lista de puntos clave, máximo 8, ordenados por importancia.',
      constraints: 'No añadas información que no esté en el texto original.',
      examples: '',
    },
  },
]

export const taskCategories = [
  'Redacción',
  'Programación',
  'Análisis de datos',
  'Creatividad',
  'Comunicación',
  'Estudio',
  'Otro',
]

export const tones = ['Formal', 'Cercano', 'Técnico', 'Divertido', 'Directo']

export const outputFormats = [
  'Lista de puntos',
  'Párrafos',
  'Tabla',
  'Paso a paso',
  'Código',
  'Pregunta y respuesta',
]
