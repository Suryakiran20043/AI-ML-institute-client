// Static program catalog for Phase 1. TODO(client): replace with Supabase-backed data in Phase 2.
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Category = "AI/ML" | "GenAI" | "Cloud" | "Development" | "Career Growth";

export type Program = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  level: Level;
  duration: string;
  featured: boolean;
  overview: string;
  skills: string[];
  curriculum: { module: string; topics: string[] }[];
  projects: string[];
  tools: string[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "generative-ai",
    title: "Generative AI Mastery",
    tagline: "Build production-grade LLM, RAG, and Agentic applications.",
    category: "GenAI",
    level: "Intermediate",
    duration: "12 weeks",
    featured: true,
    overview:
      "A hands-on program that takes you from prompt engineering to shipping enterprise RAG and agent systems using modern LLM stacks.",
    skills: ["Prompt Engineering", "RAG Systems", "Vector Databases", "LLM Fine-tuning", "AI Agents", "LLMOps"],
    curriculum: [
      { module: "Foundations of LLMs", topics: ["Transformers", "Tokenization", "Context windows"] },
      { module: "Prompt Engineering", topics: ["Few-shot", "Chain-of-thought", "Structured outputs"] },
      { module: "Retrieval Augmented Generation", topics: ["Embeddings", "Vector search", "Chunking strategies"] },
      { module: "AI Agents", topics: ["Tool calling", "Multi-agent systems", "Evaluation"] },
      { module: "Deploying LLM Apps", topics: ["Streaming", "Guardrails", "Cost & latency"] },
    ],
    projects: ["Enterprise document Q&A", "Autonomous research agent", "Multi-modal assistant"],
    tools: ["OpenAI", "LangChain", "LlamaIndex", "Pinecone", "Hugging Face", "Python"],
    outcomes: ["AI Engineer", "GenAI Developer", "LLM Application Architect"],
    faq: [
      { q: "Do I need prior AI experience?", a: "Basic Python and comfort with APIs is enough; we ramp fundamentals fast." },
      { q: "Is this hands-on?", a: "Every module ships a working project — no passive lectures." },
    ],
  },
  {
    slug: "python-for-ai",
    title: "Python for AI",
    tagline: "The clarity-first Python foundation for AI careers.",
    category: "AI/ML",
    level: "Beginner",
    duration: "8 weeks",
    featured: true,
    overview: "Master Python with a curriculum designed specifically for AI, data, and ML workloads.",
    skills: ["Python", "NumPy", "Pandas", "Data Wrangling", "APIs", "Notebooks"],
    curriculum: [
      { module: "Python Essentials", topics: ["Syntax", "Data types", "Control flow"] },
      { module: "Data Handling", topics: ["Pandas", "NumPy", "Cleaning"] },
      { module: "Working with APIs", topics: ["Requests", "JSON", "Authentication"] },
      { module: "Python for ML", topics: ["scikit-learn intro", "Notebooks", "Visualization"] },
    ],
    projects: ["Data cleaning pipeline", "Weather API dashboard", "First ML model"],
    tools: ["Python", "Jupyter", "Pandas", "NumPy", "Matplotlib"],
    outcomes: ["AI/ML Trainee", "Data Analyst", "Automation Developer"],
    faq: [{ q: "I've never coded before.", a: "Perfect. This program starts from zero with clarity-first pacing." }],
  },
  {
    slug: "machine-learning",
    title: "Machine Learning Engineering",
    tagline: "From classical ML to production model deployment.",
    category: "AI/ML",
    level: "Intermediate",
    duration: "14 weeks",
    featured: true,
    overview: "Practical ML — algorithms, feature engineering, evaluation, and deployment on real datasets.",
    skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "MLOps", "Feature Engineering"],
    curriculum: [
      { module: "ML Foundations", topics: ["Regression", "Classification", "Bias/Variance"] },
      { module: "Advanced Models", topics: ["Ensembles", "Boosting", "Neural nets"] },
      { module: "Feature Engineering", topics: ["Encoding", "Scaling", "Selection"] },
      { module: "Deployment", topics: ["Model APIs", "Monitoring", "A/B testing"] },
    ],
    projects: ["Credit risk classifier", "Churn prediction", "Deployed ML API"],
    tools: ["scikit-learn", "XGBoost", "MLflow", "Docker", "FastAPI"],
    outcomes: ["ML Engineer", "Data Scientist", "MLOps Engineer"],
    faq: [{ q: "Math prerequisites?", a: "We teach intuition-first; you don't need a math degree." }],
  },
  {
    slug: "cloud-mlops",
    title: "Cloud & MLOps",
    tagline: "Ship AI to production on AWS, Azure, and GCP.",
    category: "Cloud",
    level: "Advanced",
    duration: "10 weeks",
    featured: true,
    overview: "Design, deploy, and monitor AI workloads on the major cloud platforms with modern MLOps tooling.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD for ML", "Model Serving", "Observability"],
    curriculum: [
      { module: "Cloud Fundamentals", topics: ["Compute", "Storage", "Networking"] },
      { module: "Containers", topics: ["Docker", "Kubernetes", "Helm"] },
      { module: "MLOps Pipelines", topics: ["CI/CD", "Model registry", "Automation"] },
      { module: "Monitoring", topics: ["Drift detection", "Logging", "Alerts"] },
    ],
    projects: ["End-to-end MLOps pipeline", "Auto-scaling model API", "Drift monitoring dashboard"],
    tools: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "MLflow", "Terraform"],
    outcomes: ["MLOps Engineer", "Cloud AI Architect", "DevOps for AI"],
    faq: [{ q: "Which cloud do you focus on?", a: "AWS-first with concepts transferable to Azure and GCP." }],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    tagline: "Modern web development with an AI-native mindset.",
    category: "Development",
    level: "Beginner",
    duration: "16 weeks",
    featured: true,
    overview: "Build modern web applications end-to-end, including AI features baked into the product.",
    skills: ["React", "TypeScript", "Node.js", "Databases", "APIs", "AI Integration"],
    curriculum: [
      { module: "Frontend Foundations", topics: ["HTML/CSS", "JavaScript", "React"] },
      { module: "Backend & APIs", topics: ["Node.js", "REST", "Auth"] },
      { module: "Databases", topics: ["Postgres", "Modeling", "ORMs"] },
      { module: "AI-Powered Features", topics: ["LLM APIs", "Streaming UI", "Embeddings"] },
    ],
    projects: ["Task manager with AI assistant", "Full-stack marketplace", "Realtime chat app"],
    tools: ["React", "TypeScript", "Node.js", "Postgres", "Tailwind"],
    outcomes: ["Full-Stack Developer", "AI Product Engineer"],
    faq: [{ q: "Is this beginner-friendly?", a: "Yes — we start from HTML and layer up carefully." }],
  },
  {
    slug: "ai-career-accelerator",
    title: "AI Career Accelerator",
    tagline: "Portfolio, resume, interviews — get hired in AI.",
    category: "Career Growth",
    level: "Intermediate",
    duration: "6 weeks",
    featured: true,
    overview: "A career-focused sprint to sharpen your portfolio, resume, and interview skills for AI roles.",
    skills: ["Portfolio Building", "Resume Writing", "System Design", "Behavioral Interviews", "Mock Interviews"],
    curriculum: [
      { module: "Portfolio", topics: ["Project selection", "Case studies", "GitHub polish"] },
      { module: "Resume & LinkedIn", topics: ["ATS optimization", "Storytelling", "Positioning"] },
      { module: "Technical Interviews", topics: ["AI/ML questions", "Coding practice", "System design"] },
      { module: "Behavioral & Offer", topics: ["STAR framework", "Negotiation"] },
    ],
    projects: ["Polished portfolio site", "Refined resume", "Mock interview recording"],
    tools: ["LinkedIn", "GitHub", "Notion"],
    outcomes: ["Job-ready AI professional", "Career switcher into AI"],
    faq: [{ q: "Do you help with placements?", a: "We coach — offers depend on your work; we set you up to win." }],
  },
];

export const CATEGORIES: Category[] = ["AI/ML", "GenAI", "Cloud", "Development", "Career Growth"];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
