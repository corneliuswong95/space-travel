import styles from './AtlasPlate.module.css'

export interface Readout {
  label: string
  value: string
  unit?: string
}

interface AtlasPlateProps {
  /** Catalog designation, e.g. "PLATE 01" or "SOL · ☉". Rendered in mono. */
  catalog: string
  title: string
  subtitle?: string
  /** Right-aligned secondary line in the catalog row, e.g. coordinates. */
  meta?: string
  /** Instrument-style telemetry cells shown beneath the title. */
  readouts?: Readout[]
  variant?: 'hero' | 'section'
  id?: string
}

/**
 * Star-atlas plate header: a monospace catalog number, a hairline rule with a measurement
 * tick, a display-serif title, and an optional row of telemetry readouts. The signature
 * element — "printed atlas meets instrument readout".
 */
export function AtlasPlate({
  catalog,
  title,
  subtitle,
  meta,
  readouts,
  variant = 'section',
  id,
}: AtlasPlateProps) {
  const Title = variant === 'hero' ? 'h1' : 'h2'

  return (
    <header className={`${styles.plate} ${styles[variant]}`} id={id}>
      <div className={styles.catalogRow}>
        <span className={styles.catalog}>{catalog}</span>
        {meta ? <span className={styles.meta}>{meta}</span> : null}
      </div>

      <div className={styles.rule} aria-hidden="true" />

      <Title className={styles.title}>{title}</Title>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}

      {readouts && readouts.length > 0 ? (
        <dl className={styles.readouts}>
          {readouts.map((r) => (
            <div className={styles.cell} key={r.label}>
              <dt className={styles.cellLabel}>{r.label}</dt>
              <dd className={styles.cellValue}>
                {r.value}
                {r.unit ? <span className={styles.unit}> {r.unit}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  )
}
