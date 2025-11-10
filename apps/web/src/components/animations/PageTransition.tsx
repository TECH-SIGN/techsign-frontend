import { useEffect, useRef, useState } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import gsap from "gsap"
import { PageTransitionRefs, LOGO_TEXT, NAVBAR_LINKS } from "@techsign/shared"
import Navbar from "../layout/Navbar"

const PageTransition = () => {
  const refs: PageTransitionRefs = {
    overlayRef: useRef<HTMLDivElement>(null),
    dimRef: useRef<HTMLDivElement>(null),
    lastPathname: useRef<string | null>(null),
  }

  const location = useLocation()
  const outlet = useOutlet()
  const [displayElement, setDisplayElement] = useState(outlet)
  const [transitionDone, setTransitionDone] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    if (!refs.overlayRef.current || !refs.dimRef.current) return

    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload"

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // ✅ Skip animation on very first load
    if (isFirstLoad) {
      refs.lastPathname.current = location.pathname
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 100 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      setDisplayElement(outlet)
      setTransitionDone(true)

      // 🔥 Fire event — initial render also counts as transition complete
      window.dispatchEvent(new Event("pageTransitionComplete"))

      setIsFirstLoad(false)
      return
    }

    // ✅ Handle reload
    if (refs.lastPathname.current === null && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      refs.lastPathname.current = location.pathname
      setDisplayElement(outlet)
      setTransitionDone(true)

      // 🔥 Fire event after reload
      window.dispatchEvent(new Event("pageTransitionComplete"))
      return
    }

    // ✅ Avoid re-animating same route
    if (refs.lastPathname.current === location.pathname) return
    setTransitionDone(false)

    try {
      gsap.set(refs.overlayRef.current, { yPercent: 100, opacity: 1 })
      gsap.set(refs.dimRef.current, { opacity: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          refs.lastPathname.current = location.pathname
        },
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
            // ✅ When overlay fully covers screen → show new page
            setDisplayElement(outlet)
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            refs.lastPathname.current = location.pathname
            setTransitionDone(true)
          },
        })
        .to([refs.overlayRef.current, refs.dimRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
          onComplete: () => {
            // ✅ Transition finished → fire event for navbar highlight
            window.dispatchEvent(new Event("pageTransitionComplete"))
          },
        })
    } catch (err) {
      console.warn("PageTransition animation failed, fallback applied", err)
      gsap.set(refs.overlayRef.current, { yPercent: 100, opacity: 1 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      setDisplayElement(outlet)
      setTransitionDone(true)

      // ✅ Fallback: still trigger event so nav highlight works
      window.dispatchEvent(new Event("pageTransitionComplete"))
    }
  }, [location.pathname, outlet])

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
      <Navbar logo={LOGO_TEXT} links={NAVBAR_LINKS} animateNavItems={transitionDone} />
      {displayElement}
    </>
  )
}

export default PageTransition
