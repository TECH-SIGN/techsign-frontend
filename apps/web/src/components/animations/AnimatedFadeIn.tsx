// components/animations/AnimatedFadeIn.tsx
import { motion } from "framer-motion"
import { ReactNode } from "react"
import { AnimatedFadeInProps } from "../../types/animations"

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const AnimatedFadeIn: React.FC<AnimatedFadeInProps> = ({ children, delay = 0, amount = 0.3 }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedFadeIn
