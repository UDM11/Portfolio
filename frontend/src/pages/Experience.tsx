import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Users, Clock, TrendingUp, Star, Zap, Target, BookOpen, Code, Rocket, Heart, ArrowRight, Download } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useExperience } from "@/hooks/usePortfolioData";
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

// Floating background elements
const FloatingElements = () => {
  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/15 to-accent/15 blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
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

// Skills & Achievements Section
const SkillsAchievements = () => {
  const achievements = [
    { icon: Award, number: "10+", label: "Projects Completed", color: "rgba(234, 179, 8, 0.15)" },
    { icon: Users, number: "5+", label: "Happy Clients", color: "rgba(59, 130, 246, 0.15)" },
    { icon: Clock, number: "2+", label: "Years Experience", color: "rgba(16, 185, 129, 0.15)" },
    { icon: TrendingUp, number: "100%", label: "Success Rate", color: "rgba(168, 85, 247, 0.15)" },
  ];

  const skillCategories = [
    {
      title: "Frontend Architecture",
      glow: "rgba(14, 165, 233, 0.12)",
      skills: [
        { name: "React & Next.js", level: 90 },
        { name: "Tailwind CSS & Framer Motion", level: 90 },
        { name: "UI/UX Prototyping", level: 75 }
      ]
    },
    {
      title: "Backend & Systems",
      glow: "rgba(34, 197, 94, 0.12)",
      skills: [
        { name: "Python & FastAPI", level: 85 },
        { name: "Node.js & Express", level: 85 },
        { name: "PostgreSQL & Supabase", level: 80 }
      ]
    },
    {
      title: "AI & Tools",
      glow: "rgba(168, 85, 247, 0.12)",
      skills: [
        { name: "LLM APIs & Automation", level: 85 },
        { name: "WhatsApp & Telegram Chatbots", level: 90 },
        { name: "Project Management", level: 85 }
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-muted/20 border-y border-border/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            Expertise & Milestones
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium">
            A showcase of my technical proficiency and professional milestones
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-20">
          {achievements.map((achievement, index) => {
            const AchIcon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <GlowCard 
                  glowColor={achievement.color}
                  className="border border-border/10 bg-card/30 backdrop-blur hover:bg-card/70 transition-all duration-300 h-full text-center"
                >
                  <CardContent className="p-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
                      <AchIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text font-outfit">
                      {achievement.number}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold">{achievement.label}</p>
                  </CardContent>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Proficiency Categorized */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-10 text-center">Technical Proficiency</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, cIdx) => (
              <GlowCard
                key={cIdx}
                glowColor={category.glow}
                className="border border-border/10 bg-card/30 backdrop-blur-xl p-6 rounded-3xl"
              >
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-6 pb-2 border-b border-border/10 flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
};

// Enhanced timeline item component
const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.type === "education" ? GraduationCap : Briefcase;

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-start lg:items-center mb-16 lg:mb-24 ${
        index % 2 === 0 ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Horizontal line connector for desktop */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 w-8 h-[2px] bg-border/40 -translate-y-1/2" />

      {/* Left/Right Container */}
      <div className="w-full lg:w-1/2 pl-14 sm:pl-16 lg:pl-0 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <GlowCard
            glowColor={item.type === 'education' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(16, 185, 129, 0.12)'}
            className="border border-border/10 bg-card/40 backdrop-blur-xl hover:bg-card/75 transition-all duration-300 hover:shadow-xl"
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Badge className={`w-fit text-xs ${
                  item.type === 'education' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold' : 'bg-green-500/10 text-green-600 border-green-500/20 font-bold'
                }`}>
                  {item.type === 'education' ? 'Education' : 'Experience'}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.period}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <motion.h3 
                className="text-lg sm:text-xl font-bold mb-2 text-foreground"
                animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
              >
                {item.title}
              </motion.h3>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-primary font-semibold text-sm sm:text-base">
                  {item.organization}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </GlowCard>
        </motion.div>
      </div>

      {/* Timeline center hub dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
        className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 top-4 lg:top-1/2 lg:-translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background border-4 border-primary shadow-lg flex items-center justify-center z-10"
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const { data: timeline = [], isLoading } = useExperience();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 40]);
  const y2 = useTransform(scrollY, [0, 300], [0, -40]);

  const [showResumeModal, setShowResumeModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "experience" | "education">("all");
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

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

  const filteredTimeline = timeline.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen">
      <SEO 
        title="Work Experience & Education | Umesh Darlami"
        description="Professional software engineering experience and academic history of Umesh Darlami, detailing roles, organizations, and key achievements."
        keywords="Umesh Darlami experience, Umesh Darlami resume, career history, developer experience, education timeline"
      />
      <Navbar />
      <main className="relative pt-24">
        <Breadcrumbs />
        {/* Floating background backdrop */}
        <FloatingElements />

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-[100px]"
            style={{ y: y1 }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-accent/10 to-primary/10 blur-[100px]"
            style={{ y: y2 }}
            animate={{ scale: [1.25, 1, 1.25], rotate: [360, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Hero split text header */}
        <div className="container mx-auto px-4 z-10 relative mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="px-4.5 py-1.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20 mb-6">
                🎆 My Professional Journey
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                Experience & <span className="gradient-text">Education</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Discover my professional journey through education, work experience, and continuous learning. 
                Each step has shaped me into the developer I am today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2.5 group rounded-xl" asChild>
                  <Link to="/contact">
                    <Rocket className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Work With Me
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2.5 rounded-xl border-primary/20 hover:bg-primary/5"
                  onClick={() => setShowResumeModal(true)}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills & Achievements */}
        <SkillsAchievements />

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
                Timeline
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="gradient-text">Timeline</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-medium">
                A chronological overview of my educational background and professional experience
              </p>
            </motion.div>

            {/* Sliding interactive filters */}
            <div className="flex p-1.5 bg-muted/50 border border-border/10 rounded-2xl max-w-md mx-auto mb-16 overflow-x-auto flex-nowrap scrollbar-none">
              {(["all", "experience", "education"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className="relative flex-1 py-3 px-4 text-xs sm:text-sm font-semibold transition-all duration-300 capitalize text-center rounded-xl whitespace-nowrap min-w-[100px]"
                >
                  {filter === opt && (
                    <motion.div
                      layoutId="timelineActiveFilter"
                      className="absolute inset-0 bg-background shadow-md border border-border/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${filter === opt ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"}`}>
                    {opt === "all" ? "🌐 Show All" : opt === "experience" ? "💼 Experience" : "🎓 Education"}
                  </span>
                </button>
              ))}
            </div>

            <div ref={timelineRef} className="relative max-w-5xl mx-auto px-2">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="border border-border bg-card rounded-2xl p-6 space-y-4 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-24 bg-muted/40 rounded-full"></div>
                        <div className="h-4 w-28 bg-muted/30 rounded-md"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-5 w-3/4 bg-muted/40 rounded-lg"></div>
                        <div className="h-3.5 w-1/2 bg-muted/30 rounded-md"></div>
                      </div>
                      <div className="h-16 bg-muted/20 rounded-xl p-3 border border-border/50"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Vertical progress line for large displays */}
                  <div className="absolute left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-muted rounded-full" />
                  
                  {/* Animated path filling on scroll */}
                  <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_12px_rgba(14,165,233,0.3)]"
                  />

                  <div className="space-y-4">
                    {filteredTimeline.map((item, index) => (
                      <TimelineItem key={index} item={item} index={index} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* Bottom Call to Action panel */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 text-center z-10 relative">
            <GlowCard
              glowColor="rgba(14, 165, 233, 0.08)"
              className="max-w-4xl mx-auto border border-border/10 bg-card/45 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl"
            >
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Ready to <span className="gradient-text">Collaborate?</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's combine my experience with your vision to create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2.5 rounded-xl w-full" asChild>
                    <Link to="/projects">
                      View My Work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="gap-2.5 rounded-xl w-full border-primary/20 hover:bg-primary/5" asChild>
                    <Link to="/contact">
                      Get In Touch
                      <Heart className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </GlowCard>
          </div>
        </motion.section>

      </main>
      <Footer />
      <WhatsAppButton />
      
      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border/15 rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-[210] backdrop-blur-2xl bg-card/90"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto text-yellow-500">
                  <LucideIcons.AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-foreground">Resume Under Review</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    My CV is currently being updated to reflect my latest full-stack & chatbot projects. 
                    Please click below to request it directly via email!
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button 
                    className="w-full gap-2 rounded-xl"
                    asChild
                  >
                    <a href="mailto:darlamiumesh123@gmail.com?subject=Requesting Umesh Darlami Magar's Resume">
                      <LucideIcons.Mail className="h-4 w-4" />
                      Request CV via Email
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowResumeModal(false)}
                    className="w-full rounded-xl border-border/10 hover:bg-muted"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
