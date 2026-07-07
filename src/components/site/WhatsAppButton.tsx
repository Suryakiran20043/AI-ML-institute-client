import { useState } from "react";
import { motion } from "motion/react";

const WHATSAPP_NUMBER = "919493133961";
const MESSAGE = `Hello GeekX United,

I'm interested in learning more about your Gen AI Agent Engineer programs. Please share the course details and help me get started.`;

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

export function WhatsAppButton() {
  const [hover, setHover] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-[60] flex items-center gap-3 md:bottom-6 md:right-6">
      {hover && (
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden rounded-xl bg-foreground px-3 py-2 text-xs font-medium text-background shadow-lg md:inline-block"
        >
          Chat with us on WhatsApp
        </motion.span>
      )}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] ring-1 ring-black/5 hover:bg-[#1ebe5d] transition-colors"
      >
        {/* Official WhatsApp glyph */}
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.594 4.463 1.723 6.404L3.2 28.8l6.55-1.712a12.77 12.77 0 0 0 6.25 1.622h.006c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.71-12.803-12.71zm0 23.36h-.005a10.62 10.62 0 0 1-5.416-1.484l-.388-.23-3.887 1.015 1.037-3.79-.253-.39a10.6 10.6 0 0 1-1.626-5.68c0-5.867 4.773-10.64 10.643-10.64 2.842 0 5.513 1.108 7.523 3.12a10.56 10.56 0 0 1 3.117 7.526c-.001 5.867-4.774 10.553-10.745 10.553zm5.833-7.964c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.186.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.951-.848-1.593-1.895-1.78-2.215-.186-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.525-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4s-1.12 1.094-1.12 2.667c0 1.574 1.147 3.094 1.307 3.307.16.213 2.256 3.445 5.466 4.83.764.33 1.36.527 1.825.674.767.244 1.464.21 2.016.128.615-.092 1.892-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </motion.a>
    </div>
  );
}
