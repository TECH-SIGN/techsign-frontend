import { useLayoutEffect } from 'react'
import { UseGsapAnimationsOptions } from '@techsign/shared';

export function useGsapAnimations(enabled: UseGsapAnimationsOptions = true) {
  useLayoutEffect(() => {
    if (!enabled) return

    ;(async () => {
      try {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
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
                immediateRender: false,
                scrollTrigger: {
                  trigger: el as Element,
                  start: 'top 85%',
                  once: true,
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
                invalidateOnRefresh: true,
              },
            })
          })

          // Scroll-scrub effect for hero video (container marked with data-scrub-video)
          const scrubVideos = document.querySelectorAll('[data-scrub-video]')
          scrubVideos.forEach((wrap) => {
            const video = wrap.querySelector('video') as HTMLElement | null
            const overlay = wrap.querySelector('.hero-video-overlay') as HTMLElement | null
            const target = video ?? (wrap as HTMLElement)

            // stronger scale
            gsap.fromTo(
              target,
              { scale: 1, filter: 'brightness(1)' },
              {
                scale: 1.08,
                filter: 'brightness(0.9)',
                ease: 'none',
                scrollTrigger: {
                  trigger: wrap as Element,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            )

            if (overlay) {
              gsap.fromTo(
                overlay,
                { opacity: 0.3 },
                {
                  opacity: 0.6,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: wrap as Element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              )
            }
          })
        })
      } catch (e) {
        if (import.meta?.env?.DEV) {
          console.warn('[useGsapAnimations] gsap not installed', e)
        }
      }
    })()

    return () => {
      try {
        // cleanup all ScrollTriggers via context revert
        import('gsap').then(({ default: gsap }) => {
          const c = (gsap as any).context?.()
          c?.revert?.()
        })
      } catch {}
    }
  }, [enabled])
}
