import { useEffect, useMemo, useRef, useState } from 'react'

import { AtlasPlate } from '@/components/story/AtlasPlate'
import { Button } from '@/components/ui/Button'
import { EpicEarth } from '@/components/nasa/EpicEarth'
import { SpaceWeather } from '@/components/nasa/SpaceWeather'
import { NeoWeek } from '@/components/nasa/NeoWeek'
import { ImageSearch } from '@/components/nasa/ImageSearch'
import { ApodCard } from '@/components/nasa/ApodCard'
import { ApodLightbox } from '@/components/nasa/ApodLightbox'
import { FeedError, FeedLoading } from '@/components/nasa/FeedStates'
import { useApodArchive } from '@/hooks/useNasa'
import { APOD_EPOCH, type Apod } from '@/data/nasa'
import styles from './Sky.module.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const NOW = new Date()
const THIS_YEAR = NOW.getFullYear()
const THIS_MONTH = NOW.getMonth() + 1

// Years from this one back to the first APOD, newest first.
const YEARS: number[] = []
for (let y = THIS_YEAR; y >= APOD_EPOCH.year; y--) YEARS.push(y)

/** Months selectable for a year, clamped to the archive's start and to today. */
function monthsForYear(year: number): number[] {
  const min = year === APOD_EPOCH.year ? APOD_EPOCH.month : 1
  const max = year === THIS_YEAR ? THIS_MONTH : 12
  const out: number[] = []
  for (let m = min; m <= max; m++) out.push(m)
  return out
}

export function Sky() {
  const { items, loading, error, done, loadMore, jumpTo, retry } = useApodArchive()
  const [open, setOpen] = useState<Apod | null>(null)
  const [sel, setSel] = useState({ year: THIS_YEAR, month: THIS_MONTH })

  const monthOptions = useMemo(() => monthsForYear(sel.year), [sel.year])

  function changeYear(year: number) {
    const months = monthsForYear(year)
    const month = months.includes(sel.month) ? sel.month : months[months.length - 1]
    setSel({ year, month })
    jumpTo(year, month)
  }
  function changeMonth(month: number) {
    setSel((s) => ({ ...s, month }))
    jumpTo(sel.year, month)
  }

  // Lazy-load earlier months as the sentinel nears the viewport. The page grows ~a month of
  // cards per load, so it naturally settles after a row or two rather than running away.
  const sentinel = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = sentinel.current
    if (!el || done) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadMore, done, items.length])

  const firstLoad = loading && items.length === 0

  return (
    <div className={`container ${styles.wrap}`}>
      <AtlasPlate
        variant="hero"
        catalog="LIVE FEED"
        title="The sky, lately"
        subtitle="Browse NASA's Astronomy Picture of the Day all the way back to the first one in 1995 — jump to any month, or keep scrolling to load earlier pictures. Pick any to read it in full."
        meta="UPDATED DAILY"
      />

      <section aria-labelledby="archive-h" className={styles.section}>
        <div className={styles.head}>
          <h2 id="archive-h" className={styles.headTitle}>
            Picture of the day · archive
          </h2>
          <div className={styles.filters}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Month</span>
              <select
                className={styles.select}
                value={sel.month}
                onChange={(e) => changeMonth(Number(e.target.value))}
                aria-label="Filter pictures by month"
              >
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {MONTHS[m - 1]}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Year</span>
              <select
                className={styles.select}
                value={sel.year}
                onChange={(e) => changeYear(Number(e.target.value))}
                aria-label="Filter pictures by year"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {firstLoad ? <FeedLoading rows={6} /> : null}
        {error && items.length === 0 ? <FeedError onRetry={retry} /> : null}

        {items.length > 0 ? (
          <>
            <ul className={styles.grid}>
              {items.map((a) => (
                <li key={a.date}>
                  <ApodCard apod={a} onOpen={setOpen} />
                </li>
              ))}
            </ul>

            <div ref={sentinel} className={styles.more}>
              {error ? (
                <div className={styles.inlineError}>
                  <span>Couldn’t load more pictures.</span>
                  <Button variant="ghost" onClick={retry}>
                    Try again
                  </Button>
                </div>
              ) : done ? (
                <p className={styles.endNote}>
                  That’s the whole archive — back to the first Astronomy Picture of the Day, on
                  June 16, 1995.
                </p>
              ) : (
                <Button variant="ghost" onClick={loadMore} disabled={loading}>
                  {loading ? 'Loading…' : 'Load earlier pictures'}
                </Button>
              )}
            </div>
          </>
        ) : !firstLoad && !error ? (
          <p className={styles.empty}>
            No pictures for {MONTHS[sel.month - 1]} {sel.year}.
            {!done ? (
              <Button variant="ghost" onClick={loadMore}>
                Load earlier pictures
              </Button>
            ) : null}
          </p>
        ) : null}
      </section>

      <section className={styles.section}>
        <SpaceWeather />
      </section>

      <section className={styles.section}>
        <div className={styles.neoWrap}>
          <NeoWeek />
        </div>
      </section>

      <section className={styles.section}>
        <EpicEarth />
      </section>

      <section className={styles.section}>
        <ImageSearch />
      </section>

      <Button to="/" variant="ghost" className={styles.backBtn}>
        Back to the lessons
      </Button>

      <ApodLightbox apod={open} onClose={() => setOpen(null)} />
    </div>
  )
}
