import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { OrbitDiagram } from '@/components/story/OrbitDiagram'
import { SkyToday } from '@/components/nasa/SkyToday'
import { lessons, isAvailable } from '@/lessons'
import type { LessonEntry } from '@/lessons/types'
import { useProgress } from '@/hooks/useProgress'
import styles from './Home.module.css'

function LessonCard({ lesson, done }: { lesson: LessonEntry; done: boolean }) {
  const planned = lesson.status === 'planned'
  const meta = planned ? 'Planned' : done ? '✓ Done' : `${lesson.estMinutes} min`

  const inner = (
    <>
      <div className={styles.cardTop}>
        <span className={styles.cardCat}>{lesson.catalog}</span>
        <span className={`${styles.cardMeta} ${done ? styles.metaDone : ''}`.trim()}>{meta}</span>
      </div>
      <h3 className={styles.cardTitle}>{lesson.title}</h3>
      <p className={styles.cardSummary}>{lesson.summary}</p>
    </>
  )

  if (planned) {
    return (
      <div className={`${styles.card} ${styles.cardPlanned}`} aria-disabled="true">
        {inner}
      </div>
    )
  }

  return (
    <Link to={`/lessons/${lesson.slug}`} className={`${styles.card} ${done ? styles.cardDone : ''}`.trim()}>
      {inner}
    </Link>
  )
}

export function Home() {
  const { isComplete } = useProgress()
  const available = lessons.filter(isAvailable)
  const doneCount = available.filter((l) => isComplete(l.slug)).length
  const next = available.find((l) => !isComplete(l.slug)) ?? available[0]

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
              <Button to={`/lessons/${next.slug}`}>
                {doneCount > 0 ? 'Continue the path' : 'Start the path'}
              </Button>
              <Button to="/explore" variant="ghost">
                Explore in 3D
              </Button>
            </div>
          </div>
          <OrbitDiagram className={styles.diagram} />
        </div>
      </section>

      <section className={`container ${styles.path}`} aria-labelledby="path-heading">
        <div className={styles.pathHead}>
          <h2 id="path-heading" className={styles.pathTitle}>
            The path
          </h2>
          <span className={`${styles.pathProgress} mono`}>
            {doneCount} / {available.length} complete
          </span>
        </div>

        <ol className={styles.cards}>
          {lessons.map((l) => (
            <li key={l.slug}>
              <LessonCard lesson={l} done={isAvailable(l) && isComplete(l.slug)} />
            </li>
          ))}
        </ol>
      </section>

      <SkyToday />
    </>
  )
}
