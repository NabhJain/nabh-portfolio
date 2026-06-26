import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Nabh Jain" },
      {
        name: "description",
        content:
          "Featured AI projects: agentic portfolio assistant, autonomous email intelligence, eDNA biodiversity pipeline, and NeuroRoute swarm intelligence.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsSection />
    </div>
  );
}
