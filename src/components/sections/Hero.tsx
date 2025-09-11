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
  ctaLabel,
  ctaHref = '#',
  videoSrc,
  poster,
  overlay = true,
  className,
  ...props
}) => {
  return (
    <section className={cn('relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] bg-slate-900', className)} {...props}>
      {/* Background video */}
      {videoSrc ? (
        <div className="absolute inset-0 z-0">
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
        </div>
      ) : null}

      {/* Optional overlay for readability */}
      {videoSrc && overlay ? (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 text-center text-white" data-animate="fade-up">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" data-parallax="20">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto text-white/90" data-parallax="30">
            {subtitle}
          </p>
        ) : null}
        {ctaLabel ? (
          <div className="mt-8 flex justify-center">
            <Magnetic>
              <a href={ctaHref} data-cursor="hover">
                <Button size="lg">{ctaLabel}</Button>
              </a>
            </Magnetic>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Hero
