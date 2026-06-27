import type { QuizQuestion } from './types'
import styles from './Quiz.module.css'

interface QuestionProps {
  question: QuizQuestion
  number: number
  selected: number | null
  onSelect: (optionIndex: number) => void
}

export function Question({ question, number, selected, onSelect }: QuestionProps) {
  const answered = selected !== null
  const isCorrect = selected === question.answer

  return (
    <fieldset className={styles.q} disabled={answered}>
      <legend className={styles.prompt}>
        <span className={styles.qnum}>Q{number}</span>
        {question.prompt}
      </legend>

      <div className={styles.options}>
        {question.options.map((opt, i) => {
          let state = ''
          if (answered) {
            if (i === question.answer) state = styles.correct
            else if (i === selected) state = styles.wrong
          }
          return (
            <label key={opt} className={`${styles.option} ${state}`.trim()}>
              <input
                type="radio"
                name={question.id}
                className={styles.radio}
                checked={selected === i}
                onChange={() => onSelect(i)}
              />
              <span className={styles.optText}>{opt}</span>
              {answered && i === question.answer ? (
                <span className={styles.mark} aria-hidden="true">
                  ✓
                </span>
              ) : null}
              {answered && i === selected && i !== question.answer ? (
                <span className={styles.mark} aria-hidden="true">
                  ✕
                </span>
              ) : null}
            </label>
          )
        })}
      </div>

      {answered ? (
        <div
          className={`${styles.feedback} ${isCorrect ? styles.fbCorrect : styles.fbWrong}`}
          role="status"
        >
          <span className={styles.fbLabel}>{isCorrect ? 'Correct' : 'Not quite'}</span>
          <p className={styles.fbText}>{question.explanation}</p>
        </div>
      ) : null}
    </fieldset>
  )
}
