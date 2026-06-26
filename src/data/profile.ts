/**
 * Single source of truth for personal information.
 * Edit values here to update name, headlines, and links across the site.
 */
export const profile = {
  name: "Nabh Jain",
  initials: "NJ",
  headline: "AI Engineer",
  roles: [
    "AI Engineer",
    "Agentic AI Developer",
    "Machine Learning Engineer",
  ],
  tagline:
    "Building intelligent systems using Machine Learning, Agentic AI, Retrieval-Augmented Generation, and autonomous workflows.",
  bio: `Nabh is a third-year Computer Engineering student at NMIMS focused on production-grade intelligent systems. He has shipped OCR-based document understanding for an international R&D team, built end-to-end ML pipelines for enterprise data, and architected agentic AI frameworks combining LLM reasoning with retrieval-augmented knowledge.

His current work centers on agentic workflows — multi-step, tool-using LLM systems that reason, retrieve, act, and learn from feedback. He's actively researching how swarm intelligence and federated learning translate to edge AI, and how RAG can power continuously-updating personal knowledge agents.`,
  location: "Indore, India",
  email: "nabhjain8015@gmail.com",
  phone: "+91-7725815536",
  resumeUrl: "/Nabh_Jain_Resume.pdf",
  social: {
    github: "https://github.com/NabhJain",
    linkedin: "https://linkedin.com/in/nabhjain",
    email: "mailto:nabhjain8015@gmail.com",
  },
  githubUsername: "NabhJain",
  education: [
    {
      school: "NMIMS School of Technology Management and Engineering",
      degree: "B.Tech in Computer Engineering",
      grade: "CGPA 3.51 / 4.00",
      period: "Aug 2023 – Present",
      location: "Indore, India",
    },
    {
      school: "Aim Win Academy",
      degree: "Higher Secondary Certificate (CBSE)",
      grade: "76.23%",
      period: "May 2021 – May 2022",
      location: "Indore, India",
    },
    {
      school: "Choithram School",
      degree: "Secondary School Certificate (CBSE)",
      grade: "85.60%",
      period: "May 2019 – May 2020",
      location: "Indore, India",
    },
  ],
  certifications: [
    "Prompt Engineering — IBM Cognitive AI",
    "Machine Learning & AI Workshops — IIT Bombay",
    "Excel Basics for Data Analysis — IBM",
    "Google Cloud Study Jam — Google",
    "Software Engineering Job Simulation — Accenture (Forage)",
    "Data Analytics Job Simulation — Deloitte (Forage)",
  ],
  leadership: [
    "Junior Placement Coordinator, NMIMS Indore (Mar 2025 – Present)",
    "Member — Technical Club Turing",
    "Member — E-Cell Ukriti, NMIMS Indore",
    "Participant — 36-Hour Hackathon, NMIMS Indore (2024, 2025)",
  ],
} as const;

export type Profile = typeof profile;
