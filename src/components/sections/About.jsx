import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { aboutContent, timeline } from '../../data/content';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const [leetCodeSolved, setLeetCodeSolved] = useState("225+");

    useEffect(() => {
        fetch("https://alfa-leetcode-api.onrender.com/Hakka123/solved")
            .then(res => res.json())
            .then(data => {
                if (data && data.solvedProblem) {
                    setLeetCodeSolved(data.solvedProblem);
                }
            })
            .catch(() => {});
    }, []);

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    // Enhanced "01" parallax
    const numberY = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const numberOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const numberScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <section id="about" className="relative bg-black py-32 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                style={{ y, opacity }}
            />

            {/* Minimal Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Section Label with Animated Line */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">About</span>
                        <motion.div
                            className="flex-1 h-px bg-gray-900"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                    {/* Numbering Column with Enhanced Parallax */}
                    <div className="hidden lg:block col-span-2">
                        <motion.div
                            className="sticky top-32"
                            style={{ y: numberY, opacity: numberOpacity, scale: numberScale }}
                        >
                            <div className="text-[10rem] font-bold leading-none text-white/5 gradient-text-animated select-none">
                                01
                            </div>
                        </motion.div>
                    </div>

                    {/* LEFT COLUMN: About Me, Stats, Tech Stack */}
                    <div className="col-span-1 md:col-span-6 lg:col-span-4 space-y-16">

                        {/* Header & Bio */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6 lg:mb-8">
                                {aboutContent.intro.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className={word === 'Mukund' || word === 'Mangla,' ? 'text-gray-600' : ''}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                                    >
                                        {word}{' '}
                                    </motion.span>
                                ))}
                            </h2>
                            <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
                                <p>{aboutContent.description}</p>
                                <p className="text-gray-500">{aboutContent.approach}</p>
                            </div>
                        </motion.div>

                        {/* Interactive Stats */}
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {aboutContent.stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative p-6 border border-gray-900 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-500"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="text-3xl font-bold text-white mb-2">
                                        {stat.label === "LeetCode Solved" ? leetCodeSolved : stat.value}
                                    </div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Tech Stack (Compact) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.values(techStackCategories).flat().map((tech, i) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-[10px] text-gray-400 border border-gray-800 rounded-full hover:border-white/30 hover:text-white transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Journey Timeline */}
                    <div className="col-span-1 md:col-span-6 lg:col-span-6 relative mt-8 md:mt-0">
                        <motion.div
                            className="lg:sticky lg:top-32"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-4 mb-12">
                                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">My Journey</span>
                                <div className="w-12 h-px bg-gray-900" />
                            </div>

                            <div className="relative border-l border-gray-800 ml-2 md:ml-3 space-y-12">
                                {timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative pl-6 sm:pl-8 lg:pl-12"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-gray-600 rounded-full group-hover:border-white transition-colors">
                                            <div className={`absolute inset-0 rounded-full bg-white opacity-0 ${index === 0 ? 'animate-ping opacity-20' : ''}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="group">
                                            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-black bg-white rounded-full mb-3">
                                                {item.year}
                                            </span>
                                            <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {item.description}
                                            </p>
                                            {item.subTimeline && (
                                                <div className="mt-6 md:mt-8 space-y-4 border-l border-gray-800/50 ml-2 md:ml-4 pl-4 md:pl-6 relative">
                                                    {/* Gradient highlight on the sub-timeline line */}
                                                    <div className="absolute top-0 bottom-0 -left-[1px] w-px bg-gradient-to-b from-gray-500/50 via-gray-800/30 to-transparent" />
                                                    
                                                    {item.subTimeline.map((sub, idx) => (
                                                        <motion.div 
                                                            key={idx} 
                                                            className="relative group/sub p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
                                                            whileHover={{ x: 8 }}
                                                        >
                                                            {/* Glowing Dot on the main line */}
                                                            <div className="absolute -left-[20.5px] md:-left-[28.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black border border-gray-600 group-hover/sub:border-white group-hover/sub:bg-white group-hover/sub:shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 z-10" />
                                                            
                                                            {/* Connecting horizontal line */}
                                                            <div className="absolute -left-[16px] md:-left-[24px] top-1/2 -translate-y-1/2 w-[16px] md:w-[24px] h-px bg-gray-800 group-hover/sub:bg-gray-500 transition-colors duration-300" />
                                                            
                                                            <div className="relative z-10 flex flex-col gap-2">
                                                                <span className="inline-flex w-fit items-center gap-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-black/50 px-2.5 py-1 rounded-md border border-white/5 group-hover/sub:text-white group-hover/sub:border-white/20 transition-colors">
                                                                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/sub:bg-white transition-colors duration-300" />
                                                                    {sub.year}
                                                                </span>
                                                                <p className="text-xs text-gray-500 leading-relaxed group-hover/sub:text-gray-300 transition-colors duration-300">
                                                                    {sub.description}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}


const techStackCategories = {
    'AI & Agentic': [
        'LangGraph',
        'LangChain',
        'RAG',
        'ReAct',
        'Prompt Eng.',
        'n8n'
    ],
    'ML & Models': [
        'Python',
        'PyTorch',
        'Scikit-Learn',
        'Transformers',
        'LLMs (Llama/GPT)'
    ],
    'Web & Systems': [
        'React',
        'Node.js',
        'MongoDB',
        'Socket.io',
        'Express'
    ]
};
