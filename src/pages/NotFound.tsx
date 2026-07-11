import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Button } from '@/components/ui/Button'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <AtlasPlate
        variant="hero"
        catalog="404"
        title="Off the chart"
        subtitle="That page isn't in the atlas. It may have moved, or it may never have existed."
        meta="NO FIX"
      />
      <Button to="/lessons">Back to the lessons</Button>
    </div>
  )
}
