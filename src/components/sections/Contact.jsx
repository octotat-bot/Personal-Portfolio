import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { contactInfo } from '../../data/content';

// Animated letter component for wave effect
function AnimatedLetter({ letter, index, isInView }) {
    return (
        <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
            } : {}}
            transition={{
                duration: 0.6,
                delay: 0.5 + index * 0.03,
                type: "spring",
                stiffness: 100,
                damping: 12
            }}
            whileHover={{
                scale: 1.1,
                color: "#fff",
                transition: { duration: 0.2 }
            }}
        >
            {letter === " " ? "\u00A0" : letter}
        </motion.span>
    );
}

// Animated word that handles full words
function AnimatedWord({ word, startIndex, isInView, className }) {
    return (
        <span className={className}>
            {word.split("").map((letter, i) => (
                <AnimatedLetter
                    key={startIndex + i}
                    letter={letter}
                    index={startIndex + i}
                    isInView={isInView}
                />
            ))}
        </span>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
    const [errors, setErrors] = useState({});
    const [emailCopied, setEmailCopied] = useState(false);

    // Scroll-linked parallax for the "04" number
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const numberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const numberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simple mailto fallback - opens email client
        const mailtoLink = `mailto:${contactInfo.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;

        window.location.href = mailtoLink;

        // Reset form and show success
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
            setSubmitStatus('success');
            setIsSubmitting(false);
        }, 500);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(contactInfo.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <section id="contact" className="relative bg-black py-32 overflow-hidden">
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
                        <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Get In Touch</span>
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
                                04
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Contact */}
                    <div className="lg:col-span-9">

                        {/* Large CTA with Wave Typography Animation */}
                        <motion.div
                            className="mb-20"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 lg:mb-8" style={{ perspective: "1000px" }}>
                                <div className="text-white overflow-hidden">
                                    <AnimatedWord word="Let's" startIndex={0} isInView={isInView} className="" />
                                    <span> </span>
                                    <AnimatedWord word="work" startIndex={6} isInView={isInView} className="" />
                                </div>
                                <div className="overflow-hidden">
                                    <AnimatedWord
                                        word="together"
                                        startIndex={11}
                                        isInView={isInView}
                                        className="text-gray-600 gradient-text-animated"
                                    />
                                </div>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                            {/* Contact Info */}
                            <motion.div
                                className="space-y-12"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div>
                                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">Email</div>
                                    <div className="flex items-center gap-4">
                                        <a href={`mailto:${contactInfo.email}`} className="text-xl text-white hover:text-gray-400 transition-colors">
                                            {contactInfo.email}
                                        </a>
                                        <button
                                            onClick={copyEmail}
                                            className="px-3 py-1 text-xs border border-gray-800 hover:border-white text-gray-500 hover:text-white transition-all"
                                        >
                                            {emailCopied ? '✓ COPIED' : 'COPY'}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">Location</div>
                                    <div className="text-xl text-white">{contactInfo.location}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-3">Status</div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        <span className="text-sm text-white">{contactInfo.availability}</span>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="pt-8 border-t border-gray-900">
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
                            </motion.div>

                            {/* Contact Form */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-gray-900 focus:border-white'} py-4 text-white placeholder-gray-600 outline-none transition-colors`}
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-red-500 mt-2">{errors.name}</p>}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-900 focus:border-white'} py-4 text-white placeholder-gray-600 outline-none transition-colors`}
                                        required
                                    />
                                    {errors.email && <p className="text-xs text-red-500 mt-2">{errors.email}</p>}
                                </div>

                                <div>
                                    <textarea
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-gray-900 focus:border-white'} py-4 text-white placeholder-gray-600 outline-none resize-none transition-colors`}
                                        required
                                    />
                                    {errors.message && <p className="text-xs text-red-500 mt-2">{errors.message}</p>}
                                </div>

                                {/* Success/Error Message */}
                                {submitStatus === 'success' && (
                                    <div className="text-sm text-white bg-white/10 border border-white/20 px-4 py-3">
                                        ✓ Message sent! I'll get back to you soon.
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="text-sm text-white bg-red-500/10 border border-red-500/20 px-4 py-3">
                                        ✗ Something went wrong. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative px-8 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-200 transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
