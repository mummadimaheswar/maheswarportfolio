
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FadeUp } from '../ui/motion';
import gsap from 'gsap';

// Import visualization components
import SemanticNetworkVisual from './visualizations/SemanticNetworkVisual';
import TemporalTimelineVisual from './visualizations/TemporalTimelineVisual';
import FuzzyLogicVisual from './visualizations/FuzzyLogicVisual';

const VisualPlayground = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    const sectionTitle = sectionRef.current.querySelector('.section-title');
    const tabsList = sectionRef.current.querySelector('.tabs-list');
    const contentContainer = sectionRef.current.querySelector('.content-container');

    if (sectionTitle && tabsList && contentContainer) {
      timeline
        .fromTo(
          sectionTitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          tabsList,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          contentContainer,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
    }

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="visual-playground" className="py-16 relative z-10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-teal to-cyberpunk-neon-green bg-clip-text text-transparent">
            Visual Playground
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-teal mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interact with visual representations of key concepts to deepen your understanding.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Tabs defaultValue="semantic-networks" className="w-full max-w-5xl">
            <TabsList className="tabs-list grid grid-cols-3 mb-8 w-full bg-card/40 backdrop-blur-sm">
              <TabsTrigger 
                value="semantic-networks" 
                className="data-[state=active]:bg-cyberpunk-purple/20 data-[state=active]:text-cyberpunk-purple"
              >
                Semantic Networks
              </TabsTrigger>
              <TabsTrigger 
                value="temporal-timeline" 
                className="data-[state=active]:bg-cyberpunk-teal/20 data-[state=active]:text-cyberpunk-teal"
              >
                Temporal Timeline
              </TabsTrigger>
              <TabsTrigger 
                value="fuzzy-logic" 
                className="data-[state=active]:bg-cyberpunk-neon-green/20 data-[state=active]:text-cyberpunk-neon-green"
              >
                Fuzzy Logic
              </TabsTrigger>
            </TabsList>
            
            <div className="content-container">
              <TabsContent value="semantic-networks" className="mt-0">
                <Card className="border border-cyberpunk-purple/30 bg-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyberpunk-purple">Semantic Networks</CardTitle>
                    <CardDescription>
                      Explore how knowledge is represented as a network of interconnected concepts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <SemanticNetworkVisual />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="temporal-timeline" className="mt-0">
                <Card className="border border-cyberpunk-teal/30 bg-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyberpunk-teal">Temporal Timeline</CardTitle>
                    <CardDescription>
                      Visualize how events and situations evolve over time in temporal reasoning.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <TemporalTimelineVisual />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="fuzzy-logic" className="mt-0">
                <Card className="border border-cyberpunk-neon-green/30 bg-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyberpunk-neon-green">Fuzzy Logic Simulator</CardTitle>
                    <CardDescription>
                      Experiment with fuzzy logic rules and see how membership functions work.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <FuzzyLogicVisual />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default VisualPlayground;
