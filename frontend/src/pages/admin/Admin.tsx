import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Loader2, FolderOpen, Award, Briefcase, Info, Mail, 
  LogOut, ArrowLeft, Menu, ChevronLeft, ChevronRight, RefreshCw, 
  MapPin, UserCheck, ShieldAlert 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Link, useParams, useNavigate } from "react-router-dom";
import profileImg from "@/assets/profile.webp";

// Modular tab views
import { Login } from "./Login";
import { ProjectsTab } from "./ProjectsTab";
import { SkillsTab } from "./SkillsTab";
import { ExperienceTab } from "./ExperienceTab";
import { HighlightsTab } from "./HighlightsTab";
import { ContactInfoTab } from "./ContactInfoTab";
import { MessagesTab } from "./MessagesTab";

const API_BASE = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";

const DashboardSkeleton = ({ tab }: { tab: string }) => {
  const items = Array.from({ length: 6 });

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-border/60 animate-pulse">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted rounded-xl"></div>
          <div className="h-3 w-64 bg-muted/65 rounded-lg"></div>
        </div>
        <div className="h-10 w-36 bg-muted rounded-xl"></div>
      </div>

      {/* Grid items */}
      <div className={`grid grid-cols-1 ${
        tab === "messages" ? "gap-4" : 
        tab === "experience" || tab === "skills" ? "md:grid-cols-2 gap-6" : 
        "md:grid-cols-2 lg:grid-cols-3 gap-6"
      }`}>
        {items.map((_, index) => (
          <div
            key={index}
            className="border border-border bg-card rounded-2xl p-5 space-y-4 animate-pulse"
          >
            {tab === "projects" && (
              <>
                <div className="-mx-5 -mt-5 aspect-video bg-muted rounded-t-2xl"></div>
                <div className="space-y-2.5">
                  <div className="h-5 w-2/3 bg-muted rounded-lg"></div>
                  <div className="h-3.5 w-full bg-muted/70 rounded-md"></div>
                  <div className="h-3.5 w-5/6 bg-muted/70 rounded-md"></div>
                </div>
                <div className="flex gap-1.5 pt-2">
                  <div className="h-5 w-12 bg-muted/80 rounded-md"></div>
                  <div className="h-5 w-16 bg-muted/80 rounded-md"></div>
                  <div className="h-5 w-14 bg-muted/80 rounded-md"></div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border mt-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                </div>
              </>
            )}

            {tab === "skills" && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted shrink-0"></div>
                  <div className="h-5 w-32 bg-muted rounded-lg"></div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="h-6 w-14 bg-muted/80 rounded-full"></div>
                  <div className="h-6 w-16 bg-muted/80 rounded-full"></div>
                  <div className="h-6 w-12 bg-muted/80 rounded-full"></div>
                </div>
                <div className="flex justify-end gap-1.5 pt-3 border-t border-border mt-4">
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                </div>
              </>
            )}

            {tab === "experience" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="h-5 w-24 bg-muted/80 rounded-full"></div>
                  <div className="h-4 w-28 bg-muted/60 rounded-md"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-muted rounded-lg"></div>
                  <div className="h-3.5 w-1/2 bg-muted/70 rounded-md"></div>
                </div>
                <div className="h-16 bg-muted/40 rounded-xl border border-border"></div>
                <div className="flex justify-end gap-1.5 pt-3 border-t border-border mt-4">
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                </div>
              </>
            )}

            {tab === "highlights" && (
              <>
                <div className="w-10 h-10 rounded-xl bg-muted shrink-0 animate-pulse"></div>
                <div className="space-y-2.5">
                  <div className="h-5 w-1/2 bg-muted rounded-lg"></div>
                  <div className="h-3.5 w-full bg-muted/70 rounded-md"></div>
                  <div className="h-3.5 w-5/6 bg-muted/70 rounded-md"></div>
                </div>
                <div className="flex justify-end gap-1.5 pt-3 border-t border-border mt-4">
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  <div className="h-8 w-8 bg-muted rounded-lg"></div>
                </div>
              </>
            )}

            {tab === "contact-info" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-muted shrink-0"></div>
                  <div className="h-5 w-20 bg-muted/80 rounded-full"></div>
                </div>
                <div className="space-y-2.5">
                  <div className="h-5 w-1/3 bg-muted rounded-lg"></div>
                  <div className="h-9 w-full bg-muted/50 rounded-xl"></div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border mt-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                    <div className="h-8 w-8 bg-muted rounded-lg"></div>
                  </div>
                </div>
              </>
            )}

            {tab === "messages" && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted shrink-0"></div>
                    <div className="space-y-1.5">
                      <div className="h-4.5 w-24 bg-muted rounded-md"></div>
                      <div className="h-3 w-32 bg-muted/70 rounded-md"></div>
                    </div>
                  </div>
                  <div className="h-6 w-40 bg-muted/65 rounded-xl"></div>
                </div>
                <div className="space-y-2.5">
                  <div className="h-5 w-36 bg-muted/80 rounded-lg"></div>
                  <div className="h-16 bg-muted/40 rounded-xl border border-border"></div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-border mt-4">
                  <div className="h-9 w-28 bg-muted rounded-xl"></div>
                  <div className="h-9 w-9 bg-muted rounded-lg ml-auto"></div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function Admin() {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const activeTab = tab || "projects";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // CMS Content States
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("admin_token", token);
    setIsAuthenticated(true);
    fetchAllData();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    setFetchLoading(true);
    const token = localStorage.getItem("admin_token");
    const headers: Record<string, string> = token ? { "Authorization": `Bearer ${token}` } : {};

    try {
      const endpoints = ["projects", "skills", "experience", "highlights", "contact-info", "messages"];
      const [projData, skillData, expData, highData, contactData, msgData] = await Promise.all(
        endpoints.map((ep) =>
          fetch(`${API_BASE}/${ep}`, { headers })
            .then((res) => {
              if (res.status === 401) {
                handleLogout();
                throw new Error("Session expired");
              }
              if (!res.ok) throw new Error(`HTTP error ${res.status}`);
              return res.json();
            })
            .then((data) => (Array.isArray(data) ? data : []))
            .catch(() => [])
        )
      );
      setProjects(projData);
      setSkills(skillData);
      setExperience(expData);
      setHighlights(highData);
      setContactInfo(contactData);
      setMessages(msgData);
    } catch (err) {
      console.error("Failed to load portfolio CMS details:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-background">
        <SEO 
          title="Admin Control Center | Umesh Darlami"
          description="Database control dashboard for portfolio management."
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),transparent_60%)]" />
        <Login API_BASE={API_BASE} onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  const navItems = [
    { id: "projects", label: "Projects", icon: FolderOpen, count: projects.length },
    { id: "skills", label: "Skills", icon: Award, count: skills.length },
    { id: "experience", label: "Experience", icon: Briefcase, count: experience.length },
    { id: "highlights", label: "Highlights", icon: Info, count: highlights.length },
    { id: "contact-info", label: "Contact Info", icon: MapPin, count: contactInfo.length },
    { id: "messages", label: "Messages", icon: Mail, count: messages.length, badgeColor: "bg-red-500 text-white" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/65 backdrop-blur-xl border-r border-white/10 text-card-foreground">
      {/* Brand Header */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-white/5">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
          <img src={profileImg} alt="Umesh Darlami" className="w-full h-full object-cover" />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-outfit font-bold tracking-tight text-white text-base"
          >
            Umesh <span className="gradient-text">CMS</span>
          </motion.span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2.5 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(`/admin/${item.id}`);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative group ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
              {!isCollapsed && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="truncate">
                  {item.label}
                </motion.span>
              )}
              {item.count > 0 && (
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive 
                    ? "bg-primary text-white" 
                    : item.badgeColor || "bg-muted text-muted-foreground"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Utilities */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
        >
          <ArrowLeft className="h-4.5 w-4.5 shrink-0" />
          {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Back to Site</motion.span>}
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Logout</motion.span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SEO 
        title="Admin Control Center | Umesh Darlami"
        description="Database control dashboard for portfolio management."
      />

      {/* Desktop Collapsible Sidebar */}
      <motion.div
        animate={{ width: isCollapsed ? 72 : 240 }}
        className="hidden md:block h-full shrink-0 overflow-hidden"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-64 max-w-[280px] z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-card/45 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden hover:bg-white/5 rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
            {/* Desktop collapse toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex hover:bg-white/5 rounded-xl"
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            
            <h2 className="text-lg font-bold tracking-tight font-outfit text-white">
              {navItems.find((n) => n.id === activeTab)?.label} Manager
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAllData}
              disabled={fetchLoading}
              className="border-white/10 hover:bg-white/5 text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${fetchLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </header>

        {/* Content Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background relative z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.05),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto z-10 relative">
            {fetchLoading ? (
              <DashboardSkeleton tab={activeTab} />
            ) : (
              <div className="space-y-6">
                {activeTab === "projects" && (
                  <ProjectsTab items={projects} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
                {activeTab === "skills" && (
                  <SkillsTab items={skills} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
                {activeTab === "experience" && (
                  <ExperienceTab items={experience} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
                {activeTab === "highlights" && (
                  <HighlightsTab items={highlights} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
                {activeTab === "contact-info" && (
                  <ContactInfoTab items={contactInfo} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
                {activeTab === "messages" && (
                  <MessagesTab items={messages} API_BASE={API_BASE} onRefresh={fetchAllData} />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin;
