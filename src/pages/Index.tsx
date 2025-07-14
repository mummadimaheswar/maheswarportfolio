
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import ScrollToTop from '../components/ScrollToTop';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // GSAP smooth scrolling
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section) => {
      const sectionId = section.getAttribute('id') || '';
      
      // Set up scroll trigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          section.classList.add('visible');
        }
      });
      
      sectionRefs.current[sectionId] = section as HTMLElement;
    });

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" id="home">
      <ParticlesBackground />
      <Navbar />
      <ScrollToTop />
      
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
