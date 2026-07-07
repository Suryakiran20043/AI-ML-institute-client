import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProgramCard } from "@/components/site/ProgramCard";
import { PROGRAMS } from "@/lib/programs";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Advanced certification in Gen AI & Agentic AI Programs — GeekX United" },
      {
        name: "description",
        content:
          "Two flagship Advanced certification in Gen AI & Agentic AI programs — for students and for working professionals. Practical, project-based, and career-focused.",
      },
      { property: "og:title", content: "Advanced certification in Gen AI & Agentic AI Programs — GeekX United" },
      { property: "og:description", content: "Advanced certification in Gen AI & Agentic AI programs for students and working professionals." },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Advanced certification in Gen AI & Agentic AI Programs"
          title={<>Two flagship programs. <span className="text-gradient-brand">One clear path into AI.</span></>}
          description="Focused, practical, and mentor-led Advanced certification in Gen AI & Agentic AI training — designed for students and working professionals."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.slug} program={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
