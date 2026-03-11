import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ShaderBackground from '../components/ShaderBackground';

const ExperienceEducation = lazy(() => import('../components/ExperienceEducation'));
const FeaturedProjects = lazy(() => import('../components/FeaturedProjects'));
const Publications = lazy(() => import('../components/Publications'));
const ContactFooter = lazy(() => import('../components/ContactFooter'));

const Index = () => {
  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden noise-overlay" id="home">
      {/* Fixed GLSL shader background */}
      <ShaderBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero section overlays the shader */}
      <HeroSection />

      {/* Remaining sections with lazy loading */}
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center relative z-10">
            <div className="w-5 h-5 border border-[#00F0FF]/40 border-t-[#00F0FF] animate-spin" />
          </div>
        }
      >
        {/* Dark overlay to fade out shader for content sections */}
        <div className="relative z-10">
          {/* Gradient transition from shader to solid */}
          <div className="h-32 bg-gradient-to-b from-transparent to-[#080808]" />

          <div className="bg-[#080808] relative">
            {/* Subtle grid overlay for texture */}
            <div className="absolute inset-0 grid-overlay pointer-events-none" />

            <ExperienceEducation />
            <FeaturedProjects />
            <Publications />
            <ContactFooter />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
