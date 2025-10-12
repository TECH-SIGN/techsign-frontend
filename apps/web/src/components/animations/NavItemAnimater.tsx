import { motion } from "framer-motion"
import React from "react"
import { useLocation } from "react-router-dom"
import { NavItemAnimatorProps } from "@techsign/shared"

const NavItemAnimator: React.FC<NavItemAnimatorProps> = ({
  text,
  delay = 0,
  animate = true, // ✅ add animate prop
}) => {
  const location = useLocation()

  // Agar animate false hai → sirf normal render karo
  if (!animate) {
    return (
      <span className="relative block overflow-hidden group">
        <span className="block translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
          {text}
        </span>
      </span>
    )
  }

  // Animate true → Framer Motion animation
  return (
    <motion.span
      key={location.pathname + text}
      initial={{ y: 30, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="relative block overflow-hidden group"
    >
      <span className="block translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
        {text}
      </span>
    </motion.span>
  )
}

export default NavItemAnimator
