import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Mobile-only fade + slide when a section enters/leaves the viewport.
 * Re-triggers on each entry (no `once`) so it feels alive while scrolling.
 * On desktop or reduced-motion, renders children unchanged.
 */
export function MobileScrollFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  if (!isMobile || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      viewport={{ margin: "-10% 0px -10% 0px", amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
