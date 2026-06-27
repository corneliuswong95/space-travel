import styles from './Loader.module.css'

export function Loader({ label = 'Charting…' }: { label?: string }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <svg className={styles.mark} viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.3" />
        <path d="M12 3 a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
