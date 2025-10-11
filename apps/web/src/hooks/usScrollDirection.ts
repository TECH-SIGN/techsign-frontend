import { useEffect, useState } from "react"
import { UseScrollDirectionReturn } from "../types/Hooks"

export function useScrollDirection(): UseScrollDirectionReturn {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScroll = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      if (current > lastScroll && current > 50) {
        setHidden(true)  // down
      } else {
        setHidden(false) // up
      }
      lastScroll = current
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return hidden
}

