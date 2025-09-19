import { motion } from "framer-motion"
import React from "react"
import { useLocation } from "react-router-dom"

interface NavItemAnimatorProps {
  text: string
  delay?: number
}

const NavItemAnimator: React.FC<NavItemAnimatorProps> = ({ text, delay = 0 }) => {
    const location = useLocation()
  return (
    <motion.span
      key={location.pathname + text}
      initial={{ y: 30, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="relative block overflow-hidden group"
    >
      {/* Normal state */}
      <span className="block translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
        {text}
      </span>
      {/* Hover ke liye duplicate */}
      <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
        {text}
      </span>
    </motion.span>
  )
}

export default NavItemAnimator
