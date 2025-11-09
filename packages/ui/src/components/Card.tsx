import * as React from "react";
import { cn } from "../cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-slate-200 bg-white shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
export default Card;
