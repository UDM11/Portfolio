import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Users, Clock, TrendingUp, Star, Zap, Target, BookOpen, Code, Rocket, Heart, ArrowRight, Download } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { timeline } from "@/constants";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Floating elements component
const FloatingElements = () => {
  const elements = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 18, 0],
            scale: [1, 1.3, 1],
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

// Skills & Achievements section
const SkillsAchievements = () => {
  const achievements = [
    { icon: Award, number: "10+", label: "Projects Completed", color: "from-yellow-500 to-orange-500" },
    { icon: Users, number: "5+", label: "Happy Clients", color: "from-blue-500 to-cyan-500" },
    { icon: Clock, number: "2+", label: "Years Experience", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, number: "100%", label: "Success Rate", color: "from-purple-500 to-pink-500" },
  ];

  const skills = [
    { name: "Frontend Development", level: 90, color: "bg-blue-500" },
    { name: "Backend Development", level: 85, color: "bg-green-500" },
    { name: "Database Management", level: 80, color: "bg-purple-500" },
    { name: "UI/UX Design", level: 75, color: "bg-pink-500" },
    { name: "Project Management", level: 85, color: "bg-orange-500" },
  ];

  return (
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
            Skills & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            A showcase of my technical expertise and professional milestones
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
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
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg`}
                  >
                    <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 gradient-text">
                    {achievement.number}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{achievement.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Progress Bars */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center">Technical Proficiency</h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced timeline component
const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (item.type) {
      case "education":
        return GraduationCap;
      case "experience":
        return Briefcase;
      default:
        return Briefcase;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        x: window.innerWidth >= 1024 ? (index % 2 === 0 ? -50 : 50) : 0
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={`relative mb-8 sm:mb-12 ${
        index % 2 === 0 ? "lg:pr-[50%] lg:pl-0" : "lg:pl-[50%] lg:pr-0"
      } pl-16 sm:pl-20`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced Timeline Icon */}
      <motion.div
        className="absolute left-2 sm:left-4 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center z-10 shadow-lg"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 hover:shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Badge className={`w-fit text-xs sm:text-sm ${
                item.type === 'education' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 'bg-green-500/10 text-green-600 border-green-500/20'
              }`}>
                {item.type === 'education' ? 'Education' : 'Experience'}
              </Badge>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                {item.period}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <motion.h3 
              className="text-lg sm:text-xl font-semibold mb-2"
              animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            >
              {item.title}
            </motion.h3>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <p className="text-primary font-medium text-sm sm:text-base">
                {item.organization}
              </p>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
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
                    🎆 My Professional Journey
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Experience & <span className="gradient-text">Education</span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Discover my professional journey through education, work experience, and continuous learning. 
                  Each step has shaped me into the developer I am today.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" className="gap-3 group" asChild>
                    <Link to="/contact">
                      <Rocket className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      Work With Me
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-3" asChild>
                    <a href="/contact">
                      <Download className="h-5 w-5" />
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Skills & Achievements */}
        <SkillsAchievements />

        {/* Timeline Section */}
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
                Professional <span className="gradient-text">Timeline</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                A chronological overview of my educational background and professional experience
              </p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Enhanced Timeline Line */}
              <div className="absolute left-8 sm:left-10 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

              {timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
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
                Ready to <span className="gradient-text">Collaborate?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Let's combine my experience with your vision to create something extraordinary together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-3" asChild>
                    <Link to="/projects">
                      <Star className="h-5 w-5" />
                      View My Work
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="gap-3" asChild>
                    <Link to="/contact">
                      <Heart className="h-5 w-5" />
                      Get In Touch
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
