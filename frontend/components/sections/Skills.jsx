import { skills, aboutContent } from '../../data/content';
import { projectsUsing } from '../../data/projects';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import { Reveal, SectionHeader, ArrowUpRight } from '../ui/editorial';

// Each tool is listed with the projects that use it, and tools with no project
// behind them are dropped, so nothing here is a self-rating.
const groups = skills
  .map((g) => ({
    ...g,
    rows: g.technologies
      .map((tech) => ({ tech, projects: projectsUsing(tech) }))
      .filter((r) => r.projects.length > 0),
  }))
  .filter((g) => g.rows.length > 0);

const scrollToProject = (e, id) => {
  const el = document.getElementById(`project-${id}`);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#project-${id}`);
};

export default function Skills() {
  const leetCodeSolved = useLeetCodeStats();
  const leetcode = aboutContent.stats.find((s) => s.label === 'LeetCode solved');

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative bg-bg py-24 md:py-36 border-t border-rule">
      <div className="container-ed">
        <SectionHeader
          number="03"
          label="Toolkit"
          id="skills-title"
          title="Tools, with receipts"
          intro="Every tool below links to the projects that use it. If it isn't in a repo, it isn't on this list."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {groups.map((g, gi) => (
            <Reveal key={g.category} delay={gi * 0.05}>
              <h3 className="flex items-baseline justify-between border-b border-rule-strong pb-3 mb-1">
                <span className="font-serif text-2xl md:text-3xl text-ink">{g.category}</span>
                <span className="eyebrow">{g.rows.length}</span>
              </h3>
              <dl>
                {g.rows.map(({ tech, projects }) => (
                  <div key={tech} className="grid grid-cols-[minmax(0,140px)_1fr] gap-4 py-3 border-b border-rule">
                    <dt className="text-[14px] text-ink">{tech}</dt>
                    <dd className="text-[12px] text-ink-3 leading-relaxed">
                      {projects.map((p, i) => (
                        <span key={p.id}>
                          <a
                            href={`#project-${p.id}`}
                            onClick={(e) => scrollToProject(e, p.id)}
                            className="hover:text-ink underline decoration-transparent hover:decoration-rule-strong underline-offset-4 transition-colors"
                          >
                            {p.title}
                          </a>
                          {i < projects.length - 1 && <span aria-hidden>, </span>}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        {leetcode && (
          <Reveal className="mt-16 border-t border-b border-rule py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6">
            <div>
              <div className="eyebrow mb-2">Data structures & algorithms</div>
              <p className="font-serif text-3xl md:text-4xl text-ink">
                {leetCodeSolved ?? leetcode.value} <span className="text-ink-3">LeetCode problems solved</span>
              </p>
            </div>
            <a href={leetcode.link} target="_blank" rel="noreferrer" className="btn-ed justify-self-start">
              Profile <ArrowUpRight />
              <span className="sr-only">on LeetCode (opens in a new tab)</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
