// Static program catalog for Phase 1. TODO(client): replace with Supabase-backed data in Phase 2.
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Category = "AI & ML";

export type Program = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  level: Level;
  duration: string;
  featured: boolean;
  overview: string;
  audience: "Students" | "Working Professionals";
  whoItsFor: string[];
  skills: string[];
  curriculum: { module: string; topics: string[] }[];
  projects: string[];
  tools: string[];
  outcomes: string[];
  // Program-specific highlight sections
  industryUseCases?: string[];
  liveSessions?: string;
  careerGuidance?: string;
  careerTransition?: string;
  certificate: string;
  faq: { q: string; a: string }[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "ai-ml-for-students",
    title: "AI & Machine Learning for Students",
    tagline:
      "Build strong foundations in AI, ML, Python, and Data Science through hands-on, project-based learning.",
    category: "AI & ML",
    level: "Beginner",
    duration: "16 weeks",
    featured: true,
    audience: "Students",
    overview:
      "A practical AI & ML program designed for students who want to build strong foundations in Artificial Intelligence, Machine Learning, Python, Data Science, and modern AI tools through hands-on projects and real-world applications.",
    whoItsFor: [
      "College students in engineering, science, or maths streams",
      "First-time coders exploring an AI-focused career path",
      "Learners who want a strong, project-driven foundation",
      "Students preparing for internships and campus placements",
    ],
    skills: [
      "Python Programming",
      "Data Structures",
      "NumPy & Pandas",
      "Data Visualization",
      "Statistics for ML",
      "Machine Learning",
      "Deep Learning Basics",
      "Modern AI Tools",
    ],
    curriculum: [
      { module: "Python Foundations", topics: ["Syntax & data types", "Control flow", "Functions & modules"] },
      { module: "Data Handling", topics: ["NumPy", "Pandas", "Data cleaning"] },
      { module: "Math & Statistics for ML", topics: ["Probability", "Linear algebra intuition", "Distributions"] },
      { module: "Machine Learning", topics: ["Regression", "Classification", "Model evaluation"] },
      { module: "Deep Learning Basics", topics: ["Neural networks", "PyTorch intro", "Computer vision starter"] },
      { module: "Modern AI Tools", topics: ["LLM APIs", "Prompting basics", "AI-assisted projects"] },
    ],
    projects: [
      "Student performance predictor",
      "Image classifier for real-world datasets",
      "Data storytelling dashboard",
      "AI-powered mini-app using LLMs",
    ],
    tools: ["Python", "Jupyter", "Pandas", "scikit-learn", "PyTorch", "OpenAI API", "GitHub"],
    outcomes: [
      "AI/ML Trainee",
      "Junior Data Analyst",
      "Research Assistant",
      "AI Intern",
    ],
    careerGuidance:
      "Portfolio reviews, resume workshops, mock interviews, and internship guidance tailored for students entering the AI job market.",
    certificate:
      "Earn a GeekX United Certificate of Completion — shareable on LinkedIn and your student portfolio — after finishing all modules and capstone projects.",
    faq: [
      { q: "Do I need prior coding experience?", a: "No. This program starts from zero and layers up carefully at a student-friendly pace." },
      { q: "How much time should I commit each week?", a: "Plan for roughly 8–10 hours a week including live sessions and projects." },
      { q: "Will this help with placements?", a: "Yes — we coach on portfolio, resume, and interviews so you're job-ready by the end." },
    ],
  },
  {
    slug: "ai-ml-for-professionals",
    title: "AI & Machine Learning for Working Professionals",
    tagline:
      "Integrate AI into your work, automate workflows, and transition into AI-driven roles.",
    category: "AI & ML",
    level: "Intermediate",
    duration: "12 weeks",
    featured: true,
    audience: "Working Professionals",
    overview:
      "A career-focused AI upskilling program designed for professionals who want to integrate AI into their work, improve productivity, automate workflows, and transition into AI-driven roles.",
    whoItsFor: [
      "Software engineers moving into AI/ML roles",
      "Data analysts levelling up into ML and GenAI",
      "Managers and consultants leading AI initiatives",
      "Non-tech professionals adopting AI in their function",
    ],
    skills: [
      "Applied Machine Learning",
      "LLMs & GenAI",
      "Prompt Engineering",
      "RAG & AI Agents",
      "Workflow Automation",
      "AI Product Thinking",
      "MLOps Basics",
    ],
    curriculum: [
      { module: "AI at Work", topics: ["Landscape", "Tooling", "Use-case discovery"] },
      { module: "Applied ML", topics: ["Supervised learning", "Evaluation", "Real datasets"] },
      { module: "GenAI & LLMs", topics: ["Prompting", "Function calling", "Structured outputs"] },
      { module: "RAG & Agents", topics: ["Vector search", "Retrieval pipelines", "Agentic workflows"] },
      { module: "Automation", topics: ["APIs", "Integrations", "AI-driven ops"] },
      { module: "Ship & Scale", topics: ["Deployment basics", "Monitoring", "Cost & latency"] },
    ],
    industryUseCases: [
      "Automating repetitive knowledge work",
      "Building internal AI copilots and assistants",
      "Document intelligence and enterprise RAG",
      "AI-driven analytics and reporting",
      "Customer support automation",
    ],
    liveSessions:
      "Weekend live practical sessions with industry mentors — recorded, hands-on, and focused on real workplace scenarios.",
    projects: [
      "Enterprise document Q&A assistant",
      "Workflow automation with LLMs",
      "Internal AI copilot for your function",
      "Deployed AI micro-service",
    ],
    tools: [
      "Python",
      "LangChain",
      "OpenAI",
      "Hugging Face",
      "Vector DBs",
      "FastAPI",
      "Docker",
      "GitHub",
    ],
    outcomes: [
      "AI Engineer",
      "ML Engineer",
      "GenAI Developer",
      "AI Product Manager",
      "AI Solutions Lead",
    ],
    careerTransition:
      "One-on-one career strategy, LinkedIn optimization, resume rewrite for AI roles, mock technical interviews, and referral guidance to help you transition confidently.",
    certificate:
      "Earn a GeekX United Certificate of Completion — recognizing your applied AI portfolio and shareable across professional networks.",
    faq: [
      { q: "Is this suitable if I'm not from an ML background?", a: "Yes. We ramp fundamentals fast and focus on applied outcomes for working professionals." },
      { q: "How is it scheduled?", a: "Weekend live sessions plus flexible self-paced material — designed around a working week." },
      { q: "Does this help with career transition?", a: "Absolutely — dedicated career transition coaching is part of the program." },
    ],
  },
  {
    slug: "zero-to-genai-agent-engineer",
    title: "Zero to GenAI Agent Engineer",
    tagline:
      "Go from Python developer to GenAI Agent Engineer — build LLM apps, RAG systems, and multi-agent products in 11 weeks.",
    category: "AI & ML",
    level: "Intermediate",
    duration: "11 weeks · ~12 hrs/week",
    featured: true,
    audience: "Working Professionals",
    overview:
      "An 11-week, project-based program that takes Python developers from ML fundamentals to production-ready GenAI Agent Engineers. You'll build LLM apps, RAG systems, and multi-agent products using the same stack modern AI teams use — OpenAI, Anthropic, LangChain, LangGraph, CrewAI, FastAPI, and more.",
    whoItsFor: [
      "Python developers moving into AI/GenAI engineering",
      "Backend and full-stack engineers building LLM features",
      "ML enthusiasts wanting hands-on GenAI and agent skills",
      "Professionals targeting AI Engineer / LLM Developer roles",
    ],
    skills: [
      "LLM Application Development",
      "Prompt Engineering",
      "Function Calling & Structured Outputs",
      "RAG & Vector Search",
      "AI Agents & Multi-Agent Systems",
      "LangChain / LangGraph / CrewAI",
      "Memory & Observability",
      "Deployment with FastAPI & Docker",
    ],
    curriculum: [
      {
        module: "Phase 0 · ML & Deep Learning Foundations (Week 1–1.5)",
        topics: [
          "Machine Learning basics",
          "Supervised & Unsupervised Learning",
          "Neural Networks",
          "Transformers",
          "BERT vs GPT",
          "Hugging Face Pipelines",
          "Project: Sentiment Analysis Classifier",
        ],
      },
      {
        module: "Phase 1 · GenAI & Prompt Engineering (Weeks 1.5–3)",
        topics: [
          "How LLMs work",
          "OpenAI & Anthropic APIs",
          "Prompt Engineering & Few-shot prompting",
          "Chain of Thought",
          "JSON Outputs & Function Calling",
          "Pydantic & Ollama",
          "Projects: CLI Chatbot, Resume Analyzer",
        ],
      },
      {
        module: "Phase 2 · RAG — Retrieval Augmented Generation (Weeks 4–5)",
        topics: [
          "Embeddings & Vector Databases",
          "ChromaDB & Pinecone",
          "Semantic Search & Chunking",
          "Hybrid Search",
          "FastAPI for RAG APIs",
          "Projects: Semantic PDF Search, Company Knowledge Base Chatbot",
        ],
      },
      {
        module: "Phase 3 · AI Agents & Multi-Agent Systems (Weeks 6–8)",
        topics: [
          "Function Calling & Custom Tools",
          "ReAct Agents",
          "LangChain & LangGraph",
          "CrewAI & Multi-Agent Systems",
          "Supervisor + Worker Agent patterns",
          "Projects: Research Agent, Job Application Assistant, Planner + Coder + Critic",
        ],
      },
      {
        module: "Phase 4 · Memory & Observability (Week 9)",
        topics: [
          "Short-term & Long-term Memory",
          "Redis & PostgreSQL for agent state",
          "LangSmith & LangFuse",
          "Prompt Caching",
        ],
      },
      {
        module: "Phase 5 · Deployment & Career Sprint (Weeks 10–11)",
        topics: [
          "FastAPI & Streamlit",
          "Docker",
          "MCP (Model Context Protocol)",
          "Slack & GitHub Integrations",
          "Resume Review, LinkedIn Optimization",
          "Mock Interviews, Portfolio, Demo Video",
        ],
      },
    ],
    projects: [
      "Sentiment Analysis Classifier (Hugging Face)",
      "CLI Chatbot with OpenAI & Anthropic",
      "Resume Analyzer with structured outputs",
      "Semantic PDF Search Engine",
      "Company Knowledge Base RAG Chatbot",
      "Research Agent with tools",
      "Job Application Assistant",
      "Planner + Coder + Critic Multi-Agent System",
      "Final Capstone: deployed GenAI Agent product",
    ],
    tools: [
      "Python",
      "OpenAI GPT-4o",
      "Anthropic Claude",
      "Hugging Face",
      "Ollama",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Pydantic",
      "ChromaDB",
      "Pinecone",
      "Qdrant",
      "sentence-transformers",
      "FastAPI",
      "Streamlit",
      "Docker",
      "LangSmith",
      "LangFuse",
      "MCP",
    ],
    outcomes: [
      "AI Engineer",
      "LLM Application Developer",
      "GenAI Platform Engineer",
      "AI Automation Engineer",
      "Prompt / AI Product Engineer",
    ],
    careerTransition:
      "Resume review, LinkedIn optimization, mock interviews, portfolio and demo video coaching, and GitHub project polish to help Python developers transition confidently into GenAI roles.",
    certificate:
      "Earn a GeekX United Certificate of Completion — backed by a full GenAI portfolio including a deployed capstone agent product.",
    faq: [
      { q: "Who is this program for?", a: "Python developers or engineers with basic coding experience who want to become GenAI Agent Engineers." },
      { q: "How much time do I need each week?", a: "Around 12 hours per week across live sessions, projects, and self-paced work over 11 weeks." },
      { q: "Is it project-based?", a: "Yes — every phase ends with hands-on projects, culminating in a deployed capstone GenAI agent." },
    ],
  },
];


export const CATEGORIES: Category[] = ["AI & ML"];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
