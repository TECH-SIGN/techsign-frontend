import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { UseCursorReturn } from '@techsign/shared'

export function useCursor(): UseCursorReturn {
  const ref = useRef<HTMLDivElement>(null)
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

    const onOver = () => { hoveringCount++; if (hoveringCount > 0) setHover(true) }
    const onOut = () => { hoveringCount = Math.max(0, hoveringCount - 1); if (hoveringCount === 0) setHover(false) }
    const onWindowLeave = () => setHidden(true)
    const onWindowEnter = () => setHidden(false)
    const onDocMouseOut = (e: MouseEvent) => { if (!(e.relatedTarget as Node | null)) setHidden(true) }
    const onDocMouseOver = () => setHidden(false)
    const onVisibility = () => setHidden(document.visibilityState === 'hidden')
    const hoverSelector = 'a, button, [role="button"], [data-cursor="hover"]'

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onWindowLeave)
    window.addEventListener('blur', onWindowLeave)
    window.addEventListener('mouseenter', onWindowEnter)
    window.addEventListener('focus', onWindowEnter)
    document.addEventListener('mouseout', onDocMouseOut)
    document.addEventListener('mouseover', onDocMouseOver)
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('mouseover', (e) => { const t = e.target as HTMLElement; if (t && t.closest(hoverSelector)) onOver() })
    document.addEventListener('mouseout', (e) => { const t = e.target as HTMLElement; if (t && t.closest(hoverSelector)) onOut() })

    const follow = () => {
      const p = pos.current
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
