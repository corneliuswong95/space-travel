import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'sunspots-dark',
    prompt: 'Sunspots look dark against the Sun. Why?',
    options: [
      'They are holes that go right through the Sun',
      'They are cooler than the surface around them, so they look dark by contrast',
      'They are clouds of dark dust floating above the surface',
      'They are shadows cast by the planets',
    ],
    answer: 1,
    explanation:
      'A sunspot is a patch where the magnetic field is strong enough to slow the heat rising from below, cooling it to about 4,000 °C. That is still fiercely bright — it only looks dark next to the 5,500 °C surface surrounding it. The darkness is a contrast effect, not an absence of light.',
  },
  {
    id: 'aurora',
    prompt: 'What causes the aurora — the northern and southern lights?',
    options: [
      'Sunlight reflecting off polar ice',
      'Charged particles from the Sun, funnelled by Earth’s magnetic field into the upper atmosphere near the poles',
      'Moonlight scattered by high clouds',
      'Heat escaping from inside the Earth',
    ],
    answer: 1,
    explanation:
      'Storms on the Sun send charged particles toward Earth. Our magnetic field steers them toward the poles, where they crash into gas high in the atmosphere and make it glow. That glow is the aurora — which is why it appears mainly near the north and south poles, and flares up after a solar storm.',
  },
  {
    id: 'space-weather',
    prompt: 'Why is a powerful solar storm a practical worry for a modern society, not just a pretty light show?',
    options: [
      'It can noticeably heat up the whole planet for weeks',
      'It can knock out satellites, radio, GPS, and power grids',
      'It increases the Sun’s gravity and shifts Earth’s orbit',
      'It blocks sunlight and causes sudden darkness',
    ],
    answer: 1,
    explanation:
      'A large storm floods Earth with charged particles and magnetic disturbance, which can damage satellites, scramble radio and GPS signals, and overload electrical grids. The 1859 Carrington Event made telegraph wires spark; an equally strong storm striking today’s electronics-dependent world could be enormously costly.',
  },
  {
    id: 'heliosphere',
    prompt: 'In what sense does Earth orbit "inside" the Sun’s atmosphere?',
    options: [
      'The Sun’s outer gas physically touches Earth’s surface',
      'The solar wind streams out past every planet, so the whole Solar System sits within the Sun’s outflow',
      'Earth is close enough to graze the Sun’s surface once a year',
      'It does not — the Sun’s atmosphere ends just above its surface',
    ],
    answer: 1,
    explanation:
      'The Sun constantly blows out a wind of charged particles that fills the Solar System far beyond Neptune, forming a giant bubble. The planets orbit within that outflow, so in a real sense they travel through the Sun’s extended atmosphere rather than simply near the Sun.',
  },
]
