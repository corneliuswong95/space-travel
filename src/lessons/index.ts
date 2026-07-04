import type { Chapter, Lesson, LessonEntry } from './types'

import Content01 from './01-what-is-a-star/content.mdx'
import { quiz as quiz01 } from './01-what-is-a-star/quiz'
import Content02 from './02-the-living-sun/content.mdx'
import { quiz as quiz02 } from './02-the-living-sun/quiz'
import Content03 from './03-the-solar-system/content.mdx'
import { quiz as quiz03 } from './03-the-solar-system/quiz'
import Content04 from './04-mercury-and-venus/content.mdx'
import { quiz as quiz04 } from './04-mercury-and-venus/quiz'
import Content05 from './05-earth/content.mdx'
import { quiz as quiz05 } from './05-earth/quiz'
import Content06 from './06-why-the-moon-has-phases/content.mdx'
import { quiz as quiz06 } from './06-why-the-moon-has-phases/quiz'
import Content07 from './07-mars-the-red-planet/content.mdx'
import { quiz as quiz07 } from './07-mars-the-red-planet/quiz'
import Content08 from './08-the-giant-planets/content.mdx'
import { quiz as quiz08 } from './08-the-giant-planets/quiz'
import Content09 from './09-comets-asteroids-and-dwarf-planets/content.mdx'
import { quiz as quiz09 } from './09-comets-asteroids-and-dwarf-planets/quiz'
import Content10 from './10-ocean-worlds/content.mdx'
import { quiz as quiz10 } from './10-ocean-worlds/quiz'
import Content11 from './11-reading-the-night-sky/content.mdx'
import { quiz as quiz11 } from './11-reading-the-night-sky/quiz'
import Content12 from './12-telescopes-and-light/content.mdx'
import { quiz as quiz12 } from './12-telescopes-and-light/quiz'
import Content13 from './13-leaving-earth/content.mdx'
import { quiz as quiz13 } from './13-leaving-earth/quiz'
import Content14 from './14-star-nurseries/content.mdx'
import { quiz as quiz14 } from './14-star-nurseries/quiz'
import Content15 from './15-how-stars-live-and-die/content.mdx'
import { quiz as quiz15 } from './15-how-stars-live-and-die/quiz'
import Content16 from './16-black-holes-and-neutron-stars/content.mdx'
import { quiz as quiz16 } from './16-black-holes-and-neutron-stars/quiz'
import Content17 from './17-exoplanets/content.mdx'
import { quiz as quiz17 } from './17-exoplanets/quiz'
import Content18 from './18-the-search-for-life/content.mdx'
import { quiz as quiz18 } from './18-the-search-for-life/quiz'
import Content19 from './19-the-milky-way-and-galaxies/content.mdx'
import { quiz as quiz19 } from './19-the-milky-way-and-galaxies/quiz'
import Content20 from './20-the-expanding-universe/content.mdx'
import { quiz as quiz20 } from './20-the-expanding-universe/quiz'
import Content21 from './21-the-dark-universe/content.mdx'
import { quiz as quiz21 } from './21-the-dark-universe/quiz'
import Content22 from './22-space-time-and-light/content.mdx'
import { quiz as quiz22 } from './22-space-time-and-light/quiz'
import Content23 from './23-the-fate-of-the-universe/content.mdx'
import { quiz as quiz23 } from './23-the-fate-of-the-universe/quiz'

/** The parts of the learning path, in order. Lessons carry a matching `chapter` id. */
export const chapters: Chapter[] = [
  { id: 1, numeral: 'I', title: 'Our Sun', blurb: 'The one star we can study up close.' },
  { id: 2, numeral: 'II', title: 'The Solar System', blurb: 'Our neighbourhood, world by world.' },
  {
    id: 3,
    numeral: 'III',
    title: 'Reading the Sky',
    blurb: 'How we look, and how we have reached out.',
  },
  {
    id: 4,
    numeral: 'IV',
    title: 'The Lives of Stars',
    blurb: 'Beyond the Sun — birth, death, and other worlds.',
  },
  { id: 5, numeral: 'V', title: 'The Universe', blurb: 'The whole cosmos, and how it ends.' },
]

