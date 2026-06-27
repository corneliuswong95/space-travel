import { planets, sun } from '@/data/planets'
import styles from './OrbitDiagram.module.css'

const SIZE = 400
const C = SIZE / 2

// Compress orbit radii (sqrt) so Mercury and Neptune both fit pleasingly.
const sqrtAu = planets.map((p) => Math.sqrt(p.distanceAu))
const minA = Math.min(...sqrtAu)
const maxA = Math.max(...sqrtAu)
const R_MIN = 46
const R_MAX = 186

function orbitRadius(au: number) {
  const t = (Math.sqrt(au) - minA) / (maxA - minA)
  return R_MIN + t * (R_MAX - R_MIN)
}

// Dot size from diameter (compressed to a small visible range).
const dia = planets.map((p) => p.diameterKm)
const minD = Math.min(...dia)
const maxD = Math.max(...dia)
function dotRadius(d: number) {
  const t = (d - minD) / (maxD - minD)
  return 2.4 + t * 3.8
}

// Seconds per revolution, compressed but keeping inner planets faster (Kepler-ish).
function revSeconds(periodDays: number) {
  return 9 + Math.sqrt(periodDays) * 1.5
}

// Fixed starting angles so the planets are scattered, not lined up.
const startDeg = [20, 135, 255, 70, 310, 115, 205, 340]

/**
 * A stylised orrery: real orbital data drawn as an instrument diagram. CSS rotates each orbit
 * at its own (compressed) speed; reduced-motion freezes them at their scattered start angles.
 */
export function OrbitDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`${styles.svg} ${className}`.trim()}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="A stylised orrery showing the eight planets on their orbits around the Sun."
    >
      {planets.map((p) => (
        <circle key={`ring-${p.id}`} cx={C} cy={C} r={orbitRadius(p.distanceAu)} className={styles.ring} />
      ))}

      <circle cx={C} cy={C} r={17} className={styles.sunGlow} />
      <circle cx={C} cy={C} r={7} fill={sun.color} />

      {planets.map((p, i) => {
        const r = orbitRadius(p.distanceAu)
        const theta = (startDeg[i] * Math.PI) / 180
        const x = C + r * Math.cos(theta)
        const y = C + r * Math.sin(theta)
        return (
          <g
            key={p.id}
            className={styles.orbit}
            style={{
              transformOrigin: `${C}px ${C}px`,
              transformBox: 'view-box',
              animationDuration: `${revSeconds(p.orbitalPeriodDays)}s`,
            }}
          >
            <circle cx={x} cy={y} r={dotRadius(p.diameterKm)} fill={p.color} />
          </g>
        )
      })}
    </svg>
  )
}
