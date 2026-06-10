import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { highlights } from "@/constants";
import { ArrowRight, Calendar, MapPin, Award, Heart, Coffee, Rocket, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import profileImg from "@/assets/profile.jpg";

// Floating elements component
const FloatingElements = () => {
  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 15 + 10,
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
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
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
  const isInView = useInView(ref);

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

// Journey timeline component
const JourneyTimeline = () => {
  const journeySteps = [
    {
      year: "2024",
      title: "Started BCSIT Journey",
      description: "Began my Bachelor's in Computer Science at Liberty College",
      icon: Calendar,
    },
    {
      year: "2024",
      title: "First Web Project",
      description: "Built my first full-stack application using React and Node.js",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "Freelance Success",
      description: "Started freelancing and completed 10+ successful projects",
      icon: Award,
    },
    {
      year: "Now",
      title: "Continuous Learning",
      description: "Exploring new technologies and building innovative solutions",
      icon: Star,
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From curious beginner to passionate developer - here's how my story unfolded
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Timeline line */}
          <div className="absolute left-8 sm:left-10 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

          {journeySteps.map((step, index) => (
            <motion.div
              key={step.year}
              initial={{ 
                opacity: 0, 
                y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 80 : 50,
                x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (index % 2 === 0 ? -50 : 50) : 0,
                scale: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.9 : 1
              }}
              whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
              className={`relative mb-8 sm:mb-12 ${
                index % 2 === 0 ? "lg:pr-[50%] lg:pl-0" : "lg:pl-[50%] lg:pr-0"
              } pl-20 sm:pl-24`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-4 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center z-10 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </motion.div>

              <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <Badge className="mb-2 sm:mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                    {step.year}
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fun <span className="gradient-text">Facts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Some interesting numbers that define my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
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
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                  >
                    <fact.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  <motion.h3 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 gradient-text">
                    <AnimatedCounter end={fact.number} suffix={fact.suffix} />
                  </motion.h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{fact.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const About = () => {
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
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-[100px]"
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
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-[100px]"
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
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Enhanced Profile Image */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : -100, 
                  y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 50 : 0,
                  rotateY: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : -30 
                }}
                animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Static gradient border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="absolute inset-2 bg-background rounded-3xl overflow-hidden">
                    <motion.img
                      src={profileImg}
                      alt="Umesh Darlami"
                      className="w-full h-full object-cover"
                      style={{
                        x: mousePosition.x * 10,
                        y: mousePosition.y * 10,
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute top-2 right-2 sm:-top-4 sm:-right-4 z-20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Badge className="bg-primary text-primary-foreground shadow-lg text-xs sm:text-sm px-2 py-1">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="whitespace-nowrap">Nepal</span>
                    </Badge>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Badge className="bg-accent text-accent-foreground shadow-lg text-xs sm:text-sm px-2 py-1">
                      <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="whitespace-nowrap hidden xs:inline sm:inline">BCSIT Student</span>
                      <span className="whitespace-nowrap xs:hidden sm:hidden">Student</span>
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced About Content */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 100,
                  y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 50 : 0
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      👋 Nice to meet you!
                    </Badge>
                  </motion.div>
                  
                  <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    I'm <span className="gradient-text">Umesh Darlami</span>
                  </motion.h1>
                  
                  <motion.p
                    className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    A passionate full-stack developer and BCSIT student at Liberty College. 
                    My journey began with curiosity about how digital magic happens behind the screen, 
                    and it has evolved into a deep passion for creating meaningful digital experiences.
                  </motion.p>
                  
                  <motion.p
                    className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    I specialize in building modern, scalable web applications using cutting-edge technologies. 
                    My goal is to combine technical expertise with creative problem-solving to deliver 
                    solutions that make a real impact in people's lives.
                  </motion.p>
                </div>

                {/* Enhanced Highlights */}
                <div className="grid gap-4">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ 
                        opacity: 0, 
                        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 50,
                        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 30 : 0
                      }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                      whileHover={{ 
                        scale: 1.02, 
                        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 10,
                        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? -5 : 0
                      }}
                    >
                      <Card className="border-none bg-card/50 backdrop-blur hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-4 sm:p-6 flex gap-3 sm:gap-4">
                          <motion.div
                            className="flex-shrink-0"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                              <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                            </div>
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h4>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <Button size="lg" className="gap-3 group" asChild>
                    <Link to="/contact">
                      Let's Connect
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Journey Timeline */}
        <JourneyTimeline />

        {/* Fun Facts */}
        <FunFacts />

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 bg-muted/30"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Let's Create Something <span className="gradient-text">Amazing</span> Together
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with amazing people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-3" asChild>
                    <Link to="/projects">
                      View My Work
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="gap-3" asChild>
                    <Link to="/contact">
                      Get In Touch
                      <Heart className="h-5 w-5" />
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

export default About;
