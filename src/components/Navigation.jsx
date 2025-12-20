import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeCanvas, setActiveCanvas] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll Progress
    const { scrollYProgress } = useScroll();
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);

            // Updating active section based on scroll position
            const sections = ['home', 'about', 'skills', 'work', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300 && rect.bottom >= 300) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { id: 'home', label: 'Start' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Expertise' },
        { id: 'work', label: 'Work' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <div
                    className={`
            pointer-events-auto
            flex items-center gap-2 p-2 
            backdrop-blur-3xl border border-white/20
            rounded-full shadow-2xl shadow-black/50
            transition-all duration-500 ease-out overflow-hidden relative
            hover:border-white/30 hover:shadow-white/10
            ${scrolled ? 'scale-95 px-4' : 'scale-100'}
          `}
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02), rgba(255,255,255,0.05))',
                        backdropFilter: 'blur(20px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                    }}
                >
                    {/* Animated Liquid Gradient Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"
                            style={{
                                animation: 'gradient 8s ease infinite',
                                backgroundSize: '200% 200%'
                            }}
                        />
                    </div>

                    {/* Glass Reflection Effect */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                    {/* Shimmer Effect */}
                    <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            animation: 'shimmer 3s infinite',
                        }}
                    />

                    {/* Subtle Noise Texture */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    {/* Logo with Scroll Progress Ring */}
                    <div className="relative">
                        <svg className="absolute -top-1 -left-1 w-12 h-12 -rotate-90 pointer-events-none">
                            <circle
                                cx="24"
                                cy="24"
                                r="18"
                                stroke="rgba(255, 255, 255, 0.2)"
                                strokeWidth="2"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="18"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                fill="transparent"
                                style={{ pathLength }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <Magnetic>
                            <button
                                onClick={() => scrollToSection('home')}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 text-black flex items-center justify-center font-bold text-sm hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 relative z-10"
                            >
                                M
                            </button>
                        </Magnetic>
                    </div>

                    {/* Desktop Links with Liquid Glass Effect */}
                    <div className="hidden md:flex items-center px-2 gap-1">
                        {navLinks.map((link) => (
                            <Magnetic key={link.id}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`
                                        relative px-5 py-2.5 text-xs uppercase tracking-wider font-medium 
                                        transition-all duration-300 rounded-full
                                        ${activeSection === link.id
                                            ? 'text-white bg-white/20 shadow-lg shadow-white/10'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }
                                    `}
                                    style={activeSection === link.id ? {
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                    } : {}}
                                >
                                    <span className="relative z-10">{link.label}</span>

                                    {/* Active Indicator with Glow */}
                                    {activeSection === link.id && (
                                        <>
                                            <motion.div
                                                layoutId="activeDot"
                                                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_3px_rgba(255,255,255,0.8)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                            {/* Subtle glow behind active item */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-full blur-sm -z-10" />
                                        </>
                                    )}
                                </button>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Mobile Menu Button with Magnetic */}
                    <Magnetic>
                        <button
                            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-white/10 transition-colors relative z-10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="w-4 h-px bg-white block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-4 h-px bg-white block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                className="w-4 h-px bg-white block"
                            />
                        </button>
                    </Magnetic>

                    {/* Download Resume Button with Magnetic */}
                    <Magnetic>
                        <a
                            href="/resume.pdf"
                            download="Mukund_Mangla_Resume.pdf"
                            className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-white/10 to-white/5 text-white text-xs uppercase tracking-wider font-bold rounded-full border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Resume
                        </a>
                    </Magnetic>

                    {/* Contact Button with Magnetic */}
                    <Magnetic>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="hidden md:block px-6 py-3 bg-white text-black text-xs uppercase tracking-wider font-bold rounded-full hover:bg-gray-200 transition-colors"
                        >
                            Talk
                        </button>
                    </Magnetic>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-4xl font-light text-white/50 hover:text-white transition-colors relative"
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <motion.div
                                            className="absolute -right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                                        />
                                    )}
                                </motion.button>
                            ))}

                            {/* Resume Download Button for Mobile */}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                href="/resume.pdf"
                                download="Mukund_Mangla_Resume.pdf"
                                className="mt-8 flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-white/10 to-white/5 text-white text-sm uppercase tracking-wider font-bold rounded-full border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
