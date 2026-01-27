import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../../data/content';
import Magnetic from '../Magnetic';

export default function Projects() {
    const ref = useRef(null);

    // Section-level scroll for the "03" number parallax
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="work" className="relative bg-black py-32 overflow-hidden">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

                {/* Section Label with Animated Line */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Selected Works</span>
                        <motion.div
                            className="flex-1 h-px bg-gray-900"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 relative">
                    {/* Left Column - Sticky Number with Parallax */}
                    <div className="hidden lg:block lg:col-span-4 relative z-0">
                        <motion.div
                            className="sticky top-32"
                            style={{ y: numberY, opacity: numberOpacity }}
                        >
                            <div className="text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-none text-white/5 gradient-text-animated select-none pointer-events-none">
                                03
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-8 relative z-10">

                        {/* Projects List */}
                        <div className="space-y-16 lg:space-y-32">
                            {projects.map((project, index) => (
                                <ProjectItem key={project.id} project={project} index={index} />
                            ))}
                        </div>

                        {/* View All Projects Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mt-16 lg:mt-32 flex justify-center lg:justify-start"
                        >
                            <Magnetic>
                                <a
                                    href="https://github.com/Hakka123?tab=repositories"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-wider hover:bg-gray-200 transition-colors"
                                >
                                    <span>SEE MORE PROJECTS</span>
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </Magnetic>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectItem({ project, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax Effects
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Reduced motion since context is narrower
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    // 3D Rotation based on scroll
    const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className={`flex flex-col gap-8 lg:gap-12 xl:gap-16 items-center perspective-1000 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
            {/* Image Section with 3D Tilt */}
            <div className="w-full lg:w-3/5 group relative perspective-1000">
                <motion.div
                    className="relative overflow-hidden rounded-xl aspect-[16/10] bg-gray-900 shadow-2xl"
                    style={{
                        rotateX: rotateX,
                        transformStyle: "preserve-3d"
                    }}
                    whileHover={{ scale: 1.02, rotateX: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />

                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top origin-top transition-all duration-700"
                        style={{ scale: 1.1 }}
                        whileHover={{ scale: 1.05 }}
                    />

                    {/* Noise Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-20"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    {/* Floating Links */}
                    <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-30 flex gap-4 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {project.link && (
                            <Magnetic>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs tracking-wider hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    VISIT
                                </a>
                            </Magnetic>
                        )}
                        {project.github && (
                            <Magnetic>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"
                                >
                                    CODE
                                </a>
                            </Magnetic>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Content Section with Staggered Entrance */}
            <div className="w-full lg:w-2/5 flex flex-col items-center text-center lg:items-start lg:text-left">

                {/* Index Number */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 lg:mb-6"
                >
                    <div className="text-xs font-mono text-amber-500/80 mb-2 tracking-widest uppercase">Featured Project</div>
                    <div className="text-6xl font-black text-white/20 font-mono select-none">
                        0{index + 1}
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 tracking-tight leading-none"
                >
                    {project.title}
                </motion.h3>

                {/* Tech Stack Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-6 lg:mb-8 justify-center lg:justify-start"
                >
                    {project.technologies.slice(0, 4).map((tech, i) => (
                        <div
                            key={i}
                            className="px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/30 backdrop-blur-sm text-xs text-gray-400 font-medium uppercase tracking-wider hover:border-white/30 hover:text-white transition-colors"
                        >
                            {tech}
                        </div>
                    ))}
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg mb-6 lg:mb-8 max-w-md"
                >
                    {project.description}
                </motion.p>

                {/* Stats Grid */}
                {project.stats && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-gray-800 w-full"
                    >
                        {Object.entries(project.stats).slice(0, 2).map(([key, value], i) => (
                            <div key={i}>
                                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{key}</div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
