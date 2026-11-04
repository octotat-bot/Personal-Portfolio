import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { stations } from '../../data/projects';
import { Reveal, SectionHeader, ArrowUpRight } from '../ui/editorial';

const byYearDesc = (a, b) => Number(b.year) - Number(a.year);
const featured = stations.filter((p) => p.tier === 'featured');
const more = stations.filter((p) => p.tier === 'more').sort(byYearDesc);
const earlier = stations.filter((p) => p.tier === 'earlier').sort(byYearDesc);

// Stock photos are not evidence of anything, so only images and video that
// live in /public are shown.
const isLocal = (src) => typeof src === 'string' && src.startsWith('/');

function ProjectLinks({ project, compact = false }) {
  const cls = compact ? 'link-ed inline-flex items-center gap-1.5 text-[13px] min-h-[44px]' : 'btn-ed';
  return (
    <div className={`flex flex-wrap ${compact ? 'gap-x-6' : 'gap-3'}`}>
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className={`${cls} ${compact ? '' : 'btn-ed-solid'}`}>
          Live demo <ArrowUpRight />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className={cls}>
          Source <ArrowUpRight />
          <span className="sr-only">code for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function TechList({ tech }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-3" aria-label="Built with">
      {tech.map((t, i) => (
        <li key={t}>
          {t}
          {i < tech.length - 1 && <span aria-hidden className="ml-3 text-ink-4">/</span>}
        </li>
      ))}
    </ul>
  );
}

function CaseStudy({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="border-t border-rule pt-10 md:pt-14 pb-16 md:pb-24 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <Reveal className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <span className="eyebrow text-ink-2">Case study {String(index + 1).padStart(2, '0')}</span>
            <span className="eyebrow">{project.year} · {project.status}</span>
          </div>
          <h3 id={`project-${project.id}-title`} className="font-serif text-5xl md:text-6xl leading-none text-ink mb-6">
            {project.title}
          </h3>
          <p className="text-ink-2 leading-relaxed mb-8">{project.description}</p>

          <div className="border-l border-rule-strong pl-5 mb-8">
            <div className="eyebrow mb-3">The hard part</div>
            <p className="text-ink text-[14px] leading-relaxed">{project.challenges}</p>
          </div>

          <ul className="mb-8 border-t border-rule">
            {project.features.map((f) => (
              <li key={f} className="border-b border-rule py-3 text-[13px] text-ink-2 flex gap-3">
                <span aria-hidden className="text-ink-4">—</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mb-8">
            <TechList tech={project.tech} />
          </div>

          <ProjectLinks project={project} />
        </Reveal>

        <Reveal delay={0.1} className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          {isLocal(project.image) && (
            <figure className="media-frame lg:sticky lg:top-24">
              <div className="border border-rule bg-raised overflow-hidden aspect-[16/10]">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="eyebrow mt-3 flex justify-between">
                <span>{project.title}</span>
                <span>Fig. {String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          )}
        </Reveal>
      </div>
    </article>
  );
}

function IndexRow({ project, open, onToggle }) {
  const reduce = useReducedMotion();
  const panelId = `project-${project.id}-details`;
  return (
    <li id={`project-${project.id}`} className="border-b border-rule scroll-mt-24">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,2fr)_32px] items-baseline gap-x-6 gap-y-1 py-5 md:py-6 min-h-[44px]"
        >
          <span className="hidden md:block text-[12px] text-ink-3 tabular-nums">{project.year}</span>
          <span className="font-serif text-2xl md:text-3xl text-ink group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </span>
          <span className="col-span-2 md:col-span-1 row-start-2 md:row-start-auto text-[13px] text-ink-2 leading-snug line-clamp-2">
            <span className="md:hidden text-ink-3">{project.year} · </span>
            {project.description}
          </span>
          <span aria-hidden className="col-start-2 row-start-1 md:col-start-auto md:row-start-auto justify-self-end text-ink-2 text-xl leading-none">
            {open ? '−' : '+'}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${project.title} details`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,2fr)_32px] gap-x-6 gap-y-8 pb-10">
              <div className="hidden md:block" />
              <div className="space-y-6">
                <div>
                  <div className="eyebrow mb-3">The hard part</div>
                  <p className="text-[13px] text-ink leading-relaxed">{project.challenges}</p>
                </div>
                <ul className="space-y-1.5 text-[13px] text-ink-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3"><span aria-hidden className="text-ink-4">—</span>{f}</li>
                  ))}
                </ul>
                <TechList tech={project.tech} />
                <ProjectLinks project={project} compact />
              </div>
              <div>
                {isLocal(project.video) ? (
                  <div className="media-frame border border-rule bg-raised aspect-video overflow-hidden">
                    <video
                      src={project.video}
                      poster={isLocal(project.image) ? project.image : undefined}
                      controls
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                      aria-label={`Demo recording of ${project.title}`}
                    />
                  </div>
                ) : isLocal(project.image) ? (
                  <div className="media-frame border border-rule bg-raised aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`Image of ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="projects" aria-labelledby="work-title" className="relative bg-bg py-24 md:py-36">
      <div className="container-ed">
        <SectionHeader
          number="01"
          label="Work"
          id="work-title"
          title="Selected work"
          intro="Two LLM projects in depth, with the failure that shaped each one. Everything else follows as an index, so open any row for details."
        />

        {featured.map((p, i) => (
          <CaseStudy key={p.id} project={p} index={i} />
        ))}

        <div className="mt-8 md:mt-12">
          <div className="flex items-baseline justify-between border-b border-rule-strong pb-4">
            <h3 className="font-serif text-3xl md:text-4xl text-ink">Index</h3>
            <span className="eyebrow">{more.length} projects</span>
          </div>
          <div className="hidden md:grid grid-cols-[72px_minmax(0,1.1fr)_minmax(0,2fr)_32px] gap-x-6 py-3 border-b border-rule eyebrow" aria-hidden>
            <span>Year</span><span>Project</span><span>What it is</span><span />
          </div>
          <ul>
            {more.map((p) => (
              <IndexRow key={p.id} project={p} open={openId === p.id} onToggle={() => toggle(p.id)} />
            ))}
          </ul>
        </div>

        {earlier.length > 0 && (
          <div className="mt-20">
            <div className="flex items-baseline justify-between border-b border-rule pb-4 mb-2">
              <h3 className="eyebrow text-ink-2">Earlier work</h3>
              <span className="eyebrow">Learning projects</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
              {earlier.map((p) => (
                <li key={p.id} id={`project-${p.id}`} className="py-5 border-b border-rule md:border-b-0 scroll-mt-24">
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="font-serif text-xl text-ink">{p.title}</span>
                    <span className="text-[12px] text-ink-3 tabular-nums">{p.year}</span>
                  </div>
                  <p className="text-[13px] text-ink-3 leading-snug mb-1">{p.description}</p>
                  <ProjectLinks project={p} compact />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
