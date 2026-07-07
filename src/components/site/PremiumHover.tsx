import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic hover — the child translates a few px toward the cursor while it
 * hovers, then springs back on leave. Uses transform-only for 60 FPS.
 * Auto-disables on touch and reduced-motion.
 */
export function Magnetic({
  children,
  strength = 14,
  className,
}: {
  children: ReactNode;
  /** Max pixel offset. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      tx = (relX / (rect.width / 2)) * strength;
      ty = (relY / (rect.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "translate3d(0,0,0)";
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={cn("inline-block will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", className)}
    >
      {children}
    </span>
  );
}

/**
 * 3D tilt on hover — subtle perspective rotation following the cursor.
 * Auto-disables on touch and reduced-motion. Adds a small lift on hover.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  scale = 1.01,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Hover scale. */
  scale?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (-relY * max).toFixed(2);
      const ry = (relX * max).toFixed(2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        // spotlight position for glow-border utility
        el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [max, scale]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", className)}
      style={style}
    >
      {children}
    </div>
  );
}
