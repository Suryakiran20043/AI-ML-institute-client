import { Link } from "@tanstack/react-router";
import { Infinity as InfinityIcon, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { PROGRAMS } from "@/lib/programs";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="GeekX United home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <InfinityIcon className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-bold">
                GeekX<span className="text-gradient-brand"> United</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-navy-foreground/70 max-w-xs">
              Where Tech Minds Unite. Practical AI training built by industry professionals for
              real-world careers.
            </p>
            {/* TODO(client): social links */}
            <div className="mt-5 flex gap-3">
              {[Linkedin, Twitter, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link (placeholder)"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-navy-foreground/60">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/programs", label: "Programs" },
                { to: "/about", label: "About" },
                { to: "/success-stories", label: "Success Stories" },
                { to: "/community", label: "Community" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-navy-foreground/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-navy-foreground/60">
              Programs
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {PROGRAMS.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/programs/$slug"
                    params={{ slug: p.slug }}
                    className="text-navy-foreground/80 hover:text-white transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-navy-foreground/60">
              Contact
            </h4>
            {/* TODO(client): contact address, phone, and hours */}
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li>hello@geekxunited.com</li>
              <li>+91 000 000 0000</li>
              <li>India (address TBD)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-navy-foreground/60">
            © {new Date().getFullYear()} GeekX United. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-navy-foreground/60">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
