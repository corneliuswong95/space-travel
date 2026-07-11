import { Link } from 'react-router-dom'

import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Button } from '@/components/ui/Button'
import { lessons, chapters, isAvailable } from '@/lessons'
import type { LessonEntry } from '@/lessons/types'
import { useProgress } from '@/hooks/useProgress'
import styles from './Lessons.module.css'

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

export function Lessons() {
  const { isComplete, resetProgress } = useProgress()
  const available = lessons.filter(isAvailable)
  const doneCount = available.filter((l) => isComplete(l.slug)).length
  const next = available.find((l) => !isComplete(l.slug)) ?? available[0]
  const started = doneCount > 0
  const allDone = doneCount === available.length

  return (
    <div className={`container ${styles.wrap}`}>
      <AtlasPlate
        variant="hero"
        catalog="THE PATH"
        title="The learning path"
        subtitle="A sequenced journey outward — from our Sun to the edge of the observable universe. Each lesson ends with a check for understanding, and your progress is saved on this device."
        meta={`${doneCount} / ${available.length} COMPLETE`}
      />

      <div className={styles.continueBar}>
        <div className={styles.continueText}>
          <span className={styles.continueLabel}>
            {allDone ? 'Path complete' : started ? 'Pick up where you left off' : 'Ready when you are'}
          </span>
          <span className={styles.continueTitle}>
            {next.catalog} · {next.title}
          </span>
        </div>
        <div className={styles.continueActions}>
          <Button to={`/lessons/${next.slug}`}>
            {allDone ? 'Revisit the first lesson' : started ? 'Continue the path' : 'Start the path'}
          </Button>
          {started ? (
            <button
              type="button"
              className={styles.reset}
              onClick={() => {
                if (window.confirm('Reset your saved progress? This clears every completed lesson on this device.')) {
                  resetProgress()
                }
              }}
            >
              Reset progress
            </button>
          ) : null}
        </div>
      </div>

      {chapters.map((ch) => {
        const chapterLessons = lessons.filter((l) => l.chapter === ch.id)
        if (chapterLessons.length === 0) return null
        return (
          <section key={ch.id} className={styles.chapter} aria-labelledby={`chapter-${ch.id}`}>
            <header className={styles.chapterHead}>
              <span className={styles.chapterKicker}>Chapter {ch.numeral}</span>
              <h2 id={`chapter-${ch.id}`} className={styles.chapterTitle}>
                {ch.title}
              </h2>
              <p className={styles.chapterBlurb}>{ch.blurb}</p>
            </header>
            <ol className={styles.cards}>
              {chapterLessons.map((l) => (
                <li key={l.slug}>
                  <LessonCard lesson={l} done={isAvailable(l) && isComplete(l.slug)} />
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
