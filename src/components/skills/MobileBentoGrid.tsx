import { motion } from 'framer-motion';

// All skills with white/green color scheme
const skillsData = [
  // Programming & Core
  { name: 'Python', color: '#22c55e', category: 'Programming' },
  { name: 'OOP', color: '#16a34a', category: 'Programming' },
  { name: 'DSA', color: '#15803d', category: 'Programming' },

  // Generative AI
  { name: 'GenAI', color: '#22c55e', category: 'AI' },
  { name: 'LLMs', color: '#16a34a', category: 'AI' },
  { name: 'RAG', color: '#15803d', category: 'AI' },
  { name: 'Transformers', color: '#22c55e', category: 'AI' },

  // Prompt Engineering
  { name: 'Prompt Eng', color: '#16a34a', category: 'AI' },
  { name: 'CoT', color: '#15803d', category: 'AI' },

  // Deep Learning
  { name: 'Deep Learning', color: '#22c55e', category: 'ML' },
  { name: 'PyTorch', color: '#16a34a', category: 'ML' },
  { name: 'TensorFlow', color: '#15803d', category: 'ML' },
  { name: 'Neural Networks', color: '#22c55e', category: 'ML' },
  { name: 'CNNs', color: '#16a34a', category: 'ML' },

  // Machine Learning
  { name: 'Machine Learning', color: '#15803d', category: 'ML' },
  { name: 'scikit-learn', color: '#22c55e', category: 'ML' },
  { name: 'XGBoost', color: '#16a34a', category: 'ML' },

  // NLP & Vision
  { name: 'NLP', color: '#15803d', category: 'AI' },
  { name: 'Computer Vision', color: '#22c55e', category: 'AI' },

  // Data & Analytics
  { name: 'Pandas', color: '#16a34a', category: 'Data' },
  { name: 'NumPy', color: '#15803d', category: 'Data' },

  // Backend & Tools
  { name: 'FastAPI', color: '#22c55e', category: 'Backend' },
  { name: 'PostgreSQL', color: '#16a34a', category: 'Backend' },
  { name: 'Git', color: '#15803d', category: 'Tools' },
  { name: 'Docker', color: '#22c55e', category: 'Tools' },
];

interface SkillCardProps {
  skill: { name: string; color: string; category: string };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <motion.div
        className="h-full min-h-[70px] rounded-full p-4 flex items-center justify-center text-center transition-all duration-300 overflow-hidden bg-white border-2"
        style={{
          borderColor: skill.color,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 25px ${skill.color}50`,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
          }}
        />

        {/* Skill name */}
        <span
          className="font-bold text-sm relative z-10"
          style={{ color: skill.color }}
        >
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function MobileBentoGrid() {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {skillsData.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
