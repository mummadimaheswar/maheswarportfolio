import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ExternalLink, Github, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    id: 1,
    title: "Image Captioning using Generative AI",
    date: "Jan 2024",
    description: "Developed an AI-powered image captioning system using deep learning models with a user-friendly Gradio interface.",
    longDescription: "This image captioning system uses a combination of CNN and Transformer architectures to generate descriptive captions for uploaded images. The model was trained on MS COCO dataset and fine-tuned for better accuracy. The Gradio interface makes it accessible to non-technical users who can simply upload their images and get relevant captions.",
    tech: ["Python", "PyTorch", "Transformers", "Gradio", "CNN"],
    category: "AI/ML",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*6BUJe0KjZgEGpVAp3Vl-wQ.jpeg",
    github: "https://github.com/mummadimaheswar"
  },
  {
    id: 2,
    title: "Sentiment Analysis using ML",
    date: "Dec 2023",
    description: "Built a machine learning model to analyze text sentiment with high accuracy across various domains.",
    longDescription: "This sentiment analysis tool uses natural language processing and machine learning to identify and extract subjective information from text data. It can classify text as positive, negative, or neutral with high accuracy. The model was trained on diverse datasets to ensure robust performance across different domains and text types.",
    tech: ["Python", "NLTK", "Scikit-learn", "BERT", "Data Visualization"],
    category: "AI/ML",
    image: "https://vitalflux.com/wp-content/uploads/2021/10/sentiment-analysis-use-cases-examples.png",
    github: "https://github.com/mummadimaheswar"
  },
  {
    id: 3,
    title: "Personal Data Chatbot",
    date: "Nov 2023",
    description: "Created a chatbot that integrates with Google Sheets to provide personalized responses based on user data.",
    longDescription: "This chatbot leverages the power of the ChatGPT API and integrates with Google Sheets to provide personalized responses based on user-specific data. The system uses advanced prompt engineering to ensure accurate and contextually relevant responses, and includes features like conversation history and data validation.",
    tech: ["JavaScript", "ChatGPT API", "Google Sheets API", "Web Development"],
    category: "AI/ML",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1676621252349/26fc28f4-c06b-4fdc-b4fa-7b91862eff42.png",
    github: "https://github.com/mummadimaheswar"
  }
];

const categories = ["All", "AI/ML", "UI/UX", "Design", "Web Dev"];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleOpenProject = (id: number) => {
    setSelectedProject(id);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const getProject = (id: number | null) => {
    if (id === null) return null;
    return projects.find(p => p.id === id);
  };

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const selectedProjectData = getProject(selectedProject);

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my AI development journey through these projects, showcasing my expertise in machine learning,
            deep learning, and UI/UX design.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center flex-wrap gap-2 mb-10"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="project-card bg-card rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-primary mb-3">{project.date}</p>
                      <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-secondary/30 text-xs rounded-full px-3 py-1">{tech}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="bg-secondary/30 text-xs rounded-full px-3 py-1">+{project.tech.length - 3}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenProject(project.id)}
                    className="mt-6 w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {filteredProjects.map((project) => (
                <CarouselItem key={project.id}>
                  <div className="project-card bg-card rounded-lg overflow-hidden shadow-lg">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-primary mb-3">{project.date}</p>
                      <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                      <div className="mt-6 flex gap-2 flex-wrap">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="bg-secondary/30 text-xs rounded-full px-3 py-1">{tech}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleOpenProject(project.id)}
                        className="mt-6 w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={handleCloseProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card rounded-xl shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={selectedProjectData.image} 
                  alt={selectedProjectData.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                  onClick={handleCloseProject}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{selectedProjectData.title}</h3>
                <p className="text-primary mb-6">{selectedProjectData.date}</p>
                
                <div className="mb-6">
                  <Badge variant="outline">{selectedProjectData.category}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-6">{selectedProjectData.longDescription}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.tech.map((tech, i) => (
                      <span key={i} className="bg-primary/10 text-primary text-sm rounded-full px-3 py-1">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={selectedProjectData.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Github size={16} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
