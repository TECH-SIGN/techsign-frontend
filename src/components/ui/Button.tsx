import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import type { ButtonVariant, ButtonSize } from '../../types'

const buttonVariants = cva(
  // base styles
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 shadow-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-slate-900 text-white hover:bg-slate-950 focus-visible:ring-slate-900',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300',
        outline:
          'ring-1 ring-inset ring-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth = false,
      type = 'button',
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      // Press Enter or Space to trigger onClick for accessibility when focused
      if ((e.key === 'Enter' || e.key === ' ') && onClick) {
        e.preventDefault()
        onClick(e as any)
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={disabled ? undefined : (e) => onClick?.(e)}
        onKeyDown={handleKeyDown}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
