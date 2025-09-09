import type * as React from 'react'

export interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  ctaLabel: string
  ctaHref: string
}

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  ctaLabel: string
  ctaHref: string
}
