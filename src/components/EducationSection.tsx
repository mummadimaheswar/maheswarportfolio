
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const educationData = [
  {
    title: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    institution: "Nalla Malla Reddy Engineering College",
    duration: "2022 - 2026",
    description: "As a computer science student, I have gained knowledge in programming, data structures, algorithms, artificial intelligence, and machine learning."
  },
  {
    title: "Senior Secondary Education (XII)",
    field: "Science Stream",
    institution: "Narayana Junior College, Kadapa",
    duration: "2022",
    percentage: "90.00%",
    description: "During my higher secondary education, I focused on mathematics, physics, and computer science."
  },
  {
    title: "Secondary Education (X)",
    institution: "Bhashyam High School, Kadapa",
    duration: "2020",
    percentage: "98.30%",
    description: "Achieving outstanding academic performance in my 10th grade helped me develop strong problem-solving skills."
  }
];

const certifications = [
  {
    title: "AI Developer",
    organization: "IBM",
    duration: "Aug 2024 - Present",
    description: "Learned to build AI models and implement machine learning algorithms using Python."
  },
  {
    title: "Generative AI with Vertex AI",
    organization: "Google",
    duration: "Aug 2024",
    description: "Explored fundamentals of generative AI and implementation on Google Cloud's Vertex AI platform."
  },
  {
    title: "Natural Language Processing (NLP)",
    organization: "Microsoft",
    duration: "Jul 2024 - Aug 2024",
    description: "Developed proficiency in NLP techniques and chatbot development."
  },
  {
    title: "Computer Vision in Microsoft Azure",
    organization: "Microsoft",
    duration: "Jul 2024",
    description: "Worked on computer vision applications using Microsoft Azure AI services."
  }
];

const TimelineItem = ({ data, index, isInView }: { data: any, index: number, isInView: boolean }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className="timeline-item pl-8 mb-12 last:mb-0 relative"
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="timeline-dot"></div>
      <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
        <div className="flex items-start gap-4">
          <GraduationCap className="text-primary flex-shrink-0" size={24} />
          <div>
            <h3 className="text-xl font-semibold">{data.title}</h3>
            {data.field && <p className="text-muted-foreground">{data.field}</p>}
            
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {data.duration}
              </span>
              
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {data.institution}
              </span>
            </div>
            
            {data.percentage && (
              <p className="text-sm font-semibold mt-2">Percentage: {data.percentage}</p>
            )}
            
            <p className="mt-2 text-sm text-muted-foreground">{data.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const certRef = useRef(null);
  const certInView = useInView(certRef, { once: true, amount: 0.1 });

  return (
    <section id="education" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
          ref={ref}
        >
          <h2 className="text-3xl font-bold mb-2">Education Journey</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {educationData.map((item, index) => (
            <TimelineItem key={index} data={item} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={certInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mt-24 mb-16 text-center"
          ref={certRef}
        >
          <h2 className="text-3xl font-bold mb-2">Certifications & Training</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={certInView ? "visible" : "hidden"}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
              <p className="text-primary text-sm">{cert.organization}</p>
              <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1 mt-1">
                <Calendar size={12} />
                {cert.duration}
              </p>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
