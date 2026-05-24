import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaMapSigns, FaSatelliteDish, FaNetworkWired, FaCodeBranch } from 'react-icons/fa';

const lines = {
  frontend: { 
    id: "frontend", name: "Frontend", color: "#00f3ff", 
    glow: "rgba(0, 243, 255, 0.8)", 
    path: "M 100 200 Q 200 120 300 200 T 500 200 T 700 200 Q 800 200 800 250 L 800 350 Q 800 400 750 400 L 700 400 T 500 400 T 300 400 T 100 400",
    type: 'fast', speed: 4
  },
  backend: { 
    id: "backend", name: "Backend", color: "#00ff66", 
    glow: "rgba(0, 255, 102, 0.8)", 
    path: "M 100 600 Q 200 520 300 600 T 500 600 T 700 600 T 900 600",
    type: 'stable', speed: 8
  },
  aiml: { 
    id: "aiml", name: "AI/ML", color: "#b026ff", 
    glow: "rgba(176, 38, 255, 0.8)", 
    path: "M 500 50 Q 420 125 500 200 T 500 400 T 500 600 Q 500 700 600 700 T 700 600 L 700 450",
    type: 'neural', speed: 6
  }
};

const stations = [
  {
    id: "dreamsignal", title: "DreamSignal",
    lines: ["aiml", "backend"], cx: 700, cy: 600, size: "large",
    description: "An immersive, analog-themed classified dossier system for recording, analyzing, and archiving dreams.",
    tech: ["React", "Node.js", "Python", "FastAPI", "MongoDB", "Whisper", "Gemini API"],
    status: "Completed", year: "2024",
    github: "https://github.com/octotat-bot/DreamSignal", demo: "https://dream-signal.vercel.app/",
    features: ["Async AI Pipeline", "Semantic RAG Search", "SSE Real-time Streaming"],
    challenges: "Distributed microservices architecture linking analog UI to complex machine learning pipelines.",
    image: "/projects/dreamsignal.png"
  },
  {
    id: "grief-companion", title: "Grief Companion",
    lines: ["aiml", "backend"], cx: 500, cy: 600, size: "large",
    description: "An empathetic AI writing instrument that uses Agentic workflows and RAG to help users navigate difficult life transitions.",
    tech: ["React", "Node.js", "MongoDB", "Groq AI", "LangChain", "RAG"],
    status: "Completed", year: "2024",
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
    status: "Completed", year: "2023",
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
    github: "https://github.com/mukundmangla", demo: "#",
    features: ["Cyberpunk transit map", "Custom animations", "Glassmorphism", "Interactive nodes"],
    challenges: "Building a scalable SVG transit map with interactive nodes and complex path animations.",
    image: "/case-studies/ai-1.jpg"
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
    id: "taskflow", title: "TaskFlow",
    lines: ["frontend"], cx: 800, cy: 300, size: "small",
    description: "A highly intuitive task manager and todo list application featuring a premium UI and secure authentication.",
    tech: ["React", "Clerk", "HTML", "CSS"],
    status: "Completed", year: "2022",
    github: "https://github.com/octotat-bot/task-manager-app", demo: "https://task-manager-app-rosy-kappa.vercel.app",
    features: ["Clerk Auth", "Task categorization", "Progress tracking", "Responsive Design"],
    challenges: "Optimizing state management for dragging and reordering tasks seamlessly.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800"
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
  }
];

// Returns all connected stations based on shared lines or tech stacks for the Intelligence Network
const getConnectedStations = (targetStation) => {
    return stations.filter(s => 
        s.id !== targetStation.id && 
        (s.tech.some(t => targetStation.tech.includes(t)) || s.lines.some(l => targetStation.lines.includes(l)))
    );
};

// --- BACKGROUND CITYSCAPE DATA ---
const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const techLabels = ["REACT", "NODE.JS", "PYTHON", "MONGO", "AWS", "DOCKER", "REDIS", "GRAPHQL", "NEXT.JS", "VITE", "SQL", "TYPESCRIPT", "TAILWIND", "KUBERNETES", "KAFKA", "LINUX", "RUST", "GOLANG", "AZURE", "VERCEL"];

