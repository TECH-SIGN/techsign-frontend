import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { useLocation } from "react-router-dom"
import type { NavbarHighlightOptions } from "@techsign/shared"

export function useNavHighlight(options?: NavbarHighlightOptions) {
  const { pathname } = useLocation()

  const {
    linkSelector = ".nav-link",
    indicatorSelector = ".nav-indicator",
    duration = 0.4,
    ease = "power3.out",
  } = options || {}

  // Keep the latest pathname in a ref so the event handler knows which route to apply
  const pendingPathRef = useRef<string | null>(null)

  useLayoutEffect(() => {
    const indicator = document.querySelector(indicatorSelector) as HTMLElement | null
    if (!indicator) return

    // Always update the pending path right away (but DO NOT run highlight yet)
    pendingPathRef.current = pathname

    // If the route is home ("/") we want to hide immediately (as you requested earlier)
    if (pathname === "/") {
      gsap.killTweensOf(indicator)
      // Hide cleanly and reset transform so there is no leftover x
      gsap.set(indicator, { width: 0, clearProps: "x" })
      return
    }

    // The function that will perform measurement + animate for a given path
    const applyHighlightForPendingPath = () => {
      const targetPath = pendingPathRef.current
      if (!targetPath) return

      const links = Array.from(document.querySelectorAll(linkSelector))
      const activeLink = links.find(
        (link) => (link as HTMLAnchorElement).getAttribute("href") === targetPath
      ) as HTMLElement | undefined

      // If no matching nav link found, hide the indicator
      if (!activeLink) {
        gsap.killTweensOf(indicator)
        gsap.to(indicator, { width: 0, duration, ease })
        return
      }

      const rect = activeLink.getBoundingClientRect()
      const parentRect = activeLink.offsetParent?.getBoundingClientRect()
      if (!parentRect) {
        // defensive: if parent missing, just hide
        gsap.to(indicator, { width: 0, duration, ease })
        return
      }

      const left = rect.left - parentRect.left
      const width = rect.width

      // kill any running tweens to avoid overlap
      gsap.killTweensOf(indicator)

      // Preserve your animation style (animate x & width) — but only after transition complete
      gsap.to(indicator, {
        x: left,
        width,
        duration,
        ease,
      })
    }

    // Handler called when page transition completes
    const onPageTransitionComplete = () => {
      // Use requestAnimationFrame to ensure the browser has painted new DOM
      // (extra robustness for layout measurement)
      requestAnimationFrame(() => {
        applyHighlightForPendingPath()
      })
    }

    // Listen for the event dispatched by PageTransition
    window.addEventListener("pageTransitionComplete", onPageTransitionComplete)

    // Cleanup
    return () => {
      window.removeEventListener("pageTransitionComplete", onPageTransitionComplete)
      gsap.killTweensOf(indicator)
      pendingPathRef.current = null
    }
  }, [pathname, linkSelector, indicatorSelector, duration, ease])
}
