import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'shine',
    prompt: 'Why can a star shine steadily for billions of years instead of burning out quickly like a fire?',
    options: [
      'It is made of a special fuel that never runs out',
      'Nuclear fusion converts a tiny fraction of its mass into enormous amounts of energy',
      'It reflects light from other nearby stars',
      'Its gravity produces light directly',
    ],
    answer: 1,
    explanation:
      'Stars fuse hydrogen into helium in their cores, and a small amount of mass is turned into energy (E = mc²). The Sun fuses about 600 million tonnes of hydrogen every second and still has billions of years of fuel left. A chemical fire releases far less energy per kilogram, so it cannot last.',
  },
  {
    id: 'colour',
    prompt: 'You see a blue star and a red star. Which one is hotter?',
    options: [
      'The red star — red is the colour of heat',
      'The blue star',
      'They are the same; colour depends only on distance',
      'It depends on size, not temperature',
    ],
    answer: 1,
    explanation:
      "Blue is hotter. A star's colour tracks its surface temperature: the hottest stars glow blue-white at 30,000 °C or more, while cool stars glow red at around 3,000 °C. It is the same physics as a flame, where the blue base is hotter than the orange tip. Our Sun, near 5,500 °C, sits in between.",
  },
  {
    id: 'balance',
    prompt: 'What stops a star from collapsing under its own gravity?',
    options: [
      'It is solid rock all the way through',
      'Outward pressure from fusion balances gravity pulling inward',
      'It spins fast enough to fling its material outward',
      'Nothing — every star is steadily collapsing',
    ],
    answer: 1,
    explanation:
      'A star is a standoff between two forces: gravity pulling inward and the pressure of fusion energy pushing outward. While they stay matched — hydrostatic equilibrium — the star holds its shape. When the fuel runs low and fusion weakens, gravity wins and the star begins to die.',
  },
  {
    id: 'classify',
    prompt: 'How is our Sun classified?',
    options: ['A red giant', 'A G-type main-sequence star', 'A white dwarf', 'A neutron star'],
    answer: 1,
    explanation:
      'The Sun is a G-type main-sequence star — a middle-of-the-road star steadily fusing hydrogen in its core. It will spend roughly ten billion years in this stage and is about halfway through.',
  },
]
