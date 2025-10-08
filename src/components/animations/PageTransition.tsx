import { useEffect, useRef, useState } from "react"
import { useOutlet } from "react-router-dom"
import gsap from "gsap"
import { PageTransitionRefs } from "../../types/animations"
import Navbar from "../layout/Navbar"
import { LOGO_TEXT, NAVBAR_LINKS } from "../../constants"

const PageTransition = () => {
  const refs: PageTransitionRefs = {
    overlayRef: useRef<HTMLDivElement>(null),
    dimRef: useRef<HTMLDivElement>(null),
    lastPathname: useRef<string | null>(null),
  }

  // const location = useLocation()
  const outlet = useOutlet()   // 👈 abhi match hua hua element
  const [displayElement, setDisplayElement] = useState(outlet) // jo dikhana hai
  const [transitionDone, setTransitionDone] = useState(false);

  useEffect(() => {
    if (!refs.overlayRef.current || !refs.dimRef.current) return

    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload"

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // 🔹 On reload
    if (refs.lastPathname.current === null && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      refs.lastPathname.current = location.pathname
      setDisplayElement(outlet);
      setTransitionDone(true);
      return
    }

    // 🔹 On first load
    if (refs.lastPathname.current === null && !isReload) {
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      refs.lastPathname.current = location.pathname
      setDisplayElement(outlet)
      return
    }

    if (refs.lastPathname.current === location.pathname) return

    try {
      gsap.set(refs.overlayRef.current, { yPercent: 100, opacity: 1 })
      gsap.set(refs.dimRef.current, { opacity: 0 })


      const tl = gsap.timeline({
        onComplete: () => {
          refs.lastPathname.current = location.pathname
        }
      })

      tl.to(refs.dimRef.current, {
        opacity: 0.2,
        duration: 0.2,
        ease: "power2.out",
      })
        .to(refs.overlayRef.current, {
          yPercent: 0,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => {
            // ✅ Jaise hi overlay puri screen cover kare → new page dikhana shuru
            setDisplayElement(outlet);
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            refs.lastPathname.current = location.pathname
          }
        })
        .to([refs.overlayRef.current, refs.dimRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => {
            setTransitionDone(true);
          }
        })
    } catch (err) {
      console.warn("PageTransition animation failed, fallback applied", err)
      gsap.set(refs.overlayRef.current, { yPercent: 100, opacity: 1 });
      gsap.set(refs.dimRef.current, { opacity: 0 });
      setTransitionDone(false); // reset before new transition
      setDisplayElement(outlet)
    }
  }, [location.pathname])

  return (
    <>
      <div
        ref={refs.dimRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[9998] pointer-events-none"
      />
      <div
        ref={refs.overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-white shadow-2xl z-[9999] pointer-events-none"
      />
      <Navbar
        logo={LOGO_TEXT}
        links={NAVBAR_LINKS}   // ✅ ye zaroori hai, warna error ayega
        animateNavItems={transitionDone}
      />

      {/* 👇 Ab ye independent render hai */}
      {displayElement}
    </>
  )
}

export default PageTransition
