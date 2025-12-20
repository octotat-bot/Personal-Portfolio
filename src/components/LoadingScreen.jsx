import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoadingComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Smooth progress animation using requestAnimationFrame
        const duration = 3000; // 3 seconds
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(Math.round(newProgress));

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => onLoadingComplete(), 500);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onLoadingComplete]);

    // Split name into letters for staggered animation
    const name = "MUKUND MANGLA";
    const letters = name.split('');

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="text-center relative z-10">
                {/* Large MM Logo */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="relative">
                        {/* MM with gradient effect */}
                        <div className="text-[8rem] font-bold text-white leading-none tracking-tighter">
                            MM
                        </div>
                        {/* Animated Underline */}
                        <motion.div
                            className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-4"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

                {/* Staggered Letter Animation for Name */}
                <div className="text-sm tracking-[0.3em] mb-8 h-6">
                    {letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            className={letter === ' ' ? 'inline-block w-2' : 'inline-block text-gray-400'}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.5 + (index * 0.05),
                                ease: "easeOut"
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* Large Elegant Progress Counter */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="relative inline-block">
                        <span className="text-6xl font-bold text-white tabular-nums">
                            {progress}
                        </span>
                        <span className="text-2xl font-light text-gray-500 ml-1">%</span>
                    </div>
                </motion.div>

                {/* Minimal Progress Bar */}
                <motion.div
                    className="w-64 h-px bg-gray-900 mx-auto relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-white"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    {/* Glow effect on progress */}
                    <motion.div
                        className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent blur-sm"
                        style={{ left: `${Math.max(0, progress - 8)}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    className="text-xs text-gray-600 mt-6 tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    LOADING EXPERIENCE
                </motion.div>
            </div>

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }} />
            </div>
        </motion.div>
    );
}
