import type { Apod } from '@/data/nasa'
import styles from './nasa.module.css'

export function ApodCard({ apod, onOpen }: { apod: Apod; onOpen: (a: Apod) => void }) {
  const isVideo = apod.mediaType !== 'image'

  return (
    <article className={styles.aCard}>
      <button
        type="button"
        className={styles.aMedia}
        onClick={() => onOpen(apod)}
        aria-label={`Open ${apod.title}`}
      >
        {apod.imageUrl ? (
          <img
            className={styles.thumb}
            src={apod.imageUrl}
            alt={apod.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.videoTile}>▶</span>
        )}
        {isVideo ? <span className={styles.aBadge}>video</span> : null}
        <span className={styles.tileDate}>{apod.date}</span>
      </button>

      <div className={styles.aBody}>
        <h3 className={styles.aTitle}>{apod.title}</h3>
        <p className={styles.aText}>{apod.explanation}</p>
        <div className={styles.aActions}>
          <button type="button" className={styles.aDetails} onClick={() => onOpen(apod)}>
            Read more
          </button>
          <a className={styles.more} href={apod.pageUrl} target="_blank" rel="noreferrer">
            NASA ↗
          </a>
        </div>
      </div>
    </article>
  )
}
