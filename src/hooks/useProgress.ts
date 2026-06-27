import { useSyncExternalStore } from 'react'

/*
 * A tiny localStorage-backed store for lesson completion, shared across the app via
 * useSyncExternalStore so the catalog and a lesson page stay in sync. localStorage is fine
 * for v1; this can be swapped for a backend later without changing the hook's surface.
 */

const KEY = 'orrery:progress:v1'

function read(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as { completed?: string[] }
    return new Set(parsed.completed ?? [])
  } catch {
    return new Set()
  }
}

let current = read()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ completed: [...current] }))
  } catch {
    // Ignore write failures (private mode, quota) — progress just won't persist.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): ReadonlySet<string> {
  return current
}

export function markComplete(slug: string) {
  if (current.has(slug)) return
  current = new Set(current).add(slug)
  persist()
  emit()
}

export function clearComplete(slug: string) {
  if (!current.has(slug)) return
  const next = new Set(current)
  next.delete(slug)
  current = next
  persist()
  emit()
}

export function resetProgress() {
  current = new Set()
  persist()
  emit()
}

// Keep multiple tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      current = read()
      emit()
    }
  })
}

export function useProgress() {
  const completed = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return {
    completed,
    isComplete: (slug: string) => completed.has(slug),
    markComplete,
    clearComplete,
    resetProgress,
  }
}
