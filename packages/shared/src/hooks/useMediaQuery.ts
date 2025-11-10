import * as React from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    // Safari <14
    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', onChange)
    else (mql as any).addListener?.(onChange)

    setMatches(mql.matches)
    return () => {
      if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', onChange)
      else (mql as any).removeListener?.(onChange)
    }
  }, [query])

  return matches
}
