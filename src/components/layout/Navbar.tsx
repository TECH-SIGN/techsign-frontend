import * as React from 'react'
import { cn } from '../../lib/cn'
import type { NavLink } from '../../types'
import { Link } from 'react-router-dom'
import Container from './Spacing/Container'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: string | React.ReactNode
  logoHref?: string
  links: NavLink[]
  rightActions?: React.ReactNode
  sticky?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = '/',
  links,
  rightActions,
  sticky = true,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scroll down → hide navbar
        setHidden(true)
      } else {
        // Scroll up → show navbar
        setHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return
      if (open && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  return (
    <nav
      className={cn(
        'w-full bg-white/100 transition-transform duration-500',
        sticky && 'sticky top-0 z-50',
        hidden ? '-translate-y-full' : 'translate-y-0',
        className
      )}
      aria-label="Main Navigation"
      {...props}
    >
      <Container fluid className="px-0">
        <div className="flex h-17 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center pl-20">
            {logo ? (
              typeof logo === 'string' ? (
                <Link to={logoHref ?? '/'} className="text-2xl font-semibold text-slate-900" data-cursor="hover">
                  {logo}
                </Link>
              ) : (
                <Link to={logoHref ?? '/'} className="inline-flex items-center" aria-label="Home" data-cursor="hover">
                  {logo}
                </Link>
              )
            ) : null}
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-6 pr-20">
            <ul className="flex items-center gap-14">
              {links.map((item) => (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    to={item.href}
                    className="group relative block overflow-hidden text-lg font-medium text-slate-950"
                    data-cursor="hover"
                  >
                    <span className="block translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {rightActions ? <div className="ml-4 flex items-center gap-2" data-cursor="hover">{rightActions}</div> : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <svg
                className={cn('h-6 w-6', open && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg
                className={cn('h-6 w-6', !open && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn('md:hidden border-t border-slate-200/80 bg-white', open ? 'block' : 'hidden')}
      >
        <div className="space-y-1 px-4 py-3 sm:px-6">
          {links.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="block rounded px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              data-cursor="hover"
            >
              {item.label}
            </Link>
          ))}
          {rightActions ? <div className="pt-2">{rightActions}</div> : null}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
