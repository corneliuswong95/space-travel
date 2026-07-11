import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import styles from './Nav.module.css'

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Orrery — home">
          {/* Reticle mark: an instrument crosshair, not a sci-fi glyph. */}
          <svg className={styles.mark} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className={styles.word}>Orrery</span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <nav
          id="primary-nav"
          className={`${styles.links} ${open ? styles.linksOpen : ''}`.trim()}
          aria-label="Primary"
        >
          <NavLink to="/lessons" className={navClass}>
            Lessons
          </NavLink>
          <NavLink to="/sky" className={navClass}>
            Sky
          </NavLink>
          <NavLink to="/launches" className={navClass}>
            Launches
          </NavLink>
          <NavLink to="/explore" className={navClass}>
            Explore
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
