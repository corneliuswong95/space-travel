import { useState } from 'react'

import { useEpic } from '@/hooks/useNasa'
import type { EpicImage } from '@/data/nasa'
import { FeedError, FeedLoading } from './FeedStates'
import { Lightbox } from './Lightbox'
import styles from './nasa.module.css'

// "2024-01-15 00:27:45" -> "00:27"
function utcTime(date: string): string {
  return date.split(' ')[1]?.slice(0, 5) ?? ''
}

export function EpicEarth() {
  const { status, data, reload } = useEpic()
  const [selected, setSelected] = useState<EpicImage | null>(null)
  const frames = (data ?? []).slice(0, 12)

  return (
    <section aria-labelledby="epic-h">
      <div className={styles.head}>
        <span className={styles.kicker} id="epic-h">
          Earth today · DSCOVR EPIC
        </span>
        {status === 'success' && data ? (
          <span className={styles.meta}>{frames.length} frames</span>
        ) : null}
      </div>

      {status === 'loading' ? <FeedLoading rows={4} /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}
      {status === 'success' ? (
        frames.length === 0 ? (
          <p className={styles.stateText}>No Earth frames available right now.</p>
        ) : (
          <ul className={styles.grid}>
            {frames.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  className={styles.tile}
                  onClick={() => setSelected(f)}
                  aria-label={`Earth at ${utcTime(f.date)} UTC`}
                >
                  <img
                    className={styles.thumb}
                    src={f.thumbUrl}
                    alt="Earth, full disk"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.tileDate}>{utcTime(f.date)}</span>
                </button>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {selected ? (
        <Lightbox onClose={() => setSelected(null)} label="Earth from DSCOVR EPIC">
          <div className={styles.lbMedia}>
            <img
              className={styles.lbImg}
              src={selected.imageUrl}
              alt="Earth, full disk from DSCOVR EPIC"
            />
          </div>
          <div className={styles.lbInfo}>
            <span className={styles.kicker}>{selected.date} UTC</span>
            <h2 className={styles.lbTitle}>Earth from a million miles</h2>
            <p className={styles.lbText}>
              {selected.caption ||
                'A full-disk, natural-colour image of the sunlit Earth from NASA’s EPIC camera aboard the NOAA DSCOVR spacecraft, parked at the Sun–Earth L1 point about 1.5 million km away.'}
            </p>
            <div className={styles.aActions}>
              <span className={styles.credit}>NASA / NOAA · DSCOVR EPIC</span>
              <a className={styles.more} href={selected.imageUrl} target="_blank" rel="noreferrer">
                Full image ↗
              </a>
            </div>
          </div>
        </Lightbox>
      ) : null}
    </section>
  )
}
