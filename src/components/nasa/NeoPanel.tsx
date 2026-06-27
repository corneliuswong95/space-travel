import { useNeoFeed } from '@/hooks/useNasa'
import { FeedError, FeedLoading } from './FeedStates'
import styles from './nasa.module.css'

const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const nf1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

export function NeoPanel() {
  const { status, data, reload } = useNeoFeed()

  return (
    <section className={styles.panel} aria-labelledby="neo-h">
      <header className={styles.head}>
        <span className={styles.kicker} id="neo-h">
          Near-Earth objects · today
        </span>
        {data ? <span className={styles.meta}>{data.count} tracked</span> : null}
      </header>

      {status === 'loading' ? <FeedLoading rows={4} /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}

      {status === 'success' && data ? (
        data.objects.length === 0 ? (
          <p className={styles.stateText}>No catalogued close approaches today. Quiet skies.</p>
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

      <p className={styles.note}>LD = lunar distances (1 LD ≈ 384,000 km). Closest five today.</p>
    </section>
  )
}
