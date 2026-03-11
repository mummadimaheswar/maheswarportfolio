import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="relative group">
          <span className="text-lg font-inter font-black uppercase tracking-wider text-white">
            Maheswar
            <span className="text-[#00F0FF]">.</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-[#00F0FF] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_30px_6px_rgba(0,240,255,0.2)]"
        >
          Get in Touch
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white/60 hover:text-[#00F0FF] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-mono uppercase tracking-[0.2em] text-white/60 hover:text-[#00F0FF] transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono uppercase tracking-[0.15em] transition-all hover:bg-[#00F0FF] hover:text-black"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
