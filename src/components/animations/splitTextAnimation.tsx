import SplitType from "split-type"
import gsap from "gsap"
import { useEffect, useRef } from "react"

const MyComponent = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    const animateWords = (element: HTMLElement | null, delay = 0) => {
      if (!element) return

      const split: any = new SplitType(element, { types: "words" })
      const words: HTMLElement[] = Array.from(split.words ?? [])

      if (words.length === 0) {
        if (typeof split.revert === "function") split.revert()
        return
      }

      const wrappers: HTMLElement[] = []
      words.forEach((word) => {
        const parent = word.parentNode
        if (!parent) return
        const wrapper = document.createElement("span")
        wrapper.style.display = "inline-block"
        wrapper.style.overflow = "hidden"
        wrapper.style.verticalAlign = "bottom"
        parent.insertBefore(wrapper, word)
        wrapper.appendChild(word)
        wrappers.push(wrapper)
      })

      const tl = gsap.timeline()
      tl.from(words, {
        yPercent: 105,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        delay,
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
        if (typeof split.revert === "function") split.revert()
      }
    }

    const cleanupTitle = animateWords(titleRef.current, 0)
    const cleanupSubtitle = animateWords(subtitleRef.current, 0.5)

    return () => {
      cleanupTitle && cleanupTitle()
      cleanupSubtitle && cleanupSubtitle()
    }
  }, [title, subtitle])

  return (
    <div className="text-center">
      <h1
        ref={titleRef}
        className="hero-title text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight whitespace-pre-line"
      >
        {title}
      </h1>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="mt-6 text-xl sm:text-xl lg:text-xl max-w-3xl mx-auto text-slate-900"
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default MyComponent