// Background city skyline (kept light - this is decorative and re-renders are expensive in SVG).
const backgroundBuildings = Array.from({ length: 80 }).map((_, i) => {
    const hasGlow = seededRandom(i * 10 + 4) > 0.8;
    const isTech = hasGlow || seededRandom(i * 10 + 5) > 0.6;
    return {
        x: seededRandom(i * 10) * 1000,
        y: seededRandom(i * 10 + 1) * 800,
        width: 8 + seededRandom(i * 10 + 2) * 18,
        height: 20 + seededRandom(i * 10 + 3) * 140,
        hasGlow,
        label: isTech ? techLabels[Math.floor(seededRandom(i * 10 + 6) * techLabels.length)] : ""
    };
});

const foregroundBuildings = [];

// Isometric Skyscraper Component for Background Theme City
const CityBuilding = memo(function CityBuilding({ x, y, width, height, hasGlow, label }) {
    const w = width;
    const h = height;
    
    // Determine building tech color
    const techColors = {
        "REACT": "#00f3ff", "NEXT.JS": "#00f3ff", "VITE": "#00f3ff", "TAILWIND": "#00f3ff",
        "PYTHON": "#b026ff", "TENSORFLOW": "#b026ff", "OPENAI": "#b026ff", 
        "NODE.JS": "#00ff66", "MONGO": "#00ff66", "DOCKER": "#00ff66", "AWS": "#00ff66", "SQL": "#00ff66", "REDIS": "#00ff66", "GRAPHQL": "#00ff66", "KUBERNETES": "#00ff66", "KAFKA": "#00ff66", "LINUX": "#00ff66", "RUST": "#00ff66", "GOLANG": "#00ff66", "AZURE": "#00ff66", "VERCEL": "#00ff66"
    };
    const baseColor = label ? (techColors[label] || "#ffffff") : (hasGlow ? "#00f3ff" : "#ffffff");
    
    // Randomize blinking windows based on position seed
    const hasWindows = seededRandom(x + y) > 0.4;
    
    return (
        <g transform={`translate(${x}, ${y})`} className="opacity-100" style={{ pointerEvents: 'none' }}>
            {/* Left Face */}
            <polygon points={`0,0 -${w},-${w*0.5} -${w},-${w*0.5 + h} 0,-${h}`} fill="#050505" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            {/* Right Face */}
            <polygon points={`0,0 ${w},-${w*0.5} ${w},-${w*0.5 + h} 0,-${h}`} fill="#080808" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            {/* Top Face */}
            <polygon points={`0,-${h} -${w},-${w*0.5 + h} 0,-${w + h} ${w},-${w*0.5 + h}`} fill="#111111" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            
            {/* Grid Lines / Blinking Windows */}
            {hasWindows && (
                <g className="opacity-40">
                    <path d={`M -${w*0.5},-${w*0.25} L -${w*0.5},-${w*0.25 + h - 5}`} stroke={baseColor} strokeWidth="1.5" strokeDasharray="3 6" />
                    <path d={`M ${w*0.5},-${w*0.25} L ${w*0.5},-${w*0.25 + h - 5}`} stroke={baseColor} strokeWidth="1.5" strokeDasharray="3 6" />
                </g>
            )}

            {/* Glowing Inner Core on Top */}
            {hasGlow && (
                <polygon points={`0,-${h + 2} -${w - 5},-${w*0.5 + h + 2} 0,-${w + h - 2} ${w - 5},-${w*0.5 + h + 2}`} fill={baseColor} opacity="0.4" filter="blur(4px)" />
            )}

            {/* Floating Tech Label */}
            {label && (
                <text x="0" y={-(h + w + 15)} fill={baseColor} opacity="0.9" fontSize="9" fontFamily="monospace" textAnchor="middle" style={{ textShadow: `0 0 8px ${baseColor}` }}>{label}</text>
            )}
        </g>
    );
});

// Static SVG defs (filters + gradients). Isolated so React never re-creates them on hover state changes.
const MapDefs = memo(function MapDefs() {
    return (
        <defs>
            {/* Technical Grid Pattern */}
            <pattern id="techGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <circle cx="100" cy="100" r="1.5" fill="rgba(255,255,255,0.05)" />
                <text x="5" y="15" fill="rgba(255,255,255,0.03)" fontSize="6" fontFamily="monospace">SYS.NET.ACTIVE</text>
            </pattern>
            {/* Light-weight glow filters (stdDeviation lowered from 6 -> 2.5 for perf) */}
            <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="neon-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Gradients */}
            <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="tunnel-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#020202" stopOpacity="0" />
            </radialGradient>
        </defs>
    );
});

