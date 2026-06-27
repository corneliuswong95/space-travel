import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { planets } from '@/data/planets'
import { Planet } from '@/components/three/Planet'
import { Sun } from '@/components/three/Sun'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './SolarTour.module.css'

gsap.registerPlugin(ScrollTrigger)

// Stylised layout along +X (not to scale): position and visual radius per planet.
const POS = [4, 6, 8, 10, 14, 19, 24, 28]
const RAD = [0.32, 0.5, 0.52, 0.38, 1.4, 1.2, 0.82, 0.8]

// Camera focus points the scroll sweeps between, one per beat.
const FOCUS_X = [0, 8, 12, 19, 28]

const beats = [
  {
    kicker: '00 · the centre',
    title: 'The Sun',
    text: 'Almost all of the Solar System’s mass, in one place. Everything that follows is held by its gravity.',
  },
  {
    kicker: '01 · the inner worlds',
    title: 'Four rocky planets',
    text: 'Mercury, Venus, Earth, and Mars — small, dense, and close. Only rock and metal could survive the heat this near the Sun.',
  },
  {
    kicker: '02 · the frost line',
    title: 'A boundary in the cold',
    text: 'Beyond Mars it grew cold enough for ice to last. That line marks where small rocky worlds give way to giants.',
  },
  {
    kicker: '03 · the giants',
    title: 'Jupiter and Saturn',
    text: 'Past the frost line, planets grew massive enough to hold thick atmospheres of gas — and, for Saturn, rings.',
  },
  {
    kicker: '04 · the cold edge',
    title: 'Uranus and Neptune',
    text: 'The ice giants orbit up to thirty times farther out than Earth, where sunlight is faint and a single year lasts a human lifetime.',
  },
]

function detectLowEnd(): boolean {
  if (typeof navigator === 'undefined') return false
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency
  return (mem !== undefined && mem <= 4) || (cores !== undefined && cores <= 4)
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

function sampleFocusX(p: number): number {
  const segs = FOCUS_X.length - 1
  const s = Math.min(segs - 0.0001, Math.max(0, p * segs))
  const i = Math.floor(s)
  return FOCUS_X[i] + (FOCUS_X[i + 1] - FOCUS_X[i]) * smoothstep(s - i)
}

/** Drives the camera along the row of planets from the shared scroll progress. */
function Rig({ progressRef }: { progressRef: { current: number } }) {
  useFrame((state) => {
    const x = sampleFocusX(progressRef.current)
    const cam = state.camera
    cam.position.x += (x - cam.position.x) * 0.1
    cam.position.y += (2.2 - cam.position.y) * 0.1
    cam.position.z += (7 - cam.position.z) * 0.1
    cam.lookAt(x, 0, 0)
  })
  return null
}

function Bodies({ animate }: { animate: boolean }) {
  return (
    <>
      <Sun radius={1.8} animate={animate} />
      {planets.map((b, i) => (
        <group key={b.id} position={[POS[i], 0, 0]}>
          <Planet body={b} radius={RAD[i]} animate={animate} interactive={false} />
        </group>
      ))}
    </>
  )
}

export function SolarTour() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { ref: stageRef, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const lowEnd = useMemo(detectLowEnd, [])
  const progressRef = useRef(0)
  const beatRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      if (reduced || !trackRef.current) return
      const st = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          progressRef.current = p
          const n = beats.length
          for (let i = 0; i < n; i++) {
            const el = beatRefs.current[i]
            if (!el) continue
            const center = i / (n - 1)
            const op = Math.max(0, 1 - Math.abs(p - center) / 0.2)
            el.style.opacity = String(op)
            el.style.transform = `translateY(${(1 - op) * 16}px)`
          }
        },
      })
      return () => st.kill()
    },
    { dependencies: [reduced], scope: trackRef },
  )

  // Reduced motion: no pinning or scrubbing — a static overview plus the beats as plain text.
  if (reduced) {
    return (
      <section className={`surface-ink ${styles.staticWrap}`} aria-label="The Solar System, from the Sun outward">
        <div className={styles.staticStage}>
          <Canvas
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ alpha: true }}
            camera={{ position: [14, 13, 46], fov: 40 }}
            onCreated={({ camera }) => camera.lookAt(14, 0, 0)}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[12, 10, 16]} intensity={1.5} />
            <Suspense fallback={null}>
              <Bodies animate={false} />
            </Suspense>
          </Canvas>
        </div>
        <ol className={styles.staticBeats}>
          {beats.map((b) => (
            <li key={b.title}>
              <span className={styles.beatKicker}>{b.kicker}</span>
              <h3 className={styles.beatTitle}>{b.title}</h3>
              <p className={styles.beatText}>{b.text}</p>
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      className={`surface-ink ${styles.track}`}
      style={{ height: `${beats.length * 75}vh` }}
      aria-label="The Solar System, from the Sun outward"
    >
      <div ref={stageRef} className={styles.sticky}>
        <div className={styles.canvasWrap}>
          <Canvas
            frameloop={inView ? 'always' : 'never'}
            dpr={[1, lowEnd ? 1 : 1.5]}
            gl={{ alpha: true, antialias: !lowEnd, powerPreference: 'high-performance' }}
            camera={{ position: [0, 2.2, 7], fov: 50 }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[12, 10, 16]} intensity={1.5} />
            <Suspense fallback={null}>
              <Bodies animate />
            </Suspense>
            <Rig progressRef={progressRef} />
          </Canvas>
        </div>

        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.captions}>
          {beats.map((b, i) => (
            <div
              key={b.title}
              ref={(el) => {
                beatRefs.current[i] = el
              }}
              className={styles.beat}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className={styles.beatKicker}>{b.kicker}</span>
              <h3 className={styles.beatTitle}>{b.title}</h3>
              <p className={styles.beatText}>{b.text}</p>
            </div>
          ))}
        </div>

        <span className={styles.hint} aria-hidden="true">
          scroll to travel outward ▾
        </span>
      </div>
    </section>
  )
}
