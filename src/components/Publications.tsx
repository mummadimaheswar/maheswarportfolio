import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, ExternalLink, Award } from 'lucide-react';

interface Publication {
  title: string;
  conference: string;
  year: string;
  status: string;
  authors: string;
  description: string;
  paperUrl: string;
  tags: string[];
}

const publications: Publication[] = [
  {
    title:
      'AI-Based Smart Irrigation System with Weather API Integration for Precision Crop Guidance',
    conference: 'ICICST 2026',
    year: '2026',
    status: 'Selected',
    authors: '/* REPLACE_WITH_AUTHORS */',
    description:
      'Proposes an AI-driven irrigation advisory platform integrating soil moisture sensor telemetry with weather forecasting APIs and a retrieval-augmented generation pipeline to deliver context-aware, domain-grounded crop watering recommendations.',
    paperUrl: '/* REPLACE_WITH_PAPER_URL */',
    tags: ['RAG', 'ChatGPT API', 'Weather API', 'Agriculture'],
  },
];

function PublicationCard({
  pub,
  index,
}: {
  pub: Publication;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glass-card p-6 md:p-8 group relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Status badge */}
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#0891B2]/30 dark:border-[#00F0FF]/30 text-[#0891B2] dark:text-[#00F0FF] text-[10px] font-mono uppercase tracking-[0.2em]">
          <Award className="w-3 h-3" />
          {pub.status}
        </span>
        <span className="text-[10px] font-mono text-gray-400 dark:text-white/30 uppercase tracking-[0.2em]">
          {pub.conference}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-inter font-bold text-gray-900 dark:text-white mb-3 leading-tight">
        {pub.title}
      </h3>

      {/* Authors */}
      <p className="text-xs font-mono text-gray-400 dark:text-white/30 mb-4">{pub.authors}</p>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed mb-6">
        {pub.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pub.tags.map((tag) => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Action */}
      <a
        href={pub.paperUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 dark:text-white/40 hover:text-[#0891B2] dark:hover:text-[#00F0FF] transition-colors group/link"
      >
        <FileText className="w-4 h-4" />
        View Paper
        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
      </a>
    </motion.div>
  );
}

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="relative section-padding bg-white/70 dark:bg-[#080808]/70 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-mono text-[#0891B2]/60 dark:text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// research & publications'}
          </p>
          <h2 className="text-3xl md:text-5xl font-inter font-black uppercase text-gray-900 dark:text-white">
            Published <span className="text-[#0891B2] dark:text-[#00F0FF]">Work</span>
          </h2>
        </motion.div>

        {/* Publication grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
