import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'mass-decides',
    prompt: 'What single property most decides how a star will end its life?',
    options: [
      'Its colour',
      'Its distance from other stars',
      'Its mass',
      'How fast it spins',
    ],
    answer: 2,
    explanation:
      'Mass is the master variable. A star like the Sun will swell to a red giant and settle into a white dwarf, while a star many times heavier will fuse elements all the way to iron and end in a supernova. Knowing a star’s mass tells you, in broad strokes, the whole rest of its story.',
  },
  {
    id: 'star-stuff',
    prompt: 'Where did the calcium in your bones and the iron in your blood originally come from?',
    options: [
      'They have existed, unchanged, since the Big Bang',
      'They were forged inside stars and scattered when those stars died',
      'They formed in the Earth’s core after the planet cooled',
      'They were created by the Sun and rained down on Earth',
    ],
    answer: 1,
    explanation:
      'The Big Bang made mostly hydrogen and helium. Nearly every heavier element — including the calcium and iron in you — was built by fusion inside earlier generations of stars, with the heaviest forged in supernovae. Those stars scattered the material into space, where it became new stars, planets, and ultimately us.',
  },
  {
    id: 'iron-limit',
    prompt: 'Why does fusion in a massive star’s core stop once it builds up iron?',
    options: [
      'Iron is too heavy to exist inside a star',
      'Fusing iron absorbs energy rather than releasing it, so it cannot hold the core up',
      'The star simply runs out of room',
      'Iron puts out the fusion like water on a fire',
    ],
    answer: 1,
    explanation:
      'Up to iron, fusion releases energy, and that outward pressure balances gravity. But fusing iron consumes energy instead of producing it, so once the core is iron there is nothing left to support it. The core collapses in under a second, triggering the supernova.',
  },
  {
    id: 'massive-short',
    prompt: 'The most massive stars have far more fuel than the Sun, yet they live much shorter lives. Why?',
    options: [
      'Their fuel is of a lower quality',
      'They burn through their fuel enormously faster than lighter stars',
      'They lose most of their fuel to nearby planets',
      'They never actually start fusion',
    ],
    answer: 1,
    explanation:
      'A heavyweight star shines thousands of times more brightly than the Sun, which means it is consuming fuel at a furious rate. Even with much more fuel to start, it exhausts the supply in just a few million years — while the smallest stars sip theirs for trillions.',
  },
]
