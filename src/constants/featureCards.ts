import type { FeatureCardData } from '../types'

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Learn about our commitment to protecting your data and privacy.',
    action: { label: 'Account Deletion Policy', href: '#account-deletion' },
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Manage your account settings, preferences, and personal information.',
    action: { label: 'Coming Soon', disabled: true },
  },
  {
    id: 'docs',
    title: 'Documentation',
    description: 'Access comprehensive guides and documentation for our services.',
    action: { label: 'View Docs', href: '#docs' },
  },
]
