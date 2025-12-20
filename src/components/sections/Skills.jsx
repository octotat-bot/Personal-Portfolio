import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { skills } from '../../data/content';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="relative bg-black py-32 overflow-hidden">
            {/* Minimal Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* Section Label */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Expertise</span>
                        <div className="flex-1 h-px bg-gray-900" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-12 gap-16">

                    {/* Left Column - Large Number */}
                    <div className="col-span-12 lg:col-span-3">
                        <motion.div
                            className="sticky top-32"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <div className="text-[12rem] font-bold leading-none text-white/5 gradient-text-animated">
                                02
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Skills */}
                    <div className="col-span-12 lg:col-span-9 space-y-1">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.id}
                                className="group relative border-b border-gray-900 hover:border-white transition-all duration-300"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            >
                                <div className="py-8 flex items-start justify-between gap-8">

                                    {/* Left - Icon & Title */}
                                    <div className="flex items-start gap-6 flex-1">
                                        <span className="text-4xl mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                            {skill.icon}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                                                {skill.category}
                                            </h3>
                                            {(skill.highlights || skill.highlight) && (
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    {(skill.highlights || [{ text: skill.highlight, link: skill.link }]).map((badge, idx) => (
                                                        badge.type === 'gold' ? (
                                                            <div key={idx} className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:-translate-y-0.5 transition-all duration-300 border border-yellow-300/50 group/gold">
                                                                <span className="text-sm animate-[bounce_2s_infinite]">🏆</span>
                                                                <span className="text-xs text-black font-extrabold tracking-wide uppercase drop-shadow-sm">
                                                                    {badge.text}
                                                                </span>
                                                                {/* Shine Effect */}
                                                                <div className="absolute inset-0 -translate-x-full group-hover/gold:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                                                            </div>
                                                        ) : badge.link ? (
                                                            <a
                                                                key={idx}
                                                                href={badge.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group/link"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                                <span className="text-xs text-white font-medium tracking-wide group-hover/link:underline decoration-white/30 underline-offset-4">
                                                                    {badge.text}
                                                                </span>
                                                                <svg className="w-3 h-3 text-gray-400 group-hover/link:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        ) : (
                                                            <div key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
                                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                                <span className="text-xs text-white font-medium tracking-wide">
                                                                    {badge.text}
                                                                </span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-4">
                                                {skill.description}
                                            </p>

                                            {/* Proficiency Bar */}
                                            <div className="max-w-md">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-gray-600 uppercase tracking-wider">Proficiency</span>
                                                    <span className="text-xs text-white font-mono">{skill.proficiency}%</span>
                                                </div>
                                                <div className="h-1 bg-gray-900 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-white to-gray-400"
                                                        initial={{ width: 0 }}
                                                        animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                                                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Technologies & Achievement */}
                                    <div className="hidden md:block">
                                        <div className="flex flex-col items-end gap-6">

                                            {/* Technologies List */}
                                            <div className="flex flex-wrap gap-2 max-w-xs justify-end">
                                                {skill.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs text-gray-600 hover:text-white transition-colors"
                                                    >
                                                        {tech}
                                                        {i < skill.technologies.length - 1 && ' /'}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* 3D Holographic Card */}
                                            {skill.achievement && (
                                                <AchievementCard achievement={skill.achievement} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Line */}
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    className="mt-32 grid grid-cols-3 gap-8 max-w-2xl ml-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <div className="text-right border-r border-gray-900 pr-8">
                        <div className="text-5xl font-bold text-white mb-2">4+</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Areas</div>
                    </div>
                    <div className="text-right border-r border-gray-900 pr-8">
                        <div className="text-5xl font-bold text-white mb-2">10+</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Technologies</div>
                    </div>
                    <div className="text-right pr-8">
                        <div className="text-5xl font-bold text-white mb-2">225+</div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">LeetCode</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function AchievementCard({ achievement }) {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const resetRotation = () => setRotate({ x: 0, y: 0 });

    return (
        <motion.div
            ref={cardRef}
            className="relative w-64 h-40 rounded-xl cursor-default perspective-1000 group/card"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="w-full h-full rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 relative overflow-hidden shadow-2xl"
                animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

                {/* Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
                            {achievement.icon}
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                            ACHIEVEMENT UNLOCKED
                        </span>
                    </div>

                    <div>
                        <div className="text-xs text-amber-500 font-bold mb-1 tracking-wide">
                            {achievement.title}
                        </div>
                        <div className="text-white text-sm font-medium leading-tight shadow-black drop-shadow-md">
                            {achievement.description}
                        </div>
                    </div>

                    {/* Rarity Badge */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rotate-90 origin-center flex gap-1">
                        <span className="text-[10px] text-gray-700 font-mono tracking-widest">{achievement.rank}</span>
                    </div>
                </div>

                {/* Animated Border Gradient */}
                <div className="absolute inset-0 p-px rounded-xl bg-gradient-to-br from-amber-300/50 via-transparent to-amber-300/50 opacity-50" style={{ transform: "translateZ(0px)" }} />
            </motion.div>
        </motion.div>
    );
}
