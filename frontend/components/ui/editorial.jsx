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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Numbered section opener: "01 — Work" with a hairline rule, then a serif title.
export function SectionHeader({ number, label, title, intro, id }) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="eyebrow text-ink-2">{number}</span>
        <span className="eyebrow">{label}</span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>
      <Reveal>
        <h2 id={id} className="font-serif text-[40px] leading-[1.05] md:text-6xl lg:text-7xl tracking-[-0.01em] text-ink max-w-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-2xl text-ink-2 text-[15px] leading-relaxed">{intro}</p>
        )}
      </Reveal>
    </header>
  );
}

export function ArrowUpRight({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="square" />
    </svg>
  );
}
