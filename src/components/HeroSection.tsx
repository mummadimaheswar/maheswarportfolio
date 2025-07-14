
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeWriter, FadeUp, ScaleIn } from '@/components/ui/motion';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowArrow(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="neural-bg absolute inset-0 z-0 opacity-50"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-primary text-lg"
            >
              Hello, I'm
            </motion.p>
            
            <TypeWriter delay={0.5} className="inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                MUMMADI MAHESWAR REDDY
              </h1>
            </TypeWriter>
          </div>
          
          <FadeUp delay={2.0}>
            <h2 className="text-xl md:text-3xl text-muted-foreground">
              <span className="text-primary">AI Enthusiast.</span> Final Year BTech Student. Building ML Solutions with a Creative Touch.
            </h2>
          </FadeUp>
          
          <ScaleIn delay={2.5}>
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/50 glow-effect">
              <img 
                src="https://avatars.githubusercontent.com/u/25870426?v=4" 
                alt="Mummadi Maheswar Reddy"
                className="w-full h-full object-cover"
              />
            </div>
          </ScaleIn>
          
          <FadeUp delay={3.0}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating intelligent solutions with expertise in machine learning, deep learning, and natural language processing.
            </p>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                variant="default" 
                className="gap-2"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download size={18} />
                  Download Resume
                </a>
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Projects
                <ArrowRight size={18} />
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
      
      {showArrow && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          onClick={() => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
              skillsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <ArrowDown className="text-primary w-8 h-8 cursor-pointer" />
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
