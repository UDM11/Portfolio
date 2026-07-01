import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Download, Github, Linkedin, Mail, Code2, Sparkles, Zap, Target, 
  ChevronDown, Play, Globe, Palette, Layers, Server, Database, Brain, 
  MessageSquare, GitBranch, Monitor, Figma, Settings, Cloud, Check, 
  Terminal, ExternalLink, Calendar, MapPin, Eye, Copy, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile.jpg";
import { GlowCard } from "@/components/ui/GlowCard";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import SEO from "@/components/SEO";

// Hydration-safe Floating Particles
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/25 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, -90],
            opacity: [0, 0.7, 0],
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

// Rotating Typewriter role selector
const TypewriterRoles = () => {
  const roles = [
    "Full-Stack Web Developer",
    "AI Integration Specialist",
    "Chatbot Automation Engineer",
    "Software Engineer Student"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => 
          isDeleting 
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <span className="gradient-text font-semibold whitespace-nowrap">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
      />
    </span>
  );
};

// Interactive Developer Console mock
const DeveloperConsole = () => {
  const [activeTab, setActiveTab] = useState<"json" | "sh">("json");
  const [shLogs, setShLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [shLogs]);

  const runShScript = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShLogs(["$ npm run check-stack"]);
    
    const logs = [
      "Initializing diagnostics protocol...",
      "Resolving database client... Supabase OK",
      "Deploying local AI endpoint... OpenAI RAG OK",
      "Mapping skills directory structure:",
      "  ● React / Next.js (Frontend Interfaces)",
      "  ● FastAPI / PostgreSQL (High-speed APIs)",
      "  ● LangChain / Chatbots (Intelligent Logic)",
      "Status check: All microservices ONLINE",
      "Ready to build next production product."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setShLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  useEffect(() => {
    if (activeTab === "sh" && shLogs.length === 0) {
      runShScript();
    }
  }, [activeTab]);

  return (
    <GlowCard glowColor="rgba(14, 165, 233, 0.12)" className="border border-border/10 shadow-2xl rounded-3xl overflow-hidden w-full max-w-md mx-auto bg-card/65 backdrop-blur-2xl">
      {/* Tab controls */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/10 bg-muted/40">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-1 bg-background/55 border border-border/5 px-2.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground select-none">
          <Terminal className="w-2.5 h-2.5 text-primary" />
          <span>umesh_darlami ~ zsh</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex border-b border-border/10 bg-card/45 text-[11px] font-mono select-none">
        <button
          onClick={() => setActiveTab("json")}
          className={`flex items-center gap-1.5 px-4 py-2 border-r border-border/10 transition-colors ${
            activeTab === "json" 
              ? "bg-background text-primary border-t-2 border-t-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 className="w-3 h-3 text-yellow-500" />
          <span>developer.json</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("sh");
            if (!isRunning) runShScript();
          }}
          className={`flex items-center gap-1.5 px-4 py-2 border-r border-border/10 transition-colors ${
            activeTab === "sh" 
              ? "bg-background text-primary border-t-2 border-t-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Terminal className="w-3 h-3 text-green-500" />
          <span>diagnostics.sh</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-5 h-[230px] overflow-y-auto font-mono text-[12px] leading-relaxed text-left bg-background/20 backdrop-blur-md relative" ref={terminalRef}>
        <AnimatePresence mode="wait">
          {activeTab === "json" ? (
            <motion.div
              key="json"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <pre className="text-foreground/90 whitespace-pre-wrap select-all">
{`{
  "name": `}<span className="text-emerald-500">"Umesh Darlami"</span>{`,
  "role": `}<span className="text-emerald-500">"Full-Stack Developer"</span>{`,
  "education": `}<span className="text-emerald-500">"BCSIT Student"</span>{`,
  "specialties": [
    `}<span className="text-sky-500">"React / Next.js"</span>{`,
    `}<span className="text-sky-500">"FastAPI / PostgreSQL"</span>{`,
    `}<span className="text-sky-500">"AI Agent Workflows"</span>{`,
    `}<span className="text-sky-500">"WhatsApp Bots"</span>{`
  ]
}`}
              </pre>
            </motion.div>
          ) : (
            <motion.div
              key="sh"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="text-foreground/90 whitespace-pre-line"
            >
              {shLogs.map((log, index) => {
                let colorClass = "text-muted-foreground/95";
                if (log.startsWith("$")) colorClass = "text-primary font-bold";
                else if (log.includes("OK")) colorClass = "text-emerald-500 font-semibold";
                else if (log.includes("●")) colorClass = "text-foreground font-medium";
                else if (log.includes("Status check:")) colorClass = "text-sky-500 font-bold";
                
                return (
                  <div key={index} className={colorClass}>
                    {log}
                  </div>
                );
              })}
              {isRunning && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1.5 h-3.5 bg-emerald-500 ml-1 align-middle"
                />
              )}
              {!isRunning && (
                <button 
                  onClick={runShScript}
                  className="mt-3.5 text-[10px] flex items-center gap-1 px-2.5 py-1 rounded bg-muted/60 border border-border/10 hover:bg-muted text-primary transition-colors select-none"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Rerun diagnostics</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-5 py-2 border-t border-border/10 bg-muted/15 font-mono text-[10px] text-muted-foreground select-none">
        <div className="flex items-center gap-2">
          <span>LF</span>
          <span>UTF-8</span>
          <span>JSON</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Link</span>
        </div>
      </div>
    </GlowCard>
  );
};

// Profile Photo bezel
const ProfileBezel = () => {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto aspect-square rounded-full flex items-center justify-center z-10 group/profile">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 blur-[25px] group-hover/profile:scale-105 transition-transform duration-500" />
      
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/25 via-accent/25 to-primary/25 opacity-70 blur-sm"
        animate={{
          scale: [1, 1.02, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="absolute inset-1 rounded-full border-4 border-card/85 bg-card/65 backdrop-blur-xl shadow-xl flex items-center justify-center overflow-hidden">
        <img
          src={profileImg}
          alt="Umesh Darlami"
          className="w-full h-full object-cover transition-transform duration-700 group-hover/profile:scale-105"
        />
      </div>
      
      <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-background border border-border/10 px-2.5 py-1 rounded-full shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-bold text-foreground tracking-wide font-mono">LIVE</span>
      </div>
    </div>
  );
};

// Stats Section Items
const stats = [
  { 
    number: "10+", 
    label: "Projects Completed", 
    icon: Code2,
    details: "Full-Stack Web Apps, Custom AI Chatbots, & Automation Scripts",
    glow: "rgba(14, 165, 233, 0.15)"
  },
  { 
    number: "2+", 
    label: "Years Experience", 
    icon: Zap,
    details: "Professional frontend/backend work and freelance software solutions",
    glow: "rgba(168, 85, 247, 0.15)"
  },
  { 
    number: "100%", 
    label: "Client Satisfaction", 
    icon: Target,
    details: "Meeting requirements, clean UI architecture, & thorough deployments",
    glow: "rgba(34, 197, 94, 0.15)"
  },
  { 
    number: "24/7", 
    label: "Support Available", 
    icon: Sparkles,
    details: "Continuous integration checkups & fast communication turnaround",
    glow: "rgba(244, 63, 94, 0.15)"
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-muted/15 border-y border-border/5">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <GlowCard
                glowColor={stat.glow}
                className="p-6 h-full border border-border/10 bg-card/45 backdrop-blur-xl shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight gradient-text">
                    {stat.number}
                  </h3>
                  <p className="text-sm font-semibold text-foreground/90 mb-1">{stat.label}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2 border-t border-border/5 pt-2">
                  {stat.details}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill Showcase structured groups
const techGroups = [
  {
    title: "Frontend Architecture",
    description: "Building responsive, modern, and high-performance user interfaces.",
    glow: "rgba(14, 165, 233, 0.12)",
    items: [
      { name: "React", level: "90%", desc: "Component architecture, hooks, state management" },
      { name: "Next.js", level: "85%", desc: "SSR, static site generation, routing optimization" },
      { name: "TypeScript", level: "85%", desc: "Strict type safety, module interfaces, generics" },
      { name: "HTML & CSS", level: "95%", desc: "Semantic layout markup, flexbox/grid, custom animations" },
      { name: "Tailwind CSS", level: "95%", desc: "Utility-first layouts, responsive structures, customization" },
      { name: "Framer Motion", level: "85%", desc: "Smooth layout transitions, scroll triggers, micro-animations" },
    ]
  },
  {
    title: "Backend & Databases",
    description: "Architecting secure, scalable microservices and robust database structures.",
    glow: "rgba(34, 197, 94, 0.12)",
    items: [
      { name: "FastAPI", level: "90%", desc: "High-performance async Python backend endpoints" },
      { name: "Node.js & Express", level: "85%", desc: "JavaScript runtime APIs, middleware integrations" },
      { name: "PostgreSQL", level: "80%", desc: "Relational database modeling, indexing, queries" },
      { name: "Supabase", level: "85%", desc: "Backend-as-a-service, authentication, real-time DB" },
      { name: "MongoDB", level: "80%", desc: "NoSQL document storage, flexible schema handling" },
      { name: "RESTful APIs", level: "95%", desc: "Resource structures, status codes, query pagination" },
    ]
  },
  {
    title: "AI & Intelligent Automation",
    description: "Connecting AI brains to systems for chatbots, RAG search, and automated workflows.",
    glow: "rgba(168, 85, 247, 0.12)",
    items: [
      { name: "OpenAI API", level: "90%", desc: "Custom ChatGPT model fine-tuning, embeddings generation" },
      { name: "LangChain & LangGraph", level: "85%", desc: "Orchestrating agent chains, cyclical decision graphs" },
      { name: "RAG Systems", level: "85%", desc: "Semantic search vector databases, context prompting" },
      { name: "AI Agents", level: "80%", desc: "Autonomous task-execution loops, tool-calling definitions" },
      { name: "Custom Chatbots", level: "90%", desc: "Integrations for WhatsApp, web interfaces, and support" },
      { name: "Twilio & Dialogflow", level: "80%", desc: "SMS queues, NLP modeling, interactive voice triggers" },
    ]
  },
  {
    title: "Cloud, DevOps & Tools",
    description: "Deploying code safely with continuous delivery pipelines and Docker boxes.",
    glow: "rgba(244, 63, 94, 0.12)",
    items: [
      { name: "Docker", level: "75%", desc: "Containerizing services for clean deployment parity" },
      { name: "Git & GitHub", level: "90%", desc: "Version branch controls, CI/CD actions, merge flows" },
      { name: "Linux Systems", level: "80%", desc: "Command line shells, system configs, package updates" },
      { name: "AWS Services", level: "70%", desc: "Cloud computing instances, static storage s3, setup" },
      { name: "Vercel & Render", level: "90%", desc: "Auto-deploy hooks, frontend hosting, web service setup" },
      { name: "Figma", level: "85%", desc: "UI mockup translation, vector exports, styles inspection" },
    ]
  }
];

const TechShowcase = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20 mb-2.5 text-xs font-semibold">
            🚀 Skills & Toolkit
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black mb-3 font-outfit leading-tight tracking-tight">
            Technologies I <span className="gradient-text">Master</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A structured look at languages, developer packages, cloud platforms, and vector models I leverage to build robust digital software.
          </p>
        </motion.div>

        <TooltipProvider delayDuration={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {techGroups.map((group, groupIdx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.08, duration: 0.6 }}
              >
                <GlowCard
                  glowColor={group.glow}
                  className="p-6 h-full border border-border/10 bg-card/35 backdrop-blur-xl shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold mb-1.5 tracking-tight text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {group.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                      {group.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <Tooltip key={tech.name}>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.04, y: -0.5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Badge
                                variant="secondary"
                                className="px-3 py-1 text-xs font-medium cursor-pointer border border-border/5 bg-background/55 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-1 shadow-sm"
                              >
                                <span>{tech.name}</span>
                                <span className="text-[9px] opacity-75 font-mono">({tech.level})</span>
                              </Badge>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs border border-border/10 p-3 shadow-xl rounded-xl">
                            <div className="space-y-1">
                              <p className="font-semibold text-xs text-primary">{tech.name} • {tech.level}</p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">{tech.desc}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

// CV Hub Modal
const CVHubModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("darlamiumesh123@gmail.com");
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: "darlamiumesh123@gmail.com has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    toast({
      title: "CV Update in Progress",
      description: "Umesh's latest resume is currently being reformatted. Opening Gmail draft to request CV directly...",
    });
    setTimeout(() => {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com&su=Request for Resume - Umesh Darlami", "_blank");
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-card border border-border/10 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <Badge className="px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20 text-[9px] font-bold tracking-wider mb-1 uppercase">
                    Curriculum Vitae
                  </Badge>
                  <h3 className="text-xl font-black text-foreground tracking-tight font-outfit">
                    Umesh Darlami Magar
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Full-Stack Developer & Software Engineer
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full w-7 h-7 flex items-center justify-center border border-border/10 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground/85 mb-0.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Experience</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">2+ Years Web Dev</p>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground/85 mb-0.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Education</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">BCSIT Student</p>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground/85 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>Location</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Kathmandu, Nepal</p>
                </div>
                <div className="p-3 rounded-2xl bg-muted/30 border border-border/5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground/85 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                    <span>Availability</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Immediate Freelance</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Key Competencies
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["React & Next.js", "TypeScript", "FastAPI (Python)", "Node.js & Express", "Supabase & PostgreSQL", "AI Agents & Chatbots"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-[9px] font-medium bg-card border border-border/10 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                      <span>{skill}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-3 border-t border-border/10">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={handleDownload}
                    className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs py-4.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Request Latest CV</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCopyEmail}
                    className="gap-2 border-border/15 bg-muted/20 hover:bg-muted/40 font-semibold text-xs py-4.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied" : "Copy Email"}</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-xs text-foreground/90">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-semibold text-emerald-600">Prefer direct chat?</span>
                  </div>
                  <a
                    href="https://wa.me/9779863755744?text=Hi%20Umesh!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20request%20your%20CV."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                  >
                    <span>WhatsApp Me</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Hero left-side text column
const HeroText = ({ onOpenResume }: { onOpenResume: () => void }) => {
  return (
    <div className="space-y-5 text-left">
      <div className="inline-flex">
        <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20 text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/15 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Freelance & Roles</span>
        </Badge>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none font-outfit text-foreground">
          Hi, I am <br />
          <span className="gradient-text font-black">Umesh Darlami</span>
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-foreground/80 tracking-tight h-14 sm:h-10 flex items-center">
          <span className="text-muted-foreground mr-1.5 font-light">I build</span>
          <TypewriterRoles />
        </h2>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
        I am a Computer Science student (BCSIT) specializing in crafting modern web solutions, fast FastAPI backends, and custom automated chatbot systems that connect workflows with AI brains.
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button size="lg" className="gap-1.5 group relative overflow-hidden bg-primary hover:bg-primary/90 shadow-md font-semibold text-xs text-primary-foreground py-5" asChild>
          <Link to="/projects">
            <Play className="h-3.5 w-3.5 fill-current text-primary-foreground" />
            <span>Explore Work</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="gap-1.5 border-border/10 bg-card/40 hover:bg-muted font-semibold text-xs text-foreground py-5"
          onClick={onOpenResume}
        >
          <Download className="h-3.5 w-3.5" />
          <span>Get Resume / CV</span>
        </Button>
      </div>

      <div className="flex gap-2.5 pt-1">
        {[
          { icon: Github, href: "https://github.com/UDM11", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/", label: "LinkedIn" },
          { icon: Mail, href: "mailto:darlamiumesh123@gmail.com", label: "Email" },
        ].map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full w-9 h-9 flex items-center justify-center bg-card border border-border/10 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300 shadow-sm"
          >
            <social.icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// Bottom CTA Callout
const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto p-6 sm:p-10 md:p-14 rounded-3xl border border-white/5 bg-gradient-to-br from-card/30 via-card/10 to-transparent backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center group"
        >
          <div className="absolute -top-32 -left-32 w-56 h-56 bg-primary/10 rounded-full blur-[90px] pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
          <div className="absolute -bottom-32 -right-32 w-56 h-56 bg-accent/10 rounded-full blur-[90px] pointer-events-none group-hover:bg-accent/15 transition-all duration-500" />

          <div className="relative z-10 max-w-xl mx-auto">
            <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20 mb-3 text-xs font-semibold">
              🤝 Let's Collaborate
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 font-outfit leading-tight tracking-tight">
              Ready to Build Something <span className="gradient-text">Amazing?</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-8 leading-relaxed">
              Whether you need a tailored conversational AI chatbot, a fast database REST API, or a responsive React frontend, let's connect and write premium code together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto gap-1.5 group relative overflow-hidden bg-primary hover:bg-primary/90 shadow-md font-semibold text-xs text-primary-foreground py-5" asChild>
                <Link to="/contact">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Your Project</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-1.5 border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/20 font-semibold text-xs text-foreground py-5" asChild>
                <Link to="/projects">
                  <Eye className="h-4 w-4" />
                  <span>Explore My Work</span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 60]);
  const y2 = useTransform(scrollY, [0, 300], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    if (showResumeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showResumeModal]);

  return (
    <div className="min-h-screen text-foreground">
      <SEO 
        title="Umesh Darlami - Full-Stack Developer & Software Engineer | BCSIT Student"
        description="Official portfolio of Umesh Darlami, a full-stack developer, software engineer, and BCSIT student in Kathmandu, Nepal. Specializing in React, FastAPI, LLM integrations, and custom AI chatbots."
        keywords="Umesh Darlami, Umesh Darlami Magar, Full-Stack Developer, Software Engineer, Nepal Developer, BCSIT, React Developer, FastAPI, AI Integration, WhatsApp Chatbot Developer, Portfolio"
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12"
          style={{ opacity }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.img
              src={heroBg}
              alt="Hero Background"
              className="w-full h-full object-cover"
              style={{
                scale: 1.08,
                x: mousePosition.x * 15,
                y: mousePosition.y * 15,
                opacity: 0.05,
              }}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_90%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
          </div>

          <FloatingParticles />

          {/* Glow spots */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-[100px]"
              style={{ y: y1 }}
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-l from-accent/10 to-primary/10 blur-[100px]"
              style={{ y: y2 }}
              animate={{
                scale: [1.15, 1, 1.15],
                rotate: [360, 0],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Grid Layout Container */}
          <div className="container mx-auto px-4 z-10 relative mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
              {/* Left Column Text details */}
              <div className="lg:col-span-7">
                <HeroText onOpenResume={() => setShowResumeModal(true)} />
              </div>
              
              {/* Right Column Profile Bezel & Console */}
              <div className="lg:col-span-5 flex flex-col items-center gap-6">
                <ProfileBezel />
                <DeveloperConsole />
              </div>
            </div>
          </div>

          {/* Scroll Down */}
          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 cursor-pointer z-10 hidden sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-semibold">Scroll to explore</span>
              <motion.div
                className="w-5 h-8 border-2 border-primary rounded-full flex justify-center p-1 bg-card/25 backdrop-blur-md"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-1 bg-primary rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              </motion.div>
              <ChevronDown className="h-3 w-3 text-primary animate-bounce mt-0.5" />
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <StatsSection />

        {/* Technologies showcase */}
        <TechShowcase />

        {/* Call to action */}
        <CallToAction />
      </main>

      <Footer />
      <WhatsAppButton />
      
      {/* CV Hub Modal */}
      <CVHubModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
    </div>
  );
};

export default Home;