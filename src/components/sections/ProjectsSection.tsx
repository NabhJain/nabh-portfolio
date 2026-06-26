import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Production systems & research"
          description="Selected work spanning agentic AI, multi-agent systems, bioinformatics ML, and edge AI."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="block h-full"
              >
                <GlassCard interactive className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-electric">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
