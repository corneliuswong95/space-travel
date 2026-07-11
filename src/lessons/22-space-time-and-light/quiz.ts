import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'looking-back',
    prompt: 'Why is looking at a distant galaxy the same as looking back in time?',
    options: [
      'Distant galaxies are physically older than nearby ones',
      'Light takes time to travel, so we see the galaxy as it was when its light left',
      'Telescopes are built to reverse time',
      'Space curves the past into view',
    ],
    answer: 1,
    explanation:
      'Light is fast but not instant, so its journey takes time — eight minutes from the Sun, years from nearby stars, billions of years from distant galaxies. The light arriving now left long ago, so we always see objects as they were, never as they are. Every telescope is, in effect, a time machine.',
  },
  {
    id: 'gps',
    prompt: 'Why does the GPS in your phone have to account for Einstein’s relativity?',
    options: [
      'Satellites are too far away for ordinary signals to reach',
      'The satellites’ clocks tick at a slightly different rate, and ignoring it would make positions drift',
      'Relativity makes the radio signals travel faster',
      'It does not — GPS has nothing to do with relativity',
    ],
    answer: 1,
    explanation:
      'The GPS satellites move quickly and sit higher in Earth’s gravity, so their clocks run at a slightly different rate from clocks on the ground. GPS works by timing signals precisely, so if these tiny relativistic effects were ignored, your calculated position would drift by about 10 kilometres a day.',
  },
  {
    id: 'lensing',
    prompt: 'Einstein said gravity bends space and time. What did the 1919 solar eclipse confirm about light?',
    options: [
      'That light slows down near the Sun',
      'That light from behind the Sun is swallowed by it',
      'That starlight passing close to the Sun is bent by its gravity',
      'That the Sun gives off no light during an eclipse',
    ],
    answer: 2,
    explanation:
      'During the eclipse, astronomers could see stars whose light grazed the Sun, and those stars appeared shifted — the Sun’s gravity had bent their light by close to the amount Einstein predicted, far more than Newton’s gravity alone allowed. This bending of light by gravity, called gravitational lensing, is now a working tool astronomers use to weigh galaxies and to see objects hidden behind them.',
  },
  {
    id: 'speed-limit',
    prompt: 'Could a future spacecraft, with a powerful enough engine, travel faster than light?',
    options: [
      'Yes, with enough fuel and a good enough engine',
      'No — the speed of light is the universe’s absolute speed limit',
      'Yes, but only in deep space far from any star',
      'Only if it first travelled back in time',
    ],
    answer: 1,
    explanation:
      'The speed of light is not a limit of our technology but of reality itself. As anything with mass is pushed closer to light speed, it takes ever more energy, and reaching the limit would require an infinite amount. Nothing carrying matter or information can match light, let alone beat it.',
  },
]
