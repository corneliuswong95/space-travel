import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'constellation',
    prompt: 'The stars that make up a constellation are…',
    options: [
      'all roughly the same distance from Earth',
      'usually far apart in space, only appearing close together from our viewpoint',
      'physically connected to one another',
      'always part of the same star cluster',
    ],
    answer: 1,
    explanation:
      'A constellation is a chance alignment as seen from Earth. Its stars can lie tens or hundreds of light-years apart at very different distances — they just happen to fall along the same line of sight. The 88 constellations are now used mainly to divide the sky into named regions.',
  },
  {
    id: 'magnitude',
    prompt: 'On the magnitude scale, which star appears brightest?',
    options: [
      'A star of magnitude +6',
      'A star of magnitude +1',
      'A star of magnitude −1.5',
      'They are all equal; magnitude measures distance, not brightness',
    ],
    answer: 2,
    explanation:
      'The scale runs backwards — smaller and negative numbers are brighter. Magnitude −1.5 (about Sirius) is far brighter than +1, which is far brighter than +6 (near the naked-eye limit). Each magnitude step is roughly 2.5 times the brightness.',
  },
  {
    id: 'coordinates',
    prompt: 'Right ascension and declination are useful because they…',
    options: [
      'tell you how far away a star is',
      'give every object a fixed address on the sky, like latitude and longitude',
      'measure how bright an object is',
      'only work for objects inside our Solar System',
    ],
    answer: 1,
    explanation:
      'They map the sky as a sphere: declination is like latitude (in degrees), right ascension like longitude (in hours). Together they give any star, galaxy, or planet a precise address, so anyone with a chart can find the same point.',
  },
  {
    id: 'seasons',
    prompt: 'Why do we see different constellations in winter than in summer?',
    options: [
      'The constellations physically move across the galaxy each season',
      'Earth orbits the Sun, so at night we face a different direction in space through the year',
      'Stars are only visible when it is cold',
      'Earth’s spin reverses direction in summer',
    ],
    answer: 1,
    explanation:
      'As Earth orbits the Sun, the night side faces a different part of space each season, so the constellations overhead at midnight in winter give way to a different set in summer. Earth’s daily spin, separately, wheels the whole sky from east to west each night.',
  },
]
