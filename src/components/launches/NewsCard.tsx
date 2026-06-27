import type { Article } from '@/data/news'
import styles from './launches.module.css'

export function NewsCard({ article }: { article: Article }) {
  const date = new Date(article.publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <a className={styles.news} href={article.url} target="_blank" rel="noreferrer">
      {article.imageUrl ? (
        <img className={styles.newsImg} src={article.imageUrl} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className={styles.newsImg} aria-hidden="true" />
      )}
      <div className={styles.newsBody}>
        <span className={styles.newsSite}>
          {article.newsSite}
          {article.newsSite ? ' · ' : ''}
          {date}
        </span>
        <h3 className={styles.newsTitle}>{article.title}</h3>
        <p className={styles.newsSummary}>{article.summary}</p>
      </div>
    </a>
  )
}
