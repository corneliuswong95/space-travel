import { useState } from 'react'

import type { Apod } from '@/data/nasa'
import { Lightbox } from './Lightbox'
import { PhotoZoom } from './PhotoZoom'
import styles from './nasa.module.css'

export function ApodLightbox({ apod, onClose }: { apod: Apod | null; onClose: () => void }) {
  const [zoom, setZoom] = useState(false)
  if (!apod) return null
  const isVideo = apod.mediaType !== 'image'
  const zoomSrc = apod.hdUrl || apod.imageUrl

  return (
    <>
      <Lightbox onClose={onClose} label={apod.title}>
        <div className={styles.lbMedia}>
          {isVideo ? (
            <iframe
              className={styles.lbFrame}
              src={apod.sourceUrl}
              title={apod.title}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.lbZoomBtn}
              onClick={() => setZoom(true)}
              aria-label={`Zoom into ${apod.title}`}
            >
              <img className={styles.lbImg} src={zoomSrc} alt={apod.title} />
              <span className={styles.lbZoomBadge} aria-hidden="true">
                ⤢
              </span>
            </button>
          )}
        </div>

        <div className={styles.lbInfo}>
          <span className={styles.kicker}>{apod.date}</span>
          <h2 className={styles.lbTitle}>{apod.title}</h2>
          <p className={styles.lbText}>{apod.explanation}</p>
          <div className={styles.aActions}>
            <span className={styles.credit}>
              {apod.copyright ? `© ${apod.copyright.trim()}` : 'Public domain · NASA'}
            </span>
            <a className={styles.more} href={apod.pageUrl} target="_blank" rel="noreferrer">
              View on NASA ↗
            </a>
          </div>
        </div>
      </Lightbox>

      {zoom && !isVideo ? (
        <PhotoZoom src={zoomSrc} alt={apod.title} onClose={() => setZoom(false)} />
      ) : null}
    </>
  )
}
