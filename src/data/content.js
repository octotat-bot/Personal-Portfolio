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


export const projects = [
    {
        id: 1,
        title: "Grief Companion",
        category: "Agentic AI & Mental Health",
        description: "An empathetic AI writing instrument that uses Agentic workflows and RAG to help users navigate difficult life transitions. Built with the MERN stack and Groq AI, featuring real-time SSE streaming and A/B tone comparison for high-precision content generation.",
        technologies: ["React", "Node.js", "MongoDB", "Groq AI", "LangChain", "RAG", "Vanilla CSS"],
        image: "/projects/griefcompanion.jpg",
        link: "https://grief-companion-two.vercel.app/",
        github: "https://github.com/octotat-bot/grief-companion",
        featured: true,
        stats: {
            llm: "Llama 3.1",
            rag: "Vector Search",
            agent: "ReAct"
        }
    },
    {
        id: 2,
        title: "HabitFlow AI",
        category: "AI Productivity",
        description: "An AI-powered habit tracking OS that uses behavioral analysis to gamify growth. Implements intelligent insights and personalized coaching using LLM-driven recommendation engines.",
        technologies: ["React", "Node.js", "MongoDB", "OpenAI API", "Tailwind CSS"],
        image: "/projects/habitflow.jpg",
        link: "https://habitflow-one-omega.vercel.app",
        github: "https://github.com/octotat-bot/habitflow",
        featured: true,
        stats: {
            insights: "LLM-Powered",
            tracking: "Gamified",
            analytics: "Deep Learning"
        }
    },
    {
        id: 3,
        title: "Ember",
        category: "Real-time Operations",
        description: "Premium cafe management system with role-based dashboards and live order tracking. Demonstrates expertise in handling high-concurrency real-time data which is critical for AI agent interfaces.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
        image: "/projects/ember.png",
        link: "https://ember-mu-lilac.vercel.app/login",
        github: "https://github.com/octotat-bot/ember",
        featured: true,
        stats: {
            realtime: "Socket.io",
            roles: "RBAC",
            stack: "MERN"
        }
    },
    {
        id: 4,
        title: "OpsPilot",
        category: "Enterprise Automation",
        description: "Internal operations platform with automated reporting and multi-level workflows. Currently being integrated with low-code AI automation using n8n to streamline enterprise logic.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "n8n", "Tailwind CSS"],
        image: "/projects/opspilot.png",
        link: "https://ops-pilot-two.vercel.app/login",
        github: "https://github.com/octotat-bot/Ops-Pilot",
        featured: true,
        stats: {
            automation: "n8n",
            security: "JWT",
            workflow: "Agentic"
        }
    }
];


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
    intro: "I'm Mukund Mangla, building the next generation of Agentic AI Systems.",
    description: "I'm an AI Engineer and Full-Stack Developer dedicated to creating intelligent, autonomous applications. I bridge the gap between complex Machine Learning models and premium user experiences, specializing in LangGraph, RAG, and Agentic workflows.",
    approach: "Agentic Intelligence. Scalable Architecture. Premium Design.",
    stats: [
        { label: "LLM Integrations", value: "15+" },
        { label: "AI Workflows", value: "20+" },
        { label: "LeetCode Solved", value: "225+" }
    ]
};

export const contactInfo = {
    email: "mangalmukund123@gmail.com",
    location: "India",
    availability: "Open to AI/Agentic Engineering roles",
    social: {
        github: "https://github.com/mukundmangla",
        linkedin: "https://linkedin.com/in/mukundmangla",
        leetcode: "https://leetcode.com/mukundmangla"
    }
};

export const timeline = [
    {
        year: "2025",
        title: "Mastering Agentic AI & RAG",
        description: "Deep-dived into the Agentic AI ecosystem, mastering LangGraph, ReAct frameworks, and Advanced RAG. Built production-ready AI agents and automated workflows using n8n.",
        type: "milestone"
    },
    {
        year: "2024",
        title: "B.Tech in CS & AI",
        description: "Joined Newton School of Technology. Mastered Full Stack Development while building a solid foundation in Machine Learning, Deep Learning, and NLP.",
        type: "education"
    },
    {
        year: "2023",
        title: "Strategic Gap Year",
        description: "Focused on analytical problem solving and mathematics, building the resilience required for complex engineering.",
        type: "milestone"
    },
    {
        year: "2021",
        title: "The Inception",
        description: "Wrote my first Python script, beginning a journey into the world of logic and automated problem solving.",
        type: "milestone"
    }
];

