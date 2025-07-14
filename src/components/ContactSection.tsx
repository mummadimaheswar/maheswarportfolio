
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// AI-generated quotes for hovering over social icons
const aiQuotes: Record<string, string> = {
  email: "The best code is written with communication in mind.",
  github: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
  linkedin: "Success in AI is not just about the algorithms; it's about solving real human problems.",
};

const ContactSection = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const { toast } = useToast();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Have a question about my work? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-8">
                I'm interested in AI development opportunities. Feel free to reach out if you have a question or just want to say hi.
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:mummadimahesh12@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
                  onMouseEnter={() => setActiveQuote("email")}
                  onMouseLeave={() => setActiveQuote(null)}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary contact-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">mummadimahesh12@gmail.com</p>
                    {activeQuote === "email" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs italic text-primary mt-1"
                      >
                        "{aiQuotes.email}"
                      </motion.p>
                    )}
                  </div>
                </a>
                
                <a
                  href="https://github.com/mummadimaheswar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
                  onMouseEnter={() => setActiveQuote("github")}
                  onMouseLeave={() => setActiveQuote(null)}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary contact-icon">
                    <Github size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <p className="font-medium">mummadimaheswar</p>
                    {activeQuote === "github" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs italic text-primary mt-1"
                      >
                        "{aiQuotes.github}"
                      </motion.p>
                    )}
                  </div>
                </a>
                
                <a
                  href="https://linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
                  onMouseEnter={() => setActiveQuote("linkedin")}
                  onMouseLeave={() => setActiveQuote(null)}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary contact-icon">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-medium">Maheswar Reddy</p>
                    {activeQuote === "linkedin" && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs italic text-primary mt-1"
                      >
                        "{aiQuotes.linkedin}"
                      </motion.p>
                    )}
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <a
                href="http://mummadimaheswar.github.io/my-portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink size={16} />
                <span>View Full Portfolio</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto gap-2" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
