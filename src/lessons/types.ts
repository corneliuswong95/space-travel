import type { ComponentType } from 'react'

import type { Readout } from '@/components/story/AtlasPlate'
import type { QuizQuestion } from '@/components/quiz/types'

export type LessonStatus = 'available' | 'planned'

interface LessonMeta {
  slug: string
  order: number
  /** Catalog designation for the hero plate, e.g. "PLATE 01". */
  catalog: string
  title: string
  summary: string
  objectives: string[]
  estMinutes: number
  /** Telemetry shown on the hero plate. */
  readouts?: Readout[]
  /** If set, LessonPage renders the matching scroll-driven tour for this lesson. */
  tour?: 'solar-system'
  status: LessonStatus
}

/** A lesson with real content and a quiz. */
export interface Lesson extends LessonMeta {
  status: 'available'
  Content: ComponentType
  quiz: QuizQuestion[]
}

/** A lesson on the path that isn't written yet — shown as upcoming. */
export interface PlannedLesson extends LessonMeta {
  status: 'planned'
}

export type LessonEntry = Lesson | PlannedLesson
