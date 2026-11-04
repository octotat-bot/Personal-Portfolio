import { motion, useReducedMotion } from 'framer-motion';

// Fade-and-rise on first entry into the viewport. Under reduced motion the
// content renders in its final state with no movement.
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Section opener: a numbered chip, a big grotesk title and an optional intro.
export function SectionHeader({ number, label, title, intro, id, className = '' }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${className}`}>
      <span className="chip mb-6">
        <span className="text-accent">{number}</span>
        <span aria-hidden className="w-px h-3 bg-rule-strong" />
        {label}
      </span>
      <h2 id={id} className="font-display font-semibold text-[44px] leading-[0.98] md:text-[72px] tracking-[-0.035em] text-ink max-w-4xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-ink-2 text-[17px] leading-relaxed">{intro}</p>}
    </Reveal>
  );
}

export function ArrowUpRight({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
