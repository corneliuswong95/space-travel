import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'transit',
    prompt: 'How does the transit method reveal a planet around a distant star?',
    options: [
      'It photographs the planet directly',
      'It measures the small, regular dip in the star’s brightness as the planet passes in front of it',
      'It listens for radio signals from the planet',
      'It detects the planet’s heat against the cold of space',
    ],
    answer: 1,
    explanation:
      'When a planet’s orbit is lined up so it crosses in front of its star from our viewpoint, it blocks a tiny fraction of the light, dimming the star slightly and on a regular schedule. The depth of the dip reveals the planet’s size and its rhythm reveals the orbit. Kepler and TESS found thousands of planets this way.',
  },
  {
    id: 'hard-to-see',
    prompt: 'Why do astronomers almost never see an exoplanet directly?',
    options: [
      'Exoplanets give off no light or heat at all',
      'A planet is tiny and dim, lost in the overwhelming glare of its nearby star',
      'They move too fast to photograph',
      'The atmosphere of Earth hides them completely',
    ],
    answer: 1,
    explanation:
      'A planet is small and faint, and it sits right next to a star that outshines it enormously and is trillions of kilometres away. Picking the planet out of that glare is extraordinarily hard, which is why most exoplanets are found indirectly — by the dip or wobble they cause in their star.',
  },
  {
    id: 'how-common',
    prompt: 'What have thousands of discoveries taught us about how common planets are?',
    options: [
      'Planets are rare; most stars have none',
      'Only Sun-like stars have planets',
      'Most stars have planets, so the galaxy likely holds billions',
      'Planets exist only in our own Solar System',
    ],
    answer: 2,
    explanation:
      'The surveys revealed that planets are the rule, not the exception — most stars host at least one. That implies our galaxy alone contains billions of planets, quite possibly outnumbering the stars, including many rocky worlds in their star’s habitable zone.',
  },
  {
    id: 'wobble',
    prompt: 'The radial-velocity (wobble) method finds a planet by detecting what?',
    options: [
      'The planet blocking the star’s light',
      'The tiny back-and-forth wobble the planet’s gravity causes in its star',
      'Heat radiating from the planet’s surface',
      'The planet’s magnetic field',
    ],
    answer: 1,
    explanation:
      'A planet’s gravity tugs on its star, pulling it into a small back-and-forth motion. That wobble shows up as a rhythmic shift in the star’s spectrum — using the same light-splitting technique that tells us what stars are made of. It was the method behind the first exoplanet found around a Sun-like star.',
  },
]
