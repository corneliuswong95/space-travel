import styles from './BodyViewer.module.css'

/** Sized placeholder shown while the Three.js chunk loads — keeps layout from jumping. */
export function ViewerSkeleton() {
  return (
    <div className={styles.viewer}>
      <div className={`surface-ink ${styles.stage}`}>
        <div className={styles.canvasWrap}>
          <span className={styles.loading}>Loading model…</span>
        </div>
      </div>
    </div>
  )
}
