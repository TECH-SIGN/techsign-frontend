import * as React from "react";
import { Section } from "../components/layout";
import ServicesGrid from "../components/sections/ServicesGrid";
import MyComponent from "../components/animations/splitTextAnimation";

const Services: React.FC = () => {
  return (
    <div>
      <Section py="normal">
        <MyComponent
          title="Our Services"
          subtitle="Explore what TechSign can do for you"
          titleClassName="text-xl sm:text-xl lg:text-xl mt-20"
          subtitleClassName="text-5xl sm:text-5xl lg:text-5xl"
        />
      </Section>

      <Section py="normal">
        <ServicesGrid />
      </Section>
    </div>
  );
};

export default Services;
