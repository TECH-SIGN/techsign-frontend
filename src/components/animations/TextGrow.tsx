// src/components/animations/TextGrow.tsx
import { motion } from "framer-motion";
import React from "react";

interface TextGrowProps {
  children: React.ReactNode;
  duration?: number;   // animation kitni der chale
  delay?: number;      // shuru hone me delay
  className?: string;  // tailwind classes
}

const TextGrow: React.FC<TextGrowProps> = ({
  children,
  duration = 0.7,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scale: 0.2, opacity: 0 }}     // chhota aur invisible
      animate={{ scale: 1, opacity: 1 }}       // apne original size me aayega
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TextGrow;