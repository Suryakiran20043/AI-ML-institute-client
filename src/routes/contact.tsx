import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GeekX United" },
      { name: "description", content: "Talk to a GeekX United advisor. Book a free consultation to find the right AI program." },
      { property: "og:title", content: "Contact — GeekX United" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          center
          eyebrow="Contact"
          title={<>Let's build your <span className="text-gradient-brand">AI career path.</span></>}
          description="One clear enquiry form. A real advisor gets back within one business day — no popups, no spam."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="space-y-6">
            <ContactRow icon={Mail} label="Email" value="hello@geekxunited.com" />
            <ContactRow icon={Phone} label="Phone" value="+91 94931 33961" />
          </div>
          <EnquiryForm sourcePage="/contact" />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-base font-medium">{value}</p>
      </div>
    </div>
  );
}
