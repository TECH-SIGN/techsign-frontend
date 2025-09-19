// src/providers/ScrollProvider.tsx
import * as React from "react"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import { useGsapAnimations } from "../hooks/useGsapAnimations"

export interface ScrollProviderProps {
  children: React.ReactNode
  smooth?: boolean
  animations?: boolean
}

const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, smooth = true, animations = true }) => {
  React.useEffect(() => {
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.1,
        lerp: 0.1,
      })
      ;(window as any).lenis = lenis // 👈 global me store kiya

      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
  }, [])

  useSmoothScroll(smooth)
  useGsapAnimations(animations)

  return <>{children}</>
}

export default ScrollProvider
