import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import founderRam from "@/assets/founder-ram.jpg";
import founderNageswar from "@/assets/founder-nageswar.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GeekX United — Clarity-first AI training" },
      {
        name: "description",
        content:
          "GeekX United was built by professionals who saw a gap between how complex AI looks and how learnable it becomes when taught practically.",
      },
      { property: "og:title", content: "About GeekX United" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-purple/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
        <div className="container-page section-y relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Our Story
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
              AI is not magic —
              <br />
              <span className="text-gradient-brand">the first step is clarity.</span>
            </h1>
            <p className="mt-6 text-lg text-navy-foreground/75">
              GeekX United was built by professionals who saw a gap between how complex AI looks
              on the outside and how learnable it becomes when it's taught practically.
              We teach clarity first, then skills — because everything else compounds from there.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Mission"
              title="Make AI careers accessible — without the fluff."
              description="We believe great teachers pair deep experience with plain language. That's the standard we hold ourselves to for every cohort, every module, every project."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>• Career-first curriculum, not a course catalog dump.</li>
              <li>• Mentors who have shipped real AI systems in production.</li>
              <li>• Small, practical projects that build a real portfolio.</li>
              <li>• Community that supports each other — where tech minds unite.</li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "Clarity-first", v: "Concepts before code." },
              { k: "Hands-on", v: "Every module ships a project." },
              { k: "Career-focused", v: "Skills tied to outcomes." },
              { k: "Community", v: "Learn with tech minds." },
            ].map((c) => (
              <div key={c.k} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <p className="font-display text-lg font-bold text-gradient-brand">{c.k}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface-muted">
        <div className="container-page">
          <SectionHeader center eyebrow="Founders" title="Meet the founders" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FounderCard
              name="Ram"
              role="Founder & Chief Growth Officer"
              bio="15+ years in talent acquisition and workforce consulting across IT, Healthcare, Retail, Pharma, and BFSI sectors. Ram leads growth, brand strategy, and industry partnerships at GeekX United."
              belief="The first step to learning AI isn't coding — it's clarity."
              avatar={founderRam}
            />
            <FounderCard
              name="Nageswar"
              role="Head of AI & Emerging Technologies Training"
              bio="AI Solution Architect and Generative AI specialist with 10+ years building enterprise-grade AI, ML, NLP, LLM, and RAG solutions, plus 3+ years training students and professionals in practical AI skills."
              belief="Curriculum designed by someone who has actually shipped it."
              avatar={founderNageswar}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FounderCard({
  name,
  role,
  bio,
  belief,
}: {
  name: string;
  role: string;
  bio: string;
  belief: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-border bg-card p-8 shadow-card"
    >
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
        <GradientAvatar name={name} size="xl" />
        <div>
          <h3 className="font-display text-2xl font-bold">{name}</h3>
          <p className="text-sm font-medium text-gradient-brand">{role}</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{bio}</p>
      <blockquote className="mt-4 border-l-2 border-brand-purple pl-4 text-sm italic text-foreground/80">
        &ldquo;{belief}&rdquo;
      </blockquote>
    </motion.div>
  );
}
