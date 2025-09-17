// src/pages/Services.tsx
import * as React from "react";
import { ServicesGrid } from "../components/sections";
import { Button } from "../components/ui";
import { Section } from "../components/layout";
import { useNavigate, useLocation } from "react-router-dom";

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const originRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    navigate("/contact", { state: { originRect } });
  };

  return (
      <div>
        <Section py="normal">
          <div className="text-center">
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
        );
};

export default Services;
