import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Button } from '@/components/ui/Button'
import { FeedError, FeedLoading } from '@/components/nasa/FeedStates'
import { LaunchCard } from '@/components/launches/LaunchCard'
import { NewsCard } from '@/components/launches/NewsCard'
import { useUpcomingLaunches, useRecentLaunches, useSpaceNews } from '@/hooks/useSpace'
import styles from './Launches.module.css'

export function Launches() {
  const upcoming = useUpcomingLaunches()
  const recent = useRecentLaunches()
  const news = useSpaceNews()

  return (
    <div className={`container ${styles.wrap}`}>
      <AtlasPlate
        variant="hero"
        catalog="MISSION LOG"
        title="Launches & news"
        subtitle="Upcoming rocket launches, what flew in the past week, and the latest headlines from across spaceflight."
        meta="UPDATED HOURLY"
      />

      <section className={styles.section} aria-labelledby="up-h">
        <div className={styles.head}>
          <h2 id="up-h" className={styles.headTitle}>
            Upcoming launches
          </h2>
          {upcoming.data ? <span className={`${styles.count} mono`}>next {upcoming.data.length}</span> : null}
        </div>
        {upcoming.status === 'loading' ? <FeedLoading rows={4} /> : null}
        {upcoming.status === 'error' ? <FeedError onRetry={upcoming.reload} /> : null}
        {upcoming.status === 'success' ? (
          upcoming.data!.length === 0 ? (
            <p className={styles.empty}>No launches scheduled right now.</p>
          ) : (
            <ul className={styles.grid}>
              {upcoming.data!.map((l) => (
                <li key={l.id}>
                  <LaunchCard launch={l} />
                </li>
              ))}
            </ul>
          )
        ) : null}
      </section>

      <section className={styles.section} aria-labelledby="rec-h">
        <div className={styles.head}>
          <h2 id="rec-h" className={styles.headTitle}>
            Past week
          </h2>
        </div>
        {recent.status === 'loading' ? <FeedLoading rows={4} /> : null}
        {recent.status === 'error' ? <FeedError onRetry={recent.reload} /> : null}
        {recent.status === 'success' ? (
          recent.data!.length === 0 ? (
            <p className={styles.empty}>No launches in the past week.</p>
          ) : (
            <ul className={styles.grid}>
              {recent.data!.map((l) => (
                <li key={l.id}>
                  <LaunchCard launch={l} />
                </li>
              ))}
            </ul>
          )
        ) : null}
      </section>

      <section className={styles.section} aria-labelledby="news-h">
        <div className={styles.head}>
          <h2 id="news-h" className={styles.headTitle}>
            Space exploration news
          </h2>
        </div>
        {news.status === 'loading' ? <FeedLoading rows={4} /> : null}
        {news.status === 'error' ? <FeedError onRetry={news.reload} /> : null}
        {news.status === 'success' ? (
          news.data!.length === 0 ? (
            <p className={styles.empty}>No headlines right now.</p>
          ) : (
            <ul className={styles.grid}>
              {news.data!.map((a) => (
                <li key={a.id}>
                  <NewsCard article={a} />
                </li>
              ))}
            </ul>
          )
        ) : null}
      </section>

      <Button to="/lessons" variant="ghost" className={styles.backBtn}>
        Back to the lessons
      </Button>
    </div>
  )
}
