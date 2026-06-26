import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/libs/utils";
import { profile } from "@/data/profile";
import { Sparkles } from "lucide-react";

type Props = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

export function MessageBubble({ role, content, streaming }: Props) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-electric to-purple shadow-glow">
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-gradient-to-br from-electric to-purple text-primary-foreground shadow-glow"
            : "text-foreground",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-code:text-electric prose-a:text-electric prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            {streaming && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 -mb-0.5 bg-electric animate-caret" />
            )}
          </div>
        )}
      </div>
      {isUser && (
        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-[10px] font-semibold">
          {profile.initials}
        </div>
      )}
    </div>
  );
}
