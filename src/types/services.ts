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

export type SectionSpacing = 'tight' | 'normal' | 'relaxed'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  fluid?: boolean
  py?: SectionSpacing
}

