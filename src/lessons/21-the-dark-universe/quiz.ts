import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'fraction',
    prompt: 'Roughly what share of the universe is ordinary matter — the atoms in stars, planets, and people?',
    options: ['About 95%', 'About two-thirds', 'Under 5%', 'Exactly half'],
    answer: 2,
    explanation:
      'Everything made of atoms adds up to less than 5% of the universe. About 27% is dark matter and roughly 68% is dark energy — so the familiar, visible universe is only a thin sliver of everything that is out there.',
  },
  {
    id: 'dm-evidence',
    prompt: 'What is the main evidence that dark matter exists?',
    options: [
      'We have photographed it directly',
      'Galaxies spin so fast that visible matter alone could not hold them together',
      'It glows faintly in infrared light',
      'Spacecraft have flown through it',
    ],
    answer: 1,
    explanation:
      'Galaxies rotate far too quickly for the gravity of their visible stars and gas to keep them intact — they should fly apart. Some unseen mass must supply the extra gravity. The same conclusion follows from galaxy clusters, from gravitational lensing, and from the afterglow of the Big Bang.',
  },
  {
    id: 'dark-energy',
    prompt: 'What does dark energy appear to be doing to the universe?',
    options: [
      'Slowing its expansion until it stops',
      'Pushing its expansion to accelerate',
      'Holding galaxies together',
      'Heating up empty space',
    ],
    answer: 1,
    explanation:
      'In 1998, observations of distant supernovae showed the expansion is not slowing under gravity as expected — it is speeding up. Dark energy is the name for whatever is driving that acceleration, apparently a property of empty space itself. What it actually is remains unknown.',
  },
  {
    id: 'how-known',
    prompt: 'Since neither dark matter nor dark energy gives off light, how do we know they are there?',
    options: [
      'By their effects — the gravity that holds galaxies together and the acceleration of the expansion',
      'By the faint radio hiss they emit',
      'By sampling them with deep-space probes',
      'We do not; they are pure speculation with no evidence',
    ],
    answer: 0,
    explanation:
      'We detect both only through their effects. Dark matter reveals itself through the extra gravity needed to hold galaxies and clusters together; dark energy through the accelerating expansion of space. The evidence is strong and independent — even though what these things actually are is still a mystery.',
  },
]
