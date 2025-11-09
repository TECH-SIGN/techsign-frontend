import * as React from "react";
import Container from "./Container";
import { cn, SectionProps } from "@techsign/shared";

const spacingMap: Record<NonNullable<SectionProps["py"]>, string> = {
  tight: "py-8",
  normal: "py-8",
  relaxed: "py-12",
};

const Section: React.FC<SectionProps> = ({
  className,
  children,
  fluid = false,
  py = "normal",
  ...props
}) => {
  return (
    <section className={cn(spacingMap[py])} {...props}>
      <Container fluid={fluid} className={cn(className)}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
