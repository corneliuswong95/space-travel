/*
 * Live NASA Open API helpers — an enhancement layered on top of the static facts. Nothing
 * here is a hard dependency: if a call fails, callers fall back to a plain message and the
 * lessons keep working. Responses are cached in localStorage by date to stay well within the
 * DEMO_KEY rate limits (30/hour, 50/day).
 */

const API_KEY = (import.meta.env.VITE_NASA_API_KEY ?? 'DEMO_KEY') as string
const BASE = 'https://api.nasa.gov'

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeCache(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore (private mode / quota); just means we'll refetch.
  }
}

// Drop older cached entries sharing a prefix (rolling date windows would accumulate otherwise).
function pruneCache(prefix: string, keep: string): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i)
      if (k && k.startsWith(prefix) && k !== keep) localStorage.removeItem(k)
    }
  } catch {
    // ignore
  }
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * `fetch` that retries transient failures — 5xx responses and network errors — but never an
 * abort or a 4xx. NASA's gateway returns sporadic 503 "upstream connect" errors; one or two
 * quick retries make month-by-month browsing reliable without papering over real failures.
 */
async function fetchRetry(url: string, signal?: AbortSignal, tries = 3): Promise<Response> {
  let lastErr: unknown
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal })
      if (res.ok || res.status < 500 || i === tries - 1) return res
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') throw err
      lastErr = err
      if (i === tries - 1) throw err
    }
    await new Promise((r) => setTimeout(r, 400 * (i + 1)))
  }
  throw lastErr ?? new Error('fetch failed')
}

// --- Astronomy Picture of the Day ---

export interface Apod {
  title: string
  date: string
  explanation: string
  /** Display image (regular size); empty for videos without a thumbnail. */
  imageUrl: string
  /** High-res image when available (images only). */
  hdUrl?: string
  /** The raw NASA url — full image, or the embeddable video URL. */
  sourceUrl: string
  mediaType: string
  copyright?: string
  pageUrl: string
}

interface ApodRaw {
  title: string
  date: string
  explanation: string
  url: string
  hdurl?: string
  thumbnail_url?: string
  media_type: string
  copyright?: string
}

function toApod(j: ApodRaw): Apod {
  const yy = j.date.slice(2, 4)
  const mm = j.date.slice(5, 7)
  const dd = j.date.slice(8, 10)
  return {
    title: j.title,
    date: j.date,
    explanation: j.explanation,
    imageUrl: j.media_type === 'image' ? j.url : (j.thumbnail_url || ''),
    hdUrl: j.media_type === 'image' ? (j.hdurl || j.url) : undefined,
    sourceUrl: j.url,
    mediaType: j.media_type,
    copyright: j.copyright,
    pageUrl: `https://apod.nasa.gov/apod/ap${yy}${mm}${dd}.html`,
  }
}

export async function fetchApod(signal?: AbortSignal): Promise<Apod> {
  const day = today()
  const cacheKey = `orrery:apod:${day}`
  const cached = readCache<Apod>(cacheKey)
  // Trust the cache only if it actually holds *today's* picture. Opening the app before NASA
  // publishes today's APOD (~05:00 UTC) would otherwise pin yesterday's image under today's key
  // and keep serving it for the rest of the day.
  if (cached && cached.date === day) return cached

  const res = await fetchRetry(`${BASE}/planetary/apod?api_key=${API_KEY}&thumbs=true`, signal)
  if (!res.ok) throw new Error(`NASA APOD request failed (${res.status})`)
  const apod = toApod((await res.json()) as ApodRaw)
  // Cache only once it's genuinely today's, so we never pin an older picture under today's key.
  if (apod.date === day) {
    pruneCache('orrery:apod:', cacheKey)
    writeCache(cacheKey, apod)
  }
  return apod
}

/** The first Astronomy Picture of the Day. The archive starts here. */
export const APOD_EPOCH = { year: 1995, month: 6, day: 16 }

const pad2 = (n: number) => String(n).padStart(2, '0')

/**
 * The Astronomy Picture of the Day for one calendar month (1-indexed `month`), newest first.
 * The window is clamped to the APOD epoch (1995-06-16) and today, so a month entirely before
 * the archive began or still in the future resolves to `[]`. Past months are immutable and
 * cache forever; the in-progress month is re-keyed by day so it picks up each new picture.
 */
