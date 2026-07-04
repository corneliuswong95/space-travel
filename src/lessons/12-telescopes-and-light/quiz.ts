import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'bigger-better',
    prompt: 'Why do astronomers keep building telescopes with ever-larger mirrors?',
    options: [
      'A larger mirror makes objects appear closer',
      'A larger mirror gathers more light, revealing fainter, more distant objects and finer detail',
      'A larger mirror is needed to magnify more',
      'Bigger mirrors are easier to point accurately',
    ],
    answer: 1,
    explanation:
      'A telescope is fundamentally a light-collector. The bigger its mirror, the more light it captures, so it can detect fainter and more distant objects and resolve finer detail. Gathering light — not raw magnification — is what lets telescopes reach deep into the universe.',
  },
  {
    id: 'space-telescopes',
    prompt: 'Why are telescopes like Hubble and JWST placed in space rather than on a mountaintop?',
    options: [
      'To get physically closer to the stars',
      'Because the atmosphere blurs starlight and blocks much of the spectrum',
      'Because there is no gravity to distort the mirror',
      'To avoid light from cities on the ground',
    ],
    answer: 1,
    explanation:
      'Earth’s atmosphere smears starlight into a twinkle and absorbs most ultraviolet, X-ray, and much infrared light before it reaches the ground. Rising above the air gives sharper images and opens up the wavelengths the atmosphere blocks. (Being in space brings a telescope no meaningfully closer to stars light-years away.)',
  },
  {
    id: 'spectrum-reveals',
    prompt: 'When astronomers split a star’s light into a spectrum, what can they learn from the pattern of lines?',
    options: [
      'Only how bright the star is',
      'What it is made of, how hot it is, and how fast it is moving',
      'Nothing — the lines are just an artifact of the instrument',
      'The exact age of the observer’s galaxy',
    ],
    answer: 1,
    explanation:
      'Each element imprints its own pattern of lines on a spectrum, so the lines reveal a star’s composition. Their exact positions and spread also encode its temperature and its motion toward or away from us. Spectroscopy is how we know what the stars are made of without ever visiting one.',
  },
  {
    id: 'spectrum-range',
    prompt: 'How does the visible light our eyes detect relate to the rest of the electromagnetic spectrum?',
    options: [
      'Visible light is the whole spectrum',
      'Visible light is a narrow slice; objects also shine in radio, infrared, X-rays, and more',
      'Visible light is the only kind telescopes can detect',
      'The other kinds of light do not exist in space',
    ],
    answer: 1,
    explanation:
      'Visible light is just a thin band of the full electromagnetic spectrum, which runs from radio waves to gamma rays. Different objects shine in different bands — cool gas in radio and infrared, violent hot matter in X-rays — so astronomers build a different kind of telescope for each, to see the whole picture.',
  },
]
