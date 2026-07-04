import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'biosignature',
    prompt: 'What is a "biosignature" in the search for life on other worlds?',
    options: [
      'A radio message deliberately sent by aliens',
      'A detectable sign — such as a telling mix of atmospheric gases — that is hard to sustain without life',
      'The fossil of an alien organism',
      'A planet that lies in the habitable zone',
    ],
    answer: 1,
    explanation:
      'A biosignature is an observable clue that life is present. A prime example is a combination of atmospheric gases, like oxygen together with methane, that would quickly disappear unless something kept replenishing it. We can look for such signs in the light passing through an exoplanet’s atmosphere.',
  },
  {
    id: 'extremophiles',
    prompt: 'Why do "extremophiles" — Earth life in boiling vents, acid, and radiation — matter to the search for life elsewhere?',
    options: [
      'They prove life came to Earth from space',
      'They show life can survive far harsher conditions than assumed, widening where it might exist',
      'They are the only life that could survive space travel',
      'They mean life needs no water after all',
    ],
    answer: 1,
    explanation:
      'Extremophiles demonstrate that life is far tougher and more adaptable than once believed, thriving where we assumed nothing could. That expands the range of environments — icy moons, harsh exoplanets — where life might plausibly take hold, and reshapes where and how we search.',
  },
  {
    id: 'read-atmosphere',
    prompt: 'How can we search for life on an exoplanet we can never visit or even see directly?',
    options: [
      'By waiting for the planet to send us a signal',
      'By reading the spectrum of starlight that filters through the planet’s atmosphere',
      'By measuring the planet’s gravity',
      'We cannot; distant exoplanets are beyond study',
    ],
    answer: 1,
    explanation:
      'As a planet passes in front of its star, a little starlight filters through its atmosphere and carries away that atmosphere’s spectral fingerprint. Splitting that light reveals which gases are present — and could expose a biosignature. Telescopes like JWST have begun doing exactly this.',
  },
  {
    id: 'drake',
    prompt: 'What is the Drake equation?',
    options: [
      'A proof that alien civilisations exist',
      'A framework that breaks "how many civilisations could we contact?" into factors we can try to estimate',
      'A formula giving the exact number of planets in the galaxy',
      'The equation describing a rocket’s fuel needs',
    ],
    answer: 1,
    explanation:
      'The Drake equation does not deliver an answer. It organises the question by splitting it into pieces — how many stars have planets, how many planets could host life, and so on — turning a vast unknown into a list of factors we can attempt to measure. It is a way to think clearly about our ignorance.',
  },
]
