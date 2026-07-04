import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'orbit-is-falling',
    prompt: 'What actually keeps a satellite up in orbit?',
    options: [
      'There is no gravity that high above the Earth',
      'It is moving sideways so fast that it continually falls around the Earth and keeps missing it',
      'The Sun’s pull cancels out Earth’s gravity',
      'Its engines fire constantly to hold it up',
    ],
    answer: 1,
    explanation:
      'An orbit is really continuous falling. A satellite moves sideways so quickly that, as it falls, the Earth’s surface curves away beneath it just as fast — so it never reaches the ground. There is still plenty of gravity up there; the satellite is simply falling around the planet forever.',
  },
  {
    id: 'rockets-fuel',
    prompt: 'Why is a rocket made up almost entirely of fuel by mass?',
    options: [
      'Fuel is cheap, so engineers use as much as possible',
      'It must carry all its own propellant and reach enormous speed, and extra fuel adds weight that needs still more fuel',
      'The fuel is what makes it float once in space',
      'Most of the fuel is never actually used',
    ],
    answer: 1,
    explanation:
      'A rocket has to reach roughly 28,000 km/h just to orbit, hurling its own propellant downward to push up. That creates a punishing loop: more fuel means more weight to lift, which demands still more fuel. The result is a vehicle that is mostly propellant, shedding empty stages as it climbs.',
  },
  {
    id: 'gravity-assist',
    prompt: 'What does a "gravity assist" do for a spacecraft?',
    options: [
      'It uses a planet’s gravity to slow the craft down for landing',
      'It lets the craft borrow some of a planet’s orbital motion to gain speed without using fuel',
      'It generates artificial gravity for the crew',
      'It shields the craft from a planet’s radiation',
    ],
    answer: 1,
    explanation:
      'By swinging close past a moving planet, a spacecraft steals a small share of that planet’s motion around the Sun and is flung onward faster — no fuel required. Voyager used a series of these slingshots to tour the outer planets, gaining the speed it could never have carried as fuel.',
  },
  {
    id: 'robots-first',
    prompt: 'Why have robotic spacecraft explored far more of the Solar System than human astronauts?',
    options: [
      'Robots can travel faster than any crewed craft',
      'Robots need no air, food, or return trip, cost far less, and can survive for years in deadly places',
      'Humans are not allowed to leave Earth orbit by law',
      'Robots are unaffected by gravity',
    ],
    answer: 1,
    explanation:
      'People need air, water, food, warmth, radiation shielding, and a way home — all heavy and expensive to carry. Robots need none of that, can be one-way, and endure for years in environments that would kill a human in minutes. That is why probes and rovers have reached every planet while people have gone only as far as the Moon.',
  },
]
