import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { useNasaImages } from '@/hooks/useExplore'
import type { NasaImage } from '@/data/nasaImages'
import { FeedError, FeedLoading } from './FeedStates'
import { Lightbox } from './Lightbox'
import styles from './nasa.module.css'

export function ImageSearch() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('Jupiter')
  const { status, data, reload } = useNasaImages(query)
  const [selected, setSelected] = useState<NasaImage | null>(null)

  return (
    <section aria-labelledby="search-h">
      <div className={styles.head}>
        <span className={styles.kicker} id="search-h">
          Search NASA's image library
        </span>
      </div>

      <form
        className={styles.searchBar}
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) setQuery(input.trim())
        }}
      >
        <input
          className={styles.searchInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Try “${query}”, “nebula”, “Apollo”…`}
          aria-label="Search NASA images"
        />
        <Button size="sm" type="submit">
          Search
        </Button>
      </form>

      {status === 'loading' ? <FeedLoading rows={3} /> : null}
      {status === 'error' ? <FeedError onRetry={reload} /> : null}
      {status === 'success' && data ? (
        data.length === 0 ? (
          <p className={styles.stateText}>No images for “{query}”. Try another search.</p>
        ) : (
          <ul className={styles.grid}>
            {data.map((img) => (
              <li key={img.id}>
                <button
                  type="button"
                  className={styles.tile}
                  onClick={() => setSelected(img)}
                  aria-label={img.title}
                >
                  <img
                    className={styles.thumb}
                    src={img.thumb}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {selected ? (
        <Lightbox onClose={() => setSelected(null)} label={selected.title}>
          <div className={styles.lbMedia}>
            <img className={styles.lbImg} src={selected.large} alt={selected.title} />
          </div>
          <div className={styles.lbInfo}>
            <span className={styles.kicker}>
              {selected.date ? new Date(selected.date).getFullYear() : 'NASA'}
            </span>
            <h2 className={styles.lbTitle}>{selected.title}</h2>
            <div className={styles.aActions}>
              <span className={styles.credit}>NASA image &amp; video library</span>
              <a className={styles.more} href={selected.large} target="_blank" rel="noreferrer">
                Full image ↗
              </a>
            </div>
          </div>
        </Lightbox>
      ) : null}
    </section>
  )
}
