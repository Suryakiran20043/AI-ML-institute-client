import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Thin gradient progress bar pinned to the top of the viewport.
 * Fills based on document scroll — smoothed with a spring for a premium feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 400 : 120,
    damping: reduce ? 40 : 24,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%", willChange: "transform" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-gradient-to-r from-brand-purple via-fuchsia-400 to-brand-cyan shadow-[0_0_12px_rgba(124,58,237,0.6)]"
    />
  );
}
