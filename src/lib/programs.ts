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
      "Go from Python beginner to AI Engineer — build real ML models, RAG apps, and AI agents with a project-driven curriculum.",
    category: "AI & ML",
    level: "Beginner",
    duration: "16 weeks · ~10 hrs/week",
    featured: true,
    audience: "Students",
    overview:
      "A hands-on AI & Machine Learning program built for students. Starting from Python fundamentals, you'll progress through Machine Learning, Deep Learning, Generative AI, RAG systems, and AI Agents — building a portfolio of 8+ real projects and a deployed capstone product by the end.",
    whoItsFor: [
      "College students in engineering, science, or maths streams",
      "First-time coders exploring an AI-focused career path",
      "Learners who want a strong, project-driven foundation",
      "Students preparing for internships and campus placements",
    ],
    skills: [
      "Python Programming",
      "NumPy, Pandas & Data Visualization",
      "Statistics & Math for ML",
      "Machine Learning (supervised & unsupervised)",
      "Deep Learning & Neural Networks",
      "Transformers & Hugging Face",
      "LLMs & Prompt Engineering",
      "RAG & Vector Databases",
      "AI Agents with LangChain / LangGraph",
      "FastAPI & Streamlit deployment",
    ],
    curriculum: [
      {
        module: "Phase 0 · Python & Data Foundations (Weeks 1–3)",
        topics: [
          "Python syntax, data types & control flow",
          "Functions, modules & OOP basics",
          "NumPy & Pandas for data handling",
          "Data cleaning & visualization (Matplotlib, Seaborn)",
          "Git & GitHub workflow",
        ],
      },
      {
        module: "Phase 1 · Math & Machine Learning (Weeks 4–6)",
        topics: [
          "Probability, statistics & linear algebra intuition",
          "Supervised & Unsupervised learning",
          "Regression, classification & clustering",
          "Model evaluation & feature engineering",
          "Hands-on with scikit-learn",
        ],
      },
      {
        module: "Phase 2 · Deep Learning & Transformers (Weeks 7–9)",
        topics: [
          "Neural networks & backpropagation",
          "PyTorch basics",
          "Computer vision starter",
          "Transformers explained",
          "BERT vs GPT & Hugging Face pipelines",
        ],
      },
      {
        module: "Phase 3 · Generative AI & Prompt Engineering (Weeks 10–11)",
        topics: [
          "How LLMs work end-to-end",
          "OpenAI & Anthropic APIs",
          "Prompt engineering & few-shot prompting",
          "Chain of Thought reasoning",
          "Structured outputs, JSON mode & function calling",
          "Local models with Ollama & Pydantic",
        ],
      },
      {
        module: "Phase 4 · RAG — Retrieval Augmented Generation (Weeks 12–13)",
        topics: [
          "Embeddings & vector databases",
          "ChromaDB & Pinecone",
          "Semantic search, chunking & hybrid search",
          "Building RAG APIs with FastAPI",
        ],
      },
      {
        module: "Phase 5 · AI Agents (Weeks 14–15)",
        topics: [
          "Custom tools & function calling",
          "ReAct agents",
          "LangChain & LangGraph basics",
          "Multi-agent patterns with CrewAI",
        ],
      },
      {
        module: "Phase 6 · Deployment & Career Sprint (Week 16)",
        topics: [
          "FastAPI & Streamlit deployment",
          "Docker basics",
          "Portfolio, resume & LinkedIn for AI roles",
          "Mock interviews & internship prep",
          "Capstone: deployed AI product + demo video",
        ],
      },
    ],
    projects: [
      "Student performance predictor (ML)",
      "Data storytelling dashboard",
      "Image classifier with PyTorch",
      "Sentiment Analysis Classifier using Hugging Face",
      "CLI Chatbot with OpenAI & Anthropic",
      "Resume Analyzer with structured outputs",
      "Semantic PDF Search Engine (RAG)",
      "Research Agent with custom tools",
      "Capstone: Deployed AI Agent product",
    ],
    tools: [
      "Python",
      "Jupyter",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "Hugging Face",
      "OpenAI",
      "Anthropic Claude",
      "Ollama",
      "LangChain",
      "LangGraph",
      "ChromaDB",
      "Pinecone",
      "FastAPI",
      "Streamlit",
      "Docker",
      "GitHub",
    ],
    outcomes: [
      "AI/ML Trainee",
      "Junior Data Analyst",
      "AI Intern",
      "GenAI Developer Intern",
      "Research Assistant",
    ],
    careerGuidance:
      "Portfolio reviews, resume workshops, LinkedIn optimization, mock interviews, and internship guidance tailored for students entering the AI job market.",
    certificate:
      "Earn a GeekX United Certificate of Completion — shareable on LinkedIn and your student portfolio — after finishing all modules, projects, and the deployed capstone.",
    faq: [
      { q: "Do I need prior coding experience?", a: "No. This program starts from zero Python and layers up carefully at a student-friendly pace." },
      { q: "How much time should I commit each week?", a: "Plan for roughly 10 hours a week including live sessions and projects." },
      { q: "Will this help with placements?", a: "Yes — you finish with a strong portfolio of ML, GenAI, RAG, and agent projects plus interview coaching." },
    ],
  },
  {
    slug: "ai-ml-for-professionals",
    title: "AI & Machine Learning for Working Professionals",
    tagline:
      "From Python developer to GenAI Agent Engineer — build LLM apps, RAG systems, and multi-agent products in an intensive career sprint.",
    category: "AI & ML",
    level: "Intermediate",
    duration: "12 weeks · ~12 hrs/week",
    featured: true,
    audience: "Working Professionals",
    overview:
      "A career-focused, project-based program that takes professionals from ML fundamentals to production-ready GenAI Agent Engineers. Build LLM applications, RAG systems, and multi-agent products using the same stack modern AI teams use — OpenAI, Anthropic, LangChain, LangGraph, CrewAI, FastAPI, and more.",
    whoItsFor: [
      "Software engineers moving into AI/ML and GenAI roles",
      "Data analysts levelling up into ML and LLM development",
      "Backend & full-stack engineers building AI features",
      "Managers, consultants and non-tech professionals leading AI initiatives",
    ],
    skills: [
      "Applied Machine Learning",
      "Deep Learning & Transformers",
      "LLM Application Development",
      "Prompt Engineering & Function Calling",
      "Structured Outputs with Pydantic",
      "RAG & Vector Search",
      "AI Agents & Multi-Agent Systems (LangChain / LangGraph / CrewAI)",
      "Memory & Observability (LangSmith, LangFuse)",
      "FastAPI & Docker Deployment",
      "AI Product Thinking & MLOps Basics",
    ],
    curriculum: [
      {
        module: "Phase 0 · ML & Deep Learning Foundations (Weeks 1–2)",
        topics: [
          "Applied Machine Learning refresh",
          "Supervised & Unsupervised learning",
          "Neural networks & backpropagation",
          "Transformers, BERT vs GPT",
          "Hugging Face pipelines",
          "Project: Sentiment Analysis Classifier",
        ],
      },
      {
        module: "Phase 1 · GenAI & Prompt Engineering (Weeks 3–4)",
        topics: [
          "How LLMs work",
          "OpenAI & Anthropic APIs",
          "Prompt engineering, few-shot & Chain of Thought",
          "JSON outputs & function calling",
          "Pydantic for structured outputs",
          "Local models with Ollama",
          "Projects: CLI Chatbot, Resume Analyzer",
        ],
      },
      {
        module: "Phase 2 · RAG — Retrieval Augmented Generation (Weeks 5–6)",
        topics: [
          "Embeddings & vector databases",
          "ChromaDB, Pinecone & Qdrant",
          "Semantic search, chunking & hybrid search",
          "FastAPI for RAG APIs",
          "Projects: Semantic PDF Search, Company Knowledge Base Chatbot",
        ],
      },
      {
        module: "Phase 3 · AI Agents & Multi-Agent Systems (Weeks 7–9)",
        topics: [
          "Function calling & custom tools",
          "ReAct agents",
          "LangChain & LangGraph",
          "CrewAI & multi-agent systems",
          "Supervisor + Worker agent patterns",
          "Projects: Research Agent, Job Application Assistant, Planner + Coder + Critic",
        ],
      },
      {
        module: "Phase 4 · Memory & Observability (Week 10)",
        topics: [
          "Short-term & long-term memory",
          "Redis & PostgreSQL for agent state",
          "LangSmith & LangFuse for tracing",
          "Prompt caching & cost control",
        ],
      },
      {
        module: "Phase 5 · Deployment & Career Sprint (Weeks 11–12)",
        topics: [
          "FastAPI & Streamlit",
          "Docker & containerized deployment",
          "MCP (Model Context Protocol)",
          "Slack & GitHub integrations",
          "Resume review, LinkedIn optimization",
          "Mock interviews, portfolio & demo video",
        ],
      },
    ],
    industryUseCases: [
      "Automating repetitive knowledge work with agents",
      "Building internal AI copilots and assistants",
      "Enterprise document intelligence with RAG",
      "AI-driven analytics and reporting",
      "Customer support automation",
      "Multi-agent research & operations workflows",
    ],
    liveSessions:
      "Weekend live practical sessions with industry mentors — recorded, hands-on, and focused on real workplace scenarios.",
    projects: [
      "Sentiment Analysis Classifier (Hugging Face)",
      "CLI Chatbot with OpenAI & Anthropic",
      "Resume Analyzer with structured outputs",
      "Semantic PDF Search Engine",
      "Company Knowledge Base RAG Chatbot",
      "Research Agent with tools",
      "Job Application Assistant",
      "Planner + Coder + Critic Multi-Agent System",
      "Capstone: Deployed GenAI Agent product",
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
      "GitHub",
    ],
    outcomes: [
      "AI Engineer",
      "LLM Application Developer",
      "GenAI Platform Engineer",
      "AI Automation Engineer",
      "AI Product Manager",
      "AI Solutions Lead",
    ],
    careerTransition:
      "One-on-one career strategy, resume rewrite for AI roles, LinkedIn optimization, mock technical interviews, portfolio and demo video coaching, and referral guidance to help you transition confidently into GenAI roles.",
    certificate:
      "Earn a GeekX United Certificate of Completion — backed by a full applied AI portfolio including a deployed capstone agent product.",
    faq: [
      { q: "Is this suitable if I'm not from an ML background?", a: "Yes. We ramp fundamentals fast and focus on applied outcomes for working professionals with basic coding experience." },
      { q: "How is it scheduled?", a: "Weekend live sessions plus flexible self-paced material — roughly 12 hours a week, designed around a working week." },
      { q: "Is it project-based?", a: "Yes — every phase ends with hands-on projects, culminating in a deployed capstone GenAI agent." },
      { q: "Does this help with career transition?", a: "Absolutely — dedicated career transition coaching, portfolio review, and mock interviews are part of the program." },
    ],
  },
];


export const CATEGORIES: Category[] = ["AI & ML"];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
