export const skills = [
    {
        id: 1,
        category: "Agentic AI & LLMs",
        icon: "🤖",
        technologies: ["LangGraph", "RAG", "Prompt Engineering", "Agentic Workflows", "LangChain", "n8n", "OpenAI/Gemini API"],
        description: "Specializing in building autonomous AI agents and complex RAG systems. Expert in prompt optimization, state management in chatbots, and multi-agent control flows using ReAct frameworks.",
        color: "from-blue-400 to-indigo-600",
        highlights: [
            { text: "Advanced Agentic Architectures", link: "#" },
            { text: "RAG & Vector Databases", link: "#" }
        ],
        achievement: {
            title: "AI Architect",
            rank: "Advanced",
            description: "Mastered LangGraph & ReAct Patterns",
            icon: "🧠"
        },
        proficiency: 95
    },
    {
        id: 2,
        category: "Machine Learning & Deep Learning",
        icon: "🔬",
        technologies: ["Python", "Neural Networks", "NLP", "Scikit-Learn", "Transformers", "Word Embeddings"],
        description: "Deep understanding of ML fundamentals from supervised learning (Regression, Decision Trees) to complex Neural Network architectures (MLP, RNN, CNN).",
        color: "from-purple-400 to-pink-600",
        proficiency: 90
    },
    {
        id: 3,
        category: "Full Stack & Real-time Systems",
        icon: "⚛️",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Vite"],
        description: "Building production-grade web applications that serve as robust interfaces for AI systems, featuring real-time data streaming and secure API management.",
        color: "from-cyan-400 to-blue-500",
        proficiency: 85
    },
    {
        id: 4,
        category: "DSA & Problem Solving",
        icon: "🧠",
        technologies: ["Data Structures", "Algorithms", "LeetCode", "Python", "JavaScript"],
        description: "Strong algorithmic foundation with 225+ LeetCode problems solved, focusing on optimizing logic for high-performance AI applications.",
        color: "from-gray-300 to-gray-500",
        highlights: [
            { text: "View LeetCode Profile", link: "https://leetcode.com/u/Hakka123/" }
        ],
        achievement: {
            title: "Speed Demon",
            rank: "S-Tier",
            description: "Solved 30+ Questions in less than 3 Hours",
            icon: "⚡️"
        },
        proficiency: 90
    }
];


// NOTE: The metrics and testimonial below are unverified and are NOT used
// anywhere (removed from the chatbot prompt on 2026-11-01). Do not render or
// reuse them unless they come from a real, reproducible measurement.
export const caseStudies = [
    {
        id: 1,
        title: "Implementing Agentic RAG for Mental Health",
        client: "Grief Companion Project",
        role: "AI Engineer",
        duration: "3 months",
        overview: "Developed a specialized RAG system to provide contextually aware and empathetic responses for users experiencing grief.",
        challenge: "Traditional LLMs often lack the specific nuance and grounding required for sensitive mental health topics, leading to generic or inappropriate responses.",
        solution: "Implemented a custom RAG pipeline using vector databases and a ReAct agent framework to ground responses in curated therapeutic content.",
        results: [
            { metric: "Empathy Score", value: "+80%", description: "User-rated improvement in response quality" },
            { metric: "Hallucination Rate", value: "-65%", description: "Reduction in factual errors via RAG grounding" },
            { metric: "Context Depth", value: "Multi-turn", description: "Seamless state management in conversations" }
        ],
        technologies: ["Groq AI", "LangChain", "ChromaDB", "Node.js", "SSE Streaming"],
        images: [
            "/case-studies/ai-1.jpg",
            "/case-studies/ai-2.jpg"
        ],
        testimonial: {
            text: "The integration of agentic workflows transformed the application from a simple chatbot into a truly supportive companion.",
            author: "Project Lead",
            position: "Mental Health Tech Initiative"
        }
    }
];

export const aboutContent = {
    intro: "I'm Mukund Mangla, a full-stack engineer who builds LLM-powered products.",
    description: "I'm an AI Engineer and Full-Stack Developer dedicated to creating intelligent, autonomous applications. I bridge the gap between complex Machine Learning models and premium user experiences, specializing in LangGraph, RAG, and Agentic workflows.",
    approach: "Agentic Intelligence. Scalable Architecture. Premium Design.",
    stats: [
        { label: "LLM Integrations", value: "15+" },
        { label: "AI Workflows", value: "20+" },
        { label: "LeetCode Solved", value: "225+" }
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
