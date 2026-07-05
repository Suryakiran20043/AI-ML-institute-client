import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  Rocket,
  GraduationCap,
  Users,
  CheckCircle2,
  Code2,
  Brain,
  Cloud,
  Briefcase,
  BookOpen,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProgramCard } from "@/components/site/ProgramCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { GradientAvatar } from "@/components/site/GradientAvatar";
import { PROGRAMS } from "@/lib/programs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeekX United — Premium AI & Machine Learning Institute" },
      {
        name: "description",
        content:
          "A premium AI & Machine Learning institute. Practical, project-based programs for students and working professionals with career-focused mentorship.",
      },
      { property: "og:title", content: "GeekX United — Premium AI & Machine Learning Institute" },
      { property: "og:description", content: "Practical AI & ML programs for students and working professionals." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const WHY = [
  {
    icon: GraduationCap,
    title: "Clarity-first learning",
    desc: "We simplify complex AI concepts before we go deep. Understanding beats memorization every time.",
  },
  {
    icon: Rocket,
    title: "Career-focused curriculum",
    desc: "Every module ties to a real job outcome — not academic theory or endless syllabi.",
  },
  {
    icon: Users,
    title: "Industry-experienced mentors",
    desc: "Learn from architects and engineers who've shipped AI in production, not just in classrooms.",
  },
  {
    icon: Sparkles,
    title: "Hands-on projects",
    desc: "Build a portfolio of working AI systems you'd actually be proud to share in an interview.",
  },
];

const JOURNEY = [
  { step: "01", title: "Clarity", desc: "Understand what AI & ML actually are — no jargon, no hand-waving." },
  { step: "02", title: "Skills", desc: "Learn Python, ML, Deep Learning, and modern AI tools through structured practice." },
  { step: "03", title: "Projects", desc: "Ship real-world AI & ML projects that become your portfolio." },
  { step: "04", title: "Career", desc: "Polish portfolio, resume, and interview skills to land or transition into an AI role." },
];

const TOOLS = [
  "Python", "NumPy", "Pandas", "scikit-learn", "PyTorch",
  "TensorFlow", "Hugging Face", "OpenAI", "LangChain", "Jupyter",
  "FastAPI", "Docker", "Git", "GitHub", "MLflow",
];

const TRUST = [
  "Live Projects",
  "Practical Learning",
  "Career Guidance",
  "Interview Preparation",
  "Resume Reviews",
  "Industry Mentors",
];

const FAQ = [
  { q: "Who is GeekX United for?", a: "Students, working professionals, and career switchers who want to build practical AI skills that translate to real jobs." },
  { q: "Do I need prior programming experience?", a: "Some programs (like Python for AI) start from zero. Others assume basic coding — each program page lists prerequisites clearly." },
  { q: "Are classes online or offline?", a: "We run both online cohorts and select offline sessions. Details are shared once you book a consultation." },
  { q: "What kind of support do I get?", a: "Mentor Q&A, project reviews, career coaching, resume audits, and mock interviews — all included in flagship programs." },
];

const TESTIMONIALS = [
  // TODO(client): replace with real testimonials once provided.
  { name: "Aditi", role: "AI Engineer", quote: "The clarity-first approach unlocked AI for me. I finally understand what I'm building." },
  { name: "Rohan", role: "Data Scientist", quote: "Projects felt like real work — not homework. My portfolio landed me interviews immediately." },
  { name: "Meera", role: "ML Engineer", quote: "The mentors have shipped this stuff. That perspective changes everything." },
];

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhySection />
      <FeaturedPrograms />
      <JourneySection />
      <ToolsSection />
      <FoundersPreview />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-purple/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent,oklch(0.22_0.05_260)_70%)]" />

      <div className="container-page relative section-y">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
            Where Tech Minds Unite
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Learn AI the practical way.
            <br />
            <span className="text-gradient-brand">Build a future-ready career.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-navy-foreground/75 md:text-lg">
            GeekX United trains you in AI, GenAI, and Cloud through clarity-first curriculum,
            hands-on projects, and mentors who've shipped real systems in production.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="gradient" size="xl">
              <Link to="/programs">Explore Programs <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>

          {/* Trusted-by strip — TODO(client): replace with real partners */}
          <div className="mt-14">
            <p className="text-xs uppercase tracking-widest text-navy-foreground/50">
              Built by professionals from
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy-foreground/60">
              <span>Enterprise AI</span>
              <span>·</span>
              <span>Cloud & MLOps</span>
              <span>·</span>
              <span>Workforce Consulting</span>
              <span>·</span>
              <span>BFSI · Healthcare · Retail · Pharma</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border bg-surface-muted">
      <div className="container-page py-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-foreground/80">
          {TRUST.map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-gradient-brand" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Why GeekX United"
          title={<>AI isn't magic — <span className="text-gradient-brand">the first step is clarity.</span></>}
          description="We built GeekX United because complex AI can be taught simply when the teacher has actually done the work."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPrograms() {
  const featured = PROGRAMS.filter((p) => p.featured).slice(0, 6);
  return (
    <section className="section-y bg-surface-muted">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Featured Programs"
            title="Flagship programs, career outcomes."
            description="Six focused paths — from Python foundations to enterprise GenAI systems."
            className="max-w-2xl"
          />
          <Button asChild variant="outline" size="lg">
            <Link to="/programs">View all programs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProgramCard key={p.slug} program={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Learning Journey"
          title="From curiosity to career, in four stages."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <span className="font-display text-4xl font-bold text-gradient-brand">{s.step}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="section-y bg-navy text-navy-foreground">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Industry Tools"
          title={<span className="text-white">Tools you'll actually use on the job.</span>}
          description={<span className="text-navy-foreground/70">A modern AI stack, taught the way engineers use it in production.</span>}
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-navy-foreground/90 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersPreview() {
  const founders = [
    {
      name: "Ram",
      role: "Founder & Chief Growth Officer",
      bio: "15+ years in talent acquisition and workforce consulting across IT, Healthcare, Retail, Pharma, and BFSI. Leads growth, brand strategy, and industry partnerships.",
    },
    {
      name: "Nageswar",
      role: "Head of AI & Emerging Technologies Training",
      bio: "AI Solution Architect and Generative AI specialist with 10+ years building enterprise-grade AI, ML, NLP, LLM, and RAG solutions. Leads curriculum design and hands-on training.",
    },
  ];
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          eyebrow="Founders"
          title="Built by professionals who bridge industry and learning."
          description="Meet the team behind the curriculum — first names only, real experience."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <div key={f.name} className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
              <GradientAvatar name={f.name} size="lg" />
              <div>
                <h3 className="font-display text-xl font-bold">{f.name}</h3>
                <p className="text-sm font-medium text-gradient-brand">{f.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Read the full story <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section-y bg-surface-muted">
      <div className="container-page">
        <SectionHeader center eyebrow="Voices" title="What learners say." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <p className="text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <GradientAvatar name={t.name} size="md" />
                <div>
                  <p className="font-display text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <SectionHeader eyebrow="FAQ" title="Answers to the questions we hear most." />
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="font-display text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-navy-foreground shadow-glow md:p-16">
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-purple/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Ready to take your <span className="text-gradient-brand">first clear step</span> into AI?
              </h2>
              <p className="mt-4 text-navy-foreground/75">
                Book a free consultation. We'll help you pick the right program based on your goals — no pressure, no sales pitch.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Personalized program guidance", "Career path clarity", "Talk to a real mentor"].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                    <span className="text-navy-foreground/85">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-background p-1 text-foreground">
              <EnquiryForm sourcePage="/#final-cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
