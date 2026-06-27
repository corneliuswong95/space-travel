import { useNeoWeek } from '@/hooks/useNasa'
import { FeedError, FeedLoading } from './FeedStates'
import styles from './nasa.module.css'

const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const nf1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

export function NeoWeek() {
  const { status, data, reload } = useNeoWeek()

  return (
    <section aria-labelledby="neoweek-h" className={styles.panel}>
      <div className={styles.head}>
        <span className={styles.kicker} id="neoweek-h">
          Near-Earth objects · next 7 days
        </span>
        {data ? (
          <span className={styles.meta}>
            {data.total} tracked · {data.hazardous} flagged
          </span>
        ) : null}
      </div>

      {status === 'loading' ? <FeedLoading rows={5} /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}
      {status === 'success' && data ? (
        data.objects.length === 0 ? (
          <p className={styles.stateText}>No catalogued close approaches this week.</p>
        ) : (
          <ol className={styles.neoList}>
            {data.objects.map((o) => (
              <li key={o.id} className={styles.neoRow}>
                <div className={styles.neoMain}>
                  <span className={styles.neoName}>{o.name}</span>
                  {o.hazardous ? <span className={styles.tag}>watch</span> : null}
                </div>
                <div className={styles.neoStats}>
                  <span>
                    <span className={styles.statBig}>{nf1.format(o.missLunar)}</span> LD
                  </span>
                  <span>{nf0.format(o.diameterM)} m</span>
                  <span>{nf0.format(o.velocityKph)} km/h</span>
                </div>
              </li>
            ))}
          </ol>
        )
      ) : null}

      <p className={styles.note}>LD = lunar distances (1 LD ≈ 384,000 km). Closest eight this week.</p>
    </section>
  )
}
