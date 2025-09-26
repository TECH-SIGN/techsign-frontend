import { useEffect, useRef, useState } from "react"
import { useLocation, Outlet } from "react-router-dom"
import gsap from "gsap"
import { PageTransitionRefs } from "../../types/animations"

const PageTransition = () => {
  // ✅ Refs with extracted type
  const refs: PageTransitionRefs = {
    overlayRef: useRef<HTMLDivElement>(null),
    dimRef: useRef<HTMLDivElement>(null),
    lastPathname: useRef<string | null>(null),
  }

  const location = useLocation()
  const [delayedPath, setDelayedPath] = useState(location.pathname)

  useEffect(() => {
    if (!refs.dimRef.current || !refs.overlayRef.current) return

    // 🔹 F5 / reload detect
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload"

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // 🔹 On reload → scroll top + hide overlay
    if (refs.lastPathname.current === null && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      refs.lastPathname.current = location.pathname
      setDelayedPath(location.pathname)
      return
    }

    // 🔹 On first load (normal open) → skip transition
    if (refs.lastPathname.current === null && !isReload) {
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      refs.lastPathname.current = location.pathname
      setDelayedPath(location.pathname)
      return
    }

    if (refs.lastPathname.current === location.pathname) return

    const tl = gsap.timeline({
      // ✅ Naya page tabhi dikhega jab overlay puri tarah se cover kar le
      onComplete: () => {
        setDelayedPath(location.pathname)
        refs.lastPathname.current = location.pathname
      }
    })

    try {
      gsap.set(refs.overlayRef.current, { yPercent: 100, opacity: 1 })
      gsap.set(refs.dimRef.current, { opacity: 0 })

      tl.to(refs.dimRef.current, {
        opacity: 0.1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(refs.overlayRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: () => {
            // ✅ Jaise hi overlay puri screen cover kare → new page load hoga
            setDelayedPath(location.pathname)
            refs.lastPathname.current = location.pathname
          }
        })
        .to([refs.overlayRef.current, refs.dimRef.current], {
          opacity: 0,
          duration: 0.5,
          ease: "power4.inOut",
        })
    } catch (err) {
      console.warn("PageTransition animation failed, fallback applied", err)
      gsap.set(refs.overlayRef.current, { opacity: 0, yPercent: 0 })
      gsap.set(refs.dimRef.current, { opacity: 0 })
      setDelayedPath(location.pathname)
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

      {/* 👇 Old page pe animation chalega, new page sirf delayedPath pe dikhega */}
      {location.pathname === delayedPath && <Outlet/>}
    </>
  )
}

export default PageTransition
