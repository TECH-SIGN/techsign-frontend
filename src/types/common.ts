export type NavLink = {
  label: string
  href: string
}

export type FooterLink = {
  label: string
  href: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type FeatureCardAction = {
  label: string
  href?: string
  disabled?: boolean
}

export type FeatureCardData = {
  id: string
  title: string
  description: string
  action: FeatureCardAction
}
