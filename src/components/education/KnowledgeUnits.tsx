
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeUp, FadeIn } from '../ui/motion';
import gsap from 'gsap';

interface UnitContent {
  id: string;
  title: string;
  topics: {
    id: string;
    title: string;
    simplifiedContent: string;
    advancedContent: string;
  }[];
}

const units: UnitContent[] = [
  {
    id: 'unit-3',
    title: 'Unit III: Representation Schemes',
    topics: [
      {
        id: 'semantic-nets',
        title: 'Semantic Networks',
        simplifiedContent: 'Semantic networks are like webs showing how ideas connect. Think of it as a map of relationships between concepts, similar to how your brain connects related ideas.',
        advancedContent: 'Semantic networks are graph structures for representing knowledge through interconnected nodes and arcs. Nodes represent objects, concepts, or events while arcs define relationships between nodes. They enable inheritance, easy visualization of knowledge, and support for associative retrieval.'
      },
      {
        id: 'frames',
        title: 'Frames',
        simplifiedContent: "Frames are like fill-in-the-blank templates for describing objects or situations. Just as a picture frame gives structure to what's inside, knowledge frames organize information into slots.",
        advancedContent: 'Frames represent stereotypical situations and objects with slot-filler structures. Each frame contains slots for attributes with default values that can be overridden. Frames support inheritance hierarchies and procedural attachments, enabling both declarative and procedural knowledge representation.'
      },
      {
        id: 'scripts',
        title: 'Scripts',
        simplifiedContent: 'Scripts are like movie scripts for common situations. They help AI understand the typical sequence of events, like what usually happens when you go to a restaurant.',
        advancedContent: 'Scripts represent stereotypical event sequences for common situations, capturing causal and temporal relationships. They include roles (actors), props (objects), entry conditions, scenes (event sequences), and results, enabling an AI system to understand and reason about typical situations and their variations.'
      }
    ]
  },
  {
    id: 'unit-4',
    title: 'Unit IV: Reasoning Systems',
    topics: [
      {
        id: 'situation-calculus',
        title: 'Situation Calculus',
        simplifiedContent: 'Situation calculus is like a movie script that keeps track of how actions change the world. It helps AI understand "if I do X now, then Y will happen next."',
        advancedContent: 'Situation calculus is a first-order logic formalism for representing and reasoning about dynamic domains. It models the world as evolving through situations as a result of actions, with fluents describing properties that can change from one situation to another. Frame axioms handle persistence, while effect axioms describe action consequences.'
      },
      {
        id: 'event-calculus',
        title: 'Event Calculus',
        simplifiedContent: 'Event calculus is like a timeline that tracks when things happen and how long their effects last. It helps AI reason about changes over time.',
        advancedContent: 'Event calculus is a logical language for representing and reasoning about events, their effects, and temporal relationships. It uses predicates like Happens(e,t), HoldsAt(f,t), and Initiates(e,f,t) to describe when events occur and how they affect properties (fluents) of the world over time.'
      },
      {
        id: 'temporal-logic',
        title: 'Temporal Logic',
        simplifiedContent: 'Temporal logic adds time words like "always," "eventually," and "until" to regular logic. It helps AI think about things that change over time.',
        advancedContent: 'Temporal logic extends classical logic with operators for reasoning about time-dependent properties. Linear Temporal Logic (LTL) and Computational Tree Logic (CTL) provide formal ways to express properties like "eventually," "always," "until," and "next," enabling verification of system behaviors over time.'
      }
    ]
  },
  {
    id: 'unit-5',
    title: 'Unit V: Uncertainty Management',
    topics: [
      {
        id: 'fuzzy-sets',
        title: 'Fuzzy Sets',
        simplifiedContent: 'Fuzzy sets are like partial memberships to groups. Instead of being either "tall" or "not tall," you can be "somewhat tall" - allowing for degrees of belonging.',
        advancedContent: 'Fuzzy sets extend classical set theory by allowing partial membership, represented by values between 0 and 1. This enables modeling of vague concepts where boundaries are not sharply defined. Fuzzy sets support operations like union, intersection, and complement, but use min/max or other fuzzy operators instead of Boolean logic.'
      },
      {
        id: 'fuzzy-relations',
        title: 'Fuzzy Relations',
        simplifiedContent: "Fuzzy relations describe connections between things that aren't black and white. Like rating how much you like different foods on a scale, rather than just \"like\" or \"don't like.\"",
        advancedContent: 'Fuzzy relations extend fuzzy sets to describe relationships between elements of two or more sets. They are represented as matrices where each element indicates the strength of the relationship (between 0 and 1). Composition of fuzzy relations enables complex reasoning chains with preserved uncertainty.'
      },
      {
        id: 'fuzzy-logic',
        title: 'Fuzzy Logic',
        simplifiedContent: 'Fuzzy logic is a way to reason with "maybe" instead of just "yes" or "no." It helps computers make decisions with unclear information, like humans do.',
        advancedContent: 'Fuzzy logic extends Boolean logic to handle degrees of truth. It enables approximate reasoning through linguistic variables, fuzzy rules (IF-THEN statements with fuzzy predicates), and inference mechanisms like Mamdani and Sugeno models. Fuzzy control systems apply these principles to control problems with imprecise inputs.'
      }
    ]
  }
];

