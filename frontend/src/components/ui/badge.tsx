import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        secondary: "border-white/5 bg-secondary/35 text-secondary-foreground hover:bg-secondary/50",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
        outline: "border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
