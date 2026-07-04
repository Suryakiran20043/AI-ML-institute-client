import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Clock, Signal } from "lucide-react";
import type { Program } from "@/lib/programs";

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        to="/programs/$slug"
        params={{ slug: program.slug }}
        className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-gradient-brand">
            {program.category}
          </span>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight">
          {program.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{program.tagline}</p>
        <div className="mt-auto flex items-center gap-4 pt-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {program.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Signal className="h-3.5 w-3.5" /> {program.level}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
