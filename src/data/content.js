export const skills = [
    {
        id: 1,
        category: "DSA & Problem Solving",
        icon: "🧠",
        technologies: ["Data Structures", "Algorithms", "LeetCode", "Python", "JavaScript"],
        description: "Strong foundation in data structures and algorithms with hundreds of LeetCode problems solved. Expertise in optimizing code complexity and solving challenging algorithmic problems.",
        color: "from-white to-gray-400",
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
    },
    {
        id: 2,
        category: "Frontend Development",
        icon: "⚛️",
        technologies: ["React", "JavaScript", "HTML", "CSS", "Three.js"],
        description: "Building responsive, performant, and beautiful user interfaces with modern frameworks and best practices.",
        color: "from-gray-300 to-gray-500",
        proficiency: 85
    },
    {
        id: 3,
        category: "Backend & Database",
        icon: "⚙️",
        technologies: ["Node.js", "Express", "MongoDB", "SQL", "NoSQL", "REST API"],
        description: "Architecting scalable backend systems with robust APIs and efficient database design.",
        color: "from-gray-400 to-white",
        proficiency: 80
    },
    {
        id: 4,
        category: "Tools & Data Science",
        icon: "🚀",
        technologies: ["Git", "Figma", "Python", "Pandas"],
        description: "Version control, design tools, and data analysis for efficient development workflows.",
        color: "from-gray-500 to-gray-300",
        proficiency: 75
    }
];


export const projects = [
    {
        id: 1,
        title: "Grief Companion",
        category: "AI & Mental Health",
        description: "Grief Companion is an AI-powered writing instrument designed to help users find the right words during difficult life transitions. Built with the MERN stack and Groq AI, it features real-time SSE streaming, A/B tone comparison, and a custom RAG service. The app prioritizes empathy and focus with a premium parchment-and-gold aesthetic and a distraction-free, zero-scroll layout.",
        technologies: ["React", "Node.js", "MongoDB", "Groq AI", "Express", "Vanilla CSS"],
        image: "/projects/griefcompanion.jpg",
        link: "https://grief-companion-two.vercel.app/",
        github: "https://github.com/octotat-bot/grief-companion",
        featured: true,
        stats: {
            llm: "Llama 3",
            rag: "Custom",
            ui: "Premium"
        }
    },
    {
        id: 2,
        title: "HabitFlow",
        category: "Productivity & Growth",
        description: "An AI-powered habit tracking operating system designed to gamify personal growth through structured routines, rich analytics, and intelligent insights.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
        image: "/projects/habitflow.jpg",
        link: "https://habitflow-one-omega.vercel.app",
        github: "https://github.com/octotat-bot/habitflow",
        featured: true,
        stats: {
            insights: "AI-Powered",
            tracking: "Gamified",
            analytics: "Rich"
        }
    },
    {
        id: 3,
        title: "Ember",
        category: "Cafe Management",
        description: "Ember is a premium, real-time cafe management system built with the MERN stack and Socket.io. It features role-based dashboards to seamlessly connect cashiers, kitchen staff, and management. Live order tracking eliminates paper tickets, synchronizing the front-of-house with a dedicated Kitchen Display System. The application is wrapped in a highly polished, responsive, and dynamic light-themed user interface.",
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
        category: "Enterprise Operations",
        description: "A comprehensive internal operations platform featuring role-based access control (RBAC), multi-level approval workflows, and real-time resource management. Streamlines organizational processes with automated reporting and secure data handling.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS"],
        image: "/projects/opspilot.png",
        link: "https://ops-pilot-two.vercel.app/login",
        github: "https://github.com/octotat-bot/Ops-Pilot",
        featured: true,
        stats: {
            users: "RBAC",
            security: "JWT",
            workflow: "Auto"
        }
    }
];


