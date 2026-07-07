import {
  Rocket,
  BookOpen,
  Compass,
  MessageSquare,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

type Variant = "cyan" | "purple";

const ITEMS: { label: string; icon: LucideIcon; variant: Variant }[] = [
  { label: "Live Projects", icon: Rocket, variant: "cyan" },
  { label: "Practical Learning", icon: BookOpen, variant: "purple" },
  { label: "Career Guidance", icon: Compass, variant: "cyan" },
  { label: "Interview Preparation", icon: MessageSquare, variant: "purple" },
  { label: "Resume Reviews", icon: FileText, variant: "cyan" },
  { label: "Industry Mentors", icon: Users, variant: "purple" },
];

export function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Why learners choose GeekX United"
      className="relative overflow-hidden bg-navy py-10"
    >
      {/* ambient neon glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.24_300/0.2),transparent_60%)] blur-2xl" />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent sm:w-28 md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent sm:w-28 md:w-40" />

      <div className="group relative overflow-hidden">
        <ul className="flex w-max flex-nowrap items-center gap-4 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => {
            const Icon = item.icon;
            const isCyan = item.variant === "cyan";
            const iconGradient = isCyan
              ? "from-cyan-400 to-indigo-500"
              : "from-purple-400 to-blue-500";
            const iconGlow = isCyan
              ? "shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              : "shadow-[0_0_15px_rgba(168,85,247,0.4)]";
            const hoverBorder = isCyan
              ? "hover:border-cyan-500/30"
              : "hover:border-purple-500/30";
            const hoverGlow = isCyan
              ? "from-cyan-500/20 to-purple-500/20"
              : "from-purple-500/20 to-cyan-500/20";
            return (
              <li key={`${item.label}-${i}`} className="shrink-0">
                <div
                  className={`group/chip relative flex items-center gap-3.5 rounded-full border border-white/10 bg-slate-900/40 pl-2 pr-6 py-2 shadow-2xl backdrop-blur-xl transition-all duration-500 ${hoverBorder} hover:bg-slate-900/60`}
                >
                  {/* Premium hover glow */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r ${hoverGlow} opacity-0 blur-sm transition-opacity duration-500 group-hover/chip:opacity-100`}
                  />
                  {/* Icon */}
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${iconGradient} ${iconGlow}`}
                  >
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                  </div>
                  {/* Label */}
                  <span className="relative whitespace-nowrap text-sm font-medium tracking-wide text-white">
                    {item.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
