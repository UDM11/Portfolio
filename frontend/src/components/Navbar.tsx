import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Code2, Sparkles, Home, User, FolderOpen, Briefcase, Award, 
  MessageCircle, Lock, Github, Linkedin, Mail 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/admin" }
];

// Icon mapping for navigation items
const getNavIcon = (name: string) => {
  const icons = {
    Home: Home,
    About: User,
    Projects: FolderOpen,
    Experience: Briefcase,
    Skills: Award,
    Contact: MessageCircle,
    Login: Lock,
  };
  return icons[name as keyof typeof icons] || Home;
};

// Enhanced nav link with modern hover effects
const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => {
  const IconComponent = getNavIcon(item.name);
  
  return (
    <Link 
      to={item.href} 
      className="relative group"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <motion.div
        className="relative px-4 py-2 rounded-full overflow-hidden flex items-center gap-2"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/20 rounded-full shadow-inner shadow-primary/5"
            layoutId="activeNav"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        
        {/* Icon */}
        <div className="relative z-10">
          <IconComponent className={`h-4 w-4 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
          }`} />
        </div>
        
        {/* Text */}
        <span className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
          isActive 
            ? 'text-primary' 
            : 'text-muted-foreground group-hover:text-foreground'
        }`}>
          {item.name}
        </span>
        
        {/* Floating sparkle effect */}
        <motion.div
          className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
          animate={{
            y: [-2, -6, -2],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-3 w-3 text-primary" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

// Mobile nav link with slide animation
const MobileNavLink = ({ item, index, onClick }: { item: any; index: number; onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const IconComponent = getNavIcon(item.name);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ x: 6 }}
    >
      <Link
        to={item.href}
        onClick={() => {
          onClick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`block py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative group ${
          isActive 
            ? 'text-primary bg-primary/10' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent className={`h-4.5 w-4.5 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
          }`} />
          <span>{item.name}</span>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'pt-4 px-4 sm:px-6 lg:px-8' : 'pt-0'
        }`}
      >
        <div className={`mx-auto transition-all duration-500 ${
          scrolled 
            ? 'max-w-5xl rounded-2xl border border-white/10 bg-card/65 backdrop-blur-xl shadow-2xl shadow-primary/5 px-6' 
            : 'w-full border-b border-white/5 bg-background/40 backdrop-blur-md px-4'
        }`}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="relative group flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center gap-2 sm:gap-3"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.div>
                <span className="text-lg sm:text-xl font-bold gradient-text hidden sm:block font-outfit tracking-tight">
                  Umesh Darlami
                </span>
                <span className="text-lg font-bold gradient-text block sm:hidden font-outfit">
                  UD
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink key={item.name} item={item} isActive={isActive} />
                );
              })}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-full bg-card/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all duration-300 relative overflow-hidden group"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Slide-in Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />
            
            {/* Drawer Shell */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-3/4 max-w-[300px] bg-card/95 border-l border-border/10 backdrop-blur-2xl shadow-2xl p-6 z-[160] flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-border/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <Code2 className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="text-sm font-extrabold gradient-text font-outfit">Umesh Darlami</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-border/10 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Stacked Links */}
                <div className="space-y-1.5 overflow-y-auto pr-1">
                  {navItems.map((item, index) => (
                    <MobileNavLink
                      key={item.name}
                      item={item}
                      index={index}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="pt-6 border-t border-border/10 space-y-4">
                <div className="flex gap-2.5 justify-center">
                  {[
                    { icon: Github, href: "https://github.com/UDM11" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/umesh-darlami-magar-a96a37284/" },
                    { icon: Mail, href: "mailto:darlamiumesh123@gmail.com" },
                  ].map((social, index) => {
                    const SocialIcon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-full bg-muted/40 hover:bg-primary hover:text-primary-foreground border border-border/10 flex items-center justify-center text-muted-foreground transition-all duration-300"
                      >
                        <SocialIcon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground/80 font-mono text-center tracking-wide uppercase">
                  Kathmandu, Nepal
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}