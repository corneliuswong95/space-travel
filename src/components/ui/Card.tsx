import type { HTMLAttributes, ReactNode } from 'react'

import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
