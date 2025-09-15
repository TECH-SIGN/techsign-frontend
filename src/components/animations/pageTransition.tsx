// src/components/animations/PageTransition.tsx
import React from "react";
import { motion } from "framer-motion";

/** Named export so other files can import the RectLike type */
export type RectLike = { left: number; top: number; width: number; height: number };

interface PageTransitionProps {
  originRect?: RectLike | null;
  children: React.ReactNode;
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({ originRect = null, children, duration = 0.55 }) => {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useLayoutEffect(() => {
    // calculate offset (distance from button center -> screen center)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (originRect) {
      const originX = originRect.left + originRect.width / 2;
      const originY = originRect.top + originRect.height / 2;
      setOffset({ x: originX - centerX, y: originY - centerY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [originRect]);

  // fallback: simple fade if no originRect
  if (!originRect) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration * 0.8, ease: "easeInOut" }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    );
  }

  // animate from button position/size to full-screen
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.06, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.06, x: offset.x, y: offset.y }}
      transition={{ duration, ease: [0.77, 0, 0.175, 1] }}
      style={{ transformOrigin: "center center", position: "fixed", inset: 0, zIndex: 40 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
