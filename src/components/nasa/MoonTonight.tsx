import { moonPhase } from '@/data/moon'
import styles from './nasa.module.css'

export function MoonTonight() {
  const { idx, illumination, daysToFull, name, glyph } = moonPhase()
  const toFull =
    idx === 4 || daysToFull === 0 ? 'full moon tonight' : `${daysToFull} days to the full moon`

  return (
    <article className={styles.moon}>
      <div className={styles.moonGlyph} aria-hidden="true">
        {glyph}
      </div>
      <div className={styles.moonBody}>
        <span className={styles.kicker}>The Moon tonight</span>
        <h3 className={styles.moonName}>{name}</h3>
        <p className={styles.moonMeta}>
          {illumination}% illuminated · {toFull}
        </p>
      </div>
    </article>
  )
}
