import { useSpaceWeather } from '@/hooks/useNasa'
import { FeedError, FeedLoading } from './FeedStates'
import styles from './nasa.module.css'

function shortDate(t: string): string {
  return t ? new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''
}

export function SpaceWeather() {
  const { status, data, reload } = useSpaceWeather()

  return (
    <section aria-labelledby="sw-h">
      <div className={styles.head}>
        <span className={styles.kicker} id="sw-h">
          Space weather · last 30 days
        </span>
      </div>

      {status === 'loading' ? <FeedLoading rows={4} /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}
      {status === 'success' && data ? (
        <div className={styles.swGrid}>
          <div className={styles.panel}>
            <span className={styles.kicker}>Solar flares</span>
            {data.flares.length === 0 ? (
              <p className={styles.stateText}>None recorded.</p>
            ) : (
              <ul className={styles.neoList}>
                {data.flares.map((f) => (
                  <li key={f.id} className={styles.neoRow}>
                    <span className={styles.neoName}>
                      {f.classType}
                      {f.location ? ` · ${f.location}` : ''}
                    </span>
                    <span className={styles.neoStats}>{shortDate(f.peakTime)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.panel}>
            <span className={styles.kicker}>Geomagnetic storms</span>
            {data.storms.length === 0 ? (
              <p className={styles.stateText}>None recorded — quiet.</p>
            ) : (
              <ul className={styles.neoList}>
                {data.storms.map((s) => (
                  <li key={s.id} className={styles.neoRow}>
                    <span className={styles.neoName}>Kp {s.maxKp}</span>
                    <span className={styles.neoStats}>{shortDate(s.startTime)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}

      <p className={styles.note}>
        Flare classes: C (minor) · M (medium) · X (strong). A Kp index of 5+ can push auroras to
        lower latitudes.
      </p>
    </section>
  )
}
