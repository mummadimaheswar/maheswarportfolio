import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';

interface TimelineEntry {
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

const timelineData: TimelineEntry[] = [
  {
    type: 'experience',
    title: 'AI Research Intern',
    organization: 'Coding Jr',
    location: 'Remote',
    period: '06/2025 - 01/2026',
    description: [
      'Architected a production-scale LLM evaluation pipeline using an LLM-as-a-Judge meta-evaluation architecture to benchmark code reasoning reliability across 50+ adversarial and boundary test scenarios.',
      'Formulated a statistically controlled prompt optimization workflow combining A/B experimentation, comparative scoring heuristics, and variance tracking, reducing nondeterministic outputs by 40% during complex code refactoring tasks.',
      'Engineered an automated adversarial testing framework detecting hallucination signatures, reasoning drift, and edge-case failure patterns across polyglot code repositories.',
      'Implemented multi-layer inference guardrails integrating AST structural parsing, semantic equivalence validation, and logical constraint enforcement before production response delivery.',
      'Established long-context reasoning benchmarks using RAG-driven dynamic context orchestration, mitigating lost-in-the-middle degradation in multi-file dependency analysis.',
    ],
    tags: ['LLM Evaluation', 'Prompt Optimization', 'Adversarial Testing', 'Guardrails', 'RAG'],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering - CGPA: 8.5',
    organization: 'Nalla Malla Reddy Engineering College',
    location: 'Hyderabad',
    period: '2022 - 2026',
    description: [
      'Computer Science Engineering undergraduate program with strong foundation in AI, machine learning, and software engineering fundamentals.',
    ],
    tags: ['Computer Science', 'AI', 'Machine Learning', 'Software Engineering'],
  },
];

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center w-full mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0891B2] dark:bg-[#00F0FF] shadow-[0_0_16px_4px_rgba(0,240,255,0.4)] z-10" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[calc(50%-3rem)] ${
          isLeft ? 'md:pr-0' : 'md:pl-0'
        }`}
      >
        <div className="glass-card p-6 md:p-8 relative group">
          {/* Type indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center border border-[#0891B2]/30 dark:border-[#00F0FF]/30 text-[#0891B2] dark:text-[#00F0FF]">
              {entry.type === 'experience' ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0891B2]/60 dark:text-[#00F0FF]/60">
              {entry.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-inter font-bold text-gray-900 dark:text-white mb-2">
            {entry.title}
          </h3>

          {/* Organization & meta */}
          <div className="flex flex-col gap-1 mb-4 text-sm text-gray-500 dark:text-white/40 font-mono">
            <span className="text-gray-600 dark:text-white/60">{entry.organization}</span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {entry.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {entry.period}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-white/10 mb-4" />

          {/* Description */}
          <ul className="space-y-3 mb-6">
            {entry.description.map((item, i) => (
              <li
                key={i}
                className="text-sm text-gray-500 dark:text-white/50 leading-relaxed flex gap-2"
              >
                <span className="text-[#0891B2] dark:text-[#00F0FF] mt-1 shrink-0">{'>'}</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceEducation() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding bg-white/70 dark:bg-[#080808]/70 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-mono text-[#0891B2]/60 dark:text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// experience & education'}
          </p>
          <h2 className="text-3xl md:text-5xl font-inter font-black uppercase text-gray-900 dark:text-white">
            My <span className="text-[#0891B2] dark:text-[#00F0FF]">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden md:block timeline-line" />

          {timelineData.map((entry, i) => (
            <TimelineCard key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
