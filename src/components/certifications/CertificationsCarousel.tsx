import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Award, Calendar } from 'lucide-react';

// Certifications data with URLs
const certificationsData = [
  {
    id: 1,
    title: 'IBM AI Developer Professional Certificate',
    organization: 'IBM',
    duration: 'Aug 2024 - Feb 2025',
    description: 'Comprehensive program covering AI model development, machine learning algorithms, and Python implementation.',
    color: '#052FAD',
    url: 'https://www.coursera.org/account/accomplishments/professional-cert/PLACEHOLDER',
    badge: '/badges/ibm.svg',
  },
  {
    id: 2,
    title: 'Generative AI with Vertex AI',
    organization: 'Google Cloud',
    duration: 'Aug 2024',
    description: 'Fundamentals of generative AI and implementation on Google Cloud Vertex AI platform.',
    color: '#4285F4',
    url: 'https://www.cloudskillsboost.google/public_profiles/PLACEHOLDER',
    badge: '/badges/google.svg',
  },
  {
    id: 3,
    title: 'Natural Language Processing',
    organization: 'Microsoft',
    duration: 'Jul 2024 - Aug 2024',
    description: 'NLP techniques, chatbot development, and text analytics using Azure AI services.',
    color: '#00A4EF',
    url: 'https://learn.microsoft.com/en-us/users/PLACEHOLDER',
    badge: '/badges/microsoft.svg',
  },
  {
    id: 4,
    title: 'Computer Vision in Azure',
    organization: 'Microsoft',
    duration: 'Jul 2024',
    description: 'Computer vision applications using Microsoft Azure AI services and cognitive APIs.',
    color: '#7FBA00',
    url: 'https://learn.microsoft.com/en-us/users/PLACEHOLDER',
    badge: '/badges/microsoft.svg',
  },
  {
    id: 5,
    title: 'Deep Learning Specialization',
    organization: 'DeepLearning.AI',
    duration: '2024',
    description: 'Neural networks, hyperparameter tuning, CNNs, sequence models, and deep learning foundations.',
    color: '#F7B93E',
    url: 'https://www.coursera.org/account/accomplishments/specialization/PLACEHOLDER',
    badge: '/badges/deeplearning.svg',
  },
  {
    id: 6,
    title: 'Machine Learning',
    organization: 'Stanford Online',
    duration: '2024',
    description: 'Andrew Ng\'s foundational ML course covering supervised and unsupervised learning.',
    color: '#8C1515',
    url: 'https://www.coursera.org/account/accomplishments/PLACEHOLDER',
    badge: '/badges/stanford.svg',
  },
];

// Magnetic button component
function MagneticButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.3;
    const distanceY = (e.clientY - centerY) * 0.3;
    x.set(distanceX);
    y.set(distanceY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// Individual certificate card
function CertificateCard({
  cert,
  index,
  scrollProgress,
}: {
  cert: typeof certificationsData[0];
  index: number;
  scrollProgress: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect based on scroll position
  const rotateY = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [15, 0, -15]
  );

  const rotateX = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [-5, 0, 5]
  );

  // Parallax offset for depth effect
  const translateZ = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    index % 2 === 0 ? [-20, 0, -20] : [20, 0, 20]
  );

  const handleViewCertificate = () => {
    window.open(cert.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={cardRef}
      className="certificate-card flex-shrink-0 w-[340px] md:w-[400px] perspective-1000"
      style={{
        rotateY: isHovered ? 0 : rotateY,
        rotateX: isHovered ? 0 : rotateX,
        z: translateZ,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full rounded-2xl p-6 overflow-hidden cursor-pointer group bg-white dark:bg-white/5 shadow-lg dark:shadow-none border border-gray-200 dark:border-transparent"
        style={{
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 25px 50px -12px ${cert.color}40, 0 0 40px ${cert.color}25`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${cert.color}15, transparent 40%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
        />

        {/* Organization badge/icon area */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: `${cert.color}20` }}
          >
            <Award size={24} style={{ color: cert.color }} />
          </div>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ background: `${cert.color}20`, color: cert.color }}
          >
            {cert.organization}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white transition-colors">
          {cert.title}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Calendar size={14} />
          <span>{cert.duration}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-6 line-clamp-2">
          {cert.description}
        </p>

        {/* Magnetic View Certificate Button */}
        <MagneticButton
          onClick={handleViewCertificate}
          className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`,
            border: `1px solid ${cert.color}40`,
            color: cert.color,
          }}
        >
          <span>View Certificate</span>
          <ExternalLink size={16} />
        </MagneticButton>

        {/* Corner decoration */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 opacity-10"
          style={{
            background: `radial-gradient(circle at bottom right, ${cert.color}, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.certificate-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-1 bg-gray-200 dark:bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 dark:from-primary dark:to-purple-500 rounded-full"
            style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide pb-8 -mx-6 px-6"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-6 w-max">
          {certificationsData.map((cert, index) => (
            <div
              key={cert.id}
              style={{ scrollSnapAlign: 'center' }}
            >
              <CertificateCard
                cert={cert}
                index={index}
                scrollProgress={scrollXProgress}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-background to-transparent pointer-events-none z-10" />

      {/* Scroll hint */}
      <motion.div
        className="flex justify-center mt-4 text-gray-500 dark:text-muted-foreground text-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="flex items-center gap-2">
          <span>←</span>
          <span>Scroll to explore</span>
          <span>→</span>
        </span>
      </motion.div>
    </div>
  );
}
