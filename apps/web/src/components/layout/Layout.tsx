import * as React from "react";
import { cn } from "@techsign/shared";
import Footer from "./Footer";
import Cursor from "../ui/Cursor";
import { Outlet } from "react-router-dom";
import { FOOTER_LINKS, BRAND_NAME, LayoutProps } from "@techsign/shared";

export const Layout: React.FC<LayoutProps> = ({
  footer,
  className,
  containerClassName,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-white text-slate-950 flex flex-col",
        className,
      )}
      {...props}
    >
      <main
        className={cn(
          "mx-auto w-full flex-1 py-10 bg-white",
          containerClassName,
        )}
      >
        {children ?? <Outlet />}
      </main>
      <Footer
        brand={footer?.brand ?? BRAND_NAME}
        links={footer?.links ?? FOOTER_LINKS}
        className={footer?.className}
      />
      <Cursor />
    </div>
  );
};

export default Layout;
