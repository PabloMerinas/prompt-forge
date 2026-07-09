import { useMemo, useState } from 'react'
import { Copy, Check, Wand2 } from 'lucide-react'
import RadarChart from './RadarChart'
import { templates } from '../data/templates'

const emptyFields = {
  role: '',
  task: '',
  context: '',
  format: '',
  constraints: '',
  examples: '',
}

const fieldConfig = [
  { key: 'role', label: 'Rol', placeholder: 'Actúa como...', axis: 'Rol' },
  { key: 'task', label: 'Tarea', placeholder: '¿Qué necesitas que haga?', axis: 'Tarea' },
  { key: 'context', label: 'Contexto', placeholder: 'Para qué se va a usar, quién lo va a leer...', axis: 'Contexto' },
  { key: 'format', label: 'Formato de salida', placeholder: 'Lista, tabla, párrafos, código...', axis: 'Formato' },
  { key: 'constraints', label: 'Restricciones', placeholder: 'Longitud, qué evitar, qué no asumir...', axis: 'Límites' },
  { key: 'examples', label: 'Ejemplos (opcional)', placeholder: 'Un ejemplo del resultado que buscas...', axis: 'Ejemplos' },
]

function buildPrompt(fields) {
  const parts = []
  if (fields.role.trim()) parts.push(fields.role.trim())
  if (fields.task.trim()) parts.push(fields.task.trim())
  if (fields.context.trim()) parts.push(`Contexto: ${fields.context.trim()}`)
  if (fields.format.trim()) parts.push(`Formato de salida: ${fields.format.trim()}`)
  if (fields.constraints.trim()) parts.push(`Restricciones: ${fields.constraints.trim()}`)
  if (fields.examples.trim()) parts.push(`Ejemplo de referencia: ${fields.examples.trim()}`)
  return parts.join('\n\n')
}

function scoreField(value) {
  const trimmed = value.trim()
  if (!trimmed) return 0
  if (trimmed.length < 12) return 45
  if (trimmed.length < 40) return 75
  return 100
}

function PromptBuilder() {
  const [fields, setFields] = useState(emptyFields)
  const [copied, setCopied] = useState(false)

  const prompt = useMemo(() => buildPrompt(fields), [fields])
  const axes = useMemo(
    () => fieldConfig.map((f) => ({ label: f.axis, value: scoreField(fields[f.key]) })),
    [fields],
  )
  const overallScore = useMemo(
    () => Math.round(axes.reduce((sum, a) => sum + a.value, 0) / axes.length),
    [axes],
  )

  const updateField = (key, value) => setFields((prev) => ({ ...prev, [key]: value }))

  const loadTemplate = (id) => {
    const template = templates.find((t) => t.id === id)
    if (template) setFields(template.fields)
  }

  const copyPrompt = async () => {
    if (!prompt) return
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // portapapeles no disponible, se ignora silenciosamente
    }
  }

  return (
    <div className="builder">
      <div className="builder-form">
        <div className="template-row">
          <span>Cargar plantilla</span>
          <div className="template-chips">
            {templates.map((t) => (
              <button key={t.id} type="button" className="chip" onClick={() => loadTemplate(t.id)}>
                {t.name}
              </button>
            ))}
            <button type="button" className="chip chip-clear" onClick={() => setFields(emptyFields)}>
              Limpiar
            </button>
          </div>
        </div>

        {fieldConfig.map((f) => (
          <label key={f.key} className="field">
            <span>{f.label}</span>
            <textarea
              value={fields[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => updateField(f.key, e.target.value)}
              rows={f.key === 'task' || f.key === 'context' ? 2 : 1}
            />
          </label>
        ))}
      </div>

      <div className="builder-preview">
        <div className="radar-panel">
          <RadarChart axes={axes} />
          <div className="score">
            <strong>{overallScore}</strong>
            <span>/ 100 completitud</span>
          </div>
        </div>

        <div className="prompt-output">
          <div className="prompt-output-header">
            <Wand2 size={16} />
            <span>Prompt generado</span>
            <button type="button" onClick={copyPrompt} className="copy-btn" disabled={!prompt}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre>{prompt || 'Rellena los campos de la izquierda para generar tu prompt...'}</pre>
        </div>
      </div>
    </div>
  )
}

export default PromptBuilder
