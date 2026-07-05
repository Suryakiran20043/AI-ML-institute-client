import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import intro from "@/assets/geekx-intro.mp4.asset.json";

const SESSION_KEY = "geekx_intro_seen_v1";
const MAX_MS = 3800;
const PLAYBACK_RATE = 2.7; // ~10s source → ~3.7s

export function SplashIntro() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;
    setVisible(true);
    const t = setTimeout(dismiss, MAX_MS);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <video
            ref={(el) => {
              videoRef.current = el;
              if (el) el.playbackRate = PLAYBACK_RATE;
            }}
            src={intro.url}
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            className="max-h-[80vh] max-w-[90vw] w-auto h-auto"
          />
          <button
            onClick={dismiss}
            className="absolute bottom-8 right-8 text-xs uppercase tracking-widest text-navy/60 hover:text-navy transition-colors"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
