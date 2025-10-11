import React from "react"
import SplitType from "split-type"

// 🔹 Common animation props (reusable for Fade, Zoom, etc.)
export interface AnimationBaseProps {
  children?: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  ease?: string
}

// 🔹 AnimatedFadeIn
export interface AnimatedFadeInProps extends AnimationBaseProps {
  amount?: number
}

// 🔹 AnimatedList
export interface AnimatedListProps {
  items: React.ReactNode[]
  className?: string
  delayStep?: number
}

// 🔹 HoverImage
export interface HoverImageProps {
  src: string
  alt: string
  className?: string
}

// 🔹 LogoAnimator
export interface LogoAnimatorProps {
  text: string
  className?: string
  animate?: boolean
}

// 🔹 NavItemAnimator
export interface NavItemAnimatorProps {
  text: string
  delay?: number
  animate?: boolean
}

// 🔹 PageTransition refs
export interface PageTransitionRefs {
  overlayRef: React.RefObject<HTMLDivElement | null>
  dimRef: React.RefObject<HTMLDivElement | null>
  lastPathname: React.MutableRefObject<string | null>
}

// 🔹 MyComponent (hero title/subtitle)
export interface MyComponentProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;    // optional class for title
  startAnimation?: boolean;
  subtitleClassName?: string; // optional class for subtitle
  containerClassName?: string; // optional: outer div ke liye Tailwind
};

export interface MyComponentRefs {
  titleRef: React.RefObject<HTMLHeadingElement | null>
  subtitleRef: React.RefObject<HTMLParagraphElement | null>
}


export type CleanupFn = () => void
export type Timeline = gsap.core.Timeline
export type SplitInstance = SplitType & { chars?: HTMLElement[]; words?: HTMLElement[]; revert?: () => void }


// 🔹 PortfolioVideo
export interface PortfolioVideoProps {
  src: string
  thumbnail: string
}

// 🔹 ZoomInOnLoad
export interface ZoomInOnLoadProps extends AnimationBaseProps {
  fromScale?: number
}
