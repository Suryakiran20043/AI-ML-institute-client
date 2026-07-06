import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import logoFull from "@/assets/geekx-logo-transparent.png.asset.json";

const SESSION_KEY = "geekx-splash-shown";

export function SplashIntro() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setVisible(false), 2200);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [visible]);


  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="geekx-splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (!visible) document.body.style.overflow = "";
          }}
        >
          {/* Soft rounded card behind logo (Klyzen-style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center rounded-3xl bg-white px-10 py-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25),0_10px_30px_-15px_rgba(124,58,237,0.15)]"
          >
            {/* Subtle gradient halo */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[40px] blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,0.14), transparent 70%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
            />
            <motion.img
              src={logoFull.url}
              alt="GeekX United"
              width={260}
              height={80}
              draggable={false}
              className="relative block h-20 w-auto md:h-24"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Shimmer sweep across logo */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-4 right-4 overflow-hidden rounded-2xl"
            >
              <motion.span
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "260%" }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
              />
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
