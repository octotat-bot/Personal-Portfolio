import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Motion vocabulary borrowed from the Repetite site: headlines rise out of a
// mask, headings light up word by word with scroll, chips drop in and bob,
// devices lift with a tilt, numbers count up. Every piece renders its final
// state when the visitor prefers reduced motion.

const EASE_OUT = [0.16, 1, 0.3, 1];
const OVERSHOOT = [0.3, 1.45, 0.5, 1];

// parts: [{ text, className }] so one word group can carry the accent colour.
function toWords(parts) {
  const words = [];
  parts.forEach((p) => p.text.split(/\s+/).filter(Boolean).forEach((w) => words.push({ w, className: p.className })));
  return words;
}

function ScrollWord({ word, className, progress, index, total, mode }) {
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const opacity = useTransform(progress, [start, end], mode === 'land' ? [0, 1] : [0.16, 1]);
  const scale = useTransform(progress, [start, end], mode === 'land' ? [1.7, 1] : [1, 1]);
  const y = useTransform(progress, [start, end], mode === 'land' ? ['-0.25em', '0em'] : ['0.12em', '0em']);
  return (
    <motion.span aria-hidden className={`inline-block will-change-transform ${className ?? ''}`} style={{ opacity, scale, y, transformOrigin: 'left bottom' }}>
      {word}
    </motion.span>
  );
}

// Heading whose words light up (mode "lit") or land (mode "land") as it
// scrolls through the viewport.
export function ScrollWords({ parts, as = 'h2', className, id, mode = 'lit' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'land' ? ['start 0.95', 'start 0.55'] : ['start 0.9', 'start 0.45'],
  });
  const Tag = as;
  const words = toWords(parts);
  const label = parts.map((p) => p.text).join(' ');
  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {parts.map((p, i) => <span key={i} className={p.className}>{p.text}{i < parts.length - 1 ? ' ' : ''}</span>)}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} id={id} className={className} aria-label={label}>
      {words.map(({ w, className: c }, i) => (
        <span key={i}>
          <ScrollWord word={w} className={c} progress={scrollYProgress} index={i} total={words.length} mode={mode} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

// Lines rise out of a clipping mask, one after another, when first in view.
export function MaskLines({ lines, as = 'h2', className, id, delay = 0 }) {
  const reduce = useReducedMotion();
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pt-[0.08em] pb-[0.04em] -mt-[0.08em] -mb-[0.04em]">
          <motion.span
            className={`inline-block ${line.className ?? ''}`}
            initial={reduce ? false : { y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, delay: delay + i * 0.14, ease: EASE_OUT }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Drops in from above with a blur and an overshoot, then bobs gently.
export function DropIn({ children, className, delay = 0, bob = true }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: -28, scale: 0.9, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.8, delay, ease: OVERSHOOT }}
    >
      <motion.div
        animate={inView && bob ? { y: [0, -7, 0] } : undefined}
        transition={{ duration: 6.5, delay: delay + 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Lifts into place with a 3D tilt, like a phone being picked up.
export function Lift({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 110, rotateX: 26, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 1.2, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// Children pop in one after another (chips, pills, tiles).
export function Stagger({ children, className, as = 'ul', step = 0.04, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.ul;
  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ shown: { transition: { staggerChildren: step, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}


// Counts up to a number the first time it is seen. Non-numeric values
// (e.g. "225+") count to their number and keep the suffix.
export function CountUp({ value, className, duration = 1.2 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const str = String(value ?? '');
  const match = str.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  const animated = target !== null && !reduce;
  const [shown, setShown] = useState(`0${suffix}`);

  useEffect(() => {
    if (!animated || !inView) return undefined;
    const controls = animate(0, target, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setShown(`${Math.round(v).toLocaleString('en-US')}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, animated, target, suffix, duration]);

  return <span ref={ref} className={className}>{animated ? shown : str}</span>;
}

// Soft blurred blobs that drift slowly behind a surface.
export function DriftBlobs({ className = '', colors = ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.22)'] }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: colors[0] }}
        animate={reduce ? undefined : { x: [0, -70, 0], y: [0, 50, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-20 -bottom-32 w-[380px] h-[380px] rounded-full blur-3xl"
        style={{ background: colors[1] }}
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -60, 0], scale: [1, 0.92, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
