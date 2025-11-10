import * as React from "react";
import { Section } from "../components/layout";
import ServicesGrid from "../components/sections/ServicesGrid";
import AnimatedHeading from "../components/animations/AnimatedHeading";
import gsap from "gsap";

const Services: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (sectionRef.current) {
      // Start from white → fade to black
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#ffffff" },  // start white
        {
          backgroundColor: "rgba(0, 0, 0, 0.93)", // end black/93
          duration: 3.0,
          ease: "power4.out",
        }
      );
    }
  }, []);
  return (
    <div>
      <section ref={sectionRef} className="bg-black/93 px-10 pb-13 pt-2 rounded-4xl mx-22 my-25">
        <AnimatedHeading
          title="Our Services"
          subtitle="Explore what TechSign can do for you"
          />
      </section>

      <Section py="normal">
        <ServicesGrid />
      </Section>
    </div>
  );
};

export default Services;
