import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/sections/AboutSection";
import { GlassCard } from "@/components/visual/GlassCard";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${profile.name}` },
      {
        name: "description",
        content: `${profile.name}'s journey, research interests, and current focus in AI engineering.`,
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-32">
      <AboutSection />

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Education
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {profile.education.map((e) => (
              <GlassCard key={e.school} className="p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-electric">
                  {e.period}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold">
                  {e.school}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                <p className="mt-3 text-xs text-foreground/80">{e.grade}</p>
                <p className="mt-1 text-xs text-muted-foreground">{e.location}</p>
              </GlassCard>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
            Certifications
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {profile.certifications.map((c) => (
              <li
                key={c}
                className="glass rounded-xl px-4 py-3 text-sm text-foreground/90"
              >
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
            Leadership & community
          </h2>
          <ul className="mt-6 space-y-2">
            {profile.leadership.map((l) => (
              <li
                key={l}
                className="glass rounded-xl px-4 py-3 text-sm text-foreground/90"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
