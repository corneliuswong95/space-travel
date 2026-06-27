import { fetchUpcomingLaunches, fetchRecentLaunches, type Launch } from '@/data/launches'
import { fetchSpaceNews, type Article } from '@/data/news'
import { useAsync } from './useAsync'

export function useUpcomingLaunches() {
  return useAsync<Launch[]>(fetchUpcomingLaunches)
}

export function useRecentLaunches() {
  return useAsync<Launch[]>(fetchRecentLaunches)
}

export function useSpaceNews() {
  return useAsync<Article[]>(fetchSpaceNews)
}
