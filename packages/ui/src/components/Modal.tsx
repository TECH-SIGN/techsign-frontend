import * as React from 'react'
import { cn } from '../cn'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open = false, onClose, className, children, ...props }, ref) => {
    if (!open) return null
    return (
      <div
        className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}
        aria-modal="true"
        role="dialog"
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
          {children}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'
export default Modal
