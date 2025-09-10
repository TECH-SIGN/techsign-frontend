import * as React from 'react'
import { cn } from '../../lib/cn'
import type { FooterLink } from '../../types'
import Container from './Spacing/Container'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: FooterLink[]
  brand?: string
}

export const Footer: React.FC<FooterProps> = ({ links = [], brand = 'TechSign', className, ...props }) => {
  const year = new Date().getFullYear()
  return (
    <footer
      className={cn('border-t border-slate-200 bg-white/70 backdrop-blur', className)}
      aria-label="Site Footer"
      {...props}
    >
      <Container fluid className="px-0 py-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-600">© {year} {brand}. All rights reserved.</p>
          {links.length > 0 && (
            <ul className="flex items-center gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-gray-600 hover:text-gray-900">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  )
}

export default Footer
