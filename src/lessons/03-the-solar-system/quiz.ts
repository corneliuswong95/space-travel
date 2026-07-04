import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'two-families',
    prompt: 'Why are the inner planets rocky while the outer planets are giant balls of gas and ice?',
    options: [
      "The Sun's gravity pulled all the gas out to the edge of the Solar System",
      'Near the young Sun it was too hot for ice to form, so only rock and metal could clump together; beyond the frost line, ice was plentiful',
      'The outer planets are much older than the inner ones',
      'Gas naturally rises, so it floated to the outer Solar System',
    ],
    answer: 1,
    explanation:
      'Temperature in the early Solar System set the pattern. Close to the Sun, only rock and metal survived the heat, so the inner planets stayed small and rocky. Beyond the frost line it was cold enough for ice, and those planets grew massive enough to also capture huge amounts of gas. Same raw material, different starting temperatures.',
  },
  {
    id: 'mercury-swing',
    prompt: 'Mercury has the most extreme swing between day and night temperatures of any planet. What is the main reason?',
    options: [
      'It is the closest planet to the Sun',
      'It has almost no atmosphere to carry heat from the day side to the night side',
      'It spins faster than any other planet',
      'It is made of metal, which cannot hold heat',
    ],
    answer: 1,
    explanation:
      'Being closest plays a part, but the real reason is the lack of an atmosphere. On Earth, air moves heat around the planet and traps some overnight. Mercury has almost none, so its sunlit side bakes while the dark side dumps its heat straight to space — a swing of hundreds of degrees. Venus, with a thick atmosphere, stays nearly the same temperature everywhere.',
  },
  {
    id: 'au',
    prompt: 'One astronomical unit (AU) is defined as:',
    options: [
      'The distance light travels in one year',
      'The average distance from the Earth to the Sun',
      'The distance from the Sun to the edge of the Solar System',
      'The diameter of the Sun',
    ],
    answer: 1,
    explanation:
      'One AU is the average Earth–Sun distance, about 150 million kilometres — a convenient ruler for the Solar System, where Neptune orbits at roughly 30 AU. A light-year is something else entirely: a far larger distance used for measuring between stars, not within one system.',
  },
  {
    id: 'mass-share',
    prompt: "The Sun holds 99.8% of the Solar System's mass. What does that tell you?",
    options: [
      'The Sun is brighter than everything else put together',
      'All the planets, moons, and asteroids combined make up only about 0.2% of the total',
      'The Sun is 99.8% of the way through its life',
      '99.8% of the Solar System is empty space',
    ],
    answer: 1,
    explanation:
      "This is about mass, not brightness or volume. Add up every planet, moon, comet, and asteroid and you reach only about 0.2% of the Solar System's mass — the Sun is essentially all of it. That is why the Sun's gravity governs every orbit.",
  },
]
