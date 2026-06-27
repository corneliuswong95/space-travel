export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  /** Index into `options` of the correct answer. */
  answer: number
  /**
   * Shown after the learner answers — for right AND wrong answers alike. The explanation is
   * part of the lesson, so write it to teach the concept, not just to confirm the result.
   */
  explanation: string
}
