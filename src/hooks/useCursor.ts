import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let hoveringCount = 0

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onOver = (e: Event) => {
      hoveringCount += 1
      if (hoveringCount > 0) setHover(true)
    }
    const onOut = (e: Event) => {
      hoveringCount = Math.max(0, hoveringCount - 1)
      if (hoveringCount === 0) setHover(false)
    }

    window.addEventListener('mousemove', onMove)
    // Delegated hover tracking for elements opting-in with data-cursor="hover"
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement
      if (t && t.closest('[data-cursor="hover"]')) onOver(e)
    })
    document.addEventListener('mouseout', (e) => {
      const t = e.target as HTMLElement
      if (t && t.closest('[data-cursor="hover"]')) onOut(e)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return { ref, hover }
}
