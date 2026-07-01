import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, Github, Filter, Search, ArrowRight, Play, Heart, Sparkles, 
  Code, X, CheckCircle2, Layers, Brain, Activity, Info, Terminal, Copy, Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProjects } from "@/hooks/useProjects";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const categories = ["All", "Web", "App", "UI/UX", "AI"];

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

// Hydration-safe Floating Particles
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 18 + 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, -80],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced project card component
const ProjectCard = ({ 
  project, 
  index, 
  onShowModal, 
  onShowCodeModal, 
  onCardClick,
  onTechClick 
}: { 
  project: any; 
  index: number; 
  onShowModal: () => void; 
  onShowCodeModal: () => void; 
  onCardClick: () => void; 
  onTechClick: (techName: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={onCardClick}
    >
      <GlowCard 
        glowColor="rgba(14, 165, 233, 0.12)"
        className="overflow-hidden h-full flex flex-col border border-border/10 bg-card/40 backdrop-blur-xl hover:border-primary/30 shadow-lg hover:shadow-primary/5 transition-all duration-500"
      >
        <CardHeader className="p-0 relative">
          <div className="relative overflow-hidden aspect-video">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/15 to-transparent"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="absolute inset-0 flex items-center justify-center gap-2.5 z-10"
                >
                  <Button 
                    size="sm" 
                    className="gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg text-xs" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.demo && project.demo.trim() !== '') {
                        window.open(project.demo, '_blank');
                      } else {
                        onShowModal();
                      }
                    }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-1.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold shadow-lg text-xs" 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.github && project.github.trim() !== '') {
                        window.open(project.github, '_blank');
                      } else {
                        onShowCodeModal();
                      }
                    }}
                  >
                    <Github className="h-3.5 w-3.5" />
                    Repository
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Status indicator badge */}
            {project.status && (
              <Badge className={`absolute top-3 left-3 flex items-center gap-1 py-0.5 px-2 bg-background/85 text-[10px] font-bold tracking-wide border text-foreground/90 ${
                project.status === 'Completed' ? 'border-emerald-500/20 text-emerald-500' :
                project.status === 'In Progress' ? 'border-yellow-500/20 text-yellow-500' :
                'border-gray-500/20 text-gray-500'
              }`}>
                <span className={`w-1 h-1 rounded-full ${
                  project.status === 'Completed' ? 'bg-emerald-500' :
                  project.status === 'In Progress' ? 'bg-yellow-500 animate-pulse' :
                  'bg-gray-500'
                }`} />
                {project.status}
              </Badge>
            )}
            
            {/* Category badge */}
            <Badge className={`absolute top-3 right-3 text-[10px] font-bold border py-0.5 px-2 bg-background/85 text-foreground/90 ${
              project.category === 'Web' ? 'border-blue-500/20 text-blue-500' :
              project.category === 'App' ? 'border-green-500/20 text-green-500' :
              project.category === 'AI' ? 'border-purple-500/20 text-purple-500' :
              'border-orange-500/20 text-orange-500'
            }`}>
              {project.category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <motion.h3 
              className="text-base sm:text-lg font-bold mb-2 font-outfit text-foreground tracking-tight"
              animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            >
              {project.title}
            </motion.h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
              {project.description}
            </p>
            
            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Highlights:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.features.slice(0, 2).map((feature: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-[9px] py-0 px-1.5 border-border/10 bg-muted/20 text-muted-foreground">
                      {feature}
                    </Badge>
                  ))}
                  {project.features.length > 2 && (
                    <Badge variant="outline" className="text-[9px] py-0 px-1.5 bg-primary/5 text-primary border-primary/20">
                      +{project.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Actions */}
          <div className="flex gap-2 mb-3.5 sm:hidden">
            <Button 
              size="sm" 
              className="flex-1 gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow text-xs py-1" 
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
              Demo
            </Button>
            <Button 
              size="sm" 
              className="flex-1 gap-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow text-xs py-1" 
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
              Code
            </Button>
          </div>
          
          {/* Tech Stack clickable tags */}
          <div className="flex flex-wrap gap-1 pt-3 border-t border-border/5">
            {project.tech.map((tech: string, techIndex: number) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-[10px] font-medium bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onTechClick(tech);
                }}
              >
                {tech}
              </Badge>
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
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("tech") || "");
  const [copiedDiagram, setCopiedDiagram] = useState(false);
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
          x: (e.clientX - rect.left) / (rect.width || 1),
          y: (e.clientY - rect.top) / (rect.height || 1),
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

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

  const handleTechClick = (techName: string) => {
    setSearchTerm(techName);
    toast({
      title: "Filter Applied",
      description: `Filtering projects containing: "${techName}"`,
    });
    // Scroll smoothly to filter area
    const searchElement = document.getElementById("search-anchor");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCopyDiagram = (diagramText: string) => {
    navigator.clipboard.writeText(diagramText);
    setCopiedDiagram(true);
    toast({
      title: "Diagram Copied!",
      description: "Architecture text diagram copied to clipboard.",
    });
    setTimeout(() => setCopiedDiagram(false), 2000);
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen text-foreground">
      <SEO 
        title="Projects Showcase | Umesh Darlami"
        description="Explore a curated list of software engineering and development projects built by Umesh Darlami, including custom AI chatbots, APIs, and web applications."
        keywords="Umesh Darlami projects, portfolio projects, AI chatbots, FastAPI portfolio, React apps"
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-background"
        >
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_90%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
          </div>

          <FloatingParticles />

          {/* Glowing orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-[100px]"
              style={{ y: y1 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-accent/10 to-primary/10 blur-[100px]"
              style={{ y: y2 }}
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 0],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex"
              >
                <Badge className="px-3.5 py-1.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                  🚀 My Creative Portfolio
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight font-outfit text-foreground tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Featured <span className="gradient-text font-black">Projects</span>
              </motion.h1>

              <motion.p
                className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Explore a showcase of systems Umesh built, mapping complex backend integrations, database schemas, responsive client interfaces, and intelligent automation.
              </motion.p>

              {/* Search and Filters Hub */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6 max-w-lg mx-auto pt-4"
                id="search-anchor"
              >
                {/* Search Field */}
                <div className="relative w-full sm:w-80 mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects or tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-8 w-full bg-card/45 border border-border/10 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-2xl text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Slider Tabs */}
                <div className="relative flex p-1 bg-muted/40 border border-border/10 rounded-full w-full sm:w-auto max-w-md mx-auto select-none backdrop-blur-xl">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`relative z-10 flex-1 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${
                          isActive 
                            ? "text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeCategoryBackdrop"
                            className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} index mapped
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Grid Section */}
        <section className="py-16 relative overflow-hidden border-t border-border/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.02),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.title} 
                    project={project} 
                    index={index} 
                    onShowModal={() => setShowModal(true)} 
                    onShowCodeModal={() => setShowCodeModal(true)} 
                    onTechClick={handleTechClick}
                    onCardClick={() => { setSelectedShowcaseProject(project); setActiveTab("overview"); }} 
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 max-w-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border/10">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">No projects matched</h3>
                <p className="text-xs text-muted-foreground mb-6">Try refining your typed keyword filters or clearing current categories.</p>
                <Button 
                  onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
                  size="sm"
                  className="bg-primary hover:bg-primary/95 shadow"
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA */}
        <CallToAction />
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
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setSelectedShowcaseProject(null)}
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-card border border-border/10 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Banner */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden flex-shrink-0">
                  <img
                    src={selectedShowcaseProject.image}
                    alt={selectedShowcaseProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedShowcaseProject(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-colors z-20"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6 z-10 text-left">
                    <div className="flex gap-1.5 mb-1.5">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold py-0">
                        {selectedShowcaseProject.category}
                      </Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-bold py-0">
                        {selectedShowcaseProject.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-foreground font-outfit tracking-tight">
                      {selectedShowcaseProject.title}
                    </h3>
                  </div>
                </div>

                {/* Tab Controls */}
                <div className="flex border-b border-border/10 bg-muted/20 px-6 py-2 gap-1.5 flex-shrink-0 select-none">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'architecture', label: 'Architecture', icon: Layers },
                    { id: 'ai', label: 'AI & Automation', icon: Brain },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent'
                        }`}
                      >
                        <TabIcon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-5 text-left">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Project Description</h4>
                        <p className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
                          {selectedShowcaseProject.description}
                        </p>
                      </div>

                      {enrichment.features && enrichment.features.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h4>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {enrichment.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">System Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedShowcaseProject.tech.map((techItem: string) => (
                            <Badge key={techItem} variant="secondary" className="px-2 py-0.5 text-[10px]">
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
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Integration Mechanics</h4>
                        <p className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
                          {enrichment.architecture}
                        </p>
                      </div>

                      {enrichment.flowDiagram && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Data Flow Diagram</h4>
                            <button
                              onClick={() => handleCopyDiagram(enrichment.flowDiagram)}
                              className="text-[9px] font-bold text-primary flex items-center gap-1 bg-primary/5 hover:bg-primary/10 border border-primary/15 px-2 py-0.5 rounded transition-all select-none"
                            >
                              {copiedDiagram ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                              <span>{copiedDiagram ? "Copied" : "Copy Diagram"}</span>
                            </button>
                          </div>
                          
                          <div className="mt-2 p-3 bg-muted/40 border border-border/50 rounded-xl font-mono text-[9px] sm:text-xs text-muted-foreground space-y-1 relative overflow-hidden">
                            <div className="flex justify-between items-center border-b border-border/10 pb-1.5 mb-1.5">
                              <span className="text-primary font-bold flex items-center gap-1">
                                <Terminal className="h-3.5 w-3.5" />
                                SYSTEM MAP
                              </span>
                            </div>
                            <pre className="overflow-x-auto whitespace-pre leading-4 text-emerald-500/90 py-1">
                              {enrichment.flowDiagram}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'ai' && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-2.5">
                        <Brain className="h-5.5 w-5.5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-foreground text-xs sm:text-sm">Cognitive Engineering Paradigm</h4>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                            Umesh designed this system specifically with AI-first principles, configuring optimized prompt bounds, error checks, and pgvector retrievers.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">LLM Actions & Automation</h4>
                        <p className="text-xs sm:text-sm text-foreground/95 leading-relaxed">
                          {enrichment.aiCapabilities}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="border-t border-border/10 p-5 flex flex-col sm:flex-row gap-2.5 justify-end bg-muted/10 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    className="gap-1.5 w-full sm:w-auto font-semibold text-xs py-4.5" 
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
                    className="gap-1.5 bg-gradient-to-r from-primary to-accent hover:from-primary/95 hover:to-accent/95 w-full sm:w-auto font-semibold text-xs py-4.5 text-primary-foreground" 
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
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Development Modal Notice */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border/10 rounded-3xl p-6 sm:p-7 max-w-sm w-full mx-4 shadow-2xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <ExternalLink className="h-6 w-6 text-yellow-500" />
                </div>
                
                <h3 className="text-lg font-black mb-2 tracking-tight font-outfit">Project Under Development</h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  This service is currently going through testing and environment setups. Live URL will be published soon!
                </p>
                
                <Button
                  onClick={() => setShowModal(false)}
                  className="w-full text-xs font-semibold"
                >
                  OK, Got it!
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confidential Repository Modal Notice */}
      <AnimatePresence>
        {showCodeModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCodeModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border/10 rounded-3xl p-6 sm:p-7 max-w-sm w-full mx-4 shadow-2xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <Github className="h-6 w-6 text-red-500" />
                </div>
                
                <h3 className="text-lg font-black mb-2 tracking-tight font-outfit">Confidential Source Code</h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  The codebase for this client application is proprietary or confidential and cannot be published to GitHub at this time.
                </p>
                
                <Button
                  onClick={() => setShowCodeModal(false)}
                  className="w-full text-xs font-semibold"
                >
                  OK, Understood!
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

// Bottom CTA Callout Component
const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-t border-border/5">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-10 left-10 w-28 h-28 rounded-full bg-primary/20 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.6, 0.4, 0.6]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent/20 blur-xl"
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div className="inline-flex">
            <Badge className="px-3.5 py-1.5 text-xs font-semibold bg-violet-500/10 text-violet-500 border-violet-500/20">
              🚀 Ready to Collaborate
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-outfit leading-tight tracking-tight">
            Have a Project in <span className="gradient-text font-black">Mind?</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Let's connect and translate your concept into clean, robust product code, mapping high-performance API routes and automated AI features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <Button size="lg" className="w-full sm:w-auto gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs py-5" asChild>
              <Link to="/contact">
                <Sparkles className="h-4 w-4" />
                <span>Start Your Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-1.5 border-border/10 bg-card/45 hover:bg-muted font-semibold text-xs py-5" asChild>
              <Link to="/about">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Learn More About Me</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