/** The ordered learning path. Available lessons render; planned ones show what's coming. */
export const lessons: LessonEntry[] = [
  {
    slug: 'what-is-a-star',
    order: 1,
    chapter: 1,
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
    slug: 'the-living-sun',
    order: 2,
    chapter: 1,
    catalog: 'PLATE 02',
    title: 'The living Sun',
    summary:
      'The Sun is not a steady lamp but a churning, magnetic star with weather of its own — sunspots, flares, and storms that light our skies and can disrupt life on Earth.',
    objectives: [
      'Explain why sunspots look dark',
      'Trace how a solar storm reaches Earth',
      'Say what causes the aurora',
    ],
    estMinutes: 8,
    readouts: [
      { label: 'Solar cycle', value: '11', unit: 'yr' },
      { label: 'Corona', value: '1–3 million', unit: '°C' },
      { label: 'Solar wind', value: '~400', unit: 'km/s' },
      { label: 'Sunspot', value: '~4,000', unit: '°C' },
    ],
    status: 'available',
    Content: Content02,
    quiz: quiz02,
  },
  {
    slug: 'the-solar-system',
    order: 3,
    chapter: 2,
    catalog: 'PLATE 03',
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
    Content: Content03,
    quiz: quiz03,
  },
  {
    slug: 'mercury-and-venus',
    order: 4,
    chapter: 2,
    catalog: 'PLATE 04',
    title: 'Mercury & Venus',
    summary:
      'The two worlds inside Earth’s orbit: a cratered, airless cinder with the wildest temperature swings in the Solar System, and a cloud-wrapped twin of Earth turned into its hottest furnace.',
    objectives: [
      'Explain Mercury’s extreme temperature swings',
      'Say why Venus is hotter than Mercury',
      'Describe a runaway greenhouse effect',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Mercury day/night', value: '430 / −180', unit: '°C' },
      { label: 'Venus surface', value: '464', unit: '°C' },
      { label: 'Venus pressure', value: '90', unit: '× Earth' },
      { label: 'Venus day', value: '243', unit: 'days' },
    ],
    status: 'available',
    Content: Content04,
    quiz: quiz04,
  },
  {
    slug: 'earth',
    order: 5,
    chapter: 2,
    catalog: 'PLATE 05',
    title: 'Earth — the world that got everything right',
    summary:
      'The only world we know with life, and the yardstick for all the others: liquid water, a protective atmosphere and magnetic shield, recycling tectonics, and a steadying Moon — habitability as a stack of luck.',
    objectives: [
      'Explain what the habitable zone is',
      'Say why Earth kept its water and air',
      'List the conditions that stack up to make Earth habitable',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Mean temp', value: '15', unit: '°C' },
      { label: 'Surface water', value: '71', unit: '%' },
      { label: 'Distance', value: '1', unit: 'AU' },
      { label: 'Moons', value: '1' },
    ],
    status: 'available',
    Content: Content05,
    quiz: quiz05,
  },
  {
    slug: 'why-the-moon-has-phases',
    order: 6,
    chapter: 2,
    catalog: 'PLATE 06',
    title: 'The Moon — phases, tides & eclipses',
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
    Content: Content06,
    quiz: quiz06,
  },
  {
    slug: 'mars-the-red-planet',
    order: 7,
    chapter: 2,
    catalog: 'PLATE 07',
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
    Content: Content07,
    quiz: quiz07,
  },
  {
    slug: 'the-giant-planets',
    order: 8,
    chapter: 2,
    catalog: 'PLATE 08',
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
    Content: Content08,
    quiz: quiz08,
  },
  {
    slug: 'comets-asteroids-and-dwarf-planets',
    order: 9,
    chapter: 2,
    catalog: 'PLATE 09',
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
    Content: Content09,
    quiz: quiz09,
  },
  {
    slug: 'ocean-worlds',
    order: 10,
    chapter: 2,
    catalog: 'PLATE 10',
    title: 'Ocean worlds',
    summary:
      'Beyond Mars, the best places to look for life may be icy moons — Europa, Enceladus, and Titan — where tidal heating keeps hidden oceans liquid far from the Sun’s warmth.',
    objectives: [
      'Explain how a moon far from the Sun keeps liquid water',
      'Say how Cassini sampled Enceladus’s hidden ocean',
      'Describe what makes Titan unlike any other world',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Europa ocean', value: '~2×', unit: 'Earth’s' },
      { label: 'Titan air', value: '1.5', unit: '× Earth' },
      { label: 'Titan surface', value: '−180', unit: '°C' },
      { label: 'Enceladus', value: 'sampled' },
    ],
    status: 'available',
    Content: Content10,
    quiz: quiz10,
  },
  {
    slug: 'reading-the-night-sky',
    order: 11,
    chapter: 3,
    catalog: 'PLATE 11',
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
    Content: Content11,
    quiz: quiz11,
  },
  {
    slug: 'telescopes-and-light',
    order: 12,
    chapter: 3,
    catalog: 'PLATE 12',
    title: 'Telescopes & the light we catch',
    summary:
      'Almost everything we know arrived as light. How telescopes gather it, why some must fly above the atmosphere, and how splitting light into a spectrum reveals what distant worlds are made of.',
    objectives: [
      'Say why bigger telescopes see more',
      'Explain why some telescopes must go to space',
      'Describe what a spectrum reveals about a distant object',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'JWST mirror', value: '6.5', unit: 'm' },
      { label: 'Hubble', value: '1990', unit: 'launched' },
      { label: 'JWST sees', value: 'infrared' },
      { label: 'Helium found', value: '1868' },
    ],
    status: 'available',
    Content: Content12,
    quiz: quiz12,
  },
  {
    slug: 'leaving-earth',
    order: 13,
    chapter: 3,
    catalog: 'PLATE 13',
    title: 'Leaving Earth',
    summary:
      'What it takes to leave the ground: why an orbit is really just falling, why rockets are almost all fuel, how probes slingshot off planets, and why robots explore before people.',
    objectives: [
      'Explain what keeps a satellite in orbit',
      'Say why rockets are mostly fuel',
      'Describe how a gravity assist speeds up a probe',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Orbit speed', value: '28,000', unit: 'km/h' },
      { label: 'Escape velocity', value: '11.2', unit: 'km/s' },
      { label: 'ISS altitude', value: '~400', unit: 'km' },
      { label: 'Voyager 1', value: '24 billion', unit: 'km' },
    ],
    status: 'available',
    Content: Content13,
    quiz: quiz13,
  },
  {
    slug: 'star-nurseries',
    order: 14,
    chapter: 4,
    catalog: 'PLATE 14',
    title: 'Star nurseries',
    summary:
      'Stars are still being born, in vast cold clouds of gas and dust. How gravity collapses a cloud into a new star — with a disc of planets forming alongside it — and why stars are born in family groups.',
    objectives: [
      'Say where and how stars are born',
      'Explain why stars form alongside planets',
      'Describe why stars are born in clusters',
    ],
    estMinutes: 9,
    readouts: [
      { label: 'Orion Nebula', value: '1,344', unit: 'ly' },
      { label: 'Ignition', value: '~10 million', unit: '°C' },
      { label: 'Nursery', value: 'molecular cloud' },
      { label: 'Born in', value: 'clusters' },
    ],
    status: 'available',
    Content: Content14,
    quiz: quiz14,
  },
  {
    slug: 'how-stars-live-and-die',
    order: 15,
    chapter: 4,
    catalog: 'PLATE 15',
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
    Content: Content15,
    quiz: quiz15,
  },
  {
    slug: 'black-holes-and-neutron-stars',
    order: 16,
    chapter: 4,
    catalog: 'PLATE 16',
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
    Content: Content16,
    quiz: quiz16,
  },
  {
    slug: 'exoplanets',
    order: 17,
    chapter: 4,
    catalog: 'PLATE 17',
    title: 'Other worlds — exoplanets',
    summary:
      'Until 1995 we knew of no planets beyond our own system; now we count thousands. How we detect worlds we cannot see, the strange variety we have found, and why most stars have planets.',
    objectives: [
      'Explain the transit and wobble methods',
      'Say why detecting exoplanets is hard',
      'Describe how common planets are in the galaxy',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Confirmed', value: '5,000+' },
      { label: 'First (Sun-like)', value: '1995' },
      { label: 'Nearest', value: 'Proxima b', unit: '4.2 ly' },
      { label: 'Main method', value: 'transit' },
    ],
    status: 'available',
    Content: Content17,
    quiz: quiz17,
  },
  {
    slug: 'the-search-for-life',
    order: 18,
    chapter: 4,
    catalog: 'PLATE 18',
    title: 'Are we alone?',
    summary:
      'The oldest question about the sky is becoming a real science: what life needs, where we search — from ocean moons to exoplanet air — and how we read light and listen for signals to find it.',
    objectives: [
      'List what life needs and where we look',
      'Explain how a biosignature reveals life from light',
      'Describe how science frames “are we alone?”',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Life beyond Earth', value: '0', unit: 'so far' },
      { label: 'Key ingredient', value: 'liquid water' },
      { label: 'Biosignature', value: 'oxygen + methane' },
      { label: 'Wow! signal', value: '1977' },
    ],
    status: 'available',
    Content: Content18,
    quiz: quiz18,
  },
  {
    slug: 'the-milky-way-and-galaxies',
    order: 19,
    chapter: 5,
    catalog: 'PLATE 19',
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
    Content: Content19,
    quiz: quiz19,
  },
  {
    slug: 'the-expanding-universe',
    order: 20,
    chapter: 5,
    catalog: 'PLATE 20',
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
    Content: Content20,
    quiz: quiz20,
  },
  {
    slug: 'the-dark-universe',
    order: 21,
    chapter: 5,
    catalog: 'PLATE 21',
    title: 'The dark universe',
    summary:
      'Everything we can see is under 5% of the cosmos. The evidence for the invisible rest — dark matter holding galaxies together, and dark energy pushing the expansion to accelerate — and why both remain unsolved.',
    objectives: [
      'Say what fraction of the universe is ordinary matter',
      'Give the evidence for dark matter',
      'Explain what dark energy does',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Ordinary matter', value: '~5', unit: '%' },
      { label: 'Dark matter', value: '~27', unit: '%' },
      { label: 'Dark energy', value: '~68', unit: '%' },
      { label: 'Expansion', value: 'accelerating' },
    ],
    status: 'available',
    Content: Content21,
    quiz: quiz21,
  },
  {
    slug: 'space-time-and-light',
    order: 22,
    chapter: 5,
    catalog: 'PLATE 22',
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
    Content: Content22,
    quiz: quiz22,
  },
  {
    slug: 'the-fate-of-the-universe',
    order: 23,
    chapter: 5,
    catalog: 'PLATE 23',
    title: 'How it all ends',
    summary:
      'The universe had a beginning; does it have an end? Why the leading fate is a slow fade to cold and dark, the alternatives, and why we happen to live in the cosmos’s brief, bright morning.',
    objectives: [
      'Say what decides the universe’s fate',
      'Describe the “heat death” scenario',
      'Explain why we live in the universe’s early era',
    ],
    estMinutes: 10,
    readouts: [
      { label: 'Universe now', value: '13.8', unit: 'Gyr' },
      { label: 'Last stars fade', value: '~100', unit: 'trillion yr' },
      { label: 'Likely fate', value: 'heat death' },
      { label: 'Black holes', value: 'evaporate' },
    ],
    status: 'available',
    Content: Content23,
    quiz: quiz23,
  },
]

export function getLesson(slug: string): LessonEntry | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function isAvailable(entry: LessonEntry): entry is Lesson {
  return entry.status === 'available'
}
