import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

import { Nav } from '@/components/ui/Nav'
import { Loader } from '@/components/ui/Loader'
import styles from './RootLayout.module.css'

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <ScrollRestoration />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p className={`mono ${styles.footMark}`}>ORRERY · {new Date().getFullYear()}</p>
          <p className={styles.footNote}>
            A guided tour of the night sky. Lesson content reads offline; live data from NASA
            Open APIs is layered on top when it's reachable.
          </p>
          <p className={styles.footNote}>Planet textures by Solar System Scope (CC BY 4.0).</p>
          <p className={`mono ${styles.footBy}`}>Built by Cornelius Wong</p>
        </div>
      </footer>
    </div>
  )
}
