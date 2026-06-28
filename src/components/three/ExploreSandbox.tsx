import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'

import { planets, sun, type Body } from '@/data/planets'
import { getLesson } from '@/lessons'
import { Planet } from './Planet'
import { Sun } from './Sun'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './ExploreSandbox.module.css'

// Stylised lineup (not to scale) so every world is visible at once.
const ROW_X = [4, 6, 8, 10, 14, 19, 24, 28]
const ROW_R = [0.32, 0.5, 0.52, 0.38, 1.4, 1.2, 0.82, 0.8]
const SUN_R = 1.8

const BODIES: Body[] = [sun, ...planets]
const XS = [0, ...ROW_X]
const RS = [SUN_R, ...ROW_R]

/** Which lesson a body links to (planets without their own lesson point to the overview). */
function bodyLessonSlug(id: string): string {
  if (id === 'sun') return 'what-is-a-star'
  if (id === 'mars') return 'mars-the-red-planet'
  return 'the-solar-system'
}

const NF = new Intl.NumberFormat('en-US')

function detectLowEnd(): boolean {
  if (typeof navigator === 'undefined') return false
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency
  return (mem !== undefined && mem <= 4) || (cores !== undefined && cores <= 4)
}

function fmtDay(hours: number): string {
  const h = Math.abs(hours)
  const retro = hours < 0 ? ' retro' : ''
  return h < 48 ? `${h.toFixed(1)} h${retro}` : `${Math.round(h / 24)} d${retro}`
}

function fmtYear(days: number): string {
  if (days <= 0) return '—'
  return days < 900 ? `${Math.round(days)} d` : `${(days / 365.25).toFixed(1)} yr`
}

/** Eases the camera to frame the selected body, then hands control back to OrbitControls. */
function FocusRig({
  targetX,
  targetR,
  controlsRef,
  reduced,
}: {
  targetX: number
  targetR: number
  controlsRef: { current: { target: THREE.Vector3; enabled: boolean; update: () => void } | null }
  reduced: boolean
}) {
  const desiredPos = useRef(new THREE.Vector3())
  const desiredLook = useRef(new THREE.Vector3())
  const active = useRef(false)

  useEffect(() => {
    // Frame the body right-of-centre so the info card doesn't cover it.
    desiredPos.current.set(targetX - (targetR * 0.9 + 1.4), targetR * 0.45 + 0.9, targetR * 3 + 3)
    desiredLook.current.set(targetX, 0, 0)
    active.current = true
    if (controlsRef.current) controlsRef.current.enabled = false
  }, [targetX, targetR, controlsRef])

  useFrame((state) => {
    if (!active.current) return
    const cam = state.camera
    const f = reduced ? 1 : 0.09
    cam.position.lerp(desiredPos.current, f)
    cam.lookAt(desiredLook.current)
    if (cam.position.distanceTo(desiredPos.current) < 0.06) {
      active.current = false
      const c = controlsRef.current
      if (c) {
        c.target.copy(desiredLook.current)
        c.enabled = true
        c.update()
      }
    }
  })
  return null
}

export function ExploreSandbox() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const lowEnd = useMemo(detectLowEnd, [])
  const [selected, setSelected] = useState(3) // Earth
  // OrbitControls instance; typed loosely (drei's ref type is internal).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)

  const body = BODIES[selected]
  const isSun = body.id === 'sun'
  const lessonSlug = bodyLessonSlug(body.id)
  const lessonTitle = getLesson(lessonSlug)?.title ?? 'the lessons'

  const readouts = [
    { label: 'Diameter', value: NF.format(body.diameterKm), unit: 'km' },
    { label: 'Distance', value: isSun ? '—' : `${body.distanceAu}`, unit: isSun ? '' : 'AU' },
    { label: 'Day', value: fmtDay(body.rotationHours), unit: '' },
    { label: 'Year', value: fmtYear(body.orbitalPeriodDays), unit: '' },
    { label: 'Mean temp', value: isSun ? '5,500' : `${body.meanTempC}`, unit: '°C' },
    { label: 'Moons', value: isSun ? '—' : `${body.moons}`, unit: '' },
  ]

  return (
    <div className={`surface-ink ${styles.sandbox}`} ref={ref}>
      <div className={styles.stage}>
        <div className={styles.canvasWrap}>
          <Canvas
            frameloop={inView ? 'always' : 'never'}
            dpr={[1, lowEnd ? 1 : 1.5]}
            gl={{ alpha: true, antialias: !lowEnd, powerPreference: 'high-performance' }}
            camera={{ position: [4, 7, 22], fov: 45 }}
          >
            <ambientLight intensity={0.2} />
            <directionalLight position={[12, 10, 16]} intensity={1.7} color="#fff6e8" />
            <Suspense fallback={null}>
              {BODIES.map((b, i) => (
                <group
                  key={b.id}
                  position={[XS[i], 0, 0]}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected(i)
                  }}
                >
                  {b.id === 'sun' ? (
                    <Sun radius={RS[i]} animate={!reduced} />
                  ) : (
                    <Planet body={b} radius={RS[i]} animate={!reduced} interactive />
                  )}
                </group>
              ))}
            </Suspense>
            <FocusRig
              targetX={XS[selected]}
              targetR={RS[selected]}
              controlsRef={controlsRef}
              reduced={reduced}
            />
            <OrbitControls
              ref={controlsRef}
              makeDefault
              enablePan={false}
              enableZoom={false}
              enableDamping={false}
              rotateSpeed={0.5}
              minPolarAngle={Math.PI * 0.12}
              maxPolarAngle={Math.PI * 0.88}
            />
          </Canvas>
        </div>

        <span className={styles.hint} aria-hidden="true">
          drag to orbit · pick a world below
        </span>
      </div>

      <div className={styles.info}>
        <span className={styles.infoKicker}>
          {body.symbol} · {body.category}
        </span>
        <h3 className={styles.infoName}>{body.name}</h3>
        <p className={styles.infoBlurb}>{body.blurb}</p>
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
        <Link className={styles.infoLink} to={`/lessons/${lessonSlug}`}>
          Open lesson · {lessonTitle} →
        </Link>
      </div>

      <div className={styles.rail} role="group" aria-label="Choose a body to focus">
        {BODIES.map((b, i) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={i === selected}
            className={`${styles.chip} ${i === selected ? styles.chipActive : ''}`.trim()}
            onClick={() => setSelected(i)}
          >
            <span className={styles.chipSymbol} aria-hidden="true">
              {b.symbol}
            </span>
            <span className={styles.chipName}>{b.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