export async function fetchApodForMonth(
  year: number,
  month: number,
  signal?: AbortSignal,
): Promise<Apod[]> {
  const ym = `${year}-${pad2(month)}`
  const lastDay = new Date(year, month, 0).getDate() // day 0 of next month = last day of this one
  const epoch = `${APOD_EPOCH.year}-${pad2(APOD_EPOCH.month)}-${pad2(APOD_EPOCH.day)}`

  const start = `${ym}-01` < epoch ? epoch : `${ym}-01`
  const end = `${ym}-${pad2(lastDay)}` > today() ? today() : `${ym}-${pad2(lastDay)}`
  if (start > end) return [] // month is before the archive began, or still in the future

  const inProgress = end === today()
  const cacheKey = inProgress ? `orrery:apod-m:${ym}:${today()}` : `orrery:apod-m:${ym}`
  const cached = readCache<Apod[]>(cacheKey)
  // For the current month, trust the cache only once it already includes today's picture —
  // otherwise a fetch made before NASA published today's would hide it for the rest of the day.
  if (cached && (!inProgress || cached[0]?.date === end)) return cached

  const res = await fetchRetry(
    `${BASE}/planetary/apod?api_key=${API_KEY}&thumbs=true&start_date=${start}&end_date=${end}`,
    signal,
  )
  if (!res.ok) throw new Error(`NASA APOD request failed (${res.status})`)
  const items = ((await res.json()) as ApodRaw[]).map(toApod).reverse()

  // Skip caching the in-progress month until today's picture is actually in it.
  if (!inProgress || items[0]?.date === end) {
    if (inProgress) pruneCache(`orrery:apod-m:${ym}:`, cacheKey)
    writeCache(cacheKey, items)
  }
  return items
}

// --- Near-Earth objects (today's close approaches) ---

export interface NeoObject {
  id: string
  name: string
  hazardous: boolean
  diameterM: number
  missKm: number
  missLunar: number
  velocityKph: number
}

export interface NeoFeed {
  date: string
  count: number
  objects: NeoObject[]
}

interface NeoRaw {
  id: string
  name: string
  is_potentially_hazardous_asteroid: boolean
  estimated_diameter?: { meters?: { estimated_diameter_min: number; estimated_diameter_max: number } }
  close_approach_data?: Array<{
    miss_distance?: { kilometers?: string; lunar?: string }
    relative_velocity?: { kilometers_per_hour?: string }
  }>
}

export async function fetchNeoFeed(signal?: AbortSignal): Promise<NeoFeed> {
  const day = today()
  const cacheKey = `orrery:neo:${day}`
  const cached = readCache<NeoFeed>(cacheKey)
  if (cached) return cached

  const res = await fetch(
    `${BASE}/neo/rest/v1/feed?start_date=${day}&end_date=${day}&api_key=${API_KEY}`,
    { signal },
  )
  if (!res.ok) throw new Error(`NASA NEO request failed (${res.status})`)
  const j = (await res.json()) as {
    element_count?: number
    near_earth_objects?: Record<string, NeoRaw[]>
  }

  const raw = j.near_earth_objects?.[day] ?? []
  const objects: NeoObject[] = raw
    .map((neo) => {
      const ca = neo.close_approach_data?.[0]
      const d = neo.estimated_diameter?.meters
      return {
        id: neo.id,
        name: neo.name.replace(/[()]/g, '').trim(),
        hazardous: neo.is_potentially_hazardous_asteroid,
        diameterM: d ? (d.estimated_diameter_min + d.estimated_diameter_max) / 2 : 0,
        missKm: Number(ca?.miss_distance?.kilometers),
        missLunar: Number(ca?.miss_distance?.lunar),
        velocityKph: Number(ca?.relative_velocity?.kilometers_per_hour),
      }
    })
    .filter((o) => Number.isFinite(o.missKm))
    .sort((a, b) => a.missKm - b.missKm)
    .slice(0, 5)

  const feed: NeoFeed = { date: day, count: j.element_count ?? objects.length, objects }
  writeCache(cacheKey, feed)
  return feed
}

// --- EPIC: full-disk Earth from the DSCOVR spacecraft at the L1 point ---

export interface EpicImage {
  id: string
  date: string
  caption: string
  thumbUrl: string
  imageUrl: string
}

interface EpicRaw {
  identifier: string
  caption: string
  image: string
  date: string
}

export async function fetchEpic(signal?: AbortSignal): Promise<EpicImage[]> {
  const cacheKey = `orrery:epic:${today()}`
  const cached = readCache<EpicImage[]>(cacheKey)
  if (cached) return cached

  const res = await fetch(`${BASE}/EPIC/api/natural?api_key=${API_KEY}`, { signal })
  if (!res.ok) throw new Error(`NASA EPIC request failed (${res.status})`)
  const raw = (await res.json()) as EpicRaw[]

  // Image URLs are built from the date: /archive/natural/YYYY/MM/DD/{thumbs|png}/{image}.{jpg|png}
  const items: EpicImage[] = raw.map((e) => {
    const [y, m, d] = e.date.split(' ')[0].split('-')
    const dir = `${BASE}/EPIC/archive/natural/${y}/${m}/${d}`
    return {
      id: e.identifier,
      date: e.date,
      caption: e.caption,
      thumbUrl: `${dir}/thumbs/${e.image}.jpg?api_key=${API_KEY}`,
      imageUrl: `${dir}/png/${e.image}.png?api_key=${API_KEY}`,
    }
  })

  writeCache(cacheKey, items)
  return items
}

