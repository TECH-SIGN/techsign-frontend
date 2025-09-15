import * as React from "react";
import { cn } from "../../lib/cn";
import type { NavLink } from "../../types";
import Container from "./Spacing/Container";
import { useNavigate } from "react-router-dom";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: string | React.ReactNode;
  logoHref?: string;
  links: NavLink[];
  rightActions?: React.ReactNode;
  sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = "/",
  links,
  rightActions,
  sticky = true,
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollY = React.useRef(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) setHidden(true);
      else setHidden(false);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // navigateWithRect: Only animation for Services & Contact buttons
  const navigateWithRect = (href: string, el: Element | null) => {
    if (!el) {
      navigate(href);
      setOpen(false);
      return;
    }
    const r = el.getBoundingClientRect();
    const originRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    navigate(href, { state: { originRect } });
    setOpen(false);
  };

  return (
    <nav
      className={cn(
        "w-full bg-white/100 transition-transform duration-500",
        sticky && "sticky top-0 z-50",
        hidden ? "-translate-y-full" : "translate-y-0",
        className
      )}
      aria-label="Main Navigation"
      {...props}
    >
      <Container fluid className="px-0">
        <div className="flex h-17 items-center justify-between">
          <div className="flex flex-1 items-center sm:pl-5 md:pl-5 h-full w-full object-contain">
            {logo ? (
              typeof logo === "string" ? (
                <a href={logoHref ?? "/"} className="pl-4 font-semibold text-slate-900 text-[clamp(1rem,2vw+0.5rem,1.5rem)]" data-cursor="hover">
                  {logo}
                </a>
              ) : (
                <a href={logoHref ?? "/"} className="inline-flex items-center" aria-label="Home" data-cursor="hover">
                  {logo}
                </a>
              )
            ) : null}
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-6 pr-20">
            <ul className="flex items-center gap-14">
              {links.map((item) => (
                <li key={item.href} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      // animation only for Services & Contact
                      if (item.href === "/services" || item.href === "/contact") {
                        navigateWithRect(item.href, e.currentTarget);
                      } else {
                        navigate(item.href);
                        setOpen(false);
                      }
                    }}
                    className="group relative block overflow-hidden text-lg font-medium text-slate-950"
                    data-cursor="hover"
                  >
                    <span className="block translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {rightActions ? <div className="ml-4 flex items-center gap-2">{rightActions}</div> : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {/*Hamburger icon*/ }
              <svg className={cn("h-6 w-6", open && "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              {/* Close icon */}
              <svg className={cn("h-6 w-6", !open && "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {open && (
        <div id="mobile-menu" className="bg-white absolute top-16 left-0 right-0 w-full md:hidden  pt-4 pb-5 space-y-1 shadow-lg">
          <a href="#" className="block px-3 py-2 rounded-md text-slate-800 hover:bg-slate-200">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-slate-800 hover:bg-slate-200">Services</a>
          <a href="#" className="block px-3 py-2 rounded-md text-slate-800 hover:bg-slate-200">Contact</a>
        </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;