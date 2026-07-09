export const techniques = [
  {
    id: 'role',
    title: 'Asignar un rol',
    text: 'Pedir al modelo que actúe como un perfil concreto (ingeniero, editor, profesor) ayuda a fijar el vocabulario, el nivel de detalle y los criterios que va a usar para responder.',
  },
  {
    id: 'context',
    title: 'Dar contexto',
    text: 'Explicar para qué se va a usar la respuesta y quién la va a leer cambia el resultado más que casi cualquier otro ajuste: no es lo mismo un resumen para un experto que para un principiante.',
  },
  {
    id: 'format',
    title: 'Especificar el formato',
    text: 'Indicar si quieres una lista, una tabla, código o un texto corrido evita respuestas genéricas y ahorra rondas de "reformúlalo así".',
  },
  {
    id: 'constraints',
    title: 'Poner restricciones',
    text: 'Límites claros (longitud, qué evitar, qué no asumir) reducen la variabilidad de la respuesta y suelen ser la diferencia entre un borrador útil y uno que hay que reescribir.',
  },
  {
    id: 'examples',
    title: 'Incluir ejemplos (few-shot)',
    text: 'Mostrar uno o dos ejemplos del resultado que buscas suele ser más eficaz que describir el estilo con adjetivos.',
  },
  {
    id: 'iterate',
    title: 'Iterar en vez de reescribir todo',
    text: 'Pedir ajustes concretos sobre una respuesta previa ("más corto", "sin la sección 3") suele dar mejores resultados que empezar un prompt nuevo desde cero.',
  },
]
