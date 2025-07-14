
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Terminal, Figma, GitBranch, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Skill {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C++", level: 65 },
    ],
  },
  {
    title: "AI/ML Frameworks",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.292 5.856L11.54 0v24l-10.25-5.9V5.857zm10.25 0L21.786 0v17.143l-10.244 6.9V5.857z" />
    </svg>,
    skills: [
      { name: "TensorFlow", level: 20 },
      { name: "PyTorch", level: 50 },
      { name: "scikit-learn", level: 90 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Terminal className="w-6 h-6" />,
    skills: [
      { name: "Google Colab", level: 95 },
      { name: "VS Code", level: 90 },
      { name: "Git", level: 75, icon: <GitBranch className="w-4 h-4" /> },
      { name: "Docker", level: 70, icon: <Code className="w-4 h-4" /> },
    ],
  },
  {
    title: "UI/UX & Design",
    icon: <Figma className="w-6 h-6" />,
    skills: [
      { name: "Figma", level: 80 },
      { name: "Canva", level: 85 },
      { name: "Web Design", level: 75 },
    ],
  },
  {
    title: "Soft Skills",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path>
    </svg>,
    skills: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 85 },
      { name: "Time Management", level: 80 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-20 relative bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical expertise and professional skills that I've developed throughout my journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {skill.icon && <span>{skill.icon}</span>}
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2 group-hover:h-2.5 transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a href="#projects" className="inline-flex items-center gap-2 text-primary hover:underline">
            <span>View my projects</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
