import { skills, aboutContent } from '../../data/content';
import { projectsUsing } from '../../data/projects';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import { Reveal } from '../ui/editorial';

// Only tools that some project lists, each with the projects behind it.
const groups = skills
  .map((g) => ({
    ...g,
    rows: g.technologies
      .map((tech) => ({ tech, projects: projectsUsing(tech) }))
      .filter((r) => r.projects.length > 0),
  }))
  .filter((g) => g.rows.length > 0);

export default function Skills() {
  const leetCodeSolved = useLeetCodeStats();
  const leetcode = aboutContent.stats.find((s) => s.label === 'LeetCode solved');

  return (
    <section id="skills" data-shape="lattice" aria-labelledby="skills-title" className="relative min-h-[100svh] py-28 md:py-40">
      <div className="container-ed">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center gap-4">03 — Toolkit <span className="w-14 h-px bg-rule-strong" aria-hidden /></div>
          <h2 id="skills-title" className="font-serif text-[56px] md:text-[96px] leading-[0.92] tracking-[-0.02em] text-ink">
            Tools, with <em className="text-ink-2">receipts.</em>
          </h2>
          <p className="mt-6 text-[14px] text-ink-2 max-w-[460px]">
            The number is how many of my projects use it. Hover or focus a tool to see which.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {groups.map((g, gi) => (
            <Reveal key={g.category} delay={gi * 0.05}>
              <h3 className="eyebrow text-ink-2 pb-3 mb-2 border-b border-rule-strong">{g.category}</h3>
              <ul>
                {g.rows.map(({ tech, projects }) => (
                  <li key={tech} className="group relative">
                    <span
                      tabIndex={0}
                      aria-describedby={`tool-${tech.replace(/\W/g, '')}`}
                      className="flex items-baseline justify-between gap-3 py-2 border-b border-rule text-[14px] text-ink-2 hover:text-ink focus-visible:text-ink transition-colors cursor-default outline-offset-2"
                    >
                      {tech}
                      <span className="text-[11px] text-ink-3 tabular-nums">{projects.length}</span>
                    </span>
                    <span
                      id={`tool-${tech.replace(/\W/g, '')}`}
                      role="tooltip"
                      className="pointer-events-none absolute left-0 right-0 top-full z-20 mt-1 bg-raised border border-rule-strong px-3 py-2 text-[11.5px] text-ink-2 leading-snug opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200"
                    >
                      {projects.map((p) => p.title).join(', ')}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {leetcode && (
          <Reveal className="mt-20 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-serif text-[44px] md:text-[64px] leading-none text-ink">{leetCodeSolved ?? leetcode.value}</span>
            <a href={leetcode.link} target="_blank" rel="noreferrer" className="link-ed text-[13px]">
              LeetCode problems solved ↗
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
