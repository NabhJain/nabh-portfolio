import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/visual/GlassCard";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Nabh Jain" },
      { name: "description", content: "Download or preview Nabh Jain's resume." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Resume"
            title="The one-page version"
            description="Updated regularly. Download as PDF or open in a new tab."
          />
          <div className="flex gap-2">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-electric to-purple px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:shadow-glow"
            >
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" /> Open
            </a>
          </div>
        </div>

        <GlassCard className="mt-10 overflow-hidden">
          <object
            data={profile.resumeUrl}
            type="application/pdf"
            className="h-[80vh] w-full bg-black/40"
          >
            <div className="p-10 text-center text-sm text-muted-foreground">
              Your browser can't preview PDFs.{" "}
              <a
                href={profile.resumeUrl}
                className="text-electric underline-offset-4 hover:underline"
              >
                Download the resume
              </a>
              .
            </div>
          </object>
        </GlassCard>
      </div>
    </div>
  );
}
