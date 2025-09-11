import * as React from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useGsapAnimations } from '../hooks/useGsapAnimations'

export interface ScrollProviderProps {
  children: React.ReactNode
  smooth?: boolean
  animations?: boolean
}

const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, smooth = true, animations = true }) => {
  useSmoothScroll(smooth)
  useGsapAnimations(animations)
  return <>{children}</>
}

export default ScrollProvider
