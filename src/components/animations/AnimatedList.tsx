// src/components/animations/AnimatedList.tsx
import { motion } from "framer-motion"
import React from "react"

interface AnimatedListProps {
  items: React.ReactNode[]   // 👈 list me jo bhi chahiye pass kar sakte ho (string, jsx, spans etc)
  className?: string
  delayStep?: number         // har ek ke beech kitna delay ho (default 0.2s)
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  className = "",
  delayStep = 0.2,
}) => {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: index * delayStep,
            ease: "easeOut",
          }}
          className="overflow-hidden"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

export default AnimatedList
