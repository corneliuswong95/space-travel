import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'tidal-heating',
    prompt: 'How can a moon far from the Sun keep an ocean of liquid water?',
    options: [
      'Sunlight is focused onto it by its giant planet',
      'Its giant planet’s gravity flexes it, and that internal friction heats it from within',
      'It has active volcanoes fuelled by burning ice',
      'Its thick atmosphere traps enough of the Sun’s faint warmth',
    ],
    answer: 1,
    explanation:
      'The heat comes from inside, not from the Sun. As the moon orbits, its massive planet’s gravity repeatedly stretches and squeezes it, and that flexing warms the interior — a process called tidal heating. It can keep an ocean liquid beneath the ice even billions of kilometres from the Sun.',
  },
  {
    id: 'enceladus-sample',
    prompt: 'How did scientists learn that Enceladus’s hidden ocean contains salts and organic molecules?',
    options: [
      'A lander drilled through kilometres of ice to reach it',
      'The Cassini spacecraft flew through the plumes it sprays into space and analysed them',
      'Telescopes on Earth photographed the ocean directly',
      'They inferred it purely from the moon’s colour',
    ],
    answer: 1,
    explanation:
      'Enceladus jets fountains of water and ice into space through cracks at its south pole. The Cassini spacecraft flew straight through these plumes and sampled them — effectively tasting the hidden ocean from orbit, without ever landing — and found the salts and organic molecules that make it interesting for life.',
  },
  {
    id: 'titan-liquid',
    prompt: 'Titan has lakes, rivers, rain, and seas. What are they made of?',
    options: [
      'Liquid water, like Earth’s',
      'Molten rock',
      'Liquid methane and ethane',
      'Liquid nitrogen',
    ],
    answer: 2,
    explanation:
      'Titan is the only other world with stable liquid on its surface, but at about −180 °C that liquid cannot be water. Instead its lakes and rivers are liquid methane and ethane, topped up by methane rain from a hazy orange sky. A water ocean may still lie hidden deep below.',
  },
  {
    id: 'why-matter',
    prompt: 'Why do ocean worlds matter so much for the search for life?',
    options: [
      'They prove that life definitely exists beyond Earth',
      'They show liquid water — life’s key ingredient — can exist without sunlight, widening where life might be found',
      'They are the easiest places for humans to visit',
      'They are the only other places with oxygen',
    ],
    answer: 1,
    explanation:
      'Ocean worlds show that a warm, sunlit surface is not required for liquid water: tidal heating can maintain oceans far out in the cold, sealed under ice. That greatly expands the range of places life could plausibly exist — turning several icy moons into leading targets alongside Mars.',
  },
]
