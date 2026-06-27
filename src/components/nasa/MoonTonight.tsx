import styles from './nasa.module.css'

/*
 * Moon phase computed locally (no API): days since a known new moon, modulo the synodic month.
 * Accurate to well within a day — plenty for "what does the Moon look like tonight".
 */

const SYNODIC = 29.530588853
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14) // 2000-01-06 18:14 UTC

const GLYPHS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
const NAMES = [
  'New moon',
  'Waxing crescent',
  'First quarter',
  'Waxing gibbous',
  'Full moon',
  'Waning gibbous',
  'Last quarter',
  'Waning crescent',
]

function moonPhase(now = Date.now()) {
  const days = (now - KNOWN_NEW_MOON) / 86_400_000
  let p = (days % SYNODIC) / SYNODIC
  if (p < 0) p += 1
  const idx = Math.round(p * 8) % 8
  const illumination = Math.round(((1 - Math.cos(2 * Math.PI * p)) / 2) * 100)
  const daysToFull = Math.round(((0.5 - p + 1) % 1) * SYNODIC)
  return { idx, illumination, daysToFull }
}

export function MoonTonight() {
  const { idx, illumination, daysToFull } = moonPhase()
  const toFull =
    idx === 4 || daysToFull === 0 ? 'full moon tonight' : `${daysToFull} days to the full moon`

  return (
    <article className={styles.moon}>
      <div className={styles.moonGlyph} aria-hidden="true">
        {GLYPHS[idx]}
      </div>
      <div className={styles.moonBody}>
        <span className={styles.kicker}>The Moon tonight</span>
        <h3 className={styles.moonName}>{NAMES[idx]}</h3>
        <p className={styles.moonMeta}>
          {illumination}% illuminated · {toFull}
        </p>
      </div>
    </article>
  )
}
