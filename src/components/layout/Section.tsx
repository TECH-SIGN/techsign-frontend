import * as React from 'react'
import Container from './Container'
import { cn } from '../../lib/cn'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  fluid?: boolean
  py?: 'tight' | 'normal' | 'relaxed'
}

const spacingMap: Record<NonNullable<SectionProps['py']>, string> = {
  tight: 'py-8 sm:py-10 lg:py-12',
  normal: 'py-8 sm:py-12 lg:py-16',
  relaxed: 'py-12 sm:py-16 lg:py-20',
}

const Section: React.FC<SectionProps> = ({
  className,
  children,
  fluid = false,
  py = 'normal',
  ...props
}) => {
  return (
    <section className={cn(spacingMap[py])} {...props}>
      <Container fluid={fluid} className={cn(className)}>
        {children}
      </Container>
    </section>
  )
}

export default Section
