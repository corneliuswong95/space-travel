import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'gas-vs-ice',
    prompt: 'Why are Jupiter and Saturn called gas giants, while Uranus and Neptune are ice giants?',
    options: [
      'Uranus and Neptune are frozen solid, so you could land on them',
      'Jupiter and Saturn are made mostly of hydrogen and helium, while Uranus and Neptune hold far more water, ammonia, and methane',
      'Jupiter and Saturn are hotter, which turns their ice into gas',
      'There is no real difference — the names are only historical',
    ],
    answer: 1,
    explanation:
      'It comes down to composition. Jupiter and Saturn are built almost entirely of the lightest elements, hydrogen and helium, like the Sun. Uranus and Neptune are smaller and contain much more water, ammonia, and methane — compounds astronomers loosely call "ices". None of the four has a solid surface to stand on.',
  },
  {
    id: 'ocean-moons',
    prompt: 'Why are moons like Jupiter’s Europa and Saturn’s Enceladus considered promising places to look for life?',
    options: [
      'They have thick, breathable, oxygen-rich atmospheres',
      'They are warm, sunlit worlds much like the early Earth',
      'They hold oceans of liquid water beneath their icy shells',
      'They are made of the same material as living cells',
    ],
    answer: 2,
    explanation:
      'Both moons hide oceans of liquid water under a crust of ice, kept liquid by heat generated within. Enceladus even sprays that water into space through cracks at its south pole. Liquid water is the one ingredient life as we know it cannot do without, which is why these moons draw so much attention.',
  },
  {
    id: 'saturn-density',
    prompt: 'Saturn is light enough for its size that it would float in water. Why is it so low in density?',
    options: [
      'It is hollow at the centre',
      'It is made mostly of hydrogen and helium, the lightest elements',
      'Its rings hold most of its weight',
      'It is much smaller than it looks',
    ],
    answer: 1,
    explanation:
      'Saturn is built almost entirely from hydrogen and helium, the two lightest elements, so despite its enormous size its average density is lower than water’s. It is the least dense planet in the Solar System — given a big enough ocean, it really would float.',
  },
  {
    id: 'uranus-tilt',
    prompt: 'Why does each pole of Uranus spend about 42 years in continuous daylight, then 42 in darkness?',
    options: [
      'It orbits the Sun extremely slowly because it is so far away',
      'It is tipped almost completely on its side, so it rolls around the Sun',
      'It stops spinning for decades at a time',
      'Its thick clouds block the Sun for half of each orbit',
    ],
    answer: 1,
    explanation:
      'Uranus has an axial tilt of about 98° — it is knocked over so far that it essentially rolls around its orbit rather than spinning upright. As a result, each pole points almost straight at the Sun for part of the 84-year orbit and straight away for another part, giving roughly 42 years of daylight and 42 of night.',
  },
]
