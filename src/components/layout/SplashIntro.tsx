import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Infinity as InfinityIcon } from "lucide-react";

const SESSION_KEY = "geekx_intro_seen_v1";

export function SplashIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;
    setVisible(true);
    const t = setTimeout(() => dismiss(), 3600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    if (typeof window !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy text-navy-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* TODO(client): replace with uploaded logo animation (Lottie / mp4). */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-brand shadow-glow"
          >
            <InfinityIcon className="h-14 w-14 text-white" strokeWidth={2.5} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 font-display text-2xl font-bold md:text-3xl"
          >
            GeekX <span className="text-gradient-brand">United</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-2 text-sm text-navy-foreground/70 md:text-base"
          >
            Where Tech Minds Unite.
          </motion.p>
          <button
            onClick={dismiss}
            className="absolute bottom-8 right-8 text-xs uppercase tracking-widest text-navy-foreground/50 hover:text-navy-foreground transition-colors"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