const KnowledgeUnits = () => {
  const [viewMode, setViewMode] = useState<'simplified' | 'advanced'>('simplified');
  const sectionRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    timeline.fromTo(
      sectionRef.current.querySelector('.section-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );

    timeline.fromTo(
      sectionRef.current.querySelector('.mode-toggle'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.2 }
    );

    unitRefs.current.forEach((unitRef, index) => {
      if (unitRef) {
        timeline.fromTo(
          unitRef,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: index * 0.2 },
          '-=0.3'
        );
      }
    });

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section id="knowledge-units" className="py-16 bg-secondary/30 relative z-10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-teal to-cyberpunk-neon-green bg-clip-text text-transparent">
            Dynamic Knowledge Units
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-teal mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the core knowledge units of KRR with interactive, collapsible sections.
          </p>
        </div>

        <div className="mode-toggle flex justify-center mb-8">
          <div className="flex bg-card/40 backdrop-blur-sm p-1 rounded-lg border border-muted">
            <Button
              variant="ghost"
              className={`${viewMode === 'simplified' ? 'bg-primary text-primary-foreground' : ''} rounded-lg mr-1`}
              onClick={() => setViewMode('simplified')}
            >
              Explain Like I'm 5
            </Button>
            <Button
              variant="ghost"
              className={`${viewMode === 'advanced' ? 'bg-primary text-primary-foreground' : ''} rounded-lg`}
              onClick={() => setViewMode('advanced')}
            >
              In-Depth View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {units.map((unit, index) => (
            <Card 
              key={unit.id} 
              className="backdrop-blur-sm bg-card/60 border-muted overflow-hidden"
              ref={(el) => (unitRefs.current[index] = el)}
            >
              <CardHeader className={`${
                index === 0 ? 'bg-cyberpunk-purple/20 border-b border-cyberpunk-purple/30' : 
                index === 1 ? 'bg-cyberpunk-teal/20 border-b border-cyberpunk-teal/30' : 
                'bg-cyberpunk-neon-green/20 border-b border-cyberpunk-neon-green/30'
              }`}>
                <CardTitle className="text-xl">{unit.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {unit.topics.map(topic => (
                    <AccordionItem key={topic.id} value={topic.id} className="border-b border-muted">
                      <AccordionTrigger className="px-6 py-4 hover:bg-card/80 hover:no-underline">
                        {topic.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 px-6">
                        <p className="text-muted-foreground">
                          {viewMode === 'simplified' ? topic.simplifiedContent : topic.advancedContent}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeUnits;
