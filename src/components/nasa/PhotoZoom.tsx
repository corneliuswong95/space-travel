import { useEffect, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import styles from './nasa.module.css'

/**
 * Fullscreen viewer for a single photo with pinch (touch), wheel + double-click (desktop) zoom
 * and drag-to-pan. Layered above the reading lightbox so its gestures never fight the scroll.
 */
export function PhotoZoom({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close the zoom first; don't let the lightbox behind it also handle Escape.
        e.stopImmediatePropagation()
        onCloseRef.current()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  return (
    <div className={styles.zoomBackdrop} role="dialog" aria-modal="true" aria-label={`${alt} — zoomable`}>
      <button
        ref={closeRef}
        type="button"
        className={styles.zoomClose}
        onClick={onClose}
        aria-label="Close zoom"
      >
        ✕
      </button>

      <TransformWrapper minScale={1} maxScale={6} centerOnInit doubleClick={{ step: 0.7 }}>
        <TransformComponent>
          <img src={src} alt={alt} className={styles.zoomImg} />
        </TransformComponent>
      </TransformWrapper>

      <span className={styles.zoomHint} aria-hidden="true">
        Pinch, scroll, or double-tap to zoom · drag to pan
      </span>
    </div>
  )
}
