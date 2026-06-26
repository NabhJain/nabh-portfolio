/**
 * AI Service abstraction.
 *
 * The chat UI talks to one of several providers (mock by default).
 * Switch providers by setting:
 *
 *   VITE_CHAT_PROVIDER = "mock" | "huggingface" | "fastapi" | "local"
 *
 * Endpoint URLs are also driven by env vars — never hardcoded:
 *
 *   VITE_HUGGINGFACE_URL = "https://your-space.hf.space/api/chat"
 *   VITE_FASTAPI_URL     = "https://your-fastapi-host.com/chat"
 *   VITE_LOCAL_API_URL   = "http://localhost:8000/chat"
 *
 * To add a new provider:
 *   1. Implement the ChatProvider interface below.
 *   2. Register it in `createChatProvider`.
 *   3. Add the env var name to your deployment.
 */

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatProvider {
  name: string;
  /** Stream string chunks. Implementations should yield small text deltas. */
  stream(request: ChatRequest, signal?: AbortSignal): AsyncIterable<string>;
}

/* -------------------------------------------------------------------------- */
/* Mock provider — default. Realistic streaming responses about Nabh.         */
/* -------------------------------------------------------------------------- */

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const KNOWLEDGE_SNIPPETS = {
  about: `${profile.name} is an AI Engineer focused on **agentic AI**, **machine learning**, and **retrieval-augmented generation**. He's a 3rd-year Computer Engineering student at NMIMS Indore and has shipped production OCR + ML systems with international teams.`,
  projects: `He's built four flagship systems:\n\n1. **Agentic Portfolio Assistant** — goal-driven RAG agent (this chatbot's lineage).\n2. **Autonomous Email Intelligence** — multi-agent LangGraph system for inbox triage.\n3. **eDNA Biodiversity Pipeline** — bioinformatics ML for species ID.\n4. **NeuroRoute** — federated + swarm learning for edge AI fleet routing.`,
  stack: `Day-to-day: **Python**, **TypeScript**, **LangGraph**, **CrewAI**, **Gemini**, **HuggingFace**, **FastAPI**, **Supabase**, **TensorFlow**, **XGBoost**, **React**, **Docker**.`,
  contact: `Reach out via [email](mailto:${profile.email}) or [LinkedIn](${profile.social.linkedin}). His resume is available on the [Resume page](/resume).`,
  experience: `He's interned as an **AI/ML Research Intern at Ecoreceipt Ltd. (UK, remote)** building OCR-driven document understanding, and as an **AI/ML Intern at Hiteshi Infotech** owning end-to-end ML pipelines.`,
};

function pickMockReply(userMessage: string): string {
  const q = userMessage.toLowerCase();
  if (/(who|about|background|bio)/.test(q)) return KNOWLEDGE_SNIPPETS.about;
  if (/(project|work|built|build|portfolio)/.test(q)) {
    const list = projects
      .map(
        (p) => `- **[${p.title}](/projects/${p.slug})** — ${p.tagline}`,
      )
      .join("\n");
    return `Here are the featured projects:\n\n${list}\n\nAsk me about any one of them for the technical deep-dive.`;
  }
  if (/(stack|tech|tool|language|framework)/.test(q)) return KNOWLEDGE_SNIPPETS.stack;
  if (/(contact|email|reach|hire|linkedin)/.test(q)) return KNOWLEDGE_SNIPPETS.contact;
  if (/(experience|intern|job|work history)/.test(q)) return KNOWLEDGE_SNIPPETS.experience;
  if (/(rag|retrieval|agent|agentic|llm)/.test(q))
    return `Agentic AI is the current focus: LLMs that **plan**, **use tools**, and **self-correct**. He combines LangGraph orchestration with RAG over a curated knowledge base — see the [Agentic Portfolio Assistant](/projects/agentic-portfolio-assistant) project for the canonical architecture.`;

  return `Great question. I'm a mock assistant for now — wire me up to a real LLM via \`VITE_CHAT_PROVIDER\` to get grounded answers from ${profile.name}'s full knowledge base. In the meantime, try asking about his **projects**, **experience**, **stack**, or **research focus**.`;
}

class MockProvider implements ChatProvider {
  name = "mock";
  async *stream(request: ChatRequest, signal?: AbortSignal): AsyncIterable<string> {
    const last = [...request.messages].reverse().find((m) => m.role === "user");
    const reply = pickMockReply(last?.content ?? "");
    // Stream char-grouped chunks to simulate token streaming.
    const chunks = reply.match(/[\s\S]{1,4}/g) ?? [reply];
    for (const chunk of chunks) {
      if (signal?.aborted) return;
      await new Promise((r) => setTimeout(r, 16));
      yield chunk;
    }
  }
}

/* -------------------------------------------------------------------------- */
/* HTTP-streaming providers (HuggingFace Space / FastAPI / Local).            */
/* All expect a JSON-streaming endpoint that returns `{ delta: string }` per  */
/* SSE-like newline-delimited chunk, OR a plain text stream.                  */
/* -------------------------------------------------------------------------- */

async function* streamHttpChat(
  url: string,
  request: ChatRequest,
  signal?: AbortSignal,
): AsyncIterable<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: request.messages.map(({ role, content }) => ({ role, content })),
    }),
    signal,
  });
  if (!res.ok || !res.body) {
    throw new Error(`Chat provider error: ${res.status} ${res.statusText}`);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    // Try newline-delimited JSON first
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed.delta === "string") yield parsed.delta;
        else if (typeof parsed.content === "string") yield parsed.content;
      } catch {
        yield line;
      }
    }
  }
  if (buffer) yield buffer;
}

class HttpProvider implements ChatProvider {
  constructor(public name: string, private url: string) {}
  stream(request: ChatRequest, signal?: AbortSignal) {
    return streamHttpChat(this.url, request, signal);
  }
}

/* -------------------------------------------------------------------------- */
/* Factory                                                                    */
/* -------------------------------------------------------------------------- */

export function createChatProvider(): ChatProvider {
  const provider = (import.meta.env.VITE_CHAT_PROVIDER ?? "mock").toLowerCase();
  switch (provider) {
    case "huggingface": {
      const url = import.meta.env.VITE_HUGGINGFACE_URL;
      if (!url) return new MockProvider();
      return new HttpProvider("huggingface", url);
    }
    case "fastapi": {
      const url = import.meta.env.VITE_FASTAPI_URL;
      if (!url) return new MockProvider();
      return new HttpProvider("fastapi", url);
    }
    case "local": {
      const url = import.meta.env.VITE_LOCAL_API_URL;
      if (!url) return new MockProvider();
      return new HttpProvider("local", url);
    }
    case "mock":
    default:
      return new MockProvider();
  }
}
