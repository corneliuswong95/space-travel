import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'red',
    prompt: 'Why is Mars red?',
    options: [
      'It is hot enough to glow red',
      'Its surface is rich in iron that has oxidised into rust (iron oxide)',
      'It reflects red light from the Sun more than other planets do',
      'Its two moons cast a reddish light on it',
    ],
    answer: 1,
    explanation:
      'Mars is red because its iron-rich soil has rusted — iron oxide, the same compound as everyday rust. Wind lifts the fine reddish dust into the air, colouring both the sky and the whole planet.',
  },
  {
    id: 'water',
    prompt: 'Why can’t liquid water survive on the surface of Mars today?',
    options: [
      'Mars is too far from the Sun for water to exist anywhere',
      'Its atmosphere is so thin and cold that water freezes or boils away almost at once',
      'There has never been any water on Mars',
      'The red dust soaks up all the water',
    ],
    answer: 1,
    explanation:
      'Mars’s atmosphere is under 1% as thick as Earth’s, and the surface averages about −65 °C. With so little pressure and warmth, exposed liquid water cannot last — it freezes or evaporates. Most of Mars’s water is now ice, at the poles and underground.',
  },
  {
    id: 'terrain',
    prompt: 'Olympus Mons and Valles Marineris grew to record-breaking sizes partly because Mars…',
    options: [
      'is larger than Earth',
      'has no moving tectonic plates to break up its landforms',
      'has far stronger gravity than Earth',
      'is made entirely of volcanic rock',
    ],
    answer: 1,
    explanation:
      'Earth’s surface is broken into drifting plates, which limits how large a single volcano or rift can grow. Mars has no such plate motion, so Olympus Mons could keep building in one spot for a very long time — reaching about 22 km tall.',
  },
  {
    id: 'life',
    prompt: 'Why is Mars such a focus in the search for past life?',
    options: [
      'Astronomers have detected radio signals coming from Mars',
      'There is clear evidence it once had lakes and rivers of liquid water',
      'It currently has the same climate as Earth',
      'Its moons are known to support life',
    ],
    answer: 1,
    explanation:
      'Rovers and orbiters have found dry riverbeds, deltas, and water-formed minerals — strong evidence that Mars once had standing and flowing water under a thicker atmosphere. On Earth, water goes hand in hand with life, so a wetter early Mars is the most promising place to look for signs it once existed.',
  },
]
