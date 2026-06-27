import { useCallback, useEffect, useState } from 'react'

type Status = 'loading' | 'success' | 'error'

interface AsyncState<T> {
  status: Status
  data?: T
  error?: string
}

/** Runs an abortable loader on mount (and on reload); reports loading/success/error. */
export function useAsync<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setState({ status: 'loading' })

    loader(controller.signal)
      .then((data) => {
        if (active) setState({ status: 'success', data })
      })
      .catch((err: unknown) => {
        if (!active) return
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({ status: 'error', error: err instanceof Error ? err.message : 'Unknown error' })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [loader, nonce])

  const reload = useCallback(() => setNonce((n) => n + 1), [])
  return { ...state, reload }
}
