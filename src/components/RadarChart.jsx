const SIZE = 260
const CENTER = SIZE / 2
const MAX_RADIUS = 95

function pointOnAxis(index, total, value) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  const radius = (value / 100) * MAX_RADIUS
  return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)]
}

function labelPoint(index, total) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  const radius = MAX_RADIUS + 26
  return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)]
}

function RadarChart({ axes }) {
  const total = axes.length
  const rings = [25, 50, 75, 100]

  const polygonPoints = axes
    .map((axis, i) => pointOnAxis(i, total, axis.value).join(','))
    .join(' ')

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="radar-chart" role="img" aria-label="Radar de calidad del prompt">
      {rings.map((ring) => (
        <polygon
          key={ring}
          className="radar-ring"
          points={axes.map((_, i) => pointOnAxis(i, total, ring).join(',')).join(' ')}
        />
      ))}

      {axes.map((_, i) => {
        const [x, y] = pointOnAxis(i, total, 100)
        return <line key={i} className="radar-spoke" x1={CENTER} y1={CENTER} x2={x} y2={y} />
      })}

      <polygon className="radar-shape" points={polygonPoints} />

      {axes.map((axis, i) => {
        const [x, y] = pointOnAxis(i, total, axis.value)
        return <circle key={axis.label} className="radar-dot" cx={x} cy={y} r={4} />
      })}

      {axes.map((axis, i) => {
        const [x, y] = labelPoint(i, total)
        return (
          <text key={axis.label} className="radar-label" x={x} y={y} textAnchor="middle" dominantBaseline="middle">
            {axis.label}
          </text>
        )
      })}
    </svg>
  )
}

export default RadarChart
