// Single source of truth for projects.
// Used by the Projects section (frontend/components/sections/Projects.jsx)
// and by the AI chatbot prompt (api/chat.js). Edit projects here only.
//
// tier controls where a project appears:
//   "featured" — full case study at the top of Work (keep to two or three)
//   "more"     — the project index
//   "earlier"  — the compact "Earlier work" list
//
// scenes (featured only) drive the scroll story in the Work section: each one
// is a particle shape plus the few words shown over it. Captions must describe
// something real (a test case, an actual output), never an illustration.

export const stations = [
  {
    id: "dreamsignal", title: "DreamSignal",
    tier: "more",
    description: "An immersive, analog-themed classified dossier system for recording, analyzing, and archiving dreams.",
    tech: ["React", "Node.js", "Python", "FastAPI", "MongoDB", "Whisper", "Gemini API"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/DreamSignal", demo: "https://dream-signal.vercel.app/",
    features: ["Async AI Pipeline", "Semantic RAG Search", "SSE Real-time Streaming"],
    challenges: "Distributed microservices architecture linking analog UI to complex machine learning pipelines.",
    image: "/projects/dreamsignal.png",
    video: "/projects/dreamsignal.mp4"
  },
  {
    id: "grief-companion", title: "Grief Companion",
    tier: "more",
    description: "An AI writing tool that uses retrieved example messages to help people write difficult messages, such as condolences and apologies.",
    tech: ["React", "Node.js", "Python", "MongoDB", "Groq AI", "RAG"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/grief-companion", demo: "https://grief-companion-two.vercel.app/",
    features: ["Real-time SSE streaming", "A/B tone comparison", "TF-IDF retrieval", "Draft history"],
    challenges: "Generic LLM drafts lacked nuance for difficult messages, so drafts are grounded in a corpus of example messages retrieved with TF-IDF.",
    image: "/projects/griefcompanion.jpg"
  },
  {
    id: "habitflow", title: "HabitFlow AI",
    tier: "more",
    description: "An AI-powered habit tracker with streaks, mood analytics, gamification and weekly AI summaries.",
    tech: ["React", "Node.js", "MongoDB", "Gemini API", "Framer Motion"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/habitflow", demo: "https://habitflow-one-omega.vercel.app",
    features: ["AI weekly summaries", "Gamified tracking", "Mood correlation analytics", "Multi-tab sessions"],
    challenges: "Turning habit and mood logs into correlations and weekly summaries that are useful to read.",
    image: "/projects/habitflow.jpg"
  },
  {
    id: "smartresume", title: "SmartResume",
    tier: "more",
    description: "An AI-powered smart resume builder that generates professional templates and uses LLMs to iteratively improve your resume content.",
    tech: ["React", "Node.js", "Express", "JWT", "AI API"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/SmartResume", demo: "https://smartresume-rouge.vercel.app/",
    features: ["Multiple Templates", "AI Content Improvement", "Secure JWT Auth", "PDF Export"],
    challenges: "Prompt engineering the AI to structure resume bullet points effectively.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ember", title: "Ember",
    tier: "more",
    description: "Premium cafe management system with role-based dashboards and live order tracking.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/ember", demo: "https://ember-mu-lilac.vercel.app/login",
    features: ["Socket.io realtime data", "RBAC", "Live order tracking", "MERN stack"],
    challenges: "Handling high-concurrency real-time data efficiently without server bloat.",
    image: "/projects/ember.png"
  },
  {
    id: "balancio", title: "Balancio",
    tier: "more",
    description: "Collaborative app for managing shared expenses and member-to-member balances with real-time sync.",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/balancio", demo: "https://balancio-three.vercel.app",
    features: ["Real-time Socket.io sync", "Member-to-member balances", "Group chat"],
    challenges: "Keeping balances and settlements in sync across group members in real time.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "portfolio", title: "Portfolio Website",
    tier: "more",
    description: "This site. A scroll-driven canvas hero that plays a 153-frame WebP sequence, an editorial project index, and a Gemini-backed chatbot that answers from the same project data you are reading.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Canvas", "Vercel", "Gemini API"],
    status: "Active", year: "2024",
    github: "https://github.com/octotat-bot/Personal-Portfolio", demo: "",
    features: ["Scroll-driven canvas frame sequence", "Chatbot grounded in the site's own data", "One data file for every project"],
    challenges: "The hero sequence started at 80MB of frames. Converting to WebP cut it to 6.5MB, and preloading the first frame lets the canvas paint before the rest stream in.",
    image: "/projects/portfolio.png"
  },
  {
    id: "opspilot", title: "OpsPilot",
    tier: "more",
    description: "Internal operations platform with multi-level approvals, delegation, SLA checks and analytics.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    status: "Active", year: "2023",
    github: "https://github.com/octotat-bot/Ops-Pilot", demo: "https://ops-pilot-two.vercel.app/login",
    features: ["Multi-level approvals", "JWT security", "Delegation", "SLA tracking"],
    challenges: "Modelling multi-level approval workflows with delegation and versioned request templates.",
    image: "/projects/opspilot.png"
  },
  {
    id: "notora", title: "Notora",
    tier: "earlier",
    description: "Modern note-taking web application focused on secure authentication, structured organization, and distraction-free writing.",
    tech: ["React.js", "Clerk", "HTML", "CSS"],
    status: "Completed", year: "2023",
    github: "https://github.com/octotat-bot/notora", demo: "https://notora-two.vercel.app/",
    features: ["Clerk Authentication", "Notebook-based organization", "Privacy-focused locking"],
    challenges: "Implementing a scalable architecture to support file attachments and real-time collaboration features.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "weatherapp", title: "Weather Forecast",
    tier: "earlier",
    description: "A real-time weather forecasting application that provides accurate data with a clean, dynamic visual interface.",
    tech: ["JavaScript", "HTML", "CSS", "Weather API"],
    status: "Completed", year: "2022",
    github: "https://github.com/octotat-bot/weather-forecast-app", demo: "https://weather-forecast-app-smoky-xi.vercel.app",
    features: ["Live weather data", "Dynamic background UI", "Geolocation"],
    challenges: "Handling asynchronous API requests efficiently and gracefully managing rate limits.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "placenext", title: "PlaceNext",
    tier: "more",
    description: "A comprehensive AI Placement Cell & Internship Management System to streamline campus recruitment. Features smart resume analysis for ATS scoring, intelligent eligibility matching, and a 24/7 AI chatbot assistant.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Groq AI", "OpenAI API", "Tailwind CSS"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/PlaceNext", demo: "https://place-next.vercel.app/",
    features: ["Intelligent Filter", "AI Resume ATS", "24/7 Chatbot"],
    challenges: "Building an efficient ATS resume parser using OpenAI API while maintaining low latency.",
    image: "/projects/placenext.png"
  },
  {
    id: "repomind", title: "RepoMind",
    tier: "featured",
    description: "RepoMind indexes any GitHub repository — cloning, chunking and embedding every file — then answers questions about it in plain English, citing the exact files and line ranges behind each answer. It adds semantic code search, an interactive dependency graph with circular-import detection, and AST-based dead-code analysis. Built with Next.js, FastAPI, FAISS and Postgres, on local or hosted models.",
    tech: ["Next.js 15", "React 19", "Tailwind v4", "FastAPI", "Python 3.13", "SQLAlchemy 2", "FAISS", "Ollama", "Groq", "PostgreSQL", "Prisma", "Vercel", "Render", "Neon"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/RepoMind", demo: "https://repomind-eight-mu.vercel.app/",
    features: ["Citations to exact line ranges", "Interactive dependency graph", "AST-based dead-code analysis"],
    challenges: "Pure vector similarity kept returning several chunks from whichever single file sat closest in embedding space. Retrieval needed a reranking pass — per-file diversity plus identifier splitting, so that asking where a token is verified matches verifyToken — to let lower-scoring but genuinely relevant files reach the context window.",
    scenes: [
      { shape: "clusters", title: ["Ask any", "repo."], line: "Every point is a chunk of code. One file kept crowding out the rest.", caption: "RepoMind's own test · vector-only top 4: big.py ×4" },
      { shape: "reranked", title: ["The right file", "gets in."], caption: "Same test through rerank() · other.py reaches the top 4" }
    ],
    image: "/projects/repomind.png"
  },
  {
    id: "marginalia", title: "Marginalia",
    tier: "featured",
    description: "Marginalia is a retrieval-augmented question-answering app for PDFs. Upload documents, ask in plain English, and get answers drawn only from the text, each citing its source file and page. A similarity threshold plus a grounded prompt make it refuse rather than guess. Built with LangChain, Chroma, FastAPI and Streamlit; providers are swappable, uploads are discarded after indexing.",
    tech: ["Python", "LangChain", "FastAPI", "Streamlit", "ChromaDB", "PyMuPDF", "Groq", "OpenAI", "Ollama", "pytest"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/Marginalia", demo: "https://marginalia-main.streamlit.app/",
    features: ["Page-level citations", "Refuses rather than guessing", "Swappable LLM providers"],
    challenges: "Smaller models would set answer_found=true and then write \"there is no mention of this in the excerpt\" into the answer field, returning a refusal with a citation attached. That needed a third guardrail layer on top of the similarity threshold and the model's own verdict: short answers matching refusal phrasing are normalised back into a real refusal with no sources.",
    scenes: [
      { shape: "pages", title: ["Ask any", "PDF."], line: "It cites the page, or it refuses.", caption: "Answers carry file and page citations" }
    ],
    image: "/projects/marginalia.png"
  }
];

// Tools are matched to projects by name, ignoring version suffixes
// ("Next.js 15" → "next.js") and a few spelling variants.
const TECH_ALIASES = { "react.js": "react", "tailwind": "tailwind css", "openai api": "openai", "groq ai": "groq" };

export const normalizeTech = (name) => {
  const base = name.toLowerCase().trim().replace(/\s+v?\d+(\.\d+)*$/, "");
  return TECH_ALIASES[base] ?? base;
};

export const projectsUsing = (tech) => {
  const key = normalizeTech(tech);
  return stations.filter((p) => p.tech.some((t) => normalizeTech(t) === key));
};
