import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { planets, bodies, type Body } from '@/data/planets'
import styles from './ComparisonChart.module.css'

type Metric = 'diameterKm' | 'distanceAu' | 'orbitalPeriodDays' | 'massEarths' | 'gravity'

interface ComparisonChartProps {
  metric: Metric
  title?: string
  unit?: string
  /** Include the Sun in the comparison (off by default — it dwarfs the planets). */
  includeSun?: boolean
}

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

interface Row {
  name: string
  value: number
  display: string
  color: string
}

function buildRows(source: Body[], metric: Metric, unit?: string): Row[] {
  return source.map((b) => {
    const value = b[metric]
    return {
      name: b.name,
      value,
      display: unit ? `${nf.format(value)} ${unit}` : nf.format(value),
      color: b.color,
    }
  })
}

// Themed tick so colours come from CSS variables (SVG presentation attributes can't use var()).
function AxisTick({ x, y, payload }: { x?: number; y?: number; payload?: { value?: string } }) {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" className={styles.tick}>
      {payload?.value}
    </text>
  )
}

function ValueLabel(props: {
  x?: number
  y?: number
  width?: number
  height?: number
  value?: string
}) {
  const { x = 0, y = 0, width = 0, height = 0, value } = props
  return (
    <text x={x + width + 8} y={y + height / 2} dy={4} className={styles.barLabel}>
      {value}
    </text>
  )
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: Row }>
}) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipName}>{row.name}</span>{' '}
      <span className={styles.tooltipValue}>{row.display}</span>
    </div>
  )
}

export function ComparisonChart({ metric, title, unit, includeSun = false }: ComparisonChartProps) {
  const rows = useMemo(
    () => buildRows(includeSun ? bodies : planets, metric, unit),
    [metric, unit, includeSun],
  )

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const height = rows.length * 40 + 16

  return (
    <figure className={styles.figure}>
      {title ? <figcaption className={styles.caption}>{title}</figcaption> : null}

      <div className={styles.chart} aria-hidden="true">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={rows} layout="vertical" margin={{ left: 4, right: 72, top: 0, bottom: 0 }}>
            <XAxis type="number" hide domain={[0, 'dataMax']} />
            <YAxis
              type="category"
              dataKey="name"
              width={82}
              tickLine={false}
              axisLine={false}
              tick={<AxisTick />}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: 'rgba(138, 147, 184, 0.12)' }}
            />
            <Bar dataKey="value" radius={[0, 3, 3, 0]} isAnimationActive={!prefersReduced}>
              {rows.map((r) => (
                <Cell key={r.name} fill={r.color} />
              ))}
              <LabelList dataKey="display" content={<ValueLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Screen-reader equivalent: the SVG chart is not readable, this table is. */}
      <table className="visually-hidden">
        <caption>{title ?? `Comparison by ${metric}`}</caption>
        <thead>
          <tr>
            <th scope="col">Body</th>
            <th scope="col">{title ?? metric}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <th scope="row">{r.name}</th>
              <td>{r.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
