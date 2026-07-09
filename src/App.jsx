import { Sparkles, Hammer, BookOpen } from 'lucide-react'
import PromptBuilder from './components/PromptBuilder'
import TechniqueCards from './components/TechniqueCards'
import './App.css'

function App() {
  return (
    <main>
      <header className="page-header">
        <div className="brand">
          <Hammer size={22} />
          <span>Fragua de Prompts</span>
        </div>
        <p className="tagline">
          Construye prompts mejores, viendo en tiempo real qué te falta.
        </p>
      </header>

      <section className="intro">
        <Sparkles size={28} />
        <h1>Un prompt claro no es cuestión de suerte.</h1>
        <p>
          Rellena los campos de abajo (o carga una plantilla) y mira cómo se genera el prompt
          y cómo cambia el radar de completitud a la derecha, campo a campo. Cuando esté listo,
          pruébalo de verdad en Claude, ChatGPT o Gemini, o comparte el enlace para que otra
          persona lo edite desde donde lo dejaste.
        </p>
      </section>

      <section className="builder-section">
        <PromptBuilder />
      </section>

      <section className="techniques-section">
        <div className="section-heading">
          <BookOpen size={24} />
          <h2>Por qué funciona cada campo</h2>
        </div>
        <TechniqueCards />
      </section>

      <footer className="page-footer">
        <p>Hecho para dejar de escribir prompts a ciegas.</p>
      </footer>
    </main>
  )
}

export default App
