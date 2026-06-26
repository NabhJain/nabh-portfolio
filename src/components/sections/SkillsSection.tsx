import { motion } from "framer-motion";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { skillCategories } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Technical Skills"
          title={<>The toolkit behind production AI</>}
          description="Languages, frameworks, and infrastructure I reach for when shipping intelligent systems end-to-end."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <GlassCard interactive className="h-full p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {cat.title}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-foreground/90 transition-colors group-hover:border-electric/30"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
