import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center pt-32">
      <div className="mx-auto w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric/50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
          </span>
          Available for AI engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease }}
          className="mt-7 font-display text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-5 max-w-2xl text-xl font-medium tracking-[-0.01em] text-foreground/80 sm:text-2xl"
        >
          {profile.roles.join(" · ")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
          >
            View projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.05]"
          >
            <Sparkles className="h-3.5 w-3.5 text-electric" /> Talk to my AI
          </Link>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center gap-3 text-muted-foreground"
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={profile.social.email}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
