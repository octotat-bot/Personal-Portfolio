import { aboutContent, contactInfo, timeline } from '../../data/content';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import { Reveal, ArrowUpRight } from '../ui/editorial';

export default function About() {
  const leetCodeSolved = useLeetCodeStats();
  const leetcode = aboutContent.stats.find((s) => s.label === 'LeetCode solved');

  return (
    <section id="about" data-shape="timeline" aria-labelledby="about-title" className="relative min-h-[100svh] py-28 md:py-40">
      <div className="container-ed">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center gap-4">02 — About <span className="w-14 h-px bg-rule-strong" aria-hidden /></div>
          <h2 id="about-title" className="font-serif text-[44px] md:text-[76px] leading-[0.98] tracking-[-0.015em] text-ink max-w-[880px]">
            {aboutContent.intro}
          </h2>
          <p className="mt-8 text-[14px] text-ink-2 leading-[1.8] max-w-[520px]">{aboutContent.description}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-rule max-w-[880px]">
          {[
            ['Studying', 'B.Tech AI · 2024–28'],
            ['Based in', contactInfo.location],
            ['Status', contactInfo.availability],
            ['LeetCode', (
              <a key="lc" href={leetcode.link} target="_blank" rel="noreferrer" className="link-ed inline-flex items-center gap-1.5">
                {leetCodeSolved ?? leetcode.value} solved <ArrowUpRight />
              </a>
            )],
          ].map(([term, detail]) => (
            <div key={term} className="py-5 pr-4 border-b border-rule">
              <div className="eyebrow mb-2">{term}</div>
              <div className="text-[14px] text-ink">{detail}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.12} className="mt-16 max-w-[880px]">
          <h3 className="eyebrow text-ink-2 mb-4">Timeline</h3>
          <ol>
            {timeline.map((item) => (
              <li key={`${item.year}-${item.title}`} className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 border-b border-rule">
                <span className="text-[12px] text-ink-3 tabular-nums">{item.year}</span>
                <span className="font-serif text-[22px] md:text-[26px] text-ink leading-tight">{item.title}</span>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="col-start-2 md:col-start-auto link-ed inline-flex items-center gap-1.5 text-[12px] min-h-[44px]">
                    Visit <ArrowUpRight /><span className="sr-only">{item.title} (opens in a new tab)</span>
                  </a>
                ) : <span className="hidden md:block" />}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
