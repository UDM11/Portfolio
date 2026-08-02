import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import { AIChatbot } from "@/components/AIChatbot";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const VersionChecker = () => {
  const location = useLocation();

  useEffect(() => {
    const checkVersion = async () => {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return;
      }
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const localVersion = localStorage.getItem("app_version");
          if (localVersion && localVersion !== data.version) {
            localStorage.setItem("app_version", data.version);
            window.location.reload();
          } else if (!localVersion) {
            localStorage.setItem("app_version", data.version);
          }
        }
      } catch (e) {
        console.warn("Version check failed:", e);
      }
    };
    checkVersion();
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VersionChecker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:tab" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

