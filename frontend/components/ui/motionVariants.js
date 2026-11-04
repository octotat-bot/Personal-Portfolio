// Shared Framer Motion variants (kept out of motion.jsx so that file only
// exports components, which fast refresh needs).
export const staggerItem = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
