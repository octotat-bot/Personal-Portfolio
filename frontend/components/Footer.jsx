import { contactInfo } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-bg border-t border-rule">
      <div className="container-ed py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-2xl text-ink">Mukund Mangla</span>
          <span className="eyebrow">© {year}</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] md:pr-36">
          <a href={`mailto:${contactInfo.email}`} className="link-ed min-h-[44px] inline-flex items-center">Email</a>
          <a href={contactInfo.social.github} target="_blank" rel="noreferrer" className="link-ed min-h-[44px] inline-flex items-center">GitHub</a>
          <a href={contactInfo.social.linkedin} target="_blank" rel="noreferrer" className="link-ed min-h-[44px] inline-flex items-center">LinkedIn</a>
          <button type="button" onClick={toTop} className="eyebrow hover:text-ink transition-colors min-h-[44px]">
            Back to top ↑
          </button>
        </nav>
      </div>
    </footer>
  );
}
