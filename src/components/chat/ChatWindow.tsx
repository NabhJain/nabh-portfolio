import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Loader2, Sparkles, Square, Trash2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { createChatProvider, type ChatMessage } from "@/services/ai";
import { profile } from "@/data/profile";

const SUGGESTED_PROMPTS = [
  "Walk me through your featured projects",
  "What's your current research focus?",
  "Which tech stack do you use day-to-day?",
  "Tell me about your AI/ML experience",
  "How can I contact you for opportunities?",
];

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

export function ChatWindow() {
  const provider = useMemo(() => createChatProvider(), []);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted" | "streaming">("idle");
  const [streamingContent, setStreamingContent] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => scrollToBottom(), [messages, streamingContent, scrollToBottom]);
  useEffect(() => textareaRef.current?.focus(), []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status !== "idle") return;

      const userMessage: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput("");
      setStatus("submitted");
      setStreamingContent("");
      textareaRef.current?.focus();

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        let acc = "";
        let started = false;
        for await (const delta of provider.stream(
          { messages: nextMessages },
          controller.signal,
        )) {
          if (!started) {
            setStatus("streaming");
            started = true;
          }
          acc += delta;
          setStreamingContent(acc);
        }
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "assistant", content: acc, createdAt: Date.now() },
        ]);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) => [
            ...prev,
            {
              id: uid(),
              role: "assistant",
              content:
                "I hit an error reaching the chat backend. Try again, or update `VITE_CHAT_PROVIDER`.",
              createdAt: Date.now(),
            },
          ]);
        }
      } finally {
        setStreamingContent("");
        setStatus("idle");
        abortRef.current = null;
      }
    },
    [messages, provider, status],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const stop = () => abortRef.current?.abort();
  const clear = () => {
    if (status !== "idle") return;
    setMessages([]);
  };

  const isLoading = status === "submitted" || status === "streaming";
  const showEmpty = messages.length === 0 && !isLoading;

  return (
    <div className="glass-strong flex h-[min(80vh,720px)] flex-col overflow-hidden rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-electric to-purple shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">{profile.name}'s Assistant</p>
            <p className="text-[11px] text-muted-foreground">
              {isLoading ? (
                <span className="text-electric">● Thinking…</span>
              ) : (
                <>● Online · powered by {provider.name}</>
              )}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={messages.length === 0 || isLoading}
          className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground disabled:opacity-40"
          aria-label="Clear conversation"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-5 overflow-y-auto px-5 py-6"
      >
        {showEmpty && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-electric to-purple shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
              Ask me anything about {profile.name}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              I'm a mock implementation today — wire me to a real LLM via
              <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-electric">
                VITE_CHAT_PROVIDER
              </code>
              to ground answers in his full knowledge base.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void send(p)}
                  className="glass rounded-full px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:bg-white/10"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MessageBubble role={m.role === "assistant" ? "assistant" : "user"} content={m.content} />
            </motion.div>
          ))}
        </AnimatePresence>

        {status === "submitted" && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-electric to-purple shadow-glow">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-electric [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-electric [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-electric" />
            </span>
          </div>
        )}

        {status === "streaming" && streamingContent && (
          <MessageBubble role="assistant" content={streamingContent} streaming />
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/5 bg-background/30 p-3"
      >
        <div className="glass flex items-end gap-2 rounded-2xl p-2 focus-within:border-electric/40">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Ask about ${profile.name}'s projects, stack, or experience…`}
            rows={1}
            disabled={isLoading}
            className="max-h-40 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destructive/80 text-white transition-colors hover:bg-destructive"
              aria-label="Stop generating"
            >
              <Square className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric to-purple text-primary-foreground transition-all hover:shadow-glow disabled:opacity-40"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-2 px-2 text-[11px] text-muted-foreground">
          Press <kbd className="rounded bg-white/5 px-1 font-mono">↵</kbd> to send,
          <kbd className="ml-1 rounded bg-white/5 px-1 font-mono">⇧↵</kbd> for newline
        </p>
      </form>
    </div>
  );
}
