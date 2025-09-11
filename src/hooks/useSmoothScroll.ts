import { useEffect } from 'react'

// Lazy import to avoid SSR and bundle bloat when not needed
export function useSmoothScroll(enabled: boolean = true) {
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
          lenis?.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch (e) {
        // lenis not installed; fail silently in development
        if (import.meta?.env?.DEV) {
          console.warn('[useSmoothScroll] Lenis not installed. Run: npm i @studio-freight/lenis')
        }
      }
    })()

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy?.()
    }
  }, [enabled])
}
