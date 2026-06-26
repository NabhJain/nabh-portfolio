import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: `AI Assistant — Ask ${profile.name} anything` },
      {
        name: "description",
        content: `Conversational AI assistant trained on ${profile.name}'s work, projects, and experience.`,
      },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <div className="pt-28 pb-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3 text-electric" />
            <span className="text-muted-foreground">AI Assistant</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ask my <span className="text-gradient">AI twin</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            A goal-driven agent that knows my projects, experience, and stack —
            so you don't have to scroll.
          </p>
        </div>

        <ChatWindow />
      </div>
    </div>
  );
}
