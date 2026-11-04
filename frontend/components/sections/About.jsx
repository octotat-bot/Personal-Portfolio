import { aboutContent, contactInfo, timeline } from '../../data/content';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import { Reveal, SectionHeader, ArrowUpRight } from '../ui/editorial';
import { CountUp, Stagger } from '../ui/motion';
import { staggerItem } from '../ui/motionVariants';
import { motion } from 'framer-motion';

export default function About() {
  const leetCodeSolved = useLeetCodeStats();
  const leetcode = aboutContent.stats.find((s) => s.label === 'LeetCode solved');

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container-ed">
        <SectionHeader number="02" label="About" id="about-title" title={aboutContent.intro} />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Reveal className="card p-7 md:p-9 md:col-span-4 flex flex-col justify-between gap-8">
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-ink-2 max-w-[620px]">{aboutContent.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="chip !shadow-none"><span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#1f9d55]" />{contactInfo.availability}</span>
              <span className="chip !shadow-none">{contactInfo.location}</span>
              <span className="chip !shadow-none">B.Tech AI · 2024–28</span>
            </div>
          </Reveal>

          {leetcode && (
            <Reveal delay={0.06} className="md:col-span-2">
              <a
                href={leetcode.link}
                target="_blank"
                rel="noreferrer"
                className="group card card-hover !bg-accent !border-accent text-white p-7 md:p-9 h-full min-h-[220px] flex flex-col justify-between"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 flex items-center justify-between">
                  LeetCode <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span>
                  <span className="block font-display font-semibold text-[64px] md:text-[80px] leading-none tracking-[-0.05em]"><CountUp value={leetCodeSolved ?? leetcode.value} /></span>
                  <span className="block mt-2 text-[15px] text-white/85">problems solved · live count</span>
                </span>
              </a>
            </Reveal>
          )}

          <Reveal delay={0.1} className="card p-7 md:p-9 md:col-span-6">
            <h3 className="eyebrow mb-6">Timeline</h3>
            <Stagger as="ol" step={0.09} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {timeline.map((item, i) => (
                <motion.li variants={staggerItem} key={`${item.year}-${item.title}`} className={`relative rounded-2xl p-5 ${i === 0 ? 'bg-ink text-white' : 'bg-raised border border-rule'}`}>
                  <span className={`font-mono text-[11px] tracking-[0.06em] ${i === 0 ? 'text-white/70' : 'text-ink-3'}`}>{item.year}</span>
                  <p className={`mt-3 font-display font-semibold text-[21px] leading-tight tracking-[-0.02em] ${i === 0 ? 'text-white' : 'text-ink'}`}>{item.title}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className={`mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium underline underline-offset-4 min-h-[44px] ${i === 0 ? 'text-white decoration-white/40 hover:decoration-white' : 'text-ink decoration-rule-strong hover:decoration-accent'}`}>
                      Visit <ArrowUpRight /><span className="sr-only">{item.title} (opens in a new tab)</span>
                    </a>
                  )}
                </motion.li>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
