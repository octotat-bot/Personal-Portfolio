import { useCallback, useState } from 'react';
import { stations } from '../../data/projects';
import { Reveal, ArrowUpRight } from '../ui/editorial';
import ProjectDrawer from './ProjectDrawer';

const byYearDesc = (a, b) => Number(b.year) - Number(a.year);
const featured = stations.filter((p) => p.tier === 'featured');
const indexProjects = [
  ...stations.filter((p) => p.tier === 'more').sort(byYearDesc),
  ...stations.filter((p) => p.tier === 'earlier').sort(byYearDesc),
];

const highlight = (i) => window.dispatchEvent(new CustomEvent('particles:highlight', { detail: i }));

// A tall block whose content sticks to the viewport while the particle field
// behind it holds this scene's shape.
function Scene({ shape, children, caption, tall = true }) {
  return (
    <div data-shape={shape} className={`relative ${tall ? 'md:h-[170vh]' : ''}`}>
      <div className="md:sticky md:top-0 min-h-[100svh] flex flex-col justify-end md:justify-center pb-[14vh] md:pb-0">
        <div className="container-ed">
          <div className="max-w-[560px]">
            {children}
            {caption && (
              <p className="eyebrow mt-8 pt-4 border-t border-rule max-w-[360px] leading-[1.9]">{caption}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Title({ parts, as = 'h3', id }) {
  const Tag = as;
  return (
    <Tag id={id} className="font-serif text-[64px] leading-[0.92] md:text-[104px] tracking-[-0.02em] text-ink">
      {parts[0]}<br /><em className="text-ink-2">{parts[1]}</em>
    </Tag>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" aria-labelledby="work-title" className="relative">
      <Scene shape="sphere">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center gap-4">01 — Work <span className="w-14 h-px bg-rule-strong" aria-hidden /></div>
          <h2 id="work-title" className="font-serif text-[64px] leading-[0.92] md:text-[112px] tracking-[-0.02em] text-ink">
            Built to <em className="text-ink-2">cite.</em><br />Built to <em className="text-ink-2">refuse.</em>
          </h2>
          <p className="mt-6 text-[14px] text-ink-2">Scroll. Each shape is how the project works.</p>
        </Reveal>
      </Scene>

      {featured.map((p) =>
        p.scenes.map((scene, si) => {
          const last = si === p.scenes.length - 1;
          return (
            <Scene key={`${p.id}-${scene.shape}`} shape={scene.shape} caption={scene.caption}>
              <Reveal>
                <div className="eyebrow mb-6 flex items-center gap-4">
                  {p.title} · {p.year} <span className="w-14 h-px bg-rule-strong" aria-hidden />
                </div>
                <Title parts={scene.title} id={si === 0 ? `project-${p.id}` : undefined} />
                {scene.line && <p className="mt-6 text-[14px] text-ink-2 max-w-[400px] leading-relaxed">{scene.line}</p>}
                {last && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid">
                        Live demo <ArrowUpRight /><span className="sr-only">for {p.title} (opens in a new tab)</span>
                      </a>
                    )}
                    <button type="button" onClick={() => setOpen(p)} className="btn-ed bg-black/40">
                      Details<span className="sr-only"> about {p.title}</span>
                    </button>
                  </div>
                )}
              </Reveal>
            </Scene>
          );
        })
      )}

      <Scene shape="ring" tall={false}>
        <Reveal>
          <div className="eyebrow mb-8 flex items-center gap-4">
            {indexProjects.length} more <span className="w-14 h-px bg-rule-strong" aria-hidden />
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-3" onMouseLeave={() => highlight(null)}>
            {indexProjects.map((p, i) => (
              <li key={p.id} id={`project-${p.id}`} className="scroll-mt-24">
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  onMouseEnter={() => highlight(i)}
                  onFocus={() => highlight(i)}
                  onBlur={() => highlight(null)}
                  className="group font-serif text-[26px] md:text-[30px] leading-tight text-ink-2 hover:text-ink focus-visible:text-ink transition-colors min-h-[44px] text-left"
                >
                  {p.title}
                  <sup className="font-mono text-[10px] text-ink-4 group-hover:text-ink-3 ml-1 align-super">{p.year}</sup>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 eyebrow">Select one for the full story</p>
        </Reveal>
      </Scene>

      <ProjectDrawer project={open} onClose={close} />
    </section>
  );
}
