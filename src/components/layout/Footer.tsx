import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { PROGRAMS } from "@/lib/programs";
import logoMark from "@/assets/geekx-mark.png.asset.json";

const LINKEDIN_URL = "https://www.linkedin.com/company/geekxunited/";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="GeekX United home">
              <img src={logoMark.url} alt="" className="h-10 w-auto" />
              <span className="font-display text-lg font-bold">
                GeekX<span className="text-gradient-brand"> United</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-navy-foreground/70 max-w-xs">
              Where Tech Minds Unite. A premium AI &amp; Machine Learning institute built for
              practical, project-based learning and career outcomes.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GeekX United on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-navy-foreground/60">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/programs", label: "AI & ML Programs" },
                { to: "/about", label: "About" },
                { to: "/success-stories", label: "Success Stories" },
                { to: "/community", label: "Community" },
                
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
              {PROGRAMS.map((p) => (
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
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
              <li>hello@geekxunited.com</li>
              <li>+91 94931 33961</li>
              <li>India</li>
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
