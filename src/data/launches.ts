/*
 * Rocket launches from The Space Devs' Launch Library 2 (free, no key). We use the throttled
 * dev host, which is the one recommended for development, and cache for 30 minutes since launch
 * times slip and the anonymous rate limits are modest.
 */

import { readCacheTTL, writeCacheTTL } from './cache'

const LL2 = 'https://lldev.thespacedevs.com/2.2.0'
const TTL = 30 * 60 * 1000

export interface Launch {
  id: string
  missionName: string
  rocket: string
  provider: string
  net: string
  status: string
  statusAbbrev: string
  location: string
  image?: string
}

interface LaunchRaw {
  id: string
  name: string
  net: string
  status?: { name?: string; abbrev?: string }
  launch_service_provider?: { name?: string }
  rocket?: { configuration?: { full_name?: string; name?: string } }
  mission?: { name?: string }
  pad?: { location?: { name?: string } }
  image?: string | { image_url?: string }
}

function toLaunch(r: LaunchRaw): Launch {
  const image = typeof r.image === 'string' ? r.image : r.image?.image_url
  return {
    id: r.id,
    missionName: r.mission?.name || r.name.split('|').pop()?.trim() || r.name,
    rocket: r.rocket?.configuration?.full_name || r.rocket?.configuration?.name || '',
    provider: r.launch_service_provider?.name || '',
    net: r.net,
    status: r.status?.name || '',
    statusAbbrev: r.status?.abbrev || '',
    location: r.pad?.location?.name || '',
    image: image || undefined,
  }
}

async function fetchLaunches(path: string, cacheKey: string, signal?: AbortSignal): Promise<Launch[]> {
  const cached = readCacheTTL<Launch[]>(cacheKey, TTL)
  if (cached) return cached
  const res = await fetch(`${LL2}${path}`, { signal })
  if (!res.ok) throw new Error(`Launch feed failed (${res.status})`)
  const j = (await res.json()) as { results?: LaunchRaw[] }
  const items = (j.results ?? []).map(toLaunch)
  writeCacheTTL(cacheKey, items)
  return items
}

export function fetchUpcomingLaunches(signal?: AbortSignal): Promise<Launch[]> {
  return fetchLaunches('/launch/upcoming/?limit=6&mode=list', 'orrery:launch:upcoming', signal)
}

export function fetchRecentLaunches(signal?: AbortSignal): Promise<Launch[]> {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString()
  return fetchLaunches(
    `/launch/previous/?limit=8&ordering=-net&net__gte=${weekAgo}&mode=list`,
    'orrery:launch:recent',
    signal,
  )
}
