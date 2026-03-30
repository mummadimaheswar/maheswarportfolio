import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Award, ChevronDown } from 'lucide-react';

// Lazy load heavy 3D components
const SkillSpheres3D = lazy(() => import('./skills/SkillSpheres3D'));
const MobileBentoGrid = lazy(() => import('./skills/MobileBentoGrid'));
const CertificationsCarousel = lazy(() => import('./certifications/CertificationsCarousel'));

// Loading skeleton
function SkillsLoadingSkeleton() {
  return (
    <div className="w-full h-[500px] rounded-2xl glass-card flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-muted-foreground text-sm">Loading Skills...</span>
      </div>
    </div>
  );
}

function CertificationsLoadingSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[340px] h-[280px] rounded-2xl glass-card animate-pulse"
        />
      ))}
    </div>
  );
}

// Custom hook for detecting mobile/touch devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function SkillsCertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const certsInView = useInView(certsRef, { once: true, amount: 0.2 });

  const isMobile = useIsMobile();
  const [showSkills, setShowSkills] = useState(false);

  // Delay showing 3D skills for better perceived performance
  useEffect(() => {
    if (skillsInView) {
      const timer = setTimeout(() => setShowSkills(true), 300);
      return () => clearTimeout(timer);
    }
  }, [skillsInView]);

  return (
    <section
      ref={sectionRef}
      id="skills-certifications"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs - green theme */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-green-400/10 rounded-full blur-[100px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-50" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Skills Section */}
        <div ref={skillsRef} className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Sparkles size={16} className="text-green-400" />
              <span className="text-sm font-medium text-green-400">Interactive Experience</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {isMobile
                ? 'Explore my technical expertise across AI, Machine Learning, and Software Development.'
                : 'Drag and throw the skill circles to interact with my technical expertise. Each circle represents a core competency.'}
            </p>

            {!isMobile && (
              <motion.div
                className="mt-6 flex items-center justify-center gap-2 text-sm text-green-400/70"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>Grab & throw the circles</span>
                <ChevronDown size={16} />
              </motion.div>
            )}
          </motion.div>

          {/* Skills visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Suspense fallback={<SkillsLoadingSkeleton />}>
              {showSkills && (isMobile ? <MobileBentoGrid /> : <SkillSpheres3D />)}
            </Suspense>
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div ref={certsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={certsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Award size={16} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Verified Credentials</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Industry-recognized certifications from leading tech companies and educational platforms.
            </p>
          </motion.div>

          {/* Certifications carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={certsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Suspense fallback={<CertificationsLoadingSkeleton />}>
              <CertificationsCarousel />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
