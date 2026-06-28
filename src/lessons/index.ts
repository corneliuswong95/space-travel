import type { Lesson, LessonEntry } from './types'

import Content01 from './01-what-is-a-star/content.mdx'
import { quiz as quiz01 } from './01-what-is-a-star/quiz'
import Content02 from './02-the-solar-system/content.mdx'
import { quiz as quiz02 } from './02-the-solar-system/quiz'
import Content03 from './03-why-the-moon-has-phases/content.mdx'
import { quiz as quiz03 } from './03-why-the-moon-has-phases/quiz'
import Content04 from './04-mars-the-red-planet/content.mdx'
import { quiz as quiz04 } from './04-mars-the-red-planet/quiz'
import Content05 from './05-the-giant-planets/content.mdx'
import { quiz as quiz05 } from './05-the-giant-planets/quiz'
import Content06 from './06-comets-asteroids-and-dwarf-planets/content.mdx'
import { quiz as quiz06 } from './06-comets-asteroids-and-dwarf-planets/quiz'
import Content07 from './07-reading-the-night-sky/content.mdx'
import { quiz as quiz07 } from './07-reading-the-night-sky/quiz'
import Content08 from './08-how-stars-live-and-die/content.mdx'
import { quiz as quiz08 } from './08-how-stars-live-and-die/quiz'
import Content09 from './09-black-holes-and-neutron-stars/content.mdx'
import { quiz as quiz09 } from './09-black-holes-and-neutron-stars/quiz'
import Content10 from './10-the-milky-way-and-galaxies/content.mdx'
import { quiz as quiz10 } from './10-the-milky-way-and-galaxies/quiz'
import Content11 from './11-the-expanding-universe/content.mdx'
import { quiz as quiz11 } from './11-the-expanding-universe/quiz'
import Content12 from './12-space-time-and-light/content.mdx'
import { quiz as quiz12 } from './12-space-time-and-light/quiz'

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
    estMinutes: 9,
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
    estMinutes: 10,
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
      'The Moon never changes shape — we just see different amounts of its lit half as it orbits. Plus the tides it raises and what actually causes an eclipse.',
    objectives: [
      'Explain why the Moon shows phases',
      'Tell phases apart from eclipses',
      'Say why we only ever see one face of the Moon',
    ],
    estMinutes: 8,
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
    estMinutes: 10,
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
    slug: 'the-giant-planets',
    order: 5,
    catalog: 'PLATE 05',
    title: 'The giant planets',
    summary:
      'Four worlds with no surface: Jupiter’s centuries-old storm, Saturn’s paper-thin rings, Uranus tipped on its side, and the ocean moons that may hold life.',
    objectives: [
      'Tell gas giants from ice giants',
      'Explain why Saturn would float and Uranus rolls on its side',
      'Say why some giant moons are prime targets in the search for life',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Giant planets', value: '4' },
      { label: 'Jupiter mass', value: '318', unit: 'Earths' },
      { label: 'Great Red Spot', value: '350+', unit: 'yr' },
      { label: 'Known moons', value: '285' },
    ],
    status: 'available',
    Content: Content05,
    quiz: quiz05,
  },
  {
    slug: 'comets-asteroids-and-dwarf-planets',
    order: 6,
    catalog: 'PLATE 06',
    title: 'Comets, asteroids & dwarf planets',
    summary:
      'The rubble left over from building the planets — the near-empty asteroid belt, comets and their sunward tails, meteor showers, and why Pluto was reclassified.',
    objectives: [
      'Tell a meteoroid, meteor, and meteorite apart',
      'Explain why Pluto is now a dwarf planet',
      'Say where comets come from and why their tails point away from the Sun',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Asteroid belt', value: '2.2–3.2', unit: 'AU' },
      { label: 'Largest', value: 'Ceres' },
      { label: 'Pluto', value: '2,377', unit: 'km' },
      { label: 'Oort cloud', value: '~100,000', unit: 'AU' },
    ],
    status: 'available',
    Content: Content06,
    quiz: quiz06,
  },
  {
    slug: 'reading-the-night-sky',
    order: 7,
    catalog: 'PLATE 07',
    title: 'Reading the night sky',
    summary:
      'Finding your way with constellations, magnitude, and coordinates — the same tools printed in the margin of every star atlas, and why looking out is looking back.',
    objectives: [
      'Read constellations as regions of the sky',
      'Use the (backwards) magnitude scale',
      'Locate any object with coordinates',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Constellations', value: '88' },
      { label: 'Naked-eye limit', value: '+6', unit: 'mag' },
      { label: 'Brightest star', value: 'Sirius' },
      { label: 'Nearest star', value: '4.2', unit: 'ly' },
    ],
    status: 'available',
    Content: Content07,
    quiz: quiz07,
  },
  {
    slug: 'how-stars-live-and-die',
    order: 8,
    catalog: 'PLATE 08',
    title: 'How stars live and die',
    summary:
      'From a collapsing cloud to a white dwarf or a supernova: the life cycle of a star, why mass decides everything, and how the atoms in your body were forged.',
    objectives: [
      'Trace a star’s life from nebula to remnant',
      'Explain why mass determines how a star dies',
      'Say where the elements in your body were made',
    ],
    estMinutes: 11,
    readouts: [
      { label: 'Sun · fuel left', value: '~5', unit: 'Gyr' },
      { label: 'Supernova above', value: '8', unit: 'M☉' },
      { label: 'Heaviest fused', value: 'Iron' },
      { label: 'White dwarf', value: 'Earth-sized' },
    ],
    status: 'available',
    Content: Content08,
    quiz: quiz08,
  },
  {
    slug: 'black-holes-and-neutron-stars',
    order: 9,
    catalog: 'PLATE 09',
    title: 'Black holes & neutron stars',
    summary:
      'What gravity makes when a giant star dies: a city-sized neutron star, or a black hole whose horizon even light cannot cross — and how we map the invisible.',
    objectives: [
      'Describe a neutron star and a black hole’s event horizon',
      'Bust the myth that black holes “suck everything in”',
      'Explain how we detect objects we cannot see',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Neutron star', value: '~20', unit: 'km' },
      { label: 'Density', value: '1 billion', unit: 't/cm³' },
      { label: 'Black hole above', value: '3', unit: 'M☉' },
      { label: 'Sgr A*', value: '4 million', unit: 'M☉' },
    ],
    status: 'available',
    Content: Content09,
    quiz: quiz09,
  },
  {
    slug: 'the-milky-way-and-galaxies',
    order: 10,
    catalog: 'PLATE 10',
    title: 'The Milky Way & the galaxies',
    summary:
      'Our address in a barred spiral of hundreds of billions of stars, the black hole at its heart, the coming merger with Andromeda, and the two trillion galaxies beyond.',
    objectives: [
      'Explain what the band of the Milky Way actually is',
      'Place the Sun within the galaxy',
      'Grasp the scale from one star to two trillion galaxies',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Milky Way', value: '~100,000', unit: 'ly' },
      { label: 'Stars', value: '100–400', unit: 'billion' },
      { label: 'Galactic year', value: '230', unit: 'Myr' },
      { label: 'Galaxies', value: '~2', unit: 'trillion' },
    ],
    status: 'available',
    Content: Content10,
    quiz: quiz10,
  },
  {
    slug: 'the-expanding-universe',
    order: 11,
    catalog: 'PLATE 11',
    title: 'The expanding universe',
    summary:
      'Galaxies racing apart, space itself stretching, and the afterglow of the Big Bang still glowing in every direction — plus the dark 95% we cannot yet explain.',
    objectives: [
      'Explain what is actually expanding, and why there is no centre',
      'Say what the cosmic microwave background is',
      'State the age of the universe and how we know it',
    ],
    estMinutes: 11,
    readouts: [
      { label: 'Age', value: '13.8', unit: 'Gyr' },
      { label: 'Observable', value: '93', unit: 'billion ly' },
      { label: 'CMB temp', value: '−270', unit: '°C' },
      { label: 'Dark sector', value: '95', unit: '%' },
    ],
    status: 'available',
    Content: Content11,
    quiz: quiz11,
  },
  {
    slug: 'space-time-and-light',
    order: 12,
    catalog: 'PLATE 12',
    title: 'Space, time & light',
    summary:
      'One rule — light has a fixed speed — reshapes everything: telescopes as time machines, a cosmic speed limit, and gravity bending space and time itself.',
    objectives: [
      'Explain why looking out is looking back in time',
      'Say why nothing can outrun light',
      'Describe how gravity bends light and time',
    ],
    estMinutes: 11,
    readouts: [
      { label: 'Speed of light', value: '299,792', unit: 'km/s' },
      { label: 'Sun → Earth', value: '8.3', unit: 'min' },
      { label: 'Cosmic limit', value: 'c' },
      { label: 'GPS drift', value: '~10', unit: 'km/day' },
    ],
    status: 'available',
    Content: Content12,
    quiz: quiz12,
  },
]

export function getLesson(slug: string): LessonEntry | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function isAvailable(entry: LessonEntry): entry is Lesson {
  return entry.status === 'available'
}
