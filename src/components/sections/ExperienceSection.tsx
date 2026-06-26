import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Experience"
          title="From research labs to production systems"
          description="Internships shipping ML and AI into real workflows across geographies."
        />

        <div className="relative mt-12 space-y-4 pl-6 sm:pl-10">
          {/* vertical line */}
          <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-electric/60 via-purple/40 to-transparent sm:left-3" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="absolute -left-[26px] top-6 grid h-5 w-5 place-items-center rounded-full border border-electric/40 bg-background sm:-left-[34px]">
                <span className="h-2 w-2 rounded-full bg-electric shadow-glow" />
              </div>

              <GlassCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm text-electric">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    {exp.period}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm text-foreground/90"
                    >
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-electric" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
