import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: 'smart-irrigation',
    title: 'Smart Irrigation',
    subtitle: 'AI-Based Smart Irrigation System with Weather API for Crop Guidance',
    description:
      'An AI-driven irrigation advisory platform integrating soil moisture sensor telemetry with external weather forecasting APIs to guide crop watering decisions. Features a retrieval-augmented generation pipeline generating agronomy recommendations grounded in domain-specific agricultural documentation.',
    tags: [
      'ChatGPT API',
      'RAG',
      'Python',
      'PostgreSQL',
      'Weather API',
      'JavaScript',
    ],
    image: '/* REPLACE_WITH_PROJECT_IMAGE_PATH */',
    liveUrl: '/* REPLACE_WITH_LIVE_URL */',
    githubUrl: '/* REPLACE_WITH_GITHUB_URL */',
    highlights: [
      'RAG pipeline with domain-specific agricultural docs',
      'Predictive irrigation logic from environmental signals',
      'PostgreSQL storage for historical analysis & trend planning',
      'Modular backend for crop yield prediction integration',
    ],
  },
  {
    id: 'image-captioning',
    title: 'Image Captioning',
    subtitle: 'Image Captioning with Generative AI',
    description:
      'An AI-powered image captioning system leveraging generative AI models to automatically produce accurate, context-rich descriptions for images. Built with an intuitive user interface for seamless interaction.',
    tags: [
      'Generative AI',
      'Deep Learning',
      'Python',
      'Computer Vision',
      'NLP',
    ],
    image: '/* REPLACE_WITH_PROJECT_IMAGE_PATH */',
    liveUrl: '/* REPLACE_WITH_LIVE_URL */',
    githubUrl: '/* REPLACE_WITH_GITHUB_URL */',
    highlights: [
      'End-to-end generative AI captioning pipeline',
      'Vision-language model integration',
      'Intuitive UI for real-time image analysis',
    ],
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    subtitle: 'Sentiment Analysis Project',
    description:
      'A machine learning model engineered to analyze text sentiment with high accuracy, trained on diverse datasets. Applies NLP techniques and data science workflows to extract meaningful insights from unstructured text data.',
    tags: [
      'Machine Learning',
      'NLP',
      'Data Science',
      'Python',
      'Scikit-learn',
    ],
    image: '/* REPLACE_WITH_PROJECT_IMAGE_PATH */',
    liveUrl: '/* REPLACE_WITH_LIVE_URL */',
    githubUrl: '/* REPLACE_WITH_GITHUB_URL */',
    highlights: [
      'High-accuracy sentiment classification',
      'Trained on diverse, multi-domain datasets',
      'End-to-end NLP preprocessing pipeline',
    ],
  },
];

/**
 * TiltImage
 *
 * Interactive image container with 3D perspective tilt on hover.
 * Applies a subtle cyan monochrome filter overlay.
 */
function TiltImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -12;
      const rotateY = (x - 0.5) * 12;
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
    },
    []
  );

  const onMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);

  return (
    <div ref={containerRef} className="tilt-container w-full">
      <div
        className="tilt-inner relative overflow-hidden border border-white/10 group"
        style={{ transform }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Placeholder for project image */}
        <div className="relative aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
          {src.startsWith('/*') ? (
            // Placeholder state
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto border border-white/10 flex items-center justify-center mb-3">
                  <span className="text-2xl text-white/20">{'{ }'}</span>
                </div>
                <p className="text-xs font-mono text-white/20 uppercase tracking-widest">
                  Project Image
                </p>
              </div>
              {/* Grid pattern placeholder */}
              <div className="absolute inset-0 opacity-20 grid-overlay" />
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
            />
          )}

          {/* Cyan overlay filter */}
          <div className="absolute inset-0 bg-[#00F0FF]/5 mix-blend-overlay pointer-events-none" />
          {/* Hover brightening */}
          <div className="absolute inset-0 bg-[#00F0FF]/0 group-hover:bg-[#00F0FF]/10 transition-colors duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function ProjectBlock({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 lg:mb-40 ${
        isReversed ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Left / Right: Image */}
      <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
        <TiltImage src={project.image} alt={project.title} />
      </div>

      {/* Right / Left: Content */}
      <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
        {/* Project number */}
        <p className="text-xs font-mono text-[#00F0FF]/40 uppercase tracking-[0.3em] mb-4">
          {'// project_0' + (index + 1)}
        </p>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-inter font-black uppercase text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-white/50 font-inter mb-6">
          {project.subtitle}
        </p>

        {/* Description card */}
        <div className="glass-card p-6 mb-6">
          <p className="text-sm text-white/60 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="text-sm text-white/40 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-[#00F0FF]" />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(0,240,255,0.3)]"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:shadow-[0_0_30px_4px_rgba(0,240,255,0.1)]"
          >
            GitHub
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-padding"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// featured work'}
          </p>
          <h2 className="text-3xl md:text-5xl font-inter font-black uppercase text-white">
            Featured <span className="text-[#00F0FF]">Projects</span>
          </h2>
        </motion.div>

        {/* Project blocks */}
        {projects.map((project, i) => (
          <ProjectBlock key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
