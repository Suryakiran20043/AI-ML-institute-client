import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import mark from "@/assets/geekx-mark.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "AI & ML Programs" },
  { to: "/about", label: "About" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="pointer-events-auto mx-auto mt-5 w-[calc(100%-40px)] max-w-[1280px] md:w-[calc(100%-64px)]">


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
              "relative flex h-[72px] items-center justify-between overflow-hidden rounded-[21px] border border-white/10 px-3 sm:px-4 md:h-[80px] md:px-6",
              "backdrop-blur-[18px] transition-[background-color,box-shadow] duration-300",
              scrolled
                ? "bg-[rgba(6,10,22,0.78)] shadow-[0_20px_60px_-20px_rgba(124,58,237,0.35)]"
                : "bg-[rgba(8,12,25,0.65)] shadow-[0_10px_40px_-20px_rgba(34,211,238,0.25)]",
            )}
            style={{ willChange: "background-color, box-shadow", contain: "layout paint" }}
          >
            <Link
              to="/"
              className="group flex shrink-0 items-center gap-2.5 outline-none"
              aria-label="GeekX United — Where Tech Minds Unite"
            >
              <img
                src={mark.url}
                alt=""
                width={44}
                height={44}
                className="block h-9 w-auto md:h-11 transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_14px_rgba(124,58,237,0.6))]"
                draggable={false}
              />
              <span className="font-display text-base font-bold tracking-tight text-white md:text-lg">
                GeekX <span className="bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] bg-clip-text text-transparent">United</span>
              </span>
            </Link>




            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className={cn(
                    "group relative px-3.5 py-2 text-sm font-medium tracking-tight text-white/70 transition-colors duration-300",
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

            <div className="hidden lg:block">
              <Button
                asChild
                variant="gradient"
                size="default"
                className="relative overflow-hidden shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-10px_rgba(34,211,238,0.55)]"
              >
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
            </div>

            <button
              className={cn(
                "lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full",
                "border border-white/15 bg-white/[0.06] text-white backdrop-blur-md",
                "transition-all duration-300 hover:bg-white/10",
                "shadow-[0_0_20px_-6px_rgba(124,58,237,0.6)] hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out",
            open ? "mt-3 max-h-[520px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
          )}
          style={{ willChange: "max-height, opacity, transform" }}
        >
          <div className="relative rounded-[22px] p-[1px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[22px] opacity-60 animate-nav-gradient"
              style={{
                background:
                  "linear-gradient(120deg, #7C3AED 0%, #22D3EE 45%, #7C3AED 100%)",
              }}
            />
            <nav
              className="relative flex flex-col gap-1 rounded-[21px] border border-white/10 bg-[rgba(8,12,25,0.85)] p-4 backdrop-blur-[18px]"
            >
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition-all duration-300",
                    "hover:bg-white/[0.06] hover:text-white",
                    "data-[status=active]:bg-white/[0.08] data-[status=active]:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                variant="gradient"
                size="lg"
                className="mt-2 shadow-[0_8px_30px_-8px_rgba(124,58,237,0.6)]"
              >
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Book Free Consultation
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
