
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Database, Code, Server, Speech, Sparkles } from 'lucide-react';

const skills = [
  { icon: <Brain size={32} />, name: "Machine Learning", delay: 0.1 },
  { icon: <Speech size={32} />, name: "Natural Language Processing", delay: 0.2 },
  { icon: <Database size={32} />, name: "Deep Learning", delay: 0.3 },
  { icon: <Code size={32} />, name: "Python", delay: 0.4 },
  { icon: <Server size={32} />, name: "Microsoft Azure", delay: 0.5 },
  { icon: <Sparkles size={32} />, name: "Generative AI", delay: 0.6 }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
          ref={ref}
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-primary">Career Objective</h3>
            <p className="text-muted-foreground leading-relaxed">
              Artificial Intelligence (AI) is transforming industries, and I am passionate about leveraging AI to solve complex challenges, 
              optimize business processes, and enhance user experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My ultimate goal is to become an AI Developer, contributing to the field by designing intelligent systems and implementing innovative solutions. 
              Through continuous learning and hands-on experience, I aim to master AI technologies, develop scalable AI models, 
              and apply them effectively in real-world applications.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center bg-card p-4 rounded-lg text-center glow-effect hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary mb-3">
                  {skill.icon}
                </div>
                <h4 className="text-sm font-medium">{skill.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
