
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  size: number;
  color: string;
}

const skills: Skill[] = [
  { name: "Python", size: 1.2, color: "#9b87f5" },
  { name: "AI", size: 1.5, color: "#9b87f5" },
  { name: "Machine Learning", size: 1.3, color: "#9b87f5" },
  { name: "Deep Learning", size: 1.2, color: "#0EA5E9" },
  { name: "NLP", size: 1.4, color: "#9b87f5" },
  { name: "TensorFlow", size: 1.1, color: "#0EA5E9" },
  { name: "PyTorch", size: 1, color: "#9b87f5" },
  { name: "Computer Vision", size: 1.1, color: "#0EA5E9" },
  { name: "UI/UX", size: 1, color: "#9b87f5" },
  { name: "Figma", size: 0.9, color: "#0EA5E9" },
  { name: "React", size: 1.2, color: "#9b87f5" },
  { name: "Git", size: 1, color: "#0EA5E9" },
  { name: "Docker", size: 1.1, color: "#9b87f5" },
  { name: "Design", size: 1.3, color: "#0EA5E9" },
  { name: "Data Science", size: 1.2, color: "#9b87f5" },
  { name: "Scikit-learn", size: 0.9, color: "#39FF14" },
  { name: "Neural Networks", size: 1, color: "#9b87f5" },
  { name: "Data Analysis", size: 1.1, color: "#0EA5E9" },
  { name: "Flask", size: 0.9, color: "#39FF14" },
  { name: "Jupyter", size: 0.9, color: "#0EA5E9" },
];

const SkillsCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const radius = 180;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  // GSAP animations setup
  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation with GSAP
    const titleAnim = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    if (titleRef.current) {
      titleAnim
        .fromTo(titleRef.current.querySelector("h2"), 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(titleRef.current.querySelector(".divider"), 
          { scaleX: 0, opacity: 0 }, 
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(titleRef.current.querySelector("p"), 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        );
    }

    return () => {
      // Clean up ScrollTrigger to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 3D Skill Cloud animation
  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const container = containerRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    let mouseX = centerX;
    let mouseY = centerY;
    let animationFrameId: number;
    
    // Start animation once the component is in view
    controls.start({ opacity: 1, transition: { duration: 1 } });

    const positionItems = () => {
      const totalItems = items.length;
      
      items.forEach((item, index) => {
        if (!item) return;

        // Calculate initial positions on a sphere
        const phi = Math.acos(-1 + (2 * index) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        // Calculate angle based on mouse position (stronger effect when hovering)
        const sensitivity = isHovering ? 1 : 0.3;
        const mouseXFactor = (mouseX / containerRect.width) * 2 - 1;
        const mouseYFactor = (mouseY / containerRect.height) * 2 - 1;
        const rotationX = mouseYFactor * 30 * sensitivity; // degree of rotation
        const rotationY = mouseXFactor * 30 * sensitivity;
        
        // Apply 3D rotation matrix
        const angleX = rotationX * Math.PI / 180;
        const angleY = rotationY * Math.PI / 180;
        
        // Rotate around Y-axis
        let newX = x;
        let newZ = z * Math.cos(angleY) - x * Math.sin(angleY);
        
        // Rotate around X-axis
        let newY = y * Math.cos(angleX) - newZ * Math.sin(angleX);
        newZ = y * Math.sin(angleX) + newZ * Math.cos(angleX);
        
        // Convert 3D coordinates to 2D with perspective
        const perspective = 800;
        const scale = perspective / (perspective + newZ);
        
        // Apply transformations
        const translateX = newX * scale + centerX;
        const translateY = newY * scale + centerY;
        
        item.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale * (item.dataset.size as unknown as number)})`;
        item.style.zIndex = `${Math.floor(scale * 100)}`;
        item.style.opacity = `${Math.max(0.4, scale)}`;
      });
      
      animationFrameId = requestAnimationFrame(positionItems);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', () => setIsHovering(true));
    container.addEventListener('mouseleave', () => setIsHovering(false));
    
    positionItems();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', () => setIsHovering(true));
      container.removeEventListener('mouseleave', () => setIsHovering(false));
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, controls, isHovering]);

  return (
    <section 
      id="skill-cloud" 
      className="py-10" 
      ref={(el) => { ref.current = el; sectionRef.current = el; }}
    >
      <div className="container mx-auto px-6 w-full">
        <div
          ref={titleRef}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-2 text-cyberpunk-purple">My Tech Stack</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 divider"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the technologies I work with to build innovative AI solutions and creative designs
          </p>
        </div>

        <motion.div 
          className="relative h-[420px] skill-cloud mx-auto cyberpunk-border rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={controls}
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              ref={el => itemsRef.current[index] = el}
              data-size={skill.size}
              className="skill-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
              style={{ color: skill.color }}
              whileHover={{ 
                scale: 1.1, 
                transition: { duration: 0.3 } 
              }}
            >
              <div 
                className={`font-medium px-4 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-${skill.color === "#9b87f5" ? "cyberpunk-purple/30" : skill.color === "#0EA5E9" ? "cyberpunk-teal/30" : "cyberpunk-neon-green/30"} animate-glow-pulse`}
                style={{ 
                  fontSize: `${skill.size}rem`,
                  boxShadow: `0 0 10px 2px ${skill.color}40`,
                  textShadow: `0 0 5px ${skill.color}60`
                }}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsCloud;
