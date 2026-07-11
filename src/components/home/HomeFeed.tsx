import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useNasaApod, useNeoWeek } from '@/hooks/useNasa'
import { useUpcomingLaunches, useSpaceNews } from '@/hooks/useSpace'
import { useProgress } from '@/hooks/useProgress'
import { lessons, isAvailable } from '@/lessons'
import { moonPhase } from '@/data/moon'
import styles from './home.module.css'

/*
 * The home feed: a stream of live "posts" (your progress, today's NASA picture, the next launch,
 * a headline) plus a rail of glanceable widgets. Every post links through to the section page
 * where the full thing lives. All live data degrades gracefully — a failed feed still shows a
 * card that points you to its page; nothing here is a hard dependency for the rest of the site.
 */

type Tone = 'path' | 'sky' | 'launch' | 'explore'

const TONE: Record<Tone, string> = {
  path: styles.tonePath,
  sky: styles.toneSky,
  launch: styles.toneLaunch,
  explore: styles.toneExplore,
}

function excerpt(text: string, max: number): string {
  const t = text.trim()
  if (t.length <= max) return t
  return t.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

function whenLabel(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now()
  const days = Math.round(diff / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'tomorrow'
  if (days < 14) return `in ${days} days`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

interface FeedCardProps {
  to: string
  tone: Tone
  source: string
  cta: string
  ariaLabel: string
  meta?: ReactNode
  feature?: boolean
  children: ReactNode
}

function FeedCard({ to, tone, source, cta, ariaLabel, meta, feature, children }: FeedCardProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`${styles.card} ${TONE[tone]} ${feature ? styles.feature : ''}`.trim()}
    >
      <div className={styles.cardHead}>
        <span className={styles.source}>{source}</span>
        {meta != null ? <span className={styles.meta}>{meta}</span> : null}
      </div>
      {children}
      <span className={styles.cta} aria-hidden="true">
        {cta}
      </span>
    </Link>
  )
}

function SkelLine({ w }: { w?: string }) {
  return <span className={`${styles.skelLine} ${styles.skel}`} style={w ? { width: w } : undefined} />
}

/* --- Main column posts --- */

function PathPost() {
  const { isComplete } = useProgress()
  const available = lessons.filter(isAvailable)
  const done = available.filter((l) => isComplete(l.slug)).length
  const total = available.length
  const next = available.find((l) => !isComplete(l.slug)) ?? available[0]
  const started = done > 0
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <FeedCard
      to="/lessons"
      tone="path"
      source="Your path"
      meta={`${done} / ${total}`}
      cta={started ? 'Continue the path →' : 'Start the path →'}
      ariaLabel={`Your learning path: ${done} of ${total} lessons complete`}
    >
      <h3 className={styles.title}>
        {started ? 'Pick up where you left off' : 'Begin the learning path'}
      </h3>
      <p className={styles.body}>
        {started ? 'Next up' : 'First lesson'}:{' '}
        <strong className={styles.strong}>{next.title}</strong>. {excerpt(next.summary, 120)}
      </p>
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.progressText}>
        {pct}% complete · {total - done} {total - done === 1 ? 'lesson' : 'lessons'} to go
      </span>
    </FeedCard>
  )
}

function ApodPost() {
  const { status, data } = useNasaApod()

  if (status === 'success' && data) {
    return (
      <FeedCard
        to="/sky"
        tone="sky"
        source="Picture of the day"
        meta={data.date}
        cta="Open in Sky →"
        feature
        ariaLabel={`Astronomy picture of the day: ${data.title}`}
      >
        <figure className={styles.media}>
          {data.imageUrl ? (
            <img
              className={styles.mediaImg}
              src={data.imageUrl}
              alt={data.title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.mediaFallback}>▶ Video · watch in Sky</div>
          )}
        </figure>
        <h3 className={styles.titleLg}>{data.title}</h3>
        <p className={styles.body}>{excerpt(data.explanation, 240)}</p>
      </FeedCard>
    )
  }

  return (
    <FeedCard
      to="/sky"
      tone="sky"
      source="Picture of the day"
      cta="Open in Sky →"
      feature
      meta={status === 'error' ? 'unavailable' : undefined}
      ariaLabel="Astronomy picture of the day"
    >
      {status === 'loading' ? (
        <>
          <div className={`${styles.media} ${styles.skel}`} />
          <SkelLine w="65%" />
          <SkelLine />
          <SkelLine w="85%" />
        </>
      ) : (
        <>
          <h3 className={styles.titleLg}>Today’s picture isn’t loading</h3>
          <p className={styles.body}>
            NASA’s feed is unreachable right now. The full archive back to 1995 still lives in Sky.
          </p>
        </>
      )}
    </FeedCard>
  )
}

