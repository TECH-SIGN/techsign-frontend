import * as React from "react";
import { Section } from "../components/layout";
import ServicesGrid from "../components/sections/ServicesGrid";
import AnimatedHeading from "../components/animations/AnimatedHeading";
import MirrorReveal from "../components/animations/MirrorReveal";

const Services: React.FC = () => {
  return (
    <div>
      <MirrorReveal backgroundColor="rgba(0, 0, 0, 0.93)">
        <section className="text-white">
          <AnimatedHeading
            title="Our Services"
            subtitle="Explore what TechSign can do for you"
          />
        </section>
      </MirrorReveal>
      <Section py="normal">
        <ServicesGrid />
      </Section>
    </div>
  );
};

export default Services;
