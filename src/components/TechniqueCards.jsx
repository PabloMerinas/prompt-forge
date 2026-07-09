import { Lightbulb } from 'lucide-react'
import { techniques } from '../data/techniques'

function TechniqueCards() {
  return (
    <div className="technique-grid">
      {techniques.map((t) => (
        <article key={t.id} className="technique-card">
          <Lightbulb size={20} />
          <h3>{t.title}</h3>
          <p>{t.text}</p>
        </article>
      ))}
    </div>
  )
}

export default TechniqueCards
