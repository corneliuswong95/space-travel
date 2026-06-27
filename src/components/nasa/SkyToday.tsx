import { Link } from 'react-router-dom'

import { ApodPanel } from './ApodPanel'
import { NeoPanel } from './NeoPanel'
import { MoonTonight } from './MoonTonight'
import styles from './nasa.module.css'

export function SkyToday() {
  return (
    <section className={`container ${styles.sky}`} aria-labelledby="sky-h">
      <div className={styles.skyHead}>
        <div className={styles.skyHeadText}>
          <h2 id="sky-h" className={styles.skyTitle}>
            Live from the sky
          </h2>
          <span className={styles.skySub}>
            Real data from NASA, refreshed daily. The lessons above don’t depend on it.
          </span>
        </div>
        <Link to="/sky" className={styles.seeMore}>
          See the past month →
        </Link>
      </div>
      <MoonTonight />
      <div className={styles.skyGrid}>
        <ApodPanel />
        <NeoPanel />
      </div>
    </section>
  )
}
