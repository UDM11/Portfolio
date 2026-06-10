import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Code2, Sparkles, Home, User, FolderOpen, Briefcase, Award, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { navItems } from "@/constants";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full relative overflow-hidden group bg-card/50 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 relative z-10" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 z-10" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}

// Icon mapping for navigation items
const getNavIcon = (name: string) => {
  const icons = {
    Home: Home,
    About: User,
    Projects: FolderOpen,
    Experience: Briefcase,
    Skills: Award,
    Contact: MessageCircle,
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
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100"
          initial={false}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
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
        <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
          isActive 
            ? 'text-primary font-semibold' 
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
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ x: 10 }}
    >
      <Link
        to={item.href}
        onClick={() => {
          onClick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 relative group ${
          isActive 
            ? 'text-primary bg-primary/10 font-semibold' 
            : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent className={`h-5 w-5 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
          }`} />
          <span>{item.name}</span>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <Sparkles className="h-4 w-4 text-primary" />
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
      // Close mobile menu when scrolling
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
          : 'bg-background/80 backdrop-blur-lg border-b border-border/30'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="relative group flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text hidden sm:block">
                Umesh Darlami
              </span>
              <span className="text-lg font-bold gradient-text block sm:hidden">
                UD
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink key={item.name} item={item} isActive={isActive} />
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                className="py-6 border-t border-border/50 bg-card/20 backdrop-blur rounded-b-2xl mx-4 mb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <MobileNavLink
                      key={item.name}
                      item={item}
                      index={index}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}