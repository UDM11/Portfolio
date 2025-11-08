import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Code2, Sparkles } from "lucide-react";
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

// Enhanced nav link with modern hover effects
const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => {
  return (
    <Link 
      to={item.href} 
      className="relative group"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <motion.div
        className="relative px-4 py-2 rounded-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          layoutId="navHover"
        />
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full"
            layoutId="activeNav"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        
        {/* Text */}
        <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
          isActive 
            ? 'text-primary font-semibold' 
            : 'text-muted-foreground group-hover:text-foreground'
        }`}>
          {item.name}
        </span>
        
        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            rotate: [0, 180, 360],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-2 w-2 text-primary" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

// Mobile nav link with slide animation
const MobileNavLink = ({ item, index, onClick }: { item: any; index: number; onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;
  
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
          <motion.div
            className={`w-1 h-6 rounded-full transition-all duration-300 ${
              isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/50'
            }`}
            whileHover={{ scale: 1.2 }}
          />
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
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {/* Enhanced Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link 
              to="/" 
              className="flex items-center gap-3"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Code2 className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                Umesh Darlami
              </span>
              <span className="text-xl font-bold gradient-text sm:hidden">
                UD
              </span>
            </Link>
          </motion.div>

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