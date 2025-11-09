import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PortfolioVideoProps } from "@techsign/shared";

const PortfolioVideo: React.FC<PortfolioVideoProps> = ({ src, thumbnail }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="relative aspect-video w-full h-full overflow-hidden rounded-3xl will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Thumbnail */}
      <motion.img
        src="/images/thambnail-1.png"
        alt="video thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Video */}
      <motion.video
        ref={videoRef}
        src={src}
        preload="auto"
        muted
        playsInline
        loop
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default PortfolioVideo;
