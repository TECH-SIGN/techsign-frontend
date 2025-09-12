import * as React from 'react'
import { cn } from '../../lib/cn'
import gsap from 'gsap'
import SplitType from 'split-type'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  videoSrc?: string
  poster?: string
  overlay?: boolean
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  videoSrc,
  poster,
  overlay = true,
  className,
  ...props
}) => {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null)

  React.useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const split: any = new SplitType(el, { types: 'words' })
    const words: HTMLElement[] = Array.from(split.words ?? [])

    if (words.length === 0) {
      if (typeof split.revert === 'function') split.revert()
      return
    }

    const wrappers: HTMLElement[] = []
    words.forEach((word) => {
      const parent = word.parentNode
      if (!parent) return
      const wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.overflow = 'hidden'
      wrapper.style.verticalAlign = 'bottom'
      parent.insertBefore(wrapper, word)
      wrapper.appendChild(word)
      wrappers.push(wrapper)
    })

    // Animation: only yPercent (no opacity!)
    const tl = gsap.timeline()
    tl.from(words, {
      yPercent: 120,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.15,
    })

    return () => {
      tl.kill()
      wrappers.forEach((wrap) => {
        const parent = wrap.parentNode
        if (!parent) return
        while (wrap.firstChild) {
          parent.insertBefore(wrap.firstChild, wrap)
        }
        parent.removeChild(wrap)
      })
      if (typeof split.revert === 'function') split.revert()
    }
  }, [title])

  return (
    <section className={cn('relative bg-white', className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center text-slate-900 mb-18">
        <h1
          ref={titleRef}
          className="hero-title text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight whitespace-pre-line"
        >
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-slate-600">
            {subtitle}
          </p>
        ) : null}
      </div>

      {videoSrc ? (
        <div className="relative h-[85vh] w-full rounded-[40px] overflow-hidden">
          <video
            className="block w-full h-full object-cover rounded-[40px]"
            src={videoSrc}
            poster={poster}
            preload="metadata"
            muted
            playsInline
            autoPlay
            loop
          />
          {overlay ? (
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 rounded-[40px]" />
          ) : null}
        </div>
      ) : null}
      </section>
  )
}

export default Hero
