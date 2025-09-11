import * as React from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../ui'
import Magnetic from '../ui/Magnetic'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  videoSrc?: string // MP4/WebM
  poster?: string
  overlay?: boolean
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaLabel, // ignored per current requirement (removed CTA)
  ctaHref = '#',
  videoSrc,
  poster,
  overlay = true,
  className,
  ...props
}) => {
  return (
    <section className={cn('relative overflow-hidden bg-white', className)} {...props}>

      
      {/* Content below video (no overlap) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center text-slate-900" data-animate="fade-up">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" data-parallax="15">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-slate-600" data-parallax="25">
            {subtitle}
          </p>
        ) : null}
        {/* CTA intentionally removed per request */}
      </div>

      
      {/* Video block (separate from content) */}
      {videoSrc ? (
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]" data-animate="fade-up">
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            preload="metadata"
            muted
            playsInline
            autoPlay
            loop
          />
          {overlay ? (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30" />
          ) : null}
        </div>
      ) : null}

    </section>
  )
}

export default Hero
