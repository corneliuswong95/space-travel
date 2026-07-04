import type { QuizQuestion } from '@/components/quiz/types'

export const quiz: QuizQuestion[] = [
  {
    id: 'where-born',
    prompt: 'Where do stars form?',
    options: [
      'In the empty vacuum between galaxies',
      'Inside vast, cold, dense clouds of gas and dust',
      'At the centres of black holes',
      'In the outer atmosphere of an existing star',
    ],
    answer: 1,
    explanation:
      'Stars are born inside giant molecular clouds — cold, dark concentrations of gas and dust between the stars. Where such a cloud is dense enough, gravity pulls a clump together until it collapses into a new star. The Orion Nebula is a nearby example, forming thousands of stars right now.',
  },
  {
    id: 'disc-planets',
    prompt: 'As a star forms, what else takes shape around it — and why does that matter?',
    options: [
      'A ring of other stars, explaining why stars are bright',
      'A spinning disc of leftover material that can clump into planets',
      'A magnetic field that becomes the star’s energy source',
      'Nothing; planets form separately, long afterward',
    ],
    answer: 1,
    explanation:
      'The collapsing cloud spins up and flattens into a disc around the young star, and the leftover material in that disc clumps into planets. Because a star and its planets form from the same event, planets turn out to be common companions to stars.',
  },
  {
    id: 'clusters',
    prompt: 'Why are stars usually born in clusters rather than one at a time?',
    options: [
      'Stars attract each other and gather together after forming',
      'A single giant cloud is large enough to collapse into many stars at once',
      'One star must form before the next can begin',
      'Clusters are an illusion caused by distance',
    ],
    answer: 1,
    explanation:
      'The clouds that form stars are enormous, so a single one typically collapses into a whole batch of stars together — a cluster of siblings that share an age. They drift apart over millions of years. Our own Sun was born in such a cluster, now long dispersed.',
  },
  {
    id: 'trigger',
    prompt: 'Besides its own gravity, what can trigger a cloud to begin collapsing into stars?',
    options: [
      'The light of a full moon',
      'The shockwave from a nearby exploding star',
      'The cloud cooling below absolute zero',
      'A passing comet',
    ],
    answer: 1,
    explanation:
      'Gravity drives the collapse once a region is dense enough, but it often needs a push. The shockwave from a nearby supernova can compress a cloud and tip it over the edge into collapse — so the death of one star can help spark the birth of others.',
  },
]
