import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — GeekX United Blog` },
      { name: "description", content: "GeekX United blog post." },
      { property: "og:url", content: `/blog/${params.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  // TODO(client): fetch post from Supabase by slug.
  return (
    <article className="section-y">
      <div className="container-page max-w-3xl">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to blog
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          Placeholder article body. TODO(client): wire this to the Supabase blog_posts table.
        </p>
        <div className="mt-8 h-64 rounded-2xl bg-gradient-brand/15" />
        <div className="mt-10 space-y-4 text-base leading-relaxed">
          <p>
            This is a placeholder blog article template. Once the blog table is provisioned,
            content will render here with proper formatting, code blocks, and images.
          </p>
          <p>
            The layout is intentionally clean — reading first, ornamentation second.
          </p>
        </div>
      </div>
    </article>
  );
}
