import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { skills } from '../../data/content';

// Individual skill item with scroll-linked progress bar
function SkillItem({ skill, index, containerRef }) {
    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, margin: '-50px' });

    // Scroll-linked progress bar
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "center center"]
    });

    // Progress bar fills as you scroll to it
    const progressWidth = useTransform(
        scrollYProgress,
        [0, 0.8],
        [0, skill.proficiency]
    );

    // Icon float effect
    const iconY = useTransform(scrollYProgress, [0, 1], [20, -10]);
    const iconRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

    return (
        <motion.div
            ref={itemRef}
            className="group relative border-b border-gray-900 hover:border-white transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="py-6 lg:py-8 flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-8">

                {/* Left - Icon & Title */}
                <div className="flex items-start gap-6 flex-1">
                    <motion.span
                        className="text-4xl mt-1 opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ y: iconY, rotate: iconRotate }}
                    >
                        {skill.icon}
                    </motion.span>
                    <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                            {skill.category}
                        </h3>
                        {(skill.highlights || skill.highlight) && (
                            <div className="flex flex-wrap gap-3 mb-4">
                                {(skill.highlights || [{ text: skill.highlight, link: skill.link }]).map((badge, idx) => (
                                    badge.type === 'gold' ? (
                                        <motion.div
                                            key={idx}
                                            className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:-translate-y-0.5 transition-all duration-300 border border-yellow-300/50 group/gold"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                            transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                                        >
                                            <span className="text-sm animate-[bounce_2s_infinite]">🏆</span>
                                            <span className="text-xs text-black font-extrabold tracking-wide uppercase drop-shadow-sm">
                                                {badge.text}
                                            </span>
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 -translate-x-full group-hover/gold:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                                        </motion.div>
                                    ) : badge.link ? (
                                        <motion.a
                                            key={idx}
                                            href={badge.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group/link"
                                            onClick={(e) => e.stopPropagation()}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                        >
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            <span className="text-xs text-white font-medium tracking-wide group-hover/link:underline decoration-white/30 underline-offset-4">
                                                {badge.text}
                                            </span>
                                            <svg className="w-3 h-3 text-gray-400 group-hover/link:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </motion.a>
                                    ) : (
                                        <motion.div
                                            key={idx}
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10"
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                                            transition={{ delay: 0.4 + idx * 0.1 }}
                                        >
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            <span className="text-xs text-white font-medium tracking-wide">
                                                {badge.text}
                                            </span>
                                        </motion.div>
                                    )
                                ))}
                            </div>
                        )}
                        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-4">
                            {skill.description}
                        </p>

                        {/* Scroll-Linked Proficiency Bar */}
                        <div className="max-w-md">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-600 uppercase tracking-wider">Proficiency</span>
                                <motion.span
                                    className="text-xs text-white font-mono"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                >
                                    {skill.proficiency}%
                                </motion.span>
                            </div>
                            <div className="h-1.5 bg-gray-900 overflow-hidden rounded-full">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-full relative"
                                    style={{ width: useTransform(progressWidth, (v) => `${v}%`) }}
                                >
                                    {/* Shine effect on the progress bar */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        initial={{ x: "-100%" }}
                                        animate={isInView ? { x: "200%" } : {}}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Technologies & Achievement */}
                <div className="w-full lg:w-auto">
                    <div className="flex flex-col items-start lg:items-end gap-4 lg:gap-6">

                        {/* Technologies List with stagger */}
                        <div className="flex flex-wrap gap-2 max-w-full lg:max-w-xs lg:justify-end">
                            {skill.technologies.map((tech, i) => (
                                <motion.span
                                    key={i}
                                    className="text-xs text-gray-600 hover:text-white transition-colors cursor-default"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.05 }}
                                    whileHover={{ scale: 1.1, color: "#fff" }}
                                >
                                    {tech}
                                    {i < skill.technologies.length - 1 && ' /'}
                                </motion.span>
                            ))}
                        </div>

                        {/* 3D Holographic Card - Hidden on mobile */}
                        {skill.achievement && (
                            <div className="hidden lg:block">
                                <AchievementCard achievement={skill.achievement} isInView={isInView} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animated Hover Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white via-gray-400 to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Section-level scroll for the "02" number parallax
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="skills" className="relative bg-black py-32 overflow-hidden">
            {/* Minimal Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Section Label */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Expertise</span>
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
                                02
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Skills with Individual Scroll Tracking */}
                    <div className="lg:col-span-9 space-y-1">
                        {skills.map((skill, index) => (
                            <SkillItem
                                key={skill.id}
                                skill={skill}
                                index={index}
                                containerRef={ref}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Stats with Count Animation */}
                <motion.div
                    className="mt-16 lg:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto lg:ml-auto lg:mr-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {[
                        { value: "4+", label: "Areas" },
                        { value: "10+", label: "Technologies" },
                        { value: "225+", label: "LeetCode" }
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className={`text-center sm:text-right ${i < 2 ? 'sm:border-r border-gray-900' : ''} sm:pr-8`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1 + i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="text-4xl lg:text-5xl font-bold text-white mb-2"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs text-gray-600 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
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
