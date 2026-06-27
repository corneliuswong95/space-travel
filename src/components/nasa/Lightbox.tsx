import { useEffect, useRef, type ReactNode } from 'react'

import styles from './nasa.module.css'

/** Accessible modal: scroll-locked, Escape/backdrop to close, focus moved in and restored. */
export function Lightbox({
  onClose,
  label,
  children,
}: {
  onClose: () => void
  label?: string
  children: ReactNode
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
