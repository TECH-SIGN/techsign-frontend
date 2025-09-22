import * as React from "react";
import { cn } from "../../lib/cn";
import type { FooterLink } from "../../types";
import Container from "./Spacing/Container";
import { useNavigate } from "react-router-dom";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: FooterLink[];
  brand?: string;
}

export const Footer: React.FC<FooterProps> = ({ links = [], brand = "TechSign", className, ...props }) => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  // animation only for Services & Contact
  const navigateWithRect = (href: string, el: Element | null) => {
    if (!el) {
      navigate(href);
      return;
    }
    const r = el.getBoundingClientRect();
    const originRect = { left: r.left, top: r.top, width: r.width, height: r.height };

    if (href === "/services" || href === "/contact") {
      navigate(href, { state: { originRect } }); // animation
    } else {
      navigate(href); // normal navigation
    }
  };

  return (
    <footer className={cn("border-t border-slate-200 px-15 bg-white/70 backdrop-blur", className)} aria-label="Site Footer" {...props}>
      <Container fluid className="px-0 py-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-gray-600">© {year} {brand}. All rights reserved.</p>

          {links.length > 0 && (
            <ul className="flex items-center gap-4">
              {links.map((l, index) => (
                <li key={`${l.href}-${index}`}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithRect(l.href, e.currentTarget);
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
