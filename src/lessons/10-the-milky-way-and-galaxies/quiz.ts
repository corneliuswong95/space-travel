import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'band',
    prompt: 'What is the faint band of light we call the Milky Way?',
    options: [
      'A nearby cloud of glowing gas',
      'The combined light of our own galaxy, seen edge-on from inside it',
      'The path the Sun takes across the sky',
      'Light scattered by dust in Earth’s atmosphere',
    ],
    answer: 1,
    explanation:
      'We live inside the flat disc of the Milky Way, so when we look along the plane of that disc we see the merged glow of countless distant stars run together into a band. The "milky" strip across the night sky is simply our own galaxy viewed from within.',
  },
  {
    id: 'collision',
    prompt: 'When the Milky Way and Andromeda merge in a few billion years, what will happen to most individual stars?',
    options: [
      'They will smash into one another in countless collisions',
      'They will mostly glide past each other without colliding',
      'They will all be pulled into a single black hole',
      'They will be flung out of both galaxies into empty space',
    ],
    answer: 1,
    explanation:
      'Galaxies are overwhelmingly empty space — the distances between stars are vast compared with the stars themselves. So although the two galaxies will pass through each other and eventually merge, essentially no two stars will collide. The galaxies blend like two sparse swarms passing through one another.',
  },
  {
    id: 'centre',
    prompt: 'What sits at the very centre of the Milky Way?',
    options: [
      'The Sun',
      'A supermassive black hole',
      'A single enormous star',
      'Nothing — the centre is empty',
    ],
    answer: 1,
    explanation:
      'At the galaxy’s heart lies Sagittarius A*, a supermassive black hole with the mass of about four million Suns. We cannot see it directly, but we have watched stars near the core whip around an invisible point at thousands of kilometres per second — the signature of an enormous, compact mass.',
  },
  {
    id: 'deep-field',
    prompt: 'Astronomers aimed Hubble at a patch of sky that looked completely empty and stared for days. What did the image reveal?',
    options: [
      'A handful of faint, nearby stars',
      'Nothing — the patch really was empty',
      'Thousands of distant galaxies, implying the universe holds around two trillion of them',
      'A single very large galaxy filling the frame',
    ],
    answer: 2,
    explanation:
      'The "empty" patch — about the size of a grain of sand held at arm’s length — filled with thousands of galaxies, each containing billions of stars. Scaled up to the whole sky, that result implies the observable universe holds something like two trillion galaxies. Almost every point of light in the image is an entire galaxy.',
  },
]
