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

export function TrustMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Why learners choose GeekX United"
      className="relative border-y border-border bg-surface-muted py-8"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-muted to-transparent sm:w-24 md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-muted to-transparent sm:w-24 md:w-32" />

      <div className="group overflow-hidden">
        <ul
          className="flex w-max flex-nowrap items-center gap-5 animate-marquee motion-reduce:animate-none md:gap-6 group-hover:[animation-play-state:paused]"
        >
          {loop.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={`${item.label}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/40 bg-white/60 px-5 py-2.5 text-sm font-medium text-foreground shadow-card backdrop-blur-md md:px-6 md:py-3"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
