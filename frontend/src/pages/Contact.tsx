import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Clock, CheckCircle, Star, Zap, Heart, ArrowRight, Sparkles, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useContactInfo, useSendMessage } from "@/hooks/usePortfolioData";
import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { GlowCard } from "@/components/ui/GlowCard";
import SEO from "@/components/SEO";

// Floating background elements
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

// Response time statistics cards
const ResponseStats = () => {
  const stats = [
    { icon: Clock, number: "< 24h", label: "Response Time", color: "rgba(14, 165, 233, 0.15)" },
    { icon: MessageCircle, number: "100%", label: "Reply Rate", color: "rgba(34, 197, 94, 0.15)" },
    { icon: Star, number: "5.0", label: "Client Rating", color: "rgba(234, 179, 8, 0.15)" },
    { icon: CheckCircle, number: "50+", label: "Projects Delivered", color: "rgba(168, 85, 247, 0.15)" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-muted/20 border-y border-border/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            Professional Standards
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Me?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Delivering high-quality software services with reliability and responsiveness
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <GlowCard
                  glowColor={stat.color}
                  className="border border-border/10 bg-card/30 backdrop-blur-xl text-center"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 gradient-text">
                      {stat.number}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
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

// Interactive Contact Form with click-badge groups
const ContactForm = () => {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BUDGET_TIERS = [
    { label: "< NPR 30k", value: "< NPR 30,000" },
    { label: "NPR 30k - 50k", value: "NPR 30,000 - 50,000" },
    { label: "NPR 50k - 100k", value: "NPR 50,000 - 100,000" },
    { label: "NPR 100k+", value: "NPR 100,000+" }
  ];

  const TIMELINE_OPTIONS = [
    { label: "ASAP", value: "ASAP" },
    { label: "1-2 Weeks", value: "1-2 weeks" },
    { label: "1 Month", value: "1 month" },
    { label: "Flexible", value: "Flexible" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendMessage.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `${formData.message}\n\nBudget: ${formData.budget || "Unspecified"}\nTimeline: ${formData.timeline || "Unspecified"}`
      });
      
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours!",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "", budget: "", timeline: "" });
    } catch (err) {
      toast({
        title: "Failed to Send Message ❌",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <GlowCard
        glowColor="rgba(168, 85, 247, 0.15)"
        className="border border-border/10 bg-card/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl"
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md">
              <Send className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Send a Message</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Let's discuss your project and bring your ideas to life
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Full Name *</label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-muted/10 border-border/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Email Address *</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-muted/10 border-border/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl py-3 text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Subject *</label>
            <Input
              placeholder="Project Collaboration"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="bg-muted/10 border-border/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl py-3 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Interactive Budget Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Estimated Budget</label>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: tier.value })}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                      formData.budget === tier.value
                        ? "bg-primary border-primary text-white shadow-md"
                        : "bg-muted/30 border-border/10 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Timeline Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Desired Timeline</label>
              <div className="grid grid-cols-2 gap-2">
                {TIMELINE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: opt.value })}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all text-center ${
                      formData.timeline === opt.value
                        ? "bg-accent border-accent text-white shadow-md"
                        : "bg-muted/30 border-border/10 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Message *</label>
            <Textarea
              placeholder="Tell me about your project, goals, and any specific requirements..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="bg-muted/10 border-border/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl resize-none text-sm leading-relaxed"
            />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button 
              type="submit" 
              className="w-full gap-3 text-base py-5 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-white" 
              disabled={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending Message...
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Submit Proposal
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </form>
      </GlowCard>
    </motion.div>
  );
};

const renderContactIcon = (item: any) => {
  if (typeof item.icon === 'string') {
    const IconComponent = (LucideIcons as any)[item.icon] || (LucideIcons as any)[item.icon_name];
    return IconComponent ? <IconComponent className="h-6 w-6 text-white" /> : <LucideIcons.HelpCircle className="h-6 w-6 text-white" />;
  } else if (item.icon) {
    const IconComponent = item.icon;
    return <IconComponent className="h-6 w-6 text-white" />;
  } else if (item.icon_name) {
    const IconComponent = (LucideIcons as any)[item.icon_name];
    return IconComponent ? <IconComponent className="h-6 w-6 text-white" /> : <LucideIcons.HelpCircle className="h-6 w-6 text-white" />;
  }
  return <LucideIcons.HelpCircle className="h-6 w-6 text-white" />;
};

// Enhanced contact info card with borders and slides
const ContactInfoCard = ({ item, index }: { item: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, x: 8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="block group"
    >
      <GlowCard
        glowColor="rgba(168, 85, 247, 0.12)"
        className="border border-border/10 bg-card/40 backdrop-blur-xl hover:bg-card/70 transition-all duration-300 shadow-md"
      >
        <CardContent className="p-5 flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md"
          >
            {renderContactIcon(item)}
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-0.5">{item.title}</p>
            <motion.p 
              className="font-bold text-base sm:text-lg truncate"
              animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            >
              {item.value}
            </motion.p>
          </div>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </CardContent>
      </GlowCard>
    </motion.a>
  );
};

const Contact = () => {
  const { data: contactInfo = [] } = useContactInfo();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 40]);
  const y2 = useTransform(scrollY, [0, 300], [0, -40]);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Contact Umesh Darlami | Freelance & Collaboration"
        description="Get in touch with Umesh Darlami for full-stack development projects, custom AI integrations, freelance work, or general inquiries."
        keywords="contact Umesh Darlami, hire developer Nepal, freelance software engineer, chatbot consultation"
      />
      <Navbar />
      <main className="relative pt-24">
        {/* Floating elements backdrop */}
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

        {/* Hero header section */}
        <div className="container mx-auto px-4 z-10 relative mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="px-4.5 py-1.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20 mb-6">
                💬 Let's Collaborate
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Ready to bring your ideas to life? I'm here to help you create something extraordinary. 
                Let's discuss your project and turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2.5 group rounded-xl" asChild>
                  <a href="#contact-form">
                    <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Start a Conversation
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2.5 rounded-xl border-primary/20 hover:bg-primary/5" asChild>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Zap className="h-4 w-4" />
                    Quick Email
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Response standard statistics */}
        <ResponseStats />

        {/* Main contact interactive sections */}
        <motion.section
          id="contact-form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24"
        >
          <div className="container mx-auto px-4 z-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
              
              {/* Left Column: Contact info & location tracking */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                    Contact Channels
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    I'm always excited to discuss new projects, creative ideas, or opportunities 
                    to bring your vision to life. Reach out through any of these active channels!
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <ContactInfoCard key={item.title} item={item} index={index} />
                  ))}
                </div>



                {/* Additional SLA information */}
                <GlowCard
                  glowColor="rgba(14, 165, 233, 0.08)"
                  className="border border-border/10 bg-card/30 backdrop-blur-xl p-5 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <h4 className="font-bold text-sm">Response Guarantee</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    I typically respond within 24 hours during business days. For fast, real-time messaging, click the green WhatsApp bubble or send a Telegram/WhatsApp link.
                  </p>
                </GlowCard>
              </div>

              {/* Right Column: Interactive Questionnaire Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

            </div>
          </div>
        </motion.section>

        {/* Call to Action bottom panel */}
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
                Ready to Start Your <span className="gradient-text">Next Project?</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's work together to create something extraordinary that exceeds your expectations.
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
                    <Link to="/about">
                      Learn More About Me
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

export default Contact;
