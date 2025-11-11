import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MirrorRevealProps } from "@techsign/shared";

export default function MirrorReveal({
  children,
  backgroundColor = "rgba(0, 0, 0, 0.93)",
  duration = 1.6,
  pieces = 36, // total number of mirror pieces
}: MirrorRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const piecesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Scatter mirror pieces around the viewport initially
    piecesRef.current.forEach((piece) => {
      const randomX = gsap.utils.random(-300, 300);
      const randomY = gsap.utils.random(-200, 200);
      const randomRot = gsap.utils.random(-90, 90);

      gsap.set(piece, {
        x: randomX,
        y: randomY,
        rotation: randomRot,
        opacity: 0,
      });
    });

    // Animate pieces to join into position
    tl.to(piecesRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      stagger: {
        each: 0.02,
        from: "center",
      },
      duration,
      ease: "back.out(1.7)",
    });

    // Fade in content after pieces form
    tl.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8" // overlaps slightly
    );
  }, [duration, pieces]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-4xl mx-auto my-25 max-w-[1345px]"
    >
      {/* Pixel mirror pieces */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {Array.from({ length: pieces }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) piecesRef.current[i] = el;
            }}
            className="w-full h-full"
            style={{
              backgroundColor,
              zIndex: 5,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 p-10 text-white">
        {children}
      </div>
    </div>
  );
}
