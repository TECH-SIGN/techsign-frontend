import { useEffect } from 'react'

export function useGsapAnimations(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    let ctx: any

    ;(async () => {
      try {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        // Basic fade/slide-in when elements enter viewport
        const els = document.querySelectorAll('[data-animate="fade-up"]')
        els.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el as Element,
                start: 'top 85%',
              },
            }
          )
        })

        // Simple parallax for elements with data-parallax
        const parallaxEls = document.querySelectorAll('[data-parallax]')
        parallaxEls.forEach((el) => {
          const strength = Number((el as HTMLElement).dataset.parallax) || 40
          gsap.to(el, {
            y: () => strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top bottom',
              scrub: true,
            },
          })
        })
      } catch (e) {
        if (import.meta?.env?.DEV) {
          console.warn('[useGsapAnimations] gsap not installed. Run: npm i gsap')
        }
      }
    })()

    return () => {
      try {
        // cleanup all ScrollTriggers
        // dynamic import to avoid referencing if not installed
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((st: any) => st.kill())
        })
      } catch {}
    }
  }, [enabled])
}
