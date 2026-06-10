import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Sparkles, Zap, Target, ChevronDown, Play, Globe, Palette, Layers, Server, Database, Brain, MessageSquare, GitBranch, Monitor, Figma, Settings, Cloud, Users, Clock, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
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

// Typing animation component
const TypingAnimation = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-primary ml-1"
      />
    </span>
  );
};

// Stats section
const StatsSection = () => {
  const stats = [
    { number: "10+", label: "Projects Completed", icon: Code2 },
    { number: "2+", label: "Years Experience", icon: Zap },
    { number: "100%", label: "Client Satisfaction", icon: Target },
    { number: "24/7", label: "Support Available", icon: Sparkles },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </motion.div>
                  <motion.h3
                    className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 gradient-text"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Featured technologies section
const TechShowcase = () => {
  const technologies = [
    // Frontend
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    
    // Backend
    "Node.js",
    "Express",
    "FastAPI",
    "MongoDB",
    "PostgreSQL",
    "RESTful APIs",
    "GraphQL",
    "JWT",
    
    // AI Development
    "LangChain",
    "LangGraph",
    "RAG (Retrieval-Augmented Generation)",
    "AI Agents",
    "OpenAI API",
    "Hugging Face",
    "LLMs Integration",
    "AI Automation",
    "Full-Stack AI Solutions",
    "Vector Databases",
    
    // Chatbots
    "Custom AI Chatbots",
    "WhatsApp Chatbots",
    "Dialogflow",
    "Twilio API",
    "ChatGPT API",
    "Multichannel Automation",
    
    // Tools & Others
    "Git",
    "GitHub",
    "VS Code",
    "Figma",
    "Postman",
    "Linux",
    "Docker",
    "Vercel",
    "Netlify",
    "Render",
    "AWS"
  ];
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technologies I <span className="gradient-text">Master</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge tools and frameworks I use to build exceptional digital experiences
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-0">
          {technologies.map((tech, index) => {
            const getTechIcon = (techName: string) => {
              const name = techName.toLowerCase();
              if (name.includes('html')) return Globe;
              if (name.includes('css')) return Palette;
              if (name.includes('javascript') || name.includes('typescript')) return Code2;
              if (name.includes('react') || name.includes('next.js')) return Layers;
              if (name.includes('tailwind')) return Palette;
              if (name.includes('framer')) return Zap;
              if (name.includes('node.js') || name.includes('express')) return Server;
              if (name.includes('fastapi')) return Zap;
              if (name.includes('mongodb') || name.includes('postgresql')) return Database;
              if (name.includes('api') || name.includes('graphql') || name.includes('jwt')) return Server;
              if (name.includes('langchain') || name.includes('langgraph') || name.includes('rag') || name.includes('ai') || name.includes('llm') || name.includes('openai') || name.includes('hugging')) return Brain;
              if (name.includes('chatbot') || name.includes('whatsapp') || name.includes('dialogflow') || name.includes('twilio') || name.includes('chatgpt')) return MessageSquare;
              if (name.includes('git') || name.includes('github')) return GitBranch;
              if (name.includes('vs code') || name.includes('postman')) return Monitor;
              if (name.includes('figma')) return Figma;
              if (name.includes('linux') || name.includes('docker')) return Settings;
              if (name.includes('vercel') || name.includes('netlify') || name.includes('render') || name.includes('aws')) return Cloud;
              return CheckCircle;
            };
            
            const TechIcon = getTechIcon(tech);
            
            return (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-card/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                >
                  <TechIcon className="h-3 w-3" />
                  {tech}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Block body scroll when modal is open
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
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ opacity }}
        >
          {/* Dynamic Background */}
          <div className="absolute inset-0 z-0">
            <motion.img
              src={heroBg}
              alt="Hero Background"
              className="w-full h-full object-cover"
              style={{
                scale: 1.1,
                x: mousePosition.x * 20,
                y: mousePosition.y * 20,
                opacity: 0.15,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          </div>

          {/* Floating Particles */}
          <FloatingParticles />

          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-[120px]"
              style={{ y: y1 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-accent/30 to-primary/30 blur-[120px]"
              style={{ y: y2 }}
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 z-10 pt-16">
            <div className="max-w-5xl mx-auto text-center">
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
                  <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4">
                    👋 Welcome to my digital world
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="gradient-text">Umesh</span>
                  <br />
                  <TypingAnimation text="Darlami" className="gradient-text" />
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mb-6 sm:mb-8"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-foreground">
                    Full-Stack Developer & Digital Innovator
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                    Crafting exceptional digital experiences with cutting-edge technology.
                    Transforming ideas into powerful, scalable solutions that make a difference.
                  </p>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <Button size="lg" className="gap-3 group relative overflow-hidden" asChild>
                    <Link to="/projects">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Explore My Work
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-3 group"
                    onClick={() => setShowResumeModal(true)}
                  >
                    <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Download Resume
                  </Button>
                </motion.div>

                {/* Enhanced Social Links */}
                <motion.div
                  className="flex gap-4 sm:gap-6 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {[
                    { icon: Github, href: "https://github.com/UDM11", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/", label: "LinkedIn" },
                    { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com", label: "Email" },
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-card/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <social.icon className="h-5 w-5" />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-xs text-muted-foreground font-medium hidden sm:block">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2 bg-card/20 backdrop-blur"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <ChevronDown className="h-4 w-4 text-primary animate-bounce" />
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <StatsSection />

        {/* Technology Showcase */}
        <TechShowcase />

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Ready to Build Something <span className="gradient-text">Amazing?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Let's collaborate and turn your vision into reality with cutting-edge technology and innovative design.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-3 text-lg px-8 py-6" asChild>
                  <Link to="/contact">
                    <Sparkles className="h-5 w-5" />
                    Start Your Project
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <WhatsAppButton />
      
      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Resume Not Available</h3>
                <p className="text-muted-foreground mb-6">
                  Resume is currently being updated. Please check back soon!
                </p>
                <Button 
                  onClick={() => setShowResumeModal(false)}
                  className="w-full"
                >
                  OK
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;