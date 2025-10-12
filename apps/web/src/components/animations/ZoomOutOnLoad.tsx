import { useEffect, useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ZoomInOnLoadProps } from "@techsign/shared";


const ZoomInOnLoad: React.FC<ZoomInOnLoadProps> = ({
  children,
  className = "",
  fromScale = 0.5,
  duration = 2.3,
  ease = "power2.out",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find a <video> element inside children
    const video = container.querySelector("video")
    videoRef.current = video

    // Hide content initially
    gsap.set(container, { opacity: 0, scale: fromScale })

    const runAnimation = () => {
      gsap.killTweensOf(container)
      gsap.to(container, {
        opacity: 1,
        scale: 1,
        duration,
        ease,
        clearProps: "transform,opacity",
        onStart: () => setIsReady(true),
      })
    }

    // Run when video is ready
    if (video instanceof HTMLVideoElement) {
      if (video.readyState >= 3) {
        runAnimation()
      } else {
        const handleLoaded = () => runAnimation()
        video.addEventListener("loadeddata", handleLoaded, { once: true })
        return () => video.removeEventListener("loadeddata", handleLoaded)
      }
    } else {
      runAnimation()
    }

    return () => {
      gsap.killTweensOf(container)
    }
  }, [fromScale, duration, ease])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-full relative will-change-transform transition-colors duration-300 ${
        isReady ? "bg-transparent" : "bg-black"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ZoomInOnLoad;
