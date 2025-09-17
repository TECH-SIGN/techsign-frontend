// src/hooks/useScrollDirection.ts
import { useEffect, useState, useRef } from "react"

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const lenis: any = (window as any).lenis
    if (!lenis) return

    const onScroll = ({ scroll }: { scroll: number; direction: number }) => {
      if (scroll > lastScroll.current) {
        // Scroll Down → hide navbar
        setHidden(true)
      } else {
        // Scroll Up → show navbar
        setHidden(false)
      }
      lastScroll.current = scroll
    }

    lenis.on("scroll", onScroll)

    return () => {
      lenis.off("scroll", onScroll)
    }
  }, [])

  return hidden
}
