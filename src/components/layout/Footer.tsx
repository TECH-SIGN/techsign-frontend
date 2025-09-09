import * as React from 'react'
import { cn } from '../../lib/cn'
import type { FooterLink } from '../../types'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: FooterLink[]
  brand?: string
}

export const Footer: React.FC<FooterProps> = ({ links = [], brand = 'TechSign', className, ...props }) => {
  const year = new Date().getFullYear()
  return (
    <footer
      className={cn('border-t border-gray-200 bg-white/70 backdrop-blur', className)}
      aria-label="Site Footer"
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
      </div>
    </footer>
  )
}

export default Footer
