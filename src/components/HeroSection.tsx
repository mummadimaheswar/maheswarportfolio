import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';

/**
 * HeroSection
 *
 * Full-viewport hero with oversized brutalist typography,
 * glassmorphism card overlay, and interactive cyan CTA.
 * Sits on top of the ShaderBackground.
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full h-full px-6 md:px-12"
      >
        {/* Glassmorphism card */}
        <div className="glass-card h-full p-8 md:p-14 lg:p-20 relative overflow-auto flex flex-col justify-center">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#00F0FF]/30" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#00F0FF]/30" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#00F0FF]/30" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#00F0FF]/30" />

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 dark:border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-white/60">
              <span className="w-2 h-2 bg-[#0891B2] dark:bg-[#00F0FF] animate-glow-pulse" />
              Available for Research & Collaborations
            </span>
          </motion.div>

          {/* Name - oversized brutalist typography */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-inter font-black uppercase leading-[0.9] tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Mummadi
            <br />
            <span className="text-[#0891B2] dark:text-[#00F0FF]">Maheswar</span>
            <br />
            Reddy
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <p className="text-base md:text-lg font-mono text-gray-400 dark:text-white/40 uppercase tracking-[0.3em] mb-4">
              {'// role'}
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-inter font-light text-gray-800 dark:text-white/90 tracking-wide">
              Generative AI & Machine Learning Engineer
            </h2>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="my-8 md:my-10 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent origin-left"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-sm md:text-base text-gray-500 dark:text-white/50 font-inter leading-relaxed max-w-2xl mb-10"
          >
            Building intelligent systems at the intersection of deep learning,
            NLP, and explainable AI. Passionate about research that bridges
            the gap between cutting-edge ML models and real-world applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0891B2] dark:bg-[#00F0FF] text-white dark:text-black font-mono font-bold text-sm uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_12px_rgba(0,240,255,0.35)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                View My Work
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/* REPLACE_WITH_RESUME_URL */"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white font-mono text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#0891B2] dark:hover:border-[#00F0FF] hover:text-[#0891B2] dark:hover:text-[#00F0FF]"
            >
              View Resume
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#experience"
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-white/30 hover:text-[#0891B2] dark:hover:text-[#00F0FF] transition-colors"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
