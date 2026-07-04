import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'what-decides',
    prompt: 'What most decides the ultimate fate of the universe?',
    options: [
      'The total number of stars',
      'The balance between gravity pulling together and dark energy pushing apart',
      'The temperature of the Sun',
      'How many galaxies collide',
    ],
    answer: 1,
    explanation:
      'The universe’s future is a contest between gravity, which pulls matter together, and dark energy, which pushes space apart. Current measurements show dark energy winning and the expansion accelerating — which points toward expansion continuing forever.',
  },
  {
    id: 'heat-death',
    prompt: 'What is the "heat death" or Big Freeze?',
    options: [
      'The universe collapsing back into a single hot point',
      'The Sun eventually scorching the whole Solar System',
      'The universe expanding and cooling until stars burn out and it drifts toward cold, dark emptiness',
      'A sudden explosion that ends everything at once',
    ],
    answer: 2,
    explanation:
      'If expansion continues, galaxies recede out of view, star formation ends as the gas runs low, existing stars burn out, and the universe slowly cools toward a cold, dark, near-empty state. It is an ending not of fire but of fading — the leading prediction for the far future.',
  },
  {
    id: 'early-or-late',
    prompt: 'Are we living early or late in the history of the universe?',
    options: [
      'Very late — the universe is nearly over',
      'Early — in the bright, star-filled era when other galaxies are still visible',
      'Exactly in the middle',
      'It is impossible to say',
    ],
    answer: 1,
    explanation:
      'On the timescales of cosmic fate, we live in the universe’s early morning. Stars still shine and other galaxies are still within reach of our telescopes. In the far future the accelerating expansion will hide those galaxies from view — so we are fortunate to live while the evidence of the wider universe is still visible.',
  },
  {
    id: 'far-future',
    prompt: 'Over almost unimaginable spans of time, what becomes of the stars and even the black holes?',
    options: [
      'They last forever, unchanged',
      'Star formation ends and stars burn out, and even black holes slowly evaporate',
      'They all merge into a single giant star',
      'They fall into the centre of the universe',
    ],
    answer: 1,
    explanation:
      'Eventually the gas to make new stars runs out, and the existing stars burn out one by one. Even black holes are not permanent: they slowly leak away through faint Hawking radiation, taking so long to evaporate that today’s universe is a mere rounding error beside those timescales.',
  },
]
