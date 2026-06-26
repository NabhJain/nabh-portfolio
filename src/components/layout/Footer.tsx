import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-base font-semibold">
              {profile.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {profile.headline} building agentic AI, ML systems, and
              retrieval-augmented experiences.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
              {["About", "Projects", "Experience", "Research", "Resume", "Contact"].map((label) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="mt-3 flex gap-2">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={profile.social.email}
                aria-label="Email"
                className="glass grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Resume"
                className="glass grid h-9 w-9 place-items-center rounded-lg transition-colors hover:bg-white/10"
              >
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with care.
          </p>
          <p className="font-mono">
            Built with React · TypeScript · Tailwind · TanStack Start
          </p>
        </div>
      </div>
    </footer>
  );
}
