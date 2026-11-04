import { skills } from '../../data/content';
import { projectsUsing } from '../../data/projects';
import { Reveal, SectionHeader } from '../ui/editorial';

// Only tools that some project lists, each with the projects behind it.
const groups = skills
  .map((g) => ({
    ...g,
    rows: g.technologies
      .map((tech) => ({ tech, projects: projectsUsing(tech) }))
      .filter((r) => r.projects.length > 0),
  }))
  .filter((g) => g.rows.length > 0);

const toolId = (t) => `tool-${t.replace(/\W/g, '')}`;

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="container-ed">
        <SectionHeader
          number="03"
          label="Toolkit"
          id="skills-title"
          title={<>Tools, with <span className="text-accent">receipts.</span></>}
          intro="The number is how many of my projects use each tool. Hover or focus one to see which."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.map((g, gi) => (
            <Reveal key={g.category} delay={gi * 0.05} className="card p-6">
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="font-display font-semibold text-[20px] tracking-[-0.02em] text-ink">{g.category}</h3>
                <span className="font-mono text-[11px] text-ink-3">{g.rows.length}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.rows.map(({ tech, projects }) => (
                  <li key={tech} className="group relative">
                    <span
                      tabIndex={0}
                      aria-describedby={toolId(tech)}
                      className="inline-flex items-center gap-2 h-9 pl-3 pr-1.5 rounded-full bg-raised border border-rule text-[14px] font-medium text-ink cursor-default transition-colors hover:border-accent group-focus-within:border-accent"
                    >
                      {tech}
                      <span className="grid place-items-center min-w-[22px] h-[22px] px-1 rounded-full bg-sunk font-mono text-[11px] text-ink-2 transition-colors group-hover:bg-accent group-hover:text-white group-focus-within:bg-accent group-focus-within:text-white">
                        {projects.length}
                      </span>
                    </span>
                    <span
                      id={toolId(tech)}
                      role="tooltip"
                      className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max max-w-[240px] rounded-xl bg-ink px-3 py-2 text-[12.5px] leading-snug text-white shadow-lg opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
                    >
                      {projects.map((p) => p.title).join(', ')}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
