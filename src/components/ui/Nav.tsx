import { Link, NavLink } from 'react-router-dom'

import styles from './Nav.module.css'

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

export function Nav() {
  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Orrery — home">
          {/* Reticle mark: an instrument crosshair, not a sci-fi glyph. */}
          <svg
            className={styles.mark}
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <span className={styles.word}>Orrery</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          <NavLink to="/" end className={navClass}>
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
