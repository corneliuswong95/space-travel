import { Button } from '@/components/ui/Button'
import { OrbitDiagram } from '@/components/story/OrbitDiagram'
import { HomeFeed } from '@/components/home/HomeFeed'
import { lessons, isAvailable } from '@/lessons'
import { useProgress } from '@/hooks/useProgress'
import styles from './Home.module.css'

export function Home() {
  const { isComplete } = useProgress()
  const available = lessons.filter(isAvailable)
  const started = available.some((l) => isComplete(l.slug))

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Field guide · the night sky</span>
            <h1 className={styles.title}>Learn the sky like an instrument, not a slideshow.</h1>
            <p className={styles.lead}>
              A short, sequenced path through the Sun, the planets, and how to read the night sky —
              every lesson grounded in real numbers and ending with a check for understanding.
            </p>
            <div className={styles.actions}>
              <Button to="/lessons">{started ? 'Continue the path' : 'Start the path'}</Button>
              <Button to="/explore" variant="ghost">
                Explore in 3D
              </Button>
            </div>
          </div>
          <OrbitDiagram className={styles.diagram} />
        </div>
      </section>

      <HomeFeed />
    </>
  )
}
