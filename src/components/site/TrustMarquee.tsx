import {
  Rocket,
  BookOpen,
  Compass,
  MessageSquare,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

const ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "Live Projects", icon: Rocket },
  { label: "Practical Learning", icon: BookOpen },
  { label: "Career Guidance", icon: Compass },
  { label: "Interview Preparation", icon: MessageSquare },
  { label: "Resume Reviews", icon: FileText },
  { label: "Industry Mentors", icon: Users },
];

const SPIN_ANGLES = [0, 60, 120, 180, 240, 300];

export function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Why learners choose GeekX United"
      className="relative overflow-hidden bg-navy py-10"
    >
      {/* ambient neon glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.24_300/0.25),transparent_60%)] blur-2xl" />

      {/* edge fades (blend into navy) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent sm:w-28 md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent sm:w-28 md:w-40" />

      <div className="group relative overflow-hidden">
        <ul className="flex w-max flex-nowrap items-center gap-5 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => {
            const Icon = item.icon;
            const angle = SPIN_ANGLES[i % SPIN_ANGLES.length];
            return (
              <li
                key={`${item.label}-${i}`}
                className="relative shrink-0 rounded-full p-[1px] overflow-hidden shadow-[0_0_18px_-2px_rgba(168,85,247,0.35),0_0_18px_-2px_rgba(34,211,238,0.3)]"
              >
                {/* Animated conic-gradient neon ring */}
                <span
                  aria-hidden
                  className="absolute inset-[-150%] animate-border-spin motion-reduce:animate-none opacity-70"
                  style={{
                    background: `conic-gradient(from ${angle}deg, transparent 60deg, oklch(0.65 0.24 300) 120deg, transparent 180deg, transparent 240deg, oklch(0.82 0.15 210) 300deg, transparent 360deg)`,
                  }}
                />
                {/* Pill content */}
                <div className="relative flex items-center gap-3 rounded-full bg-slate-950/90 pl-2.5 pr-5 py-2.5 backdrop-blur-xl">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-white shadow-[0_0_15px_rgba(168,85,247,0.45)]">
                    <Icon className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium text-slate-100">
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
