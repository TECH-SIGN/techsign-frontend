// src/components/animations/PageTransition.tsx
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"

const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const dimRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (!overlayRef.current || !dimRef.current) return

    const tl = gsap.timeline()

    gsap.set(overlayRef.current, { yPercent: 100, opacity: 1 })
    gsap.set(dimRef.current, { opacity: 0 })

    tl.to(dimRef.current, {
      opacity: 0.5, // 🔥 background dim hoga
      duration: 0.4,
      ease: "power2.out",
    })

      .to(overlayRef.current, {
        yPercent: 0,
        // opacity: 1,
        duration: 0.6,
        ease: "power4.inOut",
      })
      .to([overlayRef.current, dimRef.current], {
        opacity: 0,
        duration: 0.5,
        // delay: 0.4,
        ease: "power4.inOut",
      })
  }, [location.pathname])

  return (
    <>
      {/* Dim background */}
      <div
        ref={dimRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[9998] pointer-events-none"
      />
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-white shadow-2xl z-[9999] pointer-events-none "
      />
    </>
  )
}

export default PageTransition
