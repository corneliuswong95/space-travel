import { useCallback } from 'react'

import { searchNasaImages, type NasaImage } from '@/data/nasaImages'
import { useAsync } from './useAsync'

export function useNasaImages(query: string) {
  const loader = useCallback((signal: AbortSignal) => searchNasaImages(query, signal), [query])
  return useAsync<NasaImage[]>(loader)
}
