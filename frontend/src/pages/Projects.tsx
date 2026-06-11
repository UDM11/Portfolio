import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter, Search, ArrowRight, Play, Heart, Sparkles, Code, X, CheckCircle2, Layers, Brain, Activity, Info, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
const categories = ["All", "Web", "App", "UI/UX", "AI"];
import { useProjects } from "@/hooks/useProjects";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/GlowCard";

// Dynamic enrichment mapping for projects in the showcase modal
const getEnrichedProjectDetails = (title: string, category: string, tech: string[]) => {
  const titleLower = title.toLowerCase();
  const techLower = tech.map(t => t.toLowerCase());

  if (titleLower.includes("chatbot") || titleLower.includes("whatsapp") || titleLower.includes("automation")) {
    return {
      architecture: "This project runs on a FastAPI python service that handles incoming webhooks from Twilio and Meta Business API asynchronously. Conversational context sessions are serialized in Redis cache to maintain rapid multi-turn replies, then permanently logged to the Supabase database. Media uploads and voice messages are processed via cloud transcribers and mapped directly to Supabase storage.",
      aiCapabilities: "Integrated with OpenAI GPT-4o for natural language understanding and direct database function calling. Uses LangChain agents to handle dynamic API tool execution, and utilizes semantic similarity search over client product catalogs stored as vector embeddings (pgvector). Prompt constraints enforce agent personas and safety guidelines.",
      features: [
        "Real-time Twilio & Meta WhatsApp webhook ingestion",
        "OpenAI GPT-4o intent routing and functional tool use",
        "Redis conversation caching for fast multi-turn sessions",
        "Supabase relational schema and media logs persistence",
        "Semantic search (RAG) using vector embeddings"
      ],
      flowDiagram: `
[WhatsApp Client] --------> [Meta Business API]
                                   |
                                   | (Webhook URL)
                                   v
+-------------------------------------------------------+
|                FastAPI Backend (Fly.io)               |
|  +-------------------+        +--------------------+  |
|  | Webhook Router    | -----> | LLM Agent Router   |  |
|  +-------------------+        +--------------------+  |
|           |                            |              |
|           | (Session Cache)            | (Query/Embed)|
|           v                            v              |
|     [Redis Cache]              [OpenAI GPT-4o]        |
+-------------------------------------------------------+
      |                                  |
      | (Sync Logs)                      | (Vector Search)
      v                                  v
[Supabase PostgreSQL] <----------> [pgvector Embeddings]`
    };
  }

  if (titleLower.includes("portfolio") || titleLower.includes("website") || titleLower.includes("darlami")) {
    return {
      architecture: "Structured as a single-container application deployed on Fly.io's global network. A FastAPI ASGI application serves the React Single-Page Application (Vite output bundle) statically from its asset directories while managing dynamic routing fallbacks. All administration endpoints (/api/admin, /api/projects) are served by uvicorn routing directly, talking to Supabase Client SDK.",
      aiCapabilities: "Features a client-side virtual assistant chatbot contextually trained on Umesh's skills, experience, and certifications. This assistant simulates AI recruiter chats directly from the frontend interface using modular structured prompts.",
      features: [
        "Consolidated single-container deployment (FastAPI + React SPA)",
        "Fully dynamic admin dashboard connected to Supabase Client",
        "Custom domain configuration via Cloudflare proxies and SSL",
        "Rich sitelinks mapping using robots.txt, sitemap.xml, and Person Schema JSON-LD",
        "Interactive Recruiter AI Assistant chatbot widget"
      ],
      flowDiagram: `
[User HTTPS Request] --------> [Cloudflare Edge (SSL & Proxy)]
                                            |
                                            v
                                   [Fly.io VM Container]
                                            |
                         +------------------+------------------+
                         |                                     |
                         v                                     v
             [FastAPI ASGI Application]               [Vite React SPA]
             - /api/projects (CRUD)                   - /projects (Route)
             - /api/contact (Mailer)                  - /about (Static)
                         |
                         v
               [Supabase Client SDK]`
    };
  }

  // General Web Apps
  if (category === "Web" || techLower.includes("react") || techLower.includes("next.js")) {
    return {
      architecture: "Built using React and TypeScript on the client side, using Tailwind CSS and Framer Motion for premium glassmorphic visual animations. Communicates with the FastAPI REST API layer for configuration and database query executions. Supabase coordinates DB CRUD operations and stores media file assets.",
      aiCapabilities: "Includes potential AI agent enhancements such as automatic text summary fields, smart database indexing queries, and generative layout tools to show content metrics based on user interactions.",
      features: [
        "TypeScript static type-safety across the application",
        "Tailwind CSS responsive design for all device viewports",
        "Framer Motion keyframe animations at 60 FPS",
        "Client-side React Query caching for instant page transitions",
        "Supabase CDN asset serving and database connections"
      ],
      flowDiagram: `
[Web Browser Client] --------> [Cloudflare CDN Cache]
                                       |
                                       v
                             [FastAPI API Backend]
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v                                       v
          [Supabase PostgreSQL]                    [Supabase Storage]
          - Relational Database                    - Static media assets`
    };
  }

  // AI Apps Fallback
  if (category === "AI" || techLower.includes("openai") || techLower.includes("llm") || techLower.includes("langchain")) {
    return {
      architecture: "Runs on a python microservice architecture utilizing FastAPI endpoints for high-throughput concurrency. Orchestrates user prompt construction dynamically, coordinates chat memory stores, and executes model queries against hosted APIs or local model interfaces.",
      aiCapabilities: "Integrates OpenAI/Anthropic SDKs with specialized prompt configurations. Implements Retrieval-Augmented Generation workflows to inject document-level metadata, maintaining low-latency token streaming.",
      features: [
        "Prompt engineering and system instruction templating",
        "Session-level conversational memory stores",
        "Retrieval-Augmented Generation (RAG) vector integrations",
        "API rate-limiting, error fallbacks, and usage logs",
        "High-performance FastAPI asynchronous endpoints"
      ],
      flowDiagram: `
[User Chat Prompt] --------> [FastAPI Middleware Endpoint]
                                       |
                                       v
                              [LangChain Executor]
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v                                       v
         [OpenAI Chat API]                       [pgvector Database]
         - Completion engine                     - Vector knowledge index`
    };
  }

  // General Fallback
  return {
    architecture: "Uses a modern stack comprising React for client interfaces and FastAPI for service execution. Operates over PostgreSQL for transactional data stability, with images and assets served via Supabase's high-speed cloud CDN.",
    aiCapabilities: "Optionally integrates cognitive services including optical character recognition, semantic filtering, and natural language interfaces to automate manual user tasks.",
    features: [
      "Dynamic RESTful endpoint structures",
      "Comprehensive database migration scripts",
      "JWT-based administrator authentication and access rules",
      "Optimized production compilation pipelines",
      "Complete environment decoupling for dev/staging/prod"
    ],
    flowDiagram: `
[User Request] --------> [FastAPI Backend Service]
                                  |
               +------------------+------------------+
               |                                     |
               v                                     v
     [Supabase Database]                     [Supabase CDN Storage]
     - Relational tables                     - File uploads / media`
  };
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced project card component
const ProjectCard = ({ project, index, onShowModal, onShowCodeModal, onCardClick }: { project: any; index: number; onShowModal: () => void; onShowCodeModal: () => void; onCardClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={onCardClick}
    >
      <GlowCard 
        glowColor="rgba(168, 85, 247, 0.15)"
        className="overflow-hidden h-full flex flex-col border border-white/5 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl hover:bg-gradient-to-br hover:from-card/90 hover:via-card/70 hover:to-card/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
      >
        <CardHeader className="p-0 relative">
          <div className="relative overflow-hidden aspect-video">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center gap-3"
                >
                  <Button 
                    size="sm" 
                    className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.demo && project.demo.trim() !== '') {
                        window.open(project.demo, '_blank');
                      } else {
                        onShowModal();
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.github && project.github.trim() !== '') {
                        window.open(project.github, '_blank');
                      } else {
                        onShowCodeModal();
                      }
                    }}
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Status Badge */}
            {project.status && (
              <Badge className={`absolute top-3 left-3 ${
                project.status === 'Completed' ? 'bg-green-500' :
                project.status === 'In Progress' ? 'bg-yellow-500' :
                'bg-gray-500'
              } text-white`}>
                {project.status}
              </Badge>
            )}
            
            {/* Category Badge */}
            <Badge className={`absolute top-3 right-3 ${
              project.category === 'Web' ? 'bg-blue-500' :
              project.category === 'App' ? 'bg-green-500' :
              project.category === 'AI' ? 'bg-purple-500' :
              'bg-orange-500'
            } text-white`}>
              {project.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-4 sm:p-6">
          <motion.h3 
            className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3"
            animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Features:</h4>
              <div className="flex flex-wrap gap-1">
                {project.features.slice(0, 3).map((feature: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-[10px] py-0 px-2">
                    {feature}
                  </Badge>
                ))}
                {project.features.length > 3 && (
                  <Badge variant="outline" className="text-[10px] py-0 px-2 bg-primary/5 text-primary border-primary/20">
                    +{project.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          

          
          {/* Mobile Action Buttons */}
          <div className="flex gap-3 mb-4 sm:hidden">
            <div className="flex-1">
              <Button 
                size="sm" 
                className="gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.demo && project.demo.trim() !== '') {
                    window.open(project.demo, '_blank');
                  } else {
                    onShowModal();
                  }
                }}
              >
                <ExternalLink className="h-3 w-3" />
                Live Demo
              </Button>
            </div>
            <div className="flex-1">
              <Button 
                size="sm" 
                className="gap-2 w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg" 
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.github && project.github.trim() !== '') {
                    window.open(project.github, '_blank');
                  } else {
                    onShowCodeModal();
                  }
                }}
              >
                <Github className="h-3 w-3" />
                View Code
              </Button>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </GlowCard>
    </motion.div>
  );
};

