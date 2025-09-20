// src/components/animations/PageTransition.tsx
import React, { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"

const PageTransition: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (!overlayRef.current) return

    const tl = gsap.timeline()

    // reset
    gsap.set(overlayRef.current, { opacity: 1,scale: 1.05 }) 

    tl.to(overlayRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    })
      .to(overlayRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut",
      })
  }, [location.pathname]) // 👈 route change pe trigger hoga

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] bg-black pointer-events-none shadow-lg "
    />
  )
}

export default PageTransition
