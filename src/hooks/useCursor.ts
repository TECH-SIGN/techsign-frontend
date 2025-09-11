import { useEffect, useRef, useState } from 'react'

export function useCursor() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let hoveringCount = 0

    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
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
    // Delegated hover tracking for interactive elements and explicit opt-in
    const hoverSelector = 'a, button, [role="button"], [data-cursor="hover"]'
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement
      if (t && t.closest(hoverSelector)) onOver(e)
    })
    document.addEventListener('mouseout', (e) => {
      const t = e.target as HTMLElement
      if (t && t.closest(hoverSelector)) onOut(e)
    })

    // Hide cursor when leaving the page / window loses focus
    window.addEventListener('mouseleave', onWindowLeave)
    window.addEventListener('blur', onWindowLeave)
    window.addEventListener('mouseenter', onWindowEnter)
    window.addEventListener('focus', onWindowEnter)
    document.addEventListener('mouseout', onDocMouseOut)
    document.addEventListener('mouseover', onDocMouseOver)
    document.addEventListener('visibilitychange', onVisibility)

    // Smooth follow loop (spring-like lerp)
    const follow = () => {
      const p = pos.current
      // damping factor for smooth, natural motion (0.15..0.25)
      const k = 0.2
      p.x += (p.tx - p.x) * k
      p.y += (p.ty - p.y) * k
      el.style.transform = `translate(${p.x}px, ${p.y}px)`
      raf.current = requestAnimationFrame(follow)
    }
    raf.current = requestAnimationFrame(follow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onWindowLeave)
      window.removeEventListener('blur', onWindowLeave)
      window.removeEventListener('mouseenter', onWindowEnter)
      window.removeEventListener('focus', onWindowEnter)
      document.removeEventListener('mouseout', onDocMouseOut)
      document.removeEventListener('mouseover', onDocMouseOver)
      document.removeEventListener('visibilitychange', onVisibility)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [hidden])

  return { ref, hover, hidden }
}
