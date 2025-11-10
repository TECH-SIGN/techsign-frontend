import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home, Services } from "../pages";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import PageTransition from "../components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route element={<PageTransition />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} /> {/* "/" path */}
              <Route path="services" element={<Services />} />\{" "}
              {/* "/services" path */}
              <Route path="about" element={<About />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
