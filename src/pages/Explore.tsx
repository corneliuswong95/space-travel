import { lazy, Suspense } from 'react'

import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import styles from './Explore.module.css'

const ExploreSandbox = lazy(() =>
  import('@/components/three/ExploreSandbox').then((m) => ({ default: m.ExploreSandbox })),
)

export function Explore() {
  return (
    <div className={`container ${styles.wrap}`}>
      <AtlasPlate
        variant="hero"
        catalog="SANDBOX"
        title="Explore the system"
        subtitle="Drag to orbit, then pick any world to fly to it. A stylised model — sizes and distances are compressed so every body fits in one view."
        meta="FREE ROAM"
      />
      <Suspense fallback={<Loader label="Loading the sandbox…" />}>
        <ExploreSandbox />
      </Suspense>
      <p className={styles.note}>
        Built from the same static data the lessons use, so it works offline. Pick a world in the
        rail or tap it in the scene; the camera eases in and its readout updates.
      </p>
      <Button to="/">Go to the lessons</Button>
    </div>
  )
}
