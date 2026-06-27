// Space-flight headlines from the Spaceflight News API (free, no key).

import { readCacheTTL, writeCacheTTL } from './cache'

const SNAPI = 'https://api.spaceflightnewsapi.net/v4'
const TTL = 30 * 60 * 1000

export interface Article {
  id: number
  title: string
  url: string
  imageUrl?: string
  newsSite: string
  summary: string
  publishedAt: string
}

interface ArticleRaw {
  id: number
  title: string
  url: string
  image_url?: string
  news_site?: string
  summary?: string
  published_at: string
}

export async function fetchSpaceNews(signal?: AbortSignal): Promise<Article[]> {
  const cacheKey = 'orrery:news'
  const cached = readCacheTTL<Article[]>(cacheKey, TTL)
  if (cached) return cached

  const res = await fetch(`${SNAPI}/articles/?limit=8&ordering=-published_at`, { signal })
  if (!res.ok) throw new Error(`News feed failed (${res.status})`)
  const j = (await res.json()) as { results?: ArticleRaw[] }
  const items: Article[] = (j.results ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    url: a.url,
    imageUrl: a.image_url || undefined,
    newsSite: a.news_site || '',
    summary: a.summary || '',
    publishedAt: a.published_at,
  }))
  writeCacheTTL(cacheKey, items)
  return items
}
