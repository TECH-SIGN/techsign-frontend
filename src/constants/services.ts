import * as React from 'react'
import type { Service } from '../types'
import SecurityOutlined from '@mui/icons-material/SecurityOutlined'
import ManageAccountsOutlined from '@mui/icons-material/ManageAccountsOutlined'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'

export const SERVICES: Service[] = [
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    description: 'We safeguard your data and maintain rigorous security standards.',
    icon: React.createElement(SecurityOutlined, { fontSize: 'small' }),
    ctaLabel: 'Learn More',
    ctaHref: '#privacy-security',
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Control your profile, preferences, and account settings with ease.',
    icon: React.createElement(ManageAccountsOutlined, { fontSize: 'small' }),
    ctaLabel: 'Manage Account',
    ctaHref: '#account-management',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Explore detailed guides and API references for our services.',
    icon: React.createElement(DescriptionOutlined, { fontSize: 'small' }),
    ctaLabel: 'View Docs',
    ctaHref: '#documentation',
  },
]
