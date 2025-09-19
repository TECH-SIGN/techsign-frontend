import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import SplitType from "split-type"
import { useLocation } from "react-router-dom"

interface LogoAnimatorProps {
  text: string
  className?: string
}

const LogoAnimator: React.FC<LogoAnimatorProps> = ({ text, className }) => {
  const logoRef = useRef<HTMLHeadingElement | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (!logoRef.current) return

    // split text into chars
    const split = new SplitType(logoRef.current, { types: "chars" })
    const chars = split.chars ?? []

    // reset (small + invisible)
    gsap.set(chars, { scale: 0.5, opacity: 0 })

    // animate zoom-out one by one
    gsap.to(chars, {
      key: location.pathname + text, // to re-trigger on route change 
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
      stagger: 0.1, // ek ek karke aayega
    })

    // cleanup SplitType
    return () => {
      split.revert()
    }
  }, [location.pathname, text])

  return (
    <h1 ref={logoRef} className={`font-bold text-2xl ${className ?? ""}`}>
      {text}
    </h1>
  )
}

export default LogoAnimator
