import { createFileRoute } from "@tanstack/react-router";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Nabh Jain" },
      {
        name: "description",
        content:
          "Internships and engineering experience across AI/ML research and production workflows.",
      },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <ExperienceSection />
    </div>
  ),
});
