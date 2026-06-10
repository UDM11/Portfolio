import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { skillCategories } from "@/constants";
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

// Floating elements component
const FloatingElements = () => {
  const elements = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 16 + 12,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/25 to-accent/25 blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.9, 0.3],
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
  { name: "Frontend Development", level: 95, color: "bg-blue-500", icon: Code2 },
  { name: "Backend Development", level: 88, color: "bg-green-500", icon: Database },
  { name: "AI Development", level: 85, color: "bg-purple-500", icon: Brain },
  { name: "Chatbots Development", level: 90, color: "bg-pink-500", icon: MessageSquare },
  { name: "DevOps & Tools", level: 78, color: "bg-orange-500", icon: Wrench },
  { name: "UI/UX Design", level: 82, color: "bg-indigo-500", icon: Palette },
  { name: "Problem Solving", level: 92, color: "bg-teal-500", icon: Lightbulb },
];

// Skill statistics
const SkillStats = () => {
  const stats = [
    { icon: Code2, number: "15+", label: "Technologies Mastered", color: "from-blue-500 to-cyan-500" },
    { icon: Star, number: "3+", label: "Years Experience", color: "from-yellow-500 to-orange-500" },
    { icon: Target, number: "50+", label: "Projects Built", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, number: "100%", label: "Learning Mindset", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
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
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center"
            >
              <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 gradient-text">
                    {stat.number}
                  </h3>
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

// Skill proficiency section
const SkillProficiency = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Skill <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            My expertise levels across different technology domains
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {skillProficiency.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${skill.color} flex items-center justify-center shadow-lg`}
                    >
                      <skill.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold">{skill.name}</h3>
                        <span className="text-sm sm:text-base font-medium text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced skill category card
const SkillCategoryCard = ({ category, index }: { category: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredSkills = category.skills.filter((skill: string) =>
    skill.toLowerCase().includes(filter.toLowerCase())
  );

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'frontend': return Code2;
      case 'backend': return Database;
      case 'ai development': return Brain;
      case 'chatbots': return MessageSquare;
      case 'tools & others': return Wrench;
      case 'soft skills': return Users;
      default: return Code2;
    }
  };

  const getCategoryColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'frontend': return 'from-blue-500 to-cyan-500';
      case 'backend': return 'from-green-500 to-emerald-500';
      case 'ai development': return 'from-purple-500 to-indigo-500';
      case 'chatbots': return 'from-pink-500 to-rose-500';
      case 'tools & others': return 'from-orange-500 to-red-500';
      case 'soft skills': return 'from-teal-500 to-cyan-500';
      default: return 'from-primary to-accent';
    }
  };

  const Icon = getCategoryIcon(category.title);
  const colorClass = getCategoryColor(category.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center shadow-lg`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </motion.div>
            <motion.span
              className="text-lg sm:text-xl font-semibold"
              animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            >
              {category.title}
            </motion.span>
          </CardTitle>
          
          {/* Mini search for skills */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter skills..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-3 py-1.5 text-xs sm:text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm flex items-center gap-1.5"
                    >
                      <SkillIcon className="h-3 w-3" />
                      {skill}
                    </Badge>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          
          {filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No skills found</p>
            </motion.div>
          )}
          
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{filteredSkills.length} skills</span>
              <Badge variant="outline" className="text-xs">
                {category.title}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Skills = () => {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          {/* Floating Elements */}
          <FloatingElements />

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
                    🚀 Technical Expertise
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Skills & <span className="gradient-text">Technologies</span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Explore my comprehensive toolkit of technologies, frameworks, and skills that I use to 
                  build exceptional digital experiences and solve complex problems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" className="gap-3 group" asChild>
                    <Link to="/projects">
                      <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      See Skills in Action
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-3" asChild>
                    <Link to="/contact">
                      <Heart className="h-5 w-5" />
                      Let's Collaborate
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Skill Stats */}
        <SkillStats />

        {/* Skill Proficiency */}
        <SkillProficiency />

        {/* Skills Categories */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Technology <span className="gradient-text">Stack</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                Comprehensive overview of my technical skills organized by category
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {skillCategories.map((category, index) => (
                <SkillCategoryCard key={category.title} category={category} index={index} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Ready to Build Something <span className="gradient-text">Incredible?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Let's combine these skills with your vision to create innovative solutions that make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-3" asChild>
                    <Link to="/contact">
                      <Sparkles className="h-5 w-5" />
                      Start a Project
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="gap-3" asChild>
                    <Link to="/experience">
                      <Award className="h-5 w-5" />
                      View Experience
                    </Link>
                  </Button>
                </motion.div>
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
