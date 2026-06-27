/*
 * Static facts for the Sun and the eight planets. This is the source of truth: it renders
 * instantly, works offline, and has no rate limits. Live NASA data is layered on top elsewhere.
 *
 * Figures are widely-accepted approximate values. Moon counts are "known moons" and drift as
 * new ones are confirmed. Negative rotation = retrograde (spins opposite to its orbit).
 */

export type BodyCategory = 'star' | 'terrestrial' | 'gas giant' | 'ice giant'

export interface Body {
  id: string
  name: string
  symbol: string
  category: BodyCategory
  /** Distance order from the Sun; the Sun is 0. */
  order: number
  diameterKm: number
  /** Mass relative to Earth (Earth = 1). */
  massEarths: number
  /** Mean distance from the Sun, in astronomical units. */
  distanceAu: number
  /** Mean distance from the Sun, in millions of kilometres. */
  distanceKmMillions: number
  /** Orbital period (one "year"), in Earth days. */
  orbitalPeriodDays: number
  /** Rotation period (one "day"), in hours. Negative = retrograde. */
  rotationHours: number
  meanTempC: number
  moons: number
  /** Surface gravity, m/s². */
  gravity: number
  /** Representative colour for UI (dots, chart bars). */
  color: string
  blurb: string
}

export const bodies: Body[] = [
  {
    id: 'sun',
    name: 'Sun',
    symbol: '☉',
    category: 'star',
    order: 0,
    diameterKm: 1_391_000,
    massEarths: 333_000,
    distanceAu: 0,
    distanceKmMillions: 0,
    orbitalPeriodDays: 0,
    rotationHours: 609.12,
    meanTempC: 5505,
    moons: 0,
    gravity: 274,
    color: '#e8a33d',
    blurb:
      'A G-type main-sequence star — statistically ordinary, and the reason anything here is warm. It holds about 99.8% of the Solar System’s mass, which is why everything else orbits it.',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    category: 'terrestrial',
    order: 1,
    diameterKm: 4879,
    massEarths: 0.055,
    distanceAu: 0.39,
    distanceKmMillions: 57.9,
    orbitalPeriodDays: 88,
    rotationHours: 1407.6,
    meanTempC: 167,
    moons: 0,
    gravity: 3.7,
    color: '#9c9183',
    blurb:
      'The smallest planet and the closest to the Sun. With almost no atmosphere to carry heat around, the gap between its day and night temperatures is the most extreme of any planet.',
  },
  {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    category: 'terrestrial',
    order: 2,
    diameterKm: 12_104,
    massEarths: 0.815,
    distanceAu: 0.72,
    distanceKmMillions: 108.2,
    orbitalPeriodDays: 224.7,
    rotationHours: -5832.5,
    meanTempC: 464,
    moons: 0,
    gravity: 8.87,
    color: '#d8b870',
    blurb:
      'Almost Earth’s twin in size, but a runaway greenhouse effect traps heat so effectively that it is the hottest planet — hotter than Mercury, despite being nearly twice as far from the Sun.',
  },
  {
    id: 'earth',
    name: 'Earth',
    symbol: '♁',
    category: 'terrestrial',
    order: 3,
    diameterKm: 12_742,
    massEarths: 1,
    distanceAu: 1,
    distanceKmMillions: 149.6,
    orbitalPeriodDays: 365.25,
    rotationHours: 23.9,
    meanTempC: 15,
    moons: 1,
    gravity: 9.81,
    color: '#4f7cac',
    blurb:
      'The only world we know of with liquid water at its surface and life. It is the baseline every other planet here is measured against.',
  },
  {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    category: 'terrestrial',
    order: 4,
    diameterKm: 6779,
    massEarths: 0.107,
    distanceAu: 1.52,
    distanceKmMillions: 227.9,
    orbitalPeriodDays: 687,
    rotationHours: 24.6,
    meanTempC: -65,
    moons: 2,
    gravity: 3.71,
    color: '#b0552f',
    blurb:
      'A cold desert world about half Earth’s width. Dry riverbeds and buried ice show it was once warmer and wetter — which is why so many missions go looking there.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    category: 'gas giant',
    order: 5,
    diameterKm: 139_820,
    massEarths: 317.8,
    distanceAu: 5.2,
    distanceKmMillions: 778.5,
    orbitalPeriodDays: 4333,
    rotationHours: 9.9,
    meanTempC: -110,
    moons: 95,
    gravity: 24.79,
    color: '#c9a06a',
    blurb:
      'The largest planet — more massive than twice all the others combined. Its Great Red Spot is a storm wider than Earth that has lasted for centuries.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    category: 'gas giant',
    order: 6,
    diameterKm: 116_460,
    massEarths: 95.2,
    distanceAu: 9.54,
    distanceKmMillions: 1434,
    orbitalPeriodDays: 10_759,
    rotationHours: 10.7,
    meanTempC: -140,
    moons: 146,
    gravity: 10.44,
    color: '#d8c89a',
    blurb:
      'Circled by the brightest ring system in the Solar System — billions of pieces of ice, spanning a width greater than the Earth–Moon distance yet only tens of metres thick.',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    symbol: '⛢',
    category: 'ice giant',
    order: 7,
    diameterKm: 50_724,
    massEarths: 14.5,
    distanceAu: 19.19,
    distanceKmMillions: 2871,
    orbitalPeriodDays: 30_687,
    rotationHours: -17.2,
    meanTempC: -195,
    moons: 28,
    gravity: 8.69,
    color: '#9fd3da',
    blurb:
      'An ice giant tipped almost completely on its side, so it travels its orbit rolling rather than spinning upright. Each pole gets roughly 42 years of continuous daylight, then 42 of night.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    symbol: '♆',
    category: 'ice giant',
    order: 8,
    diameterKm: 49_244,
    massEarths: 17.1,
    distanceAu: 30.07,
    distanceKmMillions: 4495,
    orbitalPeriodDays: 60_190,
    rotationHours: 16.1,
    meanTempC: -200,
    moons: 16,
    gravity: 11.15,
    color: '#4f6dce',
    blurb:
      'The farthest planet and the windiest, with the fastest winds in the Solar System despite receiving almost no sunlight. It was found by mathematics — predicted from Uranus’s orbit before anyone saw it.',
  },
]

export const sun: Body = bodies.find((b) => b.id === 'sun')!
export const planets: Body[] = bodies.filter((b) => b.category !== 'star')

export function getBody(id: string): Body | undefined {
  return bodies.find((b) => b.id === id)
}
