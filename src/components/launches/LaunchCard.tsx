import type { Launch } from '@/data/launches'
import styles from './launches.module.css'

function whenLabel(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now()
  const days = Math.round(diff / 86_400_000)
  if (diff >= 0) {
    if (days <= 0) return 'today'
    if (days === 1) return 'tomorrow'
    if (days < 14) return `in ${days} days`
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }
  const ago = Math.abs(days)
  if (ago <= 0) return 'today'
  if (ago === 1) return 'yesterday'
  return `${ago} days ago`
}

function statusKind(s: string): 'ok' | 'bad' | 'go' | 'tbd' {
  const t = s.toLowerCase()
  if (t.includes('success')) return 'ok'
  if (t.includes('fail')) return 'bad'
  if (t.includes('go')) return 'go'
  return 'tbd'
}

export function LaunchCard({ launch }: { launch: Launch }) {
  const when = whenLabel(launch.net)
  const stamp = new Date(launch.net).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <article className={styles.launch}>
      {launch.image ? (
        <img className={styles.launchImg} src={launch.image} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className={styles.launchImg} aria-hidden="true" />
      )}
      <div className={styles.launchBody}>
        <div className={styles.launchTop}>
          <span className={styles.provider}>{launch.provider}</span>
          {launch.statusAbbrev ? (
            <span className={`${styles.badge} ${styles[statusKind(launch.status)]}`}>
              {launch.statusAbbrev}
            </span>
          ) : null}
        </div>
        <h3 className={styles.launchName}>{launch.missionName}</h3>
        <p className={styles.launchMeta}>
          {[launch.rocket, launch.location].filter(Boolean).join(' · ')}
        </p>
        <p className={styles.launchWhen}>
          <span className={styles.when}>{when}</span> · {stamp}
        </p>
      </div>
    </article>
  )
}
