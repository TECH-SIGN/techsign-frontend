// src/pages/Services.tsx
import * as React from "react";
import { ServicesGrid } from "../components/sections";
import { Button } from "../components/ui";
import { Section } from "../components/layout";
import { useNavigate, useLocation } from "react-router-dom";
import PageTransition, { RectLike } from "../components/animations/pageTransition";

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // originRect aayega Navbar ya Button se navigate karte waqt
  // const fromState = (location.state as any)?.originRect as RectLike | undefined;
  // const originRect = fromState ?? null;

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const originRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    navigate("/contact", { state: { originRect } });
  };

  return (
    // <PageTransition originRect={originRect}>
      <div className="space-y-12">
        <Section py="normal">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
            <p className="text-slate-600">Explore what TechSign can do for you</p>
          </div>
        </Section>

        <Section py="normal">
          <ServicesGrid />
        </Section>

        <Section py="normal">
          <div className="text-center">
            <Button onClick={handleContactClick}>Contact Us</Button>
          </div>
        </Section>
      </div>
    // </PageTransition>
  );
};

export default Services;
