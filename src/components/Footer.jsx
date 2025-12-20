import { motion } from 'framer-motion';
import { contactInfo } from '../data/content';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-black border-t border-gray-900 py-16 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="grid md:grid-cols-3 gap-12 mb-16">

                    {/* Brand */}
                    <div>
                        <motion.div
                            className="text-4xl font-bold text-white mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            MM
                        </motion.div>
                        <p className="text-sm text-gray-600 max-w-xs">
                            Building digital experiences with clean code and creative solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider mb-4">Navigate</div>
                        <div className="space-y-2">
                            {['About', 'Expertise', 'Work', 'Contact'].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="block text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider mb-4">Connect</div>
                        <div className="space-y-2">
                            {Object.entries(contactInfo.social).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-gray-500 hover:text-white transition-colors capitalize"
                                >
                                    {platform} →
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-900">
                    <div className="text-xs text-gray-600">
                        © {currentYear} Mukund Mangla. All rights reserved.
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-xs text-gray-600 hover:text-white transition-colors"
                    >
                        <span>BACK TO TOP</span>
                        <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
