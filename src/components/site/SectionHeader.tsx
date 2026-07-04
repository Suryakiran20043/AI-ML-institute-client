import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(center && "text-center mx-auto", "max-w-3xl", className)}
    >
      {eyebrow && (
        <div className={cn("mb-3 inline-flex items-center", center && "justify-center")}>
          <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
