import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen bg-transparent flex items-center overflow-hidden">

            {/* Minimal Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-12 gap-8 items-center min-h-screen py-20">

                    {/* Left Side - Text */}
                    <div className="col-span-12 lg:col-span-7 space-y-12">

                        {/* Status Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-medium text-gray-300 tracking-wide">AVAILABLE FOR WORK</span>
                            </div>

                            <div className="h-px w-8 bg-gray-800 hidden sm:block"></div>

                            <div className="text-xs text-gray-500 tracking-widest uppercase flex items-center gap-2">
                                <span>Based in India</span>
                                <span className="text-lg leading-none">🇮🇳</span>
                            </div>
                        </motion.div>

                        {/* Title */}
                        <div className="relative">
                            <motion.h1
                                className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-none"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                MUKUND
                            </motion.h1>
                            <motion.h1
                                className="text-5xl md:text-8xl font-bold text-gray-500 tracking-tight leading-none"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                MANGLA.
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.div
                            className="max-w-md ml-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                Crafting digital experiences with clean code and creative solutions.
                                Specialized in full-stack development with a strong foundation in algorithms.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-2 gap-8 max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <div className="border-l border-gray-800 pl-4">
                                <div className="text-2xl font-bold text-white">225+</div>
                                <div className="text-xs text-gray-600 mt-1">LeetCode</div>
                            </div>
                            <div className="border-l border-gray-800 pl-4">
                                <div className="text-2xl font-bold text-white">10+</div>
                                <div className="text-xs text-gray-600 mt-1">technologies</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side - Photo (Original Style + Lines) */}
                    <div className="col-span-12 lg:col-span-5 relative hidden lg:flex items-center justify-center h-full min-h-[500px]">

                        {/* Frame Lines container */}
                        <div className="relative p-6 border border-white/5 rounded-2xl">
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40 rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40 rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40 rounded-br-lg" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="relative w-80 md:w-96 aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 border border-white/10"
                            >
                                <motion.img
                                    src="/mk_profile.png"
                                    alt="Mukund Mangla"
                                    className="w-full h-full object-cover" // Removed grayscale filter
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
                <span className="text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}
