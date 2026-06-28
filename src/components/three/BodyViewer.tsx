import { useMemo, useState } from 'react'

import { getBody } from '@/data/planets'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { Scene } from './Scene'
import { Planet } from './Planet'
import { Sun } from './Sun'
import styles from './BodyViewer.module.css'

const NF = new Intl.NumberFormat('en-US')

function detectLowEnd(): boolean {
  if (typeof navigator === 'undefined') return false
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency
  return (mem !== undefined && mem <= 4) || (cores !== undefined && cores <= 4)
}

function dayLength(hours: number): string {
  const h = Math.abs(hours)
  const retro = hours < 0 ? ' retro' : ''
  return h < 48 ? `${h.toFixed(1)} h${retro}` : `${Math.round(h / 24)} days${retro}`
}

interface BodyViewerProps {
  body: string
  caption?: string
}

export function BodyViewer({ body, caption }: BodyViewerProps) {
  const data = getBody(body)
  const { ref, inView } = useInView<HTMLElement>()
  const reduced = usePrefersReducedMotion()
  const lowEnd = useMemo(detectLowEnd, [])
  const [hovered, setHovered] = useState(false)

  if (!data) return null

  const isSun = data.id === 'sun'
  const frameloop = inView ? 'always' : 'never'

  const readouts = [
    { label: 'Diameter', value: NF.format(data.diameterKm), unit: 'km' },
    isSun
      ? { label: 'Surface', value: '5,500', unit: '°C' }
      : { label: 'Mean temp', value: `${data.meanTempC}`, unit: '°C' },
    isSun
      ? { label: 'Type', value: 'G2V', unit: undefined }
      : { label: 'Distance', value: `${data.distanceAu}`, unit: 'AU' },
    { label: 'Day', value: dayLength(data.rotationHours), unit: undefined },
  ]

  return (
    <figure className={styles.viewer} ref={ref}>
      <div className={`surface-ink ${styles.stage}`} data-hovered={hovered}>
        <span className={styles.cornerTL} aria-hidden="true">
          {data.symbol} {data.name.toUpperCase()}
        </span>
        <span className={styles.cornerTR} aria-hidden="true">
          3D · drag to rotate
        </span>

        <div
          className={styles.canvasWrap}
          role="img"
          aria-label={`Interactive 3D model of ${data.name}. A stylised model, not to scale.`}
        >
          <Scene frameloop={frameloop} lowEnd={lowEnd} cameraZ={isSun ? 4.4 : 3.4}>
            {isSun ? (
              <Sun animate={!reduced} />
            ) : (
              <Planet body={data} animate={!reduced} onHoverChange={setHovered} />
            )}
          </Scene>
        </div>

        <dl className={styles.readouts}>
          {readouts.map((r) => (
            <div className={styles.cell} key={r.label}>
              <dt>{r.label}</dt>
              <dd>
                {r.value}
                {r.unit ? <span className={styles.unit}> {r.unit}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className={styles.caption}>
        {caption ?? `${data.name} — drag to rotate. A stylised model, not to scale.`}
      </figcaption>
    </figure>
  )
}
