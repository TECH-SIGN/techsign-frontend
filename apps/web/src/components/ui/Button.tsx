import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ButtonProps } from '../../types'

const buttonVariants = cva(
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
      transitionTo,
      children,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      onClick?.(e)

      if (transitionTo) {
        e.preventDefault()
        const overlay = document.querySelector<HTMLDivElement>('.page-transition-overlay')
        const dim = document.querySelector<HTMLDivElement>('.page-transition-dim')

        if (overlay && dim) {
          gsap.set(overlay, { yPercent: 100, opacity: 1 })
          gsap.set(dim, { opacity: 0 })

          const tl = gsap.timeline({
            onComplete: () => {
              navigate(transitionTo)
            },
          })

          tl.to(dim, { opacity: 0.5, duration: 0.3, ease: 'power2.out' })
            .to(overlay, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' })
            .to([overlay, dim], { opacity: 0, duration: 0.5, ease: 'power4.inOut' })
        } else {
          navigate(transitionTo)
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return
      if ((e.key === 'Enter' || e.key === ' ') && handleClick) {
        e.preventDefault()
        handleClick(e as any)
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
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
