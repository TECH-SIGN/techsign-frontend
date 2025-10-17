import { HTMLAttributes, ReactNode } from "react"
import { NavLink } from "./animations"


export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: string | React.ReactNode
  logoHref?: string
  links: NavLink[]
  rightActions?: React.ReactNode
  sticky?: boolean
  animateNavItems?: boolean;
}

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  footer?: Omit<FooterProps, 'className'> & { className?: string }
  containerClassName?: string
  children?: ReactNode
}


export type FooterLink = {
  label: string
  href: string
}
export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  links?: FooterLink[]
  brand?: string
}
export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  transitionTo?: string  // page transition route
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

/* ================= FeatureCard Types ================= */
export interface FeatureCardData {
  id: string
  title: string
  description: string
  action: {
    label: string
    href?: string
    disabled?: boolean
  }
}

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FeatureCardData
}
