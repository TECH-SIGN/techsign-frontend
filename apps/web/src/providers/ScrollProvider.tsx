// src/providers/ScrollProvider.tsx
import * as React from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useGsapAnimations } from "@techsign/animations";

export interface ScrollProviderProps {
  children: React.ReactNode;
  smooth?: boolean;
  animations?: boolean;
}

const ScrollProvider: React.FC<ScrollProviderProps> = ({
  children,
  smooth = true,
  animations = true,
}) => {
  // Smooth scroll
  useSmoothScroll(smooth);

  // GSAP animations + ScrollTrigger
  useGsapAnimations(animations);

  React.useEffect(() => {
    let lenis: any;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        smoothWheel: true,
        duration: 1.1,
        lerp: 0.1,
      });
      (window as any).lenis = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    });

    return () => {
      // Cleanup Lenis on unmount
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default ScrollProvider;
