import * as React from "react";
import { cn } from "@techsign/shared";
import type { NavbarProps } from "@techsign/shared";
import Container from "./Spacing/Container";
import { Link, useNavigate } from "react-router-dom";
import { useScrollDirection } from "../../hooks/usScrollDirection";
import LogoAnimator from "../animations/LogoAnimator";
import NavItemAnimator from "../animations/NavItemAnimater";
import { motion, AnimatePresence } from "framer-motion";
import { useNavHighlight } from "../../hooks/useNavbarHighlight";

const Navbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = "/",
  links,
  rightActions,
  sticky = true,
  className,
  animateNavItems = true,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const hidden = useScrollDirection();

  // ✅ Add GSAP Nav Highlight Hook
  useNavHighlight({
    linkSelector: ".nav-link",
    indicatorSelector: ".nav-indicator",
    duration: 0.6,
    ease: "power3.out",
    delayAfterTransition: 900,
  });

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      const target = e.target as Node;
      const button = document.querySelector("#menu-toggle-btn");
      if (button && button.contains(target)) return;
      if (open && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [open]);

  const navigateWithRect = (href: string, el: Element | null) => {
    if (!el) {
      navigate(href);
      setOpen(false);
      return;
    }
    const r = el.getBoundingClientRect();
    const originRect = {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    };
    navigate(href, { state: { originRect } });
    setOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full bg-white transition-transform duration-200",
        hidden ? "-translate-y-full" : "translate-y-0",
        className,
      )}
      aria-label="Main Navigation"
      {...props}
    >
      <Container fluid className="px-0">
        <div className="flex h-17 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-center h-full">
            {logo ? (
              typeof logo === "string" ? (
                <Link
                  to={logoHref ?? "/"}
                  className="px-4 md:px-18 font-semibold text-slate-900 text-[clamp(1rem,2vw+0.5rem,1.5rem)]"
                  data-cursor="hover"
                  onClick={(e) => {
                    if (window.location.pathname === (logoHref ?? "/")) {
                      e.preventDefault();
                      window.location.reload();
                    }
                  }}
                >
                  <LogoAnimator
                    key={animateNavItems ? "animate" : "noanimate"}
                    text={logo}
                    animate={animateNavItems}
                  />
                </Link>
              ) : (
                <a
                  href={logoHref ?? "/"}
                  className="inline-flex items-center"
                  aria-label="Home"
                  data-cursor="hover"
                >
                  {logo}
                </a>
              )
            ) : null}
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-6 pr-18 relative">
            {/* ✅ GSAP Moving Indicator */}
            <span
              className="nav-indicator absolute bottom-[-4px] left-0 h-[2px] bg-slate-900 block"
              style={{ width: 0 }}
            />

            <ul className="flex items-center gap-14">
              {links.map((item, index) => (
                <li key={`${item.href}-${index}`} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        item.href === "/services" ||
                        item.href === "/contact"
                      ) {
                        navigateWithRect(item.href, e.currentTarget);
                      } else {
                        navigate(item.href);
                        setOpen(false);
                      }
                    }}
                    className="nav-link group relative block overflow-hidden text-lg font-medium text-slate-950"
                    data-cursor="hover"
                  >
                    <NavItemAnimator
                      text={item.label}
                      delay={index * 0.2}
                      animate={animateNavItems}
                    />
                  </a>
                </li>
              ))}
            </ul>
            {rightActions && (
              <div className="ml-4 flex items-center gap-2">{rightActions}</div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="menu-toggle-btn"
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-900 hover:bg-slate-100"
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              {open ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
              className="bg-white absolute top-16 left-0 right-0 w-full md:hidden pt-4 pb-5 space-y-1 shadow-lg"
            >
              {links.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-slate-800 hover:bg-slate-200"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};

export default Navbar;
