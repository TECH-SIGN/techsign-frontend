import { useEffect } from 'react'
import { useLocation } from 'react-router-dom' // ✅ Import for tracking route changes

// Lazy import to avoid SSR and bundle bloat when not needed
export function useSmoothScroll(enabled: boolean = true) {
  const { pathname } = useLocation() // ✅ Track current route path

  useEffect(() => {
    if (!enabled) return

    let lenis: any
    let rafId = 0
    let cancelled = false

    ;(async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default as any
        if (cancelled) return

        lenis = new Lenis({
          smoothWheel: true,
          duration: 1.1,
          lerp: 0.1,
        })

        const raf = (time: number) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)
      } catch (e) {
        if (import.meta?.env?.DEV) {
          console.warn('[useSmoothScroll] Lenis not installed. Run: npm i @studio-freight/lenis')
        }
      }
    })()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) {
        try {
          lenis.destroy?.()
        } catch (err) {
          console.warn('[useSmoothScroll] Error destroying Lenis instance:', err)
        }
      }
    }
  }, [enabled, pathname]) // ✅ Depend on route change
}
