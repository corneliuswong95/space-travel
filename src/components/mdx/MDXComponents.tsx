import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'

import { ComparisonChart } from '@/components/charts/ComparisonChart'
import { AtlasPlate } from '@/components/story/AtlasPlate'
import { ViewerSkeleton } from '@/components/three/ViewerSkeleton'
import styles from './MDXComponents.module.css'

// 3D is lazy: the lesson prose renders and stays interactive before Three.js arrives.
const LazyBodyViewer = lazy(() =>
  import('@/components/three/BodyViewer').then((m) => ({ default: m.BodyViewer })),
)

function BodyViewer(props: { body: string; caption?: string }) {
  return (
    <Suspense fallback={<ViewerSkeleton />}>
      <LazyBodyViewer {...props} />
    </Suspense>
  )
}

/** Inline term with its definition revealed on hover or keyboard focus. */
function Term({ def, children }: { def: string; children: ReactNode }) {
  return (
    <span className={styles.term} tabIndex={0}>
      {children}
      <span role="tooltip" className={styles.termPop}>
        {def}
      </span>
    </span>
  )
}

/** Instrument-style readout spotlighting a single figure. */
function Readout({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className={styles.readout}>
      <span className={styles.readoutLabel}>{label}</span>
      <span className={styles.readoutValue}>
        {value}
        {unit ? <span className={styles.readoutUnit}> {unit}</span> : null}
      </span>
    </div>
  )
}

/** The lesson's main takeaway. */
function KeyIdea({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.keyIdea}>
      <span className={styles.keyIdeaTag}>Key idea</span>
      <div className={styles.keyIdeaBody}>{children}</div>
    </aside>
  )
}

/** A quieter field-note annotation. */
function Aside({ children }: { children: ReactNode }) {
  return <aside className={styles.note}>{children}</aside>
}

/** Components made available to every MDX lesson via MDXProvider. */
export const mdxComponents = {
  Term,
  Readout,
  KeyIdea,
  Aside,
  ComparisonChart,
  AtlasPlate,
  BodyViewer,
}
