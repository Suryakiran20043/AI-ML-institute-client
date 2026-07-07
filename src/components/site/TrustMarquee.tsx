import {
  Rocket,
  BookOpen,
  Compass,
  MessageSquare,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

type Variant = "cyanPurple" | "purpleCyan";

const ITEMS: { label: string; icon: LucideIcon; variant: Variant; iconGradient: string; iconShadow: string }[] = [
  {
    label: "Live Projects",
    icon: Rocket,
    variant: "cyanPurple",
    iconGradient: "from-cyan-400 to-indigo-500",
    iconShadow: "shadow-cyan-500/25",
  },
  {
    label: "Practical Learning",
    icon: BookOpen,
    variant: "purpleCyan",
    iconGradient: "from-purple-400 to-blue-500",
    iconShadow: "shadow-purple-500/25",
  },
  {
    label: "Career Guidance",
    icon: Compass,
    variant: "cyanPurple",
    iconGradient: "from-cyan-400 to-violet-500",
    iconShadow: "shadow-cyan-500/25",
  },
  {
    label: "Interview Preparation",
    icon: MessageSquare,
    variant: "purpleCyan",
    iconGradient: "from-purple-400 to-blue-500",
    iconShadow: "shadow-purple-500/25",
  },
  {
    label: "Resume Reviews",
    icon: FileText,
    variant: "cyanPurple",
    iconGradient: "from-cyan-400 to-indigo-500",
    iconShadow: "shadow-cyan-500/25",
  },
  {
    label: "Industry Mentors",
    icon: Users,
    variant: "purpleCyan",
    iconGradient: "from-purple-400 to-blue-500",
    iconShadow: "shadow-purple-500/25",
  },
];

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
        <ul className="flex w-max flex-nowrap items-center gap-4 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => {
            const Icon = item.icon;
            const ringGradient =
              item.variant === "cyanPurple"
                ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                : "bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500";
            return (
              <li
                key={`${item.label}-${i}`}
                className="relative shrink-0"
              >
                {/* Neon gradient ring */}
                <span
                  aria-hidden
                  className={`absolute -inset-[1px] rounded-full opacity-70 blur-[1px] ${ringGradient}`}
                />
                {/* Glass pill content */}
                <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0f25]/90 px-4 py-2.5 backdrop-blur-xl shadow-2xl whitespace-nowrap">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${item.iconGradient} shadow-lg ${item.iconShadow}`}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-medium tracking-tight text-white/90">
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
