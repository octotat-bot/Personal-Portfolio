// Tool groups for the Toolkit section. The section only shows a tool when at
// least one project in projects.js lists it, and links to those projects, so
// every entry is backed by a repo. Add a tool here AND to a project's tech list.
export const skills = [
    {
        category: "LLMs & retrieval",
        technologies: ["LangChain", "RAG", "ChromaDB", "FAISS", "Groq", "OpenAI", "Gemini API", "Ollama", "Whisper", "n8n"]
    },
    {
        category: "Back end",
        technologies: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "SQLAlchemy", "Prisma", "MongoDB", "Socket.io", "JWT"]
    },
    {
        category: "Front end",
        technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Streamlit"]
    },
    {
        category: "Testing & deploy",
        technologies: ["pytest", "Vercel", "Render", "Neon"]
    }
];

export const aboutContent = {
    intro: "I'm Mukund Mangla, a full-stack engineer who builds LLM-powered products.",
    description: "I'm studying for a B.Tech in Artificial Intelligence at Newton School of Technology, Rishihood University. Most of what I build pairs a React or Next.js front end with a Python or Node back end. In my recent LLM projects, RepoMind and Marginalia, most of the work went into retrieval, citations, and making the model refuse rather than guess.",
    // Only numbers that can be checked. LeetCode is fetched live; this is the fallback.
    stats: [
        { label: "LeetCode solved", value: "225+", link: "https://leetcode.com/u/Hakka123/" }
    ]
};

export const contactInfo = {
    email: "manglamukund123@gmail.com",
    location: "India",
    availability: "Open to internships",
    social: {
        github: "https://github.com/octotat-bot",
        linkedin: "https://www.linkedin.com/in/mukund-mangla/",
        leetcode: "https://leetcode.com/u/Hakka123/"
    }
};

export const timeline = [
    {
        year: "Oct 2026 – Present",
        title: "Building Repetite",
        description: "A workout log and a food tracker in one app: it tells you what to lift next and how much to eat, and your logs stay on your device.",
        type: "experience",
        link: "https://repetiteapp.github.io/repetite-app/"
    },
    {
        year: "2024 – 2028",
        title: "B.Tech in Artificial Intelligence",
        description: "Newton School of Technology, Rishihood University.",
        type: "education",
        subTimeline: [
            {
                year: "Year 1 · 2024–25",
                description: "Frontend development and Data Structures & Algorithms (DSA)."
            },
            {
                year: "Year 2 · 2025–26",
                description: "Backend development and Artificial Intelligence."
            },
            {
                year: "Year 3 · 2026–27",
                description: "In progress."
            }
        ]
    },
    {
        year: "2023",
        title: "Gap year",
        description: "Took a year after Class XII before starting my B.Tech.",
        type: "milestone"
    },
    {
        year: "2021",
        title: "The Inception",
        description: "Wrote my first Python script, beginning a journey into the world of logic and automated problem solving.",
        type: "milestone"
    }
];
