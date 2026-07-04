import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'mercury-swings',
    prompt: 'Why does Mercury have the most extreme swing between day and night temperatures of any planet?',
    options: [
      'It spins so fast that one side never cools',
      'It has almost no atmosphere to hold heat or carry it to the night side',
      'It is tilted so far that one pole always faces the Sun',
      'Its surface is made of a material that overheats easily',
    ],
    answer: 1,
    explanation:
      'An atmosphere spreads heat around a planet and holds onto it after dark. Mercury has almost none, so the sunlit side bakes to around 430 °C while the night side plunges to about −180 °C. With no air to move or trap heat, nothing evens out the difference.',
  },
  {
    id: 'venus-hotter',
    prompt: 'Venus is nearly twice as far from the Sun as Mercury, yet it is the hottest planet. Why?',
    options: [
      'It is closer to the Sun for half of its orbit',
      'Its thick carbon-dioxide atmosphere traps heat in a runaway greenhouse effect',
      'It has active volcanoes covering the whole surface',
      'It generates its own heat from within, like a small star',
    ],
    answer: 1,
    explanation:
      'Venus is wrapped in a dense carbon-dioxide atmosphere that traps heat far more effectively than Mercury’s near-vacuum. This runaway greenhouse effect drives the surface to about 464 °C — hotter than Mercury despite Venus being much farther from the Sun. Atmosphere, not just distance, sets a planet’s temperature.',
  },
  {
    id: 'runaway',
    prompt: 'What makes a greenhouse effect a "runaway" one, as on Venus?',
    options: [
      'The planet moves away from the Sun over time',
      'Trapped heat drives even more heat-trapping gas into the air, which traps still more heat',
      'The atmosphere suddenly escapes into space',
      'The Sun grows hotter and hotter',
    ],
    answer: 1,
    explanation:
      'In a runaway greenhouse, warming feeds itself: heat trapped by the atmosphere pushes more greenhouse gas into the air, which traps yet more heat, and so on. On Venus this cycle drove the surface to extreme temperatures and left the planet permanently baked.',
  },
  {
    id: 'mercury-ice',
    prompt: 'Mercury is the closest planet to the Sun, yet it has patches of ice. How is that possible?',
    options: [
      'The ice is actually frozen carbon dioxide, not water',
      'The floors of some polar craters lie in permanent shadow and never receive sunlight',
      'The ice forms fresh each night and melts by day',
      'Comets constantly resupply it faster than it melts',
    ],
    answer: 1,
    explanation:
      'Mercury barely tilts on its axis, so the deep floors of some craters near its poles never catch the Sun. In that permanent shadow, temperatures stay low enough for water ice to survive — only metres from surfaces hot enough to melt lead.',
  },
]
