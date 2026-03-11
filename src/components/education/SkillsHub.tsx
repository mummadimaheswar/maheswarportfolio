
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Clock, AlertCircle } from 'lucide-react';
import { TypeWriter, FadeUp } from '../ui/motion';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  explanation: string;
  analogy: string;
  quiz: {
    question: string;
    options: string[];
    answer: number;
  };
}

const skills: Skill[] = [
  {
    id: 'logical-representation',
    title: 'Logical Representation',
    icon: <Brain className="h-8 w-8 text-cyberpunk-purple" />,
    shortDescription: 'Learn about propositional and predicate logic',
    explanation: 'Logical representation in AI uses formal systems like propositional and predicate logic to express knowledge in a form that enables reasoning. Propositional logic uses simple statements with Boolean operators, while predicate logic adds variables, quantifiers, and functions for more expressive power.',
    analogy: 'Think of propositional logic like simple light switches (on/off) and predicate logic like dimmer switches that can express various states and relationships.',
    quiz: {
      question: 'Which of the following is a limitation of propositional logic?',
      options: [
        'It can only express true/false statements',
        'It can represent objects and their relations',
        'It includes universal quantifiers',
        'It requires neural networks to function'
      ],
      answer: 0
    }
  },
  {
    id: 'temporal-reasoning',
    title: 'Reasoning Over Time',
    icon: <Clock className="h-8 w-8 text-cyberpunk-teal" />,
    shortDescription: 'Explore situation calculus and temporal logic',
    explanation: 'Temporal reasoning systems enable AI to represent and reason about time-dependent knowledge. Situation calculus models how actions change the world over time, while temporal logic provides formal systems for representing and reasoning about time-related information.',
    analogy: 'If regular logic is like a photograph (a snapshot of reality), temporal logic is like a movie that captures how things change over time.',
    quiz: {
      question: 'Situation calculus primarily deals with:',
      options: [
        'Static knowledge representation',
        'How actions change the world over time',
        'Quantum computing algorithms',
        'Database design'
      ],
      answer: 1
    }
  },
  {
    id: 'uncertainty',
    title: 'Handling Uncertainty',
    icon: <AlertCircle className="h-8 w-8 text-cyberpunk-neon-green" />,
    shortDescription: 'Master fuzzy logic and probabilistic reasoning',
    explanation: 'Unlike binary logic, fuzzy logic allows for degrees of truth, making it ideal for handling uncertainty and vagueness. Fuzzy sets enable objects to belong to multiple sets with different degrees of membership, allowing more nuanced reasoning.',
    analogy: 'Traditional logic is like classifying temperature as either "hot" or "cold," while fuzzy logic recognizes a spectrum where something can be "somewhat hot" or "very cold."',
    quiz: {
      question: 'In fuzzy logic, an element:',
      options: [
        'Must belong to exactly one set',
        'Can only be true or false',
        'Can belong to multiple sets with varying degrees',
        'Is always represented by binary values'
      ],
      answer: 2
    }
  }
];

