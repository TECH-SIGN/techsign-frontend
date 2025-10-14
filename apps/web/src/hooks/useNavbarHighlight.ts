import { useLayoutEffect } from "react"
import gsap from "gsap"
import { useLocation } from "react-router-dom"
import type { NavbarHighlightOptions } from "@techsign/shared"

export function useNavHighlight(options?: NavbarHighlightOptions) {
  const { pathname } = useLocation()

  const {
    linkSelector = ".nav-link",
    indicatorSelector = ".nav-indicator",
    duration = 0.5,
    ease = "power3.out",
    delayAfterTransition = 600, // ✅ default delay (ms)
  } = options || {}

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      const indicator = document.querySelector(indicatorSelector) as HTMLElement | null
      const activeLink = Array.from(document.querySelectorAll(linkSelector)).find(
        (link) => (link as HTMLAnchorElement).getAttribute("href") === pathname
      ) as HTMLElement | undefined

      if (!indicator || !activeLink) return

      const rect = activeLink.getBoundingClientRect()
      const navRect = activeLink.offsetParent?.getBoundingClientRect()
      if (!navRect) return

      const left = rect.left - navRect.left
      const width = rect.width

      gsap.to(indicator, {
        x: left,
        width,
        duration,
        ease,
      })
    }, delayAfterTransition)

    return () => clearTimeout(timeout)
  }, [pathname, linkSelector, indicatorSelector, duration, ease, delayAfterTransition])
}
