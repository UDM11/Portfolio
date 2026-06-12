import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Terminal, AlertTriangle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/badge";

// Hydration-safe Floating Particles
const FloatingParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 14 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-10, -70],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Diagnostics terminal card
const DiagnosticsConsole = ({ pathname }: { pathname: string }) => {
  return (
    <GlowCard glowColor="rgba(239, 68, 68, 0.15)" className="border border-border/10 shadow-2xl rounded-3xl overflow-hidden w-full max-w-sm mx-auto bg-card/65 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/10 bg-muted/40">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-1 bg-background/55 border border-border/5 px-2.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground select-none">
          <Terminal className="w-2.5 h-2.5 text-red-400" />
          <span>404_diagnostics ~ error</span>
        </div>
        <div className="w-8" />
      </div>
      
      <div className="p-5 h-[150px] overflow-y-auto font-mono text-[11px] leading-relaxed text-left bg-background/20 backdrop-blur-md text-foreground/90 select-text">
        <div>$ cat route_status.log</div>
        <div className="text-muted-foreground mt-1">&gt; Interrogating host router mapping...</div>
        <div className="text-red-400 font-semibold">&gt; ERR: Route "{pathname}" was not matched.</div>
        <div className="text-muted-foreground">&gt; Trace status code: 404 (RESOURCE_NOT_FOUND)</div>
        <div className="text-emerald-500 font-semibold">&gt; SUGGESTION: Return home or request active sitemap.</div>
      </div>
      
      <div className="flex items-center justify-between px-5 py-2 border-t border-border/10 bg-muted/15 font-mono text-[10px] text-muted-foreground select-none">
        <span>LOGS</span>
        <span>FATAL</span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>Server: Warning</span>
        </div>
      </div>
    </GlowCard>
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.02),transparent_70%)]" />
      </div>

      <FloatingParticles />

      <div className="max-w-md mx-auto text-center space-y-8 z-10 relative">
        {/* Animated Floating 404 heading */}
        <div className="relative inline-block">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-primary to-purple-600 font-outfit select-none leading-none tracking-tight">
              404
            </h1>
          </motion.div>
          <div className="absolute inset-0 text-8xl sm:text-9xl font-black text-red-500/10 -z-10 blur-md select-none leading-none tracking-tight">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <Badge className="px-3 py-1 bg-red-500/10 text-red-500 border-red-500/20 text-xs font-semibold flex items-center gap-1.5 max-w-fit mx-auto">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Lost in Space</span>
          </Badge>
          
          <h2 className="text-xl sm:text-2xl font-black font-outfit tracking-tight">
            Page Not Found
          </h2>
          
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            The page you are looking for does not exist or has been shifted. Check the trace log below.
          </p>
        </div>

        {/* Error Console */}
        <DiagnosticsConsole pathname={location.pathname} />

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold text-xs py-5">
            <Link to="/">
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </Button>
          
          <Button 
            onClick={() => window.history.back()}
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto gap-1.5 border-border/10 bg-card/45 hover:bg-muted font-semibold text-xs py-5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
