import * as React from "react"
import { cn } from "../../lib/cn"
import MyComponent from "../animations/splitTextAnimation"
import Container from "../layout/Spacing/Container"
import ZoomOutOnLoad from "../animations/ZoomInOnLoad"

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
  ctaLabel,
  ctaHref,
  ...props // ✅ will only spread valid HTML props
}) => {
  return (
    <section className={cn("relative bg-white", className)} {...props}>
      <Container className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center text-slate-900 mb-18 mt-20">
        <MyComponent title={title} subtitle={subtitle} />

        {/* ✅ Only render CTA if both are provided */}
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            {ctaLabel}
          </a>
        )}
      </Container>

      {videoSrc ? (
        <ZoomOutOnLoad>
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
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 rounded-[40px]" />
          )}
        </div>
        </ZoomOutOnLoad>
      ) : null}
    </section>
  )
}

export default Hero