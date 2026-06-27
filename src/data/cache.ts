// Time-to-live localStorage cache for feeds that change through the day (launches, news).

export function readCacheTTL<T>(key: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { t: number; data: T }
    if (Date.now() - parsed.t > ttlMs) return null
    return parsed.data
  } catch {
    return null
  }
}

export function writeCacheTTL(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ t: Date.now(), data }))
  } catch {
    // ignore (private mode / quota)
  }
}
