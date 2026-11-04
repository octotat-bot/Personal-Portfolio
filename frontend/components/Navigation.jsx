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
        className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-black/90 backdrop-blur-sm transition-[transform,opacity,visibility] duration-500 ${
          shown ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-out)' }}
      >
        <div className="container-ed h-14 flex items-center justify-between gap-6">
          <a href="#home" onClick={(e) => go(e, 'home')} className="font-serif text-xl text-ink whitespace-nowrap min-h-[44px] inline-flex items-center">
            Mukund Mangla
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`inline-flex items-center gap-2 min-h-[44px] text-[12px] uppercase tracking-[0.14em] transition-colors ${
                      active === l.id ? 'text-ink' : 'text-ink-3 hover:text-ink'
                    }`}
                  >
                    <span className={`text-[10px] ${active === l.id ? 'text-ink-3' : 'text-ink-4'}`}>{l.n}</span>
                    <span className={`border-b ${active === l.id ? 'border-ink' : 'border-transparent'} pb-0.5`}>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid !min-h-[36px] !px-4 hidden sm:inline-flex">
              Resume
            </a>
            <button
              type="button"
              className="md:hidden btn-ed !px-3"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 z-40 bg-bg md:hidden"
          >
            <nav aria-label="Mobile" className="container-ed pt-6">
              <ul className="border-t border-rule">
                {LINKS.map((l) => (
                  <li key={l.id} className="border-b border-rule">
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => go(e, l.id)}
                      className="flex items-baseline gap-4 py-5 font-serif text-4xl text-ink"
                    >
                      <span className="font-mono text-[12px] text-ink-3">{l.n}</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid w-full mt-8">
                Resume (PDF)
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