// All static decorative SVG layers (grid, topo, crosshairs, glitch lines, dead nodes, scanning laser,
// city skyline, drones). Memoized so hover/click state in the parent never re-renders this huge tree.
const MapBackdrop = memo(function MapBackdrop() {
    return (
        <g style={{ pointerEvents: 'none' }}>
            {/* SVG Background Grid */}
            <rect width="100%" height="100%" fill="url(#techGrid)" rx="20" />

            {/* Ambient Flying Drones (reduced from 25 -> 8) */}
            <g>
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.circle
                        key={`drone-${i}`}
                        r="1.5"
                        fill={seededRandom(i) > 0.5 ? "#00f3ff" : "#00ff66"}
                        initial={{ x: seededRandom(i * 10) * 1000, y: seededRandom(i * 10 + 1) * 800, opacity: 0 }}
                        animate={{
                            x: seededRandom(i * 10 + 2) * 1000,
                            y: seededRandom(i * 10 + 3) * 800,
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 18 + seededRandom(i) * 12,
                            repeat: Infinity,
                            delay: seededRandom(i * 2) * 20
                        }}
                    />
                ))}
            </g>

            {/* Topographic Map Contours */}
            <g fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                <path d="M 0 600 Q 150 550 250 650 T 500 600 T 800 700 T 1000 600" />
                <path d="M 0 620 Q 150 570 250 670 T 500 620 T 800 720 T 1000 620" />
                <path d="M 0 640 Q 150 590 250 690 T 500 640 T 800 740 T 1000 640" />
                <path d="M 100 0 Q 200 150 400 100 T 700 200 T 1000 50" />
                <path d="M 120 0 Q 220 170 420 120 T 720 220 T 1000 70" />
                <circle cx="500" cy="400" r="300" strokeDasharray="4 20" opacity="0.5" />
                <circle cx="500" cy="400" r="450" strokeDasharray="2 30" opacity="0.5" />
            </g>

            {/* Isometric City Skyline */}
            {backgroundBuildings.map((building, i) => (
                <CityBuilding key={`building-${i}`} {...building} />
            ))}

            {/* Corner Crosshairs */}
            <g stroke="rgba(0,243,255,0.3)" strokeWidth="1" fill="none">
                <path d="M 30 30 L 60 30 M 30 30 L 30 60" />
                <path d="M 970 30 L 940 30 M 970 30 L 970 60" />
                <path d="M 30 770 L 60 770 M 30 770 L 30 740" />
                <path d="M 970 770 L 940 770 M 970 770 L 970 740" />
            </g>

            {/* Circuit Glitch Lines */}
            <path d="M 100 650 L 250 650 L 300 700 L 450 700" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5" />
            <path d="M 650 150 L 700 100 L 900 100" fill="none" stroke="rgba(0,255,102,0.05)" strokeWidth="1" strokeDasharray="2 10" />
            <path d="M 400 300 L 450 250 L 450 150 L 550 150" fill="none" stroke="rgba(176,38,255,0.05)" strokeWidth="1" strokeDasharray="8 4" />

            {/* Static Data Dust (Dead Nodes) */}
            <g fill="rgba(255,255,255,0.08)">
                <circle cx="150" cy="250" r="1.5" /><circle cx="280" cy="180" r="1" /><circle cx="350" cy="450" r="2" />
                <circle cx="750" cy="550" r="1.5" /><circle cx="820" cy="380" r="1" /><circle cx="650" cy="650" r="2" />
                <circle cx="850" cy="150" r="1" /><circle cx="120" cy="550" r="1.5" /><circle cx="480" cy="680" r="1" />
            </g>

            {/* Animated Scanning Laser */}
            <motion.line
                x1="0" y1="0" x2="1000" y2="0"
                stroke="rgba(0, 243, 255, 0.1)" strokeWidth="1"
                animate={{ y1: [0, 800, 0], y2: [0, 800, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </g>
    );
});

