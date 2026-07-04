import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'habitable-zone',
    prompt: 'What is the "habitable zone" around a star?',
    options: [
      'The region where a planet is safe from asteroid impacts',
      'The band of distances where a planet can hold liquid water on its surface',
      'The area where a planet has a breathable atmosphere',
      'The distance at which a planet becomes tidally locked',
    ],
    answer: 1,
    explanation:
      'The habitable zone is the range of distances from a star where it is neither so hot that water boils away nor so cold that it freezes solid — so liquid water can persist on the surface. Earth sits comfortably inside the Sun’s; Venus is too close, Mars a bit too far.',
  },
  {
    id: 'magnetic-shield',
    prompt: 'What does Earth’s magnetic field do that helps keep the planet habitable?',
    options: [
      'It generates most of the planet’s heat',
      'It deflects the solar wind, helping protect the atmosphere from being stripped away',
      'It holds the Moon in orbit',
      'It blocks all incoming sunlight’s harmful rays by itself',
    ],
    answer: 1,
    explanation:
      'Earth’s molten iron core generates a magnetic field that deflects the solar wind — the constant stream of particles from the Sun. This helps stop the atmosphere from being gradually blown away into space, a fate that likely befell Mars after its own core cooled and its magnetic field faded.',
  },
  {
    id: 'tectonics',
    prompt: 'Why does plate tectonics matter for Earth’s long-term climate?',
    options: [
      'It creates the tides',
      'It recycles carbon between rock, ocean, and air, acting as a slow thermostat',
      'It generates the planet’s magnetic field',
      'It keeps the planet’s axis from tipping over',
    ],
    answer: 1,
    explanation:
      'Drifting plates carry carbon down into the rock and release it through volcanoes, cycling it between stone, sea, and sky over millions of years. That slow exchange regulates the greenhouse effect and has helped hold Earth’s climate within a liveable range for billions of years.',
  },
  {
    id: 'stack-of-luck',
    prompt: 'The lesson describes Earth’s habitability as "a stack of luck." What does that mean?',
    options: [
      'Earth is habitable purely by random chance and could lose it any moment',
      'Several independent conditions all had to line up — distance, water, atmosphere, magnetic field, tectonics, and a large Moon',
      'Only one factor really matters: the distance from the Sun',
      'Earth’s life created all of the conditions itself',
    ],
    answer: 1,
    explanation:
      'No single feature makes Earth habitable. It is the combination — the right distance for liquid water, a warming and shielding atmosphere, a protective magnetic field, climate-regulating tectonics, and a stabilising Moon — all depending on one another. That interlocking checklist is what we now look for on worlds around other stars.',
  },
]