const Projects = () => {
  const { data: projects = [] } = useProjects();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedShowcaseProject, setSelectedShowcaseProject] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "ai">("overview");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Block background scroll when modal is open
  useEffect(() => {
    if (showModal || showCodeModal || selectedShowcaseProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showCodeModal, selectedShowcaseProject]);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          {/* Floating Particles */}
          <FloatingParticles />

          {/* Animated Background Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-[120px]"
              style={{ y: y1 }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-[120px]"
              style={{ y: y2 }}
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="container mx-auto px-4 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-6"
                >
                  <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-6">
                    🚀 My Creative Portfolio
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Featured <span className="gradient-text">Projects</span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Explore my collection of innovative projects that showcase creativity, technical expertise, 
                  and passion for building exceptional digital experiences.
                </motion.p>

                {/* Enhanced Search and Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                >
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-80 bg-card/50 backdrop-blur border-primary/20"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {categories.map((category) => (
                      <motion.div
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant={activeCategory === category ? "default" : "outline"}
                          onClick={() => setActiveCategory(category)}
                          className="rounded-full text-xs sm:text-sm"
                          size="sm"
                        >
                          <Filter className="h-3 w-3 mr-1" />
                          {category}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-muted-foreground"
                >
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>



        {/* Projects Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] sm:bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-white border-emerald-500/30 mb-4">
                  ✨ Portfolio Showcase
                </Badge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              >
                Crafted with <span className="gradient-text">Passion</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base"
              >
                Each project represents a unique journey of problem-solving, creativity, and technical excellence.
              </motion.p>
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.title} 
                    project={project} 
                    index={index} 
                    onShowModal={() => setShowModal(true)} 
                    onShowCodeModal={() => setShowCodeModal(true)} 
                    onCardClick={() => { setSelectedShowcaseProject(project); setActiveTab("overview"); }} 
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center py-16 sm:py-20"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur border border-primary/20"
                >
                  <Search className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">No projects found</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">Try adjusting your search or filter criteria to discover more amazing projects</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-xl"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <Badge className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border-violet-500/30 mb-6">
                  🚀 Ready to Collaborate
                </Badge>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6"
              >
                Have a Project in <span className="gradient-text">Mind?</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed"
              >
                Let's collaborate and bring your vision to life with cutting-edge technology, innovative design, and exceptional user experiences.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button 
                    size="lg" 
                    className="gap-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300" 
                    asChild
                  >
                    <Link to="/contact">
                      <Sparkles className="h-5 w-5" />
                      Start Your Project
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-3 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300" 
                    asChild
                  >
                    <Link to="/about">
                      <Heart className="h-5 w-5" />
                      Learn More About Me
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Advanced Project Showcase Modal */}
      <AnimatePresence>
        {selectedShowcaseProject && (() => {
          const enrichment = getEnrichedProjectDetails(
            selectedShowcaseProject.title, 
            selectedShowcaseProject.category, 
            selectedShowcaseProject.tech
          );
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
              onClick={() => setSelectedShowcaseProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-card/95 border border-border/60 rounded-3xl max-w-2xl w-full shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[90vh] my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Banner Image */}
                <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden flex-shrink-0">
                  <img
                    src={selectedShowcaseProject.image}
                    alt={selectedShowcaseProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedShowcaseProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/10 transition-colors z-20"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Banner Content */}
                  <div className="absolute bottom-4 left-6 right-6 z-10">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {selectedShowcaseProject.category}
                      </Badge>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {selectedShowcaseProject.status}
                      </Badge>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground font-outfit tracking-tight">
                      {selectedShowcaseProject.title}
                    </h3>
                  </div>
                </div>

                {/* Tab Navigation Controls */}
                <div className="flex border-b border-border/50 bg-muted/20 px-6 py-2 gap-2 flex-shrink-0">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'architecture', label: 'Architecture', icon: Layers },
                    { id: 'ai', label: 'AI Capabilities', icon: Brain },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent'
                        }`}
                      >
                        <TabIcon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Modal Tab Content Area */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                        <p className="text-sm sm:text-base text-foreground leading-relaxed">
                          {selectedShowcaseProject.description}
                        </p>
                      </div>

                      {enrichment.features && enrichment.features.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {enrichment.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedShowcaseProject.tech.map((techItem: string) => (
                            <Badge key={techItem} variant="secondary" className="px-2.5 py-1 text-xs">
                              {techItem}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">System Integration</h4>
                        <p className="text-sm sm:text-base text-foreground leading-relaxed">
                          {enrichment.architecture}
                        </p>
                      </div>

                      {enrichment.flowDiagram && (
                        <div>
                          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Data Flow Chart</h4>
                          <div className="mt-2 p-4 bg-muted/40 border border-border/50 rounded-xl font-mono text-[10px] sm:text-xs text-muted-foreground space-y-2 relative overflow-hidden">
                            <div className="flex justify-between items-center border-b border-border/40 pb-2">
                              <span className="text-primary font-bold flex items-center gap-1.5">
                                <Terminal className="h-4 w-4" />
                                SYSTEM DIAGRAM
                              </span>
                              <span className="text-[9px] text-muted-foreground/60">ARCHITECTURE VIEW</span>
                            </div>
                            <pre className="overflow-x-auto whitespace-pre leading-5 text-emerald-400/90 select-none py-1">
                              {enrichment.flowDiagram}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ai' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
                        <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">AI Developer Note</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Umesh designed this system specifically with AI-first principles. It implements optimal prompt templates, error safety checks, and semantic embedding strategies to align with enterprise expectations.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">AI Capabilities & Automation</h4>
                        <p className="text-sm sm:text-base text-foreground leading-relaxed">
                          {enrichment.aiCapabilities}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="border-t border-border/50 p-6 flex flex-col sm:flex-row gap-3 justify-end bg-muted/10 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    className="gap-2 w-full sm:w-auto" 
                    onClick={() => {
                      if (selectedShowcaseProject.github && selectedShowcaseProject.github.trim() !== '') {
                        window.open(selectedShowcaseProject.github, '_blank');
                      } else {
                        setShowCodeModal(true);
                      }
                    }}
                  >
                    <Github className="h-4 w-4" />
                    View Repository
                  </Button>
                  <Button 
                    className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/95 hover:to-accent/95 w-full sm:w-auto" 
                    onClick={() => {
                      if (selectedShowcaseProject.demo && selectedShowcaseProject.demo.trim() !== '') {
                        window.open(selectedShowcaseProject.demo, '_blank');
                      } else {
                        setShowModal(true);
                      }
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Launch Live Demo
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Custom Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center"
                >
                  <ExternalLink className="h-8 w-8 text-yellow-500" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold mb-3 gradient-text"
                >
                  Project Not Live Yet
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6 leading-relaxed"
                >
                  This project is currently under development and will be available soon. Check back later!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={() => setShowModal(false)}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    OK, Got it!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confidential Code Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setShowCodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center"
                >
                  <Github className="h-8 w-8 text-red-500" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold mb-3 gradient-text"
                >
                  Project is Confidential
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6 leading-relaxed"
                >
                  This project contains confidential information and the source code cannot be shared publicly at this time.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={() => setShowCodeModal(false)}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    OK, Understood!
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Projects;
