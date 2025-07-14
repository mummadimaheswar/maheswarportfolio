import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Briefcase, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Achievement {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
}

const achievements: Achievement[] = [
  {
    title: "AI Project: Image Captioning System",
    date: "Dec 2023",
    description: "Developed an AI-powered image captioning system using deep learning models with a user-friendly Gradio interface.",
    icon: <Award size={18} />,
    tags: ["AI", "Deep Learning", "Python"]
  },
  {
    title: "Sentiment Analysis Project",
    date: "Oct 2023",
    description: "Built a machine learning model to analyze text sentiment with high accuracy, trained on diverse datasets.",
    icon: <Star size={18} />,
    tags: ["ML", "NLP", "Data Science"]
  },
  {
    title: "Personal Data Chatbot",
    date: "Jul 2023",
    description: "Created a chatbot that integrates with Google Sheets to provide personalized responses based on user data.",
    icon: <Award size={18} />,
    tags: ["ChatGPT API", "Integration", "JavaScript"]
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Experience & Achievements</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and notable accomplishments along the way
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="ml-6 mb-12 timeline-item"
            >
              <div className="timeline-dot"></div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <div className="flex items-center text-primary text-sm">
                    <Calendar size={14} className="mr-1" />
                    {item.date}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
