import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProgramCard } from "@/components/site/ProgramCard";
import { PROGRAMS, CATEGORIES, type Category } from "@/lib/programs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — GeekX United" },
      {
        name: "description",
        content:
          "Explore AI, GenAI, Cloud, Development, and Career programs at GeekX United — practical, career-focused, and taught by industry mentors.",
      },
      { property: "og:title", content: "Programs — GeekX United" },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const filtered = active === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === active);

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Programs"
          title={<>Programs that build <span className="text-gradient-brand">real careers.</span></>}
          description="Practical, hands-on, and outcome-focused. Filter by category to explore."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                active === c
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProgramCard key={p.slug} program={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
