import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useHighlights } from "@/hooks/usePortfolioData";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Calendar, MapPin, Award, Heart, Coffee, Rocket, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import SEO from "@/components/SEO";

const profileImg = "https://jivvormqzmqjwehkqpne.supabase.co/storage/v1/object/public/project-images/profile.webp";

// Floating elements component
const FloatingElements = () => {
  const elements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.6, 0.2],
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

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Journey timeline component with scroll progressive line drawing
const JourneyTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const journeySteps = [
    {
      year: "2024",
      title: "Started BCSIT Journey",
      description: "Enrolled in Bachelor of Computer Science & IT at Liberty College to refine technical fundamentals.",
      icon: LucideIcons.GraduationCap,
    },
    {
      year: "2024",
      title: "First Web Applications",
      description: "Built dynamic client portals, custom dashboard CMS panels, and integrated backend PostgreSQL stores.",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "Freelance Integrations & Bots",
      description: "Launched automated WhatsApp business agents, custom chatbot assistants, and API telemetry scripts.",
      icon: Award,
    },
    {
      year: "Now",
      title: "Continuous Innovation",
      description: "Exploring vector search, prompt tuning, and building high-performance modern web platforms.",
      icon: Star,
    },
  ];

  return (
    <motion.section
      ref={timelineRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
            Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From coding fundamentals to constructing complex full-stack web and AI systems
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-2">
          {/* Vertical progress line for large displays */}
          <div className="absolute left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-muted rounded-full" />
          
          {/* Animated path filling on scroll */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_12px_rgba(14,165,233,0.3)]"
          />

          {journeySteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center mb-16 lg:mb-24 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Horizontal line spacer connecting card to center for desktop */}
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
                      glowColor="rgba(14, 165, 233, 0.1)"
                      className="border border-border/10 bg-card/40 backdrop-blur-xl hover:bg-card/75 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                          {step.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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
                  <StepIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

// Fun facts section
const FunFacts = () => {
  const facts = [
    { icon: Coffee, number: 500, suffix: "+", label: "Cups of Coffee" },
    { icon: Rocket, number: 15, suffix: "+", label: "Projects Launched" },
    { icon: Heart, number: 99, suffix: "%", label: "Passion Level" },
    { icon: Star, number: 2, suffix: "+", label: "Years Coding" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 relative overflow-hidden bg-muted/20 border-y border-border/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            Statistics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fun <span className="gradient-text">Facts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interesting milestones that highlight my technical commitment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {facts.map((fact, index) => {
            const FactIcon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <GlowCard
                  glowColor="rgba(236, 72, 153, 0.1)"
                  className="border border-border/10 bg-card/30 backdrop-blur-xl text-center"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
                      <FactIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-1 gradient-text">
                      <AnimatedCounter end={fact.number} suffix={fact.suffix} />
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">{fact.label}</p>
                  </CardContent>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

const renderIcon = (item: any) => {
  if (typeof item.icon === 'string') {
    const IconComponent = (LucideIcons as any)[item.icon] || (LucideIcons as any)[item.icon_name];
    return IconComponent ? <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" /> : <LucideIcons.HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />;
  } else if (item.icon) {
    const IconComponent = item.icon;
    return <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />;
  } else if (item.icon_name) {
    const IconComponent = (LucideIcons as any)[item.icon_name];
    return IconComponent ? <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" /> : <LucideIcons.HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />;
  }
  return <LucideIcons.HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />;
};

const About = () => {
  const { data: highlights = [] } = useHighlights();
  const [activeTab, setActiveTab] = useState<"expertise" | "highlights" | "education">("expertise");

  const expertiseItems = [
    {
      title: "Full-Stack Web Engineering",
      description: "Engineering responsive web interfaces and APIs with React, TypeScript, FastAPI, Node.js, and Supabase.",
      icon: LucideIcons.Code2,
      skills: ["React", "Next.js", "TypeScript", "FastAPI", "Express"],
      glow: "rgba(14, 165, 233, 0.15)"
    },
    {
      title: "AI Integration & Automation",
      description: "Integrating Large Language Models, prompt templates, WhatsApp automated messaging queues, and custom chatbot logic.",
      icon: LucideIcons.Bot,
      skills: ["LangChain", "OpenAI APIs", "Prompt Design", "Agentic Workflows"],
      glow: "rgba(168, 85, 247, 0.15)"
    },
    {
      title: "Database & Backends",
      description: "Structuring secure databases, vector embeddings, relational schemas, and server routes for high-speed CRUD operations.",
      icon: LucideIcons.Database,
      skills: ["PostgreSQL", "Supabase", "SQLAlchemy", "REST APIs", "Vector DBs"],
      glow: "rgba(34, 197, 94, 0.15)"
    },
    {
      title: "UI/UX & Micro-interactions",
      description: "Developing smooth transitions, floating components, theme lock setups, and custom HSL design schemes.",
      icon: LucideIcons.Sparkles,
      skills: ["Framer Motion", "Tailwind CSS", "Vanilla CSS", "Responsive Grid Layouts"],
      glow: "rgba(244, 63, 94, 0.15)"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="About Umesh Darlami | Full-Stack Developer & Software Engineer"
        description="Read about Umesh Darlami's background, education (BCSIT student at Liberty College), key capabilities, and programming philosophy."
        keywords="About Umesh Darlami, Umesh Darlami education, Liberty College BCSIT, developer background, software engineer Nepal"
      />
      <Navbar />
      <main className="relative pt-24">
        {/* Floating Elements Background */}
        <FloatingElements />

        {/* Hero split layout */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
            
            {/* Sticky Profile Summary Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <GlowCard
                glowColor="rgba(14, 165, 233, 0.15)"
                className="border border-border/10 bg-card/40 backdrop-blur-xl p-6 shadow-xl rounded-3xl"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto aspect-square rounded-full flex items-center justify-center">
                  {/* Rotating outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Rotating inner ring */}
                  <motion.div
                    className="absolute inset-2 rounded-full border-2 border-dotted border-accent/40"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Profile Image container */}
                  <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                    <img
                      src={profileImg}
                      alt="Umesh Darlami"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mt-6">
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-outfit">Umesh Darlami</div>
                  <p className="text-xs sm:text-sm text-primary font-medium mt-1 uppercase tracking-wider">
                    Full-Stack Developer
                  </p>
                </div>

                {/* Personal metadata chips */}
                <div className="space-y-3 pt-6 border-t border-border/10 mt-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/5">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Kathmandu, Nepal</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/5">
                    <LucideIcons.GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>BCSIT at Liberty College</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/5">
                    <div className="relative flex h-2 w-2 mr-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span>Available for Freelance & Projects</span>
                  </div>
                </div>

                {/* Quick Social Shortcuts */}
                <div className="flex justify-center gap-3 pt-6 border-t border-border/10 mt-6">
                  <a href="https://github.com/UDM11" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-xl bg-muted/40 border border-border/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300">
                    <LucideIcons.Github className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-xl bg-muted/40 border border-border/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300">
                    <LucideIcons.Linkedin className="h-4 w-4" />
                  </a>
                  <a href="mailto:darlamiumesh123@gmail.com" aria-label="Email" className="p-2.5 rounded-xl bg-muted/40 border border-border/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300">
                    <LucideIcons.Mail className="h-4 w-4" />
                  </a>
                  <a href="https://wa.me/9779863755744" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2.5 rounded-xl bg-muted/40 border border-border/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300">
                    <LucideIcons.MessageSquare className="h-4 w-4" />
                  </a>
                </div>
              </GlowCard>
            </div>

            {/* Scrollable biography & tabs column */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Introduction block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  👋 Nice to meet you!
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                  I'm <span className="gradient-text">Umesh Darlami</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  A passionate full-stack developer and BCSIT student at Liberty College. 
                  My journey began with curiosity about how digital magic happens behind the screen, 
                  and it has evolved into a deep passion for creating meaningful digital experiences.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I specialize in building modern, scalable web applications using cutting-edge technologies. 
                  My goal is to combine technical expertise with creative problem-solving to deliver 
                  solutions that make a real impact in people's lives.
                </p>
              </motion.div>

              {/* Sliding glassmorphic tab component */}
              <div className="pt-6 border-t border-border/10">
                <div className="flex p-1.5 bg-muted/50 border border-border/10 rounded-2xl max-w-lg mb-8 overflow-x-auto flex-nowrap scrollbar-none">
                  {(["expertise", "highlights", "education"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="relative flex-1 py-3 px-4 text-xs sm:text-sm font-semibold transition-all duration-300 capitalize text-center rounded-xl whitespace-nowrap min-w-[100px]"
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="aboutActiveTab"
                          className="absolute inset-0 bg-background shadow-md border border-border/10 rounded-xl"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 ${activeTab === tab ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"}`}>
                        {tab === "expertise" ? "⚡ Core Expertise" : tab === "highlights" ? "🏆 Achievements" : "🎓 Education"}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tab content renderer */}
                <div className="min-h-[350px]">
                  
                  {/* Tab 1: Expertise */}
                  {activeTab === "expertise" && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {expertiseItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <GlowCard
                            key={index}
                            glowColor={item.glow}
                            className="border border-border/10 bg-card/30 backdrop-blur-xl hover:shadow-lg transition-all duration-300"
                          >
                            <CardContent className="p-6 space-y-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                              <div className="flex flex-wrap gap-1.5 pt-2">
                                {item.skills.map((s) => (
                                  <Badge key={s} variant="secondary" className="text-[10px] py-0.5 px-2 font-medium bg-muted/60">
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </GlowCard>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Tab 2: Dynamic Highlights */}
                  {activeTab === "highlights" && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      {highlights.length === 0 ? (
                        <p className="text-muted-foreground text-sm italic">No dynamic highlights found.</p>
                      ) : (
                        highlights.map((item, index) => (
                          <GlowCard
                            key={index}
                            glowColor="rgba(168, 85, 247, 0.1)"
                            className="border border-border/10 bg-card/30 backdrop-blur-xl"
                          >
                            <CardContent className="p-6 flex gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
                                {renderIcon(item)}
                              </div>
                              <div>
                                <h3 className="font-bold text-base sm:text-lg text-foreground mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                              </div>
                            </CardContent>
                          </GlowCard>
                        ))
                      )}
                    </motion.div>
                  )}

                  {/* Tab 3: Education */}
                  {activeTab === "education" && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <GlowCard
                        glowColor="rgba(34, 197, 94, 0.1)"
                        className="border border-border/10 bg-card/30 backdrop-blur-xl"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <div>
                              <span className="text-xs font-semibold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                                2024 - Present
                              </span>
                              <h3 className="font-bold text-lg sm:text-xl text-foreground">
                                Bachelor of Computer Science & Information Technology (BCSIT)
                              </h3>
                              <p className="text-sm text-muted-foreground font-medium mt-1">Liberty College (Kathmandu, Nepal)</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Currently pursuing core computing theories and practical concepts. Studying topics such as Software Engineering, Relational Database Management Systems (RDBMS), Data Structures & Algorithms, Object-Oriented Development, and API integration flows.
                          </p>
                        </CardContent>
                      </GlowCard>

                      <GlowCard
                        glowColor="rgba(14, 165, 233, 0.1)"
                        className="border border-border/10 bg-card/30 backdrop-blur-xl"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <div>
                              <span className="text-xs font-semibold text-accent uppercase bg-accent/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                                Graduated 2023
                              </span>
                              <h3 className="font-bold text-lg sm:text-xl text-foreground">
                                High School (+2) Science (Computer Science Major)
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Acquired fundamental computing skills. Completed projects using C language, explored core algebra & physics concepts, and learned basic web pages layout styling.
                          </p>
                        </CardContent>
                      </GlowCard>
                    </motion.div>
                  )}

                </div>
              </div>

              {/* Call to action button */}
              <div className="pt-6">
                <Button size="lg" className="gap-3 group rounded-xl" asChild>
                  <Link to="/contact">
                    Let's Connect
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Journey Timeline section */}
        <JourneyTimeline />

        {/* Fun Facts section */}
        <FunFacts />

        {/* Bottom CTA block */}
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
                Let's Create Something <span className="gradient-text">Amazing</span> Together
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with amazing partners.
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
    </div>
  );
};

export default About;