export const caseStudies = [
    {
        id: 1,
        title: "Redesigning E-Commerce Experience",
        client: "TechStore Inc.",
        role: "Lead Frontend Developer & UX Designer",
        duration: "6 months",
        overview: "Complete redesign of an e-commerce platform, focusing on improving conversion rates and user engagement through modern design and 3D product visualization.",
        challenge: "The existing platform had a 68% cart abandonment rate and poor mobile experience. Users struggled to visualize products and trust the purchase decision.",
        solution: "Implemented a 3D product configurator, streamlined checkout process, and created a responsive design system with micro-interactions and smooth animations.",
        results: [
            { metric: "Conversion Rate", value: "+45%", description: "Increase in completed purchases" },
            { metric: "Cart Abandonment", value: "-32%", description: "Reduction in abandoned carts" },
            { metric: "Mobile Sales", value: "+78%", description: "Growth in mobile transactions" },
            { metric: "User Engagement", value: "+156%", description: "Increase in time on site" }
        ],
        technologies: ["React", "Three.js", "Next.js", "Tailwind CSS", "Framer Motion", "Stripe"],
        images: [
            "/case-studies/ecommerce-1.jpg",
            "/case-studies/ecommerce-2.jpg",
            "/case-studies/ecommerce-3.jpg"
        ],
        testimonial: {
            text: "The new design exceeded our expectations. Our sales have increased significantly, and customer feedback has been overwhelmingly positive.",
            author: "Sarah Johnson",
            position: "CEO, TechStore Inc."
        }
    },
    {
        id: 2,
        title: "Building a Real-Time Analytics Platform",
        client: "DataViz Pro",
        role: "Full Stack Developer",
        duration: "8 months",
        overview: "Developed a comprehensive analytics platform from scratch, enabling businesses to visualize and analyze their data in real-time with interactive 3D charts.",
        challenge: "Clients needed a way to process and visualize large datasets in real-time without performance degradation, while maintaining an intuitive interface.",
        solution: "Built a scalable microservices architecture with WebSocket connections for real-time updates, implemented WebGL-based 3D visualizations, and created a flexible dashboard system.",
        results: [
            { metric: "Data Processing", value: "10M+", description: "Records processed per second" },
            { metric: "Load Time", value: "-85%", description: "Reduction in dashboard load time" },
            { metric: "User Adoption", value: "92%", description: "Of target users actively using platform" },
            { metric: "Client Retention", value: "98%", description: "Annual retention rate" }
        ],
        technologies: ["React", "D3.js", "Three.js", "Node.js", "MongoDB", "Redis", "WebSocket"],
        images: [
            "/case-studies/analytics-1.jpg",
            "/case-studies/analytics-2.jpg",
            "/case-studies/analytics-3.jpg"
        ],
        testimonial: {
            text: "This platform has transformed how we understand our data. The real-time capabilities and beautiful visualizations have impressed all our stakeholders.",
            author: "Michael Chen",
            position: "CTO, DataViz Pro"
        }
    }
];

export const aboutContent = {
    intro: "I'm Mukund Mangla, crafting digital experiences.",
    description: "I'm a full-stack developer obsessed with building performant, scalable, and visually stunning applications. My code blends strong algorithmic foundations with modern design.",
    approach: "Clean code. Delightful UX. Continuous learning.",
    stats: [
        { label: "LeetCode Solved", value: "225+" },
        { label: "Technologies", value: "10+" }
    ]
};

export const contactInfo = {
    email: "mangalmukund123@gmail.com",
    location: "India",
    availability: "Open to opportunities",
    social: {
        github: "https://github.com/mukundmangla",
        linkedin: "https://linkedin.com/in/mukundmangla",
        leetcode: "https://leetcode.com/mukundmangla"
    }
};

export const timeline = [
    {
        year: "2024",
        title: "B.Tech in CS & AI",
        description: "Joined Newton School of Technology. Rapidly expedited my growth as a Full Stack Developer, mastering React, Node.js, SQL, MongoDB, and advanced Data Structures & Algorithms.",
        type: "education"
    },
    {
        year: "2023",
        title: "Strategic Gap Year",
        description: "Prepared for JEE with intense focus. While medical challenges redirected my path, this period built the resilience and analytical mindset that I now apply to complex coding challenges.",
        type: "milestone"
    },
    {
        year: "2023",
        title: "Advanced Python & High School",
        description: "Completed Class 12th at Tagore Public School. Deepened my programming foundation, moving beyond basics to building functional logic and scripts in Python.",
        type: "education"
    },
    {
        year: "2021",
        title: "The Inception",
        description: "Passed Class 10th at Tagore Public School. Wrote my first 'Hello World' in Python, sparking an immediate passion for problem-solving and technology.",
        type: "milestone"
    }
];
