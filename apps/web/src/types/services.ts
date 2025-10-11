import type * as React from 'react'

export interface Service {
  id: string
  videoSrc: string
}

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc: string
  overlay?: boolean
}

export type SectionSpacing = 'tight' | 'normal' | 'relaxed'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  fluid?: boolean
  py?: SectionSpacing
}

