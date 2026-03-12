import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Send, ArrowUpRight } from 'lucide-react';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mummadi-maheswar-reddy-011a032b9/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mummadimaheswar/',
    icon: Github,
  },
  {
    label: 'Email',
    href: 'mailto:mummadimahesh12@gmail.com',
    icon: Mail,
  },
];

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // TODO: Replace with real form submission (e.g., EmailJS, Formspree, or custom API)
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[#080808]/70 backdrop-blur-sm">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
              {'// get in touch'}
            </p>
            <h2 className="text-3xl md:text-5xl font-inter font-black uppercase text-white mb-4">
              Let's <span className="text-[#00F0FF]">Connect</span>
            </h2>
            <p className="text-sm md:text-base text-white/40 max-w-lg">
              Open to research collaborations, internship opportunities, and
              conversations about generative AI and machine learning.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder:text-white/20 focus:border-[#00F0FF] focus:outline-none transition-colors font-inter"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder:text-white/20 focus:border-[#00F0FF] focus:outline-none transition-colors font-inter"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder:text-white/20 focus:border-[#00F0FF] focus:outline-none transition-colors resize-none font-inter"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_50px_12px_rgba(0,240,255,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : sent ? 'Message Sent!' : 'Send Message'}
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </motion.div>

            {/* Right: Social links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col justify-between"
            >
              <div className="space-y-6">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 border border-white/8 hover:border-[#00F0FF]/30 transition-all duration-300 hover:shadow-[0_0_30px_4px_rgba(0,240,255,0.06)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 group-hover:border-[#00F0FF]/40 group-hover:text-[#00F0FF] transition-all duration-300">
                        <social.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-mono uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors">
                        {social.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#00F0FF] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>

              {/* Status card */}
              <div className="mt-8 glass-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-[#00F0FF] animate-glow-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00F0FF]/60">
                    Status
                  </span>
                </div>
                <p className="text-sm text-white/50">
                  Open to research collaborations, AI/ML internships, and
                  full-time opportunities starting 2026.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <footer className="py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/20 uppercase tracking-[0.15em]">
            &copy; {new Date().getFullYear()} Mummadi Maheswar Reddy
          </p>
          <p className="text-xs font-mono text-white/15 uppercase tracking-[0.15em]">
            Built with React + Three.js + GLSL + Framer Motion
          </p>
        </div>
      </footer>
    </section>
  );
}
