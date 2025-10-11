// src/components/animations/LogoAnimator.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { LogoAnimatorProps } from "../../types/animations";


const LogoAnimator: React.FC<LogoAnimatorProps> = ({ text, className, animate = true }) => {
  const logoRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!animate || !logoRef.current) return;

    let split: SplitType | null = null;

    try {
      split = new SplitType(logoRef.current, { types: "chars" });
    } catch (e) {
      console.warn("SplitType failed:", e);
      return; // agar error aaya to animation skip karo
    }

    const chars = split.chars ?? [];
    if (!chars.length) return;

    // reset chars
    gsap.set(chars, { scale: 0.5, opacity: 0 });

    // animate chars
    const tl = gsap.timeline();
    tl.to(chars, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
      stagger: 0.1,
    });

    // cleanup
    return () => {
      split?.revert();
      tl.kill();
    };
  }, [text, animate]);

  // simple fallback render agar animation fail ho jaye
  return (
    <h1 key={animate ? 'animate' : 'noanimate'}
      ref={logoRef}
      className={`font-bold text-2xl text-slate-900 ${className ?? ""}`}>
      {text}
    </h1>
  );
};

export default LogoAnimator;