// --- Near-Earth objects: the week ahead ---

export interface NeoWeek {
  start: string
  end: string
  total: number
  hazardous: number
  objects: NeoObject[]
}

export async function fetchNeoWeek(signal?: AbortSignal): Promise<NeoWeek> {
  const start = today()
  const end = new Date(Date.now() + 6 * 86_400_000).toISOString().slice(0, 10)
  const cacheKey = `orrery:neo-week:${start}`
  const cached = readCache<NeoWeek>(cacheKey)
  if (cached) return cached

  const res = await fetch(
    `${BASE}/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`,
    { signal },
  )
  if (!res.ok) throw new Error(`NASA NEO request failed (${res.status})`)
  const j = (await res.json()) as {
    element_count?: number
    near_earth_objects?: Record<string, NeoRaw[]>
  }

  const all: NeoRaw[] = Object.values(j.near_earth_objects ?? {}).flat()
  const hazardous = all.filter((n) => n.is_potentially_hazardous_asteroid).length
  const objects: NeoObject[] = all
    .map((neo) => {
      const ca = neo.close_approach_data?.[0]
      const dia = neo.estimated_diameter?.meters
      return {
        id: neo.id,
        name: neo.name.replace(/[()]/g, '').trim(),
        hazardous: neo.is_potentially_hazardous_asteroid,
        diameterM: dia ? (dia.estimated_diameter_min + dia.estimated_diameter_max) / 2 : 0,
        missKm: Number(ca?.miss_distance?.kilometers),
        missLunar: Number(ca?.miss_distance?.lunar),
        velocityKph: Number(ca?.relative_velocity?.kilometers_per_hour),
      }
    })
    .filter((o) => Number.isFinite(o.missKm))
    .sort((a, b) => a.missKm - b.missKm)
    .slice(0, 8)

  const week: NeoWeek = { start, end, total: j.element_count ?? all.length, hazardous, objects }
  writeCache(cacheKey, week)
  return week
}

// --- Space weather (DONKI): solar flares + geomagnetic storms ---

export interface SolarFlare {
  id: string
  classType: string
  peakTime: string
  location: string
}

export interface GeoStorm {
  id: string
  startTime: string
  maxKp: number
}

export interface SpaceWeather {
  flares: SolarFlare[]
  storms: GeoStorm[]
}

interface FlrRaw {
  flrID: string
  classType?: string
  peakTime?: string
  sourceLocation?: string
}

interface GstRaw {
  gstID: string
  startTime?: string
  allKpIndex?: Array<{ kpIndex?: number }>
}

export async function fetchSpaceWeather(signal?: AbortSignal): Promise<SpaceWeather> {
  const cacheKey = `orrery:spaceweather:${today()}`
  const cached = readCache<SpaceWeather>(cacheKey)
  if (cached) return cached

  const start = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10)
  const end = today()
  const [flrRes, gstRes] = await Promise.all([
    fetch(`${BASE}/DONKI/FLR?startDate=${start}&endDate=${end}&api_key=${API_KEY}`, { signal }),
    fetch(`${BASE}/DONKI/GST?startDate=${start}&endDate=${end}&api_key=${API_KEY}`, { signal }),
  ])
  if (!flrRes.ok || !gstRes.ok) throw new Error('NASA DONKI request failed')
  const flrRaw = (await flrRes.json()) as FlrRaw[]
  const gstRaw = (await gstRes.json()) as GstRaw[]

  const flares: SolarFlare[] = flrRaw
    .map((f) => ({
      id: f.flrID,
      classType: f.classType ?? '—',
      peakTime: f.peakTime ?? '',
      location: f.sourceLocation ?? '',
    }))
    .reverse()
    .slice(0, 5)

  const storms: GeoStorm[] = gstRaw
    .map((g) => ({
      id: g.gstID,
      startTime: g.startTime ?? '',
      maxKp: Math.max(0, ...(g.allKpIndex ?? []).map((k) => k.kpIndex ?? 0)),
    }))
    .reverse()
    .slice(0, 3)

  const data: SpaceWeather = { flares, storms }
  writeCache(cacheKey, data)
  return data
}
