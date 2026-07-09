import { useEffect, useMemo, useRef, useState } from 'react'
import { Copy, Check, Wand2, Link2, ExternalLink } from 'lucide-react'
import RadarChart from './RadarChart'
import { templates } from '../data/templates'

const STORAGE_KEY = 'prompt-forge:fields'
const SHARE_PARAM = 'p'

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

const testProviders = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/new' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/app' },
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

function estimateTokens(text) {
  if (!text) return 0
  return Math.max(1, Math.ceil(text.length / 4))
}

function encodeFields(fields) {
  return btoa(encodeURIComponent(JSON.stringify(fields)))
}

function decodeFields(encoded) {
  try {
    const parsed = JSON.parse(decodeURIComponent(atob(encoded)))
    return { ...emptyFields, ...parsed }
  } catch {
    return null
  }
}

function loadInitialFields() {
  if (typeof window === 'undefined') return emptyFields

  const params = new URLSearchParams(window.location.search)
  const shared = params.get(SHARE_PARAM)
  if (shared) {
    const decoded = decodeFields(shared)
    if (decoded) return decoded
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...emptyFields, ...JSON.parse(saved) }
  } catch {
    // localStorage no disponible, se ignora
  }

  return emptyFields
}

function PromptBuilder() {
  const [fields, setFields] = useState(loadInitialFields)
  const [activeTemplateId, setActiveTemplateId] = useState(null)
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [testNotice, setTestNotice] = useState('')
  const taskRef = useRef(null)

  const activeTemplate = templates.find((t) => t.id === activeTemplateId) ?? null

  const prompt = useMemo(() => buildPrompt(fields), [fields])
  const axes = useMemo(
    () => fieldConfig.map((f) => ({ label: f.axis, value: scoreField(fields[f.key]) })),
    [fields],
  )
  const overallScore = useMemo(
    () => Math.round(axes.reduce((sum, a) => sum + a.value, 0) / axes.length),
    [axes],
  )
  const tokenEstimate = useMemo(() => estimateTokens(prompt), [prompt])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fields))
    } catch {
      // localStorage no disponible, se ignora
    }
  }, [fields])

  const updateField = (key, value) => setFields((prev) => ({ ...prev, [key]: value }))

  const loadTemplate = (id) => {
    const template = templates.find((t) => t.id === id)
    if (!template) return
    setFields(template.fields)
    setActiveTemplateId(id)
    requestAnimationFrame(() => taskRef.current?.focus())
  }

  const clearFields = () => {
    setFields(emptyFields)
    setActiveTemplateId(null)
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

  const copyShareLink = async () => {
    try {
      const url = new URL(window.location.href)
      url.search = ''
      url.searchParams.set(SHARE_PARAM, encodeFields(fields))
      await navigator.clipboard.writeText(url.toString())
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 1800)
    } catch {
      // portapapeles no disponible, se ignora silenciosamente
    }
  }

  const testInProvider = async (provider) => {
    if (!prompt) return
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // portapapeles no disponible, se abre igualmente
    }
    window.open(provider.url, '_blank', 'noopener')
    setTestNotice(`Prompt copiado. Pégalo en la conversación nueva de ${provider.name}.`)
    setTimeout(() => setTestNotice(''), 4000)
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
            <button type="button" className="chip chip-clear" onClick={clearFields}>
              Limpiar
            </button>
          </div>
          {activeTemplate && (
            <p className="template-hint">
              Rol, formato y restricciones ya están rellenos. Solo falta la <strong>Tarea</strong>:
              cuenta abajo lo que necesitas esta vez.
            </p>
          )}
        </div>

        {fieldConfig.map((f) => (
          <label key={f.key} className="field">
            <span>{f.label}</span>
            <textarea
              ref={f.key === 'task' ? taskRef : undefined}
              value={fields[f.key]}
              placeholder={f.key === 'task' && activeTemplate ? activeTemplate.taskPlaceholder : f.placeholder}
              onChange={(e) => updateField(f.key, e.target.value)}
              rows={f.key === 'task' || f.key === 'context' ? 2 : 1}
              className={f.key === 'task' && activeTemplate ? 'field-highlight' : undefined}
            />
          </label>
        ))}

        <p className="autosave-note">Se guarda automáticamente en este navegador.</p>
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
            {prompt && <span className="token-estimate">~{tokenEstimate} tokens</span>}
            <button type="button" onClick={copyShareLink} className="copy-btn ghost" disabled={!prompt}>
              {linkCopied ? <Check size={15} /> : <Link2 size={15} />}
              {linkCopied ? 'Enlace copiado' : 'Compartir'}
            </button>
            <button type="button" onClick={copyPrompt} className="copy-btn" disabled={!prompt}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre>{prompt || 'Rellena los campos de la izquierda para generar tu prompt...'}</pre>

          <div className="test-row">
            <span>Probarlo de verdad:</span>
            <div className="test-buttons">
              {testProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  className="chip"
                  disabled={!prompt}
                  onClick={() => testInProvider(provider)}
                >
                  {provider.name}
                  <ExternalLink size={13} />
                </button>
              ))}
            </div>
            {testNotice && <p className="test-notice">{testNotice}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptBuilder
