/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** NASA Open API key. Falls back to DEMO_KEY (rate-limited) if unset. */
  readonly VITE_NASA_API_KEY?: string
}
