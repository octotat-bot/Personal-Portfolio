import { aboutContent, contactInfo, timeline } from '../../data/content';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import { Reveal, SectionHeader, ArrowUpRight } from '../ui/editorial';

export default function About() {
  const leetCodeSolved = useLeetCodeStats();
  const leetcode = aboutContent.stats.find((s) => s.label === 'LeetCode solved');

  const facts = [
    { term: 'Studying', detail: 'B.Tech, Artificial Intelligence · Newton School of Technology, Rishihood University · 2024–2028' },
    { term: 'Based in', detail: contactInfo.location },
    { term: 'Status', detail: contactInfo.availability },
    leetcode && {
      term: 'LeetCode',
      detail: (
        <a href={leetcode.link} target="_blank" rel="noreferrer" className="link-ed inline-flex items-center gap-1.5">
          {leetCodeSolved ?? leetcode.value} problems solved <ArrowUpRight />
        </a>
      ),
    },
  ].filter(Boolean);

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-bg py-24 md:py-36 border-t border-rule">
      <div className="container-ed">
        <SectionHeader number="02" label="About" id="about-title" title={aboutContent.intro} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="text-ink-2 text-[15px] leading-[1.8] mb-12 max-w-xl">{aboutContent.description}</p>

            <dl className="border-t border-rule">
              {facts.map((f) => (
                <div key={f.term} className="grid grid-cols-[110px_1fr] gap-4 py-4 border-b border-rule">
                  <dt className="eyebrow pt-0.5">{f.term}</dt>
                  <dd className="text-[14px] text-ink leading-relaxed">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <h3 className="eyebrow text-ink-2 mb-6">Timeline</h3>
            <ol className="border-t border-rule">
              {timeline.map((item) => (
                <li key={`${item.year}-${item.title}`} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-6 gap-y-2 py-7 border-b border-rule">
                  <span className="text-[12px] text-ink-3 tabular-nums pt-1.5">{item.year}</span>
                  <div>
                    <h4 className="font-serif text-2xl text-ink leading-tight mb-2">{item.title}</h4>
                    <p className="text-[14px] text-ink-2 leading-relaxed">{item.description}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="link-ed inline-flex items-center gap-1.5 mt-3 text-[13px] min-h-[44px]">
                        Visit site <ArrowUpRight />
                        <span className="sr-only">for {item.title} (opens in a new tab)</span>
                      </a>
                    )}
                    {item.subTimeline && (
                      <ol className="mt-5 space-y-3 border-l border-rule pl-5">
                        {item.subTimeline.map((sub) => (
                          <li key={sub.year}>
                            <div className="text-[12px] text-ink-3 tabular-nums">{sub.year}</div>
                            <p className="text-[13px] text-ink-2 leading-relaxed">{sub.description}</p>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
