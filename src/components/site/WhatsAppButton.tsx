import { useState } from "react";
import { motion } from "motion/react";

const WHATSAPP_NUMBER = "919493133961";
const MESSAGE = `Hello GeekX United,

I'm interested in learning more about your AI & Machine Learning programs. Please share the course details and help me get started.`;

export function WhatsAppButton() {
  const [hover, setHover] = useState(false);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-6 md:right-6">
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
        href={href}
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] ring-1 ring-black/5"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16.03 4C9.94 4 5 8.94 5 15.03c0 1.98.53 3.87 1.53 5.55L5 27l6.6-1.73c1.62.88 3.45 1.35 5.43 1.35 6.09 0 11.03-4.94 11.03-11.03S22.12 4 16.03 4z" />
        </svg>
      </motion.a>
    </div>
  );
}
