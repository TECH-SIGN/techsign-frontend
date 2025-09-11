import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let hoveringCount = 0

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (hidden) setHidden(false)
    }

    const onOver = (e: Event) => {
      hoveringCount += 1
      if (hoveringCount > 0) setHover(true)
    }
    const onOut = (e: Event) => {
      hoveringCount = Math.max(0, hoveringCount - 1)
      if (hoveringCount === 0) setHover(false)
    }

    const onWindowLeave = () => setHidden(true)
    const onWindowEnter = () => setHidden(false)
    const onDocMouseOut = (e: MouseEvent) => {
      // If relatedTarget is null, the pointer left the document (window)
      if (!(e.relatedTarget as Node | null)) setHidden(true)
    }
    const onDocMouseOver = () => setHidden(false)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') setHidden(true)
      else setHidden(false)
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

    // Hide cursor when leaving the page / window loses focus
    window.addEventListener('mouseleave', onWindowLeave)
    window.addEventListener('blur', onWindowLeave)
    window.addEventListener('mouseenter', onWindowEnter)
    window.addEventListener('focus', onWindowEnter)
    document.addEventListener('mouseout', onDocMouseOut)
    document.addEventListener('mouseover', onDocMouseOver)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onWindowLeave)
      window.removeEventListener('blur', onWindowLeave)
      window.removeEventListener('mouseenter', onWindowEnter)
      window.removeEventListener('focus', onWindowEnter)
      document.removeEventListener('mouseout', onDocMouseOut)
      document.removeEventListener('mouseover', onDocMouseOver)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [hidden])

  return { ref, hover, hidden }
}
