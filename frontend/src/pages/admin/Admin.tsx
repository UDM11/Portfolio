import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";

// Modular tab views
import { Login } from "./Login";
import { ProjectsTab } from "./ProjectsTab";
import { SkillsTab } from "./SkillsTab";
import { ExperienceTab } from "./ExperienceTab";
import { HighlightsTab } from "./HighlightsTab";
import { ContactInfoTab } from "./ContactInfoTab";
import { MessagesTab } from "./MessagesTab";

const BackgroundGrid = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),transparent_60%)]" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
  </div>
);

const API_BASE = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";


const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

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
    try {
      const endpoints = ["projects", "skills", "experience", "highlights", "contact-info", "messages"];
      const [projData, skillData, expData, highData, contactData, msgData] = await Promise.all(
        endpoints.map((ep) =>
          fetch(`${API_BASE}/${ep}`)
            .then((res) => {
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
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <SEO 
          title="Admin Control Center | Umesh Darlami"
          description="Database control dashboard for portfolio management."
        />
        <BackgroundGrid />
        <Login API_BASE={API_BASE} onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  const tabsList = [
    { id: "projects", label: "Projects", count: projects.length },
    { id: "skills", label: "Skills", count: skills.length },
    { id: "experience", label: "Experience", count: experience.length },
    { id: "highlights", label: "About Highlights", count: highlights.length },
    { id: "contact-info", label: "Contact Info", count: contactInfo.length },
    { id: "messages", label: "Messages", count: messages.length, badgeColor: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Admin Control Center | Umesh Darlami"
        description="Database control dashboard for portfolio management."
      />
      <BackgroundGrid />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-24 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-border/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="text-primary h-5 w-5" />
                <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                  Dynamic Portfolio CMS
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Database <span className="gradient-text">Control Center</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={fetchAllData} className="border-primary/20 hover:bg-primary/10">
                Refresh Data
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-500/20 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/10 flex-nowrap scrollbar-thin">
            {tabsList.map((t) => (
              <Button
                key={t.id}
                variant={activeTab === t.id ? "default" : "ghost"}
                onClick={() => setActiveTab(t.id)}
                className="rounded-full px-5 py-2 text-sm whitespace-nowrap flex items-center gap-2"
                size="sm"
              >
                {t.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeTab === t.id
                      ? "bg-background/25 text-foreground"
                      : t.badgeColor || "bg-muted text-muted-foreground"
                  } font-bold`}
                >
                  {t.count}
                </span>
              </Button>
            ))}
          </div>

          {/* Dashboard Content Area */}
          {fetchLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Fetching dashboard details...</p>
            </div>
          ) : (
            <div className="space-y-4">
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

      <Footer />
    </div>
  );
};

export default Admin;
