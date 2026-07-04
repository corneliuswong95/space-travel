import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'cause',
    prompt: 'What actually causes the Moon to show phases?',
    options: [
      "Earth's shadow falling across the Moon",
      'We see different amounts of the Moon’s permanently sunlit half as it orbits',
      'The Moon makes its own light, which dims and brightens',
      'Clouds in our atmosphere block part of the Moon',
    ],
    answer: 1,
    explanation:
      'The Sun always lights half the Moon. As the Moon orbits Earth, we see that lit half from changing angles — almost all of it at full Moon, a thin sliver at crescent. Earth’s shadow only matters during a lunar eclipse, not for ordinary phases.',
  },
  {
    id: 'eclipse',
    prompt: 'Why don’t we get a lunar eclipse at every full Moon?',
    options: [
      'The Moon is too far away most months',
      'The Moon’s orbit is tilted about 5°, so it usually passes above or below Earth’s shadow',
      'Eclipses can only happen in winter',
      'Earth’s shadow is too small to ever reach the Moon',
    ],
    answer: 1,
    explanation:
      'The Moon’s orbit is tilted roughly 5° from Earth’s orbit around the Sun. Most full Moons it slips slightly above or below the line of Earth’s shadow. Only when a full Moon falls near the points where the two orbits cross do we get a lunar eclipse.',
  },
  {
    id: 'one-face',
    prompt: 'We always see the same face of the Moon because…',
    options: [
      'the Moon does not rotate at all',
      'the Moon rotates once for every orbit it makes around Earth',
      'the far side is permanently in darkness',
      'Earth physically blocks our view of the other side',
    ],
    answer: 1,
    explanation:
      'The Moon turns exactly once per orbit, so the same side always faces Earth — a state called tidal locking. The far side is not dark; it receives just as much sunlight, it simply never faces us.',
  },
  {
    id: 'cycle',
    prompt: 'About how long is one full cycle of phases, from new Moon to new Moon?',
    options: ['24 hours', 'About a week', 'About 29.5 days', 'About 365 days'],
    answer: 2,
    explanation:
      'The synodic month — new Moon to new Moon — is about 29.5 days. It runs a little longer than the Moon’s 27.3-day orbit because Earth moves around the Sun during the month, so the Moon must travel slightly farther to line up with the Sun again.',
  },
]
