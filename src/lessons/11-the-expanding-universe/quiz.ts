import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'what-expands',
    prompt: 'When we say the universe is expanding, what is actually stretching?',
    options: [
      'The galaxies are flying outward through space from a central explosion',
      'Space itself is stretching, carrying the galaxies apart',
      'The galaxies are growing larger',
      'Only the empty space at the edge of the universe',
    ],
    answer: 1,
    explanation:
      'The galaxies are not racing through static space from a central point — space itself is expanding between them, and that carries the galaxies apart. This is why there is no centre and no edge: the stretching happens everywhere at once.',
  },
  {
    id: 'no-centre',
    prompt: 'Every distant galaxy is moving away from us, and the farther ones move faster. Does that put us at the centre of the universe?',
    options: [
      'Yes — we must be at or near the centre',
      'No — an observer in any galaxy would see exactly the same thing',
      'Yes, but only because the Milky Way is unusually large',
      'It is impossible to say',
    ],
    answer: 1,
    explanation:
      'Picture raisins in rising bread: every raisin sees all the others moving away, and none is the centre. Because space is expanding everywhere, an observer in any galaxy sees the same pattern of recession. Our view is not special, and there is no centre to the expansion.',
  },
  {
    id: 'cmb',
    prompt: 'What is the cosmic microwave background, and why does it matter?',
    options: [
      'Light from the nearest galaxies; it tells us their distance',
      'Radiation from the Sun bouncing around the Solar System',
      'The faint afterglow of the hot early universe; it is key evidence for the Big Bang',
      'Interference from human radio and television signals',
    ],
    answer: 2,
    explanation:
      'The early universe was so hot it glowed, and as space expanded that ancient light was stretched into faint microwaves reaching us from every direction. Finding it — by accident, in 1965 — was powerful confirmation that the universe really did begin in a hot, dense state.',
  },
  {
    id: 'dark-sector',
    prompt: 'Roughly what fraction of the universe is ordinary matter — the stuff of stars, planets, and people?',
    options: [
      'About 95%',
      'About half',
      'Under 5%',
      'Essentially all of it',
    ],
    answer: 2,
    explanation:
      'Everything we can see and touch adds up to under 5% of the universe. About a quarter is dark matter, whose gravity holds galaxies together, and roughly 70% is dark energy, which is driving the expansion to accelerate. We have named both, but we still do not know what either one actually is.',
  },
]
