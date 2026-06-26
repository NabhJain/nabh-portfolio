export type Project = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  category: string;
  featured: boolean;
  overview: string;
  problem: string;
  features: string[];
  techStack: string[];
  challenges: string[];
  results: string[];
  architecture: string[];
  links: {
    demo?: string;
    github?: string;
    docs?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "agentic-portfolio-assistant",
    title: "AI-Powered Agentic Portfolio Assistant",
    tagline:
      "A goal-driven agent that answers professional inquiries, retrieves from a personal knowledge base, and captures leads — 24/7.",
    period: "Jan 2026",
    category: "Agentic AI · RAG",
    featured: true,
    overview:
      "An always-on agent representing me to recruiters, collaborators, and visitors. Combines LLM reasoning with document-grounded retrieval and a human-in-the-loop feedback channel so the knowledge base stays current.",
    problem:
      "Static portfolios can't answer follow-up questions. Recruiters want context, projects want explanations, and asynchronous conversations get lost. The goal: a personal agent that knows my work better than a static page ever could.",
    features: [
      "Goal-driven agentic framework with tool use and planning",
      "RAG over resume, project markdown, and GitHub READMEs",
      "Lead capture with Pushover notifications for real-time outreach",
      "Streaming responses with typing indicator and markdown rendering",
      "Provider-agnostic adapter — swap LLMs via environment variables",
    ],
    techStack: ["Python", "Gemini API", "RAG", "Gradio", "Pushover API"],
    challenges: [
      "Designing a planning loop that knows when to retrieve vs. when to answer directly",
      "Keeping the knowledge base fresh without redeploying — solved with a feedback channel",
      "Hardening against prompt injection from open-ended user input",
    ],
    results: [
      "Deployed as a 24/7 autonomous chatbot capable of multi-turn professional conversations",
      "Continuous human-in-the-loop feedback updates the knowledge base dynamically",
      "Generalizable framework — same agent template now powers project-specific assistants",
    ],
    architecture: [
      "User message → intent classifier",
      "Planner → tool selection (retrieve / answer / capture lead)",
      "RAG retriever → vector store over personal knowledge base",
      "LLM (Gemini) → grounded response",
      "Feedback channel → Pushover + knowledge base updates",
    ],
    links: { github: "https://github.com/NabhJain" },
  },
  {
    slug: "autonomous-email-intelligence",
    title: "Autonomous Email Intelligence System",
    tagline:
      "A multi-agent system that triages, summarizes, and drafts responses across an inbox using LangGraph orchestration.",
    period: "Nov 2025",
    category: "Multi-Agent · NLP",
    featured: true,
    overview:
      "An agentic email assistant built around specialized roles — Classifier, Researcher, Drafter, Reviewer — orchestrated as a LangGraph state machine. Designed to handle hundreds of messages per day with human-in-the-loop approval before any external send.",
    problem:
      "Inbox overload turns asynchronous work into reactive work. Existing assistants summarize but don't act. The goal: an agent that classifies intent, gathers context, drafts a grounded reply, and waits for one-click approval.",
    features: [
      "Multi-agent graph with explicit handoffs and shared scratchpad state",
      "Per-thread context retrieval over prior conversation and attachments",
      "Tone-matched drafting using few-shot examples from sent mail",
      "Reviewer agent flags risky language, missing attachments, and stale facts",
      "Human approval gate before any outbound action",
    ],
    techStack: ["Python", "LangGraph", "CrewAI", "Gemini API", "FastAPI", "Postgres"],
    challenges: [
      "Preventing agents from looping or fabricating context — solved with strict state contracts",
      "Cost control across long threads — bounded context windows + summary memory",
      "Guarding against silent failure modes by surfacing every agent decision",
    ],
    results: [
      "Triages 100+ messages per session with sub-second classification",
      "Drafts grounded reply candidates that reduce response composition time by ~60% in pilot use",
      "Audit log of every agent step for explainability",
    ],
    architecture: [
      "Inbox poller → Classifier agent (intent + urgency)",
      "Researcher agent → thread history + RAG over knowledge base",
      "Drafter agent → tone-matched candidate reply",
      "Reviewer agent → safety + completeness checks",
      "Human approval → outbound send",
    ],
    links: { github: "https://github.com/NabhJain" },
  },
  {
    slug: "edna-biodiversity-pipeline",
    title: "AI-Driven eDNA Biodiversity Pipeline",
    tagline:
      "An automated bioinformatics pipeline that identifies species from environmental DNA and visualizes biodiversity in real time.",
    period: "Oct 2025",
    category: "Machine Learning · Bioinformatics",
    featured: true,
    overview:
      "A research-grade pipeline that ingests environmental DNA sequencing data, runs alignment with BLAST+, clusters unknown reads, and surfaces species-level insights through an interactive Streamlit dashboard.",
    problem:
      "Traditional eDNA workflows are fragmented across CLIs and spreadsheets. Field researchers needed a single tool that handles ingestion, alignment, clustering of novel taxa, and reporting without manual stitching.",
    features: [
      "Automated BLAST+ alignment against curated reference databases",
      "XGBoost classifier for read-level taxonomic prediction",
      "Unsupervised clustering to surface novel or rare taxa",
      "Real-time biodiversity metrics: Shannon index, richness, evenness",
      "Streamlit dashboard for sampling-site comparisons",
    ],
    techStack: ["Python", "Streamlit", "XGBoost", "BLAST+", "scikit-learn", "Pandas"],
    challenges: [
      "Handling sequencing files at scale without blowing memory",
      "Confidence calibration for low-coverage reads",
      "Designing a UI that researchers — not engineers — find usable",
    ],
    results: [
      "Accelerated ecological assessments versus manual workflows",
      "Identified both known and rare taxa in test environmental samples",
      "Dashboard adopted as the reference UI for downstream lab analysis",
    ],
    architecture: [
      "Raw eDNA reads → quality filtering",
      "BLAST+ alignment → reference taxonomy",
      "XGBoost classifier → confidence-scored species labels",
      "Unsupervised clustering → novel taxa discovery",
      "Streamlit dashboard → biodiversity metrics + exports",
    ],
    links: { github: "https://github.com/NabhJain" },
  },
  {
    slug: "neuroroute-swarm-edge",
    title: "NeuroRoute — Swarm Intelligence for Edge AI",
    tagline:
      "Federated learning + swarm intelligence for autonomous fleet routing, optimized for eco-driving on edge devices.",
    period: "Aug 2025",
    category: "Edge AI · Federated Learning",
    featured: true,
    overview:
      "A research framework that pairs swarm-intelligence routing with federated learning across simulated vehicle fleets. Each vehicle trains locally; coordinated weight averaging happens without raw trajectory data ever leaving the device.",
    problem:
      "Fleet routing models centralize data — bad for privacy, latency, and bandwidth. Edge-first routing needed to coordinate vehicle behavior without lifting raw telemetry off the device.",
    features: [
      "Federated training across simulated vehicle clients",
      "Swarm-based vehicle-to-vehicle synchronization for route planning",
      "Reward shaping for eco-driving score (emissions + battery)",
      "Edge-inference-friendly model footprint",
      "Scenario generator producing 1,000+ driving conditions",
    ],
    techStack: ["Python", "Federated Learning", "Edge AI", "NumPy", "PyTorch"],
    challenges: [
      "Stabilizing federated rounds despite client drift across heterogeneous scenarios",
      "Balancing swarm-level coordination with single-vehicle latency budgets",
      "Designing metrics that capture eco-driving without gaming the reward",
    ],
    results: [
      "Trained across 1,000+ simulated driving scenarios",
      "Measurably reduced simulated carbon emissions and battery consumption",
      "Established baseline for future on-vehicle deployment experiments",
    ],
    architecture: [
      "Scenario generator → simulated fleet of vehicle clients",
      "Local model training → eco-driving reward signal",
      "Federated averaging → global routing policy",
      "Swarm coordinator → vehicle-to-vehicle handoffs",
      "Evaluator → emissions + battery + travel-time metrics",
    ],
    links: { github: "https://github.com/NabhJain" },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
