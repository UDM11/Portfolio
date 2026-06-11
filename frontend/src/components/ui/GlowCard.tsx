import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string; // CSS Color e.g. "rgba(99, 102, 241, 0.15)"
  glowSize?: number;  // Spotlight radius in pixels
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, children, glowColor = "rgba(120, 119, 198, 0.15)", glowSize = 350, ...props }, ref) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <div
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative rounded-2xl border border-white/10 bg-muted/10 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-muted/15 overflow-hidden",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Glow Spotlight layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${glowSize}px circle at ${mouseX}px ${mouseY}px,
                ${glowColor},
                transparent 80%
              )
            `,
          }}
        />
        {/* Content layer */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    );
  }
);
GlowCard.displayName = "GlowCard";
