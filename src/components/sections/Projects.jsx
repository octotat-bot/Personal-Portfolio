import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useInView } from 'framer-motion';
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
    path: "M 500 50 Q 420 125 500 200 T 500 400 T 500 600 T 500 750",
    type: 'neural', speed: 6
  }
};

const stations = [
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
    lines: ["backend"], cx: 700, cy: 600, size: "medium",
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

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
  });
  const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [activeStation, setActiveStation] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);
  
  // Parallax Setup
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring config for smooth parallax
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(smoothY, [-500, 500], [5, -5]);
  const rotateY = useTransform(smoothX, [-500, 500], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to center of container
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="projects" className="relative bg-black py-32 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Minimal Grid to match website aesthetic */}
      <div className="absolute inset-0 opacity-5 z-0">
          <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
          }} />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        
        {/* Section Label */}
        <motion.div
            className="mb-20"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            <div className="flex items-center gap-4">
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Selected Works</span>
                <motion.div
                    className="flex-1 h-px bg-gray-900"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ transformOrigin: "left" }}
                />
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column - Large Number with Parallax */}
            <div className="hidden lg:block lg:col-span-3">
                <motion.div
                    className="sticky top-32"
                    style={{ y: numberY, opacity: numberOpacity }}
                >
                    <div className="text-[12rem] font-bold leading-none text-white/5 gradient-text-animated select-none">
                        03
                    </div>
                </motion.div>
            </div>

            {/* Right Column - Map and Content */}
            <div className="lg:col-span-9 flex flex-col">
                
                {/* Header HUD */}
                <motion.div 
                  className="mb-12 flex flex-col items-start text-left max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                    <FaNetworkWired className="animate-pulse" />
                    <span>Interactive Node Network</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-tighter mb-4">
                    SYSTEM_MAP
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                    A living visualization of my technical infrastructure. Hover over nodes to analyze connections, tech stack dependencies, and active deployments across the ecosystem.
                  </p>
                </motion.div>

        {/* --- LAYER 2: INTERACTIVE 3D MAP --- */}
        <motion.div 
            ref={containerRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full max-w-6xl relative z-20 perspective-1000"
        >
            <div className="w-full bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-3xl p-4 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-visible">
                
                {/* SVG MAP CORE */}
                <div className="w-full relative aspect-[4/3] sm:aspect-video overflow-visible">
                    <svg viewBox="0 0 1000 800" className="w-full h-full drop-shadow-2xl overflow-visible">
                        <defs>
                            {/* Layered Glow Filters for Cinematic Lighting */}
                            {/* Optimized Glow Filters for Performance */}
                            <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <filter id="neon-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            
                            {/* Gradients */}
                            <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* --- DRAW CONNECTING INTELLIGENCE LINES ON HOVER --- */}
                        <AnimatePresence>
                            {hoveredStation && getConnectedStations(hoveredStation).map(target => (
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

                                    {/* Animated Data Pulses (Trains) */}
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
                                            <circle r="8" fill={line.color} filter={filterId} opacity="0.8" />
                                            <circle r="4" fill="#ffffff" />
                                        </motion.g>
                                    ))}
                                </g>
                            );
                        })}

                        {/* --- DRAW STATIONS --- */}
                        {stations.map((station) => {
                            const primaryLine = lines[station.lines[0]];
                            const isHovered = hoveredStation?.id === station.id;
                            const isConnected = hoveredStation && getConnectedStations(hoveredStation).some(s => s.id === station.id);
                            const isDimmed = hoveredStation && !isHovered && !isConnected;
                            
                            // Station size logic
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
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    {/* Interchange rings for large stations */}
                                    {station.size === 'large' && (
                                        <>
                                            <circle r={coreRadius + 8} fill="none" stroke={primaryLine.color} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" className="animate-spin-slow" style={{ animationDuration: '8s' }} />
                                            <circle r={coreRadius + 14} fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.2" className="animate-reverse-spin" style={{ animationDuration: '12s' }} />
                                        </>
                                    )}
                                    
                                    {/* Ambient Glow */}
                                    <motion.circle 
                                        r={glowRadius * 1.5} fill={primaryLine.color} opacity={isHovered ? 0.6 : 0.3}
                                        filter={`url(#neon-glow-${primaryLine.id === 'frontend' ? 'cyan' : primaryLine.id === 'backend' ? 'green' : 'purple'})`}
                                        animate={isHovered || isConnected ? { scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] } : {}}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                    
                                    {/* Inner Node */}
                                    <circle r={coreRadius} fill={isHovered ? "#ffffff" : "#1a1a1a"} stroke={primaryLine.color} strokeWidth="4" className="transition-all duration-300" />
                                    
                                    {/* Micro Center dot for large stations */}
                                    {station.size === 'large' && !isHovered && <circle r="2" fill="#fff" />}

                                    {/* Render Custom Hover Tooltip directly in SVG or absolute HTML (SVG is tricky for complex HTML, so we use HTML absolute positioning outside SVG) */}
                                </g>
                            );
                        })}
                    </svg>

                    {/* --- HTML HUD OVERLAYS --- */}
                    
                    {/* Corner Diagnostics */}
                    <div className="absolute top-4 left-6 flex flex-col gap-1 pointer-events-none opacity-60">
                        <div className="text-[9px] font-mono text-cyan-400 flex items-center gap-2"><FaSatelliteDish className="animate-pulse" /> UPLINK SECURE</div>
                        <div className="text-[9px] font-mono text-gray-400">COORD: {Math.round(smoothX.get())}x {Math.round(smoothY.get())}y</div>
                        <div className="text-[9px] font-mono text-gray-400">NODES_ACTIVE: {stations.length}</div>
                    </div>

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
                                    // Custom tooltip placement logic based on coordinates
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
                    </AnimatePresence>

                </div>
            </div>
        </motion.div>
        
            </div> {/* Closes Right Column (col-span-9) */}
        </div> {/* Closes Grid */}

      </div> {/* Closes Container */}

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
