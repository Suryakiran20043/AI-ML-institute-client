import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { Reveal } from "@/components/site/Reveal";
import { MobileScrollFade } from "@/components/site/MobileScrollFade";

import {
  Sparkles,
  Rocket,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Code2,
  Briefcase,
  Target,
  Globe2,
  Clock,
  TrendingUp,
  MessagesSquare,
  Award,
  UserCheck,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProgramCard } from "@/components/site/ProgramCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { TrustMarquee } from "@/components/site/TrustMarquee";
import { GradientAvatar } from "@/components/site/GradientAvatar";
import { PROGRAMS } from "@/lib/programs";
import flagshipStudent from "@/assets/flagship-student.jpg";
import flagshipPro from "@/assets/flagship-pro.jpg";
import founderRam from "@/assets/founder-ram.jpg";
import founderNageswar from "@/assets/founder-nageswar.jpg";

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
      <TrustMarquee />
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: background orbs drift slower/further than content
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy text-navy-foreground"
    >
      {/* parallax gradient orbs */}
      <motion.div
        style={{ y: orbY, willChange: "transform" }}
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-purple/40 blur-3xl"
      />
      <motion.div
        style={{ y: orb2Y, willChange: "transform" }}
        className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/30 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent,oklch(0.22_0.05_260)_70%)]" />

      <div className="container-page relative section-y pt-[100px] md:pt-[100px]">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity, willChange: "transform, opacity" }}
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
            GeekX United trains you in AI, GenAI, and AI&amp;ML through clarity-first curriculum,
            hands-on projects, and mentors who've shipped real systems in production.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="gradient" size="xl">
              <Link to="/programs">Explore AI &amp; ML Programs <ArrowRight className="ml-1 h-4 w-4" /></Link>
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

          {/* Animated stat counters */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 sm:gap-6">
            {[
              { to: 500, suffix: "+", label: "Learners Trained" },
              { to: 50, suffix: "+", label: "Live Projects" },
              { to: 15, suffix: "+", label: "Industry Mentors" },
            ].map((s, i) => (
              <Reveal
                key={s.label}
                index={i}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 backdrop-blur-md sm:px-5 sm:py-5"
              >
                <div className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  <AnimatedCounter to={s.to} suffix={s.suffix} className="text-gradient-brand" />
                </div>
                <div className="mt-1 text-[0.7rem] uppercase tracking-widest text-navy-foreground/60 sm:text-xs">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Focus areas */}
          <div className="mt-14">
            <p className="text-xs uppercase tracking-widest text-navy-foreground/50">
              Two flagship programs
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy-foreground/70">
              <span>AI &amp; Machine Learning for Students</span>
              <span>·</span>
              <span>AI &amp; Machine Learning for Working Professionals</span>
            </div>
          </div>
        </motion.div>
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

const FLAGSHIP_BENEFITS = [
  { icon: MessagesSquare, label: "Live Doubt Solving Sessions" },
  { icon: Award, label: "Certificate of Completion" },
  { icon: UserCheck, label: "1:1 Mentorship & Guidance" },
  { icon: Rocket, label: "Job Assistance & Placement Support" },
  { icon: Gift, label: "Access to Premium AI Tools" },
];

type FlagshipCardProps = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  features: { icon: typeof Calendar; label: string }[];
  learn: string[];
  accent: "purple" | "cyan";
};

function FlagshipCard({
  slug,
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  features,
  learn,
  accent,
}: FlagshipCardProps) {
  const isPurple = accent === "purple";
  const eyebrowBg = isPurple
    ? "bg-brand-purple/10 text-brand-purple"
    : "bg-brand-cyan/10 text-brand-cyan";
  const titleAccentCls = isPurple
    ? "text-brand-purple"
    : "text-brand-cyan";
  const chipIcon = isPurple ? "text-brand-purple" : "text-brand-cyan";
  const check = isPurple ? "text-brand-purple" : "text-brand-cyan";
  const learnHeading = isPurple ? "text-brand-purple" : "text-brand-cyan";
  const btn = isPurple
    ? "bg-gradient-to-r from-brand-purple to-fuchsia-500 shadow-[0_18px_40px_-14px_oklch(0.55_0.22_300/0.6)]"
    : "bg-gradient-to-r from-brand-cyan to-sky-400 shadow-[0_18px_40px_-14px_oklch(0.75_0.15_220/0.6)]";
  const imageGlow = isPurple
    ? "from-brand-purple/20 to-transparent"
    : "from-brand-cyan/20 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]"
    >
      <div className="grid gap-6 md:grid-cols-[1.15fr_auto] md:items-start">
        <div className="flex flex-col">
          <span className={`inline-flex w-fit rounded-lg px-3 py-1 text-xs font-semibold ${eyebrowBg}`}>
            {eyebrow}
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground md:text-[2.2rem]">
            {title}
            <br />
            <span className={titleAccentCls}>{titleAccent}</span>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </div>

        <div className="relative mx-auto flex h-[220px] w-[220px] shrink-0 items-center justify-center">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${imageGlow} blur-2xl`} />
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            width={220}
            height={220}
            className="relative h-[220px] w-[220px] rounded-2xl object-cover"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-3 py-2.5"
          >
            <Icon className={`h-4 w-4 shrink-0 ${chipIcon}`} />
            <span className="text-xs font-medium leading-tight text-foreground/80">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-8">
        <h4 className={`font-display text-lg font-bold ${learnHeading}`}>You'll Learn</h4>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {learn.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle2 className={`h-4 w-4 shrink-0 ${check}`} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/programs/$slug"
        params={{ slug }}
        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white transition-transform hover:scale-[1.01] pt-3.5 ${btn}`}
      >
        View Curriculum <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}



function FeaturedPrograms() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-brand-purple/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-brand-purple">
            Our Flagship Programs
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Our <span className="text-gradient-brand">Flagship Programs</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Two carefully crafted programs to take you from learner to industry-ready AI professional.
          </p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FlagshipCard
            slug="ai-ml-for-students"
            eyebrow="For Students"
            title="AI & Machine Learning"
            titleAccent="for Students"
            description="A complete program to build strong foundations, work on real projects, and kickstart your AI career."
            image={flagshipStudent}
            imageAlt="AI student illustration"
            accent="purple"
            features={[
              { icon: Calendar, label: "6+ Months Program" },
              { icon: Code2, label: "Hands-on Projects" },
              { icon: Users, label: "Industry Mentorship" },
              { icon: Target, label: "Placement Support" },
            ]}
            learn={[
              "Python for AI",
              "Generative AI",
              "Machine Learning",
              "Real-world Projects",
              "Deep Learning",
              "Deployment & MLOps",
            ]}
          />
          <FlagshipCard
            slug="ai-ml-for-professionals"
            eyebrow="For Working Professionals"
            title="AI & Machine Learning"
            titleAccent="for Professionals"
            description="Advance your career with AI skills, real-world case studies, and industry-grade projects."
            image={flagshipPro}
            imageAlt="AI professional illustration"
            accent="cyan"
            features={[
              { icon: Calendar, label: "4+ Months Program" },
              { icon: Globe2, label: "Real-world Use Cases" },
              { icon: Clock, label: "Flexible Learning" },
              { icon: TrendingUp, label: "Career Growth" },
            ]}
            learn={[
              "Advanced ML & DL",
              "MLOps & Deployment",
              "LLM's & GenAI",
              "Cloud & DevOps",
              "Data Engineering",
              "Capstone Projects",
            ]}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.15)] md:p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {FLAGSHIP_BENEFITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple/15 to-brand-cyan/15">
                  <Icon className="h-5 w-5 text-brand-purple" />
                </span>
                <span className="text-xs font-medium leading-tight text-foreground/85 md:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* Legacy card grid retained for SEO/data completeness — hidden visually */}
        <div className="sr-only">
          {PROGRAMS.filter((p) => p.featured).map((p, i) => (
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
      avatar: founderRam,
    },
    {
      name: "Nageswar",
      role: "Head of AI & Emerging Technologies Training",
      bio: "AI Solution Architect and Generative AI specialist with 10+ years building enterprise-grade AI, ML, NLP, LLM, and RAG solutions. Leads curriculum design and hands-on training.",
      avatar: founderNageswar,
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
              <img
                src={f.avatar}
                alt={`${f.name} — ${f.role}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-20 w-20 flex-shrink-0 rounded-full object-cover ring-2 ring-brand-purple/20"
              />
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