export default function Projects() {
  const containerWrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress: stickyScroll } = useScroll({
      target: containerWrapperRef,
      offset: ["start start", "end end"]
  });

  const { scrollYProgress } = useScroll({
      target: containerWrapperRef,
      offset: ["start end", "end start"]
  });
  


  // CORRECT EXPANSION APPROACH:
  // The map is always fullscreen underneath.
  // A clip-path mask REVEALS it as the user scrolls.
  // Internal content NEVER scales — only the visible window grows.
  // All transforms are clamped to [0.2, 0.6] — beyond 0.6 nothing changes.

  const clipInset = useTransform(
    stickyScroll,
    [0, 0.2, 0.6],
    ['35% 15% 20% 15%', '35% 15% 20% 15%', '0% 0% 0% 0%']
  );

  const mapBorderRadius = useTransform(stickyScroll, [0.2, 0.6], ['2rem', '0rem']);
  const headerOpacity = useTransform(stickyScroll, [0, 0.2], [1, 0]);
  const headerY = useTransform(stickyScroll, [0, 0.2], [0, -30]);
  const hudOpacity = useTransform(stickyScroll, [0.35, 0.6], [0, 1]);

  // City Boot Sequence
  const cityFogOpacity = useTransform(stickyScroll, [0.2, 0.6], [0, 1]);

  // Derived clip-path motion value — fully reactive, no .get() calls inside render
  const clipPathValue = useTransform(
    [clipInset, mapBorderRadius],
    ([inset, radius]) => `inset(${inset} round ${radius})`
  );

  const [activeStation, setActiveStation] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [isTerminalHovered, setIsTerminalHovered] = useState(false);
  const [isTerminalClicked, setIsTerminalClicked] = useState(false);
  const [githubStats, setGithubStats] = useState({ repos: "...", status: "INITIALIZING_UPLINK..." });

  // Precomputed station connection graph - avoids re-scanning all stations on every hover render.
  const connectionMap = useMemo(() => {
    const map = new Map();
    stations.forEach(s => {
      map.set(s.id, new Set(getConnectedStations(s).map(c => c.id)));
    });
    return map;
  }, []);
  const hoveredConnections = hoveredStation ? connectionMap.get(hoveredStation.id) : null;

  useEffect(() => {
      fetch('https://api.github.com/users/octotat-bot')
          .then(res => res.json())
          .then(data => {
              if (data.public_repos) {
                  setGithubStats({ repos: data.public_repos, status: "UPLINK_ESTABLISHED" });
              }
          })
          .catch(() => {
              setGithubStats({ repos: "140+", status: "OFFLINE_CACHE" });
          });
  }, []);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (activeStation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeStation]);
  
  // Parallax Setup

  return (
    <section id="projects" ref={containerWrapperRef} className="relative bg-black selection:bg-cyan-500/30" style={{ height: '250vh' }}>
      
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">

          {/* Background grid */}
          <div className="absolute inset-0 opacity-5 z-0">
              <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
              }} />
          </div>

          {/* Section Label — top left, matches other sections */}
          <motion.div
            className="absolute top-8 left-6 z-30 pointer-events-none"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ opacity: headerOpacity }}
          >
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Selected Works</span>
              <div className="w-16 h-px bg-gray-900" />
            </div>
          </motion.div>

          {/* Title HUD — 03 + SYSTEM_MAP side by side, above the map clip area */}
          <motion.div
            ref={sectionRef}
            className="absolute top-8 left-6 z-30 pointer-events-none flex flex-col gap-2"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10rem] font-bold leading-none text-white/5 gradient-text-animated select-none">03</span>
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm w-fit">
                  <FaNetworkWired className="animate-pulse" />
                  <span>Interactive Node Network</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-tighter">
                  SYSTEM_MAP
                </h2>
                <p className="text-gray-500 text-xs font-light">Scroll to enter the transit network</p>
              </div>
            </div>
          </motion.div>

          {/* Track Legend HUD — fades in as map expands, stays in fullscreen */}
          <motion.div
            className="absolute bottom-6 left-6 z-30 pointer-events-none"
            style={{ opacity: hudOpacity }}
          >
            <div className="flex flex-col gap-2 bg-black/70 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-md">
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <FaMapSigns className="text-gray-400" /> Track Class
              </div>
              {Object.values(lines).map(line => (
                <div key={line.id} className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-3">
                    <div className="absolute w-full h-[3px] opacity-60 blur-[2px]" style={{ backgroundColor: line.color }} />
                    <div className="absolute w-full h-[1.5px]" style={{ backgroundColor: line.color }} />
                  </div>
                  <span className="text-[10px] font-mono text-gray-300 uppercase tracking-wider">{line.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 
            =====================================================
            THE MAP — always fixed fullscreen, revealed via clip
            =====================================================
            The inner SVG map is ALWAYS 100vw x 100vh in size.
            A clip-path mask grows to reveal it as the user scrolls.
            Internal content NEVER scales. Only the window opens.
          */}
          <motion.div 
              className="absolute inset-0 z-20"
              style={{ clipPath: clipPathValue }}
          >
              {/* The Map itself — 100vw x 100vh, internal content is fixed */}
              <div className="w-full h-full bg-[#020202] relative overflow-hidden">
                {/* Cheap CSS-based atmospheric fog (replaces 3 huge blur-100px SVG circles). */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: cityFogOpacity,
                        background:
                            'radial-gradient(circle at 30% 25%, rgba(0,243,255,0.08), transparent 45%), ' +
                            'radial-gradient(circle at 70% 75%, rgba(176,38,255,0.07), transparent 50%), ' +
                            'radial-gradient(circle at 50% 50%, rgba(0,255,102,0.05), transparent 40%)'
                    }}
                />
                <svg viewBox="-140 -20 1280 840" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                        <MapDefs />

                        {/* Static decorative layers (grid, drones, topo, city, crosshairs, glitch, dust, laser) */}
                        <MapBackdrop />

                        {/* --- DRAW CONNECTING INTELLIGENCE LINES ON HOVER --- */}
                        <AnimatePresence>
                            {hoveredStation && stations.filter(s => hoveredConnections?.has(s.id)).map(target => (
                                <motion.line
                                    key={`link-${hoveredStation.id}-${target.id}`}
                                    x1={hoveredStation.cx} y1={hoveredStation.cy}
                                    x2={target.cx} y2={target.cy}
                                    stroke="url(#link-gradient)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            ))}
                        </AnimatePresence>

                        {/* --- DRAW MAIN METRO LINES --- */}
                        {Object.values(lines).map((line) => {
                            const isDimmed = hoveredStation && !hoveredStation.lines.includes(line.id);
                            const filterId = line.id === 'frontend' ? 'url(#neon-glow-cyan)' : line.id === 'backend' ? 'url(#neon-glow-green)' : 'url(#neon-glow-purple)';
                            
                            return (
                                <g key={`line-${line.id}`} style={{ opacity: isDimmed ? 0.15 : 1, transition: 'opacity 0.4s ease' }}>
                                    
                                    {/* Circuitry Notches underneath */}
                                    <path d={line.path} fill="none" stroke={line.color} strokeWidth="16" strokeOpacity="0.08" strokeDasharray="2 15" strokeLinecap="round" strokeLinejoin="round" />
                                    
                                    {/* Base Structural Line (Ghost) */}
                                    <path d={line.path} fill="none" stroke={line.color} strokeWidth="12" strokeOpacity="0.05" strokeLinecap="round" strokeLinejoin="round" />
                                    
                                    {/* Glowing Outer Halo */}
                                    <motion.path 
                                        d={line.path} fill="none" stroke={line.color} strokeWidth="10" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"
                                        filter={filterId}
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />
                                    
                                    {/* Bright Inner Core */}
                                    <motion.path 
                                        d={line.path} fill="none" stroke={line.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />
                                    
                                    {/* Hot White Center (Lightsaber effect) */}
                                    <motion.path 
                                        d={line.path} fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />

                                    {/* Animated Data Pulses (Trains) - no SVG filter on moving elements (huge perf win) */}
                                    {[0, 33, 66].map((offset, i) => (
                                        <motion.g
                                            key={`train-${line.id}-${i}`}
                                            animate={{ offsetDistance: ["0%", "100%"] }}
                                            transition={{
                                                duration: line.speed,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: (line.speed / 3) * i
                                            }}
                                            style={{ offsetPath: `path('${line.path}')` }}
                                        >
                                            <circle r="8" fill={line.color} opacity="0.35" />
                                            <circle r="4" fill="#ffffff" />
                                        </motion.g>
                                    ))}
                                </g>
                            );
                        })}

                        {/* --- FOREGROUND BUILDINGS (Overlapping the Tracks) --- */}
                        {foregroundBuildings.map((building, i) => (
                            <CityBuilding key={`fg-building-${i}`} {...building} />
                        ))}

                        {/* --- DRAW STATIONS --- */}
                        {stations.map((station) => {
                            const primaryLine = lines[station.lines[0]];
                            const isHovered = hoveredStation?.id === station.id;
                            const isConnected = hoveredConnections?.has(station.id);
                            const isDimmed = hoveredStation && !isHovered && !isConnected;

                            const coreRadius = station.size === 'large' ? 12 : station.size === 'medium' ? 9 : 6;
                            const glowRadius = isHovered ? coreRadius * 2.5 : coreRadius * 1.5;

                            return (
                                <g
                                    key={station.id}
                                    transform={`translate(${station.cx}, ${station.cy})`}
                                    onMouseEnter={() => setHoveredStation(station)}
                                    onMouseLeave={() => setHoveredStation(null)}
                                    onClick={() => setActiveStation(station)}
                                    className="cursor-pointer"
                                    style={{
                                        opacity: isDimmed ? 0.3 : 1,
                                        transition: 'opacity 0.4s ease'
                                    }}
                                >
                                    {/* Interchange rings for large stations */}
                                    {station.size === 'large' && (
                                        <>
                                            <circle r={coreRadius + 18} fill="none" stroke={primaryLine.color} strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1 6" className="animate-spin-slow" style={{ animationDuration: '20s' }} />
                                            <circle r={coreRadius + 12} fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 8" className="animate-reverse-spin" style={{ animationDuration: '12s' }} />
                                            <path d={`M -${coreRadius + 26} 0 L -${coreRadius + 14} 0 M ${coreRadius + 14} 0 L ${coreRadius + 26} 0 M 0 -${coreRadius + 26} L 0 -${coreRadius + 14} M 0 ${coreRadius + 14} L 0 ${coreRadius + 26}`} stroke={primaryLine.color} strokeWidth="1" strokeOpacity="0.5" />
                                        </>
                                    )}

                                    {/* Ambient Glow - no SVG filter, only animates on the hovered node */}
                                    <motion.circle
                                        r={glowRadius * 1.5} fill={primaryLine.color} opacity={isHovered ? 0.5 : 0.2}
                                        animate={isHovered ? { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 1 }}
                                        transition={isHovered ? { repeat: Infinity, duration: 2 } : { duration: 0.3 }}
                                    />

                                    {/* Inner Node */}
                                    <circle r={coreRadius} fill={isHovered ? "#ffffff" : "#1a1a1a"} stroke={primaryLine.color} strokeWidth="4" className="transition-all duration-300" />

                                    {/* Micro Center dot for large stations */}
                                    {station.size === 'large' && !isHovered && <circle r="2" fill="#fff" />}

                                </g>
                            );
                        })}

                        {/* --- EXTERNAL GATEWAY (GITHUB UPLINK TERMINAL) --- */}
                        <g 
                            transform="translate(850, 700)" 
                            className="cursor-pointer group"
                            onMouseEnter={() => setIsTerminalHovered(true)}
                            onMouseLeave={() => setIsTerminalHovered(false)}
                            onClick={() => {
                                setIsTerminalClicked(true);
                                setTimeout(() => {
                                    window.open("https://github.com/octotat-bot", "_blank");
                                    setIsTerminalClicked(false);
                                }, 1500);
                            }}
                        >
                            {/* Cinematic Tunnel Effect */}
                            <g className="opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                <ellipse cx="80" cy="0" rx="40" ry="120" fill="url(#tunnel-gradient)" className="opacity-40" />
                                <ellipse cx="60" cy="0" rx="20" ry="80" fill="none" stroke="rgba(0,243,255,0.2)" strokeWidth="2" />
                                <ellipse cx="40" cy="0" rx="10" ry="40" fill="none" stroke="rgba(0,243,255,0.4)" strokeWidth="1" />
                            </g>
                            
                            {/* Track leading into tunnel */}
                            <path d="M -200 -150 Q -50 0 0 0 L 100 0" fill="none" stroke="#ffffff" strokeWidth="8" strokeOpacity="0.05" />
                            <path d="M -200 -150 Q -50 0 0 0 L 100 0" fill="none" stroke="#00f3ff" strokeWidth="2" strokeOpacity="0.8" strokeDasharray="8 8" className="animate-pulse" />
                            
                            {/* Animated Glowing Data Train */}
                            {isTerminalHovered && (
                                <motion.circle 
                                    r="4" fill="#fff"
                                    animate={{ offsetDistance: ["0%", "100%"] }}
                                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                                    style={{ offsetPath: `path('M -200 -150 Q -50 0 0 0 L 100 0')` }}
                                    className="drop-shadow-[0_0_10px_rgba(0,243,255,1)]"
                                />
                            )}

                            {/* Gateway Node rings */}
                            <circle cx="0" cy="0" r="32" fill="#050505" stroke="#ffffff" strokeWidth="1.5" className="group-hover:fill-white/10 transition-all duration-300" />
                            <circle cx="0" cy="0" r="42" fill="none" stroke="#00f3ff" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 4" className="animate-spin-slow" />
                            <circle cx="0" cy="0" r="48" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="2" strokeDasharray="20 10" className="animate-reverse-spin" style={{ animationDuration: '8s' }} />
                            <circle cx="0" cy="0" r="54" fill="none" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="1" className="group-hover:scale-[1.15] transition-transform duration-700 origin-center" />
                            
                            {/* Ambient Particles & Blinking Lights */}
                            <g className={`transition-opacity duration-500 ${isTerminalHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <circle cx="-40" cy="-40" r="1" fill="#00f3ff" className="animate-ping" />
                                <circle cx="50" cy="-20" r="1.5" fill="#00f3ff" className="animate-pulse" />
                                <circle cx="-20" cy="50" r="1" fill="#ffffff" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                                <circle cx="30" cy="40" r="2" fill="#00f3ff" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                                {/* Scanning Laser */}
                                <line x1="-60" y1="0" x2="60" y2="0" stroke="rgba(0,243,255,0.2)" strokeWidth="1" className="animate-spin-slow" />
                            </g>

                            {/* Futuristic GitHub Logo (Holographic) */}
                            <g className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 origin-center drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
                                <foreignObject x="-16" y="-16" width="32" height="32" className="pointer-events-none">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FaGithub size={24} className={`transition-colors duration-300 ${isTerminalHovered ? 'text-cyan-400' : 'text-white'}`} />
                                    </div>
                                </foreignObject>
                            </g>
                            
                            {/* Holographic Text Label */}
                            <text x="0" y="75" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="4" fontWeight="bold" className="opacity-80 group-hover:opacity-100 group-hover:fill-cyan-400 transition-all" style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}>OPEN SOURCE TERMINAL</text>
                            <text x="0" y="90" fill="rgba(0,243,255,0.7)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2" className="group-hover:fill-cyan-300 transition-colors opacity-0 group-hover:opacity-100">+ MORE PROJECTS</text>
                            
                            {/* Click Transition Portal Effect */}
                            {isTerminalClicked && (
                                <motion.circle
                                    cx="0" cy="0" r="0"
                                    fill="#00f3ff"
                                    initial={{ r: 0, opacity: 0.8 }}
                                    animate={{ r: 2000, opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeIn" }}
                                    className="pointer-events-none"
                                />
                            )}
                        </g>
                    </svg>

                    {/* --- HTML HUD OVERLAYS --- */}
                    
                    <div className="absolute bottom-4 right-6 flex flex-col items-end gap-1 pointer-events-none opacity-60">
                        <div className="text-[9px] font-mono text-gray-500">SYS_V3.0_BUILD</div>
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-500 mt-1" />
                    </div>

                    {/* --- HOVER TOOLTIPS (HTML OVERLAY) --- */}
                    <AnimatePresence>
                        {hoveredStation && (
                            <motion.div 
                                className="absolute pointer-events-none z-50 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                style={{
                                    left: `${(hoveredStation.cx / 1000) * 100}%`,
                                    top: `${(hoveredStation.cy / 800) * 100}%`,
                                    x: hoveredStation.cx > 500 ? '-110%' : '10%',
                                    y: hoveredStation.cy > 400 ? '-110%' : '10%'
                                }}
                            >
                                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl w-64">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: lines[hoveredStation.lines[0]].color }} />
                                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{hoveredStation.year}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white leading-tight mb-1">{hoveredStation.title}</h4>
                                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{hoveredStation.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {hoveredStation.tech.slice(0, 3).map(t => (
                                            <span key={t} className="text-[9px] font-mono bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {isTerminalHovered && (
                            <motion.div 
                                className="absolute pointer-events-none z-50 bottom-8 right-8"
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            >
                                <div className="bg-[#020202]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5 shadow-[0_0_30px_rgba(0,243,255,0.2)] w-72 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
                                    
                                    <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
                                        <FaGithub className="text-3xl text-white" />
                                        <div>
                                            <h4 className="text-sm font-bold text-white leading-none">OPEN SOURCE TERMINAL</h4>
                                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Connected GitHub Network</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-xs font-mono">
                                            <span className="text-gray-500">USERNAME</span>
                                            <span className="text-gray-200">@octotat-bot</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-mono">
                                            <span className="text-gray-500">TOTAL_PROJECTS</span>
                                            <span className="text-cyan-400 font-bold">{githubStats.repos}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-mono">
                                            <span className="text-gray-500">SYS_STATUS</span>
                                            <span className="text-green-400">{githubStats.status}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/10">
                                        <p className="text-[10px] text-gray-400 font-mono text-center opacity-70 animate-pulse">
                                            [ CLICK TO INITIATE UPLINK TRANSFER ]
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

              </div> {/* closes inner map div */}
          </motion.div> {/* closes clip container */}

      </div> {/* closes sticky container */}

      {/* --- MODAL / STATION DETAIL PANEL --- */}
      <AnimatePresence>
        {activeStation && (
            <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Modal Backdrop with Blur */}
                <motion.div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={() => setActiveStation(null)}
                />

                {/* Cyberpunk Modal Window */}
                <motion.div 
                    className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#050505] border border-white/10 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden"
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{ boxShadow: `0 0 100px ${lines[activeStation.lines[0]].glow}` }}
                >
                    <button 
                        onClick={() => setActiveStation(null)}
                        className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
                    >
                        <FaTimes />
                    </button>

                    {/* Left: Image & Decor */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-auto relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10" />
                        <motion.img 
                            src={activeStation.image} 
                            alt={activeStation.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1 }}
                        />
                        {/* Scanning Line Effect */}
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 blur-[2px] z-20"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col z-20 relative">
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                        
                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                {activeStation.lines.map(lineId => (
                                    <span key={lineId} className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full bg-white/5 border border-white/10" style={{ color: lines[lineId].color, boxShadow: `0 0 10px ${lines[lineId].glow}` }}>
                                        {lines[lineId].name}
                                    </span>
                                ))}
                                <span className="ml-auto text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    {activeStation.status}
                                </span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                                {activeStation.title}
                            </h3>

                            <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed font-light">
                                {activeStation.description}
                            </p>

                            <div className="space-y-8 mb-10 flex-1">
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><FaCodeBranch /> Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeStation.tech.map(t => (
                                            <span key={t} className="px-3 py-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors cursor-default">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Key Features</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {activeStation.features.map(f => (
                                            <li key={f} className="text-sm text-gray-400 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: lines[activeStation.lines[0]].color }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <a href={activeStation.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black font-bold text-sm tracking-wider hover:bg-gray-200 transition-colors rounded-xl group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 group-hover:-translate-x-full translate-x-full transition-transform duration-1000" />
                                    <FaGithub className="text-lg group-hover:scale-110 transition-transform" />
                                    <span>SOURCE CODE</span>
                                </a>
                                <a href={activeStation.demo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-wider hover:bg-white/5 transition-colors rounded-xl group">
                                    <FaExternalLinkAlt className="text-sm group-hover:scale-110 transition-transform" />
                                    <span>LIVE DEMO</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
