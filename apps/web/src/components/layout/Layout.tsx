import * as React from 'react'
import { cn } from '../../lib/cn'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from '../ui/Cursor'
import { Outlet } from 'react-router-dom'
import { NAVBAR_LINKS, FOOTER_LINKS, LOGO_TEXT, BRAND_NAME } from '../../constants'
import { LayoutProps } from '../../types'

export const Layout: React.FC<LayoutProps> = ({
  navbar,
  footer,
  className,
  containerClassName,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('min-h-screen w-full bg-white text-slate-950 flex flex-col', className)}
      {...props}
    >
      <Navbar
        logo={navbar?.logo ?? LOGO_TEXT}
        logoHref={navbar?.logoHref}
        links={navbar?.links ?? NAVBAR_LINKS}
        rightActions={navbar?.rightActions}
        sticky={navbar?.sticky}
        className={navbar?.className}
      />
      <main className={cn('mx-auto w-full flex-1 py-10 bg-white', containerClassName)}>
        {children ?? <Outlet />}
      </main>
      <Footer
        brand={footer?.brand ?? BRAND_NAME}
        links={footer?.links ?? FOOTER_LINKS}
        className={footer?.className}
      />
      <Cursor />
    </div>
  )
}

export default Layout
