import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'event-horizon',
    prompt: 'What is the event horizon of a black hole?',
    options: [
      'The solid surface of the black hole',
      'The boundary beyond which nothing, not even light, can escape',
      'The glowing disc of gas spiralling into it',
      'The point where the black hole ends and normal space begins again, with no special properties',
    ],
    answer: 1,
    explanation:
      'The event horizon is not a surface but a boundary in space: the line past which the speed needed to escape is greater than the speed of light. Cross it and there is no way back. Stay outside and you feel only ordinary gravity.',
  },
  {
    id: 'not-a-vacuum',
    prompt: 'If the Sun were swapped for a black hole of exactly the same mass, what would happen to Earth’s orbit?',
    options: [
      'Earth would immediately be pulled in',
      'Earth would be flung out of the Solar System',
      'Earth would keep orbiting exactly as before',
      'Earth would slowly spiral inward over a few years',
    ],
    answer: 2,
    explanation:
      'Gravity depends on mass and distance, not on whether an object is a black hole. With the same mass at the same distance, Earth would orbit precisely as it does now — it would just be dark and cold. Black holes are not cosmic vacuum cleaners; they only trap things that get very close.',
  },
  {
    id: 'detect',
    prompt: 'If light cannot escape a black hole, how do astronomers detect one?',
    options: [
      'By the way the black hole reflects sunlight',
      'By its effects — orbiting stars, X-rays from infalling gas, and gravitational waves',
      'They cannot; black holes are purely theoretical',
      'By listening for the sound it makes',
    ],
    answer: 1,
    explanation:
      'We find black holes by what they do to their surroundings: stars whipping around an unseen mass, gas heated to millions of degrees and glowing in X-rays as it falls in, and ripples in space — gravitational waves — when black holes collide. In 2019 these methods were joined by the first direct image of a black hole’s silhouette.',
  },
  {
    id: 'pulsar',
    prompt: 'A pulsar sends us extremely regular, rapid pulses of radiation. What is actually producing them?',
    options: [
      'A black hole switching on and off',
      'A spinning neutron star sweeping a beam of radiation past Earth',
      'Two stars eclipsing each other',
      'A signal deliberately sent by another civilisation',
    ],
    answer: 1,
    explanation:
      'A pulsar is a neutron star spinning very fast — sometimes hundreds of times a second — with beams of radiation streaming from its poles. Each time a beam sweeps across Earth, like a lighthouse, we register a pulse. The pulses are so regular that the first one discovered was briefly nicknamed "LGM", for "little green men".',
  },
]
