import * as React from 'react'
import Navbar, { type NavbarProps } from './Navbar'
import Footer, { type FooterProps } from './Footer'
import { cn } from '../../lib/cn'
import { NAVBAR_LINKS, FOOTER_LINKS, LOGO_TEXT, BRAND_NAME } from '../../constants'
import { Outlet } from 'react-router-dom'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: Omit<NavbarProps, 'className'> & { className?: string }
  footer?: Omit<FooterProps, 'className'> & { className?: string }
  containerClassName?: string
}

/**
 * Layout: Composes Navbar + page content + Footer with zero duplication.
 * - Accepts partial props for Navbar and Footer.
 * - Provides sensible defaults but keeps full control in the page.
 */
export const Layout: React.FC<LayoutProps> = ({
  navbar,
  footer,
  className,
  containerClassName,
  children,
  ...props
}) => {
  return (
    <div className={cn('min-h-screen bg-white text-slate-900 flex flex-col', className)} {...props}>
      <Navbar
        logo={navbar?.logo ?? LOGO_TEXT}
        logoHref={navbar?.logoHref}
        links={navbar?.links ?? NAVBAR_LINKS}
        rightActions={navbar?.rightActions}
        sticky={navbar?.sticky}
        className={navbar?.className}
      />
      <main className={cn('mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8', containerClassName)}>
        {children ? children : <Outlet />}
      </main>
      <Footer
        brand={footer?.brand ?? BRAND_NAME}
        links={footer?.links ?? FOOTER_LINKS}
        className={footer?.className}
      />
    </div>
  )
}

export default Layout