function LaunchPost() {
  const { status, data } = useUpcomingLaunches()
  const launch = data?.[0]

  if (status === 'success' && launch) {
    return (
      <FeedCard
        to="/launches"
        tone="launch"
        source="Next launch"
        meta={whenLabel(launch.net)}
        cta="See all launches →"
        ariaLabel={`Next launch: ${launch.missionName}`}
      >
        {launch.image ? (
          <figure className={styles.mediaShort}>
            <img
              className={styles.mediaImg}
              src={launch.image}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}
        <h3 className={styles.title}>{launch.missionName}</h3>
        <p className={styles.body}>
          {[launch.provider, launch.rocket, launch.location].filter(Boolean).join(' · ')}
        </p>
      </FeedCard>
    )
  }

  return (
    <FeedCard
      to="/launches"
      tone="launch"
      source="Next launch"
      cta="See all launches →"
      meta={status === 'error' ? 'unavailable' : undefined}
      ariaLabel="Upcoming launches"
    >
      {status === 'loading' ? (
        <>
          <SkelLine w="55%" />
          <SkelLine w="80%" />
        </>
      ) : (
        <>
          <h3 className={styles.title}>Launch schedule unavailable</h3>
          <p className={styles.body}>
            The launch feed isn’t reachable right now. Open Launches to try again.
          </p>
        </>
      )}
    </FeedCard>
  )
}

function NewsPost() {
  const { status, data } = useSpaceNews()
  const article = data?.[0]

  if (status === 'success' && article) {
    return (
      <FeedCard
        to="/launches"
        tone="launch"
        source="Headline"
        meta={article.newsSite}
        cta="More headlines →"
        ariaLabel={`Space headline: ${article.title}`}
      >
        {article.imageUrl ? (
          <figure className={styles.mediaShort}>
            <img
              className={styles.mediaImg}
              src={article.imageUrl}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.body}>{excerpt(article.summary, 160)}</p>
      </FeedCard>
    )
  }

  if (status === 'loading') {
    return (
      <FeedCard
        to="/launches"
        tone="launch"
        source="Headline"
        cta="More headlines →"
        ariaLabel="Space headlines"
      >
        <SkelLine w="70%" />
        <SkelLine />
      </FeedCard>
    )
  }

  // On error/empty, drop the post rather than show a second launch fallback.
  return null
}

/* --- Rail widgets --- */

function MoonPost() {
  const { name, glyph, illumination, daysToFull, idx } = moonPhase()
  const toFull = idx === 4 || daysToFull === 0 ? 'Full moon tonight' : `${daysToFull} days to full`

  return (
    <FeedCard
      to="/sky"
      tone="sky"
      source="The Moon tonight"
      meta={`${illumination}%`}
      cta="Open in Sky →"
      ariaLabel={`The Moon tonight: ${name}, ${illumination}% illuminated`}
    >
      <div className={styles.moonRow}>
        <span className={styles.moonGlyph} aria-hidden="true">
          {glyph}
        </span>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.body}>
            {illumination}% illuminated · {toFull}
          </p>
        </div>
      </div>
    </FeedCard>
  )
}

function NeoPost() {
  const { status, data } = useNeoWeek()

  if (status === 'success' && data) {
    const closest = data.objects[0]
    const lunar = closest && Number.isFinite(closest.missLunar) ? closest.missLunar : null
    return (
      <FeedCard
        to="/sky"
        tone="sky"
        source="Near-Earth this week"
        meta={`${data.total}`}
        cta="Open in Sky →"
        ariaLabel={`Near-Earth objects this week: ${data.total} tracked, ${data.hazardous} flagged`}
      >
        <h3 className={styles.title}>
          {data.total} tracked · {data.hazardous} flagged
        </h3>
        {closest ? (
          <p className={styles.body}>
            Closest: <strong className={styles.strong}>{closest.name}</strong>
            {lunar != null
              ? `, passing at ${lunar.toFixed(lunar < 10 ? 1 : 0)} lunar distances.`
              : '.'}
          </p>
        ) : (
          <p className={styles.body}>No close approaches in the next seven days.</p>
        )}
      </FeedCard>
    )
  }

  return (
    <FeedCard
      to="/sky"
      tone="sky"
      source="Near-Earth this week"
      cta="Open in Sky →"
      meta={status === 'error' ? 'unavailable' : undefined}
      ariaLabel="Near-Earth objects this week"
    >
      {status === 'loading' ? (
        <>
          <SkelLine w="60%" />
          <SkelLine w="90%" />
        </>
      ) : (
        <p className={styles.body}>The asteroid feed isn’t reachable right now — try it in Sky.</p>
      )}
    </FeedCard>
  )
}

function ExplorePost() {
  return (
    <FeedCard
      to="/explore"
      tone="explore"
      source="Explore in 3D"
      meta="Free roam"
      cta="Open the sandbox →"
      ariaLabel="Explore the solar system in 3D"
    >
      <div className={styles.exploreArt} aria-hidden="true">
        <svg className={styles.exploreSvg} viewBox="0 0 220 90" preserveAspectRatio="xMidYMid meet">
          <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55">
            <ellipse cx="110" cy="45" rx="30" ry="13" />
            <ellipse cx="110" cy="45" rx="56" ry="25" />
            <ellipse cx="110" cy="45" rx="84" ry="37" />
          </g>
          <circle cx="110" cy="45" r="6" fill="var(--amber)" />
          <circle cx="140" cy="45" r="3" fill="currentColor" />
          <circle cx="54" cy="45" r="3.5" fill="var(--rust)" />
          <circle cx="110" cy="8" r="2.5" fill="currentColor" />
        </svg>
      </div>
      <h3 className={styles.title}>Fly the solar system</h3>
      <p className={styles.body}>
        Orbit the Sun and pick any world to fly to it, with a live readout for each body.
      </p>
    </FeedCard>
  )
}

export function HomeFeed() {
  return (
    <section className={`container ${styles.feed}`} aria-labelledby="feed-h">
      <div className={styles.feedHead}>
        <h2 id="feed-h" className={styles.feedTitle}>
          The latest
        </h2>
        <span className={styles.feedSub}>
          Live sky data, upcoming launches, and where you left off — in one place.
        </span>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <PathPost />
          <ApodPost />
          <LaunchPost />
          <NewsPost />
        </div>
        <aside className={styles.rail} aria-label="At a glance">
          <MoonPost />
          <NeoPost />
          <ExplorePost />
        </aside>
      </div>
    </section>
  )
}
