import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'pluto',
    prompt: 'Why was Pluto reclassified from a planet to a dwarf planet in 2006?',
    options: [
      'It turned out to be smaller than astronomers first thought',
      'It has not cleared its orbital neighbourhood of other objects',
      'It stopped orbiting the Sun',
      'It was found to be a captured comet',
    ],
    answer: 1,
    explanation:
      'The new definition requires a planet to orbit the Sun, be round, and have cleared its orbital neighbourhood. Pluto meets the first two but not the third — it shares the Kuiper Belt with countless other icy bodies. The change was really a recognition that Pluto is one of many similar worlds out beyond Neptune.',
  },
  {
    id: 'meteor-words',
    prompt: 'You watch a bright streak of light flash across the night sky. What is the correct name for that streak?',
    options: [
      'A meteorite',
      'A meteoroid',
      'A meteor',
      'A comet',
    ],
    answer: 2,
    explanation:
      'The streak of light itself is a meteor. Before it hit the atmosphere it was a meteoroid drifting in space, and if any fragment survives to land on the ground, that piece is a meteorite. Most meteors are made by specks no bigger than a grain of sand.',
  },
  {
    id: 'comet-tail',
    prompt: 'Why does a comet’s tail point away from the Sun instead of trailing behind the comet’s motion?',
    options: [
      'The tail is blown outward by sunlight and the solar wind',
      'The comet is always travelling directly away from the Sun',
      'The tail is pulled by the nearest planet’s gravity',
      'The tail always points back toward where the comet came from',
    ],
    answer: 0,
    explanation:
      'Sunlight and the stream of particles called the solar wind push the comet’s gas and dust outward, so the tail points away from the Sun no matter which way the comet is moving. On the outbound leg of its orbit, that means the comet is effectively chasing its own tail.',
  },
  {
    id: 'belt-myth',
    prompt: 'Is the asteroid belt a crowded, hazardous field that spacecraft must carefully weave through?',
    options: [
      'Yes — asteroids are packed so tightly that collisions are constant',
      'No — it is mostly empty, and spacecraft pass through without needing to dodge',
      'Yes — but only the inner edge near Mars is dangerous',
      'No — because there are actually very few asteroids in it',
    ],
    answer: 1,
    explanation:
      'There are millions of asteroids, but they are spread across such a vast volume that the belt is almost entirely empty space. Their combined mass is less than the Moon’s, and spacecraft fly straight through without any need to avoid them. The dense asteroid fields of films are fiction.',
  },
]
