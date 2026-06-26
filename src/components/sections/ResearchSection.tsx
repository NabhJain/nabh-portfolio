import { motion } from "framer-motion";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { researchTopics } from "@/data/research";

export function ResearchSection() {
  return (
    <section id="research" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Research Focus"
          title="What I'm reading, building, and thinking about"
          description="Long-running threads across agentic AI, retrieval systems, edge inference, and applied bioinformatics."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {researchTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <GlassCard interactive className="h-full p-6">
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {topic.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {topic.summary}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {topic.focusAreas.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-foreground/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-purple" />
                      {f}
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
