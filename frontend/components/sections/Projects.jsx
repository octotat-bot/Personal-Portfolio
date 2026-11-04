import { lazy, Suspense, useCallback, useState } from 'react';
import { stations } from '../../data/projects';
import { timeline } from '../../data/content';
import { Reveal, ArrowUpRight, ArrowRight } from '../ui/editorial';
import ProjectDrawer from './ProjectDrawer';

// Three.js only loads once the Work section mounts, in its own chunk.
const ParticleField = lazy(() => import('../particles/ParticleField'));

const byYearDesc = (a, b) => Number(b.year) - Number(a.year);
const featured = stations.filter((p) => p.tier === 'featured');
const indexProjects = [
  ...stations.filter((p) => p.tier === 'more').sort(byYearDesc),
  ...stations.filter((p) => p.tier === 'earlier').sort(byYearDesc),
];

const highlight = (i) => window.dispatchEvent(new CustomEvent('particles:highlight', { detail: i }));

// One chapter of the scroll story. data-shape tells the stage which shape to hold.
function Scene({ shape, children, last = false }) {
  return (
    <div data-shape={shape} className={`flex flex-col justify-end md:justify-center ${last ? 'min-h-[70svh] md:min-h-[90vh]' : 'min-h-[80svh] md:min-h-[105vh]'} pt-10 pb-[10svh] md:py-10`}>
      {children}
    </div>
  );
}

function Title({ parts, id }) {
  return (
    <h3 id={id} className="font-display font-semibold text-[40px] md:text-[76px] leading-[0.95] tracking-[-0.04em] text-ink">
      {parts[0]} <span className="text-accent">{parts[1]}</span>
    </h3>
  );
}

function Caption({ children }) {
  return (
    <p className="mt-6 inline-flex items-start gap-2.5 max-w-[420px] rounded-2xl bg-surface border border-rule px-4 py-3 shadow-sm">
      <span aria-hidden className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
      <span className="font-mono text-[12px] leading-relaxed text-ink-2">{children}</span>
    </p>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" aria-labelledby="work-title" className="relative pt-24 md:pt-32 pb-10">
      <div className="container-ed grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-10 lg:gap-x-16">
        {/* Stage: sticky card that holds the particle field. First on mobile so it sits on top. */}
        <div className="md:order-2 md:self-start sticky top-[76px] md:top-24 z-10 h-[32svh] md:h-[calc(100vh-128px)] mb-6 md:mb-0">
          <div className="relative h-full card !shadow-md overflow-hidden bg-gradient-to-b from-white to-raised">
            <div aria-hidden className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(rgba(20,20,20,0.08) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
            <Suspense fallback={null}>
              <ParticleField projectCount={indexProjects.length} timelineCount={timeline.length} className="relative" />
            </Suspense>
            <span className="absolute left-4 bottom-4 eyebrow !text-[10px]">Live render · scroll to morph</span>
          </div>
        </div>

        <div className="md:order-1 relative">
          <Scene shape="sphere">
            <Reveal>
              <span className="chip mb-6"><span className="text-accent">01</span><span aria-hidden className="w-px h-3 bg-rule-strong" />Selected work</span>
              <h2 id="work-title" className="font-display font-semibold text-[52px] md:text-[84px] leading-[0.92] tracking-[-0.045em] text-ink">
                Built to <span className="text-accent">cite.</span><br />Built to <span className="text-accent">refuse.</span>
              </h2>
              <p className="mt-6 text-[17px] text-ink-2 max-w-[380px]">Scroll. Each shape is how the project works.</p>
            </Reveal>
          </Scene>

          {featured.map((p) =>
            p.scenes.map((scene, si) => {
              const lastScene = si === p.scenes.length - 1;
              return (
                <Scene key={`${p.id}-${scene.shape}`} shape={scene.shape}>
                  <Reveal>
                    <span className="chip mb-6">{p.title}<span aria-hidden className="w-px h-3 bg-rule-strong" />{p.year}</span>
                    <Title parts={scene.title} id={si === 0 ? `project-${p.id}` : undefined} />
                    {scene.line && <p className="mt-5 text-[17px] text-ink-2 max-w-[400px] leading-relaxed">{scene.line}</p>}
                    {scene.caption && <Caption>{scene.caption}</Caption>}
                    {lastScene && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer" className="btn-ed btn-ed-solid">
                            Live demo <ArrowUpRight /><span className="sr-only">for {p.title} (opens in a new tab)</span>
                          </a>
                        )}
                        <button type="button" onClick={() => setOpen(p)} className="btn-ed">
                          Case study <ArrowRight /><span className="sr-only"> for {p.title}</span>
                        </button>
                      </div>
                    )}
                  </Reveal>
                </Scene>
              );
            })
          )}

          <Scene shape="ring" last>
            <Reveal>
              <span className="chip mb-6"><span className="text-accent">{indexProjects.length}</span><span aria-hidden className="w-px h-3 bg-rule-strong" />More projects</span>
              <h3 className="font-display font-semibold text-[40px] md:text-[56px] leading-[0.98] tracking-[-0.04em] text-ink mb-8">
                Everything <span className="text-accent">else.</span>
              </h3>
              <ul className="flex flex-wrap gap-2.5" onMouseLeave={() => highlight(null)}>
                {indexProjects.map((p, i) => (
                  <li key={p.id} id={`project-${p.id}`} className="scroll-mt-28">
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      onMouseEnter={() => highlight(i)}
                      onFocus={() => highlight(i)}
                      onBlur={() => highlight(null)}
                      className="group inline-flex items-center gap-2.5 h-11 pl-4 pr-3 rounded-full bg-surface border border-rule shadow-sm text-[15px] font-medium text-ink hover:border-accent hover:text-accent hover:shadow-md transition-all"
                    >
                      {p.title}
                      <span className="font-mono text-[11px] text-ink-3 group-hover:text-accent">{p.year}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] text-ink-3">Hover a project to find it in the ring. Select it for details.</p>
            </Reveal>
          </Scene>
        </div>
      </div>

      <ProjectDrawer project={open} onClose={close} />
    </section>
  );
}
