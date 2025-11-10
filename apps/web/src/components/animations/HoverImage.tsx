import * as React from "react"
import { motion } from "framer-motion"
import { HoverImageProps } from "@techsign/shared"


const HoverImage: React.FC<HoverImageProps> = ({ src, alt, className }) => {
  return (
    <motion.div
      className={`overflow-hidden rounded-xl shadow-lg ${className}`}
      whileHover={{ scale: 0.9, rotate: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  )
}

export default HoverImage
