import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';

interface TimelineEntry {
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

interface ProjectEntry {
  title: string;
  period: string;
  description: string[];
}

const timelineData: TimelineEntry[] = [
  {
    type: 'experience',
    title: 'AI Research Intern',
    organization: 'Coding Jr',
    location: 'Remote',
    period: '06/2025 - 01/2026',
    description: [
      'Architected a production-scale LLM evaluation pipeline using an LLM-as-a-Judge meta-evaluation architecture to benchmark code reasoning reliability across 50+ adversarial and boundary test scenarios.',
      'Formulated a statistically controlled prompt optimization workflow combining A/B experimentation, comparative scoring heuristics, and variance tracking, reducing nondeterministic outputs by 40% during complex code refactoring tasks.',
      'Engineered an automated adversarial testing framework detecting hallucination signatures, reasoning drift, and edge-case failure patterns across polyglot code repositories.',
      'Implemented multi-layer inference guardrails integrating AST structural parsing, semantic equivalence validation, and logical constraint enforcement before production response delivery.',
      'Established long-context reasoning benchmarks using RAG-driven dynamic context orchestration, mitigating lost-in-the-middle degradation in multi-file dependency analysis.',
    ],
    tags: ['LLM Evaluation', 'Prompt Optimization', 'Adversarial Testing', 'Guardrails', 'RAG'],
  },
  {
    type: 'education',
    title: 'B.Tech in Computer Science Engineering - CGPA: 8.5',
    organization: 'Nalla Malla Reddy Engineering College',
    location: 'Hyderabad',
    period: '2022 - 2026',
    description: [
      'Computer Science Engineering undergraduate program with strong foundation in AI, machine learning, and software engineering fundamentals.',
    ],
    tags: ['Computer Science', 'AI', 'Machine Learning', 'Software Engineering'],
  },
];

const skillsData = [
  {
    category: 'Python',
    items:
      'Object-Oriented Programming (OOP) | Data Structures Implementation (Lists, Dictionaries, Sets, Tuples) | Algorithms & Problem Solving | File Handling & Exception Handling | Functional Programming Concepts | Comprehensions & Iterators | Modular Code Design | Virtual Environments & Dependency Management',
  },
  {
    category: 'Generative AI',
    items:
      'Large Language Models (LLMs) | Transformer Architecture | Self-Attention & Multi-Head Attention | Retrieval-Augmented Generation (RAG) | Prompt Engineering | Embeddings | TF-IDF | BM25 | Hybrid Retrieval | Multi-Agent Architectures',
  },
  {
    category: 'Cloud & Enterprise Platforms',
    items: 'SAP | S/4HANA | SAP Business Technology Platform (BTP) | SAP Fiori',
  },
  {
    category: 'Prompt Engineering',
    items:
      'Zero-Shot, Few-Shot & Chain-of-Thought Prompting | Instruction-Tuned Prompt Design | Role-Based & System Prompt Structuring | Context Window Optimization | Prompt Decomposition & Task Chaining | Retrieval-Grounded Prompt Construction | Hallucination Mitigation Strategies',
  },
  {
    category: 'Deep learning',
    items:
      'Artificial Neural Networks (ANNs) | Forward & Backpropagation | Gradient Descent Variants (SGD, Adam) | Activation Functions (ReLU, Sigmoid, Tanh, Softmax) | Weight Initialization Techniques | Overfitting Mitigation (Dropout, Regularization, Early Stopping) | Batch Normalization | Convolutional Neural Networks (CNNs - Foundational Understanding) | Recurrent Neural Networks (RNNs - Conceptual) | Transformer-Based Architectures | PyTorch | TensorFlow',
  },
  {
    category: 'Machine Learning',
    items:
      'Supervised Learning (Regression, Classification) | Unsupervised Learning (Clustering, Dimensionality Reduction) | Ensemble Learning (XGBoost, LightGBM, Bagging, Boosting) | Bias-Variance Tradeoff | Regularization (L1, L2) | Feature Engineering & Feature Selection | Model Evaluation (Cross-Validation, Confusion Matrix, Precision, Recall, F1-Score) | Loss Functions (MSE, Log Loss, Cross-Entropy) | Hyperparameter Optimization | Gradient-Based Optimization | Scikit-learn',
  },
  {
    category: 'Data Engineering & Analytics',
    items: 'Pandas | NumPy | Data Preprocessing | Statistical Analysis',
  },
  {
    category: 'Backend & Infrastructure',
    items: 'FastAPI | Database Design | CRUD Systems | Authentication Logic | PostgreSQL | Git',
  },
];

const projectsData: ProjectEntry[] = [
  {
    title: 'AI-Based Smart Irrigation System with Weather API for Crop Guidance',
    period: '2025 - 2026',
    description: [
      'Developed an AI-driven irrigation advisory platform integrating soil moisture sensor telemetry with external weather forecasting APIs to guide crop watering decisions.',
      'Constructed a retrieval-augmented generation pipeline generating agronomy recommendations grounded in domain-specific agricultural documentation.',
      'Formulated predictive irrigation logic analyzing environmental signals and contextual retrieval outputs to improve water-usage efficiency.',
      'Organized environmental telemetry inside PostgreSQL relational storage enabling historical analysis and trend-driven irrigation planning.',
      'Architected a modular Python backend processing layer enabling future integration of crop yield prediction and agricultural analytics models.',
    ],
  },
  {
    title: 'Multi-Agent RAG System for Travel, Health & Financial Planning',
    period: '2025',
    description: [
      'Engineered a domain-isolated multi-agent LLM architecture enabling independent reasoning workflows across travel, healthcare, and financial advisory domains.',
      'Integrated embedding-based vector retrieval with reranking algorithms to strengthen factual grounding and suppress hallucinated outputs.',
      'Implemented citation tracking pipelines with schema-validated response generation producing structured API-consumable outputs.',
      'Enforced strict input validation and safety constraints to mitigate prompt injection and malicious query manipulation.',
      'Enabled scalable agent orchestration supporting multi-domain knowledge expansion and modular reasoning pipelines.',
    ],
  },
  {
    title: 'Hospital Management System (Full-Stack Healthcare Platform)',
    period: '',
    description: [
      'Built a relational hospital management platform automating patient registration, appointment scheduling, doctor assignment, and billing operations.',
      'Designed normalized SQL database schemas managing patient records, prescriptions, treatment histories, and administrative workflows.',
      'Established secure authentication mechanisms with role-based access control protecting sensitive healthcare data.',
      'Optimized database query execution and CRUD operations ensuring low-latency data retrieval under concurrent workloads.',
      'Structured modular backend components supporting future integration of predictive analytics and AI-driven healthcare insights.',
    ],
  },
  {
    title: 'Image Captioning with Generative AI',
    period: '',
    description: [
      'Developed an image captioning model combining CNN-based visual feature extraction with transformer-driven language generation.',
      'Leveraged encoder-decoder architecture linking computer vision embeddings to natural language generation pipelines.',
      'Trained the system using the Conceptual Captions dataset to improve semantic alignment between visual inputs and generated text.',
      'Evaluated caption quality using BLEU and semantic similarity metrics to measure linguistic accuracy and contextual relevance.',
      'Refined model performance through iterative hyperparameter tuning and dataset preprocessing to enhance caption coherence.',
    ],
  },
];

const certifications = [
  'AI Developer Professional Certificate - IBM Skills Network',
  'Machine Learning Specialization - Stanford University & DeepLearning.AI',
  'Retrieval-Augmented Generation (RAG) - DeepLearning.AI',
];

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center w-full mb-16 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00F0FF] shadow-[0_0_16px_4px_rgba(0,240,255,0.4)] z-10" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full md:w-[calc(50%-3rem)] ${
          isLeft ? 'md:pr-0' : 'md:pl-0'
        }`}
      >
        <div className="glass-card p-6 md:p-8 relative group">
          {/* Type indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center border border-[#00F0FF]/30 text-[#00F0FF]">
              {entry.type === 'experience' ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00F0FF]/60">
              {entry.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-inter font-bold text-white mb-2">
            {entry.title}
          </h3>

          {/* Organization & meta */}
          <div className="flex flex-col gap-1 mb-4 text-sm text-white/40 font-mono">
            <span className="text-white/60">{entry.organization}</span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {entry.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {entry.period}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Description */}
          <ul className="space-y-3 mb-6">
            {entry.description.map((item, i) => (
              <li
                key={i}
                className="text-sm text-white/50 leading-relaxed flex gap-2"
              >
                <span className="text-[#00F0FF] mt-1 shrink-0">{'>'}</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceEducation() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative section-padding"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// experience & education'}
          </p>
          <h2 className="text-3xl md:text-5xl font-inter font-black uppercase text-white">
            My <span className="text-[#00F0FF]">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="hidden md:block timeline-line" />

          {timelineData.map((entry, i) => (
            <TimelineCard key={i} entry={entry} index={i} />
          ))}
        </div>

        {/* Skills */}
        <div className="mt-6 md:mt-12">
          <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// skills'}
          </p>
          <div className="glass-card p-6 md:p-8 space-y-5">
            {skillsData.map((skill) => (
              <div key={skill.category}>
                <p className="text-sm md:text-base text-white font-semibold mb-1">
                  {skill.category}
                </p>
                <p className="text-sm text-white/55 leading-relaxed">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-8 md:mt-12">
          <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// projects'}
          </p>
          <div className="space-y-6">
            {projectsData.map((project) => (
              <div key={project.title} className="glass-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <h3 className="text-xl md:text-2xl font-inter font-bold text-white">
                    {project.title}
                  </h3>
                  {project.period ? (
                    <span className="text-xs font-mono text-white/40">{project.period}</span>
                  ) : null}
                </div>
                <ul className="space-y-3">
                  {project.description.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-white/50 leading-relaxed flex gap-2"
                    >
                      <span className="text-[#00F0FF] mt-1 shrink-0">{'>'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-8 md:mt-12">
          <p className="text-xs font-mono text-[#00F0FF]/60 uppercase tracking-[0.3em] mb-4">
            {'// certifications'}
          </p>
          <div className="glass-card p-6 md:p-8">
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="text-sm text-white/55 leading-relaxed flex gap-2">
                  <span className="text-[#00F0FF] mt-1 shrink-0">{'>'}</span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
