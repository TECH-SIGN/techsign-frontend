import { useEffect } from 'react'

// Lazy import to avoid SSR and bundle bloat when not needed
export function useSmoothScroll(enabled: boolean = true) {
   // ✅ Track current route path

  useEffect(() => {
    if (!enabled) return

    const lenis: any = (window as any).lenis
    if (!lenis) return

    let rafId: number

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [enabled])
}
