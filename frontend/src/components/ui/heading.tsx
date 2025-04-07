import * as React from "react";

import { cn } from "@/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      default: "text-3xl",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-5xl",
      "2xl": "text-6xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "default",
    align: "left",
  },
});

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, align, as: Component = "h2", ...props }, ref) => {
    return <Component ref={ref} className={cn(headingVariants({ size, align, className }))} {...props} />;
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
