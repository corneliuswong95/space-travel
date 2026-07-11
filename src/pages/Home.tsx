import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { OrbitDiagram } from '@/components/story/OrbitDiagram'
import { SkyToday } from '@/components/nasa/SkyToday'
import { lessons, isAvailable } from '@/lessons'
import { useProgress } from '@/hooks/useProgress'
import styles from './Home.module.css'

interface Gateway {
  to: string
  kicker: string
  title: string
  desc: string
  meta: string
}

export function Home() {
  const { isComplete } = useProgress()
  const available = lessons.filter(isAvailable)
  const doneCount = available.filter((l) => isComplete(l.slug)).length
  const started = doneCount > 0

  const gateways: Gateway[] = [
    {
      to: '/lessons',
      kicker: 'The path',
      title: 'Lessons',
      desc: 'A sequenced set of short lessons, each grounded in real numbers and ending with a check for understanding.',
      meta: `${doneCount} / ${available.length} complete`,
    },
    {
      to: '/explore',
      kicker: 'Sandbox',
      title: 'Explore in 3D',
      desc: 'Orbit the solar system and fly to any world, with a live telemetry readout for each body.',
      meta: 'Free roam',
    },
    {
      to: '/sky',
      kicker: 'Live data',
      title: 'The sky today',
      desc: 'NASA’s picture of the day, this week’s near-Earth asteroids, full-disk Earth, and space weather.',
      meta: 'From NASA',
    },
    {
      to: '/launches',
      kicker: 'Mission log',
      title: 'Launches & news',
      desc: 'Upcoming rocket launches, what flew in the past week, and the latest headlines from spaceflight.',
      meta: 'Updated hourly',
    },
  ]

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Field guide · the night sky</span>
            <h1 className={styles.title}>Learn the sky like an instrument, not a slideshow.</h1>
            <p className={styles.lead}>
              A short, sequenced path through the Sun, the planets, and how to read the night sky —
              every lesson grounded in real numbers and ending with a check for understanding.
            </p>
            <div className={styles.actions}>
              <Button to="/lessons">{started ? 'Continue the path' : 'Start the path'}</Button>
              <Button to="/explore" variant="ghost">
                Explore in 3D
              </Button>
            </div>
          </div>
          <OrbitDiagram className={styles.diagram} />
        </div>
      </section>

      <section className={`container ${styles.gateway}`} aria-labelledby="gateway-heading">
        <h2 id="gateway-heading" className="visually-hidden">
          Where to go
        </h2>
        <ul className={styles.gwGrid}>
          {gateways.map((g) => (
            <li key={g.to}>
              <Link to={g.to} className={styles.gwCard}>
                <div className={styles.gwTop}>
                  <span className={styles.gwKicker}>{g.kicker}</span>
                  <span className={styles.gwMeta}>{g.meta}</span>
                </div>
                <h3 className={styles.gwTitle}>{g.title}</h3>
                <p className={styles.gwDesc}>{g.desc}</p>
                <span className={styles.gwArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SkyToday />
    </>
  )
}
