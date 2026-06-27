import { lazy, Suspense, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'

import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Quiz } from '@/components/quiz/Quiz'
import { Button } from '@/components/ui/Button'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { getLesson, isAvailable, lessons } from '@/lessons'
import { useProgress } from '@/hooks/useProgress'
import { Loader } from '@/components/ui/Loader'
import { NotFound } from './NotFound'
import styles from './LessonPage.module.css'

// Lazy so the lesson is interactive before the tour's Three.js + GSAP arrive.
const SolarTour = lazy(() =>
  import('@/components/story/SolarTour').then((m) => ({ default: m.SolarTour })),
)

export function LessonPage() {
  const { slug } = useParams()
  const { isComplete, markComplete } = useProgress()
  const entry = slug ? getLesson(slug) : undefined

  const handleComplete = useCallback(() => {
    if (slug) markComplete(slug)
  }, [slug, markComplete])

  if (!entry) return <NotFound />

  // On the path, but not written yet.
  if (!isAvailable(entry)) {
    return (
      <div className={`container ${styles.coming}`}>
        <Link to="/" className={styles.back}>
          ← All lessons
        </Link>
        <AtlasPlate
          variant="hero"
          catalog={entry.catalog}
          title={entry.title}
          subtitle={entry.summary}
          meta="PLANNED"
        />
        <p className={styles.comingNote}>
          This lesson is on the path but isn't written yet. Start with the lessons already
          available — this one will slot in here when it's ready.
        </p>
        <Button to="/">Back to the path</Button>
      </div>
    )
  }

  const { Content, quiz, catalog, title, summary, readouts, objectives, estMinutes } = entry
  const done = isComplete(entry.slug)

  const availableList = lessons.filter(isAvailable)
  const idx = availableList.findIndex((l) => l.slug === entry.slug)
  const next = availableList[idx + 1]

  return (
    <article className={styles.page}>
      <div className={`container ${styles.head}`}>
        <Link to="/" className={styles.back}>
          ← All lessons
        </Link>
        <AtlasPlate
          variant="hero"
          catalog={catalog}
          title={title}
          subtitle={summary}
          meta={`EST ${estMinutes} MIN`}
          readouts={readouts}
        />
        {done ? <p className={styles.doneFlag}>✓ You've completed this lesson</p> : null}
        {objectives.length > 0 ? (
          <div className={styles.objectives}>
            <span className={styles.objLabel}>In this lesson</span>
            <ul>
              {objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {entry.tour === 'solar-system' ? (
        <Suspense fallback={<Loader label="Charting the system…" />}>
          <SolarTour />
        </Suspense>
      ) : null}

      <div className={`container ${styles.body}`}>
        <div className={`surface-paper ${styles.prose}`}>
          <MDXProvider components={mdxComponents}>
            <Content />
          </MDXProvider>
        </div>

        <Quiz questions={quiz} onComplete={handleComplete} />

        <nav className={styles.pageNav} aria-label="Lesson navigation">
          <div className={styles.navLeft}>
            <Button to="/" variant="ghost">
              All lessons
            </Button>
            <Button to="/explore" variant="ghost">
              Explore in 3D
            </Button>
          </div>
          {next ? (
            <Button to={`/lessons/${next.slug}`}>Next · {next.title} →</Button>
          ) : (
            <span className={styles.endNote}>That's the end of the path so far.</span>
          )}
        </nav>
      </div>
    </article>
  )
}
