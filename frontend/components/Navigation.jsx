import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LINKS = [
  { id: 'projects', label: 'Work', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'skills', label: 'Toolkit', n: '03' },
  { id: 'contact', label: 'Contact', n: '04' },
];

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // The hero has its own name and actions, so the bar appears once the
  // visitor has scrolled past the first screen.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setMenuOpen(false);
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  const shown = visible || menuOpen;

  return (
    <>
      <a
        href="#projects"
        onClick={(e) => go(e, 'projects')}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn-ed btn-ed-solid"
      >
        Skip to work
      </a>

      <header
        className={`fixed inset-x-0 top-3 md:top-4 z-50 px-3 transition-[transform,opacity,visibility] duration-500 ${
          shown ? 'translate-y-0 opacity-100 visible' : '-translate-y-[140%] opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out)' }}
      >
        <div className="mx-auto max-w-[920px] h-14 pl-5 pr-2 flex items-center justify-between gap-4 rounded-full bg-white/90 backdrop-blur-md border border-rule shadow-md">
          <a href="#home" onClick={(e) => go(e, 'home')} className="font-display font-semibold tracking-[-0.02em] text-[17px] text-ink whitespace-nowrap min-h-[44px] inline-flex items-center gap-2.5">
            <span aria-hidden className="grid place-items-center w-7 h-7 rounded-full bg-ink text-surface text-[11px] font-bold tracking-normal">MM</span>
            Mukund Mangla
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`relative inline-flex items-center h-10 px-4 rounded-full text-[14px] font-medium transition-colors duration-300 ${
                      active === l.id ? 'text-white' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {/* One highlight that slides to the active link. */}
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid !min-h-[40px] !px-5 hidden sm:inline-flex !shadow-none">
              Resume
            </a>
            <button
              type="button"
              className="md:hidden btn-ed !min-h-[40px] !px-4 !shadow-none"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[76px] z-40 md:hidden card !shadow-lg p-3"
          >
            <nav aria-label="Mobile">
              <ul>
                {LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => go(e, l.id)}
                      className={`flex items-center justify-between px-4 py-4 rounded-2xl font-display font-semibold text-[28px] tracking-[-0.03em] ${active === l.id ? 'bg-sunk text-ink' : 'text-ink'}`}
                    >
                      {l.label}
                      <span className="font-mono text-[12px] text-ink-3">{l.n}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid w-full mt-3">
                Resume (PDF)
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
