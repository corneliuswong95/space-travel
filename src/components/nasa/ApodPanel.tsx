import { useNasaApod } from '@/hooks/useNasa'
import { FeedError } from './FeedStates'
import styles from './nasa.module.css'

export function ApodPanel() {
  const { status, data, reload } = useNasaApod()

  return (
    <section className={styles.panel} aria-labelledby="apod-h">
      <header className={styles.head}>
        <span className={styles.kicker} id="apod-h">
          Astronomy picture of the day
        </span>
        {data ? <span className={styles.meta}>{data.date}</span> : null}
      </header>

      {status === 'loading' ? <div className={styles.media} data-skeleton /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}

      {status === 'success' && data ? (
        <>
          <a className={styles.mediaLink} href={data.pageUrl} target="_blank" rel="noreferrer">
            {data.imageUrl ? (
              <img className={styles.media} src={data.imageUrl} alt={data.title} loading="lazy" />
            ) : (
              <div className={`${styles.media} ${styles.mediaVideo}`}>▶ Watch on NASA</div>
            )}
          </a>
          <h3 className={styles.title}>{data.title}</h3>
          <p className={styles.explain}>{data.explanation}</p>
          <div className={styles.footrow}>
            <span className={styles.credit}>
              {data.copyright ? `© ${data.copyright.trim()}` : 'Public domain · NASA'}
            </span>
            <a className={styles.more} href={data.pageUrl} target="_blank" rel="noreferrer">
              View on NASA →
            </a>
          </div>
        </>
      ) : null}
    </section>
  )
}
