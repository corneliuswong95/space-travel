import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Question } from './Question'
import type { QuizQuestion } from './types'
import styles from './Quiz.module.css'

interface QuizProps {
  questions: QuizQuestion[]
  /** Fired once when every question has been answered. */
  onComplete?: () => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [selected, setSelected] = useState<Record<string, number>>({})
  const firedRef = useRef(false)

  const total = questions.length
  const answeredCount = Object.keys(selected).length
  const allAnswered = answeredCount === total
  const score = questions.reduce((acc, q) => acc + (selected[q.id] === q.answer ? 1 : 0), 0)

  useEffect(() => {
    if (allAnswered && !firedRef.current) {
      firedRef.current = true
      onComplete?.()
    }
  }, [allAnswered, onComplete])

  function handleSelect(id: string, optionIndex: number) {
    // Lock the answer once chosen so the feedback stays meaningful.
    setSelected((prev) => (id in prev ? prev : { ...prev, [id]: optionIndex }))
  }

  function reset() {
    setSelected({})
    firedRef.current = false
  }

  return (
    <section className={styles.quiz} aria-labelledby="quiz-heading">
      <div className={styles.head}>
        <span className={styles.kicker}>Check what you learned</span>
        <span className={`${styles.progress} mono`}>
          {answeredCount} / {total}
        </span>
      </div>
      <h2 id="quiz-heading" className={styles.heading}>
        A few questions
      </h2>

      <ol className={styles.list}>
        {questions.map((q, idx) => (
          <li key={q.id}>
            <Question
              question={q}
              number={idx + 1}
              selected={q.id in selected ? selected[q.id] : null}
              onSelect={(i) => handleSelect(q.id, i)}
            />
          </li>
        ))}
      </ol>

      {allAnswered ? (
        <div className={styles.summary} role="status">
          <p className={styles.score}>
            <span className="mono">
              {score} / {total}
            </span>{' '}
            correct
          </p>
          <p className={styles.summaryNote}>
            {score === total
              ? 'Full marks. The explanations are worth a second read even so.'
              : 'Read the feedback on anything you missed — that is where the learning is.'}
          </p>
          <Button variant="ghost" size="sm" onClick={reset}>
            Try again
          </Button>
        </div>
      ) : null}
    </section>
  )
}
