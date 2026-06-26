import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nabh Jain" },
      {
        name: "description",
        content: "Reach out for AI engineering roles, collaborations, or research conversations.",
      },
    ],
  }),
  component: () => (
    <div className="pt-24">
      <ContactSection />
    </div>
  ),
});
