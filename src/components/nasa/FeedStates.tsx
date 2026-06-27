import { Button } from '@/components/ui/Button'
import styles from './nasa.module.css'

export function FeedError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.state} role="status">
      <p className={styles.stateText}>
        This live feed isn’t reachable right now. Everything else still works — try again in a
        moment.
      </p>
      <Button variant="ghost" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}

export function FeedLoading({ rows = 3 }: { rows?: number }) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.loadingLabel}>Acquiring feed…</span>
      {Array.from({ length: rows }).map((_, i) => (
        <span key={i} className={styles.skelBar} data-skeleton />
      ))}
    </div>
  )
}
