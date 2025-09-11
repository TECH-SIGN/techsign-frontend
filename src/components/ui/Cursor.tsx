import * as React from 'react'
import { useCursor } from '../../hooks/useCursor'
import { cn } from '../../lib/cn'

const Cursor: React.FC = () => {
  const { ref, hover, hidden } = useCursor()
  return <div ref={ref} className={cn('custom-cursor', hover && 'custom-cursor--hover', hidden && 'custom-cursor--hidden')} aria-hidden="true" />
}

export default Cursor
