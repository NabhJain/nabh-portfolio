export type ResearchTopic = {
  id: string;
  title: string;
  summary: string;
  focusAreas: string[];
};

export const researchTopics: ResearchTopic[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI",
    summary:
      "Designing LLM systems that plan, use tools, and self-correct across multi-step workflows.",
    focusAreas: ["Planning loops", "Tool grounding", "Self-reflection"],
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Systems",
    summary:
      "Coordinating specialized agents with explicit state contracts and shared memory.",
    focusAreas: ["LangGraph orchestration", "Role decomposition", "Inter-agent handoff"],
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation",
    summary:
      "Grounding generation in personal and domain-specific knowledge bases that stay current.",
    focusAreas: ["Hybrid retrieval", "Continuous indexing", "Citation quality"],
  },
  {
    id: "ml",
    title: "Machine Learning",
    summary:
      "Production modeling for tabular and unstructured data with calibrated, observable pipelines.",
    focusAreas: ["XGBoost ensembles", "Drift monitoring", "Feature engineering"],
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    summary:
      "From OCR and information extraction to instruction-following and tone matching.",
    focusAreas: ["OCR pipelines", "Few-shot prompting", "Document understanding"],
  },
  {
    id: "edge-ai",
    title: "Edge AI",
    summary:
      "On-device inference with federated and swarm techniques for privacy-preserving coordination.",
    focusAreas: ["Federated learning", "Swarm intelligence", "Quantization"],
  },
  {
    id: "bioinformatics",
    title: "Bioinformatics",
    summary:
      "Applying ML to biological sequence data for species identification and ecological insight.",
    focusAreas: ["eDNA analysis", "Sequence alignment", "Taxonomic clustering"],
  },
];
