// Search NASA's image & video library (keyless). https://images.nasa.gov

const IMAGES = 'https://images-api.nasa.gov'

export interface NasaImage {
  id: string
  title: string
  date: string
  thumb: string
  large: string
}

interface ImageItem {
  data?: Array<{ nasa_id?: string; title?: string; date_created?: string }>
  links?: Array<{ href?: string }>
}

export async function searchNasaImages(query: string, signal?: AbortSignal): Promise<NasaImage[]> {
  const q = query.trim()
  if (!q) return []

  const res = await fetch(
    `${IMAGES}/search?q=${encodeURIComponent(q)}&media_type=image`,
    { signal },
  )
  if (!res.ok) throw new Error(`NASA image search failed (${res.status})`)
  const j = (await res.json()) as { collection?: { items?: ImageItem[] } }

  return (j.collection?.items ?? [])
    .map((item) => {
      const meta = item.data?.[0]
      const thumb = item.links?.[0]?.href ?? ''
      return {
        id: meta?.nasa_id ?? thumb,
        title: meta?.title ?? 'Untitled',
        date: meta?.date_created ?? '',
        thumb,
        large: thumb.replace('~thumb', '~medium'),
      }
    })
    .filter((i) => i.thumb)
    .slice(0, 12)
}
