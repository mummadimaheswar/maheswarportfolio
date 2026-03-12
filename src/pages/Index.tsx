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
    <div className="min-h-screen overflow-x-hidden noise-overlay" id="home">
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
        {/* Content sections – semi-transparent so seascape shader shows through */}
        <div className="relative z-10">
          {/* Subtle grid overlay for texture */}
          <div className="absolute inset-0 grid-overlay pointer-events-none" />

          <ExperienceEducation />
          <FeaturedProjects />
          <Publications />
          <ContactFooter />
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
