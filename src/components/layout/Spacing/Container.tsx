import * as React from 'react'
import { cn } from '../../../lib/cn'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean // fluid uses full width with paddings; boxed uses max-w constraint
}

const Container: React.FC<ContainerProps> = ({ fluid = false, className, ...props }) => {
  return (
    <div
      className={cn(
        // horizontal paddings always applied; max-w only when boxed
        'mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12',
        !fluid && 'max-w-7xl xl:max-w-8xl 2xl:max-w-[1600px]',
        className
      )}
      {...props}
    />
  )
}

export default Container
