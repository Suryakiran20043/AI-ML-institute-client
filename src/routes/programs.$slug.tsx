import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Signal,
  ArrowRight,
  Wrench,
  GraduationCap,
  Briefcase,
  Users,
  Building2,
  Video,
  Compass,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProgram } from "@/lib/programs";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Program not found — GeekX United" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.program;
    return {
      meta: [
        { title: `${p.title} — GeekX United` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.title} — GeekX United` },
        { property: "og:description", content: p.tagline },
        { property: "og:url", content: `/programs/${params.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/programs/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="font-display text-3xl font-bold">Program not found</h1>
      <p className="mt-2 text-muted-foreground">Browse all programs instead.</p>
      <Button asChild variant="gradient" className="mt-6">
        <Link to="/programs">See all programs</Link>
      </Button>
    </div>
  ),
  errorComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong loading this program.</h1>
    </div>
  ),
  component: ProgramDetail,
});

function ProgramDetail() {
  const { program } = Route.useLoaderData() as { program: import("@/lib/programs").Program };

  const studentMsg = `Hello GeekX United,\n\nI'd like to *Book a Free Consultation* for the "${program.title}" program.\n\nI'm a *student* interested in AI & Machine Learning. Please help me with:\n• Course structure, duration & fees\n• Hands-on projects and mentorship\n• Career opportunities after the program\n• Next steps to enroll\n\nThank you!`;
  const proMsg = `Hello GeekX United,\n\nI'd like to *Book a Free Consultation* for the "${program.title}" program.\n\nI'm a *working professional* looking to upskill / transition into AI & Machine Learning. Please help me with:\n• Program curriculum & weekend/live sessions\n• Duration, fees and payment options\n• Portfolio projects & career transition support\n• Next steps to get started\n\nLooking forward to your response.`;
  const whatsappUrl = `https://wa.me/919493133961?text=${encodeURIComponent(
    program.audience === "Students" ? studentMsg : proMsg
  )}`;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-purple/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
        <div className="container-page relative section-y">
          <Link to="/programs" className="text-sm text-navy-foreground/70 hover:text-white">
            ← All AI & ML Programs
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
              {program.category} · {program.audience}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
              {program.title}
            </h1>
            <p className="mt-4 text-lg text-navy-foreground/75">{program.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-navy-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {program.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Signal className="h-4 w-4" /> {program.level}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gradient" size="lg">
                <a href="#enquire">Enquire Now <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-16">
            <div>
              <SectionHeader eyebrow="Overview" title="What this program is about" description={program.overview} />
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                <Users className="h-5 w-5 text-gradient-brand" /> Who it's for
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {program.whoItsFor.map((w) => (
                  <li key={w} className="flex gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-card">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-cyan" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">What you'll learn</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {program.skills.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">Curriculum</h2>
              <div className="mt-4 space-y-3">
                {program.curriculum.map((m, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-bold text-gradient-brand">0{i + 1}</span>
                      <h3 className="font-display font-bold">{m.module}</h3>
                    </div>
                    <ul className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {program.industryUseCases && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <Building2 className="h-5 w-5 text-gradient-brand" /> Industry use cases
                </h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {program.industryUseCases.map((u) => (
                    <li key={u} className="flex gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-card">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-purple" />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {program.liveSessions && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <Video className="h-5 w-5 text-gradient-brand" /> Live practical sessions
                </h2>
                <p className="mt-3 text-muted-foreground">{program.liveSessions}</p>
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  {program.audience === "Working Professionals" ? "Portfolio projects" : "Hands-on projects"}
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {program.projects.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Briefcase className="h-4 w-4 shrink-0 text-brand-purple" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Tools you'll use</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {program.tools.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-3 py-1.5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">Career outcomes</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {program.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-card"
                  >
                    <GraduationCap className="h-4 w-4 text-gradient-brand" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {(program.careerGuidance || program.careerTransition) && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                  <Compass className="h-5 w-5 text-gradient-brand" />
                  {program.careerTransition ? "Career transition guidance" : "Career guidance"}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {program.careerTransition ?? program.careerGuidance}
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                <Award className="h-5 w-5 text-gradient-brand" /> Certificate of completion
              </h2>
              <p className="mt-3 text-muted-foreground">{program.certificate}</p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="mt-4">
                {program.faq.map((f, i) => (
                  <AccordionItem key={i} value={`f-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gradient" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Book Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#enquire">Talk to an Advisor</a>
              </Button>
            </div>
          </div>

          <aside id="enquire" className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-gradient-brand" />
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Enquire about this program
                </p>
              </div>
              <EnquiryForm defaultCourse={program.slug} sourcePage={`/programs/${program.slug}`} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
