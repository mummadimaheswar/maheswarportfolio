import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './theme/ThemeProvider';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills-certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const resolvedTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/5 dark:border-white/5 light:bg-white/80 light:border-gray-200'
          : 'bg-transparent'
      }`}
      style={scrolled && resolvedTheme === 'light' ? { background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(0,0,0,0.08)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="relative group">
          <span className="text-lg font-inter font-black uppercase tracking-wider text-white dark:text-white text-gray-900" style={{ color: resolvedTheme === 'light' ? '#1a1a2e' : undefined }}>
            Maheswar
            <span className="text-[#00F0FF] dark:text-[#00F0FF]" style={{ color: resolvedTheme === 'light' ? '#0891B2' : undefined }}>.</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 relative group ${
                resolvedTheme === 'light'
                  ? 'text-gray-500 hover:text-[#0891B2]'
                  : 'text-white/50 hover:text-[#00F0FF]'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                resolvedTheme === 'light' ? 'bg-[#0891B2]' : 'bg-[#00F0FF]'
              }`} />
            </a>
          ))}
        </div>

        {/* Desktop: Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors duration-300 ${
              resolvedTheme === 'light'
                ? 'text-gray-500 hover:text-[#0891B2]'
                : 'text-white/50 hover:text-[#00F0FF]'
            }`}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="#contact"
            className={`inline-flex items-center px-5 py-2 text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 border ${
              resolvedTheme === 'light'
                ? 'border-[#0891B2]/40 text-[#0891B2] hover:bg-[#0891B2] hover:text-white hover:shadow-[0_0_30px_6px_rgba(8,145,178,0.15)]'
                : 'border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_30px_6px_rgba(0,240,255,0.2)]'
            }`}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden transition-colors ${
            resolvedTheme === 'light'
              ? 'text-gray-500 hover:text-[#0891B2]'
              : 'text-white/60 hover:text-[#00F0FF]'
          }`}
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
            className={`md:hidden backdrop-blur-2xl overflow-hidden ${
              resolvedTheme === 'light'
                ? 'bg-white/95 border-b border-gray-200'
                : 'bg-black/95 border-b border-white/5'
            }`}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-mono uppercase tracking-[0.2em] transition-colors py-2 border-b ${
                    resolvedTheme === 'light'
                      ? 'text-gray-600 hover:text-[#0891B2] border-gray-100'
                      : 'text-white/60 hover:text-[#00F0FF] border-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { toggleTheme(); setMobileOpen(false); }}
                className={`mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 border text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                  resolvedTheme === 'light'
                    ? 'border-gray-200 text-gray-600 hover:text-[#0891B2]'
                    : 'border-white/10 text-white/60 hover:text-[#00F0FF]'
                }`}
              >
                {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className={`mt-1 inline-flex items-center justify-center px-5 py-3 border text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                  resolvedTheme === 'light'
                    ? 'border-[#0891B2]/40 text-[#0891B2] hover:bg-[#0891B2] hover:text-white'
                    : 'border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black'
                }`}
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
