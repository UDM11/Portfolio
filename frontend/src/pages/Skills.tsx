import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSkills } from "@/hooks/usePortfolioData";
import SEO from "@/components/SEO";
import {
  Code2,
  Database,
  Palette,
  Wrench,
  Brain,
  Star,
  Zap,
  Target,
  Award,
  TrendingUp,
  ArrowRight,
  Heart,
  Sparkles,
  Filter,
  Search,
  MessageSquare,
  Users,
  Globe,
  Layers,
  Server,
  GitBranch,
  Monitor,
  Figma,
  Settings,
  Cloud,
  Lightbulb,
  Clock,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Hydration-safe Floating Elements Background
const FloatingElements = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const elements = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/15 to-accent/15 blur-[3px]"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 12, 0],
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Skill proficiency levels
const skillProficiency = [
  { name: "Frontend Development", level: 95, glow: "rgba(14, 165, 233, 0.15)", barColor: "from-sky-500 to-blue-600", icon: Code2 },
  { name: "Backend Development", level: 88, glow: "rgba(34, 197, 94, 0.15)", barColor: "from-emerald-500 to-green-600", icon: Database },
  { name: "AI Development & RAG", level: 85, glow: "rgba(168, 85, 247, 0.15)", barColor: "from-purple-500 to-indigo-600", icon: Brain },
  { name: "Chatbots Development", level: 90, glow: "rgba(244, 63, 94, 0.15)", barColor: "from-pink-500 to-rose-600", icon: MessageSquare },
  { name: "DevOps & Cloud", level: 78, glow: "rgba(249, 115, 22, 0.15)", barColor: "from-orange-500 to-red-600", icon: Cloud },
  { name: "UI/UX Design", level: 82, glow: "rgba(99, 102, 241, 0.15)", barColor: "from-indigo-500 to-violet-600", icon: Palette },
  { name: "Problem Solving", level: 92, glow: "rgba(20, 184, 166, 0.15)", barColor: "from-teal-500 to-cyan-600", icon: Lightbulb },
];

// Stats Row redone with GlowCard
const SkillStats = () => {
  const stats = [
    { icon: Code2, number: "15+", label: "Techs Mastered", glow: "rgba(14, 165, 233, 0.12)" },
    { icon: Star, number: "2+", label: "Years Experience", glow: "rgba(168, 85, 247, 0.12)" },
    { icon: Target, number: "10+", label: "Projects Completed", glow: "rgba(34, 197, 94, 0.12)" },
    { icon: TrendingUp, number: "100%", label: "Learning Mindset", glow: "rgba(244, 63, 94, 0.12)" },
  ];

  return (
    <section className="py-12 bg-muted/15 border-y border-border/5">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
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
                className="border border-border/10 bg-card/45 backdrop-blur-xl transition-all duration-300"
              >
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-1 gradient-text font-outfit">
                    {stat.number}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill Proficiency indicators with animated glows
const SkillProficiency = () => {
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
            ⚡ Core Proficiency
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 font-outfit tracking-tight">
            Expertise & <span className="gradient-text">Competencies</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            A visual overview of Umesh's primary software capabilities and estimated mastery metrics.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-5">
          {skillProficiency.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ x: 4 }}
              className="group"
            >
              <GlowCard 
                glowColor={skill.glow}
                className="border border-border/10 bg-card/45 backdrop-blur-xl transition-all duration-300"
              >
                <CardContent className="p-4 sm:p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <skill.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground/90">{skill.name}</h3>
                      <span className="text-xs font-bold text-primary">{skill.level}%</span>
                    </div>
                    {/* Progress Track */}
                    <div className="h-2 bg-muted/65 rounded-full overflow-hidden relative">
                      {/* Pulse shimmer highlight inside progress bar */}
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.barColor} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </CardContent>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skill category card Redone
const SkillCategoryCard = ({ category, index }: { category: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [filter, setFilter] = useState("");

  const categoryTitle = category.category || category.title || "";

  const filteredSkills = category.skills.filter((skill: string) =>
    skill.toLowerCase().includes(filter.toLowerCase())
  );

  const getCategoryIcon = (title: string) => {
    switch ((title || "").toLowerCase()) {
      case 'frontend': return Code2;
      case 'backend': return Database;
      case 'ai development': return Brain;
      case 'chatbots': return MessageSquare;
      case 'tools & others': return Wrench;
      case 'soft skills': return Users;
      default: return Code2;
    }
  };

  const getCategoryGlow = (title: string) => {
    switch ((title || "").toLowerCase()) {
      case 'frontend': return 'rgba(14, 165, 233, 0.12)';
      case 'backend': return 'rgba(34, 197, 94, 0.12)';
      case 'ai development': return 'rgba(168, 85, 247, 0.12)';
      case 'chatbots': return 'rgba(244, 63, 94, 0.12)';
      case 'tools & others': return 'rgba(249, 115, 22, 0.12)';
      case 'soft skills': return 'rgba(20, 184, 166, 0.12)';
      default: return 'rgba(120, 119, 198, 0.12)';
    }
  };

  const Icon = getCategoryIcon(categoryTitle);
  const glowColor = getCategoryGlow(categoryTitle);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <GlowCard 
        glowColor={glowColor}
        className="border border-border/10 bg-card/45 backdrop-blur-xl transition-all duration-500 hover:shadow-lg h-full flex flex-col justify-between"
      >
        <div>
          <CardHeader className="pb-3 text-left">
            <CardTitle className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <motion.span
                className="text-base sm:text-lg font-bold font-outfit"
                animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
              >
                {categoryTitle}
              </motion.span>
            </CardTitle>
            
            {/* Filter input */}
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter tools..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-muted/30 border border-border/15 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 rounded-xl"
              />
            </div>
          </CardHeader>
          
          <CardContent className="pb-3 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2"
              >
                {filteredSkills.map((skill: string, skillIndex: number) => {
                  const getSkillIcon = (skillName: string) => {
                    const name = skillName.toLowerCase();
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
                    if (name.includes('vercel') || name.includes('netlify') || name.includes('render')) return Cloud;
                    if (name.includes('problem') || name.includes('critical')) return Lightbulb;
                    if (name.includes('team') || name.includes('communication')) return Users;
                    if (name.includes('time')) return Clock;
                    if (name.includes('adaptability')) return TrendingUp;
                    return CheckCircle;
                  };
                  
                  const SkillIcon = getSkillIcon(skill);
                  
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link to={`/projects?tech=${encodeURIComponent(skill)}`}>
                        <Badge
                          variant="secondary"
                          className="px-2.5 py-1 text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground border border-border/5 bg-background/55 transition-all duration-300 shadow-sm flex items-center gap-1.5"
                        >
                          <SkillIcon className="h-3 w-3" />
                          <span>{skill}</span>
                        </Badge>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
            {filteredSkills.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6 text-muted-foreground"
              >
                <Search className="h-6 w-6 mx-auto mb-2 opacity-50 text-muted-foreground" />
                <p className="text-xs">No matching tools</p>
              </motion.div>
            )}
          </CardContent>
        </div>
        
        <div className="px-6 pb-5 flex flex-col justify-end">
          <div className="pt-3 border-t border-border/10 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{filteredSkills.length} active tags</span>
            <Badge variant="outline" className="text-[9px] font-mono opacity-80">
              {categoryTitle}
            </Badge>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
};

const Skills = () => {
  const { data: skillCategories = [] } = useSkills();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  
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

  return (
    <div className="min-h-screen text-foreground">
      <SEO 
        title="Technical Skills Matrix | Umesh Darlami"
        description="Technical competencies of Umesh Darlami, spanning frontend (React, TS), backend (FastAPI, Node), database management (Supabase, PostgreSQL), and AI integrations."
        keywords="Umesh Darlami skills, developer stack, React TypeScript developer, Python developer, database skills"
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

          <FloatingElements />

          {/* Animated Background Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-[100px]"
              style={{ y: y1 }}
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-accent/10 to-primary/10 blur-[100px]"
              style={{ y: y2 }}
              animate={{
                scale: [1.25, 1, 1.25],
                rotate: [360, 0],
              }}
              transition={{
                duration: 18,
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
                  🚀 Technical Competence
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 font-outfit leading-tight text-foreground tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Skills & <span className="gradient-text font-black">Technologies</span>
              </motion.h1>

              <motion.p
                className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Umesh's structured roadmap of programming tools, development packages, database layouts, and artificial intelligence libraries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-3 justify-center pt-2"
              >
                <Button size="lg" className="gap-2 group font-semibold text-xs py-5" asChild>
                  <Link to="/projects">
                    <Zap className="h-4 w-4 text-primary-foreground group-hover:scale-110 transition-transform" />
                    <span>See Skills in Action</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 font-semibold text-xs py-5 border-border/10 bg-card/45 hover:bg-muted" asChild>
                  <Link to="/contact">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Let's Collaborate</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Skill Stats Section */}
        <SkillStats />

        {/* Skill Proficiency Indicators */}
        <SkillProficiency />

        {/* Skills Categories Grids */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative overflow-hidden border-t border-border/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(14,165,233,0.02),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-3 font-outfit tracking-tight">
                Technology <span className="gradient-text">Stack</span>
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Filter and explore individual framework items grouped by administrative discipline.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {skillCategories.map((category, index) => (
                <SkillCategoryCard key={category.id || category.category || category.title || index} category={category} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA Callout */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-t border-border/5"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring" }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <h2 className="text-3xl font-black font-outfit leading-tight tracking-tight">
                Ready to Build Something <span className="gradient-text font-black">Incredible?</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Let's combine these technologies with your project vision to engineer modular software solutions that scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                <Button size="lg" className="w-full sm:w-auto gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs py-5" asChild>
                  <Link to="/contact">
                    <Sparkles className="h-4 w-4" />
                    <span>Start a Project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-1.5 border-border/10 bg-card/45 hover:bg-muted font-semibold text-xs py-5" asChild>
                  <Link to="/experience">
                    <Award className="h-4 w-4" />
                    <span>View Experience</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Skills;
