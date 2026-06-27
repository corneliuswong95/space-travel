import { useCallback, useEffect, useRef, useState } from 'react'

import {
  APOD_EPOCH,
  fetchApod,
  fetchApodForMonth,
  fetchEpic,
  fetchNeoFeed,
  fetchNeoWeek,
  fetchSpaceWeather,
  type Apod,
  type EpicImage,
  type NeoFeed,
  type NeoWeek,
  type SpaceWeather,
} from '@/data/nasa'
import { useAsync } from './useAsync'

export function useNasaApod() {
  return useAsync<Apod>(fetchApod)
}

export function useNeoFeed() {
  return useAsync<NeoFeed>(fetchNeoFeed)
}

export function useNeoWeek() {
  return useAsync<NeoWeek>(fetchNeoWeek)
}

const EPOCH_NUM = APOD_EPOCH.year * 12 + (APOD_EPOCH.month - 1)
const monthNum = (year: number, month: number) => year * 12 + (month - 1)

export interface ApodArchive {
  /** Accumulated pictures, newest first, across every month loaded so far. */
  items: Apod[]
  /** A page (the anchor month or an earlier one) is in flight. */
  loading: boolean
  error: string | null
  /** The oldest month loaded has reached the start of the archive (June 1995). */
  done: boolean
  /** Append the next earlier month. No-op while loading or when `done`. */
  loadMore: () => void
  /** Jump to a specific month (1-indexed); resets the list and loads from there. */
  jumpTo: (year: number, month: number) => void
  /** Retry the page that errored. */
  retry: () => void
}

/**
 * Browse the whole APOD archive a month at a time. Starts at the current month and walks
 * backwards on `loadMore`, accumulating newest-first; `jumpTo` restarts from any month. One
 * network request per month (≤31 pictures), each cached, so scrolling back is cheap and the
 * archive is effectively unlimited down to the very first picture in June 1995.
 */
export function useApodArchive(): ApodArchive {
  const [items, setItems] = useState<Apod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const thisMonth = () => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() + 1 }
  }
  // `cursor` = the next (earlier) month to fetch; it walks backwards as months load.
  const cursor = useRef(thisMonth())
  // `attempt` = the page most recently requested, so `retry` repeats exactly it.
  const attempt = useRef({ ...thisMonth(), append: false })
  const token = useRef(0) // bumped on jump to discard any in-flight load
  const busy = useRef(false) // guards against overlapping/duplicate loads
  const doneRef = useRef(false)

  const loadMonth = useCallback(async (year: number, month: number, append: boolean) => {
    if (busy.current) return
    busy.current = true
    attempt.current = { year, month, append }
    const mine = token.current
    setLoading(true)
    setError(null)
    try {
      const batch = await fetchApodForMonth(year, month)
      if (mine !== token.current) return // superseded by a jump
      setItems((prev) => {
        const merged = append ? [...prev, ...batch] : batch
        const seen = new Set<string>()
        return merged.filter((a) => (seen.has(a.date) ? false : (seen.add(a.date), true)))
      })
      const prevMonth = monthNum(year, month) - 1
      cursor.current = { year: Math.floor(prevMonth / 12), month: (prevMonth % 12) + 1 }
      if (prevMonth < EPOCH_NUM) {
        setDone(true)
        doneRef.current = true
      }
    } catch (e) {
      if (mine !== token.current) return
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      if (mine === token.current) {
        setLoading(false)
        busy.current = false
      }
    }
  }, [])

  // First load: the current month.
  useEffect(() => {
    loadMonth(attempt.current.year, attempt.current.month, false)
  }, [loadMonth])

  const loadMore = useCallback(() => {
    if (busy.current || doneRef.current) return
    loadMonth(cursor.current.year, cursor.current.month, true)
  }, [loadMonth])

  const jumpTo = useCallback(
    (year: number, month: number) => {
      token.current += 1 // invalidate any in-flight load
      busy.current = false
      setDone(false)
      doneRef.current = false
      setItems([])
      cursor.current = { year, month }
      loadMonth(year, month, false)
    },
    [loadMonth],
  )

  const retry = useCallback(() => {
    loadMonth(attempt.current.year, attempt.current.month, attempt.current.append)
  }, [loadMonth])

  return { items, loading, error, done, loadMore, jumpTo, retry }
}

export function useEpic() {
  return useAsync<EpicImage[]>(fetchEpic)
}

export function useSpaceWeather() {
  return useAsync<SpaceWeather>(fetchSpaceWeather)
}
