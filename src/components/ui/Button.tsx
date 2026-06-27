import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './Button.module.css'

type Variant = 'primary' | 'ghost' | 'quiet'
type Size = 'sm' | 'md'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Render as a client-side router link. */
  to?: string
  /** Render as an external anchor (opens in a new tab). */
  href?: string
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  children,
  ...rest
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
