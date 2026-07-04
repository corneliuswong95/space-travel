import { useSyncExternalStore } from 'react'

/*
 * The reader's chosen theme for the lesson reading panel: warm parchment ("paper", the
 * default and the site's signature) or a dark surface ("dark") for low-light reading.
 * Persisted in localStorage and shared across the app via useSyncExternalStore, mirroring
 * useProgress — so the choice sticks between lessons and across tabs.
 */

export type ReadingTheme = 'paper' | 'dark'

const KEY = 'orrery:reading-theme:v1'

function read(): ReadingTheme {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'paper'
  } catch {
    return 'paper'
  }
}

let current: ReadingTheme = read()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try {
    localStorage.setItem(KEY, current)
  } catch {
    // Ignore write failures (private mode, quota) — the choice just won't persist.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): ReadingTheme {
  return current
}

export function setReadingTheme(theme: ReadingTheme) {
  if (current === theme) return
  current = theme
  persist()
  emit()
}

export function toggleReadingTheme() {
  setReadingTheme(current === 'dark' ? 'paper' : 'dark')
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

export function useReadingTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return { theme, setReadingTheme, toggleReadingTheme }
}
