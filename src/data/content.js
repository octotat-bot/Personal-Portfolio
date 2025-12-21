export const skills = [
    {
        id: 1,
        category: "DSA & Problem Solving",
        icon: "🧠",
        technologies: ["Data Structures", "Algorithms", "LeetCode", "Python", "JavaScript"],
        description: "Strong foundation in data structures and algorithms with 225+ LeetCode problems solved. Expertise in optimizing code complexity and solving challenging algorithmic problems.",
        color: "from-white to-gray-400",
        highlights: [
            { text: "225+ LeetCode Solutions", link: "https://leetcode.com/u/Hakka123/" }
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
    },
    {
        id: 2,
        title: "SmartResume",
        category: "AI-Powered Tool",
        description: "An intelligent resume builder powered by AI that helps users create professional, ATS-friendly resumes. Features include AI-powered content suggestions, multiple templates, real-time preview, and PDF export functionality for seamless job applications.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "Vite"],
        image: "/projects/SmartResume.png",
        link: "https://smartresume-rouge.vercel.app/",
        github: "https://github.com/octotat-bot/SmartResume",
        featured: true,
        stats: {
            ai: "Gemini",
            templates: "Multiple",
            export: "PDF"
        }
    },
    {
        id: 3,
        title: "Notora",
        category: "Web Application",
        description: "A modern note-taking application built with React.js and Clerk authentication. Features include creating notes, organizing them into notebooks, and locking sensitive notes for enhanced privacy. Designed with a minimal, responsive interface for efficient note management.",
        technologies: ["React", "JavaScript", "HTML", "CSS", "Clerk"],
        image: "/projects/notora.png",
        link: "https://notora-two.vercel.app/",
        github: "https://github.com/octotat-bot/notora",
        featured: true,
        stats: {
            privacy: "Encrypted",
            sync: "Real-time",
            uptime: "99.9%"
        }
    },
    {
        id: 4,
        title: "Task flow",
        category: "Productivity",
        description: "An intuitive and efficient task management experience built with React.js and Clerk. Features include light/dark mode, task creation with due dates, sorting, and filtering. Designed for flexibility and productivity with a responsive, user-friendly interface.",
        technologies: ["React", "JavaScript", "HTML", "CSS", "Clerk"],
        image: "/projects/task-flow.png",
        link: "https://task-manager-app-rosy-kappa.vercel.app/",
        github: "https://github.com/octotat-bot/task-manager-app",
        featured: true,
        stats: {
            users: "Active",
            experience: "Smooth",
            platform: "Web"
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
