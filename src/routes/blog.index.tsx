import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — GeekX United" },
      { name: "description", content: "Practical AI, career guides, and industry insights from GeekX United." },
      { property: "og:title", content: "Blog — GeekX United" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogList,
});

// TODO(client): replace with Supabase-backed blog_posts.
const POSTS = [
  { slug: "why-ai-clarity-first", title: "Why we teach AI clarity-first", excerpt: "The counterintuitive reason clarity beats coding as step one for AI careers." },
  { slug: "rag-vs-fine-tuning", title: "RAG vs fine-tuning: which and when", excerpt: "A pragmatic decision guide for engineers building LLM apps." },
  { slug: "ai-resume-that-works", title: "The AI resume that actually gets replies", excerpt: "What hiring managers scan for — and what they ignore." },
];

function BlogList() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Blog"
          title="Ideas, guides, and career notes."
          description="Practical writing on AI, careers, and building with modern tools."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="h-40 rounded-xl bg-gradient-brand/20" />
              <h3 className="mt-5 font-display text-lg font-bold group-hover:text-gradient-brand">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
