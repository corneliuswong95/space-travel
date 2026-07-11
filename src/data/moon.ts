/*
 * Moon phase computed locally (no API): days since a known new moon, modulo the synodic month.
 * Accurate to well within a day — plenty for "what does the Moon look like tonight".
 */

const SYNODIC = 29.530588853
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14) // 2000-01-06 18:14 UTC

export const MOON_GLYPHS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
export const MOON_NAMES = [
  'New moon',
  'Waxing crescent',
  'First quarter',
  'Waxing gibbous',
  'Full moon',
  'Waning gibbous',
  'Last quarter',
  'Waning crescent',
]

export interface MoonPhase {
  /** Index into MOON_GLYPHS / MOON_NAMES (0–7). */
  idx: number
  /** Percent of the disc lit, 0–100. */
  illumination: number
  /** Whole days until the next full moon. */
  daysToFull: number
  name: string
  glyph: string
}

export function moonPhase(now = Date.now()): MoonPhase {
  const days = (now - KNOWN_NEW_MOON) / 86_400_000
  let p = (days % SYNODIC) / SYNODIC
  if (p < 0) p += 1
  const idx = Math.round(p * 8) % 8
  const illumination = Math.round(((1 - Math.cos(2 * Math.PI * p)) / 2) * 100)
  const daysToFull = Math.round(((0.5 - p + 1) % 1) * SYNODIC)
  return { idx, illumination, daysToFull, name: MOON_NAMES[idx], glyph: MOON_GLYPHS[idx] }
}
