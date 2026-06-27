import type { Lesson, LessonEntry } from './types'

import Content01 from './01-what-is-a-star/content.mdx'
import { quiz as quiz01 } from './01-what-is-a-star/quiz'
import Content02 from './02-the-solar-system/content.mdx'
import { quiz as quiz02 } from './02-the-solar-system/quiz'
import Content03 from './03-why-the-moon-has-phases/content.mdx'
import { quiz as quiz03 } from './03-why-the-moon-has-phases/quiz'
import Content04 from './04-mars-the-red-planet/content.mdx'
import { quiz as quiz04 } from './04-mars-the-red-planet/quiz'
import Content05 from './05-reading-the-night-sky/content.mdx'
import { quiz as quiz05 } from './05-reading-the-night-sky/quiz'

/** The ordered learning path. Available lessons render; planned ones show what's coming. */
export const lessons: LessonEntry[] = [
  {
    slug: 'what-is-a-star',
    order: 1,
    catalog: 'PLATE 01',
    title: 'What is a star?',
    summary:
      'The Sun up close: what a star is made of, why it shines, and why understanding one ordinary star explains most of the night sky.',
    objectives: [
      'Describe what a star is and what fuels it',
      'Explain how fusion turns mass into light',
      'Relate a star’s colour and lifespan to its mass',
    ],
    estMinutes: 7,
    readouts: [
      { label: 'Type', value: 'G2V' },
      { label: 'Surface', value: '5,500', unit: '°C' },
      { label: 'Age', value: '4.6', unit: 'Gyr' },
      { label: 'Distance', value: '1', unit: 'AU' },
    ],
    status: 'available',
    Content: Content01,
    quiz: quiz01,
  },
  {
    slug: 'the-solar-system',
    order: 2,
    catalog: 'PLATE 02',
    title: 'The solar system',
    summary:
      'Eight planets in two families, the Sun that rules them, and why the distances and sizes are stranger than they first appear.',
    objectives: [
      'Explain why the Sun dominates the Solar System',
      'Contrast the rocky inner planets with the outer giants',
      'Read distances and sizes in astronomical units',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Planets', value: '8' },
      { label: 'Sun’s mass', value: '99.8', unit: '%' },
      { label: 'Span', value: '30', unit: 'AU' },
      { label: 'Formed', value: '4.6', unit: 'Gyr ago' },
    ],
    tour: 'solar-system',
    status: 'available',
    Content: Content02,
    quiz: quiz02,
  },

  {
    slug: 'why-the-moon-has-phases',
    order: 3,
    catalog: 'PLATE 03',
    title: 'Why the Moon has phases',
    summary:
      'The Moon never changes shape — we just see different amounts of its lit half as it orbits. Plus what actually causes an eclipse.',
    objectives: [
      'Explain why the Moon shows phases',
      'Tell phases apart from eclipses',
      'Say why we only ever see one face of the Moon',
    ],
    estMinutes: 6,
    readouts: [
      { label: 'Distance', value: '384,400', unit: 'km' },
      { label: 'Phase cycle', value: '29.5', unit: 'days' },
      { label: 'Diameter', value: '3,475', unit: 'km' },
      { label: 'Gravity', value: '1.62', unit: 'm/s²' },
    ],
    status: 'available',
    Content: Content03,
    quiz: quiz03,
  },
  {
    slug: 'mars-the-red-planet',
    order: 4,
    catalog: 'PLATE 04',
    title: 'Mars, the red planet',
    summary:
      'A cold desert with the tallest volcano and the deepest canyon in the Solar System — and clear signs it once held rivers and lakes.',
    objectives: [
      'Explain why Mars is red and cold',
      'Describe its record-breaking terrain',
      'Weigh the evidence for past water',
    ],
    estMinutes: 8,
    readouts: [
      { label: 'Diameter', value: '6,779', unit: 'km' },
      { label: 'Distance', value: '1.52', unit: 'AU' },
      { label: 'Day', value: '24.6', unit: 'h' },
      { label: 'Moons', value: '2' },
    ],
    status: 'available',
    Content: Content04,
    quiz: quiz04,
  },
  {
    slug: 'reading-the-night-sky',
    order: 5,
    catalog: 'PLATE 05',
    title: 'Reading the night sky',
    summary:
      'Finding your way with constellations, magnitude, and coordinates — the same tools printed in the margin of every star atlas.',
    objectives: [
      'Read constellations as regions of the sky',
      'Use the (backwards) magnitude scale',
      'Locate any object with coordinates',
    ],
    estMinutes: 7,
    readouts: [
      { label: 'Constellations', value: '88' },
      { label: 'Naked-eye limit', value: '+6', unit: 'mag' },
      { label: 'Brightest star', value: 'Sirius' },
      { label: 'Nearest star', value: '4.2', unit: 'ly' },
    ],
    status: 'available',
    Content: Content05,
    quiz: quiz05,
  },
]

export function getLesson(slug: string): LessonEntry | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function isAvailable(entry: LessonEntry): entry is Lesson {
  return entry.status === 'available'
}
