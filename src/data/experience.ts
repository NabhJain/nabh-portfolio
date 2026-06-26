export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    role: "AI/ML Research Intern",
    company: "Ecoreceipt Ltd.",
    location: "United Kingdom (Remote)",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    description:
      "Joined an international R&D team to push OCR-driven document understanding from research notebooks into a production receipt-intelligence platform.",
    highlights: [
      "Engineered an OCR-based document understanding system that extracts structured data from millions of digital receipts.",
      "Ran unsupervised clustering across large transaction datasets to surface spending patterns and consumer anomalies.",
      "Hardened the preprocessing pipeline for noisy unstructured text, improving extraction reliability by 20%.",
      "Integrated experimental AI models into core production workflows alongside the international engineering team.",
    ],
    technologies: ["Python", "OCR", "Unsupervised Learning", "Pandas", "scikit-learn"],
  },
  {
    role: "AI & Machine Learning Intern",
    company: "Hiteshi Infotech Pvt. Ltd.",
    location: "Indore, India",
    period: "May 2024 – Jun 2024",
    type: "Internship",
    description:
      "Owned end-to-end ML workflows for enterprise data — from raw extraction to deployed regression and classification models.",
    highlights: [
      "Trained and deployed regression and classification models against real-world enterprise datasets.",
      "Built end-to-end pipelines covering cleaning, feature selection, training, and evaluation.",
      "Automated repetitive data extraction with Python, reducing manual processing time by 40%.",
    ],
    technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "SQL"],
  },
];
