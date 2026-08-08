import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart, 
  MapPin, 
  Globe, 
  Code2, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [localTime, setLocalTime] = useState("");

  // Clean local time display for Kathmandu, Nepal (UTC+5:45)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      } as const;
      setLocalTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Frontend Engineering",
    "Backend & API Development",
    "Full-Stack Web Applications",
    "Database System Architecture",
    "Web Performance & SEO",
  ];

  const marqueeTechs = [
    "React", "TypeScript", "Python", "FastAPI", "Supabase", "PostgreSQL", 
    "Docker", "TailwindCSS", "Node.js", "Git", "REST APIs", "Next.js"
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/UDM11", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/", icon: Linkedin },
    { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=darlamiumesh123@gmail.com", icon: Mail },
  ];

  return (
    <footer className="relative bg-black border-t border-x border-white/10 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] overflow-hidden mx-auto max-w-[95rem] shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-20">
      {/* Custom light-colored grid background for black footer */}
      <div className="absolute inset-0 footer-grid-pattern opacity-[0.06] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_50%,#000000_95%)] z-0" />

      {/* Subtle animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8 relative z-10">
        {/* Infinite Tech Stack Marquee / Ticker */}
        <div className="w-full overflow-hidden border-y border-white/5 py-4 mb-12 bg-black/60 backdrop-blur-sm relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max">
            <motion.div 
              className="flex gap-16 pr-16 whitespace-nowrap"
              animate={{ x: [0, "-100%"] }}
              transition={{
                ease: "linear",
                duration: 30,
                repeat: Infinity,
              }}
            >
              {marqueeTechs.map((tech, idx) => (
                <span key={idx} className="text-xs font-mono font-bold tracking-widest text-gray-500 hover:text-primary transition-colors cursor-default uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {tech}
                </span>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex gap-16 pr-16 whitespace-nowrap"
              animate={{ x: [0, "-100%"] }}
              transition={{
                ease: "linear",
                duration: 30,
                repeat: Infinity,
              }}
            >
              {marqueeTechs.map((tech, idx) => (
                <span key={idx} className="text-xs font-mono font-bold tracking-widest text-gray-500 hover:text-primary transition-colors cursor-default uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 pt-2">
          {/* Identity column */}
          <div className="md:col-span-1 lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/profile.jpg" alt="Logo" className="w-full h-full object-cover" />
              </motion.div>
              <span className="text-lg font-black tracking-wide font-outfit text-white">Umesh Darlami</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Full-Stack Developer focused on crafting high-performance, scalable web solutions and user-centered digital experiences.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent shrink-0" />
                <span>Local Time: {localTime || "--:--"} (NPT)</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2 font-outfit">
              <div className="w-1.5 h-3.5 bg-primary rounded-full" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="md:col-span-1 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2 font-outfit">
              <div className="w-1.5 h-3.5 bg-primary rounded-full" />
              Core Capabilities
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-400 text-sm flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-default group">
                  <ArrowRight className="h-3 w-3 text-primary/60 group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack and social icons */}
          <div className="md:col-span-1 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2 font-outfit">
              <div className="w-1.5 h-3.5 bg-primary rounded-full" />
              Connect
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Find me on github or LinkedIn, or send an email query directly.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300"
                  title={social.name}
                >
                  <social.icon className="h-4.5 w-4.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 text-center md:text-left font-mono">
            <span>© 2026 Umesh Darlami. All rights reserved.</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
              </motion.div>
              <span>in Nepal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
