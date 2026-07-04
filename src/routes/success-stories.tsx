import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { GradientAvatar } from "@/components/site/GradientAvatar";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — GeekX United" },
      {
        name: "description",
        content: "Learner outcomes, alumni stories, and hiring partners of GeekX United.",
      },
      { property: "og:title", content: "Success Stories — GeekX United" },
      { property: "og:url", content: "/success-stories" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: SuccessStories,
});

// TODO(client): replace all content on this page with real testimonials and hiring partners.
const STORIES = [
  { name: "Aditi", role: "AI Engineer", from: "QA Analyst → AI Engineer", quote: "The clarity-first approach unlocked AI for me. I finally understood what I was building — and my portfolio showed it." },
  { name: "Rohan", role: "Data Scientist", from: "Data Analyst → Data Scientist", quote: "Projects felt like real work — not homework. Interviewers asked me deep questions and I could actually answer." },
  { name: "Meera", role: "ML Engineer", from: "Career switcher → ML Engineer", quote: "The mentors have shipped this stuff. That perspective changes everything about how you learn." },
];

function SuccessStories() {
  return (
    <>
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            center
            eyebrow="Success Stories"
            title="Real learners. Real outcomes."
            description="Placeholder stories until we're ready to feature verified alumni. TODO(client): swap with real names, roles, and outcomes."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STORIES.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <Quote className="h-6 w-6 text-gradient-brand" />
                <p className="mt-4 text-sm leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <GradientAvatar name={s.name} size="md" />
                  <div>
                    <p className="font-display text-sm font-bold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                    <p className="mt-0.5 text-xs text-gradient-brand">{s.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-muted">
        <div className="container-page">
          <SectionHeader center eyebrow="Hiring Partners" title="Where alumni work" description="Logos placeholder — TODO(client): add real partners." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center rounded-xl border border-dashed border-border bg-card text-xs text-muted-foreground"
              >
                Partner {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
