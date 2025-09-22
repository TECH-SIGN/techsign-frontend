import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface ZoomInOnLoadProps {
  children: ReactNode;
  className?: string;
  fromScale?: number;  // start scale
  duration?: number;
  ease?: string;
}

const ZoomInOnLoad: React.FC<ZoomInOnLoadProps> = ({
  children,
  className,
  fromScale = 0.7,   // chhota se shuru
  duration = 2.4,
  ease = "power2.out",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { transformOrigin: "center center" });
      gsap.fromTo(
        containerRef.current,
        { scale: fromScale },
        { scale: 1, duration, ease }
      );
    }
  }, [fromScale, duration, ease]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-full relative ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default ZoomInOnLoad;
