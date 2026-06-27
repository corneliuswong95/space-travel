import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is on (or near) screen, so heavy work — like rendering a 3D
 * scene — can pause when it scrolls out of view.
 */
export function useInView<T extends Element>(rootMargin = '250px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
