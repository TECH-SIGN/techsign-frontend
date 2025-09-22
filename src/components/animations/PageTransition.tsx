import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dimRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (!dimRef.current || !overlayRef.current) return;

    // 🔹 F5 / page reload detect
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    // Browser default scroll restoration disable
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 🔹 F5 / reload → scroll top instantly
    if (lastPathname.current === null && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

      // Overlay turant hide (fallback)
      gsap.set(overlayRef.current, { opacity: 0, yPercent: 0 });
      gsap.set(dimRef.current, { opacity: 0 });

      lastPathname.current = location.pathname;
      return;
    }

    // Agar same path hai to kuch mat karo
    if (lastPathname.current === location.pathname) return;

    // 🔹 Normal transition chalana hai
    const tl = gsap.timeline();
    try {
      gsap.set(overlayRef.current, { yPercent: 100, opacity: 1 });
      gsap.set(dimRef.current, { opacity: 0 });

      tl.to(dimRef.current, {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(overlayRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.inOut",
        })
        .to([overlayRef.current, dimRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
        });

      lastPathname.current = location.pathname;
    } catch (err) {
      console.warn("PageTransition animation failed, fallback applied", err);
      gsap.set(overlayRef.current, { opacity: 0, yPercent: 0 });
      gsap.set(dimRef.current, { opacity: 0 });
    }
  }, [location.pathname]);

  return (
    <>
      {/* Dim background */}
      <div
        ref={dimRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[9998] pointer-events-none"
      />
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-white shadow-2xl z-[9999] pointer-events-none"
      />
    </>
  );
};

export default PageTransition;
