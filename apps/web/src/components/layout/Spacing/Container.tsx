import * as React from "react";
import { cn } from "@techsign/shared";
import { ContainerProps } from "@techsign/shared";

const Container: React.FC<ContainerProps> = ({
  fluid = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        fluid
          ? "w-full" // full edge-to-edge
          : "mx-auto px-6 sm:px-8 lg:px-12 max-w-[1440px]", // centered with max width
        className,
      )}
      {...props}
    />
  );
};

export default Container;