const SkillsHub = () => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [quizResponses, setQuizResponses] = useState<Record<string, number | null>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, boolean | null>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    if (cardsRef.current) {
      timeline.fromTo(
        cardsRef.current.children,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 0.8, 
          ease: 'power3.out'
        }
      );
    }

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, []);

  const handleExpandSkill = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  const handleQuizResponse = (skillId: string, optionIndex: number) => {
    setQuizResponses(prev => ({
      ...prev,
      [skillId]: optionIndex
    }));
    
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      const isCorrect = optionIndex === skill.quiz.answer;
      setQuizFeedback(prev => ({
        ...prev,
        [skillId]: isCorrect
      }));
    }
  };

  return (
    <section 
      id="skills-hub" 
      className="py-16 relative z-10 section-fade"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <FadeUp delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-teal to-cyberpunk-neon-green bg-clip-text text-transparent">
              Skill-Focused Learning Hub
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-teal mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master the core skills of Knowledge Representation and Reasoning through interactive learning modules.
            </p>
          </div>
        </FadeUp>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          ref={cardsRef}
        >
          {skills.map(skill => (
            <Card 
              key={skill.id}
              className={`overflow-hidden transition-all duration-500 project-card 
                ${expandedSkill === skill.id ? 'md:col-span-3' : 'md:col-span-1'} 
                backdrop-blur-sm bg-card/60 border-${skill.id === 'logical-representation' ? 'cyberpunk-purple/30' : skill.id === 'temporal-reasoning' ? 'cyberpunk-teal/30' : 'cyberpunk-neon-green/30'}`}
            >
              <CardHeader className={`relative ${expandedSkill === skill.id ? 'border-b border-muted' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${skill.id === 'logical-representation' ? 'bg-cyberpunk-purple/20' : skill.id === 'temporal-reasoning' ? 'bg-cyberpunk-teal/20' : 'bg-cyberpunk-neon-green/20'}`}>
                      {skill.icon}
                    </div>
                    <CardTitle>{skill.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleExpandSkill(skill.id)}
                    className={`${skill.id === 'logical-representation' ? 'text-cyberpunk-purple hover:bg-cyberpunk-purple/20' : 
                      skill.id === 'temporal-reasoning' ? 'text-cyberpunk-teal hover:bg-cyberpunk-teal/20' : 
                      'text-cyberpunk-neon-green hover:bg-cyberpunk-neon-green/20'}`}
                  >
                    {expandedSkill === skill.id ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
                <CardDescription className="mt-2">{skill.shortDescription}</CardDescription>
              </CardHeader>
              
              <AnimatePresence>
                {expandedSkill === skill.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-foreground">Explanation</h4>
                          <p className="text-muted-foreground">{skill.explanation}</p>
                          
                          <h4 className="text-lg font-semibold mt-6 mb-3 text-foreground">Real-World Analogy</h4>
                          <div className={`p-4 rounded-lg border ${skill.id === 'logical-representation' ? 'border-cyberpunk-purple/30 bg-cyberpunk-purple/10' : 
                            skill.id === 'temporal-reasoning' ? 'border-cyberpunk-teal/30 bg-cyberpunk-teal/10' : 
                            'border-cyberpunk-neon-green/30 bg-cyberpunk-neon-green/10'}`}>
                            <p className="italic">{skill.analogy}</p>
                          </div>
                        </div>
                        
                        <div className={`p-6 rounded-lg border ${skill.id === 'logical-representation' ? 'border-cyberpunk-purple/30 bg-cyberpunk-purple/5' : 
                          skill.id === 'temporal-reasoning' ? 'border-cyberpunk-teal/30 bg-cyberpunk-teal/5' : 
                          'border-cyberpunk-neon-green/30 bg-cyberpunk-neon-green/5'}`}>
                          <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Concept Check</h4>
                          
                          <div className="mb-4">
                            <p className="mb-3">{skill.quiz.question}</p>
                            <div className="space-y-2">
                              {skill.quiz.options.map((option, idx) => (
                                <div 
                                  key={idx}
                                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200
                                    ${quizResponses[skill.id] === idx ? 
                                      quizFeedback[skill.id] ? 
                                        'border-cyberpunk-neon-green bg-cyberpunk-neon-green/20' : 
                                        'border-red-500 bg-red-500/20' 
                                      : 'border-muted bg-card hover:border-primary'}`}
                                  onClick={() => handleQuizResponse(skill.id, idx)}
                                >
                                  <p>{option}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {quizFeedback[skill.id] !== undefined && (
                            <div className={`mt-4 p-3 rounded-lg ${quizFeedback[skill.id] ? 'bg-cyberpunk-neon-green/20' : 'bg-red-500/20'}`}>
                              <p className={quizFeedback[skill.id] ? 'text-cyberpunk-neon-green' : 'text-red-400'}>
                                {quizFeedback[skill.id] ? 'Correct! Well done.' : `Incorrect. Try again!`}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-end pt-2 pb-4">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => setExpandedSkill(null)}>
                        Close
                      </Button>
                      <Button 
                        className={`${skill.id === 'logical-representation' ? 'bg-cyberpunk-purple hover:bg-cyberpunk-purple/80' : 
                          skill.id === 'temporal-reasoning' ? 'bg-cyberpunk-teal hover:bg-cyberpunk-teal/80' : 
                          'bg-cyberpunk-neon-green hover:bg-cyberpunk-neon-green/80'} text-white`}
                        size="sm"
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsHub;
