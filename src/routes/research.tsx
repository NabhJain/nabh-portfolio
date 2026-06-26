import { createFileRoute } from "@tanstack/react-router";
import { ResearchSection } from "@/components/sections/ResearchSection";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Nabh Jain" },
      {
        name: "description",
        content:
          "Research interests spanning agentic AI, multi-agent systems, RAG, edge AI, and bioinformatics.",
      },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <ResearchSection />
    </div>
  ),
});
