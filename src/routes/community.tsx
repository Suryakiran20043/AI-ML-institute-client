import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community & Events — GeekX United" },
      {
        name: "description",
        content: "Workshops, webinars, and tech meetups at GeekX United — where tech minds unite.",
      },
      { property: "og:title", content: "Community — GeekX United" },
      { property: "og:url", content: "/community" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: CommunityPage,
});

// TODO(client): replace with real events from Supabase.
const EVENTS = [
  { title: "Intro to Generative AI", type: "Webinar", date: "Coming soon", location: "Online" },
  { title: "RAG Workshop: Build with LlamaIndex", type: "Workshop", date: "Coming soon", location: "Online" },
  { title: "AI Careers Meetup", type: "Meetup", date: "Coming soon", location: "Hyderabad · TBD" },
];

function CommunityPage() {
  return (
    <>
      <section className="section-y">
        <div className="container-page">
          <SectionHeader
            center
            eyebrow="Community"
            title={<>Where <span className="text-gradient-brand">tech minds unite.</span></>}
            description="Workshops, webinars, and meetups where learners, mentors, and industry professionals connect."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {EVENTS.map((e) => (
            <div key={e.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-gradient-brand">
                {e.type}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{e.title}</h3>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {e.date}</p>
                <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {[
            { icon: Users, title: "Peer learning", desc: "Study groups and cohort chats to move faster together." },
            { icon: Calendar, title: "Monthly events", desc: "Hands-on workshops on trending AI topics." },
            { icon: MapPin, title: "In-person meetups", desc: "Networking sessions with industry practitioners." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-navy-foreground/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
