/**
 * Categorized skills displayed on the home page.
 * Add or reorder skills here without touching components.
 */
export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core programming languages for systems and data.",
    skills: ["Python", "C++", "Java", "SQL", "R"],
  },
  {
    id: "ai",
    title: "Agentic AI & LLMs",
    description: "Tools and frameworks for building reasoning agents.",
    skills: [
      "LangGraph",
      "CrewAI",
      "Gemini API",
      "HuggingFace",
      "RAG Pipelines",
      "Prompt Engineering",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    description: "End-to-end modeling, training, and evaluation.",
    skills: ["TensorFlow", "Scikit-learn", "XGBoost", "Pandas", "NumPy"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, databases, and serverless infrastructure.",
    skills: ["FastAPI", "Supabase", "PostgreSQL"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern, type-safe interfaces.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Shipping reliable software to production.",
    skills: ["Git", "GitHub", "Docker", "Vercel"],
  },
];
