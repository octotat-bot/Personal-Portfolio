import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from '../ui/editorial';

const isLocal = (src) => typeof src === 'string' && src.startsWith('/');

// Side panel with a project's full write-up. The page itself stays short; this
// is where the detail lives.
export default function ProjectDrawer({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      // Keep Tab inside the panel while it's open.
      const items = panelRef.current.querySelectorAll('a[href], button, video[controls]');
      if (!items.length) return;
      const firstEl = items[0], lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus?.();
    };
  }, [project, onClose]);

  // Portalled to <body> so it sits above the nav, outside the content layer.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="drawer"
          className="fixed inset-0 z-[70] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button type="button" aria-label="Close details" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-black/30 backdrop-blur-[2px] cursor-default" />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-[640px] bg-bg md:rounded-l-[28px] shadow-lg overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 md:px-8 border-b border-rule bg-bg/95 backdrop-blur">
              <span className="chip !shadow-none">{project.year} · {project.status}</span>
              <button ref={closeRef} type="button" onClick={onClose} className="btn-ed !min-h-[36px] !px-3">
                Close <span aria-hidden>×</span>
              </button>
            </div>

            <div className="px-6 md:px-8 py-8 space-y-6">
              <div>
                <h2 id="drawer-title" className="font-display font-semibold text-[48px] md:text-[56px] tracking-[-0.045em] text-ink leading-none mb-5">{project.title}</h2>
                <p className="text-[17px] text-ink-2 leading-relaxed">{project.description}</p>
              </div>

              {isLocal(project.video) ? (
                <div className="rounded-2xl border border-rule aspect-video overflow-hidden bg-black shadow-md">
                  <video src={project.video} poster={isLocal(project.image) ? project.image : undefined} controls muted playsInline preload="none" className="w-full h-full object-cover" aria-label={`Demo recording of ${project.title}`} />
                </div>
              ) : isLocal(project.image) ? (
                <div className="media-frame rounded-2xl border border-rule aspect-[16/10] overflow-hidden shadow-md">
                  <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                </div>
              ) : null}

              <div className="card p-6">
                <div className="eyebrow !text-accent mb-3">The hard part</div>
                <p className="text-[16px] text-ink leading-relaxed">{project.challenges}</p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <li key={f} className="rounded-xl bg-surface border border-rule px-4 py-3 text-[14px] text-ink-2 flex gap-2.5">
                    <span aria-hidden className="text-accent">✓</span>{f}
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
                {project.tech.map((t) => (
                  <li key={t} className="h-8 px-3 inline-flex items-center rounded-full bg-sunk font-mono text-[12px] text-ink-2">{t}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid">
                    Live demo <ArrowUpRight /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn-ed">
                    Source <ArrowUpRight /><span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
