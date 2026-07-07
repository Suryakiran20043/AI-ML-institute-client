import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Wraps children with a scroll-linked fade in/out — only on mobile.
 * On desktop and for users who prefer reduced motion, it renders children as-is.
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
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in as it enters, hold, fade out as it exits.
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [30, 0, 0, -20]);

  if (!isMobile || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, willChange: "opacity, transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
