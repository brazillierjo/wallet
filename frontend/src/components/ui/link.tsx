import * as React from "react";
import NextLink from "next/link";

import { cn } from "@/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const linkVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        secondary: "text-secondary underline-offset-4 hover:underline",
        destructive: "text-destructive underline-offset-4 hover:underline",
        outline: "underline-offset-4 hover:underline",
        ghost: "hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, external, ...props }, ref) => {
    const isExternal = external || href.startsWith("http");

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkVariants({ variant, size, className }))}
          {...props}
        />
      );
    }

    return <NextLink ref={ref} href={href} className={cn(linkVariants({ variant, size, className }))} {...props} />;
  }
);
Link.displayName = "Link";

export { Link, linkVariants };
