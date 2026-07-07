import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const logoFull = { url: "/geekx-logo-transparent.png" };


const NAV = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Advanced certification in Gen AI & Agentic AI Programs" },
  { to: "/about", label: "About" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const lastYRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        const delta = y - lastYRef.current;
        // Hide when scrolling down past a threshold; show on scroll up.
        // Never hide while the mobile menu is open.
        if (!open) {
          if (delta > 6 && y > 120) setHidden(true);
          else if (delta < -4) setHidden(false);
        }
        lastYRef.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // On mobile, hide the navbar entirely on non-home pages.
  if (isMobile && !isHome) return null;

  // On mobile home page, navbar is static (scrolls away with page).
  // On desktop (any page), navbar stays fixed at the top.
  const mobileHomeStatic = isMobile && isHome;
  const shouldSlide = !mobileHomeStatic && !open;

  return (
    <motion.header
      animate={
        reduceMotion || !shouldSlide
          ? { y: 0, opacity: 1 }
          : { y: hidden ? -120 : 0, opacity: hidden ? 0.6 : 1 }
      }
      transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inset-x-0 top-0 z-50 pointer-events-none",
        mobileHomeStatic ? "absolute" : "fixed",
      )}
      style={{ transform: "translateZ(0)", willChange: "transform, opacity" }}
    >

      <div
        className={cn(
          "pointer-events-auto mx-auto w-[calc(100%-40px)] max-w-[1280px] md:w-[calc(100%-64px)]",
          "transition-[margin-top] duration-300",
          scrolled ? "mt-0" : "mt-2",
        )}
      >



        {/* Animated gradient border wrapper */}
        <div className="relative rounded-[22px] p-[1px]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[22px] opacity-70 animate-nav-gradient"
            style={{
              background:
                "linear-gradient(120deg, #7C3AED 0%, #22D3EE 45%, #7C3AED 100%)",
            }}
          />
          {/* Ambient neon glow */}
          <div
            aria-hidden
            className={cn(
              "absolute -inset-2 rounded-[28px] blur-2xl transition-opacity duration-500",
              scrolled ? "opacity-40" : "opacity-25",
            )}
            style={{
              background:
                "radial-gradient(60% 100% at 20% 50%, rgba(124,58,237,0.35), transparent 70%), radial-gradient(60% 100% at 80% 50%, rgba(34,211,238,0.30), transparent 70%)",
            }}
          />

          <div
            className={cn(
              "relative h-[68px] overflow-hidden rounded-[21px] border border-white/10 px-4 sm:px-6 md:h-20 md:px-8",
              // mobile: [logo | hamburger] left-aligned like klyzen ; desktop: 180px | 1fr | 220px
              "grid grid-cols-[minmax(0,1fr)_44px] items-center gap-4",
              "lg:grid-cols-[180px_minmax(0,1fr)_220px] lg:gap-6",
              "backdrop-blur-[18px] transition-[background-color,box-shadow] duration-300",
              scrolled
                ? "bg-[rgba(6,10,22,0.78)] shadow-[0_20px_60px_-20px_rgba(124,58,237,0.35)]"
                : "bg-[rgba(8,12,25,0.65)] shadow-[0_10px_40px_-20px_rgba(34,211,238,0.25)]",
            )}
            style={{ willChange: "background-color, box-shadow", contain: "layout paint" }}
          >



            {/* Logo — left on mobile & desktop */}
            <Link
              to="/"
              className="group col-start-1 flex h-full min-w-0 items-center justify-start outline-none"
              aria-label="GeekX United — Where Tech Minds Unite"
            >
              <span className="relative inline-flex items-center overflow-hidden rounded-xl bg-white px-3 py-1.5 ring-1 ring-white/40 transition-transform duration-500 group-hover:scale-[1.04]">
                {/* Shimmer sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 animate-logo-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent mix-blend-overlay"
                />
                <img
                  src={logoFull.url}
                  alt="GeekX United — Where Tech Minds Unite"
                  width={220}
                  height={60}
                  className="relative block h-9 w-auto animate-logo-float md:h-12 transition-transform duration-500 group-hover:-rotate-1"
                  draggable={false}
                />
              </span>

            </Link>



            {/* Column 2 — Centered nav (desktop only) */}
            <nav className="hidden lg:flex h-full items-center justify-center gap-1 xl:gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={cn(
                    "group relative px-3 py-2 text-sm font-medium tracking-tight text-white/70 transition-colors duration-300",
                    "hover:text-white data-[status=active]:text-white",
                  )}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -bottom-1 left-0 right-0 mx-auto h-[2px] w-0 rounded-full transition-all duration-300",
                        "bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]",
                        "group-hover:w-full group-data-[status=active]:w-full",
                      )}
                    />
                  </span>
                </Link>
              ))}
            </nav>

            {/* Column 3 — CTA (desktop) / Hamburger (mobile) */}
            <div className="flex h-full items-center justify-end">
              <Button
                asChild
                variant="gradient"
                size="default"
                className="hidden lg:inline-flex w-full max-w-[220px] justify-center overflow-hidden shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-10px_rgba(34,211,238,0.55)]"
              >
                <Link to="/contact">Book Free Consultation</Link>
              </Button>

              <button
                className={cn(
                  "lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-md",
                  "text-white/90 transition-colors duration-200 hover:text-white",
                )}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              className="lg:hidden overflow-hidden"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, height: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0.15 }
                  : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ willChange: "opacity, transform, height" }}
            >
              <div className="mt-3 relative rounded-[22px] p-[1px]">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[22px] opacity-60 animate-nav-gradient"
                  style={{
                    background:
                      "linear-gradient(120deg, #7C3AED 0%, #22D3EE 45%, #7C3AED 100%)",
                  }}
                />
                <motion.nav
                  className="relative flex flex-col gap-1 rounded-[21px] border border-white/10 bg-[rgba(8,12,25,0.85)] p-4 backdrop-blur-[18px]"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    show: {
                      transition: reduceMotion
                        ? {}
                        : { staggerChildren: 0.045, delayChildren: 0.08 },
                    },
                  }}
                >
                  {NAV.map((item) => (
                    <motion.div
                      key={item.to}
                      variants={{
                        hidden: reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: -8 },
                        show: reduceMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.28, ease: "easeOut" },
                            },
                      }}
                    >
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/" }}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition-colors duration-200",
                          "hover:bg-white/[0.06] hover:text-white",
                          "data-[status=active]:bg-white/[0.08] data-[status=active]:text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={{
                      hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 },
                      show: reduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, ease: "easeOut" },
                          },
                    }}
                  >
                    <Button
                      asChild
                      variant="gradient"
                      size="lg"
                      className="mt-2 w-full shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)]"
                    >
                      <Link to="/contact" onClick={() => setOpen(false)}>
                        Book Free Consultation
                      </Link>
                    </Button>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  );
}
