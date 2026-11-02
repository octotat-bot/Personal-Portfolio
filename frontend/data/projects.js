// Single source of truth for projects.
// Used by the Projects section (frontend/components/sections/Projects.jsx)
// and by the AI chatbot prompt (api/chat.js). Edit projects here only.
// cx / cy / lines / size are layout fields for the transit-map view.

export const stations = [
  {
    id: "dreamsignal", title: "DreamSignal",
    lines: ["aiml", "backend"], cx: 700, cy: 600, size: "large",
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
    lines: ["aiml", "backend"], cx: 500, cy: 600, size: "large",
    description: "An empathetic AI writing instrument that uses Agentic workflows and RAG to help users navigate difficult life transitions.",
    tech: ["React", "Node.js", "MongoDB", "Groq AI", "LangChain", "RAG"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/grief-companion", demo: "https://grief-companion-two.vercel.app/",
    features: ["Real-time SSE streaming", "A/B tone comparison", "ReAct Agent", "Vector Search"],
    challenges: "Traditional LLMs lacked the specific nuance for mental health, solved using custom RAG pipeline grounding.",
    image: "/projects/griefcompanion.jpg"
  },
  {
    id: "habitflow", title: "HabitFlow AI",
    lines: ["aiml", "frontend"], cx: 500, cy: 200, size: "large",
    description: "An AI-powered habit tracking OS that uses behavioral analysis to gamify growth and personalize coaching.",
    tech: ["React", "Node.js", "MongoDB", "OpenAI", "Tailwind CSS"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/habitflow", demo: "https://habitflow-one-omega.vercel.app",
    features: ["LLM-Powered insights", "Gamified tracking", "Deep Learning analytics", "Custom OS layout"],
    challenges: "Building a complex recommendation engine and seamless user experience.",
    image: "/projects/habitflow.jpg"
  },
  {
    id: "smartresume", title: "SmartResume",
    lines: ["aiml", "frontend"], cx: 500, cy: 400, size: "large",
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
    lines: ["backend"], cx: 300, cy: 600, size: "medium",
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
    lines: ["backend"], cx: 900, cy: 600, size: "medium",
    description: "Collaborative fintech platform for managing shared expenses and simplified debt settlements with real-time sync.",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/balancio", demo: "https://balancio-three.vercel.app",
    features: ["Real-time Socket.io sync", "Smart debt simplification", "Dual-layer JWT auth"],
    challenges: "Developing a smart debt simplification algorithm to minimize required payments between users.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "portfolio", title: "Portfolio Website",
    lines: ["frontend"], cx: 100, cy: 200, size: "medium",
    description: "This futuristic, highly interactive personal portfolio showcasing a cyberpunk transit map concept.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "SVG"],
    status: "Active", year: "2024",
    github: "https://github.com/octotat-bot/Personal-Portfolio", demo: "",
    features: ["Cyberpunk transit map", "Custom animations", "Glassmorphism", "Interactive nodes"],
    challenges: "Building a scalable SVG transit map with interactive nodes and complex path animations.",
    image: "/projects/portfolio.png"
  },
  {
    id: "opspilot", title: "OpsPilot",
    lines: ["frontend"], cx: 300, cy: 200, size: "medium",
    description: "Internal operations platform with automated reporting and multi-level agentic workflows.",
    tech: ["React", "Node.js", "MongoDB", "n8n", "Tailwind CSS"],
    status: "Active", year: "2023",
    github: "https://github.com/octotat-bot/Ops-Pilot", demo: "https://ops-pilot-two.vercel.app/login",
    features: ["n8n automation", "JWT security", "Agentic workflow", "Automated reporting"],
    challenges: "Integrating low-code AI automation (n8n) into complex enterprise logic.",
    image: "/projects/opspilot.png"
  },
  {
    id: "notora", title: "Notora",
    lines: ["frontend"], cx: 700, cy: 200, size: "small",
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
    lines: ["frontend"], cx: 300, cy: 400, size: "small",
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
    lines: ["aiml", "backend"], cx: 100, cy: 600, size: "large",
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
    lines: ["aiml"], cx: 500, cy: 50, size: "large",
    description: "RepoMind indexes any GitHub repository — cloning, chunking and embedding every file — then answers questions about it in plain English, citing the exact files and line ranges behind each answer. It adds semantic code search, an interactive dependency graph with circular-import detection, and AST-based dead-code analysis. Built with Next.js, FastAPI, FAISS and Postgres, on local or hosted models.",
    tech: ["Next.js 15", "React 19", "Tailwind v4", "FastAPI", "Python 3.13", "SQLAlchemy 2", "FAISS", "Ollama", "Groq", "PostgreSQL", "Prisma", "Vercel", "Render", "Neon"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/RepoMind", demo: "https://repomind-eight-mu.vercel.app/",
    features: ["Citations to exact line ranges", "Interactive dependency graph", "AST-based dead-code analysis"],
    challenges: "Pure vector similarity kept returning several chunks from whichever single file sat closest in embedding space. Retrieval needed a reranking pass — per-file diversity plus identifier splitting, so that asking where a token is verified matches verifyToken — to let lower-scoring but genuinely relevant files reach the context window.",
    image: "/projects/repomind.png"
  },
  {
    id: "marginalia", title: "Marginalia",
    lines: ["aiml"], cx: 700, cy: 450, size: "large",
    description: "Marginalia is a retrieval-augmented question-answering app for PDFs. Upload documents, ask in plain English, and get answers drawn only from the text, each citing its source file and page. A similarity threshold plus a grounded prompt make it refuse rather than guess. Built with LangChain, Chroma, FastAPI and Streamlit; providers are swappable, uploads are discarded after indexing.",
    tech: ["Python", "LangChain", "FastAPI", "Streamlit", "ChromaDB", "PyMuPDF", "Groq", "OpenAI", "Ollama", "pytest"],
    status: "Completed", year: "2026",
    github: "https://github.com/octotat-bot/Marginalia", demo: "https://marginalia-main.streamlit.app/",
    features: ["Page-level citations", "Refuses rather than guessing", "Swappable LLM providers"],
    challenges: "Smaller models would set answer_found=true and then write \"there is no mention of this in the excerpt\" into the answer field, returning a refusal with a citation attached. That needed a third guardrail layer on top of the similarity threshold and the model's own verdict: short answers matching refusal phrasing are normalised back into a real refusal with no sources.",
    image: "/projects/marginalia.png"
  }
];
