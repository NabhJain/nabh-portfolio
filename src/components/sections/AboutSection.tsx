import { motion } from "framer-motion";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeader
            eyebrow="About"
            title={<>Engineering intelligence into <span className="text-gradient">real products</span>.</>}
            description="A founder-style operator who treats AI as the product surface, not a buzzword. I ship."
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <div className="space-y-4 text-base leading-relaxed text-foreground/90">
                {profile.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Currently
                  </p>
                  <p className="mt-1 font-medium">Agentic AI · RAG · Edge ML</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Based in
                  </p>
                  <p className="mt-1 font-medium">{profile.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Open to
                  </p>
                  <p className="mt-1 font-medium">AI eng roles · research</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Reach me
                  </p>
                  <a
                    href={profile.social.email}
                    className="mt-1 block font-medium text-electric hover:underline"
                  >
                    Email
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
